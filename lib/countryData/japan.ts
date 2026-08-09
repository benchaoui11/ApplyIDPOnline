import type { CountryRecord } from "./types";

// Japan — Tier 1 record, built on Master Country Template v1.0. No
// template/component changes made for this record, only data.
//
// CONVENTION FINDING: Japan requires the 1949 Geneva Convention format
// specifically, and — unlike India, where this is mostly a "confirm the
// format" nuance — Japan explicitly does NOT recognize 1968 Vienna
// Convention IDPs at all. The Japan Automobile Federation (JAF), Japan's
// quasi-official motoring authority and the body most directly involved in
// IDP-related guidance for foreign drivers, states this directly: IDPs
// issued under "other treaties (such as the 1968 Vienna Convention) are
// not valid in Japan." Driving on a Vienna-format IDP in Japan is treated
// as driving without a licence — a criminal offense, not a technicality.
// This also resolves an uncertainty flagged in Vietnam's own record
// (Vietnam's file notes "Japan's Vienna Convention status was reported
// inconsistently across sources" at the time it was built) — Japan is now
// independently confirmed as 1949-Geneva-only for this record's purposes.
// Vietnam's frozen file is not modified to reflect this; this note exists
// only for future-record consistency.
//
// NAMED EXEMPTION (genuinely different in kind from Vietnam's exclusion):
// JAF's own page names six license-issuing jurisdictions — Switzerland,
// Germany, France, Belgium, Monaco, and Taiwan — whose license holders do
// NOT need an IDP at all to drive in Japan. Instead, they carry an official
// Japanese translation of their home license (issued by JAF or their
// embassy) alongside the original. This is not a "you can't drive" outcome
// the way Vietnam's exclusion is — it's an easier alternative path for six
// specific nationalities. Presented honestly in the FAQ rather than
// omitted, without discouraging IDP applications from every other
// nationality, for whom the standard IDP route is what applies.
//
// Sourcing discipline: Semrush API units were exhausted again at the start
// of this build (same as Philippines and India) — research proceeded via
// WebSearch/WebFetch. JAF's own English-language guidance page was
// directly fetched and is the primary source for the convention/exemption
// facts above. GOV.UK's Foreign Travel Advice for Japan was also directly
// fetched and independently confirms the 1949-format requirement. Fields
// corroborated only across multiple independent commercial/travel-guide
// sources (parking rules, ETC tolling mechanics, Hokkaido winter driving
// statistics, Fuji Subaru Line seasonal closure, ideal rental car size) are
// marked "partially_sourced," not "confirmed" — competitor pages state
// these with more confidence than this record does.
//
// Real, verified competitor gaps found during research: the leading
// aggregator page for "Japan IDP" (internationaldrivingpermit.org) covers
// only generic IDP mechanics — it has no destination-specific guidance, no
// ETC/toll coverage, no winter driving guidance, and does not name the
// six-country exemption at all despite it being a real, JAF-documented
// carve-out. Competitor pages checked also uniformly miss the Fuji Subaru
// Line's seasonal closure to private vehicles during peak climbing season
// (roughly July-September) and Japan's block-and-building address system
// (no street names outside a few planned grid areas), both included here
// as genuinely useful, non-obvious traveler information.
export const JAPAN: CountryRecord = {
  slug: "japan",
  name: "Japan",
  isoCode: "JP",
  region: "Asia",
  tier: 1,

  h1: "International Driving Permit Japan",

  conventionStatus: {
    value: "Foreign visitors need an International Driving Permit in the 1949 Geneva Convention format specifically — Japan does not recognize 1968 Vienna Convention IDPs at all, though six nationalities are exempt from the IDP requirement entirely",
    status: "confirmed",
  },
  conventionLabel: "Geneva 1949 format only",
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
    value: "Left",
    status: "confirmed",
  },

  drivingGuide: {
    label: "Driving",
    directAnswer:
      "Foreign visitors need an International Driving Permit alongside their valid original licence to drive in Japan, and it must be the 1949 Geneva Convention format specifically — Japan does not accept 1968 Vienna Convention IDPs.",
    points: [
      { tip: "You must carry both your original driving licence and your IDP together — one doesn't substitute for the other.", status: "confirmed" },
      { tip: "Japan only recognizes IDPs issued under the 1949 Geneva Convention — driving on a Vienna Convention IDP is treated as driving without a licence.", status: "confirmed" },
      { tip: "License holders from Switzerland, Germany, France, Belgium, Monaco, and Taiwan are exempt from the IDP requirement and instead carry an official Japanese translation of their licence — see the FAQ below.", status: "confirmed" },
      { tip: "Your IDP is valid for up to one year from the date you enter Japan, as long as the permit itself hasn't passed its own one-year expiry from issue.", status: "confirmed" },
      { tip: "Japan drives on the left, with the driver's seat on the right side of the vehicle.", status: "confirmed" },
    ],
    solutionNote: "ApplyIDPOnline prepares your IDP fully online before you travel, so it's ready before you land.",
    ctaHint: { label: "Prepare my IDP for Japan", href: "/apply?destination=Japan" },
  },

  roadRulesGuide: {
    label: "Road Rules",
    directAnswer: "Japan enforces strict, consistently applied traffic laws, with an effectively zero-tolerance culture around drink-driving and a nationwide ban on overnight street parking.",
    points: [
      { tip: "The legal drink-driving limit is 0.03% BAC, but it's strictly enforced as an effective zero-tolerance standard.", status: "confirmed" },
      { tip: "Expressway speed limits are typically around 100 km/h, with certain sections up to 120 km/h; urban roads are commonly 40-60 km/h.", status: "partially_sourced" },
      { tip: "Most rental cars include an ETC transponder for cashless expressway tolling — NEXCO also offers discounted multi-day expressway passes for foreign tourists in some regions.", status: "partially_sourced" },
      { tip: "Overnight street parking is effectively banned nationwide — use paid coin parking lots to avoid fines.", status: "partially_sourced" },
      { tip: "Roads outside major cities can be narrow, and addresses are organized by block and building number rather than street names, so GPS navigation with an English or romaji mode is genuinely important.", status: "partially_sourced" },
    ],
    solutionNote: "Your IDP presents your licence details in a standardized, multi-language format that's easier for local staff and officials to read.",
    ctaHint: { label: "Check your eligibility", href: "#eligibility" },
  },

  rentalGuide: {
    label: "Rental Cars",
    directAnswer: "Self-drive car rental is widely available across Japan, with counters at every major airport and city, though rental company age and licence-history requirements are typically stricter than the legal minimum.",
    points: [
      { tip: "The legal minimum age to drive in Japan is 18, but rental companies commonly require drivers to be at least 20-22, and to have held a licence for 1-2 years depending on the company.", status: "partially_sourced" },
      { tip: "Rental counters at Narita, Haneda, and Kansai airports generally ask for your rental voucher, your IDP (or Japanese translation, if your licence qualifies for the exemption), and your passport.", status: "partially_sourced" },
      { tip: "Most visitors rent a compact or kei (light) car, which suits Japan's narrow roads and tight parking spaces well.", status: "partially_sourced" },
      { tip: "Rental car navigation systems are usually available in English or romaji mode, but it's worth confirming this when you pick up the car.", status: "partially_sourced" },
      { tip: "Confirm your insurance coverage terms with your rental company — compulsory insurance alone may not cover full personal liability.", status: "partially_sourced" },
    ],
    solutionNote: "ApplyIDPOnline prepares the IDP most rental counters expect to see alongside your original licence.",
    ctaHint: { label: "Check your eligibility", href: "#eligibility" },
  },

  policeGuide: {
    label: "Police & Roadside Checks",
    directAnswer: "Keep your original driver's licence and your IDP together as your standard document set any time you're driving in Japan.",
    points: [
      { tip: "Your IDP and original licence work as a pair — one is not a substitute for the other at a roadside check.", status: "confirmed" },
      { tip: "Keep both documents physically accessible (not just a photo on your phone) whenever you're driving.", status: "confirmed" },
      { tip: "Police may also ask to see your passport to confirm how long you've been in Japan.", status: "partially_sourced" },
      { tip: "Given how strictly Japan enforces both licensing and drink-driving rules, having your documents complete and correctly formatted matters more here than in many other destinations.", status: "confirmed" },
    ],
    solutionNote: "A calmly prepared, correctly formatted IDP is the most straightforward way to have both documents ready together.",
    ctaHint: { label: "Check your eligibility", href: "#eligibility" },
  },

  motorcycleScooterRelevant: false,
  vehicleCategoryNote: {
    value: "Your IDP lists the vehicle categories shown on your original licence — it doesn't grant categories your original licence doesn't already include.",
    status: "confirmed",
  },
  vehicleCategoryLabel: "Car",

  popularDrivingAreas: [
    { name: "Hokkaido", note: "Popular for self-drive touring between Sapporo, Furano, and Biei, but winter driving is genuinely demanding — roads are often compacted ice rather than cleared, and rental cars are automatically fitted with snow tires from around November to April.", status: "partially_sourced" },
    { name: "Okinawa", note: "One of the most self-drive-friendly regions in Japan, since train coverage is limited mostly to Naha's monorail — a rental car is the practical way to see the wider islands.", status: "partially_sourced" },
    { name: "Mount Fuji & Hakone", note: "Scenic toll roads including the Fuji Subaru Line, which closes to private vehicles during the peak summer climbing season, with shuttle buses running instead.", status: "partially_sourced" },
    { name: "Kyoto & Nara", note: "Central Kyoto is dense, traffic-heavy, and difficult to park in — the train is usually the better choice within the city, with a car more useful for reaching Nara and areas outside the centre.", status: "partially_sourced" },
  ],

  borderCrossingRelevant: false,

  emergencyNumber: { value: "110 (police) / 119 (fire, ambulance)", status: "confirmed" },

  faq: [
    {
      question: "Do I need an International Driving Permit to drive in Japan?",
      answer: "Yes, for most nationalities. Foreign visitors need a valid original driving licence together with an International Driving Permit, specifically in the 1949 Geneva Convention format, before they can legally drive in Japan. ApplyIDPOnline helps you prepare that IDP online ahead of your trip, so it's ready before you land.",
    },
    {
      question: "Will any International Driving Permit work in Japan?",
      answer: "No — this is worth getting right. Japan only recognizes IDPs issued under the 1949 Geneva Convention. IDPs issued under the 1968 Vienna Convention are not valid, and driving on one is treated as driving without a licence. A standard IDP application is generally covered by the 1949 format by default, but it's worth confirming with your provider if you're ever unsure.",
    },
    {
      question: "Does every nationality need an IDP to drive in Japan?",
      answer: "Almost every nationality does, but there's a specific, genuine exception: license holders from Switzerland, Germany, France, Belgium, Monaco, and Taiwan don't need an IDP at all. Instead, they carry an official Japanese translation of their home licence, issued by JAF or their embassy, alongside the original. If you're not from one of these six places, the standard IDP route is what applies to you.",
    },
    {
      question: "How long is my IDP valid once I'm in Japan?",
      answer: "You can drive on your IDP for up to one year from the date you enter Japan, as long as the permit itself — valid for one year from its issue date — hasn't already expired. If you leave and re-enter Japan, this period can reset from your re-entry date.",
    },
    {
      question: "Can I rent a car at Narita, Haneda, or Kansai airport?",
      answer: "Yes. All three major airports have rental car counters, usually reachable by a short shuttle bus from the arrivals area. You'll typically need your rental voucher, your IDP (or Japanese translation, if you qualify for the exemption), and your passport.",
    },
    {
      question: "Do I need ETC to drive on Japan's expressways?",
      answer: "You don't strictly need it, but it makes a real difference — expressways are almost entirely toll roads, and an ETC transponder (usually already fitted in rental cars) lets you pass through toll gates without stopping to pay cash. Ask your rental company to confirm the car has one.",
    },
    {
      question: "Is it safe to self-drive in Hokkaido in winter?",
      answer: "It's legally straightforward but genuinely demanding. Roads are frequently compacted snow and ice rather than cleared bare, and foreign tourists have a notably higher accident rate than local drivers in winter conditions. Rental cars come fitted with snow tires automatically during winter months, but confident winter driving experience matters more here than in most other parts of Japan.",
    },
    {
      question: "Should I drive in Kyoto, or is it better to use the train?",
      answer: "For central Kyoto, the train is usually the better choice — traffic is heavy, and parking is limited and expensive. A rental car becomes genuinely useful once you're heading out to Nara or other areas outside the city centre, where public transport is less frequent.",
    },
    {
      question: "Is the road to Mount Fuji open year-round?",
      answer: "Not to private vehicles. The Fuji Subaru Line, the main toll road up Mount Fuji, closes to private cars during the peak summer climbing season, and shuttle buses run instead during that window. Outside of that period, it's a scenic toll drive worth planning around your IDP and rental car.",
    },
    {
      question: "What's Japan's drink-driving limit?",
      answer: "The legal limit is 0.03% BAC, but it's enforced strictly and the practical standard is closer to zero tolerance — penalties can include imprisonment, heavy fines, and losing your licence, and passengers can face consequences too if they knowingly rode with an impaired driver.",
    },
    {
      question: "Can I apply for an IDP after I've already arrived in Japan?",
      answer: "No — an IDP must be obtained in your home country before you travel; it can't be issued once you've landed in Japan. ApplyIDPOnline is designed to be completed before your trip, so plan to apply with enough time before departure.",
    },
    {
      question: "What side of the road does Japan drive on?",
      answer: "Japan drives on the left, with the driver's seat on the right side of the vehicle — the same convention as Thailand, Singapore, and the United Kingdom.",
    },
    {
      question: "Is a Digital IDP accepted by every rental company in Japan?",
      answer: "Not universally — some rental providers prefer a printed copy over a digital one. It's worth checking with your specific rental company before your trip, or choosing the Print + Digital option for broader coverage.",
    },
    {
      question: "What's the difference between Digital and Print + Digital?",
      answer: "Digital IDP is an emailed document ready to show on your phone. Print + Digital adds a physical booklet shipped to you, with the digital copy included as well — useful if a provider prefers a printed document.",
    },
  ],

  sourceCitations: [
    {
      label: "Foreign travel advice — Japan (Safety and security)",
      url: "https://www.gov.uk/foreign-travel-advice/japan/safety-and-security",
      organization: "GOV.UK — Foreign, Commonwealth & Development Office",
    },
    {
      label: "Driving in Japan with a foreign driver's licence",
      url: "https://english.jaf.or.jp/driving-in-japan/drive-in-japan/switch-to-japanese-license",
      organization: "Japan Automobile Federation (JAF)",
    },
  ],
  lastVerifiedDate: "2026-08-01",

  relatedCountrySlugs: ["thailand", "vietnam", "singapore", "indonesia"],

  primaryKeyword: "international driving permit japan",
  secondaryKeywords: [
    "idp japan",
    "international driving license japan",
    "driving in japan for foreigners",
    "japan car rental",
    "hokkaido self drive",
    "jaf international driving permit",
    "geneva convention japan",
    "mount fuji driving",
    "kyoto car rental",
    "okinawa self drive",
    "narita airport car rental",
    "etc toll japan",
  ],
  metaTitle: "International Driving Permit Japan: Geneva Convention Rules",
  metaTitleAbsolute: true,
  metaDescription:
    "Only the Geneva 1949 format is recognised, unlike Vienna-only countries. Six specific nationalities can use a JAF translation of their licence instead.",
};
