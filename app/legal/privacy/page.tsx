import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "How Apply IDP Online collects, uses, and protects your personal information.",
  alternates: { canonical: "/legal/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalLayout title="Privacy policy" updated="July 2026">
      <p>
        This policy explains what personal information Apply IDP Online collects when you use
        this website or submit an application, and how we use and protect it.
      </p>

      <h2>1. Information we collect</h2>
      <ul>
        <li>Contact details: full name, email address, phone number.</li>
        <li>Application details: date of birth, country of birth, country of residence, destination country, license category, and requested validity.</li>
        <li>Documents you upload: photos of your driver&apos;s license, a selfie, and your signature.</li>
        <li>Basic technical data such as IP address, used for rate limiting and fraud prevention.</li>
      </ul>

      <h2>2. How we use your information</h2>
      <p>
        We use this information to review and prepare your International Driving Permit
        application, to contact you about your application or a message you send us, and to
        meet our own record-keeping and legal obligations.
      </p>

      <h2>3. Where your information is stored</h2>
      <p>
        Uploaded documents are stored securely in Supabase Storage. Application records are
        stored in Supabase, and contact form data may also be recorded in a private Google
        Sheets workspace accessible only to our team. We do not sell your personal information
        to third parties.
      </p>

      <h2>4. Retention</h2>
      <p>
        We keep application records for as long as reasonably needed to support your permit,
        respond to any follow-up questions, and meet our legal and accounting obligations, after
        which they are deleted.
      </p>

      <h2>5. Your rights</h2>
      <p>
        You can ask us to access, correct, or delete the personal information we hold about you
        by contacting support@applyidponline.com. We will respond within a reasonable time.
      </p>

      <h2>6. Cookies</h2>
      <p>
        We use a small number of cookies for essential site functionality. See our cookie policy
        for details.
      </p>

      <h2>7. Changes to this policy</h2>
      <p>We may update this policy from time to time. Material changes will be reflected by the &quot;last updated&quot; date above.</p>

      <h2>8. Contact</h2>
      <p>Privacy questions can be sent to support@applyidponline.com.</p>
    </LegalLayout>
  );
}
