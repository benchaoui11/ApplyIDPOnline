# Rule Traceability

**GENERATED FILE — do not hand-edit.** Produced by `scripts/generate-rule-traceability.ts` directly from `lib/validation/rules.ts`. Re-run `npm run generate-traceability` after changing any rule definition.

Generated: 2026-07-31T05:47:31.739Z

Maps every rule this validator implements back to the governing document it comes from and the exact code that checks it — document → rule → implementation, in one direction, always in sync with the code because it's derived from the code.

## Implemented rules

| Rule ID | Category | Severity | Kind | Governing document | Implementation | Needs rendered page |
|---|---|---|---|---|---|---|
| VR-01 | Business Truth | FAIL | heuristic | VALIDATION_RULES.md row 1 (BUSINESS_TRUTH_LAYER.md §5) | `lib/validation/textChecks.ts#scanForBannedPhrases` | no |
| VR-02 | Business Truth | FAIL | deterministic | VALIDATION_RULES.md row 2 (BUSINESS_TRUTH_LAYER.md §6) | `lib/validation/rules.ts#VR-02` | yes |
| VR-03 | Business Truth | FAIL | deterministic | VALIDATION_RULES.md row 3 (BUSINESS_TRUTH_LAYER.md §6) | `lib/validation/rules.ts#VR-03` | yes |
| VR-04 | Business Truth | FAIL | deterministic | VALIDATION_RULES.md row 4 (BUSINESS_TRUTH_LAYER.md §5.6, SCHEMA_GUIDELINES.md §3) | `lib/validation/rules.ts#VR-04` | yes |
| VR-05 | Knowledge Objects | FAIL | deterministic | VALIDATION_RULES.md row 5 (KNOWLEDGE_OBJECTS.md §2) | `lib/validation/rules.ts#VR-05` | no |
| VR-06 | Knowledge Objects | FAIL | deterministic | VALIDATION_RULES.md row 6 (KNOWLEDGE_OBJECTS.md §6, TIER_DEFINITIONS) | `lib/validation/rules.ts#VR-06` | no |
| VR-07 | Research | FAIL | deterministic | VALIDATION_RULES.md row 7 (RESEARCH_STANDARD.md §7, KNOWLEDGE_OBJECTS.md §5-§7) | `lib/validation/rules.ts#VR-07` | no |
| VR-08 | Research | FAIL | deterministic | VALIDATION_RULES.md row 8 (RESEARCH_STANDARD.md §7) | `lib/validation/rules.ts#VR-08` | no |
| VR-09 | Metadata | WARN | deterministic | VALIDATION_RULES.md row 9 (SEO_GUIDELINES.md §3) | `lib/validation/rules.ts#VR-09` | no |
| VR-10 | SEO | FAIL | deterministic | VALIDATION_RULES.md row 10 (SEO_GUIDELINES.md §3, §6) | `lib/validation/rules.ts#VR-10` | no |
| VR-11 | SEO | FAIL | deterministic | VALIDATION_RULES.md row 11 (SEO_GUIDELINES.md §4) | `lib/validation/rules.ts#VR-11` | yes |
| VR-12 | Data Integrity | FAIL | deterministic | VALIDATION_RULES.md row 12 (SEO_GUIDELINES.md, registry consistency) | `lib/validation/rules.ts#VR-12` | no |
| VR-13 | Data Integrity | FAIL | deterministic | VALIDATION_RULES.md row 13 (KNOWLEDGE_OBJECTS.md) | `lib/validation/rules.ts#VR-13` | no |
| VR-14 | Internal Linking | WARN | heuristic | VALIDATION_RULES.md row 14 (SEO_GUIDELINES.md §5) | `lib/validation/rules.ts#VR-14` | yes |
| VR-15 | Editorial | WARN | heuristic | VALIDATION_RULES.md row 15 (EDITORIAL_GUIDELINES.md §5) | `lib/validation/rules.ts#VR-15` | no |
| VR-16 | Editorial | FAIL | heuristic | VALIDATION_RULES.md row 16 (EDITORIAL_GUIDELINES.md §7) | `lib/validation/textChecks.ts#scanForBannedSuperlatives` | no |
| VR-17 | Editorial | WARN | deterministic | VALIDATION_RULES.md row 17 (EDITORIAL_GUIDELINES.md §4) | `lib/validation/rules.ts#VR-17` | no |
| VR-18 | Schema | FAIL | requires-future-architecture | VALIDATION_RULES.md row 18 (SCHEMA_GUIDELINES.md §3) | `not implemented` | no |
| VR-19 | Schema | FAIL | deterministic | VALIDATION_RULES.md row 19 (SCHEMA_GUIDELINES.md §7.1) | `lib/validation/rules.ts#VR-19` | yes |
| VR-20 | Schema | FAIL | deterministic | VALIDATION_RULES.md row 20 (SCHEMA_GUIDELINES.md §7.2) | `lib/validation/rules.ts#VR-20` | yes |
| VR-21 | Schema | FAIL | deterministic | VALIDATION_RULES.md row 21 (SCHEMA_GUIDELINES.md §2, §6) | `lib/validation/rules.ts#VR-21` | yes |
| VR-22 | Schema | FAIL | deterministic | VALIDATION_RULES.md row 22 (SCHEMA_GUIDELINES.md §5) | `lib/validation/rules.ts#VR-22` | yes |
| VR-23 | GEO | WARN | heuristic | VALIDATION_RULES.md row 23 (GEO_GUIDELINES.md §2, §3) | `lib/validation/rules.ts#VR-23` | no |
| VR-24 | GEO | WARN | deterministic | VALIDATION_RULES.md row 24 (GEO_GUIDELINES.md §4) | `lib/validation/rules.ts#VR-24` | yes |
| VR-25 | GEO | WARN | heuristic | VALIDATION_RULES.md row 25 (GEO_GUIDELINES.md §5) | `lib/validation/rules.ts#VR-25` | no |
| VR-26 | GEO | WARN | deterministic | VALIDATION_RULES.md row 26 (GEO_GUIDELINES.md §6) | `lib/validation/rules.ts#VR-26` | yes |

