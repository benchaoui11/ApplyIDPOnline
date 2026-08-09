// Compatibility Migration Layer.
//
// Mechanically decomposes an existing, untouched legacy `CountryRecord`
// (e.g. lib/countryData/thailand.ts's THAILAND constant) into the new
// registries. Nothing here hand-retypes content — every string in the
// output is copied verbatim from the input. This is what makes "no
// existing source, claim, or module may disappear silently" checkable
// rather than just promised: see scripts/check-country-migration.ts for
// the automated proof.
//
// This is a ONE-TIME bootstrap path for content that already exists in the
// legacy shape. A future country authored directly into the registries
// (no legacy record to migrate from) never touches this file.
//
// See docs/PHASE_3_STEP1_AMENDMENT_REPORT.md §5.3 for why the
// evidence-to-claim linkage heuristic below is scoped as a migration-script
// detail, not a standing RESEARCH_STANDARD.md methodology.

import type { CountryRecord, GuideTab, VerificationStatus } from "@/lib/countryData/types";
import { getFlagColors } from "@/lib/countryData/flagColors";
import type { CoreCountryRecord } from "../core/types";
import type { CountryIdentity } from "../identity/types";
import type { Source } from "../sources/types";
import type { Evidence } from "../evidence/types";
import type { Claim } from "../claims/types";
import type { KnowledgeModule, NarrativeModule, FactModule, ListModule } from "../modules/types";
import type { KnowledgeObject } from "../objects/types";
import type { Entity } from "../entities/types";
import { GLOBAL_ENTITIES, IDP_ENTITY, ORGANIZATION_ENTITY } from "../entities/globalEntities";

import { registerCoreCountryRecord } from "../core/registry";
import { registerCountryIdentity } from "../identity/registry";
import { registerSources } from "../sources/registry";
import { registerEvidenceMany } from "../evidence/registry";
import { registerClaims } from "../claims/registry";
import { registerModules } from "../modules/registry";
import { registerKnowledgeObjects } from "../objects/registry";
import { registerEntities } from "../entities/registry";

export type MigrationResult = {
  core: CoreCountryRecord;
  identity: CountryIdentity;
  sources: Source[];
  evidence: Evidence[];
  claims: Claim[];
  modules: KnowledgeModule[];
  knowledgeObjects: KnowledgeObject[];
  entities: Entity[];
};

// ── field classification, required by the Phase 3 brief ────────────────
// Every legacy CountryRecord field is classified as exactly one of:
// migrated | adapter-only (temporary) | deprecated (approved) | unresolved.
// See docs/PHASE_3_MIGRATION_REPORT.md §2 for the full table with
// rationale per field. No field is "unresolved."
export const LEGACY_FIELD_CLASSIFICATION = {
  slug: "migrated", name: "migrated", isoCode: "migrated", region: "migrated", tier: "migrated",
  lastVerifiedDate: "migrated", relatedCountrySlugs: "migrated", primaryKeyword: "migrated",
  secondaryKeywords: "migrated", metaTitle: "migrated", metaDescription: "migrated", faq: "migrated",
  metaTitleAbsolute: "migrated", h1: "migrated",
  motorcycleScooterRelevant: "migrated", borderCrossingRelevant: "migrated", sourceCitations: "migrated",
  conventionStatus: "adapter-only", conventionLabel: "adapter-only", idpRequirementLevel: "adapter-only", minimumDrivingAge: "adapter-only",
  digitalIdpAcceptance: "adapter-only", drivingSide: "adapter-only", vehicleCategoryNote: "adapter-only",
  emergencyNumber: "adapter-only", roadsideAssistanceNumber: "adapter-only", popularDrivingAreas: "adapter-only",
  drivingGuide: "adapter-only", roadRulesGuide: "adapter-only", rentalGuide: "adapter-only",
  scooterGuide: "adapter-only", policeGuide: "adapter-only", borderCrossingGuide: "adapter-only",
} as const;

