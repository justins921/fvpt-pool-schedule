import type { Metadata } from "next";
import { pageMeta } from "@/content/seo";
import { CtaBand, HeroButtons, PhotoHero } from "@/components/Blocks";
import Headshot from "@/components/Person";
import { TEAM } from "@/content/collections";
import { JsonLd, ORG_ID } from "@/content/seo";
import { SITE, fill } from "@/content/site";
import { PAGES } from "@/content/pages";

const P = PAGES.team;

// Turns **bold** in editable text into <strong>.
const rich = (t: string) => fill(t).split(/(\*\*[^*]+\*\*)/).map((part, i) => (part.startsWith("**") ? <strong key={i}>{part.slice(2, -2)}</strong> : part));

export const metadata: Metadata = pageMeta({ title: P.seoTitle, description: fill(P.seoDescription), path: "/team", image: "/img/staff-group.jpg" });

export default function Team() {
  return (
    <>
      <PhotoHero title={P.heroTitle} text={fill(P.heroText)} image="/img/staff-group.jpg">
        <HeroButtons secondary={{ href: "/new-patients", label: "New Patients" }} />
      </PhotoHero>

      <section className="section">
        <div className="wrap">
          <div className="intro">
            <h2>{P.introTitle}</h2>
            <p>{fill(P.introText)}</p>
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
          <h2>{P.promiseTitle}</h2>
          <p>{rich(P.promiseText)}</p>
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
      <CtaBand title={P.ctaTitle} text={fill(P.ctaText)} image="/img/exterior.png" />
    </>
  );
}
