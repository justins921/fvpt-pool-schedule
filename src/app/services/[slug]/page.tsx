import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CallBox, Checks, HoursTable, PageHead, PhotoCta } from "@/components/Blocks";
import { SERVICES, serviceBySlug } from "@/content/services";

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
  const related = (s.related ?? []).map(serviceBySlug).filter((r) => r !== undefined);

  return (
    <>
      <PageHead title={`${s.name} In Oshkosh`} text={s.short} crumbs={[{ href: "/services", label: "Services" }]} />
      <section className="section">
        <div className="wrap detail">
          <div>
            <Image className="lead-img" src={s.image} alt="" width={980} height={560} priority />
            <p style={{ fontSize: "1.1rem" }}>{s.intro}</p>
            {s.sections.map((sec) => (
              <div className="block" key={sec.heading}>
                <h2>{sec.heading}</h2>
                {sec.body && <p>{sec.body}</p>}
                {sec.list && <Checks items={sec.list} cols={sec.list.length > 6} />}
              </div>
            ))}
            {s.slug === "aquatic-therapy" && (
              <p style={{ marginTop: 24 }}>
                <Link href="/pool" className="btn">Pool Access For Patients</Link>
              </p>
            )}
          </div>
          <aside>
            <div className="card">
              <h3>Schedule A Visit</h3>
              <p>No referral needed. Call and we&apos;ll find a time that works.</p>
              <CallBox label="Call Now" note="Most insurance accepted" />
            </div>
            <div className="card">
              <h3>Clinic Hours</h3>
              <HoursTable />
            </div>
            {related.length > 0 && (
              <div className="card">
                <h3>Related Services</h3>
                <ul style={{ margin: 0, paddingLeft: "1.1em" }}>
                  {related.map((r) => (
                    <li key={r.slug}><Link href={`/services/${r.slug}`}>{r.name}</Link></li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </section>
      <PhotoCta />
    </>
  );
}