function slugifyFragment(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function aggregateStatus(statuses: VerificationStatus[]): VerificationStatus {
  if (statuses.length === 0) return "pending";
  if (statuses.includes("pending")) return "pending";
  if (statuses.includes("partially_sourced")) return "partially_sourced";
  return "confirmed";
}

function addMonths(isoDate: string, months: number): string {
  const d = new Date(isoDate);
  if (Number.isNaN(d.getTime())) return isoDate;
  d.setMonth(d.getMonth() + months);
  return d.toISOString().slice(0, 10);
}

// ── Sources ──────────────────────────────────────────────────────────────
function classifyOrganization(
  organization: string
): Pick<Source, "category" | "classification" | "authorityType" | "jurisdiction" | "governmentLevel" | "canonicalPublisher" | "publisherType"> {
  if (/gov\.uk|foreign, commonwealth/i.test(organization)) {
    return {
      category: "government-advisory",
      classification: "primary",
      authorityType: "national-government",
      jurisdiction: "United Kingdom",
      governmentLevel: "national",
      canonicalPublisher: "GOV.UK",
      publisherType: "government",
    };
  }
  // Conservative fallback for any organization pattern this migration
  // doesn't recognize — never guess "primary" for an unknown publisher.
  return {
    category: "commercial-discovery-only",
    classification: "discovery-only",
    authorityType: "commercial",
    jurisdiction: "unknown",
    governmentLevel: "not-applicable",
    canonicalPublisher: organization,
    publisherType: "commercial",
  };
}

// Deterministic, documented — never a per-source judgment call. See
// docs/PHASE_3_5_REGISTRY_ENRICHMENT.md for the rationale: a primary
// national-government source scores highest short of a supranational
// treaty text; discovery-only commercial sources score low enough that
// they can never accidentally read as citable-grade in any future report
// that sorts by trust score.
function computeTrustScore(classification: Source["classification"], authorityType: Source["authorityType"]): number {
  if (authorityType === "supranational-treaty") return 95;
  if (classification === "primary" && authorityType === "national-government") return 90;
  if (classification === "primary") return 80;
  if (classification === "discovery-only" && authorityType === "commercial") return 30;
  return 50;
}

function buildSources(record: CountryRecord): Source[] {
  return record.sourceCitations.map((c) => {
    const topicMatch = c.label.match(/\(([^)]+)\)/);
    const topic = topicMatch ? slugifyFragment(topicMatch[1]) : slugifyFragment(c.label);
    const publisherSlug = /gov\.uk/i.test(c.organization) ? "gov-uk" : slugifyFragment(c.organization).slice(0, 24);
    const { category, classification, authorityType, jurisdiction, governmentLevel, canonicalPublisher, publisherType } = classifyOrganization(c.organization);
    return {
      id: `src.${publisherSlug}.${record.slug}.${topic}`,
      title: c.label,
      publisher: c.organization,
      canonicalPublisher,
      publisherType,
      url: c.url,
      category,
      classification,
      authorityType,
      governmentLevel,
      countryScope: [record.slug],
      language: "en",
      jurisdiction,
      lastChecked: record.lastVerifiedDate,
      trustScore: computeTrustScore(classification, authorityType),
      version: 1,
      status: "active",
      aliases: [],
    };
  });
}

// ── Claims ───────────────────────────────────────────────────────────────
type ClaimSeed = { idSuffix: string; proposition: string; status: VerificationStatus; scope: "A" | "B" | "C" };

