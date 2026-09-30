"use client";

import { useEffect, useState } from "react";
import type { BookingType } from "@/lib/config";

type Day = { date: string; open: boolean };
type Slot = { start: string; remaining: number; bookable: boolean };

const TZ = "America/Chicago";
const fmt = (d: string, o: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat("en-US", { timeZone: TZ, ...o }).format(new Date(d));
// Dates are clinic-local "YYYY-MM-DD"; anchor at noon UTC so the weekday never shifts.
const dayLabel = (date: string, o: Intl.DateTimeFormatOptions) => fmt(`${date}T12:00:00Z`, o);
const price = (c: number) => (c === 0 ? "Free" : `$${(c / 100).toFixed(c % 100 ? 2 : 0)}`);

export default function BookingForm({ days, types }: { days: Day[]; types: BookingType[] }) {
  const [date, setDate] = useState(days.find((d) => d.open)?.date ?? "");
  const [slots, setSlots] = useState<Slot[] | null>(null);
  const [slot, setSlot] = useState<string>("");
  const [typeId, setTypeId] = useState(types[0]?.id ?? "");
  const [form, setForm] = useState({ name: "", email: "", phone: "", notes: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!date) return;
    let live = true;
    setSlots(null);
    setSlot("");
    fetch(`/api/availability?date=${date}`)
      .then((r) => r.json())
      .then((j) => live && setSlots(j.slots ?? []))
      .catch(() => live && setSlots([]));
    return () => {
      live = false;
    };
  }, [date]);

  const type = types.find((t) => t.id === typeId);
  const ready = slot && type && form.name && form.email && form.phone;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!ready) return;
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...form, slotStart: slot, bookingType: typeId }),
      });
      const j = await res.json();
      if (!res.ok) throw new Error(j.error ?? "Something went wrong.");
      // Stripe Checkout can't run inside an iframe, so leave the embed if we're in one.
      (window.top ?? window).location.href = j.redirect;
    } catch (err) {
      setError((err as Error).message);
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={submit}>
      <section className="card">
        <h2><span className="step">1</span>Pick a day</h2>
        <div className="days">
          {days.map((d) => (
            <button type="button" key={d.date} className="day" disabled={!d.open} aria-pressed={d.date === date} onClick={() => setDate(d.date)}>
              <small>{dayLabel(d.date, { weekday: "short" })}</small>
              <strong>{dayLabel(d.date, { day: "numeric" })}</strong>
              <small>{d.open ? dayLabel(d.date, { month: "short" }) : "Closed"}</small>
            </button>
          ))}
        </div>
      </section>

      <section className="card">
        <h2><span className="step">2</span>Pick a time</h2>
        {slots === null ? (
          <p className="muted">Loading times…</p>
        ) : slots.length === 0 ? (
          <p className="muted">The pool is closed this day.</p>
        ) : (
          <div className="slots">
            {slots.map((s) => (
              <button type="button" key={s.start} className="slot" disabled={!s.bookable} aria-pressed={s.start === slot} onClick={() => setSlot(s.start)}>
                <strong>{fmt(s.start, { hour: "numeric", minute: "2-digit" })}</strong>
                <span>{!s.bookable ? (s.remaining === 0 ? "Full" : "Unavailable") : `${s.remaining} spot${s.remaining === 1 ? "" : "s"} left`}</span>
              </button>
            ))}
          </div>
        )}
      </section>

      <section className="card">
        <h2><span className="step">3</span>Who&apos;s swimming?</h2>
        <div className="types">
          {types.map((t) => (
            <button type="button" key={t.id} className="type" aria-pressed={t.id === typeId} onClick={() => setTypeId(t.id)}>
              <div>
                <strong>{t.label}</strong>
                <p>{t.description}</p>
              </div>
              <span className="price">{price(t.priceCents)}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="card">
        <h2><span className="step">4</span>Your details</h2>
        <div className="fields">
          <div className="full">
            <label htmlFor="name">Full name</label>
            <input id="name" autoComplete="name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input id="email" type="email" autoComplete="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </div>
          <div>
            <label htmlFor="phone">Phone</label>
            <input id="phone" type="tel" autoComplete="tel" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          </div>
          <div className="full">
            <label htmlFor="notes">Anything we should know? (optional)</label>
            <textarea id="notes" rows={2} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
          </div>
        </div>

        {slot && type && (
          <div className="summary">
            <strong>{fmt(slot, { weekday: "long", month: "long", day: "numeric", hour: "numeric", minute: "2-digit" })}</strong>
            <br />
            {type.label} · {price(type.priceCents)}
          </div>
        )}
        {error && <div className="error">{error}</div>}
        <button className="btn" disabled={!ready || submitting} style={{ marginTop: 12 }}>
          {submitting ? "Working…" : type && type.priceCents > 0 ? `Continue to payment (${price(type.priceCents)})` : "Book my spot"}
        </button>
        {!slot && <p className="muted" style={{ fontSize: ".85rem", marginBottom: 0 }}>Pick a time above to continue.</p>}
      </section>
    </form>
  );
}
