# Fox Valley Physical Therapy website

The public website for Fox Valley Physical Therapy & Wellness Clinic in Oshkosh, WI. It replaces the old Webflow site.

A static Next.js site, hosted on Vercel. There's no database and no forms, so the site never collects patient information.

## Editing content

Use the website editor at **/keystatic** (for example `https://www.foxvalleyphysicaltherapy.com/keystatic`). Sign in, pick a page on the left, change the text, and click **Save**. The site updates about a minute later.

- **Pages:** homepage and every page's wording, including the Google search title and description
- **Services, team & blog:** each service page, team bio (with headshot upload) and blog post
- **Frequently asked questions:** one list, with a "Show on" setting for each question
- **Clinic settings:** phone, fax, email, address, **hours**, areas served, and pool price and booking link

Text fields can use `{poolPrice}`, `{visitsPerWeek}`, `{lastStart}`, `{outBy}`, `{phone}`, `{street}` and `{city}`. They fill in from Clinic settings, so a price or phone change happens in one place.

Content lives in `src/content/data/` (JSON) and `src/content/blog/` (Markdown). Each save is a commit to this repo, so every change can be undone in git.

### Editor setup (one time)

The editor uses [Keystatic Cloud](https://keystatic.cloud), which is free for up to 3 users and doesn't require GitHub accounts for editors.

1. Create a team and project at keystatic.cloud and connect it to this GitHub repo.
2. In Vercel, add `NEXT_PUBLIC_KEYSTATIC_PROJECT` = `your-team/your-project` and redeploy.
3. In Keystatic Cloud, invite Steve and Gina by email.

Running `npm run dev` locally, the editor saves straight to your files with no sign-in.

## Google reviews

Reviews come from Outscraper. `scripts/fetch-reviews.mjs` saves the rating, review count and up to 9 recent 4–5 star reviews with text to `src/content/reviews.json`. It shortens reviewer names to first name and last initial and never includes the clinic's replies. The **Refresh Google reviews** GitHub Action runs it every Monday and commits any changes, which redeploys the site. It needs an `OUTSCRAPER_API_KEY` repository secret. Until the first run, the reviews section and hero rating stay hidden.

## Deploying

Pushes to the production branch deploy on Vercel automatically. Old Webflow URLs (`/our-team`, `/patient-coverage-and-billing`, `/services/tmj-treatment`, etc.) redirect to their new pages in `next.config.ts`, so existing Google rankings carry over. Search engines are blocked until you set `SITE_LIVE=1` in the Vercel project settings, so do that when the real domain points here.

## History

The earlier standalone pool booking app (Supabase + Stripe) was parked because of HIPAA hosting costs. It's in git history at commit `0129e39`.
