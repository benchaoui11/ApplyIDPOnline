// Flag-derived accent colors for the country hero's identity stripe.
//
// This is a decorative editorial detail — equal-width color bands drawn
// from each country's flag, not a pixel- or orientation-accurate flag
// reproduction (real flags mix horizontal and vertical stripe layouts;
// this table doesn't encode which, so a single fixed gradient direction
// can't be correct for every country). Used for both the hero's top accent
// stripe and the compact FlagSwatch in CountryHero.tsx's Destination
// Profile card. Any ISO code not yet in this table
// falls back to the brand navy/blue pair rather than rendering another
// country's colors, which is what the previous Thailand-only hardcoded
// gradient did for every destination.
//
// Covers all 27 destinations currently listed in lib/destinations.ts, so
// the framework already supports its first real batch of countries without
// needing this file touched again for each one.
export type FlagColorSet = { bands: string[] };

export const FLAG_COLORS: Record<string, FlagColorSet> = {
  TH: { bands: ["#A51931", "#F4F5F8", "#2D2A4A", "#F4F5F8", "#A51931"] }, // Thailand
  JP: { bands: ["#FFFFFF", "#BC002D"] }, // Japan
  VN: { bands: ["#DA251D", "#FFCD00"] }, // Vietnam
  PH: { bands: ["#0038A8", "#CE1126", "#FCD116"] }, // Philippines
  IN: { bands: ["#FF9933", "#FFFFFF", "#138808"] }, // India
  HK: { bands: ["#EE1C25", "#FFFFFF"] }, // Hong Kong
  IE: { bands: ["#169B62", "#FFFFFF", "#FF883E"] }, // Ireland
  ID: { bands: ["#CE1126", "#FFFFFF"] }, // Indonesia
  SG: { bands: ["#ED2939", "#FFFFFF"] }, // Singapore
  MY: { bands: ["#CC0001", "#FFFFFF", "#010066", "#FFCC00"] }, // Malaysia
  US: { bands: ["#B22234", "#FFFFFF", "#3C3B6E"] }, // United States
  CA: { bands: ["#FF0000", "#FFFFFF", "#FF0000"] }, // Canada
  MX: { bands: ["#006847", "#FFFFFF", "#CE1126"] }, // Mexico
  BR: { bands: ["#009C3B", "#FFDF00", "#002776"] }, // Brazil
  AR: { bands: ["#74ACDF", "#FFFFFF", "#74ACDF"] }, // Argentina
  PE: { bands: ["#C8102E", "#FFFFFF", "#C8102E"] }, // Peru
  ES: { bands: ["#AA151B", "#F1BF00", "#AA151B"] }, // Spain
  IT: { bands: ["#008C45", "#F4F5F0", "#CD212A"] }, // Italy
  FR: { bands: ["#0055A4", "#FFFFFF", "#EF4135"] }, // France
  RO: { bands: ["#002B7F", "#FCD116", "#CE1126"] }, // Romania
  HU: { bands: ["#CD2A3E", "#FFFFFF", "#436F4D"] }, // Hungary
  AT: { bands: ["#C8102E", "#FFFFFF", "#C8102E"] }, // Austria
  PL: { bands: ["#FFFFFF", "#DC143C"] }, // Poland
  BE: { bands: ["#000000", "#FDDA24", "#EF3340"] }, // Belgium
  SE: { bands: ["#005293", "#FFCD00"] }, // Sweden
  DK: { bands: ["#C60C30", "#FFFFFF"] }, // Denmark
  TR: { bands: ["#E30A17", "#FFFFFF"] }, // Turkey
  CL: { bands: ["#0032A0", "#FFFFFF", "#DA291C"] }, // Chile
  CH: { bands: ["#FF0000", "#FFFFFF"] }, // Switzerland
  NL: { bands: ["#AE1C28", "#FFFFFF", "#21468B"] }, // Netherlands
  PT: { bands: ["#006600", "#FF0000"] }, // Portugal
  GR: { bands: ["#0D5EAF", "#FFFFFF"] }, // Greece
  DE: { bands: ["#000000", "#DD0000", "#FFCE00"] }, // Germany
  GB: { bands: ["#00247D", "#FFFFFF", "#CF142B"] }, // United Kingdom
  HR: { bands: ["#FF0000", "#FFFFFF", "#171796"] }, // Croatia
  IS: { bands: ["#02529C", "#FFFFFF", "#DC1E35"] }, // Iceland
  NO: { bands: ["#BA0C2F", "#FFFFFF", "#00205B"] }, // Norway
  AE: { bands: ["#FF0000", "#00732F", "#FFFFFF", "#000000"] }, // United Arab Emirates
  SA: { bands: ["#005430", "#FFFFFF"] }, // Saudi Arabia
  QA: { bands: ["#8D1B3D", "#FFFFFF"] }, // Qatar
  JO: { bands: ["#000000", "#FFFFFF", "#007A3D", "#CE1126"] }, // Jordan
  ZA: { bands: ["#007A4D", "#FFB612", "#DE3831", "#002395"] }, // South Africa
  MA: { bands: ["#C1272D", "#006233"] }, // Morocco
  KE: { bands: ["#000000", "#BB0000", "#006600", "#FFFFFF"] }, // Kenya
  NG: { bands: ["#008751", "#FFFFFF", "#008751"] }, // Nigeria
  LK: { bands: ["#007A3D", "#FF8000", "#A20000", "#FDB813"] }, // Sri Lanka
  AU: { bands: ["#00247D", "#FFFFFF", "#FF0000"] }, // Australia
  NZ: { bands: ["#00247D", "#FF0000", "#FFFFFF"] }, // New Zealand
};

const FALLBACK: FlagColorSet = { bands: ["var(--navy)", "var(--blue)"] };

export function getFlagColors(isoCode: string): FlagColorSet {
  return FLAG_COLORS[isoCode.toUpperCase()] ?? FALLBACK;
}

export function flagStripeGradient(isoCode: string): string {
  const { bands } = getFlagColors(isoCode);
  const n = bands.length;
  const stops = bands
    .map((color, i) => `${color} ${((i / n) * 100).toFixed(2)}% ${(((i + 1) / n) * 100).toFixed(2)}%`)
    .join(", ");
  return `linear-gradient(90deg, ${stops})`;
}

function isNearWhiteOrBlack(hex: string): boolean {
  if (!hex.startsWith("#") || hex.length !== 7) return false; // e.g. the var(--navy) fallback
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (r > 235 && g > 235 && b > 235) || (r < 20 && g < 20 && b < 20);
}

// A single representative accent color per country, derived from the same
// verified flag palette — the first band that isn't near-white/near-black
// (those read as neutral, not as the flag's "personality" color). Used to
// tint the Destination Profile card's background wash, ISO badge, and
// stat-tile accents so each country page carries a distinct but restrained
// identity color, still entirely data-driven.
export function getAccentColor(isoCode: string): string {
  const { bands } = getFlagColors(isoCode);
  return bands.find((b) => !isNearWhiteOrBlack(b)) ?? bands[0] ?? "var(--blue)";
}
