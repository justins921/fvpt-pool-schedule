import Image from "next/image";
import Link from "next/link";
import Icon from "./Icon";
import { NAV, SITE } from "@/content/site";
import { SERVICES } from "@/content/services";

export default function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="wrap">
          <div className="footer-grid">
            <div>
              <Link href="/" className="brand">
                <Image src="/img/logo.png" alt="" width={46} height={46} />
                <span>
                  <strong>Fox Valley Physical Therapy</strong>
                  <small>& Wellness Clinic</small>
                </span>
              </Link>
              <p>One-on-one physical therapy, occupational therapy and athletic training in Oshkosh since {SITE.founded}. Home of the only therapeutic pool in Oshkosh.</p>
            </div>
            <div>
              <h3>Services</h3>
              <ul>
                {SERVICES.slice(0, 7).map((s) => (
                  <li key={s.slug}>
                    <Link href={`/services/${s.slug}`}>{s.name}</Link>
                  </li>
                ))}
                <li>
                  <Link href="/services">All services</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3>Clinic</h3>
              <ul>
                {NAV.filter((n) => n.href !== "/services").map((n) => (
                  <li key={n.href}>
                    <Link href={n.href}>{n.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3>Visit us</h3>
              <ul>
                <li>
                  <a href={SITE.mapsUrl}>
                    {SITE.address.street}
                    <br />
                    {SITE.address.city}, {SITE.address.state} {SITE.address.zip}
                  </a>
                </li>
                <li>
                  Phone <a href={SITE.phoneHref}>{SITE.phone}</a>
                </li>
                <li>Fax {SITE.fax}</li>
                <li>
                  <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
                </li>
              </ul>
              <table className="hours" style={{ marginTop: 16 }}>
                <tbody>
                  {SITE.hours.map((h) => (
                    <tr key={h.days}>
                      <td style={{ color: "#aeb5cf", borderColor: "rgba(255,255,255,.1)" }}>{h.days}</td>
                      <td style={{ color: "#fff", borderColor: "rgba(255,255,255,.1)" }}>{h.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="footer-bottom">
            <span>
              © {new Date().getFullYear()} {SITE.name}. Designed by Sobojinski Solutions.
            </span>
            <nav aria-label="Legal">
              <Link href="/legal/non-discrimination">Notice of Nondiscrimination</Link>
              <Link href="/legal/privacy-policy">Privacy Policy</Link>
            </nav>
          </div>
        </div>
      </footer>
      <div className="callbar">
        <a href={SITE.phoneHref} className="btn btn-primary">
          <Icon name="phone" /> Call
        </a>
        <a href={SITE.mapsUrl} className="btn btn-ghost">
          <Icon name="pin" /> Directions
        </a>
      </div>
    </>
  );
}
