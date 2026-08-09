import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Refund policy",
  description: "When Apply IDP Online offers a refund for an International Driving Permit application.",
  alternates: { canonical: "/legal/refund-policy" },
};

export default function RefundPolicyPage() {
  return (
    <LegalLayout title="Refund policy" updated="July 2026">
      <p>
        We want you to feel confident applying with us. This policy explains when a refund is
        available.
      </p>

      <h2>1. Before your permit is prepared</h2>
      <p>
        If you change your mind after paying but before we&apos;ve started preparing your
        permit, contact us and we&apos;ll issue a full refund.
      </p>

      <h2>2. Errors on our part</h2>
      <p>
        If your permit is prepared with incorrect details due to an error our team made rather
        than information you provided, we&apos;ll correct it at no extra cost or issue a refund.
      </p>

      <h2>3. After dispatch</h2>
      <p>
        Once a digital permit has been delivered or a printed permit has shipped, we&apos;re
        unable to offer a refund for change-of-mind reasons, since the document has already been
        produced specifically for you.
      </p>

      <h2>4. Non-acceptance abroad</h2>
      <p>
        We are not able to refund an application because a specific rental company or authority
        declined to accept an IDP — acceptance depends on local requirements outside our control.
        We encourage you to check your destination&apos;s requirements before applying.
      </p>

      <h2>5. How to request a refund</h2>
      <p>
        Email support@applyidponline.com with your application reference and the reason for your
        request. We aim to respond within 2 business days.
      </p>
    </LegalLayout>
  );
}
