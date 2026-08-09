// Evidence Registry types. See docs/KNOWLEDGE_OBJECTS.md v1.1 §6 and
// docs/PHASE_3_5_REGISTRY_ENRICHMENT.md for the Phase 3.5 additions (all
// additive — Render Adapter output is unaffected).

import type { VerificationStatus } from "../shared/types";

export type IndependenceClass = "primary" | "corroborating-independent" | "corroborating-derivative";

export type EvidenceCategory = "direct-statement" | "inferred" | "corroborating" | "contextual";

export type EvidenceStrength = "strong" | "moderate" | "weak";

// The editorial-workflow status of the evidence RECORD itself — distinct
// from `verificationStatus`, which is about the underlying fact.
export type EvidenceReviewStatus = "unreviewed" | "reviewed" | "flagged" | "needs-reverification";

export type Evidence = {
  id: string;
  sourceId: string;
  supportedClaimRefs: string[]; // many-to-many was already true in v1.0/Phase 3 — no structural change needed
  country: string;
  locator: string;
  summary: string;
  verificationStatus: VerificationStatus;
  independenceClass: IndependenceClass;
  dateAccessed: string;
  datePublishedOrUpdated?: string;
  reviewer?: string;
  reviewDate?: string;
  limitations?: string;
  notes?: string;
  reReviewDue?: string;
  evidenceCategory: EvidenceCategory;
  evidenceStrength: EvidenceStrength;
  // The evidence's own jurisdiction — usually equal to its Source's, but
  // typed separately in case a future evidence record quotes a
  // sub-section governed by a different jurisdiction than its source.
  jurisdiction: string;
  reviewStatus: EvidenceReviewStatus;
};
