import { createStore } from "../shared/store";
import type { Evidence } from "./types";

const store = createStore<Evidence>();

export const registerEvidence = store.register;
export const registerEvidenceMany = store.registerMany;
export const getEvidence = store.get;
export const getAllEvidence = store.getAll;
export const getEvidenceOverwrittenIds = store.getOverwrittenIds;

export function getEvidenceByCountry(countrySlug: string): Evidence[] {
  return store.getAll().filter((e) => e.country === countrySlug);
}

export function getEvidenceForClaim(claimId: string): Evidence[] {
  return store.getAll().filter((e) => e.supportedClaimRefs.includes(claimId));
}
