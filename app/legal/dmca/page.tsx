import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "DMCA & Intellectual Property Policy",
  description: "How Apply IDP Online handles copyright, trademarks, and the documents you upload to apply for an International Driving Permit.",
  alternates: { canonical: "/legal/dmca" },
};

export default function DmcaPage() {
  return (
    <LegalLayout title="DMCA & Intellectual Property Policy" updated="August 2026">
      <h2>1. Our content</h2>
      <p>
        The text, design, graphics, and logo on applyidponline.com belong to Apply IDP Online
        (ApplyIDP International LLC) or are used under license. You may not copy, republish, or
        reuse them for another commercial service without our written permission.
      </p>

      <h2>2. Documents you upload</h2>
      <p>
        When you apply, you upload your own driver&apos;s license photos, a selfie, and a
        signature. Those files remain yours — we use them only to prepare and verify your
        application, as described in our{" "}
        <a href="/legal/privacy" style={{ color: "var(--blue)" }}>Privacy policy</a>, and we do
        not claim any ownership or license over them beyond that purpose.
      </p>

      <h2>3. Copyright infringement notices</h2>
      <p>
        If you believe content on this site infringes your copyright, email{" "}
        <a href="mailto:support@applyidponline.com" style={{ color: "var(--blue)" }}>
          support@applyidponline.com
        </a>{" "}
        with:
      </p>
      <ul>
        <li>A description of the copyrighted work you believe is infringed.</li>
        <li>The exact URL on our site where the material appears.</li>
        <li>Your contact information (name, address, phone, email).</li>
        <li>
          A statement that you have a good-faith belief the use is unauthorized, and that the
          notice is accurate under penalty of perjury.
        </li>
        <li>Your physical or electronic signature.</li>
      </ul>
      <p>
        We review each notice and remove or disable access to material we confirm is infringing.
      </p>

      <h2>4. Counter-notices</h2>
      <p>
        If material of yours was removed and you believe this was a mistake, you may send a
        counter-notice to the same address identifying the material and explaining why it should
        be restored. We will evaluate it in good faith.
      </p>

      <h2>5. Repeat infringement</h2>
      <p>
        We reserve the right to refuse service to anyone who repeatedly submits infringing
        material.
      </p>

      <h2>6. Trademarks</h2>
      <p>
        &quot;International Driving Permit&quot; and &quot;IDP&quot; are generic terms, not our
        trademarks. Names of governments, motoring associations, or conventions mentioned on this
        site (for example AAA, AATA, or the Geneva and Vienna Conventions) belong to their
        respective owners; referencing them for accurate, informational purposes does not imply
        affiliation or endorsement — see our{" "}
        <a href="/legal/disclaimer" style={{ color: "var(--blue)" }}>Disclaimer</a>.
      </p>
    </LegalLayout>
  );
}
