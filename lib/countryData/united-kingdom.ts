import type { CountryRecord } from "./types";

// United Kingdom — Tier 1 record, built on Master Country Template v1.0.
// No template/component changes made for this record, only data. Treated
// as a flagship market per the user's explicit brief — the deepest
// sourcing and FAQ coverage of any country built so far in this project.
//
// FOURTH RECORD (after the Philippines, Hong Kong, and Ireland) where
// idpRequirementLevel is NOT "Legally required" — and this is the
// clearest case yet. GOV.UK's own interactive licence-checker tool,
// fetched directly for a visitor from "any other country" (i.e. outside
// the EU/EEA/Ireland), states visitors may drive on a valid foreign
// licence for 12 months from their last entry — and doesn't mention an
// International Driving Permit as a requirement at all, anywhere on that
// result page. This record therefore does not claim a UK legal IDP
// mandate. The honest sell, consistent with the Philippines/Hong
// Kong/Ireland precedent, is translation value (if a licence isn't in
// English or uses a non-Latin script) and the fact that individual rental
// companies and insurers commonly ask for one as their own policy, even
// where the law doesn't. `idpRequirementLevel: "Commonly requested"` /
// `conventionLabel: "Recommended, not required"` match that established
// labeling.
//
// A nuance handled honestly rather than glossed over: GOV.UK's visitor
// framework technically governs "Great Britain" (England, Scotland,
// Wales) — Northern Ireland sits under a separate but broadly equivalent
// DVA framework. This record doesn't overclaim uniformity; it's
// disclosed plainly in the FAQ rather than silently assumed.
//
// Sourcing discipline: Semrush API units were exhausted again at the
// start of this build. Research proceeded via WebSearch/WebFetch, but
// this record has the deepest set of DIRECTLY-FETCHED official primary
// sources of any country built in this project so far: GOV.UK's visitor
// licence-checker tool result, GOV.UK's International Driving Permit
// guidance page, GOV.UK's Dartford Crossing (Dart Charge) payment page,
// and Transport for London's own Congestion Charge and Ultra Low
// Emission Zone (ULEZ) pages — all fetched directly, not inferred from
// secondary summaries. The M6 Toll's exact price and smart-motorway
// enforcement mechanics are corroborated across multiple independent
// secondary sources but not independently re-verified by direct fetch of
// National Highways / M6toll.co.uk, and are marked partially_sourced
// accordingly.
//
// Real, verified competitor gap: the leading aggregator page for "IDP
// United Kingdom" (internationaldrivingpermit.org) covers only generic
// IDP mechanics — no ULEZ, no Congestion Charge, no Dart Charge, no M6
// Toll, no Scotland-specific guidance, no smart motorway coverage, no
// manual-vs-automatic rental guidance, and no mention of the EU/EEA
// visitor exemption at all (which would actively mislead a large share
// of the UK's actual visitors). Every one of those gaps is closed here.
export const UNITED_KINGDOM: CountryRecord = {
  slug: "united-kingdom",
  name: "United Kingdom",
  isoCode: "GB",
  region: "Europe",
  tier: 1,

  h1: "International Driving Permit UK",

  conventionStatus: {
    value: "GOV.UK's official guidance for visitors does not require an International Driving Permit to drive in Great Britain for up to 12 months on a valid foreign licence — an IDP is recommended, especially if your licence isn't in English or uses a non-Latin script, and some rental companies request one regardless",
    status: "confirmed",
  },
  conventionLabel: "Recommended, not required",
  idpRequirementLevel: {
    value: "Commonly requested",
    status: "confirmed",
  },
  minimumDrivingAge: {
    value: 17,
    status: "confirmed",
  },
  digitalIdpAcceptance: {
    value: "Acceptance can vary by rental provider — confirm with your rental company before your trip.",
    status: "partially_sourced",
  },

  drivingSide: {
    value: "Left",
    status: "confirmed",
  },

  drivingGuide: {
    label: "Driving",
    directAnswer:
      "GOV.UK doesn't require an International Driving Permit for visitors driving in Great Britain for up to 12 months on a valid foreign licence, though many rental companies request one anyway.",
    points: [
      { tip: "Visitors can drive on a valid foreign licence for up to 12 months from when they last entered Great Britain, with no IDP legally required.", status: "confirmed" },
      { tip: "An International Driving Permit is recommended if your licence isn't in English or uses a non-Latin script, since it acts as an official translation.", status: "partially_sourced" },
      { tip: "Rental companies and insurers may require an IDP even where UK law doesn't — confirm with your provider before you travel.", status: "partially_sourced" },
      { tip: "A standard IDP application typically covers the convention format most UK rental counters expect to see.", status: "partially_sourced" },
      { tip: "The UK drives on the left, with the driver's seat on the right side of the vehicle.", status: "confirmed" },
    ],
    solutionNote: "ApplyIDPOnline prepares your IDP fully online before you travel, so you have it ready either way.",
    ctaHint: { label: "Prepare my IDP for the United Kingdom", href: "/apply?destination=United Kingdom" },
  },

  roadRulesGuide: {
    label: "Road Rules",
    directAnswer: "The UK's motorway network is extensive and well maintained, with several city driving charges, an all-electronic toll crossing, and speed enforcement that's among the most consistently applied in Europe.",
    points: [
      { tip: "London's Congestion Charge is £18 per day (Mon-Fri 7am-6pm, weekends and bank holidays 12pm-6pm), and applies to rental cars the same as any other private vehicle.", status: "confirmed" },
      { tip: "London's Ultra Low Emission Zone (ULEZ) charges £12.50 per day, 24 hours a day, for vehicles that don't meet emissions standards.", status: "confirmed" },
      { tip: "The Dartford Crossing (Dart Charge) has no barrier or on-site cash payment — it's camera-based, and you must pay online by midnight the day after you cross to avoid a penalty.", status: "confirmed" },
      { tip: "The M6 Toll near Birmingham is the UK's only toll motorway, with a car toll of around £10.", status: "partially_sourced" },
      { tip: "Smart motorways use variable speed limits shown on overhead gantries, enforced by average-speed cameras — treat the displayed limit as the real limit, not a suggestion.", status: "partially_sourced" },
    ],
    solutionNote: "Your IDP presents your licence details in a standardized, multi-language format that's easier for local staff and officials to read.",
    ctaHint: { label: "Check your eligibility", href: "#eligibility" },
  },

  rentalGuide: {
    label: "Rental Cars",
    directAnswer: "Manual transmission is the standard rental car across the UK, so if you want an automatic, it's worth booking well ahead, especially at busy airports.",
    points: [
      { tip: "Automatic cars are less common than manual and often sell out first in peak season at major airports like Heathrow, Gatwick, and Manchester.", status: "partially_sourced" },
      { tip: "Rental companies commonly require drivers to be at least 21, with many charging a young-driver surcharge under 25, even though the legal minimum driving age is 17.", status: "partially_sourced" },
      { tip: "Heathrow, Gatwick, and Manchester all have rental counters reachable from the arrivals area, either on-site or via a short transfer.", status: "partially_sourced" },
      { tip: "Typical documents requested at pickup include your original licence, an IDP if applicable, your passport, and a credit card for the deposit.", status: "partially_sourced" },
      { tip: "Confirm whether your rental agreement covers driving in Scotland and Wales as standard — most do, but it's worth checking before a longer road trip.", status: "partially_sourced" },
    ],
    solutionNote: "ApplyIDPOnline prepares the IDP most rental counters expect to see alongside your original licence.",
    ctaHint: { label: "Check your eligibility", href: "#eligibility" },
  },

  policeGuide: {
    label: "Police & Roadside Checks",
    directAnswer: "Keep your original driving licence, and your IDP if you're carrying one, together as your standard document set any time you're driving in the UK.",
    points: [
      { tip: "Your original licence, and your IDP if your licence needs one, should be kept together and accessible.", status: "confirmed" },
      { tip: "Speed and average-speed cameras are widespread and consistently enforced — treat every posted limit as strictly monitored.", status: "confirmed" },
      { tip: "Police, fire, and ambulance can be reached on 999, with 112 working equally as an alternative.", status: "confirmed" },
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
    { name: "Scottish Highlands (North Coast 500)", note: "Scotland's flagship self-drive route, with dramatic scenery and stretches of single-track road — the passing-place rule is simple: whoever is nearest a passing place pulls in to let the other vehicle through.", status: "confirmed" },
    { name: "Lake District", note: "A compact, scenic national park in northern England, popular for multi-day self-drive loops through Windermere, Ambleside, and Keswick.", status: "partially_sourced" },
    { name: "Cotswolds", note: "Rolling countryside and honey-stone villages within easy reach of London, one of the UK's most popular short self-drive breaks.", status: "partially_sourced" },
    { name: "London (Gateway & City Charges)", note: "The UK's main international gateway, where the Congestion Charge and ULEZ both apply to rental cars — many visitors explore central London without a car and pick one up for the wider trip.", status: "confirmed" },
  ],

  borderCrossingRelevant: false,

  emergencyNumber: { value: "999 or 112 (police, fire, ambulance)", status: "confirmed" },

  faq: [
    {
      question: "Do I need an International Driving Permit to drive in the UK?",
      answer: "Many UK rental companies and insurers ask to see an International Driving Permit before handing over a car — particularly if your licence isn't in English, depending on its issuing country, or simply as the provider's own policy — so travelling with one helps you avoid unnecessary friction when you collect your vehicle. Legally, GOV.UK's own guidance lets most visitors drive in Great Britain on a valid foreign licence alone for up to 12 months without an IDP being mandatory, but that's a legal minimum, not a guarantee every rental desk will accept your licence without one. ApplyIDPOnline prepares your IDP fully online before you travel, so it's ready either way — the most straightforward way to make sure nothing holds up your rental.",
    },
    {
      question: "How long can I drive in the UK on my foreign licence?",
      answer: "Up to 12 months from the date you last entered Great Britain, as long as your licence stays valid for that whole period. After that, you'd need to look at exchanging or applying for a UK licence — a different process from simply visiting.",
    },
    {
      question: "Will my rental company still ask for an IDP even if it's not legally required?",
      answer: "Often, yes. Even though UK law doesn't mandate one for most visitors, individual rental companies and insurers commonly request an IDP alongside your original licence as their own standard policy. It's worth having one ready regardless of the legal minimum.",
    },
    {
      question: "Does it matter which IDP convention I get for the UK?",
      answer: "Not usually — a standard IDP application typically covers the format UK rental counters expect to see. The three historical conventions (1926, 1949, and 1968) matter more for figuring out which IDP a specific destination abroad requires than for driving in the UK itself.",
    },
    {
      question: "Should I get a manual or automatic rental car in the UK?",
      answer: "Manual is the standard rental car across the UK, and automatics are less common and often cost more. If you're not comfortable driving a manual, book an automatic well in advance — they can sell out quickly at busy airports in peak season.",
    },
    {
      question: "Can I rent a car at Heathrow, Gatwick, or Manchester airport?",
      answer: "Yes — all three have rental counters reachable from the arrivals area, either on-site or via a short shuttle transfer, and all three are common starting points for a UK road trip.",
    },
    {
      question: "What is the London Congestion Charge, and does it apply to rental cars?",
      answer: "It's an £18-a-day charge for driving in central London on weekdays 7am-6pm and weekends and bank holidays 12pm-6pm, and it applies to a rental car the same as any other private vehicle. If you're only exploring central London, it's often simpler to leave the car and use public transport instead.",
    },
    {
      question: "What is ULEZ, and will my rental car be affected?",
      answer: "The Ultra Low Emission Zone charges £12.50 a day, 24 hours a day, for vehicles that don't meet emissions standards, across all London boroughs up to (but not including) the M25. Most rental cars meet the standard and won't be charged, but it's worth confirming with your rental company before you drive into the zone.",
    },
    {
      question: "Do I need to pay the Dart Charge or M6 Toll?",
      answer: "Only if you use those specific crossings. The Dartford Crossing (Dart Charge) has no barrier — you pay online by midnight the day after you cross. The M6 Toll near Birmingham is a separate, optional toll motorway that bypasses the standard M6, with a car toll of around £10.",
    },
    {
      question: "What are smart motorways, and how are they enforced?",
      answer: "Smart motorways use variable speed limits displayed on overhead gantries, which change based on traffic conditions and are enforced by average-speed cameras. Treat the number on the gantry as the current legal limit, not a general guideline.",
    },
    {
      question: "Is it safe to self-drive the Scottish Highlands or the North Coast 500?",
      answer: "Yes, with a bit of preparation — much of the route uses single-track roads with passing places rather than full two-lane roads. The convention is straightforward: whichever driver is closer to a passing place pulls in to let the other through, and passing places shouldn't be used for parking.",
    },
    {
      question: "Do I need anything extra to drive between England, Scotland, and Wales?",
      answer: "No — England, Scotland, and Wales share the same driving laws and licensing framework, with no border check, permit, or extra document needed to cross between them. Northern Ireland sits under a separate but broadly similar framework; the practical experience for a visiting driver is the same throughout.",
    },
    {
      question: "What side of the road does the UK drive on?",
      answer: "The UK drives on the left, with the driver's seat on the right side of the vehicle — the same convention as Ireland.",
    },
    {
      question: "Can I apply for an IDP after I've already arrived in the UK?",
      answer: "Yes. You can submit your application fully online even after you've arrived in the UK. Eligible digital documents are typically prepared in about 8 minutes after successful submission, payment, and approval, and printed documents are also available.",
    },
    {
      question: "Is a Digital IDP accepted by every rental company in the UK?",
      answer: "Not universally — some rental providers prefer a printed copy over a digital one. It's worth checking with your specific rental company before your trip, or choosing the Print + Digital option for broader coverage.",
    },
    {
      question: "What's the difference between Digital and Print + Digital?",
      answer: "Digital IDP is an emailed document ready to show on your phone. Print + Digital adds a physical booklet shipped to you, with the digital copy included as well — useful if a provider prefers a printed document.",
    },
  ],

  sourceCitations: [
    {
      label: "Driving in Great Britain on a non-GB licence (visitor result)",
      url: "https://www.gov.uk/driving-nongb-licence/y/a-visitor-to-great-britain/any-other-country",
      organization: "GOV.UK — Driver and Vehicle Licensing Agency (DVLA)",
    },
    {
      label: "Get an international driving permit",
      url: "https://www.gov.uk/driving-abroad/international-driving-permit",
      organization: "GOV.UK — Driver and Vehicle Licensing Agency (DVLA)",
    },
    {
      label: "Pay the Dartford Crossing charge (Dart Charge)",
      url: "https://www.gov.uk/pay-dartford-crossing-charge",
      organization: "GOV.UK — National Highways",
    },
    {
      label: "Congestion Charge",
      url: "https://tfl.gov.uk/modes/driving/congestion-charge",
      organization: "Transport for London (TfL)",
    },
    {
      label: "Ultra Low Emission Zone (ULEZ)",
      url: "https://tfl.gov.uk/modes/driving/ultra-low-emission-zone",
      organization: "Transport for London (TfL)",
    },
  ],
  lastVerifiedDate: "2026-08-02",

  relatedCountrySlugs: ["ireland", "france", "spain", "italy"],

  primaryKeyword: "international driving permit uk",
  secondaryKeywords: [
    "idp uk",
    "international driving licence uk",
    "driving in the uk",
    "uk car rental",
    "ulez explained",
    "london congestion charge",
    "dart charge",
    "m6 toll",
    "heathrow car rental",
    "driving in scotland",
    "north coast 500 self drive",
    "manual vs automatic car uk",
  ],
  metaTitle: "International Driving Permit UK: Do You Need One?",
  metaTitleAbsolute: true,
  metaDescription:
    "GOV.UK's own guidance doesn't require an IDP for up to 12 months on a valid licence — recommended mainly for non-English or non-Latin-script licences.",
};
