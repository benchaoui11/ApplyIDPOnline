// City Page System — a lightweight, self-contained sibling to the Country
// Page System (lib/countryData). Cities are a different domain (no
// conventions, no driving-side, no legal requirement level) so this is a
// separate, smaller data model rather than a forced fit into CountryRecord.
//
// Same core discipline as the country registry: the dynamic route reads
// ONLY CITY_REGISTRY to decide what's renderable. No generateStaticParams,
// no mass generation — a slug not present in the registry resolves to
// notFound(). Adding a city later means one data file + one registry line.

export type SourceCitation = {
  label: string;
  url: string;
  organization: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type Airport = {
  code: string;
  name: string;
  note: string;
};

export type Mistake = {
  title: string;
  body: string;
};

export type PopularDestination = {
  name: string;
  slug: string; // links to /countries/{slug}
  note: string;
};

export type ChecklistItem = {
  text: string;
};

export type CityRecord = {
  // Identity
  slug: string; // "new-york-city" — combined with the public URL prefix via a rewrite
  name: string; // "New York City"
  shortName: string; // "New York"
  state: string; // "New York"
  boroughs: string[];
  airports: Airport[];

  // Content
  whyLocalParagraphs: string[];
  whoShouldApply: string[];
  popularDestinations: PopularDestination[];
  commonMistakes: Mistake[];
  airportChecklist: ChecklistItem[];
  localTrustNote: string;

  // FAQ
  faq: FaqItem[];

  // Sourcing & freshness
  sourceCitations: SourceCitation[];
  lastVerifiedDate: string;

  // SEO metadata
  h1: string;
  metaTitle: string;
  metaDescription: string;
  primaryKeyword: string;
};
