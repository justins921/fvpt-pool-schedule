import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Checks, CtaBand, Faq, PhonePill, PhotoHero, faqSchema } from "@/components/Blocks";
import Icon from "@/components/Icon";
import { PAGES } from "@/content/pages";
import { pageMeta } from "@/content/seo";
import { POOL, SITE, fill } from "@/content/site";

const P = PAGES.pool;

export const metadata: Metadata = pageMeta({ title: P.seoTitle, description: fill(P.seoDescription), path: "/pool", image: "/img/pool.jpg" });

export default function Pool() {
  const questions = P.faq.map((f) => ({ q: fill(f.question), a: fill(f.answer) }));
  return (
    <>
      <PhotoHero title={P.heroTitle} text={fill(P.heroText)} image="/img/pool.jpg">
        <div className="btn-row" style={{ justifyContent: "center" }}>
          {POOL.bookingUrl ? <a href={POOL.bookingUrl} className="btn">Book Pool Time Online</a> : <a href={SITE.phoneHref} className="btn">Call {SITE.phone} To Book</a>}
          <Link href="/services/aquatic-therapy" className="btn clear">Aquatic Therapy</Link>
        </div>
      </PhotoHero>

      <section className="section">
        <div className="wrap row">
          <div>
            <p className="kicker">{POOL.monthlyPrice} a month · {POOL.visitsPerWeek} visits a week</p>
            <h2>{P.title}</h2>
            <p>{fill(P.text)}</p>
            <Checks items={P.points.map((t) => fill(t))} />
            {POOL.bookingUrl ? <a href={POOL.bookingUrl} className="btn">Book Pool Time Online</a> : <PhonePill label="Call to book pool time" />}
          </div>
          <Image src="/img/pool.jpg" alt="The therapeutic pool" width={980} height={360} />
        </div>
      </section>

      <section className="section soft">
        <div className="wrap">
          <div className="intro"><h2>{P.tipsTitle}</h2></div>
          <div className="cards">
            {P.tips.map((t) => (
              <div key={t.title} className="card feature">
                <div className="ico"><Icon name={t.icon} /></div>
                <h3>{t.title}</h3>
                <p>{fill(t.text)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="intro"><h2>Frequently Asked Questions</h2></div>
          <Faq items={questions} />
        </div>
      </section>

      <CtaBand title={P.ctaTitle} text={fill(P.ctaText)} image="/img/pool.jpg" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(questions)) }} />
    </>
  );
}
