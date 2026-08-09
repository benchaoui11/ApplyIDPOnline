// Equivalence Checker.
//
// Deep-diffs the legacy THAILAND constant (lib/countryData/thailand.ts,
// untouched — the migration oracle) against the Render Adapter's
// reconstructed output. This is the actual proof behind "no existing
// source, claim, or module may disappear silently" — not this file's say-
// so, but its exit code. See scripts/check-country-migration.ts for the
// CLI wrapper.

import { THAILAND } from "@/lib/countryData/thailand";
import { resolveCountryView } from "../render/adapter";

export type EquivalenceDiff = { path: string; expected: unknown; actual: unknown };

export function deepDiff(expected: unknown, actual: unknown, path = "$"): EquivalenceDiff[] {
  if (expected === actual) return [];

  if (Array.isArray(expected) || Array.isArray(actual)) {
    if (!Array.isArray(expected) || !Array.isArray(actual)) return [{ path, expected, actual }];
    if (expected.length !== actual.length) {
      return [{ path: `${path}.length`, expected: expected.length, actual: actual.length }];
    }
    const diffs: EquivalenceDiff[] = [];
    for (let i = 0; i < expected.length; i++) diffs.push(...deepDiff(expected[i], actual[i], `${path}[${i}]`));
    return diffs;
  }

  const expectedIsObj = typeof expected === "object" && expected !== null;
  const actualIsObj = typeof actual === "object" && actual !== null;
  if (expectedIsObj || actualIsObj) {
    if (!expectedIsObj || !actualIsObj) return [{ path, expected, actual }];
    const diffs: EquivalenceDiff[] = [];
    const keys = new Set([...Object.keys(expected as object), ...Object.keys(actual as object)]);
    for (const key of keys) {
      diffs.push(...deepDiff((expected as Record<string, unknown>)[key], (actual as Record<string, unknown>)[key], `${path}.${key}`));
    }
    return diffs;
  }

  return [{ path, expected, actual }];
}

export function verifyCountryEquivalence(slug: string): { pass: boolean; diffs: EquivalenceDiff[]; expectedFound: boolean; actualFound: boolean } {
  const expected = slug === "thailand" ? THAILAND : undefined;
  const actual = resolveCountryView(slug);
  if (!expected || !actual) {
    return { pass: false, diffs: [], expectedFound: Boolean(expected), actualFound: Boolean(actual) };
  }
  const diffs = deepDiff(expected, actual);
  return { pass: diffs.length === 0, diffs, expectedFound: true, actualFound: true };
}
