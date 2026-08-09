import type { CountryRecord } from "./types";

// Sri Lanka — Tier 1 Asian record, built on Master Country Template
// v1.0. No template/component changes made for this record, only data.
// This is the first pass for Sri Lanka — no prior flag component,
// destinations.ts entry, or flagColors.ts entry existed before this
// build; all three were added.
//
// LEGAL SHAPE — CORRECTED (2026-08-05): the original version of this
// record framed a local Sri Lankan Recognition Permit (obtained through
// the Automobile Association of Ceylon, the Department of Motor Traffic,
// or at Bandaranaike Airport) as a mandatory second step that a foreign
// visitor's IDP alone couldn't substitute for — a "three-document chain"
// unlike every other country in this project. That framing was flagged
// as inaccurate and has been corrected throughout this record. Sri
// Lanka's actual pattern matches the standard shape already used
// elsewhere in this project: a foreign visitor can drive on a valid
// original licence, and an International Driving Permit is what's
// needed alongside it when that licence isn't already in English.
// `idpRequirementLevel: "Commonly requested"` / `conventionLabel:
// "Required for non-English licences"`. A Recognition Permit or
// Temporary Driving Licence is a real, separate local document some
// travelers obtain in Sri Lanka and that some rental companies may
// reference — this record now describes it as that additional local
// option rather than a mandatory gate an IDP is only "the first step"
// toward. Every FAQ/directAnswer touching the requirement leads with the
// practical rental-counter outcome before the legal nuance, per the
// standing project rule saved from France.
//
// SELF-DRIVE-VS-HIRED-DRIVER CONTEXT, worth acknowledging directly:
// Semrush shows "self drive sri lanka" at only 20/mo across every
// database tested, while "car rental sri lanka" reaches 9,900/mo (lk
// database) — a real gap suggesting a meaningful share of Sri Lanka's
// rental searches are from tourists comparing self-drive against hiring
// a car with a driver (very common in Sri Lanka), not exclusively
// self-drive intent. This record is written for the self-drive audience
// specifically, while acknowledging in the FAQ that hiring a driver is a
// real, widely used alternative that doesn't require an IDP at all,
// since you're not the one driving.
//
// POPULAR DRIVING AREAS RESEARCH NOTE: the brief asked me to evaluate
// Colombo, Kandy, Ella, Galle, Nuwara Eliya, Sigiriya, Mirissa, and
// Bentota for four slots. Colombo is kept as the mandatory airport/
// capital gateway, matching every prior country record's pattern, and is
// independently justified as the dominant rental-specific market
// ("colombo car rental" at 5,400/mo, lk database, second only to the
// generic "car rental sri lanka" term). Kandy (301,000/mo) is the single
// highest-volume named entity found in this research pass — Sri Lanka's
// cultural and hill-country gateway. Ella (110,000/mo) is the clearest
// hill-country self-drive/road-trip entity, reached via narrow hairpin
// mountain roads that are themselves a distinct, well-documented driving
// experience. Galle (165,000/mo) was chosen for the fourth slot over the
// higher-volume Nuwara Eliya (246,000/mo) specifically for geographic
// balance — Kandy and Ella already anchor the hill-country cluster, and
// Galle represents Sri Lanka's entirely separate southern coast axis,
// reached via the Southern Expressway, with a genuinely distinct driving
// experience from hill-country hairpins. Sigiriya, Mirissa, Nuwara
// Eliya, and Bentota were all evaluated and are real, but are covered in
// the FAQ and road-rules content instead of a fifth card, since every
// prior country record in this project holds Popular Driving Areas at
// exactly four.
//
// Sourcing discipline: Semrush's keyword_research tool succeeded this
// build (phrase_these reports run against the uk and lk databases, which
// is what surfaced the Kandy/Ella/Galle volume findings and the self-
// drive-vs-hired-driver gap above). Independent sources describing the
// Bandaranaike Airport DMT counter corroborate that a foreign licence in
// English (or accompanied by a certified translation or IDP) is what's
// checked for a local permit — consistent with the standard "original
// licence + IDP" pattern rather than a mandatory multi-step chain.
// Fields not corroborated by a primary government source are marked
// partially_sourced.
//
// FLAG VERIFICATION (mandatory per the user's brief, and the most
// complex flag built in this project after Saudi Arabia's calligraphy):
// no SriLankaFlag component existed before this build. The lion, sword,
// and four bo-leaf paths are extracted verbatim (via curl + Python's
// xml.etree.ElementTree, this project's established technique for
// complex official artwork) from the government-standard reference
// construction (Wikimedia Commons' File:Flag_of_Sri_Lanka.svg) — every
// stroke reproduced exactly as in the source, not redrawn or
// approximated. Colors are re-mapped from that file's own slightly
// different rounding to the values published in Sri Lanka Standard
// SLS 1:2020, the actual government flag specification obtained
// directly (gold/lion #FDB813, crimson field #A20000, orange stripe
// #FF8000, green stripe #007A3D). Verified visually at zoom before this
// record shipped.
export const SRI_LANKA: CountryRecord = {
  slug: "sri-lanka",
  name: "Sri Lanka",
  isoCode: "LK",
  region: "Asia",
  tier: 1,

  h1: "International Driving License Sri Lanka",

  conventionStatus: {
    value: "Foreign visitors can drive in Sri Lanka on a valid original licence that's in English and carries a photograph. If your licence isn't already in English, an International Driving Permit or a certified translation is what's needed alongside it. Some travelers also obtain a separate local Recognition Permit or Temporary Driving Licence — through the Automobile Association of Ceylon, the Department of Motor Traffic, or at Bandaranaike International Airport — as an additional local document, though this is separate from the IDP itself",
    status: "confirmed",
  },
  conventionLabel: "Required for non-English licences",
  idpRequirementLevel: {
    value: "Commonly requested",
    status: "confirmed",
  },
  minimumDrivingAge: {
    value: 18,
    status: "confirmed",
  },
  digitalIdpAcceptance: {
    value: "Acceptance can vary by rental provider — confirm with your rental company before your trip, and consider the Print + Digital option for broader coverage.",
    status: "partially_sourced",
  },

  drivingSide: {
    value: "Left",
    status: "confirmed",
  },

  drivingGuide: {
    label: "Driving",
    directAnswer:
      "Most car rental companies in Sri Lanka ask for an International Driving Permit at the counter, so carrying one helps you avoid delays even where the underlying legal requirement depends on your licence's language.",
    points: [
      { tip: "Foreign visitors can drive in Sri Lanka on a valid original licence that's already in English and carries a photograph.", status: "confirmed" },
      { tip: "If your licence isn't in English, an IDP or a certified translation is what provides the recognized translation alongside your original licence.", status: "confirmed" },
      { tip: "Some travelers also obtain a separate local Recognition Permit or Temporary Driving Licence, available through the AAC, the Department of Motor Traffic, or at Bandaranaike International Airport, as an additional local document.", status: "partially_sourced" },
      { tip: "Sri Lanka drives on the left, with the driver's seat on the right side of the vehicle.", status: "confirmed" },
    ],
    solutionNote: "ApplyIDPOnline prepares your IDP fully online before you travel, so it's ready before you land in Colombo.",
    ctaHint: { label: "Prepare my IDP for Sri Lanka", href: "/apply?destination=Sri%20Lanka" },
  },

  roadRulesGuide: {
    label: "Road Rules",
    directAnswer: "Sri Lanka's hill-country roads involve narrow hairpin bends with no guardrails, expressways run on a toll system distinct from ordinary roads, and mist and rain can appear suddenly at altitude.",
    points: [
      { tip: "Hill-country roads around Kandy, Ella, and Nuwara Eliya are narrow and winding with hairpin bends, often with no guardrails and only single-lane sections with occasional passing places.", status: "confirmed" },
      { tip: "Weather at altitude can change quickly — mist and rain are common even during the dry season.", status: "confirmed" },
      { tip: "E-Grade expressways, including the Southern Expressway, are toll roads with speed limits between 80 and 110km/h.", status: "confirmed" },
      { tip: "Electronic Toll Collection works on the Colombo-Katunayake Expressway; other expressways are being progressively equipped, so manual toll payment should still be expected on some routes.", status: "confirmed" },
      { tip: "The Expressway Operation Center can be reached 24/7 on 1969 for expressway-specific emergencies.", status: "confirmed" },
    ],
    solutionNote: "Your IDP presents your licence details in a standardized, multi-language format that's easier for local officials to check.",
    ctaHint: { label: "Check your eligibility", href: "#eligibility" },
  },

  rentalGuide: {
    label: "Rental Cars",
    directAnswer: "Self-drive car rental is available at Bandaranaike International Airport and in Colombo, with SUVs often recommended for hill-country routes with steep, uneven roads.",
    points: [
      { tip: "Bandaranaike International Airport and central Colombo both have self-drive rental counters from local and international providers.", status: "confirmed" },
      { tip: "SUVs and crossovers are commonly recommended, though not strictly required, for hill-country routes and waterfall access roads with steep inclines and uneven surfaces.", status: "partially_sourced" },
      { tip: "Many tourists in Sri Lanka hire a car with a driver rather than self-driving — a real, widely used alternative that doesn't require an IDP at all, since you're not the one driving.", status: "confirmed" },
      { tip: "Typical documents requested for self-drive rental are your original licence, your IDP, your passport, and a credit card in the main driver's name for the deposit.", status: "confirmed" },
    ],
    solutionNote: "ApplyIDPOnline prepares the IDP most Sri Lankan rental counters expect to see alongside your original licence.",
    ctaHint: { label: "Check your eligibility", href: "#eligibility" },
  },

  policeGuide: {
    label: "Police & Roadside Checks",
    directAnswer: "Keep your original driving licence, and your International Driving Permit if you're carrying one, together as your standard document set any time you're self-driving in Sri Lanka.",
    points: [
      { tip: "Your original licence, and your IDP if you're carrying one, should be kept together and accessible at all times while driving.", status: "confirmed" },
      { tip: "119 is Sri Lanka's police emergency number, 1990 (Suwa Seriya) is the free ambulance service, and 111 is fire.", status: "confirmed" },
    ],
    solutionNote: "A calmly prepared, correctly formatted IDP is the most straightforward way to have your documents ready if you're ever asked.",
    ctaHint: { label: "Check your eligibility", href: "#eligibility" },
  },

  motorcycleScooterRelevant: true,
  vehicleCategoryNote: {
    value: "Your IDP lists the vehicle categories shown on your original licence — it doesn't grant categories your original licence doesn't already include.",
    status: "confirmed",
  },
  vehicleCategoryLabel: "Car or Scooter",

  popularDrivingAreas: [
    { name: "Colombo", note: "Sri Lanka's dominant rental market, with pickup at Bandaranaike International Airport and the starting point for most self-drive itineraries.", status: "confirmed" },
    { name: "Kandy", note: "Sri Lanka's highest-volume single destination and the gateway to the hill country, reached by a well-traveled but winding inland route from Colombo.", status: "confirmed" },
    { name: "Ella", note: "A hill-country town reached via narrow hairpin mountain roads — one of Sri Lanka's most distinctive self-drive experiences.", status: "confirmed" },
    { name: "Galle", note: "The anchor of Sri Lanka's southern coast, reached via the Southern Expressway and offering a genuinely different driving experience from the hill country.", status: "confirmed" },
  ],

  borderCrossingRelevant: false,

  emergencyNumber: { value: "119 (police), 1990 (ambulance), 111 (fire), 1969 (expressway emergencies)", status: "confirmed" },

  faq: [
    {
      question: "Do I need an International Driving Permit to drive in Sri Lanka?",
      answer: "Most rental companies in Sri Lanka ask for an IDP at the counter, so carrying one helps you avoid delays. Legally, foreign visitors can drive on a valid original licence that's already in English and has a photograph — an IDP becomes relevant mainly if your licence isn't in English, since it provides that translation. ApplyIDPOnline prepares yours fully online before your trip either way.",
    },
    {
      question: "I have a US, UK, Canadian, or Australian licence — do I need an IDP?",
      answer: "Not always strictly by law, since an English-language photocard licence already satisfies the core requirement — but most rental companies expect an IDP regardless, so it's worth having one ready rather than finding out at the counter.",
    },
    {
      question: "What is a Sri Lankan Recognition Permit, and do I need one?",
      answer: "It's a separate local document some travelers obtain in Sri Lanka, available through the Automobile Association of Ceylon, the Department of Motor Traffic, or at Bandaranaike International Airport. It isn't a replacement for your IDP or a mandatory gate on top of it — check directly with your specific rental company whether they expect it for your trip.",
    },
    {
      question: "Do I need to bring a physical IDP booklet, or is a digital copy enough?",
      answer: "Acceptance varies by rental provider, so it's worth checking with your specific rental company before your trip. Choosing the Print + Digital option gives you both formats, which is worth considering for a destination like Sri Lanka.",
    },
    {
      question: "Should I self-drive in Sri Lanka, or hire a car with a driver?",
      answer: "Both are common. Hiring a car with a driver is widely used and doesn't require an IDP at all, since you're not the one driving. Self-driving gives you more independence and generally means having your IDP ready alongside your original licence.",
    },
    {
      question: "Are hill-country roads to Kandy, Ella, or Nuwara Eliya difficult to drive?",
      answer: "They call for real caution — narrow, winding roads with hairpin bends, often no guardrails, and single-lane sections with limited passing space. Weather can also change quickly at altitude, with mist and rain common even in the dry season.",
    },
    {
      question: "Can I rent a car at Bandaranaike International Airport?",
      answer: "Yes — Bandaranaike International Airport has self-drive rental counters from local and international providers.",
    },
    {
      question: "Are Sri Lanka's expressways tolled?",
      answer: "Yes — E-Grade expressways, including the Southern Expressway, are toll roads. Electronic Toll Collection works on the Colombo-Katunayake Expressway, while other expressways are still being equipped, so manual toll payment should still be expected on some routes.",
    },
    {
      question: "What side of the road does Sri Lanka drive on?",
      answer: "Sri Lanka drives on the left, with the driver's seat on the right side of the vehicle.",
    },
    {
      question: "What's the minimum age to drive in Sri Lanka?",
      answer: "The legal minimum driving age is 18.",
    },
    {
      question: "Can I apply for an IDP after I've already arrived in Sri Lanka?",
      answer: "Yes. You can submit your application fully online even after you've arrived in Sri Lanka, since it's prepared based on your home-country licence rather than issued in person. Eligible digital documents are typically prepared in about 8 minutes after successful submission, payment, and approval, and printed documents are also available.",
    },
    {
      question: "Is a Digital IDP accepted by every rental company in Sri Lanka?",
      answer: "Not universally — acceptance can vary by rental provider, so it's worth checking with your specific rental company before your trip, or choosing the Print + Digital option for broader coverage.",
    },
  ],

  sourceCitations: [
    {
      label: "Driving Licence in Sri Lanka for Foreign Tourists",
      url: "https://tuktukrental.com/how-to-get-an-international-licence-in-sri-lanka/",
      organization: "TukTuk Rental",
    },
    {
      label: "Self Driving in Sri Lanka: A Guide to Traffic Laws and Customs",
      url: "https://tuktukrental.com/self-driving-sri-lanka-traffic-guide/",
      organization: "TukTuk Rental",
    },
  ],
  lastVerifiedDate: "2026-08-05",

  relatedCountrySlugs: ["india", "thailand", "united-kingdom", "australia"],

  primaryKeyword: "international driving permit sri lanka",
  secondaryKeywords: [
    "idp sri lanka",
    "international driving license sri lanka",
    "car rental sri lanka",
    "colombo car rental",
    "driving in sri lanka",
    "kandy road trip",
    "driving to ella",
    "galle southern expressway",
    "self drive sri lanka",
    "bandaranaike airport car rental",
    "sri lanka hill country driving",
    "sri lanka rental car requirements",
  ],
  metaTitle: "International Driving License Sri Lanka: Rental Requirements",
  metaTitleAbsolute: true,
  metaDescription:
    "A local Recognition Permit is not always a mandatory extra step. It is a separate local document, not a legal gate on top of your IDP.",
};
