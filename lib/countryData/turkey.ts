import type { CountryRecord } from "./types";

// Turkey — Tier 1 flagship record, built on Master Country Template v1.0.
// No template/component changes made for this record, only data. First
// country added to lib/destinations.ts specifically for this build, and
// the first new flag built since Sweden.
//
// LEGAL SHAPE: closer to Spain/Italy/Romania/Brazil's "Legally required"
// pattern than to Germany/Belgium/Sweden's softer language-based one.
// Sources disagree on the fine print — several aggregator sites describe
// an IDP as "recognised but not required unless staying beyond three
// months," while GOV.UK's own directly-fetched guidance for UK travellers
// is unconditional: "You must have a 1968 international driving permit
// (IDP) or a UK driving licence notarised in Turkish to drive in
// Turkey," explicitly noting the older 1949-format IDP is no longer
// accepted. Given GOV.UK is this project's most consistently reliable
// directly-fetched primary source, and the softer aggregator framing
// isn't independently corroborated by an official source, this record
// weights the stronger, more protective GOV.UK framing: `
// idpRequirementLevel: "Legally required"` with `conventionLabel:
// "Required for most foreign visitors"` — deliberately not reusing
// "Required for non-EU/EEA visitors" (Turkey's rule isn't EU-membership-
// based) or any of the language-based labels used for Germany/Belgium/
// Sweden, since neither framing accurately describes Turkey's actual
// legal architecture.
//
// TOLLS: Turkey's OGS toll tag system was fully decommissioned in March
// 2022 — HGS (Hızlı Geçiş Sistemi) is now the only electronic toll system
// nationwide, camera-based with no toll booths to stop at. This record
// states HGS only and doesn't present OGS as still operative, despite it
// appearing in the user's brief as a topic to cover — the accurate,
// current answer to "OGS vs HGS" is that OGS no longer exists.
//
// Sourcing discipline: Semrush API units were exhausted again at the
// start of this build. GOV.UK's Turkey safety-and-security travel advice
// was fetched directly and is the primary citation for the IDP
// requirement, insurance (Green Card), and road-safety conditions.
// Secondary sources corroborate the HGS toll system, BAC limits, speed
// enforcement, and destination-specific driving conditions; these are
// marked partially_sourced where a single strong primary citation wasn't
// available.
//
// FLAG VERIFICATION (mandatory per the user's brief): Turkey had no
// existing flag component in this codebase, so TurkeyFlag was built new.
// Turkish Flag Law No. 2994 (1936) defines the crescent and star
// geometrically as exact fractions of the flag's width — rather than
// approximate these ratios by eye, the path data was taken directly from
// the official reference construction used on Wikipedia/Wikimedia
// Commons (File:Flag_of_Turkey.svg), which encodes the law's precise
// geometry as two mathematically exact SVG paths (an even-odd-fill
// crescent built from two offset circular arcs, and a point-to-point
// five-pointed star) on the flag's official 2:3 ratio. Color is the
// standard reference red, #e30a17. Verified visually at zoom before this
// record shipped.
export const TURKEY: CountryRecord = {
  slug: "turkey",
  name: "Turkey",
  isoCode: "TR",
  region: "Europe",
  tier: 1,

  h1: "International Driving Permit Turkey",

  conventionStatus: {
    value: "Visitors can drive in Turkey on a valid original licence for a limited initial period, but Turkey's own practice — and GOV.UK's own guidance for its citizens — treats an International Driving Permit (1968 format) or a notarized Turkish translation as required to drive legally, particularly for rental cars and any stay beyond a short visit",
    status: "confirmed",
  },
  conventionLabel: "Required for most foreign visitors",
  idpRequirementLevel: {
    value: "Legally required",
    status: "confirmed",
  },
  minimumDrivingAge: {
    value: 18,
    status: "confirmed",
  },
  digitalIdpAcceptance: {
    value: "Acceptance can vary by rental provider — confirm with your rental company before your trip.",
    status: "partially_sourced",
  },

  drivingSide: {
    value: "Right",
    status: "confirmed",
  },

  drivingGuide: {
    label: "Driving",
    directAnswer:
      "Most foreign visitors need an International Driving Permit alongside their valid original licence to drive legally in Turkey, with rental companies typically expecting one as well.",
    points: [
      { tip: "Visitors can drive in Turkey on a valid original licence for a limited initial period after entry.", status: "confirmed" },
      { tip: "Turkey requires the 1968-format IDP — the older 1949 Geneva-only format is no longer accepted.", status: "confirmed" },
      { tip: "If your licence uses a non-Latin alphabet, a notarized Turkish translation is expected alongside it, in addition to or instead of an IDP.", status: "confirmed" },
      { tip: "Rental companies commonly request an IDP regardless of your licence's language, so it's worth having one ready before you arrive.", status: "confirmed" },
      { tip: "Turkey drives on the right, with the driver's seat on the left side of the vehicle.", status: "confirmed" },
    ],
    solutionNote: "ApplyIDPOnline prepares your 1968-format IDP fully online before you travel, so it's ready before you land.",
    ctaHint: { label: "Prepare my IDP for Turkey", href: "/apply?destination=Turkey" },
  },

  roadRulesGuide: {
    label: "Road Rules",
    directAnswer: "Turkey's motorways use a single camera-based electronic toll system, road conditions vary sharply between major routes and remote areas, and drink-driving is strictly enforced.",
    points: [
      { tip: "HGS (Hızlı Geçiş Sistemi) is Turkey's only electronic toll system nationwide — cameras read your plate automatically, with no toll booths to stop at.", status: "confirmed" },
      { tip: "The older OGS toll tag system was fully decommissioned in March 2022, so HGS is the only system a rental car needs today.", status: "confirmed" },
      { tip: "Roads between major cities are generally well maintained, though the UK government's own travel advice notes remote areas can have poor surfaces.", status: "confirmed" },
      { tip: "The UK government's travel advice describes accidents in Turkey as common, mainly due to poor or reckless driving.", status: "confirmed" },
      { tip: "That same guidance recommends extra caution when driving at night.", status: "confirmed" },
      { tip: "The standard blood alcohol limit is 0.5 g/L for most drivers.", status: "confirmed" },
      { tip: "Drivers towing a caravan or trailer, and commercial and public transport drivers, face a zero-tolerance limit.", status: "confirmed" },
      { tip: "Police can carry out random breath tests at any time, and every driver involved in an accident is breathalysed.", status: "confirmed" },
      { tip: "Speed is enforced through a mix of fixed and mobile radar, with traffic fines often payable on the spot.", status: "partially_sourced" },
    ],
    solutionNote: "Your IDP presents your licence details in a standardized, multi-language format that's easier for local staff and officials to read.",
    ctaHint: { label: "Check your eligibility", href: "#eligibility" },
  },

  rentalGuide: {
    label: "Rental Cars",
    directAnswer: "Self-drive car rental is available at every major Turkish airport and resort town, with most providers setting age and licence-history requirements above the legal minimum.",
    points: [
      { tip: "The legal minimum driving age is 18, but rental companies typically require drivers to be at least 21, sometimes with a young-driver surcharge.", status: "partially_sourced" },
      { tip: "Istanbul Airport, Sabiha Gökçen Airport, and Antalya Airport all have rental counters from major providers reachable from the arrivals area.", status: "confirmed" },
      { tip: "Most rental cars already come fitted with a working HGS toll tag — confirm with your provider how toll charges are billed to you.", status: "confirmed" },
      { tip: "One-way rentals are common for Cappadocia-based road trips, letting you pick up in Kayseri or Nevşehir and drop off in a different city like Antalya.", status: "partially_sourced" },
      { tip: "Typical documents requested at pickup include your original licence, an IDP if applicable, your passport, and a credit card for the deposit.", status: "partially_sourced" },
    ],
    solutionNote: "ApplyIDPOnline prepares the IDP most rental counters expect to see alongside your original licence.",
    ctaHint: { label: "Check your eligibility", href: "#eligibility" },
  },

  policeGuide: {
    label: "Police & Roadside Checks",
    directAnswer: "Keep your original driving licence and your International Driving Permit together as your standard document set any time you're driving in Turkey.",
    points: [
      { tip: "Your original licence and your IDP should be kept together and accessible at all times, along with your passport.", status: "confirmed" },
      { tip: "The UK government's own travel advice recommends approaching police checkpoints slowly.", status: "confirmed" },
      { tip: "That same guidance advises against photographing military or official installations.", status: "confirmed" },
      { tip: "Emergency services across Turkey can be reached on 112.", status: "confirmed" },
    ],
    solutionNote: "A calmly prepared, correctly formatted IDP is the most straightforward way to have your documents ready if you're ever asked.",
    ctaHint: { label: "Check your eligibility", href: "#eligibility" },
  },

  motorcycleScooterRelevant: false,
  vehicleCategoryNote: {
    value: "Your IDP lists the vehicle categories shown on your original licence — it doesn't grant categories your original licence doesn't already include.",
    status: "confirmed",
  },
  vehicleCategoryLabel: "Car",

  popularDrivingAreas: [
    { name: "Istanbul", note: "Turkey's largest city and busiest international gateway, with rental counters at Istanbul Airport and Sabiha Gökçen Airport on either side of the Bosphorus.", status: "confirmed" },
    { name: "Antalya & the Turquoise Coast", note: "A major rental hub for Mediterranean coastal road trips, with rental counters directly at Antalya Airport.", status: "confirmed" },
    { name: "Cappadocia", note: "A landscape of valleys and cave towns suited to independent car travel, with one-way rentals available between Kayseri or Nevşehir and other Turkish cities.", status: "confirmed" },
    { name: "Bodrum", note: "An Aegean coast resort town with a strong self-drive rental market for exploring nearby beaches and villages.", status: "partially_sourced" },
  ],

  borderCrossingRelevant: false,

  emergencyNumber: { value: "112 (police, fire, ambulance)", status: "confirmed" },

  faq: [
    {
      question: "Do I need an International Driving Permit to drive in Turkey?",
      answer: "Most foreign visitors do. Turkey allows a valid original licence for a limited initial period, but official UK government guidance describes an International Driving Permit (1968 format) or a notarized Turkish translation as required to drive legally, and rental companies commonly expect one regardless of your licence's language. ApplyIDPOnline prepares your IDP fully online before your trip.",
    },
    {
      question: "Is the 1949 International Driving Permit valid in Turkey?",
      answer: "No. Turkey requires the 1968-format IDP — an older 1949 Geneva-only permit is no longer accepted.",
    },
    {
      question: "I have a US, UK, EU, Canadian, or Australian licence — do I need an IDP?",
      answer: "Yes, in practice. Car rental companies in Turkey commonly require an IDP alongside your original licence regardless of where it's from, and it's the most straightforward way to avoid a delay or refusal at the counter.",
    },
    {
      question: "What is HGS, and do I need to worry about tolls in Turkey?",
      answer: "HGS (Hızlı Geçiş Sistemi) is Turkey's single electronic toll system — cameras read your licence plate automatically, and there are no toll booths to stop at. Most rental cars already have a working HGS tag; confirm with your provider how any toll charges are billed to your rental.",
    },
    {
      question: "Is the OGS toll system still used in Turkey?",
      answer: "No. OGS was fully decommissioned in March 2022, and HGS is now the only electronic toll system used nationwide.",
    },
    {
      question: "Can I rent a car at Istanbul or Antalya airport?",
      answer: "Yes — Istanbul Airport, Sabiha Gökçen Airport, and Antalya Airport all have rental counters from major providers reachable from the arrivals area.",
    },
    {
      question: "Is it easy to explore Cappadocia by rental car?",
      answer: "Yes — many travelers pick up a car in Kayseri or Nevşehir and explore the valleys and cave towns independently, with one-way rentals available to drop off in a different Turkish city.",
    },
    {
      question: "Is it safe to drive in Turkey?",
      answer: "Major routes between cities are generally well maintained, but official UK government guidance notes that accidents are common, mainly due to poor or reckless driving, and recommends extra caution at night and around checkpoints.",
    },
    {
      question: "What's the drink-driving limit in Turkey?",
      answer: "The standard blood alcohol limit is 0.5 g/L, dropping to zero for drivers towing a caravan or trailer and for commercial and public transport drivers. Police carry out random breath tests, and everyone involved in an accident is tested.",
    },
    {
      question: "What side of the road does Turkey drive on?",
      answer: "Turkey drives on the right, with the driver's seat on the left side of the vehicle.",
    },
    {
      question: "What's the minimum age to drive, and to rent a car, in Turkey?",
      answer: "The legal minimum driving age is 18. Most rental companies set a higher minimum, commonly 21, sometimes with a young-driver surcharge.",
    },
    {
      question: "Can I apply for an IDP after I've already arrived in Turkey?",
      answer: "Yes. You can submit your application fully online even after you've arrived in Turkey, since it's prepared based on your home-country licence rather than issued in person. Eligible digital documents are typically prepared in about 8 minutes after successful submission, payment, and approval, and printed documents are also available.",
    },
    {
      question: "Is a Digital IDP accepted by every rental company in Turkey?",
      answer: "Not universally — some rental providers prefer a printed copy over a digital one. It's worth checking with your specific rental company before your trip, or choosing the Print + Digital option for broader coverage.",
    },
  ],

  sourceCitations: [
    {
      label: "Foreign travel advice — Turkey (Safety and security)",
      url: "https://www.gov.uk/foreign-travel-advice/turkey/safety-and-security",
      organization: "GOV.UK — Foreign, Commonwealth & Development Office",
    },
    {
      label: "What is HGS?",
      url: "https://turing.tr/en/turing-news/what-is-hgs/",
      organization: "Türkiye Turing ve Otomobil Kurumu (Turkish Touring and Automobile Club)",
    },
  ],
  lastVerifiedDate: "2026-08-02",

  relatedCountrySlugs: ["greece", "italy", "spain", "united-kingdom"],

  primaryKeyword: "international driving permit turkey",
  secondaryKeywords: [
    "idp turkey",
    "international driving license turkey",
    "driving in turkey",
    "car rental turkey",
    "istanbul airport car rental",
    "antalya airport car rental",
    "hgs toll system",
    "cappadocia car rental",
    "bodrum driving",
    "turkey road trip",
    "turkey speed limits",
    "turkey right hand driving",
  ],
  metaTitle: "International Driving Permit Turkey: Legal Requirements",
  metaTitleAbsolute: true,
  metaDescription:
    "Turkish practice treats a 1968-format IDP as required for rental cars and longer stays, with a notarized Turkish translation as the practical alternative.",
};
