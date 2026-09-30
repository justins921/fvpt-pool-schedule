import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ContactCard, PageHead } from "@/components/Blocks";
import { formatDate, getPost, getPosts } from "@/content/blog";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getPost((await params).slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.description,
    alternates: { canonical: `/blog/${p.slug}` },
    openGraph: { type: "article", publishedTime: p.date, ...(p.image ? { images: [p.image] } : {}) },
  };
}

export default async function PostPage({ params }: Props) {
  const p = getPost((await params).slug);
  if (!p) notFound();
  return (
    <>
      <PageHead title={p.title} crumbs={[{ href: "/blog", label: "Blog" }]} />
      <section className="section">
        <article className="wrap prose">
          <p className="date">{formatDate(p.date)}</p>
          {p.image && <Image src={p.image} alt="" width={980} height={560} style={{ aspectRatio: "16 / 9", objectFit: "cover" }} />}
          <div dangerouslySetInnerHTML={{ __html: p.html }} />
        </article>
      </section>
      <ContactCard />
    </>
  );
}
