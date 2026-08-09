import type { Metadata } from "next";
import Link from "next/link";
import LegalLayout from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Content-review methodology",
  description:
    "The steps Apply IDP Online takes to check driving and country information before it is published, and how often pages are reviewed.",
  alternates: { canonical: "/content-review" },
};

export default function ContentReviewPage() {
  return (
    <LegalLayout title="Content-review methodology" kicker="Methodology" dateLabel="Last reviewed" updated="July 2026">
      <p>
        Every guidance page on this site goes through the same review process before it is published,
        and is checked again on a recurring basis. This page describes that process so you can judge how
        much weight to give what you read here.
      </p>

      <h2>Before a page is published</h2>
      <ul>
        <li>Each factual claim is checked against an official or primary source (see <Link href="/sources">our sources</Link>).</li>
        <li>Verified facts are separated from general guidance, and guidance is labelled as such.</li>
        <li>Requirements are framed as variable — by destination, licence origin, rental company, and local authority.</li>
        <li>Claims we cannot verify are removed or clearly marked as uncertain.</li>
        <li>A member of our review team reads the page for accuracy and clarity before it goes live.</li>
      </ul>

      <h2>Ongoing review</h2>
      <ul>
        <li>Guidance pages display a &quot;last reviewed&quot; date.</li>
        <li>We re-check pages periodically and when we become aware of a relevant change.</li>
        <li>When a page is updated, its review date is updated too.</li>
      </ul>

      <h2>Corrections</h2>
      <p>
        If a reader reports a confirmed error, we correct it promptly and refresh the review date. You
        can reach us through the <Link href="/contact">contact page</Link>.
      </p>

      <h2>Honesty about limits</h2>
      <p>
        We are not a government authority and cannot speak for one. For a binding answer on any specific
        situation, we point you to the official road authority or embassy of your destination. This is
        set out in full in our <Link href="/legal/disclaimer">disclaimer</Link>.
      </p>
    </LegalLayout>
  );
}
