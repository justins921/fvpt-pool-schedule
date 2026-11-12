import type { MetadataRoute } from "next";
import { SITE } from "@/content/site";

export default function robots(): MetadataRoute.Robots {
  // The site is live on the real domain (launched Nov 4, 2026). The old SITE_LIVE
  // env gate was never flipped in Vercel, which left production serving
  // "Disallow: /" to every crawler. Gate removed Nov 12, 2026: always permissive.
  return { rules: { userAgent: "*", allow: "/", disallow: ["/keystatic", "/api/"] }, sitemap: `${SITE.url}/sitemap.xml` };
}
