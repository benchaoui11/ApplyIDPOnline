# Phase 3 — Master Knowledge Architecture: Design Report

Version: 1.0 (pre-implementation — no code has been written against this design)
Status: **awaiting approval per explicit instruction — "After approval of the design, implement the phase."**

This document is the six pre-coding deliverables requested: target type diagram, file-layout proposal, Thailand migration map, backward-compatibility risks, doc/code contradictions, and the stop-condition evaluation. Read §7 first — it contains the one real trigger among the stop conditions, and it's a governance question, not an engineering one.

---

## 0. Design summary, in one paragraph

Five new registries (Claim, Evidence, Source, Entity, Country Identity) plus a Module layer sit underneath a deliberately small Core Country Record. None of the current components change. A **Render Adapter** reads the registries and reconstructs an object shaped exactly like today's `CountryRecord`, which `page.tsx` and every component keep consuming unmodified. A **Compatibility Migration Layer** does the reverse, mechanically: it reads the existing, untouched `thailand.ts` and *programmatically* decomposes it into the new registries — nothing about Thailand is hand-retyped, which is what makes "no content may disappear silently" verifiable rather than just promised. An automated equivalence check between the legacy object and the render adapter's output is the actual proof.

---

## 1. Target type diagram

```ts
// ── 1. CORE COUNTRY RECORD ──────────────────────────────────────────────
// lib/knowledge/core/types.ts
type ReviewState = "draft" | "researched" | "authored" | "validated" | "published" | "needs-review";
type PublicationState = "unpublished" | "published" | "archived";

type CoreCountryRecord = {
  slug: string;
  name: string;
  isoCode: string;
  tier: 1 | 2 | 3;
  locale: string;                    // "en" today; typed now, not exercised — no localization exists yet
  identityRef: string;               // -> CountryIdentity.id
  metadataRef: string;               // -> SeoMetadata object id (title/description/keywords)
  moduleOrder: ModuleKey[];          // explicit render order, replaces implicit field order
  relatedCountryRefs: string[];      // slugs, unchanged from today
  faq: FaqItem[];                    // stays a core-record field, NOT a module (see §7.1 — this is
                                      // deliberate, matching KNOWLEDGE_OBJECTS.md's original design)
  reviewState: ReviewState;
  publicationState: PublicationState;
  lastVerifiedDate: string;
};

// ── 2. KNOWLEDGE MODULES ────────────────────────────────────────────────
// lib/knowledge/modules/types.ts
type ModuleKey =
  | "driving" | "roadRules" | "rental" | "scooters" | "police" | "borderCrossing"
  | "speedUnits" | "fuel" | "ageRules" | "roadQuality" | "trafficCameras"
  | "popularCities" | "popularRoutes" | "seasonalRisks" | "tolls" | "airportRental";

type ModuleCommon = {
  id: string;                        // stable, e.g. "mod.thailand.driving"
  moduleType: "narrative" | "fact" | "list";
  key: ModuleKey;
  title: string;
  directAnswer?: string;
  claimRefs: string[];               // -> Claim.id[] (the module's assertions)
  knowledgeObjectRefs: string[];     // -> KnowledgeObject.id[]
  sourceRefs: string[];              // -> Source.id[] (denormalized convenience; canonical link is via claims/evidence)
  confidence: "confirmed" | "partially_sourced" | "pending" | "mixed"; // "mixed" = derived, not authored
  reviewState: ReviewState;
  geoRole: "direct-answer" | "fact-table" | "misconception" | "tip-list"; // GEO_GUIDELINES.md §2 primitive
  schemaRelevant: boolean;           // does this module contribute a JSON-LD node
  intentRelevance: ("informational" | "commercial" | "transactional")[];
  renderHints?: { ctaHint?: { label: string; href: string } };
};

type NarrativeModule = ModuleCommon & {
  moduleType: "narrative";
  points: { claimRef: string }[];    // ordered; each point IS a claim, not a duplicate string
  solutionNote: string;
};

type FactModule = ModuleCommon & {
  moduleType: "fact";
  valueClaimRef: string;             // the single Claim carrying the fact's value
};

type ListModule = ModuleCommon & {
  moduleType: "list";
  entries: { label: string; claimRef: string }[];
};

type KnowledgeModule = NarrativeModule | FactModule | ListModule;

// ── 3. KNOWLEDGE OBJECTS ────────────────────────────────────────────────
// lib/knowledge/objects/types.ts
type KnowledgeObjectScope =
  | { kind: "global" }                       // reusable across every country (rare in this domain)
  | { kind: "country"; countrySlug: string }; // scoped to one country (the common case here)

type KnowledgeObject = {
  id: string;                        // e.g. "ko.thailand.driving-side" or "ko.concept.idp-requirement"
  type: string;                      // e.g. "driving-side", "emergency-number", "idp-requirement-level"
  canonicalValue: string | number;
  label: string;
  entityRefs: string[];              // -> Entity.id[]
  claimRefs: string[];               // -> Claim.id[] (claims that assert this object)
  evidenceRefs: string[];            // -> Evidence.id[]
  sourceRefs: string[];              // -> Source.id[] (denormalized)
  applicableCountries: string[];     // slugs; single-entry for country-scoped objects
  scope: KnowledgeObjectScope;
  confidence: "confirmed" | "partially_sourced" | "pending";
  lastReviewed: string;
  reviewer?: string;                 // absent, not placeholder-filled — no real reviewer process exists yet
  lifecycleState: ReviewState;
  schemaMapping?: { schemaType: string; property: string }; // e.g. { schemaType: "Country", property: "..." }
  geoRole?: "atomic-fact";
};

// ── 4. CLAIM REGISTRY ───────────────────────────────────────────────────
// lib/knowledge/claims/types.ts
type BusinessTruthCategory = "A" | "B" | "C"; // BUSINESS_TRUTH_LAYER.md §3

type Claim = {
  id: string;                        // e.g. "claim.thailand.drivingGuide.points.0"
  proposition: string;               // the canonical, wording-neutral fact statement
  allowedWording: string[];          // exact strings currently in production that express this claim
  bannedWording?: string[];          // typically empty at migration time; populated as violations are found
  confidence: "confirmed" | "partially_sourced" | "pending";
  scope: BusinessTruthCategory;
  applicableCountries: string[];
  evidenceRefs: string[];            // -> Evidence.id[] — MAY be empty (honest gap, not hidden)
  reviewState: ReviewState;
  lastReviewed: string;
  frequencyCapRef?: string;          // -> id of a cap rule in BUSINESS_TRUTH_LAYER.md §6, e.g. "cap.legally-required"
};

// ── 5. EVIDENCE REGISTRY ────────────────────────────────────────────────
// lib/knowledge/evidence/types.ts
type Evidence = {
  id: string;                        // e.g. "ev.thailand.gov-uk-safety-security.001"
  sourceId: string;                  // -> Source.id
  supportedClaimRefs: string[];      // -> Claim.id[]
  country: string;                   // slug
  locator: string;                   // e.g. a URL fragment/section name within the source
  summary: string;                   // what this evidence actually says, in the researcher's words
  verificationStatus: "confirmed" | "partially_sourced" | "pending";
  independenceClass: "primary" | "corroborating-independent" | "corroborating-derivative";
  dateAccessed: string;
  datePublishedOrUpdated?: string;   // often unknown for gov advisory pages — absent, not guessed
  reviewer?: string;
  limitations?: string;
  reReviewDue?: string;              // RESEARCH_STANDARD.md §8's 12-month policy, as a concrete date
};

// ── 6. SOURCE REGISTRY ──────────────────────────────────────────────────
// lib/knowledge/sources/types.ts
type Source = {
  id: string;                        // e.g. "src.gov-uk.thailand.safety-security"
  title: string;
  publisher: string;
  url: string;
  category: "government-advisory" | "government-legislation" | "convention-text" | "commercial-discovery-only";
  classification: "primary" | "discovery-only"; // RESEARCH_STANDARD.md §3/§4
  authorityType: "national-government" | "supranational-treaty" | "commercial";
  jurisdiction: string;               // e.g. "United Kingdom" for a GOV.UK page about Thailand
  publicationDate?: string;
  lastChecked: string;
  status: "active" | "unreachable" | "superseded";
  notes?: string;
};

// ── 7. ENTITY REGISTRY (hub-and-spoke, mirrors COUNTRY_PLATFORM_MASTER_SPEC.md §7) ──
// lib/knowledge/entities/types.ts
type EntityKind =
  | "Country" | "Service" | "InternationalDrivingPermit" | "OriginalLicenceRequirement"
  | "DrivingLicence" | "RentalVehicle" | "Motorcycle" | "Police" | "Insurance"
  | "RoadRules" | "City" | "BorderCrossing" | "EmergencyService" | "Organization";

type Entity = {
  id: string;                        // STABLE, matches SCHEMA_GUIDELINES.md §2's already-ratified @id scheme
                                      // exactly, e.g. "https://applyidponline.com/#organization",
                                      // "https://applyidponline.com/countries/thailand#country" —
                                      // this registry does not invent a parallel ID scheme.
  kind: EntityKind;
  label: string;
  scope: "global" | "country";
  countrySlug?: string;
  relatedEntityRefs: { relation: string; entityId: string }[]; // explicit typed edges, not implied nesting
};

// ── 8. COUNTRY IDENTITY REGISTRY ────────────────────────────────────────
// lib/knowledge/identity/types.ts  (extends the already-shipped flagColors.ts)
type CountryIdentity = {
  id: string;                        // "identity.thailand"
  countrySlug: string;
  flagColors: string[];              // from the existing FLAG_COLORS table — unchanged, just relocated
  primaryAccent?: string;
  secondaryAccent?: string;
  badge?: { icon: string; label: string };
  symbolRef?: string;                // typed, unpopulated — no symbol assets exist yet
  patternRef?: string;               // typed, unpopulated — no pattern assets exist yet
  isFallback: boolean;               // true when no country-specific data exists (brand navy/blue pair)
};

// ── 9. RENDER ADAPTER ───────────────────────────────────────────────────
// lib/knowledge/render/adapter.ts
declare function resolveCountryView(slug: string): CountryRecord; // TODAY's exact type, unchanged

// ── 10. COMPATIBILITY MIGRATION LAYER ───────────────────────────────────
// lib/knowledge/migration/fromLegacyRecord.ts
declare function buildRegistriesFromLegacy(record: CountryRecord): {
  core: CoreCountryRecord;
  modules: KnowledgeModule[];
  objects: KnowledgeObject[];
  claims: Claim[];
  evidence: Evidence[];
  sources: Source[];
  entities: Entity[];
  identity: CountryIdentity;
};
```

