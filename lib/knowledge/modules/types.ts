// Module types. See docs/KNOWLEDGE_OBJECTS.md v1.1 §3. A module is a
// presentation grouping over Claims — it does not store claim text itself.

import type { VerificationStatus } from "../shared/types";

export type ModuleType = "narrative" | "fact" | "list";

export type GeoRole = "direct-answer" | "fact-table" | "misconception" | "tip-list";

type ModuleCommon = {
  id: string;
  moduleType: ModuleType;
  key: string;
  title: string;
  claimRefs: string[];
  sourceRefs: string[];
  confidence: VerificationStatus | "mixed";
  geoRole: GeoRole;
  schemaRelevant: boolean;
};

export type NarrativeModule = ModuleCommon & {
  moduleType: "narrative";
  directAnswer: string;
  points: { claimRef: string }[];
  solutionNote: string;
  ctaHint?: { label: string; href: string };
};

export type FactModule = ModuleCommon & {
  moduleType: "fact";
  valueClaimRef: string;
  // Added in Phase 3.5: closes a real integrity gap found by the Registry
  // Integrity Checker — every FactModule has a matching KnowledgeObject
  // (lib/knowledge/objects), but nothing referenced it back, making every
  // KnowledgeObject structurally "unused." This link is additive and
  // read by nothing in the render path — Render Adapter output is
  // unaffected.
  knowledgeObjectRef?: string;
};

export type ListModule = ModuleCommon & {
  moduleType: "list";
  entries: { label: string; claimRef: string }[];
};

export type KnowledgeModule = NarrativeModule | FactModule | ListModule;
