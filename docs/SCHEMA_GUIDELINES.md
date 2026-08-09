# Schema Guidelines

Version: 1.1
Authority level: implements `KNOWLEDGE_OBJECTS.md` as machine-readable data. Absolutely bounded by `BUSINESS_TRUTH_LAYER.md` — schema is a serialization of already-permitted, already-visible content, never an independent source of claims.

**Changelog:** v1.1 adds a cross-reference to `KNOWLEDGE_OBJECTS.md` v1.1's new Entity Registry (§4a below). The canonical `@id` values in §2 do not change — this document remains the sole authority on what those values are; the Entity Registry only stores them for future schema-generation code to read, per the Registry Ownership Matrix in `KNOWLEDGE_OBJECTS.md` §9. No schema output changes as a result of this revision.

## 1. Purpose

Defines the platform's JSON-LD structured-data rules, so 195 country pages form one connected knowledge graph rather than 195 disconnected islands each redefining "who Apply IDP Online is" and "what an International Driving Permit is" from scratch.

## 2. Canonical `@id` scheme

```
https://applyidponline.com/#organization
https://applyidponline.com/#website
https://applyidponline.com/#idp-entity              (shared, defined once)
https://applyidponline.com/countries/{slug}#webpage
https://applyidponline.com/countries/{slug}#country
https://applyidponline.com/countries/{slug}#service
```

Every page's `Service.provider` references `#organization` by `@id` — never an inline duplicate `{"@type": "Organization", ...}` object per page. Every page's IDP-related claims reference `#idp-entity` by `@id` — the concept of "an International Driving Permit" is defined once, globally, not redefined with slightly different wording on every country page. This is the direct fix for a gap found in the platform's first audit: the original Thailand implementation's `Organization` node was a bare inline object with no cross-page reference at all.

## 3. Schema reflects only visible, verified content — enumerated

This principle from the master specification is not just a sentiment; it rules out specific things:

- No `AggregateRating` or `Review` node while no real reviews exist (per `BUSINESS_TRUTH_LAYER.md` §5.6).
- No `FAQPage` entry whose schema text differs from the visible, rendered FAQ text — schema is a mirror, never an independent statement.
- No `HowTo` step not sourced from the single canonical process-steps object (`GLOBAL_CONSTANTS.applicationProcessSteps`) — and no more than one `HowTo` node per page, ever, even if a future page has multiple process-like sections.
- No schema node for a module that isn't actually present on the page. A Tier 3 country with no rental module emits no rental-related schema either — schema presence is gated by the same tier/module-registry logic that gates visible content (`KNOWLEDGE_OBJECTS.md` §4), not decided independently.

## 4. Entity identity, not string matching

`Country`/`Place` entities carry the ISO code as an explicit machine-readable identifier alongside the display name, so entity disambiguation across pages never relies on matching strings like `"United States"` against a slug like `"united-states"`. This is the schema-layer application of the same lesson the platform's slug-matching bug (fixed in `RelatedCountries`) already taught at the component layer — same failure mode, same fix, applied to a different part of the system so it doesn't recur there too.

### 4a. Relationship to the Entity Registry (`KNOWLEDGE_OBJECTS.md` §8)

"Entity" has been used informally in this document since v1.0 to mean, roughly, a schema.org `@type` node with a stable identity. `KNOWLEDGE_OBJECTS.md` v1.1 gives that concept a formal, typed home — a hub-and-spoke `Entity` record per concept (`Country`, `Service`, `InternationalDrivingPermit`, and the country-facet entities alongside them), each carrying the exact `@id` value this section defines. This document remains the **owner** of what those `@id` values are (§2); the Entity Registry is a **consumer** that stores them for future code (a schema-generation pass, not built this phase) to read without re-deriving the scheme by hand each time. Nothing in this section's meaning changes — it's now backed by a typed record instead of only living in this prose.

## 5. `ItemList` requirements

Every `ItemList` entry (e.g. related countries) carries a real display `name` and a resolvable `url` — never a raw slug standing in for a name, and never an entry with neither a `url` nor a full `item` reference.

## 6. Ownership: where Organization/WebSite schema is defined

`#organization` and `#website` are defined exactly once, in a single shared location (a layout-level component or shared schema utility), and every page — country pages included — references them by `@id`. This must be a shared utility every page calls, not something each new country-page implementation re-types by hand; hand-retyping is exactly how the original disconnected-entity gap happened in the first place.

## 7. Validation requirements

Every generated schema graph must:
1. Pass a structured-data syntax validator (e.g. Google's Rich Results Test / schema.org validator) — catches malformed JSON-LD and incorrect types.
2. Pass a **content-parity check** — the text inside `FAQPage`/`HowTo` schema nodes must match the corresponding rendered page text exactly, not just exist. A syntactically perfect `FAQPage` entity that quietly drifts from the visible FAQ (because one was edited and the other wasn't) is a real, silent failure mode that syntax validation alone never catches.

## 8. Rich-result eligibility honesty

`FAQPage` and `HowTo` rich-result eligibility on Google was narrowed in August 2023 to a small set of authoritative sites — this platform's pages are very unlikely to qualify for the classic rich-result treatment from these node types. They remain included anyway, because they are exactly the structured format AI systems parse for citation and extraction (`GEO_GUIDELINES.md` §8) — but this must never be oversold internally or externally as a guaranteed rich-result mechanism.

## 9. Interaction with other documents

- Implements `SEO_GUIDELINES.md`'s heading/entity structure as structured data.
- Implements `GEO_GUIDELINES.md`'s `DirectAnswerBlock`/`TipList`/`FactTable` content as the machine-readable half of the same information (`FAQPage`, `HowTo`).
- Reads directly from `KNOWLEDGE_OBJECTS.md` — schema is never hand-authored separately from the Knowledge Object it describes. As of `KNOWLEDGE_OBJECTS.md` v1.1, that means reading from the Entity Registry for `@id` values and from Claims/Knowledge Objects for content, once a schema-generation phase actually does so — not yet built (§8 of `PHASE_3_DESIGN.md`'s stop-condition review confirms this document's `@id` values are unaffected in the meantime).
- Bounded absolutely by `BUSINESS_TRUTH_LAYER.md` (§3's enumerated exclusions).
- Checked by `VALIDATION_RULES.md`, which must include both the syntax check and the content-parity check from §7 — a rule this document requires but delegates enforcement of.

## 10. Future scalability concerns

- The shared `@id` scheme only prevents the disconnected-entity problem if it is actually used correctly on every future page — this is an implementation-discipline risk more than a design risk. A single shared schema-assembly utility (not a pattern each implementer repeats by hand) is the only durable way to guarantee this at 195 pages; the design in §6 anticipates that need but doesn't build it.
- As City and Article entities are added in future phases (per the platform's entity graph), the `@id` scheme in §2 will need extending with `.../countries/{slug}/cities/{citySlug}#place`-style patterns — worth planning the URL/@id convention for those now, even though they aren't built yet, so it isn't improvised inconsistently later.

## 11. Self-critique

Requiring a structured-data validator alone (§7.1) would have been an incomplete rule — it verifies the schema is well-formed, not that it's still *true* relative to the visible page. The realistic failure mode at scale isn't malformed JSON-LD, it's a human editing visible FAQ copy and forgetting the parallel schema block, or vice versa — a page that looks fine to both a human reader and a syntax validator while quietly lying to any system that trusts the structured data specifically. §7.2's content-parity check is the direct fix, and it's the more important of the two checks despite syntax validation being the more obvious one to think of first.
