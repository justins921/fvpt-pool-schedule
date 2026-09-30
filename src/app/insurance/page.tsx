import type { Metadata } from "next";
import Image from "next/image";
import { Checks, CtaBand, Faq, HeroButtons, PhotoHero, faqSchema } from "@/components/Blocks";
import Icon from "@/components/Icon";
import { FAQ } from "@/content/faq";
import { SITE } from "@/content/site";

export const metadata: Metadata = {
  title: "Insurance & Billing",
  description: "Fox Valley Physical Therapy accepts most insurance, including Medicare, Aetna, BCBS, Cigna, Humana, UnitedHealthcare and more, plus worker's comp and auto accident claims.",
  alternates: { canonical: "/insurance" },
};

const PLANS = [
  ["aetna.png", "Aetna"], ["bcbs.png", "Blue Cross Blue Shield"], ["cigna.png", "Cigna"], ["healthpartners.png", "HealthPartners"],
  ["hps.png", "Health Payment Systems"], ["humana.png", "Humana"], ["icare.png", "iCare"], ["medicare.png", "Medicare"],
  ["network-health.png", "Network Health"], ["tricare.png", "Tricare"], ["umr.png", "UMR"], ["uhc.png", "UnitedHealthcare"],
  ["va.png", "U.S. Department of Veterans Affairs"], ["wps.png", "WPS Health Insurance"],
];

const OPTIONS = [
  { icon: "shield", title: "Worker's Comp & Auto Accidents", text: "We accept worker's compensation and motor vehicle accident claims, and our office coordinates with your case manager." },
  { icon: "user", title: "Private Pay", text: "No insurance, out of network, or out of visits? We have several affordable private pay options." },
  { icon: "heart", title: "HSA & FSA", text: "Physical therapy is a qualified expense for Health Savings and Flexible Spending Accounts." },
];

const QUESTIONS = FAQ.filter((f) => /referral|insurance|hurt at work/i.test(f.q));

export default function Insurance() {
  return (
    <>
      <PhotoHero title="Insurance & Billing" text="We're a provider for most insurance plans, including Medicare. You don't need a referral to see a physical therapist." image="/img/staff-group.jpg">
        <HeroButtons secondary={{ href: "/new-patients", label: "New Patients" }} />
      </PhotoHero>

      <section className="section">
        <div className="wrap">
          <div className="intro">
            <p className="kicker">In network with most plans</p>
            <h2>Insurance We Accept</h2>
            <p>Don&apos;t see your plan? Give us a call. We may still be able to help.</p>
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
          {OPTIONS.map((o) => (
            <div key={o.title} className="card feature">
              <div className="ico"><Icon name={o.icon} /></div>
              <h3>{o.title}</h3>
              <p>{o.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="wrap two-col" style={{ marginBottom: 0 }}>
          <div>
            <p className="kicker">Before your first visit</p>
            <h2>Checking Your Benefits</h2>
          </div>
          <div>
            <p style={{ marginBottom: 18 }}>
              As a service to our patients, we try to contact your insurance to find out your physical therapy benefits. In the end, you&apos;re responsible for confirming your benefits and in-network status with your insurance company.
            </p>
            <Checks items={["Call the customer service number on the back of your insurance card", "Ask about your physical therapy benefits, visit limits and whether you need a referral", "Confirm Fox Valley Physical Therapy is in network for your plan"]} />
            <p>Questions? Our office staff is happy to help. Call <a href={SITE.phoneHref}>{SITE.phone}</a>.</p>
          </div>
        </div>
      </section>

      <section className="section soft">
        <div className="wrap">
          <div className="intro"><h2>Frequently Asked Questions</h2></div>
          <Faq items={QUESTIONS} />
        </div>
      </section>

      <CtaBand title="Questions About Your Coverage?" text="Our office staff handles billing and insurance every day. Call and we'll help you sort it out." image="/img/exterior.png" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(QUESTIONS)) }} />
    </>
  );
}
