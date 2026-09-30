import Link from "next/link";
import Icon from "./Icon";
import { SITE } from "@/content/site";

export function PageHead({ title, lead, crumbs = [] }: { title: string; lead?: string; crumbs?: { href: string; label: string }[] }) {
  return (
    <section className="page-head">
      <div className="wrap">
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          {crumbs.map((c) => (
            <span key={c.href}>
              {" / "}
              <Link href={c.href}>{c.label}</Link>
            </span>
          ))}
        </nav>
        <h1>{title}</h1>
        {lead && <p className="lead">{lead}</p>}
      </div>
    </section>
  );
}

export function Checks({ items, cols }: { items: string[]; cols?: boolean }) {
  return (
    <ul className={`checks${cols ? " cols" : ""}`}>
      {items.map((i) => (
        <li key={i}>
          <Icon name="check" /> <span>{i}</span>
        </li>
      ))}
    </ul>
  );
}

export function CallCta({ title = "Ready to feel better?", text = "You don't need a referral to see a physical therapist. Call us and we'll get you scheduled." }: { title?: string; text?: string }) {
  return (
    <section className="section">
      <div className="wrap">
        <div className="cta">
          <div>
            <h2>{title}</h2>
            <p>{text}</p>
          </div>
          <div className="btn-row">
            <a href={SITE.phoneHref} className="btn btn-navy">
              <Icon name="phone" /> {SITE.phone}
            </a>
          </div>
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
          <tr key={h.days}>
            <td>{h.days}</td>
            <td>{h.time}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
