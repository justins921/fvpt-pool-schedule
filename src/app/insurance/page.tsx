import type { Metadata } from "next";
import Image from "next/image";
import { Checks, ContactCard, PageHead } from "@/components/Blocks";
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

export default function Insurance() {
  return (
    <>
      <PageHead title="Insurance & Billing" text="We're a provider for most insurance plans. You don't need a referral to see a physical therapist, though some plans want a diagnosis from your doctor for coverage." />
      <section className="section">
        <div className="wrap">
          <div className="intro">
            <h2>Insurance We Accept</h2>
            <p>Don&apos;t see your plan? Give us a call. We may still be able to help.</p>
          </div>
          <div className="logos">
            {PLANS.map(([file, name]) => (
              <div key={file}><Image src={`/img/insurance/${file}`} alt={name} width={160} height={54} /></div>
            ))}
          </div>
        </div>
      </section>
      <section className="section soft">
        <div className="wrap cards">
          <div className="card">
            <h3>Worker&apos;s Comp & Auto Accidents</h3>
            <p>We accept worker&apos;s compensation and motor vehicle accident claims, and our office coordinates with your case manager.</p>
          </div>
          <div className="card">
            <h3>Private Pay</h3>
            <p>No insurance, out of network, or out of visits? We have several affordable private pay options.</p>
          </div>
          <div className="card">
            <h3>HSA & FSA</h3>
            <p>Physical therapy is a qualified expense for Health Savings and Flexible Spending Accounts.</p>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="wrap prose">
          <h2 style={{ marginTop: 0 }}>Checking Your Benefits</h2>
          <p>As a service to our patients, we try to contact your insurance to find out your physical therapy benefits. In the end, you&apos;re responsible for confirming your benefits and in-network status with your insurance company.</p>
          <Checks items={["Call the customer service number on the back of your insurance card", "Ask about your physical therapy benefits, visit limits and whether you need a referral", "Confirm Fox Valley Physical Therapy is in network for your plan"]} />
          <p>Questions? Our office staff is happy to help. Call <a href={SITE.phoneHref}>{SITE.phone}</a>.</p>
        </div>
      </section>
      <ContactCard />
    </>
  );
}
