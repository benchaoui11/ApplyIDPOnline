import { createStore } from "../shared/store";
import type { KnowledgeObject } from "./types";

const store = createStore<KnowledgeObject>();

export const registerKnowledgeObject = store.register;
export const registerKnowledgeObjects = store.registerMany;
export const getKnowledgeObject = store.get;
export const getAllKnowledgeObjects = store.getAll;
export const getKnowledgeObjectOverwrittenIds = store.getOverwrittenIds;

export function getKnowledgeObjectsByCountry(countrySlug: string): KnowledgeObject[] {
  return store.getAll().filter((o) => o.applicableCountries.includes(countrySlug));
}
