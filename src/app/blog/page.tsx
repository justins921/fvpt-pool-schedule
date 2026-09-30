import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHead } from "@/components/Blocks";
import Icon from "@/components/Icon";
import { formatDate, getPosts } from "@/content/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "Tips and guides from the physical therapists at Fox Valley Physical Therapy in Oshkosh, WI.",
  alternates: { canonical: "/blog" },
};

export default function Blog() {
  const posts = getPosts();
  return (
    <>
      <PageHead title="Blog" lead="Guides and tips from our therapists." />
      <section className="section">
        <div className="wrap grid grid-3">
          {posts.map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className={`card${p.image ? " card-img" : ""}`}>
              {p.image && <Image src={p.image} alt="" width={640} height={400} />}
              <div className={p.image ? "card-body" : undefined}>
                <small className="eyebrow" style={{ marginBottom: 6 }}>{formatDate(p.date)}</small>
                <h2 style={{ fontSize: "1.25rem", fontFamily: "inherit", fontWeight: 700 }}>{p.title}</h2>
                <p>{p.description}</p>
                <span className="more">Read more <Icon name="arrow" /></span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
