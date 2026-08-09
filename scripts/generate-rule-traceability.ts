#!/usr/bin/env -S npx tsx
// Generates docs/RULE_TRACEABILITY.md directly from lib/validation/rules.ts.
//
// Why generated rather than hand-written: docs/ARCHITECTURE_REVIEW.md named
// "eight documents synchronization" as a real risk — a doc-to-doc mapping
// maintained by hand will eventually drift from what the code actually
// does. Deriving this one file from the RULES array removes that failure
// mode for this specific mapping: the mapping IS the code's own metadata.
//
// Run: npm run generate-traceability
// Re-run this after adding/changing any rule in lib/validation/rules.ts —
// it is not run automatically as part of validate-country.

import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { RULES, HUMAN_REVIEW_ONLY_ITEMS } from "../lib/validation/rules";

function generate(): string {
  const lines: string[] = [];
  lines.push("# Rule Traceability");
  lines.push("");
  lines.push("**GENERATED FILE — do not hand-edit.** Produced by `scripts/generate-rule-traceability.ts` directly from `lib/validation/rules.ts`. Re-run `npm run generate-traceability` after changing any rule definition.");
  lines.push("");
  lines.push(`Generated: ${new Date().toISOString()}`);
  lines.push("");
  lines.push("Maps every rule this validator implements back to the governing document it comes from and the exact code that checks it — document → rule → implementation, in one direction, always in sync with the code because it's derived from the code.");
  lines.push("");
  lines.push("## Implemented rules");
  lines.push("");
  lines.push("| Rule ID | Category | Severity | Kind | Governing document | Implementation | Needs rendered page |");
  lines.push("|---|---|---|---|---|---|---|");
  for (const rule of RULES) {
    lines.push(
      `| ${rule.id} | ${rule.category} | ${rule.severity} | ${rule.kind} | ${rule.sourceDoc} | \`${rule.implementationRef}\` | ${rule.requiresRenderedPage ? "yes" : "no"} |`
    );
  }
  lines.push("");
  lines.push("## Human-review-only concerns (no code implementation, by design)");
  lines.push("");
  lines.push("These are named in governing documents but deliberately never implemented as mechanical rules — distinct from rules reporting `NOT_IMPLEMENTED` (VR-07, VR-18), which COULD be checked once specific future architecture exists. These stay human-review-only regardless of future architecture work.");
  lines.push("");
  lines.push("| Concern | Category | Governing document | Why it stays human-review-only |");
  lines.push("|---|---|---|---|");
  for (const item of HUMAN_REVIEW_ONLY_ITEMS) {
    lines.push(`| ${item.description} | ${item.category} | ${item.sourceDoc} | ${item.reason} |`);
  }
  lines.push("");
  lines.push("## Coverage summary");
  lines.push("");
  const byKind = new Map<string, number>();
  for (const rule of RULES) byKind.set(rule.kind, (byKind.get(rule.kind) ?? 0) + 1);
  lines.push(`- ${RULES.length} implemented rules total`);
  for (const [kind, count] of byKind) lines.push(`- ${count} rule(s) classified \`${kind}\``);
  lines.push(`- ${HUMAN_REVIEW_ONLY_ITEMS.length} documented concern(s) intentionally left to human review`);
  lines.push("");
  lines.push("See `docs/VALIDATOR_ARCHITECTURE.md` for what each `kind` means and why each classification was made.");
  lines.push("");
  return lines.join("\n");
}

function main() {
  const content = generate();
  const outPath = join(__dirname, "..", "docs", "RULE_TRACEABILITY.md");
  writeFileSync(outPath, content, "utf-8");
  console.log(`Wrote ${outPath} (${RULES.length} rules, ${HUMAN_REVIEW_ONLY_ITEMS.length} human-review-only items).`);
}

main();
