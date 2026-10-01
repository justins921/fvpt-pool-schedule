// Page wording, editable in the website editor (stored in src/content/data/pages/*.json).
// The editor leaves blank fields out of the file, so every field gets a safe default here.
import blogJson from "./data/pages/blog.json";
import contactJson from "./data/pages/contact.json";
import homeJson from "./data/pages/home.json";
import insuranceJson from "./data/pages/insurance.json";
import newPatientsJson from "./data/pages/new-patients.json";
import poolJson from "./data/pages/pool.json";
import servicesJson from "./data/pages/services.json";
import teamJson from "./data/pages/team.json";

type Card = { icon: string; title: string; text: string };
type QA = { question: string; answer: string };
type Seo = { seoTitle: string; seoDescription: string };

export type HomePage = Seo & {
  heroKicker: string; heroTitle: string; heroText: string; heroCaptionName: string; heroCaptionText: string;
  servicesKicker: string; servicesTitle: string; approachTitle: string; approachText: string;
  approachCaptionName: string; approachCaptionText: string; benefits: Card[];
  teamKicker: string; teamTitle: string; teamText: string; poolKicker: string; poolTitle: string; poolText: string;
  faqTitle: string; visitTitle: string; visitText: string;
};
export type PoolPage = Seo & { heroTitle: string; heroText: string; title: string; text: string; points: string[]; tipsTitle: string; tips: Card[]; faq: QA[]; ctaTitle: string; ctaText: string };
export type NewPatientsPage = Seo & {
  heroTitle: string; heroText: string; stepsKicker: string; stepsTitle: string; steps: Card[]; formTitle: string; formText: string;
  evalKicker: string; evalTitle: string; evalPoints: string[]; evalText: string; faqTitle: string; ctaTitle: string; ctaText: string;
};
export type InsurancePage = Seo & {
  heroTitle: string; heroText: string; plansKicker: string; plansTitle: string; plansText: string; options: Card[];
  benefitsKicker: string; benefitsTitle: string; benefitsText: string; benefitsPoints: string[]; benefitsFooter: string;
  faqTitle: string; ctaTitle: string; ctaText: string;
};
export type TeamPage = Seo & { heroTitle: string; heroText: string; introTitle: string; introText: string; promiseTitle: string; promiseText: string; ctaTitle: string; ctaText: string };
export type ContactPage = Seo & { heroTitle: string; heroText: string; phoneNote: string; faxNote: string; emailNote: string; visitTitle: string; visitText: string };
export type ServicesPage = Seo & { heroTitle: string; heroText: string; ctaTitle: string; ctaText: string };
export type BlogPage = Seo & { heroTitle: string; heroText: string };

const LISTS = new Set(["benefits", "points", "tips", "faq", "steps", "evalPoints", "options", "benefitsPoints"]);

// Missing lists become [], missing text becomes "". Items inside lists get the same treatment.
function withDefaults<T>(data: unknown): T {
  return new Proxy((data ?? {}) as object, {
    get(target, key: string) {
      const v = (target as Record<string, unknown>)[key];
      if (v !== undefined) return v;
      return LISTS.has(key) ? [] : "";
    },
  }) as T;
}

export const PAGES = {
  blog: withDefaults<BlogPage>(blogJson),
  contact: withDefaults<ContactPage>(contactJson),
  home: withDefaults<HomePage>(homeJson),
  insurance: withDefaults<InsurancePage>(insuranceJson),
  newPatients: withDefaults<NewPatientsPage>(newPatientsJson),
  pool: withDefaults<PoolPage>(poolJson),
  services: withDefaults<ServicesPage>(servicesJson),
  team: withDefaults<TeamPage>(teamJson),
};
