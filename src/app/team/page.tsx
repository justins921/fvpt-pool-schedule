import type { Metadata } from "next";
import Image from "next/image";
import { CallCta, PageHead } from "@/components/Blocks";
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
        title="Our team, our family"
        lead="Our clinical team has more than 100 years of combined experience. Our therapists and athletic trainer work with the office staff to make sure you get the appointments you need, and the office staff can answer any billing, insurance or scheduling question."
      />
      <section className="section" style={{ paddingBottom: 32 }}>
        <div className="wrap grid grid-4">
          {TEAM.map((m) => (
            <a key={m.slug} href={`#${m.slug}`} className="card team-card">
              <Image src={m.photo} alt={m.name} width={264} height={264} />
              <h2 style={{ fontSize: "1.08rem", fontFamily: "inherit", fontWeight: 700, marginBottom: 2 }}>{m.name}</h2>
              <p className="role">{[m.credentials, m.role].filter(Boolean).join(" · ")}</p>
            </a>
          ))}
        </div>
      </section>
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          {TEAM.map((m) => (
            <article key={m.slug} id={m.slug} className="bio">
              <Image src={m.photo} alt="" width={400} height={400} />
              <div>
                <h2>
                  {m.name}
                  {m.credentials && `, ${m.credentials}`}
                </h2>
                <p className="role">{m.role}</p>
                <p>{m.about}</p>
                <dl>
                  {m.education && (
                    <div>
                      <dt>Education</dt>
                      <dd>
                        <ul>{m.education.map((e) => <li key={e}>{e}</li>)}</ul>
                      </dd>
                    </div>
                  )}
                  {m.interests && (
                    <div>
                      <dt>Areas of interest</dt>
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
      <CallCta />
    </>
  );
}
