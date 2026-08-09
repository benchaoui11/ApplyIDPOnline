# Validator Architecture

Version: 1.1
Companion to `docs/VALIDATION_RULES.md` (what the rules are), `docs/RULE_TRACEABILITY.md` (generated — exactly which code checks which rule), and `docs/PHASE_2A_FINDINGS_REPORT.md` (a real run's results). This document explains *how much to trust* each rule's verdict, and how the validator's own supporting systems (health scores, snapshots, traceability) work.

## 1. Purpose

A validator that reports "FAIL" carries an implicit claim: this is true, act on it. That claim is only as good as the method behind it. Some of this validator's checks are exact and reproducible; others are approximations that can be wrong in either direction. Presenting both kinds identically would be dishonest — this document is what keeps that distinction visible instead of buried in code comments only a reader of `lib/validation/rules.ts` would see.

## 2. The four kinds

Every rule in `lib/validation/rules.ts` carries a `kind` field, one of:

### `deterministic`
Exact and reproducible: the same input always produces the same verdict, with no approximation. Field-presence checks, exact string/count matches, format regexes, registry cross-references, JSON-LD structural checks. A `deterministic` FAIL should be trusted at face value — there is no heuristic judgment to second-guess.

**Rules:** VR-02, VR-03, VR-04, VR-05, VR-06, VR-08, VR-09, VR-10, VR-11, VR-12, VR-13, VR-17, VR-19, VR-20, VR-21, VR-22, VR-24, VR-26.

Even within "deterministic," some rules check a narrower thing than their documented description promises — that's a *scope* limitation, not a *kind* one, and is called out per-rule in `docs/VALIDATOR_IMPLEMENTATION_MATRIX.md` §3 (e.g. VR-19 is a structural syntax check, not full schema.org compliance; VR-20 checks schema-vs-data-source parity, not schema-vs-DOM-text parity). A narrower-than-documented deterministic check is still exact about the narrower thing it actually checks.

### `heuristic`
Approximate and threshold-based, by design. Can produce false positives and false negatives, and that possibility is treated as a permanent property of the rule, not a bug to eventually eliminate.

**Rules:** VR-01, VR-14, VR-15, VR-16, VR-23, VR-25.

Each heuristic rule's finding message states its method in plain language every time it runs (not just in code comments), so a false PASS or false FAIL is at least legible as "this came from an approximation" to whoever reads the report.

### `requires-future-architecture`
The rule is well-specified in its governing document, but the current data model doesn't carry what the check needs. Reported as `NOT_IMPLEMENTED`, never silently passed and never faked with a weaker proxy standing in for the real rule.

**Rules:** VR-07 (no per-field citation linkage exists — `CountryRecord.sourceCitations` is one global array), VR-18 (no module registry exists yet to define which schema nodes *should* be present per tier/module).

### Human-review-only (not a `kind` on a rule — a separate category entirely)
Concerns named in governing documents that are **never** going to become mechanical rules, regardless of future architecture work — distinguishing them from `requires-future-architecture` matters because building more data model will never close this gap; only human judgment can. Listed in `docs/RULE_TRACEABILITY.md`'s second table (6 items as of this version): prose quality, true factual correctness of a "confirmed" claim, real accessibility, design/premium-feel judgment, and two `GEO_GUIDELINES.md` §7 anti-manipulation concerns.

## 3. Why kind matters more than status

A `FAIL` from a `deterministic` rule and a `FAIL` from a `heuristic` rule should not carry the same weight in a human's decision about what to do next. The former is a fact; the latter is a signal worth investigating, not a verdict to act on blindly. This is the direct, structural answer to a lesson from hardening this validator (§5) — a heuristic rule reported a real hit and a spurious one with the exact same confidence-free `[FAIL]` marker, and there was no way to tell which was which without reading source code. `kind` is now printed on every finding line in `--verbose` output specifically so that distinction is visible without opening the codebase.

## 4. Health scores — formula and its limits

Implemented in `lib/validation/score.ts`. Per rule: `PASS` = 1.0 credit, `WARN` = 0.5 credit, `FAIL` = 0 credit. `NOT_IMPLEMENTED` is excluded from both the numerator and denominator of the score — but tracked separately as `coveragePct`, specifically so a category built entirely from unmeasured rules can't report a misleadingly perfect score. A category with 1 rule, `NOT_IMPLEMENTED`, has **no score** (`null`), not 100 and not 0 — both would be a claim this validator hasn't earned the right to make.

**Known limitation:** the formula treats every rule in a category as equally weighted. A category with one severe `FAIL` and four trivial `PASS`es scores 80/100, which can understate how serious that one failure is. This is a deliberate simplicity choice for this version, not an oversight — a severity-weighted formula is a reasonable future improvement once there's enough real multi-country data to calibrate weights against, rather than guessing at them now.

## 5. The false positive, and how it was actually fixed (not just patched once)

Phase 2A's first real run flagged a false positive: the "universal acceptance claim" pattern matched inside the FAQ question *"Is a Digital IDP accepted by every rental company in Thailand?"* — a rhetorical question, not an assertion. The first fix (sentence-boundary splitting + skipping question sentences) closed that specific case.

Running the improved validator again immediately surfaced a **second**, different false positive in the same rule family: the "government/embassy/motor-authority self-description" pattern matched *"Not a government agency and not affiliated with AAA, AATA, FIA, AIT, or the United Nations"* — a second, differently-worded disclaimer sentence elsewhere on the page, distinct from the one ratified sentence a first-pass fix had whitelisted by exact substring match. That first-pass fix ("skip if the sentence contains the string 'independent, private service'") was itself too narrow — it worked for the one sentence it was written against and broke the moment a second, equally legitimate disclaimer used different words.

**The actual fix** (`lib/validation/textChecks.ts#isNegated`) replaces the exact-string whitelist with a general negation detector: if a banned-phrase match is preceded within a short window by a negation cue ("not a," "not affiliated," "never," etc.), the match is skipped, regardless of which exact sentence it appears in. This closes both the original case and the newly-found one with the same mechanism, and — more importantly — should hold for a third differently-worded disclaimer sentence that doesn't exist yet, which the substring-whitelist approach never would have. This is the concrete lesson: **a false-positive fix that whitelists one exact string is not a fix, it's a patch that will resurface with different wording** — the negation-detection approach is what actually closes the class of problem, not just the one instance discovered first.

## 6. The false negative, and why it remains open by design

The original platform audit found the Driving and Road Rules guide modules both open with near-duplicate claims about which side of the road Thailand drives on. Phase 2A's duplication check (Jaccard token-overlap similarity, `lib/validation/textChecks.ts#jaccardSimilarity`) does not flag this pair. Hand-verified in Phase 2A: the two sentences —

> *"Thailand drives on the left, and the driver's seat is on the right side of the vehicle."*
> *"Traffic drives on the left; roundabouts, overtaking, and right-of-way at junctions follow the same convention."*

— share only two non-stopword tokens ("drives," "left") once the surrounding wording is tokenized, producing a similarity score of roughly 0.125 against this rule's 0.4 threshold. A human reads these as duplicating the same underlying claim; a token-overlap measure does not, because the sentences are lexically quite different despite being semantically close.

**This version widens VR-15's coverage** (comparing every point pair between adjacent modules, not just each module's first point) — a real, verified improvement in how much content gets checked. It does **not** close the false-negative gap itself, and cannot: the gap is a property of lexical similarity as a technique, not of how many sentence pairs get fed into it. Lowering the similarity threshold to catch this specific pair would very likely produce new false positives on unrelated sentence pairs that happen to share two or three common words. Closing this gap for real would require actual semantic similarity (e.g., embedding-based comparison), which is a meaningfully larger dependency and design decision than this validator-hardening phase's scope — noted here as a deliberate, explained limitation rather than either silently living with it or reaching for an unscoped fix.

