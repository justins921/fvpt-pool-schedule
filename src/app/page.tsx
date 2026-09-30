import Image from "next/image";
import Link from "next/link";
import { ContactCard, Faq, HoursTable, PhonePill, faqSchema } from "@/components/Blocks";
import Icon from "@/components/Icon";
import { RatingBadge, ReviewsSection } from "@/components/Reviews";
import { FAQ } from "@/content/faq";
import { SERVICES } from "@/content/services";
import { POOL, SITE } from "@/content/site";
import { TEAM } from "@/content/team";

const AFFILIATIONS = [
  { src: "/img/affiliations/apta.svg", alt: "American Physical Therapy Association" },
  { src: "/img/affiliations/wpta.svg", alt: "Wisconsin Physical Therapy Association" },
  { src: "/img/affiliations/aota.jpg", alt: "American Occupational Therapy Association" },
  { src: "/img/affiliations/wota.png", alt: "Wisconsin Occupational Therapy Association" },
  { src: "/img/affiliations/oshkosh-chamber.png", alt: "Oshkosh Chamber of Commerce" },
];

const BENEFITS = [
  { icon: "user", title: "One-On-One, Every Visit", text: "At every appointment you get hands-on, one-on-one attention from your therapist." },
  { icon: "clipboard", title: "No Referral Needed", text: "Call and schedule directly. Our office will try to check your insurance benefits for you." },
  { icon: "water", title: "The Only Therapeutic Pool In Oshkosh", text: "Aquatic therapy for arthritis, joint replacements, balance and pain, right here in the clinic." },
  { icon: "talk", title: "We Talk To Your Doctor", text: "We keep your physician in the loop and call them if your plan needs to change." },
];

export default function Home() {
  const services = SERVICES.filter((s) => s.slug !== "wellness").slice(0, 9);

  return (
    <>
      <section className="hero">
        <div className="wrap">
          <div>
            <p className="kicker">Physical therapy in Oshkosh, WI</p>
            <h1>Your Therapist. One-On-One. Every Visit.</h1>
            <p className="lede">
              Locally owned since 1990, with the only therapeutic pool in Oshkosh. No referral needed, and we take most insurance, including Medicare.
            </p>
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
                <b>Steve & Regina Sobojinski</b>
                <span>Founders, treating patients since 1990</span>
              </div>
            </div>
          </div>
        </div>
      </section>

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

      <section className="section soft">
        <div className="wrap">
          <div className="intro">
            <p className="kicker">One-on-one physical therapy</p>
            <h2>Oshkosh Physical Therapy Services</h2>
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
            <h2>A Better Approach To Physical Therapy</h2>
            <p>
              Fox Valley Physical Therapy & Wellness Clinic started in a 500 square foot office in 1990. Today it&apos;s a 7,500 square foot clinic with a therapeutic pool and a fully equipped gym, and a team with more than 100 years of combined experience. What hasn&apos;t changed is how we treat people.
            </p>
          </div>
          <div className="approach">
            <div className="photo">
              <Image src="/img/team/steve.png" alt="Steve Sobojinski, OTR, CSCS" width={480} height={480} />
              <div className="name-card">
                <Image src="/img/logo.png" alt="" width={40} height={40} />
                <div>
                  <b>Steve Sobojinski, OTR, CSCS</b>
                  <span>&quot;I treat their injuries as if they were my injuries.&quot;</span>
                </div>
              </div>
            </div>
            <ul className="benefits">
              {BENEFITS.map((b) => (
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
            <p className="kicker">Our therapists</p>
            <h2>Get To Know Our Team</h2>
            <p>Physical therapists, an occupational therapist, a physical therapist assistant and a licensed athletic trainer, with more than 100 years of combined experience.</p>
          </div>
          <div className="people">
            {TEAM.slice(0, 8).map((m) => (
              <Link key={m.slug} href={`/team#${m.slug}`} className="person">
                <Image src={m.photo} alt={m.name} width={320} height={320} />
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
            <p className="kicker">Aquatic therapy & pool access</p>
            <h2>The Only Therapeutic Pool In Oshkosh</h2>
            <p>
              Warm water takes weight off healing joints, so you can start moving and strengthening sooner and with less pain. It&apos;s a great fit for arthritis, rehab after surgery or joint replacement, balance problems and chronic back pain.
            </p>
            <p>Finished with therapy? Current and former patients can reserve the pool on their own for {POOL.monthlyPrice} a month.</p>
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
            <h2>Frequently Asked Questions</h2>
          </div>
          <Faq items={FAQ} />
        </div>
      </section>

      <section className="section soft">
        <div className="wrap row top">
          <div>
            <h2>Visit Us At Our Oshkosh Location</h2>
            <p>Free parking right out front on S Washburn Street. Download the intake form ahead of time to save a few minutes at check-in.</p>
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
