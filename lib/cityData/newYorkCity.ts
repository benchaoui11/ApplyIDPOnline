import type { CityRecord } from "./types";

// Sourced via Semrush keyword research and direct verification against
// AAA's own IDP page, NY State DMV, and competitor reverse-engineering
// (FastIDP's NYC post) — see the research summary approved before this
// file was written. Facts about AAA/AATA/DMV are stated briefly and only
// where they genuinely help answer a question, per the site's standing
// rule against making AAA the main character of any page.
export const NEW_YORK_CITY: CityRecord = {
  slug: "new-york-city",
  name: "New York City",
  shortName: "New York",
  state: "New York",
  boroughs: ["Manhattan", "Brooklyn", "Queens", "The Bronx", "Staten Island"],
  airports: [
    { code: "JFK", name: "John F. Kennedy International Airport", note: "New York's primary international gateway, with nonstop routes across Europe, the Caribbean, and Latin America." },
    { code: "LGA", name: "LaGuardia Airport", note: "Mostly domestic, with a growing number of international routes to Canada and the Caribbean." },
    { code: "EWR", name: "Newark Liberty International Airport", note: "A major international hub serving Manhattan and the wider metro area from New Jersey." },
  ],

  whyLocalParagraphs: [
    "New York is one of the most international departure points in the country — JFK alone connects nonstop to well over 90 destinations worldwide. That volume of travel is exactly why so many New Yorkers discover the International Driving Permit requirement late: the trip itself (flights, hotel, itinerary) gets planned weeks in advance, but the rental car only becomes a real decision once the destination is set, which is often the last thing booked and the first thing rushed.",
    "It's also a document that's easy to overlook precisely because New York City doesn't require one to drive here. Residents renew a New York license, not an international one, so there's no local trigger that reminds anyone an IDP exists — until a rental counter in another country asks for it.",
  ],

  whoShouldApply: [
    "You're a New York-based traveler planning to rent a car abroad, especially outside major Western European capitals.",
    "Your New York driver's license isn't printed in the language of your destination, or uses the Latin alphabet but your destination's officials and rental staff may not read English quickly.",
    "You're driving in a country where the IDP is a legal requirement, not just a rental-company preference — check your specific destination's guide rather than assuming.",
    "You want the physical booklet or a digital copy ready before you leave, rather than relying on scheduling a visit somewhere once you land.",
  ],

  popularDestinations: [
    { name: "Italy", slug: "italy", note: "A long-standing top destination from JFK, with frequent driving-abroad questions about city ZTL zones." },
    { name: "France", slug: "france", note: "Direct JFK routes to Paris make it one of the more common IDP requests from New York travelers." },
    { name: "United Kingdom", slug: "united-kingdom", note: "English-speaking, but still a common source of confusion over IDP necessity since driving is on the opposite side of the road." },
    { name: "Mexico", slug: "mexico", note: "A frequent short-haul trip from New York, with its own state-by-state rental nuances." },
    { name: "Ireland", slug: "ireland", note: "Reached directly from JFK and Newark, with its own opposite-side-of-the-road rental questions." },
    { name: "Greece", slug: "greece", note: "A common summer booking from New York, especially for island road trips." },
    { name: "Portugal", slug: "portugal", note: "Growing in popularity from JFK, with straightforward IDP recognition." },
    { name: "Spain", slug: "spain", note: "One of the most searched European drives among New York travelers." },
  ],

  commonMistakes: [
    { title: "Booking the rental car before checking the IDP requirement", body: "By the time many New Yorkers check what their rental company actually needs, the trip is days away — leaving no time to prepare a permit calmly." },
    { title: "Assuming a New York license is enough everywhere", body: "A valid New York license lets you drive at home, but it says nothing about how a foreign rental counter or officer will read it once you're abroad." },
    { title: "Confusing DMV with the IDP process", body: "The New York State DMV issues New York driver's licenses — it does not issue International Driving Permits. Searching \"DMV international driving permit\" is one of the most common dead ends for New York travelers." },
    { title: "Leaving it for the airport", body: "Neither JFK, LGA, nor Newark has a same-day IDP counter. Whatever you're bringing needs to be ready before you get to security, not after." },
  ],

  airportChecklist: [
    { text: "Original New York driver's license (never travel with only the IDP — it isn't valid alone)." },
    { text: "Your International Driving Permit, digital or printed, matching what your destination and rental company expect." },
    { text: "Passport, valid for your full trip length plus your destination's typical entry buffer." },
    { text: "The credit card in the main driver's name — most rental counters worldwide require it for the deposit hold." },
    { text: "A digital backup (photo or cloud copy) of both your license and IDP, stored separately from the originals." },
  ],

  localTrustNote:
    "Apply IDP Online is an independent, private service — not a government agency, embassy, or motor vehicle authority, and not affiliated with AAA or AATA, the two organizations authorized by the U.S. Department of State to issue IDPs in person or by mail. We prepare and submit your application entirely online, which is the practical alternative for New York travelers who can't easily reach one of the city's three AAA branches during business hours.",

  faq: [
    { question: "Where can I get an International Driving Permit in New York City?", answer: "You have two practical routes: apply online through a service like this one, which reviews and prepares your application without an in-person visit, or visit one of AAA's New York City branches in person, since AAA is one of the two organizations authorized by the U.S. Department of State to issue IDPs. AATA, the other authorized organization, processes applications by mail rather than through NYC branches." },
    { question: "Does the New York DMV issue International Driving Permits?", answer: "No. The New York State DMV issues New York driver's licenses and handles road tests — it does not issue International Driving Permits. This is one of the most common points of confusion for New York travelers searching for where to apply." },
    { question: "Can I get an International Driving Permit the same day in NYC?", answer: "In person at an AAA branch, yes, if you arrive well before closing and there's no line — the in-branch process itself typically takes around 20 minutes to 2 hours depending on wait times. Applying online is typically faster to start (no travel or waiting in a branch) but isn't an instant, walk-out-with-it-today process either way; check current turnaround before assuming same-day delivery." },
    { question: "How much does an International Driving Permit cost in New York?", answer: "AAA charges a permit fee plus the cost of passport-style photos if you don't already have them. Independent online services price differently depending on whether you choose digital or printed delivery. See our pricing page for exact current figures rather than relying on a fixed number here." },
    { question: "Do I need an International Driving Permit to drive in New York City?", answer: "No — this document is for New Yorkers traveling abroad, not for driving within New York State. A valid foreign license already lets a visitor drive in New York without a New York license, and a New York resident driving at home only needs their standard New York license." },
    { question: "Which AAA locations in NYC issue International Driving Permits?", answer: "AAA operates IDP-issuing branches in Manhattan, Brooklyn, and Queens. Availability, hours, and current wait times vary by branch, so confirm directly with AAA before a visit — this page focuses on the online alternative rather than branch-specific logistics that change over time." },
    { question: "Can I apply for an International Driving Permit online instead of visiting AAA?", answer: "Yes. Independent services, including this one, handle the entire application online — you complete a form, upload your license and a photo, and receive your permit without visiting a branch. This isn't a government or AAA service; it's a private alternative for travelers who'd rather not schedule an in-person visit." },
    { question: "Is an International Driving Permit the same as an International Driver's License?", answer: "Yes, they're the same document. \"International Driving Permit\" is the official term from the Geneva and Vienna Conventions; \"International Driver's License\" is simply the more common phrase people search for." },
    { question: "Do I need an IDP for every country I'm visiting from New York?", answer: "No. Requirements vary by destination — some countries require one by law, others only have rental companies request it as their own policy, and some don't expect one at all. Check your specific destination's guide rather than assuming." },
    { question: "How long does an International Driving Permit stay valid?", answer: "Up to 1 year under the 1949 Geneva Convention or up to 3 years under the 1968 Vienna Convention, depending on which format is issued — and never longer than your underlying New York license remains valid, whichever comes first." },
    { question: "What documents do I need to apply from New York?", answer: "A valid U.S. driver's license (a New York license, in most cases), a passport-style photo, and your signature. Applying online typically means uploading a photo of your license and a selfie rather than mailing anything in." },
    { question: "Can I use my IDP to rent a car at JFK, LaGuardia, or Newark for my trip home?", answer: "No — this permit is for driving abroad. Renting a car within the U.S., including at New York's airports, only requires your standard driver's license." },
    { question: "Do I still need my physical New York license if I have an IDP?", answer: "Yes, always. An International Driving Permit has no legal standing on its own — it's a translation of your license, not a replacement for it. Carry both together for your entire trip." },
    { question: "Is a digital IDP accepted, or do I need the printed booklet?", answer: "It depends on your destination. Some rental companies and officials accept a digital copy shown on your phone; others, especially outside major cities, still expect the traditional printed booklet. If you're unsure, the printed format is accepted everywhere the digital one is, plus a few places it isn't." },
    { question: "I have a passport from another country but a New York driver's license — which do I use to apply?", answer: "Your International Driving Permit is based on your driver's license, not your passport or citizenship. If your license was issued in New York, that's the license your IDP application is built from." },
    { question: "My flight from JFK leaves in two days — can I still get an IDP in time?", answer: "It depends entirely on current processing times for whichever route you choose, in person or online — check turnaround before you commit to one option this close to departure, since neither route guarantees an instant same-day result outside specific in-branch conditions." },
    { question: "Do I need an International Driving Permit to drive upstate or outside New York City?", answer: "No — this is only relevant for driving outside the United States. A New York license is valid for driving anywhere in New York State and, for visitors, in every other U.S. state." },
    { question: "What's the difference between AAA and AATA for getting an IDP?", answer: "Both are authorized by the U.S. Department of State to issue IDPs, and both produce the same valid document. AAA has physical branches, including three in New York City; AATA processes applications by mail only, with no walk-in locations." },
    { question: "Can I get an International Driving Permit without a AAA membership?", answer: "AAA membership isn't required to get an IDP through AAA — it's a separate service. The same is true applying through an independent online service like this one; no membership of any kind is required." },
    { question: "What happens if I drive abroad without an IDP when my destination requires one?", answer: "Consequences vary by country, from a rental company simply refusing to hand over the car to being treated as unlicensed in a legal or insurance dispute. Check your specific destination's requirement rather than assuming a rental company's willingness to skip it means it's legally optional." },
    { question: "Can I apply for an IDP before I have my flight booked?", answer: "Yes — the application is based on your driver's license, not your itinerary. Many travelers prepare their IDP well before finalizing flights, precisely to avoid a last-minute scramble." },
    { question: "Do children or non-drivers need an International Driving Permit?", answer: "No. An IDP only makes sense for someone who already holds a valid driver's license and intends to drive abroad — it isn't a general travel or identity document for non-drivers." },
    { question: "Is an IDP valid for motorcycles or scooters abroad?", answer: "Only if your original New York license already includes a motorcycle endorsement — the IDP translates whatever categories your license covers, it doesn't add new ones." },
    { question: "Can I renew an International Driving Permit, or do I apply from scratch each time?", answer: "There's no renewal process — each IDP is a new application tied to your currently valid license, whether it's your first one or your fifth." },
    { question: "Does a New York license already in English still need an IDP?", answer: "Sometimes. Even an English license can be requested by a rental company or required by law in a given country simply because it isn't in that country's official language or format — check your specific destination rather than assuming English is automatically sufficient." },
    { question: "Are there International Driving Permit scams targeting New York travelers?", answer: "Yes — this is a real, documented problem, not a hypothetical one. Watch for pricing far outside the normal range, promises of validity beyond 3 years (no convention allows that), no published contact details, and no clear disclosure of who the company actually is." },
    { question: "Can I pick up my printed IDP at a New York City address instead of waiting for mail?", answer: "That depends on the specific service and delivery option you choose — check current shipping options when you apply rather than assuming in-person pickup is available everywhere." },
    { question: "Do I need an IDP if I'm only taking public transportation abroad and not renting a car?", answer: "Generally no — the IDP only matters if you plan to drive. If your trip doesn't involve renting or driving a vehicle, you likely don't need one at all." },
    { question: "Can my spouse or travel companion use my International Driving Permit?", answer: "No. An IDP is tied to one specific individual's license and photo — it can't be used by, shared with, or transferred to anyone else, including a spouse traveling with you." },
    { question: "How far in advance should a New York traveler apply for an IDP?", answer: "As soon as your destination is set, rather than waiting until the trip is imminent — this avoids the exact last-minute scramble that's one of the most common mistakes New York travelers make." },
  ],

  sourceCitations: [
    { label: "International Driving Permit", url: "https://www.aaa.com/vacation/idpf.html", organization: "AAA" },
    { label: "Drivers From Other Countries", url: "https://dmv.ny.gov/driver-license/drivers-from-other-countries", organization: "New York State DMV" },
    { label: "International driver's license for U.S. citizens", url: "https://www.usa.gov/international-drivers-license", organization: "USAGov" },
  ],
  lastVerifiedDate: "2026-08-07",

  h1: "International Driving Permit for New York City Travelers",
  metaTitle: "International Driving Permit New York City | Apply Online",
  metaDescription:
    "Get your International Driving Permit online before you fly out of JFK, LaGuardia, or Newark. What New York travelers need to know — requirements, documents, and common mistakes.",
  primaryKeyword: "international driving permit new york city",
};
