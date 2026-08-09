# Phase 3.5 — Registry Enrichment Report

Version: 1.0
Scope: registry enrichment only, per instruction. No Thailand content, rendering, SEO, GEO, or schema output was touched. Verified, not assumed — see §7.

---

## 1. Architecture changes

Every registry gained production-grade fields (trust scoring, lifecycle/versioning, dependency graphs, semantic-web preparation) — all **additive**. Nothing that previously existed changed meaning, and the Render Adapter's output type (`CountryRecord`) is untouched, because the adapter never read the new fields in the first place. Two structural additions beyond field-enrichment:

1. **`FactModule.knowledgeObjectRef`** — closes a real gap the Integrity Checker surfaced on its first run: every `FactModule` had a matching `KnowledgeObject`, but nothing referenced it back, making all 8 Knowledge Objects structurally "unused." Now linked.
2. **A new Registry Integrity Checker** (`lib/knowledge/integrity/`) — a fourth verification tool, distinct in purpose from the other three:

| Tool | Question it answers |
|---|---|
| `validate-country` | Does this country's *content* comply with the governing documents? |
| `check-country-migration` | Does the Render Adapter's output *equal* the legacy record? |
| `check-registry-integrity` | Is the knowledge graph *structurally sound* — no orphans, no broken references, no cycles? |
| `generate-traceability` | Does every validator rule map back to a governing document? |

---

## 2. Registry diagrams

### 2.1 Enriched registry relationships

```
Source ──(id)──────────────────────┐
  ├─ trustScore, governmentLevel    │
  ├─ countryScope, aliases          │
  └─ replaces/replacedBy chain      │
                                    ▼
Evidence ──(sourceId)──────► Source
  ├─ evidenceStrength, category     │
  └─ reviewStatus, jurisdiction     │
       │(supportedClaimRefs)        │
       ▼                            │
Claim ──(evidenceRefs)──────────────┘
  ├─ dependsOn / conflictsWith / supersedes  (graph edges — 0 populated today)
  ├─ sharedFromClaimRef                       (inheritance — 0 populated today)
  └─(entityRefs)──────────────► Entity
                                    ├─ aliases, sameAs, wikidataId (empty)
                                    ├─ knowledgeGraphIds (empty)
                                    └─ parentEntityRefs / childEntityRefs

KnowledgeObject ──(claimRefs, evidenceRefs, entityRefs)──► Claim / Evidence / Entity
  ├─ version, sharedOwner, usedByCountries
  └─(NEW)◄──(knowledgeObjectRef)── FactModule

CountryIdentity
  ├─ regionalGrouping, continent, isoMetadata
  └─ icons / heroAssetRefs / warningStyle (empty — no assets exist)
```

### 2.2 Where enrichment stops (deliberately)

```
Render Adapter ──reads──► { proposition, confidence, id, value fields ONLY }
                            (trustScore, aliases, sameAs, dependency graphs,
                             evidenceStrength, etc. are NEVER read here —
                             this is why Equivalence Checker still passes)
```

---

## 3. Statistics (real, from the enriched registries, verified via `npm run check-registry-integrity`)

| Registry | Count | Notable breakdown |
|---|---|---|
| Sources | 2 | 100% primary, 100% government, avg trust score 90/100 |
| Evidence | 2 | 100% strong, 100% reviewed |
| Claims | 43 | 33 confirmed, 8 partially_sourced, 2 pending · 38 scope C, 5 scope A · 100% validationStatus=validated |
| Knowledge Objects | 8 | One per fact type (driving-side, minimum-driving-age, idp-requirement-level, convention-status, digital-idp-acceptance, vehicle-category-note, emergency-number, roadside-assistance-number) |
| Entities | 5 | 2 country-scoped (Country, Service), 3 global (Organization, IDP, Original Licence Requirement) |
| Modules | 14 | 5 narrative, 8 fact, 1 list |
| Identities | 1 | Thailand, `isFallback: false` |

**Coverage Report:** 76% of confirmed claims have linked evidence (25/33 by the strict primary-source-linked definition VR-07 also checks — see §5); 100% of sources are primary; 100% of evidence resolves to a primary source; 100% of Knowledge Objects are now linked to a module (was 0% before the `knowledgeObjectRef` fix); 86% of modules carry `sourceRefs`.

**Dependency Report:** 0 dependency/conflict/supersession/inheritance edges exist. Expected — only one country, migrated mechanically, with no cross-claim relationships to encode yet. The cycle-detection algorithm is implemented and correct (see §6) but genuinely untested against real cyclical data, which is an honest limitation, not a hidden one.

**Cross-Registry References:** Claim→Evidence: 33 links · Claim→Entity: 43 links · KnowledgeObject→Claim: 8 · KnowledgeObject→Entity: 8 · Module→Claim: 33 · Module→KnowledgeObject: 8 · Entity→Entity: 4.

---

## 4. Integrity findings

**Final state: 0 errors, 0 warnings.** But the path there is the more important finding than the clean result:

**A real false positive was found in the Integrity Checker itself, on its first run, and fixed before this report was written.** The initial "orphan claims" check only looked at `NarrativeModule.points[].claimRef`, missing that `directAnswer` and `solutionNote` claims are tracked via the module's separate, comprehensive `claimRefs` field. This produced 10 false "orphan claim" warnings — every direct-answer and solution-note claim across the 5 narrative modules. Root cause understood, fixed to check `module.claimRefs` (the authoritative full set) instead of the narrower points-only helper, and a second, independent check was added (`module.claimRefs` broken-reference validation) so the two fields can never silently diverge undetected in the future. This is disclosed here rather than only in a code comment because it's the same discipline this whole project has applied to every prior tool: a validator's first result is not automatically trustworthy just because it's new.

