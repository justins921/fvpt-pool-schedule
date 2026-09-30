import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CallCta, PageHead } from "@/components/Blocks";
import Icon from "@/components/Icon";
import { SERVICES } from "@/content/services";

export const metadata: Metadata = {
  title: "Services",
  description: "Physical therapy, occupational and hand therapy, aquatic therapy, dry needling, sports medicine, vertigo treatment, pediatrics and more in Oshkosh, WI.",
  alternates: { canonical: "/services" },
};

export default function Services() {
  return (
    <>
      <PageHead title="Our services" lead="Everything from post-surgery rehab to vertigo to sports injuries, with one-on-one care from start to finish." />
      <section className="section">
        <div className="wrap grid grid-3">
          {SERVICES.map((s) => (
            <Link key={s.slug} href={`/services/${s.slug}`} className="card card-img">
              <Image src={s.image} alt="" width={640} height={400} />
              <div className="card-body">
                <h2 style={{ fontSize: "1.3rem", fontFamily: "inherit", fontWeight: 700 }}>{s.name}</h2>
                <p>{s.short}</p>
                <span className="more">Learn more <Icon name="arrow" /></span>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <CallCta />
    </>
  );
}
