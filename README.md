# Fox Valley Physical Therapy website

The public website for Fox Valley Physical Therapy & Wellness Clinic in Oshkosh, WI. It replaces the old Webflow site.

A static Next.js site, hosted on Vercel. There's no database and no forms, so the site never collects patient information.

## Editing content

Almost everything lives in `src/content/`:

| What | File |
| --- | --- |
| Phone, address, **hours**, nav, pool pricing and booking link | `src/content/site.ts` |
| Services (one page each) | `src/content/services.ts` |
| Team bios | `src/content/team.ts` (photos in `public/img/team/`) |
| Blog posts | `src/content/blog/*.md` (add a file to add a post) |

**Pool booking:** once Practice Perfect's Client Portal is turned on, paste the portal link into `POOL.bookingUrl` in `site.ts`. The Pool page switches from "Call to book" to a "Book pool time online" button.

## Photos

Real clinic photos live in `public/img`. Free stock photos (CC0/public domain, found through Openverse) live in `public/img/stock` with sources in `CREDITS.md`. Stock is only used for treatments and concepts, never to stand in for the clinic, its staff or its pool.

## Run locally

```bash
npm install
npm run dev
```

## Google reviews

Reviews come from Outscraper. `scripts/fetch-reviews.mjs` saves the rating, review count and up to 9 recent 4–5 star reviews with text to `src/content/reviews.json`. It shortens reviewer names to first name and last initial and never includes the clinic's replies. The **Refresh Google reviews** GitHub Action runs it every Monday and commits any changes, which redeploys the site. It needs an `OUTSCRAPER_API_KEY` repository secret. Until the first run, the reviews section and hero rating stay hidden.

## Deploying

Pushes to the production branch deploy on Vercel automatically. Old Webflow URLs (`/our-team`, `/patient-coverage-and-billing`, `/services/tmj-treatment`, etc.) redirect to their new pages in `next.config.ts`, so existing Google rankings carry over. Search engines are blocked until you set `SITE_LIVE=1` in the Vercel project settings, so do that when the real domain points here.

## History

The earlier standalone pool booking app (Supabase + Stripe) was parked because of HIPAA hosting costs. It's in git history at commit `0129e39`.