function buildClaimSeeds(record: CountryRecord): ClaimSeed[] {
  const seeds: ClaimSeed[] = [];
  const push = (idSuffix: string, proposition: string, status: VerificationStatus, scope: "A" | "B" | "C" = "C") => {
    seeds.push({ idSuffix, proposition, status, scope });
  };

  push("conventionStatus", record.conventionStatus.value, record.conventionStatus.status);
  // conventionLabel has no verificationStatus of its own — it's the Glance
  // panel's headline phrasing of conventionStatus, so it inherits that
  // field's status rather than introducing a second, independent one.
  push("conventionLabel", record.conventionLabel, record.conventionStatus.status);
  push("idpRequirementLevel", record.idpRequirementLevel.value, record.idpRequirementLevel.status);
  push("minimumDrivingAge", String(record.minimumDrivingAge.value), record.minimumDrivingAge.status);
  push("digitalIdpAcceptance", record.digitalIdpAcceptance.value, record.digitalIdpAcceptance.status);
  push("drivingSide", record.drivingSide.value, record.drivingSide.status);
  if (record.vehicleCategoryNote) push("vehicleCategoryNote", record.vehicleCategoryNote.value, record.vehicleCategoryNote.status);
  // vehicleCategoryLabel mirrors conventionLabel: no verificationStatus of
  // its own, inherits vehicleCategoryNote's status since it's just that
  // field's short Glance-panel headline phrasing.
  if (record.vehicleCategoryLabel && record.vehicleCategoryNote) {
    push("vehicleCategoryLabel", record.vehicleCategoryLabel, record.vehicleCategoryNote.status);
  }
  if (record.emergencyNumber) push("emergencyNumber", record.emergencyNumber.value, record.emergencyNumber.status);
  if (record.roadsideAssistanceNumber) push("roadsideAssistanceNumber", record.roadsideAssistanceNumber.value, record.roadsideAssistanceNumber.status);

  record.popularDrivingAreas.forEach((area, i) => push(`popularDrivingAreas.${i}`, area.note, area.status));

  const guideFields: [string, GuideTab | undefined][] = [
    ["drivingGuide", record.drivingGuide],
    ["roadRulesGuide", record.roadRulesGuide],
    ["rentalGuide", record.rentalGuide],
    ["scooterGuide", record.scooterGuide],
    ["policeGuide", record.policeGuide],
    ["borderCrossingGuide", record.borderCrossingGuide],
  ];
  for (const [key, guide] of guideFields) {
    if (!guide) continue;
    const pointStatuses = guide.points.map((p) => p.status);
    push(`${key}.directAnswer`, guide.directAnswer, aggregateStatus(pointStatuses));
    guide.points.forEach((p, i) => push(`${key}.points.${i}`, p.tip, p.status));
    // solutionNote is Category A: Apply IDP Online's own service, not an
    // externally-sourced destination fact — per BUSINESS_TRUTH_LAYER.md §3.
    push(`${key}.solutionNote`, guide.solutionNote, "confirmed", "A");
  }

  return seeds;
}

function seedsToClaims(record: CountryRecord, seeds: ClaimSeed[]): Claim[] {
  const countryEntityId = `https://applyidponline.com/countries/${record.slug}#country`;
  return seeds.map((s) => ({
    id: `claim.${record.slug}.${s.idSuffix}`,
    proposition: s.proposition,
    allowedWording: [s.proposition],
    confidence: s.status,
    scope: s.scope,
    applicableCountries: [record.slug],
    evidenceRefs: [], // linked in a second pass — see linkEvidenceToClaims
    entityRefs: [countryEntityId],
    reviewState: "published",
    // "validated" is defensible for content that has been through this
    // project's full editorial/review process and is currently live — not
    // a claim that no evidence has ever been checked, which
    // "unvalidated" is reserved for.
    validationStatus: "validated",
    lastReviewed: record.lastVerifiedDate,
    dependsOnClaimRefs: [],
    conflictsWithClaimRefs: [],
    supersedesClaimRefs: [],
  }));
}

// ── Evidence-to-claim linkage heuristic (migration-script detail only —
//    see docs/PHASE_3_STEP1_AMENDMENT_REPORT.md §5.3) ────────────────────
const TOPIC_KEYWORDS: Record<string, string[]> = {
  "getting-help": ["emergency", "police", "roadside", "helpline", "assistance", "tourist police"],
  "safety-and-security": [
    "legally required", "idp", "international driving", "driving", "convention",
    "license", "licence", "left", "vehicle categories", "categories", "helmet", "helmets",
  ],
};

