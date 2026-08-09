// Shared search helpers for the FAQ Help Center — used by both the main
// question library and the separate country search, so the two behave
// identically without duplicating logic.

import type { ReactNode } from "react";

// Query-side synonym expansion: typing "car hire" also checks for "rental
// car" in the content, without polluting every item's searchable text with
// every synonym (which would make unrelated items match everything).
const SEARCH_SYNONYMS: Record<string, string[]> = {
  "international licence": ["international driving permit", "international driver's license"],
  "international license": ["international driving permit", "international driver's license"],
  "international permit": ["international driving permit"],
  "international driver's licence": ["international driver's license"],
  "foreign licence": ["driver's license"],
  "foreign license": ["driver's license"],
  "car hire": ["rental car"],
  "digital permit": ["digital"],
  "printed permit": ["printed"],
  licence: ["license"],
};

export function matchesQuery(blob: string, rawQuery: string): boolean {
  const query = rawQuery.trim().toLowerCase();
  if (!query) return true;
  if (blob.includes(query)) return true;
  for (const [alias, canonicals] of Object.entries(SEARCH_SYNONYMS)) {
    if (query.includes(alias) && canonicals.some((c) => blob.includes(c))) return true;
  }
  return false;
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// Wraps literal occurrences of the query in <mark>. Only highlights exact
// substring matches (not synonym-expanded ones), since highlighting text
// the user didn't type would be confusing.
export function highlightText(text: string, rawQuery: string): ReactNode {
  const query = rawQuery.trim();
  if (!query) return text;
  const pattern = new RegExp(`(${escapeRegExp(query)})`, "ig");
  const parts = text.split(pattern);
  if (parts.length === 1) return text;
  return parts.map((part, i) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <mark key={i} style={{ background: "var(--blue-50)", color: "var(--navy)", borderRadius: "3px", padding: "0 1px" }}>
        {part}
      </mark>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}
