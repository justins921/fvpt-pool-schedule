import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Checks, CtaBand, Faq, PhotoHero, faqSchema } from "@/components/Blocks";
import Icon from "@/components/Icon";
import { faqFor } from "@/content/faq";
import { PAGES } from "@/content/pages";
import { pageMeta } from "@/content/seo";
import { SITE, fill } from "@/content/site";

const P = PAGES.newPatients;

export const metadata: Metadata = pageMeta({ title: P.seoTitle, description: fill(P.seoDescription), path: "/new-patients", image: "/img/patient-treated.jpg" });

const QUESTIONS = faqFor("new-patients");

export default function NewPatients() {
  return (
    <>
      <PhotoHero title={P.heroTitle} text={fill(P.heroText)} image="/img/patient-treated.jpg">
        <div className="btn-row" style={{ justifyContent: "center" }}>
          <a href={SITE.phoneHref} className="btn">Call {SITE.phone}</a>
          <a href={SITE.intakeForm} className="btn clear">Download Intake Form</a>
        </div>
      </PhotoHero>

      <section className="section">
        <div className="wrap">
          <div className="intro">
            <p className="kicker">{P.stepsKicker}</p>
            <h2>{P.stepsTitle}</h2>
          </div>
          <div className="cards four">
            {P.steps.map((s, i) => (
              <div key={s.title} className="card feature">
                <div className="ico"><Icon name={s.icon} /></div>
                <p className="kicker" style={{ marginBottom: 4 }}>Step {i + 1}</p>
                <h3>{s.title}</h3>
                <p>{fill(s.text)}</p>
              </div>
            ))}
          </div>
          <div className="download" style={{ marginTop: 32 }}>
            <div className="ico"><Icon name="doc" /></div>
            <div>
              <h3>{P.formTitle}</h3>
              <p>{fill(P.formText)}</p>
            </div>
            <a href={SITE.intakeForm} className="btn" download>Download PDF</a>
          </div>
        </div>
      </section>

      <section className="section soft">
        <div className="wrap row">
          <Image src="/img/therapy-shoulder.jpg" alt="A therapist examining a patient's shoulder" width={1024} height={935} />
          <div>
            <p className="kicker">{P.evalKicker}</p>
            <h2>{P.evalTitle}</h2>
            <Checks items={P.evalPoints.map((t) => fill(t))} />
            <p>{fill(P.evalText)}</p>
            <Link href="/insurance" className="btn ghost">Insurance & Billing</Link>
          </div>
        </div>
      </section>

      <section className="section">
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
