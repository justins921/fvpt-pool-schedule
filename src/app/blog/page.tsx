import type { Metadata } from "next";
import { pageMeta } from "@/content/seo";
import Image from "next/image";
import Link from "next/link";
import { ContactCard, HeroButtons, PhotoHero } from "@/components/Blocks";
import { formatDate, getPosts } from "@/content/blog";

export const metadata: Metadata = pageMeta({
  title: "Physical Therapy Blog",
  description: "Guides and tips from the physical therapists at Fox Valley Physical Therapy in Oshkosh, WI on recovery, pain relief and staying active.",
  path: "/blog",
  image: "/img/therapy-1.jpg",
});

export default function Blog() {
  return (
    <>
      <PhotoHero title="From Our Blog" text="Guides and tips from our therapists on recovery, pain and staying active." image="/img/therapy-1.jpg">
        <HeroButtons secondary={{ href: "/services", label: "Our Services" }} />
      </PhotoHero>
      <section className="section soft">
        <div className="wrap svc-grid">
          {getPosts().map((p) => (
            <div key={p.slug} className="svc">
              <Image src={p.image ?? "/img/therapy-1.jpg"} alt="" width={560} height={350} />
              <div className="body">
                <p className="date" style={{ margin: "0 0 4px" }}>{formatDate(p.date)}</p>
                <h2 style={{ fontSize: "1.08rem", marginBottom: 6 }}>{p.title}</h2>
                <p>{p.description}</p>
                <Link href={`/blog/${p.slug}`} className="btn ghost">Read Post</Link>
              </div>
            </div>
          ))}
        </div>
      </section>
      <ContactCard />
    </>
  );
}
