// The documented rules from docs/VALIDATION_RULES.md, implemented as data
// (an array), not as hardcoded branches — per VALIDATION_RULES.md §6.
//
// Every rule here has a `sourceDoc` pointing at the exact row it
// implements and an `implementationRef` pointing at the function that
// implements it — both are read by scripts/generate-rule-traceability.ts
// to produce docs/RULE_TRACEABILITY.md, so that document is generated from
// this file rather than hand-maintained separately (see
// docs/ARCHITECTURE_REVIEW.md's "eight documents synchronization" risk —
// this is the concrete fix for that risk as it applies to this one file).
//
// VR-07 was NOT_IMPLEMENTED through Phase 2A/2A.1 (no per-claim citation
// linkage existed) and became real as of Phase 3's Claim/Evidence/Source
// registries — see docs/PHASE_3_MIGRATION_REPORT.md. It still reports
// NOT_IMPLEMENTED for any country that hasn't been migrated to the new
// architecture (no claims in the registry for that slug).
// VR-18 remains intentionally NOT_IMPLEMENTED — it requires a module
// registry (KNOWLEDGE_OBJECTS.md §4) that Phase 3 was not scoped to build.
// VR-23 through VR-26 were added in Validator v1.1: GEO_GUIDELINES.md rules,
// closing the gap found in docs/VALIDATOR_IMPLEMENTATION_MATRIX.md §1.
//
// See docs/VALIDATOR_ARCHITECTURE.md for what `kind` means per rule.

import { TIER_DEFINITIONS } from "@/lib/countryData/tiers";
import { getClaimsByCountry } from "@/lib/knowledge/claims/registry";
import { getEvidence } from "@/lib/knowledge/evidence/registry";
import { getSource } from "@/lib/knowledge/sources/registry";
import type { HumanReviewOnlyItem, RuleCategory, RuleContext, RuleDefinition, RuleKind, RuleStatus, Severity } from "./types";
import { buildDataCorpus, getPopulatedGuideModules } from "./dataCorpus";
import { countOccurrences } from "./renderedPage";
import {
  countHedgeWords,
  countSentences,
  jaccardSimilarity,
  scanForBannedPhrases,
  scanForBannedSuperlatives,
  startsWithUnresolvedPronoun,
} from "./textChecks";

type CheckResult = { status: RuleStatus; message: string; path?: string; evidence?: string; remediation?: string };

function defineRule(
  meta: {
    id: string;
    category: RuleCategory;
    severity: Severity;
    kind: RuleKind;
    description: string;
    sourceDoc: string;
    implementationRef: string;
    requiresRenderedPage: boolean;
  },
  fn: (ctx: RuleContext) => CheckResult
): RuleDefinition {
  return {
    ...meta,
    check: (ctx) => {
      const result = fn(ctx);
      return {
        ruleId: meta.id,
        category: meta.category,
        severity: meta.severity,
        kind: meta.kind,
        sourceDoc: meta.sourceDoc,
        implementationRef: meta.implementationRef,
        ...result,
      };
    },
  };
}

const notImplemented = (message: string): CheckResult => ({ status: "NOT_IMPLEMENTED", message });

