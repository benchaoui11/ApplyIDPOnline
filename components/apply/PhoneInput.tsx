"use client";

import { useEffect, useRef, useState } from "react";
import { COUNTRY_LIST, flagEmoji } from "@/lib/countryList";
import { DIAL_CODES } from "@/lib/dialCodes";

export default function PhoneInput({
  id,
  countryCode,
  number,
  onCountryChange,
  onNumberChange,
}: {
  id: string;
  /** ISO alpha-2 country code, e.g. "US" — not the dial code, since
   * several countries share the same dial code (e.g. +1 for the US,
   * Canada, and the Bahamas) and can't be told apart from that alone. */
  countryCode: string;
  number: string;
  onCountryChange: (countryCode: string) => void;
  onNumberChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const rootRef = useRef<HTMLDivElement | null>(null);
  const searchRef = useRef<HTMLInputElement | null>(null);

  const entries = COUNTRY_LIST.filter((c) => DIAL_CODES[c.code]);
  const selected = entries.find((c) => c.code === countryCode);
  const filtered = entries.filter(
    (c) => c.name.toLowerCase().includes(query.trim().toLowerCase()) || DIAL_CODES[c.code].includes(query.trim())
  );

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
      <div
        style={{
          display: "flex",
          alignItems: "stretch",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-sm)",
          background: "var(--white)",
          overflow: "hidden",
        }}
      >
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-haspopup="listbox"
          aria-expanded={open}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            padding: "0 12px",
            background: "var(--surface)",
            border: "none",
            borderRight: "1px solid var(--border)",
            cursor: "pointer",
            flexShrink: 0,
          }}
        >
          {selected ? (
            <>
              <span style={{ fontSize: "16px" }}>{flagEmoji(selected.code)}</span>
              <span style={{ fontSize: "14px", fontWeight: 600, color: "var(--navy)" }}>{DIAL_CODES[selected.code]}</span>
            </>
          ) : (
            <span style={{ fontSize: "13.5px", color: "var(--text-light)" }}>Code</span>
          )}
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ transform: open ? "rotate(180deg)" : "none" }} aria-hidden="true">
            <path d="M3 4.5l3 3 3-3" stroke="var(--text-light)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <input
          id={id}
          type="tel"
          value={number}
          onChange={(e) => onNumberChange(e.target.value)}
          placeholder="81 234 5678"
          style={{ flex: 1, padding: "11px 14px", border: "none", fontSize: "14.5px", fontFamily: "var(--font-body)", color: "var(--text)", minWidth: 0 }}
        />
      </div>

      {open && (
        <div
          className="phone-code-menu"
          style={{
            position: "absolute",
            top: "calc(100% + 6px)",
            left: 0,
            zIndex: 30,
            width: "280px",
            maxWidth: "calc(100vw - 24px)",
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
              placeholder="Search country or code…"
              style={{ border: "none", outline: "none", fontSize: "14px", flex: 1, background: "transparent" }}
            />
          </div>
          <div role="listbox" style={{ maxHeight: "220px", overflowY: "auto" }}>
            {filtered.map((c) => (
              <button
                type="button"
                key={c.code}
                role="option"
                aria-selected={c.code === countryCode}
                onClick={() => {
                  onCountryChange(c.code);
                  setOpen(false);
                  setQuery("");
                }}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "9px 14px",
                  background: c.code === countryCode ? "var(--blue-50)" : "transparent",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                  fontSize: "13.5px",
                }}
              >
                <span style={{ fontSize: "15px" }}>{flagEmoji(c.code)}</span>
                <span style={{ color: "var(--text)", flex: 1 }}>{c.name}</span>
                <span style={{ color: "var(--text-light)", fontFamily: "var(--font-mono)", fontSize: "12.5px" }}>{DIAL_CODES[c.code]}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
