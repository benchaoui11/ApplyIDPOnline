# Apply IDP Online — Country Platform Master Specification

Status: **DRAFT — awaiting approval. No implementation has started against this spec.**
Scope: governs every future country page. Thailand is the first implementation, not a special case.
This document supersedes ad hoc decisions made during the Thailand prototype where the two conflict — see "Migration notes" at the end for what already complies and what doesn't yet.

---

## 0. Read this first — where I'm pushing back

You asked me to challenge the architecture before writing anything. Here's where I think the brief as written would create problems at 20+ countries, and what I'd do instead. Everything below the line in sections 1–11 already reflects these changes — this section just makes the reasoning explicit so it can be argued with.

### 0.1 "No decision may improve one pillar while damaging another" isn't enforceable as stated

Real tradeoffs exist. A full citation apparatus on every claim helps EEAT/GEO and hurts skimmability/conversion. A five-tab practical guide helps SEO topical coverage and adds mobile interaction cost. Pretending conflicts never happen doesn't prevent them — it just means they get resolved silently and inconsistently, which is worse than resolving them by rule.

**Proposal:** an explicit priority order for when pillars genuinely conflict:

1. **Business Truth** (factual/legal accuracy) — never negotiable, overrides everything else
2. **Engineering integrity** (no broken schema, no broken links, accessibility floor) — a broken page can't be optimized
3. **Editorial Trust** (sourcing, transparency, confidence signaling) — retrieval and conversion are worthless if the thing retrieved/converted-on isn't trustworthy
4. **SEO / GEO** (retrievability, rankability)
5. **Conversion** (CTA placement, friction reduction)

This isn't "conversion doesn't matter" — it's "when a conversion idea would require fudging a source or skipping a disclosure, it loses." That's the actual rule your existing Business Truth Layer has been enforcing all session; I'm just making it explicit and general instead of case-by-case.

### 0.2 Phase B's ~30-module list will not scale as flat fields on `CountryRecord`

If Driving Side, Fuel, Parking, Road Signs, Tolls, Traffic Cameras, Road Quality, Mountain Roads, Seasonal Risks, Common Mistakes, etc. each become their own optional field on the core type, `CountryRecord` grows into a 100+ field type that's mostly `undefined` for most countries, and every new module requires touching the shared type file. That's the same "hardcode everything into one growing shape" failure mode as the current 5-tab `GuideTab` set, just at 6x the size.

**Proposal:** collapse the ~30 named modules into a small number of **reusable content archetypes**, and make the module *list* extensible data, not extensible type surface:

- `NarrativeModule` — the shape `GuideTab` already has (directAnswer + points + solutionNote + optional CTA). Covers: Driving, Road Rules, Rental, Police, Motorcycles/Scooters, Border Crossing, Mountain Roads, Driving Culture, Common Mistakes, Travel Tips.
- `FactModule` — a single verified value + status, the shape `drivingSide`/`minimumDrivingAge` already have. Covers: Speed Units, Fuel norms, Age Rules, Road Quality rating, Traffic Camera prevalence.
- `ListModule` — an array of `{name, note, status}`, the shape `popularDrivingAreas` already has. Covers: Popular Cities, Popular Routes, Seasonal Risks, Tolls, Airport Rental notes.

A country record then has a small **core** (identity, legal status, driving side — always required) plus a `modules: Partial<Record<ModuleKey, NarrativeModule | FactModule | ListModule>>` map. Adding "Tolls" to the platform means adding one key to a registry enum and writing the content — not touching `CountryRecord`, not touching every component that destructures it. See §2.

### 0.3 Phase F's entity graph is a content outline, not an entity graph

The chain you specified (Country → Cities → Driving → Rental → Police → Road Rules → Motorcycles → Insurance → Original Licence → IDP → Apply IDP Online → Related Countries → Future Articles) reads as the page's visual section order. That's a valid content outline, but it's not what "Driving is a child of Cities" or "Insurance comes after Motorcycles" would mean as *entity relationships* — those modules aren't sequential or hierarchical to each other; they're all independent facets of one `Country` + one `Service`.

