import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getCityRecord, cityPublicPath, CITY_REGISTRY } from "@/lib/cityData/registry";
import { GLOBAL_CONSTANTS } from "@/lib/countryData/globalConstants";
import { SITE_URL, ORGANIZATION_ID, ORGANIZATION_NODE, WEBSITE_ID } from "@/lib/schema";
import Breadcrumb from "@/components/country/Breadcrumb";
import DirectAnswerBox from "@/components/content/DirectAnswerBox";
import CityHero from "@/components/city/CityHero";
import PopularDestinationsGrid from "@/components/city/PopularDestinationsGrid";
import MistakesGrid from "@/components/city/MistakesGrid";
import AirportChecklist from "@/components/city/AirportChecklist";
import FaqAccordion from "@/components/FaqAccordion";
import IconBadge from "@/components/IconBadge";

const BASE_URL = SITE_URL;

// Pre-renders every known slug at build time (fixed, finite, hardcoded
// registry — not user input). A slug not in CITY_REGISTRY still 404s via
// notFound() below; generateStaticParams only decides which known slugs
// are built ahead of time, it never widens what counts as valid.
export function generateStaticParams() {
  return Object.keys(CITY_REGISTRY).map((citySlug) => ({ citySlug }));
}

type Params = { citySlug: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { citySlug } = await params;
  const city = getCityRecord(citySlug);
  if (!city) return {};

  const publicPath = cityPublicPath(city.slug);
  const pageUrl = `${BASE_URL}${publicPath}`;
  // Same shared product image as the countries hub — no dedicated
  // per-city photo exists yet (out of scope for this pass).
  const ogImage = {
    url: `${SITE_URL}/images/applyidponline-permit-booklet-details-categories.webp`,
    width: 1624,
    height: 969,
    alt: `International Driving Permit booklet — guidance for ${city.name} travelers`,
  };

  return {
    title: { absolute: city.metaTitle },
    description: city.metaDescription,
    alternates: { canonical: publicPath },
    openGraph: {
      title: city.metaTitle,
      description: city.metaDescription,
      url: pageUrl,
      type: "website",
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: city.metaTitle,
      description: city.metaDescription,
      images: [ogImage.url],
    },
  };
}

