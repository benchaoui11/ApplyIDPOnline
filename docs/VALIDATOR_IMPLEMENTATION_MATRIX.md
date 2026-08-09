# Validator Implementation Matrix — Phase 2A

Version: 1.0
Produced per the Phase 2A brief's step 1–4: audit `VALIDATION_RULES.md`, classify every documented rule, and report before coding. This document is that report. Implementation followed once no classification was blocking (see §3).

## 1. Audit findings on `VALIDATION_RULES.md` itself

Two issues surfaced while auditing the rule table, before any code was written:

1. **`VALIDATION_RULES.md` contains zero rules sourced from `GEO_GUIDELINES.md`.** GEO is a required validator category in this phase's brief, and was called "the highest priority" pillar in the original master specification — but the 22-row rule table has no row citing `GEO_GUIDELINES.md` as its source. This is a real documentation gap in the Operating System, found by this audit, not a validator limitation. I did not silently add an undocumented rule to fill the gap — per the constraint "no rule may exist only in code without documentation," the GEO category legitimately reports zero rules, with this gap stated as the reason. See §4.
2. **Rule 7's "matching entry" language is ambiguous against the current data model.** `VALIDATION_RULES.md` row 7 requires every `confirmed` field to have "a matching entry" in `sourceCitations` — but `CountryRecord` has one global `sourceCitations` array with no per-field citation reference. "Matching" can't be evaluated as written without either (a) architecture that doesn't exist yet (per-field citation links), or (b) redefining "matching" down to "any citation exists at all," which is a materially weaker check than documented and would misrepresent what's actually being verified. I did not implement a weakened proxy and call it the real rule — it's classified as requiring future architecture (§3).

Neither issue blocks the rest of the matrix — both have a clear, honest resolution (report as a gap; classify as requiring future architecture) rather than requiring the whole phase to stop. Flagged here per the brief's "stop and report if ambiguous" instruction; proceeding with implementation below on that basis.

## 2. Rule-to-code matrix

| Rule | Category | Severity | Classification | Method |
|---|---|---|---|---|
| VR-01 | Business Truth | FAIL | Implement now | Data-layer scan always; rendered-page scan when server reachable |
| VR-02 | Business Truth | FAIL | Implement now | Rendered-page text occurrence count |
| VR-03 | Business Truth | FAIL | Implement now | Rendered-page text occurrence count |
| VR-04 | Business Truth | FAIL | Implement now | Rendered JSON-LD graph scan |
| VR-05 | Knowledge Objects | FAIL | Implement now | Direct data-object check |
| VR-06 | Knowledge Objects | FAIL | Implement now | Direct data-object check, against current xGuide fields as module proxy |
| VR-07 | Research | FAIL | **Requires future architecture** | No per-field citation linkage exists in `CountryRecord` |
| VR-08 | Research | FAIL | Implement now | Direct data-object check |
| VR-09 | Metadata | WARN | Implement now | Direct data-object check |
| VR-10 | SEO | FAIL | Implement now | Direct registry-wide check |
| VR-11 | SEO | FAIL | Implement now | Rendered-page heading extraction |
| VR-12 | Data Integrity | FAIL | Implement now | Direct data-object + registry + destinations cross-check |
| VR-13 | Data Integrity | FAIL | Implement now | Direct data-object + destinations cross-check |
| VR-14 | Internal Linking | WARN | Implement now (reduced precision) | Rendered-page link count, sitewide not body-scoped |
| VR-15 | Editorial | WARN | Implement now (heuristic) | Data-object pairwise Jaccard similarity |
| VR-16 | Editorial | FAIL | Implement now (partial coverage) | Data-layer scan only, no component-hardcoded copy |
| VR-17 | Editorial | WARN | Implement now | Direct data-object check |
| VR-18 | Schema | FAIL | **Requires future architecture** | No module registry exists to define expected nodes per tier |
| VR-19 | Schema | FAIL | Implement now (reduced scope) | Rendered JSON-LD structural/syntax check only, no external validator call |
| VR-20 | Schema | FAIL | Implement now (reduced scope) | Schema-vs-data-source parity, not schema-vs-DOM-text parity |
| VR-21 | Schema | FAIL | Implement now | Rendered JSON-LD graph scan |
| VR-22 | Schema | FAIL | Implement now | Rendered JSON-LD graph scan |

**Requires human review** (not among the 22 numbered rules — `VALIDATION_RULES.md` §5 already excludes these from the mechanical rule table by design): prose quality/voice consistency, true factual correctness of a `confirmed` claim, real accessibility (contrast/keyboard/screen-reader), "does this feel premium." None of these were reclassified into the 22 — they were never claimed as machine-checkable in the first place.

**Not machine-checkable at all:** none of the 22 — every documented rule has either a real implementation or a specific, named architectural blocker (VR-07, VR-18). This is a meaningfully different situation from "not machine-checkable," which is why VR-07/VR-18 are reported as `NOT_IMPLEMENTED` (temporarily blocked) rather than omitted as inherently unautomatable.

## 3. Where "implement now" means reduced scope, stated explicitly per rule

Several rules are implemented against a narrower definition than documented, always with the narrowing stated in the finding's own message at runtime, not hidden:

- VR-01/VR-16: full coverage requires the dev server (to see component-hardcoded prose); data-layer-only coverage is real but partial when the server is unreachable.
- VR-02/VR-03: the occurrence-count clause is checked; the "only in sanctioned locations" clause is not — stated in every PASS message.
- VR-14: counts all internal links on the page, not scoped to main-content body links only (no verified way to exclude nav/footer without reading their markup, which wasn't done this phase).
- VR-19: structural/syntax sanity only (valid JSON, `@graph` present, every node typed) — not a full schema.org spec-compliance run against an external validator service.
- VR-20: checks that JSON-LD and the visible page read from the same underlying data fields (true today, verified), not that the rendered DOM text is byte-identical to the schema text (a narrower, real, but incomplete proxy for the documented rule).

## 4. Category coverage as actually observed

GEO and Accessibility both report zero associated rules, for two different and important-to-distinguish reasons: GEO's emptiness is the gap found in §1 (undocumented, worth fixing in `VALIDATION_RULES.md` before Phase 2B); Accessibility's emptiness is a deliberate, already-documented exclusion in `VALIDATION_RULES.md` §5 and is not a gap at all.