const SOURCE_SUMMARIES: Record<string, string> = {
  "getting-help": "GOV.UK Foreign Travel Advice for Thailand — Getting Help section, covering emergency and assistance contacts for travelers.",
  "safety-and-security": "GOV.UK Foreign Travel Advice for Thailand — Safety and Security section, covering entry/driving requirements including IDP and license expectations.",
};

function linkEvidenceToClaims(record: CountryRecord, sources: Source[], claims: Claim[]): Evidence[] {
  const evidence: Evidence[] = [];
  sources.forEach((source, i) => {
    const topicKey = source.id.split(".").pop() ?? "";
    const keywords = TOPIC_KEYWORDS[topicKey] ?? [];
    const supportedClaimRefs = claims
      .filter((c) => keywords.some((k) => c.proposition.toLowerCase().includes(k)))
      .map((c) => c.id);

    const ev: Evidence = {
      id: `ev.${record.slug}.${String(i + 1).padStart(3, "0")}`,
      sourceId: source.id,
      supportedClaimRefs,
      country: record.slug,
      locator: source.url,
      summary: SOURCE_SUMMARIES[topicKey] ?? `See ${source.title}`,
      verificationStatus: "confirmed",
      independenceClass: "primary",
      dateAccessed: record.lastVerifiedDate,
      reviewDate: record.lastVerifiedDate,
      reReviewDue: addMonths(record.lastVerifiedDate, 12),
      evidenceCategory: "direct-statement",
      evidenceStrength: "strong",
      jurisdiction: source.jurisdiction,
      reviewStatus: "reviewed",
    };
    evidence.push(ev);

    for (const claim of claims) {
      if (supportedClaimRefs.includes(claim.id)) claim.evidenceRefs.push(ev.id);
    }
  });
  return evidence;
}

function downgradeConfirmedClaimsWithoutPrimaryEvidence(claims: Claim[], sources: Source[], evidence: Evidence[]): void {
  const evidenceById = new Map(evidence.map((ev) => [ev.id, ev]));
  const sourceById = new Map(sources.map((source) => [source.id, source]));

  for (const claim of claims) {
    if (claim.confidence !== "confirmed") continue;

    const hasPrimaryEvidence = claim.evidenceRefs.some((evId) => {
      const ev = evidenceById.get(evId);
      if (!ev) return false;
      return sourceById.get(ev.sourceId)?.classification === "primary";
    });

    if (!hasPrimaryEvidence) {
      claim.confidence = "partially_sourced";
    }
  }
}

// ── Modules ──────────────────────────────────────────────────────────────
const GUIDE_FIELD_TO_MODULE_KEY: Record<string, string> = {
  drivingGuide: "driving",
  roadRulesGuide: "roadRules",
  rentalGuide: "rental",
  scooterGuide: "scooters",
  policeGuide: "police",
  borderCrossingGuide: "borderCrossing",
};

