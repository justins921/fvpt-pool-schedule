import type { Metadata } from "next";
import { PageHead } from "@/components/Blocks";

export const metadata: Metadata = { title: "Notice of Nondiscrimination", alternates: { canonical: "/legal/non-discrimination" } };

// Legal text copied verbatim from the previous site. Don't edit without the clinic's sign-off.
export default function NonDiscrimination() {
  return (
    <>
      <PageHead title="Notice of Nondiscrimination" />
      <section className="section">
        <div className="wrap prose">
          <h2>Discrimination is against the law</h2>
          <p>
            Fox Valley Physical Therapy complies with applicable Federal civil rights laws and does not discriminate on the basis of race, color, national origin, age, disability, or sex. Fox Valley Physical Therapy does not exclude people or treat them differently because of race, color, national origin, age, disability, or sex.
          </p>
          <p>Fox Valley Physical Therapy:</p>
          <p>Provides free aids and services to people with disabilities to communicate effectively with us, such as:</p>
          <ul>
            <li>Qualified sign language interpreters</li>
            <li>Written information in other formats (large print, audio, accessible electronic formats, other formats)</li>
          </ul>
          <p>Provides free language services to people whose primary language is not English, such as:</p>
          <ul>
            <li>Qualified interpreters</li>
            <li>Information is written in other languages</li>
          </ul>
          <p>
            You can also file a civil rights complaint with the U.S. Department of Health and Human Services, Office for Civil Rights, electronically through the Office for Civil Rights Complaint Portal, available at{" "}
            <a href="https://ocrportal.hhs.gov/ocr/portal/lobby.jsf">https://ocrportal.hhs.gov/ocr/portal/lobby.jsf</a>, or by mail or phone at:
          </p>
          <p>
            U.S. Department of Health and Human Services
            <br />
            200 Independence Avenue, SW
            <br />
            Room 509F, HHH Building
            <br />
            Washington, D.C. 20201
            <br />
            1-800-368-1019, 800-537-7697 (TDD)
          </p>
          <p>
            Complaint forms are available at <a href="http://www.hhs.gov/ocr/office/file/index.html">http://www.hhs.gov/ocr/office/file/index.html</a>
          </p>
        </div>
      </section>
    </>
  );
}
