import { createStore } from "../shared/store";
import type { CountryIdentity } from "./types";

const store = createStore<CountryIdentity>();

export const registerCountryIdentity = store.register;
export const getCountryIdentity = store.get;
export const getAllCountryIdentities = store.getAll;

export function getIdentityByCountrySlug(countrySlug: string): CountryIdentity | undefined {
  return store.getAll().find((i) => i.countrySlug === countrySlug);
}
