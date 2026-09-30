import BookingForm from "./BookingForm";
import { BOOKING_TYPES, CLINIC, POOL } from "@/lib/config";
import { demoMode, getStore } from "@/lib/store";
import { getStripe } from "@/lib/stripe";
import { bookableDates, slotsForDate } from "@/lib/time";

export const dynamic = "force-dynamic";

type Props = { searchParams: Promise<{ cancelled?: string; embed?: string }> };

export default async function Home({ searchParams }: Props) {
  const { cancelled, embed } = await searchParams;

  // Someone backed out of Stripe Checkout: release their held spot right away.
  if (cancelled) {
    const store = getStore();
    const b = await store.get(cancelled).catch(() => null);
    if (b?.status === "pending_payment") {
      await store.update(b.id, { status: "cancelled" });
      if (b.stripe_session_id) await getStripe()?.checkout.sessions.expire(b.stripe_session_id).catch(() => {});
    }
  }

  const days = bookableDates().map((date) => ({ date, open: slotsForDate(date).length > 0 }));
  const isEmbed = embed === "1";

  return (
    <div className={isEmbed ? "embed" : undefined}>
      {!isEmbed && (
        <header className="hero">
          <div className="wrap">
            <div className="eyebrow">Therapeutic Pool</div>
            <h1>Book your pool time</h1>
            <p>
              Reserve a {POOL.slotMinutes}-minute session in the only therapeutic pool in Oshkosh. Up to{" "}
              {POOL.capacityPerSlot} people per session.
            </p>
          </div>
        </header>
      )}
      <main className="wrap">
        {cancelled && <div className="notice">Payment was cancelled, so we didn&apos;t book that time. Pick a time below to try again.</div>}
        {demoMode() && (
          <div className="notice">
            Demo mode: bookings are stored in memory and no card is charged. Connect Supabase and Stripe to go live.
          </div>
        )}
        <BookingForm days={days} types={BOOKING_TYPES} />
        <p className="muted" style={{ marginTop: 24, fontSize: ".9rem" }}>
          Questions or need to cancel? Call the front desk at {CLINIC.phone}. {CLINIC.address}.
        </p>
      </main>
    </div>
  );
}
