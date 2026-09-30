import type { Metadata } from "next";
import { ContactCard, HeroButtons, InfoStrip, PhotoHero } from "@/components/Blocks";
import Icon from "@/components/Icon";
import { SITE } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact & Directions",
  description: "Call Fox Valley Physical Therapy at (920) 235-8966. 909 S Washburn Street, Oshkosh, WI 54904. Hours, directions and fax.",
  alternates: { canonical: "/contact" },
};

const WAYS = [
  { icon: "phone", title: "Call Us", body: <><a href={SITE.phoneHref}>{SITE.phone}</a><br />The fastest way to schedule or ask a question.</> },
  { icon: "doc", title: "Fax", body: <>{SITE.fax}<br />For referrals and records from your doctor.</> },
  { icon: "mail", title: "Email", body: <><a href={`mailto:${SITE.email}`}>{SITE.email}</a><br />Please don&apos;t email medical details. Call instead.</> },
];

export default function Contact() {
  return (
    <>
      <PhotoHero title="Contact Our Oshkosh Clinic" text="We're happy to answer questions about scheduling, insurance and billing." image="/img/exterior.png">
        <HeroButtons secondary={{ href: "/new-patients", label: "New Patients" }} />
      </PhotoHero>
      <InfoStrip />
      <section className="section soft">
        <div className="wrap">
          <div className="cards">
            {WAYS.map((w) => (
              <div key={w.title} className="card feature">
                <div className="ico"><Icon name={w.icon} /></div>
                <h3>{w.title}</h3>
                <p style={{ overflowWrap: "anywhere" }}>{w.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          <div className="intro">
            <h2>Visit Us At Our Oshkosh Location</h2>
            <p>{SITE.address.street}, {SITE.address.city}, {SITE.address.state} {SITE.address.zip}. Free parking right out front.</p>
          </div>
          <iframe className="map-wide" src={SITE.mapsEmbed} title="Map to Fox Valley Physical Therapy" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        </div>
      </section>
      <ContactCard />
    </>
  );
}
