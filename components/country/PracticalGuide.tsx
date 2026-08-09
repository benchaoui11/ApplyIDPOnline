"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import ConfidenceMarker from "./ConfidenceMarker";
import type { CountryRecord, GuideTab } from "@/lib/countryData/types";

function slugify(label: string): string {
  return label.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default function PracticalGuide({ country }: { country: CountryRecord }) {
  // Tabs are built only from fields the country record actually has data
  // for — nothing here is a fixed template. A country with
  // borderCrossingRelevant: true and a populated borderCrossingGuide gets
  // an extra tab automatically.
  const tabs: GuideTab[] = [
    country.drivingGuide,
    country.roadRulesGuide,
    country.rentalGuide,
    country.motorcycleScooterRelevant ? country.scooterGuide : undefined,
    country.policeGuide,
    country.borderCrossingRelevant ? country.borderCrossingGuide : undefined,
  ].filter((t): t is GuideTab => Boolean(t));

  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  function focusTab(index: number) {
    const next = (index + tabs.length) % tabs.length;
    setActiveIndex(next);
    tabRefs.current[next]?.focus();
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      focusTab(activeIndex + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      focusTab(activeIndex - 1);
    } else if (e.key === "Home") {
      e.preventDefault();
      focusTab(0);
    } else if (e.key === "End") {
      e.preventDefault();
      focusTab(tabs.length - 1);
    }
  }

  const hasEmergencyInfo = Boolean(country.emergencyNumber || country.roadsideAssistanceNumber);

  if (tabs.length === 0) return null;

  return (
    <section className="section" id="before-you-drive" style={{ paddingBottom: "78px" }}>
      <div className="container" style={{ maxWidth: "860px" }}>
        <p className="section-kicker-blue">Before you drive</p>
        <h2 style={{ fontSize: "26px" }}>Before you drive in {country.name}</h2>
        <p style={{ marginTop: "10px", fontSize: "14.5px", color: "var(--text-light)", maxWidth: "600px" }}>
          Practical, destination-specific guidance — jump to what matters for your trip.
        </p>

        <div className="practical-tablist-wrap" style={{ position: "relative", marginTop: "28px" }}>
          <div
            role="tablist"
            aria-label={`Practical driving information for ${country.name}`}
            onKeyDown={handleKeyDown}
            className="practical-tablist"
            style={{
              display: "flex",
              gap: "8px",
              overflowX: "auto",
              WebkitOverflowScrolling: "touch",
              paddingBottom: "6px",
            }}
          >
            {tabs.map((tab, i) => {
              const selected = i === activeIndex;
              const slug = slugify(tab.label);
              return (
                <button
                  key={tab.label}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  role="tab"
                  id={`tab-${slug}`}
                  aria-selected={selected}
                  aria-controls={`panel-${slug}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActiveIndex(i)}
                  style={{
                    flexShrink: 0,
                    padding: "11px 20px",
                    borderRadius: "999px",
                    border: selected ? "1px solid var(--blue)" : "1px solid var(--border)",
                    background: selected ? "var(--blue)" : "var(--white)",
                    color: selected ? "#FFFFFF" : "var(--navy)",
                    fontWeight: 700,
                    fontSize: "14px",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    minHeight: "44px",
                  }}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
          {/* Visible scroll affordance — a right-edge fade hinting more tabs
              sit offscreen. CSS-only, no JS scroll-position tracking needed. */}
          <div aria-hidden="true" className="tablist-fade" />
        </div>

        <div className="card-elevated" style={{ marginTop: "20px", overflow: "hidden" }}>
          {tabs.map((tab, i) => (
            <div
              key={tab.label}
              role="tabpanel"
              id={`panel-${slugify(tab.label)}`}
              aria-labelledby={`tab-${slugify(tab.label)}`}
              hidden={i !== activeIndex}
              className="tab-panel"
              style={{ padding: "30px" }}
            >
              <p style={{ fontSize: "16.5px", fontWeight: 700, color: "var(--navy)", lineHeight: 1.5 }}>
                {tab.directAnswer}
              </p>

              <ul style={{ listStyle: "none", margin: "20px 0 0", padding: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
                {tab.points.map((point) => (
                  <li key={point.tip} style={{ display: "flex", gap: "10px", alignItems: "flex-start", fontSize: "14.5px", color: "var(--text)", lineHeight: 1.6 }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ marginTop: "3px", flexShrink: 0 }} aria-hidden="true">
                      <circle cx="8" cy="8" r="8" fill="var(--blue-50)" />
                      <path d="M4.8 8.2l2.2 2.2L11.2 6" stroke="var(--blue)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span style={{ display: "inline-flex", flexDirection: "column", gap: "6px" }}>
                      <span>{point.tip}</span>
                      <ConfidenceMarker status={point.status} />
                    </span>
                  </li>
                ))}
              </ul>

              <div
                style={{
                  marginTop: "22px",
                  padding: "16px 18px",
                  background: "var(--blue-50)",
                  borderRadius: "var(--radius-sm)",
                  fontSize: "13.5px",
                  color: "var(--navy)",
                  fontWeight: 500,
                }}
              >
                {tab.solutionNote}
              </div>

              {tab.ctaHint && (
                <div style={{ marginTop: "18px" }}>
                  <Link href={tab.ctaHint.href} style={{ fontSize: "13.5px", fontWeight: 700, color: "var(--blue)" }}>
                    {tab.ctaHint.label} →
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>

        {hasEmergencyInfo && (
          <details style={{ marginTop: "20px" }}>
            <summary style={{ cursor: "pointer", fontWeight: 600, fontSize: "13.5px", color: "var(--navy)" }}>
              Emergency information
            </summary>
            <div style={{ marginTop: "10px", fontSize: "13.5px", color: "var(--text-light)", display: "flex", flexDirection: "column", gap: "6px" }}>
              {country.emergencyNumber && <p>Emergency: {country.emergencyNumber.value}</p>}
              {country.roadsideAssistanceNumber && <p>Roadside assistance: {country.roadsideAssistanceNumber.value}</p>}
            </div>
          </details>
        )}
      </div>
      <style>{`
        .practical-tablist::-webkit-scrollbar { display: none; }
        .practical-tablist { scrollbar-width: none; }
        .tablist-fade {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 6px;
          width: 36px;
          background: linear-gradient(90deg, rgba(255,255,255,0) 0%, var(--white) 85%);
          pointer-events: none;
        }
        @media (min-width: 721px) {
          .tablist-fade { display: none; }
        }
        @media (max-width: 720px) {
          #before-you-drive { padding-bottom: 56px !important; }
        }
        @media (max-width: 480px) {
          .tab-panel { padding: 22px !important; }
        }
      `}</style>
    </section>
  );
}
