import type { CountryRecord } from "./types";

// Vietnam — Tier 1 record, built on Master Country Template v1.0. No
// template/component changes made for this record, only data.
//
// CRITICAL DIFFERENCE FROM THAILAND / SINGAPORE / MALAYSIA: those three
// countries all recognize both the 1949 Geneva Convention and the 1968
// Vienna Convention, so "which IDP format is valid" was never a real
// question. Vietnam is genuinely different — it joined and recognizes ONLY
// the 1968 Vienna Convention. This means IDPs issued in countries that are
// Geneva-1949-only (confirmed, multiply-sourced: the United States, Canada,
// and Ireland) are NOT legally valid for driving in Vietnam, regardless of
// the traveler's original license. This is not a minor caveat — it
// materially changes who this page's service can help, and burying it
// would risk real financial/legal harm to a customer who can't actually
// use the document. It is stated plainly, early, and repeatedly enough to
// not be missed, consistent with "never claim universal acceptance."
//
// Sourcing discipline: commercial/aggregator sites (internationaldrivingpermit.org,
// e-ita.org, internationaldriversassociation.com, rentabikevn.com,
// tigitmotorbikes.com, and other Semrush-surfaced competitor/discovery
// pages) were used only to identify what to verify and where — none of
// their wording was carried into this record. The Vienna-1968-only fact and
// its effect on US/Canadian/Irish travelers is independently confirmed
// across four sources: the U.S. Embassy & Consulate in Vietnam (via search-
// verified content — direct fetch returned unreadable data, but Google's
// own indexed snippet directly quotes the page), Vietnam Law Magazine, a
// Vietnam-based law firm (TLA Law), and Wikipedia's Vienna Convention
// contracting-parties listing. Where secondary sources disagreed (Australia,
// New Zealand, and Japan's Vienna Convention status was reported
// inconsistently across sources checked), this record deliberately does
// NOT assert a status for those countries — travelers from anywhere not
// explicitly named here are advised to confirm their own country's status,
// rather than being given a guess dressed up as a fact. Practical details
// (speed limits, seatbelt fines, A1/A2 motorbike categories, Hai Van
// Pass/Ha Giang Loop enforcement) are corroborated across multiple
// independent travel/motorbike-operator sources and marked
// "partially_sourced," not "confirmed," since no single primary government
// citation was found for them in this research pass.
//
// Real, verified competitor gap found during research: a Vietnamese law
// firm's own article had to explicitly warn that "IAA" (International
// Automobile Association) documents — sold online and marketed as
// international driving licenses — hold no legal value in Vietnam. This
// record includes a direct FAQ warning about this, which most generic
// IDP-sales competitor pages do not address.
export const VIETNAM: CountryRecord = {
  slug: "vietnam",
  name: "Vietnam",
  isoCode: "VN",
  region: "Asia",
  tier: 1,

  h1: "International Driving Permit Vietnam",

  conventionStatus: {
    value: "Vietnam recognises only IDPs issued under the 1968 Vienna Convention — IDPs from Geneva 1949-only countries, including the United States, Canada, and Ireland, are not valid for driving in Vietnam",
    status: "confirmed",
  },
  conventionLabel: "Vienna 1968 only",
  idpRequirementLevel: {
    value: "Legally required",
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
      "Foreign visitors from countries that are party to the 1968 Vienna Convention need an International Driving Permit alongside their valid original licence to drive in Vietnam.",
    points: [
      { tip: "Vietnam recognises only IDPs issued under the 1968 Vienna Convention, which it joined in 2014.", status: "confirmed" },
      { tip: "Countries that aren't Vienna Convention parties — including the United States, Canada, and Ireland — issue IDPs that aren't valid for driving in Vietnam, even paired with a valid home licence.", status: "confirmed" },
      { tip: "The United Kingdom, Germany, and France are among the countries whose IDPs are recognised in Vietnam.", status: "confirmed" },
      { tip: "If you're unsure whether your home country is a Vienna Convention member, it's worth confirming before you apply.", status: "confirmed" },
      { tip: "Vietnam drives on the right, with the driver's seat on the left side of the vehicle — the opposite of Thailand, Singapore, and Malaysia.", status: "confirmed" },
    ],
    solutionNote: "For travellers from Vienna Convention countries, ApplyIDPOnline prepares your IDP fully online before you travel, so it's ready before you land.",
    ctaHint: { label: "Check your eligibility for Vietnam", href: "#eligibility" },
  },

  roadRulesGuide: {
    label: "Road Rules",
    directAnswer: "Vietnam drives on the right with dense urban motorbike traffic, and the main adjustments for visiting drivers are speed limits, seatbelt rules, and heavier congestion in major cities.",
    points: [
      { tip: "Speed limits are typically 50 km/h in urban areas, 60 km/h on rural roads, and up to 80 km/h on expressways.", status: "partially_sourced" },
      { tip: "Seatbelts are mandatory for the driver and front-seat passenger, and for rear-seat passengers under Vietnam's road traffic law.", status: "partially_sourced" },
      { tip: "Motorbikes vastly outnumber cars in Vietnamese cities — expect dense, fast-moving traffic that doesn't always follow expected right-of-way patterns.", status: "confirmed" },
      { tip: "If you're involved in an accident, contact the police (113) and, for injuries, the ambulance service (115).", status: "confirmed" },
    ],
    solutionNote: "Your IDP presents your licence details in a standardized, multi-language format that's easier for local staff and officials to read.",
    ctaHint: { label: "Check your eligibility", href: "#eligibility" },
  },

  rentalGuide: {
    label: "Rental Cars",
    directAnswer: "Car rental companies in Vietnam generally ask for your IDP alongside your original licence, and confirming your specific eligibility matters more here than in most neighbouring countries.",
    points: [
      { tip: "The legal minimum age to drive a car in Vietnam is 18, and rental companies commonly expect drivers to be at least 21-23.", status: "partially_sourced" },
      { tip: "Typical documents requested at pickup: your IDP, original licence, passport, and a credit card for the security deposit.", status: "partially_sourced" },
      { tip: "Only IDPs issued under the 1968 Vienna Convention are accepted — confirm your eligibility before booking a rental.", status: "confirmed" },
      { tip: "Requirements vary by rental company — confirm specifics with your provider before arrival.", status: "confirmed" },
    ],
    solutionNote: "ApplyIDPOnline prepares the IDP most rental counters expect to see alongside your original licence, for travellers whose home country is eligible.",
    ctaHint: { label: "Check your eligibility", href: "#eligibility" },
  },

  scooterGuide: {
    label: "Scooters & Motorcycles",
    directAnswer: "The same Vienna Convention IDP requirement applies to motorbike and scooter rentals as to cars, and Vietnam's own licence categories are grouped by engine size.",
    points: [
      { tip: "Vietnam licenses motorcycles by engine size — mopeds under 50cc need only a standard licence from age 16, while 50cc and above requires an A1 (up to 125cc) or A2 (over 125cc) category and a minimum age of 18.", status: "partially_sourced" },
      { tip: "Your IDP only shows a motorcycle category if your original licence already includes one — it can't add a category you don't hold at home.", status: "confirmed" },
      { tip: "Helmets are mandatory for the rider and any pillion passenger.", status: "confirmed" },
      { tip: "Popular motorbike routes like the Hai Van Pass and Ha Giang Loop see regular police checks, and riding without valid documents can mean fines and the vehicle being impounded.", status: "partially_sourced" },
      { tip: "Driving or riding without a valid licence and IDP can affect your travel insurance coverage if you're in an accident.", status: "confirmed" },
    ],
    solutionNote: "Your IDP lists the vehicle categories from your original licence, including motorcycle categories where applicable.",
    ctaHint: { label: "Check your eligibility", href: "#eligibility" },
  },

  policeGuide: {
    label: "Police & Roadside Checks",
    directAnswer: "Keep your original driver's licence and your IDP together as your standard document set any time you're driving or riding in Vietnam.",
    points: [
      { tip: "Your IDP and original licence work as a pair — one is not a substitute for the other at a roadside check.", status: "confirmed" },
      { tip: "Keep both documents physically accessible (not just a photo on your phone) whenever you're driving or riding.", status: "confirmed" },
      { tip: "A passport or passport copy is also worth keeping with you, alongside your rental agreement if you're using a hired vehicle.", status: "partially_sourced" },
      { tip: "Only IDPs issued under the 1968 Vienna Convention are recognised — an IDP from a non-member country isn't valid documentation at a check, regardless of your original licence.", status: "confirmed" },
    ],
    solutionNote: "A calmly prepared, correctly formatted IDP is the most straightforward way to have both documents ready together, for eligible travellers.",
    ctaHint: { label: "Check your eligibility", href: "#eligibility" },
  },

  motorcycleScooterRelevant: true,
  vehicleCategoryNote: {
    value: "Your IDP lists the vehicle categories shown on your original licence (for example, motorcycle vs. car categories) — it doesn't grant categories your original licence doesn't already include.",
    status: "confirmed",
  },
  vehicleCategoryLabel: "Motorcycle & car",

  popularDrivingAreas: [
    { name: "Hanoi", note: "Vietnam's capital, with Noi Bai International Airport rental counters and dense Old Quarter traffic where many visitors prefer to walk or use ride-hailing over self-driving.", status: "confirmed" },
    { name: "Ho Chi Minh City", note: "Vietnam's largest city, with Tan Son Nhat International Airport rental counters and heavy motorbike traffic throughout.", status: "confirmed" },
    { name: "Da Nang", note: "A central coastal hub and the starting point for the Hai Van Pass, one of Vietnam's most popular scenic motorbike routes.", status: "confirmed" },
    { name: "Ha Long Bay", note: "A UNESCO World Heritage bay in northern Vietnam, popular as a self-drive or organised day trip from Hanoi.", status: "confirmed" },
  ],

  borderCrossingRelevant: false,

  emergencyNumber: { value: "113 (police) / 115 (ambulance)", status: "confirmed" },

  faq: [
    {
      question: "Do I need an International Driving Permit to drive in Vietnam?",
      answer: "Yes, if your home country is a party to the 1968 Vienna Convention. Vietnam only recognises Vienna Convention IDPs — if your country only issues 1949 Geneva Convention IDPs (including the United States, Canada, and Ireland), that IDP isn't valid for driving in Vietnam. ApplyIDPOnline helps eligible travellers prepare their Vienna Convention IDP online ahead of their trip.",
    },
    {
      question: "Can I use my International Driving Permit from the US, Canada, or Ireland in Vietnam?",
      answer: "Unfortunately, no — the US, Canada, and Ireland are not parties to the 1968 Vienna Convention, and Vietnam only recognises IDPs issued under that convention. This is a matter of international treaty law, not service quality — no provider can issue a Vietnam-valid IDP for a country that only supports the 1949 Geneva Convention format. If your home country is a Vienna Convention member, ApplyIDPOnline can still help — check your eligibility above to confirm your situation.",
    },
    {
      question: "What's the difference between a Vietnamese-issued IDP and the IDP I need as a visitor?",
      answer: "They serve different situations. Vietnam's Traffic Police can issue a Vietnamese IDP to holders of a Vietnamese licence or a licence from another Vienna Convention country, mainly for driving abroad — it isn't the standard route for a short-term foreign visitor. If you're visiting Vietnam and hold a licence from a Vienna Convention country, you need an IDP issued by an authorised body in your own home country — that's what this page and ApplyIDPOnline's service cover.",
    },
    {
      question: "Is the 'IAA' international driving licence valid in Vietnam?",
      answer: "No — the IAA (International Automobile Association) is not a government-linked or treaty-recognised issuing body, and its documents aren't legally valid in Vietnam despite sometimes being marketed as an international driving licence. Only IDPs issued under the 1968 Vienna Convention by an authorised body are recognised.",
    },
    {
      question: "Can I rent a car or motorbike in Vietnam with a foreign licence and IDP?",
      answer: "Yes, if your IDP is Vienna Convention-recognised. Most rental companies accept a foreign licence alongside a valid IDP, though many also set their own minimum age and licence-history requirements. Confirm specifics — including which IDP types they accept — with your rental provider.",
    },
    {
      question: "Do I need an IDP for a motorbike in Vietnam?",
      answer: "Yes, the same Vienna Convention requirement applies to motorbikes as to cars. Your IDP only shows a motorcycle category if your original licence already includes one, and Vietnam's own categories are split by engine size.",
    },
    {
      question: "What side of the road does Vietnam drive on?",
      answer: "Vietnam drives on the right, with the driver's seat on the left side of the vehicle — the opposite convention from Thailand, Singapore, and Malaysia, worth a moment's adjustment if you're region-hopping.",
    },
    {
      question: "What happens if I drive in Vietnam without a valid IDP?",
      answer: "You risk fines, possible vehicle impoundment, and — importantly — your travel insurance may not cover you in an accident if you weren't legally licensed to drive. This applies whether you have no IDP at all or one that Vietnam doesn't recognise, so it's worth confirming your eligibility before you travel rather than after.",
    },
    {
      question: "Can I apply for an IDP after I've already arrived in Vietnam?",
      answer: "Yes, if you're eligible. You can submit your application fully online even if you've already arrived in Vietnam, provided your home country is a Vienna Convention member. Eligible digital documents are typically prepared in about 8 minutes after successful submission, payment, and approval, and printed documents are also available. You'll still need to carry your original driving licence alongside your IDP.",
    },
    {
      question: "What documents should I carry while driving in Vietnam?",
      answer: "Your original driver's licence, your Vienna Convention IDP, and a passport or passport copy are the standard set — add your rental agreement if you're using a hired vehicle.",
    },
    {
      question: "Is a Digital IDP accepted by every rental company in Vietnam?",
      answer: "Not universally — some rental providers prefer a printed copy over a digital one. It's worth checking with your specific rental company before your trip, or choosing the Print + Digital option for broader coverage.",
    },
    {
      question: "How is the Digital IDP delivered?",
      answer: "By email as a downloadable document once your application is submitted, paid, and approved by our team.",
    },
    {
      question: "What's the difference between Digital and Print + Digital?",
      answer: "Digital IDP is an emailed document ready to show on your phone. Print + Digital adds a physical booklet shipped to you, with the digital copy included as well — useful if a provider prefers a printed document.",
    },
  ],

  sourceCitations: [
    {
      label: "Driving in Vietnam",
      url: "https://vn.usembassy.gov/driving-in-vietnam/",
      organization: "U.S. Embassy & Consulate in Vietnam",
    },
    {
      label: "How Can Foreigners Obtain International Driving Permits in Vietnam?",
      url: "https://vietnamlawmagazine.vn/how-can-foreigners-obtain-international-driving-permits-in-vietnam-75857.html",
      organization: "Vietnam Law Magazine",
    },
  ],
  lastVerifiedDate: "2026-08-01",

  relatedCountrySlugs: ["thailand", "singapore", "malaysia", "indonesia"],

  primaryKeyword: "international driving permit vietnam",
  secondaryKeywords: [
    "idp vietnam",
    "international driving license vietnam",
    "vietnam driving license for foreigners",
    "motorbike rental vietnam",
    "hai van pass motorbike",
    "driving in vietnam",
    "vietnam speed limit",
    "car rental vietnam",
    "vietnam vienna convention idp",
    "hanoi driving guide",
    "ho chi minh city driving guide",
    "international drivers license",
  ],
  metaTitle: "IDP Vietnam: Vienna Convention Driving Rules",
  metaTitleAbsolute: true,
  metaDescription:
    "Only Vienna Convention IDPs are valid here — permits issued under the Geneva-only format, including US and Canadian ones, will not be accepted at all.",
};
