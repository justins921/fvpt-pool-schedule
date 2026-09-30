import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Checks, ContactCard, PageHead } from "@/components/Blocks";
import { SITE } from "@/content/site";

export const metadata: Metadata = {
  title: "New Patients",
  description: "What to expect at your first physical therapy visit at Fox Valley Physical Therapy in Oshkosh, WI, plus new patient forms.",
  alternates: { canonical: "/new-patients" },
};

const STEPS = [
  ["Call To Schedule", "No referral needed. We'll find a time and check your insurance benefits for you."],
  ["Fill Out Your Intake Form", "Download it below and bring it to your first visit, or come a few minutes early."],
  ["Your Evaluation", "Your therapist reviews your history, tests how you move, and explains what's going on."],
  ["Your Treatment Plan", "A plan built for you, with hands-on treatment and a home program to keep you improving."],
];

export default function NewPatients() {
  return (
    <>
      <PageHead title="New Patients" text="We do things differently. Every appointment is hands-on and one-on-one with your therapist." />
      <section className="section">
        <div className="wrap cards four">
          {STEPS.map(([t, d], i) => (
            <div key={t} className="card">
              <div className="step-num">{i + 1}</div>
              <h3>{t}</h3>
              <p>{d}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="section soft">
        <div className="wrap row">
          <Image src="/img/therapy-shoulder.jpg" alt="A therapist examining a patient's shoulder" width={1024} height={935} />
          <div>
            <h2>What Your Evaluation Covers</h2>
            <p className="kicker">Your first visit</p>
            <Checks
              items={[
                "Your history, to understand how and when the problem started",
                "An exam of how you move and how your joints are working",
                "Measurements like muscle strength tests, neurological screening and pain assessment",
                "A clear explanation of what we found and what we recommend, shared with you and your doctor",
              ]}
            />
            <p>Wear comfortable clothes you can move in. Sessions run from 30 minutes to two hours, depending on what you need.</p>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="wrap cards two">
          <div className="card">
            <h3>New Patient Forms</h3>
            <p>Print and fill out the intake form before your first visit, or fill it out here when you arrive.</p>
            <a href={SITE.intakeForm} className="btn" download>Download Intake Form</a>
          </div>
          <div className="card">
            <h3>Insurance</h3>
            <p>We&apos;re a provider for most insurance plans, including Medicare, and we accept worker&apos;s comp and auto accident claims.</p>
            <Link href="/insurance" className="btn ghost">Insurance & Billing</Link>
          </div>
        </div>
      </section>
      <ContactCard />
    </>
  );
}
