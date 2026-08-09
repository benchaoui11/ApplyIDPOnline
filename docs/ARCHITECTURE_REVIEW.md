# Architecture Review — Country Platform Operating System

Version: 1.1
Reviews: `COUNTRY_PLATFORM_MASTER_SPEC.md` and the governing documents it produced — `BUSINESS_TRUTH_LAYER.md`, `RESEARCH_STANDARD.md`, `KNOWLEDGE_OBJECTS.md`, `EDITORIAL_GUIDELINES.md`, `SEO_GUIDELINES.md`, `GEO_GUIDELINES.md`, `SCHEMA_GUIDELINES.md`, `VALIDATION_RULES.md`.

**Changelog:** v1.1 updates the dependency graph to show `KNOWLEDGE_OBJECTS.md`'s internal registry structure (Claim/Evidence/Source/Entity, added in that document's v1.1 per `PHASE_3_DESIGN.md` §7.7) — the graph's outer shape (BTL supreme, four parallel presentation layers, VALIDATION_RULES.md aggregating) is unchanged; what changed is that `KNOWLEDGE_OBJECTS.md` is no longer usefully drawn as a single box.

## Document dependency graph

```
BUSINESS_TRUTH_LAYER.md  ─────────────────────────────────────────┐  (supreme authority — everything defers to this)
        │                                                          │
        ▼                                                          │
RESEARCH_STANDARD.md ──► KNOWLEDGE_OBJECTS.md ◄─────────────────────┘
        │                       │
        │      ┌────────────────┴───────────────────────┐
        │      │         internal registry structure      │
        │      │                                           │
        │      │   Source ◄── Evidence ──► Claim            │
        │      │      ▲            ▲          ▲             │
        │      │      └────────────┴──────────┘             │
        │      │              (§5–§7, feeds Module +        │
        │      │               Knowledge Object registries) │
        │      │                                           │
        │      │   Entity Registry (§8) ── reuses SCHEMA_GUIDELINES.md
        │      │                            §2's @id values, doesn't
        │      │                            define new ones           │
        │      └───────────────────────────────────────────┘
        │                                │
        └───────────────► (RESEARCH_STANDARD.md §7 now cites
                            Claim/Evidence directly, not a flat
                            citation array)
                                │
              ┌─────────────────┼─────────────────┬────────────────┐
              ▼                 ▼                 ▼                ▼
   EDITORIAL_GUIDELINES  SEO_GUIDELINES   GEO_GUIDELINES   SCHEMA_GUIDELINES
   (voice/wording)       (ranking)        (AI retrieval)   (structured data,
              │                 │                 │         reads Entity Registry
              │                 │                 │         for @id, §4a)
              └─────────────────┴─────────────────┴────────────────┘
                                        ▼
                              VALIDATION_RULES.md
                        (aggregates every checkable rule
                         above; invents none of its own —
                         row 7 now reads Claim.evidenceRefs)
```

`KNOWLEDGE_OBJECTS.md` is the hinge: one data shape, four independent presentation lenses reading from it, one enforcement layer checking all of them. `BUSINESS_TRUTH_LAYER.md` sits outside and above the whole diagram — no path through the system bypasses it.

## Strengths

**The layering genuinely separates concerns that were previously tangled.** Before this pass, "what can we claim," "how confident are we," "what shape is the data," and "how does it get validated" all lived implicitly inside a handful of component files and one person's working memory of the conversation. They're now four separable questions with four separable answers, which means a future change to, say, SEO strategy cannot accidentally weaken a Business Truth rule — the documents don't let that kind of change happen silently.

**The module-archetype system is a real fix for a real, already-observed failure mode.** The platform's own first audit found hardcoded grids, a dead `tier` field, and a `borderCrossingRelevant` flag with no corresponding logic — all symptoms of designing a type around one country's exact shape. Collapsing ~30 named future modules into three reusable archetypes (`KNOWLEDGE_OBJECTS.md` §3) is a structural answer to that specific, demonstrated problem, not a hypothetical improvement.

