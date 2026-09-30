import type { Metadata } from "next";
import Image from "next/image";
import { PageHead, PhotoCta } from "@/components/Blocks";
import { TEAM } from "@/content/team";

export const metadata: Metadata = {
  title: "Our Team",
  description: "Meet the physical therapists, occupational therapist, athletic trainer and staff at Fox Valley Physical Therapy & Wellness Clinic in Oshkosh, WI.",
  alternates: { canonical: "/team" },
};

export default function Team() {
  return (
    <>
      <PageHead
        title="Our Team, Our Family"
        text="Therapy isn't just our profession, it's our passion. Our clinical team has more than 100 years of combined experience, and our office staff can answer any billing, insurance or scheduling question."
      />
      <section className="section">
        <div className="wrap people">
          {TEAM.map((m) => (
            <a key={m.slug} href={`#${m.slug}`} className="person">
              <Image src={m.photo} alt={m.name} width={320} height={320} />
              <h2 style={{ fontSize: "1.25rem", margin: 0 }}>{m.name}</h2>
              <p>{[m.credentials, m.role].filter(Boolean).join(", ")}</p>
            </a>
          ))}
        </div>
      </section>
      <section className="section white">
        <div className="wrap">
          {TEAM.map((m) => (
            <article key={m.slug} id={m.slug} className="bio">
              <Image src={m.photo} alt="" width={440} height={440} />
              <div>
                <h2>{m.name}{m.credentials && `, ${m.credentials}`}</h2>
                <p className="sub" style={{ margin: "4px 0 14px" }}>{m.role}</p>
                <p>{m.about}</p>
                <dl>
                  {m.education && (
                    <div>
                      <dt>Education</dt>
                      <dd><ul>{m.education.map((e) => <li key={e}>{e}</li>)}</ul></dd>
                    </div>
                  )}
                  {m.interests && (
                    <div>
                      <dt>Areas of Interest</dt>
                      <dd>{m.interests}</dd>
                    </div>
                  )}
                  {m.certifications && (
                    <div>
                      <dt>Certifications</dt>
                      <dd>{m.certifications.join(", ")}</dd>
                    </div>
                  )}
                </dl>
              </div>
            </article>
          ))}
        </div>
      </section>
      <PhotoCta />
    </>
  );
}
