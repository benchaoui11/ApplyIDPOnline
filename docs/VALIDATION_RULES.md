# Validation Rules

Version: 1.2
Authority level: this document **invents no rules of its own**. It is the operational union of every checkable rule stated in the other seven documents. If this document and any other ever disagree, the other document is correct and this one must be updated to match — `BUSINESS_TRUTH_LAYER.md` in particular always wins any such conflict (per its own §1 supreme-authority statement).

**Changelog:** v1.1 added rows 23–26, sourced from `GEO_GUIDELINES.md`. Phase 2A's implementation (see `docs/VALIDATOR_IMPLEMENTATION_MATRIX.md` §1) found that v1.0 had zero rules citing `GEO_GUIDELINES.md` despite GEO being a required validator category — a real documentation gap, not a validator limitation. That revision closed it. **v1.2** is a single terminology-only edit to row 7's wording (below), made necessary by `KNOWLEDGE_OBJECTS.md` v1.1's Claim/Evidence/Source split — no severity, status, or rule count changed; see `PHASE_3_STEP1_AMENDMENT_REPORT.md` for why this was the one change judged strictly necessary rather than deferred. The generated `docs/RULE_TRACEABILITY.md` and the hand-written `docs/VALIDATOR_ARCHITECTURE.md` are the companion documents to this one — the former is derived directly from the validator's own rule definitions (so it cannot drift from the code the way this document could), the latter explains which rules are deterministic vs. heuristic vs. human-review-only vs. blocked on future architecture.

## 1. Purpose

Every other document states rules in prose, written for a human (or a future Claude session) to understand and apply with judgment. This document restates the subset of those rules that can be checked mechanically, as a single pass/fail gate a country record must clear before publishing — the last stop in the Freeze Pipeline, and the concrete form of the `npm run validate-country {slug}` command specified (not yet built) here.

## 2. Severity model

Not every violation should block a publish outright.

- **FAIL** — blocks publish. Reserved for Business Truth violations, structural incompleteness, and anything that would put false or broken content live.
- **WARN** — flagged, requires a human override with a stated justification to proceed. Reserved for judgment-adjacent thresholds (e.g. internal-link floor) where a mechanical check can be a reasonable proxy but shouldn't have the final word.

## 3. Rule table

