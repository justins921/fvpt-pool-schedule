import type { Metadata } from "next";
import { SITE } from "./site";

export const ORG_ID = `${SITE.url}/#clinic`;
const SUFFIX = " | Fox Valley PT";

// Title, description, canonical, Open Graph and Twitter card for one page.
// Titles get the " | Fox Valley PT" suffix unless that would push them past ~60 characters.
export function pageMeta({ title, description, path, image = "/img/exterior.png", type = "website" }: { title: string; description: string; path: string; image?: string; type?: "website" | "article" }): Metadata {
  const full = title.length + SUFFIX.length <= 62 ? `${title}${SUFFIX}` : title;
  return {
    title: { absolute: full },
    description,
    alternates: { canonical: path },
    openGraph: { type, title: full, description, url: path, siteName: SITE.name, locale: "en_US", images: [{ url: image }] },
    twitter: { card: "summary_large_image", title: full, description, images: [image] },
  };
}

export type Crumb = { href: string; label: string };

export function breadcrumbSchema(crumbs: Crumb[], current: string) {
  const items = [{ href: "/", label: "Home" }, ...crumbs];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      ...items.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.label, item: `${SITE.url}${c.href === "/" ? "" : c.href}` })),
      { "@type": "ListItem", position: items.length + 1, name: current },
    ],
  };
}

export function serviceSchema({ name, description, path, image }: { name: string; description: string; path: string; image: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    serviceType: name,
    description,
    url: `${SITE.url}${path}`,
    image: `${SITE.url}${image}`,
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "City", name: "Oshkosh, WI" },
  };
}

export function articleSchema({ title, description, path, image, date }: { title: string; description: string; path: string; image?: string; date: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    datePublished: date,
    url: `${SITE.url}${path}`,
    mainEntityOfPage: `${SITE.url}${path}`,
    ...(image ? { image: `${SITE.url}${image}` } : {}),
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
  };
}

export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
