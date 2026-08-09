import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Terms of service",
  description: "The terms that govern your use of Apply IDP Online.",
  alternates: { canonical: "/legal/terms" },
};

export default function TermsPage() {
  return (
    <LegalLayout title="Terms of service" updated="July 2026">
      <p>
        These terms govern your use of Apply IDP Online (&quot;we&quot;, &quot;us&quot;) and the
        application-assistance service described on this website. By submitting an application
        or otherwise using the site, you agree to these terms.
      </p>

      <h2>1. What we provide</h2>
      <p>
        Apply IDP Online is an independent, private company. We help travelers prepare an
        International Driving Permit (IDP) application: we collect your details and documents,
        review them, and arrange for a permit to be prepared once payment is confirmed. We are
        not a government agency, embassy, or motor vehicle authority, and we do not issue
        driver&apos;s licenses.
      </p>

      <h2>2. Eligibility</h2>
      <ul>
        <li>You must be at least 18 years old to submit an application.</li>
        <li>You must hold a valid, unexpired driver&apos;s license issued in your name.</li>
        <li>The information and documents you submit must be accurate and belong to you.</li>
      </ul>

      <h2>3. The application process</h2>
      <p>
        Submitting the form on this site is a request for us to review and prepare your
        application — it is not itself a completed order. We may contact you if any document or
        detail needs correction before proceeding, and we may decline to proceed with an
        application that appears inaccurate, incomplete, or fraudulent.
      </p>

      <h2>4. Payment</h2>
      <p>
        Pricing is shown on our pricing page. Payment is collected after we review your
        submitted application, using the payment method we communicate to you by email. Prices
        are one-time and do not renew automatically.
      </p>

      <h2>5. Your responsibilities</h2>
      <p>
        You&apos;re responsible for confirming that an IDP meets the entry and driving
        requirements of your specific destination before you travel, and for carrying your
        original driver&apos;s license alongside any permit we help you obtain.
      </p>

      <h2>6. Limitation of liability</h2>
      <p>
        We are not liable for losses arising from a destination country&apos;s acceptance or
        rejection of an IDP, from delays in postal delivery, or from inaccurate information you
        provide. Our total liability in connection with any application is limited to the amount
        you paid for that application.
      </p>

      <h2>7. Changes to these terms</h2>
      <p>
        We may update these terms from time to time. Continued use of the site after an update
        means you accept the revised terms.
      </p>

      <h2>8. Contact</h2>
      <p>Questions about these terms can be sent to support@applyidponline.com.</p>
    </LegalLayout>
  );
}
