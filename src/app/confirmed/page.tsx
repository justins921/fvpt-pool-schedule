import Link from "next/link";
import { CLINIC, bookingType, formatPrice } from "@/lib/config";
import { getStore } from "@/lib/store";
import { getStripe } from "@/lib/stripe";
import { formatSlot } from "@/lib/time";

export const dynamic = "force-dynamic";

type Props = { searchParams: Promise<{ id?: string; session_id?: string }> };

export default async function Confirmed({ searchParams }: Props) {
  const { id, session_id } = await searchParams;
  const store = getStore();
  let booking = id ? await store.get(id).catch(() => null) : null;

  // The webhook usually beats the redirect, but check Stripe directly in case it hasn't landed yet.
  if (booking?.status === "pending_payment" && session_id && booking.stripe_session_id === session_id) {
    const session = await getStripe()?.checkout.sessions.retrieve(session_id).catch(() => null);
    if (session?.payment_status === "paid") {
      await store.update(booking.id, { status: "confirmed", hold_expires_at: null });
      booking = { ...booking, status: "confirmed" };
    }
  }

  const type = booking && bookingType(booking.booking_type);

  return (
    <main className="wrap">
      <section className="card">
        {!booking ? (
          <>
            <h2>We couldn&apos;t find that booking</h2>
            <p>Please call the front desk at {CLINIC.phone} and we&apos;ll sort it out.</p>
          </>
        ) : booking.status === "confirmed" ? (
          <>
            <div className="eyebrow">You&apos;re booked</div>
            <h2 style={{ fontSize: "1.5rem" }}>See you in the pool, {booking.name.split(" ")[0]}!</h2>
            <div className="summary">
              <strong>{formatSlot(booking.slot_start)}</strong>
              <br />
              {type?.label ?? booking.booking_type} · {booking.price_cents ? `${formatPrice(booking.price_cents)} paid` : "No charge"}
            </div>
            <p>Please arrive 10 minutes early and check in at the front desk. Bring a swimsuit and towel.</p>
            <p className="muted">
              {CLINIC.address}. Need to cancel or change? Call {CLINIC.phone}.
            </p>
          </>
        ) : booking.status === "pending_payment" ? (
          <>
            <h2>Finishing up your payment…</h2>
            <p>This can take a few seconds. Refresh this page in a moment. If it doesn&apos;t update, call {CLINIC.phone}.</p>
          </>
        ) : (
          <>
            <h2>This booking was cancelled</h2>
            <p>No charge was made. You can pick a new time any time.</p>
          </>
        )}
        <p style={{ marginTop: 20 }}>
          <Link className="btn secondary" href="/">Book another time</Link>
        </p>
      </section>
    </main>
  );
}
