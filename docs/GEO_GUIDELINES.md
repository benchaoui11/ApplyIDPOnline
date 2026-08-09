# GEO Guidelines (Generative Engine Optimization)

Version: 1.0
Authority level: subordinate to `BUSINESS_TRUTH_LAYER.md` — GEO optimization never means claiming more than what's verified; an AI system repeating an overstated claim damages the platform's authority more than a single human reader ever would. Sibling to `SEO_GUIDELINES.md`; shares content with `EDITORIAL_GUIDELINES.md`.

## 1. Purpose

Defines how content is structured so it can be confidently extracted, cited, and quoted by ChatGPT, Claude, Gemini, Perplexity, and Google AI Overviews. Ranking (SEO) and retrievability (GEO) are related but distinct goals — a page can rank without being citable, and citability depends more on structure and confidence-legibility than on keyword placement.

## 2. Four composable primitives

Rather than a distinct component per named concept ("Rental Reality Block," "Common Mistakes Block," "Comparison Block," etc.), every GEO-optimized content unit is built from four primitives:

- **`DirectAnswerBlock`** — one sentence, standalone-quotable, no pronoun dependency on surrounding page content. Must make sense if lifted out of context, because that is literally how an AI system will excerpt it.
- **`FactTable`** — key/value pairs, each row carrying its own confidence marker.
- **`MisconceptionBlock`** — `{ misconception, correction, sourceRef? }`, for directly correcting a common wrong belief rather than only stating the right one.
- **`TipList`** — ordered/unordered verified points (the existing `points` shape).

Every named "reality block" the platform wants is a composition of these: a Rental Reality section is `DirectAnswerBlock` + `FactTable` + `TipList`; a Common Mistakes section is a list of `MisconceptionBlock`s. No new component family is needed per named concept — this directly avoids inventing ten near-duplicate block types.

## 3. Direct-answer-first, always

Every module opens with its `DirectAnswerBlock` before any supporting detail. This is the same rule `EDITORIAL_GUIDELINES.md` §6 states for readability — here it's stated as a retrieval requirement: an AI system scanning for an answer to "do I need an IDP in Thailand" needs the answer in the first sentence of the relevant module, not buried after three paragraphs of context.

## 4. Confidence must be visible, not just tracked internally

This is the single highest-leverage GEO change available to the platform. `VerificationStatus` (`confirmed` / `partially_sourced` / `pending`) has existed in the data model since the first country was built, but previously reached no further than internal editorial discipline — the rendered page gave a `partially_sourced` claim the same visual weight as a `confirmed` one. An AI system extracting facts from the page has no way to know which claims are load-bearing and which are hedged, so it treats the whole page as uniformly authoritative — which oversells the weak claims and undersells the strong ones equally.

**Rule:** every `FactTable` row and `TipList` item carrying `status: "partially_sourced"` gets a consistent, subtle visual marker (a small "commonly reported" tag, not an alarming warning). `confirmed` items carry no marker — the absence of a marker is itself the confidence signal. This gives both human readers and AI extraction a legible confidence gradient instead of a flat wall of equally-weighted assertions.

## 5. Atomic facts — scope of the rule

One claim per sentence inside `FactTable` rows and `TipList` items — compound sentences with multiple bundled claims are harder to extract cleanly and harder to independently fact-check. This rule applies specifically to those two primitives, which are already list-like in structure, not to `DirectAnswerBlock` or `solutionNote` prose, which should read as complete, considered sentences. Applying strict atomicity to the latter would push the page toward choppy, listicle-style writing that conflicts with the premium editorial voice `EDITORIAL_GUIDELINES.md` requires — the two documents are reconciled by scoping atomicity to where it doesn't create that tension.

## 6. Source transparency and freshness visibility

Every `confirmed` claim's citation must be reachable from the same page the claim appears on, not only from a separate sitewide sources page. `lastVerifiedDate` must be human-visible on the page itself (not buried in metadata only) — both AI systems and human readers weight freshness signals, and an invisible freshness field weights nothing.

## 7. Explicit prohibition on AI-manipulation tactics

GEO optimization has a known failure mode: content designed to bait AI citation rather than genuinely inform. This platform explicitly rules out: hidden or visually-suppressed text aimed at crawlers, keyword stuffing disguised as "AI-friendly" phrasing, and fabricated Q&A pairs with no real informational value written solely to bait an AI Overview snippet. If a `FAQPage` entry doesn't answer a question a real visitor would actually ask, it doesn't belong on the page regardless of its citation potential.

## 8. Interaction with other documents

- Shares its underlying prose with `SEO_GUIDELINES.md`; ranking and retrieval are different lenses on the same sentences, not different content.
- Depends on `EDITORIAL_GUIDELINES.md` for the actual wording that makes confidence "visible" (§4 here is implemented as a writing/markup rule there).
- Depends on `SCHEMA_GUIDELINES.md` for the machine-readable mirror of the same information — `FAQPage`/`HowTo` schema is the structured-data half of what the `DirectAnswerBlock`/`TipList` primitives express in prose.
- Absolutely bounded by `BUSINESS_TRUTH_LAYER.md` — retrievability is never pursued at the cost of overstating a claim.

## 9. Future scalability concerns

As more countries publish, comparison-style queries ("is it easier to drive in Thailand or Japan on a US license") become a real and currently-unserved query pattern. This platform's Entity Graph already names a future `ComparisonBlock` and future cross-country articles as the eventual answer — deliberately deferred, not solved now, since it depends on enough published countries to compare in the first place.

## 10. Self-critique

The tension between GEO's atomic-fact preference and editorial's premium-prose preference is real and was initially unresolved in early drafts of this platform's thinking — treating "be atomic" as a blanket rule would have quietly pulled every page toward choppy, listicle-style writing over time as more content got optimized for extraction. §5's explicit scope boundary (atomicity inside structured primitives only, never inside narrative prose) is the fix, and it only works if `EDITORIAL_GUIDELINES.md` and this document are read together rather than in isolation — a real coordination cost worth naming rather than pretending the two documents can be applied independently without friction.
