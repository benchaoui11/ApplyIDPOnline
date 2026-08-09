import type { MetadataRoute } from "next";
import { COUNTRY_REGISTRY } from "@/lib/countryData/registry";
import { CITY_REGISTRY, cityPublicPath } from "@/lib/cityData/registry";
import { SITE_URL } from "@/lib/schema";

// Static routes with no real per-page "last updated" field in the data
// layer intentionally omit `lastModified` rather than stamp today's date
// on every build — a fabricated freshness signal is worse than none.
// Priority is tiered by commercial/informational weight, not flat 1 for
// everything: home > core commercial > hub/pillar pages > country guides
// (tier-weighted) > about/editorial > legal.
const STATIC_ROUTES: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/apply", priority: 0.9, changeFrequency: "monthly" },
  { path: "/pricing", priority: 0.9, changeFrequency: "monthly" },
  { path: "/how-to-apply", priority: 0.9, changeFrequency: "monthly" },
  { path: "/what-is-idp", priority: 0.8, changeFrequency: "monthly" },
  { path: "/faq", priority: 0.8, changeFrequency: "monthly" },
  { path: "/countries", priority: 0.8, changeFrequency: "monthly" },
  { path: "/about", priority: 0.55, changeFrequency: "yearly" },
  { path: "/contact", priority: 0.55, changeFrequency: "yearly" },
  { path: "/sources", priority: 0.45, changeFrequency: "yearly" },
  { path: "/editorial-policy", priority: 0.45, changeFrequency: "yearly" },
  { path: "/content-review", priority: 0.45, changeFrequency: "yearly" },
  { path: "/legal/terms", priority: 0.3, changeFrequency: "yearly" },
  { path: "/legal/privacy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/legal/cookies", priority: 0.3, changeFrequency: "yearly" },
  { path: "/legal/refund-policy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/legal/disclaimer", priority: 0.3, changeFrequency: "yearly" },
  { path: "/legal/accessibility", priority: 0.3, changeFrequency: "yearly" },
  { path: "/legal/shipping", priority: 0.3, changeFrequency: "yearly" },
  { path: "/legal/dmca", priority: 0.3, changeFrequency: "yearly" },
  { path: "/legal/acceptable-use", priority: 0.3, changeFrequency: "yearly" },
];

// Tier is real editorial signal (lib/countryData/tiers.ts — flagship vs.
// standard vs. lightweight destination), not an arbitrary number, so it's
// a defensible basis for sitemap priority differentiation among country
// pages instead of setting all 40+ of them to the same value.
const COUNTRY_TIER_PRIORITY: Record<1 | 2 | 3, number> = {
  1: 0.75,
  2: 0.65,
  3: 0.55,
};

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  // Generated directly from COUNTRY_REGISTRY — the exact registry the
  // dynamic route (app/countries/[country]/page.tsx) resolves slugs
  // against. A country is never manually re-listed here: add one record
  // to the registry and it appears in the sitemap on the next build.
  const countryEntries: MetadataRoute.Sitemap = Object.values(COUNTRY_REGISTRY).map((country) => ({
    url: `${SITE_URL}/countries/${country.slug}`,
    lastModified: new Date(country.lastVerifiedDate),
    changeFrequency: "monthly",
    priority: COUNTRY_TIER_PRIORITY[country.tier],
  }));

  const cityEntries: MetadataRoute.Sitemap = Object.values(CITY_REGISTRY).map((city) => ({
    url: `${SITE_URL}${cityPublicPath(city.slug)}`,
    lastModified: new Date(city.lastVerifiedDate),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticEntries, ...countryEntries, ...cityEntries];
}
