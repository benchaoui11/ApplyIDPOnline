// Canonical, shared JSON-LD building blocks. Every page's schema graph
// references the SAME Organization/WebSite objects from here instead of
// hand-rolling its own copy — that's what keeps the Organization @id
// consistent (same properties, every page) across the whole site instead
// of the previous pattern where the homepage carried a fully-described
// Organization and every other page redefined a thinner one under the
// same @id.
import { APPLY_IDP_ONLINE_DOMAIN } from "./site";
import { getAllPricingOffers } from "./pricing";

export const SITE_URL = `https://${APPLY_IDP_ONLINE_DOMAIN}`;
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

// Real, verified contact channel (app/contact/page.tsx). No sameAs/social
// links are included because none exist yet — adding placeholder or
// unverified profile URLs would violate the site's no-fabrication rule.
export const ORGANIZATION_NODE = {
  "@type": "Organization",
  "@id": ORGANIZATION_ID,
  name: "Apply IDP Online",
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${SITE_URL}/logo-512.png`,
    width: 512,
    height: 512,
  },
  description: "Independent application-assistance service for International Driving Permits.",
  disambiguatingDescription:
    "A private, independent service. Not a government agency, embassy, or motoring authority, and not affiliated with AAA, AATA, FIA, AIT, or the United Nations.",
  contactPoint: {
    "@type": "ContactPoint",
    email: "support@applyidponline.com",
    contactType: "customer service",
  },
} as const;

export const WEBSITE_NODE = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  name: "Apply IDP Online",
  url: SITE_URL,
  publisher: { "@id": ORGANIZATION_ID },
} as const;

// Builds an AggregateOffer node directly from lib/pricing.ts — the same
// source of truth PricingCards.tsx and ApplyForm.tsx read from. No price
// is ever typed a second time here.
export function getAggregateOfferNode() {
  const offers = getAllPricingOffers();
  const prices = offers.map((o) => o.price);

  return {
    "@type": "AggregateOffer",
    priceCurrency: "USD",
    lowPrice: Math.min(...prices),
    highPrice: Math.max(...prices),
    offerCount: offers.length,
    offers: offers.map((o) => ({
      "@type": "Offer",
      name: o.name,
      price: o.price,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}/apply?format=${o.format}&validity=${o.validityYears}`,
    })),
  };
}
