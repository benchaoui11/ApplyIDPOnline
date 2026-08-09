import type { Metadata } from "next";
import Link from "next/link";
import PermitBadgeCard from "@/components/PermitBadgeCard";

export const metadata: Metadata = {
  title: "Application received",
  robots: { index: false, follow: false },
};

export default async function ApplySuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string }>;
}) {
  const { ref } = await searchParams;

  return (
    <section className="section" style={{ paddingTop: "72px" }}>
      <div className="container" style={{ maxWidth: "560px", textAlign: "center" }}>
        <div style={{ maxWidth: "420px", margin: "0 auto 32px" }}>
          <PermitBadgeCard />
        </div>

        <h1 style={{ fontSize: "clamp(1.6rem, 3vw, 2rem)" }}>Application received</h1>
        <p style={{ marginTop: "14px", fontSize: "15.5px", color: "var(--text-light)" }}>
          Our team will review your details and documents, then reach out by email with next
          steps and payment instructions.
        </p>

        {ref && (
          <div style={{ marginTop: "24px" }}>
            <span className="field-tag" style={{ fontSize: "13px", padding: "8px 16px" }}>
              REFERENCE {ref}
            </span>
          </div>
        )}

        <p style={{ marginTop: "24px", fontSize: "13.5px", color: "var(--text-light)" }}>
          Keep this reference for your records. If you don't hear from us within two business
          days, contact us and quote it.
        </p>

        <div style={{ display: "flex", gap: "12px", justifyContent: "center", marginTop: "28px", flexWrap: "wrap" }}>
          <Link href="/" className="btn btn-secondary">
            Back to home
          </Link>
          <Link href="/contact" className="btn btn-primary">
            Contact us
          </Link>
        </div>
      </div>
    </section>
  );
}
