import type { Metadata } from "next";
import Image from "next/image";
import { ContactCard, PageHead } from "@/components/Blocks";
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
      <section className="section soft">
        <div className="wrap people">
          {TEAM.map((m) => (
            <a key={m.slug} href={`#${m.slug}`} className="person">
              <Image src={m.photo} alt={m.name} width={320} height={320} />
              <div>
                <h2 style={{ fontSize: ".98rem", margin: 0 }}>{m.name}</h2>
                <p>{[m.credentials, m.role].filter(Boolean).join(", ")}</p>
              </div>
            </a>
          ))}
        </div>
      </section>
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          {TEAM.map((m) => (
            <article key={m.slug} id={m.slug} className="bio">
              <Image src={m.photo} alt="" width={440} height={440} />
              <div>
                <h2>{m.name}{m.credentials && `, ${m.credentials}`}</h2>
                <p className="role">{m.role}</p>
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
      <ContactCard />
    </>
  );
}
