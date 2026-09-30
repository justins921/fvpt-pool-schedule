import Image from "next/image";
import Link from "next/link";
import { AREAS } from "@/content/nav";
import { SITE } from "@/content/site";

const LINKS = [
  ["Home", "/"], ["Services", "/services"], ["Pool Access", "/pool"], ["New Patients", "/new-patients"],
  ["Insurance & Billing", "/insurance"], ["Our Team", "/team"], ["Blog", "/blog"], ["Contact", "/contact"],
];

export default function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="wrap footer-grid">
          <div>
            <Link href="/" className="logo" style={{ marginBottom: 14 }}>
              <Image src="/img/logo.png" alt="" width={48} height={48} />
              <span>
                <strong>Fox Valley Physical Therapy</strong>
                <small>& Wellness Clinic</small>
              </span>
            </Link>
            <p className="fine">Physical Therapy in Oshkosh, WI since {SITE.founded}</p>
            <p className="fine">
              Copyright © {new Date().getFullYear()} {SITE.name}
              <br />
              <Link href="/legal/non-discrimination">Notice of Nondiscrimination</Link> · <Link href="/legal/privacy-policy">Privacy Policy</Link>
              <br />
              Website by Sobojinski Solutions
            </p>
          </div>
          <div>
            <h3>Navigation</h3>
            <ul>
              {LINKS.map(([label, href]) => (
                <li key={href}><Link href={href}>{label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Areas We Serve</h3>
            <ul>
              {AREAS.map((a) => <li key={a}>{a}</li>)}
            </ul>
          </div>
          <div>
            <h3>Contact Us</h3>
            <ul>
              <li>Phone: <a href={SITE.phoneHref}>{SITE.phone}</a></li>
              <li>Fax: {SITE.fax}</li>
              <li><a href={SITE.mapsUrl}>{SITE.address.street},<br />{SITE.address.city}, {SITE.address.state} {SITE.address.zip}</a></li>
              <li><a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
            </ul>
            <h3 style={{ marginTop: 20 }}>Hours</h3>
            <ul>
              {SITE.hours.map((h) => <li key={h.days}>{h.days}: {h.time}</li>)}
            </ul>
          </div>
        </div>
      </footer>
      <div className="callbar">
        <a href={SITE.phoneHref} className="btn">Call Us {SITE.phone}</a>
      </div>
    </>
  );
}
