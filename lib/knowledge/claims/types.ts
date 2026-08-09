// Claim Registry types. See docs/KNOWLEDGE_OBJECTS.md v1.1 §5 and
// docs/PHASE_3_5_REGISTRY_ENRICHMENT.md for the Phase 3.5 additions (all
// additive — Render Adapter output is unaffected).

import type { BusinessTruthCategory, ReviewState, VerificationStatus } from "../shared/types";

export type ClaimValidationStatus = "unvalidated" | "validated" | "disputed" | "superseded";

export type Claim = {
  id: string;
  proposition: string;
  allowedWording: string[];
  bannedWording?: string[];
  confidence: VerificationStatus;
  scope: BusinessTruthCategory;
  applicableCountries: string[];
  evidenceRefs: string[]; // MAY be empty — an honest gap, not a defect. See KNOWLEDGE_OBJECTS.md v1.1 §5.1.
  entityRefs: string[];
  reviewState: ReviewState;
  validationStatus: ClaimValidationStatus;
  lastReviewed: string;
  frequencyCapRef?: string;
  // Dependency/relationship graph — all empty by default. Real for
  // Thailand today: none. Typed and integrity-checked (cycle detection)
  // so the capability exists before it's needed, per Phase 3.5's "prepare
  // for 10,000+ claims" requirement.
  dependsOnClaimRefs: string[];
  conflictsWithClaimRefs: string[];
  supersedesClaimRefs: string[];
  supersededByClaimRef?: string;
  // "Claim inheritance": if set, this claim is a country-scoped
  // instantiation of a shared/global claim template. Not exercised by any
  // real data yet — no shared claim templates exist while only one
  // country is migrated.
  sharedFromClaimRef?: string;
};
