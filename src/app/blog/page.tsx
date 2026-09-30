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
    </>
  );
}
