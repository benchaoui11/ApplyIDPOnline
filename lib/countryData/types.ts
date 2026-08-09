// Country Data Model — see the approved architecture in the Country Page System
// plan. Two-layer split: GlobalConstants (Business Truth Layer facts, one
// instance, referenced by every country page) and CountryRecord (per-
// destination facts, one instance per country in the registry).

export type VerificationStatus = "confirmed" | "partially_sourced" | "pending";

export type SourceCitation = {
  label: string;
  url: string;
  organization: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type TravelerTip = {
  tip: string;
  status: VerificationStatus;
};

// A single "Before You Drive" tab's full content — direct answer first,
// then structured points, then a calm solution-first note, then an
// optional link back into the conversion path. Every point carries its
// own verificationStatus so a tab can mix confirmed and partially-sourced
// content honestly rather than needing a single blanket flag.
export type GuideTab = {
  label: string;
  directAnswer: string;
  points: TravelerTip[];
  solutionNote: string;
  ctaHint?: { label: string; href: string };
};

export type PopularArea = {
  name: string;
  note: string;
  status: VerificationStatus;
};

// ---------------------------------------------------------------------------
// Global Constants — Business Truth Layer facts. Never destination-specific.
// A field that could tempt a per-country override (submission duration,
// printed-delivery timing) deliberately has no home anywhere in this shape.
// ---------------------------------------------------------------------------
export type GlobalConstants = {
  applicationProcessSteps: {
    stage: string;
    title: string;
    body: string;
  }[];
  digitalDeliveryClaim: string;
  printedFormatAvailability: string;
  trustDisclosureCopy: string;
  originalLicenseRequirementCopy: string;
  trustCards: {
    title: string;
    body: string;
    icon: "check" | "shield" | "layers" | "globe" | "calendar" | "tag";
  }[];
};

// ---------------------------------------------------------------------------
// Country Record — per-destination. Every Category C field carries its own
// verificationStatus; fields without corroborating evidence are marked
// "pending" and the consuming component omits them rather than inventing
// content.
// ---------------------------------------------------------------------------
export type CountryRecord = {
  // Identity
  slug: string;
  name: string;
  isoCode: string;
  region: string;
  // See lib/countryData/tiers.ts (TIER_DEFINITIONS) for the canonical
  // meaning of each tier and the depth it's expected to carry.
  tier: 1 | 2 | 3;

  // Convention & legal status (Category C)
  conventionStatus: {
    value: string;
    status: VerificationStatus;
  };
  // Short (2-4 word) headline label for the Glance panel's Convention card —
  // must not name a specific treaty unless conventionStatus.value actually
  // confirms it; countries whose operative rule doesn't hinge on a named
  // convention should use a short accurate phrase instead (e.g. "Policy-based
  // acceptance") rather than defaulting to "Geneva & Vienna".
  conventionLabel: string;
  idpRequirementLevel: {
    value: "Legally required" | "Commonly requested" | "Rarely requested" | "Unconfirmed";
    status: VerificationStatus;
  };
  minimumDrivingAge: {
    value: number;
    status: VerificationStatus;
  };
  digitalIdpAcceptance: {
    value: string;
    status: VerificationStatus;
  };

  // Practical driving data (Category C)
  drivingSide: {
    value: "Left" | "Right";
    status: VerificationStatus;
  };

  // "Before You Drive" tab content — each present field becomes one tab.
  drivingGuide?: GuideTab;
  roadRulesGuide?: GuideTab;
  rentalGuide?: GuideTab;
  scooterGuide?: GuideTab;
  policeGuide?: GuideTab;
  borderCrossingGuide?: GuideTab;

  // Vehicle relevance flags
  motorcycleScooterRelevant: boolean;
  vehicleCategoryNote?: { value: string; status: VerificationStatus };
  // Short (2-4 word) headline label for the Glance panel's "Vehicle
  // categories" card — same pattern as conventionLabel. Must reflect the
  // categories this specific country's IDP actually covers, never a fixed
  // default, since not every country's vehicleCategoryNote implies the
  // same category set.
  vehicleCategoryLabel?: string;

  // Popular driving areas within the country — semantic SEO coverage for
  // city-level search intent, never implying city-specific legal rules
  // where none exist (the IDP requirement is national, not municipal).
  popularDrivingAreas: PopularArea[];

  // Border crossing — when relevant, borderCrossingGuide (above) supplies
  // the tab content (including any common routes, expressed as points like
  // every other guide) rather than a separate, redundant routes field.
  borderCrossingRelevant: boolean;

  // Emergency numbers — omitted entirely for this record (pending, not invented)
  emergencyNumber?: { value: string; status: VerificationStatus };
  roadsideAssistanceNumber?: { value: string; status: VerificationStatus };

  // FAQ (Category C, mixed)
  faq: FaqItem[];

  // Sourcing & freshness metadata
  sourceCitations: SourceCitation[];
  lastVerifiedDate: string;

  // Relationship data
  relatedCountrySlugs: string[];

  // SEO metadata
  primaryKeyword: string;
  secondaryKeywords: string[];
  metaTitle: string;
  metaDescription: string;
  // When true, the rendered <title> tag uses metaTitle verbatim, bypassing
  // the root layout's "%s | IDP Online" template. Optional — omitted for
  // every country whose metaTitle is deliberately short enough to read
  // well WITH that suffix (the default, established pattern). Only set
  // this when a country's metaTitle is itself tuned to an exact character
  // budget (e.g. a 55-60 char CTR-optimized title) that the suffix would
  // push past.
  metaTitleAbsolute?: boolean;
  // Optional per-country override for the hero H1. Falls back to the
  // template's "International Driving Permit for {name}" pattern when
  // omitted — every existing country relies on that fallback. Only set
  // this for a country whose exact H1 text needs to differ from the
  // shared pattern.
  h1?: string;
};
