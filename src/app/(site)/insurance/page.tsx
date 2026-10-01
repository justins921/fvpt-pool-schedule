import type { Metadata } from "next";
import Image from "next/image";
import { Checks, CtaBand, Faq, HeroButtons, PhotoHero, faqSchema } from "@/components/Blocks";
import Icon from "@/components/Icon";
import { faqFor } from "@/content/faq";
import { PAGES } from "@/content/pages";
import { pageMeta } from "@/content/seo";
import { SITE, fill } from "@/content/site";

const P = PAGES.insurance;

export const metadata: Metadata = pageMeta({ title: P.seoTitle, description: fill(P.seoDescription), path: "/insurance", image: "/img/staff-group.jpg" });

const PLANS = [
  ["aetna.png", "Aetna"], ["bcbs.png", "Blue Cross Blue Shield"], ["cigna.png", "Cigna"], ["healthpartners.png", "HealthPartners"],
  ["hps.png", "Health Payment Systems"], ["humana.png", "Humana"], ["icare.png", "iCare"], ["medicare.png", "Medicare"],
  ["network-health.png", "Network Health"], ["tricare.png", "Tricare"], ["umr.png", "UMR"], ["uhc.png", "UnitedHealthcare"],
  ["va.png", "U.S. Department of Veterans Affairs"], ["wps.png", "WPS Health Insurance"],
];

const QUESTIONS = faqFor("insurance");

export default function Insurance() {
  const footer = fill(P.benefitsFooter).split(SITE.phone);
  return (
    <>
      <PhotoHero title={P.heroTitle} text={fill(P.heroText)} image="/img/staff-group.jpg">
        <HeroButtons secondary={{ href: "/new-patients", label: "New Patients" }} />
      </PhotoHero>

      <section className="section">
        <div className="wrap">
          <div className="intro">
            <p className="kicker">{P.plansKicker}</p>
            <h2>{P.plansTitle}</h2>
            <p>{fill(P.plansText)}</p>
          </div>
          <div className="logos">
            {PLANS.map(([file, name]) => (
              <div key={file}><Image src={`/img/insurance/${file}`} alt={name} width={160} height={52} /></div>
            ))}
          </div>
        </div>
      </section>

      <section className="section soft">
        <div className="wrap cards">
          {P.options.map((o) => (
            <div key={o.title} className="card feature">
              <div className="ico"><Icon name={o.icon} /></div>
              <h3>{o.title}</h3>
              <p>{fill(o.text)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="wrap two-col" style={{ marginBottom: 0 }}>
          <div>
            <p className="kicker">{P.benefitsKicker}</p>
            <h2>{P.benefitsTitle}</h2>
          </div>
          <div>
            <p style={{ marginBottom: 18 }}>{fill(P.benefitsText)}</p>
            <Checks items={P.benefitsPoints.map((t) => fill(t))} />
            <p>
              {footer.map((part, i) => (
                <span key={i}>
                  {part}
                  {i < footer.length - 1 && <a href={SITE.phoneHref}>{SITE.phone}</a>}
                </span>
              ))}
            </p>
          </div>
        </div>
      </section>

      <section className="section soft">
        <div className="wrap">
          <div className="intro"><h2>{P.faqTitle}</h2></div>
          <Faq items={QUESTIONS} />
        </div>
      </section>

      <CtaBand title={P.ctaTitle} text={fill(P.ctaText)} image="/img/exterior.png" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(QUESTIONS)) }} />
    </>
  );
}
