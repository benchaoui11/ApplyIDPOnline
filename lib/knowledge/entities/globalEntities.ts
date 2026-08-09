// Global entities — defined once, referenced by every country, never
// redefined per-country. IDs reuse SCHEMA_GUIDELINES.md §2's already-
// ratified @id values verbatim (this file does not mint new ones).

import type { Entity } from "./types";

export const ORGANIZATION_ENTITY: Entity = {
  id: "https://applyidponline.com/#organization",
  kind: "Organization",
  label: "Apply IDP Online",
  scope: "global",
  relatedEntityRefs: [],
  aliases: [],
  sameAs: [],
  knowledgeGraphIds: {},
  parentEntityRefs: [],
  childEntityRefs: [],
  categories: ["business"],
};

export const IDP_ENTITY: Entity = {
  id: "https://applyidponline.com/#idp-entity",
  kind: "InternationalDrivingPermit",
  label: "International Driving Permit",
  scope: "global",
  relatedEntityRefs: [],
  aliases: ["IDP", "International Driving Permit"],
  sameAs: [],
  knowledgeGraphIds: {},
  parentEntityRefs: [],
  childEntityRefs: [],
  categories: ["travel-document"],
};

// Not previously listed in SCHEMA_GUIDELINES.md §2's explicit example list,
// but implied by its "the concept ... is defined once, globally" principle
// and by COUNTRY_PLATFORM_MASTER_SPEC.md §7's entity graph. Follows the
// same #fragment pattern as the two entities above.
export const ORIGINAL_LICENCE_ENTITY: Entity = {
  id: "https://applyidponline.com/#original-licence-requirement",
  kind: "OriginalLicenceRequirement",
  label: "Original Driving Licence Requirement",
  scope: "global",
  relatedEntityRefs: [],
  aliases: ["Original Driver's License Requirement"],
  sameAs: [],
  knowledgeGraphIds: {},
  parentEntityRefs: [],
  childEntityRefs: [],
  categories: ["travel-document"],
};

export const GLOBAL_ENTITIES: Entity[] = [ORGANIZATION_ENTITY, IDP_ENTITY, ORIGINAL_LICENCE_ENTITY];