**Proposal:** a hub-and-spoke graph, not a chain — see §6. `Country` and `Service` are the two hub nodes; Driving/Rental/Police/Road Rules/Motorcycles/Insurance/Original Licence are all direct facets of `Country`, not of each other. `InternationalDrivingPermit` becomes one shared entity referenced by `@id` from every country page, not redefined per page.

### 0.4 The ~30-module Phase B scope has a real sourcing-capacity implication you should decide on now, not discover at country 5

Every Category-C fact on Thailand required an independent primary-source verification pass (GOV.UK), and that was genuinely slow even for one country's ~15 sourced facts. Thirty modules × real verification × 195 countries is not an architecture problem, it's a staffing/time problem the architecture can't solve by itself. The tier system (already built) is the mechanism that makes this survivable — Tier 3 countries are supposed to ship thin, not full-depth — but that only works if tier assignment is treated as a real constraint on scope, not an afterthought. I've made this an explicit open question in §12 rather than silently assuming it'll work out.

### 0.5 Everything else in your brief I'm keeping as specified

The five pillars, the validation-gate concept, the CLI shape, the schema-graph instinct, the tier-aware freeze pipeline, and the "atomic, quotable, independently retrievable" GEO philosophy are all sound and are carried through below largely as proposed — I'm not rewriting things that don't need it.

---

## 1. The five pillars and their conflict-resolution order

| Priority | Pillar | What it protects |
|---|---|---|
| 1 | Business Truth | No claim ships without the confidence level it deserves; no invented facts, ratings, or authority |
| 2 | Engineering Integrity | No broken schema, no broken links, no accessibility regressions, no layout breakage at any item count |
| 3 | Editorial Trust (EEAT) | Sourcing is real and visible; confidence is legible, not just internally tracked |
| 4 | SEO / GEO | The page ranks and is retrievable/citable by AI systems |
| 5 | Conversion | CTAs are well-placed and frictionless |

A change that improves a lower-priority pillar at the cost of a higher one is rejected by default. A change that improves a higher-priority pillar at cost to a lower one is accepted by default, but the cost should be minimized, not ignored.

---

## 2. Phase A — Country Identity System

Replace "flag colors" as a standalone concept with a single `CountryIdentity` object the Hero (and any future component) consumes as one unit, instead of reaching for individual fields.

```ts
type CountryIdentity = {
  isoCode: string;
  flagColors: string[];          // already built (lib/countryData/flagColors.ts) — becomes one input, not the whole system
  accentColor?: string;          // optional single accent for badges/highlights, falls back to brand blue
  badge?: { icon: IconKey; label: string }; // e.g. "Left-hand traffic" — optional, data-driven, never invented per-country copy
  theme?: "temperate" | "tropical" | "desert" | "island" | "urban"; // optional, drives future illustration/imagery selection — NOT drivable from freeform text
  heroImageRef?: string;         // optional future photography reference — omitted, not faked, until real licensed imagery exists
  mapRef?: string;               // optional future simplified-map asset reference
};
```

**Rules:**
- Every field except `isoCode` and `flagColors` is optional and additive — a country with only flag colors still renders correctly (current behavior).
- No field here may be inferred/generated at render time from unverified assumptions (e.g., no auto-guessing `theme` from region). Unset fields render nothing, matching the existing "omit, don't invent" discipline from the data model.
- `CountryHero` (and any future component needing identity) takes `country.identity`, not `country.isoCode` directly — this is what "the Hero should consume the Country Identity System, not individual colors" means concretely.
- `flagStripeGradient()` already built stays as the renderer for `identity.flagColors`; it doesn't change.

**What Phase 1 already satisfies:** `flagColors.ts` is exactly the `flagColors` slice of this. **What's still open:** wrapping it in the `identity` object and updating `CountryHero`'s prop access — small, mechanical, deferred to implementation.

