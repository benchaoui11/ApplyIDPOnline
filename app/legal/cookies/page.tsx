import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Cookie policy",
  description: "How Apply IDP Online uses cookies.",
  alternates: { canonical: "/legal/cookies" },
};

export default function CookiesPage() {
  return (
    <LegalLayout title="Cookie policy" updated="July 2026">
      <p>
        This site uses a limited number of cookies to function correctly. This page explains
        what they are and why we use them.
      </p>

      <h2>1. Essential cookies</h2>
      <p>
        These cookies are required for core functionality, such as remembering your progress
        through the application form during your session. The site cannot function properly
        without them, and they do not require consent under most cookie regulations.
      </p>

      <h2>2. What we don&apos;t do</h2>
      <p>
        We do not use advertising or cross-site tracking cookies, and we do not sell data
        collected through cookies to third parties.
      </p>

      <h2>3. Managing cookies</h2>
      <p>
        You can clear or block cookies through your browser settings at any time. Doing so may
        affect your ability to complete the application form.
      </p>

      <h2>4. Contact</h2>
      <p>Questions about this policy can be sent to support@applyidponline.com.</p>
    </LegalLayout>
  );
}