---

## 2. File-layout proposal

```
lib/knowledge/
  core/types.ts
  modules/{types.ts, registry.ts}
  objects/{types.ts, registry.ts}
  claims/{types.ts, registry.ts}
  evidence/{types.ts, registry.ts}
  sources/{types.ts, registry.ts}
  entities/{types.ts, registry.ts}
  identity/{types.ts, registry.ts}        # flagColors.ts moves here, re-exported from its old
                                           # path for one release to avoid a silent breaking import
  render/adapter.ts
  migration/fromLegacyRecord.ts
  migration/verifyEquivalence.ts          # the automated legacy-vs-adapter diff, see §5
  index.ts                                # barrel

lib/countryData/                          # UNCHANGED location and contents this phase
  thailand.ts                             # untouched — the migration layer's input, not its output
  types.ts                                # unchanged — CountryRecord stays the render adapter's OUTPUT type
  globalConstants.ts                      # unchanged
  registry.ts                             # ONE line changes: getCountryRecord() calls resolveCountryView()
  tiers.ts                                # unchanged, read directly by both old and new code
  flagColors.ts                           # becomes a thin re-export of lib/knowledge/identity/registry.ts
                                           # (kept so CountryHero's existing import doesn't need to change
                                           # this phase — see §5 backward-compat risk)

scripts/
  verify-knowledge-migration.ts           # runs migration/verifyEquivalence.ts as a standalone CLI check
```

