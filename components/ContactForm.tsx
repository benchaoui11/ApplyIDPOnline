"use client";

import { useState } from "react";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? "Something went wrong.");
      setStatus("sent");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "sent") {
    return (
      <div style={{ background: "var(--success-bg)", border: "1px solid var(--success)", borderRadius: "var(--radius)", padding: "24px", textAlign: "center" }}>
        <h3 style={{ color: "var(--success)", fontSize: "16px" }}>Message sent</h3>
        <p style={{ marginTop: "8px", fontSize: "14px", color: "var(--text)" }}>
          Thanks — we'll get back to you by email shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
      <div>
        <label htmlFor="c-name" style={labelStyle}>Name</label>
        <input id="c-name" required value={name} onChange={(e) => setName(e.target.value)} style={inputStyle} placeholder="Your full name" />
      </div>
      <div>
        <label htmlFor="c-email" style={labelStyle}>Email</label>
        <input id="c-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} placeholder="name@example.com" />
      </div>
      <div>
        <label htmlFor="c-message" style={labelStyle}>Message</label>
        <textarea
          id="c-message"
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{ ...inputStyle, minHeight: "140px", resize: "vertical" }}
          placeholder="How can we help?"
        />
      </div>

      {status === "error" && (
        <p role="alert" style={{ color: "var(--error)", fontSize: "14px", background: "var(--error-bg)", padding: "12px 14px", borderRadius: "var(--radius-sm)" }}>
          {error}
        </p>
      )}

      <button type="submit" className="btn btn-primary" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "13.5px",
  fontWeight: 600,
  color: "var(--navy)",
  marginBottom: "6px",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "11px 14px",
  borderRadius: "var(--radius-sm)",
  border: "1px solid var(--border)",
  fontSize: "14.5px",
  fontFamily: "var(--font-body)",
  color: "var(--text)",
  background: "var(--white)",
};
