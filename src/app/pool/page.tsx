import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CallBox, Checks, PageHead } from "@/components/Blocks";
import { POOL, SITE } from "@/content/site";

export const metadata: Metadata = {
  title: "Pool Access for Patients",
  description: "Current and former Fox Valley Physical Therapy patients can reserve the only therapeutic pool in Oshkosh for independent exercise.",
  alternates: { canonical: "/pool" },
};

export default function Pool() {
  return (
    <>
      <PageHead
        title="Pool Access For Patients"
        text="Keep up your progress in the only therapeutic pool in Oshkosh. Current and former patients can reserve the pool for their own exercise."
      />
      <section className="section">
        <div className="wrap">
          <div className="row">
            <div>
              <h2>Your Own Hour In The Pool</h2>
              <p className="sub">{POOL.monthlyPrice} a month, {POOL.visitsPerWeek} visits a week</p>
              <p>The pool is reserved for one person at a time, so the hour is yours. Most people book a month at a time.</p>
              <Checks
                items={[
                  "Open to current and former Fox Valley PT patients",
                  "One person per 60-minute session",
                  `Book any hour the clinic is open. Last start time is ${POOL.lastStart}, out of the pool by ${POOL.outBy}.`,
                  "A signed pool waiver is required before your first swim",
                ]}
              />
              {POOL.bookingUrl ? (
                <a href={POOL.bookingUrl} className="btn">Book Pool Time Online</a>
              ) : (
                <CallBox label="Book Pool Time" note="Call the front desk" />
              )}
            </div>
            <Image src="/img/pool.jpg" alt="The therapeutic pool" width={980} height={360} />
          </div>
        </div>
      </section>
      <section className="section">
        <div className="wrap cards">
          <div className="card">
            <h3>What To Bring</h3>
            <p>Your swimsuit and a towel.</p>
          </div>
          <div className="card">
            <h3>Be On Time</h3>
            <p>Come at the time you signed up for. Someone may be booked right after you.</p>
          </div>
          <div className="card">
            <h3>Sign The Waiver</h3>
            <p>Everyone signs a pool waiver before their first session. Ask the front desk.</p>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          <div className="notice">
            <strong>Not a patient yet?</strong> Pool access is for current and former patients. If you&apos;re interested in aquatic therapy with one of our therapists, see <Link href="/services/aquatic-therapy">Aquatic Therapy</Link> or call us at <a href={SITE.phoneHref}>{SITE.phone}</a>.
          </div>
        </div>
      </section>
    </>
  );
}
