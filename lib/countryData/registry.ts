import type { CountryRecord } from "./types";
import { resolveCountryView } from "@/lib/knowledge/render/adapter";
import { ensureKnowledgeBootstrapped } from "@/lib/knowledge/bootstrap";
import { getAllCoreCountryRecords } from "@/lib/knowledge/core/registry";

// The ONLY thing the dynamic route reads to decide what's renderable.
// Adding a country later means adding one legacy record + one migration
// call (or, going forward, authoring directly into the new registries) —
// the route and every component stay untouched. The route's
// generateStaticParams() enumerates this registry's keys to pre-render
// every known slug at build time; a slug not present here still always
// resolves to notFound() below regardless.
//
// As of Phase 3, this function is a thin wrapper over the Render Adapter
// (lib/knowledge/render/adapter.ts) — it no longer returns a hand-authored
// object directly. resolveCountryView() memoizes per slug, so repeated
// calls (including via COUNTRY_REGISTRY below) return the same object
// reference, not just an equal one — see adapter.ts for why that matters.
export function getCountryRecord(slug: string): CountryRecord | undefined {
  return resolveCountryView(slug);
}

// Backward-compatible constant, preserved because existing code (the
// validator's runner, for one) imports it directly to enumerate every
// known country. Computed once at module load, after the knowledge
// bootstrap runs.
ensureKnowledgeBootstrapped();
export const COUNTRY_REGISTRY: Record<string, CountryRecord> = Object.fromEntries(
  getAllCoreCountryRecords()
    .map((core) => [core.slug, resolveCountryView(core.slug)] as const)
    .filter((entry): entry is [string, CountryRecord] => Boolean(entry[1]))
);
