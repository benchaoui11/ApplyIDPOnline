# Business Truth Layer

Version: 1.2 (formalized from prior conversation-only governance — see §7)
Authority level: **supreme**. No other document in this Operating System, and no page, may contradict this one. Where any other document appears to conflict with this one, this document wins and the other document is wrong until corrected.

## 1. Purpose

This is the single ratified source of what Apply IDP Online is allowed to claim, about itself and about any destination, and in what words. It exists because a claim that's wrong or overstated damages three things at once — the visitor who relies on it, the business's legal exposure, and (via GEO) any AI system that repeats the claim to someone else. Everything else in this Operating System (research, editorial voice, SEO, GEO, schema, validation) operates inside the boundary this document draws; none of them may widen it.

## 2. Scope

Governs: factual claims, legal claims, timing claims, business-identity claims, and claim-frequency limits, on every page the platform generates.

Does not govern: writing style, keyword strategy, structured-data syntax, or validation tooling mechanics — those live in `EDITORIAL_GUIDELINES.md`, `SEO_GUIDELINES.md` / `GEO_GUIDELINES.md`, `SCHEMA_GUIDELINES.md`, and `VALIDATION_RULES.md` respectively. This document says *what may be said*; those say *how it gets said, arranged, structured, and checked*.

## 3. The A/B/C claim-source system

Every claim on a country page belongs to exactly one category. The category determines where it may come from and how it must be worded.

- **Category A — Apply IDP Online's own service.** Facts about what the business itself does: fully online application, human review, digital delivery timing, available formats. Source of truth is the actual product (e.g. the application form's real supported options), not an external citation. Never worded as a limitation imposed by government or convention — it's our process, stated as ours.
- **Category B — traditional/government IDP-issuance procedures in the visitor's home country.** Used only for contrast/context (e.g., "unlike an in-person DMV visit..."). Must never be phrased so it reads as Apply IDP Online's own limitation or slowness.
- **Category C — destination-country law and rental-provider norms.** The largest and riskiest category. Sourced only from primary/official sources per `RESEARCH_STANDARD.md`. Never sourced from competitor content, never invented, never assumed to generalize from one country to another.

A claim that doesn't cleanly fit one category is a signal the claim needs to be split into two claims, not a signal to force it into the nearest category.

## 4. Ratified copy blocks (Category A — exact wording)

These are the currently-ratified sentences. They may only change through the amendment process in §7, not through a single page's content edit.

- Digital delivery claim: *"Digital IDP typically delivered in approximately 8 minutes after successful submission, payment, and approval."*
- Process step 3 body: *"Once your application is submitted, paid, and approved, your digital IDP is typically ready in approximately 8 minutes when everything checks out."*
- Trust disclosure: *"Apply IDP Online is an independent, private service — not a government agency, embassy, or motor vehicle authority."*
- Original license requirement: *"Your International Driving Permit is a translation and identity document — you must carry your valid original driver's license alongside it at all times."*
- Printed format availability: *"A printed booklet is also available as an option, shipped after your application is reviewed and approved."*

## 5. Banned constructs (apply to every country page, no exceptions)

1. **No submission-duration claim.** No sentence may assign a time figure to the *submission* step in isolation ("submit in 8 minutes," "8-minute application"). Timing only ever attaches to the full submit → pay → review → approve → deliver chain, worded per §4.
2. **No printed-delivery timing anywhere outside checkout.** Shipping/printing timeframes never appear on an informational or marketing page.
3. **No "guaranteed."** Delivery timing is always "typically" / "approximately," never guaranteed — human review means any individual case can take longer.
4. **No universal acceptance claims.** Digital IDP acceptance by rental providers varies; a country page may never state or imply it's accepted everywhere without exception.
5. **No government/embassy/motor-authority self-description**, direct or implied (no borrowing of official seals, no "official," no language that could be mistaken for a state actor).
6. **No fabricated reviews, ratings, testimonials, or named reviewers.** If real ones don't exist yet, the page has none — not a placeholder, not a plausible-sounding stand-in.
7. **No invented statistics** (traffic-accident rates, checkpoint frequency, enforcement rates) without a primary citation. Absence of a stat is preferable to an invented one.
8. **No claim that generalizes across countries.** A fact confirmed for Thailand is not assumed true for Vietnam because they're regionally similar.

