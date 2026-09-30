import Stripe from "stripe";

let stripe: Stripe | null | undefined;
export function getStripe(): Stripe | null {
  if (stripe === undefined) {
    const key = process.env.STRIPE_SECRET_KEY;
    stripe = key ? new Stripe(key) : null;
  }
  return stripe;
}
