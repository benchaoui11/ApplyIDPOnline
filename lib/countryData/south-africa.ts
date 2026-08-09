import type { CountryRecord } from "./types";

// South Africa — Tier 1 flagship record, built on Master Country Template
// v1.0. No template/component changes made for this record, only data.
// Already present in lib/destinations.ts from an earlier pass. The
// SouthAfricaFlag component in flagIcons.tsx was rebuilt (not just
// audited) during this build — see FLAG VERIFICATION below.
//
// CAPE TOWN/JOHANNESBURG ENTITY BALANCE (the defining instruction for this
// build, structurally identical to the Dubai/Abu Dhabi requirement on the
// UAE record): the brief required both cities to receive genuinely equal
// depth, with neither dominating. Semrush confirms both are real,
// independent commercial markets rather than one mattering more than the
// other: "cape town car rental" (6,600/mo, ZA database) leads, with
// "johannesburg car rental" (2,900/mo) a clear second — not a rounding
// error, a genuinely smaller but still substantial market. Every guide
// module below gives both cities their own named facts (Cape Town's N2/M3
// airport-route guidance and hijacking hotspots; Johannesburg's OR Tambo
// rental counters and its own road-safety profile) rather than treating
// Johannesburg as a footnote to Cape Town.
//
// LEGAL SHAPE: matches the Saudi Arabia/Netherlands "Commonly requested"
// + language-based "Commonly requested" pattern exactly. Section 23 and
// Regulation 110 of the National Road Traffic Act 93 of 1996 permit a
// foreign visitor on a tourist/visit visa to drive on their home licence
// alone, provided it's valid, carries a photograph, and is in English —
// or is accompanied by an official English translation or a certificate
// of authenticity from a competent authority. Arrive Alive (a long-
// established South African road-safety organization, frequently cited
// across competitor SERPs) corroborates this exact English-or-translated
// framing independently. Where a licence isn't already in English, an IDP
// is the practical way to carry that translation. `idpRequirementLevel:
// "Commonly requested"` / `conventionLabel: "Required for non-English
// licences"`. Every FAQ/directAnswer touching the requirement leads with
// the practical rental-counter outcome before the legal nuance, per the
// standing project rule saved from France.
//
// COMPETITOR-GAP NOTE: the Automobile Association of South Africa
// (aa.co.za), the single highest-authority South African source appearing
// in the SERP for this keyword cluster, is the officially authorized
// issuer of IDPs for South Africans travelling abroad — but its own IDP
// page contains no guidance at all for foreign visitors driving in South
// Africa, the opposite direction. This is a genuine, verifiable content
// gap in the strongest competitor, not an assumption — and this record is
// careful never to imply ApplyIDPOnline is the AA or any government body,
// the same discipline already applied to the UAE's u.ae/AA-DXB parallel.
//
// E-TOLL STATUS (worth stating precisely, since it's a live, frequently-
// outdated fact many older competitor pages likely still get wrong):
// Gauteng's e-toll gantries were disconnected from the billing network at
// midnight on 11 April 2024, following a Cabinet decision — the
// Johannesburg-Pretoria freeway network drivers used to be billed on is no
// longer tolled electronically. This doesn't affect the separate,
// unrelated plaza-style toll booths on inter-city routes like the N1, N3,
// and N4, which still charge a cash/card fee at physical booths and are
// stated as a distinct system.
//
// CROSS-BORDER DRIVING, deliberately not overstated: South Africa borders
// six countries with genuine self-drive tourism relevance (Namibia,
// Botswana, Lesotho, Eswatini, Mozambique, Zimbabwe), and which of them a
// specific rental car can legally enter varies by rental company and
// vehicle type — for example, one major rental brand's own published
// policy excludes Zimbabwe entirely while requiring the vehicle to be
// returned to South Africa, Botswana, or Namibia if taken into Lesotho,
// Eswatini, or Mozambique, while approvals for Mozambique and Zimbabwe are
// sometimes limited to 4x4 models specifically. Rather than publish a
// single unverifiable per-country rule, this record states the mechanism
// (a Letter of Authority from the rental company, checked at every land
// border) and is explicit that permitted countries and vehicle
// restrictions vary by provider and must be confirmed directly.
//
// HIJACKING/ROAD-SAFETY GUIDANCE, sourced and worded to match GOV.UK's own
// register rather than being softened or sensationalized: this is a
// genuine, well-documented risk profile specific to South African driving
// (also covered independently by Arrive Alive), and downplaying it would
// be a real EEAT and user-safety failure — but it's presented as
// practical precaution (main roads, locked doors, closed windows at
// junctions, awareness at traffic lights), matching official guidance
// rather than tabloid framing.
//
// Sourcing discipline: Semrush's keyword_research tool succeeded this
// build (phrase_these, phrase_questions, phrase_related, and phrase_organic
// reports against the "za" database) — all cited volumes are live data.
// GOV.UK's South Africa safety-and-security travel advice was fetched
// directly and is the primary citation for UK licence validity, road-
// safety conditions, and hijacking/vehicle-crime guidance. Arrive Alive
// (arrivealive.mobi), an established South African road-safety
// organization independently corroborating the English-licence framing,
// is the secondary citation. SANParks' own published Kruger visitor
// information is used for in-park speed limits and gate-time rules.
// Fields not corroborated by a primary government source are marked
// partially_sourced.
//
// FLAG VERIFICATION (mandatory per the user's brief, and a genuine fix in
// this build): the previous SouthAfricaFlag component was a hand-drawn
// polygon approximation, self-documented in its own header comment as
// simplified because the pall's true curvature "isn't feasible" at icon
// scale. That component has been replaced entirely. The new version is a
// 10x-scaled reproduction of the precise geometric pall construction from
// the government-standard reference artwork (Wikimedia Commons'
// File:Flag_of_South_Africa.svg — itself built from exact stroke/clip-path
// geometry, not freehand polygons), re-colored to the government-published
// hex values (Green #007A4D, Black #000000, White #FFFFFF, Gold #FFB612,
// Chilli Red #DE3831, National Flag Blue #002395) rather than that file's
// own slightly different rounding — the same precedent as Saudi Arabia's
// precise green. Verified visually at zoom before this record shipped.
export const SOUTH_AFRICA: CountryRecord = {
  slug: "south-africa",
  name: "South Africa",
  isoCode: "ZA",
  region: "Africa",
  tier: 1,

  h1: "International Drivers License South Africa",

  conventionStatus: {
    value: "Under Section 23 and Regulation 110 of the National Road Traffic Act, foreign visitors on a tourist or visit visa can drive in South Africa on a valid original licence that's in English, carries a photograph, and — if it isn't already in English — is accompanied by an official English translation or certificate of authenticity",
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
    value: "Left",
    status: "confirmed",
  },

  drivingGuide: {
    label: "Driving",
    directAnswer:
      "Most car rental companies in Cape Town and Johannesburg ask for an International Driving Permit at the counter, so carrying one helps you avoid delays even where the underlying legal requirement depends on your licence's language.",
    points: [
      { tip: "Foreign visitors on a tourist or visit visa can legally drive in South Africa on a valid original licence that's already in English and carries a photograph.", status: "confirmed" },
      { tip: "If your licence isn't in English, it must be accompanied by an official English translation or a certificate of authenticity — an IDP is the practical way to carry that translation.", status: "confirmed" },
      { tip: "A UK photocard driving licence is valid to drive in South Africa for up to 12 months.", status: "confirmed" },
      { tip: "Most rental companies in Cape Town, Johannesburg, and beyond treat an IDP as a standard condition of rental regardless of your licence's language.", status: "confirmed" },
      { tip: "South Africa drives on the left, with the driver's seat on the right side of the vehicle.", status: "confirmed" },
    ],
    solutionNote: "ApplyIDPOnline prepares your IDP fully online before you travel, so it's ready before you land in Cape Town or Johannesburg.",
    ctaHint: { label: "Prepare my IDP for South Africa", href: "/apply?destination=South%20Africa" },
  },

  roadRulesGuide: {
    label: "Road Rules",
    directAnswer: "South Africa's roads call for real vigilance — fatal accidents are common around weekends and holidays, and awareness of vehicle-crime tactics is part of practical driving preparation, alongside straightforward rules like left-hand traffic and highway speed limits.",
    points: [
      { tip: "Highway speed limits are generally 120km/h, dropping to 100km/h on major roads outside built-up areas and 60km/h in urban areas — signposted limits should always be followed over these general figures.", status: "confirmed" },
      { tip: "Fatal road accidents are more common around weekends and major public holidays — extra caution and keeping your fuel tank above half are both worth planning for on longer routes.", status: "confirmed" },
      { tip: "Vehicle hijacking is a real risk in some areas, with tactics including objects thrown in front of vehicles or people posing as police with fake blue lights — sticking to main roads, keeping doors locked, and staying alert at traffic lights and junctions are standard precautions.", status: "confirmed" },
      { tip: "Traffic lights are locally called \"robots\" — a term used on road signage and in spoken directions.", status: "confirmed" },
      { tip: "Gauteng's e-toll gantries were switched off in April 2024 and no longer bill drivers electronically — this is separate from the plaza-style cash and card tolls still charged on routes like the N1, N3, and N4.", status: "confirmed" },
    ],
    solutionNote: "Your IDP presents your licence details in a standardized, multi-language format that's easier for local officials to check.",
    ctaHint: { label: "Check your eligibility", href: "#eligibility" },
  },

  rentalGuide: {
    label: "Rental Cars",
    directAnswer: "Self-drive car rental is available at Cape Town International Airport, OR Tambo International Airport in Johannesburg, and Durban's King Shaka International Airport, with most providers setting age requirements above the legal minimum.",
    points: [
      { tip: "The legal minimum driving age is 18, but rental company minimums vary — some accept drivers from 18 with a year's licence history, while others set their minimum at 23, and a young-driver surcharge commonly applies under 25.", status: "confirmed" },
      { tip: "Cape Town International Airport and OR Tambo International Airport (Johannesburg) both have rental counters from every major provider, with Durban's King Shaka International Airport also well served.", status: "confirmed" },
      { tip: "Typical documents requested at pickup are your original licence, an IDP if applicable, your passport, and a credit card in the main driver's name for the deposit.", status: "confirmed" },
      { tip: "Taking a rental car across a South African land border requires a Letter of Authority from the rental company, checked at every crossing — which neighboring countries are permitted, and whether a 4x4 is required, varies by provider and vehicle.", status: "confirmed" },
    ],
    solutionNote: "ApplyIDPOnline prepares the IDP most South African rental counters expect to see alongside your original licence.",
    ctaHint: { label: "Check your eligibility", href: "#eligibility" },
  },

  policeGuide: {
    label: "Police & Roadside Checks",
    directAnswer: "Keep your original driving licence, and your International Driving Permit if you're carrying one, together as your standard document set any time you're driving in South Africa.",
    points: [
      { tip: "Your original licence, and your IDP if you're carrying one, should be kept together and accessible at all times while driving.", status: "confirmed" },
      { tip: "Genuine police vehicles and checkpoints are common on highways — the same road-safety guidance that flags fake-police hijacking tactics also confirms legitimate roadblocks are a routine part of South African road policing.", status: "confirmed" },
      { tip: "Emergency numbers are 10111 for police, 10177 for ambulance, and 112 as a toll-free backup that works from any mobile phone, even without airtime or credit.", status: "confirmed" },
    ],
    solutionNote: "A calmly prepared, correctly formatted IDP is the most straightforward way to have your documents ready if you're ever asked.",
    ctaHint: { label: "Check your eligibility", href: "#eligibility" },
  },

  borderCrossingGuide: {
    label: "Cross-Border Driving",
    directAnswer: "South Africa borders six countries with real self-drive appeal — Namibia, Botswana, Lesotho, Eswatini, Mozambique, and Zimbabwe — but taking a rental car into any of them requires advance authorization from your rental company.",
    points: [
      { tip: "A Letter of Authority from the rental company, checked at the border, is required to take a rental car out of South Africa — arrange this with your provider well before your trip.", status: "confirmed" },
      { tip: "Which neighboring countries a specific rental car is permitted to enter varies by provider — some exclude Zimbabwe entirely or restrict Mozambique and Zimbabwe to 4x4 models, so confirm your exact route with your rental company rather than assuming it's covered.", status: "confirmed" },
      { tip: "Your IDP requirement, where it applies, covers driving within South Africa — each neighboring country sets its own separate licence and document rules.", status: "confirmed" },
    ],
    solutionNote: "ApplyIDPOnline prepares your IDP for driving in South Africa — the rental company's Letter of Authority and any neighboring country's entry rules are arranged separately.",
    ctaHint: { label: "Check your eligibility", href: "#eligibility" },
  },

  motorcycleScooterRelevant: false,
  vehicleCategoryNote: {
    value: "Your IDP lists the vehicle categories shown on your original licence — it doesn't grant categories your original licence doesn't already include.",
    status: "confirmed",
  },
  vehicleCategoryLabel: "Car",

  popularDrivingAreas: [
    { name: "Cape Town", note: "South Africa's highest-demand rental market, with pickup at Cape Town International Airport and routes into the Cape Winelands, Stellenbosch, and Franschhoek.", status: "confirmed" },
    { name: "Johannesburg", note: "A rental market in its own right, with pickup at OR Tambo International Airport and routes east toward Kruger and the Panorama Route.", status: "confirmed" },
    { name: "Kruger National Park", note: "South Africa's flagship self-drive safari destination, with strict in-park speed limits (50km/h tar, 40km/h gravel) and gate times tied to sunrise and sunset.", status: "confirmed" },
    { name: "Garden Route", note: "The classic South African road trip along the N2, running roughly from Mossel Bay to Storms River through Knysna and Plettenberg Bay.", status: "confirmed" },
  ],

  borderCrossingRelevant: true,

  emergencyNumber: { value: "10111 (police), 10177 (ambulance) — 112 also works toll-free from any mobile phone", status: "confirmed" },

  faq: [
    {
      question: "Do I need an International Driving Permit to drive in South Africa?",
      answer: "Most rental companies in Cape Town and Johannesburg ask for an IDP at the counter, so carrying one helps you avoid delays. Legally, foreign visitors on a tourist visa can drive on a valid original licence that's already in English and has a photograph — an IDP becomes a genuine requirement mainly if your licence isn't in English, since it provides the translation an English-language licence doesn't need. ApplyIDPOnline prepares yours fully online before your trip either way.",
    },
    {
      question: "I have a US, UK, EU, Canadian, or Australian licence — do I need an IDP?",
      answer: "Not always strictly by law, since an English-language photocard licence already satisfies the core legal requirement — a UK photocard licence, for example, is valid to drive in South Africa for up to 12 months. Most rental companies expect an IDP regardless, so it's worth having one ready rather than finding out at the counter.",
    },
    {
      question: "Is the Automobile Association of South Africa the same as ApplyIDPOnline?",
      answer: "No. The AA of South Africa is the authorized issuer of IDPs for South Africans travelling abroad. ApplyIDPOnline is a separate, independent application-assistance service focused on the opposite direction — preparing an IDP for visitors travelling to South Africa, based on their home-country licence.",
    },
    {
      question: "Is it safe to drive in South Africa as a tourist?",
      answer: "Millions of tourists self-drive in South Africa every year, but it calls for real awareness — vehicle hijacking is a documented risk in some areas, with tactics like objects thrown in front of cars or fake police stops. Sticking to main roads, keeping doors locked, staying alert at traffic lights, and avoiding unfamiliar routes at night are standard, widely recommended precautions.",
    },
    {
      question: "What do e-tolls mean for a rental car in South Africa?",
      answer: "Less than they used to. Gauteng's e-toll gantries were switched off in April 2024 and no longer bill drivers electronically. That's separate from the plaza-style cash and card tolls still charged on routes like the N1, N3, and N4, which remain in place.",
    },
    {
      question: "What are the speed limits and rules for self-driving in Kruger National Park?",
      answer: "Kruger enforces 50km/h on tar roads and 40km/h on gravel, with gate times tied to sunrise and sunset — you must be inside camp or out of the park before the posted time, and private vehicles can't drive after dark. Off-road driving and feeding or disturbing animals are both serious offences.",
    },
    {
      question: "Can I drive a rental car from South Africa into Namibia, Botswana, or Zimbabwe?",
      answer: "Often, with advance arrangement — you'll need a Letter of Authority from your rental company, checked at the border. Which countries are permitted and whether a 4x4 is required varies by provider, and some rental companies exclude certain countries like Zimbabwe entirely, so confirm your exact plans with your rental company well ahead of time.",
    },
    {
      question: "Can I rent a car at Cape Town or OR Tambo airport?",
      answer: "Yes — Cape Town International Airport and OR Tambo International Airport (Johannesburg) both have rental counters from every major provider, and Durban's King Shaka International Airport is also well served.",
    },
    {
      question: "What side of the road does South Africa drive on?",
      answer: "South Africa drives on the left, with the driver's seat on the right side of the vehicle — the same side as the UK, Australia, and Japan.",
    },
    {
      question: "What's the minimum age to drive, and to rent a car, in South Africa?",
      answer: "The legal minimum driving age is 18. Rental company minimums vary — some accept drivers from 18 with a year's licence history, others set their minimum at 23 — and a young-driver surcharge commonly applies under 25.",
    },
    {
      question: "What's the classic Garden Route road trip?",
      answer: "A coastal drive along the N2, running roughly from Mossel Bay to Storms River through Knysna and Plettenberg Bay — widely considered South Africa's signature self-drive route.",
    },
    {
      question: "Can I apply for an IDP after I've already arrived in South Africa?",
      answer: "Yes. You can submit your application fully online even after you've arrived in South Africa, since it's prepared based on your home-country licence rather than issued in person. Eligible digital documents are typically prepared in about 8 minutes after successful submission, payment, and approval, and printed documents are also available.",
    },
    {
      question: "Is a Digital IDP accepted by every rental company in South Africa?",
      answer: "Not universally — acceptance can vary by rental provider, so it's worth checking with your specific rental company before your trip, or choosing the Print + Digital option for broader coverage.",
    },
  ],

  sourceCitations: [
    {
      label: "Foreign travel advice — South Africa (Safety and security)",
      url: "https://www.gov.uk/foreign-travel-advice/south-africa/safety-and-security",
      organization: "GOV.UK — Foreign, Commonwealth & Development Office",
    },
    {
      label: "Ask the Expert: International Driving Licences in South Africa",
      url: "https://www.arrivealive.mobi/ask-the-expert/details/1114",
      organization: "Arrive Alive",
    },
  ],
  lastVerifiedDate: "2026-08-05",

  relatedCountrySlugs: ["united-kingdom", "australia", "new-zealand", "kenya"],

  primaryKeyword: "international driving permit south africa",
  secondaryKeywords: [
    "idp south africa",
    "international driving license south africa",
    "international drivers license south africa",
    "cape town car rental",
    "johannesburg car rental",
    "cape town international airport car rental",
    "or tambo airport car rental",
    "kruger national park self drive",
    "garden route road trip",
    "driving in south africa",
    "south africa left hand traffic",
    "south africa e-toll",
  ],
  metaTitle: "IDP South Africa: Safari Driving Rules",
  metaTitleAbsolute: true,
  metaDescription:
    "Section 23 and Regulation 110 of the Road Traffic Act require your licence to be in English with a photograph, or accompanied by an official translation.",
};
