"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { FaqItem } from "@/lib/faqData";
import { matchesQuery } from "@/components/faq/searchUtils";

export default function CountryFaqSearch({ items }: { items: FaqItem[] }) {
  const [query, setQuery] = useState("");

  const indexed = useMemo(
    () => items.map((item) => ({ item, blob: [item.q, item.a, ...(item.aliases ?? [])].join(" ").toLowerCase() })),
    [items]
  );

  const filtered = useMemo(() => indexed.filter(({ blob }) => matchesQuery(blob, query)).map(({ item }) => item), [indexed, query]);

  return (
    <div>
      <div style={{ position: "relative", maxWidth: "480px" }}>
        <label htmlFor="country-faq-search" className="visually-hidden">
          Search by country name
        </label>
        <svg width="17" height="17" viewBox="0 0 16 16" fill="none" style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)" }} aria-hidden="true">
          <circle cx="7" cy="7" r="5.5" stroke="var(--text-light)" strokeWidth="1.4" />
          <path d="M11 11l3.5 3.5" stroke="var(--text-light)" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
        <input
          id="country-faq-search"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search a destination — Japan, USA, UAE…"
          style={{
            width: "100%",
            padding: "13px 14px 13px 42px",
            borderRadius: "999px",
            border: "1px solid var(--border)",
            fontSize: "14px",
            background: "var(--white)",
          }}
        />
      </div>

      <p aria-live="polite" style={{ marginTop: "14px", fontSize: "13px", color: "var(--text-light)" }}>
        <span style={{ color: "var(--navy)", fontWeight: 700 }}>
          {filtered.length === items.length ? `${items.length} destinations` : `${filtered.length} of ${items.length} destinations`}
        </span>
      </p>

      {filtered.length === 0 ? (
        <p style={{ fontSize: "14px", color: "var(--text-light)", padding: "20px 0" }}>
          No destination matches &ldquo;{query}&rdquo;. You can still{" "}
          <Link href="/apply" style={{ color: "var(--blue)", fontWeight: 600 }}>
            apply for any destination
          </Link>{" "}
          directly.
        </p>
      ) : (
        <div className="country-faq-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "10px", marginTop: "16px" }}>
          {filtered.map((item) => (
            <div key={item.id} style={{ border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", background: "var(--white)", padding: "16px 18px" }}>
              <p style={{ fontSize: "14px", fontWeight: 600, color: "var(--navy)" }}>{item.q}</p>
              <p style={{ marginTop: "6px", fontSize: "13px", color: "var(--text-light)", lineHeight: 1.55 }}>{item.a}</p>
              {item.links?.[0] && (
                <Link href={item.links[0].href} style={{ display: "inline-block", marginTop: "10px", fontSize: "12.5px", fontWeight: 600, color: "var(--blue)" }}>
                  {item.links[0].label} →
                </Link>
              )}
            </div>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 720px) {
          .country-faq-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