---

## 3. Phase B — Master Country Database

### 3.1 Core record (always present, strongly typed)

Stays close to what already exists — identity, legal status, driving side, FAQ, sourcing metadata, SEO metadata, tier. This is the part every country must fully populate regardless of tier.

### 3.2 Module system (extensible, tier-gated)

```ts
type ModuleKey =
  | "driving" | "roadRules" | "rental" | "police" | "motorcycles" | "borderCrossing"
  | "mountainRoads" | "drivingCulture" | "commonMistakes" | "travelTips"   // NarrativeModule
  | "speedUnits" | "fuel" | "ageRules" | "roadQuality" | "trafficCameras" // FactModule
  | "popularCities" | "popularRoutes" | "seasonalRisks" | "tolls" | "airportRental"; // ListModule

type ModuleContent = NarrativeModule | FactModule | ListModule;

type CountryRecord = {
  // ...core fields (identity, legal status, drivingSide, faq, sourcing, seo, tier)...
  modules: Partial<Record<ModuleKey, ModuleContent>>;
};
```

`MODULE_REGISTRY` (new file, `lib/countryData/modules/registry.ts`) declares, per `ModuleKey`: which archetype it uses, which component renders it, and — critically — which tiers require it vs. allow it optional. This is the single place "add a new module to the platform" happens; it never requires touching `CountryRecord`'s core shape again.

**Why this resolves §0.2:** 30 modules become 3 rendering components (`NarrativeModuleTab`, `FactCard`, `ListGrid` — generalizations of the existing `PracticalGuide` tab, `GlancePanel` card, and `GlancePanel` area-grid respectively) instead of 30 bespoke ones, and adding module #31 is a registry entry plus content, not a schema migration.

### 3.3 Migration path from the current shape

`drivingGuide`, `roadRulesGuide`, `rentalGuide`, `scooterGuide`, `policeGuide`, `borderCrossingGuide` (just added in Phase 1) become `modules.driving`, `modules.roadRules`, etc. This is a real refactor with real risk (touches `PracticalGuide.tsx`, `thailand.ts`, `types.ts`) — it should happen once, deliberately, as its own implementation step, not be smuggled into a later phase as a side effect.

---

## 4. Phase C — Master Validation Engine

### 4.1 Rule set (fails the build/publish step, not just warns)

| Check | Rule |
|---|---|
| Business Truth | No banned phrase patterns (submission-duration claims, printed-timing outside checkout, "guaranteed", government-affiliation language) |
| Required fields | `primaryKeyword`, `metaTitle`, `metaDescription`, `lastVerifiedDate`, `sourceCitations` (≥1), `faq` (≥ tier minimum) all present |
| Tier conformance | Module count and FAQ count meet `TIER_DEFINITIONS` minimums (already built, `lib/countryData/tiers.ts`) |
| Citation integrity | Every field with `status: "confirmed"` has at least one corresponding entry in `sourceCitations` |
| Metadata length | `metaTitle` ≤ 60 chars, `metaDescription` ≤ 155 chars |
| Slug integrity | `slug` matches `^[a-z0-9-]+$`, matches the registry key, matches a `lib/destinations.ts` entry (the two-source consistency gap flagged in Phase 1) |
| Relationship integrity | Every `relatedCountrySlugs` entry resolves to a real `DESTINATIONS` slug (would have caught the Phase 1 bug automatically, going forward) |
| Schema completeness | Required JSON-LD nodes present and non-empty for the record's tier |
| Duplicate content | No two modules' `directAnswer`/first point share >N% n-gram overlap (catches the Driving/Road Rules "drives on the left" duplication found in the audit) |

### 4.2 CLI shape

```
npm run validate-country thailand
npm run validate-country --all
```

