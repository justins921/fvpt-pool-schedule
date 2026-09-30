import Image from "next/image";
import Link from "next/link";
import { CallBox, Checks, PhotoCta } from "@/components/Blocks";
import Icon from "@/components/Icon";
import { FAQ } from "@/content/faq";
import { SERVICES } from "@/content/services";
import { POOL, SITE } from "@/content/site";

const AFFILIATIONS = [
  { src: "/img/affiliations/apta.svg", alt: "American Physical Therapy Association" },
  { src: "/img/affiliations/wpta.svg", alt: "Wisconsin Physical Therapy Association" },
  { src: "/img/affiliations/aota.jpg", alt: "American Occupational Therapy Association" },
  { src: "/img/affiliations/wota.png", alt: "Wisconsin Occupational Therapy Association" },
  { src: "/img/affiliations/oshkosh-chamber.png", alt: "Oshkosh Chamber of Commerce" },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

export default function Home() {
  const tiles = SERVICES.filter((s) => s.slug !== "wellness").slice(0, 9);

  return (
    <>
      <section className="hero">
        <div className="wrap">
          <div>
            <p className="kicker">Voted top private practice in Winnebago County</p>
            <h1>
              One-On-One Physical Therapy In <mark>Oshkosh</mark> Since 1990
            </h1>
            <ul className="ticks">
              <li><Icon name="tick" /> No Referral Needed</li>
              <li><Icon name="tick" /> Locally Owned & Operated</li>
              <li><Icon name="tick" /> Most Insurance Accepted, Including Medicare</li>
            </ul>
            <CallBox />
          </div>
          <div className="hero-photo">
            <Image src="/img/staff-group.jpg" alt="The Fox Valley Physical Therapy team outside the clinic" width={720} height={480} priority />
            <div className="hero-tag">
              <b>35k+</b>
              <span>new patients treated in Oshkosh and the Fox Valley</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section tight">
        <div className="wrap">
          <div className="banner">
            <div className="seal">
              <div>
                <span>Since</span>
                <b>1990</b>
              </div>
            </div>
            <div>
              <p className="over">The only therapeutic pool in Oshkosh</p>
              <h2>
                Hands-On Care From Your Therapist, <em>Every Single Visit.</em>
              </h2>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="intro">
            <h2>Physical Therapy You Can Trust</h2>
            <p>
              Fox Valley Physical Therapy & Wellness Clinic is a locally owned clinic on S Washburn Street in Oshkosh. We&apos;ve grown from a 500 square foot office into a 7,500 square foot clinic with a therapeutic pool and a fully equipped gym. Every patient gets one-on-one attention and a plan built for them.
            </p>
          </div>
          <div className="tiles">
            {tiles.map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}`} className="tile">
                <Image src={s.image} alt="" width={560} height={350} />
                <h3>{s.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="row">
            <Image src="/img/team/steve.png" alt="Steve Sobojinski, OTR, CSCS, co-founder" width={480} height={480} style={{ maxWidth: 400, aspectRatio: "1", justifySelf: "center" }} />
            <div>
              <h2>Why Choose Fox Valley Physical Therapy?</h2>
              <p className="sub">Family-Owned in Oshkosh Since 1990</p>
              <p>
                Steve Sobojinski, OTR, CSCS, and Regina Sobojinski, PT, started Fox Valley Physical Therapy in 1990 with office manager Patti Ahrens. More than 30 years later, Steve and Regina are still treating patients, alongside a team with over 100 years of combined experience.
              </p>
              <p>
                &quot;I treat their injuries as if they were my injuries.&quot; That&apos;s how Steve puts it, and it&apos;s how the whole clinic works. At every appointment you get hands-on, one-on-one attention from your therapist. We find what&apos;s causing the problem, treat it, and teach you how to keep it from coming back.
              </p>
              <Link href="/team" className="btn line">Meet Our Team</Link>
            </div>
          </div>
          <div className="row flip">
            <Image src="/img/patient-treated.jpg" alt="A therapist working with a patient in the clinic gym" width={980} height={360} />
            <div>
              <h3 style={{ fontSize: "1.9rem" }}>We Talk To Your Doctor, So You Don&apos;t Have To</h3>
              <p>
                We work closely with area physicians, chiropractors, nurse practitioners, podiatrists, dentists, athletic trainers and insurance companies. If you&apos;re not progressing the way you should, your therapist calls your referral source to decide on next steps, whether that&apos;s more testing, a change in plan, or discharge. It saves you time and money.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section white">
        <div className="wrap">
          <div className="row">
            <div>
              <h2>The Only Therapeutic Pool In Oshkosh</h2>
              <p className="sub">Aquatic Therapy & Pool Access</p>
              <p>
                Warm water takes weight off healing joints, so you can start moving and strengthening sooner and with less pain. It&apos;s a great fit for arthritis, rehab after surgery or joint replacement, balance problems and chronic back pain.
              </p>
              <p>
                Finished with therapy? Current and former patients can reserve the pool on their own for {POOL.monthlyPrice} a month.
              </p>
              <div className="btn-row">
                <Link href="/services/aquatic-therapy" className="btn">Aquatic Therapy</Link>
                <Link href="/pool" className="btn line">Pool Access</Link>
              </div>
            </div>
            <Image src="/img/pool.jpg" alt="The therapeutic pool at Fox Valley Physical Therapy" width={980} height={360} />
          </div>
        </div>
      </section>

      <PhotoCta />

      <section className="section">
        <div className="wrap">
          <div className="row top">
            <div>
              <h2>Your Physical Therapy Clinic In Oshkosh</h2>
              <p className="sub">Serving Oshkosh and the Fox Valley since 1990</p>
              <p>
                We treat neck and back pain, shoulder, knee, hip and ankle injuries, hand and wrist injuries, headaches, TMJ, vertigo, arthritis and fibromyalgia, and we handle rehab after surgery and joint replacement. Our team includes physical therapists, an occupational therapist who specializes in the shoulder and hand, physical therapist assistants and a licensed athletic trainer.
              </p>
              <Checks items={["Free parking right out front", "Most insurance accepted, including Medicare", "Worker's comp and auto accident claims", "Private pay options and HSA/FSA"]} />
              <p>
                <strong>{SITE.address.street}, {SITE.address.city}, {SITE.address.state} {SITE.address.zip}</strong>
                <br />
                <a href={SITE.mapsUrl}>Get directions</a>
              </p>
            </div>
            <iframe className="map" src={SITE.mapsEmbed} title="Map to Fox Valley Physical Therapy" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="intro">
            <h2>Frequently Asked Questions</h2>
          </div>
          <div className="faq">
            {FAQ.map((f) => (
              <div key={f.q} className="card">
                <h3>{f.q}</h3>
                <p>{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section white">
        <div className="wrap">
          <div className="logos">
            {AFFILIATIONS.map((a) => (
              <div key={a.src}>
                <Image src={a.src} alt={a.alt} width={160} height={54} unoptimized={a.src.endsWith(".svg")} />
              </div>
            ))}
          </div>
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </>
  );
}
