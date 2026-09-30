import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStore } from "@/lib/store";
import { getStripe } from "@/lib/stripe";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const stripe = getStripe();
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!stripe || !secret) return NextResponse.json({ error: "not configured" }, { status: 500 });

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(await req.text(), req.headers.get("stripe-signature") ?? "", secret);
  } catch {
    return NextResponse.json({ error: "bad signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed" || event.type === "checkout.session.expired") {
    const session = event.data.object as Stripe.Checkout.Session;
    const id = session.metadata?.booking_id;
    if (id) {
      const paid = event.type === "checkout.session.completed" && session.payment_status === "paid";
      await getStore().update(id, paid ? { status: "confirmed", hold_expires_at: null } : { status: "cancelled" });
    }
  }
  return NextResponse.json({ received: true });
}