Output: pass/fail per rule, grouped by category (Engineering / SEO / GEO / Schema / Metadata / Business Truth / Accessibility-adjacent-data / Internal Linking / Content Completeness), non-zero exit code on any failure. Accessibility and performance in the strict sense (contrast, keyboard nav, CWV) stay as manual/browser-based QA — the CLI validates the *data*, not the rendered DOM; a separate rendered-page audit (existing manual process) remains the accessibility/performance gate.

### 4.3 Where it lives

`scripts/validate-country.ts` + `lib/countryData/validation/rules.ts`. Not built in this phase — this is the spec for it.

---

## 5. Phase D — SEO Framework

Keep the existing per-record fields (`primaryKeyword`, `secondaryKeywords`, `metaTitle`, `metaDescription`) and add **structure, not new content**:

```ts
type KeywordEntry = {
  term: string;
  intent: "informational" | "commercial" | "transactional";
  cluster: "destination" | "rental" | "motorcycle" | "comparison" | "city";
  volume?: { value: number; source: "semrush"; asOf: string }; // never invented — omitted if not researched
};
seoProfile: {
  primaryKeyword: KeywordEntry;
  secondaryKeywords: KeywordEntry[];
  paaQuestions: string[]; // sourced from Semrush phrase_questions, not invented
};
```

This replaces flat `secondaryKeywords: string[]` with intent/cluster-tagged entries — same discipline already applied to facts (no invented volume) now applied to keyword data. Same sourcing rule as everything else in this platform: absent data is omitted, never fabricated.

---

## 6. Phase E — Generative Engine Optimization

### 6.1 Composable primitives, not bespoke block types

Rather than building ten named block components (Answer Block, Decision Block, Comparison Block, Travel Reality Block, Rental Reality Block, Motorcycle Reality Block, Police Reality Block, Misconception Block, Quick Answer, Fact Table), define **four primitives** and compose the named concepts from them:

- `DirectAnswerBlock` — one-sentence, quotable, already exists (`directAnswer` field / `DirectAnswerBox`)
- `FactTable` — key/value pairs with per-row confidence, generalizes `GlancePanel`'s cards
- `MisconceptionBlock` — `{ misconception: string; correction: string; sourceRef?: string }` — new, small, reusable
- `TipList` — ordered/unordered verified points, already exists (`points` in `GuideTab`/`NarrativeModule`)

"Rental Reality Block" = `DirectAnswerBlock` + `FactTable` + `TipList` inside the rental module. "Common Mistakes" = `MisconceptionBlock[]`. No new component family needed per named concept.

### 6.2 Confidence must become visible, not just internal

This is a direct fix for the audit finding that `verificationStatus` exists in data but never reaches the page. Every `FactTable` row and `TipList` item that carries `status: "partially_sourced"` gets a subtle, consistent visual treatment (not a scary warning — a muted-but-present marker, e.g. a small "commonly reported" tag vs. no tag for confirmed facts). This is the single highest-leverage GEO change available: it lets an AI system (and a human) distinguish confidence per-claim instead of treating the whole page as uniformly authoritative.

### 6.3 Every module must satisfy "independently retrievable, independently quotable, understandable without the rest of the page" — this is a content-authoring rule enforced by editorial review (§9), not something code can check.

---

## 7. Phase F — Entity Graph (corrected)

```
                         ┌────────────┐
                         │  Country   │◄──────────────┐
                         └─────┬──────┘                │
              ┌────────────────┼─────────────────┐     │ relatedTo
              │                │                 │     │
        ┌─────▼─────┐   ┌──────▼──────┐   ┌──────▼───┐ │
        │  Service   │   │  Modules*   │   │  Cities  │ │
        │ (Apply IDP │   │ (Driving,   │   │ (future) │ │
        │  Online)   │   │  Rental,    │   └──────────┘ │
        └─────┬──────┘   │  Police,    │                │
              │          │  RoadRules, │        ┌───────┴───────┐
              │          │  Motorcycle,│        │ Related Country│
              │          │  Insurance, │        └────────────────┘
              │          │  Border...) │
              │          └─────────────┘
        ┌─────▼─────────────────────┐
        │ InternationalDrivingPermit │  ← ONE shared entity, referenced
        │  (generic, not per-country) │    by @id from every country page
        └─────┬───────────────────────┘
              │ requires
        ┌─────▼──────────────────┐
        │ OriginalLicenceRequirement │ ← generic entity, per-country facts attach as properties
        └─────────────────────────┘
```

