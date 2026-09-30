import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Checks, CtaBand, Faq, PhotoHero, faqSchema } from "@/components/Blocks";
import { FAQ } from "@/content/faq";
import { SERVICES, serviceBySlug } from "@/content/services";
import { SITE } from "@/content/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const s = serviceBySlug((await params).slug);
  if (!s) return {};
  return { title: `${s.name} in Oshkosh, WI`, description: s.metaDescription, alternates: { canonical: `/services/${s.slug}` } };
}

// General questions every service page answers, taken from the site-wide FAQ.
const GENERAL = FAQ.filter((f) => /referral|insurance|how long/i.test(f.q));

export default async function ServicePage({ params }: Props) {
  const s = serviceBySlug((await params).slug);
  if (!s) notFound();
  const related = (s.related ?? []).map(serviceBySlug).filter((r) => r !== undefined);
  const faq = [...(s.faq ?? []), ...GENERAL];

  return (
    <>
      <PhotoHero title={`${s.name} In Oshkosh`} text={s.short} image={s.image} crumbs={[{ href: "/services", label: "Services" }]}>
        <div className="btn-row" style={{ justifyContent: "center" }}>
          <a href={SITE.phoneHref} className="btn">Call {SITE.phone}</a>
          <Link href="/new-patients" className="btn clear">New Patients</Link>
        </div>
      </PhotoHero>

      <section className="section">
        <div className="wrap about">
          <div className="center">
            <h2>About {s.name}</h2>
          </div>
          <p className="lead">{s.intro}</p>
          {s.sections.map((sec) => (
            <div className="block" key={sec.heading}>
              <h2>{sec.heading}</h2>
              {sec.body && <p>{sec.body}</p>}
              {sec.list && <Checks items={sec.list} cols={sec.list.length > 6} />}
            </div>
          ))}
          {s.slug === "aquatic-therapy" && (
            <p style={{ marginTop: 28 }}><Link href="/pool" className="btn">Pool Access For Patients</Link></p>
          )}
        </div>
      </section>

      {related.length > 0 && (
        <section className="section soft">
          <div className="wrap">
            <div className="intro"><h2>Related Services</h2></div>
            <div className="svc-grid">
              {related.map((r) => (
                <div key={r.slug} className="svc">
                  <Image src={r.image} alt="" width={560} height={350} />
                  <div className="body">
                    <h3>{r.name}</h3>
                    <p>{r.short}</p>
                    <Link href={`/services/${r.slug}`} className="btn">Learn More</Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section">
        <div className="wrap">
          <div className="intro"><h2>Frequently Asked Questions</h2></div>
          <Faq items={faq} />
        </div>
      </section>

      <CtaBand title={`Interested In ${s.name}?`} text="Call our Oshkosh clinic to schedule. You don't need a referral, and we accept most insurance, including Medicare." image={s.image} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faq)) }} />
    </>
  );
}
