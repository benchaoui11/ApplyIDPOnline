// Knowledge Object Registry types. See docs/KNOWLEDGE_OBJECTS.md v1.1 §3
// and docs/PHASE_3_5_REGISTRY_ENRICHMENT.md for the Phase 3.5 additions
// (all additive — Render Adapter output is unaffected).

import type { ReviewState, VerificationStatus } from "../shared/types";

export type KnowledgeObjectScope = { kind: "global" } | { kind: "country"; countrySlug: string };

export type KnowledgeObject = {
  id: string;
  type: string; // e.g. "driving-side", "emergency-number", "idp-requirement-level"
  canonicalValue: string | number;
  label: string;
  entityRefs: string[];
  claimRefs: string[];
  evidenceRefs: string[];
  sourceRefs: string[];
  applicableCountries: string[];
  scope: KnowledgeObjectScope;
  confidence: VerificationStatus;
  lastReviewed: string;
  reviewer?: string;
  lifecycleState: ReviewState;
  schemaMapping?: { schemaType: string; property: string };
  geoRole?: "atomic-fact";
  // Phase 3.5 additions:
  version: number;
  inheritsFromRef?: string;
  relatedObjectRefs: { relation: string; objectId: string }[];
  dependsOnRefs: string[];
  // "global" or a country slug — who authored/owns this object's value,
  // distinct from `scope` (which describes what it's ABOUT).
  sharedOwner: string;
  usedByCountries: string[];
  metadata: Record<string, string>;
};
