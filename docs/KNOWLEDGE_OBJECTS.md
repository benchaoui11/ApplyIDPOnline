# Knowledge Objects

Version: 1.1
Authority level: defines the *shapes* content is stored in. Subordinate to `BUSINESS_TRUTH_LAYER.md` (which constrains what content may say) and fed by `RESEARCH_STANDARD.md` (which determines what confidence each field carries). This document is the platform's data dictionary — the nouns, not the rules about what the nouns may claim.

**Changelog:** v1.1 adds the Claim, Evidence, Source, and Entity Registries (§5–§8) and the Registry Ownership Matrix (§9), per `PHASE_3_DESIGN.md` §7.7. Before this revision, `sourceCitations` was a single flat array on the core record with no per-field linkage — that ambiguity is what `VALIDATION_RULES.md` row 7 (VR-07) has been reporting `NOT_IMPLEMENTED` since Phase 2A. This revision is the data-model fix; VR-07's actual implementation status changes only when Phase 3's code lands, not by this document alone. No implementation exists yet as of this revision — see `PHASE_3_DESIGN.md` for the implementation plan and `PHASE_3_STEP1_AMENDMENT_REPORT.md` for what changed in this pass specifically.

## 1. Purpose

Every other document in this Operating System — editorial, SEO, GEO, schema, validation — ultimately operates on the same underlying content. This document defines that content's shape once, so it can be authored once and rendered multiple ways (as prose, as a fact table, as JSON-LD) without four separate documents each inventing a slightly different notion of "what a country's rental information looks like." A Knowledge Object is the unit that gets researched, written, validated, and published — and, as of v1.1, it is assembled from smaller registries (Claim, Evidence, Source, Entity) rather than being one flat record per country.

## 2. The core record

Every country has one **Core Country Record**: identity (name, ISO code, region, slug), `tier`, `locale`, a reference to its `CountryIdentity` (§10), a reference to its SEO metadata, explicit `moduleOrder`, `relatedCountrySlugs`, `faq`, `reviewState`, `publicationState`, and `lastVerifiedDate`. This is deliberately small and stays small — it holds only what every country needs regardless of content depth, never a content field itself.

`faq` stays here, not inside the module system (§3) — a Q&A pair doesn't fit any of the three module archetypes cleanly, and nothing about the module system requires it to. This was already true in v1.0 and is restated here because it was the first thing checked against the 3-archetype model in `PHASE_3_DESIGN.md` §7.1 and confirmed still correct.

**What changed in v1.1:** the legacy `CountryRecord` shape (identity + `sourceCitations` + all the `xGuide` fields directly on one object) is no longer the authored shape — it becomes the **output** of the Render Adapter (§9 of `PHASE_3_DESIGN.md`), reconstructed from the Core Country Record plus the registries below. `sourceCitations` specifically is now a *derived* view: each entry in it is assembled from a `Source` (§7) plus the `Evidence` (§6) that cites it, not a hand-typed array. The field name and shape visible to components does not change — what backs it does.

## 3. The module system

Everything beyond the core is a **module** — an optional, independently addable unit of content. Rather than one flat type growing a new field per topic (Fuel, Tolls, Parking, Mountain Roads, Traffic Cameras, and dozens more), every module is an instance of exactly one of three reusable **archetypes**:

### 3.1 `NarrativeModule`
A guided-answer shape: a direct answer, a list of verified points, a solution note, an optional CTA.
```
{ id, moduleType: "narrative", key, title, directAnswer, points: { claimRef }[], solutionNote, ctaHint? }
```
Used by: Driving, Road Rules, Rental, Police, Motorcycles/Scooters, Border Crossing, Mountain Roads, Driving Culture, Common Mistakes, Travel Tips.

**Changed in v1.1:** `points` no longer embeds `{ tip, status }` strings directly — each point is a `claimRef` pointing at a `Claim` (§5). The wording a reader sees and the claim's confidence both live on the `Claim`, not duplicated onto the module. A module is now a *presentation grouping* of claims, not a container that also happens to store their text.

