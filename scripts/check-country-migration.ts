#!/usr/bin/env -S npx tsx
// Equivalence Checker CLI. Exits non-zero on ANY difference — this is a
// correctness gate for the migration itself, not the warn-only country
// validator (scripts/validate-country.ts), so a non-zero exit here is
// intentional, not a deviation from that tool's warn-only design.
//
// Usage: npm run check-country-migration -- thailand

import { verifyCountryEquivalence } from "../lib/knowledge/migration/verifyEquivalence";

function main() {
  const args = process.argv.slice(2);
  const slug = args.find((a) => !a.startsWith("--")) ?? "thailand";

  const { pass, diffs, expectedFound, actualFound } = verifyCountryEquivalence(slug);

  console.log(`\nCountry Migration Equivalence Check — ${slug}`);

  if (!expectedFound) {
    console.log(`No legacy migration oracle exists for "${slug}" (only "thailand" is currently migrated).`);
    process.exitCode = 1;
    return;
  }
  if (!actualFound) {
    console.log(`Render Adapter produced no output for "${slug}" — registries are not populated for this slug.`);
    process.exitCode = 1;
    return;
  }

  if (pass) {
    console.log("PASS — Render Adapter output is structurally equivalent to the legacy record. No content, ordering, or field was lost.");
    process.exitCode = 0;
  } else {
    console.log(`FAIL — ${diffs.length} difference(s) found between the legacy record and the Render Adapter's output:\n`);
    for (const d of diffs) {
      console.log(`  ${d.path}`);
      console.log(`    expected: ${JSON.stringify(d.expected)}`);
      console.log(`    actual:   ${JSON.stringify(d.actual)}`);
    }
    process.exitCode = 1;
  }
}

main();