---

## 5. Technical debt (carried forward and new)

1. **The 8 confirmed-but-unlinked claims from Phase 3 remain unlinked** (unchanged, correctly — fixing them was out of scope this phase too).
2. **`trustScore` is a new, opinionated concept with no governing-document precedent.** It's deterministic and documented (§`computeTrustScore` in `fromLegacyRecord.ts`), not a per-source judgment call, but no document has formally ratified the 0–100 scale or its weights yet — worth folding into `KNOWLEDGE_OBJECTS.md` or `RESEARCH_STANDARD.md` in a future documentation pass if this field starts driving real decisions.
3. **`REGIONAL_GROUPING_BY_ISO` is a one-entry lookup table** (Thailand only) that will need real entries added per country as migration expands — flagged explicitly as a stub, not hidden as if it were complete.
4. **`sharedOwner`/`usedByCountries` on Knowledge Objects duplicate information already derivable from `scope`/`applicableCountries`** in today's single-country state — their value is unproven until a genuinely shared (cross-country) Knowledge Object exists to exercise the distinction.
5. **The circular-dependency detector and claim-inheritance/supersession machinery are implemented but entirely unexercised by real data** — correct by code review and manual reasoning, not yet correct-by-observed-behavior on real cyclical input.
6. **Entity `sameAs`/`wikidataId`/`knowledgeGraphIds` are typed and empty everywhere**, exactly as intended for "prepare, don't implement" — but this means the Entity Registry's semantic-web readiness is currently aspirational, not demonstrated.

---

## 6. Future readiness (prepared, not built)

| Target | What's ready | What's still missing |
|---|---|---|
| 200+ countries | Every registry is keyed and filterable by country slug; `Source.countryScope`, `Claim.applicableCountries` etc. already support many-to-many | `REGIONAL_GROUPING_BY_ISO` needs real entries; per-country evidence-linkage keyword heuristics are Thailand-specific (flagged in `PHASE_3_MIGRATION_REPORT.md` §6 already) |
| 10,000+ claims | `dependsOnClaimRefs`/`conflictsWithClaimRefs`/`supersedesClaimRefs` graph fields exist; cycle detection is O(V+E) DFS, not quadratic — will scale | Never run against a graph with real edges; no indexing beyond in-memory `Map`/`Set` lookups (fine at this scale, unproven at 10,000+) |
| 5,000+ evidence records | `Evidence.evidenceStrength`/`evidenceCategory`/`reviewStatus` support triage at scale; `independenceClass` already encodes the corroboration discipline `RESEARCH_STANDARD.md` §5 requires | No batch re-review tooling for the 12-month `reReviewDue` policy — still a manual/undesigned process |
| Knowledge Graph | `Entity.sameAs`/`wikidataId`/`knowledgeGraphIds`/`parentEntityRefs`/`childEntityRefs` are typed and structurally correct | Zero populated; no graph-export tooling; explicitly not built this phase |
| AI Search / Semantic Search | `KnowledgeObject.geoRole`, `Claim.proposition` (wording-neutral, structured) are exactly the shape a retrieval system would want | No embedding/indexing pipeline; no export format |
| Schema generation | `Entity.schemaMapping`-adjacent fields exist on `KnowledgeObject`; Entity IDs already equal ratified `@id` values | No generator reads any of this yet — `page.tsx`'s `JsonLd()` is untouched, as required |

---

## 7. Risks

- **Confirmed not-a-risk, verified rather than assumed:** enrichment could have silently changed rendered output if any new field had leaked into the Render Adapter's reconstruction logic. It didn't — `check-country-migration` passed clean both before and after, and the adapter's source code touches none of the new fields (checked directly, not inferred).
- **Real risk, mitigated:** a second integrity-checker false positive of the same *class* as §4's (checking a narrower reference list than the authoritative one) could recur as more reference fields are added in future phases. Mitigation in place: the fix added an independent second check on the broader field specifically so the two can't silently drift without detection.
- **Unmitigated, honestly disclosed:** `trustScore`'s formula has no external validation — it's internally consistent and deterministic, but "is 90 the right number for a primary national-government source" is a policy question this phase answered by necessity, not by governing-document authority.

---

## 8. Recommendations

1. Before country #2, decide whether `trustScore`'s formula needs ratification in a governing document, or whether it stays an internal implementation detail.
2. When country #2 is migrated, deliberately construct at least one cross-country shared Knowledge Object and one Claim dependency edge — the first real exercise of machinery that's currently type-checked but behaviorally unproven.
3. Run `check-registry-integrity` as a standing step in the Freeze Pipeline (`VALIDATION_RULES.md` §... / `ARCHITECTURE_REVIEW.md`'s pipeline table) once CI enforcement is authorized — it currently exists only as a manual command, same status as the other three tools.

---

## 9. Test results

| Test | Result |
|---|---|
| `npx tsc --noEmit` | Clean |
| `npm run lint` | Clean (1 unused-import warning found and fixed during this phase) |
| `npm run build` | Clean, identical route table |
| `npm run validate-country -- thailand --verbose` | 26 rules: 18 passed, 4 failed, 3 warnings, 1 not implemented — **identical to pre-enrichment** |
| `npm run validate-country -- thailand --check-snapshot` | No diff — snapshot needed no update |
| `npm run check-country-migration -- thailand` | **PASS, zero diffs** |
| `npm run check-registry-integrity` | 0 errors, 0 warnings (after fixing the false positive found in §4) |
| Deterministic JSON — validator | Confirmed |
| Deterministic JSON — integrity checker | Confirmed |
| Visual/console/JSON-LD check | No errors, 6 schema nodes, identical to pre-enrichment |

---

Stopping here per instruction. Not continuing automatically.
