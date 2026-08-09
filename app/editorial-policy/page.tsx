import type { Metadata } from "next";
import Link from "next/link";
import LegalLayout from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Editorial policy",
  description:
    "How Apply IDP Online researches, writes, reviews, and corrects the driving and country information published on this site.",
  alternates: { canonical: "/editorial-policy" },
};

export default function EditorialPolicyPage() {
  return (
    <LegalLayout title="Editorial policy" kicker="Editorial" dateLabel="Last reviewed" updated="July 2026">
      <p>
        This policy explains how we create and maintain the guidance on Apply IDP Online. Our goal is
        simple: help travelers understand International Driving Permits accurately, in plain language,
        without overstating what a permit does.
      </p>

      <h2>Accuracy comes first</h2>
      <p>
        Before we publish a factual claim about driving abroad, permits, or country requirements, we
        check it against an official or primary source. Where we cannot verify something, we either
        leave it out or clearly label it as general guidance rather than a confirmed fact.
      </p>

      <h2>We separate facts from guidance</h2>
      <p>
        Verified facts (for example, the text of an international convention) are presented differently
        from general guidance (for example, what a rental company might ask for). We do not present the
        practices of individual rental companies, insurers, or officials as if they were universal law.
      </p>

      <h2>Plain, honest language</h2>
      <p>
        We avoid marketing claims that could mislead. We do not describe our service as government,
        official, or authorized unless verifiable evidence exists, and we state clearly on every
        relevant page that an IDP does not replace your domestic licence.
      </p>

      <h2>Review and freshness</h2>
      <p>
        Guidance pages carry a &quot;last reviewed&quot; date. We review them periodically and when we
        become aware of a relevant change. Country and requirement information is checked against
        official sources as part of that review. See our{" "}
        <Link href="/content-review">content-review methodology</Link> for how this works.
      </p>

      <h2>Independence</h2>
      <p>
        We are a commercial service, but our commercial goals do not change the facts we publish. If a
        neutral, accurate answer is less flattering to us, we still publish the accurate answer.
      </p>

      <h2>Corrections</h2>
      <p>
        If you spot something inaccurate or out of date, please tell us through our{" "}
        <Link href="/contact">contact page</Link>. We correct confirmed errors promptly and update the
        review date on the page.
      </p>

      <h2>What we do not do</h2>
      <ul>
        <li>We do not invent staff, experts, offices, awards, reviews, or statistics.</li>
        <li>We do not claim affiliation with any government body, motoring club, or convention authority.</li>
        <li>We do not publish requirement claims without a verifiable source.</li>
      </ul>
    </LegalLayout>
  );
}
