import { NextRequest, NextResponse } from "next/server";
import { applicationSchema, generateReference, isRateLimited } from "@/lib/validation";
import { appendApplicationRow } from "@/lib/sheets";
import { sendAdminNotificationEmail, sendCustomerConfirmationEmail } from "@/lib/email";
import { getPrice, getSecondTravelerPrice } from "@/lib/pricing";
import { APPLY_IDP_ONLINE_SITE_SLUG } from "@/lib/site";
import { insertApplication, type ApplicationInsertRow } from "@/lib/supabase";
import type { ApplicationInput } from "@/lib/validation";

function isAllowedOrigin(request: NextRequest): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true; // same-origin requests from some browsers omit Origin
  const allowed = [process.env.SITE_URL, "https://applyidponline.com", "http://localhost:3000"].filter(
    Boolean
  ) as string[];
  return allowed.some((a) => origin.startsWith(a));
}

export async function POST(request: NextRequest) {
  if (!isAllowedOrigin(request)) {
    return NextResponse.json({ error: "Request blocked." }, { status: 403 });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isRateLimited(`submit:${ip}`, 6, 60_000)) {
    return NextResponse.json({ error: "Too many submissions. Please wait a moment and try again." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = applicationSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Some details need attention.", fieldErrors: parsed.error.flatten().fieldErrors },
      { status: 422 }
    );
  }

  const data = parsed.data;
  const ref = data.ref || generateReference();
  const submittedAt = new Date().toISOString();
  const total = getPrice(data.format, data.validityYears) + (data.secondTraveler ? getSecondTravelerPrice(data.format, data.validityYears) : 0);
  const savedRefs = [ref];

  try {
    await insertApplication(buildApplicationRow(data, ref, false));

    if (data.secondTraveler) {
      const secondRef = `${ref}-2`;
      await insertApplication(buildApplicationRow(data, secondRef, true));
      savedRefs.push(secondRef);
    }
  } catch (error) {
    console.error("Supabase application save error:", error);
    return NextResponse.json(
      { error: "We couldn't save your application right now. Please try again in a few minutes." },
      { status: 502 }
    );
  }

  await appendSheetsBestEffort(data, ref, submittedAt);

  const emailPayload = {
    refs: savedRefs,
    fullName: data.fullName,
    email: data.email,
    phone: data.phone,
    destinationCountry: data.destinationCountry,
    format: data.format,
    validityYears: data.validityYears,
    total,
    hasSecondTraveler: Boolean(data.secondTraveler),
  };

  const emailResults = await Promise.allSettled([
    sendCustomerConfirmationEmail(emailPayload),
    sendAdminNotificationEmail(emailPayload),
  ]);
  emailResults.forEach((result) => {
    if (result.status === "rejected") console.error("Application email failed:", result.reason);
  });

  return NextResponse.json({ ref });
}

function splitName(fullName: string) {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  const firstName = parts.shift() || null;
  const lastName = parts.length ? parts.join(" ") : null;
  return { firstName, lastName };
}

function normalizeFormat(format: ApplicationInput["format"]) {
  return format === "both" ? "print_digital" : "digital";
}

function expectedDocumentPrefix(ref: string) {
  return `${APPLY_IDP_ONLINE_SITE_SLUG}/${ref}/`;
}

function safeDocumentPath(ref: string, slot: "front" | "back" | "selfie" | "signature", path: string) {
  const prefix = expectedDocumentPrefix(ref);
  if (!path.startsWith(prefix) || !path.slice(prefix.length).startsWith(`${slot}.`)) {
    throw new Error("Invalid uploaded document path.");
  }

  return path;
}

function buildApplicationRow(data: ApplicationInput, ref: string, companion: boolean): ApplicationInsertRow {
  const traveler = companion ? data.secondTraveler : null;
  if (companion && !traveler) throw new Error("Missing second traveler.");

  const source = traveler || data;
  const { firstName, lastName } = splitName(source.fullName);

  return {
    ref,
    status: "submitted",
    format: normalizeFormat(data.format),
    validity_years: Number(data.validityYears),
    destination_country: data.destinationCountry,
    total: companion ? getSecondTravelerPrice(data.format, data.validityYears) : getPrice(data.format, data.validityYears),
    currency: "USD",
    first_name: firstName,
    last_name: lastName,
    email: data.email,
    phone: data.phone,
    license_category: source.licenseCategories.join(", "),
    group_ref: companion ? data.ref || ref.replace(/-2$/, "") : null,
    is_companion: companion,
    file_license_front: safeDocumentPath(ref, "front", source.licenseFrontUrl),
    file_license_back: safeDocumentPath(ref, "back", source.licenseBackUrl),
    file_selfie: safeDocumentPath(ref, "selfie", source.passportPhotoUrl),
    file_signature: safeDocumentPath(ref, "signature", source.signatureUrl),
  };
}

async function appendSheetsBestEffort(data: ApplicationInput, ref: string, submittedAt: string) {
  try {
    await appendApplicationRow({
      ref,
      submittedAt,
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      dateOfBirth: data.dateOfBirth,
      sex: data.sex,
      countryOfBirth: data.countryOfBirth,
      countryOfResidence: data.countryOfResidence,
      destinationCountry: data.destinationCountry,
      licenseCategories: data.licenseCategories.join(", "),
      validityYears: data.validityYears,
      format: data.format,
      licenseFrontUrl: data.licenseFrontUrl,
      licenseBackUrl: data.licenseBackUrl,
      passportPhotoUrl: data.passportPhotoUrl,
      signatureUrl: data.signatureUrl,
    });

    if (data.secondTraveler) {
      const second = data.secondTraveler;
      await appendApplicationRow({
        ref: `${ref}-2`,
        submittedAt,
        fullName: second.fullName,
        email: data.email,
        phone: data.phone,
        dateOfBirth: second.dateOfBirth,
        sex: second.sex,
        countryOfBirth: second.countryOfBirth,
        countryOfResidence: data.countryOfResidence,
        destinationCountry: data.destinationCountry,
        licenseCategories: second.licenseCategories.join(", "),
        validityYears: data.validityYears,
        format: data.format,
        licenseFrontUrl: second.licenseFrontUrl,
        licenseBackUrl: second.licenseBackUrl,
        passportPhotoUrl: second.passportPhotoUrl,
        signatureUrl: second.signatureUrl,
      });
    }
  } catch (error) {
    console.error("Sheets append skipped:", error);
  }
}