**The priority-ordered pillar system replaces an unenforceable rule with an enforceable one.** "No decision may damage another pillar" (the original brief) is not how real tradeoffs work. Business Truth > Engineering Integrity > Editorial Trust > SEO/GEO > Conversion is a rule that can actually be applied when two goals genuinely conflict, rather than a slogan that gets silently violated the first time it's tested.

**Confidence-visibility (`GEO_GUIDELINES.md` §4) closes a gap that existed since the very first data model design.** `VerificationStatus` has been tracked internally since Thailand's first record was built and reached no further than editorial discipline. Making it a visible, legible signal on the page is a genuinely high-leverage, previously-unshipped idea, not a restatement of something already working.

**Content-parity validation (`SCHEMA_GUIDELINES.md` §7.2) anticipates a failure mode most schema guidance misses.** Most teams validate schema for syntax correctness and stop there. Requiring schema text to match rendered text exactly catches silent drift between the two, which is a more realistic long-term risk than malformed JSON-LD.

## Weaknesses

**Sourcing capacity is acknowledged, not solved — and it's the actual constraint on this whole system.** `RESEARCH_STANDARD.md` §10 is honest that primary-source verification per Category C fact was slow even once, for one country's ~15 facts. Every other document assumes a steady supply of well-sourced content flowing into it. If that supply doesn't scale, the entire Operating System governs a bottleneck it can't widen — no amount of validation-rule sophistication produces sourced facts faster.

**Several numeric thresholds were set by observing one page, not by principled derivation.** The 2x/3x claim-frequency caps (`BUSINESS_TRUTH_LAYER.md` §6), the internal-link floor of 6 (`SEO_GUIDELINES.md` §5), and the tier content-depth minimums (`KNOWLEDGE_OBJECTS.md` §6) are all defensible starting points explicitly flagged as provisional — but until a real Tier 2 and Tier 3 record exist, the whole system's tier logic is unvalidated against the cases it was built to handle. Thailand alone cannot prove this works.

**The validator can confirm a citation exists; it cannot confirm a citation is correct.** `VALIDATION_RULES.md` §5 says this plainly, but it's worth stating as a weakness in its own right: real fact-checking has no automation path in this design, and doesn't scale the way the rest of the system does. At 195 countries, the humans doing that checking are still the bottleneck from §above, wearing a second hat.