### 3.2 `FactModule`
A single verified value.
```
{ id, moduleType: "fact", key, title, valueClaimRef }
```
Used by: Speed Units, Fuel norms, Age Rules (beyond the core minimum), Road Quality rating, Traffic Camera prevalence, and the legacy top-level fields (`drivingSide`, `minimumDrivingAge`, `idpRequirementLevel`, `conventionStatus`, `digitalIdpAcceptance`) once migrated.

### 3.3 `ListModule`
An array of named, noted entries.
```
{ id, moduleType: "list", key, title, entries: { label, claimRef }[] }
```
Used by: Popular Cities, Popular Routes, Seasonal Risks, Tolls, Airport Rental notes.

### 3.4 Extending an archetype vs. adding a fourth one
Unchanged from v1.0: if a future module doesn't fit cleanly, the default move is to extend the archetype additively, not invent a fourth one for a single case. A fourth archetype is only justified if *multiple* future modules independently need the same new shape.

### 3.5 Confirmed sufficient against real content
`PHASE_3_DESIGN.md` §7.1 checked this archetype set directly against every field in the shipped Thailand record before this revision was written — all three archetypes hold, `faq` correctly stays outside them (§2). This is not a new finding; it's the first time it's been checked against real content rather than only against a hypothetical module wishlist.

## 4. Module registry and gating

Unchanged from v1.0: every module is declared once in a central registry — its `ModuleKey`, archetype, rendering component, and tier requirement (`TIER_DEFINITIONS`). Adding module #31 means one registry entry, never touching the core record's type.

## 5. Claim Registry

A **Claim** is a single, wording-neutral proposition — the thing being asserted, independent of how it's phrased on any particular page.

```ts
type Claim = {
  id: string;                    // e.g. "claim.thailand.drivingGuide.points.0"
  proposition: string;           // the canonical fact statement, wording-neutral
  allowedWording: string[];      // exact strings currently in production expressing this claim
  bannedWording?: string[];      // populated as violations are found, not pre-guessed
  confidence: "confirmed" | "partially_sourced" | "pending";
  scope: "A" | "B" | "C";        // BUSINESS_TRUTH_LAYER.md §3's claim-source category
  applicableCountries: string[]; // slugs
  evidenceRefs: string[];        // -> Evidence.id[] — MAY be empty; see §5.1
  reviewState: "draft" | "researched" | "authored" | "validated" | "published" | "needs-review";
  lastReviewed: string;
  frequencyCapRef?: string;      // -> a cap defined in BUSINESS_TRUTH_LAYER.md §6, e.g. "cap.legally-required"
};
```

Why claims are separate from modules: a `NarrativeModule`'s point and a `FactModule`'s value are both, structurally, "a claim rendered somewhere." Making the claim the shared unit means the same claim can be checked once for Business Truth compliance and frequency-cap membership regardless of which module happens to render it — and, as a direct side benefit, two claims that turn out to assert the *same* underlying proposition (the exact situation `VALIDATION_RULES.md` row 15 tries to catch heuristically today via lexical similarity) can eventually be compared by whether they share a claim identity, not just by how similar their wording happens to be. That comparison is not built in this revision — it's a real future capability this structure enables, noted honestly as not yet realized.

### 5.1 `evidenceRefs` may legitimately be empty
This is deliberate, not an oversight. A claim with `confidence: "confirmed"` but `evidenceRefs: []` is a real, visible gap — exactly what `VALIDATION_RULES.md` row 7 (VR-07) is supposed to catch. Nothing in this document requires every claim to have evidence before it can exist in the registry; the *validator's* job is to flag the ones that don't, not this document's.

## 6. Evidence Registry

**Evidence** is the specific support a `Source` provides for one or more `Claim`s — distinct from the source itself, which is the publication or authority `Evidence` points into.

