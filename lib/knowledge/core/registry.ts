import type { CoreCountryRecord } from "./types";

// createStore requires { id: string }; CoreCountryRecord's natural key is
// `slug`, so it's stored keyed by slug via a thin wrapper rather than
// forcing an `id` field onto a type that KNOWLEDGE_OBJECTS.md v1.1 §2
// defines without one.
const store: Record<string, CoreCountryRecord> = {};

export function registerCoreCountryRecord(record: CoreCountryRecord): void {
  store[record.slug] = record;
}

export function getCoreCountryRecord(slug: string): CoreCountryRecord | undefined {
  return store[slug];
}

export function getAllCoreCountryRecords(): CoreCountryRecord[] {
  return Object.values(store);
}
