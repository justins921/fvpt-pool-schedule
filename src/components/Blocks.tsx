import Link from "next/link";
import Icon from "./Icon";
import { SITE } from "@/content/site";

type Crumb = { href: string; label: string };

function Crumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav className="crumbs" aria-label="Breadcrumb">
      <Link href="/">Home</Link>
      {crumbs.map((c) => <span key={c.href}> / <Link href={c.href}>{c.label}</Link></span>)}
    </nav>
  );
}

export function PageHead({ title, text, crumbs = [] }: { title: string; text?: string; crumbs?: Crumb[] }) {
  return (
    <section className="page-head">
      <div className="wrap">
        <Crumbs crumbs={crumbs} />
        <h1>{title}</h1>
        {text && <p>{text}</p>}
      </div>
    </section>
  );
}

export function PhotoHero({ title, text, image, crumbs = [], children }: { title: string; text?: string; image: string; crumbs?: Crumb[]; children?: React.ReactNode }) {
  return (
    <section className="photo-hero" style={{ backgroundImage: `url(${image})` }}>
      <div className="wrap">
        <Crumbs crumbs={crumbs} />
        <h1>{title}</h1>
        {text && <p>{text}</p>}
        {children}
      </div>
    </section>
  );
}

export function Checks({ items, cols }: { items: string[]; cols?: boolean }) {
  return (
    <ul className={`checks${cols ? " cols" : ""}`}>
      {items.map((i) => <li key={i}><Icon name="check" /> <span>{i}</span></li>)}
    </ul>
  );
}

export function PhonePill({ label = "Call to schedule" }: { label?: string }) {
  return (
    <a href={SITE.phoneHref} className="phone-pill">
      <span className="dot"><Icon name="phone" /></span>
      <span><b>{SITE.phone}</b><small>{label}</small></span>
    </a>
  );
}

export function HoursTable({ lined }: { lined?: boolean }) {
  return (
    <table className={`hours${lined ? " lined" : ""}`}>
      <tbody>
        {SITE.hours.map((h) => <tr key={h.days}><td>{h.days}</td><td>{h.time}</td></tr>)}
      </tbody>
    </table>
  );
}

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="faq">
      {items.map((f) => (
        <details key={f.q}>
          <summary>{f.q}</summary>
          <p>{f.a}</p>
        </details>
      ))}
    </div>
  );
}

export function faqSchema(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}

export function ContactCard({ title = "Contact Our Oshkosh Clinic!", image = "/img/exterior.png" }: { title?: string; image?: string }) {
  return (
    <section className="section">
      <div className="wrap">
        <div className="contact-card">
          <div className="text">
            <h2>{title}</h2>
            <ul>
              <li><Icon name="phone" /><a href={SITE.phoneHref}>{SITE.phone}</a></li>
              <li><Icon name="mail" /><a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
              <li><Icon name="pin" /><a href={SITE.mapsUrl}>{SITE.address.street}, {SITE.address.city}, {SITE.address.state} {SITE.address.zip}</a></li>
            </ul>
            <a href={SITE.phoneHref} className="btn white">Call To Schedule</a>
          </div>
          <div className="pic" style={{ backgroundImage: `url(${image})` }} />
        </div>
      </div>
    </section>
  );
}

export function CtaBand({ title, text, image }: { title: string; text: string; image: string }) {
  return (
    <section className="section" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="cta-band">
          <div className="text">
            <h2>{title}</h2>
            <p>{text}</p>
            <div className="btn-row">
              <a href={SITE.phoneHref} className="btn">Call Us {SITE.phone}</a>
              <a href={SITE.intakeForm} className="btn clear">Download Intake Form</a>
            </div>
          </div>
          <div className="pic" style={{ backgroundImage: `url(${image})` }} />
        </div>
      </div>
    </section>
  );
}

export function InfoStrip() {
  return (
    <section className="info-strip">
      <div className="wrap">
        <div>
          <h3>Contact Us</h3>
          <p>
            Ph: <a href={SITE.phoneHref}>{SITE.phone}</a>
            <br />Fax: {SITE.fax}
            <br />Email: <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          </p>
        </div>
        <div>
          <h3>Our Oshkosh Clinic</h3>
          <p>{SITE.address.street},<br />{SITE.address.city}, {SITE.address.state} {SITE.address.zip}</p>
          <a href={SITE.mapsUrl} className="pill-link">Get Directions</a>
        </div>
        <div>
          <h3>Clinic Hours</h3>
          <HoursTable />
        </div>
      </div>
    </section>
  );
}

export function HeroButtons({ secondary }: { secondary?: { href: string; label: string } }) {
  return (
    <div className="btn-row" style={{ justifyContent: "center" }}>
      <a href={SITE.phoneHref} className="btn">Call {SITE.phone}</a>
      {secondary && <Link href={secondary.href} className="btn clear">{secondary.label}</Link>}
    </div>
  );
}
