import type { Metadata } from "next";
import { pageMeta } from "@/content/seo";
import { CtaBand, HeroButtons, PhotoHero } from "@/components/Blocks";
import Headshot from "@/components/Person";
import { TEAM } from "@/content/team";
import { JsonLd, ORG_ID } from "@/content/seo";
import { SITE } from "@/content/site";

export const metadata: Metadata = pageMeta({
  title: "Meet Our Physical Therapists",
  description: "Meet the physical therapists, occupational therapist, athletic trainer and staff at Fox Valley Physical Therapy & Wellness Clinic in Oshkosh, WI.",
  path: "/team",
  image: "/img/staff-group.jpg",
});

export default function Team() {
  return (
    <>
      <PhotoHero title="Meet Our Team" text="Physical therapists, an occupational therapist, a physical therapist assistant, a licensed athletic trainer and the office staff who keep it all running." image="/img/staff-group.jpg">
        <HeroButtons secondary={{ href: "/new-patients", label: "New Patients" }} />
      </PhotoHero>

      <section className="section">
        <div className="wrap">
          <div className="intro">
            <h2>Our Team, Our Family</h2>
            <p>We work together with you for the best outcome, and we try to make rehab effective and fun in a professional but relaxed setting. Our office staff is here for any billing, insurance or scheduling question.</p>
          </div>
          <div className="staff">
            {TEAM.map((m) => (
              <a key={m.slug} href={`#${m.slug}`} className="staff-card">
                <div className="frame"><Headshot m={m} size={400} /></div>
                <h3>{m.name}</h3>
                <p>{[m.credentials, m.role].filter(Boolean).join(", ")}</p>
                <span className="more">Learn More →</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section soft">
        <div className="wrap promise">
          <h2>Our Promise</h2>
          <p>
            Therapy isn&apos;t just our profession, it&apos;s our <strong>passion</strong>. At every appointment you get <strong>hands-on, one-on-one</strong> attention from your therapist. We find what&apos;s causing the problem, treat it, and <strong>teach you</strong> how to keep it from coming back.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          {TEAM.map((m) => (
            <article key={m.slug} id={m.slug} className="bio">
              <div className="staff-card" style={{ pointerEvents: "none" }}>
                <div className="frame"><Headshot m={m} size={440} /></div>
              </div>
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

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Fox Valley Physical Therapy staff",
          itemListElement: TEAM.map((m, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: {
              "@type": "Person",
              name: m.name,
              jobTitle: m.role,
              ...(m.credentials ? { honorificSuffix: m.credentials } : {}),
              ...(m.photo ? { image: `${SITE.url}${m.photo}` } : {}),
              url: `${SITE.url}/team#${m.slug}`,
              worksFor: { "@id": ORG_ID },
            },
          })),
        }}
      />
      <CtaBand title="Ready To Work With Our Team?" text="Call our Oshkosh clinic to schedule. You don't need a referral, and we accept most insurance, including Medicare." image="/img/exterior.png" />
    </>
  );
}
