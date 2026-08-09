import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCountryRecord, COUNTRY_REGISTRY } from "@/lib/countryData/registry";
import { GLOBAL_CONSTANTS } from "@/lib/countryData/globalConstants";
import { DESTINATIONS } from "@/lib/destinations";
import { SITE_URL, ORGANIZATION_ID, ORGANIZATION_NODE, WEBSITE_ID } from "@/lib/schema";
import Breadcrumb from "@/components/country/Breadcrumb";
import CountryHero from "@/components/country/CountryHero";
import WhyTravellersChooseUs from "@/components/country/WhyTravellersChooseUs";
import EligibilitySection from "@/components/country/EligibilitySection";
import ProcessJourney from "@/components/country/ProcessJourney";
import PracticalGuide from "@/components/country/PracticalGuide";
import FormatNote from "@/components/country/FormatNote";
import GlancePanel from "@/components/country/GlancePanel";
import CountryFaq from "@/components/country/CountryFaq";
import RelatedCountries from "@/components/country/RelatedCountries";
import SourcesAndReview from "@/components/country/SourcesAndReview";
import ContextualCta from "@/components/country/ContextualCta";

// Pre-renders every known slug at build time (this is a fixed, finite,
// hardcoded registry, not user input, so there's no "accidental mass
// generation" risk). A slug that isn't in COUNTRY_REGISTRY still 404s via
// notFound() below — generateStaticParams only decides which of the KNOWN
// slugs get built ahead of time; it never widens what counts as valid.
export function generateStaticParams() {
  return Object.keys(COUNTRY_REGISTRY).map((slug) => ({ country: slug }));
}

type Params = { country: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { country: slug } = await params;
  const country = getCountryRecord(slug);
  if (!country) return {};

  const pageUrl = `${SITE_URL}/countries/${country.slug}`;
  // No dedicated per-country hero photo exists yet (out of scope for this
  // pass — no new content/image creation). Reuses the same real product
  // image as the homepage rather than shipping no og:image at all.
  const ogImage = {
    url: `${SITE_URL}/images/applyidponline-permit-booklet-details-categories.webp`,
    width: 1624,
    height: 969,
    alt: `International Driving Permit booklet — guidance for ${country.name}`,
  };

  return {
    title: country.metaTitleAbsolute ? { absolute: country.metaTitle } : country.metaTitle,
    description: country.metaDescription,
    alternates: { canonical: `/countries/${country.slug}` },
    openGraph: {
      title: country.metaTitle,
      description: country.metaDescription,
      url: pageUrl,
      type: "website",
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: country.metaTitle,
      description: country.metaDescription,
      images: [ogImage.url],
    },
  };
}

export default async function CountryPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { country: slug } = await params;
  const country = getCountryRecord(slug);

  if (!country) {
    notFound();
  }

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Countries", href: "/countries" },
          { label: country.name },
        ]}
      />
      <CountryHero country={country} />
      <WhyTravellersChooseUs />
      <EligibilitySection country={country} />
      <ProcessJourney country={country} />
      <PracticalGuide country={country} />
      <FormatNote country={country} />
      <GlancePanel country={country} />
      <CountryFaq country={country} />
      <RelatedCountries slugs={country.relatedCountrySlugs} />
      <SourcesAndReview country={country} />

      <section className="section" style={{ background: "var(--navy)", color: "#FFFFFF" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <h2 style={{ color: "#FFFFFF" }}>Prepare your IDP before driving in {country.name}</h2>
          <p style={{ marginTop: "12px", color: "#B8C6D9" }}>
            Apply fully online in minutes. Every submission is reviewed by our team, with fast digital delivery and printed copies shipped worldwide.
          </p>
          <div style={{ marginTop: "24px" }}>
            <ContextualCta variant="apply" countryName={country.name} />
          </div>
        </div>
      </section>

      <JsonLd countrySlug={country.slug} />
    </>
  );
}

function JsonLd({ countrySlug }: { countrySlug: string }) {
  const country = getCountryRecord(countrySlug);
  if (!country) return null;

  const pageUrl = `${SITE_URL}/countries/${country.slug}`;
  const breadcrumbId = `${pageUrl}#breadcrumb`;
  const serviceId = `${pageUrl}#service`;

  // Same fallback the RelatedCountries component uses: link to a real
  // country page where one exists in the registry, otherwise fall back to
  // /apply?destination= so structured data never points at a 404.
  const relatedItems = country.relatedCountrySlugs
    .map((slug) => {
      const destination = DESTINATIONS.find((d) => d.slug === slug);
      if (!destination) return null;
      const related = getCountryRecord(slug);
      return {
        name: destination.country,
        url: related ? `${SITE_URL}/countries/${slug}` : `${SITE_URL}/apply?destination=${encodeURIComponent(destination.country)}`,
      };
    })
    .filter((e): e is { name: string; url: string } => e !== null);

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZATION_NODE,
      {
        "@type": "BreadcrumbList",
        "@id": breadcrumbId,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Countries", item: `${SITE_URL}/countries` },
          { "@type": "ListItem", position: 3, name: country.name, item: pageUrl },
        ],
      },
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: country.metaTitle,
        description: country.metaDescription,
        dateModified: country.lastVerifiedDate,
        isPartOf: { "@id": WEBSITE_ID },
        breadcrumb: { "@id": breadcrumbId },
        about: { "@id": serviceId },
      },
      {
        "@type": "Country",
        name: country.name,
      },
      {
        "@type": "Service",
        "@id": serviceId,
        name: `International Driving Permit application for ${country.name}`,
        provider: { "@id": ORGANIZATION_ID },
        areaServed: { "@type": "Country", name: country.name },
        url: pageUrl,
      },
      // Exactly one HowTo entity — sourced from the single process/journey
      // flow (ProcessJourney), never duplicated under a second label.
      {
        "@type": "HowTo",
        name: `How to apply for an International Driving Permit for ${country.name}`,
        step: GLOBAL_CONSTANTS.applicationProcessSteps.map((s) => ({
          "@type": "HowToStep",
          name: s.title,
          text: s.body,
        })),
      },
      {
        "@type": "FAQPage",
        mainEntity: country.faq.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      },
      {
        "@type": "ItemList",
        itemListElement: relatedItems.map((item, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: item.name,
          url: item.url,
        })),
      },
    ],
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
