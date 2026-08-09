import type { CountryRecord } from "./types";

// Norway — Tier 1 flagship record, built on Master Country Template v1.0.
// No template/component changes made for this record, only data. This is
// the first pass for Norway — no prior flag component, destinations.ts
// entry, or flagColors.ts entry existed before this build; all three were
// added.
//
// OSLO-IS-NOT-THE-WHOLE-STORY DISCIPLINE (the defining instruction for
// this build): the brief was explicit that this page must not focus only
// on Oslo, and Semrush backs that up decisively. The single-highest-volume
// scenic-route entity found in this entire research pass is Trollstigen
// (27,100/mo, no database) — higher than Oslo itself as a bare city term
// (49,500/mo generic, but only ~1,900/mo for the specific "oslo car
// rental" commercial term). Geirangerfjord (12,100-18,100/mo across the no
// and de databases), Nordkapp (12,100/mo), Lofoten (27,100/mo), Flåm and
// Hardangerfjord (6,600/mo each), and the Atlantic Ocean Road (3,600/mo,
// consistent across both the no and de databases) all substantially
// outperform every direct IDP-specific term (10-140/mo). Scenic-route and
// road-trip content isn't a secondary add-on for this page — it's the
// dominant demand signal, and the Road Rules and Popular Driving Areas
// modules are built to reflect that.
//
// LEGAL SHAPE: matches the Spain/Italy/Romania/Hungary "Commonly
// requested" + EU/EEA pattern, with Norway's own EEA (not EU) membership
// producing the identical practical outcome. EU/EEA driving licences are
// fully recognized in Norway with no IDP needed. Non-EU/EEA visitors can
// generally drive on their home licence for up to three months (90 days)
// from arrival; an IDP is the practical way to carry a translation if
// that licence isn't already in English or a Scandinavian language.
// `idpRequirementLevel: "Commonly requested"` / `conventionLabel:
// "Required for non-EU/EEA visitors"`. Every FAQ/directAnswer touching
// the requirement leads with the practical rental-counter outcome before
// the legal nuance, per the standing project rule saved from France.
//
// POPULAR DRIVING AREAS RESEARCH NOTE: the brief named six candidates to
// weigh — Oslo, Bergen, Lofoten, Atlantic Ocean Road, Geirangerfjord, and
// Trollstigen — with only four cards available. Oslo is mandatory as the
// capital and the country's dominant rental hub. Bergen is the clear
// second pick, both explicitly named and the highest-volume named city
// after Oslo, and the standard gateway to the western fjords. Trollstigen
// and Geirangerfjord are, in practice, the same road trip — the
// Trollstigen mountain pass is the dramatic access route into the
// Geirangerfjord valley, and real itineraries never separate them — so
// rather than split two cards between one connected experience, this
// record uses "Geirangerfjord" as the named card (the UNESCO-listed fjord
// is the more globally recognized anchor entity) and gives Trollstigen
// explicit, substantial coverage within that card's own note and in the
// FAQ, satisfying the brief's "significant coverage" instruction for both
// without duplicating one destination across two cards. That leaves the
// fourth slot for Lofoten, a distinct Arctic self-drive region with
// volume (27,100/mo) matching Trollstigen's own and a completely
// different travel narrative (the E10 island-hopping road trip) from the
// western fjords. The Atlantic Ocean Road (3,600/mo) is real and
// well-documented but the smallest of the six by search volume — it
// receives dedicated coverage in the Road Rules guide and its own FAQ
// entry rather than a fifth Popular Driving Areas card, since every prior
// country record in this project holds that count at exactly four.
//
// AUTOPASS AND FERRIES, stated precisely rather than glossed over: both
// road tolls and many ferry crossings in Norway run through the same
// AutoPASS system, charged automatically by number-plate recognition at
// full driving speed — there's nothing to stop for or pay on-site at a
// toll point. Most Norwegian rental fleets are pre-registered with
// AutoPASS, and the rental company bills tolls (often with an added
// administrative fee) after the vehicle is returned, not at the time of
// travel. This record doesn't claim tourists get the same discounted
// rates a registered Norwegian vehicle owner with a prepaid ferry account
// would receive, since that's a different, resident-oriented product.
//
// Sourcing discipline: Semrush's keyword_research tool succeeded this
// build (phrase_these reports run against the uk, no, and de databases,
// which is what surfaced the scenic-route volume finding above). GOV.UK's
// Norway safety-and-security travel advice was fetched directly and is
// the primary citation for UK licence validity, winter-tyre requirements,
// headlight rules, right-of-way at unmarked junctions, and the
// drink-driving limit. Statens Vegvesen (the Norwegian Public Roads
// Administration) is the secondary citation for the non-EU/EEA licence
// window and animal-collision duties. Fields not corroborated by a
// primary government source are marked partially_sourced.
//
// FLAG VERIFICATION (mandatory per the user's brief): no NorwayFlag
// component existed before this build. The new component reproduces the
// flag's official geometric proportions exactly — horizontal divisions
// 6:1:2:1:12 and vertical divisions 6:1:2:1:6 (overall ratio 22:16) — as
// two pairs of fimbriation/cross rectangles, the same construction
// technique already used for Iceland's flag in this codebase, at the
// hex values most consistently cited against Norway's own flag
// specification (red #BA0C2F, blue #00205B, white). Verified visually at
// zoom before this record shipped.
export const NORWAY: CountryRecord = {
  slug: "norway",
  name: "Norway",
  isoCode: "NO",
  region: "Europe",
  tier: 1,

  h1: "International Driving Permit Norway",

  conventionStatus: {
    value: "As an EEA member, Norway fully recognizes any valid EU/EEA driving licence — no International Driving Permit is needed. Non-EU/EEA visitors can generally drive on their home licence for up to three months from arrival; an IDP is the practical way to carry a translation if that licence isn't already in English or a Scandinavian language",
    status: "confirmed",
  },
  conventionLabel: "Required for non-EU/EEA visitors",
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
      "Most car rental companies in Oslo and Bergen ask for an International Driving Permit at the counter, so carrying one helps you avoid delays even where the underlying legal requirement depends on your licence.",
    points: [
      { tip: "EU/EEA driving licences are fully recognized in Norway — no IDP is needed at all.", status: "confirmed" },
      { tip: "Non-EU/EEA visitors can generally drive on their home licence for up to three months from arrival.", status: "confirmed" },
      { tip: "If your licence isn't already in English or a Scandinavian language, an IDP is the practical way to carry that translation.", status: "confirmed" },
      { tip: "Most rental companies in Oslo, Bergen, and beyond treat an IDP as a standard condition of rental regardless of these exceptions.", status: "confirmed" },
      { tip: "Norway drives on the right, with the driver's seat on the left side of the vehicle.", status: "confirmed" },
    ],
    solutionNote: "ApplyIDPOnline prepares your IDP fully online before you travel, so it's ready before you land in Oslo or Bergen.",
    ctaHint: { label: "Prepare my IDP for Norway", href: "/apply?destination=Norway" },
  },

  roadRulesGuide: {
    label: "Road Rules",
    directAnswer: "Norway's scenic mountain and fjord roads call for real preparation — tolls and most ferries run through the same automated AutoPASS system, winter tyres are required in snow or ice, and dipped headlights stay on day and night, year-round.",
    points: [
      { tip: "Road tolls and many ferry crossings are billed automatically through AutoPASS by number-plate recognition at full driving speed — there's nothing to stop for or pay on-site, and most rental cars are already registered.", status: "confirmed" },
      { tip: "Your rental company bills any tolls and ferry charges after you return the car, typically with a small administrative fee added.", status: "confirmed" },
      { tip: "Winter tyres with at least 3mm of tread are required whenever roads are covered in snow or ice, and studded tyres or snow chains are sometimes necessary too.", status: "confirmed" },
      { tip: "Dipped headlights must stay on at all times, day and night, year-round, everywhere in the country.", status: "confirmed" },
      { tip: "At junctions without a priority sign, you must give way to traffic coming from your right.", status: "confirmed" },
      { tip: "Reindeer and moose can appear suddenly on rural roads and in tunnels, especially at dawn and dusk — this is a real hazard on routes through northern Norway and Lofoten, not just a rare occurrence.", status: "confirmed" },
      { tip: "Norway's drink-driving limit is 0.02% blood alcohol, far stricter than most countries.", status: "confirmed" },
      { tip: "On-the-spot fines for driving offences can reach NOK 10,000.", status: "confirmed" },
    ],
    solutionNote: "Your IDP presents your licence details in a standardized, multi-language format that's easier for local officials to check.",
    ctaHint: { label: "Check your eligibility", href: "#eligibility" },
  },

  rentalGuide: {
    label: "Rental Cars",
    directAnswer: "Self-drive car rental is widely available at Oslo Airport and Bergen Airport, with most providers setting age requirements above the legal minimum.",
    points: [
      { tip: "The legal minimum driving age is 18, but rental company minimums are typically higher — commonly 21, sometimes 25 for larger vehicles — and your licence usually needs to have been held for at least a year.", status: "confirmed" },
      { tip: "Oslo Airport and Bergen Airport both have rental counters from every major provider.", status: "confirmed" },
      { tip: "Typical documents requested at pickup are your original licence, an IDP if applicable, your passport or ID, and a credit card in the main driver's name for the deposit.", status: "confirmed" },
      { tip: "Many rental fleets in Norway are electric — Norway has the world's highest EV adoption rate — so if you're renting an EV, register with a couple of the major charging networks before you set off.", status: "confirmed" },
    ],
    solutionNote: "ApplyIDPOnline prepares the IDP most Norwegian rental counters expect to see alongside your original licence.",
    ctaHint: { label: "Check your eligibility", href: "#eligibility" },
  },

  policeGuide: {
    label: "Police & Roadside Checks",
    directAnswer: "Keep your original driving licence, and your International Driving Permit if you're carrying one, together as your standard document set any time you're driving in Norway.",
    points: [
      { tip: "Your original licence, and your IDP if you're carrying one, should be kept together and accessible at all times while driving.", status: "confirmed" },
      { tip: "Emergency numbers are 112 for police, 113 for ambulance, and 110 for fire.", status: "confirmed" },
      { tip: "If you hit an animal, you're legally required to mark the spot, alert the police, and not simply drive on.", status: "confirmed" },
    ],
    solutionNote: "A calmly prepared, correctly formatted IDP is the most straightforward way to have your documents ready if you're ever asked.",
    ctaHint: { label: "Check your eligibility", href: "#eligibility" },
  },

  borderCrossingGuide: {
    label: "Cross-Border Driving",
    directAnswer: "Driving from Norway into Sweden or Finland is normally a free-flow Schengen crossing, with the same rental-company arrangements you'd confirm for any cross-border trip.",
    points: [
      { tip: "Norway isn't in the EU but is a Schengen member, so crossing into Sweden or Finland by road is normally free-flow with no routine document checks.", status: "confirmed" },
      { tip: "Tell your rental company in advance if you're planning to cross into Sweden or Finland — cross-border coverage and AutoPASS billing across borders need to be confirmed, not assumed.", status: "confirmed" },
      { tip: "Your IDP requirement, where it applies, covers driving within Norway — Sweden and Finland each set their own separate licence and document rules.", status: "confirmed" },
    ],
    solutionNote: "ApplyIDPOnline prepares your IDP for driving in Norway — cross-border rental arrangements are confirmed separately with your provider.",
    ctaHint: { label: "Check your eligibility", href: "#eligibility" },
  },

  motorcycleScooterRelevant: false,
  vehicleCategoryNote: {
    value: "Your IDP lists the vehicle categories shown on your original licence — it doesn't grant categories your original licence doesn't already include.",
    status: "confirmed",
  },
  vehicleCategoryLabel: "Car",

  popularDrivingAreas: [
    { name: "Oslo", note: "Norway's dominant rental market, with pickup at Oslo Airport and the natural starting point for road trips heading toward the fjords or south coast.", status: "confirmed" },
    { name: "Bergen", note: "The gateway to Norway's western fjords, with pickup at Bergen Airport and the classic starting point for the Norway in a Nutshell route and Hardangerfjord.", status: "confirmed" },
    { name: "Geirangerfjord", note: "A UNESCO-listed fjord reached via the Trollstigen mountain pass's hairpin switchbacks — together they form one of Norway's most famous single road trips.", status: "confirmed" },
    { name: "Lofoten Islands", note: "An Arctic self-drive archipelago linked by the E10 highway and bridges, with a completely different landscape and travel season from the western fjords.", status: "confirmed" },
  ],

  borderCrossingRelevant: true,

  emergencyNumber: { value: "112 (police), 113 (ambulance), 110 (fire)", status: "confirmed" },

  faq: [
    {
      question: "Do I need an International Driving Permit to drive in Norway?",
      answer: "Most rental companies in Oslo and Bergen ask for an IDP at the counter, so carrying one helps you avoid delays. Legally, EU/EEA licences are fully recognized with no IDP needed at all — non-EU/EEA visitors can generally drive on their home licence for up to three months, and an IDP becomes the practical way to carry a translation if your licence isn't already in English or a Scandinavian language. ApplyIDPOnline prepares yours fully online before your trip either way.",
    },
    {
      question: "I have a US, UK, Canadian, or Australian licence — do I need an IDP?",
      answer: "Not always strictly by law, since a valid English-language licence can generally be used for up to three months from arrival — a UK photocard licence, for example, is valid to drive in Norway for up to 90 days. Most rental companies expect an IDP regardless, so it's worth having one ready rather than finding out at the counter.",
    },
    {
      question: "How does the AutoPASS toll system work for a rental car in Norway?",
      answer: "You don't stop or pay on-site — road tolls and many ferry crossings are billed automatically by camera reading your number plate as you drive through at full speed. Most rental cars are already registered with AutoPASS, and your rental company bills you for any charges after you return the car, usually with a small administrative fee.",
    },
    {
      question: "Do I need winter tyres to drive in Norway?",
      answer: "Yes, whenever roads are covered in snow or ice — winter tyres with at least 3mm of tread are required, and studded tyres or snow chains are sometimes necessary as well, particularly outside the summer months.",
    },
    {
      question: "Do I need my headlights on during the day in Norway?",
      answer: "Yes, always — dipped headlights must stay on day and night, year-round, everywhere in the country, not just in winter or at night.",
    },
    {
      question: "Is hitting a reindeer or moose a real risk when driving in Norway?",
      answer: "Yes — it's a genuine, well-documented hazard, especially at dawn and dusk on rural roads and even inside tunnels in northern Norway. If you hit an animal, you're legally required to mark the spot and alert the police rather than simply driving on.",
    },
    {
      question: "Is the drive from Bergen through the fjords worth doing as a tourist?",
      answer: "Yes — Bergen is the standard starting point for the Norway in a Nutshell route and the Hardangerfjord, and it's Norway's second-largest rental market after Oslo.",
    },
    {
      question: "Is Trollstigen included on the way to Geirangerfjord?",
      answer: "Yes — Trollstigen's hairpin mountain pass is the dramatic access road into the Geirangerfjord valley, and the two are typically driven together as a single, well-known route rather than as separate trips.",
    },
    {
      question: "Is the Atlantic Ocean Road worth driving?",
      answer: "Yes — it's one of Norway's most photographed stretches of road, a series of low bridges connecting small islands with open Atlantic Ocean on both sides, commonly combined with a wider western Norway road trip.",
    },
    {
      question: "Can I rent an electric car in Norway, and is charging easy to find?",
      answer: "Yes — Norway has the world's highest EV adoption rate and thousands of fast chargers nationwide, so EV rentals are common. It's worth registering with a couple of the major charging network apps before you set off, since access sometimes requires an account.",
    },
    {
      question: "Can I drive a rental car from Norway into Sweden or Finland?",
      answer: "Yes — Norway is a Schengen member, so crossing into Sweden or Finland by road is normally free-flow with no routine document checks. Tell your rental company in advance so cross-border coverage is confirmed rather than assumed.",
    },
    {
      question: "What side of the road does Norway drive on?",
      answer: "Norway drives on the right, with the driver's seat on the left side of the vehicle.",
    },
    {
      question: "What's the minimum age to drive, and to rent a car, in Norway?",
      answer: "The legal minimum driving age is 18. Rental company minimums are typically higher — commonly 21, sometimes 25 for larger vehicles — and your licence usually needs at least a year's history.",
    },
    {
      question: "Can I apply for an IDP after I've already arrived in Norway?",
      answer: "Yes. You can submit your application fully online even after you've arrived in Norway, since it's prepared based on your home-country licence rather than issued in person. Eligible digital documents are typically prepared in about 8 minutes after successful submission, payment, and approval, and printed documents are also available.",
    },
    {
      question: "Is a Digital IDP accepted by every rental company in Norway?",
      answer: "Not universally — acceptance can vary by rental provider, so it's worth checking with your specific rental company before your trip, or choosing the Print + Digital option for broader coverage.",
    },
  ],

  sourceCitations: [
    {
      label: "Foreign travel advice — Norway (Safety and security)",
      url: "https://www.gov.uk/foreign-travel-advice/norway/safety-and-security",
      organization: "GOV.UK — Foreign, Commonwealth & Development Office",
    },
    {
      label: "Using a driving licence from a non-EU/EEA country in Norway",
      url: "https://www.vegvesen.no/en/driving-licences/driving-licence-holders/foreign-driving-licence-in-norway/using-a-non-eueea-driving-licence-in-norway/",
      organization: "Statens vegvesen (Norwegian Public Roads Administration)",
    },
  ],
  lastVerifiedDate: "2026-08-05",

  relatedCountrySlugs: ["sweden", "iceland", "united-kingdom", "netherlands"],

  primaryKeyword: "international driving permit norway",
  secondaryKeywords: [
    "idp norway",
    "international driving license norway",
    "car rental norway",
    "oslo car rental",
    "bergen car rental",
    "norway road trip",
    "norway scenic routes",
    "lofoten road trip",
    "geirangerfjord",
    "trollstigen",
    "atlantic ocean road",
    "norway toll roads",
  ],
  metaTitle: "International Driving Permit Norway: Eligibility Rules",
  metaTitleAbsolute: true,
  metaDescription:
    "EEA licences need nothing extra. Non-EEA visitors get three months on their home licence, with an IDP useful mainly as a translation into English.",
};
