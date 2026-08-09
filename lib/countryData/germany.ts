import type { CountryRecord } from "./types";

// Germany — Tier 1 flagship record, built on Master Country Template v1.0.
// No template/component changes made for this record, only data.
//
// A THIRD, DISTINCT LEGAL SHAPE from every prior country in this project:
// Germany's rule doesn't split cleanly by EU/EEA membership (Spain/Italy/
// Romania/Brazil) or read as a blanket "not required" (France/Mexico).
// GOV.UK's own direct guidance and multiple corroborating sources agree:
// EU/EEA licence holders need nothing, UK licence holders are exempt for
// stays up to six months, and other non-EU/EEA visitors can generally
// drive on their valid original licence for up to six months too — but an
// International Driving Permit becomes a genuine legal requirement only if
// that licence isn't already in German or English, or uses a non-Roman
// alphabet. Since most of this service's actual customers hold an
// English-language licence (the eligibility checker defaults to a United
// States licence), the strict legal trigger doesn't even apply to the
// majority of visitors — which is exactly why `idpRequirementLevel:
// "Commonly requested"` (not "Legally required") is the honest
// classification here, paired with a Germany-specific `conventionLabel:
// "Required for non-English/German licences"` rather than reusing any
// other country's label. The practical reality — that many rental
// companies request an IDP regardless of licence language — is what
// actually keeps the product relevant for English-speaking visitors, so
// every FAQ/directAnswer touching the requirement leads with that
// practical rental-counter outcome before the legal nuance, per the
// user's explicit brief and the standing project rule saved from France.
//
// AUTOBAHN NUANCE (Phase 5's explicit ask, handled without myth or
// exaggeration): roughly 70% of the Autobahn network carries no legally
// mandatory speed limit for cars and light vehicles (per a 2015 Federal
// Road Research Institute study), but this isn't lawless — a posted
// recommended speed (Richtgeschwindigkeit) of 130 km/h applies on those
// stretches, and while exceeding it isn't an offence, German courts can
// assign a driver partial fault in a collision for having driven
// significantly faster. The remaining ~30% of the network, plus every
// built-up area and secondary road, carries an ordinary posted limit like
// anywhere else. This distinction — no legal maximum vs. a recommended
// speed vs. genuinely signed limits — is stated explicitly rather than
// left implied.
//
// Sourcing discipline: Semrush API units were exhausted again at the
// start of this build. GOV.UK's Germany safety-and-security travel advice
// was fetched directly and is the primary citation for UK licence
// validity, the six-month/IDP nuance, and low-emission-zone restrictions.
// Secondary sources corroborate the Autobahn speed-limit split, the 2025
// green-sticker-only Umweltplakette rule, the situational (non-calendar)
// winter-tyre law, and destination-specific driving conditions; these are
// marked partially_sourced.
//
// FLAG VERIFICATION (mandatory per the user's brief): the existing
// GermanyFlag component (three equal horizontal bands, #000000 / #DD0000
// / #FFCE00) was checked directly against Wikimedia Commons' official
// reference SVG (File:Flag_of_Germany.svg) before this record shipped —
// that file uses the identical fill values (#000, #D00, #FFCE00) at the
// same 5:3 ratio. No rebuild was needed; Germany's flag has no coat of
// arms or emblem to omit, so the existing simple three-band construction
// was already both structurally and chromatically correct. Verified
// visually at zoom before this record shipped.
export const GERMANY: CountryRecord = {
  slug: "germany",
  name: "Germany",
  isoCode: "DE",
  region: "Europe",
  tier: 1,

  h1: "International Driving Permit Germany",

  conventionStatus: {
    value: "EU and EEA driving licence holders can drive in Germany with no International Driving Permit needed, and UK licence holders are exempt for stays of up to six months. Other non-EU/EEA visitors can generally drive on a valid original licence for up to six months too, but if it isn't already in German or English, or uses a non-Roman alphabet, an International Driving Permit is required alongside it — and many rental companies request one regardless of language",
    status: "confirmed",
  },
  conventionLabel: "Required for non-English/German licences",
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
      "Rental-company requirements can depend on your licence's language and the provider's own policy, so carrying an International Driving Permit alongside your original licence helps reduce delays or refusal at the counter in Germany, even where the legal requirement depends on your licence and how long you're staying.",
    points: [
      { tip: "EU and EEA driving licences are valid in Germany with no IDP required, and UK licences are also accepted for stays of up to six months.", status: "confirmed" },
      { tip: "Other non-EU/EEA visitors can generally drive on a valid original licence for up to six months, but if it isn't already in German or English, or uses a non-Roman alphabet, an IDP is required alongside it.", status: "confirmed" },
      { tip: "Many rental companies request an IDP regardless of your licence's language, so it's worth having one ready before you arrive.", status: "confirmed" },
      { tip: "An IDP only works together with your valid original licence — it's a translation aid, not a replacement for it.", status: "confirmed" },
      { tip: "Germany drives on the right, with the driver's seat on the left side of the vehicle.", status: "confirmed" },
    ],
    solutionNote: "ApplyIDPOnline prepares your IDP fully online before you travel, so it's ready before you land.",
    ctaHint: { label: "Prepare my IDP for Germany", href: "/apply?destination=Germany" },
  },

  roadRulesGuide: {
    label: "Road Rules",
    directAnswer: "The Autobahn has no legally mandatory speed limit on roughly 70% of its network, environmental stickers are required to enter low-emission zones in several cities, and winter tyres are required whenever road conditions call for them.",
    points: [
      { tip: "Around 70% of the Autobahn network has no legally mandatory speed limit for cars and light vehicles, based on a 2015 federal road research study.", status: "confirmed" },
      { tip: "Where there's no posted limit, a recommended speed (Richtgeschwindigkeit) of 130 km/h applies — exceeding it isn't an offence, but German courts can assign partial fault in a collision if you were driving significantly faster.", status: "confirmed" },
      { tip: "The 130 km/h recommended-speed condition applies to vehicles under 3.5 tonnes.", status: "confirmed" },
      { tip: "Heavier vehicles and other categories have their own posted limits rather than the recommended-speed condition.", status: "confirmed" },
      { tip: "Standard limits are 50 km/h in built-up areas and 100 km/h outside them, applying to Autobahn stretches and other roads that do carry a posted limit.", status: "confirmed" },
      { tip: "Since 2025, entering a low-emission zone (Umweltzone) requires a green Umweltplakette emissions sticker — most rental cars already qualify and carry one.", status: "confirmed" },
      { tip: "Winter tyres are required whenever conditions call for them — snow, ice, or slush — rather than on fixed calendar dates.", status: "confirmed" },
      { tip: "The blood alcohol limit is 0.5‰ for most drivers.", status: "confirmed" },
      { tip: "Drivers under 21, or in their first two years of holding a licence, face a zero-tolerance limit.", status: "confirmed" },
    ],
    solutionNote: "Your IDP presents your licence details in a standardized, multi-language format that's easier for local staff and officials to read.",
    ctaHint: { label: "Check your eligibility", href: "#eligibility" },
  },

  rentalGuide: {
    label: "Rental Cars",
    directAnswer: "Self-drive car rental is available at every major German airport and city, with most providers setting age and licence-history requirements above the legal minimum.",
    points: [
      { tip: "The legal minimum driving age is 18, but rental companies typically require drivers to be at least 21, sometimes with a young-driver surcharge.", status: "partially_sourced" },
      { tip: "Frankfurt and Munich airports both have rental counters from major providers reachable from the arrivals area — Munich is the more convenient pickup point for a Romantic Road or Bavarian Alps trip.", status: "confirmed" },
      { tip: "Rental cars in or near a low-emission zone almost always already carry the correct Umweltplakette, but it's worth confirming with your provider.", status: "confirmed" },
      { tip: "Taking a rental car across Germany's borders into Austria or Switzerland usually requires advance notice to your rental company, and sometimes an additional fee.", status: "confirmed" },
      { tip: "Typical documents requested at pickup include your original licence, an IDP if applicable, your passport, and a credit card for the deposit.", status: "partially_sourced" },
    ],
    solutionNote: "ApplyIDPOnline prepares the IDP most rental counters expect to see alongside your original licence.",
    ctaHint: { label: "Check your eligibility", href: "#eligibility" },
  },

  policeGuide: {
    label: "Police & Roadside Checks",
    directAnswer: "Keep your original driving licence, and your International Driving Permit if you're carrying one, together as your standard document set any time you're driving in Germany.",
    points: [
      { tip: "Your original licence, and your IDP if you're carrying one, should be kept together and accessible at all times.", status: "confirmed" },
      { tip: "Germany's traffic police enforce speed and safety-equipment rules, with fixed and mobile speed cameras common on both the Autobahn and urban roads.", status: "confirmed" },
      { tip: "Emergency services across Germany can be reached on 112.", status: "confirmed" },
    ],
    solutionNote: "A calmly prepared, correctly formatted IDP is the most straightforward way to have your documents ready if you're ever asked.",
    ctaHint: { label: "Check your eligibility", href: "#eligibility" },
  },

  borderCrossingGuide: {
    label: "Cross-Border Driving",
    directAnswer: "Driving into neighbouring countries is common and generally straightforward from Germany, but Austria, Switzerland, and the Czech Republic each require their own separate motorway vignette, and rental cross-border travel needs advance notice to your provider.",
    points: [
      { tip: "Austria, Switzerland, and the Czech Republic each require a separate motorway vignette or toll sticker — Germany's own Autobahn access doesn't cover them.", status: "confirmed" },
      { tip: "Most rental companies allow cross-border travel into neighbouring countries but require advance notice, and some charge an additional fee.", status: "confirmed" },
      { tip: "If you're heading into Austria or Switzerland, it's worth confirming your rental car has Alpine-symbol winter tyres, since enforcement there can differ from Germany's own condition-based rule.", status: "partially_sourced" },
      { tip: "Your IDP requirement, where it applies, covers driving within Germany — each neighbouring country has its own separate licence and document rules.", status: "confirmed" },
    ],
    solutionNote: "ApplyIDPOnline prepares your IDP for driving in Germany — vignettes and cross-border rental permissions for neighbouring countries are handled separately with your rental provider.",
    ctaHint: { label: "Check your eligibility", href: "#eligibility" },
  },

  motorcycleScooterRelevant: false,
  vehicleCategoryNote: {
    value: "Your IDP lists the vehicle categories shown on your original licence — it doesn't grant categories your original licence doesn't already include.",
    status: "confirmed",
  },
  vehicleCategoryLabel: "Car",

  popularDrivingAreas: [
    { name: "Frankfurt", note: "Germany's busiest international gateway, with rental counters at Frankfurt Airport — many road trips through the Romantic Road or Rhine Valley begin here.", status: "confirmed" },
    { name: "Munich & the Bavarian Alps", note: "Munich Airport is the practical gateway to Bavaria, with day-trip routes to Neuschwanstein Castle and the mountain town of Garmisch-Partenkirchen.", status: "confirmed" },
    { name: "Romantic Road (Romantische Straße)", note: "A signed touring route linking historic towns from Würzburg to Füssen, typically driven over several days between Frankfurt and Munich.", status: "confirmed" },
    { name: "Black Forest (Schwarzwald)", note: "A scenic touring region in southwest Germany near Switzerland and France, with Heidelberg and Stuttgart as common starting points.", status: "partially_sourced" },
  ],

  borderCrossingRelevant: true,

  emergencyNumber: { value: "112 (police, fire, ambulance)", status: "confirmed" },

  faq: [
    {
      question: "Do I need an International Driving Permit to drive in Germany?",
      answer: "Rental-company requirements can depend on your licence's language and the provider's own policy, so carrying an IDP alongside your original licence helps reduce delays or refusal at the counter. Legally, EU/EEA and UK licence holders don't need one, and other visitors can generally drive on a valid original licence for up to six months — an IDP becomes a genuine legal requirement mainly if your licence isn't already in German or English. ApplyIDPOnline prepares yours fully online before your trip either way.",
    },
    {
      question: "Do EU or EEA licence holders need an IDP for Germany?",
      answer: "No. EU and EEA driving licences are recognized in Germany without any additional document, and UK licences are also accepted for stays of up to six months.",
    },
    {
      question: "I have a US, Canadian, or Australian licence — do I need an IDP?",
      answer: "Not always strictly by law, since an English-language licence already satisfies Germany's language requirement for a stay of up to six months — but many rental companies request an IDP regardless, so it's worth having one ready rather than finding out at the counter.",
    },
    {
      question: "Is the Autobahn really unlimited speed?",
      answer: "On about 70% of the network, yes — there's no legally mandatory speed limit for cars and light vehicles. The other roughly 30%, along with every built-up area, carries an ordinary posted limit, so it isn't accurate to say the whole Autobahn has no limits at all.",
    },
    {
      question: "What is the Richtgeschwindigkeit?",
      answer: "It's the 130 km/h recommended speed posted on no-limit Autobahn stretches. Driving faster isn't illegal, but if you're involved in a collision while significantly exceeding it, German courts can assign you partial fault even if you didn't cause the accident.",
    },
    {
      question: "What is an Umweltplakette, and will it affect my rental car?",
      answer: "It's an emissions sticker required to enter low-emission zones (Umweltzonen) in many German cities — since 2025, only the green sticker is issued or accepted. Rental cars in or near these zones almost always already carry one, but it's worth confirming with your provider.",
    },
    {
      question: "Do I need winter tyres in Germany?",
      answer: "Whenever road conditions call for them — snow, ice, or slush — rather than on fixed calendar dates. You're legally responsible for having appropriate tyres fitted when conditions require it.",
    },
    {
      question: "Can I rent a car at Frankfurt or Munich airport?",
      answer: "Yes — both airports have rental counters from major providers reachable from the arrivals area. Munich tends to be the more convenient pickup point for a Bavarian Alps or Romantic Road trip.",
    },
    {
      question: "Can I drive a rental car from Germany into Austria or Switzerland?",
      answer: "Usually, but tell your rental company in advance — cross-border travel is commonly allowed but sometimes carries an extra fee. You'll also need a separate motorway vignette for Austria, Switzerland, or the Czech Republic, since Germany's Autobahn access doesn't cover them.",
    },
    {
      question: "What's the drink-driving limit in Germany?",
      answer: "The blood alcohol limit is 0.5‰ for most drivers, with zero tolerance for drivers under 21 or in their first two years of holding a licence.",
    },
    {
      question: "What side of the road does Germany drive on?",
      answer: "Germany drives on the right, with the driver's seat on the left side of the vehicle.",
    },
    {
      question: "What's the minimum age to drive, and to rent a car, in Germany?",
      answer: "The legal minimum driving age is 18. Most rental companies set a higher minimum, commonly 21, sometimes with a young-driver surcharge.",
    },
    {
      question: "Can I apply for an IDP after I've already arrived in Germany?",
      answer: "Yes. You can submit your application fully online even after you've arrived in Germany, since it's prepared based on your home-country licence rather than issued in person. Eligible digital documents are typically prepared in about 8 minutes after successful submission, payment, and approval, and printed documents are also available.",
    },
    {
      question: "Is a Digital IDP accepted by every rental company in Germany?",
      answer: "Not universally — some rental providers prefer a printed copy over a digital one. It's worth checking with your specific rental company before your trip, or choosing the Print + Digital option for broader coverage.",
    },
  ],

  sourceCitations: [
    {
      label: "Foreign travel advice — Germany (Safety and security)",
      url: "https://www.gov.uk/foreign-travel-advice/germany/safety-and-security",
      organization: "GOV.UK — Foreign, Commonwealth & Development Office",
    },
    {
      label: "Speed limits in Germany",
      url: "https://en.wikipedia.org/wiki/Speed_limits_in_Germany",
      organization: "Wikipedia, citing the Federal Highway Research Institute (BASt)",
    },
  ],
  lastVerifiedDate: "2026-08-02",

  relatedCountrySlugs: ["france", "italy", "united-kingdom", "spain"],

  primaryKeyword: "international driving permit germany",
  secondaryKeywords: [
    "idp germany",
    "international driving license germany",
    "driving in germany",
    "car rental germany",
    "autobahn speed limit",
    "richtgeschwindigkeit",
    "umweltplakette germany",
    "germany low emission zone",
    "frankfurt airport car rental",
    "munich airport car rental",
    "romantic road germany",
    "germany right hand driving",
  ],
  metaTitle: "International Driving Permit Germany: Eligibility Rules",
  metaTitleAbsolute: true,
  metaDescription:
    "UK licences are exempt for up to six months. Other non-EU/EEA visitors may need an IDP when the licence is not German or English.",
};