## Human-review-only concerns (no code implementation, by design)

These are named in governing documents but deliberately never implemented as mechanical rules — distinct from rules reporting `NOT_IMPLEMENTED` (VR-07, VR-18), which COULD be checked once specific future architecture exists. These stay human-review-only regardless of future architecture work.

| Concern | Category | Governing document | Why it stays human-review-only |
|---|---|---|---|
| Prose quality and voice consistency | Editorial | EDITORIAL_GUIDELINES.md §1-2, §10 | Not mechanically checkable; VALIDATION_RULES.md §5 excludes it by design. |
| True factual correctness of a 'confirmed' claim | Research | RESEARCH_STANDARD.md | A validator can check a citation exists and is well-formed (VR-08), never that it actually supports the claim. |
| Real accessibility (contrast, keyboard nav, screen readers, reduced motion) | Accessibility | VALIDATION_RULES.md §5 | Requires a rendered-page/browser-based audit; explicitly out of scope for a data validator. |
| "Does this feel premium" / design judgment | Editorial | VALIDATION_RULES.md §5 | A judgment call, deliberately left to human review at the Freeze Pipeline QA step. |
| No AI-manipulation tactics (hidden/visually-suppressed text, fabricated Q&A bait) | GEO | GEO_GUIDELINES.md §7 | Distinguishing manipulative intent from legitimate UX patterns (e.g. tabbed content using the hidden attribute) is not reliably mechanical. |
| FAQ entries answer real questions a visitor would actually ask, not AI-citation bait | GEO | GEO_GUIDELINES.md §7 | Requires human judgment about genuine informational value. |

## Coverage summary

- 26 implemented rules total
- 6 rule(s) classified `heuristic`
- 19 rule(s) classified `deterministic`
- 1 rule(s) classified `requires-future-architecture`
- 6 documented concern(s) intentionally left to human review

See `docs/VALIDATOR_ARCHITECTURE.md` for what each `kind` means and why each classification was made.