export const RULES: RuleDefinition[] = [
  defineRule(
    {
      id: "VR-01",
      category: "Business Truth",
      severity: "FAIL",
      kind: "heuristic",
      description: "No banned phrase pattern present (submission-duration, printed-timing outside checkout, guaranteed, universal-acceptance, government self-description).",
      sourceDoc: "VALIDATION_RULES.md row 1 (BUSINESS_TRUTH_LAYER.md §5)",
      implementationRef: "lib/validation/textChecks.ts#scanForBannedPhrases",
      requiresRenderedPage: false,
    },
    (ctx) => {
      const corpus = buildDataCorpus(ctx.record, ctx.globals);
      const dataHits = corpus.flatMap((e) => scanForBannedPhrases(e.text).map((h) => `[${e.path}] ${h.pattern}: "${h.sentence}"`));
      const renderedHits = ctx.renderedPage ? scanForBannedPhrases(ctx.renderedPage.text).map((h) => `[rendered page] ${h.pattern}: "${h.sentence}"`) : [];
      const allHits = [...dataHits, ...renderedHits];
      const coverage = ctx.renderedPage
        ? "Checked data-layer prose and full rendered page text."
        : "Checked data-layer prose only — dev server unreachable, component-hardcoded copy not covered.";
      const method = "Sentence-boundary aware; questions are excluded so a rhetorical FAQ question is never mistaken for an assertion (Phase 2A false-positive fix).";
      if (allHits.length > 0) {
        return { status: "FAIL", message: `${allHits.length} banned phrase pattern(s) found. ${coverage}`, evidence: allHits.join("; "), remediation: "Rewrite flagged text per BUSINESS_TRUTH_LAYER.md §5." };
      }
      return { status: "PASS", message: `No banned phrase patterns found. ${coverage} ${method}` };
    }
  ),

  defineRule(
    {
      id: "VR-02",
      category: "Business Truth",
      severity: "FAIL",
      kind: "deterministic",
      description: "~8-minute delivery claim appears at most 2 times.",
      sourceDoc: "VALIDATION_RULES.md row 2 (BUSINESS_TRUTH_LAYER.md §6)",
      implementationRef: "lib/validation/rules.ts#VR-02",
      requiresRenderedPage: true,
    },
    (ctx) => {
      if (!ctx.renderedPage) return notImplemented("Requires rendered page text; dev server unreachable.");
      const count = countOccurrences(ctx.renderedPage.text, "approximately 8 minutes");
      if (count > 2) return { status: "FAIL", message: `"approximately 8 minutes" appears ${count} times; cap is 2.`, evidence: `count=${count}`, remediation: "Remove instances beyond the Trust card and Process step 3." };
      return { status: "PASS", message: `"approximately 8 minutes" appears ${count} time(s) — within the cap of 2. (Location-restriction clause not verified by this validator.)`, evidence: `count=${count}` };
    }
  ),

  defineRule(
    {
      id: "VR-03",
      category: "Business Truth",
      severity: "FAIL",
      kind: "deterministic",
      description: '"Legally required" phrasing appears at most 3 times.',
      sourceDoc: "VALIDATION_RULES.md row 3 (BUSINESS_TRUTH_LAYER.md §6)",
      implementationRef: "lib/validation/rules.ts#VR-03",
      requiresRenderedPage: true,
    },
    (ctx) => {
      if (!ctx.renderedPage) return notImplemented("Requires rendered page text; dev server unreachable.");
      const count = countOccurrences(ctx.renderedPage.text, "legally required");
      if (count > 3) return { status: "FAIL", message: `"legally required" appears ${count} times; cap is 3.`, evidence: `count=${count}`, remediation: "Remove instances beyond the 3 sanctioned locations." };
      return { status: "PASS", message: `"legally required" appears ${count} time(s) — within the cap of 3. (Location-restriction clause not verified by this validator.)`, evidence: `count=${count}` };
    }
  ),

  defineRule(
    {
      id: "VR-04",
      category: "Business Truth",
      severity: "FAIL",
      kind: "deterministic",
      description: "No AggregateRating/Review schema node present.",
      sourceDoc: "VALIDATION_RULES.md row 4 (BUSINESS_TRUTH_LAYER.md §5.6, SCHEMA_GUIDELINES.md §3)",
      implementationRef: "lib/validation/rules.ts#VR-04",
      requiresRenderedPage: true,
    },
    (ctx) => {
      if (!ctx.renderedPage) return notImplemented("Requires rendered JSON-LD; dev server unreachable.");
      if (!ctx.renderedPage.jsonLdGraph) return { status: "FAIL", message: `JSON-LD graph could not be parsed: ${ctx.renderedPage.jsonLdParseError}`, remediation: "Fix JSON-LD output so it parses." };
      const graphStr = JSON.stringify(ctx.renderedPage.jsonLdGraph);
      const hasBanned = /"@type"\s*:\s*"(AggregateRating|Review)"/i.test(graphStr);
      return hasBanned
        ? { status: "FAIL", message: "AggregateRating or Review node found in schema graph.", remediation: "Remove — no real reviews exist yet, per BUSINESS_TRUTH_LAYER.md §5.6." }
        : { status: "PASS", message: "No AggregateRating/Review node present." };
    }
  ),

  defineRule(
    {
      id: "VR-05",
      category: "Knowledge Objects",
      severity: "FAIL",
      kind: "deterministic",
      description: "Core record fields present (primaryKeyword, metaTitle, metaDescription, lastVerifiedDate, tier, drivingSide, >=1 sourceCitations).",
      sourceDoc: "VALIDATION_RULES.md row 5 (KNOWLEDGE_OBJECTS.md §2)",
      implementationRef: "lib/validation/rules.ts#VR-05",
      requiresRenderedPage: false,
    },
    (ctx) => {
      const r = ctx.record;
      const missing: string[] = [];
      if (!r.primaryKeyword) missing.push("primaryKeyword");
      if (!r.metaTitle) missing.push("metaTitle");
      if (!r.metaDescription) missing.push("metaDescription");
      if (!r.lastVerifiedDate) missing.push("lastVerifiedDate");
      if (![1, 2, 3].includes(r.tier)) missing.push("tier");
      if (!r.drivingSide?.value) missing.push("drivingSide.value");
      if (!r.sourceCitations || r.sourceCitations.length < 1) missing.push("sourceCitations (>=1)");
      if (missing.length) return { status: "FAIL", message: `Missing core field(s): ${missing.join(", ")}`, remediation: "Populate the missing core fields." };
      return { status: "PASS", message: "All core record fields present." };
    }
  ),

  defineRule(
    {
      id: "VR-06",
      category: "Knowledge Objects",
      severity: "FAIL",
      kind: "deterministic",
      description: "Module count and FAQ count meet the record's tier minimums.",
      sourceDoc: "VALIDATION_RULES.md row 6 (KNOWLEDGE_OBJECTS.md §6, TIER_DEFINITIONS)",
      implementationRef: "lib/validation/rules.ts#VR-06",
      requiresRenderedPage: false,
    },
    (ctx) => {
      const modules = getPopulatedGuideModules(ctx.record);
      const def = TIER_DEFINITIONS[ctx.record.tier];
      const problems: string[] = [];
      if (modules.length < def.minGuideTabs) problems.push(`${modules.length} guide module(s) populated, tier ${ctx.record.tier} expects >= ${def.minGuideTabs}`);
      if (ctx.record.faq.length < def.minFaqCount) problems.push(`${ctx.record.faq.length} FAQ entries, tier ${ctx.record.tier} expects >= ${def.minFaqCount}`);
      if (def.requiresPopularDrivingAreas && ctx.record.popularDrivingAreas.length === 0) problems.push(`tier ${ctx.record.tier} requires popular driving areas; none present`);
      const note = "Checked against the current xGuide fields as a proxy for KNOWLEDGE_OBJECTS.md's not-yet-implemented module map.";
      if (problems.length) return { status: "FAIL", message: `${problems.join("; ")}. ${note}`, remediation: "Add missing modules/FAQ entries, or confirm the record's tier is correctly assigned." };
      return { status: "PASS", message: `Module and FAQ counts meet tier ${ctx.record.tier} minimums. ${note}` };
    }
  ),

  defineRule(
    {
      id: "VR-07",
      category: "Research",
      severity: "FAIL",
      kind: "deterministic",
      description: "Every claim with confidence 'confirmed' has >=1 linked Evidence entry resolving to a primary-classified Source.",
      sourceDoc: "VALIDATION_RULES.md row 7 (RESEARCH_STANDARD.md §7, KNOWLEDGE_OBJECTS.md §5-§7)",
      implementationRef: "lib/validation/rules.ts#VR-07",
      requiresRenderedPage: false,
    },
    (ctx) => {
      // Implemented for real as of Phase 3 — see docs/PHASE_3_MIGRATION_REPORT.md.
      // Reads the Claim/Evidence/Source registries directly, not ctx.record,
      // since the legacy CountryRecord shape has no per-field citation
      // linkage to check (that was VR-07's whole NOT_IMPLEMENTED reason
      // under v1.0/2A). Bootstrapped as a side effect of ctx.record having
      // already been resolved via getCountryRecord() in runner.ts.
      const claims = getClaimsByCountry(ctx.slug);
      if (claims.length === 0) {
        return notImplemented(`No claims found in the Claim Registry for "${ctx.slug}" — this country has not been migrated to the new architecture yet.`);
      }
      const confirmedClaims = claims.filter((c) => c.confidence === "confirmed");
      const unlinked: string[] = [];
      for (const claim of confirmedClaims) {
        const hasPrimaryEvidence = claim.evidenceRefs.some((evId) => {
          const ev = getEvidence(evId);
          if (!ev) return false;
          const source = getSource(ev.sourceId);
          return source?.classification === "primary";
        });
        if (!hasPrimaryEvidence) unlinked.push(`${claim.id} ("${claim.proposition.slice(0, 60)}${claim.proposition.length > 60 ? "..." : ""}")`);
      }
      const note = "Confirmed-but-unlinked claims are an honest, expected result for content whose confidence predates per-claim evidence tracking — see PHASE_3_DESIGN.md §7.2. This is the gap this rule exists to surface, not a validator defect.";
      if (unlinked.length > 0) {
        return {
          status: "FAIL",
          message: `${unlinked.length} of ${confirmedClaims.length} confirmed claim(s) have no linked primary evidence. ${note}`,
          evidence: unlinked.join("; "),
          remediation: "Add Evidence entries linking these claims to a primary Source, or downgrade confidence to partially_sourced/pending if no primary source actually supports them.",
        };
      }
      return { status: "PASS", message: `All ${confirmedClaims.length} confirmed claim(s) (of ${claims.length} total) have linked primary evidence.` };
    }
  ),

  defineRule(
    {
      id: "VR-08",
      category: "Research",
      severity: "FAIL",
      kind: "deterministic",
      description: "Every citation has a non-generic label, a direct URL, and a named organization.",
      sourceDoc: "VALIDATION_RULES.md row 8 (RESEARCH_STANDARD.md §7)",
      implementationRef: "lib/validation/rules.ts#VR-08",
      requiresRenderedPage: false,
    },
    (ctx) => {
      const problems: string[] = [];
      ctx.record.sourceCitations.forEach((c, i) => {
        if (!c.label || c.label.length < 8) problems.push(`citation[${i}] label too short/generic: "${c.label}"`);
        if (!/^https?:\/\/[^/]+\/.+/.test(c.url)) problems.push(`citation[${i}] url is not a direct page link: "${c.url}"`);
        if (!c.organization) problems.push(`citation[${i}] missing organization`);
      });
      if (problems.length) return { status: "FAIL", message: problems.join("; "), remediation: "Fix citation records per RESEARCH_STANDARD.md §7." };
      return { status: "PASS", message: `All ${ctx.record.sourceCitations.length} citation(s) meet quality requirements.` };
    }
  ),

  defineRule(
    {
      id: "VR-09",
      category: "Metadata",
      severity: "WARN",
      kind: "deterministic",
      description: "metaTitle <= 60 chars, metaDescription <= 155 chars.",
      sourceDoc: "VALIDATION_RULES.md row 9 (SEO_GUIDELINES.md §3)",
      implementationRef: "lib/validation/rules.ts#VR-09",
      requiresRenderedPage: false,
    },
    (ctx) => {
      const problems: string[] = [];
      if (ctx.record.metaTitle.length > 60) problems.push(`metaTitle is ${ctx.record.metaTitle.length} chars (>60)`);
      if (ctx.record.metaDescription.length > 155) problems.push(`metaDescription is ${ctx.record.metaDescription.length} chars (>155)`);
      if (problems.length) return { status: "WARN", message: problems.join("; "), remediation: "Shorten to fit display-safe lengths." };
      return { status: "PASS", message: `metaTitle ${ctx.record.metaTitle.length} chars, metaDescription ${ctx.record.metaDescription.length} chars — both within limits.` };
    }
  ),

  defineRule(
    {
      id: "VR-10",
      category: "SEO",
      severity: "FAIL",
      kind: "deterministic",
      description: "primaryKeyword is unique across the entire registry.",
      sourceDoc: "VALIDATION_RULES.md row 10 (SEO_GUIDELINES.md §3, §6)",
      implementationRef: "lib/validation/rules.ts#VR-10",
      requiresRenderedPage: false,
    },
    (ctx) => {
      const byKeyword = new Map<string, string[]>();
      for (const [key, rec] of Object.entries(ctx.registry)) {
        const k = rec.primaryKeyword.toLowerCase().trim();
        byKeyword.set(k, [...(byKeyword.get(k) ?? []), key]);
      }
      const collisions = [...byKeyword.entries()].filter(([, slugs]) => slugs.length > 1);
      if (collisions.length) return { status: "FAIL", message: `primaryKeyword collision(s): ${collisions.map(([k, s]) => `"${k}" used by ${s.join(", ")}`).join("; ")}`, remediation: "Assign a unique primaryKeyword per country." };
      return { status: "PASS", message: `primaryKeyword unique across ${Object.keys(ctx.registry).length} registered country/countries.` };
    }
  ),

  defineRule(
    {
      id: "VR-11",
      category: "SEO",
      severity: "FAIL",
      kind: "deterministic",
      description: "Exactly one <h1>; no skipped heading levels.",
      sourceDoc: "VALIDATION_RULES.md row 11 (SEO_GUIDELINES.md §4)",
      implementationRef: "lib/validation/rules.ts#VR-11",
      requiresRenderedPage: true,
    },
    (ctx) => {
      if (!ctx.renderedPage) return notImplemented("Requires rendered HTML; dev server unreachable.");
      const { headings } = ctx.renderedPage;
      const problems: string[] = [];
      const h1Count = headings.filter((h) => h.level === 1).length;
      if (h1Count !== 1) problems.push(`found ${h1Count} <h1> elements, expected exactly 1`);
      for (let i = 1; i < headings.length; i++) {
        if (headings[i].level > headings[i - 1].level + 1) {
          problems.push(`heading jumps h${headings[i - 1].level} -> h${headings[i].level} ("${headings[i - 1].text}" -> "${headings[i].text}")`);
        }
      }
      if (problems.length) return { status: "FAIL", message: problems.join("; "), evidence: `${headings.length} headings total`, remediation: "Fix heading structure per SEO_GUIDELINES.md §4." };
      return { status: "PASS", message: `Exactly one <h1>; no skipped heading levels across ${headings.length} headings.` };
    }
  ),

  defineRule(
    {
      id: "VR-12",
      category: "Data Integrity",
      severity: "FAIL",
      kind: "deterministic",
      description: "slug matches ^[a-z0-9-]+$, matches its registry key, matches a destinations.ts entry's slug.",
      sourceDoc: "VALIDATION_RULES.md row 12 (SEO_GUIDELINES.md, registry consistency)",
      implementationRef: "lib/validation/rules.ts#VR-12",
      requiresRenderedPage: false,
    },
    (ctx) => {
      const problems: string[] = [];
      if (!/^[a-z0-9-]+$/.test(ctx.record.slug)) problems.push(`slug "${ctx.record.slug}" fails format ^[a-z0-9-]+$`);
      if (ctx.registry[ctx.record.slug] !== ctx.record) problems.push(`record is not stored under its own slug in the registry`);
      if (!ctx.destinations.some((d) => d.slug === ctx.record.slug)) problems.push(`no lib/destinations.ts entry has slug "${ctx.record.slug}"`);
      if (problems.length) return { status: "FAIL", message: problems.join("; "), remediation: "Align slug across CountryRecord, registry key, and destinations.ts." };
      return { status: "PASS", message: `slug "${ctx.record.slug}" is well-formed and consistent across registry and destinations.ts.` };
    }
  ),

  defineRule(
    {
      id: "VR-13",
      category: "Data Integrity",
      severity: "FAIL",
      kind: "deterministic",
      description: "Every relatedCountrySlugs entry resolves to a real destinations-list slug.",
      sourceDoc: "VALIDATION_RULES.md row 13 (KNOWLEDGE_OBJECTS.md)",
      implementationRef: "lib/validation/rules.ts#VR-13",
      requiresRenderedPage: false,
    },
    (ctx) => {
      const unresolved = ctx.record.relatedCountrySlugs.filter((s) => !ctx.destinations.some((d) => d.slug === s));
      if (unresolved.length) return { status: "FAIL", message: `Unresolved related slug(s): ${unresolved.join(", ")}`, remediation: "Fix or remove unresolved slugs." };
      return { status: "PASS", message: `All ${ctx.record.relatedCountrySlugs.length} relatedCountrySlugs resolve to real destinations.` };
    }
  ),

  defineRule(
    {
      id: "VR-14",
      category: "Internal Linking",
      severity: "WARN",
      kind: "heuristic",
      description: "Internal contextual link count >= floor (6).",
      sourceDoc: "VALIDATION_RULES.md row 14 (SEO_GUIDELINES.md §5)",
      implementationRef: "lib/validation/rules.ts#VR-14",
      requiresRenderedPage: true,
    },
    (ctx) => {
      if (!ctx.renderedPage) return notImplemented("Requires rendered HTML; dev server unreachable.");
      const count = ctx.renderedPage.internalLinkHrefs.length;
      const note = "Counts ALL internal <a href> tags on the page, not scoped to body content only — nav/header/footer are not excluded, so this is an upper-bound proxy, not the precise 'contextual body link' count SEO_GUIDELINES.md §5 intends.";
      if (count < 6) return { status: "WARN", message: `Only ${count} internal links found (floor is 6). ${note}`, evidence: `count=${count}` };
      return { status: "PASS", message: `${count} internal links found (floor is 6). ${note}`, evidence: `count=${count}` };
    }
  ),

  defineRule(
    {
      id: "VR-15",
      category: "Editorial",
      severity: "WARN",
      kind: "heuristic",
      description: "No two adjacent modules restate the same foundational claim near-verbatim.",
      sourceDoc: "VALIDATION_RULES.md row 15 (EDITORIAL_GUIDELINES.md §5)",
      implementationRef: "lib/validation/rules.ts#VR-15",
      requiresRenderedPage: false,
    },
    (ctx) => {
      const modules = getPopulatedGuideModules(ctx.record);
      const problems: string[] = [];
      // Widened in this revision from "compare only points[0]" to "compare
      // every point pair between adjacent modules" — more coverage, same
      // adjacency scope (kept narrow to avoid noisy cross-module false
      // positives). This does NOT fix the known lexical-similarity false
      // negative from Phase 2A (Driving vs Road Rules "drives on the left")
      // — see textChecks.ts#jaccardSimilarity and
      // docs/VALIDATOR_ARCHITECTURE.md for why widening scope doesn't close
      // that gap.
      for (let i = 1; i < modules.length; i++) {
        const prevPoints = modules[i - 1].guide.points.map((p) => p.tip);
        const curPoints = modules[i].guide.points.map((p) => p.tip);
        for (const prevText of prevPoints) {
          for (const curText of curPoints) {
            const sim = jaccardSimilarity(prevText, curText);
            if (sim > 0.4) problems.push(`${modules[i - 1].key} vs ${modules[i].key}: ${Math.round(sim * 100)}% token overlap ("${prevText}" / "${curText}")`);
          }
        }
      }
      const note = "Heuristic Jaccard token-overlap check across all point pairs in adjacent module pairs — lexical similarity only, not semantic duplication detection (known limitation, see docs/VALIDATOR_ARCHITECTURE.md).";
      if (problems.length) return { status: "WARN", message: `${problems.join("; ")}. ${note}`, remediation: "Have the later module assume the earlier module's foundational claim rather than restating it." };
      return { status: "PASS", message: `No high-lexical-overlap adjacent module point-pairs detected. ${note}` };
    }
  ),

  defineRule(
    {
      id: "VR-16",
      category: "Editorial",
      severity: "FAIL",
      kind: "heuristic",
      description: "No banned superlative/manipulation phrase present.",
      sourceDoc: "VALIDATION_RULES.md row 16 (EDITORIAL_GUIDELINES.md §7)",
      implementationRef: "lib/validation/textChecks.ts#scanForBannedSuperlatives",
      requiresRenderedPage: false,
    },
    (ctx) => {
      const corpus = buildDataCorpus(ctx.record, ctx.globals);
      const hits = corpus.flatMap((e) => scanForBannedSuperlatives(e.text).map((h) => `[${e.path}] ${h.pattern}: "${h.sentence}"`));
      if (hits.length) return { status: "FAIL", message: `${hits.length} banned superlative/manipulation phrase(s) found.`, evidence: hits.join("; "), remediation: "Remove or replace per EDITORIAL_GUIDELINES.md §7." };
      return { status: "PASS", message: "No banned superlative/manipulation phrases found in data-layer prose. Sentence-boundary aware; questions excluded." };
    }
  ),

  defineRule(
    {
      id: "VR-17",
      category: "Editorial",
      severity: "WARN",
      kind: "deterministic",
      description: "No hedge word repeated within the same module.",
      sourceDoc: "VALIDATION_RULES.md row 17 (EDITORIAL_GUIDELINES.md §4)",
      implementationRef: "lib/validation/rules.ts#VR-17",
      requiresRenderedPage: false,
    },
    (ctx) => {
      const modules = getPopulatedGuideModules(ctx.record);
      const problems: string[] = [];
      for (const { key, guide } of modules) {
        const text = [guide.directAnswer, guide.solutionNote, ...guide.points.map((p) => p.tip)].join(" ");
        const counts = countHedgeWords(text);
        const repeated = Object.entries(counts).filter(([, n]) => n >= 2);
        if (repeated.length) problems.push(`${key}: ${repeated.map(([w, n]) => `"${w}" x${n}`).join(", ")}`);
      }
      if (problems.length) return { status: "WARN", message: problems.join("; "), remediation: "Vary hedge-word choice within a module per EDITORIAL_GUIDELINES.md §4." };
      return { status: "PASS", message: "No repeated hedge word within any single module." };
    }
  ),

  defineRule(
    {
      id: "VR-18",
      category: "Schema",
      severity: "FAIL",
      kind: "requires-future-architecture",
      description: "Required JSON-LD nodes present/non-empty for the record's tier and populated modules; no node for an absent module.",
      sourceDoc: "VALIDATION_RULES.md row 18 (SCHEMA_GUIDELINES.md §3)",
      implementationRef: "not implemented",
      requiresRenderedPage: false,
    },
    () => notImplemented(
      "Requires future architecture: the module registry (KNOWLEDGE_OBJECTS.md §4) that would define which nodes SHOULD exist per tier/module does not exist in code yet. See docs/VALIDATOR_IMPLEMENTATION_MATRIX.md."
    )
  ),

  defineRule(
    {
      id: "VR-19",
      category: "Schema",
      severity: "FAIL",
      kind: "deterministic",
      description: "Schema graph passes structured-data syntax validation.",
      sourceDoc: "VALIDATION_RULES.md row 19 (SCHEMA_GUIDELINES.md §7.1)",
      implementationRef: "lib/validation/rules.ts#VR-19",
      requiresRenderedPage: true,
    },
    (ctx) => {
      if (!ctx.renderedPage) return notImplemented("Requires rendered JSON-LD; dev server unreachable.");
      if (!ctx.renderedPage.jsonLdGraph) return { status: "FAIL", message: `JSON-LD failed to parse: ${ctx.renderedPage.jsonLdParseError}`, remediation: "Fix malformed JSON-LD output." };
      const missingType = ctx.renderedPage.jsonLdGraph.filter((n) => !(n as Record<string, unknown>)["@type"]);
      const note = "Lightweight structural check only (JSON parses, @graph present, every node has @type) — not a full schema.org spec-compliance validation (no external Rich Results Test call).";
      if (missingType.length) return { status: "FAIL", message: `${missingType.length} node(s) missing @type. ${note}` };
      return { status: "PASS", message: `${ctx.renderedPage.jsonLdGraph.length} graph node(s), all well-formed with @type. ${note}` };
    }
  ),

  defineRule(
    {
      id: "VR-20",
      category: "Schema",
      severity: "FAIL",
      kind: "deterministic",
      description: "Schema FAQPage/HowTo text matches the corresponding content exactly (content parity).",
      sourceDoc: "VALIDATION_RULES.md row 20 (SCHEMA_GUIDELINES.md §7.2)",
      implementationRef: "lib/validation/rules.ts#VR-20",
      requiresRenderedPage: true,
    },
    (ctx) => {
      if (!ctx.renderedPage?.jsonLdGraph) return notImplemented("Requires rendered JSON-LD; dev server unreachable or graph unparseable.");
      const graph = ctx.renderedPage.jsonLdGraph as Record<string, unknown>[];
      const problems: string[] = [];

      type QA = { name: string; acceptedAnswer?: { text: string } };
      const faqNode = graph.find((n) => n["@type"] === "FAQPage") as { mainEntity?: QA[] } | undefined;
      if (!faqNode) problems.push("no FAQPage node found");
      else {
        const schemaQAs = faqNode.mainEntity ?? [];
        if (schemaQAs.length !== ctx.record.faq.length) problems.push(`FAQPage has ${schemaQAs.length} entries, data has ${ctx.record.faq.length}`);
        ctx.record.faq.forEach((f, i) => {
          const s = schemaQAs[i];
          if (!s || s.name !== f.question || s.acceptedAnswer?.text !== f.answer) problems.push(`faq[${i}] text differs between schema and data source`);
        });
      }

      type Step = { name: string; text: string };
      const howToNode = graph.find((n) => n["@type"] === "HowTo") as { step?: Step[] } | undefined;
      if (!howToNode) problems.push("no HowTo node found");
      else {
        const steps = howToNode.step ?? [];
        ctx.globals.applicationProcessSteps.forEach((s, i) => {
          const st = steps[i];
          if (!st || st.name !== s.title || st.text !== s.body) problems.push(`applicationProcessSteps[${i}] text differs between schema and data source`);
        });
      }

      const note = "Checks schema-vs-data-source parity (both are read from the same fields today), not schema-vs-rendered-DOM-text parity — a narrower scope than SCHEMA_GUIDELINES.md §7.2's full intent.";
      if (problems.length) return { status: "FAIL", message: `${problems.join("; ")}. ${note}`, remediation: "Ensure JsonLd() reads the same fields it currently does, or fix the drift." };
      return { status: "PASS", message: `FAQPage and HowTo schema match their data source exactly. ${note}` };
    }
  ),

  defineRule(
    {
      id: "VR-21",
      category: "Schema",
      severity: "FAIL",
      kind: "deterministic",
      description: "Organization/WebSite/#idp-entity referenced by @id, never redefined inline.",
      sourceDoc: "VALIDATION_RULES.md row 21 (SCHEMA_GUIDELINES.md §2, §6)",
      implementationRef: "lib/validation/rules.ts#VR-21",
      requiresRenderedPage: true,
    },
    (ctx) => {
      if (!ctx.renderedPage?.jsonLdGraph) return notImplemented("Requires rendered JSON-LD; dev server unreachable or graph unparseable.");
      const graph = ctx.renderedPage.jsonLdGraph as Record<string, unknown>[];
      const problems: string[] = [];
      const serviceNode = graph.find((n) => n["@type"] === "Service") as { provider?: unknown } | undefined;
      if (serviceNode) {
        const provider = serviceNode.provider as Record<string, unknown> | undefined;
        const isIdRef = Boolean(provider && typeof provider === "object" && "@id" in provider && Object.keys(provider).length === 1);
        if (!isIdRef) problems.push(`Service.provider is not a bare @id reference: ${JSON.stringify(provider)}`);
      }
      const hasSharedOrgId = graph.some((n) => n["@id"] === "https://applyidponline.com/#organization");
      if (!hasSharedOrgId) problems.push('no node with @id "https://applyidponline.com/#organization" found in the graph');
      if (problems.length) return { status: "FAIL", message: problems.join("; "), remediation: "Adopt the canonical @id scheme in SCHEMA_GUIDELINES.md §2." };
      return { status: "PASS", message: "Organization is referenced by a stable shared @id, not redefined inline." };
    }
  ),

  defineRule(
    {
      id: "VR-22",
      category: "Schema",
      severity: "FAIL",
      kind: "deterministic",
      description: "ItemList entries carry a real name and resolvable url, never a raw slug as name.",
      sourceDoc: "VALIDATION_RULES.md row 22 (SCHEMA_GUIDELINES.md §5)",
      implementationRef: "lib/validation/rules.ts#VR-22",
      requiresRenderedPage: true,
    },
    (ctx) => {
      if (!ctx.renderedPage?.jsonLdGraph) return notImplemented("Requires rendered JSON-LD; dev server unreachable or graph unparseable.");
      const graph = ctx.renderedPage.jsonLdGraph as Record<string, unknown>[];
      const itemList = graph.find((n) => n["@type"] === "ItemList") as { itemListElement?: Record<string, unknown>[] } | undefined;
      if (!itemList) return { status: "FAIL", message: "No ItemList node found." };
      const problems: string[] = [];
      (itemList.itemListElement ?? []).forEach((item, i) => {
        const name = String(item.name ?? "");
        if (!item.url) problems.push(`item[${i}] missing url`);
        // Exact (case-sensitive) match only — a correctly-capitalized
        // single-word display name (e.g. "Japan") legitimately lowercases
        // to its own slug ("japan"), so lowercasing before comparison
        // produced a false positive on every well-formed single-word name.
        if (ctx.record.relatedCountrySlugs.includes(name)) problems.push(`item[${i}] name "${name}" is a raw slug, not a display name`);
      });
      if (problems.length) return { status: "FAIL", message: problems.join("; "), remediation: "Use display names + resolvable URLs per SCHEMA_GUIDELINES.md §5." };
      return { status: "PASS", message: `All ${itemList.itemListElement?.length ?? 0} ItemList entries carry a real name and url.` };
    }
  ),

  // --- GEO_GUIDELINES.md rules, added in this revision -----------------
  defineRule(
    {
      id: "VR-23",
      category: "GEO",
      severity: "WARN",
      kind: "heuristic",
      description: "Every module's directAnswer is a single, standalone-quotable sentence (no compound sentence, no unresolved leading pronoun).",
      sourceDoc: "VALIDATION_RULES.md row 23 (GEO_GUIDELINES.md §2, §3)",
      implementationRef: "lib/validation/rules.ts#VR-23",
      requiresRenderedPage: false,
    },
    (ctx) => {
      const modules = getPopulatedGuideModules(ctx.record);
      const problems: string[] = [];
      for (const { key, guide } of modules) {
        const sentenceCount = countSentences(guide.directAnswer);
        if (sentenceCount > 1) problems.push(`${key}.directAnswer has ${sentenceCount} sentences, not a single standalone answer: "${guide.directAnswer}"`);
        if (startsWithUnresolvedPronoun(guide.directAnswer)) problems.push(`${key}.directAnswer opens with an unresolved pronoun, depends on prior context: "${guide.directAnswer}"`);
      }
      const note = "Heuristic: naive sentence-count and leading-pronoun checks, not true standalone-quotability analysis.";
      if (problems.length) return { status: "WARN", message: `${problems.join("; ")}. ${note}`, remediation: "Rewrite directAnswer as one self-contained sentence per GEO_GUIDELINES.md §2." };
      return { status: "PASS", message: `All ${modules.length} module directAnswer(s) are single, self-contained sentences. ${note}` };
    }
  ),

  defineRule(
    {
      id: "VR-24",
      category: "GEO",
      severity: "WARN",
      kind: "deterministic",
      description: "Confidence is visibly distinguishable on the rendered page for partially_sourced content.",
      sourceDoc: "VALIDATION_RULES.md row 24 (GEO_GUIDELINES.md §4)",
      implementationRef: "lib/validation/rules.ts#VR-24",
      requiresRenderedPage: true,
    },
    (ctx) => {
      const hasPartiallySourced =
        ctx.record.digitalIdpAcceptance.status === "partially_sourced" ||
        getPopulatedGuideModules(ctx.record).some(({ guide }) => guide.points.some((p) => p.status === "partially_sourced"));
      if (!hasPartiallySourced) return { status: "PASS", message: "No partially_sourced fields present in this record — rule not triggered." };
      if (!ctx.renderedPage) return notImplemented("Record has partially_sourced fields but rendered HTML is unavailable to check for a visible marker; dev server unreachable.");
      // Convention this validator checks for: a `data-confidence="partially_sourced"`
      // attribute. This convention is NOT yet adopted anywhere in the
      // codebase — this check documents what GEO_GUIDELINES.md §4 requires
      // and will fail honestly until a real UI marker is designed and
      // built (out of scope for this validator-hardening phase).
      const hasMarker = /data-confidence=["']partially_sourced["']/i.test(ctx.renderedPage.html);
      if (!hasMarker) {
        return {
          status: "WARN",
          message: "Record has partially_sourced content but no visible confidence marker was found in the rendered HTML.",
          evidence: 'Checked for a data-confidence="partially_sourced" attribute (a proposed, not-yet-adopted convention) — none found.',
          remediation: "Design and ship a visible confidence-level treatment per GEO_GUIDELINES.md §4 — this is a real product change, not something this validator can fix.",
        };
      }
      return { status: "PASS", message: "Visible confidence marker found for partially_sourced content." };
    }
  ),

  defineRule(
    {
      id: "VR-25",
      category: "GEO",
      severity: "WARN",
      kind: "heuristic",
      description: "Atomic facts: each TipList point expresses one claim (one sentence).",
      sourceDoc: "VALIDATION_RULES.md row 25 (GEO_GUIDELINES.md §5)",
      implementationRef: "lib/validation/rules.ts#VR-25",
      requiresRenderedPage: false,
    },
    (ctx) => {
      const modules = getPopulatedGuideModules(ctx.record);
      const problems: string[] = [];
      for (const { key, guide } of modules) {
        guide.points.forEach((p, i) => {
          const n = countSentences(p.tip);
          if (n > 1) problems.push(`${key}.points[${i}] has ${n} sentences (compound claim): "${p.tip}"`);
        });
      }
      const note = "Heuristic naive sentence-count per point, not semantic claim-counting.";
      if (problems.length) return { status: "WARN", message: `${problems.join("; ")}. ${note}`, remediation: "Split compound points into separate single-claim points per GEO_GUIDELINES.md §5." };
      return { status: "PASS", message: `All points across ${modules.length} module(s) are single-sentence/atomic. ${note}` };
    }
  ),

  defineRule(
    {
      id: "VR-26",
      category: "GEO",
      severity: "WARN",
      kind: "deterministic",
      description: "Every confirmed claim's citation is reachable from the same page, and a freshness/last-reviewed signal is human-visible on the page.",
      sourceDoc: "VALIDATION_RULES.md row 26 (GEO_GUIDELINES.md §6)",
      implementationRef: "lib/validation/rules.ts#VR-26",
      requiresRenderedPage: true,
    },
    (ctx) => {
      if (!ctx.renderedPage) return notImplemented("Requires rendered HTML; dev server unreachable.");
      const problems: string[] = [];
      for (const c of ctx.record.sourceCitations) {
        let domain = c.url;
        try {
          domain = new URL(c.url).hostname;
        } catch {
          // leave domain as the raw url if it doesn't parse
        }
        if (!ctx.renderedPage.html.includes(domain)) problems.push(`citation domain "${domain}" not found anywhere in the rendered page`);
      }
      const year = ctx.record.lastVerifiedDate.match(/\d{4}/)?.[0];
      const hasFreshnessSignal = year ? new RegExp(`(review|verified|updated)[^.]{0,40}${year}|${year}[^.]{0,40}(review|verified|updated)`, "i").test(ctx.renderedPage.text) : false;
      if (!hasFreshnessSignal) problems.push(`no human-visible freshness signal found near a "${year ?? "?"}" date on the page`);
      if (problems.length) return { status: "WARN", message: problems.join("; "), remediation: "Ensure citation links render on the country page itself and lastVerifiedDate is visibly stated, per GEO_GUIDELINES.md §6." };
      return { status: "PASS", message: "All citation domains and a freshness signal are present on the rendered page." };
    }
  ),
];

export const CATEGORY_COVERAGE_NOTES: Partial<Record<RuleCategory, string>> = {
  Accessibility: "Deliberately excluded by docs/VALIDATION_RULES.md §5 — real accessibility requires a rendered-page/browser-based audit, not a data validator. Expected to be empty.",
};

// Concerns from governing documents that are deliberately never implemented
// as mechanical rules — distinct from VR-07/VR-18 (which COULD be checked
// once future architecture exists). These stay human-review-only
// regardless. Read only by scripts/generate-rule-traceability.ts.
export const HUMAN_REVIEW_ONLY_ITEMS: HumanReviewOnlyItem[] = [
  {
    description: "Prose quality and voice consistency",
    sourceDoc: "EDITORIAL_GUIDELINES.md §1-2, §10",
    category: "Editorial",
    reason: "Not mechanically checkable; VALIDATION_RULES.md §5 excludes it by design.",
  },
  {
    description: "True factual correctness of a 'confirmed' claim",
    sourceDoc: "RESEARCH_STANDARD.md",
    category: "Research",
    reason: "A validator can check a citation exists and is well-formed (VR-08), never that it actually supports the claim.",
  },
  {
    description: "Real accessibility (contrast, keyboard nav, screen readers, reduced motion)",
    sourceDoc: "VALIDATION_RULES.md §5",
    category: "Accessibility",
    reason: "Requires a rendered-page/browser-based audit; explicitly out of scope for a data validator.",
  },
  {
    description: '"Does this feel premium" / design judgment',
    sourceDoc: "VALIDATION_RULES.md §5",
    category: "Editorial",
    reason: "A judgment call, deliberately left to human review at the Freeze Pipeline QA step.",
  },
  {
    description: "No AI-manipulation tactics (hidden/visually-suppressed text, fabricated Q&A bait)",
    sourceDoc: "GEO_GUIDELINES.md §7",
    category: "GEO",
    reason: "Distinguishing manipulative intent from legitimate UX patterns (e.g. tabbed content using the hidden attribute) is not reliably mechanical.",
  },
  {
    description: "FAQ entries answer real questions a visitor would actually ask, not AI-citation bait",
    sourceDoc: "GEO_GUIDELINES.md §7",
    category: "GEO",
    reason: "Requires human judgment about genuine informational value.",
  },
];
