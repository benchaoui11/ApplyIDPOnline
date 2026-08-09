import type { GlobalConstants } from "./types";

// Business Truth Layer v1.2 — ratified facts only. This is the single
// source every country page reads timing, process, and trust copy from.
// No field here may ever describe a submission duration or a printed-
// delivery timeline — those are permanently absent from this shape, not
// just unset, so they can't be added back in by accident during content
// work on an individual country page.
export const GLOBAL_CONSTANTS: GlobalConstants = {
  applicationProcessSteps: [
    {
      stage: "01",
      title: "Submit your application",
      body: "Complete the guided form and upload your documents at your own pace — there's no time limit and no account or password needed.",
    },
    {
      stage: "02",
      title: "Payment & human review",
      body: "A member of our team reviews your details and documents before your permit is prepared.",
    },
    {
      stage: "03",
      title: "Digital IDP delivered",
      body: "Once your application is submitted, paid, and approved, your digital IDP is typically ready in approximately 8 minutes when everything checks out.",
    },
  ],
  digitalDeliveryClaim:
    "Digital IDP typically delivered in approximately 8 minutes after successful submission, payment, and approval.",
  printedFormatAvailability:
    "A printed booklet is also available as an option, shipped after your application is reviewed and approved.",
  trustDisclosureCopy:
    "Apply IDP Online is an independent, private service — not a government agency, embassy, or motor vehicle authority.",
  originalLicenseRequirementCopy:
    "Your International Driving Permit is a translation and identity document — you must carry your valid original driver's license alongside it at all times.",
  trustCards: [
    {
      title: "Fully Online",
      body: "No office visit, no appointment — apply from your phone or computer.",
      icon: "globe",
    },
    {
      title: "Human-Reviewed Applications",
      body: "A member of our team checks every submission before your permit is prepared.",
      icon: "check",
    },
    {
      title: "Fast Digital Delivery",
      body: "Digital IDP typically delivered in approximately 8 minutes after successful submission, payment, and approval.",
      icon: "calendar",
    },
  ],
};