```ts
type Evidence = {
  id: string;                    // e.g. "ev.thailand.gov-uk-safety-security.001"
  sourceId: string;               // -> Source.id
  supportedClaimRefs: string[];   // -> Claim.id[]
  country: string;                 // slug
  locator: string;                 // section/URL-fragment within the source
  summary: string;                 // what the source actually says, in the researcher's own words
  verificationStatus: "confirmed" | "partially_sourced" | "pending";
  independenceClass: "primary" | "corroborating-independent" | "corroborating-derivative";
  dateAccessed: string;
  datePublishedOrUpdated?: string; // often unknown for gov advisory pages — absent, not guessed
  reviewer?: string;                // absent until a real named review process exists (BUSINESS_TRUTH_LAYER.md discipline)
  limitations?: string;
  reReviewDue?: string;             // RESEARCH_STANDARD.md §8's 12-month policy as a concrete date
};
```

`independenceClass` is the direct data-model home for the distinction `RESEARCH_STANDARD.md` §5 draws in prose (two sources "agreeing" only counts if they aren't derivative of each other). Recording it per `Evidence` entry, rather than only reasoning about it at authoring time, is what makes that judgment call auditable later instead of only remembered.

## 7. Source Registry

A **Source** is the publication or authority itself — reusable across every `Evidence` entry that cites it, and, unlike `Evidence` or `Claim`, sometimes genuinely reusable across countries (e.g., a single convention-signatory-list source could back the `conventionStatus` claim for many countries at once).

```ts
type Source = {
  id: string;                     // e.g. "src.gov-uk.thailand.safety-security"
  title: string;
  publisher: string;
  url: string;
  category: "government-advisory" | "government-legislation" | "convention-text" | "commercial-discovery-only";
  classification: "primary" | "discovery-only"; // RESEARCH_STANDARD.md §3/§4
  authorityType: "national-government" | "supranational-treaty" | "commercial";
  jurisdiction: string;             // e.g. "United Kingdom" for a GOV.UK page about Thailand
  publicationDate?: string;
  lastChecked: string;
  status: "active" | "unreachable" | "superseded";
  notes?: string;
};
```

Country records and modules reference `Source.id` (denormalized on modules/`KnowledgeObject`s for convenience) or, canonically, reach a source through the `Evidence` that cites it. A `commercial-discovery-only` source can be recorded here too — `classification: "discovery-only"` is what keeps `RESEARCH_STANDARD.md` §4's rule enforceable in data ("these never appear in a page's citations") rather than only in prose: a discovery-only source can exist in this registry for traceability of *what was consulted*, but no `Evidence` entry with `verificationStatus: "confirmed"` may cite one.

## 8. Entity Registry

A **hub-and-spoke** model of the platform's real-world concepts, matching `COUNTRY_PLATFORM_MASTER_SPEC.md` §7's corrected entity graph exactly — not a content outline mistaken for a relationship graph.

```ts
type Entity = {
  id: string;        // STABLE — reuses SCHEMA_GUIDELINES.md §2's already-ratified @id values verbatim,
                      // e.g. "https://applyidponline.com/#organization",
                      // "https://applyidponline.com/countries/thailand#country" — this registry
                      // does not mint a parallel ID scheme; see §9's ownership note on this.
  kind: "Country" | "Service" | "InternationalDrivingPermit" | "OriginalLicenceRequirement"
      | "DrivingLicence" | "RentalVehicle" | "Motorcycle" | "Police" | "Insurance"
      | "RoadRules" | "City" | "BorderCrossing" | "EmergencyService" | "Organization";
  label: string;
  scope: "global" | "country";
  countrySlug?: string;
  relatedEntityRefs: { relation: string; entityId: string }[]; // explicit typed edges, never implied nesting
};
```

`Country` and `Service` are the two hubs; `DrivingLicence`/`RentalVehicle`/`Motorcycle`/`Police`/`Insurance`/`RoadRules`/`BorderCrossing`/`EmergencyService` are independent facets of `Country` (not of each other), and `InternationalDrivingPermit`/`OriginalLicenceRequirement` are global entities referenced by every country, defined once. This registry stores the identities a future schema-generation phase will consume — it does not, itself, change what `page.tsx`'s `JsonLd()` function emits (explicitly out of scope for Phase 3; see `PHASE_3_DESIGN.md` §7.5).

## 9. Registry Ownership Matrix

Exactly one place owns the canonical record of each concept. Every other place either reads it by reference or is forbidden from touching it at all. "Writer" below means the only code allowed to create or mutate that record.

| Concept | Canonical owner (single source of truth) | Allowed readers | Writers |
|---|---|---|---|
| **Source** | Source Registry | Evidence Registry, modules/Knowledge Objects (via `sourceRefs`, denormalized) | Compatibility Migration Layer (bootstrap); future authoring tooling |
| **Evidence** | Evidence Registry | Claim Registry, Knowledge Object Registry, Render Adapter | Compatibility Migration Layer; future authoring tooling |
| **Claim** | Claim Registry | Module Registry (via `claimRefs`/`points[].claimRef`), Knowledge Object Registry, Render Adapter | Compatibility Migration Layer; future authoring tooling |
| **Knowledge Object** | Knowledge Object Registry | Module Registry, Entity Registry (`schemaMapping`), Render Adapter | Compatibility Migration Layer; future authoring tooling |
| **Entity** | Entity Registry | Render Adapter (for future schema use), Knowledge Objects (`entityRefs`) | Compatibility Migration Layer; future authoring tooling — `id` values themselves are owned by `SCHEMA_GUIDELINES.md` §2, this registry only stores them |
| **Module** | Module Registry | Render Adapter | Compatibility Migration Layer; future authoring tooling — never read directly by components (see Render Adapter boundary below) |
| **Core Country Record** | Core Country Record store (one per country) | Render Adapter | Compatibility Migration Layer; future authoring tooling |
| **`CountryRecord` (the legacy component-facing shape)** | **Nothing owns it as stored data anymore.** It is a computed, transient output. | `app/countries/[country]/page.tsx` and every existing component, exactly as today | **Only** the Render Adapter produces it, and only in memory per request — it is never persisted |
| **Render Adapter itself** | N/A — it is a pure function, not a data owner | Reads every registry above | Writes to none of them; if the adapter ever needs to write back to a registry to do its job, that is itself a design violation (`PHASE_3_DESIGN.md` §7.6) |

Two rules follow directly from this table: (1) components never query a registry directly — they only ever receive the Render Adapter's `CountryRecord`-shaped output, exactly as before this revision; (2) nothing downstream of a registry may hold a second, independent copy of that registry's data — a `sourceRefs` array on a `KnowledgeObject` is a *reference*, never a duplicate of the `Source` record's fields.

## 10. Country Identity Registry

A separate, small object the Hero (and any future component needing destination "feel") consumes as a unit — unchanged in shape from v1.0, formally named a registry in v1.1 because it now sits alongside the other five:
```
{ id, countrySlug, flagColors: string[], primaryAccent?, secondaryAccent?, badge?: { icon, label }, symbolRef?, patternRef?, isFallback: boolean }
```
Only `flagColors` (already shipped, `lib/countryData/flagColors.ts`) is populated today. Every other field is typed now but left empty until real, verified content exists for it — typed-but-empty is fine; guessed-and-populated is not.

## 11. Tiers

Unchanged from v1.0. `tier: 1 | 2 | 3` is a contract, defined once in `TIER_DEFINITIONS`, checked against a record's actual content by `VALIDATION_RULES.md`. Tier is a *scope* decision, not a quality decision.

## 12. Lifecycle

Unchanged in stages from v1.0 — Draft → Researched → Authored → Validated → Published → Reviewed — but as of v1.1, `Claim`, `Evidence`, and `Source` records each carry their own `reviewState`/lifecycle-adjacent fields (§5–§7) rather than only the whole country record having one. A country's overall `reviewState` (§2) should be understood as, roughly, the least-advanced state among its constituent claims — a record isn't meaningfully "Validated" if one of its claims is still "Researched." This aggregation rule is stated here as intent; it is not yet enforced by any tool.

## 13. Naming conventions

- Module keys are camelCase nouns (`rental`, `borderCrossing`), never verbs.
- Every module maps to exactly one archetype — never a hybrid.
- No module instance may carry ad hoc extra fields outside its archetype's shape.
- **New in v1.1:** registry IDs are dot-namespaced, lowercase, kebab-case within each segment, and mirror the legacy field path where one exists (for traceability during migration): `claim.thailand.drivingGuide.points.0`, `ev.thailand.gov-uk-safety-security.001`, `src.gov-uk.thailand.safety-security`, `mod.thailand.driving`, `ko.thailand.driving-side`. `Entity.id` is the one exception — it is a full URL, not a dot-namespaced string, because it must equal an already-ratified schema `@id` value verbatim (§8).

## 14. Interaction with other documents

- `RESEARCH_STANDARD.md` fills in the confidence/verification fields across `Claim` and `Evidence`; §7 of that document now describes citation requirements in terms of `Source` + `Evidence`, not a flat array (see that document's own changelog).
- `EDITORIAL_GUIDELINES.md`, `SEO_GUIDELINES.md`, `GEO_GUIDELINES.md`, and `SCHEMA_GUIDELINES.md` remain four parallel presentation layers, all ultimately reading from these registries (via the Render Adapter for the first three, and directly for schema generation in a future phase) — none stores its own copy of the content.
- `VALIDATION_RULES.md` checks structural completeness against this document's definitions; row 7 (VR-07) specifically becomes checkable against `Claim.evidenceRefs` once Phase 3's implementation lands — this document defines the data shape that makes that possible, it does not itself change the rule or its current `NOT_IMPLEMENTED` status.
- `SCHEMA_GUIDELINES.md`'s `@id` values are authoritative; the Entity Registry (§8) stores them, it does not define them independently.
- `BUSINESS_TRUTH_LAYER.md` constrains what any `Claim.proposition` or `allowedWording` entry may say; this document only constrains shape.

## 15. Future scalability concerns

- The 3-archetype system remains an untested bet until a genuinely awkward module gets built against it (unchanged from v1.0).
- **New in v1.1:** five registries plus the core record is more moving parts than the v1.0 single-record model, and that complexity is only worth it if it's actually consumed — a Claim/Evidence/Source split that no tooling ever queries granularly (beyond the Render Adapter's reconstruction) would be complexity without payoff. The near-term test is whether VR-07's real, per-claim results (once implemented) turn out to be useful signal or just noise.
- The module registry, `lib/destinations.ts`, and now five additional registries are all things that must stay consistent as the platform grows — the ownership matrix (§9) is the mechanism for that, but it only works if every future contributor (human or Claude session) actually reads and follows it rather than reaching for the nearest object and mutating it.
- Tier contracts were defined against one Tier 1 example and still need validating against real Tier 2/3 data (unchanged from v1.0).

## 16. Self-critique

v1.0's self-critique warned that the module archetype system was "a bet on foresight" to be revisited the first time real evidence said otherwise. v1.1 is a larger bet of the same kind, in a different place: splitting Source/Evidence/Claim into three registries instead of one flat `sourceCitations` array is *justified* by a real, already-observed problem (VR-07's unresolvable ambiguity) — but the exact three-way split, rather than a simpler two-way one (say, merging Claim and Evidence), hasn't been tested against anything beyond a single Tier 1 country with two sources. If the split turns out to add authoring overhead without adding checkable value once Phase 3's implementation and a second country both exist, collapsing Claim and Evidence back toward each other is a legitimate future correction — this document should not treat five registries as self-evidently correct just because they're now written down.
