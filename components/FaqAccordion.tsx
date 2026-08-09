"use client";

import { useState } from "react";
import Link from "next/link";

export type FaqItem = { q: string; a: string; links?: { href: string; label: string }[] };

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={item.q}
            style={{
              border: "1px solid var(--border)",
              borderRadius: "var(--radius)",
              background: "var(--white)",
              overflow: "hidden",
            }}
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "16px",
                padding: "20px 24px",
                background: "none",
                border: "none",
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              <span style={{ fontWeight: 600, fontSize: "15.5px", color: "var(--navy)" }}>{item.q}</span>
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                aria-hidden="true"
                style={{
                  flexShrink: 0,
                  transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.15s ease",
                }}
              >
                <path d="M4 7l5 5 5-5" stroke="var(--blue)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {isOpen && (
              <div style={{ padding: "0 24px 20px" }}>
                <p style={{ fontSize: "14.5px", color: "var(--text-light)" }}>{item.a}</p>
                {item.links && item.links.length > 0 && (
                  <div style={{ display: "flex", gap: "16px", marginTop: "10px", flexWrap: "wrap" }}>
                    {item.links.map((l) => (
                      <Link key={l.href} href={l.href} style={{ fontSize: "13.5px", fontWeight: 600, color: "var(--blue)" }}>
                        {l.label} →
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
