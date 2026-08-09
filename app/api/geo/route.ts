import { NextRequest, NextResponse } from "next/server";

/**
 * Returns the visitor's country using Vercel's built-in geolocation
 * headers (x-vercel-ip-country) — populated automatically for every
 * request once deployed on Vercel, no external API or key needed.
 *
 * `navigator.language` in the browser reflects OS/language settings, not
 * physical location (an English-language phone in Thailand still reports
 * "en-US"), so it isn't a reliable substitute for this.
 *
 * Locally (or on other hosts) this header is absent and the route
 * returns { country: null }; the client falls back to a sensible default.
 */
export async function GET(request: NextRequest) {
  const country = request.headers.get("x-vercel-ip-country");
  return NextResponse.json({ country: country ?? null });
}
