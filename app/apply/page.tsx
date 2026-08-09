import type { Metadata } from "next";
import ApplyForm from "@/components/apply/ApplyForm";
import EligibilityGate from "@/components/apply/EligibilityGate";

export const metadata: Metadata = {
  title: "Apply for your International Driving Permit",
  description:
    "Start your International Driving Permit application: enter your driver details, upload your documents, and submit for review.",
  alternates: { canonical: "/apply" },
};

export default async function ApplyPage({
  searchParams,
}: {
  searchParams: Promise<{ destination?: string; category?: string; validity?: string; format?: string; licenseCountry?: string }>;
}) {
  const { destination, category, validity, format, licenseCountry } = await searchParams;

  return (
    <section className="section" style={{ paddingTop: "56px" }}>
      <div className="container" style={{ maxWidth: "1100px" }}>
        <p className="section-kicker-blue">Application</p>
        <h1 style={{ fontSize: "clamp(1.75rem, 3vw, 2.25rem)" }}>Apply for your International Driving Permit</h1>
        <p style={{ marginTop: "12px", fontSize: "15.5px", color: "var(--text-light)", maxWidth: "560px" }}>
          Three short steps. Have your driver's license and a selfie ready before you start.
        </p>

        <div style={{ marginTop: "32px" }}>
          <EligibilityGate>
            <ApplyForm
              initialDestination={destination}
              initialCategory={category}
              initialValidity={validity}
              initialFormat={format}
              initialLicenseCountry={licenseCountry}
            />
          </EligibilityGate>
        </div>
      </div>
    </section>
  );
}
