# Phase 3, Step 2 — Implementation & Migration Report

Version: 1.0
Scope: implementation only, per approved `PHASE_3_DESIGN.md`. Thailand is migrated; no Country #2 work and no Thailand content/copy optimization were performed.

---

## 1. Architecture diagrams

### 1.1 Registry layer

```
                         ┌─────────────────────────┐
                         │   Compatibility          │
lib/countryData/         │   Migration Layer        │
thailand.ts  ──(read)──► │   fromLegacyRecord.ts    │
(UNTOUCHED,               │   (mechanical, pure)     │
the migration oracle)     └────────────┬─────────────┘
                                        │ writes (once, at bootstrap)
                                        ▼
   ┌─────────────┬─────────────┬─────────────┬─────────────┬─────────────┬─────────────┬─────────────┐
   │   Source     │  Evidence   │    Claim    │  Knowledge  │   Entity    │   Module    │   Country    │
   │  Registry    │  Registry   │   Registry  │   Object    │  Registry   │  Registry   │  Identity    │
   │              │             │             │  Registry   │             │             │  Registry    │
   └──────┬───────┴──────┬──────┴──────┬──────┴──────┬──────┴─────────────┴──────┬──────┴──────────────┘
          │              │             │             │                           │
          │◄─sourceId────┤◄─claimRefs──┤             │                           │
          │              │             │             │                           │
          └──────────────┴─────────────┴─────────────┘                           │
                                        │                     Core Country Record │
                                        │                     Registry ───────────┘
                                        ▼
                         ┌─────────────────────────┐
                         │      Render Adapter      │
                         │   render/adapter.ts      │
                         │  resolveCountryView()     │
                         │  (memoized per slug)      │
                         └────────────┬─────────────┘
                                        │ produces (exact legacy shape)
                                        ▼
                         lib/countryData/types.ts's
                              CountryRecord
                                        │
                                        ▼
                 lib/countryData/registry.ts (getCountryRecord)
                                        │
                                        ▼
              app/countries/[country]/page.tsx + every existing
              component — UNCHANGED, receives the identical shape
              it always has.
```

### 1.2 Data flow for one request

```
HTTP request → page.tsx → getCountryRecord("thailand")
  → resolveCountryView("thailand")
      → ensureKnowledgeBootstrapped()   [no-op after first call]
      → read Core Country Record
      → read Modules (narrative/fact/list) for "thailand"
      → dereference each module's claimRefs → Claim Registry
      → reconstruct sourceCitations from Evidence → Source
      → assemble CountryRecord object, cache it, return it
  → identical CountryRecord as before Phase 3
  → all existing components render unchanged
```

---

## 2. Legacy field classification (required: no unknown fields)

30 fields total on `CountryRecord`. **0 deprecated, 0 unresolved.**

| Field | Classification | Where it lives now |
|---|---|---|
| `slug`, `name`, `isoCode`, `region`, `tier` | migrated | `CoreCountryRecord` |
| `lastVerifiedDate` | migrated | `CoreCountryRecord` |
| `relatedCountrySlugs` | migrated | `CoreCountryRecord.relatedCountryRefs` |
| `primaryKeyword`, `secondaryKeywords`, `metaTitle`, `metaDescription` | migrated | `CoreCountryRecord` |
| `faq` | migrated | `CoreCountryRecord.faq` — deliberately not modularized, per `KNOWLEDGE_OBJECTS.md` v1.1 §2 |
| `motorcycleScooterRelevant`, `borderCrossingRelevant` | migrated | `CoreCountryRecord` gating flags |
| `sourceCitations` | migrated | Derived view over `Source` + `Evidence` — shape survives, population no longer hand-typed |
| `conventionStatus`, `idpRequirementLevel`, `minimumDrivingAge`, `digitalIdpAcceptance`, `drivingSide` | adapter-only (temporary) | `FactModule` + `Claim`, reconstructed as `{value, status}` only because current components expect that exact wrapper shape |
| `vehicleCategoryNote`, `emergencyNumber`, `roadsideAssistanceNumber` | adapter-only (temporary) | Same as above, optional variants |
| `popularDrivingAreas` | adapter-only (temporary) | `ListModule` + `Claim`s |
| `drivingGuide`, `roadRulesGuide`, `rentalGuide`, `scooterGuide`, `policeGuide`, `borderCrossingGuide` | adapter-only (temporary) | `NarrativeModule` + `Claim`s per point |

**"Adapter-only (temporary)" means:** the underlying fact is durably stored (as a `Claim`, with confidence and — where linked — evidence), but the exact `{value, status}` / `GuideTab` wrapper shape on `CountryRecord` exists only because today's components (`GlancePanel`, `PracticalGuide`, `CountryHero`) destructure it that way. A future phase that rewrites components to consume `Claim`/`Module` objects directly would retire these specific shapes — not this phase, and not without explicit direction.

