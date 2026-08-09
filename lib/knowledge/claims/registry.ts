import { createStore } from "../shared/store";
import type { Claim } from "./types";

const store = createStore<Claim>();

export const registerClaim = store.register;
export const registerClaims = store.registerMany;
export const getClaim = store.get;
export const getAllClaims = store.getAll;
export const getClaimOverwrittenIds = store.getOverwrittenIds;

export function getClaimsByCountry(countrySlug: string): Claim[] {
  return store.getAll().filter((c) => c.applicableCountries.includes(countrySlug));
}
