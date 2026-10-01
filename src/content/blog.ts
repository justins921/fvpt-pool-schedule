import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";
import { parse as parseYaml } from "yaml";

export type Post = {
  slug: string;
  title: string;
  date: string;
  description: string;
  image?: string;
  html: string;
};

const DIR = path.join(process.cwd(), "src/content/blog");

function parse(slug: string): Post {
  const raw = fs.readFileSync(path.join(DIR, `${slug}.md`), "utf8");
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) throw new Error(`Missing frontmatter in ${slug}.md`);
  const meta = (parseYaml(match[1]) ?? {}) as Record<string, string>;
  return {
    slug,
    title: meta.title,
    date: String(meta.date),
    description: meta.description ?? "",
    image: meta.image || undefined,
    html: marked.parse(match[2], { async: false }) as string,
  };
}

export function getPosts(): Post[] {
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => parse(f.replace(/\.md$/, "")))
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug: string): Post | undefined {
  return getPosts().find((p) => p.slug === slug);
}

export const formatDate = (d: string) =>
  new Date(`${d}T12:00:00Z`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });
