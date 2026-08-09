// Country Directory — the single source of truth for the /countries listing
// page. Two kinds of entries:
//  - hasGuide: true  → the country has a real page in COUNTRY_REGISTRY;
//    the card links straight to it.
//  - hasGuide: false → the country is on the broader marketing list
//    (lib/destinations.ts) but has no dedicated guide yet; the card is
//    still shown (so no registered destination is hidden), but links to
//    /apply with the destination pre-filled instead of a route that would
//    404.
// Nothing here is hand-maintained per country beyond that distinction: name,
// ISO code, region, and href all come straight from the registry or
// DESTINATIONS. The only editorial input is DESTINATIONS' existing
// `popular` flag, which already existed before this file.

import { COUNTRY_REGISTRY } from "./registry";
import type { CountryRecord } from "./types";
import { DESTINATIONS } from "@/lib/destinations";

export type DirectoryEntry = {
  slug: string;
  name: string;
  isoCode: string;
  region: string;
  popular: boolean;
  hasGuide: boolean;
  subtitle: string;
  href: string;
  aliases: string[];
};

// Common alternate names travelers actually search with. Only defined for
// slugs that exist in the registry — an alias for a country without a page
// would be dead weight.
const ALIASES: Record<string, string[]> = {
  "united-states": ["usa", "us"],
  "united-kingdom": ["uk"],
  "united-arab-emirates": ["uae"],
};

// Fixed, deterministic display order for region filters — not derived from
// object insertion order, which would otherwise follow the arbitrary order
// countries were added to the knowledge bootstrap.
export const DIRECTORY_REGION_ORDER = ["Asia", "Europe", "Americas", "Middle East", "Africa", "Oceania"] as const;

// Traffic-informed order for the "Popular" filter, sourced from Semrush
// search-volume data for "international driving permit {country}" across
// every slug DESTINATIONS already marks popular (checked 2026-08 — see
// completion report). Ties broken alphabetically. Japan and Italy
// outrank the United States on this term, so this intentionally is NOT
// alphabetical and NOT US-first — it reflects actual measured demand
// rather than an assumption.
const POPULAR_TRAFFIC_ORDER = [
  "japan", "italy", "united-states", "france", "united-kingdom", "spain",
  "mexico", "thailand", "ireland", "india", "greece", "philippines",
  "switzerland", "australia", "hong-kong", "nigeria", "turkey",
  "argentina", "austria", "chile", "indonesia", "poland", "belgium",
  "denmark", "netherlands", "norway", "peru", "romania", "sri-lanka",
  "sweden", "united-arab-emirates", "singapore",
];

const POPULAR_SLUGS = new Set(DESTINATIONS.filter((d) => d.popular).map((d) => d.slug));

// Card subtitle, derived only from fields the record actually carries — no
// per-country copywriting, no legal conclusions. Priority order: a country
// with a border-crossing guide gets that label (it's the most specific,
// highest-intent case); otherwise a country with real scooter-guide content
// gets the rental+scooter label; otherwise every Tier 1 record has a rental
// guide, so that's the default; the last branch only exists as a safety net
// for a future record built without one.
function subtitleFor(record: CountryRecord): string {
  if (record.borderCrossingRelevant && record.borderCrossingGuide) return "Border crossing driving guide";
  if (record.motorcycleScooterRelevant && record.scooterGuide) return "Scooter & rental driving guide";
  if (record.rentalGuide) return "Rental car driving guide";
  return "Foreign licence driving guide";
}

export function getCountryDirectory(): DirectoryEntry[] {
  const entries = DESTINATIONS.map((dest): DirectoryEntry => {
    const record = COUNTRY_REGISTRY[dest.slug];
    if (record) {
      return {
        slug: record.slug,
        name: record.name,
        isoCode: record.isoCode,
        region: record.region,
        popular: POPULAR_SLUGS.has(record.slug),
        hasGuide: true,
        subtitle: subtitleFor(record),
        href: `/countries/${record.slug}`,
        aliases: ALIASES[record.slug] ?? [],
      };
    }
    return {
      slug: dest.slug,
      name: dest.country,
      isoCode: dest.code,
      region: dest.region,
      popular: POPULAR_SLUGS.has(dest.slug),
      hasGuide: false,
      subtitle: "Apply for this destination",
      href: `/apply?destination=${encodeURIComponent(dest.country)}`,
      aliases: ALIASES[dest.slug] ?? [],
    };
  });
  return entries.sort((a, b) => a.name.localeCompare(b.name));
}

export function sortByPopularTraffic(entries: DirectoryEntry[]): DirectoryEntry[] {
  const rank = (slug: string) => {
    const i = POPULAR_TRAFFIC_ORDER.indexOf(slug);
    return i === -1 ? POPULAR_TRAFFIC_ORDER.length : i;
  };
  return [...entries].sort((a, b) => rank(a.slug) - rank(b.slug) || a.name.localeCompare(b.name));
}
