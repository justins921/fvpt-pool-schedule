import { NextResponse } from "next/server";
import { CLINIC, POOL, bookingType } from "@/lib/config";
import { demoMode, getStore } from "@/lib/store";
import { getStripe } from "@/lib/stripe";
import { formatSlot, isBookableSlot } from "@/lib/time";

export const dynamic = "force-dynamic";

const clean = (v: unknown, max = 200) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const name = clean(body.name, 100);
  const email = clean(body.email, 200).toLowerCase();
  const phone = clean(body.phone, 30);
  const notes = clean(body.notes, 500) || null;
  const type = bookingType(clean(body.bookingType, 40));
  const start = new Date(clean(body.slotStart, 40));

  if (!name || !phone || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Please fill in your name, email and phone." }, { status: 400 });
  }
  if (!type) return NextResponse.json({ error: "Please choose who the booking is for." }, { status: 400 });
  if (isNaN(start.getTime()) || !isBookableSlot(start)) {
    return NextResponse.json({ error: "That time isn't available anymore. Please pick another." }, { status: 400 });
  }

  const paid = type.priceCents > 0;
  const stripe = getStripe();
  if (paid && !stripe && !demoMode()) {
    return NextResponse.json({ error: `Online payment is down. Please call us at ${CLINIC.phone}.` }, { status: 503 });
  }
  const collectPayment = paid && !!stripe;

  const store = getStore();
  const booking = await store.create(
    {
      slot_start: start.toISOString(),
      name,
      email,
      phone,
      notes,
      booking_type: type.id,
      price_cents: type.priceCents,
      status: collectPayment ? "pending_payment" : "confirmed",
      hold_expires_at: collectPayment ? new Date(Date.now() + POOL.paymentHoldMinutes * 60_000).toISOString() : null,
    },
    POOL.capacityPerSlot,
  );
  if (!booking) {
    return NextResponse.json({ error: "Sorry, that time just filled up. Please pick another." }, { status: 409 });
  }

  const origin = process.env.SITE_URL ?? new URL(req.url).origin;
  if (!collectPayment) {
    return NextResponse.json({ redirect: `${origin}/confirmed?id=${booking.id}` });
  }

  try {
    const session = await stripe!.checkout.sessions.create({
      mode: "payment",
      customer_email: email,
      client_reference_id: booking.id,
      metadata: { booking_id: booking.id },
      expires_at: Math.floor(Date.now() / 1000) + 30 * 60,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            unit_amount: type.priceCents,
            product_data: { name: `Pool time: ${type.label}`, description: formatSlot(start) },
          },
        },
      ],
      success_url: `${origin}/confirmed?id=${booking.id}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/?cancelled=${booking.id}`,
    });
    await store.update(booking.id, { stripe_session_id: session.id });
    return NextResponse.json({ redirect: session.url });
  } catch (err) {
    console.error("stripe checkout failed", err);
    await store.update(booking.id, { status: "cancelled" });
    return NextResponse.json({ error: `We couldn't start checkout. Please try again or call ${CLINIC.phone}.` }, { status: 502 });
  }
}
