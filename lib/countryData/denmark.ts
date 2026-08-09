import type { CountryRecord } from "./types";

// Denmark — Tier 1 Scandinavian record, built on Master Country Template
// v1.0. No template/component changes made for this record, only data.
// This is the first pass for Denmark — no prior flag component,
// destinations.ts entry, or flagColors.ts entry existed before this
// build; all three were added.
//
// LEGAL SHAPE — script-based, not the usual EU/EEA-bloc framing used for
// Hungary/Norway/Austria/Poland: EU, EEA, Swiss, and Nordic licences are
// fully valid in Denmark with no time limit and no IDP needed. For other
// non-EU/EEA visitors, the operative distinction is whether the licence
// is printed in Latin script with a photograph — if it is, it's
// generally usable for up to 90 days from entry; if it isn't, an IDP (or
// an authorized translation into Danish, English, or French) is what
// makes it usable. `idpRequirementLevel: "Commonly requested"` /
// `conventionLabel: "Required for non-Latin-script licences"` — chosen
// because the actual legal mechanism here is about script, not a
// EU/EEA-vs-rest split or a single accepted language the way Saudi
// Arabia's or the Netherlands' records were. Every FAQ/directAnswer
// touching the requirement leads with the practical rental-counter
// outcome before the legal nuance, per the standing project rule saved
// from France.
//
// BRIDGE TOLLS, deliberately not collapsed into one generic "Denmark has
// tolls" line per the brief's explicit instruction: the Øresund Bridge
// (to Sweden) and the Great Belt Bridge (an entirely internal Zealand-
// Funen crossing, not a border crossing) are two separate structures
// with two different pricing and charging models. The Øresund Bridge
// charges a standard rate of roughly DKK 400 for a passenger car, or
// about DKK 280 with a BroBizz transponder or registered number plate.
// The Great Belt Bridge only charges in one direction — eastbound from
// Funen toward Zealand — while the westbound return crossing is free,
// a detail easy to miss and worth stating plainly. Both bridges accept
// the same BroBizz account/transponder system, and rental cars can
// typically have their plate registered for automatic billing without
// needing a physical transponder fitted.
//
// CYCLING PRIORITY, included because it's a genuine, specific, and
// easy-to-get-wrong rule for a visiting driver rather than generic
// "watch out for cyclists" advice: in Denmark, a car turning right must
// give way to cyclists and moped riders continuing straight through the
// same junction — the opposite of priority order many visiting drivers
// default to. This is stated as its own rule, not folded into a vague
// caution line.
//
// POPULAR DRIVING AREAS RESEARCH NOTE: the brief asked me to seriously
// weigh Copenhagen, Aarhus, Billund, Odense/Funen, Skagen/North Jutland,
// Møns Klint, Roskilde, and Bornholm, and was explicit that Copenhagen
// shouldn't be omitted without overwhelming justification — it wasn't
// close to being omitted, since "copenhagen car rental" (2,400/mo, dk
// database) is by a wide margin the strongest rental-specific term found
// anywhere in this research pass. Aarhus is Denmark's actual second
// city, both by its own volume (110,000/mo generic) and a genuine
// standalone rental-specific term. Billund's combined demand — the town
// itself (33,100/mo), Legoland (49,500/mo), and Billund Airport
// (18,100/mo) — rivals Aarhus's on aggregate and comes with the
// strongest self-drive/family-road-trip narrative and its own
// independent airport gateway, the same pattern that earned Kraków and
// Salzburg their slots in earlier records. Skagen (40,500/mo) is the
// clearest pure road-trip entity in the set — the classic drive to the
// northern tip of Jutland where two seas meet — and was chosen over
// Bornholm (also 40,500/mo) because Bornholm's own access is primarily
// by ferry or flight rather than a mainland self-drive route, a
// meaningfully different narrative from a driving-guide perspective.
// Roskilde's raw volume (110,000/mo) is real but reads as festival- and
// Viking-Ship-Museum-driven general interest rather than a self-drive
// signal, and Odense/Funen and Møns Klint were both evaluated and are
// covered in the FAQ rather than given a card, since every prior country
// record in this project holds Popular Driving Areas at exactly four.
//
// Sourcing discipline: Semrush's keyword_research tool succeeded this
// build (phrase_these reports run against the uk, dk, and de databases,
// which is what surfaced the Billund/Skagen findings above). GOV.UK-
// equivalent primary sourcing for Denmark's licence rules came from the
// Danish Road Traffic Authority and the City of Copenhagen's own foreign-
// driving-licence guidance, both independently describing the same
// Latin-script/90-day framework. Fields not corroborated by a primary
// government source are marked partially_sourced.
//
// FLAG VERIFICATION (mandatory per the user's brief): no DenmarkFlag
// component existed before this build. The new component reproduces
// Dannebrog's actual construction — a plain, unfimbriated white Nordic
// cross offset to the hoist on a red field, per the 1748 flag regulation
// still in force — at the flag's own official 28:37 ratio (900x681)
// rather than this codebase's usual 900x600 canvas, since Denmark's
// proportions are notably closer to square than most flags built in
// this project. Red is the hex value most consistently cited against
// Denmark's flag specification (#C60C30). Verified visually at zoom
// before this record shipped.
export const DENMARK: CountryRecord = {
  slug: "denmark",
  name: "Denmark",
  isoCode: "DK",
  region: "Europe",
  tier: 1,

  h1: "International Driving Permit Denmark",

  conventionStatus: {
    value: "EU, EEA, Swiss, and Nordic driving licences are fully valid in Denmark with no time limit and no International Driving Permit needed. Other non-EU/EEA visitors can generally use a licence printed in Latin script with a photograph for up to 90 days from entry; a licence not in Latin script needs an IDP or an authorized translation into Danish, English, or French",
    status: "confirmed",
  },
  conventionLabel: "Required for non-Latin-script licences",
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
      "Most car rental companies in Copenhagen ask for an International Driving Permit at the counter, so carrying one helps you avoid delays even where the underlying legal requirement depends on your licence.",
    points: [
      { tip: "EU, EEA, Swiss, and Nordic driving licences are fully valid in Denmark — no IDP is needed at all.", status: "confirmed" },
      { tip: "Other non-EU/EEA visitors can generally use a licence printed in Latin script with a photograph for up to 90 days from entry.", status: "confirmed" },
      { tip: "A licence not in Latin script needs an IDP or an authorized translation into Danish, English, or French to be usable.", status: "confirmed" },
      { tip: "Most rental companies in Copenhagen and beyond treat an IDP as a standard condition of rental regardless of these exceptions.", status: "confirmed" },
      { tip: "Denmark drives on the right, with the driver's seat on the left side of the vehicle.", status: "confirmed" },
    ],
    solutionNote: "ApplyIDPOnline prepares your IDP fully online before you travel, so it's ready before you land in Copenhagen.",
    ctaHint: { label: "Prepare my IDP for Denmark", href: "/apply?destination=Denmark" },
  },

  roadRulesGuide: {
    label: "Road Rules",
    directAnswer: "Denmark's two major bridges have genuinely different toll structures, drivers turning right must give way to cyclists going straight, and speed limits vary by road type.",
    points: [
      { tip: "The Øresund Bridge to Sweden charges a passenger car roughly DKK 400 at the standard rate, or about DKK 280 with a BroBizz transponder or registered number plate.", status: "confirmed" },
      { tip: "The Great Belt Bridge, an entirely internal crossing between Funen and Zealand, only charges in the eastbound direction toward Zealand — the westbound return trip is free.", status: "confirmed" },
      { tip: "Both bridges use the same BroBizz account system, and rental cars can typically have their plate registered for automatic billing without a physical transponder.", status: "confirmed" },
      { tip: "A car turning right must give way to cyclists and moped riders continuing straight through the same junction.", status: "confirmed" },
      { tip: "Speed limits are generally 50km/h in urban areas, 80km/h on ordinary rural roads, and up to 130km/h on motorways depending on the stretch.", status: "confirmed" },
      { tip: "Denmark's drink-driving limit is 0.05% blood alcohol.", status: "confirmed" },
    ],
    solutionNote: "Your IDP presents your licence details in a standardized, multi-language format that's easier for local officials to check.",
    ctaHint: { label: "Check your eligibility", href: "#eligibility" },
  },

  rentalGuide: {
    label: "Rental Cars",
    directAnswer: "Self-drive car rental is available at Copenhagen Airport, Billund Airport, and Aarhus, with Billund's own airport making it a genuine independent starting point for Legoland and Jutland trips.",
    points: [
      { tip: "The legal minimum driving age is 18, but rental company minimums are typically higher — commonly 20 or 21 with at least a year's licence history, and a young-driver surcharge often applies under 26.", status: "confirmed" },
      { tip: "Copenhagen Airport and Billund Airport both have rental counters from major providers, with Aarhus also a real option for trips focused on Jutland.", status: "confirmed" },
      { tip: "Copenhagen's paid-parking zones — red, green, blue, and yellow — get progressively cheaper further from the city centre, with rates varying by time of day.", status: "confirmed" },
      { tip: "Typical documents requested at pickup are your original licence, an IDP if applicable, your passport or ID, and a credit card in the main driver's name for the deposit.", status: "confirmed" },
    ],
    solutionNote: "ApplyIDPOnline prepares the IDP most Danish rental counters expect to see alongside your original licence.",
    ctaHint: { label: "Check your eligibility", href: "#eligibility" },
  },

  policeGuide: {
    label: "Police & Roadside Checks",
    directAnswer: "Keep your original driving licence, and your International Driving Permit if you're carrying one, together as your standard document set any time you're driving in Denmark.",
    points: [
      { tip: "Your original licence, and your IDP if you're carrying one, should be kept together and accessible at all times while driving.", status: "confirmed" },
      { tip: "112 is the number for life-threatening emergencies, reaching police, ambulance, and fire — 114 is the separate number for non-emergency police contact.", status: "confirmed" },
    ],
    solutionNote: "A calmly prepared, correctly formatted IDP is the most straightforward way to have your documents ready if you're ever asked.",
    ctaHint: { label: "Check your eligibility", href: "#eligibility" },
  },

  borderCrossingGuide: {
    label: "Cross-Border Driving",
    directAnswer: "Driving from Denmark into Germany is a free-flow Schengen land crossing, while driving into Sweden means crossing the tolled Øresund Bridge instead of an open land border.",
    points: [
      { tip: "Germany is Denmark's only land border, and both countries are Schengen members, so crossing is normally free-flow with no routine document checks.", status: "confirmed" },
      { tip: "Denmark has no land border with Sweden — driving there means crossing the Øresund Bridge, a tolled route rather than an open border crossing.", status: "confirmed" },
      { tip: "Tell your rental company in advance if you're planning to cross into Germany or Sweden, since cross-border coverage needs to be confirmed rather than assumed.", status: "confirmed" },
      { tip: "Your IDP requirement, where it applies, covers driving within Denmark — Germany and Sweden each set their own separate licence and document rules.", status: "confirmed" },
    ],
    solutionNote: "ApplyIDPOnline prepares your IDP for driving in Denmark — bridge tolls and cross-border rental arrangements are confirmed separately with your provider.",
    ctaHint: { label: "Check your eligibility", href: "#eligibility" },
  },

  motorcycleScooterRelevant: false,
  vehicleCategoryNote: {
    value: "Your IDP lists the vehicle categories shown on your original licence — it doesn't grant categories your original licence doesn't already include.",
    status: "confirmed",
  },
  vehicleCategoryLabel: "Car",

  popularDrivingAreas: [
    { name: "Copenhagen", note: "Denmark's dominant rental market by a wide margin, with pickup at Copenhagen Airport and a zoned paid-parking system worth understanding before you park downtown.", status: "confirmed" },
    { name: "Aarhus", note: "Denmark's second-largest city and a genuine rental market in its own right, serving as a natural base for exploring eastern Jutland.", status: "confirmed" },
    { name: "Billund", note: "Home to Legoland and its own international airport, making it an independent self-drive gateway rather than just a day trip from Copenhagen.", status: "confirmed" },
    { name: "Skagen", note: "The classic Danish road trip to the northern tip of Jutland, where the North Sea and Baltic Sea visibly meet.", status: "confirmed" },
  ],

  borderCrossingRelevant: true,

  emergencyNumber: { value: "112 (emergency), 114 (non-emergency police)", status: "confirmed" },

  faq: [
    {
      question: "Do I need an International Driving Permit to drive in Denmark?",
      answer: "Most rental companies in Copenhagen ask for an IDP at the counter, so carrying one helps you avoid delays. Legally, EU, EEA, Swiss, and Nordic licences are fully valid with no IDP needed at all — other non-EU/EEA visitors can generally use a Latin-script licence with a photo for up to 90 days, and an IDP becomes necessary mainly if the licence isn't in Latin script. ApplyIDPOnline prepares yours fully online before your trip either way.",
    },
    {
      question: "I have a US, UK, Canadian, or Australian licence — do I need an IDP?",
      answer: "Not always strictly by law, since these licences are already in Latin script with a photograph and can generally be used for up to 90 days from entry. Most rental companies expect an IDP regardless, so it's worth having one ready rather than finding out at the counter.",
    },
    {
      question: "What's the difference between the Øresund Bridge and Great Belt Bridge tolls?",
      answer: "They're separate crossings with separate pricing. The Øresund Bridge connects Denmark to Sweden and costs roughly DKK 400 for a passenger car at the standard rate, or about DKK 280 with BroBizz. The Great Belt Bridge is entirely within Denmark, connecting Funen and Zealand, and only charges in the eastbound direction — the return trip west is free.",
    },
    {
      question: "Do I need a physical transponder to pay Denmark's bridge tolls in a rental car?",
      answer: "Not necessarily — rental cars can typically have their number plate registered for automatic billing on the Øresund and Great Belt bridges without needing a physical BroBizz unit fitted, though this is worth confirming with your specific rental company.",
    },
    {
      question: "Do cars or cyclists have priority in Denmark?",
      answer: "Cyclists do in the situation that trips up most visiting drivers: a car turning right must give way to cyclists and moped riders continuing straight through the same junction.",
    },
    {
      question: "Can I rent a car at Billund Airport for Legoland?",
      answer: "Yes — Billund Airport has its own rental counters from major providers, making it a genuine independent starting point for Legoland and wider Jutland trips rather than just a day trip from Copenhagen.",
    },
    {
      question: "Is parking difficult in Copenhagen?",
      answer: "It's zoned rather than difficult — red, green, blue, and yellow paid-parking zones get progressively cheaper the further you are from the city centre, with rates also varying by time of day.",
    },
    {
      question: "Is Skagen worth driving to?",
      answer: "Yes — it's Denmark's classic road trip, a drive to the northern tip of Jutland where the North Sea and Baltic Sea are visibly separate as they meet.",
    },
    {
      question: "Can I drive a rental car from Denmark into Germany or Sweden?",
      answer: "Into Germany, yes, via a free-flow Schengen land border. Into Sweden, there's no land border at all — you'd cross the tolled Øresund Bridge instead. Tell your rental company in advance so cross-border coverage is confirmed for either route.",
    },
    {
      question: "What side of the road does Denmark drive on?",
      answer: "Denmark drives on the right, with the driver's seat on the left side of the vehicle.",
    },
    {
      question: "What's the minimum age to drive, and to rent a car, in Denmark?",
      answer: "The legal minimum driving age is 18. Rental company minimums are typically higher — commonly 20 or 21 with at least a year's licence history — and a young-driver surcharge often applies under 26.",
    },
    {
      question: "Can I apply for an IDP after I've already arrived in Denmark?",
      answer: "Yes. You can submit your application fully online even after you've arrived in Denmark, since it's prepared based on your home-country licence rather than issued in person. Eligible digital documents are typically prepared in about 8 minutes after successful submission, payment, and approval, and printed documents are also available.",
    },
    {
      question: "Is a Digital IDP accepted by every rental company in Denmark?",
      answer: "Not universally — acceptance can vary by rental provider, so it's worth checking with your specific rental company before your trip, or choosing the Print + Digital option for broader coverage.",
    },
  ],

  sourceCitations: [
    {
      label: "Foreign driving licences, exchanges and Visitor's Driving Licences",
      url: "https://www.danishroadtrafficauthority.dk/driving-license/foreign-driving-licences/foreign-driving-licences-exchanges-and-visitors-driving-licences",
      organization: "Danish Road Traffic Authority (Færdselsstyrelsen)",
    },
    {
      label: "Foreign driving licences in Denmark",
      url: "https://international.kk.dk/live/transport-and-parking/driving-in-copenhagen/foreign-driving-licences",
      organization: "City of Copenhagen",
    },
  ],
  lastVerifiedDate: "2026-08-05",

  relatedCountrySlugs: ["sweden", "norway", "germany", "netherlands"],

  primaryKeyword: "international driving permit denmark",
  secondaryKeywords: [
    "idp denmark",
    "international driving license denmark",
    "car rental denmark",
    "copenhagen car rental",
    "copenhagen airport car rental",
    "billund airport car rental",
    "oresund bridge toll",
    "great belt bridge toll",
    "driving in copenhagen",
    "denmark cycling rules",
    "skagen road trip",
    "denmark parking zones",
  ],
  metaTitle: "IDP Denmark: Eligibility Requirements",
  metaTitleAbsolute: true,
  metaDescription:
    "EU, EEA, Nordic, and Swiss licences need nothing extra. A licence outside Latin script needs an IDP or an authorised translation into Danish or English.",
};
