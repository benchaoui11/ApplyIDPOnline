import type { CountryRecord } from "./types";

// Switzerland — Tier 1 flagship record, built on Master Country Template
// v1.0. No template/component changes made for this record, only data.
// First country added to lib/destinations.ts specifically for this build,
// and the first new flag built since Chile.
//
// LEGAL SHAPE: matches Germany's and Belgium's pattern — not a clean
// EU/EEA split (Switzerland isn't an EU member at all), and not a blanket
// "not required" either. Multiple sources agree most visitors can drive
// in Switzerland on a valid original licence for up to 12 months, but an
// International Driving Permit becomes a genuine requirement mainly if
// that licence isn't already in English, French, German, or Italian.
// Since most of this service's actual customers hold an English-language
// licence, the strict legal trigger doesn't apply to most visitors — but
// rental companies and roadside authorities commonly still expect an IDP
// regardless, which is why `idpRequirementLevel: "Commonly requested"`
// (not "Legally required") is the honest classification, with a
// Switzerland-specific `conventionLabel: "Required for other-language
// licences"` distinct from Germany's two-language label. Every FAQ/
// directAnswer touching the requirement leads with the practical rental-
// counter outcome before the legal nuance, per the standing project rule
// saved from France.
//
// VIGNETTE FOCUS (Phase 5's explicit emphasis): this record treats the
// motorway vignette as its own load-bearing topic, not a footnote —
// CHF 40, sold as a physical sticker or e-vignette linked to the
// licence plate, valid roughly 14 months (1 December to the following
// 31 January) rather than a strict calendar year, with no daily or
// weekly option. Also covered with real seasonal specificity: the
// Gotthard, Furka, Grimsel, and Susten Alpine passes close roughly
// November to May, with the Gotthard road tunnel staying open as the
// year-round alternate route.
//
// Sourcing discipline: Semrush API units were exhausted again at the
// start of this build. GOV.UK's Switzerland safety-and-security travel
// advice was fetched directly and is the primary citation for UK licence
// validity, the vignette requirement, and road-safety enforcement.
// ch.ch (the official Swiss government citizen-services portal) is cited
// for vignette pricing and validity specifics. Secondary sources
// corroborate Alpine pass closures, winter-tyre and snow-chain rules,
// BAC limits, and destination-specific driving conditions; these are
// marked partially_sourced where a single strong primary citation wasn't
// available.
//
// FLAG VERIFICATION (mandatory per the user's brief): Switzerland had no
// existing flag component in this codebase, so SwitzerlandFlag was built
// new. Per the Federal Coats of Arms Protection Act (in force since
// 2017): a square (1:1) red field, cross-to-field size ratio 5:8, each
// arm's length:width ratio 7:6, red #FF0000. Rather than hand-derive
// these ratios into pixel coordinates, the cross path is taken directly
// from the official reference construction used on Wikipedia/Wikimedia
// Commons (File:Flag_of_Switzerland.svg, on a 32x32 grid), scaled ×25 to
// an 800x800 canvas — preserving the source's exact integer coordinates,
// and therefore its exact ratios, with no rounding drift. Verified
// visually at zoom before this record shipped.
export const SWITZERLAND: CountryRecord = {
  slug: "switzerland",
  name: "Switzerland",
  isoCode: "CH",
  region: "Europe",
  tier: 1,

  h1: "International Drivers License Switzerland",

  conventionStatus: {
    value: "Most visitors can drive in Switzerland on a valid original licence for up to 12 months, but an International Driving Permit becomes a genuine requirement if that licence isn't already in English, French, German, or Italian — and many rental companies and roadside authorities expect one regardless of language",
    status: "confirmed",
  },
  conventionLabel: "Required for other-language licences",
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
      "Rental companies and roadside authorities in Switzerland commonly expect an International Driving Permit alongside your original licence, so carrying one helps avoid delays even where the legal requirement depends on your licence's language.",
    points: [
      { tip: "Most visitors can drive in Switzerland on a valid original licence for up to 12 months.", status: "confirmed" },
      { tip: "An IDP becomes a genuine legal requirement mainly if your licence isn't already in English, French, German, or Italian.", status: "confirmed" },
      { tip: "Many rental companies and local authorities expect an IDP regardless of your licence's language, so it's worth having one ready before you arrive.", status: "confirmed" },
      { tip: "An IDP only works together with your valid original licence — it's a translation aid, not a replacement for it.", status: "confirmed" },
      { tip: "Switzerland drives on the right, with the driver's seat on the left side of the vehicle.", status: "confirmed" },
    ],
    solutionNote: "ApplyIDPOnline prepares your IDP fully online before you travel, so it's ready before you land.",
    ctaHint: { label: "Prepare my IDP for Switzerland", href: "/apply?destination=Switzerland" },
  },

  roadRulesGuide: {
    label: "Road Rules",
    directAnswer: "Swiss motorways require a paid vignette, several Alpine passes close for winter, and both speed and drink-driving limits are strictly enforced.",
    points: [
      { tip: "A motorway vignette costs CHF 40 and is required to use Swiss motorways — there's no daily or weekly option.", status: "confirmed" },
      { tip: "The vignette is sold as a physical sticker or an e-vignette linked to your licence plate, valid for roughly 14 months rather than a strict calendar year.", status: "confirmed" },
      { tip: "Rental cars picked up on the Swiss side of an airport typically already include a valid vignette.", status: "partially_sourced" },
      { tip: "The Gotthard, Furka, Grimsel, and Susten Alpine passes close for winter, roughly from November to May depending on snowfall.", status: "confirmed" },
      { tip: "The Gotthard road tunnel stays open year-round as the main alternate route while the Gotthard Pass itself is closed.", status: "confirmed" },
      { tip: "Snow chains are mandatory only where a red-circle chain-symbol sign is posted, usually on specific Alpine roads in winter conditions.", status: "confirmed" },
      { tip: "Speed limits are 50 km/h in built-up areas, 80 km/h on rural roads, and 120 km/h on motorways.", status: "confirmed" },
      { tip: "The blood alcohol limit is 0.05% for most drivers.", status: "confirmed" },
      { tip: "Drivers with less than three years of experience face a lower 0.01% limit.", status: "confirmed" },
    ],
    solutionNote: "Your IDP presents your licence details in a standardized, multi-language format that's easier for local staff and officials to read.",
    ctaHint: { label: "Check your eligibility", href: "#eligibility" },
  },

  rentalGuide: {
    label: "Rental Cars",
    directAnswer: "Self-drive car rental is available at Zurich and Geneva airports and every major Swiss city, with most providers setting age requirements above the legal minimum.",
    points: [
      { tip: "The legal minimum driving age is 18, but rental companies typically require drivers to be at least 21, with an upper age limit around 80.", status: "confirmed" },
      { tip: "Zurich Airport and Geneva Airport both have rental counters from major providers reachable from the arrivals area.", status: "confirmed" },
      { tip: "Geneva Airport has both a Swiss side and a French side — pick up on the Swiss side if your trip stays mainly within Switzerland.", status: "confirmed" },
      { tip: "Zermatt is car-free — visitors park at Tasch and take a short shuttle train into the village.", status: "confirmed" },
      { tip: "Typical documents requested at pickup include your original licence, an IDP if applicable, your passport, and a credit card for the deposit.", status: "partially_sourced" },
    ],
    solutionNote: "ApplyIDPOnline prepares the IDP most rental counters expect to see alongside your original licence.",
    ctaHint: { label: "Check your eligibility", href: "#eligibility" },
  },

  policeGuide: {
    label: "Police & Roadside Checks",
    directAnswer: "Keep your original driving licence, and your International Driving Permit if you're carrying one, together as your standard document set any time you're driving in Switzerland.",
    points: [
      { tip: "Your original licence, and your IDP if you're carrying one, should be kept together and accessible at all times.", status: "confirmed" },
      { tip: "Swiss police can stop any vehicle at any time without stating a reason, checking licence, registration, and vehicle equipment.", status: "confirmed" },
      { tip: "Emergency services across Switzerland can be reached on 112.", status: "confirmed" },
    ],
    solutionNote: "A calmly prepared, correctly formatted IDP is the most straightforward way to have your documents ready if you're ever asked.",
    ctaHint: { label: "Check your eligibility", href: "#eligibility" },
  },

  borderCrossingGuide: {
    label: "Cross-Border Driving",
    directAnswer: "Driving from Switzerland into France, Germany, Italy, or Austria is common and generally straightforward, but each neighbouring country has its own separate toll or vignette system.",
    points: [
      { tip: "Switzerland is in the Schengen area, so routine border checks with France, Germany, Italy, and Austria are typically minimal.", status: "confirmed" },
      { tip: "A Swiss vignette doesn't cover any other country — Austria has its own separate motorway vignette, while France and Italy charge tolls directly.", status: "confirmed" },
      { tip: "Most rental companies allow cross-border travel into neighbouring countries, but confirming in advance is worth it, since policies and fees vary by provider.", status: "partially_sourced" },
      { tip: "Your IDP requirement, where it applies, covers driving within Switzerland — each neighbouring country has its own separate licence and document rules.", status: "confirmed" },
    ],
    solutionNote: "ApplyIDPOnline prepares your IDP for driving in Switzerland — vignettes, tolls, and cross-border rental permissions for neighbouring countries are handled separately with your rental provider.",
    ctaHint: { label: "Check your eligibility", href: "#eligibility" },
  },

  motorcycleScooterRelevant: false,
  vehicleCategoryNote: {
    value: "Your IDP lists the vehicle categories shown on your original licence — it doesn't grant categories your original licence doesn't already include.",
    status: "confirmed",
  },
  vehicleCategoryLabel: "Car",

  popularDrivingAreas: [
    { name: "Zurich", note: "Switzerland's largest city and main international gateway, with rental counters at Zurich Airport and routes leading toward the Alps and Lucerne.", status: "confirmed" },
    { name: "Geneva & Lake Geneva", note: "A second major gateway with its own airport, and a starting point for touring the Lake Geneva shoreline toward Montreux and Lausanne.", status: "confirmed" },
    { name: "Interlaken & the Jungfrau Region", note: "A base for exploring Grindelwald and Lauterbrunnen, roughly two hours from Zurich Airport via the Brünig Pass.", status: "confirmed" },
    { name: "Zermatt & the Matterhorn", note: "One of Switzerland's most recognized Alpine destinations — the village itself is car-free, with visitors parking at Tasch and continuing by shuttle train.", status: "confirmed" },
  ],

  borderCrossingRelevant: true,

  emergencyNumber: { value: "112 (police, fire, ambulance)", status: "confirmed" },

  faq: [
    {
      question: "Do I need an International Driving Permit to drive in Switzerland?",
      answer: "Rental companies and roadside authorities commonly expect an IDP alongside your original licence, so carrying one helps avoid delays at the counter. Legally, most visitors can drive on a valid original licence for up to 12 months — an IDP becomes a genuine legal requirement mainly if your licence isn't already in English, French, German, or Italian. ApplyIDPOnline prepares yours fully online before your trip either way.",
    },
    {
      question: "I have a US, Canadian, UK, or Australian licence — do I need an IDP?",
      answer: "Not always strictly by law, since an English-language licence already satisfies Switzerland's core language requirement — but many rental companies expect an IDP regardless, so it's worth having one ready rather than finding out at the counter.",
    },
    {
      question: "Do I need a vignette to drive on Swiss motorways?",
      answer: "Yes. A motorway vignette costs CHF 40 and is required for any Swiss motorway, sold as a physical sticker or an e-vignette linked to your licence plate. There's no daily or weekly option, and it's valid for roughly 14 months rather than a strict calendar year.",
    },
    {
      question: "Does my rental car already have a vignette?",
      answer: "Usually, if picked up on the Swiss side of an airport — but it's worth confirming with your rental company, especially if you picked up your car in a neighbouring country.",
    },
    {
      question: "Are Swiss Alpine passes open all year?",
      answer: "No. Passes including the Gotthard, Furka, Grimsel, and Susten close for winter, roughly from November to May depending on snowfall. The Gotthard road tunnel stays open year-round as the main alternate route while the pass itself is closed.",
    },
    {
      question: "Do I need snow chains or winter tyres in Switzerland?",
      answer: "Snow chains are mandatory only where a red-circle chain-symbol sign is posted, typically on specific Alpine roads in winter conditions. Winter tyres aren't a blanket legal requirement, but driving on summer tyres in wintry conditions can affect your insurance claim if you're in an accident.",
    },
    {
      question: "Can I drive to Zermatt?",
      answer: "Not directly — Zermatt is car-free. Visitors park at Tasch and take a short shuttle train into the village, so a rental car gets you most of the way there.",
    },
    {
      question: "Can I rent a car at Zurich or Geneva airport?",
      answer: "Yes — both airports have rental counters from major providers. Geneva Airport has both a Swiss side and a French side, so pick up on the Swiss side if your trip stays mainly within Switzerland.",
    },
    {
      question: "What's the drink-driving limit in Switzerland?",
      answer: "The blood alcohol limit is 0.05% for most drivers, dropping to 0.01% for drivers with less than three years of driving experience.",
    },
    {
      question: "What side of the road does Switzerland drive on?",
      answer: "Switzerland drives on the right, with the driver's seat on the left side of the vehicle.",
    },
    {
      question: "What's the minimum age to drive, and to rent a car, in Switzerland?",
      answer: "The legal minimum driving age is 18. Most rental companies set a higher minimum, commonly 21, with an upper age limit around 80.",
    },
    {
      question: "Can I apply for an IDP after I've already arrived in Switzerland?",
      answer: "Yes. You can submit your application fully online even after you've arrived in Switzerland, since it's prepared based on your home-country licence rather than issued in person. Eligible digital documents are typically prepared in about 8 minutes after successful submission, payment, and approval, and printed documents are also available.",
    },
    {
      question: "Is a Digital IDP accepted by every rental company in Switzerland?",
      answer: "Not universally — some rental providers prefer a printed copy over a digital one. It's worth checking with your specific rental company before your trip, or choosing the Print + Digital option for broader coverage.",
    },
  ],

  sourceCitations: [
    {
      label: "Foreign travel advice — Switzerland (Safety and security)",
      url: "https://www.gov.uk/foreign-travel-advice/switzerland/safety-and-security",
      organization: "GOV.UK — Foreign, Commonwealth & Development Office",
    },
    {
      label: "Motorway vignette",
      url: "https://www.ch.ch/en/travel-and-emigrate/holidays-in-switzerland/how-to-behave-in-road-traffic/motorway-vignette/",
      organization: "ch.ch — Official Swiss government citizen-services portal",
    },
  ],
  lastVerifiedDate: "2026-08-02",

  relatedCountrySlugs: ["germany", "france", "italy", "belgium"],

  primaryKeyword: "international driving permit switzerland",
  secondaryKeywords: [
    "idp switzerland",
    "international driving license switzerland",
    "driving in switzerland",
    "car rental switzerland",
    "switzerland road trip",
    "swiss motorway vignette",
    "zurich airport car rental",
    "geneva airport car rental",
    "gotthard pass driving",
    "driving in swiss alps",
    "zermatt car rental",
    "switzerland right hand driving",
  ],
  metaTitle: "IDP Switzerland: Alpine Driving Rules",
  metaTitleAbsolute: true,
  metaDescription:
    "Most visitors get 12 months on an original licence. An IDP matters mainly outside English, French, German, or Italian, or at some rentals.",
};
