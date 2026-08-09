# Master Country Template

Version: 1.0 — **design specification, not yet implemented**
Status: no code was written against this document. Every previous phase that reached this scale (`PHASE_3_DESIGN.md`, `COUNTRY_PLATFORM_MASTER_SPEC.md`) was reviewed as a document before a single line of implementation followed — this document is held to the same bar, because a page-generation blueprint every future country inherits is exactly the kind of decision that's expensive to get wrong after 50 countries are built against it. Type contracts below are illustrative TypeScript, written to be precise, not copy-pasted into the repo.

---

## 0. Design philosophy and one thing I pushed back on

**"Describes WHAT, not HOW."** This document defines page *contents* — which sections exist, what data each needs, what makes a section complete — never colors, spacing, or JSX. Rendering stays exactly where Phase 3 left it: the Render Adapter (`lib/knowledge/render/adapter.ts`) and every existing component are untouched by this document and will remain untouched by implementing it.

**Where this document introduces a new concept — the Block — I want to be honest about the cost, not just the benefit.** A **Block** is a page-section-level contract; a **Module** (built in Phase 3) is a content-storage-level unit. Adding a fourth layer of indirection (Template → Block → Module → Claim/Evidence/Knowledge Object/Entity) on top of an already six-registry architecture is real complexity, and for some sections a Block will be a near-transparent wrapper around one Module — arguably not earning its keep. I kept the layer anyway, for one concrete reason: **nothing in the current architecture defines "what must exist for a country to be publishable."** `VALIDATION_RULES.md` row 6 (VR-06) checks a crude proxy — module *count* against a tier minimum — but has no way to say "a Requirements section needs a licence claim, an IDP claim, an age fact, and at least an attempt at insurance guidance, specifically, not just five modules of any kind." The Block is where that specific, per-section completeness contract lives. Section 9 names which Blocks are thin wrappers (arguably always will be) versus genuine compositions, so this cost is visible, not hidden.

---

## 1. The five separated concerns

| Concern | Owned by | Already exists? |
|---|---|---|
| **Structure** | This document — which Blocks a page has, in what order, per tier | New |
| **Content** | Knowledge Object / Claim / Evidence / Source Registries (`KNOWLEDGE_OBJECTS.md` v1.1) | Built, Phase 3 |
| **Knowledge** | Knowledge Object Registry — canonical structured facts | Built, Phase 3 |
| **Evidence** | Evidence + Source Registries | Built, Phase 3.5 (enriched) |
| **Rendering** | Render Adapter + existing components | Built, pre-Phase-3, untouched |

This document adds exactly one new layer — **Blocks** — sitting between Structure (this doc) and Content (the registries). It does not touch or redefine the other four.

---

## 2. Architecture diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                    MASTER COUNTRY TEMPLATE                       │
│         (this document — Block catalog + ordering + tier         │
│          applicability; ONE definition, shared by every country) │
└───────────────────────────────┬───────────────────────────────────┘
                                  │ instantiated per country as...
                                  ▼
┌─────────────────────────────────────────────────────────────────┐
│                          BLOCKS  (§4)                             │
│  Hero · QuickAnswer · DecisionBox · Requirements · Driving ·       │
│  Rental · Motorcycles · Police · FAQ · RelatedCountries ·          │
│  References                                                       │
│  each Block = { inputs, outputs, requiredClaims, requiredEvidence,│
│                 requiredEntities, optionalData, validationRules } │
└───────────────────────────────┬───────────────────────────────────┘
                                  │ resolved against, per country...
                                  ▼
┌─────────────────────────────────────────────────────────────────┐
│              KNOWLEDGE / CLAIM / EVIDENCE / SOURCE /               │
│              ENTITY / MODULE / IDENTITY REGISTRIES (Phase 3/3.5)   │
└───────────────────────────────┬───────────────────────────────────┘
                                  │ read by (unchanged)
                                  ▼
┌─────────────────────────────────────────────────────────────────┐
│                        RENDER ADAPTER                             │
│              resolveCountryView() — unchanged, still              │
│              produces today's exact CountryRecord shape           │
└───────────────────────────────┬───────────────────────────────────┘
                                  │
                                  ▼
                    Existing components → Page (unchanged)
