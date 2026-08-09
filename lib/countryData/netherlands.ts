import type { CountryRecord } from "./types";

// Netherlands — Tier 1 flagship record, built on Master Country Template
// v1.0. No template/component changes made for this record, only data.
// First country added to lib/destinations.ts specifically for this
// build, and the first new flag built since Switzerland.
//
// "NETHERLANDS" VS. "HOLLAND": per the user's brief, this record's
// primary entity and canonical name is "Netherlands" throughout — the
// country's official name — while "Holland" (the informal but widely
// searched name, strictly referring to only two of its twelve provinces)
// appears naturally in secondary keywords and FAQ phrasing rather than
// being treated as the primary entity, since inflating a colloquial
// regional name to primary-entity status would misrepresent the country
// and risk diluting topical authority around the correct name.
//
// LEGAL SHAPE: the fifth country in this project with the same language-
// based "Commonly requested" pattern as Germany, Belgium, Sweden, and
// Switzerland — not a clean EU/EEA split. EU/EFTA licence holders need
// nothing; other visitors can generally drive on a valid original licence
// for up to 185 days, but an IDP becomes genuinely useful, and sometimes
// required by rental companies specifically, if the licence isn't in
// English or uses a non-Roman alphabet. `idpRequirementLevel: "Commonly
// requested"` / `conventionLabel: "Required for non-English licences"` —
// distinct wording from Germany's two-language and Switzerland's four-
// language labels, since only English is named as the accepted non-Dutch
// language here. Every FAQ/directAnswer touching the requirement leads
// with the practical rental-counter outcome before the legal nuance, per
// the standing project rule saved from France.
//
// CYCLING PRIORITY (Phase 5's explicit "pay special attention" item):
// this record states the actual rule precisely rather than a blanket
// "cyclists always have priority" myth — cyclists have priority on most
// roundabouts within built-up (urban) areas, including those with a
// separate ring-shaped cycle path, but generally do NOT have automatic
// priority on rural roundabouts outside built-up areas. This distinction
// is stated explicitly rather than flattened into one nationwide rule.
//
// Sourcing discipline: Semrush API units were exhausted again at the
// start of this build. GOV.UK's Netherlands safety-and-security travel
// advice was fetched directly and is the primary citation for UK licence
// validity, cyclist/tram right-of-way, and enforcement. A direct fetch of
// government.nl's international-driving-licence page was attempted, but
// that specific page addresses Dutch citizens driving abroad rather than
// foreign visitors driving in the Netherlands, so it isn't cited as a
// source for the visitor-facing requirement — disclosed rather than
// quietly substituted. Secondary sources corroborate milieuzone
// (low-emission zone) rules in Amsterdam and Rotterdam, BAC limits, and
// destination-specific driving conditions; these are marked
// partially_sourced where a single strong primary citation wasn't
// available.
//
// FLAG VERIFICATION (mandatory per the user's brief): the Netherlands had
// no existing flag component in this codebase, so NetherlandsFlag was
// built new. Colors follow the 1937 Royal Decree (refined 1958): bright
// vermilion red #AE1C28, white, cobalt blue #21468B, equal horizontal
// thirds, 2:3 ratio. The blue is deliberately the official cobalt shade,
// not the darker "Nassau blue" sometimes mistakenly used for the national
// flag (Nassau blue belongs to the Dutch Royal Standard, a different
// flag). Verified visually at zoom before this record shipped.
export const NETHERLANDS: CountryRecord = {
  slug: "netherlands",
  name: "Netherlands",
  isoCode: "NL",
  region: "Europe",
  tier: 1,

  h1: "International Driving Permit Netherlands",

  conventionStatus: {
    value: "EU and EFTA driving licence holders can drive in the Netherlands with no International Driving Permit needed. Other visitors can generally drive on a valid original licence for up to 185 days, but an IDP becomes genuinely useful, and sometimes required by rental companies, if that licence isn't already in English or uses a non-Roman alphabet",
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
      "Rental companies in the Netherlands commonly request an International Driving Permit alongside your original licence, so carrying one helps avoid delays even where the legal requirement depends on your licence's language.",
    points: [
      { tip: "EU and EFTA driving licences are valid in the Netherlands with no IDP required.", status: "confirmed" },
      { tip: "Other visitors can generally drive on a valid original licence for up to 185 days from entry.", status: "confirmed" },
      { tip: "An IDP becomes genuinely useful, and sometimes required by rental companies, if your licence isn't already in English or uses a non-Roman alphabet.", status: "confirmed" },
      { tip: "An IDP only works together with your valid original licence — it's a translation aid, not a replacement for it.", status: "confirmed" },
      { tip: "The Netherlands drives on the right, with the driver's seat on the left side of the vehicle.", status: "confirmed" },
    ],
    solutionNote: "ApplyIDPOnline prepares your IDP fully online before you travel, so it's ready before you land.",
    ctaHint: { label: "Prepare my IDP for the Netherlands", href: "/apply?destination=Netherlands" },
  },

  roadRulesGuide: {
    label: "Road Rules",
    directAnswer: "Cyclists and trams often have priority over cars in the Netherlands, low-emission zones apply in certain city centres, and both speed and drink-driving limits are actively enforced.",
    points: [
      { tip: "Cyclists have priority on most roundabouts within built-up urban areas, including those with a separate ring-shaped cycle path.", status: "confirmed" },
      { tip: "Cyclists generally do not have automatic priority on roundabouts outside built-up areas, so this rule isn't the same nationwide.", status: "confirmed" },
      { tip: "Trams have priority, and drivers must stop when a tram halts to let passengers board.", status: "confirmed" },
      { tip: "Amsterdam's low-emission zone allows diesel cars and vans meeting Euro 5 standards and above, with a €130 fine for non-compliant vehicles.", status: "confirmed" },
      { tip: "Rotterdam currently has no emission-based restriction for passenger cars and vans, though this can change.", status: "partially_sourced" },
      { tip: "Speed limits are 50 km/h in built-up areas, 80 km/h on rural roads, and up to 130 km/h on some motorways.", status: "confirmed" },
      { tip: "The blood alcohol limit is 0.05% for most drivers.", status: "confirmed" },
      { tip: "Drivers who've held their licence for less than five years face a lower 0.02% limit.", status: "confirmed" },
      { tip: "Speed cameras and unmarked police vehicles are widely used, and traffic violations carry heavy, on-the-spot fines.", status: "confirmed" },
    ],
    solutionNote: "Your IDP presents your licence details in a standardized, multi-language format that's easier for local staff and officials to read.",
    ctaHint: { label: "Check your eligibility", href: "#eligibility" },
  },

  rentalGuide: {
    label: "Rental Cars",
    directAnswer: "Self-drive car rental is available at Amsterdam's Schiphol Airport and across every major Dutch city, with most providers setting age requirements above the legal minimum.",
    points: [
      { tip: "The legal minimum driving age is 18, but rental companies typically require drivers to be at least 21, sometimes with a young-driver surcharge.", status: "partially_sourced" },
      { tip: "Schiphol Airport has rental counters from major providers including Sixt, National, Alamo, and Hertz.", status: "confirmed" },
      { tip: "Parking near Schiphol's terminals is metered by the minute, with Park & Ride areas outside the airport offering lower daily rates.", status: "confirmed" },
      { tip: "Amsterdam's city centre relies heavily on paid, metered on-street parking rather than free spaces, so factor this into a city-based itinerary.", status: "partially_sourced" },
      { tip: "Typical documents requested at pickup include your original licence, an IDP if applicable, your passport, and a credit card for the deposit.", status: "partially_sourced" },
    ],
    solutionNote: "ApplyIDPOnline prepares the IDP most rental counters expect to see alongside your original licence.",
    ctaHint: { label: "Check your eligibility", href: "#eligibility" },
  },

  policeGuide: {
    label: "Police & Roadside Checks",
    directAnswer: "Keep your original driving licence, and your International Driving Permit if you're carrying one, together as your standard document set any time you're driving in the Netherlands.",
    points: [
      { tip: "Your original licence, and your IDP if you're carrying one, should be kept together and accessible at all times, along with your passport.", status: "confirmed" },
      { tip: "Speed cameras and unmarked police vehicles are widely used across the country.", status: "confirmed" },
      { tip: "Emergency services across the Netherlands can be reached on 112.", status: "confirmed" },
    ],
    solutionNote: "A calmly prepared, correctly formatted IDP is the most straightforward way to have your documents ready if you're ever asked.",
    ctaHint: { label: "Check your eligibility", href: "#eligibility" },
  },

  borderCrossingGuide: {
    label: "Cross-Border Driving",
    directAnswer: "Driving from the Netherlands into Belgium or Germany is common and generally straightforward, with no motorway vignette needed for either country.",
    points: [
      { tip: "The Netherlands, Belgium, and Germany are all in the Schengen area, so there are no routine border checks when crossing by road.", status: "confirmed" },
      { tip: "Neither Belgium nor Germany requires a separate motorway vignette to enter, unlike Switzerland or Austria.", status: "confirmed" },
      { tip: "Most rental companies allow cross-border travel into Belgium or Germany, but confirming in advance is worth it, since policies and any fees vary by provider.", status: "partially_sourced" },
      { tip: "Your IDP requirement, where it applies, covers driving within the Netherlands — Belgium and Germany each have their own separate licence and document rules.", status: "confirmed" },
    ],
    solutionNote: "ApplyIDPOnline prepares your IDP for driving in the Netherlands — cross-border rental permissions for Belgium and Germany are handled separately with your rental provider.",
    ctaHint: { label: "Check your eligibility", href: "#eligibility" },
  },

  motorcycleScooterRelevant: false,
  vehicleCategoryNote: {
    value: "Your IDP lists the vehicle categories shown on your original licence — it doesn't grant categories your original licence doesn't already include.",
    status: "confirmed",
  },
  vehicleCategoryLabel: "Car",

  popularDrivingAreas: [
    { name: "Amsterdam", note: "The Netherlands' capital and main international gateway, with rental counters at Schiphol Airport — the city centre operates a low-emission zone and relies heavily on metered parking.", status: "confirmed" },
    { name: "Rotterdam", note: "A major port city with modern architecture, and a practical base for exploring the nearby Kinderdijk windmills and Delta Works.", status: "confirmed" },
    { name: "Keukenhof & the Tulip Fields", note: "A seasonal self-drive draw each spring, with the surrounding bulb fields well suited to exploring by car beyond the gardens themselves.", status: "confirmed" },
    { name: "Giethoorn", note: "A car-free canal village reached by driving to a nearby car park, known internationally for its car-free centre and boat-based transport.", status: "confirmed" },
  ],

  borderCrossingRelevant: true,

  emergencyNumber: { value: "112 (police, fire, ambulance)", status: "confirmed" },

  faq: [
    {
      question: "Do I need an International Driving Permit to drive in the Netherlands?",
      answer: "Rental companies commonly request an IDP alongside your original licence, so carrying one helps avoid delays at the counter. Legally, EU/EFTA licence holders don't need one, and other visitors can generally drive on a valid original licence for up to 185 days — an IDP becomes genuinely useful, and sometimes required, mainly if your licence isn't already in English. ApplyIDPOnline prepares yours fully online before your trip either way.",
    },
    {
      question: "Do EU or EFTA licence holders need an IDP for the Netherlands?",
      answer: "No. EU and EFTA driving licences are recognized in the Netherlands without any additional document.",
    },
    {
      question: "I have a US, Canadian, UK, or Australian licence — do I need an IDP?",
      answer: "Not always strictly by law, since an English-language licence already satisfies the core requirement — but many rental companies request an IDP regardless, so it's worth having one ready rather than finding out at the counter.",
    },
    {
      question: "Do cyclists always have priority over cars in the Netherlands?",
      answer: "Not automatically everywhere. Cyclists have priority on most roundabouts within built-up urban areas, including those with a separate ring-shaped cycle path, but generally don't have automatic priority on roundabouts outside built-up areas. Watch carefully at every roundabout rather than assuming one rule applies nationwide.",
    },
    {
      question: "What is a low-emission zone, and will it affect my rental car?",
      answer: "Some Dutch cities, including Amsterdam, restrict older or higher-emission vehicles from entering their city centres — Amsterdam allows diesel cars and vans meeting Euro 5 standards and above, with a €130 fine for non-compliant vehicles. Most rental cars already qualify, but it's worth confirming with your provider.",
    },
    {
      question: "Is parking difficult in Amsterdam?",
      answer: "It can be — the city centre relies heavily on metered, pay-and-display parking rather than free spaces. Park & Ride areas outside the centre often offer better rates if you're not driving directly to your accommodation.",
    },
    {
      question: "Can I rent a car at Schiphol Airport?",
      answer: "Yes — Schiphol has rental counters from major providers including Sixt, National, Alamo, and Hertz, reachable from the arrivals area.",
    },
    {
      question: "Can I drive a rental car from the Netherlands into Belgium or Germany?",
      answer: "Yes, and it's common — all three countries are in the Schengen area with no routine border checks, and neither Belgium nor Germany requires a motorway vignette. Still, tell your rental company in advance in case your agreement has restrictions or fees.",
    },
    {
      question: "What are the speed limits in the Netherlands?",
      answer: "50 km/h in built-up areas, 80 km/h on rural roads, and up to 130 km/h on some motorways, though many motorway stretches carry lower posted limits.",
    },
    {
      question: "What's the drink-driving limit in the Netherlands?",
      answer: "The blood alcohol limit is 0.05% for most drivers, dropping to 0.02% for drivers who've held their licence for less than five years.",
    },
    {
      question: "What side of the road does the Netherlands drive on?",
      answer: "The Netherlands drives on the right, with the driver's seat on the left side of the vehicle.",
    },
    {
      question: "Can I apply for an IDP after I've already arrived in the Netherlands?",
      answer: "Yes. You can submit your application fully online even after you've arrived in the Netherlands, since it's prepared based on your home-country licence rather than issued in person. Eligible digital documents are typically prepared in about 8 minutes after successful submission, payment, and approval, and printed documents are also available.",
    },
    {
      question: "Is a Digital IDP accepted by every rental company in the Netherlands?",
      answer: "Not universally — some rental providers prefer a printed copy over a digital one. It's worth checking with your specific rental company before your trip, or choosing the Print + Digital option for broader coverage.",
    },
  ],

  sourceCitations: [
    {
      label: "Foreign travel advice — Netherlands (Safety and security)",
      url: "https://www.gov.uk/foreign-travel-advice/netherlands/safety-and-security",
      organization: "GOV.UK — Foreign, Commonwealth & Development Office",
    },
    {
      label: "Low and zero emission zone",
      url: "https://www.amsterdam.nl/en/traffic-transport/low-emission-zone/",
      organization: "City of Amsterdam — official municipal government",
    },
  ],
  lastVerifiedDate: "2026-08-02",

  relatedCountrySlugs: ["belgium", "germany", "united-kingdom", "france"],

  primaryKeyword: "international driving permit netherlands",
  secondaryKeywords: [
    "idp netherlands",
    "international driving license netherlands",
    "driving in the netherlands",
    "driving in holland",
    "amsterdam car rental",
    "schiphol airport car rental",
    "cyclist priority netherlands",
    "amsterdam low emission zone",
    "keukenhof tulip fields driving",
    "giethoorn car park",
    "netherlands speed limits",
    "netherlands right hand driving",
  ],
  metaTitle: "IDP Netherlands: Eligibility & Validity",
  metaTitleAbsolute: true,
  metaDescription:
    "EU and EFTA licences need nothing extra. Others get 185 days on their original licence, with an IDP mattering mainly for non-English or non-Roman script.",
};
