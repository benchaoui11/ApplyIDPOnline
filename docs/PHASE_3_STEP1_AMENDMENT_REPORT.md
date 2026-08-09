# Phase 3, Step 1 — Documentation Amendment Report

Version: 1.0
Scope: documentation only, per explicit instruction. No implementation code was written, modified, or planned beyond what's already in `PHASE_3_DESIGN.md`.

---

## 1. Every modified section

### `docs/KNOWLEDGE_OBJECTS.md` — v1.0 → v1.1 (full renumbering, 11 sections → 16)

| Old § | New § | Change |
|---|---|---|
| 1 Purpose | 1 | Added one sentence: Knowledge Objects are now assembled from registries, not one flat record |
| 2 Core record | 2 | Shrunk to match `CoreCountryRecord` (§1 of `PHASE_3_DESIGN.md`'s type diagram); added explicit note that `sourceCitations` is now a **derived view** over Source+Evidence, not hand-authored; restated (unchanged) that `faq` stays on the core record |
| 3 Module system | 3 | `NarrativeModule.points` changed from embedded `{tip, status}` to `{claimRef}` — modules now reference claims, they don't duplicate their text. Added §3.5 confirming the 3-archetype model checked out against real Thailand content (`PHASE_3_DESIGN.md` §7.1) |
| 4 Module registry | 4 | Unchanged content |
| — | **5 Claim Registry** | **New.** Full `Claim` type, rationale for separating claims from modules, explicit note that `evidenceRefs` may legitimately be empty |
| — | **6 Evidence Registry** | **New.** Full `Evidence` type, including `independenceClass` — the data-model home for `RESEARCH_STANDARD.md` §5's "derivative sources" judgment call |
| — | **7 Source Registry** | **New.** Full `Source` type, including how `discovery-only` sources are recorded without being citable |
| — | **8 Entity Registry** | **New.** Hub-and-spoke `Entity` type; explicit statement that `id` values are owned by `SCHEMA_GUIDELINES.md` §2, not minted here |
| — | **9 Registry Ownership Matrix** | **New.** Required deliverable #2 — full table below in §2 of this report |
| 5 Country Identity | 10 | Renamed "Country Identity Registry" for consistency with the other five; shape unchanged |
| 6 Tiers | 11 | Unchanged |
| 7 Lifecycle | 12 | Added note that Claim/Evidence/Source now carry their own review-state fields, and a stated (not yet enforced) aggregation rule |
| 8 Naming conventions | 13 | Added registry-ID naming scheme (`claim.`, `ev.`, `src.`, `mod.`, `ko.` prefixes; `Entity.id` as the one exception, being a full URL) |
| 9 Interaction with other documents | 14 | Updated to describe the new registries' relationships |
| 10 Future scalability concerns | 15 | Added one bullet: five registries is more moving parts, only worth it if VR-07 output proves useful, not just noisy |
| 11 Self-critique | 16 | Added new critique: the three-way Claim/Evidence/Source split is itself an untested bet, same category of risk as the original module-archetype bet |

### `docs/RESEARCH_STANDARD.md` — v1.0 → v1.1

- Header: version bump + changelog stating §2–§6 (confidence levels, primary-source bar, discovery-only rule, independence test) are **unchanged** — only the storage shape changed.
- §7 (Citation record requirements): rewritten around `Source` + `Evidence` instead of a flat `sourceCitations` array; explicit statement that an empty `evidenceRefs` array is an honest state, not a violation of this section.
- §9 (Interactions): two bullets updated to name `Claim`/`Evidence` directly instead of "VerificationStatus"/"a matching citation."
- §10 (Future scalability): one bullet added — per-claim evidence linkage is real authoring overhead, untested beyond Thailand's two sources.

### `docs/SCHEMA_GUIDELINES.md` — v1.0 → v1.1

- Header: version bump + changelog stating `@id` values in §2 **do not change** — this remains their sole owner.
- §4: new §4a subsection cross-referencing the Entity Registry, explicit "this document owns, the registry consumes" statement.
- §9 (Interactions): one bullet updated to note the Entity Registry as a future reader of these `@id` values.

### `docs/VALIDATION_RULES.md` — v1.1 → v1.2 (the one edit judged strictly necessary)

- Row 7's wording changed from "has ≥1 matching entry in `sourceCitations`" to "has ≥1 linked `Evidence` entry... resolving to a `primary`-classified `Source`" — the rule's **severity (FAIL) and status (unimplemented until Phase 3 code lands) are unchanged**; only the description was updated so it doesn't cite a data shape (`sourceCitations` as a flat array) that `KNOWLEDGE_OBJECTS.md` no longer describes that way.
- §5's rule-#7 bullet updated to match.
- **Everything else in this document is untouched.** No new rows, no severity changes, no rule-count changes — confirming the "only if strictly necessary" instruction was read narrowly, not as license to revisit the whole document.

### `docs/ARCHITECTURE_REVIEW.md` — v1.0 → v1.1

- Dependency graph (deliverable #4) redrawn to show `KNOWLEDGE_OBJECTS.md`'s internal Source/Evidence/Claim/Entity structure, rather than treating it as a single opaque box. The graph's outer shape — BTL supreme, four parallel presentation layers, `VALIDATION_RULES.md` aggregating everything — is unchanged, because nothing about that outer structure was affected by this amendment.

---

## 2. Registry Ownership Matrix

(Reproduced here for visibility; the authoritative copy lives in `KNOWLEDGE_OBJECTS.md` §9, which is the actual governing location per this report's own logic — this table must not be independently edited in two places going forward.)

| Concept | Canonical owner | Allowed readers | Writers |
|---|---|---|---|
| Source | Source Registry | Evidence Registry, modules/Knowledge Objects (denormalized `sourceRefs`) | Compatibility Migration Layer; future authoring tooling |
| Evidence | Evidence Registry | Claim Registry, Knowledge Object Registry, Render Adapter | Compatibility Migration Layer; future authoring tooling |
| Claim | Claim Registry | Module Registry, Knowledge Object Registry, Render Adapter | Compatibility Migration Layer; future authoring tooling |
| Knowledge Object | Knowledge Object Registry | Module Registry, Entity Registry, Render Adapter | Compatibility Migration Layer; future authoring tooling |
| Entity | Entity Registry | Render Adapter, Knowledge Objects | Compatibility Migration Layer; future authoring tooling (`id` values owned by `SCHEMA_GUIDELINES.md` §2) |
| Module | Module Registry | Render Adapter only | Compatibility Migration Layer; future authoring tooling — never read directly by components |
| Core Country Record | Core Country Record store | Render Adapter | Compatibility Migration Layer; future authoring tooling |
| `CountryRecord` (legacy shape) | **Nothing** — computed, transient | `page.tsx`, all existing components | Only the Render Adapter, in memory, per request |

---

## 3. Every terminology change

- **"Citation" / `sourceCitations`** — not retired (the term and the field name both survive as the Render Adapter's output shape), but as of this amendment it denotes a *derived view* over two more precise concepts: **Source** (the publication) and **Evidence** (the specific, claim-linked support that publication provides). Anywhere a governing document said "citation" and meant "the thing that proves a fact," it now more precisely means "an Evidence record resolving to a primary Source." `RESEARCH_STANDARD.md` §7 and `VALIDATION_RULES.md` row 7 are the two places this mattered enough to rewrite; other mentions of "citation" elsewhere (`BUSINESS_TRUTH_LAYER.md`, `EDITORIAL_GUIDELINES.md`, `GEO_GUIDELINES.md`) use it in a looser, still-accurate sense ("a claim should have a citation") that doesn't need rewriting.
- **"Entity"** — used informally since v1.0 in `SCHEMA_GUIDELINES.md`/`COUNTRY_PLATFORM_MASTER_SPEC.md` to mean "a schema.org node with stable identity." Not redefined — formalized. The Entity Registry is the typed home for a concept that already existed in prose.
- **"Claim"** — new as a first-class data concept, but not a new *word* in this Operating System: `BUSINESS_TRUTH_LAYER.md` has used "claim" throughout (claim-frequency caps, claim-source categories) since it was written. The Claim Registry formalizes exactly the thing that document was already calling a claim.
- **"Registry"** — now names seven things in this system (Module, Claim, Evidence, Source, Entity, Country Identity, plus the pre-existing `COUNTRY_REGISTRY` in code and the informal "module registry"). This is deliberate pattern consistency, not accidental overload — flagged here so it's a documented choice rather than something a future reader has to infer.
- **"GuideTab"** — the pre-Phase-3 code/type name for what `KNOWLEDGE_OBJECTS.md` calls `NarrativeModule`. Left untouched in `ARCHITECTURE_REVIEW.md` and `COUNTRY_PLATFORM_MASTER_SPEC.md` where it accurately describes *past* state (what the code was before Phase 1/2 work) — those mentions are historically correct, not stale terminology to fix.
- **Not changed, flagged as a real pre-existing overload:** "identity" means at least three different things across this Operating System — the visual/brand "Country Identity" system, the IDP's own description as "a translation and identity document" (`BUSINESS_TRUTH_LAYER.md` §4), and generic "identity" fields (name/ISO code/slug) on the core record. Renaming any of these was out of scope for this step and not required to resolve `PHASE_3_DESIGN.md` §7.7's actual gap — noted in §4 below as a remaining ambiguity rather than silently left unmentioned.

---

## 4. Every new relationship

- `Claim.evidenceRefs` → `Evidence.id` (many-to-many: a claim can cite multiple evidence entries; one evidence entry's `supportedClaimRefs` can support multiple claims).
- `Evidence.sourceId` → `Source.id` (many-to-one: many evidence entries can cite the same source).
- `Module` (`NarrativeModule.points[].claimRef`, `FactModule.valueClaimRef`, `ListModule.entries[].claimRef`) → `Claim.id`: modules are now presentation groupings over claims, not independent text containers.
- `KnowledgeObject.claimRefs` / `.evidenceRefs` / `.entityRefs` — a Knowledge Object can reference all three of the concepts below it, per the ownership matrix.
- `Entity.id` ← `SCHEMA_GUIDELINES.md` §2: a **consumes-but-does-not-own** relationship, the first of its kind in this document set — every other cross-document relationship so far has been "document A's rule is checked by document B," this is "registry X stores a value document Y alone defines."
- `VALIDATION_RULES.md` row 7 ↔ `Claim.evidenceRefs`: a validation rule now points at a specific field path in a specific registry, rather than an abstract "the record's citation array," which is what makes the rule mechanically precise for the first time.
- `RESEARCH_STANDARD.md` §5's independence test ↔ `Evidence.independenceClass`: a prose judgment call now has a concrete field to be recorded in, not just reasoned about at authoring time.

---

## 5. Remaining ambiguity (honest, not resolved by this step)

1. **Claim granularity is not fully specified.** `Claim.allowedWording` being an array implies one claim can be expressed multiple ways — but the rule for when two similar rendered points are "the same claim reused" versus "two distinct claims that happen to be similar" isn't pinned down. This is exactly the boundary `VALIDATION_RULES.md` row 15's lexical-similarity heuristic currently guesses at with known false negatives (`VALIDATOR_ARCHITECTURE.md` §6). Left open deliberately — it's an implementation-time decision for the Compatibility Migration Layer (Phase 3, Step 2), not something these documents can settle in the abstract.
2. **`Claim.frequencyCapRef` population is unspecified** — whether a claim gets tagged against a `BUSINESS_TRUTH_LAYER.md` §6 cap automatically (by matching known phrases) or only by manual curation during authoring is not decided here.
3. **The evidence-to-claim linkage heuristic used for Thailand's migration** (keyword matching against citation labels, described in `PHASE_3_DESIGN.md` §3) is treated in this amendment as a **one-time migration-script detail**, not a standing addition to `RESEARCH_STANDARD.md`'s methodology — going forward, new claims and evidence are meant to be authored with explicit links from the start, not inferred. This resolution is stated here explicitly so it doesn't need to be re-derived later: the heuristic lives in code comments in the (not-yet-written) migration script, not as a new numbered rule in `RESEARCH_STANDARD.md`.
4. **The lifecycle aggregation rule** (`KNOWLEDGE_OBJECTS.md` §12 — a country's `reviewState` should reflect its least-advanced constituent claim) is stated as intent only. No tool enforces it, and none is planned in Phase 3's implementation step as currently scoped in `PHASE_3_DESIGN.md`.
5. **The "identity" term overload** (§3 above) remains unresolved — three distinct meanings, same word, across three different documents. Worth a future terminology pass; not blocking anything in Phase 3.

---

## 6. What did not change, stated explicitly

No rule severities, no rule statuses, no schema `@id` values, no Business Truth Layer rules, no editorial/SEO/GEO guidance, and no code changed as a result of this step. `VALIDATION_RULES.md`'s 26 rules remain 26 rules; VR-07 remains `NOT_IMPLEMENTED` until Phase 3's actual implementation lands — this report changes what VR-07's target *means* precisely, not whether it currently passes.

---

Stopping here per instruction. Waiting for direction before Phase 3, Step 2 (implementation) begins.
