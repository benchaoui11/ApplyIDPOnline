// Render Adapter.
//
// Reads the new registries and reconstructs an object shaped EXACTLY like
// today's `CountryRecord` (lib/countryData/types.ts) — the type is
// imported and returned as-is, not a lookalike. This is the one and only
// controlled translation boundary between the new architecture and every
// existing component; nothing under components/ or app/ changes because
// of this file's existence. See docs/KNOWLEDGE_OBJECTS.md v1.1 §9 (the
// Registry Ownership Matrix) — this function is the sole reader of every
// registry for rendering purposes, and writes to none of them.

import type { CountryRecord, GuideTab, PopularArea, SourceCitation, VerificationStatus } from "@/lib/countryData/types";
import { ensureKnowledgeBootstrapped } from "../bootstrap";
import { getCoreCountryRecord } from "../core/registry";
import { getModulesByCountry } from "../modules/registry";
import { getClaim } from "../claims/registry";
import { getEvidenceByCountry } from "../evidence/registry";
import { getSource } from "../sources/registry";
import type { FactModule, KnowledgeModule, ListModule, NarrativeModule } from "../modules/types";

function isNarrative(m: KnowledgeModule): m is NarrativeModule {
  return m.moduleType === "narrative";
}
function isFact(m: KnowledgeModule): m is FactModule {
  return m.moduleType === "fact";
}
function isList(m: KnowledgeModule): m is ListModule {
  return m.moduleType === "list";
}

function narrativeToGuideTab(m: NarrativeModule | undefined): GuideTab | undefined {
  if (!m) return undefined;
  return {
    label: m.title,
    directAnswer: m.directAnswer,
    points: m.points.map((p) => {
      const claim = getClaim(p.claimRef);
      if (!claim) throw new Error(`Render Adapter: dangling claimRef "${p.claimRef}" on module "${m.id}"`);
      return { tip: claim.proposition, status: claim.confidence };
    }),
    solutionNote: m.solutionNote,
    ctaHint: m.ctaHint,
  };
}

function factClaimValue(m: FactModule | undefined): { value: string; status: VerificationStatus } | undefined {
  if (!m) return undefined;
  const claim = getClaim(m.valueClaimRef);
  if (!claim) throw new Error(`Render Adapter: dangling valueClaimRef "${m.valueClaimRef}" on module "${m.id}"`);
  return { value: claim.proposition, status: claim.confidence };
}

function listToPopularAreas(m: ListModule | undefined): PopularArea[] {
  if (!m) return [];
  return m.entries.map((entry) => {
    const claim = getClaim(entry.claimRef);
    if (!claim) throw new Error(`Render Adapter: dangling claimRef "${entry.claimRef}" on module "${m.id}"`);
    return { name: entry.label, note: claim.proposition, status: claim.confidence };
  });
}

function reconstructSourceCitations(slug: string): SourceCitation[] {
  return getEvidenceByCountry(slug)
    .map((ev) => getSource(ev.sourceId))
    .filter((s): s is NonNullable<typeof s> => Boolean(s))
    .map((s) => ({ label: s.title, url: s.url, organization: s.publisher }));
}

// Memoized per slug: the registries are immutable within a process
// lifetime (no live editing), so re-resolving would only ever reconstruct
// an identical object — and some existing code (the validator's VR-12,
// docs/RULE_TRACEABILITY.md) checks `registry[slug] === record` by
// reference. Memoizing preserves that reference-equality assumption
// instead of quietly breaking it — a real backward-compatibility risk
// found while wiring this in, not a hypothetical one; see
// docs/PHASE_3_MIGRATION_REPORT.md.
const resolvedCache = new Map<string, CountryRecord>();

