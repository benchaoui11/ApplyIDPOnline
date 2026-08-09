import { NextRequest, NextResponse } from "next/server";
import { contactSchema, isRateLimited } from "@/lib/validation";
import { appendContactRow } from "@/lib/sheets";

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isRateLimited(`contact:${ip}`, 6, 60_000)) {
    return NextResponse.json({ error: "Too many messages. Please wait a moment and try again." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Some details need attention.", fieldErrors: parsed.error.flatten().fieldErrors },
      { status: 422 }
    );
  }

  try {
    await appendContactRow({ ...parsed.data, submittedAt: new Date().toISOString() });
  } catch (error) {
    console.error("Contact sheets append error:", error);
    return NextResponse.json(
      { error: "We couldn't send your message right now. Please try again shortly." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
