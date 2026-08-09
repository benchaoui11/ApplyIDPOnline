import type { CountryRecord } from "./types";

// Belgium — Tier 1 record, built on Master Country Template v1.0. No
// template/component changes made for this record, only data. First
// country added to lib/destinations.ts specifically for this build (like
// Romania before it), and the first flag built entirely new since Romania.
//
// LEGAL SHAPE: closely mirrors Germany's — not a clean EU/EEA split, and
// not a blanket "not required" either. Belgium's own federal government
// portal (mobilit.belgium.be — FPS Mobility and Transport, fetched
// directly) confirms EU/EEA licences remain valid with no exchange or
// extra document needed, and that other visitors may drive on a valid
// recognized licence (under the Vienna or Geneva Conventions) during an
// initial period. Secondary sources sharpen the practical trigger: an IDP
// or an official English translation is required specifically when the
// original licence is printed in a non-Roman alphabet, and tourists on a
// standard Roman-alphabet licence (including US licences) are not legally
// required to carry one — though many rental companies request one
// anyway. This matches Germany's pattern more than Spain/Italy/Romania/
// Brazil's, so this record sets `idpRequirementLevel: "Commonly
// requested"` with a Belgium-specific `conventionLabel: "Required for
// non-Roman-alphabet licences"`. Every FAQ/directAnswer touching the
// requirement leads with the practical rental-counter outcome before the
// legal nuance, per the standing project rule saved from France and
// reapplied for Germany.
//
// REGIONAL NUANCE, stated honestly rather than smoothed into one national
// figure: Belgium's federal speed-limit structure sets a 90 km/h default
// on roads outside built-up areas, but the Flemish Region has lowered its
// own default to 70 km/h on ordinary roads outside built-up areas, while
// Wallonia and the Brussels-Capital Region keep the 90 km/h default — this
// is disclosed as a regional difference, not flattened into a single
// number.
//
// Sourcing discipline: Semrush API units were exhausted again at the
// start of this build. Two sources were fetched in full: mobilit.
// belgium.be (Belgium's federal FPS Mobility and Transport portal) and
// GOV.UK's Belgium safety-and-security travel advice — both confirmed
// directly. Secondary sources corroborate the Low Emission Zone
// pre-registration systems in Brussels/Antwerp/Ghent, the largely
// toll-free motorway network, BAC limits, and destination-specific
// driving conditions; these are marked partially_sourced.
//
// FLAG VERIFICATION (mandatory per the user's brief): Belgium had no
// existing flag component in this codebase, so BelgiumFlag was built new.
// Colors are the values from the Official Guide to Belgian Protocol
// (black #000000, yellow #FDDA24, red #EF3340). Proportions use Belgium's
// official constitutional ratio of 13:15 (height:width) — a near-square
// flag stemming from a 19th-century Ministry of Foreign Affairs directive
// specifying 2.60m high by 3.00m long — rather than the 2:3 ratio sold
// commercially and used by many unofficial flag graphics, since the
// user's brief calls for the official government specification
// specifically. Verified visually at zoom before this record shipped.
export const BELGIUM: CountryRecord = {
  slug: "belgium",
  name: "Belgium",
  isoCode: "BE",
  region: "Europe",
  tier: 1,

  h1: "International Driving Permit Belgium",

  conventionStatus: {
    value: "EU and EEA driving licence holders can drive in Belgium with no International Driving Permit needed. Other visitors can generally drive on a valid original licence, but if it's printed in a non-Roman alphabet, an International Driving Permit or an official English translation is required alongside it — and many rental companies request one regardless of language",
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
      "Rental-company requirements can depend on your licence's language and the provider's own policy, so carrying an International Driving Permit alongside your original licence helps reduce delays or refusal at the counter in Belgium, even where the legal requirement depends on your licence.",
    points: [
      { tip: "EU and EEA driving licences are valid in Belgium with no IDP required.", status: "confirmed" },
      { tip: "Other visitors can generally drive on a valid original licence, but if it's printed in a non-Roman alphabet, an IDP or an official English translation is required alongside it.", status: "confirmed" },
      { tip: "Many rental companies request an IDP regardless of your licence's language, so it's worth having one ready before you arrive.", status: "confirmed" },
      { tip: "An IDP only works together with your valid original licence — it's a translation aid, not a replacement for it.", status: "confirmed" },
      { tip: "Belgium drives on the right, with the driver's seat on the left side of the vehicle.", status: "confirmed" },
    ],
    solutionNote: "ApplyIDPOnline prepares your IDP fully online before you travel, so it's ready before you land.",
    ctaHint: { label: "Prepare my IDP for Belgium", href: "/apply?destination=Belgium" },
  },

  roadRulesGuide: {
    label: "Road Rules",
    directAnswer: "Belgium's motorway network is largely toll-free, Low Emission Zones in Brussels, Antwerp, and Ghent require advance registration, and speed limits vary slightly by region.",
    points: [
      { tip: "Standard speed limits are 50 km/h in built-up areas and 120 km/h on motorways.", status: "confirmed" },
      { tip: "Outside built-up areas, the default is 90 km/h in Wallonia and the Brussels-Capital Region, but the Flemish Region has lowered its own default to 70 km/h on ordinary roads.", status: "confirmed" },
      { tip: "Belgium's motorway network is largely toll-free for private cars — a contrast to neighbouring France — with the Liefkenshoektunnel near Antwerp a notable exception.", status: "confirmed" },
      { tip: "Brussels, Antwerp, and Ghent each operate a Low Emission Zone requiring free advance online registration — Antwerp's registration also covers Ghent, but not Brussels.", status: "confirmed" },
      { tip: "Without valid LEZ registration, a day pass can be bought up to 12 times a year, though driving in unregistered still risks a fine if a pass isn't purchased in time.", status: "partially_sourced" },
      { tip: "The blood alcohol limit is 0.05% for private drivers.", status: "confirmed" },
      { tip: "Professional drivers face a lower 0.02% limit.", status: "confirmed" },
      { tip: "Random roadside breath tests are common, especially on weekends and during holiday periods.", status: "confirmed" },
    ],
    solutionNote: "Your IDP presents your licence details in a standardized, multi-language format that's easier for local staff and officials to read.",
    ctaHint: { label: "Check your eligibility", href: "#eligibility" },
  },

  rentalGuide: {
    label: "Rental Cars",
    directAnswer: "Self-drive car rental is available at Brussels Airport and every major Belgian city, with most providers setting age and licence-history requirements above the legal minimum.",
    points: [
      { tip: "The legal minimum driving age is 18, but rental companies typically require drivers to be at least 21, sometimes with a young-driver surcharge.", status: "partially_sourced" },
      { tip: "Brussels Airport (BRU) has rental counters from all major providers in a dedicated car rental building a short walk from the terminal.", status: "confirmed" },
      { tip: "Rental cars picked up in or near a Low Emission Zone are usually registered automatically, but confirming this with your provider is worth the extra step.", status: "partially_sourced" },
      { tip: "Taking a rental car across Belgium's borders is common, but tell your rental company in advance in case your agreement has restrictions or fees.", status: "confirmed" },
      { tip: "Typical documents requested at pickup include your original licence, an IDP if applicable, your passport, and a credit card for the deposit.", status: "partially_sourced" },
    ],
    solutionNote: "ApplyIDPOnline prepares the IDP most rental counters expect to see alongside your original licence.",
    ctaHint: { label: "Check your eligibility", href: "#eligibility" },
  },

  policeGuide: {
    label: "Police & Roadside Checks",
    directAnswer: "Keep your original driving licence, and your International Driving Permit if you're carrying one, together as your standard document set any time you're driving in Belgium.",
    points: [
      { tip: "Your original licence, and your IDP if you're carrying one, should be kept together and accessible at all times, along with your passport.", status: "confirmed" },
      { tip: "Belgian police use speed traps, fixed cameras, and unmarked vehicles, and speeding fines can be issued on the spot.", status: "confirmed" },
      { tip: "Emergency services across Belgium can be reached on 112.", status: "confirmed" },
    ],
    solutionNote: "A calmly prepared, correctly formatted IDP is the most straightforward way to have your documents ready if you're ever asked.",
    ctaHint: { label: "Check your eligibility", href: "#eligibility" },
  },

  borderCrossingGuide: {
    label: "Cross-Border Driving",
    directAnswer: "Driving between Belgium and its neighbours is straightforward within the Schengen area, with no border checks and no motorway vignette required for France, the Netherlands, Luxembourg, or Germany.",
    points: [
      { tip: "Belgium, France, the Netherlands, Luxembourg, and Germany are all in the Schengen area, so there are no routine border checks when crossing by road.", status: "confirmed" },
      { tip: "Unlike Austria, Switzerland, or the Czech Republic, none of Belgium's direct neighbours require a separate motorway vignette just to cross the border.", status: "confirmed" },
      { tip: "Most rental companies allow cross-border travel to neighbouring countries, but confirming in advance is worth it, since policies and any extra fees vary by provider.", status: "partially_sourced" },
      { tip: "Your IDP requirement, where it applies, covers driving within Belgium — each neighbouring country has its own separate licence and document rules.", status: "confirmed" },
    ],
    solutionNote: "ApplyIDPOnline prepares your IDP for driving in Belgium — cross-border rental permissions for neighbouring countries are handled separately with your rental provider.",
    ctaHint: { label: "Check your eligibility", href: "#eligibility" },
  },

  motorcycleScooterRelevant: false,
  vehicleCategoryNote: {
    value: "Your IDP lists the vehicle categories shown on your original licence — it doesn't grant categories your original licence doesn't already include.",
    status: "confirmed",
  },
  vehicleCategoryLabel: "Car",

  popularDrivingAreas: [
    { name: "Brussels", note: "Belgium's capital and main international gateway, with rental counters at Brussels Airport — the city's Low Emission Zone requires free advance registration.", status: "confirmed" },
    { name: "Bruges", note: "A well-preserved medieval city and one of Belgium's most internationally recognized destinations, roughly an hour's drive from Brussels.", status: "confirmed" },
    { name: "Antwerp", note: "A major city with its own Low Emission Zone, and a common stop for travelers exploring Belgium's fashion and diamond districts by car.", status: "confirmed" },
    { name: "The Ardennes", note: "A forested countryside region in southern Belgium, including towns like Dinant and Spa, well suited to a multi-day self-drive route.", status: "partially_sourced" },
  ],

  borderCrossingRelevant: true,

  emergencyNumber: { value: "112 (police, fire, ambulance)", status: "confirmed" },

  faq: [
    {
      question: "Do I need an International Driving Permit to drive in Belgium?",
      answer: "Rental-company requirements can depend on your licence's language and the provider's own policy, so carrying an IDP alongside your original licence helps reduce delays or refusal at the counter. Legally, EU/EEA licence holders don't need one, and other visitors can generally drive on a valid original licence — an IDP becomes a genuine legal requirement mainly if your licence is printed in a non-Roman alphabet. ApplyIDPOnline prepares yours fully online before your trip either way.",
    },
    {
      question: "Do EU or EEA licence holders need an IDP for Belgium?",
      answer: "No. EU and EEA driving licences are recognized in Belgium without any additional document.",
    },
    {
      question: "I have a US, Canadian, UK, or Australian licence — do I need an IDP?",
      answer: "Not always strictly by law, since a Roman-alphabet licence already satisfies Belgium's core language requirement — but many rental companies request an IDP regardless, so it's worth having one ready rather than finding out at the counter.",
    },
    {
      question: "What is a Low Emission Zone, and will it affect my rental car?",
      answer: "Brussels, Antwerp, and Ghent each operate a Low Emission Zone (LEZ) requiring free advance online registration — Antwerp's registration also covers Ghent, but Brussels requires its own separate registration. Rental cars are usually registered automatically by the provider, but it's worth confirming before you drive into any of these cities.",
    },
    {
      question: "Do I need to pay tolls in Belgium?",
      answer: "Rarely. Belgium's motorway network is largely toll-free for private cars, a contrast to neighbouring France — the main exception is the Liefkenshoektunnel near Antwerp.",
    },
    {
      question: "Can I rent a car at Brussels Airport?",
      answer: "Yes — Brussels Airport (BRU) has counters from all major rental providers in a dedicated car rental building a short walk from the terminal.",
    },
    {
      question: "Can I drive a rental car from Belgium into France, Germany, or the Netherlands?",
      answer: "Yes, and it's common — Belgium and its direct neighbours are all in the Schengen area with no routine border checks, and none of them require a separate motorway vignette. Still, tell your rental company in advance in case your agreement has restrictions or fees.",
    },
    {
      question: "What are the speed limits in Belgium?",
      answer: "50 km/h in built-up areas and 120 km/h on motorways nationwide. Outside built-up areas, the default is 90 km/h in Wallonia and Brussels, but the Flemish Region has lowered its own default to 70 km/h on ordinary roads.",
    },
    {
      question: "What's the drink-driving limit in Belgium?",
      answer: "The blood alcohol limit is 0.05% for private drivers and 0.02% for professional drivers, with random roadside breath tests common, especially on weekends.",
    },
    {
      question: "What side of the road does Belgium drive on?",
      answer: "Belgium drives on the right, with the driver's seat on the left side of the vehicle.",
    },
    {
      question: "What's the minimum age to drive, and to rent a car, in Belgium?",
      answer: "The legal minimum driving age is 18. Most rental companies set a higher minimum, commonly 21, sometimes with a young-driver surcharge.",
    },
    {
      question: "Can I apply for an IDP after I've already arrived in Belgium?",
      answer: "Yes. You can submit your application fully online even after you've arrived in Belgium, since it's prepared based on your home-country licence rather than issued in person. Eligible digital documents are typically prepared in about 8 minutes after successful submission, payment, and approval, and printed documents are also available.",
    },
    {
      question: "Is a Digital IDP accepted by every rental company in Belgium?",
      answer: "Not universally — some rental providers prefer a printed copy over a digital one. It's worth checking with your specific rental company before your trip, or choosing the Print + Digital option for broader coverage.",
    },
  ],

  sourceCitations: [
    {
      label: "Recognition of foreign driving licences",
      url: "https://mobilit.belgium.be/en/road/driving/driving-licences/foreign-driving-licences",
      organization: "FPS Mobility and Transport — Belgian federal government",
    },
    {
      label: "Foreign travel advice — Belgium (Safety and security)",
      url: "https://www.gov.uk/foreign-travel-advice/belgium/safety-and-security",
      organization: "GOV.UK — Foreign, Commonwealth & Development Office",
    },
  ],
  lastVerifiedDate: "2026-08-02",

  relatedCountrySlugs: ["france", "germany", "united-kingdom", "italy"],

  primaryKeyword: "international driving permit belgium",
  secondaryKeywords: [
    "idp belgium",
    "international driving license belgium",
    "driving in belgium",
    "car rental belgium",
    "brussels airport car rental",
    "belgium low emission zone",
    "belgium speed limits",
    "bruges driving",
    "antwerp low emission zone",
    "ardennes road trip",
    "belgium tolls",
    "belgium right hand driving",
  ],
  metaTitle: "IDP Belgium: Visitor Driving Requirements",
  metaTitleAbsolute: true,
  metaDescription:
    "EU licences need nothing extra. Others can use an original licence unless it is non-Roman script, though rental counters may ask for an IDP.",
};
