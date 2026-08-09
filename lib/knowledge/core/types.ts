// Core Country Record types. See docs/KNOWLEDGE_OBJECTS.md v1.1 §2.
// Deliberately small — identity and page-composition fields only. Adding a
// future module must never require touching this type.

import type { PublicationState, ReviewState } from "../shared/types";

export type CoreCountryRecord = {
  slug: string;
  name: string;
  isoCode: string;
  region: string;
  tier: 1 | 2 | 3;
  locale: string;
  identityRef: string;
  moduleOrder: string[];
  relatedCountryRefs: string[];
  faq: { question: string; answer: string }[];
  reviewState: ReviewState;
  publicationState: PublicationState;
  lastVerifiedDate: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  metaTitle: string;
  metaDescription: string;
  // Optional per-country overrides — see the matching fields on
  // CountryRecord (lib/countryData/types.ts) for the full rationale.
  // Omitted for every country that relies on the render layer's default
  // template behavior.
  metaTitleAbsolute?: boolean;
  h1?: string;
  // Gating flags carried over from the legacy record — these decide which
  // optional modules apply, not content themselves.
  motorcycleScooterRelevant: boolean;
  borderCrossingRelevant: boolean;
};