---

## 3. Migration statistics (real, from a fresh migration run against the untouched `thailand.ts`)

| Registry | Count | Detail |
|---|---|---|
| Sources | 2 | Both GOV.UK Foreign Travel Advice pages, correctly auto-classified `primary` / `government-advisory` |
| Evidence | 2 | One per source |
| Claims | 43 | 33 `confirmed`, 8 `partially_sourced`, 2 `pending` |
| Modules | 14 | 5 narrative, 8 fact, 1 list |
| Knowledge Objects | 8 | One per `FactModule`-eligible fact |
| Entities | 5 | `Country`, `Service` (country-scoped) + `Organization`, `InternationalDrivingPermit`, `OriginalLicenceRequirement` (global) |

**The 2 `pending` claims, explained (a real, disclosed side effect, not a bug):** `thailand.ts` has exactly one literal `status: "pending"` field (`roadRulesGuide`'s speed-limit point). The migration's `directAnswer` confidence is computed conservatively as the *worst* status among a module's points (`aggregateStatus`) — so `roadRulesGuide`'s `directAnswer` claim inherited `pending` from its sibling point, even though the direct-answer sentence itself isn't about speed limits. Flagged in §6 as technical debt, not silently absorbed into the statistics.

**Evidence linkage: 32 of 43 claims (74%) have ≥1 linked evidence entry; 11 do not.** This is the honest result `PHASE_3_DESIGN.md` §7.2 predicted before any code was written — some `confirmed` claims (e.g. `minimumDrivingAge`, two `popularDrivingAreas` entries, several `rentalGuide`/`scooterGuide` points) were never actually GOV.UK-sourced; they were "confirmed" by internal product-logic reasoning rather than external citation. The migration didn't hide this — it made it checkable for the first time (see §5).

---

## 4. Registry & adapter statistics

- **Registry Ownership Matrix compliance:** every registry write goes through exactly one path — `migrateLegacyCountry()` (called once, from `lib/knowledge/bootstrap.ts`). No component, page, or validator rule writes to a registry directly; confirmed by design (register functions are the only exported mutators) and by the fact that nothing outside `lib/knowledge/migration/` and `lib/knowledge/bootstrap.ts` imports a `register*` function.
- **Render Adapter reconstructs all 30 `CountryRecord` fields**, including 2 requiring an explicit type cast (`drivingSide.value`, `idpRequirementLevel.value` — both safe, since the underlying string was copied verbatim from the legacy union-typed field during migration, never re-authored).
- **Memoization:** `resolveCountryView` caches per slug. Added specifically because the validator's VR-12 rule checks `registry[slug] === record` by reference — a real backward-compatibility risk found while wiring the cutover, not a hypothetical one flagged in the design doc and left unaddressed.
- **Equivalence check result: PASS, zero diffs**, on the first real run against the untouched `thailand.ts` — no iteration or fixup was needed.

---

## 5. Validator changes

- **VR-07 is now genuinely implemented** (`deterministic`, not `requires-future-architecture`): it queries `getClaimsByCountry(slug)` and checks every `confirmed` claim has ≥1 `Evidence` entry resolving to a `primary`-classified `Source`. Real result for Thailand: **8 of 33 confirmed claims have no linked primary evidence** — a genuine `FAIL`, and the first time this gap has ever been visible rather than architecturally unqueryable.
- **VR-18 remains `NOT_IMPLEMENTED`** — it needs a module *registry* defining which schema nodes should exist per tier, which Phase 3 was not scoped to build (schema redesign is explicitly out of scope this phase).
- **`docs/RULE_TRACEABILITY.md` regenerated** — VR-07's `kind` (now `deterministic`) and `implementationRef` updated automatically from the rule definition, no hand-editing.
- **Snapshot reviewed before update, per instruction.** The only diff was `VR-07: NOT_IMPLEMENTED -> FAIL`, correctly classified by the snapshot tool as **not a regression** (a rule gaining real coverage and immediately surfacing a pre-existing gap is not "something got worse" — nothing changed about Thailand, only what could be seen). Snapshot updated to this new, reviewed baseline.
- **Full run: 26 rules, 18 passed, 4 failed (VR-03, VR-07, VR-21, VR-22), 3 warnings, 1 not implemented (VR-18).** Every rule other than VR-07 produced the same verdict as the last pre-Phase-3 run — confirming the migration changed *only* what it was supposed to.

---

## 6. Remaining technical debt

1. **`roadRulesGuide.directAnswer`'s claim confidence is `pending` due to conservative aggregation from an unrelated sibling point**, not because the direct-answer sentence itself is unsourced. The aggregation rule (worst-status-wins) is defensible as a default but produces at least one imprecise result already — worth a more granular design if this pattern recurs at country #2.
2. **11 of 43 claims lack evidence linkage**, now visible via VR-07 but not fixed — fixing it means either real additional research (adding primary sources) or deliberately downgrading those claims' confidence to `partially_sourced`. Neither was in scope this phase ("do not fix existing Thailand FAIL/WARN findings").
3. **The evidence-to-claim linkage heuristic is keyword-based and Thailand-specific in its keyword lists** (`TOPIC_KEYWORDS` in `fromLegacyRecord.ts`). It will need new keyword sets — or a better mechanism entirely — for country #2's sources, which will have different topic labels.
4. **Facet entities (RentalVehicle, Motorcycle, Police, Insurance, RoadRules, BorderCrossing, EmergencyService) were not built.** Only `Country`, `Service`, and the three global entities exist in the Entity Registry. Building the rest without a schema-generation consumer would have been speculative work explicitly out of scope ("no schema redesign").
5. **`COUNTRY_REGISTRY`'s backward-compatible constant is computed eagerly at module load** (`ensureKnowledgeBootstrapped()` called at the top of `registry.ts`). This is safe today (one country, synchronous data) but is worth revisiting if the registries ever need async population (e.g., loading from a real database instead of an in-memory bootstrap).
6. **The "identity" term overload flagged in `PHASE_3_STEP1_AMENDMENT_REPORT.md` §3 remains unresolved** — unrelated to this phase's scope, restated here only so it isn't lost.

---

## 7. Implementation risks (found and handled, or found and deferred)

- **Found and fixed:** reference-equality dependency in VR-12 (`registry[slug] === record`) — would have silently started failing post-cutover without memoization. This was anticipated as a category of risk in `PHASE_3_DESIGN.md` §4.3 ("worth stating explicitly rather than leaving implicit") and turned out to be real, not hypothetical.
- **Found and disclosed, not fixed (correctly, per instructions):** the 8-claim evidence gap and the 2-claim pending-aggregation quirk — both are honest results of a faithful mechanical migration, not implementation bugs, and fixing either would mean touching Thailand's content or research state, both explicitly out of scope this phase.
- **Deferred, not encountered as a problem:** async/database-backed registries, facet entity population, a general (non-Thailand-specific) evidence-linkage mechanism — all real future work, none blocking this phase's success criteria.
- **Not found:** no case where the render adapter needed business logic beyond structural assembly (the §7.6 stop condition from `PHASE_3_DESIGN.md` — checked, not triggered). No schema `@id` instability (§7.5 — checked, VR-21/VR-22 remain exactly as before, unchanged by this phase since schema generation itself wasn't touched).

---

## 8. Test results

| Test | Result |
|---|---|
| `npx tsc --noEmit` | Clean |
| `npm run lint` | Clean (1 unused-import warning found and fixed during this phase) |
| `npm run build` | Clean — identical route table, `/countries/[country]` still dynamic |
| `npm run check-country-migration -- thailand` | **PASS — zero diffs** |
| `npm run validate-country -- thailand --verbose --trace` | 26 rules: 18 passed, 4 failed, 3 warnings, 1 not implemented |
| `npm run validate-country -- thailand --check-snapshot` | 1 diff (VR-07), correctly classified not-a-regression, reviewed and snapshot updated |
| Deterministic JSON output | Confirmed — two `--json` runs identical apart from timestamp |
| Visual verification, desktop (1280px) | Hero, flag stripe, all 5 guide tabs, CTAs — matches pre-migration exactly |
| Visual verification, 320px / 375px | No horizontal overflow at either width |
| JSON-LD schema output | 6 graph nodes, same `@type`s as pre-migration (`BreadcrumbList`, `Country`, `Service`, `HowTo`, `FAQPage`, `ItemList`) — unchanged |
| Console/server errors | None |

---

Success criteria from the brief, checked directly: adding country #2 will not require copying Thailand's monolithic record (it can be authored straight into the registries — `migrateLegacyCountry` is only for bootstrapping existing legacy content); adding module #31 will not touch `CoreCountryRecord`; sources are canonical and reusable (`Source` records keyed independently of any one claim); evidence links to specific claims (`Evidence.supportedClaimRefs`, now checked by a real VR-07); entities have stable, schema-consistent identities; Thailand renders through the new architecture end-to-end with zero visible regression.

Stopping here per instruction. Not beginning Thailand content optimization or Country #2 work.
