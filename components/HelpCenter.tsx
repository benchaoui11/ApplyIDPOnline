"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import Link from "next/link";
import type { FaqCategoryId, FaqItem } from "@/lib/faqData";
import { highlightText, matchesQuery } from "@/components/faq/searchUtils";

const CHEVRON = (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true" className="faq-chevron">
    <path d="M4 7l5 5 5-5" stroke="var(--blue)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CLEAR_ICON = (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M3 3l8 8M11 3l-8 8" stroke="var(--text-light)" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

type Category = { id: FaqCategoryId; label: string; description: string };

function buildBlob(item: FaqItem, categoryLabel: string): string {
  return [item.q, item.a, categoryLabel, "idp", "international driving permit", "international driver's license", ...(item.aliases ?? [])]
    .join(" ")
    .toLowerCase();
}

// Non-country items only — country questions have their own dedicated
// search section (CountryFaqSearch) so the two never visually mix.
//
// `children` (Most Searched / Browse by Topic / Featured Guidance — all
// plain server components) render between the search bar and the filtered
// library, matching the requested page order while keeping this the only
// client component that owns search state. They're hidden while a search
// or category filter is active, since curated browse aids compete with
// actual results at that point.
export default function HelpCenter({ items, categories, children }: { items: FaqItem[]; categories: Category[]; children?: ReactNode }) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<FaqCategoryId | "all">("all");
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());

  const categoryLabelById = useMemo(() => new Map(categories.map((c) => [c.id, c.label])), [categories]);

  const indexed = useMemo(
    () => items.map((item) => ({ item, blob: buildBlob(item, categoryLabelById.get(item.category) ?? "") })),
    [items, categoryLabelById]
  );

  const filtered = useMemo(() => {
    return indexed
      .filter(({ item }) => activeCategory === "all" || item.category === activeCategory)
      .filter(({ blob }) => matchesQuery(blob, query))
      .map(({ item }) => item);
  }, [indexed, query, activeCategory]);

  const grouped = useMemo(() => {
    const map = new Map<FaqCategoryId, FaqItem[]>();
    for (const item of filtered) {
      const list = map.get(item.category) ?? [];
      list.push(item);
      map.set(item.category, list);
    }
    return categories.filter((c) => map.has(c.id)).map((c) => ({ category: c, items: map.get(c.id)! }));
  }, [filtered, categories]);

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    const match = hash.match(/^faq-(.+)$/);
    if (!match) return;
    const id = match[1];
    if (!items.some((i) => i.id === id)) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpenIds((prev) => new Set(prev).add(id));
    const el = document.getElementById(`faq-${id}`);
    el?.scrollIntoView({ block: "start" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function toggle(id: string) {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const hasFilter = query.trim() !== "" || activeCategory !== "all";
  const countLabel = hasFilter ? `${filtered.length} of ${items.length} questions` : `${items.length} questions`;

  return (
    <div id="help-center">
      <div className="faq-search-sticky">
        <search style={{ display: "block" }}>
          <div style={{ position: "relative" }}>
            <label htmlFor="faq-search" className="visually-hidden">
              Search the FAQ by question, answer, category, or country
            </label>
            <svg width="18" height="18" viewBox="0 0 16 16" fill="none" style={{ position: "absolute", left: "18px", top: "50%", transform: "translateY(-50%)" }} aria-hidden="true">
              <circle cx="7" cy="7" r="5.5" stroke="var(--text-light)" strokeWidth="1.4" />
              <path d="M11 11l3.5 3.5" stroke="var(--text-light)" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
            <input
              id="faq-search"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search questions — validity, rental cars, Japan, refunds…"
              style={{
                width: "100%",
                padding: "17px 44px 17px 48px",
                borderRadius: "12px",
                border: "1px solid var(--border)",
                fontSize: "15.5px",
                background: "var(--white)",
                boxShadow: "var(--shadow-card)",
              }}
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                style={{
                  position: "absolute",
                  right: "14px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  border: "none",
                  background: "var(--surface)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {CLEAR_ICON}
              </button>
            )}
          </div>

          <div className="faq-category-nav" role="group" aria-label="Filter by category">
            <button type="button" aria-pressed={activeCategory === "all"} onClick={() => setActiveCategory("all")} className="faq-chip">
              All categories
            </button>
            {categories.map((c) => (
              <button
                key={c.id}
                type="button"
                aria-pressed={activeCategory === c.id}
                onClick={() => setActiveCategory(c.id)}
                className="faq-chip"
              >
                {c.label}
              </button>
            ))}
          </div>
        </search>
      </div>

      {!hasFilter && children}

      <div id="complete-library" style={{ marginTop: hasFilter ? "20px" : "56px", paddingTop: hasFilter ? 0 : "32px", borderTop: hasFilter ? "none" : "1px solid var(--border)" }}>
        <h2 style={{ fontSize: "20px" }}>Complete question library</h2>
        <p aria-live="polite" style={{ marginTop: "8px", fontSize: "13.5px", color: "var(--text-light)" }}>
          <span style={{ color: "var(--navy)", fontWeight: 700 }}>{countLabel}</span>
        </p>
      </div>

      {grouped.length === 0 && (
        <div style={{ textAlign: "center", padding: "48px 20px", border: "1px dashed var(--border)", borderRadius: "var(--radius)", marginTop: "16px" }}>
          <p style={{ fontSize: "14.5px", color: "var(--text)", fontWeight: 600 }}>No questions match &ldquo;{query}&rdquo;</p>
          <p style={{ marginTop: "6px", fontSize: "13.5px", color: "var(--text-light)" }}>
            Try a different word, or{" "}
            <Link href="/contact" style={{ color: "var(--blue)", fontWeight: 600 }}>
              ask us directly
            </Link>
            .
          </p>
        </div>
      )}

      {grouped.map(({ category, items: categoryItems }) => (
        <section key={category.id} id={`category-${category.id}`} style={{ marginTop: "44px" }}>
          <div style={{ borderBottom: "1px solid var(--border)", paddingBottom: "12px", marginBottom: "18px" }}>
            <h2 style={{ fontSize: "19px" }}>{category.label}</h2>
            <p style={{ marginTop: "4px", fontSize: "13px", color: "var(--text-light)" }}>
              {category.description} · {categoryItems.length} question{categoryItems.length === 1 ? "" : "s"}
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {categoryItems.map((item) => {
              const isOpen = openIds.has(item.id);
              return (
                <div key={item.id} id={`faq-${item.id}`} className="faq-item">
                  <h3 style={{ margin: 0 }}>
                    <button
                      type="button"
                      id={`faq-q-${item.id}`}
                      aria-expanded={isOpen}
                      aria-controls={`faq-a-${item.id}`}
                      onClick={() => toggle(item.id)}
                      className="faq-toggle"
                    >
                      <span>{highlightText(item.q, query)}</span>
                      {CHEVRON}
                    </button>
                  </h3>
                  <div id={`faq-a-${item.id}`} role="region" aria-labelledby={`faq-q-${item.id}`} hidden={!isOpen} className="faq-answer">
                    <p style={{ margin: 0, fontSize: "14.5px", color: "var(--text-light)", lineHeight: 1.65 }}>{highlightText(item.a, query)}</p>
                    {item.links && item.links.length > 0 && (
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 18px", marginTop: "12px" }}>
                        {item.links.map((l) => (
                          <Link key={l.href} href={l.href} style={{ fontSize: "13px", fontWeight: 600, color: "var(--blue)" }}>
                            {l.label} →
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      ))}

      <style>{`
        .faq-search-sticky {
          position: sticky;
          top: 72px;
          z-index: 5;
          background: var(--surface);
          padding: 12px 0 4px;
        }
        .faq-category-nav {
          display: flex;
          gap: 8px;
          margin-top: 12px;
          overflow-x: auto;
          padding-bottom: 4px;
          scrollbar-width: thin;
        }
        @media (min-width: 981px) {
          .faq-category-nav {
            flex-wrap: wrap;
            overflow-x: visible;
          }
        }
        .faq-chip {
          padding: 9px 16px;
          border-radius: 999px;
          border: 1px solid var(--border);
          background: var(--white);
          color: var(--navy);
          font-weight: 600;
          font-size: 13px;
          cursor: pointer;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .faq-chip[aria-pressed="true"] {
          background: var(--blue);
          border-color: var(--blue);
          color: #FFFFFF;
        }
        .faq-chip:focus-visible,
        .faq-toggle:focus-visible {
          outline: 2px solid var(--blue);
          outline-offset: -2px;
        }
        .faq-item {
          border: 1px solid var(--border);
          border-radius: var(--radius);
          background: var(--white);
        }
        .faq-toggle {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 17px 20px;
          background: none;
          border: none;
          cursor: pointer;
          text-align: left;
          font-weight: 600;
          font-size: 14.5px;
          color: var(--navy);
        }
        .faq-toggle[aria-expanded="true"] .faq-chevron {
          transform: rotate(180deg);
        }
        .faq-chevron {
          flex-shrink: 0;
          transition: transform 0.15s ease;
        }
        .faq-answer {
          padding: 0 20px 18px;
        }
        .faq-answer[hidden] {
          display: none;
        }
      `}</style>
    </div>
  );
}
