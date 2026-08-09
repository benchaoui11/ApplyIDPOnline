import type { CountryRecord } from "./types";

// Indonesia — Tier 1 record, built on Master Country Template v1.0. No
// template/component changes made for this record, only data.
//
// Bali-weighting decision (data-driven, not assumed): Semrush search-volume
// data for this build showed Bali-specific rental keywords dramatically
// outperforming the country-level primary keyword itself — "scooter rental
// bali" (3,600/mo) and "ubud scooter rental" (3,600/mo) each roughly match
// or exceed "international driving permit indonesia" (1,300/mo), with
// "driving in bali" (1,600), "uluwatu scooter rental" (1,000), "bali
// motorbike rental" (1,000), and "canggu scooter rental" (880) all
// individually substantial. This is why 3 of the 4 popularDrivingAreas
// entries are Bali sub-regions rather than other Indonesian cities —
// it reflects where the actual search demand is, not an assumption.
// Jakarta is kept as the 4th entry so the page doesn't overcorrect into
// treating Indonesia as Bali-only.
//
// Sourcing discipline: commercial/aggregator sites (internationaldrivingpermit.org,
// e-ita.org, internationaldriversassociation.com, and other Semrush-surfaced
// competitor/discovery pages) were used only to identify what to verify and
// where. Fields marked "confirmed" were independently verified against
// GOV.UK's official Foreign Travel Advice for Indonesia (fetched directly
// during this build — see sourceCitations). On convention membership
// specifically: research found Indonesia SIGNED but never RATIFIED the 1968
// Vienna Convention, and no source found gives the kind of explicit,
// country-by-country exclusion list that Vietnam's research produced. Given
// that genuine ambiguity, this record deliberately does NOT assert a
// specific "Geneva & Vienna recognized" or "Vienna-only" claim the way
// Thailand/Malaysia or Vietnam's records do — conventionStatus instead
// describes the well-corroborated operative policy (home-country IDP +
// original licence required) without overclaiming the treaty technicality,
// the same restraint already applied to Singapore's conventionStatus.
//
// Real, verified competitor gap found during research: Indonesia has its
// own "SIM Internasional," an outbound IDP issued by Korlantas Polri (the
// traffic police) to Indonesian licence/KTP holders for driving abroad —
// not something a foreign tourist can obtain or needs. This is the same
// wrong-direction confusion pattern found in Singapore (AAS) and Malaysia
// (JPJ) research, and is addressed directly in the FAQ.
export const INDONESIA: CountryRecord = {
  slug: "indonesia",
  name: "Indonesia",
  isoCode: "ID",
  region: "Asia",
  tier: 1,

  h1: "International Driving Permit Indonesia",

  conventionStatus: {
    value: "Foreign visitors need an International Driving Permit issued in their home country, alongside their original licence, to drive in Indonesia",
    status: "confirmed",
  },
  conventionLabel: "Home-country IDP",
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
      "Foreign visitors need an International Driving Permit alongside their valid original licence to drive or ride in Indonesia, including Bali.",
    points: [
      { tip: "A foreign licence alone isn't accepted by Indonesian authorities — it must be paired with an IDP issued in your home country.", status: "confirmed" },
      { tip: "Your IDP is generally usable for the length of your tourist visa, up to about 6 months.", status: "partially_sourced" },
      { tip: "Indonesia's own \"SIM Internasional\" is issued by the traffic police to Indonesian licence holders for driving abroad — it isn't something a foreign visitor applies for or needs.", status: "confirmed" },
      { tip: "Staying long-term on a KITAS or KITAP permit typically means sitting Indonesia's written and practical driving tests for a local licence, since there's no direct conversion pathway.", status: "confirmed" },
      { tip: "Indonesia drives on the left, with the driver's seat on the right side of the vehicle.", status: "confirmed" },
    ],
    solutionNote: "ApplyIDPOnline prepares your IDP fully online before you travel, so it's ready before you land.",
    ctaHint: { label: "Prepare my IDP for Indonesia", href: "/apply?destination=Indonesia" },
  },

  roadRulesGuide: {
    label: "Road Rules",
    directAnswer: "Indonesia follows left-hand driving with dense motorbike traffic, and road conditions plus enforcement can vary noticeably between cities and areas like Bali.",
    points: [
      { tip: "Speed limits are typically 50 km/h in urban areas, 80 km/h on rural roads, and up to 100 km/h on motorways.", status: "partially_sourced" },
      { tip: "Helmets are required for motorbike and scooter riders, and are worth wearing in genuinely good condition given real accident risk on Bali's roads.", status: "confirmed" },
      { tip: "Minor traffic violations or accidents can sometimes leave foreign drivers vulnerable to informal on-the-spot demands for payment — dealing directly with police at a station is the safer route.", status: "confirmed" },
      { tip: "If you're involved in an accident, stay at the scene, wait for police, and report it fully at a police station.", status: "confirmed" },
    ],
    solutionNote: "Your IDP presents your licence details in a standardized, multi-language format that's easier for local staff and officials to read.",
    ctaHint: { label: "Check your eligibility", href: "#eligibility" },
  },

  rentalGuide: {
    label: "Rental Cars",
    directAnswer: "Car rental companies across Indonesia, including Bali, generally ask for your IDP alongside your original licence, and many apply their own minimum-age and licence-history requirements.",
    points: [
      { tip: "The legal minimum age to drive in Indonesia is 17, and rental companies commonly expect drivers to be at least 21-23, with some requiring more for certain vehicle categories.", status: "partially_sourced" },
      { tip: "Typical documents requested at pickup: your IDP, original licence, passport, and a credit card for the security deposit.", status: "partially_sourced" },
      { tip: "Plenty of visitors to Bali choose to hire a car with a driver rather than self-drive, given local traffic conditions and road layouts.", status: "confirmed" },
      { tip: "Requirements vary by rental company — confirm specifics with your provider before arrival.", status: "confirmed" },
    ],
    solutionNote: "ApplyIDPOnline prepares the IDP most rental counters expect to see alongside your original licence.",
    ctaHint: { label: "Check your eligibility", href: "#eligibility" },
  },

  scooterGuide: {
    label: "Scooters & Motorcycles",
    directAnswer: "Scooter rental is one of the most common ways to get around Bali, and the same IDP requirement applies to motorbikes as to cars, with your IDP needing to show a matching motorcycle category.",
    points: [
      { tip: "Your IDP only shows a motorcycle category if your original licence already includes one — it can't add a category you don't hold at home.", status: "confirmed" },
      { tip: "Scooter rental is especially common around Ubud, Canggu, and Uluwatu, where many visitors rely on a scooter as their main transport.", status: "confirmed" },
      { tip: "Helmets are mandatory for the rider and any pillion passenger.", status: "confirmed" },
      { tip: "Bali has seen a real rise in moped and motorbike accidents among visitors — ride cautiously, and confirm your travel insurance actually covers scooter use.", status: "confirmed" },
      { tip: "Driving or riding without a valid licence and IDP can affect your travel insurance coverage if you're in an accident.", status: "confirmed" },
    ],
    solutionNote: "Your IDP lists the vehicle categories from your original licence, including motorcycle categories where applicable.",
    ctaHint: { label: "Prepare my IDP for Indonesia", href: "/apply?destination=Indonesia" },
  },

  policeGuide: {
    label: "Police & Roadside Checks",
    directAnswer: "Keep your original driver's licence and your IDP together as your standard document set any time you're driving or riding in Indonesia, including Bali.",
    points: [
      { tip: "Your IDP and original licence work as a pair — one is not a substitute for the other at a roadside check.", status: "confirmed" },
      { tip: "Keep both documents physically accessible (not just a photo on your phone) whenever you're driving or riding.", status: "confirmed" },
      { tip: "A passport or passport copy is also worth keeping with you, alongside your rental agreement if you're using a hired vehicle.", status: "partially_sourced" },
      { tip: "Police in Bali routinely check documents in popular tourist areas such as Canggu, Seminyak, and Uluwatu — riding without valid documents can mean a fine of up to IDR 1,000,000 or the vehicle being impounded.", status: "partially_sourced" },
    ],
    solutionNote: "A calmly prepared, correctly formatted IDP is the most straightforward way to have both documents ready together.",
    ctaHint: { label: "Check your eligibility", href: "#eligibility" },
  },

  motorcycleScooterRelevant: true,
  vehicleCategoryNote: {
    value: "Your IDP lists the vehicle categories shown on your original licence (for example, motorcycle vs. car categories) — it doesn't grant categories your original licence doesn't already include.",
    status: "confirmed",
  },
  vehicleCategoryLabel: "Motorcycle & car",

  popularDrivingAreas: [
    { name: "Ubud", note: "Bali's cultural heart and one of the island's busiest scooter-rental hubs, with rice-terrace roads and steady tourist traffic.", status: "confirmed" },
    { name: "Canggu", note: "A surf and beach-club area popular with longer-stay visitors, where scooter rental is the default way to get around and police document checks are common.", status: "confirmed" },
    { name: "Uluwatu", note: "A clifftop area on Bali's southern peninsula, popular for scooter touring between beaches and temples, with regular police checkpoints.", status: "confirmed" },
    { name: "Jakarta", note: "Indonesia's capital and largest city — expect dense traffic and rental counters at Soekarno-Hatta International Airport.", status: "confirmed" },
  ],

  borderCrossingRelevant: false,

  emergencyNumber: { value: "112 (general emergency, police and ambulance)", status: "confirmed" },

  faq: [
    {
      question: "Do I need an International Driving Permit to drive in Indonesia?",
      answer: "Yes. Foreign visitors need a valid original driving licence together with an International Driving Permit issued by an authorised body in their home country before they can legally drive or ride in Indonesia, including Bali. ApplyIDPOnline helps you prepare that IDP online ahead of your trip, so it's ready before you land.",
    },
    {
      question: "Do I need an International Driving Permit to ride a scooter in Bali?",
      answer: "Yes — the same requirement applies to scooters and motorbikes as to cars. Scooter rental is extremely common across Bali, especially in areas like Ubud, Canggu, and Uluwatu, and your IDP needs to show a motorcycle category from your original licence to cover it.",
    },
    {
      question: "Can I drive in Indonesia with just my home country's licence?",
      answer: "Your original licence alone isn't enough — Indonesia requires an International Driving Permit alongside it, and ApplyIDPOnline prepares this IDP for you fully online. Carry both documents together once you have them.",
    },
    {
      question: "Can I apply for an IDP after I've already arrived in Indonesia?",
      answer: "Yes. You can submit your application fully online even if you've already arrived in Indonesia. Eligible digital documents are typically prepared in about 8 minutes after successful submission, payment, and approval, and printed documents are also available. You'll still need to carry your original driving licence alongside your IDP.",
    },
    {
      question: "What's the difference between Indonesia's SIM Internasional and the IDP I need as a visitor?",
      answer: "They're for two different directions of travel. SIM Internasional is issued by Indonesia's traffic police (Korlantas Polri) to holders of an Indonesian licence and KTP or KITAP, mainly for driving abroad — it isn't available to foreign tourists. If you're visiting Indonesia, you need an IDP issued by an authorised body in your own home country — that's what this page and ApplyIDPOnline's service cover.",
    },
    {
      question: "Can I rent a scooter or car in Bali with a foreign licence and IDP?",
      answer: "Most rental providers accept a foreign licence alongside an IDP, though many also set their own minimum age and licence-history requirements above the legal minimum. Confirm specifics with your rental provider.",
    },
    {
      question: "How long is my IDP valid for in Indonesia?",
      answer: "It's generally usable for the length of a tourist visa, up to about 6 months, though this can vary — it's worth confirming current guidance for your specific visa type before you travel.",
    },
    {
      question: "What side of the road does Indonesia drive on?",
      answer: "Indonesia drives on the left, with the driver's seat on the right side of the vehicle — the same convention as Thailand, Singapore, and Malaysia.",
    },
    {
      question: "Is it safe to ride a scooter in Bali?",
      answer: "Bali has seen a real increase in moped and motorbike accidents among visitors, so a good-condition helmet, cautious riding, and travel insurance that actually covers scooter use all matter. Some travelers prefer hiring a car with a driver instead of self-driving, particularly for longer routes.",
    },
    {
      question: "What documents should I carry while driving in Indonesia?",
      answer: "Your original driver's licence, your IDP, and a passport or passport copy are the standard set — add your rental agreement if you're using a hired vehicle.",
    },
    {
      question: "Is a Digital IDP accepted by every rental company in Indonesia?",
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
      label: "Foreign travel advice — Indonesia (Safety and security)",
      url: "https://www.gov.uk/foreign-travel-advice/indonesia/safety-and-security",
      organization: "GOV.UK — Foreign, Commonwealth & Development Office",
    },
  ],
  lastVerifiedDate: "2026-08-01",

  relatedCountrySlugs: ["thailand", "malaysia", "singapore", "vietnam"],

  primaryKeyword: "international driving permit indonesia",
  secondaryKeywords: [
    "idp indonesia",
    "international driving license indonesia",
    "scooter rental bali",
    "driving in bali",
    "bali motorbike rental",
    "ubud scooter rental",
    "uluwatu scooter rental",
    "canggu scooter rental",
    "renting a car in bali",
    "international driving permit bali",
    "jakarta driving guide",
    "international drivers license",
  ],
  metaTitle: "International Driving Permit Indonesia: Scooter & Car Rules",
  metaTitleAbsolute: true,
  metaDescription:
    "A home-country IDP is required alongside your original licence for scooters just as much as cars, a detail many Bali-bound riders overlook entirely.",
};
