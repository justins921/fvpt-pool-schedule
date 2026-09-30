import Image from "next/image";
import Link from "next/link";
import { CallCta, Checks } from "@/components/Blocks";
import Icon from "@/components/Icon";
import { SERVICES } from "@/content/services";
import { SITE } from "@/content/site";
import { TEAM } from "@/content/team";

const CONDITIONS = [
  "Neck & back pain", "Shoulder injuries", "Knee pain", "Hand & wrist injuries", "Ankle sprains", "Plantar fasciitis",
  "Hip & thigh strains", "Headaches", "TMJ disorders", "Post-surgery rehab", "SI joint pain", "Balance problems",
  "Scoliosis", "Fibromyalgia", "Arthritis", "Vertigo", "Concussion", "Neurological conditions",
];

const AFFILIATIONS = [
  { src: "/img/affiliations/apta.svg", alt: "American Physical Therapy Association" },
  { src: "/img/affiliations/aota.jpg", alt: "American Occupational Therapy Association" },
  { src: "/img/affiliations/wpta.svg", alt: "Wisconsin Physical Therapy Association" },
  { src: "/img/affiliations/oshkosh-chamber.png", alt: "Oshkosh Chamber of Commerce" },
  { src: "/img/affiliations/wota.png", alt: "Wisconsin Occupational Therapy Association" },
];

