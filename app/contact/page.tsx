import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact us",
  description: "Get in touch with Apply IDP Online about your application, pricing, or account.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <section className="section" style={{ paddingTop: "64px" }}>
      <div className="container contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "56px" }}>
        <div>
          <p className="section-kicker-blue">Contact</p>
          <h1 style={{ fontSize: "clamp(1.75rem, 3vw, 2.25rem)" }}>Get in touch</h1>
          <p style={{ marginTop: "16px", fontSize: "15.5px", color: "var(--text-light)", maxWidth: "420px" }}>
            Questions about an application, pricing, or your order — send us a message and our
            team will reply by email.
          </p>

          <div style={{ marginTop: "32px", display: "flex", flexDirection: "column", gap: "20px" }}>
            <ContactRow label="Email" value="support@applyidponline.com" />
            <ContactRow label="Response time" value="5–15 minutes" />
            <ContactRow label="Hours" value="Monday–Friday, 9am–6pm" />
          </div>
        </div>

        <div className="card-elevated" style={{ background: "var(--surface)", padding: "32px" }}>
          <ContactForm />
        </div>
      </div>

      <style>{`
        @media (max-width: 780px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

function ContactRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p style={{ fontSize: "12.5px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-light)" }}>
        {label}
      </p>
      <p style={{ marginTop: "4px", fontSize: "15px", color: "var(--navy)", fontWeight: 500 }}>{value}</p>
    </div>
  );
}
