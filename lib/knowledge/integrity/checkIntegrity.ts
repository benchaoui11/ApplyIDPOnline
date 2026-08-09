// Registry Integrity Checker.
//
// Walks every registry (after bootstrap) and reports structural problems
// that the type system alone cannot catch — dangling references, orphaned
// records, duplicate IDs, circular dependencies. This is a *structural*
// linter for the knowledge graph itself, complementary to (never
// overlapping with) scripts/validate-country.ts (which checks a country's
// *content* against governing documents) and
// scripts/check-country-migration.ts (which checks the Render Adapter's
// output against the legacy record). Three different questions, three
// different tools — see docs/PHASE_3_5_REGISTRY_ENRICHMENT.md.

import { ensureKnowledgeBootstrapped } from "../bootstrap";
import { getAllSources, getSourceOverwrittenIds } from "../sources/registry";
import { getAllEvidence, getEvidenceOverwrittenIds } from "../evidence/registry";
import { getAllClaims, getClaimOverwrittenIds } from "../claims/registry";
import { getAllKnowledgeObjects, getKnowledgeObjectOverwrittenIds } from "../objects/registry";
import { getAllEntities, getEntityOverwrittenIds } from "../entities/registry";
import { getAllModules, getModuleOverwrittenIds } from "../modules/registry";
import { getAllCoreCountryRecords } from "../core/registry";
import { GLOBAL_ENTITIES } from "../entities/globalEntities";
import type { KnowledgeModule } from "../modules/types";
import type { Claim } from "../claims/types";

export type IntegrityFinding = { severity: "error" | "warning"; check: string; message: string };

const ID_PREFIX_BY_REGISTRY: Record<string, RegExp> = {
  claim: /^claim\./,
  evidence: /^ev\./,
  source: /^src\./,
  module: /^mod\./,
  knowledgeObject: /^ko\./,
  identity: /^identity\./,
  entity: /^https:\/\//, // Entity IDs are full schema @id URLs by design
};

function pointClaimRefs(m: KnowledgeModule): string[] {
  if (m.moduleType === "narrative") return m.points.map((p) => p.claimRef);
  if (m.moduleType === "fact") return [m.valueClaimRef];
  return m.entries.map((e) => e.claimRef);
}

