import { collection, config, fields, singleton, type ComponentSchema } from "@keystatic/core";

// The website editor at /keystatic. Steve, Gina and Justin sign in through Keystatic Cloud
// (set NEXT_PUBLIC_KEYSTATIC_PROJECT in Vercel). Without it, the editor only works on a developer's computer.
const project = process.env.NEXT_PUBLIC_KEYSTATIC_PROJECT;

const ICONS = [
  { label: "Person", value: "user" }, { label: "Clipboard", value: "clipboard" }, { label: "Water", value: "water" },
  { label: "Speech bubble", value: "talk" }, { label: "Clock", value: "clock" }, { label: "Document", value: "doc" },
  { label: "Phone", value: "phone" }, { label: "Heart", value: "heart" }, { label: "Shield", value: "shield" },
  { label: "Calendar", value: "calendar" }, { label: "Star", value: "star" },
];
const PLACEHOLDERS = "You can use {poolPrice}, {visitsPerWeek}, {lastStart}, {outBy}, {phone}, {street} and {city}; they fill in from Clinic settings.";

const text = (label: string, description?: string) => fields.text({ label, description });
const para = (label: string, description?: string) => fields.text({ label, description, multiline: true });
const seo = {
  seoTitle: text("Google search title", "Shown as the blue link in Google. Keep it under about 45 characters; \" | Fox Valley PT\" is added automatically when it fits."),
  seoDescription: para("Google search description", "The gray text under the link in Google. About 120 to 155 characters."),
};
const iconCards = (label: string) =>
  fields.array(fields.object({ icon: fields.select({ label: "Icon", options: ICONS, defaultValue: "user" }), title: text("Title"), text: para("Text") }), {
    label,
    itemLabel: (p) => p.fields.title.value || "Card",
  });
const bullets = (label: string) => fields.array(text("Bullet"), { label, itemLabel: (p) => p.value || "Bullet" });
const qa = (label: string) =>
  fields.array(fields.object({ question: text("Question"), answer: para("Answer") }), { label, itemLabel: (p) => p.fields.question.value || "Question" });
// Keystatic stores each upload at <directory>/<entry>/<field>.<ext>.
const image = (label: string, dir: string) => fields.image({ label, directory: `public/img/${dir}`, publicPath: `/img/${dir}/` });
const pageSingleton = <S extends Record<string, ComponentSchema>>(label: string, file: string, schema: S) =>
  singleton({ label, path: `src/content/data/pages/${file}`, format: { data: "json" }, schema });

