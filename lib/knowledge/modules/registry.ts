import { createStore } from "../shared/store";
import type { KnowledgeModule } from "./types";

const store = createStore<KnowledgeModule>();

export const registerModule = store.register;
export const registerModules = store.registerMany;
export const getModule = store.get;
export const getAllModules = store.getAll;
export const getModuleOverwrittenIds = store.getOverwrittenIds;

// Module IDs are namespaced "mod.{countrySlug}.{key}" (see naming
// convention in docs/KNOWLEDGE_OBJECTS.md v1.1 §13) — filtering by that
// prefix is how modules are scoped to a country, since KnowledgeModule
// itself carries no explicit countrySlug field (it's a presentation
// grouping, not a country-record concept).
export function getModulesByCountry(countrySlug: string): KnowledgeModule[] {
  const prefix = `mod.${countrySlug}.`;
  return store.getAll().filter((m) => m.id.startsWith(prefix));
}
