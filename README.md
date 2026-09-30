# FVPT Pool Booking

Online booking (and optional payment) for the therapeutic pool at Fox Valley Physical Therapy & Wellness Clinic.

The main site is on Webflow, which can't store bookings or take payments on its own. This is a small Next.js app that runs on its own subdomain (e.g. `pool.foxvalleyphysicaltherapy.com`) and the Webflow site links to it.

## What it does

- **Public page (`/`)**: pick a day, pick an hour slot, choose patient (free) or community member (paid), enter contact info.
- **Payments**: paid bookings go through Stripe Checkout. The spot is held for 31 minutes while they pay, then released if they don't.
- **Capacity**: each slot takes up to N swimmers. The database locks each slot while booking so two people can't grab the last spot.
- **Front desk (`/admin`)**: password-protected day view with names, phone, email, type and status. Staff can cancel a booking to free the spot (refunds are done in Stripe).
- **Demo mode**: with no Supabase keys it runs on in-memory storage and skips payment, so you can click through it locally.

## Change hours, capacity or prices

Everything is in `src/lib/config.ts`. **The current hours, capacity (4) and price ($15) are placeholders.** Confirm them with the clinic before launch.

## Run locally

```bash
npm install
ADMIN_PASSWORD=test npm run dev
```

Open http://localhost:3000 and http://localhost:3000/admin (any username, password `test`).

## Go live

1. **Supabase**: create a project, run `supabase/schema.sql` in the SQL editor, and copy the project URL and service role key.
2. **Stripe**: use the clinic's Stripe account. Add a webhook to `https://<your-domain>/api/stripe/webhook` for `checkout.session.completed` and `checkout.session.expired`, then copy the signing secret.
3. **Vercel**: import this repo, add the env vars from `.env.example`, deploy.
4. **Domain**: add `pool.foxvalleyphysicaltherapy.com` in Vercel and create the CNAME wherever the domain's DNS lives.
5. **Webflow**: add a "Book Pool Time" button to the nav and the Aquatic Therapy page pointing to the subdomain.

To embed it inside a Webflow page instead, use an Embed element:

```html
<iframe src="https://pool.foxvalleyphysicaltherapy.com/?embed=1" style="width:100%;height:1900px;border:0"></iframe>
```

A plain link is better. Checkout has to leave the iframe to take payment anyway.
