#!/usr/bin/env -S npx tsx
// Country record validator — diagnostic mode is WARN-ONLY.
//
// `npm run validate-country` (with no --check-snapshot) never exits
// non-zero and is not wired into any build or CI step. That is deliberate
// ("do not make the validator a build-blocking gate yet") and must not be
// changed without explicit direction to move to a build-blocking phase.
//
// --check-snapshot is the one sanctioned exception: it's a regression-diff
// tool, not the diagnostic gate, and it exits 1 only when something got
// WORSE than the last saved snapshot (see lib/validation/snapshot.ts for
// exactly what counts as "worse"). It is still not wired into any CI step.
//
// Usage (npm requires -- to pass args through to the underlying command):
//   npm run validate-country -- thailand
//   npm run validate-country -- thailand --verbose
//   npm run validate-country -- thailand --json
//   npm run validate-country -- thailand --trace
//   npm run validate-country -- thailand --update-snapshot
//   npm run validate-country -- thailand --check-snapshot
//   npm run validate-country -- --all

import { join } from "node:path";
import { runValidation } from "../lib/validation/runner";
import { COUNTRY_REGISTRY } from "../lib/countryData/registry";
import { diffSnapshot, loadSnapshot, saveSnapshot, toSnapshot } from "../lib/validation/snapshot";
import type { Finding, Report, RuleStatus } from "../lib/validation/types";

function statusIcon(status: RuleStatus): string {
  switch (status) {
    case "PASS":
      return "PASS";
    case "FAIL":
      return "FAIL";
    case "WARN":
      return "WARN";
    case "NOT_IMPLEMENTED":
      return "N/I ";
  }
}

function scoreText(score: number | null, coveragePct: number): string {
  if (score === null) return "N/A (no measured rules)";
  return `${score}/100 (${coveragePct}% of rules in this category were measurable)`;
}

function printHumanReport(report: Report, verbose: boolean, trace: boolean) {
  console.log(`\nCountry Record Validator`);
  console.log(`Slug: ${report.slug}`);
  console.log(`Generated: ${report.generatedAt}`);
  console.log(`Rendered page available: ${report.renderedPageAvailable ? `yes (${report.baseUrl})` : `NO — rendering-dependent rules report NOT_IMPLEMENTED`}`);
  console.log(`\nTotals: ${report.totals.total} rules | ${report.totals.passed} passed | ${report.totals.failed} failed | ${report.totals.warnings} warnings | ${report.totals.notImplemented} not implemented`);
  console.log(`Overall health score: ${scoreText(report.overallHealthScore, Math.round((100 * (report.totals.total - report.totals.notImplemented)) / Math.max(1, report.totals.total)))}\n`);

  const byCategory = new Map<string, Finding[]>();
  for (const f of report.findings) {
    byCategory.set(f.category, [...(byCategory.get(f.category) ?? []), f]);
  }

  for (const [category, note] of Object.entries(report.categoryCoverage)) {
    const findings = byCategory.get(category) ?? [];
    const health = report.healthScores[category as keyof typeof report.healthScores];
    console.log(`## ${category} (${findings.length} rule${findings.length === 1 ? "" : "s"}) — health: ${scoreText(health.score, health.coveragePct)}`);
    if (note.note) console.log(`   NOTE: ${note.note}`);
    for (const f of findings) {
      if (!verbose && f.status === "PASS") continue;
      console.log(`   [${statusIcon(f.status)}] ${f.ruleId} (${f.severity}, ${f.kind}) — ${f.message}`);
      if (f.evidence) console.log(`         evidence: ${f.evidence}`);
      if (f.remediation) console.log(`         remediation: ${f.remediation}`);
      console.log(`         source: ${f.sourceDoc}`);
      if (trace) console.log(`         implementation: ${f.implementationRef}`);
    }
    console.log("");
  }
}

function printSnapshotDiff(entries: ReturnType<typeof diffSnapshot>["entries"]) {
  if (entries.length === 0) {
    console.log("No differences from the saved snapshot.");
    return;
  }
  for (const e of entries) {
    const marker = e.isRegression ? "REGRESSION" : "changed";
    console.log(`  [${marker}] ${e.ruleId}: ${e.baselineStatus} -> ${e.currentStatus} — ${e.note}`);
  }
}

async function main() {
  const args = process.argv.slice(2);
  const verbose = args.includes("--verbose");
  const json = args.includes("--json");
  const all = args.includes("--all");
  const trace = args.includes("--trace");
  const updateSnapshot = args.includes("--update-snapshot");
  const checkSnapshot = args.includes("--check-snapshot");
  const slugArg = args.find((a) => !a.startsWith("--"));

  const slugs = all ? Object.keys(COUNTRY_REGISTRY) : slugArg ? [slugArg] : [];

  if (slugs.length === 0) {
    console.error("Usage: npm run validate-country -- <slug> [--verbose] [--json] [--trace] [--update-snapshot] [--check-snapshot]");
    console.error("       npm run validate-country -- --all");
    process.exitCode = 0;
    return;
  }

  const reports: Report[] = [];
  for (const slug of slugs) {
    try {
      reports.push(await runValidation(slug));
    } catch (e) {
      console.error(`Could not validate "${slug}": ${e instanceof Error ? e.message : String(e)}`);
    }
  }

  if (updateSnapshot) {
    for (const report of reports) {
      const path = join(__dirname, "..", "lib", "validation", "__snapshots__", `${report.slug}.snapshot.json`);
      saveSnapshot(path, toSnapshot(report));
      console.log(`Updated snapshot: ${path}`);
    }
    process.exitCode = 0;
    return;
  }

  if (checkSnapshot) {
    let anyRegression = false;
    for (const report of reports) {
      const path = join(__dirname, "..", "lib", "validation", "__snapshots__", `${report.slug}.snapshot.json`);
      const baseline = loadSnapshot(path);
      console.log(`\n## Snapshot check: ${report.slug}`);
      if (!baseline) {
        console.log(`  No snapshot exists at ${path}. Run with --update-snapshot to create one.`);
        continue;
      }
      const { entries, hasRegression } = diffSnapshot(baseline, toSnapshot(report));
      printSnapshotDiff(entries);
      if (hasRegression) anyRegression = true;
    }
    // Deliberate, sanctioned exception to warn-only: this mode exists
    // specifically to detect regressions, so it is the one place a
    // non-zero exit is correct. Still not wired into any CI step.
    process.exitCode = anyRegression ? 1 : 0;
    return;
  }

  if (json) {
    console.log(JSON.stringify(all ? reports : reports[0], null, 2));
  } else {
    for (const report of reports) printHumanReport(report, verbose, trace);
  }

  // Diagnostic mode: deliberately always exit 0.
  process.exitCode = 0;
}

main();