`Country` and `Service` are the two hubs. Modules are facets of `Country`, not of each other — there is no "Insurance is downstream of Motorcycles" relationship in reality, so the graph doesn't claim one. `InternationalDrivingPermit` is defined once, globally, and every country page's `Service` references it by `@id` rather than each page implicitly redefining what an IDP is.

---

## 8. Phase G — Schema Graph

### 8.1 Canonical `@id` scheme (fixes the audit's disconnected-entity finding)

```
https://applyidponline.com/#organization
https://applyidponline.com/#website
https://applyidponline.com/#idp-entity                        (shared DefinedTerm/Thing, defined once)
https://applyidponline.com/countries/{slug}#webpage
https://applyidponline.com/countries/{slug}#country
https://applyidponline.com/countries/{slug}#service
```

Every page's `Service.provider` references `#organization` by `@id`, not an inline duplicate object. Every page's IDP-related claims reference `#idp-entity` by `@id`. This is what makes the graph an actual graph across 195 pages instead of 195 disconnected islands.

### 8.2 `ItemList` entries use real names + `url`, not raw slugs (fixes the audit's Issue 11 directly).

### 8.3 Schema nodes present per record are gated by tier + actual populated modules — a Tier 3 page with no rental module doesn't emit a rental-related schema node. Schema must reflect only what's actually on the page, per your own instruction — this is the enforcement mechanism for that rule.

---

## 9. Phase H — Internal Linking Engine

A small typed link registry rather than ad hoc `<Link>`s scattered per component:

```ts
type LinkIntent = "hub" | "requirements" | "pricing" | "apply" | "howItWorks"
  | "digitalGuide" | "printedGuide" | "rentalGuide" | "motorcycleGuide"
  | "comparison" | "city" | "originLicenceGuide" | "relatedCountry" | "article";

type InternalLink = { intent: LinkIntent; href: string; label: string };
```

Components request links by intent (`getLink("pricing", country)`), and a single resolver decides the actual href/label — this is what prevents the current pattern where the same conceptual link ("go check pricing") could drift into slightly different hrefs/labels across components over time. Not built now; specified so Phase H has a concrete target when it's implemented.

---

## 10. Phase I — Editorial Governance

