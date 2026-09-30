import type { MetadataRoute } from "next";
import { getPosts } from "@/content/blog";
import { SERVICES } from "@/content/services";
import { SITE } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/services", "/pool", "/team", "/new-patients", "/insurance", "/blog", "/contact", "/legal/privacy-policy", "/legal/non-discrimination"];
  return [
    ...pages.map((p) => ({ url: `${SITE.url}${p}`, priority: p === "" ? 1 : 0.7 })),
    ...SERVICES.map((s) => ({ url: `${SITE.url}/services/${s.slug}`, priority: 0.8 })),
    ...getPosts().map((p) => ({ url: `${SITE.url}/blog/${p.slug}`, lastModified: p.date, priority: 0.5 })),
  ];
}