export default config({
  storage: project ? { kind: "cloud" } : { kind: "local" },
  ...(project ? { cloud: { project } } : {}),
  ui: {
    brand: { name: "Fox Valley PT Website" },
    navigation: {
      "Pages": ["home", "servicesPage", "pool", "newPatients", "insurance", "team", "contact", "blogPage"],
      "Services, team & blog": ["services", "staff", "posts", "faq"],
      "Clinic": ["settings"],
    },
  },
  singletons: {
    settings: singleton({
      label: "Clinic settings (phone, hours, pool)",
      path: "src/content/data/settings",
      format: { data: "json" },
      schema: {
        phone: text("Phone"),
        fax: text("Fax"),
        email: text("Email"),
        address: fields.object({ street: text("Street"), city: text("City"), state: text("State"), zip: text("ZIP") }, { label: "Address" }),
        founded: fields.integer({ label: "Year founded" }),
        hours: fields.array(
          fields.object({
            days: text("Days (as shown)", "For example: Monday – Thursday"),
            time: text("Hours (as shown)", "For example: 8:00 am – 5:30 pm, or Closed"),
            opens: text("Opens (24-hour, for Google)", "For example 08:00. Leave blank if closed."),
            closes: text("Closes (24-hour, for Google)", "For example 17:30. Leave blank if closed."),
            schemaDays: fields.multiselect({ label: "Which days (for Google)", options: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((d) => ({ label: d, value: d })) }),
          }),
          { label: "Clinic hours", itemLabel: (p) => `${p.fields.days.value}: ${p.fields.time.value}` },
        ),
        areas: fields.array(text("Area"), { label: "Areas served (footer)", itemLabel: (p) => p.value }),
        pool: fields.object(
          {
            bookingUrl: text("Online booking link", "Paste the Practice Perfect portal link here once online booking is on. Leave blank to show \"call to book\"."),
            monthlyPrice: text("Monthly price", "For example: $35"),
            visitsPerWeek: fields.integer({ label: "Visits per week" }),
            lastStart: text("Last start time"),
            outBy: text("Out of the pool by"),
          },
          { label: "Pool access" },
        ),
      },
    }),
    faq: singleton({
      label: "Frequently asked questions",
      path: "src/content/data/faq",
      format: { data: "json" },
      schema: {
        items: fields.array(
          fields.object({
            question: text("Question"),
            answer: para("Answer", PLACEHOLDERS),
            showOn: fields.multiselect({
              label: "Show on",
              options: [
                { label: "Homepage", value: "home" },
                { label: "Every service page", value: "services" },
                { label: "New Patients", value: "new-patients" },
                { label: "Insurance & Billing", value: "insurance" },
              ],
            }),
          }),
          { label: "Questions", itemLabel: (p) => p.fields.question.value || "Question" },
        ),
      },
    }),
    home: pageSingleton("Homepage", "home", {
      ...seo,
      heroKicker: text("Small label above the headline"),
      heroTitle: text("Headline"),
      heroText: para("Text under the headline", PLACEHOLDERS),
      heroCaptionName: text("Photo caption: name"),
      heroCaptionText: text("Photo caption: second line"),
      servicesKicker: text("Services: small label"),
      servicesTitle: text("Services: heading"),
      approachTitle: text("Approach: heading"),
      approachText: para("Approach: text", PLACEHOLDERS),
      approachCaptionName: text("Steve photo caption: name"),
      approachCaptionText: text("Steve photo caption: quote"),
      benefits: iconCards("Approach: benefit list"),
      teamKicker: text("Team: small label"),
      teamTitle: text("Team: heading"),
      teamText: para("Team: text", PLACEHOLDERS),
      poolKicker: text("Pool: small label"),
      poolTitle: text("Pool: heading"),
      poolText: para("Pool: text", `Leave a blank line between paragraphs. ${PLACEHOLDERS}`),
      faqTitle: text("FAQ: heading"),
      visitTitle: text("Location: heading"),
      visitText: para("Location: text", PLACEHOLDERS),
    }),
    servicesPage: pageSingleton("Services (overview page)", "services", {
      ...seo,
      heroTitle: text("Headline"),
      heroText: para("Text under the headline"),
      ctaTitle: text("Service pages: bottom banner heading", "{service} is replaced with the service name."),
      ctaText: para("Service pages: bottom banner text"),
    }),
    pool: pageSingleton("Pool Access", "pool", {
      ...seo,
      heroTitle: text("Headline"),
      heroText: para("Text under the headline", PLACEHOLDERS),
      title: text("Section heading"),
      text: para("Section text", PLACEHOLDERS),
      points: bullets("Checklist"),
      tipsTitle: text("Tips: heading"),
      tips: iconCards("Tips"),
      faq: qa("Pool questions"),
      ctaTitle: text("Bottom banner heading"),
      ctaText: para("Bottom banner text"),
    }),
    newPatients: pageSingleton("New Patients", "new-patients", {
      ...seo,
      heroTitle: text("Headline"),
      heroText: para("Text under the headline"),
      stepsKicker: text("Steps: small label"),
      stepsTitle: text("Steps: heading"),
      steps: iconCards("Steps"),
      formTitle: text("Intake form: heading"),
      formText: para("Intake form: text"),
      evalKicker: text("Evaluation: small label"),
      evalTitle: text("Evaluation: heading"),
      evalPoints: bullets("Evaluation: checklist"),
      evalText: para("Evaluation: text"),
      faqTitle: text("FAQ: heading"),
      ctaTitle: text("Bottom banner heading"),
      ctaText: para("Bottom banner text"),
    }),
    insurance: pageSingleton("Insurance & Billing", "insurance", {
      ...seo,
      heroTitle: text("Headline"),
      heroText: para("Text under the headline"),
      plansKicker: text("Plans: small label"),
      plansTitle: text("Plans: heading"),
      plansText: para("Plans: text"),
      options: iconCards("Payment options"),
      benefitsKicker: text("Benefits: small label"),
      benefitsTitle: text("Benefits: heading"),
      benefitsText: para("Benefits: text"),
      benefitsPoints: bullets("Benefits: checklist"),
      benefitsFooter: para("Benefits: closing line", PLACEHOLDERS),
      faqTitle: text("FAQ: heading"),
      ctaTitle: text("Bottom banner heading"),
      ctaText: para("Bottom banner text"),
    }),
    team: pageSingleton("Our Team (page wording)", "team", {
      ...seo,
      heroTitle: text("Headline"),
      heroText: para("Text under the headline"),
      introTitle: text("Intro: heading"),
      introText: para("Intro: text"),
      promiseTitle: text("Promise: heading"),
      promiseText: para("Promise: text", "Wrap words in **double asterisks** to make them bold."),
      ctaTitle: text("Bottom banner heading"),
      ctaText: para("Bottom banner text"),
    }),
    contact: pageSingleton("Contact", "contact", {
      ...seo,
      heroTitle: text("Headline"),
      heroText: para("Text under the headline"),
      phoneNote: text("Note under phone"),
      faxNote: text("Note under fax"),
      emailNote: text("Note under email"),
      visitTitle: text("Map: heading"),
      visitText: text("Map: text after the address"),
    }),
    blogPage: pageSingleton("Blog (overview page)", "blog", {
      ...seo,
      heroTitle: text("Headline"),
      heroText: para("Text under the headline"),
    }),
  },
  collections: {
    services: collection({
      label: "Services",
      path: "src/content/data/services/*",
      format: { data: "json" },
      slugField: "name",
      columns: ["order"],
      schema: {
        name: fields.slug({ name: { label: "Service name" }, slug: { label: "Page address", description: "Don't change this once the page is live. It breaks links and Google rankings." } }),
        order: fields.integer({ label: "Order in lists", description: "1 shows first." }),
        seoTitle: text("Shorter name for the Google title (optional)"),
        short: para("One-line summary (cards and page header)"),
        metaDescription: para("Google search description", "About 120 to 155 characters."),
        image: image("Photo", "services"),
        intro: para("Intro paragraph"),
        sections: fields.array(
          fields.object({ heading: text("Heading"), body: para("Paragraph (optional)"), list: bullets("Checklist (optional)") }),
          { label: "Sections", itemLabel: (p) => p.fields.heading.value || "Section" },
        ),
        faq: qa("Questions specific to this service"),
        related: fields.array(fields.relationship({ label: "Service", collection: "services" }), { label: "Related services", itemLabel: (p) => p.value ?? "Service" }),
      },
    }),
    staff: collection({
      label: "Team members",
      path: "src/content/data/team/*",
      format: { data: "json" },
      slugField: "name",
      columns: ["role", "order"],
      schema: {
        name: fields.slug({ name: { label: "Name" }, slug: { label: "Page anchor", description: "Used in links to this person's bio." } }),
        order: fields.integer({ label: "Order on the team page", description: "1 shows first." }),
        credentials: text("Credentials", "For example: DPT, CMTPT"),
        role: text("Role", "For example: Physical Therapist"),
        photo: fields.image({ label: "Headshot", description: "Square photo works best.", directory: "public/img/team", publicPath: "/img/team/" }),
        about: para("About"),
        education: bullets("Education"),
        interests: para("Areas of interest"),
        certifications: bullets("Certifications"),
      },
    }),
    posts: collection({
      label: "Blog posts",
      path: "src/content/blog/*",
      format: { contentField: "content" },
      slugField: "title",
      columns: ["date"],
      schema: {
        title: fields.slug({ name: { label: "Title" }, slug: { label: "Page address", description: "Don't change this once the post is live." } }),
        date: fields.date({ label: "Date" }),
        description: para("Summary (shown on the blog page and in Google)"),
        image: image("Photo", "blog"),
        content: fields.markdoc({ label: "Post", extension: "md" }),
      },
    }),
  },
});
