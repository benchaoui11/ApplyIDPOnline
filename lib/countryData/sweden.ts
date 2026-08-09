import type { CountryRecord } from "./types";

// Sweden — Tier 1 record, built on Master Country Template v1.0. No
// template/component changes made for this record, only data. First
// country added to lib/destinations.ts specifically for this build, and
// the first new flag built since Belgium.
//
// LEGAL SHAPE: matches Germany's and Belgium's pattern, not Spain/Italy/
// Romania/Brazil's. Multiple corroborating sources agree Sweden accepts a
// valid non-EU/EEA licence for up to a year, and an International Driving
// Permit becomes a genuine requirement mainly if the original licence
// isn't already in English, German, French, Swedish, Norwegian, or
// Danish, or uses a non-Roman alphabet — otherwise a certified translation
// or IDP is needed alongside it. Since most of this service's actual
// customers hold an English-language licence, the strict legal trigger
// doesn't apply to most visitors — but rental companies commonly still
// request an IDP regardless, which is why `idpRequirementLevel: "Commonly
// requested"` (not "Legally required") is the honest classification, with
// a Sweden-specific `conventionLabel: "Required for non-Roman-alphabet
// licences"` matching the label style already established for Germany and
// Belgium. Every FAQ/directAnswer touching the requirement leads with the
// practical rental-counter outcome before the legal nuance, per the
// standing project rule saved from France.
//
// WINTER-DRIVING FOCUS (Phase 5's explicit "biggest opportunity"): this
// record covers Sweden's mandatory seasonal winter tyres (1 December to
// 31 March), the studded-tyre window and its city-specific restrictions,
// and moose-vehicle collision risk (~4,500 collisions/year, peaking at
// dawn/dusk and during the September–October rut) — with concrete,
// sourced figures rather than generic "drive carefully in winter" advice.
//
// Sourcing discipline: Semrush API units were exhausted again at the
// start of this build. GOV.UK's Sweden safety-and-security travel advice
// was fetched directly and is the primary citation for UK licence
// validity and the mandatory winter-tyre window. Secondary sources
// corroborate moose-collision statistics, ATK speed-camera fines, the
// 0.2‰ BAC limit, Stockholm/Gothenburg congestion charges, and the
// Öresund Bridge toll; these are marked partially_sourced where a single
// strong primary citation wasn't available.
//
// FLAG VERIFICATION (mandatory per the user's brief): Sweden had no
// existing flag component in this codebase, so SwedenFlag was built new.
// Colors and geometry are taken directly from Sweden's Act on the Swedish
// Flag (1982) and government ordinance 1983:826: blue #005293, yellow
// #FFCD00 (the official NCS-to-Pantone-to-hex conversion), with the flag
// divided into a 5:2:9 horizontal grid and a 4:2:4 vertical grid — an
// overall 5:8 (height:width) ratio — placing the Nordic cross's vertical
// bar 5 units from the hoist and its horizontal bar 4 units from the top,
// rather than a visually-estimated cross position. Verified visually at
// zoom before this record shipped.
export const SWEDEN: CountryRecord = {
  slug: "sweden",
  name: "Sweden",
  isoCode: "SE",
  region: "Europe",
  tier: 1,

  h1: "International Drivers License Sweden",

  conventionStatus: {
    value: "EU and EEA driving licence holders can drive in Sweden with no International Driving Permit needed. Other visitors can generally drive on a valid original licence for up to a year, but if it isn't already in English, German, French, Swedish, Norwegian, or Danish, or uses a non-Roman alphabet, an International Driving Permit or certified translation is required alongside it — and many rental companies request an IDP regardless of language",
    status: "confirmed",
  },
  conventionLabel: "Required for non-Roman-alphabet licences",
  idpRequirementLevel: {
    value: "Commonly requested",
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
      "Rental-company requirements can depend on your licence's language and the provider's own policy, so carrying an International Driving Permit alongside your original licence helps reduce delays or refusal at the counter in Sweden, even where the legal requirement depends on your licence.",
    points: [
      { tip: "EU and EEA driving licences are valid in Sweden with no IDP required.", status: "confirmed" },
      { tip: "Other visitors can generally drive on a valid original licence for up to a year, but if it isn't already in English or a few other named languages, or uses a non-Roman alphabet, an IDP or certified translation is required alongside it.", status: "confirmed" },
      { tip: "Many rental companies request an IDP regardless of your licence's language, so it's worth having one ready before you arrive.", status: "confirmed" },
      { tip: "An IDP only works together with your valid original licence — it's a translation aid, not a replacement for it.", status: "confirmed" },
      { tip: "Sweden drives on the right, with the driver's seat on the left side of the vehicle.", status: "confirmed" },
    ],
    solutionNote: "ApplyIDPOnline prepares your IDP fully online before you travel, so it's ready before you land.",
    ctaHint: { label: "Prepare my IDP for Sweden", href: "/apply?destination=Sweden" },
  },

  roadRulesGuide: {
    label: "Road Rules",
    directAnswer: "Sweden requires winter tyres for part of the year, carries a genuine moose-collision risk on rural roads, and enforces one of the lowest drink-driving limits in the world.",
    points: [
      { tip: "Winter tyres are mandatory from 1 December to 31 March, and at any other time the police require them due to wintry conditions.", status: "confirmed" },
      { tip: "Studded tyres are allowed within that window but banned between 16 April and 30 September, and restricted on some streets in Stockholm, Uppsala, and Gothenburg.", status: "confirmed" },
      { tip: "Around 4,500 moose-vehicle collisions happen each year, with risk peaking around dawn and dusk and during the September–October rutting season.", status: "confirmed" },
      { tip: "Yellow diamond signs with a moose silhouette mark routes where animal crossings are common — slow down and stay alert in these areas.", status: "confirmed" },
      { tip: "Speed cameras are dense and actively enforced, with fines starting around SEK 1,500.", status: "partially_sourced" },
      { tip: "The blood alcohol limit is 0.2‰, one of the lowest limits worldwide.", status: "confirmed" },
      { tip: "Aggravated drink-driving is treated as a criminal offence starting at 1.0‰.", status: "confirmed" },
      { tip: "Stockholm and Gothenburg both charge a congestion fee for driving into the city centre on weekdays, typically between 06:00 and 18:30.", status: "confirmed" },
    ],
    solutionNote: "Your IDP presents your licence details in a standardized, multi-language format that's easier for local staff and officials to read.",
    ctaHint: { label: "Check your eligibility", href: "#eligibility" },
  },

  rentalGuide: {
    label: "Rental Cars",
    directAnswer: "Self-drive car rental is available at Sweden's major airports and cities, with most providers setting age and driving-history requirements above the legal minimum.",
    points: [
      { tip: "The legal minimum driving age is 18, but rental companies typically require drivers to be at least 21 with at least a year of driving experience.", status: "partially_sourced" },
      { tip: "Stockholm Arlanda, Gothenburg Landvetter, and Malmö airports all have rental counters from major providers.", status: "confirmed" },
      { tip: "Rental cars are normally already fitted with the correct seasonal tyres for the time of year.", status: "partially_sourced" },
      { tip: "The Öresund Bridge to Denmark charges a toll of around SEK 660 each way — check with your rental company how this is billed.", status: "confirmed" },
      { tip: "Typical documents requested at pickup include your original licence, an IDP if applicable, your passport, and a credit card for the deposit.", status: "partially_sourced" },
    ],
    solutionNote: "ApplyIDPOnline prepares the IDP most rental counters expect to see alongside your original licence.",
    ctaHint: { label: "Check your eligibility", href: "#eligibility" },
  },

  policeGuide: {
    label: "Police & Roadside Checks",
    directAnswer: "Keep your original driving licence, and your International Driving Permit if you're carrying one, together as your standard document set any time you're driving in Sweden.",
    points: [
      { tip: "Your original licence, and your IDP if you're carrying one, should be kept together and accessible at all times.", status: "confirmed" },
      { tip: "Swedish police carry out random breath tests, and the country's low BAC limit is strictly enforced.", status: "confirmed" },
      { tip: "Emergency services across Sweden can be reached on 112.", status: "confirmed" },
    ],
    solutionNote: "A calmly prepared, correctly formatted IDP is the most straightforward way to have your documents ready if you're ever asked.",
    ctaHint: { label: "Check your eligibility", href: "#eligibility" },
  },

  borderCrossingGuide: {
    label: "Cross-Border Driving",
    directAnswer: "Driving from Sweden into Norway, Finland, or Denmark is common and generally straightforward, though the Öresund Bridge to Denmark charges its own toll.",
    points: [
      { tip: "Sweden, Norway, Finland, and Denmark cooperate closely on cross-border travel, so road crossings between them are usually routine.", status: "confirmed" },
      { tip: "The Öresund Bridge connecting Sweden to Denmark charges a toll of around SEK 660 each way.", status: "confirmed" },
      { tip: "Most rental companies allow driving into Norway, Finland, or Denmark, but it's worth confirming in advance, since policies and any extra fees vary by provider.", status: "partially_sourced" },
      { tip: "Your IDP requirement, where it applies, covers driving within Sweden — each neighbouring country has its own separate licence and document rules.", status: "confirmed" },
    ],
    solutionNote: "ApplyIDPOnline prepares your IDP for driving in Sweden — bridge tolls and cross-border rental permissions for neighbouring countries are handled separately with your rental provider.",
    ctaHint: { label: "Check your eligibility", href: "#eligibility" },
  },

  motorcycleScooterRelevant: false,
  vehicleCategoryNote: {
    value: "Your IDP lists the vehicle categories shown on your original licence — it doesn't grant categories your original licence doesn't already include.",
    status: "confirmed",
  },
  vehicleCategoryLabel: "Car",

  popularDrivingAreas: [
    { name: "Stockholm", note: "Sweden's capital and main international gateway, with rental counters at Arlanda Airport — the city centre charges a weekday congestion fee for drivers.", status: "confirmed" },
    { name: "Gothenburg", note: "Sweden's second-largest city, reached through Landvetter Airport, with its own weekday congestion charge for the city centre.", status: "confirmed" },
    { name: "Swedish Lapland (Kiruna & Abisko)", note: "A self-drive destination for the northern lights between September and March, with genuine moose-crossing and winter-tyre conditions to plan around.", status: "confirmed" },
    { name: "Malmö & the Öresund Bridge", note: "A southern gateway city connected to Copenhagen by the tolled Öresund Bridge, useful for a short cross-border trip into Denmark.", status: "confirmed" },
  ],

  borderCrossingRelevant: true,

  emergencyNumber: { value: "112 (police, fire, ambulance)", status: "confirmed" },

  faq: [
    {
      question: "Do I need an International Driving Permit to drive in Sweden?",
      answer: "Rental-company requirements can depend on your licence's language and the provider's own policy, so carrying an IDP alongside your original licence helps reduce delays or refusal at the counter. Legally, EU/EEA licence holders don't need one, and other visitors can generally drive on a valid original licence for up to a year — an IDP becomes a genuine legal requirement mainly if your licence isn't already in English or a few other named languages. ApplyIDPOnline prepares yours fully online before your trip either way.",
    },
    {
      question: "Do EU or EEA licence holders need an IDP for Sweden?",
      answer: "No. EU and EEA driving licences are recognized in Sweden without any additional document.",
    },
    {
      question: "I have a US, Canadian, UK, or Australian licence — do I need an IDP?",
      answer: "Not always strictly by law, since an English-language licence already satisfies Sweden's core language requirement — but many rental companies request an IDP regardless, so it's worth having one ready rather than finding out at the counter.",
    },
    {
      question: "Do I need winter tyres to drive in Sweden?",
      answer: "Yes, from 1 December to 31 March, and at any other time the police require them due to wintry conditions. Studded tyres are allowed within that window but banned between 16 April and 30 September, and restricted on some streets in Stockholm, Uppsala, and Gothenburg.",
    },
    {
      question: "How real is the risk of hitting a moose while driving in Sweden?",
      answer: "It's a genuine risk on rural roads — around 4,500 moose-vehicle collisions happen each year, peaking around dawn and dusk and during the September–October rutting season. Watch for the yellow diamond moose-warning signs and slow down in marked areas, especially at low light.",
    },
    {
      question: "What's the drink-driving limit in Sweden?",
      answer: "The blood alcohol limit is 0.2‰, one of the lowest in the world, with aggravated drink-driving treated as a criminal offence starting at 1.0‰.",
    },
    {
      question: "Can I rent a car at Stockholm Arlanda or Gothenburg airport?",
      answer: "Yes — Stockholm Arlanda, Gothenburg Landvetter, and Malmö airports all have rental counters from major providers.",
    },
    {
      question: "Do Stockholm and Gothenburg charge a congestion fee?",
      answer: "Yes, both cities charge a fee for driving into the city centre on weekdays, typically between 06:00 and 18:30 — check with your rental company on how this is billed for a rental car.",
    },
    {
      question: "Can I drive across the Öresund Bridge into Denmark?",
      answer: "Yes — the bridge connects Malmö to Copenhagen and charges a toll of around SEK 660 each way. Confirm with your rental company how the toll is handled before you cross.",
    },
    {
      question: "What side of the road does Sweden drive on?",
      answer: "Sweden drives on the right, with the driver's seat on the left side of the vehicle.",
    },
    {
      question: "What's the minimum age to drive, and to rent a car, in Sweden?",
      answer: "The legal minimum driving age is 18. Most rental companies set a higher minimum, commonly 21, and often expect at least a year of driving experience.",
    },
    {
      question: "Can I apply for an IDP after I've already arrived in Sweden?",
      answer: "Yes. You can submit your application fully online even after you've arrived in Sweden, since it's prepared based on your home-country licence rather than issued in person. Eligible digital documents are typically prepared in about 8 minutes after successful submission, payment, and approval, and printed documents are also available.",
    },
    {
      question: "Is a Digital IDP accepted by every rental company in Sweden?",
      answer: "Not universally — some rental providers prefer a printed copy over a digital one. It's worth checking with your specific rental company before your trip, or choosing the Print + Digital option for broader coverage.",
    },
  ],

  sourceCitations: [
    {
      label: "Foreign travel advice — Sweden (Safety and security)",
      url: "https://www.gov.uk/foreign-travel-advice/sweden/safety-and-security",
      organization: "GOV.UK — Foreign, Commonwealth & Development Office",
    },
    {
      label: "Driving licences in Sweden",
      url: "https://www.norden.org/en/info-norden/driving-licences-sweden",
      organization: "Info Norden — Nordic Council of Ministers",
    },
  ],
  lastVerifiedDate: "2026-08-02",

  relatedCountrySlugs: ["germany", "united-kingdom", "france", "belgium"],

  primaryKeyword: "international driving permit sweden",
  secondaryKeywords: [
    "idp sweden",
    "international driving license sweden",
    "driving in sweden",
    "car rental sweden",
    "stockholm arlanda car rental",
    "swedish lapland road trip",
    "sweden winter tyres",
    "moose warning sweden",
    "oresund bridge toll",
    "gothenburg congestion charge",
    "sweden speed limits",
    "sweden right hand driving",
  ],
  metaTitle: "IDP Sweden: Licence Language Rules",
  metaTitleAbsolute: true,
  metaDescription:
    "Licences in English, German, French, Swedish, Norwegian, or Danish work alone for up to a year — anything outside that list needs an IDP alongside it.",
};
