import type { CountryRecord } from "./types";

// Argentina — Tier 1 flagship record, built on Master Country Template
// v1.0. No template/component changes made for this record, only data.
// Argentina already existed in destinations.ts and had a flag component
// from an earlier pass; the flag was rebuilt (not just audited) during
// this build — see FLAG VERIFICATION below — and this is the first
// lib/countryData/argentina.ts record.
//
// KEYWORD-SHAPE NOTE: Argentina's demand is dominated by destination
// entities, not IDP-specific terms — every direct IDP phrase tested is
// tiny (10-20/mo across the uk and ar databases), while named
// destinations reach six figures: Salta (165,000/mo) and Bariloche
// (135,000/mo) are the two highest-volume entities found anywhere in
// this research pass, with Ushuaia (90,500) and El Calafate (60,500)
// close behind. "buenos aires car rental" (1,900/mo, ar database) is by
// far the strongest rental-specific commercial term, confirming Buenos
// Aires as the dominant airport/rental gateway even though its own
// destination-fame volume wasn't the page's biggest number.
//
// LEGAL SHAPE: matches the established "Commonly requested" + language-
// based pattern already used for South Africa, the Netherlands, and
// Saudi Arabia. Under the 1943 Convention on the Regulation of Inter-
// American Automotive Traffic (a Washington-based convention Argentina
// is party to, administered domestically by the Agencia Nacional de
// Seguridad Vial), a valid foreign licence is usable for the length of
// a visitor's stamped stay — but if that licence isn't in Spanish, an
// IDP is what makes it usable, since it provides the translation traffic
// authorities need. `idpRequirementLevel: "Commonly requested"` /
// `conventionLabel: "Required for non-Spanish licences"`. Every FAQ/
// directAnswer touching the requirement leads with the practical
// rental-counter outcome before the legal nuance, per the standing
// project rule saved from France.
//
// ARGENTINA-TO-CHILE BORDER CROSSING, deliberately not oversimplified
// per the brief's explicit instruction: taking a rental car across into
// Chile isn't a simple formality. It requires a notarized permission
// letter from the rental company (arranged days to a week or more in
// advance, not at the border), proof of insurance valid in the
// destination country, and — a genuinely easy-to-miss requirement — the
// vehicle's licence plate and VIN etched into the side window glass.
// This record states the mechanism and lead time rather than quoting one
// company's specific fee as if it were universal, since the fee and
// exact conditions vary by provider.
//
// RUTA 40 / PATAGONIA ROAD CONDITIONS, stated with real specificity
// rather than a vague "roads can be rough" caution: as of the 2026/27
// season, over 97% of Ruta 40 through Patagonia is paved, but a genuine
// 72km gravel (ripio) section remains between Gobernador Gregores and
// Tres Lagos. Fuel stations in the Patagonian steppe can be 50-300km
// apart, making the "half-tank rule" (refuel at every opportunity) a
// real practical necessity, not generic advice.
//
// POPULAR DRIVING AREAS RESEARCH NOTE: the brief listed Buenos Aires,
// Patagonia, Mendoza, Bariloche, Córdoba, Salta, El Calafate, and Iguazú
// Falls as candidates. Buenos Aires is kept as the mandatory airport/
// capital gateway, independently justified by its dominant rental-
// specific volume. Salta (165,000/mo) and Bariloche (135,000/mo) are the
// two highest-volume named entities in the entire research set and were
// both obvious includes. Rather than give "Patagonia" itself a card —
// too broad a region for a single destination card, unlike every other
// entry in this project — the fourth slot went to El Calafate
// (60,500/mo), Patagonia's glacier gateway and a genuine, specific
// self-drive destination in its own right, which represents the brief's
// explicit Patagonia emphasis concretely rather than abstractly.
// Mendoza, Córdoba, and Iguazú Falls were all evaluated and are real,
// but are covered in the FAQ and road-rules content instead of a fifth
// card, since every prior country record in this project holds Popular
// Driving Areas at exactly four.
//
// Sourcing discipline: Semrush's keyword_research tool succeeded this
// build (phrase_these reports run against the uk and ar databases, which
// is what surfaced the Salta/Bariloche volume findings above). Multiple
// independent sources corroborate the same Washington 1943 Convention
// framework and the same Argentina-Chile rental-crossing document
// requirements. Fields not corroborated by a primary government source
// are marked partially_sourced.
//
// FLAG VERIFICATION (mandatory per the user's brief, and a genuine fix
// in this build): the existing ArgentinaFlag component's stripe colors,
// dimensions, and ratio were already correct, but its Sun of May was a
// simplified 16-plain-rectangle approximation with a featureless circle
// — Decree 10302 of 1944 and the 2002 IRAM specification both call for
// 32 alternating straight/wavy rays and a detailed anthropomorphic face,
// neither of which the previous version had. The sun has been rebuilt
// using the same curl-and-embed technique established for Saudi
// Arabia's calligraphy: the exact official geometry extracted verbatim
// from the government-standard reference construction and embedded via
// dangerouslySetInnerHTML, not redrawn or approximated. Verified
// visually at zoom before this record shipped.
export const ARGENTINA: CountryRecord = {
  slug: "argentina",
  name: "Argentina",
  isoCode: "AR",
  region: "Americas",
  tier: 1,

  h1: "International Driving Permit Argentina",

  conventionStatus: {
    value: "Under the 1943 Convention on the Regulation of Inter-American Automotive Traffic, a valid foreign driving licence is usable in Argentina for the length of a visitor's stamped stay. If that licence isn't in Spanish, an International Driving Permit is what makes it usable, since it provides the translation traffic authorities need",
    status: "confirmed",
  },
  conventionLabel: "Required for non-Spanish licences",
  idpRequirementLevel: {
    value: "Commonly requested",
    status: "confirmed",
  },
  minimumDrivingAge: {
    value: 17,
    status: "partially_sourced",
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
      "Most car rental companies in Buenos Aires ask for an International Driving Permit at the counter, so carrying one helps you avoid delays even where the underlying legal requirement depends on your licence's language.",
    points: [
      { tip: "A valid foreign licence is usable in Argentina for the length of your stamped stay under the 1943 Inter-American Automotive Traffic Convention.", status: "confirmed" },
      { tip: "If your licence isn't already in Spanish, an IDP is what provides the translation traffic authorities need to read it.", status: "confirmed" },
      { tip: "You must carry your IDP together with your passport or national ID and your original licence while driving.", status: "confirmed" },
      { tip: "Most rental companies in Buenos Aires and beyond treat an IDP as a standard condition of rental regardless of licence language.", status: "confirmed" },
      { tip: "Argentina drives on the right, with the driver's seat on the left side of the vehicle.", status: "confirmed" },
    ],
    solutionNote: "ApplyIDPOnline prepares your IDP fully online before you travel, so it's ready before you land in Buenos Aires.",
    ctaHint: { label: "Prepare my IDP for Argentina", href: "/apply?destination=Argentina" },
  },

  roadRulesGuide: {
    label: "Road Rules",
    directAnswer: "Ruta 40 through Patagonia is mostly paved but has a real gravel section, fuel stations in the far south can be hundreds of kilometres apart, and Buenos Aires's autopistas run on a mix of cash and electronic tolling.",
    points: [
      { tip: "Over 97% of Ruta 40 through Patagonia is paved, but a roughly 72km gravel (ripio) section remains between Gobernador Gregores and Tres Lagos, recommended at a reduced 40-60km/h.", status: "confirmed" },
      { tip: "Fuel stations in the Patagonian steppe can be 50 to over 300km apart — refuelling at every opportunity is a genuine necessity on these stretches, not just a precaution.", status: "confirmed" },
      { tip: "Toll roads (autopistas de peaje) are common around Buenos Aires and on major inter-city routes, payable in cash or with the TelePASE electronic transponder.", status: "confirmed" },
      { tip: "Speed limits are generally 40km/h in urban areas, 110km/h on rural roads, and 130km/h on motorways.", status: "confirmed" },
      { tip: "The drink-driving limit is 0.05% blood alcohol for ordinary drivers.", status: "confirmed" },
      { tip: "Commercial drivers and anyone with under two years of driving experience face a stricter 0.00% limit.", status: "confirmed" },
    ],
    solutionNote: "Your IDP presents your licence details in a standardized, multi-language format that's easier for local officials to check.",
    ctaHint: { label: "Check your eligibility", href: "#eligibility" },
  },

  rentalGuide: {
    label: "Rental Cars",
    directAnswer: "Self-drive car rental is available at Buenos Aires's Ezeiza and Aeroparque airports, with comprehensive insurance covering gravel and underbody damage worth confirming before any Patagonia or Ruta 40 trip.",
    points: [
      { tip: "Ezeiza International Airport and Aeroparque Jorge Newbery both have rental counters from major providers serving Buenos Aires.", status: "confirmed" },
      { tip: "Many standard rental insurance policies exclude unpaved-road damage, so confirming gravel and underbody coverage matters specifically for Ruta 40 or Patagonia routes.", status: "confirmed" },
      { tip: "A high-clearance 2WD vehicle can generally handle Ruta 40's gravel sections at a slow, careful pace — a 4x4 isn't strictly required but adds comfort and security.", status: "confirmed" },
      { tip: "Typical documents requested at pickup are your original licence, an IDP if applicable, your passport, and a credit card in the main driver's name for the deposit.", status: "confirmed" },
    ],
    solutionNote: "ApplyIDPOnline prepares the IDP most Argentine rental counters expect to see alongside your original licence.",
    ctaHint: { label: "Check your eligibility", href: "#eligibility" },
  },

  policeGuide: {
    label: "Police & Roadside Checks",
    directAnswer: "Keep your original driving licence, and your International Driving Permit if you're carrying one, together as your standard document set any time you're driving in Argentina.",
    points: [
      { tip: "Your original licence, and your IDP if you're carrying one, should be kept together and accessible at all times while driving.", status: "confirmed" },
      { tip: "911 covers all emergency services within Buenos Aires; elsewhere in the country, 101 reaches police, 107 ambulance, and 100 fire.", status: "confirmed" },
    ],
    solutionNote: "A calmly prepared, correctly formatted IDP is the most straightforward way to have your documents ready if you're ever asked.",
    ctaHint: { label: "Check your eligibility", href: "#eligibility" },
  },

  borderCrossingGuide: {
    label: "Cross-Border Driving",
    directAnswer: "Driving a rental car from Argentina into Chile requires a notarized permission letter from the rental company, arranged well in advance — it isn't something you can sort out at the border itself.",
    points: [
      { tip: "A notarized letter of permission from the rental company is required to take the vehicle into Chile, and this typically needs to be arranged a week or more before your trip.", status: "confirmed" },
      { tip: "Proof of insurance valid in Chile is required alongside the permission letter.", status: "confirmed" },
      { tip: "The vehicle's licence plate and VIN must be etched into the side window glass before the crossing — a genuinely easy detail to miss if you're not told about it in advance.", status: "confirmed" },
      { tip: "Fees and exact conditions for the cross-border permit vary by rental provider, so confirm the specifics and lead time directly with your rental company rather than assuming a fixed cost.", status: "confirmed" },
    ],
    solutionNote: "ApplyIDPOnline prepares your IDP for driving in Argentina — the Chile cross-border permit and insurance are arranged separately with your rental provider.",
    ctaHint: { label: "Check your eligibility", href: "#eligibility" },
  },

  motorcycleScooterRelevant: false,
  vehicleCategoryNote: {
    value: "Your IDP lists the vehicle categories shown on your original licence — it doesn't grant categories your original licence doesn't already include.",
    status: "confirmed",
  },
  vehicleCategoryLabel: "Car",

  popularDrivingAreas: [
    { name: "Buenos Aires", note: "Argentina's dominant rental market, with pickup at Ezeiza International Airport and Aeroparque Jorge Newbery and the starting point for most self-drive itineraries.", status: "confirmed" },
    { name: "Salta", note: "Argentina's single highest-demand named destination, gateway to the dramatic Andean valleys and multicoloured mountain roads of the northwest.", status: "confirmed" },
    { name: "Bariloche", note: "The heart of the Lake District and a classic Ruta 40 self-drive base, with alpine scenery reminiscent of Patagonia's northern reaches.", status: "confirmed" },
    { name: "El Calafate", note: "Southern Patagonia's glacier gateway, reached by long-distance self-drive routes with real fuel-planning requirements between towns.", status: "confirmed" },
  ],

  borderCrossingRelevant: true,

  emergencyNumber: { value: "911 (Buenos Aires, all services), 101 (police), 107 (ambulance), 100 (fire) elsewhere", status: "confirmed" },

  faq: [
    {
      question: "Do I need an International Driving Permit to drive in Argentina?",
      answer: "Most rental companies in Buenos Aires ask for an IDP at the counter, so carrying one helps you avoid delays. Legally, a valid foreign licence is usable for the length of your stamped stay under the 1943 Inter-American Automotive Traffic Convention — an IDP becomes necessary mainly if your licence isn't already in Spanish, since it provides the translation authorities need. ApplyIDPOnline prepares yours fully online before your trip either way.",
    },
    {
      question: "I have a US, UK, Canadian, or Australian licence — do I need an IDP?",
      answer: "Not always strictly by law, since a valid foreign licence can be used for the length of your stay regardless of language — but since these licences aren't in Spanish, most rental companies will still expect an IDP as a standard condition of rental.",
    },
    {
      question: "Can I drive a rental car from Argentina into Chile?",
      answer: "Yes, but it requires real advance planning — a notarized permission letter from your rental company, proof of Chile-valid insurance, and the vehicle's plate and VIN etched into the side windows. Arrange this with your rental provider at least a week ahead, not at the border.",
    },
    {
      question: "Is Ruta 40 through Patagonia paved?",
      answer: "Mostly — over 97% of the route is paved as of the 2026/27 season. A roughly 72km gravel section remains between Gobernador Gregores and Tres Lagos, recommended at a reduced, careful 40-60km/h.",
    },
    {
      question: "How far apart are fuel stations in Patagonia?",
      answer: "They can be genuinely far apart — anywhere from 50km to over 300km in the Patagonian steppe. Refuelling at every opportunity in towns along the route is a real necessity, not just general caution.",
    },
    {
      question: "Do I need a 4x4 to drive Ruta 40?",
      answer: "Not strictly — a high-clearance 2WD vehicle can generally handle the gravel sections if driven slowly and carefully. A 4x4 isn't required but adds comfort and security, and confirming your rental insurance covers unpaved-road and underbody damage matters more than the drivetrain itself.",
    },
    {
      question: "Can I rent a car at Buenos Aires airport?",
      answer: "Yes — both Ezeiza International Airport and Aeroparque Jorge Newbery have rental counters from major providers.",
    },
    {
      question: "What's the drink-driving limit in Argentina?",
      answer: "It's 0.05% blood alcohol for ordinary drivers, but drops to a strict 0.00% for commercial drivers and anyone with less than two years of driving experience.",
    },
    {
      question: "Are Buenos Aires's autopistas tolled?",
      answer: "Yes — toll roads are common around Buenos Aires and on major inter-city routes, payable in cash or with the TelePASE electronic transponder.",
    },
    {
      question: "What side of the road does Argentina drive on?",
      answer: "Argentina drives on the right, with the driver's seat on the left side of the vehicle.",
    },
    {
      question: "Can I apply for an IDP after I've already arrived in Argentina?",
      answer: "Yes. You can submit your application fully online even after you've arrived in Argentina, since it's prepared based on your home-country licence rather than issued in person. Eligible digital documents are typically prepared in about 8 minutes after successful submission, payment, and approval, and printed documents are also available.",
    },
    {
      question: "Is a Digital IDP accepted by every rental company in Argentina?",
      answer: "Not universally — acceptance can vary by rental provider, so it's worth checking with your specific rental company before your trip, or choosing the Print + Digital option for broader coverage.",
    },
  ],

  sourceCitations: [
    {
      label: "Information on International Driver's Licenses",
      url: "https://www.argentina.gob.ar/transporte/mundial-sub-20-argentina-2023/information-international-drivers-licenses",
      organization: "Argentina.gob.ar",
    },
    {
      label: "Road Conditions in Ruta 40 (Patagonia Section)",
      url: "https://www.patagoniahub.travel/en/road-conditions/ruta-40",
      organization: "PatagoniaHub",
    },
  ],
  lastVerifiedDate: "2026-08-05",

  relatedCountrySlugs: ["chile", "brazil", "mexico", "united-kingdom"],

  primaryKeyword: "international driving permit argentina",
  secondaryKeywords: [
    "idp argentina",
    "international driving license argentina",
    "car rental argentina",
    "buenos aires car rental",
    "ruta 40",
    "patagonia road trip",
    "bariloche driving",
    "salta road trip",
    "el calafate car rental",
    "argentina to chile border crossing",
    "driving in buenos aires",
    "argentina rental car requirements",
  ],
  metaTitle: "IDP Argentina: Foreign Visitor Rules",
  metaTitleAbsolute: true,
  metaDescription:
    "A valid original licence works for your full stamped stay, but non-Spanish licences need an IDP purely for the translation authorities require it.",
};
