import type { Metadata } from "next";
import { PageHead } from "@/components/Blocks";
import { pageMeta } from "@/content/seo";
import { SITE } from "@/content/site";

export const metadata: Metadata = pageMeta({
  title: "Accessibility Statement",
  description: "Fox Valley Physical Therapy is committed to a website everyone can use. How to reach us if something on the site doesn't work for you.",
  path: "/accessibility",
});

export default function Accessibility() {
  return (
    <>
      <PageHead title="Accessibility Statement" />
      <section className="section">
        <div className="wrap prose">
          <p>
            Fox Valley Physical Therapy & Wellness Clinic wants everyone to be able to use this website, including people who use screen readers, keyboard navigation, magnification or other assistive technology.
          </p>
          <h2>Our standard</h2>
          <p>
            We aim to meet the Web Content Accessibility Guidelines (WCAG) 2.1, Level AA. We test the site with automated accessibility tools and by navigating it with a keyboard.
          </p>
          <h2>If something doesn&apos;t work for you</h2>
          <p>
            If you have trouble using any part of this website, or need information in a different format, call us at <a href={SITE.phoneHref}>{SITE.phone}</a> or email <a href={`mailto:${SITE.email}`}>{SITE.email}</a>. Tell us the page and the problem, and we&apos;ll get you the information another way and work on a fix.
          </p>
          <p>
            We also provide free aids and services, including qualified interpreters and information in other formats. See our <a href="/legal/non-discrimination">Notice of Nondiscrimination</a>.
          </p>
        </div>
      </section>
    </>
  );
}
