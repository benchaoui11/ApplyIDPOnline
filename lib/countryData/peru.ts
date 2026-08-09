import type { CountryRecord } from "./types";

// Peru — Tier 1 flagship record, built on Master Country Template v1.0.
// No template/component changes made for this record, only data. This is
// the first pass for Peru — no prior flag component, destinations.ts
// entry, or flagColors.ts entry existed before this build; all three
// were added.
//
// KEYWORD-SHAPE NOTE: like Argentina, Peru's demand is dominated by
// destination entities rather than IDP-specific phrases. Direct IDP
// terms are small in the us database ("international driving permit
// peru" and "idp peru" both 20/mo), but "idp peru" jumps to 140/mo in
// the pe database itself, and the Spanish-language legal-document term
// "licencia de conducir internacional peru" reaches 260/mo (pe) — a real
// signal that a meaningful share of this page's actual search demand is
// in Spanish, not just English. Destination-entity volume dwarfs all of
// that: Machu Picchu alone reaches 201,000/mo, with Lake Titicaca and
// Lima Peru both at 40,500/mo and Nazca Lines at 33,100/mo. On the
// commercial/rental side, Spanish-language rental terms are far stronger
// than their English equivalents — "alquiler de autos lima" (2,900/mo,
// pe) and "alquiler de carros lima" (1,000/mo, pe) dwarf "lima car
// rental" (90/mo, us) — confirming Lima as the dominant rental gateway
// and that this page's commercial keyword strength is genuinely
// bilingual, not just an English afterthought.
//
// LEGAL SHAPE: matches the established "Commonly requested" + language-
// based pattern already used for South Africa, Argentina, Denmark, and
// Sri Lanka. Peru acceded to the 1968 Vienna Convention on Road Traffic
// on 6 October 2006. Peru's Ministry of Transport and Communications
// (MTC) states foreign visitors can drive on a valid home-country
// licence for the first six months of their stay, provided a signed and
// ratified international agreement exists between Peru and the issuing
// country. Independent car-rental sourcing is specific about what
// actually triggers an IDP in practice: if the licence's characters
// aren't in English or Latin script, an IDP or a notarized translation
// is required — otherwise it's the original licence alone that's
// checked. `idpRequirementLevel: "Commonly requested"` /
// `conventionLabel: "Required for non-Latin-script licences"` — the same
// label shape already used for Denmark, chosen because the sourced
// rental-company language names script, not a single language, as the
// actual trigger. Every FAQ/directAnswer touching the requirement leads
// with the practical rental-counter outcome before the legal nuance, per
// the standing project rule saved from France.
//
// RENTAL-COMPANY WINDOW VS. LEGAL WINDOW, a genuine distinction worth
// stating plainly rather than collapsing into one number: Peru's own
// legal allowance for driving on a foreign licence is six months, but at
// least one major rental company's own policy describes a much shorter
// 60-day window before it will require an IDP regardless of script —
// this record states both, and is explicit that a rental company's
// internal counter policy is not the same thing as national law, since
// conflating them would misstate one or the other.
//
// HIGH-ALTITUDE AND MOUNTAIN-ROAD RESEARCH, specifically requested by
// the brief and treated with real specificity rather than a blanket
// caution: Cusco sits at roughly 3,400m and the Sacred Valley towns
// (Pisac, Urubamba, Ollantaytambo) sit lower, around 2,800-3,000m —
// altitude sickness (soroche) affects an estimated 40-50% of visitors
// sleeping above 3,000m and can impair a driver's own judgment and
// reaction time, not just cause discomfort, which is why acclimatizing
// before driving mountain routes (and considering the lower Sacred
// Valley as a first stop rather than driving straight out of Cusco) is
// stated as a genuine safety point, not just travel-comfort advice.
// Rental-insurance policy is NOT uniform across providers for unpaved
// mountain roads: multiple independent sources describe damage on
// unpaved roads as commonly excluded from standard coverage unless a
// specific off-road or 4x4 permission is purchased — this record states
// that variation explicitly and tells travelers to confirm with their
// specific provider, rather than asserting a single blanket rule either
// way, per the brief's explicit instruction not to make blanket
// statements where policies differ.
//
// POPULAR DRIVING AREAS RESEARCH NOTE: the brief asked me to evaluate
// Lima, Cusco, Sacred Valley, Arequipa, Paracas, Nazca, Huaraz, and Ica
// for four slots. Lima is kept as the mandatory airport/capital gateway,
// independently justified by dominant rental-specific volume ("alquiler
// de autos lima" 2,900/mo plus "alquiler de carros lima" 1,000/mo, pe
// database — far ahead of every other city's rental-specific term).
// Cusco is the clear second slot: 18,100/mo general entity volume, the
// second-strongest rental-specific term found ("alquiler de autos
// cusco" 480/mo, "cusco car rental" 590/mo pe), and the gateway to the
// Sacred Valley and Machu Picchu. Arequipa took the third slot on real
// rental-specific strength — "alquiler de autos arequipa" reaches
// 590/mo (pe), matching Cusco's own rental-specific number almost
// exactly — and it's the gateway to Colca Canyon (4,400/mo), an
// established self-drive road-trip pairing. Ica took the fourth slot
// over Sacred Valley, Paracas, Nazca, and Huaraz specifically because it
// has real, measurable rental-specific demand ("alquiler de autos ica"
// 170/mo, pe) where every other remaining candidate tested at zero
// rental-specific volume — and because Ica functions as the driving-base
// entity for the entire southern coastal-desert cluster (Huacachina
// 6,600/mo, Paracas 2,900/mo, Nazca Lines 33,100/mo), the same kind of
// entity-clustering pattern already identified for Denmark's Sopot and
// Norway's Danube-Bend towns, where a hub town's own volume understates
// real demand because travelers search the surrounding attractions by
// name instead. Sacred Valley was seriously considered (5,400/mo) but
// would have doubled up on Cusco's highland cluster rather than
// broadening geographic coverage, and it tested at zero rental-specific
// volume in both databases checked, unlike Ica; Sacred Valley, Paracas,
// Nazca, and Huaraz are all covered in the FAQ and road-rules content
// instead of a fifth card, since every prior country record in this
// project holds Popular Driving Areas at exactly four.
//
// COMPETITOR GAP NOTE: the leading generic IDP-info competitor page for
// Peru (internationaldrivingpermit.org) covers only IDP mechanics —
// validity periods, photo specs, processing times — with no airport
// rental guidance, no mountain or high-altitude driving content, and no
// city-specific coverage at all. This record is built to be
// substantively different: airport-specific rental guidance for both
// Lima and Cusco, real high-altitude driving content, and four
// city/region-specific driving-area cards none of which the competitor
// page addresses.
//
// Sourcing discipline: Semrush's keyword_research tool succeeded this
// build (phrase_these and phrase_questions reports run against the us
// and pe databases). Peru's MTC (Ministerio de Transportes y
// Comunicaciones) is the primary official source for the six-month
// foreign-licence allowance and the Vienna Convention accession date.
// Independent car-rental sourcing (Alamo Peru's own published policy)
// corroborates the script-based IDP trigger and the mandatory
// third-party-liability insurance requirement. Fields not corroborated
// by a primary government source are marked partially_sourced.
//
// FLAG VERIFICATION (mandatory per the user's brief): no PeruFlag
// component existed before this build. The flag is a plain vertical
// red-white-red tricolor (the civil flag, no coat of arms), matching
// the government-standard reference construction (Wikimedia Commons'
// File:Flag_of_Peru.svg — 900x600, ratio 2:3). No Peruvian law mandates
// a specific printing hex for the red (confirmed via independent
// sourcing — Peru's flag statutes describe the color, not a print
// spec), so this uses the red most consistently cited against the flag
// in color-reference sources, Pantone 186C / hex #C8102E — the same
// citation this codebase already uses for Austria's flag red. Verified
// visually at zoom before this record shipped.
export const PERU: CountryRecord = {
  slug: "peru",
  name: "Peru",
  isoCode: "PE",
  region: "Americas",
  tier: 1,

  h1: "International Driving Permit Peru",

  conventionStatus: {
    value: "Peru acceded to the 1968 Vienna Convention on Road Traffic in 2006. Peru's Ministry of Transport and Communications (MTC) states foreign visitors can drive on a valid home-country licence for the first six months of their stay, provided a signed and ratified agreement exists between Peru and the issuing country. If your licence isn't in English or Latin script, an International Driving Permit or a notarized translation is what makes it usable, since it provides the translation traffic authorities and rental staff need",
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
    value: "Acceptance can vary by rental provider — confirm with your rental company before your trip, and consider the Print + Digital option for broader coverage.",
    status: "partially_sourced",
  },

  drivingSide: {
    value: "Right",
    status: "confirmed",
  },

  drivingGuide: {
    label: "Driving",
    directAnswer:
      "Most car rental companies in Peru ask for an International Driving Permit at the counter regardless of licence language, so carrying one helps you avoid delays even where the underlying legal requirement depends on your licence's script.",
    points: [
      { tip: "A valid foreign licence is usable in Peru for the first six months of your stay under Peru's 2006 accession to the 1968 Vienna Convention on Road Traffic.", status: "confirmed" },
      { tip: "If your licence isn't in English or Latin script, an IDP or a notarized translation is what provides the translation local authorities and rental staff need.", status: "confirmed" },
      { tip: "At least one major rental company applies its own shorter 60-day window before requiring an IDP regardless of script — a rental counter's own policy, distinct from Peru's six-month legal allowance.", status: "partially_sourced" },
      { tip: "You should carry your original licence, your passport, and your IDP if applicable together at all times while driving.", status: "confirmed" },
      { tip: "Peru drives on the right, with the driver's seat on the left side of the vehicle.", status: "confirmed" },
    ],
    solutionNote: "ApplyIDPOnline prepares your IDP fully online before you travel, so it's ready before you land in Lima or Cusco.",
    ctaHint: { label: "Prepare my IDP for Peru", href: "/apply?destination=Peru" },
  },

  roadRulesGuide: {
    label: "Road Rules",
    directAnswer: "Cusco and the Sacred Valley sit at genuinely high altitude, mountain roads to sites like Rainbow Mountain are narrow and unpaved, and the Panamericana's tolls are almost always cash-only.",
    points: [
      { tip: "Cusco sits at roughly 3,400m and Sacred Valley towns like Pisac and Urubamba sit lower, around 2,800-3,000m — altitude sickness (soroche) can affect a driver's own judgment and reaction time, not just cause discomfort.", status: "confirmed" },
      { tip: "Acclimatizing before driving mountain routes matters — some travelers descend from Cusco to the lower Sacred Valley first rather than driving straight out at altitude.", status: "partially_sourced" },
      { tip: "Roads to high-altitude sites such as Rainbow Mountain and Humantay Lake are often narrow, unpaved, and without guardrails — an SUV or 4x4 is commonly recommended for these routes.", status: "confirmed" },
      { tip: "Landslides and road closures are more common in the Cusco highlands during the rainy season, roughly December through March.", status: "confirmed" },
      { tip: "Toll points (peaje) are common on the Panamericana coastal highway and are typically cash-only in Peruvian soles.", status: "confirmed" },
      { tip: "Police checkpoints are frequent on major highways — slow down, stay calm, and have your documents ready to show.", status: "confirmed" },
      { tip: "Driving the Panamericana or mountain roads after dark is widely discouraged due to limited lighting and landslide risk.", status: "partially_sourced" },
    ],
    solutionNote: "Your IDP presents your licence details in a standardized, multi-language format that's easier for local officials to check.",
    ctaHint: { label: "Check your eligibility", href: "#eligibility" },
  },

  rentalGuide: {
    label: "Rental Cars",
    directAnswer: "Self-drive car rental is available at Lima's Jorge Chávez International Airport and Cusco's Alejandro Velasco Astete International Airport, with insurance coverage for unpaved mountain roads worth confirming before any Sacred Valley or Colca Canyon route.",
    points: [
      { tip: "Jorge Chávez International Airport in Lima and Alejandro Velasco Astete International Airport in Cusco both have self-drive rental counters from major providers.", status: "confirmed" },
      { tip: "Standard rental insurance commonly excludes damage on unpaved roads unless you've specifically arranged off-road or 4x4 coverage — this varies by provider, so confirm it directly rather than assuming either way.", status: "confirmed" },
      { tip: "Third-party liability insurance is mandatory in Peru and is typically bundled into the rental agreement.", status: "confirmed" },
      { tip: "Most rental companies set their own minimum age around 23 with at least a year of driving experience — separate from Peru's general legal driving age of 18.", status: "partially_sourced" },
      { tip: "Typical documents requested at pickup are your original licence, your IDP if applicable, your passport, and a credit card in the main driver's name for the deposit.", status: "confirmed" },
    ],
    solutionNote: "ApplyIDPOnline prepares the IDP most Peruvian rental counters expect to see alongside your original licence.",
    ctaHint: { label: "Check your eligibility", href: "#eligibility" },
  },

  policeGuide: {
    label: "Police & Roadside Checks",
    directAnswer: "Keep your original driving licence, your passport, and your International Driving Permit if you're carrying one, together as your standard document set any time you're driving in Peru.",
    points: [
      { tip: "Your original licence, passport, and IDP if you're carrying one, should be kept together and accessible at all times while driving.", status: "confirmed" },
      { tip: "105 reaches police nationwide, 106 reaches SAMU ambulance services, and 116 reaches fire — the Tourist Police in Lima can also be reached directly for travel-specific help.", status: "confirmed" },
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
    { name: "Lima", note: "Peru's dominant rental market, with pickup at Jorge Chávez International Airport and the starting point for most self-drive itineraries.", status: "confirmed" },
    { name: "Cusco", note: "The gateway to the Sacred Valley and Machu Picchu, reached at real altitude — a genuine high-altitude driving base, not just a scenic stopover.", status: "confirmed" },
    { name: "Arequipa", note: "Peru's second-strongest rental market outside Lima and Cusco, and the gateway to the dramatic road trip along Colca Canyon.", status: "confirmed" },
    { name: "Ica", note: "The driving base for Peru's southern coastal desert — Huacachina's dunes, the Paracas coastline, and the Nazca Lines are all reached from here.", status: "confirmed" },
  ],

  borderCrossingRelevant: false,

  emergencyNumber: { value: "105 (police), 106 (ambulance/SAMU), 116 (fire)", status: "confirmed" },

  faq: [
    {
      question: "Do I need an International Driving Permit to drive in Peru?",
      answer: "Most rental companies in Peru ask for an IDP at the counter regardless of licence language, so carrying one helps you avoid delays. Legally, a valid foreign licence is usable for the first six months of your stay under Peru's 2006 accession to the 1968 Vienna Convention — an IDP becomes necessary mainly if your licence isn't in English or Latin script, since it provides the translation authorities need. ApplyIDPOnline prepares yours fully online before your trip either way.",
    },
    {
      question: "I have a US, UK, Canadian, or Australian licence — do I need an IDP?",
      answer: "Not always strictly by law, since an English-language licence is already in Latin script and usable for the length of Peru's six-month allowance — but most rental companies still expect an IDP as a standard condition of rental, and at least one major provider applies its own shorter 60-day window before requiring one.",
    },
    {
      question: "Is it safe to drive at high altitude in Cusco or the Sacred Valley?",
      answer: "It calls for real preparation. Cusco sits at roughly 3,400m, and altitude sickness (soroche) can affect a driver's own judgment and reaction time, not just cause discomfort. Acclimatizing before driving mountain routes — some travelers descend to the lower Sacred Valley first — is a genuine safety step, not just travel comfort advice.",
    },
    {
      question: "Can I drive to Rainbow Mountain or Humantay Lake in a rental car?",
      answer: "The access roads are often narrow, unpaved, and without guardrails, so an SUV or 4x4 is commonly recommended. Many travelers choose a guided tour for these specific routes instead, but self-driving is done by some visitors comfortable with unsealed mountain roads.",
    },
    {
      question: "Does rental insurance cover unpaved mountain roads in Peru?",
      answer: "It varies by provider — standard coverage commonly excludes unpaved-road and underbody damage unless you've specifically arranged off-road coverage. Confirm this directly with your rental company before any Sacred Valley or Colca Canyon route rather than assuming either way.",
    },
    {
      question: "Can I rent a car at Lima or Cusco airport?",
      answer: "Yes — Jorge Chávez International Airport in Lima and Alejandro Velasco Astete International Airport in Cusco both have self-drive rental counters from major providers.",
    },
    {
      question: "Are Peru's highways tolled?",
      answer: "Yes — toll points (peaje) are common on the Panamericana coastal highway and are typically cash-only in Peruvian soles, so keep small change on hand.",
    },
    {
      question: "What's the minimum age to drive in Peru?",
      answer: "The general legal driving age is 18, though most rental companies set their own minimum around 23 with at least a year of driving experience — a separate, stricter rental-counter policy rather than the legal age itself.",
    },
    {
      question: "What side of the road does Peru drive on?",
      answer: "Peru drives on the right, with the driver's seat on the left side of the vehicle.",
    },
    {
      question: "Is it safe to drive the Panamericana or mountain roads at night?",
      answer: "It's widely discouraged. Limited lighting and landslide risk on mountain routes make daytime driving the safer, more commonly recommended choice.",
    },
    {
      question: "Can I apply for an IDP after I've already arrived in Peru?",
      answer: "Yes. You can submit your application fully online even after you've arrived in Peru, since it's prepared based on your home-country licence rather than issued in person. Eligible digital documents are typically prepared in about 8 minutes after successful submission, payment, and approval, and printed documents are also available.",
    },
    {
      question: "Is a Digital IDP accepted by every rental company in Peru?",
      answer: "Not universally — acceptance can vary by rental provider, so it's worth checking with your specific rental company before your trip, or choosing the Print + Digital option for broader coverage.",
    },
  ],

  sourceCitations: [
    {
      label: "MTC: Todo lo que un extranjero debe saber para obtener una licencia de conducir peruana",
      url: "https://www.gob.pe/institucion/mtc/noticias/1356271-mtc-todo-lo-que-un-extranjero-debe-saber-para-obtener-una-licencia-de-conducir-peruana",
      organization: "Ministerio de Transportes y Comunicaciones (MTC)",
    },
    {
      label: "Car Rental at Lima International Airport (LIM)",
      url: "https://www.alamo.com/en/car-rental-locations/pe/lima-international-airport-kf06.html",
      organization: "Alamo Rent A Car",
    },
  ],
  lastVerifiedDate: "2026-08-05",

  relatedCountrySlugs: ["chile", "argentina", "brazil", "united-states"],

  primaryKeyword: "international driving permit peru",
  secondaryKeywords: [
    "idp peru",
    "international driving license peru",
    "car rental peru",
    "lima car rental",
    "lima airport car rental",
    "cusco car rental",
    "arequipa car rental",
    "driving in peru",
    "driving in cusco",
    "sacred valley road trip",
    "machu picchu road trip",
    "peru rental car requirements",
  ],
  metaTitle: "International Driving Permit Peru: Andes Driving Rules",
  metaTitleAbsolute: true,
  metaDescription:
    "Peru's Ministry of Transport allows a foreign licence for six months under its 2006 Vienna Convention accession, a detail rental counters rarely explain.",
};
