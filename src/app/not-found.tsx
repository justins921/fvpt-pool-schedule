import Link from "next/link";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { PageHead } from "@/components/Blocks";
import { SERVICES } from "@/content/collections";
import { buildNav } from "@/content/nav";
import "./globals.css";

export default function NotFound() {
  return (
    <>
      <Header nav={buildNav(SERVICES)} />
      <main id="main">
        <PageHead title="Page not found" text="That page may have moved when we updated our website." />
        <section className="section">
          <div className="wrap btn-row">
            <Link href="/" className="btn">Go to the homepage</Link>
            <Link href="/services" className="btn ghost">Browse services</Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
