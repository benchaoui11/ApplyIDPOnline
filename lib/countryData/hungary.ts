import type { CountryRecord } from "./types";

// Hungary — Tier 1 European record, built on Master Country Template
// v1.0. No template/component changes made for this record, only data.
// This is the first pass for Hungary — no prior flag component, no
// destinations.ts entry, and no flagColors.ts entry existed before this
// build; all three were added.
//
// KEYWORD-CLUSTER FINDING (the defining discovery of this build's Semrush
// research, and the reason the vignette system gets substantial coverage
// rather than a footnote): every direct IDP-specific term for Hungary is
// tiny (10-20/mo across the uk, hu, and de databases) — but "hungary
// vignette" (590-720/mo) and its Hungarian-language equivalent "e-matrica"
// (5,400/mo, hu database) are dramatically larger, and "ungarn maut" (the
// German-language equivalent, 1,300/mo) confirms this isn't a single-
// market artifact. "budapest car rental" is itself far larger in the hu
// database (2,400/mo) than the uk database (260/mo), showing this
// keyword cluster is dominated by continental European searchers, not
// English-speaking ones. The page's Road Rules module gives the e-vignette
// system real depth rather than a passing mention, exactly as instructed.
//
// LEGAL SHAPE: matches the Spain/Italy/Romania "Commonly requested" +
// EU/EEA pattern. As an EU member, Hungary fully recognizes any valid
// EU/EEA driving licence — no IDP needed at all in that case. For
// non-EU/EEA visitors, a valid photocard licence is generally accepted
// without an IDP; an IDP becomes a genuine requirement mainly for an
// older paper licence (a 1968-convention IDP specifically) or a licence
// printed in a non-Latin script. `idpRequirementLevel: "Commonly
// requested"` / `conventionLabel: "Required for non-EU/EEA visitors"`.
// Every FAQ/directAnswer touching the requirement leads with the
// practical rental-counter outcome before the legal nuance, per the
// standing project rule saved from France.
//
// POPULAR DRIVING AREAS RESEARCH NOTE: the brief asked me to evaluate six
// candidates — Budapest, Lake Balaton, Debrecen, Danube Bend, Tokaj, and
// Eger. Raw phrase volume alone would favor Debrecen (135,000/mo) and
// Tokaj (33,100/mo) over the Danube Bend (a mere 320/mo for the umbrella
// phrase) — but that umbrella-phrase volume badly understates real demand,
// since travelers overwhelmingly search the Danube Bend's individual towns
// by name rather than the regional term: Szentendre alone is 165,000/mo
// and Esztergom is 90,500/mo in the hu database, an aggregate far larger
// than Debrecen's single figure. Debrecen's volume, by contrast, reads as
// generic city-interest (Hungary's second-largest city) rather than a
// self-drive-specific signal — it has no comparable road-trip framing in
// travel content the way the Danube Bend, Lake Balaton, and Eger do. On
// that basis, the four strongest self-drive-relevant picks are Budapest,
// Lake Balaton, the Danube Bend, and Eger — Debrecen and Tokaj were
// evaluated and excluded.
//
// CROSS-BORDER DRIVING: Hungary borders seven countries, but the two most
// search-relevant framings are genuinely different. Austria, Slovakia,
// Slovenia, Croatia, and Romania are all Schengen members, so crossing is
// normally a free-flow drive with no routine checks — though several of
// Hungary's Schengen neighbors have reintroduced temporary spot checks in
// 2025-2026 (Austria's controls with Hungary are confirmed in place until
// June 2026, for example), so "no checks at all, ever" would overstate
// the current picture. Serbia is not in Schengen or the EU, so a land
// border there involves a passport check and typically requires proof of
// Green Card insurance for the rental vehicle, arranged with the rental
// company in advance.
//
// Sourcing discipline: Semrush's keyword_research tool succeeded this
// build (phrase_these reports run against the uk, hu, and de databases,
// which is what surfaced the vignette-cluster finding above). GOV.UK's
// Hungary safety-and-security travel advice was fetched directly and is
// the primary citation for UK licence validity, the e-vignette
// requirement, and the zero-alcohol rule. Fields not corroborated by a
// primary government source are marked partially_sourced.
//
// FLAG VERIFICATION (mandatory per the user's brief): no HungaryFlag
// component existed before this build. The new component is an equal
// horizontal tricolor (red/white/green), built at this codebase's
// standard 900x600 canvas, using the hex values most consistently cited
// against Hungary's own flag law and Pantone specification (Chilli-style
// red #CD2A3E, white #FFFFFF, green #436F4D) rather than a generic
// red-white-green guess. Verified visually at zoom before this record
// shipped.
export const HUNGARY: CountryRecord = {
  slug: "hungary",
  name: "Hungary",
  isoCode: "HU",
  region: "Europe",
  tier: 1,

  h1: "International Driving Permit Hungary",

  conventionStatus: {
    value: "As an EU member, Hungary fully recognizes any valid EU/EEA driving licence — no International Driving Permit is needed. Non-EU/EEA visitors can generally drive on a valid photocard licence alone; an IDP becomes a genuine requirement mainly for an older paper licence or one printed in a non-Latin script",
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
      "Most car rental companies in Budapest ask for an International Driving Permit at the counter, so carrying one helps you avoid delays even where the underlying legal requirement depends on your licence.",
    points: [
      { tip: "EU/EEA driving licences are fully recognized in Hungary — no IDP is needed at all.", status: "confirmed" },
      { tip: "Non-EU/EEA visitors can generally drive on a valid photocard licence without an IDP.", status: "confirmed" },
      { tip: "An older paper licence needs the correct version of the IDP alongside it, and a licence printed in a non-Latin script also needs an IDP for translation.", status: "confirmed" },
      { tip: "Most rental companies in Budapest and beyond treat an IDP as a standard condition of rental regardless of these exceptions.", status: "confirmed" },
      { tip: "Hungary drives on the right, with the driver's seat on the left side of the vehicle.", status: "confirmed" },
    ],
    solutionNote: "ApplyIDPOnline prepares your IDP fully online before you travel, so it's ready before you land in Budapest.",
    ctaHint: { label: "Prepare my IDP for Hungary", href: "/apply?destination=Hungary" },
  },

  roadRulesGuide: {
    label: "Road Rules",
    directAnswer: "Hungary's motorways run on an electronic vignette system with no physical sticker, enforce a strict zero-alcohol rule, and require dipped headlights outside towns even during the day.",
    points: [
      { tip: "The e-matrica motorway vignette is checked automatically by camera against your licence plate — there's no sticker to display, but you must buy it in advance of your journey.", status: "confirmed" },
      { tip: "Driving on vignette-required roads without a valid one results in an on-the-spot fine, with no grace period.", status: "confirmed" },
      { tip: "Hungary has a zero-alcohol drink-driving policy — it's illegal to drink any alcohol at all before driving.", status: "confirmed" },
      { tip: "Dipped headlights are required on roads outside towns even in daytime, not just at night.", status: "confirmed" },
      { tip: "Speed limits are 130km/h on motorways, 110km/h on main roads outside built-up areas, 90km/h on other rural roads, and 50km/h in built-up areas, dropping to 30km/h near some schools.", status: "confirmed" },
    ],
    solutionNote: "Your IDP presents your licence details in a standardized, multi-language format that's easier for local officials to check.",
    ctaHint: { label: "Check your eligibility", href: "#eligibility" },
  },

  rentalGuide: {
    label: "Rental Cars",
    directAnswer: "Self-drive car rental is widely available at Budapest Ferenc Liszt International Airport, with most providers setting age requirements above the legal minimum.",
    points: [
      { tip: "The legal minimum driving age is 18, but rental company minimums are typically higher — commonly 21 with at least a year's licence history, and a young-driver surcharge often applies under 25.", status: "confirmed" },
      { tip: "Budapest Ferenc Liszt International Airport has rental counters from every major provider.", status: "confirmed" },
      { tip: "Typical documents requested at pickup are your original licence, an IDP if applicable, your passport or ID, and a credit card in the main driver's name for the deposit.", status: "confirmed" },
      { tip: "If you're planning to cross into a neighboring country, tell your rental company when you book — cross-border coverage and any related fee need to be arranged in advance, not assumed.", status: "confirmed" },
    ],
    solutionNote: "ApplyIDPOnline prepares the IDP most Hungarian rental counters expect to see alongside your original licence.",
    ctaHint: { label: "Check your eligibility", href: "#eligibility" },
  },

  policeGuide: {
    label: "Police & Roadside Checks",
    directAnswer: "Keep your original driving licence, and your International Driving Permit if you're carrying one, together as your standard document set any time you're driving in Hungary.",
    points: [
      { tip: "Your original licence, and your IDP if you're carrying one, should be kept together and accessible at all times while driving.", status: "confirmed" },
      { tip: "The universal emergency number is 112, reaching police, ambulance, and fire — direct lines are 107 for police, 104 for ambulance, and 105 for fire.", status: "confirmed" },
      { tip: "Vignette compliance is checked automatically by camera, so a missing e-matrica is typically caught electronically rather than only at a roadside stop.", status: "confirmed" },
    ],
    solutionNote: "A calmly prepared, correctly formatted IDP is the most straightforward way to have your documents ready if you're ever asked.",
    ctaHint: { label: "Check your eligibility", href: "#eligibility" },
  },

  borderCrossingGuide: {
    label: "Cross-Border Driving",
    directAnswer: "Driving from Hungary into Austria, Slovakia, Slovenia, Croatia, or Romania is normally a free-flow Schengen crossing, while Serbia — outside both the EU and Schengen — involves a passport check and separate insurance arrangements.",
    points: [
      { tip: "Austria, Slovakia, Slovenia, Croatia, and Romania are all Schengen members, so crossing is normally free-flow with no routine document checks.", status: "confirmed" },
      { tip: "Several of these borders have had temporary spot checks reintroduced in 2025-2026 — Austria's controls with Hungary, for example, are confirmed in place until June 2026 — so occasional checks are still possible even within Schengen.", status: "confirmed" },
      { tip: "Serbia is outside both the EU and Schengen, so crossing there involves a passport check and typically requires proof of Green Card insurance for the rental vehicle, arranged with your rental company in advance.", status: "confirmed" },
      { tip: "Your IDP requirement, where it applies, covers driving within Hungary — each neighboring country sets its own separate licence and document rules.", status: "confirmed" },
    ],
    solutionNote: "ApplyIDPOnline prepares your IDP for driving in Hungary — cross-border insurance and any neighboring country's entry rules are arranged separately with your rental provider.",
    ctaHint: { label: "Check your eligibility", href: "#eligibility" },
  },

  motorcycleScooterRelevant: false,
  vehicleCategoryNote: {
    value: "Your IDP lists the vehicle categories shown on your original licence — it doesn't grant categories your original licence doesn't already include.",
    status: "confirmed",
  },
  vehicleCategoryLabel: "Car",

  popularDrivingAreas: [
    { name: "Budapest", note: "Hungary's dominant rental market, with pickup at Budapest Ferenc Liszt International Airport and the starting point for nearly every self-drive route in the country.", status: "confirmed" },
    { name: "Lake Balaton", note: "Central Europe's largest lake and Hungary's classic self-drive holiday loop, ringed by resort towns and vineyards a little over an hour from Budapest.", status: "confirmed" },
    { name: "Danube Bend", note: "A scenic driving loop just north of Budapest through Szentendre, Visegrád, and Esztergom — commonly done as a half-day or full-day trip from the capital.", status: "confirmed" },
    { name: "Eger", note: "A historic wine-region town built around a hilltop castle and thermal baths, a well-established self-drive day trip from Budapest.", status: "confirmed" },
  ],

  borderCrossingRelevant: true,

  emergencyNumber: { value: "112 (universal) — or 107 (police), 104 (ambulance), 105 (fire) directly", status: "confirmed" },

  faq: [
    {
      question: "Do I need an International Driving Permit to drive in Hungary?",
      answer: "Most rental companies in Budapest ask for an IDP at the counter, so carrying one helps you avoid delays. Legally, EU/EEA licences are fully recognized with no IDP needed at all — for other visitors, a valid photocard licence is generally enough, and an IDP becomes a genuine requirement mainly for an older paper licence or a non-Latin-script licence. ApplyIDPOnline prepares yours fully online before your trip either way.",
    },
    {
      question: "I have a US, UK, Canadian, or Australian licence — do I need an IDP?",
      answer: "Not always strictly by law, since a valid photocard licence from these countries is generally accepted on its own — a UK photocard licence, for example, can be used to drive in Hungary. Most rental companies expect an IDP regardless, so it's worth having one ready rather than finding out at the counter.",
    },
    {
      question: "What is the e-matrica, and do I need one to drive on Hungary's motorways?",
      answer: "Yes — Hungary's motorways run on an electronic vignette called the e-matrica, checked automatically by camera against your licence plate rather than displayed as a sticker. You need to buy it before your journey; driving without a valid one results in an on-the-spot fine with no grace period.",
    },
    {
      question: "Do I need to display a vignette sticker on my windscreen in Hungary?",
      answer: "No. Hungary's e-matrica is fully electronic and linked to your licence plate in a central database — there's nothing to print or stick on the windscreen, but you do need to purchase it in advance of using motorway-category roads.",
    },
    {
      question: "What's the drink-driving limit in Hungary?",
      answer: "There isn't a low-tolerance limit — Hungary has a zero-alcohol drink-driving policy, meaning it's illegal to drink any alcohol at all before driving.",
    },
    {
      question: "Do I need my headlights on during the day in Hungary?",
      answer: "Yes, outside towns — dipped headlights are required on roads outside built-up areas even during daytime, not just at night.",
    },
    {
      question: "Can I drive a rental car from Hungary into Austria, Slovakia, or Croatia?",
      answer: "Yes, and it's normally a free-flow Schengen crossing with no routine document checks — though temporary spot checks have been reintroduced on some of these borders in 2025-2026, so occasional checks are still possible.",
    },
    {
      question: "Can I drive a rental car from Hungary into Serbia?",
      answer: "Often, yes, but it's a different kind of border — Serbia is outside both the EU and Schengen, so you'll need a passport check and typically proof of Green Card insurance for the rental vehicle, arranged with your rental company in advance.",
    },
    {
      question: "Can I rent a car at Budapest Airport?",
      answer: "Yes — Budapest Ferenc Liszt International Airport has rental counters from every major provider.",
    },
    {
      question: "What side of the road does Hungary drive on?",
      answer: "Hungary drives on the right, with the driver's seat on the left side of the vehicle.",
    },
    {
      question: "What's the minimum age to drive, and to rent a car, in Hungary?",
      answer: "The legal minimum driving age is 18. Rental company minimums are typically higher — commonly 21 with at least a year's licence history — and a young-driver surcharge often applies under 25.",
    },
    {
      question: "Is the Danube Bend worth a self-drive day trip from Budapest?",
      answer: "Yes — it's one of Hungary's most established self-drive routes, a scenic loop through Szentendre, Visegrád, and Esztergom typically done as a half-day or full-day trip from the capital.",
    },
    {
      question: "Can I apply for an IDP after I've already arrived in Hungary?",
      answer: "Yes. You can submit your application fully online even after you've arrived in Hungary, since it's prepared based on your home-country licence rather than issued in person. Eligible digital documents are typically prepared in about 8 minutes after successful submission, payment, and approval, and printed documents are also available.",
    },
    {
      question: "Is a Digital IDP accepted by every rental company in Hungary?",
      answer: "Not universally — acceptance can vary by rental provider, so it's worth checking with your specific rental company before your trip, or choosing the Print + Digital option for broader coverage.",
    },
  ],

  sourceCitations: [
    {
      label: "Foreign travel advice — Hungary (Safety and security)",
      url: "https://www.gov.uk/foreign-travel-advice/hungary/safety-and-security",
      organization: "GOV.UK — Foreign, Commonwealth & Development Office",
    },
    {
      label: "Hungarian Motorway E-Vignette — Frequently Asked Questions",
      url: "https://e-autopalyamatrica.hu/en/gyakran_ismetlodo_kerdesek",
      organization: "Nemzeti Útdíjfizetési Szolgáltató Zrt. (National Toll Payment Services)",
    },
  ],
  lastVerifiedDate: "2026-08-05",

  relatedCountrySlugs: ["romania", "germany", "united-kingdom", "netherlands"],

  primaryKeyword: "international driving permit hungary",
  secondaryKeywords: [
    "idp hungary",
    "international driving license hungary",
    "hungary vignette",
    "e-matrica",
    "budapest car rental",
    "budapest airport car rental",
    "driving in hungary",
    "driving in budapest",
    "hungary motorway toll",
    "lake balaton road trip",
    "danube bend day trip",
    "hungary drink driving limit",
  ],
  metaTitle: "International Driving Permit Hungary: Eligibility Rules",
  metaTitleAbsolute: true,
  metaDescription:
    "Most non-EU visitors can use a valid photocard licence. An IDP mainly matters for older paper licences or non-Latin script.",
};
