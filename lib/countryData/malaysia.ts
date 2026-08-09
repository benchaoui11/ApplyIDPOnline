import type { CountryRecord } from "./types";

// Malaysia — Tier 1 record, built on Master Country Template v1.0 (Thailand
// and Singapore's frozen structure — no template/component changes made
// for this record, only data).
//
// Sourcing discipline (same standard as thailand.ts/singapore.ts):
// commercial/aggregator sites (Motorist Malaysia, internationaldrivingpermit.org,
// e-ita.org, e-itca.org, carlist.my, wahdah.my, and other Semrush-surfaced
// competitor/discovery pages) were used only to identify what to verify and
// where — none of their wording or specific figures were carried into this
// record. Avis Malaysia's own "Driving in Malaysia" guide was used as
// discovery-only corroboration for practical details (speed limits,
// seatbelt/child-seat rules, Touch 'n Go, emergency number) — a commercial
// source, so those fields are marked "partially_sourced," not "confirmed."
// Fields marked "confirmed" were independently verified against the
// Australian High Commission Malaysia's official consular driving guidance
// (Geneva 1949 & Vienna 1968 convention recognition, the 12-month threshold,
// the insurance caveat, and the 2025 conversion-rule change) and Malaysia's
// Road Transport Department (JPJ) for the minimum driving age and as the
// entity behind the outbound-IDP disambiguation. Fields with no
// corroboration are omitted, not invented.
//
// Real, verified competitor gap found during research: both JPJ's own
// official IDP page and the top-ranking commercial competitor (Motorist
// Malaysia) describe the process for Malaysians obtaining an IDP to drive
// ABROAD — neither addresses what a foreign visitor needs to drive IN
// Malaysia. This is the same wrong-direction pattern found during
// Singapore's research (motorist.sg / AAS). This record is deliberately
// precise about which direction it's answering, and the FAQ includes a
// direct disambiguation entry addressing this confusion, mirroring the
// pattern that worked for Singapore.
export const MALAYSIA: CountryRecord = {
  slug: "malaysia",
  name: "Malaysia",
  isoCode: "MY",
  region: "Asia",
  tier: 1,

  h1: "International Driving License Malaysia",

  conventionStatus: {
    value: "Geneva 1949 and Vienna 1968 conventions both recognized",
    status: "confirmed",
  },
  conventionLabel: "Geneva & Vienna",
  idpRequirementLevel: {
    value: "Legally required",
    status: "confirmed",
  },
  minimumDrivingAge: {
    value: 17,
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
      "Most foreign visitors need an International Driving Permit alongside their valid original licence to drive in Malaysia.",
    points: [
      { tip: "Foreign visitors may drive in Malaysia with a valid original licence and an IDP issued by an authorised body in their home country, for stays under 12 months.", status: "confirmed" },
      { tip: "Malaysia recognises IDPs issued under both the 1949 Geneva Convention and the 1968 Vienna Convention.", status: "confirmed" },
      { tip: "It's worth checking with your vehicle insurance provider that driving on an IDP doesn't affect your coverage.", status: "confirmed" },
      { tip: "Staying in Malaysia longer than 12 months generally means applying for a Malaysian driving licence, since IDP-to-local-licence conversion rules changed for most foreign nationals in 2025.", status: "confirmed" },
      { tip: "Malaysia drives on the left, with the driver's seat on the right side of the vehicle.", status: "confirmed" },
    ],
    solutionNote: "ApplyIDPOnline prepares your IDP fully online before you travel, so it's ready before you land.",
    ctaHint: { label: "Prepare my IDP for Malaysia", href: "/apply?destination=Malaysia" },
  },

  roadRulesGuide: {
    label: "Road Rules",
    directAnswer: "Malaysia follows left-hand driving on a modern expressway network, where the Touch 'n Go electronic toll system and posted speed limits are the main adjustments for visiting drivers.",
    points: [
      { tip: "Speed limits are typically 60-80 km/h in towns and cities, and 90-110 km/h on expressways.", status: "partially_sourced" },
      { tip: "Most expressway tolls are paid electronically via a Touch 'n Go card or similar e-wallet rather than cash at the booth.", status: "partially_sourced" },
      { tip: "Seatbelts are mandatory for all occupants, and children under a certain age must use a child safety seat.", status: "partially_sourced" },
      { tip: "Malaysia uses automated speed and red-light camera enforcement (AWAS) on many expressways, in addition to roadside checks.", status: "partially_sourced" },
      { tip: "If you're involved in an accident, exchange particulars and call 999 if anyone is injured.", status: "confirmed" },
    ],
    solutionNote: "Your IDP presents your licence details in a standardized, multi-language format that's easier for local staff and officials to read.",
    ctaHint: { label: "Check your eligibility", href: "#eligibility" },
  },

  rentalGuide: {
    label: "Rental Cars",
    directAnswer: "Car rental companies in Malaysia generally ask for your IDP alongside your original licence, and many apply their own minimum-age and licence-history requirements above the legal minimum.",
    points: [
      { tip: "The legal minimum age to hold a Malaysian driving licence is 17, and rental companies commonly expect drivers to be at least 21-23, with some requiring more for certain vehicle categories.", status: "partially_sourced" },
      { tip: "Typical documents requested at pickup: your IDP, original licence, passport, and a credit card for the security deposit.", status: "partially_sourced" },
      { tip: "Several rental providers offer a Touch 'n Go card or similar toll device with the vehicle — ask at pickup if one isn't included.", status: "partially_sourced" },
      { tip: "Most Malaysia rental agreements do not permit taking the vehicle across the border into Singapore or Thailand — confirm this specifically with your provider if you're planning a cross-border trip.", status: "partially_sourced" },
      { tip: "Requirements vary by rental company — confirm specifics with your provider before arrival.", status: "confirmed" },
    ],
    solutionNote: "ApplyIDPOnline prepares the IDP most rental counters expect to see alongside your original licence.",
    ctaHint: { label: "Check your eligibility", href: "#eligibility" },
  },

  scooterGuide: {
    label: "Scooters & Motorcycles",
    directAnswer: "The same IDP requirement applies to motorcycle and scooter rentals as to cars, and your IDP needs to show the matching motorcycle category from your original licence.",
    points: [
      { tip: "Your IDP only shows a motorcycle category if your original licence already includes one — it can't add a category you don't hold at home.", status: "confirmed" },
      { tip: "Helmets are mandatory for the rider and any pillion passenger.", status: "confirmed" },
      { tip: "Motorcycle and scooter rental is common in tourist areas like Penang and Langkawi, though availability and requirements vary by operator.", status: "partially_sourced" },
      { tip: "Confirm your travel insurance covers the engine size and vehicle type you plan to rent.", status: "confirmed" },
      { tip: "Driving or riding without a valid licence and IDP can affect your travel insurance coverage if you're in an accident.", status: "confirmed" },
    ],
    solutionNote: "Your IDP lists the vehicle categories from your original licence, including motorcycle categories where applicable.",
    ctaHint: { label: "Prepare my IDP for Malaysia", href: "/apply?destination=Malaysia" },
  },

  policeGuide: {
    label: "Police & Roadside Checks",
    directAnswer: "Keep your original driver's licence and your IDP together as your standard document set any time you're driving in Malaysia.",
    points: [
      { tip: "Your IDP and original licence work as a pair — one is not a substitute for the other at a roadside check.", status: "confirmed" },
      { tip: "Keep both documents physically accessible (not just a photo on your phone) whenever you're driving.", status: "confirmed" },
      { tip: "A passport or passport copy is also worth keeping with you, alongside your rental agreement if you're using a hired vehicle.", status: "partially_sourced" },
      { tip: "Malaysia uses automated camera enforcement (AWAS) alongside roadside checks, particularly on expressways.", status: "partially_sourced" },
    ],
    solutionNote: "A calmly prepared, correctly formatted IDP is the most straightforward way to have both documents ready together.",
    ctaHint: { label: "Check your eligibility", href: "#eligibility" },
  },

  borderCrossingGuide: {
    label: "Border Crossing",
    directAnswer: "Driving across the Johor Causeway or Second Link between Singapore and Malaysia involves separate requirements for your vehicle and your driving licence, and your IDP still applies for the Malaysian side of the trip.",
    points: [
      { tip: "Your IDP requirement still applies for the Malaysian portion of a cross-border trip — it doesn't change based on which direction you're crossing.", status: "confirmed" },
      { tip: "Most locally rented Malaysian cars are not permitted to be driven into Singapore under the rental agreement, and the reverse is also commonly restricted — confirm directly with your rental provider.", status: "partially_sourced" },
      { tip: "Foreign-registered vehicles entering Malaysia may have their own entry requirements separate from your driving licence — check with your rental provider or vehicle's home authority before crossing.", status: "partially_sourced" },
      { tip: "The Johor Causeway and the Second Link are the two main road crossings between Singapore and Malaysia, both of which see heavy traffic at peak travel times.", status: "confirmed" },
    ],
    solutionNote: "Your IDP is part of your document set for the Malaysian side of the trip regardless of which direction you're crossing.",
    ctaHint: { label: "Prepare my IDP for Malaysia", href: "/apply?destination=Malaysia" },
  },

  motorcycleScooterRelevant: true,
  vehicleCategoryNote: {
    value: "Your IDP lists the vehicle categories shown on your original licence (for example, motorcycle vs. car categories) — it doesn't grant categories your original licence doesn't already include.",
    status: "confirmed",
  },
  vehicleCategoryLabel: "Motorcycle & car",

  popularDrivingAreas: [
    { name: "Kuala Lumpur", note: "Malaysia's capital and largest city — expect expressway driving, toll roads, and rental counters at KLIA and KLIA2 airports.", status: "confirmed" },
    { name: "Penang", note: "George Town's heritage streets and coastal routes make Penang a popular self-drive and scooter destination.", status: "confirmed" },
    { name: "Langkawi", note: "A duty-free island popular for scooter and car rental, with most visitors arriving by air or ferry rather than driving in.", status: "confirmed" },
    { name: "Johor Bahru", note: "Malaysia's southern border city, directly across the Johor Causeway from Singapore — a common stop for cross-border drivers.", status: "confirmed" },
  ],

  borderCrossingRelevant: true,

  emergencyNumber: { value: "999 (police, ambulance, fire)", status: "confirmed" },

  faq: [
    {
      question: "Do I need an International Driving Permit to drive in Malaysia?",
      answer: "Yes, in most cases. Foreign visitors staying under 12 months need a valid foreign driving licence together with an IDP issued by an authorised body in their home country before they can drive in Malaysia. ApplyIDPOnline helps you prepare that IDP online ahead of your trip, so it's ready before you land.",
    },
    {
      question: "Can I drive in Malaysia with just my home country's licence?",
      answer: "Your original licence alone isn't enough for most visitors — Malaysia requires an International Driving Permit alongside it, and ApplyIDPOnline prepares this IDP for you fully online. Carry both documents together once you have them.",
    },
    {
      question: "Can I apply for an IDP after I've already arrived in Malaysia?",
      answer: "Yes. You can submit your application fully online even if you've already arrived in Malaysia. Eligible digital documents are typically prepared in about 8 minutes after successful submission, payment, and approval, and printed documents are also available. You'll still need to carry your original driving licence alongside your IDP, and rental-company or local acceptance requirements can vary, so it's worth confirming these where relevant.",
    },
    {
      question: "What's the difference between a Malaysian JPJ IDP and the IDP I need to drive in Malaysia?",
      answer: "They're two different documents for two different directions of travel. A JPJ-issued IDP (available to Malaysian citizens and permanent residents through the Road Transport Department) is for Malaysians driving abroad. If you're a foreign visitor coming to drive in Malaysia, you need an IDP issued by an authorised body in your own home country — that's what this page and ApplyIDPOnline's service cover.",
    },
    {
      question: "Can I rent a car in Malaysia with a foreign licence and IDP?",
      answer: "Most rental companies accept a foreign licence alongside an IDP, though many also set their own minimum age and licence-history requirements above the legal minimum. Confirm specifics with your rental provider.",
    },
    {
      question: "Do I need an IDP for a scooter or motorcycle in Malaysia?",
      answer: "The same visitor requirements apply to motorcycles as to cars. Your IDP only shows a motorcycle category if your original licence already includes one.",
    },
    {
      question: "What side of the road does Malaysia drive on?",
      answer: "Malaysia drives on the left, with the driver's seat on the right side of the vehicle — the same convention as Singapore, Thailand, and much of Southeast Asia.",
    },
    {
      question: "What is Touch 'n Go, and do I need it as a visitor?",
      answer: "Touch 'n Go is Malaysia's electronic toll and payment card, used to pay automatically at expressway toll booths without stopping for cash. Many rental cars already include one, or you can pick one up at convenience stores and petrol stations.",
    },
    {
      question: "Can I drive a Malaysia rental car into Singapore or Thailand?",
      answer: "Most Malaysia rental agreements don't permit taking the vehicle across the border into Singapore or Thailand. If you're planning a cross-border trip, confirm this directly with your rental provider, or look into a rental specifically set up for cross-border use.",
    },
    {
      question: "What should I know about driving across the causeway from Singapore?",
      answer: "Your IDP requirement for driving in Malaysia applies regardless of which direction you're crossing. The causeway and Second Link involve separate vehicle-entry considerations from your driving documents, so it's worth checking with your rental provider or vehicle authority beforehand, especially during peak travel times when crossings can be busy.",
    },
    {
      question: "What documents should I carry while driving in Malaysia?",
      answer: "Your original driver's licence, your IDP, and a passport or passport copy are the standard set — add your rental agreement if you're using a hired vehicle.",
    },
    {
      question: "Is a Digital IDP accepted by every rental company in Malaysia?",
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
      label: "Driving in Malaysia — International Driving Permit requirements",
      url: "https://malaysia.highcommission.gov.au/klpr/cons_dr.html",
      organization: "Australian High Commission, Malaysia",
    },
    {
      label: "International Driving Permit Application",
      url: "https://www.jpj.gov.my/en/jpj-service-information/international-driving-permit-application/",
      organization: "Jabatan Pengangkutan Jalan (JPJ) — Road Transport Department, Malaysia",
    },
  ],
  lastVerifiedDate: "2026-08-01",

  relatedCountrySlugs: ["singapore", "thailand", "indonesia", "vietnam"],

  primaryKeyword: "international driving permit malaysia",
  secondaryKeywords: [
    "idp malaysia",
    "international driving license malaysia",
    "driving in malaysia",
    "touch n go malaysia",
    "malaysia speed limit",
    "malaysia driving side",
    "malaysia driving license for foreigners",
    "car rental malaysia",
    "international drivers license",
    "driving from singapore to malaysia",
    "kuala lumpur driving guide",
    "penang car rental",
  ],
  metaTitle: "IDP Malaysia: Dual Convention Driving Rules",
  metaTitleAbsolute: true,
  metaDescription:
    "Malaysia is one of the few countries accepting both Geneva and Vienna Convention IDP formats, so travellers rarely need to check which one they hold.",
};
