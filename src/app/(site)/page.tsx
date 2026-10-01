import Image from "next/image";
import Link from "next/link";
import { ContactCard, Faq, InfoStrip, PhonePill, faqSchema } from "@/components/Blocks";
import Headshot from "@/components/Person";
import Icon from "@/components/Icon";
import { RatingBadge, ReviewsSection } from "@/components/Reviews";
import { FAQ } from "@/content/faq";
import { SERVICES } from "@/content/collections";
import { PAGES } from "@/content/pages";
import { SITE, fill } from "@/content/site";
import { TEAM } from "@/content/collections";

const AFFILIATIONS = [
  { src: "/img/affiliations/apta.svg", alt: "American Physical Therapy Association" },
  { src: "/img/affiliations/wpta.svg", alt: "Wisconsin Physical Therapy Association" },
  { src: "/img/affiliations/aota.jpg", alt: "American Occupational Therapy Association" },
  { src: "/img/affiliations/wota.png", alt: "Wisconsin Occupational Therapy Association" },
  { src: "/img/affiliations/oshkosh-chamber.png", alt: "Oshkosh Chamber of Commerce" },
];

const H = PAGES.home;
const paras = (t: string) => fill(t).split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);

export default function Home() {
  const services = SERVICES.filter((s) => s.slug !== "wellness").slice(0, 9);

  return (
    <>
      <section className="hero">
        <div className="wrap">
          <div>
            <p className="kicker">{H.heroKicker}</p>
            <h1>{H.heroTitle}</h1>
            <p className="lede">{fill(H.heroText)}</p>
            <div className="btn-row" style={{ gap: 22 }}>
              <PhonePill />
              <RatingBadge />
              <a href={SITE.intakeForm} className="forms-link">Download Intake Form <Icon name="external" className="icon-sm" /></a>
            </div>
          </div>
          <div className="hero-photo">
            <Image src="/img/staff-group.jpg" alt="The Fox Valley Physical Therapy team outside the clinic" width={720} height={480} priority />
            <div className="name-card">
              <Image src="/img/logo.png" alt="" width={40} height={40} />
              <div>
                <b>{H.heroCaptionName}</b>
                <span>{H.heroCaptionText}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <InfoStrip />

      <section className="section soft">
        <div className="wrap">
          <div className="intro">
            <p className="kicker">{H.servicesKicker}</p>
            <h2>{H.servicesTitle}</h2>
          </div>
          <div className="svc-grid">
            {services.map((s) => (
              <div key={s.slug} className="svc">
                <Image src={s.image} alt="" width={560} height={350} />
                <div className="body">
                  <h3>{s.name}</h3>
                  <p>{s.short}</p>
                  <Link href={`/services/${s.slug}`} className="btn">Learn More</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="two-col">
            <h2>{H.approachTitle}</h2>
            <p>{fill(H.approachText)}</p>
          </div>
          <div className="approach">
            <div className="photo">
              <Image src="/img/team/steve.png" alt="Steve Sobojinski, OTR, CSCS" width={480} height={480} />
              <div className="name-card">
                <Image src="/img/logo.png" alt="" width={40} height={40} />
                <div>
                  <b>{H.approachCaptionName}</b>
                  <span>{H.approachCaptionText}</span>
                </div>
              </div>
            </div>
            <ul className="benefits">
              {H.benefits.map((b) => (
                <li key={b.title}>
                  <span className="ico"><Icon name={b.icon} /></span>
                  <div>
                    <h3>{b.title}</h3>
                    <p>{b.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <ReviewsSection />

      <section className="section">
        <div className="wrap">
          <div className="intro">
            <p className="kicker">{H.teamKicker}</p>
            <h2>{H.teamTitle}</h2>
            <p>{fill(H.teamText)}</p>
          </div>
          <div className="people">
            {TEAM.filter((m) => m.photo).slice(0, 6).map((m) => (
              <Link key={m.slug} href={`/team#${m.slug}`} className="person">
                <Headshot m={m} size={320} />
                <div>
                  <h3>{m.name}</h3>
                  <p>{m.role}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="center" style={{ marginTop: 32 }}>
            <Link href="/team" className="btn ghost">Meet The Whole Team</Link>
          </div>
        </div>
      </section>

      <section className="section soft">
        <div className="wrap row">
          <div>
            <p className="kicker">{H.poolKicker}</p>
            <h2>{H.poolTitle}</h2>
            {paras(H.poolText).map((t) => <p key={t}>{t}</p>)}
            <div className="btn-row">
              <Link href="/services/aquatic-therapy" className="btn">Aquatic Therapy</Link>
              <Link href="/pool" className="btn ghost">Pool Access</Link>
            </div>
          </div>
          <Image src="/img/pool.jpg" alt="The therapeutic pool at Fox Valley Physical Therapy" width={980} height={360} />
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="intro">
            <h2>{H.faqTitle}</h2>
          </div>
          <Faq items={FAQ} />
        </div>
      </section>

      <section className="section soft">
        <div className="wrap row top">
          <div>
            <h2>{H.visitTitle}</h2>
            <p>{fill(H.visitText)}</p>
            <div className="info-strip" style={{ border: 0, background: "none" }}>
              <h3>Contact Us</h3>
              <p style={{ marginBottom: 16 }}>Ph: <a href={SITE.phoneHref}>{SITE.phone}</a><br />Fax: {SITE.fax}<br />Email: <a href={`mailto:${SITE.email}`}>{SITE.email}</a></p>
              <h3>Oshkosh Clinic Address</h3>
              <p>{SITE.address.street},<br />{SITE.address.city}, {SITE.address.state} {SITE.address.zip}</p>
              <a href={SITE.mapsUrl} className="pill-link" style={{ marginBottom: 18 }}>Get Directions</a>
              <h3>Services</h3>
              <ul className="tags">
                {SERVICES.map((s) => <li key={s.slug}><Link href={`/services/${s.slug}`}>{s.name}</Link></li>)}
              </ul>
            </div>
          </div>
          <iframe className="map" style={{ minHeight: 460 }} src={SITE.mapsEmbed} title="Map to Fox Valley Physical Therapy" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        </div>
      </section>

      <ContactCard />

      <section className="section soft" style={{ paddingTop: 48, paddingBottom: 48 }}>
        <div className="wrap logos">
          {AFFILIATIONS.map((a) => (
            <div key={a.src}><Image src={a.src} alt={a.alt} width={160} height={52} unoptimized={a.src.endsWith(".svg")} /></div>
          ))}
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(FAQ)) }} />
    </>
  );
}
