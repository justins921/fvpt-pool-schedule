import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CallCta, Checks, HoursTable, PageHead } from "@/components/Blocks";
import Icon from "@/components/Icon";
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

export default async function ServicePage({ params }: Props) {
  const s = serviceBySlug((await params).slug);
  if (!s) notFound();
  const related = (s.related ?? []).map(serviceBySlug).filter(Boolean);

  return (
    <>
      <PageHead title={s.name} lead={s.short} crumbs={[{ href: "/services", label: "Services" }]} />
      <section className="section">
        <div className="wrap detail">
          <div>
            <Image src={s.image} alt="" width={980} height={560} style={{ borderRadius: 22, marginBottom: 32, aspectRatio: "16 / 9", objectFit: "cover" }} priority />
            <p className="lead" style={{ marginBottom: 36 }}>{s.intro}</p>
            {s.sections.map((sec) => (
              <div className="block" key={sec.heading}>
                <h2>{sec.heading}</h2>
                {sec.body && <p>{sec.body}</p>}
                {sec.list && <Checks items={sec.list} cols={sec.list.length > 6} />}
              </div>
            ))}
            {s.slug === "aquatic-therapy" && (
              <Link href="/pool" className="btn btn-primary">Pool access for patients <Icon name="arrow" /></Link>
            )}
          </div>
          <aside>
            <div className="card">
              <h3>Schedule a visit</h3>
              <p>No referral needed. Call and we&apos;ll find a time that works.</p>
              <a href={SITE.phoneHref} className="btn btn-primary" style={{ width: "100%" }}>
                <Icon name="phone" /> {SITE.phone}
              </a>
            </div>
            <div className="card">
              <h3>Clinic hours</h3>
              <HoursTable />
            </div>
            {related.length > 0 && (
              <div className="card">
                <h3>Related services</h3>
                <ul className="checks" style={{ margin: 0 }}>
                  {related.map((r) => (
                    <li key={r!.slug}>
                      <Icon name="arrow" /> <Link href={`/services/${r!.slug}`}>{r!.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </section>
      <CallCta />
    </>
  );
}
