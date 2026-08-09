"use client";

import { useEffect } from "react";

const SESSION_KEY = "applyidponline_session_id";

function sessionId() {
  try {
    const existing = window.sessionStorage.getItem(SESSION_KEY);
    if (existing) return existing;

    const next = crypto.randomUUID();
    window.sessionStorage.setItem(SESSION_KEY, next);
    return next;
  } catch {
    return null;
  }
}

export default function VisitorTracker() {
  useEffect(() => {
    const payload = {
      session_id: sessionId(),
      referrer: document.referrer || null,
      landing_page: `${window.location.pathname}${window.location.search}`,
    };

    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {
      // Visitor tracking must never interrupt the customer experience.
    });
  }, []);

  return null;
}

