-- Run this once in the Supabase SQL editor.

create table if not exists pool_bookings (
  id uuid primary key default gen_random_uuid(),
  slot_start timestamptz not null,
  name text not null,
  email text not null,
  phone text not null,
  booking_type text not null,
  price_cents integer not null default 0,
  notes text,
  status text not null default 'pending_payment'
    check (status in ('pending_payment', 'confirmed', 'cancelled')),
  hold_expires_at timestamptz,
  stripe_session_id text,
  created_at timestamptz not null default now()
);

create index if not exists pool_bookings_slot_idx on pool_bookings (slot_start);

-- Only the server (service role key) touches this table.
alter table pool_bookings enable row level security;

-- Counts a slot as taken if confirmed, or pending and still inside its payment hold.
create or replace function pool_active(b pool_bookings) returns boolean
language sql immutable as $$
  select b.status = 'confirmed'
      or (b.status = 'pending_payment' and b.hold_expires_at > now())
$$;

-- Atomically check capacity and insert. Returns the new row, or nothing if the slot is full.
create or replace function book_pool_slot(
  p_slot_start timestamptz,
  p_capacity integer,
  p_name text,
  p_email text,
  p_phone text,
  p_booking_type text,
  p_price_cents integer,
  p_notes text,
  p_status text,
  p_hold_expires_at timestamptz
) returns setof pool_bookings
language plpgsql as $$
begin
  -- Serialize bookings for the same slot so two people can't grab the last spot.
  perform pg_advisory_xact_lock(hashtext('pool:' || p_slot_start::text));

  if (select count(*) from pool_bookings b where b.slot_start = p_slot_start and pool_active(b)) >= p_capacity then
    return;
  end if;

  return query
    insert into pool_bookings
      (slot_start, name, email, phone, booking_type, price_cents, notes, status, hold_expires_at)
    values
      (p_slot_start, p_name, p_email, p_phone, p_booking_type, p_price_cents, p_notes, p_status, p_hold_expires_at)
    returning *;
end;
$$;

revoke execute on function book_pool_slot from anon, authenticated;
