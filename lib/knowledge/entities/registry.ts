import { createStore } from "../shared/store";
import type { Entity } from "./types";

const store = createStore<Entity>();

export const registerEntity = store.register;
export const registerEntities = store.registerMany;
export const getEntity = store.get;
export const getAllEntities = store.getAll;
export const getEntityOverwrittenIds = store.getOverwrittenIds;

export function getEntitiesByCountry(countrySlug: string): Entity[] {
  return store.getAll().filter((e) => e.countrySlug === countrySlug);
}
