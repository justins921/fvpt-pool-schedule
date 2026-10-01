import Image from "next/image";
import Link from "next/link";
import Icon from "./Icon";
import { AREAS, SITE } from "@/content/site";

const LINKS = [
  ["Home", "/"], ["Services", "/services"], ["Pool Access", "/pool"], ["New Patients", "/new-patients"],
  ["Insurance & Billing", "/insurance"], ["Our Team", "/team"], ["Blog", "/blog"], ["Contact", "/contact"],
];

export default function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="wrap">
          <div className="top">
            <Link href="/" className="logo">
              <Image src="/img/logo.png" alt="" width={44} height={44} />
              <span>
                <strong>Fox Valley Physical Therapy</strong>
                <small>& Wellness Clinic</small>
              </span>
            </Link>
            <a href={SITE.phoneHref} className="btn white">Get In Touch</a>
          </div>
          <div className="contact-row">
            <div><Icon name="pin" /><a href={SITE.mapsUrl}>{SITE.address.street},<br />{SITE.address.city}, {SITE.address.state} {SITE.address.zip}</a></div>
            <div><Icon name="phone" /><span>Ph: <a href={SITE.phoneHref}>{SITE.phone}</a><br />Fax: {SITE.fax}</span></div>
            <div><Icon name="mail" /><a href={`mailto:${SITE.email}`}>{SITE.email}</a></div>
          </div>
          <nav aria-label="Footer">
            {LINKS.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
          </nav>
          <p className="areas">Serving {AREAS.map((a) => a.replace(", WI", "")).join(" · ")}</p>
          <p className="legal">
            © {new Date().getFullYear()} {SITE.name}. All rights reserved. · <Link href="/legal/non-discrimination">Notice of Nondiscrimination</Link> · <Link href="/legal/privacy-policy">Privacy Policy</Link> · <Link href="/accessibility">Accessibility</Link> · Website by Sobojinski Solutions
          </p>
        </div>
      </footer>
      <nav className="callbar" aria-label="Quick call">
        <a href={SITE.phoneHref} className="btn"><Icon name="phone" /> Call {SITE.phone}</a>
      </nav>
    </>
  );
}