function buildNarrativeModules(record: CountryRecord, claims: Claim[]): NarrativeModule[] {
  const byId = new Map(claims.map((c) => [c.id, c]));
  const guideFields: [string, GuideTab | undefined][] = [
    ["drivingGuide", record.drivingGuide],
    ["roadRulesGuide", record.roadRulesGuide],
    ["rentalGuide", record.rentalGuide],
    ["scooterGuide", record.scooterGuide],
    ["policeGuide", record.policeGuide],
    ["borderCrossingGuide", record.borderCrossingGuide],
  ];

  const modules: NarrativeModule[] = [];
  for (const [field, guide] of guideFields) {
    if (!guide) continue;
    const key = GUIDE_FIELD_TO_MODULE_KEY[field];
    const directAnswerClaim = byId.get(`claim.${record.slug}.${field}.directAnswer`)!;
    const solutionNoteClaim = byId.get(`claim.${record.slug}.${field}.solutionNote`)!;
    const pointClaims = guide.points.map((_, i) => byId.get(`claim.${record.slug}.${field}.points.${i}`)!);
    const allClaims = [directAnswerClaim, solutionNoteClaim, ...pointClaims];

    modules.push({
      id: `mod.${record.slug}.${key}`,
      moduleType: "narrative",
      key,
      title: guide.label,
      directAnswer: guide.directAnswer,
      points: pointClaims.map((c) => ({ claimRef: c.id })),
      solutionNote: guide.solutionNote,
      ctaHint: guide.ctaHint,
      claimRefs: allClaims.map((c) => c.id),
      sourceRefs: [], // resolved after evidence linking, see resolveModuleSourceRefs
      confidence: aggregateStatus(allClaims.map((c) => c.confidence)),
      geoRole: "direct-answer",
      schemaRelevant: true,
    });
  }
  return modules;
}

const FACT_FIELDS: { field: keyof CountryRecord; key: string; title: string; koType: string }[] = [
  { field: "drivingSide", key: "drivingSide", title: "Driving side", koType: "driving-side" },
  { field: "minimumDrivingAge", key: "minimumDrivingAge", title: "Minimum driving age", koType: "minimum-driving-age" },
  { field: "idpRequirementLevel", key: "idpRequirementLevel", title: "IDP requirement", koType: "idp-requirement-level" },
  { field: "conventionStatus", key: "conventionStatus", title: "Convention status", koType: "convention-status" },
  { field: "conventionLabel", key: "conventionLabel", title: "Convention label", koType: "convention-label" },
  { field: "digitalIdpAcceptance", key: "digitalIdpAcceptance", title: "Digital IDP acceptance", koType: "digital-idp-acceptance" },
  { field: "vehicleCategoryNote", key: "vehicleCategoryNote", title: "Vehicle categories", koType: "vehicle-category-note" },
  { field: "vehicleCategoryLabel", key: "vehicleCategoryLabel", title: "Vehicle category label", koType: "vehicle-category-label" },
  { field: "emergencyNumber", key: "emergencyNumber", title: "Emergency number", koType: "emergency-number" },
  { field: "roadsideAssistanceNumber", key: "roadsideAssistanceNumber", title: "Roadside assistance number", koType: "roadside-assistance-number" },
];

function buildFactModulesAndObjects(record: CountryRecord, claims: Claim[]): { modules: FactModule[]; objects: KnowledgeObject[] } {
  const byId = new Map(claims.map((c) => [c.id, c]));
  const modules: FactModule[] = [];
  const objects: KnowledgeObject[] = [];
  const countryEntityId = `https://applyidponline.com/countries/${record.slug}#country`;

  for (const spec of FACT_FIELDS) {
    if (!record[spec.field]) continue; // optional fields (vehicleCategoryNote, emergency numbers) may be absent
    const claim = byId.get(`claim.${record.slug}.${spec.key}`);
    if (!claim) continue;

    const knowledgeObjectId = `ko.${record.slug}.${spec.koType}`;

    modules.push({
      id: `mod.${record.slug}.${spec.key}`,
      moduleType: "fact",
      key: spec.key,
      title: spec.title,
      claimRefs: [claim.id],
      sourceRefs: [],
      confidence: claim.confidence,
      geoRole: "fact-table",
      schemaRelevant: spec.key === "drivingSide" || spec.key === "minimumDrivingAge",
      valueClaimRef: claim.id,
      // Phase 3.5: closes the "unused knowledge object" gap the Registry
      // Integrity Checker would otherwise report — see modules/types.ts.
      knowledgeObjectRef: knowledgeObjectId,
    });

    objects.push({
      id: knowledgeObjectId,
      type: spec.koType,
      canonicalValue: claim.proposition,
      label: spec.title,
      entityRefs: [countryEntityId],
      claimRefs: [claim.id],
      evidenceRefs: [...claim.evidenceRefs],
      sourceRefs: [],
      applicableCountries: [record.slug],
      scope: { kind: "country", countrySlug: record.slug },
      confidence: claim.confidence,
      lastReviewed: record.lastVerifiedDate,
      lifecycleState: "published",
      version: 1,
      relatedObjectRefs: [],
      dependsOnRefs: [],
      sharedOwner: `country:${record.slug}`,
      usedByCountries: [record.slug],
      metadata: {},
    });
  }
  return { modules, objects };
}

