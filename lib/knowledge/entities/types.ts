// Entity Registry types. See docs/KNOWLEDGE_OBJECTS.md v1.1 §8 and
// docs/PHASE_3_5_REGISTRY_ENRICHMENT.md for the Phase 3.5 additions
// preparing this registry for future Knowledge Graph generation — none of
// which is built this phase. `id` values still reuse
// SCHEMA_GUIDELINES.md §2's already-ratified @id scheme verbatim.

export type EntityKind =
  | "Country"
  | "Service"
  | "InternationalDrivingPermit"
  | "OriginalLicenceRequirement"
  | "DrivingLicence"
  | "RentalVehicle"
  | "Motorcycle"
  | "Police"
  | "Insurance"
  | "RoadRules"
  | "City"
  | "BorderCrossing"
  | "EmergencyService"
  | "Organization";

export type Entity = {
  id: string;
  kind: EntityKind;
  label: string;
  scope: "global" | "country";
  countrySlug?: string;
  relatedEntityRefs: { relation: string; entityId: string }[];
  // Phase 3.5 additions — all typed-but-empty until a real future
  // Knowledge Graph phase populates them; per this project's standing
  // discipline, typed-but-empty is fine, guessed-and-populated is not.
  aliases: string[];
  sameAs: string[]; // URLs to equivalent entities elsewhere (future Wikidata/schema.org canonical pages)
  wikidataId?: string;
  knowledgeGraphIds: Record<string, string>; // keyed by future KG system name
  parentEntityRefs: string[];
  childEntityRefs: string[];
  categories: string[];
};
