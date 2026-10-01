// Services and team members, one file each in src/content/data/{services,team}/.
// Server-only: reads the files at build time.
import fs from "node:fs";
import path from "node:path";

export type Service = {
  slug: string;
  name: string;
  order: number;
  seoTitle?: string;
  short: string;
  metaDescription: string;
  image: string;
  intro: string;
  sections: { heading: string; body?: string; list?: string[] }[];
  related?: string[];
  faq?: { q: string; a: string }[];
};

export type TeamMember = {
  slug: string;
  name: string;
  order: number;
  credentials: string;
  role: string;
  photo?: string;
  about: string;
  education?: string[];
  interests?: string;
  certifications?: string[];
};

const DATA = path.join(process.cwd(), "src/content/data");

function readCollection<T extends { order: number }>(dir: string): (T & { slug: string })[] {
  const full = path.join(DATA, dir);
  return fs
    .readdirSync(full)
    .filter((f) => f.endsWith(".json"))
    .map((f) => ({ slug: f.replace(/\.json$/, ""), ...(JSON.parse(fs.readFileSync(path.join(full, f), "utf8")) as T) }))
    .sort((x, y) => (x.order ?? 999) - (y.order ?? 999));
}

// Empty strings from the editor become "not set" so optional sections disappear cleanly.
const clean = <T extends object>(o: T): T =>
  Object.fromEntries(Object.entries(o).filter(([, v]) => v !== "" && !(Array.isArray(v) && v.length === 0))) as T;

type ServiceFile = Omit<Service, "faq"> & { faq?: { question: string; answer: string }[] };

export const SERVICES: Service[] = readCollection<ServiceFile>("services").map((s) =>
  clean({
    ...s,
    sections: (s.sections ?? []).map((sec) => clean({ ...sec, list: sec.list?.filter(Boolean) })),
    faq: s.faq?.filter((f) => f.question).map((f) => ({ q: f.question, a: f.answer })),
  }),
);

// TODO: needs bio details from Lindsey (education, interests, one personal line).
// Her bio is in src/content/data/team/lindsey-hudack.json (JSON can't hold comments).
export const TEAM: TeamMember[] = readCollection<TeamMember>("team").map((m) =>
  clean({ ...m, education: m.education?.filter(Boolean), certifications: m.certifications?.filter(Boolean) }),
);

export const serviceBySlug = (slug: string) => SERVICES.find((s) => s.slug === slug);
