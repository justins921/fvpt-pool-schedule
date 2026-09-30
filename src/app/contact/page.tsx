import type { Metadata } from "next";
import { CallBox, HoursTable, PageHead } from "@/components/Blocks";
import Icon from "@/components/Icon";
import { SITE } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact & Directions",
  description: "Call Fox Valley Physical Therapy at (920) 235-8966. 909 S Washburn Street, Oshkosh, WI 54904. Hours, directions and fax.",
  alternates: { canonical: "/contact" },
};

export default function Contact() {
  return (
    <>
      <PageHead title="Contact Us" text="The fastest way to reach us is to call. We're happy to answer questions about scheduling, insurance and billing." />
      <section className="section">
        <div className="wrap row top">
          <div>
            <ul className="info">
              <li><Icon name="phone" /><div><strong>Phone</strong><a href={SITE.phoneHref}>{SITE.phone}</a></div></li>
              <li><Icon name="doc" /><div><strong>Fax</strong>{SITE.fax}</div></li>
              <li><Icon name="mail" /><div><strong>Email</strong><a href={`mailto:${SITE.email}`}>{SITE.email}</a><br /><small>Please don&apos;t email medical details. Call us instead.</small></div></li>
              <li><Icon name="pin" /><div><strong>Address</strong>{SITE.address.street}<br />{SITE.address.city}, {SITE.address.state} {SITE.address.zip}<br /><a href={SITE.mapsUrl}>Get directions</a></div></li>
            </ul>
            <div className="card" style={{ marginBottom: 24 }}>
              <h3>Hours</h3>
              <HoursTable />
            </div>
            <CallBox />
          </div>
          <iframe className="map" style={{ minHeight: 520 }} src={SITE.mapsEmbed} title="Map to Fox Valley Physical Therapy" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        </div>
      </section>
    </>
  );
}