export function checkRegistryIntegrity(): IntegrityFinding[] {
  ensureKnowledgeBootstrapped();
  const findings: IntegrityFinding[] = [];

  const sources = getAllSources();
  const evidence = getAllEvidence();
  const claims = getAllClaims();
  const knowledgeObjects = getAllKnowledgeObjects();
  const entities = getAllEntities();
  const modules = getAllModules();

  const sourceIds = new Set(sources.map((s) => s.id));
  const evidenceIds = new Set(evidence.map((e) => e.id));
  const claimIds = new Set(claims.map((c) => c.id));
  const knowledgeObjectIds = new Set(knowledgeObjects.map((o) => o.id));
  const entityIds = new Set(entities.map((e) => e.id));

  // 1. Duplicate IDs
  for (const [label, ids] of [
    ["Source", getSourceOverwrittenIds()],
    ["Evidence", getEvidenceOverwrittenIds()],
    ["Claim", getClaimOverwrittenIds()],
    ["KnowledgeObject", getKnowledgeObjectOverwrittenIds()],
    ["Entity", getEntityOverwrittenIds()],
    ["Module", getModuleOverwrittenIds()],
  ] as const) {
    for (const id of ids) {
      findings.push({ severity: "error", check: "duplicate-ids", message: `${label} id "${id}" was registered more than once — a later registration silently overwrote an earlier one.` });
    }
  }

  // 2. Missing canonical IDs (format/namespace check)
  const checkIdFormat = (label: string, id: string, pattern: RegExp) => {
    if (!id || !pattern.test(id)) {
      findings.push({ severity: "error", check: "missing-canonical-ids", message: `${label} id "${id}" does not match the expected namespace pattern ${pattern}.` });
    }
  };
  sources.forEach((s) => checkIdFormat("Source", s.id, ID_PREFIX_BY_REGISTRY.source));
  evidence.forEach((e) => checkIdFormat("Evidence", e.id, ID_PREFIX_BY_REGISTRY.evidence));
  claims.forEach((c) => checkIdFormat("Claim", c.id, ID_PREFIX_BY_REGISTRY.claim));
  knowledgeObjects.forEach((o) => checkIdFormat("KnowledgeObject", o.id, ID_PREFIX_BY_REGISTRY.knowledgeObject));
  entities.forEach((e) => checkIdFormat("Entity", e.id, ID_PREFIX_BY_REGISTRY.entity));
  modules.forEach((m) => checkIdFormat("Module", m.id, ID_PREFIX_BY_REGISTRY.module));

  // 3. Broken references — every *Ref/*Refs field across every registry
  for (const claim of claims) {
    for (const ref of claim.evidenceRefs) {
      if (!evidenceIds.has(ref)) findings.push({ severity: "error", check: "broken-references", message: `Claim "${claim.id}" references missing Evidence "${ref}".` });
    }
    for (const ref of claim.entityRefs) {
      if (!entityIds.has(ref)) findings.push({ severity: "error", check: "broken-references", message: `Claim "${claim.id}" references missing Entity "${ref}".` });
    }
    for (const ref of [...claim.dependsOnClaimRefs, ...claim.conflictsWithClaimRefs, ...claim.supersedesClaimRefs]) {
      if (!claimIds.has(ref)) findings.push({ severity: "error", check: "broken-references", message: `Claim "${claim.id}" references missing Claim "${ref}".` });
    }
    if (claim.supersededByClaimRef && !claimIds.has(claim.supersededByClaimRef)) {
      findings.push({ severity: "error", check: "broken-references", message: `Claim "${claim.id}" supersededByClaimRef points to missing Claim "${claim.supersededByClaimRef}".` });
    }
    if (claim.sharedFromClaimRef && !claimIds.has(claim.sharedFromClaimRef)) {
      findings.push({ severity: "error", check: "broken-references", message: `Claim "${claim.id}" sharedFromClaimRef points to missing Claim "${claim.sharedFromClaimRef}".` });
    }
  }
  for (const ev of evidence) {
    if (!sourceIds.has(ev.sourceId)) findings.push({ severity: "error", check: "broken-references", message: `Evidence "${ev.id}" references missing Source "${ev.sourceId}".` });
    for (const ref of ev.supportedClaimRefs) {
      if (!claimIds.has(ref)) findings.push({ severity: "error", check: "broken-references", message: `Evidence "${ev.id}" references missing Claim "${ref}".` });
    }
  }
  for (const obj of knowledgeObjects) {
    for (const ref of obj.claimRefs) if (!claimIds.has(ref)) findings.push({ severity: "error", check: "broken-references", message: `KnowledgeObject "${obj.id}" references missing Claim "${ref}".` });
    for (const ref of obj.evidenceRefs) if (!evidenceIds.has(ref)) findings.push({ severity: "error", check: "broken-references", message: `KnowledgeObject "${obj.id}" references missing Evidence "${ref}".` });
    for (const ref of obj.entityRefs) if (!entityIds.has(ref)) findings.push({ severity: "error", check: "broken-references", message: `KnowledgeObject "${obj.id}" references missing Entity "${ref}".` });
    for (const ref of obj.dependsOnRefs) if (!knowledgeObjectIds.has(ref)) findings.push({ severity: "error", check: "broken-references", message: `KnowledgeObject "${obj.id}" dependsOnRefs points to missing KnowledgeObject "${ref}".` });
    if (obj.inheritsFromRef && !knowledgeObjectIds.has(obj.inheritsFromRef)) findings.push({ severity: "error", check: "broken-references", message: `KnowledgeObject "${obj.id}" inheritsFromRef points to missing KnowledgeObject "${obj.inheritsFromRef}".` });
  }
  for (const entity of entities) {
    for (const rel of entity.relatedEntityRefs) if (!entityIds.has(rel.entityId)) findings.push({ severity: "error", check: "broken-references", message: `Entity "${entity.id}" relatedEntityRefs points to missing Entity "${rel.entityId}".` });
    for (const ref of [...entity.parentEntityRefs, ...entity.childEntityRefs]) if (!entityIds.has(ref)) findings.push({ severity: "error", check: "broken-references", message: `Entity "${entity.id}" parent/child ref points to missing Entity "${ref}".` });
  }
  for (const mod of modules) {
    for (const ref of pointClaimRefs(mod)) if (!claimIds.has(ref)) findings.push({ severity: "error", check: "broken-references", message: `Module "${mod.id}" references missing Claim "${ref}".` });
    // module.claimRefs is a separate, denormalized field (the FULL set of
    // claims a module touches, including directAnswer/solutionNote on
    // NarrativeModule — not just its points) — checked independently so a
    // future divergence between the two is itself a broken-reference
    // finding, not silently trusted.
    for (const ref of mod.claimRefs) if (!claimIds.has(ref)) findings.push({ severity: "error", check: "broken-references", message: `Module "${mod.id}" claimRefs references missing Claim "${ref}".` });
    if (mod.moduleType === "fact" && mod.knowledgeObjectRef && !knowledgeObjectIds.has(mod.knowledgeObjectRef)) {
      findings.push({ severity: "error", check: "broken-references", message: `Module "${mod.id}" knowledgeObjectRef points to missing KnowledgeObject "${mod.knowledgeObjectRef}".` });
    }
  }

  // 4. Orphan claims — not referenced by any module or knowledge object.
  // Uses module.claimRefs (the module's full claim set — directAnswer +
  // solutionNote + points on a NarrativeModule, not just points) rather
  // than pointClaimRefs() alone; an earlier version of this check used
  // pointClaimRefs() here and produced 10 false-positive "orphan" claims
  // for every directAnswer/solutionNote claim, which module.claimRefs
  // already legitimately references. Found and fixed before this report
  // shipped — see docs/PHASE_3_5_REGISTRY_ENRICHMENT.md.
  const claimRefsUsedByModules = new Set(modules.flatMap((m) => m.claimRefs));
  const claimRefsUsedByObjects = new Set(knowledgeObjects.flatMap((o) => o.claimRefs));
  for (const claim of claims) {
    if (!claimRefsUsedByModules.has(claim.id) && !claimRefsUsedByObjects.has(claim.id)) {
      findings.push({ severity: "warning", check: "orphan-claims", message: `Claim "${claim.id}" is not referenced by any Module or KnowledgeObject.` });
    }
  }

  // 5. Orphan evidence — not referenced by any claim
  const evidenceRefsUsedByClaims = new Set(claims.flatMap((c) => c.evidenceRefs));
  for (const ev of evidence) {
    if (!evidenceRefsUsedByClaims.has(ev.id)) {
      findings.push({ severity: "warning", check: "orphan-evidence", message: `Evidence "${ev.id}" is not referenced by any Claim.` });
    }
  }

  // 6. Orphan entities — not referenced anywhere, excluding global entities (legitimate roots)
  const globalEntityIds = new Set(GLOBAL_ENTITIES.map((e) => e.id));
  const entityRefsUsedElsewhere = new Set<string>([
    ...claims.flatMap((c) => c.entityRefs),
    ...knowledgeObjects.flatMap((o) => o.entityRefs),
    ...entities.flatMap((e) => [...e.relatedEntityRefs.map((r) => r.entityId), ...e.parentEntityRefs, ...e.childEntityRefs]),
  ]);
  for (const entity of entities) {
    if (!globalEntityIds.has(entity.id) && !entityRefsUsedElsewhere.has(entity.id)) {
      findings.push({ severity: "warning", check: "orphan-entities", message: `Entity "${entity.id}" is not referenced by any Claim, KnowledgeObject, or other Entity.` });
    }
  }

  // 7. Unused knowledge objects — not referenced by any FactModule.knowledgeObjectRef
  const koRefsUsedByModules = new Set(modules.filter((m): m is Extract<KnowledgeModule, { moduleType: "fact" }> => m.moduleType === "fact").map((m) => m.knowledgeObjectRef).filter((r): r is string => Boolean(r)));
  for (const obj of knowledgeObjects) {
    if (!koRefsUsedByModules.has(obj.id)) {
      findings.push({ severity: "warning", check: "unused-knowledge-objects", message: `KnowledgeObject "${obj.id}" is not referenced by any Module.` });
    }
  }

  // 8. Invalid ownership — reference fields must be strings, never embedded objects
  // (Enforced by the type system for anything written through normal TS
  // code; this is a defensive runtime check for anything that reaches the
  // registry through an `any`-typed path, e.g. a future non-TS import
  // script.)
  const isStringArray = (v: unknown): v is string[] => Array.isArray(v) && v.every((x) => typeof x === "string");
  for (const claim of claims as unknown as Record<string, unknown>[]) {
    if (!isStringArray(claim.evidenceRefs)) findings.push({ severity: "error", check: "invalid-ownership", message: `Claim "${claim.id}" evidenceRefs must be an array of string IDs, not embedded objects.` });
  }

  // 9. Circular dependencies (Claim.dependsOnClaimRefs graph)
  findings.push(...detectCycles(claims));

  // 10. Duplicate aliases
  const aliasOwners = new Map<string, string[]>();
  for (const s of sources) for (const alias of s.aliases) aliasOwners.set(alias, [...(aliasOwners.get(alias) ?? []), s.id]);
  for (const e of entities) for (const alias of e.aliases) aliasOwners.set(alias, [...(aliasOwners.get(alias) ?? []), e.id]);
  for (const [alias, owners] of aliasOwners) {
    if (owners.length > 1) findings.push({ severity: "warning", check: "duplicate-aliases", message: `Alias "${alias}" is claimed by more than one record: ${owners.join(", ")}.` });
  }

  // Sanity: every country in the Core registry has an identity and at least a driving-side module.
  for (const core of getAllCoreCountryRecords()) {
    if (!modules.some((m) => m.id.startsWith(`mod.${core.slug}.`))) {
      findings.push({ severity: "error", check: "broken-references", message: `Core record "${core.slug}" has no modules registered at all.` });
    }
  }

  return findings;
}

function detectCycles(claims: Claim[]): IntegrityFinding[] {
  const graph = new Map(claims.map((c) => [c.id, c.dependsOnClaimRefs]));
  const findings: IntegrityFinding[] = [];
  const visiting = new Set<string>();
  const visited = new Set<string>();

  function visit(id: string, path: string[]): void {
    if (visited.has(id)) return;
    if (visiting.has(id)) {
      findings.push({ severity: "error", check: "circular-dependencies", message: `Circular claim dependency: ${[...path, id].join(" -> ")}.` });
      return;
    }
    visiting.add(id);
    for (const dep of graph.get(id) ?? []) visit(dep, [...path, id]);
    visiting.delete(id);
    visited.add(id);
  }

  for (const id of graph.keys()) visit(id, []);
  return findings;
}
