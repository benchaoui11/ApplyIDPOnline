import type { CountryRecord } from "./types";

// Thailand — Tier 1 master-template record.
//
// Sourcing discipline: commercial/aggregator sites (Motorist Thailand,
// translayte.com, internationaldrivingpermit.org, e-ita.org, idpglobe.com,
// and other Semrush-surfaced competitor/discovery pages) were used only to
// identify what to verify and where — none of their wording, tone, specific
// figures (speed limits, BAC limits, checkpoint-frequency claims), or
// procedure descriptions were carried into this record. Fields marked
// "confirmed" were independently verified against GOV.UK's official Foreign
// Travel Advice for Thailand and Thailand's own Department of Land Transport
// (DLT) — whose "International Driving Permit" page confirms Thailand as a
// contracting party to both the Geneva 1949 and Vienna 1968 conventions,
// directly backing conventionStatus/conventionLabel with a primary Thai
// government source rather than only the earlier indirect corroboration
// (fetched directly during this build — see sourceCitations). Fields marked
// "partially_sourced" are corroborated
// across multiple independent commercial sources but not checked against a
// primary government source, and are worded conservatively ("many,"
// "typically," "check with your provider") rather than stated as settled
// fact. Fields with no corroborating source at all (specific speed limits,
// BAC limits, toll rules, specific police-checkpoint procedure) are simply
// absent from this record — competitors state these without citation; we
// don't match their confidence without our own verification.
export const THAILAND: CountryRecord = {
  slug: "thailand",
  name: "Thailand",
  isoCode: "TH",
  region: "Asia",
  tier: 1,

  h1: "International Driving License Thailand",

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
    value: 18,
    status: "partially_sourced",
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
      "Yes — an International Driving Permit is legally required to drive in Thailand as a tourist or foreign visitor, alongside your valid original driver's license.",
    points: [
      { tip: "Thailand drives on the left, and the driver's seat is on the right side of the vehicle.", status: "confirmed" },
      { tip: "Your IDP is a translation and identity document — it accompanies your original license, it doesn't replace it.", status: "confirmed" },
      { tip: "ApplyIDPOnline accepts applications fully online regardless of your location, including if you've already arrived in Thailand.", status: "confirmed" },
      { tip: "The same requirement applies whether you're driving a car, motorcycle, or scooter, and whether you're in Bangkok, Phuket, Chiang Mai, or anywhere else in the country.", status: "confirmed" },
      { tip: "Keep both your IDP and original license together as your standard driving document set for the whole trip.", status: "confirmed" },
    ],
    solutionNote: "ApplyIDPOnline prepares your IDP fully online before you travel, so it's ready before you land.",
    ctaHint: { label: "Prepare my IDP for Thailand", href: "/apply?destination=Thailand" },
  },

  roadRulesGuide: {
    label: "Road Rules",
    directAnswer: "Thailand follows left-hand driving with standard international road signage — treat unfamiliar-side driving as the main adjustment for most visiting tourists.",
    points: [
      { tip: "Traffic drives on the left; roundabouts, overtaking, and right-of-way at junctions follow the same convention.", status: "confirmed" },
      { tip: "Distances and speed limits are posted in kilometers, not miles — a quick mental adjustment if you're used to a mph-based home country.", status: "partially_sourced" },
      { tip: "Speed limits and specific signage vary by road type and province — check current signage as you drive rather than relying on a fixed figure.", status: "pending" },
      { tip: "Seatbelt and helmet laws apply and are actively enforced in many areas.", status: "partially_sourced" },
    ],
    solutionNote: "Your IDP presents your license details in a standardized, multi-language format that's easier for local staff and officials to read.",
    ctaHint: { label: "Check your eligibility", href: "#eligibility" },
  },

  rentalGuide: {
    label: "Rental Cars",
    directAnswer: "Most car rental companies in Thailand — from Bangkok airport counters to Phuket resort desks — ask for an IDP alongside your original license, and many set their own minimum-age policy above the legal driving age.",
    points: [
      { tip: "The legal minimum driving age in Thailand is 18, but several rental companies set their own minimum around 21, with some requiring 25 for certain vehicle categories.", status: "partially_sourced" },
      { tip: "Rental providers commonly expect a license held for at least 2 years with no major endorsements.", status: "partially_sourced" },
      { tip: "Typical documents requested at pickup: your IDP, original license (with the matching category/name), passport, and proof of address.", status: "partially_sourced" },
      { tip: "Airport counters in Bangkok and resort-area desks in Phuket generally ask for the same document set — location doesn't change the requirement.", status: "partially_sourced" },
      { tip: "Requirements vary by rental company — confirm specifics with your provider before arrival.", status: "partially_sourced" },
    ],
    solutionNote: "ApplyIDPOnline prepares the IDP most rental counters expect to see alongside your original license.",
    ctaHint: { label: "Check your eligibility", href: "#eligibility" },
  },

  scooterGuide: {
    label: "Scooters & Motorcycles",
    directAnswer: "The same IDP requirement applies to scooter and motorcycle rentals as to cars, and your IDP needs to show the matching motorcycle category from your original license.",
    points: [
      { tip: "Rental scooters in tourist areas are sometimes unregistered and may not be legal to use on public roads — check the vehicle's registration before you ride.", status: "partially_sourced" },
      { tip: "Confirm your travel insurance covers the engine size and vehicle type you plan to rent, and check the rental agreement's terms carefully.", status: "partially_sourced" },
      { tip: "Helmets are mandatory when riding a motorcycle or scooter in Thailand.", status: "confirmed" },
      { tip: "Your IDP only shows a motorcycle category if your original license already includes one — it can't add a category you don't hold at home.", status: "confirmed" },
      { tip: "Driving without a valid license and IDP can affect your travel insurance coverage if you're in an accident.", status: "confirmed" },
    ],
    solutionNote: "Your IDP lists the vehicle categories from your original license, including motorcycle categories where applicable.",
    ctaHint: { label: "Prepare my IDP for Thailand", href: "/apply?destination=Thailand" },
  },

  policeGuide: {
    label: "Police & Roadside Checks",
    directAnswer: "Keep your original driver's license and your IDP together as your standard document set any time you're driving or riding — that's the calm, practical way to be ready for a routine check.",
    points: [
      { tip: "Your IDP and original license work as a pair — one is not a substitute for the other at a roadside check.", status: "confirmed" },
      { tip: "Keep both documents physically accessible (not just a photo on your phone) whenever you're driving or riding.", status: "confirmed" },
      { tip: "A passport or passport copy is also worth keeping with you, alongside your rental agreement if you're using a hired vehicle.", status: "partially_sourced" },
    ],
    solutionNote: "A calmly prepared, correctly formatted IDP is the most straightforward way to have both documents ready together.",
    ctaHint: { label: "Check your eligibility", href: "#eligibility" },
  },

  motorcycleScooterRelevant: true,
  vehicleCategoryNote: {
    value: "Your IDP lists the vehicle categories shown on your original license (for example, motorcycle vs. car categories) — it doesn't grant categories your original license doesn't already include.",
    status: "confirmed",
  },
  vehicleCategoryLabel: "Motorcycle & car",

  popularDrivingAreas: [
    { name: "Phuket", note: "Scooter and car rentals for island-hopping — one of Thailand's busiest self-drive tourist regions, with rental counters at the airport and most resort areas.", status: "partially_sourced" },
    { name: "Bangkok", note: "Airport rental pickups and city driving — dense traffic makes many visitors prefer a car only for day trips outside the city center.", status: "confirmed" },
    { name: "Chiang Mai", note: "A common base for self-drive countryside touring routes through northern Thailand, popular with both car and motorbike rentals.", status: "partially_sourced" },
    { name: "Krabi", note: "Coastal and karst-region touring popular with scooter and car rentals, often combined with island-hopping trips from nearby piers.", status: "partially_sourced" },
  ],

  borderCrossingRelevant: false,

  emergencyNumber: { value: "191 (police) / 1669 (ambulance)", status: "confirmed" },
  roadsideAssistanceNumber: { value: "1155 — Tourist Police, English-speaking, 24 hours", status: "confirmed" },

  faq: [
    {
      question: "Do I need an International Driving Permit to drive in Thailand?",
      answer: "Yes. An International Driving Permit is legally required to drive in Thailand, in addition to your valid original driver's license.",
    },
    {
      question: "Can I drive in Thailand with just my home driver's license?",
      answer: "Your original license alone isn't enough — Thailand requires an International Driving Permit alongside it, and ApplyIDPOnline prepares this IDP for you fully online. Carry both documents together at all times once you have them.",
    },
    {
      question: "Can I apply for an IDP after I've already arrived in Thailand?",
      answer: "Yes. You can submit your application fully online even if you've already arrived in Thailand. Eligible digital documents are typically prepared in about 8 minutes after successful submission, payment, and approval, and printed documents are also available. You'll still need to carry your original driving license alongside your IDP, and rental-company or local acceptance requirements can vary, so it's worth confirming these where relevant.",
    },
    {
      question: "Can I rent a car in Thailand with a foreign license?",
      answer: "Most rental companies accept a foreign license alongside an IDP, though many also set their own minimum age and license-history requirements. Confirm specifics with your rental provider.",
    },
    {
      question: "Do I need an IDP for a scooter or motorcycle rental?",
      answer: "Yes — the same legal requirement applies to motorcycles and scooters as to cars, and rental providers often have their own registration and insurance checks worth confirming before you ride.",
    },
    {
      question: "Does the motorcycle category need to appear on my original license?",
      answer: "Yes. Your IDP only reflects vehicle categories already shown on your original license — it can't add a motorcycle category you don't already hold at home.",
    },
    {
      question: "Is a Digital IDP accepted by every rental company in Thailand?",
      answer: "Not universally — some rental providers prefer a printed copy over a digital one. It's worth checking with your specific rental company before your trip, or choosing the Print + Digital option for broader coverage.",
    },
    {
      question: "What documents should I carry while driving in Thailand?",
      answer: "Your original driver's license, your IDP, and a passport or passport copy are the standard set — add your rental agreement if you're using a hired vehicle.",
    },
    {
      question: "How is the Digital IDP delivered?",
      answer: "By email as a downloadable document once your application is submitted, paid, and approved by our team.",
    },
    {
      question: "Can I use the same IDP in Phuket, Bangkok, and Chiang Mai?",
      answer: "Yes. The IDP requirement is set nationally, not city by city — one IDP covers driving anywhere in Thailand, including all three of these popular regions.",
    },
    {
      question: "What's the difference between Digital and Print + Digital?",
      answer: "Digital IDP is an emailed document ready to show on your phone. Print + Digital adds a physical booklet shipped to you, with the digital copy included as well — useful if a provider prefers a printed document.",
    },
  ],

  sourceCitations: [
    {
      label: "Foreign travel advice — Thailand (Safety and security)",
      url: "https://www.gov.uk/foreign-travel-advice/thailand/safety-and-security",
      organization: "GOV.UK — Foreign, Commonwealth & Development Office",
    },
    {
      label: "Foreign travel advice — Thailand (Getting help)",
      url: "https://www.gov.uk/foreign-travel-advice/thailand/getting-help",
      organization: "GOV.UK — Foreign, Commonwealth & Development Office",
    },
    {
      label: "International Driving Permit — Geneva & Vienna Convention contracting parties",
      url: "https://www.dlt.go.th/en/international-driving-permit",
      organization: "Department of Land Transport (DLT), Thailand",
    },
  ],
  lastVerifiedDate: "2026-08-01",

  relatedCountrySlugs: ["singapore", "japan", "indonesia", "vietnam", "malaysia"],

  primaryKeyword: "international driving permit thailand",
  secondaryKeywords: [
    "idp thailand",
    "international driving licence thailand",
    "international drivers license thailand",
    "idp for thailand",
    "do i need an idp in thailand",
    "digital idp thailand",
    "driving in thailand",
    "car rental thailand",
    "scooter rental thailand",
    "international driving permit phuket",
    "international driving permit bangkok",
    "international driving permit chiang mai",
  ],
  metaTitle: "IDP Thailand: Geneva & Vienna Driving Rules",
  metaTitleAbsolute: true,
  metaDescription:
    "Thailand accepts IDPs under either the Geneva or Vienna Convention format, a distinction that matters for scooter rental just as much as for cars.",
};
