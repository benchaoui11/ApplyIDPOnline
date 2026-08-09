import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/country/Breadcrumb";
import CountriesExplorer from "@/components/CountriesExplorer";
import { getCountryDirectory } from "@/lib/countryData/directory";

const SITE_URL = "https://applyidponline.com";

export async function generateMetadata(): Promise<Metadata> {
  const entries = getCountryDirectory();
  const guideCount = entries.filter((e) => e.hasGuide).length;
  const title = "International Driving Permit by Country";
  const description = `Search International Driving Permit guidance for ${guideCount} destinations — driving rules, rental-car expectations, and visitor requirements by country, sourced and reviewed per destination.`;
  // Shared with the country-page fallback and home page — no dedicated
  // "countries hub" photo exists yet (out of scope for this pass).
  const ogImage = {
    url: `${SITE_URL}/images/applyidponline-license-front-upload-guide.webp`,
    width: 1584,
    height: 993,
    alt: "A driver's license — the document every International Driving Permit application starts from",
  };

  return {
    title,
    description,
    alternates: { canonical: "/countries" },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/countries`,
      type: "website",
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage.url],
    },
  };
}

function DirectoryJsonLd({ entries }: { entries: ReturnType<typeof getCountryDirectory> }) {
  const pageUrl = `${SITE_URL}/countries`;
  // Only countries with a real dedicated guide belong in the ItemList — it
  // represents guide pages specifically, not the broader set of
  // destinations that merely link into the application flow.
  const guideEntries = entries.filter((e) => e.hasGuide);
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Countries", item: pageUrl },
        ],
      },
      {
        "@type": "CollectionPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: "International Driving Permit by Country",
        description: `Directory of ${guideEntries.length} destination-specific International Driving Permit guides.`,
        breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
        mainEntity: { "@id": `${pageUrl}#directory-list` },
        about: { "@type": "Thing", name: "International Driving Permit" },
      },
      {
        "@type": "ItemList",
        "@id": `${pageUrl}#directory-list`,
        name: "International Driving Permit guides by country",
        numberOfItems: guideEntries.length,
        itemListElement: guideEntries.map((entry, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: `International Driving Permit guide for ${entry.name}`,
          url: `${SITE_URL}${entry.href}`,
        })),
      },
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export default function CountriesPage() {
  const entries = getCountryDirectory();
  const guideCount = entries.filter((e) => e.hasGuide).length;
  const regionCount = new Set(entries.map((e) => e.region)).size;

  const STATS = [
    { value: `${guideCount}`, label: "destinations with a dedicated guide" },
    { value: `${regionCount}`, label: "regions covered" },
    { value: "2", label: "UN road-traffic conventions (1949 & 1968)" },
  ];

  return (
    <>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Countries" }]} />

      <DirectoryJsonLd entries={entries} />

      <section className="section" style={{ paddingTop: "36px", paddingBottom: "40px", textAlign: "center" }}>
        <div className="container" style={{ maxWidth: "820px" }}>
          <p className="section-kicker-blue" style={{ justifyContent: "center" }}>Countries</p>
          <h1>
            International Driving Permit by country <br className="hide-mobile" />
            — <span style={{ color: "var(--blue)" }}>where it&apos;s used</span>
          </h1>
          <p style={{ marginTop: "18px", fontSize: "15.5px", color: "var(--text-light)", maxWidth: "640px", margin: "18px auto 0" }}>
            Select your destination to see country-specific International Driving Permit guidance —
            typical driving rules, rental-car expectations, and how visitor requirements are usually
            applied. Requirements can depend on where your licence was issued, its language, the
            vehicle you plan to drive, and local rules that change over time, so always confirm
            details on the destination&apos;s own guide before you travel. {guideCount} destinations below
            have a dedicated guide; every other destination still lets you apply directly.
          </p>

          <div style={{ display: "flex", gap: "14px", justifyContent: "center", marginTop: "28px", flexWrap: "wrap" }}>
            <Link href="/apply" className="btn btn-primary btn-lg">
              Start application
            </Link>
            <a href="#directory" className="btn btn-secondary btn-lg">
              Browse destinations
            </a>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginTop: "36px" }} className="stats-grid">
            {STATS.map((s) => (
              <div key={s.label} className="card-elevated" style={{ padding: "22px 16px" }}>
                <p style={{ fontSize: "28px", fontWeight: 700, fontFamily: "var(--font-display)", color: "var(--blue)" }}>{s.value}</p>
                <p style={{ fontSize: "12.5px", color: "var(--text-light)", marginTop: "4px" }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0, paddingBottom: "32px" }}>
        <div className="container" style={{ maxWidth: "720px", textAlign: "center" }}>
          <p style={{ fontSize: "14.5px", color: "var(--text-light)", lineHeight: 1.65 }}>
            An International Driving Permit is used together with your original driving licence — it
            never replaces it, and how it&apos;s treated depends on your destination country, which in
            turn shapes the visitor requirements you&apos;ll encounter. That chain is different for every
            destination, which is why it&apos;s covered destination-by-destination below: open your
            country&apos;s guide for its specific, sourced requirements before you travel.
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <h2 className="visually-hidden">Browse destinations</h2>
          {/* CountriesExplorer defaults to the "Popular" filter client-side,
              so its visible links don't cover every guide on first render.
              This keeps a real <a href> to every guide page in the
              server-rendered HTML regardless of filter state, so no country
              page depends on the sitemap alone for discovery. */}
          <nav aria-label="All destination guides" className="visually-hidden">
            <ul>
              {entries
                .filter((e) => e.hasGuide)
                .map((e) => (
                  <li key={e.slug}>
                    <Link href={e.href}>{e.name}</Link>
                  </li>
                ))}
            </ul>
          </nav>
          <CountriesExplorer entries={entries} />
        </div>
      </section>

      <section className="section" style={{ background: "var(--surface)" }}>
        <div className="container" style={{ maxWidth: "720px" }}>
          <p style={{ fontSize: "14px", color: "var(--text-light)", lineHeight: 1.65 }}>
            An International Driving Permit is a translation and identity document — it does not
            replace your original driving licence, and you should carry both together. A rental
            company&apos;s own policy can differ from what local law actually requires in either
            direction, so a company asking for an IDP isn&apos;t the same as a legal requirement, and a
            company not asking for one doesn&apos;t mean it isn&apos;t required. Review your destination&apos;s
            guide above for its specific details, see our{" "}
            <Link href="/what-is-idp" style={{ color: "var(--blue)", fontWeight: 600 }}>
              What is an IDP guide
            </Link>{" "}
            for the basics, check our{" "}
            <Link href="/faq" style={{ color: "var(--blue)", fontWeight: 600 }}>
              FAQ
            </Link>{" "}
            for common questions, or read our{" "}
            <Link href="/sources" style={{ color: "var(--blue)", fontWeight: 600 }}>
              sources
            </Link>{" "}
            and{" "}
            <Link href="/editorial-policy" style={{ color: "var(--blue)", fontWeight: 600 }}>
              editorial methodology
            </Link>{" "}
            for how we verify what&apos;s published here.
          </p>
        </div>
      </section>

      <section className="section" style={{ background: "var(--navy)", color: "#FFFFFF" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <h2 style={{ color: "#FFFFFF" }}>Ready to apply for your International Driving Permit?</h2>
          <p style={{ marginTop: "12px", color: "#B8C6D9", maxWidth: "560px", margin: "12px auto 0" }}>
            If your destination above has a dedicated guide, review it first for the specific
            details. Applying somewhere else, or a destination without a guide yet? You can still
            start your application for any destination.
          </p>
          <Link href="/apply" className="btn btn-primary btn-lg" style={{ marginTop: "24px" }}>
            Start application
          </Link>
        </div>
      </section>

      <style>{`
        @media (max-width: 640px) {
          .stats-grid { grid-template-columns: 1fr !important; }
          .hide-mobile { display: none; }
        }
      `}</style>
    </>
  );
}
