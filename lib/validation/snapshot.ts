// Regression-test snapshots. A snapshot captures "this is the validator's
// current, honest verdict on this country" so a future run can be diffed
// against it and flag drift — separate from the main diagnostic mode,
// which always exits 0 (see scripts/validate-country.ts).
//
// A snapshot intentionally captures FAILs and WARNs as-is, including known
// ones (e.g. VR-03's legally-required overcount) — a snapshot records
// current truth, it does not encode a "desired" state. The point of
// `--check-snapshot` is "did anything change since we last looked," not
// "does this pass."

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";
import type { Report, RuleStatus } from "./types";

export type SnapshotFinding = {
  ruleId: string;
  category: string;
  severity: string;
  kind: string;
  status: RuleStatus;
};

export type Snapshot = {
  slug: string;
  capturedAt: string;
  findings: SnapshotFinding[];
};

export function toSnapshot(report: Report): Snapshot {
  return {
    slug: report.slug,
    capturedAt: report.generatedAt,
    findings: report.findings
      .map((f) => ({ ruleId: f.ruleId, category: f.category, severity: f.severity, kind: f.kind, status: f.status }))
      .sort((a, b) => a.ruleId.localeCompare(b.ruleId)),
  };
}

export function loadSnapshot(path: string): Snapshot | null {
  if (!existsSync(path)) return null;
  try {
    return JSON.parse(readFileSync(path, "utf-8")) as Snapshot;
  } catch {
    return null;
  }
}

export function saveSnapshot(path: string, snapshot: Snapshot): void {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, JSON.stringify(snapshot, null, 2) + "\n", "utf-8");
}

export type SnapshotDiffEntry = {
  ruleId: string;
  baselineStatus: RuleStatus | "MISSING";
  currentStatus: RuleStatus | "REMOVED";
  isRegression: boolean;
  note: string;
};

export function diffSnapshot(baseline: Snapshot, current: Snapshot): { entries: SnapshotDiffEntry[]; hasRegression: boolean } {
  const baselineByRule = new Map(baseline.findings.map((f) => [f.ruleId, f]));
  const currentByRule = new Map(current.findings.map((f) => [f.ruleId, f]));
  const allRuleIds = new Set([...baselineByRule.keys(), ...currentByRule.keys()]);

  const entries: SnapshotDiffEntry[] = [];
  for (const ruleId of [...allRuleIds].sort()) {
    const before = baselineByRule.get(ruleId);
    const after = currentByRule.get(ruleId);

    if (before && !after) {
      entries.push({ ruleId, baselineStatus: before.status, currentStatus: "REMOVED", isRegression: true, note: "Rule existed in the snapshot but is no longer implemented — lost coverage." });
      continue;
    }
    if (!before && after) {
      entries.push({ ruleId, baselineStatus: "MISSING", currentStatus: after.status, isRegression: false, note: "New rule since the last snapshot — not a regression." });
      continue;
    }
    if (before && after && before.status !== after.status) {
      const lostCoverage = after.status === "NOT_IMPLEMENTED" && before.status !== "NOT_IMPLEMENTED";
      const gotWorse = (before.status === "PASS" && (after.status === "WARN" || after.status === "FAIL")) || (before.status === "WARN" && after.status === "FAIL");
      const isRegression = lostCoverage || gotWorse;
      entries.push({
        ruleId,
        baselineStatus: before.status,
        currentStatus: after.status,
        isRegression,
        note: isRegression ? "Status got worse since the last snapshot." : "Status changed but did not get worse (may be an improvement).",
      });
    }
  }

  return { entries, hasRegression: entries.some((e) => e.isRegression) };
}
