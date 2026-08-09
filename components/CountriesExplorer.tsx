"use client";

import { useId, useMemo, useState } from "react";
import Link from "next/link";
import { FlagIcon } from "@/lib/countryData/flagIcons";
import { DIRECTORY_REGION_ORDER, sortByPopularTraffic, type DirectoryEntry } from "@/lib/countryData/directory";

const ARROW = (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="directory-card-arrow">
    <path d="M3 7h8M8 3.5L11.5 7 8 10.5" stroke="var(--blue)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function CountriesExplorer({ entries }: { entries: DirectoryEntry[] }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("Popular");
  const searchLabelId = useId();

  const regions = useMemo(
    () => DIRECTORY_REGION_ORDER.filter((r) => entries.some((e) => e.region === r)),
    [entries]
  );
  const filters = useMemo(() => ["Popular", ...regions, "All countries"], [regions]);

  const results = useMemo(() => {
    let list = entries;
    if (filter === "Popular") {
      list = sortByPopularTraffic(list.filter((e) => e.popular));
    } else if (filter !== "All countries") {
      list = list.filter((e) => e.region === filter);
    }
    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter((e) => e.name.toLowerCase().includes(q) || e.aliases.some((a) => a.includes(q)));
    }
    return list;
  }, [entries, query, filter]);

  const countLabel =
    results.length === entries.length
      ? `${results.length} destination${results.length === 1 ? "" : "s"}`
      : `${results.length} of ${entries.length} destinations`;

  return (
    <div id="directory" className="card-elevated" style={{ padding: "24px" }}>
      <search style={{ display: "block" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          <div style={{ flex: "1 1 260px", position: "relative" }}>
            <label htmlFor={searchLabelId} className="visually-hidden">
              Search destinations by country name
            </label>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)" }} aria-hidden="true">
              <circle cx="7" cy="7" r="5.5" stroke="var(--text-light)" strokeWidth="1.4" />
              <path d="M11 11l3.5 3.5" stroke="var(--text-light)" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
            <input
              id={searchLabelId}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search a destination — Thailand, Spain, USA…"
              style={{
                width: "100%",
                padding: "12px 14px 12px 38px",
                borderRadius: "999px",
                border: "1px solid var(--border)",
                fontSize: "14px",
                background: "var(--white)",
              }}
            />
          </div>
        </div>

        <div className="filter-scroll" role="group" aria-label="Filter destinations by region" style={{ display: "flex", gap: "8px", marginTop: "10px", overflowX: "auto", paddingBottom: "2px" }}>
          {filters.map((f) => {
            const active = filter === f;
            return (
              <button
                key={f}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(f)}
                style={{
                  padding: "10px 18px",
                  borderRadius: "999px",
                  border: active ? "1px solid var(--blue)" : "1px solid var(--border)",
                  background: active ? "var(--blue)" : "var(--white)",
                  color: active ? "#FFFFFF" : "var(--navy)",
                  fontWeight: 600,
                  fontSize: "13.5px",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                }}
              >
                {f}
              </button>
            );
          })}
        </div>
      </search>

      <p aria-live="polite" style={{ marginTop: "20px", fontSize: "13.5px", color: "var(--text-light)" }}>
        <span style={{ color: "var(--navy)", fontWeight: 700 }}>{countLabel}</span>
      </p>

      <ul role="list" style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "14px", marginTop: "14px" }} className="directory-grid">
        {results.map((entry) => (
          <li key={entry.slug}>
            <Link
              href={entry.href}
              className="directory-card"
              aria-label={`${entry.name} — ${entry.subtitle}`}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                padding: "18px",
                minHeight: "76px",
                background: "var(--white)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              <FlagIcon
                isoCode={entry.isoCode}
                title={`Flag of ${entry.name}`}
                style={{ height: "26px", width: "auto", borderRadius: "4px", boxShadow: "0 1px 3px rgba(15, 23, 42, 0.16)", border: "1px solid rgba(15, 23, 42, 0.08)", flexShrink: 0 }}
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontWeight: 700, fontSize: "15px", color: "var(--navy)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{entry.name}</p>
                <p style={{ fontSize: "12.5px", color: "var(--text-light)", marginTop: "2px" }}>{entry.subtitle}</p>
              </div>
              {ARROW}
            </Link>
          </li>
        ))}
      </ul>

      {results.length === 0 && (
        <p style={{ fontSize: "14px", color: "var(--text-light)", padding: "24px 4px" }}>
          No destinations match &ldquo;{query}&rdquo; yet. You can still{" "}
          <Link href="/apply" style={{ color: "var(--blue)", fontWeight: 600 }}>
            apply for any destination
          </Link>{" "}
          directly from the application form.
        </p>
      )}

      <style>{`
        @media (max-width: 1099px) {
          .directory-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 879px) {
          .directory-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 479px) {
          .directory-grid { grid-template-columns: 1fr !important; }
        }
        .filter-scroll {
          scrollbar-width: thin;
        }
        .directory-card {
          transition: transform 0.12s ease, box-shadow 0.12s ease, border-color 0.12s ease;
        }
        .directory-card:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-lg);
          border-color: var(--blue);
        }
        .directory-card:active {
          transform: translateY(0);
          box-shadow: var(--shadow-sm);
        }
        .directory-card:focus-visible {
          outline: 2px solid var(--blue);
          outline-offset: 2px;
          box-shadow: var(--shadow-lg);
        }
        .directory-card-arrow path {
          transition: transform 0.12s ease;
        }
        .directory-card:hover .directory-card-arrow,
        .directory-card:focus-visible .directory-card-arrow {
          transform: translateX(2px);
        }
      `}</style>
    </div>
  );
}
