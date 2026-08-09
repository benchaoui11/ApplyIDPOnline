import { z } from "zod";

const secondTravelerSchema = z.object({
  fullName: z.string().trim().min(2, "Enter the second traveler's full name").max(120),
  dateOfBirth: z.string().min(1, "Enter the second traveler's date of birth"),
  sex: z.enum(["male", "female"]),
  countryOfBirth: z.string().trim().min(2, "Select the second traveler's country of birth"),
  licenseCategories: z.array(z.enum(["A", "B", "C", "D", "E"])).min(1, "Select at least one category"),
  licenseFrontUrl: z.string().trim().min(1, "Upload the second traveler's license front").max(500),
  licenseBackUrl: z.string().trim().min(1, "Upload the second traveler's license back").max(500),
  passportPhotoUrl: z.string().trim().min(1, "Upload the second traveler's photo").max(500),
  signatureUrl: z.string().trim().min(1, "Add the second traveler's signature").max(500),
});

export const applicationSchema = z.object({
  ref: z.string().trim().regex(/^AIO-[A-Z0-9-]{8,40}$/, "Invalid application reference").optional(),
  fullName: z.string().trim().min(2, "Enter your full name").max(120),
  email: z.string().trim().email("Enter a valid email address"),
  phone: z.string().trim().min(6, "Enter a valid phone number").max(30),
  dateOfBirth: z.string().min(1, "Enter your date of birth"),
  sex: z.enum(["male", "female"]),
  countryOfBirth: z.string().trim().min(2, "Select your country of birth"),
  countryOfResidence: z.string().trim().min(2, "Select your country of residence"),
  destinationCountry: z.string().trim().min(2, "Select your destination country"),
  licenseCategories: z.array(z.enum(["A", "B", "C", "D", "E"])).min(1, "Select at least one category"),
  validityYears: z.enum(["1", "2", "3"]),
  format: z.enum(["digital", "both"]),
  licenseFrontUrl: z.string().trim().min(1, "Upload the front of your license").max(500),
  licenseBackUrl: z.string().trim().min(1, "Upload the back of your license").max(500),
  passportPhotoUrl: z.string().trim().min(1, "Upload a passport-style photo").max(500),
  signatureUrl: z.string().trim().min(1, "Add your signature").max(500),
  secondTraveler: secondTravelerSchema.optional(),
});

export type ApplicationInput = z.infer<typeof applicationSchema>;

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Enter your name").max(120),
  email: z.string().trim().email("Enter a valid email address"),
  message: z.string().trim().min(10, "Tell us a little more").max(2000),
});

export type ContactInput = z.infer<typeof contactSchema>;

const rateBuckets = new Map<string, number[]>();

/**
 * Minimal best-effort in-memory rate limiter (per serverless instance).
 * For stronger guarantees in production, back this with a shared store
 * such as Upstash Redis or Vercel KV.
 */
export function isRateLimited(key: string, limit = 8, windowMs = 60_000): boolean {
  const now = Date.now();
  const hits = (rateBuckets.get(key) ?? []).filter((t) => now - t < windowMs);
  hits.push(now);
  rateBuckets.set(key, hits);
  return hits.length > limit;
}

export function generateReference(): string {
  const stamp = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `AIO-${stamp}-${rand}`;
}
