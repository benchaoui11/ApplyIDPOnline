// Health-score computation. A simple, transparent, and deliberately
// non-clever formula — see docs/VALIDATOR_ARCHITECTURE.md for the
// rationale and its limits.
//
// Per rule: PASS = 1.0 credit, WARN = 0.5 credit, FAIL = 0 credit.
// NOT_IMPLEMENTED rules are excluded from both the numerator and the
// denominator — an unmeasured rule must never silently inflate or deflate
// a score. `coveragePct` reports how much of a category was actually
// measured, specifically so a 100% score over 20% coverage can't be
// mistaken for a clean bill of health.

import type { CategoryHealthScore, Finding, RuleCategory, RuleStatus } from "./types";

const CREDIT: Record<RuleStatus, number | null> = {
  PASS: 1,
  WARN: 0.5,
  FAIL: 0,
  NOT_IMPLEMENTED: null,
};

export function scoreForFindings(findings: Finding[]): CategoryHealthScore {
  const totalRuleCount = findings.length;
  const measured = findings.filter((f) => CREDIT[f.status] !== null);
  const measuredRuleCount = measured.length;
  const score = measuredRuleCount === 0 ? null : Math.round((100 * measured.reduce((sum, f) => sum + (CREDIT[f.status] as number), 0)) / measuredRuleCount);
  const coveragePct = totalRuleCount === 0 ? 0 : Math.round((100 * measuredRuleCount) / totalRuleCount);
  return { score, measuredRuleCount, totalRuleCount, coveragePct };
}

export function computeHealthScores(
  findings: Finding[],
  categories: RuleCategory[]
): { overallHealthScore: number | null; byCategory: Record<RuleCategory, CategoryHealthScore> } {
  const byCategory = {} as Record<RuleCategory, CategoryHealthScore>;
  for (const category of categories) {
    byCategory[category] = scoreForFindings(findings.filter((f) => f.category === category));
  }
  const overall = scoreForFindings(findings);
  return { overallHealthScore: overall.score, byCategory };
}