**Eight documents create a real synchronization burden, and the mechanism for keeping them in sync is a written norm, not a system.** `VALIDATION_RULES.md` §7 states that an amendment elsewhere is "incomplete" until this document is updated too — but nothing except discipline enforces that. This is the same class of risk the Business Truth Layer itself had before this pass (living correctly in someone's head, not verifiably in a file) recurring one level up, across eight files instead of zero.

**`lib/destinations.ts` and the country-data registry remain two data sources, now bridged by consistent slugs (Phase 1) but not unified.** `VALIDATION_RULES.md` rule #12/#13 check consistency between them; nothing in this Operating System proposes actually merging them. That's a reasonable scope decision for now, but it means one more thing can drift out of sync as the registry grows, and the current design treats that as permanently acceptable rather than as deferred.

## Future risks

- **Editorial voice drift across a long project lifetime**, especially if written by different contributors or different sessions months apart. `EDITORIAL_GUIDELINES.md` §11 recommends a living example bank as mitigation but doesn't build one — this is a real, foreseeable risk with only a partial answer today.
- **Archetype boundary pressure.** The three-archetype module system is a bet, not a certainty. The first genuinely awkward module (structured multi-leg routes, seasonal date ranges) will test whether "extend the archetype" (`KNOWLEDGE_OBJECTS.md` §3.4) actually holds, or whether a fourth archetype becomes necessary sooner than the design expects.
- **Keyword cannibalization risk grows combinatorially, not linearly**, and the mitigation (a global keyword registry check) is specified but not built. This is a risk that gets more expensive to fix the longer it's deferred, since it means auditing an ever-larger existing set of published pages retroactively rather than checking incrementally from the start.
- **Rule-count creep in `VALIDATION_RULES.md`.** 22 rules today, against one real country. The severity model (FAIL/WARN) is the safety valve, but nothing stops the FAIL list from silently growing stricter over time as new edge cases get added defensively — worth an explicit periodic review of severity assignments, not just additions.
- **The amendment process for `BUSINESS_TRUTH_LAYER.md` (its own §7) needs to stay fast enough not to bottleneck the rest of the platform, while being real enough not to be skipped under deadline pressure** — these two needs are in tension, and the document doesn't yet have evidence either way about how that tension resolves in practice.

## Missing systems

- **An actual automation pipeline.** Everything in `VALIDATION_RULES.md` is specified, nothing is built — there is no `scripts/validate-country.ts`, no CI wiring, no way today to run `npm run validate-country thailand` and get a real answer. This Operating System currently governs an enforcement mechanism that doesn't exist yet.
- **A living editorial example bank.** Named as a recommendation in `EDITORIAL_GUIDELINES.md` but not created.
- **A global keyword/slug registry artifact** that `VALIDATION_RULES.md` rules #10/#13 assume exists to check against — currently would need to be derived ad hoc from the registry each run rather than maintained as its own indexed structure.
- **A real editorial-review/reviewer process.** `BUSINESS_TRUTH_LAYER.md`/`RESEARCH_STANDARD.md` both leave "reviewer" as an intentionally unpopulated future field rather than inventing a placeholder process — correct per the "don't invent" discipline, but it means there is currently no named human process behind "human-reviewed," only the product mechanism (an actual person reviews applications) which is a different thing from editorial review of the page content itself.
- **A City-entity and cross-country Comparison-content system.** Both are named in the Entity Graph and in `GEO_GUIDELINES.md` §9 as deliberately deferred, not designed — correctly out of scope for now, but worth tracking as known future work rather than rediscovering the need later.
- **Batch-verification tooling for facts that don't need per-country research** (e.g., Geneva/Vienna convention signatory status against one authoritative list) — `RESEARCH_STANDARD.md` §10 names this as a likely efficiency win but doesn't design it.

## Recommendations before implementation

1. **Resolve the sourcing-capacity question first.** Everything else in this Operating System assumes a supply of verified content it does not itself produce. Decide realistic per-tier module depth (`KNOWLEDGE_OBJECTS.md` §6 / master spec §13.1) before building anything that assumes 30-module depth is achievable at scale.
2. **Build the validator against Thailand before trusting it anywhere else.** Thailand predates several of these rules (the module-archetype refactor, the confidence-visibility requirement, the schema `@id` scheme) and is very likely to fail some of them today. Running the validator against the one real record that exists, in warn-only mode initially, is the fastest way to find out which rules are well-calibrated and which aren't — cheaper than discovering it at country #10.
3. **Do the `GuideTab` → `modules` map migration as its own dedicated step**, not folded into the first new-module addition, per the open question already flagged in the master spec — it touches three files at once and deserves isolated verification.
4. **Treat the numeric thresholds in this system as hypotheses, not settled constants**, until a real Tier 2 and Tier 3 record exist to test them against. Build the second and third country specifically to stress-test the parts of this Operating System that only one example can't validate — tier minimums, the module registry's extensibility, the internal-link floor — rather than picking the next country purely by business priority.
5. **Build the cross-document sync mechanism before it's needed, not after the first drift is discovered.** Even a lightweight checklist step ("does this change require a `VALIDATION_RULES.md` update?") attached to the amendment process in `BUSINESS_TRUTH_LAYER.md` §7 would materially reduce the eight-document synchronization risk named above.

---

Nothing has been implemented against this Operating System. All eight governing documents and this review live in `docs/`. Waiting for your direction on which recommendations to act on before implementation begins.