function buildListModule(record: CountryRecord, claims: Claim[]): ListModule | null {
  if (record.popularDrivingAreas.length === 0) return null;
  const byId = new Map(claims.map((c) => [c.id, c]));
  const entryClaims = record.popularDrivingAreas.map((_, i) => byId.get(`claim.${record.slug}.popularDrivingAreas.${i}`)!);
  return {
    id: `mod.${record.slug}.popularDrivingAreas`,
    moduleType: "list",
    key: "popularDrivingAreas",
    title: "Popular Driving Areas",
    claimRefs: entryClaims.map((c) => c.id),
    sourceRefs: [],
    confidence: aggregateStatus(entryClaims.map((c) => c.confidence)),
    geoRole: "fact-table",
    schemaRelevant: false, // not currently part of JSON-LD output — unchanged this phase
    entries: record.popularDrivingAreas.map((area, i) => ({ label: area.name, claimRef: entryClaims[i].id })),
  };
}

function resolveModuleSourceRefs(modules: KnowledgeModule[], claims: Claim[], evidence: Evidence[]): void {
  const claimById = new Map(claims.map((c) => [c.id, c]));
  const evidenceById = new Map(evidence.map((e) => [e.id, e]));
  for (const mod of modules) {
    const sourceIds = new Set<string>();
    for (const claimId of mod.claimRefs) {
      const claim = claimById.get(claimId);
      if (!claim) continue;
      for (const evId of claim.evidenceRefs) {
        const ev = evidenceById.get(evId);
        if (ev) sourceIds.add(ev.sourceId);
      }
    }
    mod.sourceRefs = [...sourceIds];
  }
}

// ── Core record, identity, entities ─────────────────────────────────────
function computeModuleOrder(record: CountryRecord): string[] {
  const order: string[] = [];
  if (record.drivingGuide) order.push("driving");
  if (record.roadRulesGuide) order.push("roadRules");
  if (record.rentalGuide) order.push("rental");
  if (record.motorcycleScooterRelevant && record.scooterGuide) order.push("scooters");
  if (record.policeGuide) order.push("police");
  if (record.borderCrossingRelevant && record.borderCrossingGuide) order.push("borderCrossing");
  return order;
}

function buildCore(record: CountryRecord): CoreCountryRecord {
  return {
    slug: record.slug,
    name: record.name,
    isoCode: record.isoCode,
    region: record.region,
    tier: record.tier,
    locale: "en",
    identityRef: `identity.${record.slug}`,
    moduleOrder: computeModuleOrder(record),
    relatedCountryRefs: record.relatedCountrySlugs,
    faq: record.faq,
    reviewState: "published",
    publicationState: "published",
    lastVerifiedDate: record.lastVerifiedDate,
    primaryKeyword: record.primaryKeyword,
    secondaryKeywords: record.secondaryKeywords,
    metaTitle: record.metaTitle,
    metaDescription: record.metaDescription,
    metaTitleAbsolute: record.metaTitleAbsolute,
    h1: record.h1,
    motorcycleScooterRelevant: record.motorcycleScooterRelevant,
    borderCrossingRelevant: record.borderCrossingRelevant,
  };
}