export function resolveCountryView(slug: string): CountryRecord | undefined {
  ensureKnowledgeBootstrapped();
  if (resolvedCache.has(slug)) return resolvedCache.get(slug);

  const core = getCoreCountryRecord(slug);
  if (!core) return undefined;

  const modules = getModulesByCountry(slug);
  const narrativeByKey = new Map(modules.filter(isNarrative).map((m) => [m.key, m]));
  const factByKey = new Map(modules.filter(isFact).map((m) => [m.key, m]));
  const listByKey = new Map(modules.filter(isList).map((m) => [m.key, m]));

  const drivingSideFact = factClaimValue(factByKey.get("drivingSide"));
  const minimumDrivingAgeFact = factClaimValue(factByKey.get("minimumDrivingAge"));
  const idpRequirementLevelFact = factClaimValue(factByKey.get("idpRequirementLevel"));
  const conventionStatusFact = factClaimValue(factByKey.get("conventionStatus"));
  const conventionLabelFact = factClaimValue(factByKey.get("conventionLabel"));
  const digitalIdpAcceptanceFact = factClaimValue(factByKey.get("digitalIdpAcceptance"));
  const vehicleCategoryNoteFact = factClaimValue(factByKey.get("vehicleCategoryNote"));
  const vehicleCategoryLabelFact = factClaimValue(factByKey.get("vehicleCategoryLabel"));
  const emergencyNumberFact = factClaimValue(factByKey.get("emergencyNumber"));
  const roadsideAssistanceNumberFact = factClaimValue(factByKey.get("roadsideAssistanceNumber"));

  if (!drivingSideFact || !minimumDrivingAgeFact || !idpRequirementLevelFact || !conventionStatusFact || !conventionLabelFact || !digitalIdpAcceptanceFact) {
    throw new Error(`Render Adapter: required fact module missing for "${slug}" — migration is incomplete.`);
  }

  const record: CountryRecord = {
    slug: core.slug,
    name: core.name,
    isoCode: core.isoCode,
    region: core.region,
    tier: core.tier,

    conventionStatus: { value: conventionStatusFact.value, status: conventionStatusFact.status },
    conventionLabel: conventionLabelFact.value,
    idpRequirementLevel: {
      // Safe cast: this string was copied verbatim from the legacy union-typed
      // field during migration (fromLegacyRecord.ts) and never re-authored.
      value: idpRequirementLevelFact.value as CountryRecord["idpRequirementLevel"]["value"],
      status: idpRequirementLevelFact.status,
    },
    minimumDrivingAge: { value: Number(minimumDrivingAgeFact.value), status: minimumDrivingAgeFact.status },
    digitalIdpAcceptance: { value: digitalIdpAcceptanceFact.value, status: digitalIdpAcceptanceFact.status },

    drivingSide: {
      value: drivingSideFact.value as CountryRecord["drivingSide"]["value"],
      status: drivingSideFact.status,
    },

    drivingGuide: narrativeToGuideTab(narrativeByKey.get("driving")),
    roadRulesGuide: narrativeToGuideTab(narrativeByKey.get("roadRules")),
    rentalGuide: narrativeToGuideTab(narrativeByKey.get("rental")),
    scooterGuide: narrativeToGuideTab(narrativeByKey.get("scooters")),
    policeGuide: narrativeToGuideTab(narrativeByKey.get("police")),
    borderCrossingGuide: narrativeToGuideTab(narrativeByKey.get("borderCrossing")),

    motorcycleScooterRelevant: core.motorcycleScooterRelevant,
    vehicleCategoryNote: vehicleCategoryNoteFact
      ? { value: vehicleCategoryNoteFact.value, status: vehicleCategoryNoteFact.status }
      : undefined,
    vehicleCategoryLabel: vehicleCategoryLabelFact?.value,

    popularDrivingAreas: listToPopularAreas(listByKey.get("popularDrivingAreas")),

    borderCrossingRelevant: core.borderCrossingRelevant,

    emergencyNumber: emergencyNumberFact ? { value: emergencyNumberFact.value, status: emergencyNumberFact.status } : undefined,
    roadsideAssistanceNumber: roadsideAssistanceNumberFact
      ? { value: roadsideAssistanceNumberFact.value, status: roadsideAssistanceNumberFact.status }
      : undefined,

    faq: core.faq,

    sourceCitations: reconstructSourceCitations(slug),
    lastVerifiedDate: core.lastVerifiedDate,

    relatedCountrySlugs: core.relatedCountryRefs,

    primaryKeyword: core.primaryKeyword,
    secondaryKeywords: core.secondaryKeywords,
    metaTitle: core.metaTitle,
    metaDescription: core.metaDescription,
    metaTitleAbsolute: core.metaTitleAbsolute,
    h1: core.h1,
  };

  resolvedCache.set(slug, record);
  return record;
}
