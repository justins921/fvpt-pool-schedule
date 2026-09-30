import Link from "next/link";
import { PageHead } from "@/components/Blocks";

export default function NotFound() {
  return (
    <>
      <PageHead title="Page not found" lead="That page may have moved when we updated our website." />
      <section className="section">
        <div className="wrap btn-row">
          <Link href="/" className="btn btn-primary">Go to the homepage</Link>
          <Link href="/services" className="btn btn-ghost">Browse services</Link>
        </div>
      </section>
    </>
  );
}
