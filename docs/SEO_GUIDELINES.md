# SEO Guidelines

Version: 1.0
Authority level: subordinate to `BUSINESS_TRUTH_LAYER.md` (no keyword goal ever overrides a wording rule) and reads from `KNOWLEDGE_OBJECTS.md`. Sibling to `GEO_GUIDELINES.md` — same content, ranking lens rather than AI-retrieval lens.

## 1. Purpose

Defines how a country page is structured, tagged, and linked so it can be found by search engines and doesn't compete against the platform's own other pages. This is search-intent architecture, not keyword stuffing — every rule below exists to serve a real query a real visitor types, not to hit a density target.

## 2. Keyword structure

Flat `secondaryKeywords: string[]` is replaced with intent- and cluster-tagged entries:
```
{ term, intent: "informational" | "commercial" | "transactional", cluster: "destination" | "rental" | "motorcycle" | "comparison" | "city", volume?: { value, source: "semrush", asOf } }
```
`volume` is present only when a real keyword-research query returned it (`RESEARCH_STANDARD.md` §6) — absent otherwise, never estimated.

## 3. Title and meta rules

- `metaTitle` target ≤ 60 characters (display-truncation safe). Longer titles are flagged, not silently allowed, especially for long country names ("United Arab Emirates," "Bosnia and Herzegovina").
- `metaDescription` ≤ 155 characters.
- Canonical is always self-referencing (`/countries/{slug}`) — no parameter variants to canonicalize away, since this route has none.
- `primaryKeyword` must be unique across the entire registry — two country pages competing for the same primary keyword is a validation failure, not a style choice.

## 4. Heading structure

Exactly one H1 per page, containing "International Driving Permit for {Country}" in unambiguous form. H2s map one-to-one to major page sections. No skipped heading levels (an H2 is never followed directly by an H4).

## 5. Internal linking density

Every page should carry a floor of contextual internal links satisfying a real intent (not nav/footer links, not decorative). Six is the current working floor, chosen because it's what Thailand's page already does organically: breadcrumb, hero CTA, eligibility CTA, guide-module CTAs, format-decision CTAs, related-countries block, sources block. This is a floor to validate against, not a target to write toward — padding a page with links to hit a quota is exactly the kind of hollow optimization this document exists to prevent.

## 6. Cannibalization rules

- City-level search intent (e.g. "international driving permit phuket") stays as a secondary keyword under the country page, not spun into its own page, unless a deliberate future decision promotes a city to its own page with an explicit canonical/hierarchy relationship to the country page.
- A global keyword registry (checked by `VALIDATION_RULES.md`) tracks every published page's `primaryKeyword` and flags any collision before publish — per-page checks alone don't catch cross-page cannibalization.

## 7. Duplicate-content discipline at scale

Shared boilerplate — trust cards, process steps, disclosure copy — is expected and correct (it's the same product and the same facts on every page). What must never be templated is per-country prose: guide-module content and FAQ answers must be genuinely written for that country's actual facts, not a country-name find/replace over Thailand's sentences. This specific rule is not mechanically checkable at scale; it is enforced by editorial review (`EDITORIAL_GUIDELINES.md`) and by requiring real `RESEARCH_STANDARD.md` sourcing per country, which naturally forces genuine per-country content since invented-generic content has no citation to attach to.

## 8. Image ALT text

Descriptive, includes the country name only where genuinely relevant to what's depicted, never keyword-stuffed with unrelated search terms.

## 9. Interaction with other documents

- Reads `KNOWLEDGE_OBJECTS.md`'s `seoProfile` field structure directly.
- Never overrides `BUSINESS_TRUTH_LAYER.md` — a keyword opportunity that would require an unsupported claim is not pursued.
- Shares its underlying prose with `GEO_GUIDELINES.md`; the two documents describe different optimization goals for the same sentences, not different sentences.
- `SCHEMA_GUIDELINES.md` implements much of this document's structure (headings, entities) as machine-readable data.
- `VALIDATION_RULES.md` mechanically checks title/meta length, heading structure, and keyword-uniqueness across the registry.

## 10. Future scalability concerns

- **Cannibalization risk grows combinatorially**, not linearly, as the registry grows — 195 countries × ~12 secondary keywords each means the global keyword registry check (§6) becomes more valuable, and more necessary, the larger the platform gets. It should not be deferred as "we'll add it later" once past a handful of countries.
- **Internal-link floor calibration.** Six links was derived from one page. It should be revisited once pages of meaningfully different tiers/lengths exist, since a Tier 3 page may not organically reach six meaningful links without padding — better to lower the floor for that tier than to force hollow links to hit it.

## 11. Self-critique

The internal-link floor in §5 is the weakest-specified rule in this document — "six" is defensible as an observed baseline but was not derived from any external benchmark or user-behavior data, just from counting what one already-built page happened to do. It's presented honestly as a floor to validate, with an explicit warning against gaming it, specifically because I don't want to state a number with more confidence than it deserves. It should be treated as provisional until it's been checked against real Tier 2/3 pages.
