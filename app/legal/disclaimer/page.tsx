import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: "Important information about the nature of the Apply IDP Online service.",
  alternates: { canonical: "/legal/disclaimer" },
};

export default function DisclaimerPage() {
  return (
    <LegalLayout title="Disclaimer" updated="July 2026">
      <h2>Independent, private service</h2>
      <p>
        Apply IDP Online is a private company that provides an application-assistance service
        for International Driving Permits. We are not a government agency, embassy, consulate,
        or motor vehicle authority, and we are not affiliated with any of these bodies.
      </p>

      <h2>Not legal advice</h2>
      <p>
        The information on this site, including our country and &quot;what is an IDP&quot;
        pages, is provided for general guidance only and does not constitute legal advice. Entry
        and driving requirements vary by country and can change without notice. Always confirm
        current requirements with the official road authority or embassy of your destination
        before you travel.
      </p>

      <h2>Permit does not replace your license</h2>
      <p>
        An International Driving Permit is a translation and identity document that accompanies
        your existing, valid driver&apos;s license. It does not grant driving privileges on its
        own and does not replace your domestic license, which you must carry alongside it.
      </p>

      <h2>No guarantee of acceptance</h2>
      <p>
        While our permits follow the internationally recognized format, individual rental
        companies, police authorities, or border officials retain discretion over what documents
        they accept. We cannot guarantee acceptance in every circumstance.
      </p>
    </LegalLayout>
  );
}
