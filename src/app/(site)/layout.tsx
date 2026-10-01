import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { SERVICES } from "@/content/collections";
import { buildNav } from "@/content/nav";
import { ORG_ID } from "@/content/seo";
import { AREAS, SITE, fullAddress } from "@/content/site";
import "../globals.css";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Physiotherapy",
  "@id": ORG_ID,
  name: SITE.name,
  alternateName: "Fox Valley PT",
  url: SITE.url,
  telephone: "+1-920-235-8966",
  faxNumber: "+1-920-235-1526",
  email: SITE.email,
  image: `${SITE.url}/img/exterior.png`,
  logo: `${SITE.url}/img/logo.png`,
  foundingDate: String(SITE.founded),
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE.address.street,
    addressLocality: SITE.address.city,
    addressRegion: SITE.address.state,
    postalCode: SITE.address.zip,
    addressCountry: "US",
  },
  hasMap: SITE.mapsUrl,
  openingHoursSpecification: SITE.hours
    .filter((h) => h.opens)
    .map((h) => ({ "@type": "OpeningHoursSpecification", dayOfWeek: h.schema, opens: h.opens, closes: h.closes })),
  areaServed: AREAS,
  sameAs: [SITE.mapsUrl],
  isAcceptedPaymentMethod: ["Credit Card", "Health Insurance"],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Physical therapy services",
    itemListElement: SERVICES.map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s.name, url: `${SITE.url}/services/${s.slug}` } })),
  },
  description: `Physical therapy clinic at ${fullAddress}.`,
};

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a href="#main" className="skip">
        Skip to content
      </a>
      <Header nav={buildNav(SERVICES)} />
      <main id="main">{children}</main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
