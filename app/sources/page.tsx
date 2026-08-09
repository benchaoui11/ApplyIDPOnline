import type { Metadata } from "next";
import Link from "next/link";
import LegalLayout from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Our sources",
  description:
    "The kinds of sources Apply IDP Online relies on for driving, permit, and country information — and how we rank them.",
  alternates: { canonical: "/sources" },
};

export default function SourcesPage() {
  return (
    <LegalLayout title="Our sources" kicker="Sources" dateLabel="Last reviewed" updated="July 2026">
      <p>
        For anything involving law, driving requirements, country rules, or the international
        conventions behind IDPs, we prefer official and primary sources over second-hand summaries.
        This page explains the order of preference we use.
      </p>

      <h2>Source hierarchy</h2>
      <ul>
        <li>
          <strong>Government and official authorities.</strong> National road, transport, or licensing
          authorities and official government travel guidance for the destination country.
        </li>
        <li>
          <strong>International convention texts.</strong> The 1949 Geneva Convention on Road Traffic
          and the 1968 Vienna Convention on Road Traffic, which define the recognised IDP formats.
        </li>
        <li>
          <strong>Embassies and consulates.</strong> Official guidance published by a country&apos;s
          diplomatic missions.
        </li>
        <li>
          <strong>Reputable institutional sources.</strong> Established motoring and travel bodies,
          used to add context — not to override official guidance.
        </li>
        <li>
          <strong>General guidance.</strong> Practical, real-world observations (for example, common
          rental-desk practice). We label these clearly as guidance, not law.
        </li>
      </ul>

      <h2>How we handle uncertainty</h2>
      <p>
        Requirements change and can differ by region, licence origin, and visitor status. When a point
        is unsettled or varies, we say so plainly and point you to the official authority for your
        destination rather than presenting a single answer as universal.
      </p>

      <h2>What we avoid</h2>
      <ul>
        <li>Presenting one rental company&apos;s policy as if it applied everywhere.</li>
        <li>Publishing a requirement without a source we could point to.</li>
        <li>Implying official status or authorization we do not have.</li>
      </ul>

      <h2>Tell us about a source</h2>
      <p>
        If you have an official source that corrects or improves a page, please share it via our{" "}
        <Link href="/contact">contact page</Link>. See also our{" "}
        <Link href="/editorial-policy">editorial policy</Link> and{" "}
        <Link href="/content-review">content-review methodology</Link>.
      </p>
    </LegalLayout>
  );
}
