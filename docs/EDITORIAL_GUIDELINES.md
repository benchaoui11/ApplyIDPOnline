# Editorial Guidelines

Version: 1.0
Authority level: subordinate to `BUSINESS_TRUTH_LAYER.md` (wording constraints) and `RESEARCH_STANDARD.md` (confidence levels this document translates into prose). Sibling to `SEO_GUIDELINES.md` and `GEO_GUIDELINES.md` — same underlying content, three different governance lenses on how it should read and be arranged.

## 1. Purpose

A Knowledge Object is structured data; a page is prose. This document is the bridge — how a `NarrativeModule`'s `directAnswer` and `points`, tagged with confidence levels, become sentences a visitor actually reads and trusts. It's what keeps 195 country pages, written across a long period by different sessions or people, sounding like one consistent, premium publication instead of 195 slightly different voices.

## 2. Voice

Premium, institutional, editorial, document-focused. Explicitly not: a travel blog (no "top 10," no listicle energy), not a government site (no bureaucratic passive voice), not AI-generated SEO filler (no keyword-repetition-as-padding), not fake-personal ("we've all been there!").

Concretely: short, declarative sentences for facts. Warmth is permitted but confined to kickers and introductory framing, never at the cost of clarity or at the cost of delaying the page's direct answer — the H1 and first supporting line state what the page is and what the service does before any scene-setting.

## 3. Confidence-to-wording mapping

This is the editorial enforcement of `RESEARCH_STANDARD.md`'s three confidence levels:

- **`confirmed`** → stated as plain fact, no hedge. *"Helmets are legally required when riding a motorcycle or scooter."*
- **`partially_sourced`** → hedged, using a varied vocabulary (see §4) rather than one repeated word. *"Many rental companies set their own minimum age around 21."*
- **`pending`** → not written. The field doesn't exist in prose form; there's no placeholder sentence for it.

## 4. Hedge-word variety

Using only one or two hedge words ("many," "typically") across an entire page reads as templated and undermines the "not AI-generated" goal — the opposite of what hedging is supposed to protect. Maintain a bank of at least eight interchangeable hedge constructions (*many, typically, commonly, often, in many cases, it's common for, some, generally*) and avoid reusing the same one twice within a single module. This is a small rule with outsized effect on whether partially-sourced content reads as genuinely written versus mechanically generated.

## 5. Anti-repetition rule

A module should assume any foundational fact already established by an earlier module is known, not re-derive it. Concretely: if the Driving module has already stated the country drives on the left, the Road Rules module should not open with the same claim restated — it should build on it. (This rule exists directly because of a duplication the platform's own audit caught between exactly those two modules on the Thailand page.)

## 6. Direct-answer-first ordering

Every module opens with its one-sentence direct answer before any supporting detail. This is not only a GEO requirement (`GEO_GUIDELINES.md` §3) — it's also good editorial practice: a reader scanning should get the answer before the reasoning, not after.

## 7. Banned patterns

- No exclamation points.
- No unearned superlatives ("best," "easiest," "guaranteed," "safest") — these are either backed by a specific citation or not used at all.
- No filler transition phrases that add length without information ("As you may already know," "It goes without saying").
- No second-person urgency manipulation ("Don't risk it!", "Act now").

## 8. CTA copy consistency

Every CTA purpose (`hero`, `context`, `guide`, `decision`, `final` — per the platform's CTA taxonomy) has one canonical copy pattern, not a freely improvised one per country. A `guide`-purpose CTA inside a rental module should read the same structural way on every country's rental module ("Check your eligibility for {Country}"), with only the country name varying — this is what prevents 195 pages from developing 195 slightly different voices for the same functional moment.

## 9. Voice consistency across tiers

Tier 3's shorter content must not read as *lower-quality* prose, only lower-*quantity*. The same sentence-level care applies whether a page has one guide module or six.

## 10. Interaction with other documents

- Downstream of `BUSINESS_TRUTH_LAYER.md`: never writes around a wording restriction (e.g., never rephrases a banned guarantee into something that means the same thing).
- Downstream of `RESEARCH_STANDARD.md`: the confidence level assigned there is what §3 keys off — editorial never independently decides how confident a claim sounds.
- Feeds `GEO_GUIDELINES.md`'s confidence-visibility requirement (§3 of this document is the writing-level implementation of that requirement).
- Partially checkable by `VALIDATION_RULES.md`: banned-word presence (§7) and repeated-hedge-word detection within a module (§4) are both mechanically checkable; actual prose quality and voice consistency are not, and stay human-reviewed.

## 11. Future scalability concerns

- **Voice drift across contributors/time** is the primary risk this document exists to manage, and it's the hardest one to enforce mechanically. Recommend maintaining a small living "before/after" example bank as an appendix, updated whenever a borderline case is resolved, so future authors have concrete precedent rather than only abstract rules.
- **Hedge-word bank exhaustion.** Eight variants is enough for one module; across an entire page with several `partially_sourced` claims, even eight can start feeling recycled. Worth monitoring once a content-heavy Tier 1 page is written under this rule and revisiting the bank size if needed.

## 12. Self-critique

The first draft of §3 and §4 of this document (in an earlier internal pass) specified only "hedge, don't state as fact" without addressing *how* to hedge — that's too thin a rule on its own, because a page that hedges every uncertain claim with the exact same word ends up reading like a template filling in blanks, which is precisely the "AI-generated content" feel the whole platform is trying to avoid. §4's hedge-word variety requirement is the direct fix, added specifically to close that gap rather than leave it as an unstated assumption.
