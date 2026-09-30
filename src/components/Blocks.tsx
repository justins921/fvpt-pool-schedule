import Link from "next/link";
import Icon from "./Icon";
import { SITE } from "@/content/site";

export function PageHead({ title, text, crumbs = [] }: { title: string; text?: string; crumbs?: { href: string; label: string }[] }) {
  return (
    <section className="page-head">
      <div className="wrap">
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          {crumbs.map((c) => (
            <span key={c.href}> / <Link href={c.href}>{c.label}</Link></span>
          ))}
        </nav>
        <h1>{title}</h1>
        {text && <p>{text}</p>}
      </div>
    </section>
  );
}

export function Checks({ items, cols }: { items: string[]; cols?: boolean }) {
  return (
    <ul className={`checks${cols ? " cols" : ""}`}>
      {items.map((i) => (
        <li key={i}><Icon name="check" /> <span>{i}</span></li>
      ))}
    </ul>
  );
}

export function CallBox({ label = "Schedule a Visit", note = "No referral needed" }: { label?: string; note?: string }) {
  return (
    <div className="callbox">
      <a href={SITE.phoneHref} className="btn">
        {label}
        <small>{note}</small>
      </a>
      <span className="or">or</span>
      <a href={SITE.phoneHref} className="phone">
        <small>Call us</small>
        <strong>{SITE.phone.replace(/[()]/g, "").replace(" ", "-")}</strong>
      </a>
    </div>
  );
}

export function PhotoCta({ title = "Ready to Get Started?", text = "You don't need a referral to see a physical therapist. Call us and we'll check your insurance and get you on the schedule.", image = "/img/exterior.png" }: { title?: string; text?: string; image?: string }) {
  return (
    <section className="photo-cta" style={{ backgroundImage: `url(${image})` }}>
      <div className="wrap">
        <div className="card">
          <h2>{title}</h2>
          <p>{text}</p>
          <CallBox />
        </div>
      </div>
    </section>
  );
}

export function HoursTable() {
  return (
    <table className="hours">
      <tbody>
        {SITE.hours.map((h) => (
          <tr key={h.days}><td>{h.days}</td><td>{h.time}</td></tr>
        ))}
      </tbody>
    </table>
  );
}
