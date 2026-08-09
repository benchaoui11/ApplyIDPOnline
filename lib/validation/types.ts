// Shared types for the country-record validator.
//
// This validator is warn-only: see scripts/validate-country.ts. It never
// exits non-zero (the --check-snapshot regression mode is the one
// deliberate exception — see snapshot.ts) and is not wired into any build
// step. See docs/VALIDATION_RULES.md for the rule definitions this file's
// RuleId values correspond to, docs/RULE_TRACEABILITY.md (generated) for
// document -> rule -> implementation mapping, and
// docs/VALIDATOR_ARCHITECTURE.md for what "deterministic" vs "heuristic"
// vs "human-review-only" vs "requires-future-architecture" mean here.

import type { CountryRecord } from "@/lib/countryData/types";
import type { Destination } from "@/lib/destinations";
import type { GlobalConstants } from "@/lib/countryData/types";
import type { RenderedPage } from "./renderedPage";

export type Severity = "FAIL" | "WARN";

// PASS/FAIL/WARN reflect an executed check. NOT_IMPLEMENTED means the rule
// is documented in VALIDATION_RULES.md but this validator does not check
// it — it must never be silently omitted or reported as PASS.
export type RuleStatus = "PASS" | "FAIL" | "WARN" | "NOT_IMPLEMENTED";

export type RuleCategory =
  | "Business Truth"
  | "Research"
  | "Knowledge Objects"
  | "Editorial"
  | "SEO"
  | "GEO"
  | "Schema"
  | "Internal Linking"
  | "Metadata"
  | "Accessibility"
  | "Data Integrity";

// How trustworthy/mechanical a rule's verdict is. See
// docs/VALIDATOR_ARCHITECTURE.md for the full rationale per rule.
//   deterministic              - exact, reproducible check; a given input
//                                 always produces the same verdict with no
//                                 approximation involved.
//   heuristic                  - approximate/threshold-based; can have
//                                 false positives or false negatives by
//                                 design, and is documented as such.
//   requires-future-architecture - the rule is well-defined but the data
//                                 model doesn't yet carry what it needs to
//                                 check (reported NOT_IMPLEMENTED).
export type RuleKind = "deterministic" | "heuristic" | "requires-future-architecture";

export type RuleContext = {
  slug: string;
  record: CountryRecord;
  registry: Record<string, CountryRecord>;
  destinations: Destination[];
  globals: GlobalConstants;
  // null when the dev server was unreachable — every rule that depends on
  // rendered HTML must handle this by returning NOT_IMPLEMENTED, not by
  // guessing or throwing.
  renderedPage: RenderedPage | null;
};

export type Finding = {
  ruleId: string;
  category: RuleCategory;
  severity: Severity;
  kind: RuleKind;
  status: RuleStatus;
  message: string;
  path?: string;
  evidence?: string;
  remediation?: string;
  sourceDoc: string;
  implementationRef: string;
};

export type RuleDefinition = {
  id: string;
  category: RuleCategory;
  severity: Severity;
  kind: RuleKind;
  description: string;
  sourceDoc: string;
  // file:symbol pointer used by the rule-traceability generator — must
  // stay accurate; it is not verified against the filesystem automatically.
  implementationRef: string;
  requiresRenderedPage: boolean;
  check: (ctx: RuleContext) => Finding | Finding[];
};

// A concern named in a governing document that this validator deliberately
// does NOT attempt to check mechanically — distinct from
// requires-future-architecture (which COULD be checked once the data model
// exists). These stay human-review-only regardless of future architecture
// work. Used only by the rule-traceability generator, never by the runner.
export type HumanReviewOnlyItem = {
  description: string;
  sourceDoc: string;
  category: RuleCategory;
  reason: string;
};

export type CategoryHealthScore = {
  // 0-100, or null if no rule in this category has ever produced a
  // PASS/WARN/FAIL (i.e. the category is entirely NOT_IMPLEMENTED or has
  // no rules at all) — a null score must never be rendered as 0.
  score: number | null;
  measuredRuleCount: number;
  totalRuleCount: number;
  coveragePct: number;
};

export type Report = {
  slug: string;
  generatedAt: string;
  baseUrl: string;
  renderedPageAvailable: boolean;
  totals: {
    total: number;
    passed: number;
    failed: number;
    warnings: number;
    notImplemented: number;
  };
  overallHealthScore: number | null;
  categoryCoverage: Record<RuleCategory, { ruleCount: number; note?: string }>;
  healthScores: Record<RuleCategory, CategoryHealthScore>;
  findings: Finding[];
};
