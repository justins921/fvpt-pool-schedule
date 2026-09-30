import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ContactCard, PageHead } from "@/components/Blocks";
import { SERVICES } from "@/content/services";

export const metadata: Metadata = {
  title: "Services",
  description: "Physical therapy, occupational and hand therapy, aquatic therapy, dry needling, sports medicine, vertigo treatment, pediatrics and more in Oshkosh, WI.",
  alternates: { canonical: "/services" },
};

export default function Services() {
  return (
    <>
      <PageHead title="Our Services" text="Everything from rehab after surgery to vertigo to sports injuries, with one-on-one care from start to finish." />
      <section className="section soft">
        <div className="wrap svc-grid">
          {SERVICES.map((s) => (
            <div key={s.slug} className="svc">
              <Image src={s.image} alt="" width={560} height={350} />
              <div className="body">
                <h2 style={{ fontSize: "1.15rem", marginBottom: 6 }}>{s.name}</h2>
                <p>{s.short}</p>
                <Link href={`/services/${s.slug}`} className="btn">Learn More</Link>
              </div>
            </div>
          ))}
        </div>
      </section>
      <ContactCard />
    </>
  );
}