Nothing under `components/` or `app/` changes. `app/countries/[country]/page.tsx` keeps calling `getCountryRecord(slug)` exactly as it does today — the change is entirely inside what that function does internally.

---

## 3. Thailand migration map

Full field-by-field mapping (abbreviated to representative rows — the actual migration is a mechanical function over every field, not a hand-written table, but every row class below is covered):

| Old field (`thailand.ts`) | New registry entry | Render adapter output |
|---|---|---|
| `slug`, `name`, `isoCode`, `region`, `tier` | `CoreCountryRecord` fields | same fields, same values |
| `drivingSide: {value: "Left", status: "confirmed"}` | `KnowledgeObject("ko.thailand.driving-side")` + `Claim("claim.thailand.driving-side")` | `country.drivingSide = {value, status}` — reconstructed from the KO |
| `drivingGuide` (a `GuideTab`) | `NarrativeModule("mod.thailand.driving")`; each `points[i]` becomes `Claim("claim.thailand.drivingGuide.points.i")` | `country.drivingGuide` rebuilt: `directAnswer`, `points[].tip` read back from claim propositions, `solutionNote`, `ctaHint` |
| `sourceCitations[0]` (GOV.UK Safety and Security) | `Source("src.gov-uk.thailand.safety-security")` + `Evidence("ev.thailand.001")` | `country.sourceCitations[0]` reconstructed from the `Source` record |
| `sourceCitations[1]` (GOV.UK Getting Help) | `Source("src.gov-uk.thailand.getting-help")` + `Evidence("ev.thailand.002")` | `country.sourceCitations[1]` reconstructed |
| `faq` | Stays a `CoreCountryRecord.faq` field (see §7.1) — not modularized, not claim-ified | `country.faq` passed through unchanged |
| `relatedCountrySlugs` | `CoreCountryRecord.relatedCountryRefs` | `country.relatedCountrySlugs` |
| `primaryKeyword`, `secondaryKeywords`, `metaTitle`, `metaDescription` | A metadata object referenced by `CoreCountryRecord.metadataRef` | `country.primaryKeyword` etc., passed through |
| `isoCode` (flag stripe consumer) | `CountryIdentity("identity.thailand")`, `flagColors` copied verbatim from `FLAG_COLORS.TH` | `flagStripeGradient()` call site in `CountryHero.tsx` unchanged — it still receives an `isoCode` string |
| `popularDrivingAreas[i]` | `ListModule("mod.thailand.popularCities")`, each entry -> `Claim` | `country.popularDrivingAreas[i]` reconstructed |
| `emergencyNumber`, `roadsideAssistanceNumber` | `FactModule`s + `Claim`s | `country.emergencyNumber` / `roadsideAssistanceNumber` reconstructed |

