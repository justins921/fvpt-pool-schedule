// Pulls the clinic's Google reviews through Outscraper and saves them to src/content/reviews.json.
// Run: OUTSCRAPER_API_KEY=... node scripts/fetch-reviews.mjs
// A GitHub Action runs this weekly (.github/workflows/reviews.yml).

import fs from "node:fs";

const PLACE_ID = "ChIJYXRbTc3uA4gRtZDvLWHXjLc"; // Fox Valley Physical Therapy & Wellness Clinic on Google Maps
const OUT = new URL("../src/content/reviews.json", import.meta.url);
const SHOW = 9; // reviews displayed on the site

// Reviews we never republish, by the name as shown on the site (first name, last initial).
// Use this for reviews that name or describe someone other than the reviewer.
const HIDE = ["Katherine D."];

// Staff who no longer work at the clinic. Reviews that name them are skipped so the
// site never praises someone patients can't book with. Add names here when people leave.
const FORMER_STAFF = ["Jordan", "Kasper", "Courtney", "Disterhaft", "Baumann", "Jensen", "Pearson", "Deborah", "Debbie", "Tomasi", "Josie", "Arneson", "Lucie", "Nezbed", "Patti"];
// Staff named in reviews who aren't on the website. Hidden until the clinic confirms they still work there.
const UNCONFIRMED_STAFF = ["Preston"];
const mentionsFormerStaff = (text) => [...FORMER_STAFF, ...UNCONFIRMED_STAFF].some((n) => new RegExp(`\\b${n}\\b`, "i").test(text));

const key = process.env.OUTSCRAPER_API_KEY;
if (!key) {
  console.error("Set OUTSCRAPER_API_KEY");
  process.exit(1);
}

const url = new URL("https://api.app.outscraper.com/maps/reviews-v3");
url.search = new URLSearchParams({ query: PLACE_ID, reviewsLimit: "60", sort: "newest", language: "en", async: "false" }).toString();

const res = await fetch(url, { headers: { "X-API-KEY": key } });
if (!res.ok) {
  console.error(`Outscraper returned ${res.status}: ${await res.text()}`);
  process.exit(1);
}
const body = await res.json();
const place = body?.data?.[0];
if (!place || typeof place.rating !== "number") {
  console.error("Unexpected Outscraper response:", JSON.stringify(body).slice(0, 500));
  process.exit(1);
}

const clean = (t) => String(t ?? "").replace(/\s+/g, " ").trim();
// Keep paragraph breaks (Outscraper sends them as <br>) but drop any other markup.
const cleanText = (t) =>
  String(t ?? "")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .split(/\n+/)
    .map(clean)
    .filter(Boolean)
    .join("\n");
// Show only the reviewer's first name and last initial, and never the owner's reply
// (a reply can confirm someone was treated here).
// Google display names that don't shorten into a real-looking name.
const NAME_OVERRIDES = { "It's M.": "Google reviewer" };
const displayName = (n) => NAME_OVERRIDES[shortName(n)] ?? shortName(n);
const shortName = (n) => {
  const parts = clean(n).split(" ").filter(Boolean);
  return parts.length > 1 ? `${parts[0]} ${parts[parts.length - 1][0]}.` : parts[0] || "Google reviewer";
};

const reviews = (place.reviews_data ?? [])
  .filter((r) => r.review_rating >= 4 && cleanText(r.review_text).length >= 40)
  .filter((r) => !HIDE.includes(shortName(r.author_title)))
  .filter((r) => !mentionsFormerStaff(cleanText(r.review_text)))
  .slice(0, SHOW)
  .map((r) => ({
    author: displayName(r.author_title),
    rating: r.review_rating,
    text: cleanText(r.review_text),
    date: r.review_datetime_utc ? new Date(r.review_datetime_utc).toISOString().slice(0, 10) : null,
  }));

const data = { updated: new Date().toISOString().slice(0, 10), rating: place.rating, count: place.reviews, reviews };
const prev = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, "utf8")) : {};
// Don't churn the file (and trigger a redeploy) when only the date changed.
if (JSON.stringify({ ...prev, updated: null }) === JSON.stringify({ ...data, updated: null })) {
  console.log("No changes");
} else {
  fs.writeFileSync(OUT, JSON.stringify(data, null, 2) + "\n");
  console.log(`Saved rating ${data.rating} (${data.count} reviews), ${reviews.length} shown`);
}
