import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/country/Breadcrumb";
import HelpCenter from "@/components/HelpCenter";
import CountryFaqSearch from "@/components/CountryFaqSearch";
import MostSearched from "@/components/faq/MostSearched";
import BrowseByTopic from "@/components/faq/BrowseByTopic";
import FeaturedGuidance from "@/components/faq/FeaturedGuidance";
import { COUNTRY_REGISTRY } from "@/lib/countryData/registry";
import { FAQ_CATEGORIES, MOST_SEARCHED_QUESTION_IDS, FEATURED_GUIDANCE_IDS, getAllFaqItems, type FaqIcon, type FaqItem } from "@/lib/faqData";

const SITE_URL = "https://applyidponline.com";
const PAGE_URL = `${SITE_URL}/faq`;

const ALL_ITEMS = getAllFaqItems();
const TOTAL_COUNT = ALL_ITEMS.length;
const COUNTRY_ITEMS = ALL_ITEMS.filter((i) => i.id.startsWith("country-"));
const LIBRARY_ITEMS = ALL_ITEMS.filter((i) => !i.id.startsWith("country-"));

const META_TITLE =
  TOTAL_COUNT >= 150
    ? "International Driving Permit FAQ | 150+ Questions Answered"
    : `International Driving Permit FAQ | ${TOTAL_COUNT} Questions Answered`;
const META_DESCRIPTION =
  "Direct answers on International Driving Permit eligibility, validity, countries, rental cars, and how to apply online — 150+ questions, clearly explained.";

const OG_IMAGE = {
  url: `${SITE_URL}/images/applyidponline-secure-driver-details-form.webp`,
  width: 640,
  height: 430,
  alt: "The secure Apply IDP Online driver-details application form",
};

export const metadata: Metadata = {
  title: { absolute: META_TITLE },
  description: META_DESCRIPTION,
  alternates: { canonical: "/faq" },
  openGraph: {
    title: META_TITLE,
    description: META_DESCRIPTION,
    url: PAGE_URL,
    type: "website",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: META_TITLE,
    description: META_DESCRIPTION,
    images: [OG_IMAGE.url],
  },
};

function FaqSchema() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": `${PAGE_URL}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "FAQ", item: PAGE_URL },
        ],
      },
      {
        "@type": "WebPage",
        "@id": `${PAGE_URL}#webpage`,
        url: PAGE_URL,
        name: "International Driving Permit FAQ",
        description: META_DESCRIPTION,
        breadcrumb: { "@id": `${PAGE_URL}#breadcrumb` },
        mainEntity: { "@id": `${PAGE_URL}#faqpage` },
      },
      {
        "@type": "FAQPage",
        "@id": `${PAGE_URL}#faqpage`,
        mainEntity: ALL_ITEMS.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export default function FaqPage() {
  const iconByCategory = new Map(FAQ_CATEGORIES.map((c) => [c.id, c.icon]));
  const iconFor = (item: FaqItem): FaqIcon => iconByCategory.get(item.category) ?? "document";

  const mostSearchedItems = MOST_SEARCHED_QUESTION_IDS.map((id) => ALL_ITEMS.find((i) => i.id === id)).filter((i): i is FaqItem => Boolean(i));
  const featuredItems = FEATURED_GUIDANCE_IDS.map((id) => ALL_ITEMS.find((i) => i.id === id)).filter((i): i is FaqItem => Boolean(i));
  const countries = Object.values(COUNTRY_REGISTRY).sort((a, b) => a.name.localeCompare(b.name));

  return (
    <>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "FAQ" }]} />

      <FaqSchema />

      {/* A — Hero */}
      <section className="section" style={{ paddingTop: "40px", paddingBottom: "28px" }}>
        <div className="container" style={{ maxWidth: "760px", textAlign: "center" }}>
          <p className="section-kicker-blue" style={{ justifyContent: "center" }}>FAQ</p>
          <h1>International Driving Permit FAQ</h1>
          <p style={{ marginTop: "14px", fontSize: "15.5px", color: "var(--text-light)", maxWidth: "600px", margin: "14px auto 0" }}>
            {TOTAL_COUNT} verified answers on eligibility, documents, validity, countries, rental cars, police
            checks, insurance, and delivery — organized so you can find what you need in seconds.
          </p>
          <p style={{ marginTop: "14px", fontSize: "12.5px", color: "var(--text-light)" }}>
            Every answer is checked against{" "}
            <Link href="/sources" style={{ color: "var(--blue)", fontWeight: 600 }}>
              our sources
            </Link>{" "}
            and our{" "}
            <Link href="/editorial-policy" style={{ color: "var(--blue)", fontWeight: 600 }}>
              editorial policy
            </Link>
            .
          </p>
        </div>
      </section>

      {/* B–E — search, most searched, browse by topic, featured guidance, complete library */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container" style={{ maxWidth: "900px" }}>
          <HelpCenter items={LIBRARY_ITEMS} categories={FAQ_CATEGORIES}>
            <MostSearched items={mostSearchedItems} iconFor={iconFor} />
            <BrowseByTopic categories={FAQ_CATEGORIES} items={LIBRARY_ITEMS} />
            <FeaturedGuidance items={featuredItems} iconFor={iconFor} />
          </HelpCenter>
        </div>
      </section>

      {/* F — Country questions, kept visually separate from informational categories */}
      <section className="section" style={{ background: "var(--surface)" }}>
        <div className="container" style={{ maxWidth: "900px" }}>
          <p className="section-kicker-blue">Country guides</p>
          <h2 style={{ fontSize: "20px" }}>Destination-specific requirements</h2>
          <p style={{ marginTop: "8px", fontSize: "14px", color: "var(--text-light)" }}>
            One question per registered destination, generated from the same verified data as each country&apos;s
            full guide.
          </p>
          <div style={{ marginTop: "20px" }}>
            <CountryFaqSearch items={COUNTRY_ITEMS} />
          </div>
          <Link href="/countries" style={{ display: "inline-block", marginTop: "20px", fontSize: "13.5px", fontWeight: 600, color: "var(--blue)" }}>
            View all {countries.length} destination guides →
          </Link>
        </div>
      </section>

      {/* G — Still need help */}
      <section className="section" style={{ background: "var(--navy)", color: "#FFFFFF" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <h2 style={{ color: "#FFFFFF" }}>Still have a question?</h2>
          <p style={{ marginTop: "12px", color: "#B8C6D9", maxWidth: "520px", margin: "12px auto 0" }}>
            If your question isn&apos;t covered here, reach us directly and a person will answer it.
          </p>
          <div style={{ display: "flex", gap: "14px", justifyContent: "center", marginTop: "24px", flexWrap: "wrap" }}>
            <Link href="/contact" className="btn btn-primary btn-lg">
              Contact us
            </Link>
            <Link href="/how-to-apply" className="btn btn-secondary btn-lg">
              How to apply
            </Link>
          </div>
          <div style={{ display: "flex", gap: "18px", justifyContent: "center", marginTop: "20px", flexWrap: "wrap" }}>
            <Link href="/sources" style={{ fontSize: "13px", color: "#B8C6D9" }}>
              Our sources
            </Link>
            <Link href="/editorial-policy" style={{ fontSize: "13px", color: "#B8C6D9" }}>
              Editorial policy
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