```

---

## 3. Dependency graph

```
BUSINESS_TRUTH_LAYER.md ────────────────────────────────────────┐ (still supreme)
        │                                                         │
        ▼                                                         │
RESEARCH_STANDARD.md ──► KNOWLEDGE_OBJECTS.md v1.1 ◄────────────────┘
                                │  (Claim/Evidence/Source/Entity/
                                │   Module/Identity registries)
                                │
                                ▼
                    MASTER COUNTRY TEMPLATE  (this document)
                                │  defines the Block catalog and
                                │  which registry content each
                                │  Block requires to be "complete"
                                │
              ┌─────────────────┼─────────────────┬────────────────┐
              ▼                 ▼                 ▼                ▼
   EDITORIAL_GUIDELINES  SEO_GUIDELINES   GEO_GUIDELINES   SCHEMA_GUIDELINES
   (still governs Block   (extension       (extension       (extension point
    prose, unchanged)      point, §7)       point, §7)       only, §7)
              │                 │                 │                │
              └─────────────────┴─────────────────┴────────────────┘
                                        ▼
                              VALIDATION_RULES.md
                    (existing 26 content rules, unchanged) +
                    Template Conformance rules (§6, NEW, separate
                    catalog — checks page STRUCTURE, not content)
```

**Where this document sits is deliberate:** below the four governing "what may be said/optimized" documents (it doesn't add new claims or override BTL), above the presentation-layer documents (SEO/GEO/Schema treat a Block's resolved content as their input, same as they treat a Module's today). It is a structural document, closer in kind to `KNOWLEDGE_OBJECTS.md` than to `EDITORIAL_GUIDELINES.md`.

---

## 4. Block catalog

Every Block shares this contract shape:

```ts
type BlockDefinition = {
  id: string;                          // "block.hero", "block.requirements", ...
  purpose: string;
  inputs: string[];                    // registry queries this Block reads
  outputs: BlockOutputContract;        // shape handed to the Renderer
  requiredClaimTypes: string[];        // Claim/KnowledgeObject `type`s that MUST resolve for this Block to render
  requiredEvidence: "none" | "any-linked" | "primary-linked-for-confirmed";
  requiredEntities: string[];          // Entity `kind`s this Block references
  optionalData: string[];              // module/claim types that enrich but aren't required
  validationRules: string[];           // -> Template Conformance rule IDs, §6
  tierApplicability: { 1: BlockRequirement; 2: BlockRequirement; 3: BlockRequirement };
  extensionPoints: BlockExtensionPoints; // §7 — typed, unpopulated
};
type BlockRequirement = "required" | "recommended" | "optional";
```

### 4.1 Hero

- **Purpose:** immediate orientation — which country, what this page is, the one primary action.
- **Inputs:** Core Country Record (`name`, `isoCode`, `tier`), Country Identity Registry, `Claim` for `drivingSide`.
- **Outputs:** `{ countryName, isoCode, identity: CountryIdentity, drivingSideClaim, primaryCtaHref }`.
- **Dependencies:** Country Identity Registry (flag/accent), one confirmed `drivingSide` Claim.
- **Required Claim types:** `driving-side`.
- **Required Evidence:** none (identity/orientation content, not a factual claim needing citation).
- **Required Entities:** `Country`.
- **Optional data:** badge, regional grouping (Country Identity §10/Phase 3.5 fields — typed, unpopulated for every country today).
- **Tier applicability:** required at every tier — a page cannot exist without a Hero.
- **Thailand today:** fully materialized (`CountryHero.tsx`), reading through the Render Adapter.

### 4.2 Quick Answer

- **Purpose:** a single, standalone-quotable canonical answer to "do I need an IDP here" — the page's GEO/skim anchor.
- **Inputs:** the `idp-requirement-level` Knowledge Object + its backing Claim.
- **Outputs:** `{ directAnswer: string, confidence: VerificationStatus }`.
- **Dependencies:** exactly one Claim, of type `idp-requirement-level`.
- **Required Claim types:** `idp-requirement-level`.
- **Required Evidence:** `primary-linked-for-confirmed` — this is the single highest-stakes claim on the page; it should never render `confirmed` without a primary source.
- **Required Entities:** `InternationalDrivingPermit` (global), `Country`.
- **Optional data:** none — this Block is deliberately minimal by design (GEO_GUIDELINES.md §2's DirectAnswerBlock).
- **Tier applicability:** required at every tier.
- **Thailand today:** the closest existing equivalent is `drivingGuide.directAnswer` — not currently extracted as its own standalone Block/section. **This is a real structural gap between the template and the current page**, noted honestly rather than papered over: today the "quick answer" is the first sentence of the Driving tab, not a page-level, always-visible element the way this Block specifies. Materializing this Block as its own section is future implementation work, not something this document is claiming already exists.

### 4.3 Decision Box

- **Purpose:** the most product-novel Block in this catalog — a compact "does this apply to me" decision aid: eligibility, exceptions, and the one right next action for the visitor's specific situation.
- **Inputs:** `idp-requirement-level` Claim, `minimum-driving-age` Claim, any Category-B claims describing home-country IDP issuance constraints, visitor's detected/selected origin (already available client-side via `detectVisitorCountry()`, per `EligibilitySection.tsx` — reused, not rebuilt).
- **Outputs:** `{ eligibility: EligibilityOutcome[], exceptions: ExceptionNote[], primaryAction: CtaSpec }`.
- **Dependencies:** Requirements Block (§4.4) must resolve first — Decision Box is a *derived* view over Requirements' claims, not an independent data source.
- **Required Claim types:** `idp-requirement-level` (from Requirements).
- **Required Evidence:** inherits Requirements' evidence requirement — this Block asserts nothing new, it recombines.
- **Required Entities:** `Country`, `Service`.
- **Optional data:** origin-specific routing (already-arranged licence vs. needs-to-apply), residency exceptions (e.g., long-stay visa holders sometimes governed by local-licence rules instead of IDP rules) — **typed as optional because no country record, including Thailand's, currently carries residency-exception data**; omitted rather than guessed, per this whole project's standing sourcing discipline.
- **Tier applicability:** required at Tier 1, recommended at Tier 2, optional at Tier 3 (a thin destination doesn't need a full decision aid).
- **Thailand today:** does not exist as a section. The closest partial equivalent is `EligibilitySection.tsx`'s origin-detection shortcut, which is a *component*, not a data-driven decision structure — it doesn't branch on exceptions or residency status. **Genuinely new — this Block has no current implementation to inherit from,** which is exactly why the user's instruction to design the template independent of Thailand mattered here specifically.

### 4.4 Requirements

- **Purpose:** the composite "what you need" section — licence, IDP, age, insurance, restrictions in one place.
- **Inputs:** `idp-requirement-level`, `minimum-driving-age`, `digital-idp-acceptance`, `vehicle-category-note` Knowledge Objects; a currently-unbuilt `insurance-requirement` and `driving-restriction` Knowledge Object type (see §9).
- **Outputs:** `{ licence: FactOutput, idp: FactOutput, age: FactOutput, insurance: FactOutput | "pending", restrictions: ListOutput }`.
- **Dependencies:** Original Licence Requirement global entity (`OriginalLicenceRequirement`, already in the Entity Registry as of Phase 3.5).
- **Required Claim types:** `idp-requirement-level`, `minimum-driving-age` (hard requirement — a Requirements section without at least these two isn't a Requirements section).
- **Required Evidence:** `any-linked` for `partially_sourced` sub-facts, `primary-linked-for-confirmed` for `confirmed` ones — same discipline VR-07 already enforces at the Claim level, inherited here at the Block level.
- **Required Entities:** `DrivingLicence`, `InternationalDrivingPermit`, `OriginalLicenceRequirement`.
- **Optional data:** insurance guidance, restriction lists — **both typed as optional because neither has a Knowledge Object type yet** (§9 names this explicitly as a gap this template surfaces, not one it closes).
- **Tier applicability:** required at every tier — this is the page's core legal-clarity section.
- **Thailand today:** partially materialized. `idpRequirementLevel`/`minimumDrivingAge`/`digitalIdpAcceptance`/`vehicleCategoryNote` all exist as FactModules; insurance and restrictions do not exist as distinct content anywhere in the current record.

### 4.5 Driving Section

- **Purpose:** practical on-the-road orientation — side of the road, road quality, signage conventions, speed units, tolls, fuel.
- **Inputs:** `driving-side` Knowledge Object (exists); `road-quality`, `road-signs`, `speed-units`, `tolls`, `fuel` (all named in `KNOWLEDGE_OBJECTS.md` v1.0 §3.1–3.3's original module wishlist, **none built for any country yet**).
- **Outputs:** `{ drivingSide: FactOutput, roadQuality?: FactOutput, roadSigns?: FactOutput, speedUnits?: FactOutput, tolls?: ListOutput, fuel?: FactOutput }`.
- **Dependencies:** none beyond the registries.
- **Required Claim types:** `driving-side` only — everything else in this Block is optional data, reflecting how little of it exists for any country today.
- **Required Evidence:** `primary-linked-for-confirmed` for `driving-side` (a wrong-side-of-the-road claim is safety-critical); `any-linked` for the rest.
- **Required Entities:** `RoadRules`, `Country`.
- **Optional data:** road quality, road signs, speed units, tolls, fuel — all five, honestly, since none has ever been populated for Thailand or any country.
- **Tier applicability:** `driving-side` required at every tier; the rest recommended at Tier 1 only.
- **Thailand today:** `driving-side` and a `roadRulesGuide` NarrativeModule exist (covering signage/units informally, in prose, not as structured `road-signs`/`speed-units` facts). Tolls, fuel, and formal road-quality data do not exist.

### 4.6 Rental

- **Purpose:** car-hire-specific practical guidance.
- **Inputs:** `rentalGuide` NarrativeModule content (exists); deposit and named-companies data (does not exist for any country).
- **Outputs:** `{ directAnswer, requirements: TipOutput[], deposits?: FactOutput, insurance?: FactOutput, companies?: ListOutput, restrictions?: ListOutput }`.
- **Dependencies:** Requirements Block (shares the licence/IDP facts, doesn't restate them).
- **Required Claim types:** at least one `rentalGuide`-sourced Claim (i.e., the module must exist at all for this Block to render — a country with zero rental relevance legitimately omits this Block entirely rather than rendering it empty).
- **Required Evidence:** `any-linked`.
- **Required Entities:** `RentalVehicle`.
- **Optional data:** deposits, named companies, category-specific restrictions — none currently modeled.
- **Tier applicability:** recommended at Tier 1/2, optional at Tier 3.
- **Thailand today:** `rentalGuide` NarrativeModule exists and covers "requirements" reasonably well; deposits and named companies are not modeled anywhere.

### 4.7 Motorcycles

- **Purpose:** scooter/motorcycle-specific requirements, distinct from car rental.
- **Inputs:** `scooterGuide` NarrativeModule (exists, gated by `motorcycleScooterRelevant`); helmet-law and engine-size-restriction facts (partially exist as prose within the module, not as structured Knowledge Objects).
- **Outputs:** `{ directAnswer, licensing: TipOutput[], helmet?: FactOutput, engineSize?: FactOutput, restrictions?: ListOutput }`.
- **Dependencies:** `motorcycleScooterRelevant` flag on the Core Country Record gates this Block's presence entirely — a country where this is `false` omits the Block, not renders it empty (same pattern the Render Adapter already implements today for `scooterGuide`).
- **Required Claim types:** at least one `scooterGuide`-sourced Claim, conditioned on the relevance flag.
- **Required Evidence:** `any-linked`.
- **Required Entities:** `Motorcycle`.
- **Optional data:** helmet law and engine-size restriction as *structured* facts (currently only exist as narrative points, not extractable `FactModule`s — a real GEO atomicity gap: "helmets are legally required" is buried in prose rather than being its own fact-table row).
- **Tier applicability:** required only when `motorcycleScooterRelevant`, recommended within that condition at Tier 1/2, optional at Tier 3.
- **Thailand today:** `scooterGuide` NarrativeModule exists and is genuinely rich; the helmet-law fact specifically would benefit from being promoted to a `FactModule`/Knowledge Object in a future implementation phase (not this one).

### 4.8 Police

- **Purpose:** what happens at a roadside stop — documents to carry, what a fine might involve, who to call in an emergency.
- **Inputs:** `policeGuide` NarrativeModule (exists); `emergency-number`/`roadside-assistance-number` Knowledge Objects (exist); a `fines` Knowledge Object type (does not exist for any country).
- **Outputs:** `{ directAnswer, documentsToCarry: TipOutput[], fines?: ListOutput, emergency?: FactOutput, roadsideAssistance?: FactOutput }`.
- **Dependencies:** none beyond the registries.
- **Required Claim types:** at least one `policeGuide`-sourced Claim.
- **Required Evidence:** `any-linked`, `primary-linked-for-confirmed` specifically for `emergency-number` (a wrong emergency number is a real-world-harm-capable error class, not just an inaccuracy).
- **Required Entities:** `Police`, `EmergencyService`.
- **Optional data:** fines/penalties — **not modeled for any country today**, and worth flagging as a real content gap: "what's the penalty for driving without an IDP" is a plausible, high-intent search query this template has no place to answer yet.
- **Tier applicability:** required at Tier 1, recommended at Tier 2/3.
- **Thailand today:** `policeGuide`, `emergencyNumber`, `roadsideAssistanceNumber` all exist and are populated; fines/penalties do not exist.

### 4.9 FAQ

- **Purpose:** reusable, PAA-shaped answer modules — the page's long-tail intent coverage.
- **Inputs:** Core Country Record's `faq` array (deliberately not modularized — `KNOWLEDGE_OBJECTS.md` v1.1 §2's original decision, restated as still correct here).
- **Outputs:** `{ question, answer }[]`, passed through unchanged.
- **Dependencies:** none — FAQ intentionally does not depend on the Claim/Evidence machinery, matching its existing, deliberately-simpler design.
- **Required Claim types:** none (by design).
- **Required Evidence:** none (by design — individual FAQ answers are expected to restate already-evidenced facts from other Blocks in plain language, not introduce new unevidenced claims).
- **Required Entities:** none.
- **Optional data:** n/a.
- **Tier applicability:** required at every tier, with `TIER_DEFINITIONS.minFaqCount` (already built, Phase 1) as the per-tier depth contract.
- **Thailand today:** fully materialized, 11 entries, well above the Tier 1 minimum of 8.

### 4.10 Related Countries

- **Purpose:** knowledge-graph-shaped cross-country navigation.
- **Inputs:** `CoreCountryRecord.relatedCountryRefs`, resolved against `lib/destinations.ts` by slug (Phase 1's fix).
- **Outputs:** `{ slug, name, isoCode, href }[]`.
- **Dependencies:** the destination each ref points to must exist in `lib/destinations.ts` (checked today by `VALIDATION_RULES.md` row 13).
- **Required Claim types:** none — this Block operates on relationships, not facts.
- **Required Evidence:** none.
- **Required Entities:** `Country` (the related ones).
- **Optional data:** a future `relation` type per related-country ref (e.g., "same region," "similar convention status," "common visa route") — not modeled today, every relation is currently untyped/implicit.
- **Tier applicability:** recommended at every tier (not hard-required — a brand-new Tier 3 country might have zero related-country refs yet).
- **Thailand today:** fully materialized, 4 entries, all correctly resolving post-Phase-1 fix.

### 4.11 References

- **Purpose:** evidence rendering — the page's transparency/EEAT anchor.
- **Inputs:** `Evidence` + `Source` records for the country (`getEvidenceByCountry(slug)`, already built Phase 3), reconstructed today via `sourceCitations`.
- **Outputs:** `{ label, url, organization }[]` (today's shape) — a richer future shape could surface `trustScore`/`lastChecked`/`classification` per Phase 3.5's enrichment, not exposed today.
- **Dependencies:** Source Registry.
- **Required Claim types:** none directly — this Block is evidence-native, not claim-native.
- **Required Evidence:** the Block's entire purpose *is* evidence — n/a as a requirement, it simply renders whatever exists.
- **Required Entities:** none.
- **Optional data:** `trustScore`, `lastChecked`, source `classification` (all exist in the registry since Phase 3.5, none surfaced in the current rendered output — a real, named extension opportunity for a future phase, not this one).
- **Tier applicability:** required at every tier — a page with zero sources is exactly the "no unsupported claims" failure state `BUSINESS_TRUTH_LAYER.md` exists to prevent.
- **Thailand today:** fully materialized, 2 sources.

---

## 5. Publishing flow

This is the **authoring/assembly pipeline** — a temporal sequence, not a reference-direction graph (do not confuse with the Registry Ownership Matrix in `KNOWLEDGE_OBJECTS.md` §9, which describes who may write what; this describes the order operations happen in).

```
1. KNOWLEDGE
   Research produces Knowledge Objects — canonical structured facts,
   per RESEARCH_STANDARD.md. (e.g. "Thailand's driving side is Left")

