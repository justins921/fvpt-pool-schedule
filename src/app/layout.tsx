import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import { PAGES } from "@/content/pages";
import { SITE } from "@/content/site";

const poppins = Poppins({ subsets: ["latin"], variable: "--font-poppins", weight: ["400", "500", "600", "700"] });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: PAGES.home.seoTitle,
    template: "%s | Fox Valley PT",
  },
  description: PAGES.home.seoDescription,
  alternates: { canonical: "/" },
  openGraph: { type: "website", siteName: SITE.name, locale: "en_US", url: "/", images: ["/img/exterior.png"] },
  twitter: { card: "summary_large_image", images: ["/img/exterior.png"] },
  icons: { apple: "/apple-touch-icon.png" },
};

export const viewport: Viewport = { themeColor: "#ffffff" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={poppins.variable}>
      <body>{children}</body>
    </html>
  );
}
