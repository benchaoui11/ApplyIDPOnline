#!/usr/bin/env -S npx tsx
// Registry Integrity Checker CLI — structural linter for the knowledge
// graph itself. Distinct from validate-country.ts (content vs. governing
// docs) and check-country-migration.ts (adapter output vs. legacy
// record). Exits non-zero on any "error"-severity finding (broken
// references, duplicate IDs, circular dependencies, invalid ownership,
// missing canonical IDs) — those are real structural defects, not
// judgment calls. "warning"-severity findings (orphan claims/evidence/
// entities, unused knowledge objects, duplicate aliases) never fail the
// exit code, matching this project's severity-model convention
// (VALIDATION_RULES.md §2) of FAIL-blocks vs WARN-flags.
//
// Usage: npm run check-registry-integrity [-- --json]

import { checkRegistryIntegrity } from "../lib/knowledge/integrity/checkIntegrity";
import { buildRegistryStatistics, buildCoverageReport, buildDependencyReport, buildCrossRegistryReferenceReport } from "../lib/knowledge/integrity/reports";

function main() {
  const json = process.argv.includes("--json");
  const findings = checkRegistryIntegrity();
  const statistics = buildRegistryStatistics();
  const coverage = buildCoverageReport();
  const dependency = buildDependencyReport();
  const crossReferences = buildCrossRegistryReferenceReport();

  const errors = findings.filter((f) => f.severity === "error");
  const warnings = findings.filter((f) => f.severity === "warning");

  if (json) {
    console.log(JSON.stringify({ findings, statistics, coverage, dependency, crossReferences, totals: { errors: errors.length, warnings: warnings.length } }, null, 2));
    process.exitCode = errors.length > 0 ? 1 : 0;
    return;
  }

  console.log("\nRegistry Integrity Report");
  console.log(`Totals: ${errors.length} error(s), ${warnings.length} warning(s)\n`);

  if (findings.length === 0) {
    console.log("No integrity issues found.\n");
  } else {
    for (const f of findings) console.log(`  [${f.severity === "error" ? "ERROR" : "WARN "}] (${f.check}) ${f.message}`);
    console.log("");
  }

  console.log("## Registry Statistics");
  console.log(JSON.stringify(statistics, null, 2));

  console.log("\n## Coverage Report");
  console.log(JSON.stringify(coverage, null, 2));

  console.log("\n## Dependency Report");
  console.log(JSON.stringify(dependency, null, 2));

  console.log("\n## Cross-Registry References");
  console.log(JSON.stringify(crossReferences, null, 2));

  process.exitCode = errors.length > 0 ? 1 : 0;
}

main();
