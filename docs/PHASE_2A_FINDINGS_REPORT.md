# Phase 2A Findings Report — Validator vs. Thailand

Version: 1.0
Generated from a real `npm run validate-country -- thailand --verbose` run against the current Thailand page and record. Raw run: 22 rules, 14 passed, 4 failed, 2 warnings, 2 not implemented. Nothing below was fixed — per the brief, the purpose of this phase is diagnostic, not corrective.

## Totals

| | Count |
|---|---|
| Total rules | 22 |
| Passed | 14 |
| Failed | 4 (VR-01, VR-03, VR-21, VR-22) |
| Warnings | 2 (VR-09, VR-17) |
| Not implemented | 2 (VR-07, VR-18) |
| Human-review required (excluded from the 22 by `VALIDATION_RULES.md` §5 design) | 4 concerns, not numbered rules — see the matrix |

## 1. True content or truth risks

**VR-03 — "legally required" appears 4 times, not the documented cap of 3.** This is a genuine, previously-undetected Business Truth Layer violation, and it's worth explaining *why* it was missed before: every manual audit this project has done used `document.body.innerText.match(...)` in a browser, which excludes anything under a `hidden` attribute. This validator instead scans the raw server-rendered HTML — the same thing a search crawler or an AI system actually reads. `PracticalGuide`'s five (now six-capable) tabs all render their full content in the DOM at all times, with only the inactive ones marked `hidden` — a deliberate, correct choice for crawlability made earlier in this project. The unintended side effect: the 4th "legally required" instance lives inside the Scooters & Motorcycles tab's point — *"Helmets are legally required when riding a motorcycle or scooter in Thailand"* — which is invisible to a human unless they click that tab, but fully present and counted by anything reading raw HTML. **The page has been out of compliance with its own governing document since that content was written, in a way no prior check could have caught.**

## 2. Architecture gaps

- **VR-07 (NOT_IMPLEMENTED):** `CountryRecord` has one global `sourceCitations` array with no per-field citation linkage, so "every confirmed field has a matching citation" cannot be checked as documented. Confirms this is real, unbuilt architecture, not a validator oversight.
- **VR-18 (NOT_IMPLEMENTED):** no module registry exists yet to define which JSON-LD nodes *should* exist per tier — confirms the same for the schema side of `KNOWLEDGE_OBJECTS.md`'s module system.
- **The GEO category has zero rules to run at all**, because `VALIDATION_RULES.md`'s own rule table never enumerated one sourced from `GEO_GUIDELINES.md` (found during the pre-coding audit, §1 of the implementation matrix). This is a gap in the Operating System's own documentation, not in this code.
- **VR-06 passes today only via a proxy** — it counts the current five/six `xGuide` fields as a stand-in for the not-yet-built `modules` map. The check is real, but it's measuring the old shape, not the one `KNOWLEDGE_OBJECTS.md` actually specifies.

## 3. Missing structured data

- **VR-21 (FAIL):** `Service.provider` is a bare inline `{"@type": "Organization", ...}` object, not an `@id` reference, and no node in the graph carries the canonical `https://applyidponline.com/#organization` id at all. Exactly the gap `SCHEMA_GUIDELINES.md` §2 was written to close — confirmed still open in the shipped page.
- **VR-22 (FAIL):** every `ItemList` entry has `name: "japan"` / `"indonesia"` / `"vietnam"` / `"malaysia"` (raw slugs) and no `url` field at all. Also exactly the gap `SCHEMA_GUIDELINES.md` §5 targets — confirmed still open.
- **VR-04 and VR-19 both pass** — no fabricated review/rating schema, and the graph is syntactically well-formed (6 nodes, all typed).

## 4. GEO weaknesses

The validator cannot report a GEO finding at all right now (§2 above) — this is itself the headline GEO finding for this phase. Separately, from direct source inspection during earlier work (not from this validator run, and not re-verified here to keep this report honest about its own basis): `GEO_GUIDELINES.md` §4's confidence-visibility requirement — a visible marker distinguishing `partially_sourced` claims from `confirmed` ones — is still not implemented in `GlancePanel.tsx` or `PracticalGuide.tsx`. `VerificationStatus` is tracked in every relevant data field and reaches nowhere on the rendered page. This remains the single highest-leverage unbuilt GEO improvement, and it currently has no automated check watching it.

## 5. SEO weaknesses

- **VR-09 (WARN):** `metaTitle` is 64 characters (target ≤60), `metaDescription` is 204 characters (target ≤155) — meaningfully over, not a rounding-error miss. First time this has been measured precisely rather than eyeballed.
- **VR-14 passed with 46 internal links against a floor of 6** — but read this cautiously: the check counts every internal `<a href>` on the page, including navigation and footer, not just contextual body links. 46 is very likely a large overcount of what `SEO_GUIDELINES.md` §5 actually means to measure — see §8.

## 6. Schema parity risks

- **VR-20 (PASS):** `FAQPage` and `HowTo` schema currently match their data source exactly — but this is true *by construction* (both the visible page and the JSON-LD read the exact same `country.faq` / `GLOBAL_CONSTANTS.applicationProcessSteps` fields today), not because anything actively guards against future drift. The risk `SCHEMA_GUIDELINES.md` §7.2 is really worried about — someone editing rendered copy without updating the schema-generating function, or vice versa — remains structurally possible and unguarded; it just hasn't happened yet.

## 7. Editorial consistency issues

**VR-17 (WARN):** the Rental Cars guide module uses the hedge word "many" twice within the same module — exactly the pattern `EDITORIAL_GUIDELINES.md` §4 was written to catch (repeated hedging reads as templated). Small, real, and a good sign the rule works as intended.

## 8. False positives or validator limitations

- **VR-01's flagged hit is a false positive.** The banned-phrase scanner matched "accepted by every" inside FAQ question #7 — *"Is a Digital IDP accepted by every rental company in Thailand?"* — a rhetorical question, correctly answered with hedged, compliant language ("Acceptance can vary by rental provider..."). The regex has no way to distinguish a question from an assertion. This needs a smarter check (e.g., skip matches inside `faq[].question` entirely, or require sentence-final punctuation context) before this rule can be trusted at higher severity.
- **VR-15 likely produced a false negative on a known issue.** The original platform audit found near-duplicate "drives on the left" openings between the Driving and Road Rules modules. This run's Jaccard-similarity heuristic did *not* flag that pair — hand-checking the actual token overlap confirms why: the two sentences share only "drives" and "left" as common non-stopword tokens once surrounding wording differs, producing similarity well under this prototype's 0.4 threshold, even though a human reader correctly perceives them as duplicating the same claim. Naive token-overlap is too crude for this specific, already-known case — a genuine, honest limitation, not a false sense of security this report wants to leave standing.
- **VR-14's internal-link count (46) is almost certainly inflated** by nav/header/footer links not being excluded — flagged in `VALIDATOR_IMPLEMENTATION_MATRIX.md` §3 before this run, confirmed by the size of the number itself (46 is implausible as a contextual-body-link count for one page).
- **VR-02/VR-03 only check occurrence count, not the "sanctioned locations" clause** — a page could theoretically pass the count and still have the claim in the wrong place, or vice versa; this run's PASS/FAIL on those two rules should be read as "frequency is/isn't within cap," not "placement is correct."

---

Nothing above has been fixed. Waiting for approval before: refactoring `CountryRecord`, introducing Knowledge Objects, changing Thailand content, or enforcing validation in CI.
