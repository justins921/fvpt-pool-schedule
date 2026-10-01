import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { SITE, fullAddress } from "@/content/site";
import { ORG_ID } from "@/content/seo";
import { SERVICES } from "@/content/services";
import "./globals.css";

const poppins = Poppins({ subsets: ["latin"], variable: "--font-poppins", weight: ["400", "500", "600", "700"] });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Physical Therapy in Oshkosh, WI | Fox Valley Physical Therapy",
    template: "%s | Fox Valley PT",
  },
  description:
    "One-on-one physical therapy in Oshkosh, WI since 1990, with the only therapeutic pool in town. No referral needed, and most insurance accepted, including Medicare.",
  alternates: { canonical: "/" },
  openGraph: { type: "website", siteName: SITE.name, locale: "en_US", url: "/", images: ["/img/exterior.png"] },
  twitter: { card: "summary_large_image", images: ["/img/exterior.png"] },
  icons: { apple: "/apple-touch-icon.png" },
};

export const viewport: Viewport = { themeColor: "#ffffff" };

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
  areaServed: ["Oshkosh, WI", "Neenah, WI", "Menasha, WI", "Appleton, WI", "Omro, WI", "Winneconne, WI", "Fond du Lac, WI", "Ripon, WI"],
  sameAs: [SITE.mapsUrl],
  isAcceptedPaymentMethod: ["Credit Card", "Health Insurance"],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Physical therapy services",
    itemListElement: SERVICES.map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s.name, url: `${SITE.url}/services/${s.slug}` } })),
  },
  description: `Physical therapy clinic at ${fullAddress}.`,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={poppins.variable}>
      <body>
        <a href="#main" className="skip">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