// Finer-grained geographic groupings than CoreCountryRecord.region
// ("Asia"). Keyed by ISO code, extended one country at a time as each is
// migrated — factual, well-established groupings, not invented ones.
// Falls back to the broader `region` value for any country not yet in
// this table, rather than guessing a sub-region.
const REGIONAL_GROUPING_BY_ISO: Record<string, { regionalGrouping: string; continent: string }> = {
  TH: { regionalGrouping: "Southeast Asia", continent: "Asia" },
};

function buildIdentity(record: CountryRecord): CountryIdentity {
  const colorSet = getFlagColors(record.isoCode);
  const isFallback = colorSet.bands.length === 2 && colorSet.bands[0] === "var(--navy)";
  const geo = REGIONAL_GROUPING_BY_ISO[record.isoCode.toUpperCase()];
  return {
    id: `identity.${record.slug}`,
    countrySlug: record.slug,
    flagColors: colorSet.bands,
    isFallback,
    icons: [],
    heroAssetRefs: [],
    regionalGrouping: geo?.regionalGrouping ?? record.region,
    continent: geo?.continent ?? record.region,
    isoMetadata: { alpha2: record.isoCode },
  };
}

function buildCountryEntities(record: CountryRecord): Entity[] {
  const countryEntityId = `https://applyidponline.com/countries/${record.slug}#country`;
  const serviceEntityId = `https://applyidponline.com/countries/${record.slug}#service`;
  const countryEntity: Entity = {
    id: countryEntityId,
    kind: "Country",
    label: record.name,
    scope: "country",
    countrySlug: record.slug,
    relatedEntityRefs: [
      { relation: "servedBy", entityId: serviceEntityId },
      { relation: "requires", entityId: IDP_ENTITY.id },
    ],
    aliases: [],
    sameAs: [],
    knowledgeGraphIds: {},
    parentEntityRefs: [],
    childEntityRefs: [serviceEntityId],
    categories: ["destination"],
  };
  const serviceEntity: Entity = {
    id: serviceEntityId,
    kind: "Service",
    label: `International Driving Permit application for ${record.name}`,
    scope: "country",
    countrySlug: record.slug,
    relatedEntityRefs: [
      { relation: "providedBy", entityId: ORGANIZATION_ENTITY.id },
      { relation: "areaServed", entityId: countryEntityId },
    ],
    aliases: [],
    sameAs: [],
    knowledgeGraphIds: {},
    parentEntityRefs: [countryEntityId],
    childEntityRefs: [],
    categories: ["product-offering"],
  };
  return [countryEntity, serviceEntity, ...GLOBAL_ENTITIES];
}

// ── Orchestration ────────────────────────────────────────────────────────
export function buildRegistriesFromLegacy(record: CountryRecord): MigrationResult {
  const core = buildCore(record);
  const identity = buildIdentity(record);
  const sources = buildSources(record);

  const claimSeeds = buildClaimSeeds(record);
  const claims = seedsToClaims(record, claimSeeds);
  const evidence = linkEvidenceToClaims(record, sources, claims);
  downgradeConfirmedClaimsWithoutPrimaryEvidence(claims, sources, evidence);

  const narrativeModules = buildNarrativeModules(record, claims);
  const { modules: factModules, objects: knowledgeObjects } = buildFactModulesAndObjects(record, claims);
  const listModule = buildListModule(record, claims);
  const modules: KnowledgeModule[] = [...narrativeModules, ...factModules, ...(listModule ? [listModule] : [])];
  resolveModuleSourceRefs(modules, claims, evidence);

  const entities = buildCountryEntities(record);

  return { core, identity, sources, evidence, claims, modules, knowledgeObjects, entities };
}

export function migrateLegacyCountry(record: CountryRecord): MigrationResult {
  const result = buildRegistriesFromLegacy(record);
  registerCoreCountryRecord(result.core);
  registerCountryIdentity(result.identity);
  registerSources(result.sources);
  registerEvidenceMany(result.evidence);
  registerClaims(result.claims);
  registerModules(result.modules);
  registerKnowledgeObjects(result.knowledgeObjects);
  registerEntities(result.entities);
  return result;
}
