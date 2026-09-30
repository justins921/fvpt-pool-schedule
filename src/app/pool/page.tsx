import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Checks, CtaBand, Faq, PhonePill, PhotoHero, faqSchema } from "@/components/Blocks";
import Icon from "@/components/Icon";
import { POOL, SITE } from "@/content/site";

export const metadata: Metadata = {
  title: "Pool Access for Patients",
  description: "Current and former Fox Valley Physical Therapy patients can reserve the only therapeutic pool in Oshkosh for independent exercise.",
  alternates: { canonical: "/pool" },
};

const TIPS = [
  { icon: "water", title: "What To Bring", text: "Your swimsuit and a towel." },
  { icon: "clock", title: "Be On Time", text: "Come at the time you signed up for. Someone may be booked right after you." },
  { icon: "doc", title: "Sign The Waiver", text: "Everyone signs a pool waiver before their first session. Ask the front desk." },
];

const QUESTIONS = [
  { q: "Who can use the pool?", a: "Current and former Fox Valley Physical Therapy patients. The pool isn't open to the general public." },
  { q: "How much does it cost?", a: `${POOL.monthlyPrice} a month for ${POOL.visitsPerWeek} visits a week. Most people book and pay a month at a time.` },
  { q: "When can I book?", a: `Any hour the clinic is open. Sessions are 60 minutes, the last start time is ${POOL.lastStart}, and everyone is out of the pool by ${POOL.outBy}.` },
  { q: "Will anyone else be in the pool?", a: "No. The pool is reserved for one person at a time, so the hour is yours." },
  { q: "I'm not a patient yet. Can I use the pool?", a: "Pool access is for current and former patients. If you're interested in aquatic therapy with one of our therapists, call us to schedule an evaluation." },
];

export default function Pool() {
  return (
    <>
      <PhotoHero title="Pool Access For Patients" text="Keep up your progress in the only therapeutic pool in Oshkosh. Current and former patients can reserve the pool for their own exercise." image="/img/pool.jpg">
        <div className="btn-row" style={{ justifyContent: "center" }}>
          {POOL.bookingUrl ? <a href={POOL.bookingUrl} className="btn">Book Pool Time Online</a> : <a href={SITE.phoneHref} className="btn">Call {SITE.phone} To Book</a>}
          <Link href="/services/aquatic-therapy" className="btn clear">Aquatic Therapy</Link>
        </div>
      </PhotoHero>

      <section className="section">
        <div className="wrap row">
          <div>
            <p className="kicker">{POOL.monthlyPrice} a month · {POOL.visitsPerWeek} visits a week</p>
            <h2>Your Own Hour In The Pool</h2>
            <p>The pool is reserved for one person at a time, so the hour is yours. Most people book a month at a time.</p>
            <Checks
              items={[
                "Open to current and former Fox Valley PT patients",
                "One person per 60-minute session",
                `Book any hour the clinic is open. Last start time is ${POOL.lastStart}, out of the pool by ${POOL.outBy}.`,
                "A signed pool waiver is required before your first swim",
              ]}
            />
            {POOL.bookingUrl ? <a href={POOL.bookingUrl} className="btn">Book Pool Time Online</a> : <PhonePill label="Call to book pool time" />}
          </div>
          <Image src="/img/pool.jpg" alt="The therapeutic pool" width={980} height={360} />
        </div>
      </section>

      <section className="section soft">
        <div className="wrap">
          <div className="intro"><h2>Before Your First Swim</h2></div>
          <div className="cards">
            {TIPS.map((t) => (
              <div key={t.title} className="card feature">
                <div className="ico"><Icon name={t.icon} /></div>
                <h3>{t.title}</h3>
                <p>{t.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="intro"><h2>Frequently Asked Questions</h2></div>
          <Faq items={QUESTIONS} />
        </div>
      </section>

      <CtaBand title="Ready To Book Pool Time?" text="Call the front desk to reserve your hours for the month." image="/img/pool.jpg" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(QUESTIONS)) }} />
    </>
  );
}