**Concrete gap found while writing this spec:** the "Business Truth Layer" that has governed every decision this entire project has lived only in conversation history and code comments (`globalConstants.ts`'s header comment, for example) — there is no `docs/BUSINESS_TRUTH_LAYER.md` file. That's a real risk: a future session (or a future person) without this conversation's context has no durable, single place to read the ratified rules from.

**Recommendation:** formalize it as a versioned file (`docs/BUSINESS_TRUTH_LAYER.md`, already informally "v1.2" per code comments) containing every ratified rule from this project to date — the ~8-minute claim wording and its 2-instance cap, the "legally required" 3-instance cap, the A/B/C claim-source distinction, the printed-timing prohibition outside checkout, etc. The validation engine (§4) reads its banned-phrase/claim-cap rules from this file, so the rules and the document can't drift apart.

Per-claim governance fields (source, confidence, scope, review date, reviewer) are already mostly modeled (`VerificationStatus`, `sourceCitations`, `lastVerifiedDate`) — the one addition worth making is a `reviewer` field once there's a real named editorial process to attach it to (not before — an empty/placeholder reviewer field would be worse than no field, per the "don't invent" discipline).

---

## 11. Phase J — Conversion System

CTA taxonomy by purpose (not by page position), so every CTA has a stated job:

```ts
type CtaPurpose = "hero" | "context" | "guide" | "decision" | "final";
```

`hero` = immediate primary action. `context` = mid-scroll reinforcement (e.g., inside a module's `ctaHint`, already exists). `guide` = a specific module's own conversion point (rental tab's "check eligibility"). `decision` = format-choice buttons (already exists in `FormatNote`). `final` = closing-section CTA. Each purpose has one canonical copy pattern, preventing the current mild inconsistency where 3 of 5 guide tabs have no `ctaHint` (flagged in the audit) without mandating every tab must have one — the taxonomy makes it a deliberate per-module choice instead of an accident.

---

## 12. Phase K — Freeze Pipeline

Clarifying which steps are **tool-gated** (the CLI validator, §4) vs **human-gated** (everything requiring judgment):

| Step | Gate type |
|---|---|
| Research, Semrush, SERP/competitor analysis, government/rental sourcing | Human |
| Architecture, Implementation | Human (assisted) |
| Validation (`npm run validate-country`) | **Tool** |
| SEO/GEO/Schema audit | Human, informed by validator output |
| Accessibility/Mobile/Visual QA | Human (browser-based, as done for Thailand) |
| Approval | Human (you) |
| Freeze | Human (you) — registry entry becomes immutable by convention, not by code lock |

The validator is necessary but not sufficient — it catches structural and Business-Truth-pattern violations, not judgment calls like "does this read as premium" or "would Stripe ship this."

---

## 13. Concrete open questions for you to decide before implementation

1. **Sourcing capacity (§0.4):** given how labor-intensive real primary-source verification was for Thailand's ~15 Category-C facts, what's the realistic module depth per tier? I'd suggest Tier 1 gets the full module set, Tier 3 gets core + driving + rental only — but that's a product/resourcing call, not an engineering one.
2. **Module refactor timing (§3.3):** the `GuideTab` → `modules` map migration touches `PracticalGuide.tsx`, `types.ts`, and `thailand.ts` simultaneously. Do this as its own dedicated implementation step before adding new modules, or fold it into the first new-module addition?
3. **Identity system scope (§2):** build the full `CountryIdentity` shape now (with unused-but-typed fields for future imagery/theme/badge), or add fields only when a real consumer exists for them? I lean toward typing them now (cheap) but leaving them unpopulated until real assets exist (per the "don't invent" rule) — confirm that's the right call.
4. **Validator strictness at launch:** should `validate-country` hard-fail the freeze pipeline from day one, or run in warn-only mode until Thailand itself passes cleanly against the new rules (some of which — like citation-per-confirmed-claim — Thailand may not currently satisfy 100%)?

---

## 14. Migration notes — what Phase 1 already satisfies vs. what this spec changes

**Already compliant, no rework needed:** `TIER_DEFINITIONS` (§4.1's tier-conformance rule reads directly from it), `flagColors.ts` (becomes the `flagColors` field inside `CountryIdentity`, §2), slug-based `RelatedCountries` matching (§4.1's relationship-integrity rule formalizes this going forward), dynamic auto-fit grids (no schema implication, stays as-is), `borderCrossingGuide` wiring (becomes `modules.borderCrossing` under §3.2, but the *behavior* — tab appears only when relevant — carries over unchanged).

**Requires rework under this spec, not yet done:** the five `xGuide` fields on `CountryRecord` collapsing into `modules` (§3.2–3.3); `CountryHero` moving from `country.isoCode` to `country.identity` (§2); JSON-LD `@id` scheme (§8.1) and `ItemList` name/url fix (§8.2) — both still exactly as flagged in the earlier audit, unresolved.

---

**Nothing in this document has been implemented. Waiting for your review — tell me which of §13's open questions you want to resolve, and whether the pushback in §0 is accepted or you want the architecture as originally specified.**
