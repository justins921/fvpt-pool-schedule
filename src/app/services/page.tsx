import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHead, PhotoCta } from "@/components/Blocks";
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
      <section className="section">
        <div className="wrap tiles">
          {SERVICES.map((s) => (
            <Link key={s.slug} href={`/services/${s.slug}`} className="tile">
              <Image src={s.image} alt="" width={560} height={350} />
              <h2 style={{ fontSize: "1.35rem", margin: 0 }}>{s.name}</h2>
              <p>{s.short}</p>
            </Link>
          ))}
        </div>
      </section>
      <PhotoCta />
    </>
  );
}
