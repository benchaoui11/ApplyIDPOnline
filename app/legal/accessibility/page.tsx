import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Accessibility statement",
  description: "Our commitment to an accessible experience on Apply IDP Online.",
  alternates: { canonical: "/legal/accessibility" },
};

export default function AccessibilityPage() {
  return (
    <LegalLayout title="Accessibility statement" updated="July 2026">
      <p>
        We want Apply IDP Online to be usable by as many people as possible, including people
        who use assistive technology such as screen readers or keyboard-only navigation.
      </p>

      <h2>What we've done</h2>
      <ul>
        <li>Built the site to meet WCAG 2.1 AA contrast and structure guidelines.</li>
        <li>Made every interactive element operable by keyboard, with a visible focus state.</li>
        <li>Used semantic headings and landmarks so screen readers can navigate the page structure.</li>
        <li>Provided descriptive alt text for meaningful images.</li>
        <li>Respected reduced-motion preferences for anyone sensitive to animation.</li>
      </ul>

      <h2>Ongoing work</h2>
      <p>
        Accessibility is an ongoing effort. If you encounter a barrier using this site or the
        application form, please tell us — we treat these reports as a priority.
      </p>

      <h2>Contact</h2>
      <p>
        Email support@applyidponline.com with details of the issue and the assistive technology
        you're using, and we'll work to resolve it.
      </p>
    </LegalLayout>
  );
}