2. CLAIMS
   Each Knowledge Object is asserted as one or more Claims — wording-
   governed propositions, scoped A/B/C per BUSINESS_TRUTH_LAYER.md §3.

3. EVIDENCE
   Each Claim intended for `confirmed` status is backed by Evidence
   linking it to a primary Source. Claims that can't clear this bar
   stay `partially_sourced` or `pending` — never silently upgraded.

4. TEMPLATE
   The Master Country Template (this document) is consulted: which
   Blocks does this country's tier require? Each Block's contract is
   checked against what's actually in the registries for this country.

5. BLOCKS
   Each required/recommended Block resolves — pulling its Claims,
   Evidence, and Entities per its contract, producing a BlockOutput.
   A Block with unmet `requiredClaimTypes` does not render (never
   renders empty/broken — it's simply absent, same discipline the
   Render Adapter already applies to optional GuideTabs today).

6. RENDERER
   Resolved Blocks feed the EXISTING Render Adapter, which still
   produces the exact CountryRecord shape every current component
   expects. This step is UNCHANGED by this document — Blocks are a
   new way of REASONING about what the Render Adapter assembles, not
   a new code path replacing it. (A future phase could have the
   Renderer consume Blocks directly instead of via a CountryRecord-
   shaped intermediate — explicitly not this phase, see §9.)

