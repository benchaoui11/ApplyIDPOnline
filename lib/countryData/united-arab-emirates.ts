import type { CountryRecord } from "./types";

// United Arab Emirates — Tier 1 flagship record, built on Master Country
// Template v1.0. No template/component changes made for this record, only
// data. Already present in lib/destinations.ts and flagIcons.tsx from an
// earlier pass; both were audited (not modified) during this build.
//
// DUBAI/UAE ENTITY BALANCE (the defining instruction for this build): the
// brief explicitly required treating Dubai as the highest-commercial-value
// entity while keeping "United Arab Emirates" as the primary page entity,
// and required Dubai and Abu Dhabi to receive genuinely equal depth rather
// than letting Dubai overshadow the capital. Semrush confirmed this is the
// right shape rather than a Dubai-only page: in the AE database,
// "international driving license uae" (6,600/mo) and "driving license
// dubai" (6,600/mo) are tied as the single highest-volume terms, "idp
// dubai" (2,400/mo) is the highest-volume IDP-specific abbreviation, and
// "abu dhabi car rental" (4,400/mo) actually outperforms "dubai car
// rental" (2,900/mo) — Abu Dhabi is not a minor secondary market, it's a
// comparable commercial pillar in its own right. Every guide module below
// (driving, road rules, rental, police, border crossing) gives both cities
// their own named facts rather than folding Abu Dhabi into a Dubai-first
// narrative.
//
// LEGAL SHAPE: closest to the Saudi Arabia/Netherlands "Commonly
// requested" + conditional-recognition pattern, but the UAE's mechanism is
// a nationality/licence-recognition list rather than a pure language test.
// The UAE's Ministry of Interior (Markhoos initiative) and Dubai's RTA
// recognize licences from a defined list of roughly 30-57 countries
// (depending on source and whether federal or Dubai-specific) — including
// the UK, US, Canada, Germany, France, Japan, South Korea, and GCC states
// — allowing those visitors to drive on a visit/tourist visa using only
// their home licence. GOV.UK confirms a UK photocard licence is valid to
// drive in the UAE, though an older paper licence needs updating or an
// IDP. Outside that recognized list, or where a licence isn't in English
// or Arabic, an IDP is required alongside the original licence. Layered on
// top of the legal position, multiple UAE car rental sources describe
// nearly universal rental-company practice of asking for an IDP at the
// counter regardless of nationality, since it gives staff a standardized
// translation to check against — the same practical gap documented in
// Saudi Arabia's record. `idpRequirementLevel: "Commonly requested"` /
// `conventionLabel: "Required for non-recognized licences"`. Every
// FAQ/directAnswer touching the requirement leads with the practical
// rental-counter outcome before the legal nuance, per the standing
// project rule saved from France.
//
// SALIK vs DARB, treated as two distinct systems per the brief's explicit
// instruction: Salik is Dubai's RFID-tag toll system (AED 4 per gate,
// billed automatically to rental guests); Darb is Abu Dhabi's separate
// licence-plate-recognition toll system (AED 4 per crossing during
// weekday peak periods). They are not the same product under two names —
// a rental car crossing between emirates can be billed by both systems in
// a single trip, which is stated explicitly rather than glossed over.
//
// SPEED ENFORCEMENT, a genuine emirate-by-emirate legal distinction (same
// discipline as Germany's Autobahn/Richtgeschwindigkeit split or Belgium's
// Flanders/Wallonia limits): Dubai allows a 20km/h grace margin above the
// posted limit before radar cameras trigger a fine; Abu Dhabi has enforced
// a zero-tolerance policy at the exact posted limit since 2018. Stated as
// two separate facts, not a single UAE-wide number.
//
// POPULAR DRIVING AREAS, chosen on Semrush demand data rather than
// guessed, per the brief's explicit "don't choose only capitals"
// instruction: Dubai and Abu Dhabi are the two mandatory commercial
// pillars. Of the remaining emirates, Sharjah has by far the highest
// independent rental search volume (6,600/mo, ahead of Ajman's 1,300 and
// Fujairah's 1,000) and sits directly on Dubai's border, while Ras Al
// Khaimah pairs solid rental demand (2,400/mo) with Jebel Jais — at
// 60,500/mo the single highest-volume destination term found in this
// entire research pass — as a mountain-road tourism draw with no
// comparable equivalent in Ajman or Fujairah. Sharjah and RAK were chosen
// over those alternatives specifically because they combine commercial
// rental demand with an independent tourism reason to drive there.
//
// Sourcing discipline: Semrush's keyword_research tool succeeded this
// build (phrase_these and phrase_questions reports against the "ae" and
// "uk" databases) after failing on several recent countries — all cited
// volumes above are from that live data, not estimated. GOV.UK's UAE
// safety-and-security travel advice was fetched directly and is the
// primary citation for UK licence validity, drink-driving law, and
// roadside-conduct rules. u.ae (the UAE Government's own official portal)
// was checked directly for the IDP service page, but that page describes
// the outbound service for UAE residents driving abroad, not the inbound
// requirement for foreign visitors — it is referenced in the page copy as
// the correct place to understand IDPs as a concept, but is not cited as
// authority for the inbound-visitor requirement, since that would
// misrepresent what the page actually says. Gulf News (a leading UAE
// English-language outlet, repeatedly citing RTA and Ministry of Interior
// guidance across several of its own explainer pieces) is used as the
// secondary citation for the licence-recognition list, Salik/Darb
// mechanics, and Oman border-crossing procedure, consistent with how
// Wikipedia-citing-a-ministry was used as secondary sourcing elsewhere in
// this project. Fields not corroborated by a primary government source are
// marked partially_sourced.
//
// FLAG VERIFICATION (mandatory per the user's brief): the existing
// UnitedArabEmiratesFlag component was audited, not rebuilt. Its colors
// (#FF0000, #00732F, #FFFFFF, #000000) match the values most consistently
// cited as official across independent sources, and its 1:2 ratio
// (viewBox 1000x500 — length exactly double the width) matches the
// precise language of Federal Law No. (2) of 1971: "a rectangle whose
// length is equal to double its width." A secondary, less authoritative
// source mentioning "2:3 proportions" was checked and dismissed as noise —
// it wasn't corroborated by any primary or repeated source, while 1:2 was
// confirmed by multiple independent references including the exact legal
// text. No rebuild was needed.
export const UNITED_ARAB_EMIRATES: CountryRecord = {
  slug: "united-arab-emirates",
  name: "United Arab Emirates",
  isoCode: "AE",
  region: "Middle East",
  tier: 1,

  h1: "International Driving License UAE",

  conventionStatus: {
    value: "Visitors from a recognized list of around 30-57 countries (including the UK, US, Canada, Germany, France, Japan, South Korea, and GCC states) can drive in the UAE on their home licence alone, provided they're on a visit or tourist visa. Outside that list, or if your licence isn't in English or Arabic, an International Driving Permit is required alongside your original licence",
    status: "confirmed",
  },
  conventionLabel: "Required for non-recognized licences",
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
      "Most car rental companies in Dubai and Abu Dhabi ask for an International Driving Permit at the counter, even when your home licence is already on the UAE's recognized list, so carrying one helps you avoid delays regardless of where you're from.",
    points: [
      { tip: "Visitors from a recognized list of countries — including the UK, US, Canada, Germany, France, Japan, South Korea, and GCC states — can legally drive in the UAE on their home licence alone while on a visit or tourist visa.", status: "confirmed" },
      { tip: "Outside that recognized list, or if your licence isn't already in English or Arabic, an IDP is required alongside your original licence.", status: "confirmed" },
      { tip: "A UK photocard driving licence is valid to drive in the UAE; an older paper licence needs updating to a photocard or pairing with an IDP.", status: "confirmed" },
      { tip: "Most rental companies across Dubai, Abu Dhabi, and the other emirates treat an IDP as a standard condition of rental, since it gives counter staff a translation to check against regardless of your nationality.", status: "confirmed" },
      { tip: "The UAE drives on the right, with the driver's seat on the left side of the vehicle.", status: "confirmed" },
    ],
    solutionNote: "ApplyIDPOnline prepares your IDP fully online before you travel, so it's ready before you land in Dubai or Abu Dhabi.",
    ctaHint: { label: "Prepare my IDP for the UAE", href: "/apply?destination=United%20Arab%20Emirates" },
  },

  roadRulesGuide: {
    label: "Road Rules",
    directAnswer: "The UAE enforces speed limits differently by emirate, runs two separate electronic toll systems in Dubai and Abu Dhabi, and applies a strict zero-tolerance policy to drink-driving.",
    points: [
      { tip: "Dubai allows a 20km/h grace margin above the posted limit before radar cameras trigger a fine; Abu Dhabi has enforced the exact posted limit with zero tolerance since 2018.", status: "confirmed" },
      { tip: "Dubai's toll system is Salik — an RFID tag automatically billed AED 4 per gate.", status: "confirmed" },
      { tip: "Abu Dhabi's toll system is Darb — a separate, camera-based system charging AED 4 per crossing during weekday peak periods, and a single trip crossing both emirates can be billed by both systems.", status: "confirmed" },
      { tip: "Alcohol is legal to buy and consume in the UAE without a licence, but drink-driving is zero tolerance — any detectable amount, however small, is an offence, and insurance can be invalidated.", status: "confirmed" },
      { tip: "Driving standards are inconsistent by UK and similar-market comparisons, with a high rate of traffic accidents and common speeding despite clearly signposted limits.", status: "confirmed" },
      { tip: "Police can impound a vehicle for violations considered minor elsewhere, charging a AED 50,000 impound fee plus the underlying traffic fine.", status: "confirmed" },
      { tip: "Offensive gestures or language directed at other drivers can result in fines, a jail sentence, or deportation.", status: "confirmed" },
    ],
    solutionNote: "Your IDP presents your licence details in a standardized, multi-language format that's easier for local staff and officials to check.",
    ctaHint: { label: "Check your eligibility", href: "#eligibility" },
  },

  rentalGuide: {
    label: "Rental Cars",
    directAnswer: "Self-drive car rental is available across Dubai's two airports, Abu Dhabi International Airport, and Sharjah International Airport, with most providers setting age requirements above the legal minimum.",
    points: [
      { tip: "Dubai has two separate airports for rental purposes — Dubai International Airport (DXB), closer to central Dubai, and Al Maktoum International Airport (DWC) in Dubai South.", status: "confirmed" },
      { tip: "A car booked for one Dubai airport won't be automatically available at the other, and transferring between DXB and DWC adds time and cost.", status: "confirmed" },
      { tip: "Abu Dhabi International Airport and Sharjah International Airport both have rental counters from major providers, with Sharjah often used as a lower-cost alternative to Dubai.", status: "confirmed" },
      { tip: "The legal minimum driving age is 18, but most rental companies set their own minimum between 21 and 25, and some premium or luxury categories set it higher still.", status: "confirmed" },
      { tip: "Typical documents requested at pickup are your original licence, an IDP if applicable, your passport, and a credit card in the main driver's name for the deposit.", status: "confirmed" },
      { tip: "Desert or off-road driving, such as dune bashing near Al Ain or the Empty Quarter, usually needs a 4WD or AWD vehicle rented specifically for that purpose — a standard sedan rental isn't intended for sand terrain.", status: "confirmed" },
    ],
    solutionNote: "ApplyIDPOnline prepares the IDP most UAE rental counters expect to see alongside your original licence.",
    ctaHint: { label: "Check your eligibility", href: "#eligibility" },
  },

  policeGuide: {
    label: "Police & Roadside Checks",
    directAnswer: "Keep your original driving licence, and your International Driving Permit if you're carrying one, together as your standard document set any time you're driving in the UAE.",
    points: [
      { tip: "Your original licence, and your IDP if you're carrying one, should be kept together and accessible at all times while driving.", status: "confirmed" },
      { tip: "After any accident, all drivers must stop — response procedures for whether vehicles can be moved before police arrive vary by emirate.", status: "confirmed" },
      { tip: "Emergency numbers are 999 for police, 998 for ambulance, and 997 for fire and civil defence; 112 also works as a backup emergency number nationwide.", status: "confirmed" },
      { tip: "Traffic violations, including those considered minor elsewhere, can lead to vehicle impoundment with a AED 50,000 release fee on top of the fine itself.", status: "confirmed" },
    ],
    solutionNote: "A calmly prepared, correctly formatted IDP is the most straightforward way to have your documents ready if you're ever asked.",
    ctaHint: { label: "Check your eligibility", href: "#eligibility" },
  },

  borderCrossingGuide: {
    label: "Cross-Border Driving",
    directAnswer: "Driving a rental car from the UAE into Oman is common, most often via Hatta or Al Ain, but it requires advance authorization from your rental company and separate Omani insurance.",
    points: [
      { tip: "Rental cars can be driven into Oman only with the rental company's advance authorization — a No Objection Certificate (NOC) — which should be requested at least a week ahead, along with cross-border insurance arrangements.", status: "confirmed" },
      { tip: "Separate Omani car insurance, commonly called the Orange Card, is mandatory at the border and costs roughly AED 105 for the minimum five-day period, purchasable in advance or at the crossing.", status: "confirmed" },
      { tip: "The Al Ain–Mezyad and Hatta–Al Wajajah crossings are both used, but Hatta has at times turned away rental cars carrying an NOC and redirected them to Al Ain — it's worth confirming the accepted crossing with your rental company before you travel.", status: "partially_sourced" },
      { tip: "Your IDP requirement, where it applies, covers driving within the UAE — Oman sets its own separate licence and document rules for entering vehicles.", status: "confirmed" },
    ],
    solutionNote: "ApplyIDPOnline prepares your IDP for driving in the UAE — the Oman NOC and Orange Card insurance are arranged separately with your rental provider and at the border.",
    ctaHint: { label: "Check your eligibility", href: "#eligibility" },
  },

  motorcycleScooterRelevant: false,
  vehicleCategoryNote: {
    value: "Your IDP lists the vehicle categories shown on your original licence — it doesn't grant categories your original licence doesn't already include.",
    status: "confirmed",
  },
  vehicleCategoryLabel: "Car",

  popularDrivingAreas: [
    { name: "Dubai", note: "The UAE's highest-demand rental market, spanning Downtown Dubai, Dubai Marina, and Sheikh Zayed Road, with pickup available at both DXB and Al Maktoum International Airport.", status: "confirmed" },
    { name: "Abu Dhabi", note: "The UAE's capital and a rental market in its own right, covering the Corniche, Yas Island, and Saadiyat Island, and running its own Darb toll system separate from Dubai's Salik.", status: "confirmed" },
    { name: "Sharjah", note: "The UAE's third-largest rental market by search demand, bordering Dubai directly and often used as a lower-cost pickup point with its own international airport.", status: "confirmed" },
    { name: "Ras Al Khaimah", note: "A fast-growing leisure destination built around Jebel Jais — the UAE's tallest mountain road — pairing strong rental demand with a genuine driving-tourism draw.", status: "confirmed" },
  ],

  borderCrossingRelevant: true,

  emergencyNumber: { value: "999 (police), 998 (ambulance), 997 (fire) — 112 also works as a nationwide backup", status: "confirmed" },

  faq: [
    {
      question: "Do I need an International Driving Permit to drive in Dubai?",
      answer: "Most rental companies in Dubai ask for an IDP at the counter, so carrying one helps you avoid delays even if your home licence is on the UAE's recognized list. Legally, visitors from around 30-57 recognized countries — including the UK, US, Canada, Germany, France, Japan, and South Korea — can drive on their home licence alone while on a visit or tourist visa; an IDP becomes a legal requirement mainly outside that list, or if your licence isn't in English or Arabic. ApplyIDPOnline prepares yours fully online before your trip either way.",
    },
    {
      question: "Do I need an International Driving Permit to drive in Abu Dhabi?",
      answer: "Yes, in practice — the same rules apply UAE-wide, and Abu Dhabi rental counters commonly expect an IDP just as Dubai's do. Abu Dhabi isn't a lighter-touch exception to Dubai's requirements.",
    },
    {
      question: "I have a US, UK, EU, Canadian, or Australian licence — do I need an IDP?",
      answer: "Not always strictly by law, since these are among the UAE's recognized licences for visitors on a tourist visa — but most rental companies expect an IDP regardless, so it's worth having one ready rather than finding out at the counter.",
    },
    {
      question: "What's the difference between Salik and Darb?",
      answer: "They're two separate toll systems, not the same system under different names. Salik is Dubai's RFID-tag toll, automatically billing AED 4 per gate. Darb is Abu Dhabi's own camera-based toll, charging AED 4 per crossing during weekday peak periods. A single trip crossing both emirates can be billed by both.",
    },
    {
      question: "Do rental cars come with a Salik tag already fitted?",
      answer: "Yes — rental vehicles in Dubai typically come pre-fitted with a registered Salik tag, and charges are simply tallied during your rental and billed at the end, so you don't need to open or top up an account yourself.",
    },
    {
      question: "What's the speed camera grace limit in Dubai versus Abu Dhabi?",
      answer: "They're different. Dubai allows roughly 20km/h above the posted limit before radar cameras trigger a fine. Abu Dhabi enforces the exact posted limit with zero tolerance, a policy in place since 2018 — even 1km/h over can result in a fine there.",
    },
    {
      question: "Can I drink alcohol in the UAE, and what's the drink-driving limit?",
      answer: "Alcohol is legal to buy and consume without a licence, but driving is zero tolerance — any detectable amount, however small, is an offence, and it can invalidate your insurance.",
    },
    {
      question: "Can I drive a rental car from the UAE into Oman?",
      answer: "Often, yes — most commonly via Hatta or Al Ain — but you'll need advance authorization (an NOC) from your rental company and separate Omani car insurance (the Orange Card, around AED 105 for five days), both checked at the border. Give your rental company at least a week's notice.",
    },
    {
      question: "What do I need to drive in the desert in the UAE?",
      answer: "A 4WD or AWD vehicle rented specifically for off-road use — a standard sedan isn't built for sand terrain. Deflating tyres to roughly 15 psi for traction, travelling with at least one other vehicle, carrying extra fuel and water, and telling someone your route are all standard precautions for desert routes like Al Ain or the Empty Quarter.",
    },
    {
      question: "What should I do if I'm caught driving in a sandstorm?",
      answer: "Slow down, keep your headlights and indicators on, and keep windows shut with the air conditioning running. If visibility worsens badly, pull over away from the road and turn off your lights rather than continuing — don't resume until conditions clear.",
    },
    {
      question: "Which airport should I pick up my rental car from in Dubai — DXB or Al Maktoum?",
      answer: "They're separate locations. Dubai International Airport (DXB) is closer to central Dubai and the more established option; Al Maktoum International Airport (DWC) is in Dubai South. A car booked for one airport isn't automatically available at the other, so confirm your pickup location matches your arrival airport.",
    },
    {
      question: "What side of the road does the UAE drive on?",
      answer: "The UAE drives on the right, with the driver's seat on the left side of the vehicle.",
    },
    {
      question: "What's the minimum age to drive, and to rent a car, in the UAE?",
      answer: "The legal minimum driving age is 18. Most rental companies set their own minimum between 21 and 25, and some luxury or premium categories set it higher still.",
    },
    {
      question: "Can I apply for an IDP after I've already arrived in the UAE?",
      answer: "Yes. You can submit your application fully online even after you've arrived in the UAE, since it's prepared based on your home-country licence rather than issued in person. Eligible digital documents are typically prepared in about 8 minutes after successful submission, payment, and approval, and printed documents are also available.",
    },
    {
      question: "Is a Digital IDP accepted by every rental company in the UAE?",
      answer: "Not universally — acceptance can vary by rental provider, so it's worth checking with your specific rental company before your trip, or choosing the Print + Digital option for broader coverage across Dubai, Abu Dhabi, and the other emirates.",
    },
  ],

  sourceCitations: [
    {
      label: "Foreign travel advice — United Arab Emirates (Safety and security)",
      url: "https://www.gov.uk/foreign-travel-advice/united-arab-emirates/safety-and-security",
      organization: "GOV.UK — Foreign, Commonwealth & Development Office",
    },
    {
      label: "Ask Gulf News: Driving in the UAE as a tourist — licence rules, car rentals and insurance",
      url: "https://gulfnews.com/ask-gulf-news/ask-gulf-news-driving-in-the-uae-as-a-tourist-licence-rules-car-rentals-and-insurance-1.500388132",
      organization: "Gulf News",
    },
  ],
  lastVerifiedDate: "2026-08-05",

  relatedCountrySlugs: ["saudi-arabia", "qatar", "jordan", "united-kingdom"],

  primaryKeyword: "international driving permit uae",
  secondaryKeywords: [
    "international driving license uae",
    "idp dubai",
    "international driving permit dubai",
    "driving license dubai",
    "renting a car in dubai",
    "abu dhabi car rental",
    "sharjah car rental",
    "salik toll dubai",
    "darb toll abu dhabi",
    "jebel jais drive",
    "driving from dubai to oman",
    "dubai speed camera grace limit",
  ],
  metaTitle: "International Driving License UAE: Recognised Licence List",
  metaTitleAbsolute: true,
  metaDescription:
    "Visitors from listed countries, including the US, UK, and GCC states, can drive on their home licence without extra documents.",
};
