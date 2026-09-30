import { createClient } from "@supabase/supabase-js";

export type Booking = {
  id: string;
  slot_start: string;
  name: string;
  email: string;
  phone: string;
  booking_type: string;
  price_cents: number;
  notes: string | null;
  status: "pending_payment" | "confirmed" | "cancelled";
  hold_expires_at: string | null;
  stripe_session_id: string | null;
  created_at: string;
};

export type NewBooking = Pick<Booking, "slot_start" | "name" | "email" | "phone" | "booking_type" | "price_cents" | "notes" | "status" | "hold_expires_at">;

export interface Store {
  list(fromIso: string, toIso: string): Promise<Booking[]>;
  create(input: NewBooking, capacity: number): Promise<Booking | null>; // null = slot full
  get(id: string): Promise<Booking | null>;
  update(id: string, patch: Partial<Booking>): Promise<void>;
}

export function isActive(b: Booking, now = Date.now()) {
  return b.status === "confirmed" || (b.status === "pending_payment" && !!b.hold_expires_at && Date.parse(b.hold_expires_at) > now);
}

// --- Supabase (production) ---
function supabaseStore(url: string, key: string): Store {
  const db = createClient(url, key, { auth: { persistSession: false } });
  const T = "pool_bookings";
  return {
    async list(from, to) {
      const { data, error } = await db.from(T).select("*").gte("slot_start", from).lt("slot_start", to).order("slot_start");
      if (error) throw error;
      return data as Booking[];
    },
    async create(b, capacity) {
      const { data, error } = await db.rpc("book_pool_slot", {
        p_slot_start: b.slot_start,
        p_capacity: capacity,
        p_name: b.name,
        p_email: b.email,
        p_phone: b.phone,
        p_booking_type: b.booking_type,
        p_price_cents: b.price_cents,
        p_notes: b.notes,
        p_status: b.status,
        p_hold_expires_at: b.hold_expires_at,
      });
      if (error) throw error;
      return (data as Booking[])[0] ?? null;
    },
    async get(id) {
      const { data, error } = await db.from(T).select("*").eq("id", id).maybeSingle();
      if (error) throw error;
      return data as Booking | null;
    },
    async update(id, patch) {
      const { error } = await db.from(T).update(patch).eq("id", id);
      if (error) throw error;
    },
  };
}

// --- In-memory (local demo, no database needed) ---
function memoryStore(): Store {
  const g = globalThis as unknown as { __poolBookings?: Booking[] };
  const rows = (g.__poolBookings ??= []);
  return {
    async list(from, to) {
      return rows.filter((b) => b.slot_start >= from && b.slot_start < to).sort((a, b) => a.slot_start.localeCompare(b.slot_start));
    },
    async create(b, capacity) {
      const taken = rows.filter((r) => r.slot_start === b.slot_start && isActive(r)).length;
      if (taken >= capacity) return null;
      const row: Booking = { ...b, id: crypto.randomUUID(), stripe_session_id: null, created_at: new Date().toISOString() };
      rows.push(row);
      return row;
    },
    async get(id) {
      return rows.find((r) => r.id === id) ?? null;
    },
    async update(id, patch) {
      const row = rows.find((r) => r.id === id);
      if (row) Object.assign(row, patch);
    },
  };
}

let store: Store | undefined;
export function getStore(): Store {
  if (!store) {
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    store = url && key ? supabaseStore(url, key) : memoryStore();
  }
  return store;
}

export const demoMode = () => !process.env.SUPABASE_URL;
