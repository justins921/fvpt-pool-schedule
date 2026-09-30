import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CallCta, Checks, PageHead } from "@/components/Blocks";
import Icon from "@/components/Icon";
import { SITE } from "@/content/site";

export const metadata: Metadata = {
  title: "New Patients",
  description: "What to expect at your first physical therapy visit at Fox Valley Physical Therapy in Oshkosh, WI, plus new patient forms.",
  alternates: { canonical: "/new-patients" },
};

const STEPS = [
  { icon: "phone", title: "Call to schedule", text: "No referral needed. We'll find a time and check your insurance benefits for you." },
  { icon: "doc", title: "Fill out your intake form", text: "Download it below and bring it to your first visit to save time at check-in." },
  { icon: "user", title: "Your evaluation", text: "Your therapist reviews your history, tests how you move, and explains what's going on." },
  { icon: "heart", title: "Your treatment plan", text: "A plan built for you, with hands-on treatment and a home program to keep you improving." },
];

export default function NewPatients() {
  return (
    <>
      <PageHead title="New patients" lead="We do things differently. Every appointment is hands-on and one-on-one with your therapist." />
      <section className="section">
        <div className="wrap">
          <div className="grid grid-4">
            {STEPS.map((s, i) => (
              <div key={s.title} className="card">
                <div className="icon-chip"><Icon name={s.icon} /></div>
                <h3>{i + 1}. {s.title}</h3>
                <p>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section soft">
        <div className="wrap split">
          <div>
            <span className="eyebrow">Your first visit</span>
            <h2>What your evaluation covers</h2>
            <Checks
              items={[
                "Your history, to understand how and when the problem started",
                "An exam of how you move and how your joints are working",
                "Measurements like muscle strength tests, neurological screening and pain assessment",
                "A clear explanation of what we found and what we recommend, shared with you and your doctor",
              ]}
            />
            <p>
              Wear comfortable clothes you can move in. Sessions run from 30 minutes to two hours, depending on what you need.
            </p>
          </div>
          <Image src="/img/patient-treated.jpg" alt="A therapist working with a patient in the gym" width={980} height={360} style={{ aspectRatio: "4 / 3" }} />
        </div>
      </section>
      <section className="section">
        <div className="wrap grid grid-2">
          <div className="card">
            <div className="icon-chip"><Icon name="doc" /></div>
            <h2 style={{ fontSize: "1.5rem" }}>New patient forms</h2>
            <p>Print and fill out the intake form before your first visit, or come a few minutes early and fill it out here.</p>
            <a href={SITE.intakeForm} className="btn btn-primary" download>
              Download intake form (PDF)
            </a>
          </div>
          <div className="card">
            <div className="icon-chip"><Icon name="shield" /></div>
            <h2 style={{ fontSize: "1.5rem" }}>Insurance</h2>
            <p>We&apos;re a provider for most insurance plans, including Medicare, and we accept worker&apos;s comp and auto accident claims.</p>
            <Link href="/insurance" className="btn btn-ghost">Insurance & billing</Link>
          </div>
        </div>
      </section>
      <CallCta title="Ready to get started?" />
    </>
  );
}