export default function Home() {
  const years = new Date().getFullYear() - SITE.founded;
  const featured = SERVICES.filter((s) => s.slug !== "aquatic-therapy").slice(0, 6);

  return (
    <>
      <section className="hero">
        <div className="wrap">
          <div>
            <span className="eyebrow">Oshkosh, WI · Since {SITE.founded}</span>
            <h1>
              Get back to <em>moving without pain.</em>
            </h1>
            <p className="lead">
              One-on-one physical therapy, occupational therapy and athletic training from a locally owned clinic, with the only therapeutic pool in Oshkosh.
            </p>
            <ul className="hero-checks">
              <li><Icon name="check" /> No referral needed to see a physical therapist</li>
              <li><Icon name="check" /> In network with most insurance, including Medicare</li>
              <li><Icon name="check" /> Hands-on, one-on-one attention at every visit</li>
            </ul>
            <div className="btn-row">
              <a href={SITE.phoneHref} className="btn btn-primary">
                <Icon name="phone" /> Call {SITE.phone}
              </a>
              <Link href="/services" className="btn btn-light">
                Our services <Icon name="arrow" />
              </Link>
            </div>
          </div>
          <div className="hero-media">
            <Image src="/img/staff-group.jpg" alt="The Fox Valley Physical Therapy team in front of the clinic" width={720} height={480} priority />
            <div className="hero-badge">
              <strong>{years}+</strong>
              <span>years caring for Oshkosh and the Fox Valley</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingBottom: 0 }}>
        <div className="wrap">
          <div className="stats">
            <div className="stat"><strong>{years}+</strong><span>Years in business</span></div>
            <div className="stat"><strong>35k+</strong><span>New patients treated</span></div>
            <div className="stat"><strong>100+</strong><span>Years of combined experience</span></div>
            <div className="stat"><strong>1</strong><span>Therapeutic pool in Oshkosh</span></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap split">
          <div>
            <span className="eyebrow">Why Fox Valley PT</span>
            <h2>Voted the top private practice in Winnebago County</h2>
            <p>
              Steve Sobojinski, OTR, CSCS, Regina Sobojinski, PT, and Patti Ahrens started Fox Valley Physical Therapy in {SITE.founded}. It started in 500 square feet and has grown into a 7,500 sq. ft. clinic with a therapeutic pool and a fully equipped gym.
            </p>
            <p>
              At every appointment you get hands-on, one-on-one attention from your therapist. We figure out what&apos;s causing your pain, treat it, and teach you how to keep it from coming back.
            </p>
            <div className="btn-row">
              <Link href="/team" className="btn btn-ghost">Meet our team</Link>
              <Link href="/new-patients" className="btn btn-ghost">What to expect</Link>
            </div>
          </div>
          <Image src="/img/exterior.png" alt="Fox Valley Physical Therapy & Wellness Clinic on S Washburn Street in Oshkosh" width={980} height={674} />
        </div>
      </section>

      <section className="section soft">
        <div className="wrap">
          <div className="section-head center">
            <span className="eyebrow">Services</span>
            <h2>Care for every stage of recovery</h2>
            <p className="lead">From post-surgery rehab to sports injuries to vertigo, all under one roof.</p>
          </div>
          <div className="grid grid-3">
            {featured.map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}`} className="card card-img">
                <Image src={s.image} alt="" width={640} height={400} />
                <div className="card-body">
                  <h3>{s.name}</h3>
                  <p>{s.short}</p>
                  <span className="more">Learn more <Icon name="arrow" /></span>
                </div>
              </Link>
            ))}
          </div>
          <div className="center" style={{ marginTop: 32 }}>
            <Link href="/services" className="btn btn-navy">See all services</Link>
          </div>
        </div>
      </section>

      <section className="section pool-band">
        <div className="wrap split">
          <div>
            <span className="eyebrow" style={{ color: "#8fd3ea" }}>Aquatic Therapy</span>
            <h2>The only therapeutic pool in Oshkosh</h2>
            <p className="lead">
              Warm water takes weight off healing joints, so you can start moving and strengthening sooner, with less pain.
            </p>
            <Checks items={["Arthritis and joint pain", "Rehab after surgery or joint replacement", "Balance, walking and coordination", "Chronic back pain and fibromyalgia"]} />
            <div className="btn-row">
              <Link href="/services/aquatic-therapy" className="btn btn-primary">About aquatic therapy</Link>
              <Link href="/pool" className="btn btn-light">Book pool time</Link>
            </div>
          </div>
          <Image src="/img/pool.jpg" alt="The therapeutic pool at Fox Valley Physical Therapy" width={980} height={360} style={{ aspectRatio: "4 / 3" }} />
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head center">
            <span className="eyebrow">What we treat</span>
            <h2>Conditions we see every day</h2>
          </div>
          <ul className="pill-list" style={{ justifyContent: "center" }}>
            {CONDITIONS.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section soft">
        <div className="wrap">
          <div className="grid grid-3">
            <div className="card">
              <div className="icon-chip"><Icon name="user" /></div>
              <h3>No referral needed</h3>
              <p>Wisconsin gives you direct access to a physical therapist. Some insurance plans do want a diagnosis from your doctor for coverage, and we&apos;ll help you check.</p>
            </div>
            <div className="card">
              <div className="icon-chip"><Icon name="shield" /></div>
              <h3>Most insurance accepted</h3>
              <p>We&apos;re in network with most major plans, including Medicare, plus worker&apos;s comp and auto accident claims. Private pay and HSA/FSA welcome.</p>
              <Link href="/insurance" className="more">Insurance & billing <Icon name="arrow" /></Link>
            </div>
            <div className="card">
              <div className="icon-chip"><Icon name="heart" /></div>
              <h3>Your care team talks</h3>
              <p>We work closely with physicians, chiropractors, podiatrists, dentists and case managers, and keep them updated so your care stays on track.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head center">
            <span className="eyebrow">Our team</span>
            <h2>More impressive than our services is our team</h2>
            <p className="lead">Therapy isn&apos;t just our profession. It&apos;s our passion. We keep rehab effective and fun, in a professional but relaxed setting.</p>
          </div>
          <div className="grid grid-4">
            {TEAM.slice(0, 4).map((m) => (
              <Link key={m.slug} href={`/team#${m.slug}`} className="card team-card">
                <Image src={m.photo} alt={m.name} width={264} height={264} />
                <h3>{m.name}</h3>
                <p className="role">{m.role}</p>
              </Link>
            ))}
          </div>
          <div className="center" style={{ marginTop: 32 }}>
            <Link href="/team" className="btn btn-ghost">Meet the whole team</Link>
          </div>
        </div>
      </section>

      <section className="section soft" style={{ paddingTop: 48, paddingBottom: 48 }}>
        <div className="wrap">
          <div className="logos">
            {AFFILIATIONS.map((a) => (
              <div key={a.src}>
                <Image src={a.src} alt={a.alt} width={160} height={56} unoptimized={a.src.endsWith(".svg")} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <CallCta />
    </>
  );
}