## 7. Rule traceability — generated, not hand-maintained

`docs/RULE_TRACEABILITY.md` is produced by `scripts/generate-rule-traceability.ts` directly from `RULES` and `HUMAN_REVIEW_ONLY_ITEMS` in `lib/validation/rules.ts`. This is a direct, narrow fix for the "eight documents synchronization" risk `docs/ARCHITECTURE_REVIEW.md` named: a hand-maintained document → rule → implementation table would eventually drift from what the code actually checks. A generated one cannot drift from the code, because it *is* a view of the code — the failure mode that remains is someone changing a rule's behavior without updating its `description` or `sourceDoc` metadata (the generator only knows what the metadata says, not what the check function actually does), which is a real but smaller and more localized risk than whole-document drift.

Run `npm run generate-traceability` after any change to `lib/validation/rules.ts`. It is not run automatically — there is currently no pre-commit or CI hook enforcing it stays current, which is worth naming as an open gap rather than assuming it's covered.

## 8. Regression snapshots — what they guard against, and what they don't

`lib/validation/snapshot.ts` captures a run's findings (`ruleId`, `category`, `severity`, `kind`, `status`) as a JSON snapshot per country. `npm run validate-country -- <slug> --check-snapshot` diffs a fresh run against the saved one and classifies each change:

- **Regression:** a rule's status got objectively worse (`PASS` -> `WARN`/`FAIL`, `WARN` -> `FAIL`), or a previously-checked rule became `NOT_IMPLEMENTED` (lost coverage — e.g. someone broke the check code), or a rule disappeared entirely.
- **Not a regression:** a new rule appearing, or a status improving.

Verified in this phase with synthetic data (not just asserted): `PASS -> FAIL` correctly flags as a regression, `WARN -> PASS` correctly does not, and `PASS -> NOT_IMPLEMENTED` (simulating a broken check) correctly flags as a regression.

`--check-snapshot` is the one command in this validator that can exit non-zero — a deliberate, narrow exception to the diagnostic mode's always-exit-0 behavior, because a regression-diff tool that can't signal "something changed" has no purpose. It remains, as of this version, **not wired into any CI step or build process** — it exists as a capability, per this phase's explicit scope, not yet as enforcement.

**What a snapshot does not do:** it has no opinion about whether the *baseline* itself was healthy. Thailand's current snapshot includes the real VR-03 `FAIL` (the "legally required" overcount found in Phase 2A) as its baseline — `--check-snapshot` will only complain if that FAIL becomes something *worse*, never flag that it was already a problem. A snapshot answers "did anything change," not "is this good."

## 9. Coverage summary (this version)

- 26 implemented rules: 18 deterministic, 6 heuristic, 2 requires-future-architecture.
- 6 human-review-only concerns, documented, no code.
- 11 required categories; 1 reports zero rules today — Accessibility, deliberately empty per `VALIDATION_RULES.md` §5. GEO went from 0 rules (a documentation gap, `VALIDATOR_IMPLEMENTATION_MATRIX.md` §1) to 4 in this version.

See `docs/RULE_TRACEABILITY.md` for the generated, authoritative per-rule table.
