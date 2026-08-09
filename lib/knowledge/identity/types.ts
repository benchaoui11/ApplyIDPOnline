// Country Identity Registry types. See docs/KNOWLEDGE_OBJECTS.md v1.1 §10
// and docs/PHASE_3_5_REGISTRY_ENRICHMENT.md for the Phase 3.5 additions.

export type WarningSeverity = "info" | "caution" | "warning";

export type CountryIdentity = {
  id: string;
  countrySlug: string;
  flagColors: string[];
  primaryAccent?: string;
  secondaryAccent?: string;
  badge?: { icon: string; label: string };
  symbolRef?: string;
  patternRef?: string;
  isFallback: boolean;
  // Phase 3.5 additions — typed now, unpopulated until real assets/design
  // decisions exist for them (no icon set, hero photography, or warning
  // treatment has been designed yet).
  icons: { key: string; ref: string }[];
  heroAssetRefs: string[];
  warningStyle?: { severity: WarningSeverity; colorToken: string };
  regionalGrouping: string; // e.g. "Southeast Asia" — finer-grained than CoreCountryRecord.region ("Asia")
  continent: string;
  isoMetadata: { alpha2: string; alpha3?: string; numeric?: string };
};
