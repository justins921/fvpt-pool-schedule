import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHead } from "@/components/Blocks";
import { formatDate, getPosts } from "@/content/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "Tips and guides from the physical therapists at Fox Valley Physical Therapy in Oshkosh, WI.",
  alternates: { canonical: "/blog" },
};

export default function Blog() {
  return (
    <>
      <PageHead title="Blog" text="Guides and tips from our therapists." />
      <section className="section">
        <div className="wrap tiles">
          {getPosts().map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="tile">
              {p.image && <Image src={p.image} alt="" width={560} height={350} />}
              <p className="date" style={{ margin: "0 0 6px" }}>{formatDate(p.date)}</p>
              <h2 style={{ fontSize: "1.35rem", margin: 0 }}>{p.title}</h2>
              <p>{p.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
