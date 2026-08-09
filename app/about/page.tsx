import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About us",
  description:
    "Apply IDP Online is an independent application-assistance service that helps travelers prepare International Driving Permit applications online.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <section className="section" style={{ paddingTop: "64px" }}>
        <div className="container" style={{ maxWidth: "720px" }}>
          <p className="section-kicker-blue">About us</p>
          <h1>A private service for a paperwork problem</h1>
          <p style={{ marginTop: "16px", fontSize: "16px", color: "var(--text-light)" }}>
            Apply IDP Online helps travelers prepare an International Driving Permit application
            without an embassy visit or a wait in line. We're an independent company — not a
            government agency, motoring authority, or embassy — and we say so clearly, because
            trust in a service like this should be earned with clarity, not decoration.
          </p>
        </div>
      </section>

      <section className="section" style={{ background: "var(--surface)", paddingTop: "48px" }}>
        <div className="container about-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "24px" }} >
          {[
            {
              title: "What we do",
              body: "We guide you through the details an IDP requires, check your documents before your permit is prepared, and keep you posted by email at each step.",
            },
            {
              title: "What we don't do",
              body: "We don't issue government-authorized driver's licenses, and we're not a substitute for legal advice on any country's specific entry or driving requirements.",
            },
            {
              title: "How we handle your documents",
              body: "Uploaded files are stored with a secure provider and only accessed by our review team to prepare your application.",
            },
          ].map((b) => (
            <div key={b.title} className="card-elevated" style={{ padding: "24px" }}>
              <h2 style={{ fontSize: "16px" }}>{b.title}</h2>
              <p style={{ marginTop: "10px", fontSize: "14px", color: "var(--text-light)" }}>{b.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: "720px" }}>
          <p className="section-kicker-blue">How we keep information accurate</p>
          <h2 style={{ fontSize: "clamp(1.4rem, 2.4vw, 1.9rem)" }}>Guidance you can check</h2>
          <p style={{ marginTop: "16px", fontSize: "15.5px", color: "var(--text-light)" }}>
            We publish how we work so you don&apos;t have to take our word for it. Our driving and
            country guidance is checked against official sources, separates verified facts from general
            guidance, and carries a &quot;last reviewed&quot; date.
          </p>
          <div style={{ display: "flex", gap: "12px", marginTop: "22px", flexWrap: "wrap" }}>
            <Link href="/editorial-policy" className="btn btn-secondary">Editorial policy</Link>
            <Link href="/sources" className="btn btn-secondary">Our sources</Link>
            <Link href="/content-review" className="btn btn-secondary">Content-review methodology</Link>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "var(--surface)" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <h2>Have a question first?</h2>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", marginTop: "20px", flexWrap: "wrap" }}>
            <Link href="/faq" className="btn btn-secondary">Read the FAQ</Link>
            <Link href="/contact" className="btn btn-primary">Contact us</Link>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 780px) {
          .about-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
