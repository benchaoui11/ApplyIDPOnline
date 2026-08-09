// Source Registry types. See docs/KNOWLEDGE_OBJECTS.md v1.1 §7 and
// docs/PHASE_3_5_REGISTRY_ENRICHMENT.md for the production-grade fields
// added in Phase 3.5 (all additive — nothing here changes the meaning of
// an existing field, so the Render Adapter's output is unaffected).

export type SourceCategory =
  | "government-advisory"
  | "government-legislation"
  | "convention-text"
  | "commercial-discovery-only";

export type SourceClassification = "primary" | "discovery-only";

export type AuthorityType = "national-government" | "supranational-treaty" | "commercial";

export type PublisherType = "government" | "supranational-body" | "commercial" | "academic" | "ngo";

export type GovernmentLevel = "national" | "regional" | "supranational" | "not-applicable";

// "active" retained from v1.0; "deprecated" added in Phase 3.5 for a
// source that's still reachable but should no longer be cited going
// forward (distinct from "superseded", which means a replacement exists —
// see replacedBySourceId).
export type SourceStatus = "active" | "deprecated" | "unreachable" | "superseded";

export type Source = {
  id: string;
  title: string;
  publisher: string;
  // Normalized publisher name for display/grouping, distinct from the raw
  // `publisher` string a citation label happened to use — e.g. "GOV.UK"
  // rather than "Foreign, Commonwealth & Development Office".
  canonicalPublisher: string;
  publisherType: PublisherType;
  url: string;
  category: SourceCategory;
  classification: SourceClassification;
  authorityType: AuthorityType;
  governmentLevel: GovernmentLevel;
  // Which country/countries this source provides information ABOUT —
  // distinct from `jurisdiction` (who published it). A UK government page
  // about Thailand has jurisdiction "United Kingdom" and countryScope
  // ["thailand"].
  countryScope: string[];
  language: string;
  jurisdiction: string;
  publicationDate?: string;
  lastChecked: string;
  // 0-100, deterministically computed from classification + authorityType
  // (see migration/fromLegacyRecord.ts#computeTrustScore) — never a
  // hand-assigned judgment call per source.
  trustScore: number;
  version: number;
  status: SourceStatus;
  notes?: string;
  // Alternate identifiers/names this source is also known by — e.g. if a
  // government reorganizes a department and the old name persists in
  // older citations.
  aliases: string[];
  // Source replacement chain — at most one of these should be set at a
  // time in either direction.
  replacesSourceId?: string;
  replacedBySourceId?: string;
};
