import { getCountryRecord, COUNTRY_REGISTRY } from "@/lib/countryData/registry";
import { GLOBAL_CONSTANTS } from "@/lib/countryData/globalConstants";
import { DESTINATIONS } from "@/lib/destinations";
import { fetchRenderedPage } from "./renderedPage";
import { RULES, CATEGORY_COVERAGE_NOTES } from "./rules";
import { computeHealthScores } from "./score";
import type { Finding, Report, RuleCategory, RuleContext } from "./types";

const ALL_CATEGORIES: RuleCategory[] = [
  "Business Truth",
  "Research",
  "Knowledge Objects",
  "Editorial",
  "SEO",
  "GEO",
  "Schema",
  "Internal Linking",
  "Metadata",
  "Accessibility",
  "Data Integrity",
];

export async function runValidation(slug: string, opts: { baseUrl?: string } = {}): Promise<Report> {
  const record = getCountryRecord(slug);
  if (!record) {
    throw new Error(`No CountryRecord found for slug "${slug}" in the registry. Registered slugs: ${Object.keys(COUNTRY_REGISTRY).join(", ")}`);
  }

  const baseUrl = opts.baseUrl ?? process.env.VALIDATE_BASE_URL ?? "http://localhost:3000";
  const renderedPage = await fetchRenderedPage(baseUrl, `/countries/${slug}`);

  const ctx: RuleContext = {
    slug,
    record,
    registry: COUNTRY_REGISTRY,
    destinations: DESTINATIONS,
    globals: GLOBAL_CONSTANTS,
    renderedPage,
  };

  const findings: Finding[] = RULES.map((rule) => rule.check(ctx)).flat();

  const totals = {
    total: findings.length,
    passed: findings.filter((f) => f.status === "PASS").length,
    failed: findings.filter((f) => f.status === "FAIL").length,
    warnings: findings.filter((f) => f.status === "WARN").length,
    notImplemented: findings.filter((f) => f.status === "NOT_IMPLEMENTED").length,
  };

  const categoryCoverage: Report["categoryCoverage"] = {} as Report["categoryCoverage"];
  for (const category of ALL_CATEGORIES) {
    const ruleCount = findings.filter((f) => f.category === category).length;
    categoryCoverage[category] = { ruleCount, note: CATEGORY_COVERAGE_NOTES[category] };
  }

  const { overallHealthScore, byCategory } = computeHealthScores(findings, ALL_CATEGORIES);

  return {
    slug,
    generatedAt: new Date().toISOString(),
    baseUrl,
    renderedPageAvailable: renderedPage !== null,
    totals,
    overallHealthScore,
    categoryCoverage,
    healthScores: byCategory,
    findings,
  };
}
