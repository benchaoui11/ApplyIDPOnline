"use client";

import { useEffect, useRef, useState } from "react";
import { COUNTRY_LIST, flagEmoji } from "@/lib/countryList";

export default function CountryCombobox({
  id,
  value,
  onChange,
  placeholder = "Select a country",
}: {
  id: string;
  value: string;
  onChange: (country: string) => void;
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const rootRef = useRef<HTMLDivElement | null>(null);
  const searchRef = useRef<HTMLInputElement | null>(null);

  const selected = COUNTRY_LIST.find((c) => c.name === value);
  const filtered = COUNTRY_LIST.filter((c) => c.name.toLowerCase().includes(query.trim().toLowerCase()));

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
        setQuery("");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (open) searchRef.current?.focus();
  }, [open]);

  return (
    <div ref={rootRef} style={{ position: "relative" }}>
      <button
        type="button"
        id={id}
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 14px",
          borderRadius: "var(--radius-sm)",
          border: open ? "1.5px solid var(--blue)" : "1px solid var(--border)",
          background: "var(--white)",
          cursor: "pointer",
          textAlign: "left",
        }}
      >
        <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {selected ? (
            <>
              <span style={{ fontSize: "17px" }}>{flagEmoji(selected.code)}</span>
              <span style={{ fontSize: "14.5px", fontWeight: 600, color: "var(--navy)" }}>{selected.name}</span>
            </>
          ) : (
            <>
              <span
                style={{
                  width: "22px",
                  height: "22px",
                  borderRadius: "50%",
                  background: "var(--blue-50)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
                aria-hidden="true"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--blue)">
                  <circle cx="12" cy="12" r="9" strokeWidth="1.7" />
                  <path d="M3 12h18M12 3c2.6 2.4 2.6 15.6 0 18M12 3c-2.6 2.4-2.6 15.6 0 18" strokeWidth="1.7" />
                </svg>
              </span>
              <span style={{ fontSize: "14.5px", color: "var(--text-light)" }}>{placeholder}</span>
            </>
          )}
        </span>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 0.15s ease", flexShrink: 0 }} aria-hidden="true">
          <path d="M4 6l4 4 4-4" stroke="var(--text-light)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 6px)",
            left: 0,
            right: 0,
            zIndex: 30,
            background: "var(--white)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-sm)",
            boxShadow: "var(--shadow-md)",
            overflow: "hidden",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 12px", borderBottom: "1px solid var(--border)" }}>
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
              <circle cx="6.5" cy="6.5" r="5" stroke="var(--text-light)" strokeWidth="1.4" />
              <path d="M10.2 10.2L13 13" stroke="var(--text-light)" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
            <input
              ref={searchRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search country…"
              style={{ border: "none", outline: "none", fontSize: "14px", flex: 1, background: "transparent" }}
            />
          </div>
          <div role="listbox" style={{ maxHeight: "220px", overflowY: "auto" }}>
            {filtered.length === 0 && <p style={{ padding: "14px", fontSize: "13.5px", color: "var(--text-light)" }}>No matches</p>}
            {filtered.map((c) => (
              <button
                type="button"
                key={c.code}
                role="option"
                aria-selected={c.name === value}
                onClick={() => {
                  onChange(c.name);
                  setOpen(false);
                  setQuery("");
                }}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "10px 14px",
                  background: c.name === value ? "var(--blue-50)" : "transparent",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                  fontSize: "14px",
                }}
                onMouseEnter={(e) => {
                  if (c.name !== value) e.currentTarget.style.background = "var(--surface)";
                }}
                onMouseLeave={(e) => {
                  if (c.name !== value) e.currentTarget.style.background = "transparent";
                }}
              >
                <span style={{ fontSize: "16px" }}>{flagEmoji(c.code)}</span>
                <span style={{ color: "var(--text)" }}>{c.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
