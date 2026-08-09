import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { insertVisitor } from "@/lib/supabase";
import { isRateLimited } from "@/lib/validation";

const trackingSchema = z.object({
  session_id: z.string().trim().max(120).nullable().optional(),
  referrer: z.string().trim().max(1000).nullable().optional(),
  landing_page: z.string().trim().max(500).nullable().optional(),
});

function parseBrowser(userAgent: string) {
  if (/edg\//i.test(userAgent)) return "Edge";
  if (/chrome|crios/i.test(userAgent)) return "Chrome";
  if (/safari/i.test(userAgent) && !/chrome|crios/i.test(userAgent)) return "Safari";
  if (/firefox|fxios/i.test(userAgent)) return "Firefox";
  return "Unknown";
}

function parseOs(userAgent: string) {
  if (/android/i.test(userAgent)) return "Android";
  if (/iphone|ipad|ipod/i.test(userAgent)) return "iOS";
  if (/mac os x/i.test(userAgent)) return "macOS";
  if (/windows/i.test(userAgent)) return "Windows";
  if (/linux/i.test(userAgent)) return "Linux";
  return "Unknown";
}

function parseDevice(userAgent: string) {
  if (/mobile|iphone|android/i.test(userAgent)) return "Mobile";
  if (/ipad|tablet/i.test(userAgent)) return "Tablet";
  return "Desktop";
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isRateLimited(`track:${ip}`, 24, 60_000)) {
    return NextResponse.json({ ok: true });
  }

  const body = await request.json().catch(() => null);
  const parsed = trackingSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ ok: true });

  const userAgent = request.headers.get("user-agent") || "";

  try {
    await insertVisitor({
      session_id: parsed.data.session_id ?? null,
      country: request.headers.get("x-vercel-ip-country") || request.headers.get("cf-ipcountry") || null,
      browser: parseBrowser(userAgent),
      os: parseOs(userAgent),
      device: parseDevice(userAgent),
      referrer: parsed.data.referrer ?? null,
      landing_page: parsed.data.landing_page ?? null,
    });
  } catch (error) {
    console.error("[track] visitor insert failed:", error);
  }

  return NextResponse.json({ ok: true });
}

