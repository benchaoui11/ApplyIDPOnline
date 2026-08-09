"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "./Logo";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/what-is-idp", label: "What is an IDP" },
  { href: "/how-to-apply", label: "How to apply" },
  { href: "/pricing", label: "Pricing" },
  { href: "/countries", label: "Countries" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "rgba(255,255,255,0.92)",
        backdropFilter: "saturate(180%) blur(8px)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "72px",
        }}
      >
        <Link href="/" aria-label="Apply IDP Online home">
          <Logo />
        </Link>

        <nav
          aria-label="Primary"
          style={{ display: "flex", alignItems: "center", gap: "32px" }}
          className="desktop-nav"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{ fontSize: "14.5px", fontWeight: 500, color: "var(--text)" }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Link href="/apply" className="btn btn-primary desktop-nav">
            Start application
          </Link>
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="mobile-menu-btn"
            style={{
              display: "none",
              background: "none",
              border: "1px solid var(--border)",
              borderRadius: "8px",
              width: "44px",
              height: "44px",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              {open ? (
                <path d="M4 4l12 12M16 4L4 16" stroke="var(--navy)" strokeWidth="1.8" strokeLinecap="round" />
              ) : (
                <path d="M3 6h14M3 10h14M3 14h14" stroke="var(--navy)" strokeWidth="1.8" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div
          style={{
            borderTop: "1px solid var(--border)",
            background: "var(--white)",
            padding: "16px 24px 24px",
            display: "flex",
            flexDirection: "column",
            gap: "18px",
          }}
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              style={{ fontSize: "16px", fontWeight: 500, display: "block", padding: "10px 0", minHeight: "44px" }}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/apply" className="btn btn-primary" onClick={() => setOpen(false)}>
            Start application
          </Link>
        </div>
      )}

      <style>{`
        @media (max-width: 880px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </header>
  );
}
