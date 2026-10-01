import type { Metadata } from "next";
import { pageMeta } from "@/content/seo";
import Image from "next/image";
import Link from "next/link";
import { Checks, CtaBand, Faq, PhotoHero, faqSchema } from "@/components/Blocks";
import Icon from "@/components/Icon";
import { FAQ } from "@/content/faq";
import { SITE } from "@/content/site";

export const metadata: Metadata = pageMeta({
  title: "New Patient Information",
  description: "What to expect at your first physical therapy visit at Fox Valley Physical Therapy in Oshkosh, WI. No referral needed. Download the intake form.",
  path: "/new-patients",
  image: "/img/patient-treated.jpg",
});

const STEPS = [
  { icon: "phone", title: "Call To Schedule", text: "No referral needed. Our office will try to check your insurance benefits for you." },
  { icon: "doc", title: "Fill Out Your Intake Form", text: "Download it below and bring it to your first visit, or come a few minutes early." },
  { icon: "user", title: "Your Evaluation", text: "Your therapist reviews your history, tests how you move, and explains what's going on." },
  { icon: "heart", title: "Your Treatment Plan", text: "A plan built for you, with hands-on treatment and a home program to keep you improving." },
];

const QUESTIONS = FAQ.filter((f) => /referral|insurance|first visit|how long/i.test(f.q));

export default function NewPatients() {
  return (
    <>
      <PhotoHero title="New Patients" text="We do things differently. Every appointment is hands-on and one-on-one with your therapist." image="/img/patient-treated.jpg">
        <div className="btn-row" style={{ justifyContent: "center" }}>
          <a href={SITE.phoneHref} className="btn">Call {SITE.phone}</a>
          <a href={SITE.intakeForm} className="btn clear">Download Intake Form</a>
        </div>
      </PhotoHero>

      <section className="section">
        <div className="wrap">
          <div className="intro">
            <p className="kicker">Getting started</p>
            <h2>Your First Visit, Step By Step</h2>
          </div>
          <div className="cards four">
            {STEPS.map((s, i) => (
              <div key={s.title} className="card feature">
                <div className="ico"><Icon name={s.icon} /></div>
                <p className="kicker" style={{ marginBottom: 4 }}>Step {i + 1}</p>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            ))}
          </div>
          <div className="download" style={{ marginTop: 32 }}>
            <div className="ico"><Icon name="doc" /></div>
            <div>
              <h3>New Patient Intake Form</h3>
              <p>Print it, fill it out at home, and bring it to your first appointment.</p>
            </div>
            <a href={SITE.intakeForm} className="btn" download>Download PDF</a>
          </div>
        </div>
      </section>

      <section className="section soft">
        <div className="wrap row">
          <Image src="/img/therapy-shoulder.jpg" alt="A therapist examining a patient's shoulder" width={1024} height={935} />
          <div>
            <p className="kicker">Your first visit</p>
            <h2>What Your Evaluation Covers</h2>
            <Checks
              items={[
                "Your history, to understand how and when the problem started",
                "An exam of how you move and how your joints are working",
                "Measurements like muscle strength tests, neurological screening and pain assessment",
                "A clear explanation of what we found and what we recommend, shared with you and your doctor",
              ]}
            />
            <p>Wear comfortable clothes you can move in. Sessions run from 30 minutes to two hours, depending on what you need.</p>
            <Link href="/insurance" className="btn ghost">Insurance & Billing</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="intro"><h2>Frequently Asked Questions</h2></div>
          <Faq items={QUESTIONS} />
        </div>
      </section>

      <CtaBand title="Ready To Get Started?" text="Call our Oshkosh clinic to schedule your first visit. You don't need a referral." image="/img/exterior.png" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(QUESTIONS)) }} />
    </>
  );
}
