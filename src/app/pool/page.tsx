import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Checks, PageHead } from "@/components/Blocks";
import Icon from "@/components/Icon";
import { POOL, SITE } from "@/content/site";

export const metadata: Metadata = {
  title: "Pool Access for Patients",
  description: "Current and former Fox Valley Physical Therapy patients can reserve the only therapeutic pool in Oshkosh for independent exercise.",
  alternates: { canonical: "/pool" },
};

export default function Pool() {
  const online = Boolean(POOL.bookingUrl);
  return (
    <>
      <PageHead
        title="Pool access for patients"
        lead="Keep up your progress in the only therapeutic pool in Oshkosh. Current and former patients can reserve the pool for their own exercise."
      />
      <section className="section">
        <div className="wrap split">
          <div>
            <span className="eyebrow">How it works</span>
            <h2>Your own hour in the pool</h2>
            <p>
              The pool is reserved for one person at a time, so the hour is yours. Most people book a month at a time and come twice a week.
            </p>
            <Checks
              items={[
                "Open to current and former Fox Valley PT patients",
                `${POOL.monthlyPrice} a month for ${POOL.visitsPerWeek} visits a week`,
                "One person per 60-minute session",
                `Book any hour the clinic is open. Last start time is ${POOL.lastStart}, out of the pool by ${POOL.outBy}.`,
                "A signed pool waiver is required before your first swim",
              ]}
            />
            <div className="btn-row">
              {online ? (
                <a href={POOL.bookingUrl} className="btn btn-primary">
                  <Icon name="calendar" /> Book pool time online
                </a>
              ) : (
                <a href={SITE.phoneHref} className="btn btn-primary">
                  <Icon name="phone" /> Call {SITE.phone} to book
                </a>
              )}
            </div>
          </div>
          <Image src="/img/pool.jpg" alt="The therapeutic pool" width={980} height={360} style={{ aspectRatio: "4 / 3" }} />
        </div>
      </section>
      <section className="section soft">
        <div className="wrap grid grid-3">
          <div className="card">
            <div className="icon-chip"><Icon name="water" /></div>
            <h3>What to bring</h3>
            <p>Your swimsuit and a towel.</p>
          </div>
          <div className="card">
            <div className="icon-chip"><Icon name="clock" /></div>
            <h3>Be on time</h3>
            <p>Come at the time you signed up for. Someone may be booked right after you.</p>
          </div>
          <div className="card">
            <div className="icon-chip"><Icon name="doc" /></div>
            <h3>Sign the waiver</h3>
            <p>Everyone signs a pool waiver before their first session. Ask the front desk.</p>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          <div className="notice">
            <strong>Not a patient yet?</strong> Pool access is for current and former patients. If you&apos;re interested in aquatic therapy with one of our therapists, see{" "}
            <Link href="/services/aquatic-therapy">Aquatic Therapy</Link> or call us at <a href={SITE.phoneHref}>{SITE.phone}</a>.
          </div>
        </div>
      </section>
    </>
  );
}