## 6. Claim-frequency caps

Some Category A/C claims are important enough to appear more than once, but repetition past a point reads as SEO-stuffing and undermines the "premium, not desperate" tone `EDITORIAL_GUIDELINES.md` requires. Current caps, verified by direct string-count on the rendered page:

| Claim | Cap | Sanctioned locations |
|---|---|---|
| ~8-minute delivery claim | 2 | Trust card (Fast Digital Delivery) + Process step 3 |
| "Legally required" (IDP requirement phrasing) | 3 | Driving guide module, Glance panel, one FAQ answer |

These caps were set by direct observation on one Tier 1 page (Thailand) and are flagged in §8 as needing revisiting once pages of different length/tier exist — a Tier 3 page with a third of the content might reasonably need a cap of 1, not 2.

## 7. Amendment process

A change to §3–§6 requires: (1) the specific proposed wording or rule change stated explicitly, (2) the reason, (3) an explicit version bump recorded at the top of this file, (4) `VALIDATION_RULES.md` updated in the same change if the amendment affects an automated check. No amendment may be made implicitly by editing a single country page's copy and leaving this document stale — if that happens, this document is authoritative and the page is wrong.

## 8. Interaction with other documents

- `RESEARCH_STANDARD.md` determines *whether* a Category C claim is confirmed/partially_sourced/pending; this document determines whether the claim is even permitted to exist and how strongly it may be worded once sourced.
- `EDITORIAL_GUIDELINES.md` translates this document's wording rules and the confidence level from `RESEARCH_STANDARD.md` into actual prose.
- `KNOWLEDGE_OBJECTS.md` fields carry a `VerificationStatus`; this document is *why* that field exists.
- `SCHEMA_GUIDELINES.md` may never emit a schema node this document forbids (e.g. `AggregateRating`) regardless of whether it would be technically valid schema.
- `VALIDATION_RULES.md` implements banned-phrase detection and claim-frequency counting as automated checks sourced directly from §5 and §6 of this document — if this document changes, that document's rule set must change with it in the same amendment.

## 9. Future scalability concerns

- **Surface area.** 195 countries × multiple Category C claims each is a large surface for banned-phrase drift to creep in unnoticed without automated detection — this is why §5's rules must be machine-checkable, not just written guidance.
- **Cap tuning.** The frequency caps in §6 were tuned on one page's length. They need revisiting against a real Tier 2/3 example before being treated as final.
- **Category-boundary edge cases.** Some future facts won't cleanly fit A/B/C (e.g., a requirement that depends on *both* the visitor's home country and the destination — is that B or C?). The system should expect to need a documented ruling per edge case rather than forcing every future fact into the current three buckets by strain.
- **Amendment bottleneck.** As the single supreme-authority document, every other document's changes eventually route through here for anything claim-adjacent. The amendment process in §7 needs to stay lightweight enough not to become the project's bottleneck, while still being real enough that it isn't skipped under time pressure.

## 10. Self-critique

This document is the first time the Business Truth Layer has existed as a real file — before this, it lived in conversation history and scattered code comments (`globalConstants.ts`'s header, for instance). That's the biggest weakness being fixed here: a future contributor with no access to prior conversation history previously had no durable way to learn these rules at all. The remaining weakness is that the A/B/C system and the frequency caps were both derived inductively from building one country, not designed deductively in advance — they're good rules, but they should be treated as v1.2's best current understanding, not as settled law immune to revision once real Tier 2/3 country data exists to test them against.
