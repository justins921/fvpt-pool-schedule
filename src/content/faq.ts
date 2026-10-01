// Site-wide FAQ, editable in the website editor (stored in src/content/data/faq.json).
import data from "./data/faq.json";
import { fill } from "./site";

export type FaqTag = "home" | "services" | "new-patients" | "insurance";

type Item = { question?: string; answer?: string; showOn?: string[] };
const ALL = ((data as { items?: Item[] }).items ?? [])
  .filter((f) => f.question)
  .map((f) => ({ q: fill(f.question ?? ""), a: fill(f.answer ?? ""), showOn: (f.showOn ?? []) as FaqTag[] }));

export const FAQ = ALL.filter((f) => f.showOn.includes("home"));
export const faqFor = (tag: FaqTag) => ALL.filter((f) => f.showOn.includes(tag));