| # | Check | Source document | Severity |
|---|---|---|---|
| 1 | No banned phrase pattern present (submission-duration claims, printed-timing outside checkout, "guaranteed," universal-acceptance phrasing, government/embassy self-description) | `BUSINESS_TRUTH_LAYER.md` §5 | FAIL |
| 2 | ~8-minute claim appears at most 2 times; appears only in sanctioned locations | `BUSINESS_TRUTH_LAYER.md` §6 | FAIL |
| 3 | "Legally required" phrasing appears at most 3 times; appears only in sanctioned locations | `BUSINESS_TRUTH_LAYER.md` §6 | FAIL |
| 4 | No `AggregateRating`/`Review` schema node present | `BUSINESS_TRUTH_LAYER.md` §5.6, `SCHEMA_GUIDELINES.md` §3 | FAIL |
| 5 | Core record fields all present (`primaryKeyword`, `metaTitle`, `metaDescription`, `lastVerifiedDate`, `tier`, `drivingSide`, ≥1 `sourceCitations`) | `KNOWLEDGE_OBJECTS.md` §2 | FAIL |
| 6 | Module count and FAQ count meet the record's declared tier's minimums | `KNOWLEDGE_OBJECTS.md` §6, `TIER_DEFINITIONS` | FAIL |
| 7 | Every claim with `confidence: "confirmed"` has ≥1 linked `Evidence` entry (`Claim.evidenceRefs`), and that evidence resolves to a `primary`-classified `Source` | `RESEARCH_STANDARD.md` §7, `KNOWLEDGE_OBJECTS.md` §5–§7 | FAIL |
| 8 | Every citation has a non-generic `label`, direct `url`, and named `organization` | `RESEARCH_STANDARD.md` §7 | FAIL |
| 9 | `metaTitle` ≤ 60 chars, `metaDescription` ≤ 155 chars | `SEO_GUIDELINES.md` §3 | WARN |
| 10 | `primaryKeyword` unique across the entire registry | `SEO_GUIDELINES.md` §3, §6 | FAIL |
| 11 | Exactly one `<h1>`; no skipped heading levels | `SEO_GUIDELINES.md` §4 | FAIL |
| 12 | `slug` matches `^[a-z0-9-]+$`, matches its registry key, matches a `lib/destinations.ts` entry's slug | `SEO_GUIDELINES.md` (registry consistency) | FAIL |
| 13 | Every `relatedCountrySlugs` entry resolves to a real destinations-list slug | `KNOWLEDGE_OBJECTS.md`, (fixes the class of bug found in the platform's first audit) | FAIL |
| 14 | Internal contextual link count ≥ floor (currently 6) | `SEO_GUIDELINES.md` §5 | WARN |
| 15 | No two adjacent modules restate the same foundational claim near-verbatim (n-gram overlap above threshold) | `EDITORIAL_GUIDELINES.md` §5 | WARN |
| 16 | No banned superlative/manipulation phrase present (§7 of `EDITORIAL_GUIDELINES.md`) | `EDITORIAL_GUIDELINES.md` §7 | FAIL |
| 17 | No hedge word repeated within the same module (`RESEARCH_STANDARD.md`-driven `partially_sourced` content) | `EDITORIAL_GUIDELINES.md` §4 | WARN |
| 18 | Required JSON-LD nodes present and non-empty for the record's tier and populated modules; no node present for an absent module | `SCHEMA_GUIDELINES.md` §3 | FAIL |
| 19 | Schema graph passes structured-data syntax validation | `SCHEMA_GUIDELINES.md` §7.1 | FAIL |
| 20 | Schema `FAQPage`/`HowTo` text matches rendered page text exactly (content parity) | `SCHEMA_GUIDELINES.md` §7.2 | FAIL |
| 21 | `Organization`/`WebSite`/`#idp-entity` referenced by `@id`, never redefined inline | `SCHEMA_GUIDELINES.md` §2, §6 | FAIL |
| 22 | `ItemList` entries carry real `name` + resolvable `url`, never a raw slug as name | `SCHEMA_GUIDELINES.md` §5 | FAIL |
| 23 | Every module's `directAnswer` is a single, standalone-quotable sentence (no compound sentence, no unresolved leading pronoun) | `GEO_GUIDELINES.md` §2, §3 | WARN |
| 24 | Confidence is visibly distinguishable on the rendered page for `partially_sourced` content | `GEO_GUIDELINES.md` §4 | WARN |
| 25 | Atomic facts: each `TipList` point expresses one claim (one sentence) | `GEO_GUIDELINES.md` §5 | WARN |
| 26 | Every confirmed claim's citation is reachable from the same page, and a freshness/last-reviewed signal is human-visible on the page | `GEO_GUIDELINES.md` §6 | WARN |

Rows 23–26 are graded WARN, not FAIL, per §2's severity model — none of them are Business Truth violations or structural incompleteness; they're GEO quality signals a human should weigh, not a hard publish-blocker. This should be revisited if any of them later prove to correlate with real AI-citation failures.

Two `GEO_GUIDELINES.md` §7 concerns — no AI-manipulation tactics, and FAQ entries answering real questions rather than citation bait — are deliberately **not** included as numbered rows, for the same reason nothing in §5 below is: distinguishing manipulative intent from legitimate content requires human judgment a mechanical rule can't reliably substitute for.

## 4. CLI contract

```
npm run validate-country thailand
npm run validate-country --all
```

Output: grouped by source category (Business Truth / Structural / Research & Citation / SEO / Editorial / Schema), each rule reported as PASS / WARN / FAIL with the specific field or location implicated. Non-zero exit code on any FAIL; zero exit code with a printed summary on WARN-only results, so CI can distinguish "blocked" from "flagged for human review."

## 5. What this document explicitly does not check

- **Prose quality and voice consistency** (`EDITORIAL_GUIDELINES.md` §1–§2, §10) — not mechanically checkable; stays human-reviewed.
- **True factual correctness of a `confirmed` claim** — rule #7 checks that a `Claim` has a linked `Evidence`/`Source` and that the source is well-formed and primary-classified, not that the evidence actually supports the claim's specific proposition. That verification is `RESEARCH_STANDARD.md`'s human responsibility and cannot be automated without re-deriving the entire research process.
- **Accessibility beyond data-level checks** — real contrast ratios, keyboard-navigation behavior, and screen-reader testing require a rendered-page/browser-based audit, not a data validator. This document checks the data going into the page, not the page's runtime accessibility.
- **"Does this feel premium"** — a judgment call, deliberately left to human review at the Freeze Pipeline's QA step.
- **No AI-manipulation tactics, and FAQ entries answering real questions rather than citation bait** (`GEO_GUIDELINES.md` §7) — added in v1.1 alongside rows 23–26; excluded for the same reason as the rest of this list, not an oversight.

## 6. Rules are data, not code branches

To stay maintainable as the rule count grows, rules are implemented as a configuration array (`{ id, description, sourceDoc, severity, check }`), mirroring the `MODULE_REGISTRY` pattern already used elsewhere in the platform's design — not as hardcoded if/else branches in a validator script. This is now true in the actual implementation (`lib/validation/rules.ts`), not just a design intention: adding rule #27 means adding one array entry, not editing control flow. `docs/RULE_TRACEABILITY.md` is generated directly from that array.

## 7. Interaction with other documents

This document is downstream of, and only downstream of, all seven others. It has no independent authority — every row in §3 cites the document that actually establishes the rule. When any of those seven documents is amended, the amendment is incomplete until the corresponding row here is added, removed, or updated in the same change. This document being out of sync with the others is itself a governance failure, not a neutral state.

## 8. Future scalability concerns

- **Keeping pace with amendments.** Eight documents, one of which (this one) must track every checkable rule from the other seven, is a real maintenance burden. The data-driven rule format (§6) is the mitigation, not a solution — someone still has to remember to update it.
- **Rule count growth.** 26 rules today (up from 22 in v1.0, after closing the GEO gap) will not be 26 rules at 195 countries with 30 possible modules each. The severity model (§2) is what keeps this survivable — most new rules should default to WARN unless they're genuinely Business-Truth-adjacent, or the FAIL list will eventually block publishing on trivia.
- **The registry-wide checks (rules #10, #13) get more expensive as the registry grows** — at 195 countries these need to run against the full published set, not be re-derived per page from scratch each time; worth an indexed/cached keyword-and-slug registry rather than an O(n²) scan at validation time.

## 9. Self-critique

The original master specification treated every check as pass/fail with no middle ground — that was too rigid on reflection; a validator that hard-blocks publishing over an internal-link count one below a provisional floor would train people to either pad links dishonestly or route around the validator entirely, both worse outcomes than a WARN. The severity model in §2 is the concrete correction made in this pass, and it should be revisited rule-by-rule (not just left at their current assignment) once real Tier 2/3 country data exists and some of today's FAIL assignments turn out to be too strict, or some WARN assignments turn out to matter more than expected.
