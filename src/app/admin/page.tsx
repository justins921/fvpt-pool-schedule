import Link from "next/link";
import { POOL, bookingType, formatPrice } from "@/lib/config";
import { getStore, isActive } from "@/lib/store";
import { addDays, clinicTimeToUtc, clinicToday, formatSlot, formatTime, isValidDate } from "@/lib/time";

export const dynamic = "force-dynamic";

type Props = { searchParams: Promise<{ date?: string }> };

export default async function Admin({ searchParams }: Props) {
  const q = (await searchParams).date ?? "";
  const date = isValidDate(q) ? q : clinicToday();
  const from = clinicTimeToUtc(date, "00:00").toISOString();
  const to = clinicTimeToUtc(addDays(date, 1), "00:00").toISOString();
  const rows = await getStore().list(from, to);
  const active = rows.filter((b) => isActive(b));

  return (
    <main className="wrap" style={{ maxWidth: 1000 }}>
      <div className="eyebrow">Front desk</div>
      <h1 style={{ margin: "0 0 4px", color: "var(--navy)" }}>Pool schedule</h1>
      <p className="muted" style={{ marginTop: 0 }}>
        {formatSlot(from, { hour: undefined, minute: undefined })} · {active.length} active booking{active.length === 1 ? "" : "s"} · {POOL.capacityPerSlot} per slot
      </p>
      <p>
        <Link href={`/admin?date=${addDays(date, -1)}`}>← Previous day</Link> ·{" "}
        <Link href="/admin">Today</Link> ·{" "}
        <Link href={`/admin?date=${addDays(date, 1)}`}>Next day →</Link>
      </p>
      <section className="card" style={{ overflowX: "auto" }}>
        {rows.length === 0 ? (
          <p className="muted">No bookings this day.</p>
        ) : (
          <table>
            <thead>
              <tr><th>Time</th><th>Name</th><th>Contact</th><th>Type</th><th>Status</th><th></th></tr>
            </thead>
            <tbody>
              {rows.map((b) => (
                <tr key={b.id}>
                  <td>{formatTime(b.slot_start)}</td>
                  <td>{b.name}{b.notes && <div className="muted" style={{ fontSize: ".82rem" }}>{b.notes}</div>}</td>
                  <td><a href={`tel:${b.phone}`}>{b.phone}</a><br /><a href={`mailto:${b.email}`}>{b.email}</a></td>
                  <td>{bookingType(b.booking_type)?.label ?? b.booking_type}<br /><span className="muted">{formatPrice(b.price_cents)}</span></td>
                  <td><span className={`pill ${isActive(b) ? b.status : "cancelled"}`}>{isActive(b) ? b.status.replace("_", " ") : b.status === "pending_payment" ? "abandoned" : b.status}</span></td>
                  <td>
                    {isActive(b) && (
                      <form action="/api/admin/cancel" method="post">
                        <input type="hidden" name="id" value={b.id} />
                        <input type="hidden" name="date" value={date} />
                        <button className="link-btn">Cancel</button>
                      </form>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <p className="muted" style={{ fontSize: ".82rem", marginBottom: 0 }}>
          Cancelling here frees the spot but does not refund. Issue refunds in the Stripe dashboard.
        </p>
      </section>
    </main>
  );
}
