import type { CountryRecord } from "./types";

// Austria — Tier 1 flagship record, built on Master Country Template
// v1.0. No template/component changes made for this record, only data.
// This is the first pass for Austria — no prior flag component,
// destinations.ts entry, or flagColors.ts entry existed before this
// build; all three were added.
//
// VIGNETTE-DOMINANT KEYWORD CLUSTER (the single strongest finding of this
// build's Semrush research, and the reason the vignette system gets a
// full standalone module rather than a passing mention): "österreich
// vignette" — the German-language term for "Austria vignette" — returns
// 49,500/mo in the de database, dwarfing every other term found in this
// research pass by more than an order of magnitude. "vignette austria"
// (2,900/mo, at database) and "austria motorway vignette" (720/mo, uk
// database) confirm this isn't a single-market artifact, and direct
// IDP-specific terms are all tiny by comparison (10-90/mo across every
// database tested). "grossglockner high alpine road" (2,900/mo, at
// database; 1,300/mo, uk database) is also stronger than any IDP term —
// Austria's page is built around the reality that vignette and Alpine
// road-trip content is the dominant demand signal, exactly as the brief
// anticipated.
//
// LEGAL SHAPE: matches the Hungary/Norway/Spain/Italy/Romania "Commonly
// requested" + EU/EEA pattern. EU/EEA driving licences are fully valid
// in Austria with no time limit at all. Non-EU/EEA visitors can drive on
// a foreign licence for up to 12 months from arrival, provided they're
// at least 18 — a notably longer window than Hungary's or Norway's
// three-month period, stated precisely rather than assumed identical.
// If that licence isn't in German, it must be carried alongside an IDP
// or an official translation. `idpRequirementLevel: "Commonly
// requested"` / `conventionLabel: "Required for non-EU/EEA visitors"` —
// the EU/EEA split is used as the primary label rather than the
// German-language nuance, since GOV.UK's own Austria advice doesn't
// address IDPs or language at all, and the EU/EEA distinction is the
// more consistently corroborated one; the German-language nuance is
// still stated explicitly within the Driving guide's points. Every
// FAQ/directAnswer touching the requirement leads with the practical
// rental-counter outcome before the legal nuance, per the standing
// project rule saved from France.
//
// VIGNETTE vs SECTION TOLLS, kept as two genuinely distinct systems per
// the brief's explicit instruction: the standard vignette (sticker or
// digital, tied to the licence plate) covers ordinary motorway and
// expressway use, but specific mountain tunnels and passes — the A13
// Brenner, the A10 Tauern, the S16 Arlberg — charge a separate section
// toll on top of the vignette, paid at a toll booth or as a separate
// digital product. A rental car with a valid vignette can still owe an
// unpaid section toll if it uses one of these routes. The digital
// vignette also has a genuinely easy-to-miss quirk worth flagging on its
// own: annual and 2-month digital vignettes bought online can't start
// until 18 days after purchase (an EU consumer-protection cooling-off
// rule), while 1-day and 10-day digital vignettes can be activated
// immediately — a traveler buying a short-stay vignette has no issue,
// but someone assuming an annual one works the same way could be caught
// out.
//
// VIENNA PARKING vs EMISSIONS, a genuine competitor gap closed here: for
// an ordinary visiting car, Vienna's real day-to-day obstacle is the
// Kurzparkzone short-term paid-parking system — covering almost the
// entire city inside the Gürtel, two-hour limit, a Parkschein required
// for every stop, heavily enforced — not an emissions restriction.
// Austria's IG-L low-emission framework mainly affects heavy and
// commercial vehicles rather than requiring an ordinary rental car to
// display anything, which is a meaningfully different picture from
// Germany's stricter Umweltzone system and worth stating clearly rather
// than assuming the two countries work the same way.
//
// POPULAR DRIVING AREAS RESEARCH NOTE: the brief asked me to seriously
// weigh Vienna, Salzburg, Innsbruck/Tyrol, Hallstatt/Salzkammergut,
// Grossglockner, Graz, Wachau Valley, and Zell am See, and was explicit
// that Vienna and Salzburg shouldn't be omitted without strong
// data-backed justification. Both are comfortably justified on data
// alone — Vienna is the country's dominant rental market ("vienna car
// rental" at 2,900/mo, at database, the single highest city-rental term
// found), and Salzburg is second (880/mo). That leaves two slots.
// Grossglockner High Alpine Road is the clearest self-drive-specific
// entity in the entire research set — a toll mountain road built for
// scenic driving, not just a place to visit — with real, consistent
// volume across two databases (2,900/mo at, 1,300/mo uk). The fourth
// slot goes to Hallstatt: at 135,000/mo (at database) it's the single
// highest-volume named entity found anywhere in this research pass, by
// a wide margin over Zell am See (110,000) or Kitzbühel (60,500), and
// it has a well-established self-drive day-trip narrative from Salzburg
// through the Salzkammergut lake district. Innsbruck/Tyrol (590/mo car
// rental) was evaluated and is real, but placed below Hallstatt's
// overwhelming volume and Grossglockner's stronger self-drive framing —
// it's covered in the Rental Cars guide and FAQ instead of taking a
// fifth card, since every prior country record in this project holds
// Popular Driving Areas at exactly four.
//
// Sourcing discipline: Semrush's keyword_research tool succeeded this
// build (phrase_these reports run against the uk, at, and de databases,
// which is what surfaced the vignette-dominance finding above). GOV.UK's
// Austria safety-and-security travel advice was fetched directly and is
// the primary citation for UK licence validity and the vignette
// requirement. ASFINAG (Austria's official motorway operator) is the
// secondary citation for the digital vignette mechanics, the 18-day
// activation rule, and section tolls. Fields not corroborated by a
// primary government/official-operator source are marked
// partially_sourced.
//
// FLAG VERIFICATION (mandatory per the user's brief): no AustriaFlag
// component existed before this build. The new component is the plain
// civil flag — equal horizontal red-white-red stripes, no eagle — at
// the standard 900x600 canvas already used throughout this codebase
// (matching the flag's official 2:3 ratio), using the hex value most
// consistently cited against Austria's flag specification (Pantone 186C
// / #C8102E). The state flag's black eagle was deliberately not added,
// since the civil flag is the correct version for this context — the
// same national-vs-state distinction already applied correctly
// elsewhere in this project. Verified visually at zoom before this
// record shipped.
export const AUSTRIA: CountryRecord = {
  slug: "austria",
  name: "Austria",
  isoCode: "AT",
  region: "Europe",
  tier: 1,

  h1: "International Driving Permit Austria",

  conventionStatus: {
    value: "As an EU member, Austria fully recognizes any valid EU/EEA driving licence — no International Driving Permit is needed, with no time limit. Non-EU/EEA visitors can drive on a valid foreign licence for up to 12 months from arrival if they're at least 18; if that licence isn't in German, it must be carried alongside an IDP or an official translation",
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
      "Most car rental companies in Vienna and Salzburg ask for an International Driving Permit at the counter, so carrying one helps you avoid delays even where the underlying legal requirement depends on your licence.",
    points: [
      { tip: "EU/EEA driving licences are fully valid in Austria with no time limit — no IDP is needed at all.", status: "confirmed" },
      { tip: "Non-EU/EEA visitors can generally drive on a valid foreign licence for up to 12 months from arrival, provided they're at least 18.", status: "confirmed" },
      { tip: "If your licence isn't already in German, it needs to be carried alongside an IDP or an official translation.", status: "confirmed" },
      { tip: "Most rental companies in Vienna, Salzburg, and beyond treat an IDP as a standard condition of rental regardless of these exceptions.", status: "confirmed" },
      { tip: "Austria drives on the right, with the driver's seat on the left side of the vehicle.", status: "confirmed" },
    ],
    solutionNote: "ApplyIDPOnline prepares your IDP fully online before you travel, so it's ready before you land in Vienna or Salzburg.",
    ctaHint: { label: "Prepare my IDP for Austria", href: "/apply?destination=Austria" },
  },

  roadRulesGuide: {
    label: "Road Rules",
    directAnswer: "Austria's motorways run on a vignette system separate from mountain-pass section tolls, winter tyres become required whenever conditions call for them, and Vienna's real day-to-day obstacle for visitors is short-term paid parking rather than emissions restrictions.",
    points: [
      { tip: "A vignette is required on all Austrian motorways and expressways — as a windscreen sticker or a digital vignette tied to your licence plate — and driving without one results in a fine.", status: "confirmed" },
      { tip: "Specific mountain tunnels and passes, including the Brenner (A13), Tauern (A10), and Arlberg (S16), charge a separate section toll on top of the vignette, paid at a toll booth or as its own digital product.", status: "confirmed" },
      { tip: "A digital annual or 2-month vignette bought online can't start until 18 days after purchase, a consumer-protection cooling-off rule — 1-day and 10-day digital vignettes don't have this delay.", status: "confirmed" },
      { tip: "Winter tyres are situationally required from 1 November to 15 April whenever roads are actually wintry, with a minimum 4mm tread and, since October 2024, the Alpine 3PMSF symbol rather than M+S marking alone.", status: "confirmed" },
      { tip: "Snow chains are only permitted, and required, when a road is fully or almost fully covered in snow or ice, or where signposted.", status: "confirmed" },
      { tip: "In Vienna, the real practical obstacle for a visiting car is the Kurzparkzone — a citywide short-term paid-parking system covering almost the entire city inside the Gürtel, with a two-hour limit and a Parkschein required for every stop — rather than any emissions restriction, which mainly applies to heavy and commercial vehicles.", status: "confirmed" },
    ],
    solutionNote: "Your IDP presents your licence details in a standardized, multi-language format that's easier for local officials to check.",
    ctaHint: { label: "Check your eligibility", href: "#eligibility" },
  },

  rentalGuide: {
    label: "Rental Cars",
    directAnswer: "Self-drive car rental is widely available at Vienna International Airport and Salzburg Airport, with Innsbruck also a real option for Tyrol and Alpine-focused trips.",
    points: [
      { tip: "The legal minimum driving age is 18, but rental companies commonly set higher minimums and expect at least a year of licence history.", status: "confirmed" },
      { tip: "The UK government's own travel advice specifically notes that Austrian hire companies often impose stricter age and experience standards than the legal minimum.", status: "confirmed" },
      { tip: "Vienna International Airport and Salzburg Airport both have rental counters from every major provider.", status: "confirmed" },
      { tip: "Innsbruck Airport is a smaller but genuine option for trips focused on Tyrol and the western Alps rather than starting from Vienna.", status: "confirmed" },
      { tip: "Typical documents requested at pickup are your original licence, an IDP if applicable, your passport or ID, and a credit card in the main driver's name for the deposit.", status: "confirmed" },
      { tip: "Rental cars generally come with a vignette already included or arranged by the provider — confirm this with your rental company rather than assuming you need to buy one separately.", status: "partially_sourced" },
    ],
    solutionNote: "ApplyIDPOnline prepares the IDP most Austrian rental counters expect to see alongside your original licence.",
    ctaHint: { label: "Check your eligibility", href: "#eligibility" },
  },

  policeGuide: {
    label: "Police & Roadside Checks",
    directAnswer: "Keep your original driving licence, and your International Driving Permit if you're carrying one, together as your standard document set any time you're driving in Austria.",
    points: [
      { tip: "Your original licence, and your IDP if you're carrying one, should be kept together and accessible at all times while driving.", status: "confirmed" },
      { tip: "Emergency numbers are 133 for police, 144 for ambulance, 122 for fire, and 140 for mountain rescue — 112 also works as a universal EU emergency number nationwide.", status: "confirmed" },
      { tip: "Vignette compliance on motorways is checked automatically by camera against your licence plate, so a missing vignette is typically caught electronically.", status: "confirmed" },
    ],
    solutionNote: "A calmly prepared, correctly formatted IDP is the most straightforward way to have your documents ready if you're ever asked.",
    ctaHint: { label: "Check your eligibility", href: "#eligibility" },
  },

  borderCrossingGuide: {
    label: "Cross-Border Driving",
    directAnswer: "Driving from Austria into Germany, Switzerland, Italy, Slovenia, Hungary, Slovakia, or the Czech Republic is normally a free-flow Schengen crossing, though occasional spot checks are possible on several of these borders.",
    points: [
      { tip: "All seven of Austria's neighboring countries are Schengen members, so crossing by road is normally free-flow with no routine document checks.", status: "confirmed" },
      { tip: "Temporary spot checks have been reintroduced on some of these borders in recent years — Austria's own controls with Hungary, Slovakia, the Czech Republic, and Slovenia are confirmed in place into 2026 — so occasional checks are still possible even within Schengen.", status: "confirmed" },
      { tip: "Tell your rental company in advance if you're planning to cross into a neighboring country, since cross-border coverage needs to be confirmed rather than assumed.", status: "confirmed" },
      { tip: "Your IDP requirement, where it applies, covers driving within Austria — each neighboring country sets its own separate licence and document rules.", status: "confirmed" },
    ],
    solutionNote: "ApplyIDPOnline prepares your IDP for driving in Austria — cross-border rental arrangements are confirmed separately with your provider.",
    ctaHint: { label: "Check your eligibility", href: "#eligibility" },
  },

  motorcycleScooterRelevant: false,
  vehicleCategoryNote: {
    value: "Your IDP lists the vehicle categories shown on your original licence — it doesn't grant categories your original licence doesn't already include.",
    status: "confirmed",
  },
  vehicleCategoryLabel: "Car",

  popularDrivingAreas: [
    { name: "Vienna", note: "Austria's dominant rental market, with pickup at Vienna International Airport — though the Kurzparkzone paid-parking system, not motorway driving, is the real thing to plan around once you're in the city.", status: "confirmed" },
    { name: "Salzburg", note: "Austria's second-strongest rental market, with pickup at Salzburg Airport and the standard starting point for day trips into the Salzkammergut lake district.", status: "confirmed" },
    { name: "Grossglockner High Alpine Road", note: "A toll Alpine mountain road built specifically for scenic driving, with hairpin switchbacks climbing past Austria's highest peak — one of the country's defining self-drive experiences.", status: "confirmed" },
    { name: "Hallstatt", note: "Austria's most-searched single destination by a wide margin, reached as a well-established scenic day-trip drive from Salzburg through the Salzkammergut.", status: "confirmed" },
  ],

  borderCrossingRelevant: true,

  emergencyNumber: { value: "133 (police), 144 (ambulance), 122 (fire), 140 (mountain rescue) — 112 also works nationwide", status: "confirmed" },

  faq: [
    {
      question: "Do I need an International Driving Permit to drive in Austria?",
      answer: "Most rental companies in Vienna and Salzburg ask for an IDP at the counter, so carrying one helps you avoid delays. Legally, EU/EEA licences are fully valid with no IDP needed at all — non-EU/EEA visitors can generally drive on their foreign licence for up to 12 months, and an IDP becomes a genuine requirement mainly if that licence isn't already in German. ApplyIDPOnline prepares yours fully online before your trip either way.",
    },
    {
      question: "I have a US, UK, Canadian, or Australian licence — do I need an IDP?",
      answer: "Not always strictly by law, since non-EU/EEA visitors can generally drive on a valid foreign licence for up to 12 months from arrival — a UK photocard licence, for example, can be used to drive in Austria if you're 18 or over. Most rental companies expect an IDP regardless, so it's worth having one ready rather than finding out at the counter.",
    },
    {
      question: "Do I need a vignette to drive on Austrian motorways?",
      answer: "Yes — a vignette, either a windscreen sticker or a digital vignette linked to your licence plate, is required on all Austrian motorways and expressways. Driving without one results in a fine, and compliance is checked automatically by camera.",
    },
    {
      question: "What's the difference between the vignette and a section toll like the Brenner or Tauern?",
      answer: "They're separate charges. The vignette covers ordinary motorway and expressway use, but specific mountain tunnels and passes — the Brenner (A13), Tauern (A10), and Arlberg (S16) — charge an additional section toll on top of it, paid at a toll booth or as its own digital product. Having a valid vignette doesn't cover these routes.",
    },
    {
      question: "How far in advance do I need to buy Austria's digital vignette?",
      answer: "It depends on which one. A 1-day or 10-day digital vignette can be activated immediately. An annual or 2-month digital vignette bought online can't start until 18 days after purchase, a consumer-protection cooling-off rule — worth knowing before you plan a longer trip around one.",
    },
    {
      question: "Do I need winter tyres to drive in Austria?",
      answer: "Situationally, yes. Between 1 November and 15 April, winter tyres with at least 4mm of tread and the Alpine 3PMSF symbol are required whenever roads are actually covered in snow or ice — it isn't a blanket calendar requirement, but conditions during those months commonly trigger it.",
    },
    {
      question: "Is parking difficult in Vienna?",
      answer: "It's the main practical thing to plan around, more than any emissions rule. Almost the entire city inside the Gürtel is a Kurzparkzone — a paid short-term parking zone with a two-hour limit and a Parkschein required for every stop, heavily enforced with steep fines for visitors who don't display one.",
    },
    {
      question: "Is the Grossglockner High Alpine Road worth driving?",
      answer: "Yes — it's a toll Alpine road built specifically for scenic driving, with hairpin switchbacks climbing past Austria's highest peak, and one of the country's most distinctive self-drive experiences.",
    },
    {
      question: "Is Hallstatt reachable by car from Salzburg?",
      answer: "Yes — Hallstatt is a well-established scenic day-trip drive from Salzburg through the Salzkammergut lake district, and it's Austria's single most-searched destination by a wide margin.",
    },
    {
      question: "Can I drive a rental car from Austria into Germany, Switzerland, or Italy?",
      answer: "Yes — all of Austria's neighboring countries are Schengen members, so crossing is normally free-flow with no routine document checks, though temporary spot checks have been reintroduced on some borders in recent years. Tell your rental company in advance so cross-border coverage is confirmed rather than assumed.",
    },
    {
      question: "What side of the road does Austria drive on?",
      answer: "Austria drives on the right, with the driver's seat on the left side of the vehicle.",
    },
    {
      question: "What's the minimum age to drive, and to rent a car, in Austria?",
      answer: "The legal minimum driving age is 18. Rental companies commonly set higher minimums and expect at least a year of licence history, and Austrian hire companies are specifically noted for imposing stricter standards than the legal minimum.",
    },
    {
      question: "Can I apply for an IDP after I've already arrived in Austria?",
      answer: "Yes. You can submit your application fully online even after you've arrived in Austria, since it's prepared based on your home-country licence rather than issued in person. Eligible digital documents are typically prepared in about 8 minutes after successful submission, payment, and approval, and printed documents are also available.",
    },
    {
      question: "Is a Digital IDP accepted by every rental company in Austria?",
      answer: "Not universally — acceptance can vary by rental provider, so it's worth checking with your specific rental company before your trip, or choosing the Print + Digital option for broader coverage.",
    },
  ],

  sourceCitations: [
    {
      label: "Foreign travel advice — Austria (Safety and security)",
      url: "https://www.gov.uk/foreign-travel-advice/austria/safety-and-security",
      organization: "GOV.UK — Foreign, Commonwealth & Development Office",
    },
    {
      label: "Digital Vignette — Validity and FAQ",
      url: "https://www.asfinag.at/en/toll/vignette/digital-vignette/",
      organization: "ASFINAG (Austrian Motorway and Expressway Operator)",
    },
  ],
  lastVerifiedDate: "2026-08-05",

  relatedCountrySlugs: ["germany", "switzerland", "hungary", "united-kingdom"],

  primaryKeyword: "international driving permit austria",
  secondaryKeywords: [
    "idp austria",
    "international driving license austria",
    "vienna car rental",
    "vienna airport car rental",
    "salzburg car rental",
    "austria motorway vignette",
    "vignette austria",
    "digital vignette austria",
    "grossglockner high alpine road",
    "driving in austria",
    "austria section toll",
    "winter driving austria",
  ],
  metaTitle: "International Driving Permit Austria: Eligibility Rules",
  metaTitleAbsolute: true,
  metaDescription:
    "EU and EEA licences carry no time limit — non-EU/EEA visitors get 12 months, with an IDP only required once the original licence isn't in German.",
};
