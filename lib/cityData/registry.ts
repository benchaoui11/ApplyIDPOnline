import type { CityRecord } from "./types";
import { NEW_YORK_CITY } from "./newYorkCity";

// The ONLY thing the dynamic route reads to decide what's renderable. A
// slug not present here always resolves to notFound() — adding a city
// later means one data file (like newYorkCity.ts) plus one line here.
export const CITY_REGISTRY: Record<string, CityRecord> = {
  "new-york-city": NEW_YORK_CITY,
};

export function getCityRecord(slug: string): CityRecord | undefined {
  return CITY_REGISTRY[slug];
}

// The public URL for a city page follows the "/international-driving-permit-{slug}"
// pattern via a next.config.ts rewrite — this helper keeps that prefix in
// one place so metadata/schema/sitemap never hardcode it separately.
export function cityPublicPath(slug: string): string {
  return `/international-driving-permit-${slug}`;
}
