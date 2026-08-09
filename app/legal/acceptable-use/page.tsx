import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Acceptable Use Policy",
  description: "The rules for using Apply IDP Online's International Driving Permit application service.",
  alternates: { canonical: "/legal/acceptable-use" },
};

export default function AcceptableUsePage() {
  return (
    <LegalLayout title="Acceptable Use Policy" updated="August 2026">
      <p>
        This policy explains what you agree to when you use Apply IDP Online, in addition to our{" "}
        <a href="/legal/terms" style={{ color: "var(--blue)" }}>Terms of service</a>.
      </p>

      <h2>1. Who can apply</h2>
      <p>
        You may only submit an application for yourself, or for someone else if you are their
        parent, legal guardian, or otherwise authorized to act on their behalf and you provide
        that person&apos;s own genuine documents.
      </p>

      <h2>2. Documents you submit</h2>
      <p>You agree that every document you upload is:</p>
      <ul>
        <li>Genuine, current, and unaltered — not edited, cropped to hide information, or AI-generated.</li>
        <li>Actually yours (or the traveler&apos;s, under section 1), not someone else&apos;s license used without permission.</li>
        <li>A real signature and a real, unedited photo of your face for the selfie.</li>
      </ul>
      <p>
        Submitting altered, fabricated, or borrowed documents is fraud. We may refuse, cancel, or
        void an application at any stage if we reasonably suspect this, and our{" "}
        <a href="/legal/refund-policy" style={{ color: "var(--blue)" }}>Refund policy</a> does not
        guarantee a refund in that case.
      </p>

      <h2>3. Prohibited uses of the site</h2>
      <p>You agree not to:</p>
      <ul>
        <li>Use the service for any unlawful purpose, or to obtain a document you intend to misuse.</li>
        <li>Attempt to scrape, reverse-engineer, or automate submissions to the site outside of normal, individual use.</li>
        <li>Probe, disrupt, or attempt to bypass the site&apos;s security, rate limits, or upload validation.</li>
        <li>Impersonate another person or misrepresent your identity or authority to apply on someone&apos;s behalf.</li>
        <li>Send abusive, threatening, or harassing communications to our support team.</li>
      </ul>

      <h2>4. Enforcement</h2>
      <p>
        We may refuse service, cancel an in-progress application, or block further use of the
        site by anyone who violates this policy. Where required, we may also report suspected
        document fraud to the relevant authorities.
      </p>

      <h2>5. Reporting misuse</h2>
      <p>
        If you believe someone has used your identity or documents to apply without your
        permission, email{" "}
        <a href="mailto:support@applyidponline.com" style={{ color: "var(--blue)" }}>
          support@applyidponline.com
        </a>{" "}
        immediately and we will investigate.
      </p>
    </LegalLayout>
  );
}
