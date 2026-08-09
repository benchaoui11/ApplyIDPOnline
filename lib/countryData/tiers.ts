// Tier architecture — the single canonical definition of what a country
// record's "tier" is meant to signal about its expected content depth.
//
// Previously `CountryRecord.tier` existed in the type but was never read
// anywhere in the codebase — every country would have had to reinvent what
// "Tier 2" or "Tier 3" means from scratch. This file makes tier a real,
// specified concept with one shared definition.
//
// Deliberately NOT wired into component-level conditional rendering yet:
// only a Tier 1 record (Thailand) exists so far, so any tier-driven UI
// branching would be unverified against real Tier 2/3 data. The first real
// consumer of TIER_DEFINITIONS is the Phase 3 validation engine, which
// checks a record's actual depth (FAQ count, GuideTab count, etc.) against
// its declared tier. Component-level branching (e.g. hiding modules for
// lighter tiers) is deferred until there's a genuine Tier 2/3 record to
// build and test that behavior against.
export type Tier = 1 | 2 | 3;

export type TierDefinition = {
  label: string;
  description: string;
  minGuideTabs: number;
  minFaqCount: number;
  requiresPopularDrivingAreas: boolean;
};

export const TIER_DEFINITIONS: Record<Tier, TierDefinition> = {
  1: {
    label: "Tier 1 — Flagship destination",
    description:
      "High-traffic, high-intent destinations (major tourist and rental markets). Full module depth: every relevant \"Before You Drive\" guide, popular driving areas, and a complete FAQ set.",
    minGuideTabs: 4,
    minFaqCount: 8,
    requiresPopularDrivingAreas: true,
  },
  2: {
    label: "Tier 2 — Standard destination",
    description:
      "Moderate-traffic destinations. Core guides (Driving, Road Rules, Rental) and a shorter FAQ set; popular driving areas optional.",
    minGuideTabs: 3,
    minFaqCount: 6,
    requiresPopularDrivingAreas: false,
  },
  3: {
    label: "Tier 3 — Lightweight destination",
    description:
      "Low-traffic, long-tail destinations. Minimum viable page: a Driving guide, core Glance facts, and a short FAQ; other modules optional.",
    minGuideTabs: 1,
    minFaqCount: 4,
    requiresPopularDrivingAreas: false,
  },
};