7. PAGE
   The existing components render, exactly as today.
```

**What determines whether a country is "publishable":** every Block marked `required` for that country's tier must resolve with at least its `requiredClaimTypes` present. This is a stricter, more specific test than `VALIDATION_RULES.md` row 6's current module-count proxy — see §6.

---

## 6. Template Conformance validation rules

A new rule catalog, separate from the existing 26 content rules (`VALIDATION_RULES.md`) and the Registry Integrity checks (`PHASE_3_5_REGISTRY_ENRICHMENT.md`) — this catalog checks **page structure against the template**, a third distinct question from "is the content compliant" or "is the graph well-formed."

| ID | Check | Severity |
|---|---|---|
| TC-01 | Every `required`-tier Block resolves (its `requiredClaimTypes` are all present for this country) | FAIL |
| TC-02 | Every `recommended`-tier Block that fails to resolve is logged, not silently dropped without a record | WARN |
| TC-03 | No Block renders with an output shape different from its declared `BlockOutputContract` | FAIL |
| TC-04 | Quick Answer's Claim carries `primary-linked-for-confirmed` evidence if `confidence: "confirmed"` | FAIL |
| TC-05 | Decision Box never renders without Requirements having resolved first (dependency order) | FAIL |
| TC-06 | Motorcycles Block presence matches `motorcycleScooterRelevant` exactly (never present when false, never silently absent when true and data exists) | FAIL |
| TC-07 | References Block is non-empty whenever any Block contains a `confirmed` claim | FAIL |
| TC-08 | FAQ count meets `TIER_DEFINITIONS.minFaqCount` for the country's tier | FAIL |
| TC-09 | Related Countries entries all resolve to real destinations (delegates to existing VR-13 logic, re-expressed at Block level) | FAIL |
| TC-10 | Every Block's `optionalData` gaps are enumerated in a machine-readable "content gap list" per country (not a pass/fail — a coverage report, mirroring Phase 3.5's Coverage Report pattern) | (report only) |

**Not implemented this phase.** This is a specification for a future `check-template-conformance` tool, parallel in spirit to `check-registry-integrity` — named here so the Block catalog in §4 has a concrete validation target, consistent with how `KNOWLEDGE_OBJECTS.md` was written before `VALIDATION_RULES.md` existed to check it.

---

## 7. Extension points (typed, unpopulated — nothing here is built)

Every `BlockDefinition` carries:

```ts
type BlockExtensionPoints = {
  seo?: { keywordCluster?: string; intentType?: "informational" | "commercial" | "transactional" };
  geo?: { geoRole?: "direct-answer" | "fact-table" | "misconception" | "tip-list" }; // mirrors Module.geoRole, Phase 3
  schema?: { schemaType?: string; requiredProperties?: string[] };
  aiSearch?: { retrievalPriority?: number; embeddingRef?: string };
  knowledgeGraph?: { entityRefs?: string[] }; // mirrors Entity Registry refs, Phase 3.5
};
```

None of these fields are populated for any Block in §4 — they exist so a future SEO/GEO/AI-Search/Schema/Knowledge-Graph phase has a declared slot to fill per Block, instead of needing to retrofit one later. This mirrors the exact discipline Phase 3.5 applied to `Entity.sameAs`/`wikidataId`: typed now, guessed never.

---

## 8. Relationship to existing architecture

- **Does not change** `CountryRecord`, the Render Adapter, any component, `lib/countryData/thailand.ts`, or any of the 26 validator rules.
- **Sits above** `KNOWLEDGE_OBJECTS.md`'s registries — Blocks consume them, never redefine them.
- **Sits below** `SEO_GUIDELINES.md`/`GEO_GUIDELINES.md`/`SCHEMA_GUIDELINES.md` — those documents' rules apply to a Block's *resolved content* exactly as they apply to today's rendered page; this document doesn't change what's permitted to be said or how it's optimized, only what sections exist and what data completes them.
- **A new peer to** `VALIDATION_RULES.md` and `PHASE_3_5_REGISTRY_ENRICHMENT.md`'s integrity checks — three validation questions (content compliance / graph integrity / template conformance), three separate catalogs, deliberately not merged into one, matching this project's established pattern of keeping distinct questions in distinct tools.

---

## 9. Open questions and honest gaps (found while designing, not hidden)

1. **Five Knowledge Object types the template requires don't exist yet for any country:** `insurance-requirement`, `driving-restriction`, `road-quality`, `road-signs`, `fines`. Requirements, Driving, and Police Blocks all reference them as optional data specifically because of this gap. Building them is future work, not assumed complete by this document.
2. **Decision Box has no current implementation to inherit from** (§4.3) — it's the one Block genuinely designed from the template brief alone, independent of Thailand, exactly as instructed. It should be the first Block prototyped when implementation begins, precisely because it's the least proven.
3. **Quick Answer doesn't exist as its own section today** — the closest content (`drivingGuide.directAnswer`) is embedded inside a tab a visitor might not click. Whether to extract it as a standalone, always-visible section is a real product decision this document flags but doesn't make.
4. **Block vs. Module boundary is genuinely thin for some Blocks** (Hero, FAQ, References) and genuinely thick for others (Requirements, Decision Box) — see §0. Worth revisiting once a second country is templated: if every Block for country #2 turns out to be a 1:1 Module wrapper, the Block layer should be reconsidered, not defended on principle.
5. **The publishing flow's Knowledge→Claims→Evidence ordering (§5) is a description of ideal *future* authoring practice**, not what actually happened for Thailand — Thailand was migrated mechanically *backward* from an already-written legacy record (`PHASE_3_MIGRATION_REPORT.md`), which is the reverse order. Country #2, if authored directly into the registries, would be the first real test of this forward flow.

---

## 10. What this phase did not do

No code was written or modified. `lib/countryData/thailand.ts`, every component, the Render Adapter, and all 26 validator rules are byte-identical to before this document existed. No SEO, GEO, AI Search, or schema generation was implemented — only the extension points in §7 were named. No Country #2 work began.

Waiting for review before any implementation begins.