**Evidence-to-claim linkage heuristic (the one genuinely judgment-based step in the migration):** Thailand's 2 citations have topically distinct labels ("Safety and security" vs. "Getting help"). The migration function links each `Evidence` to `Claim`s whose proposition text matches a keyword set associated with that citation's topic (e.g., "emergency," "police," "tourist police," "roadside" → Getting Help; "legally required," "IDP," "driving," "convention," "license" → Safety and Security). Claims that match neither keyword set are left with an **empty** `evidenceRefs` array — an honest gap, not a guessed link. This is not new research; it's a disclosed, mechanical inference over citation labels that were already written by a human during Thailand's original build. See §7.2 for what this means for VR-07.

---

## 4. Backward-compatibility risks

1. **`flagColors.ts`'s current import path** (`@/lib/countryData/flagColors`, used by `CountryHero.tsx`) must keep resolving. Mitigation: it becomes a thin re-export of the relocated identity registry rather than being deleted, so `CountryHero.tsx` needs zero changes this phase.
2. **`CountryRecord` the TYPE must not change shape.** The render adapter's return type is the *exact* current `CountryRecord` from `lib/countryData/types.ts` — not a lookalike, not a superset. Any component destructuring a field that's missing or renamed breaks silently at the type level before it ever breaks at runtime; `tsc --noEmit` is the first gate, but is not sufficient alone (see the equivalence check in §5).
3. **`registry.ts`'s `getCountryRecord` return value identity.** Today it returns the literal `THAILAND` object reference; after migration it returns a freshly-constructed object each call (or a memoized one). Any code relying on reference equality (`record === THAILAND`) would break. Checked: no such reliance exists today (`grep` for `=== THAILAND` / `!== THAILAND` across `components/` and `app/` returns nothing) — but this is the kind of assumption that's easy to introduce accidentally later, so it's worth stating explicitly rather than leaving implicit.
4. **JSON-LD output must not change** (per the phase's own requirement). Since `app/countries/[country]/page.tsx`'s `JsonLd()` function reads from the `CountryRecord` it receives, and the render adapter's output is required to be equivalent to the legacy object, schema output is unaffected *if and only if* the equivalence check in §5 passes. This is not automatic — it's the thing being tested for.
5. **Ordering.** `CoreCountryRecord.moduleOrder` is new. The render adapter must reconstruct `drivingGuide`/`roadRulesGuide`/etc. as *named fields* (matching `CountryRecord`'s shape), not an ordered array — `PracticalGuide.tsx` already derives its own tab order by reading those named fields in a fixed sequence in its own source. `moduleOrder` is stored for future use (once components read modules generically) but is not yet consumed by anything this phase touches.

---

## 5. The equivalence check (how "no silent content loss" is actually verified, not just claimed)

`scripts/verify-knowledge-migration.ts` performs a deep, field-by-field structural diff between the legacy `THAILAND` constant (imported directly from `thailand.ts`) and `resolveCountryView("thailand")`. Any difference — a missing field, a changed string, a reordered array, a dropped citation — is printed and the script exits non-zero. This script is the actual evidence for the phase's success criterion "no existing source, claim, or module may disappear silently"; the migration is not considered complete until it passes clean. This is listed explicitly because a design document that only *asserts* losslessness without a way to check it would be exactly the kind of unverified claim this whole project has been trying to avoid making.

---

## 6. Doc/code contradictions found

None between existing governing documents — `BUSINESS_TRUTH_LAYER.md`, `KNOWLEDGE_OBJECTS.md`, `RESEARCH_STANDARD.md`, and `SCHEMA_GUIDELINES.md` are consistent with each other everywhere checked. What was found instead is a **specification gap**, addressed in §7.

---

## 7. Stop-condition evaluation

### 7.1 "The documented 3-archetype model is insufficient" — **not triggered**
Checked directly against Thailand's actual fields. `NarrativeModule` covers all 5(6) guide tabs; `FactModule` covers the single-value legal/practical fields; `ListModule` covers `popularDrivingAreas`. `faq` does not fit any archetype — but `KNOWLEDGE_OBJECTS.md` §2 never claimed it should; the original design already places `faq` on the core record, outside the module system. Confirmed sufficient, no redesign needed.

### 7.2 "A registry relationship is ambiguous" — **found, and resolved by design, not by stopping**
The Claim→Evidence link for Thailand's existing content is genuinely ambiguous in the source data (2 citations, no existing per-field mapping). §3's keyword-based linkage heuristic resolves it *honestly*: claims get linked where the inference is reasonably clear from citation labels already written by a human, and are left unlinked otherwise. This means **VR-07 becomes checkable but will not universally pass** — some claims will legitimately show `FAIL` (no evidence linked) after migration. That is correct and expected: the rule's job is to surface exactly this gap, and it will, for the first time. This is called out explicitly so it isn't mistaken for a migration bug when it's actually the intended, honest result.

### 7.3 "Migration would require silent content loss" — **not triggered, contingent on §5 passing**
No content-loss is authorized. The equivalence check is the enforcement mechanism, not this document's say-so.

### 7.4 "A governing document contradicts another" — **not triggered** (see §6).

### 7.5 "Schema identities cannot remain stable" — **not triggered**
The Entity Registry's `id` field is defined to reuse `SCHEMA_GUIDELINES.md` §2's already-ratified `@id` values verbatim, not invent a parallel scheme. No schema redesign happens this phase (explicitly out of scope per the brief) — the Entity Registry stores the identities that a future schema-generation phase will consume, it doesn't change what `page.tsx`'s `JsonLd()` function emits today.

### 7.6 "The render adapter would duplicate business logic" — **not triggered, by design constraint**
The adapter is scoped to pure structural assembly (reading registries, reconstructing the `CountryRecord` shape) — no BTL wording rules, no validation logic, no claim-frequency-cap enforcement live inside it. Those stay exactly where they are today (in copy itself, and in the validator).

### 7.7 **The one real trigger: "the architecture requires changing a governing document" — YES**

`KNOWLEDGE_OBJECTS.md` as currently written defines only: the core record (with a single flat `sourceCitations: SourceCitation[]` array, no per-field linkage), the 3 module archetypes, and `CountryIdentity`. It does **not** currently define a Claim Registry, Evidence Registry, Source Registry, or Entity Registry as distinct concepts — those are new in this phase's brief, not a restatement of something already documented. Implementing them as specified means `KNOWLEDGE_OBJECTS.md` needs new sections (§12–§15, roughly) formally defining these four registries, and two smaller, consistent edits: `RESEARCH_STANDARD.md` §7 ("every citation has label/url/organization") should be reframed in terms of `Source` + `Evidence` records rather than the flat `sourceCitations` shape it currently describes, and `SCHEMA_GUIDELINES.md` should gain a short cross-reference noting the Entity Registry as the place `@id` values are now canonically defined (without changing the `@id` values themselves — see §7.5).

This is flagged per the explicit stop condition rather than amended silently. It's the same category of situation as the GEO-rules gap found and then closed (with your approval) in `VALIDATION_RULES.md` v1.1 last phase — a real, honest under-specification, not a conflict.

---

## 8. What happens next

Nothing has been implemented. If this design is approved, implementation proceeds in this order: (1) build the registries and their types, (2) build the Compatibility Migration Layer and run it against the real `thailand.ts`, (3) build the Render Adapter, (4) run the equivalence check until it's clean, (5) cut `registry.ts` over to `resolveCountryView`, (6) update the validator (VR-07 re-evaluation, traceability regeneration, snapshot review — no rule weakened to pass), (7) run the full mandatory test suite listed in your brief, (8) amend `KNOWLEDGE_OBJECTS.md` / `RESEARCH_STANDARD.md` / `SCHEMA_GUIDELINES.md` per §7.7, (9) report per your deliverables list.

**Waiting for approval of this design — including explicit confirmation on §7.7 (governing-document amendments) — before any of the above begins.**
