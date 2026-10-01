import type { Metadata } from "next";
import { pageMeta } from "@/content/seo";
import { ContactCard, HeroButtons, InfoStrip, PhotoHero } from "@/components/Blocks";
import Icon from "@/components/Icon";
import { SITE, fill } from "@/content/site";
import { PAGES } from "@/content/pages";

const P = PAGES.contact;

export const metadata: Metadata = pageMeta({ title: P.seoTitle, description: fill(P.seoDescription), path: "/contact", image: "/img/exterior.png" });



export default function Contact() {
  const WAYS = [
    { icon: "phone", title: "Call Us", body: <><a href={SITE.phoneHref}>{SITE.phone}</a><br />{fill(P.phoneNote)}</> },
    { icon: "doc", title: "Fax", body: <>{SITE.fax}<br />{fill(P.faxNote)}</> },
    { icon: "mail", title: "Email", body: <><a href={`mailto:${SITE.email}`}>{SITE.email}</a><br />{fill(P.emailNote)}</> },
  ];
  return (
    <>
      <PhotoHero title={P.heroTitle} text={fill(P.heroText)} image="/img/exterior.png">
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
            <h2>{P.visitTitle}</h2>
            <p>{SITE.address.street}, {SITE.address.city}, {SITE.address.state} {SITE.address.zip}. {fill(P.visitText)}</p>
          </div>
          <iframe className="map-wide" src={SITE.mapsEmbed} title="Map to Fox Valley Physical Therapy" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        </div>
      </section>
      <ContactCard />
    </>
  );
}
