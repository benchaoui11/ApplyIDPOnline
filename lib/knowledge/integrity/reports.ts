// Registry Reports: Statistics, Coverage, Dependency, Cross-Registry
// References. The Integrity Report itself is checkIntegrity.ts's findings
// list — kept separate because it answers a different question ("is
// anything broken") than these do ("what does the graph look like").

import { ensureKnowledgeBootstrapped } from "../bootstrap";
import { getAllSources } from "../sources/registry";
import { getAllEvidence } from "../evidence/registry";
import { getAllClaims } from "../claims/registry";
import { getAllKnowledgeObjects } from "../objects/registry";
import { getAllEntities } from "../entities/registry";
import { getAllModules } from "../modules/registry";
import { getAllCoreCountryRecords } from "../core/registry";
import { getAllCountryIdentities } from "../identity/registry";

function countBy<T>(items: T[], keyFn: (item: T) => string): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const item of items) {
    const key = keyFn(item);
    counts[key] = (counts[key] ?? 0) + 1;
  }
  return counts;
}

export function buildRegistryStatistics() {
  ensureKnowledgeBootstrapped();
  const sources = getAllSources();
  const evidence = getAllEvidence();
  const claims = getAllClaims();
  const knowledgeObjects = getAllKnowledgeObjects();
  const entities = getAllEntities();
  const modules = getAllModules();
  const cores = getAllCoreCountryRecords();
  const identities = getAllCountryIdentities();

  return {
    countries: cores.length,
    sources: { total: sources.length, byClassification: countBy(sources, (s) => s.classification), byPublisherType: countBy(sources, (s) => s.publisherType), avgTrustScore: sources.length ? Math.round(sources.reduce((sum, s) => sum + s.trustScore, 0) / sources.length) : null },
    evidence: { total: evidence.length, byStrength: countBy(evidence, (e) => e.evidenceStrength), byReviewStatus: countBy(evidence, (e) => e.reviewStatus) },
    claims: { total: claims.length, byConfidence: countBy(claims, (c) => c.confidence), byScope: countBy(claims, (c) => c.scope), byValidationStatus: countBy(claims, (c) => c.validationStatus) },
    knowledgeObjects: { total: knowledgeObjects.length, byType: countBy(knowledgeObjects, (o) => o.type) },
    entities: { total: entities.length, byKind: countBy(entities, (e) => e.kind), byScope: countBy(entities, (e) => e.scope) },
    modules: { total: modules.length, byType: countBy(modules, (m) => m.moduleType) },
    identities: identities.length,
  };
}

export function buildCoverageReport() {
  ensureKnowledgeBootstrapped();
  const claims = getAllClaims();
  const evidence = getAllEvidence();
  const sources = getAllSources();
  const modules = getAllModules();
  const knowledgeObjects = getAllKnowledgeObjects();

  const confirmedClaims = claims.filter((c) => c.confidence === "confirmed");
  const confirmedWithEvidence = confirmedClaims.filter((c) => c.evidenceRefs.length > 0);
  const primarySources = sources.filter((s) => s.classification === "primary");
  const evidenceWithPrimarySource = evidence.filter((e) => {
    const source = sources.find((s) => s.id === e.sourceId);
    return source?.classification === "primary";
  });
  const koLinkedToModule = knowledgeObjects.filter((o) => modules.some((m) => m.moduleType === "fact" && m.knowledgeObjectRef === o.id));

  const pct = (n: number, d: number) => (d === 0 ? null : Math.round((100 * n) / d));

  return {
    confirmedClaimsWithEvidencePct: pct(confirmedWithEvidence.length, confirmedClaims.length),
    confirmedClaimsWithEvidence: `${confirmedWithEvidence.length}/${confirmedClaims.length}`,
    sourcesPrimaryPct: pct(primarySources.length, sources.length),
    evidenceBackedByPrimarySourcePct: pct(evidenceWithPrimarySource.length, evidence.length),
    knowledgeObjectsLinkedToModulesPct: pct(koLinkedToModule.length, knowledgeObjects.length),
    modulesWithSourceRefsPct: pct(modules.filter((m) => m.sourceRefs.length > 0).length, modules.length),
  };
}

export function buildDependencyReport() {
  ensureKnowledgeBootstrapped();
  const claims = getAllClaims();
  const knowledgeObjects = getAllKnowledgeObjects();

  const claimsWithDependencies = claims.filter((c) => c.dependsOnClaimRefs.length > 0);
  const claimsWithConflicts = claims.filter((c) => c.conflictsWithClaimRefs.length > 0);
  const claimsWithSupersession = claims.filter((c) => c.supersedesClaimRefs.length > 0 || c.supersededByClaimRef);
  const sharedClaims = claims.filter((c) => c.sharedFromClaimRef);
  const objectsWithDependencies = knowledgeObjects.filter((o) => o.dependsOnRefs.length > 0 || o.inheritsFromRef);

  return {
    claimsWithDependencies: claimsWithDependencies.length,
    claimsWithConflicts: claimsWithConflicts.length,
    claimsWithSupersession: claimsWithSupersession.length,
    sharedClaimInstances: sharedClaims.length,
    knowledgeObjectsWithDependencies: objectsWithDependencies.length,
    note:
      claimsWithDependencies.length === 0 && objectsWithDependencies.length === 0
        ? "No dependency/conflict/supersession/inheritance edges exist yet — expected, since only one country (with no cross-claim relationships authored) has been migrated. The fields and cycle-detection algorithm exist and are ready; they are unexercised by real data, not untested code paths."
        : undefined,
  };
}

export function buildCrossRegistryReferenceReport() {
  ensureKnowledgeBootstrapped();
  const sources = getAllSources();
  const evidence = getAllEvidence();
  const claims = getAllClaims();
  const knowledgeObjects = getAllKnowledgeObjects();
  const entities = getAllEntities();
  const modules = getAllModules();

  return {
    "Evidence -> Source": evidence.filter((e) => sources.some((s) => s.id === e.sourceId)).length,
    "Claim -> Evidence": claims.reduce((sum, c) => sum + c.evidenceRefs.length, 0),
    "Claim -> Entity": claims.reduce((sum, c) => sum + c.entityRefs.length, 0),
    "KnowledgeObject -> Claim": knowledgeObjects.reduce((sum, o) => sum + o.claimRefs.length, 0),
    "KnowledgeObject -> Entity": knowledgeObjects.reduce((sum, o) => sum + o.entityRefs.length, 0),
    "Module -> Claim": modules.reduce((sum, m) => sum + (m.moduleType === "narrative" ? m.points.length : m.moduleType === "fact" ? 1 : m.entries.length), 0),
    "Module -> KnowledgeObject": modules.filter((m) => m.moduleType === "fact" && m.knowledgeObjectRef).length,
    "Entity -> Entity (relatedEntityRefs)": entities.reduce((sum, e) => sum + e.relatedEntityRefs.length, 0),
  };
}