function CitySchema({ city }: { city: ReturnType<typeof getCityRecord> }) {
  if (!city) return null;
  const pageUrl = `${BASE_URL}${cityPublicPath(city.slug)}`;
  const breadcrumbId = `${pageUrl}#breadcrumb`;
  const serviceId = `${pageUrl}#service`;

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZATION_NODE,
      {
        "@type": "BreadcrumbList",
        "@id": breadcrumbId,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
          { "@type": "ListItem", position: 2, name: city.name, item: pageUrl },
        ],
      },
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: city.metaTitle,
        description: city.metaDescription,
        dateModified: city.lastVerifiedDate,
        isPartOf: { "@id": WEBSITE_ID },
        breadcrumb: { "@id": breadcrumbId },
        about: { "@id": serviceId },
      },
      {
        "@type": "Service",
        "@id": serviceId,
        name: `International Driving Permit application for ${city.name} travelers`,
        provider: { "@id": ORGANIZATION_ID },
        areaServed: { "@type": "City", name: city.name },
        url: pageUrl,
      },
      {
        "@type": "FAQPage",
        mainEntity: city.faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export default async function CityPage({ params }: { params: Promise<Params> }) {
  const { citySlug } = await params;
  const city = getCityRecord(citySlug);

  if (!city) {
    notFound();
  }

  const faqItems = city.faq.map((f) => ({ q: f.question, a: f.answer }));
  const boroughList = city.boroughs.join(", ");

  return (
    <>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: city.name }]} />
      <CitySchema city={city} />

      <CityHero city={city} />

      {/* Quick Answer */}
      <section className="section" style={{ paddingTop: "16px", paddingBottom: "24px" }}>
        <div className="container" style={{ maxWidth: "820px" }}>
          <DirectAnswerBox kicker="QUICK ANSWER" links={[{ href: "/apply", label: "Start your application" }, { href: "/pricing", label: "See pricing" }]}>
            If you&apos;re a {city.name} resident or traveler planning to drive abroad, you can prepare
            your International Driving Permit (IDP) entirely online — no visit to a AAA branch in{" "}
            {boroughList} required. The IDP translates your existing driver&apos;s license into a
            standardized, multi-language format that rental companies, police, and border officials
            abroad can read, and it&apos;s carried alongside your original license, never instead of
            it.
          </DirectAnswerBox>
        </div>
      </section>

      <div className="container" style={{ maxWidth: "880px" }}>
        {/* Why NYC travelers need one */}
        <div style={{ marginTop: "8px" }}>
          <h2>Why {city.name} travelers often discover they need one too late</h2>
          {city.whyLocalParagraphs.map((p, i) => (
            <p key={i} style={{ marginTop: "12px", fontSize: "15px", color: "var(--text-light)", lineHeight: 1.7 }}>
              {p}
            </p>
          ))}
        </div>

        {/* Who should apply */}
        <div style={{ marginTop: "44px" }}>
          <h2>Who should apply</h2>
          <div style={{ marginTop: "16px", display: "flex", flexDirection: "column", gap: "10px" }}>
            {city.whoShouldApply.map((point, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                <span style={{ marginTop: "1px" }}>
                  <IconBadge name="check" size={16} />
                </span>
                <p style={{ fontSize: "14.5px", color: "var(--text)", lineHeight: 1.6, margin: 0 }}>{point}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Common destinations */}
        <div style={{ marginTop: "44px" }}>
          <h2>Common destinations from {city.name}</h2>
          <p style={{ marginTop: "12px", fontSize: "15px", color: "var(--text-light)", lineHeight: 1.7 }}>
            {city.name}&apos;s airports connect directly to destinations worldwide. These are common
            departure points for travelers preparing an IDP — each guide covers that destination&apos;s
            specific requirements.
          </p>
          <PopularDestinationsGrid destinations={city.popularDestinations} />
          <Link href="/countries" style={{ display: "inline-block", marginTop: "16px", fontSize: "13.5px", fontWeight: 600, color: "var(--blue)" }}>
            Browse all destination guides →
          </Link>
        </div>

        {/* How to apply online */}
        <div style={{ marginTop: "44px" }}>
          <h2>How to apply online</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginTop: "20px" }} className="steps-grid">
            {GLOBAL_CONSTANTS.applicationProcessSteps.map((step) => (
              <div key={step.stage} className="card-elevated" style={{ padding: "20px" }}>
                <p style={{ fontFamily: "var(--font-mono)", fontSize: "12px", fontWeight: 700, color: "var(--blue)" }}>{step.stage}</p>
                <h3 style={{ fontSize: "15px", marginTop: "10px" }}>{step.title}</h3>
                <p style={{ marginTop: "8px", fontSize: "13px", color: "var(--text-light)", lineHeight: 1.6 }}>{step.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Required documents */}
        <div style={{ marginTop: "44px" }}>
          <h2>Required documents</h2>
          <p style={{ marginTop: "12px", fontSize: "15px", color: "var(--text-light)", lineHeight: 1.7 }}>
            Applying online means uploading, not mailing: a photo of your valid U.S. driver&apos;s
            license, a passport-style photo of yourself, and your signature. {city.localTrustNote}
          </p>
        </div>

        {/* Digital vs printed */}
        <div style={{ marginTop: "44px" }}>
          <h2>Digital vs. printed</h2>
          <p style={{ marginTop: "12px", fontSize: "15px", color: "var(--text-light)", lineHeight: 1.7 }}>
            Both formats carry identical legal content. A digital copy is ready on your phone and
            works for most rental counters and checks; {GLOBAL_CONSTANTS.printedFormatAvailability.toLowerCase()}{" "}
            If you&apos;re unsure which your destination expects, printed covers everywhere digital
            does, plus a few places it doesn&apos;t.
          </p>
        </div>

        {/* Processing timeline & pricing */}
        <div style={{ marginTop: "44px" }}>
          <h2>Processing timeline &amp; pricing</h2>
          <p style={{ marginTop: "12px", fontSize: "15px", color: "var(--text-light)", lineHeight: 1.7 }}>
            {GLOBAL_CONSTANTS.digitalDeliveryClaim} Exact pricing depends on your chosen format and
            any add-ons — see current figures on our pricing page rather than a fixed number here.
          </p>
          <Link href="/pricing" className="btn btn-secondary" style={{ marginTop: "12px" }}>
            See pricing
          </Link>
        </div>

        {/* Common mistakes */}
        <div style={{ marginTop: "44px" }}>
          <h2>Common mistakes</h2>
          <p style={{ marginTop: "12px", fontSize: "15px", color: "var(--text-light)", lineHeight: 1.7 }}>
            Most problems {city.shortName}-based travelers run into come down to timing, not the
            document itself.
          </p>
          <MistakesGrid mistakes={city.commonMistakes} />
        </div>

        {/* Airport checklist */}
        <div style={{ marginTop: "44px" }}>
          <h2>{city.name} airport travel checklist</h2>
          <p style={{ marginTop: "12px", fontSize: "15px", color: "var(--text-light)", lineHeight: 1.7 }}>
            Whichever airport you&apos;re flying out of, the same short list applies before you get to
            security.
          </p>
          <AirportChecklist airports={city.airports} checklist={city.airportChecklist} />
        </div>

        {/* FAQ */}
        <div style={{ marginTop: "44px" }}>
          <h2>FAQ</h2>
          <div style={{ marginTop: "20px" }}>
            <FaqAccordion items={faqItems} />
          </div>
          <Link href="/faq" style={{ display: "inline-block", marginTop: "18px", fontSize: "13.5px", fontWeight: 600, color: "var(--blue)" }}>
            See the full FAQ (150+ questions) →
          </Link>
        </div>
      </div>

      {/* Related guides */}
      <section className="section" style={{ background: "var(--surface)", marginTop: "48px" }}>
        <div className="container" style={{ maxWidth: "820px" }}>
          <p className="section-kicker-blue">Related</p>
          <h2 style={{ fontSize: "20px" }}>Guides and resources</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px 22px", marginTop: "18px" }}>
            {[
              { href: "/what-is-idp", label: "What is an IDP?" },
              { href: "/how-to-apply", label: "How to apply" },
              { href: "/countries", label: "Browse destination guides" },
              { href: "/pricing", label: "Compare pricing" },
              { href: "/faq", label: "Full FAQ library" },
              { href: "/sources", label: "Our sources" },
              { href: "/editorial-policy", label: "Editorial policy" },
              { href: "/contact", label: "Contact us" },
            ].map((l) => (
              <Link key={l.href} href={l.href} style={{ fontSize: "13.5px", fontWeight: 600, color: "var(--blue)" }}>
                {l.label} →
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{ background: "var(--navy)", color: "#FFFFFF" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <h2 style={{ color: "#FFFFFF" }}>Ready to prepare your International Driving Permit?</h2>
          <p style={{ marginTop: "12px", color: "#B8C6D9" }}>
            Apply from anywhere in {city.name} — no branch visit, no appointment.
          </p>
          <Link href="/apply" className="btn btn-primary btn-lg" style={{ marginTop: "24px" }}>
            Start application
          </Link>
        </div>
      </section>

      <style>{`
        @media (max-width: 720px) {
          .steps-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
