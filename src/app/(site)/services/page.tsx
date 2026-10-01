import type { Metadata } from "next";
import { pageMeta } from "@/content/seo";
import Image from "next/image";
import Link from "next/link";
import { ContactCard, HeroButtons, PhotoHero } from "@/components/Blocks";
import { PAGES } from "@/content/pages";

import { SERVICES } from "@/content/collections";

const P = PAGES.services;

export const metadata: Metadata = pageMeta({ title: P.seoTitle, description: P.seoDescription, path: "/services", image: "/img/therapy-1.jpg" });

export default function Services() {
  return (
    <>
      <PhotoHero title={P.heroTitle} text={P.heroText} image="/img/therapy-1.jpg">
        <HeroButtons secondary={{ href: "/new-patients", label: "New Patients" }} />
      </PhotoHero>
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
