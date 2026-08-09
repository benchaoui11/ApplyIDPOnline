"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { COUNTRY_LIST } from "@/lib/countryList";
import { DIAL_CODES } from "@/lib/dialCodes";
import { detectVisitorCountry } from "@/lib/detectCountry";
import CountryCombobox from "@/components/CountryCombobox";
import { uploadToSupabaseDocument } from "@/lib/uploadToSupabase";
import FileInput from "./FileInput";
import SignaturePad from "./SignaturePad";
import StepProgress from "./StepProgress";
import PermitPreviewCard from "./PermitPreviewCard";
import OrderSummary from "./OrderSummary";
import VerificationChecklist from "./VerificationChecklist";
import PhoneInput from "./PhoneInput";
import { VEHICLE_CATEGORIES, VehicleIcon } from "@/components/VehicleIcons";
import { getPrice, getSecondTravelerPrice, BEST_SELLER_VALIDITY, type Format, type ValidityYears } from "@/lib/pricing";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

type FormState = {
  fullName: string;
  email: string;
  phoneCountryCode: string;
  phoneNumber: string;
  birthMonth: string;
  birthDay: string;
  birthYear: string;
  sex: "male" | "female" | "";
  countryOfBirth: string;
  countryOfResidence: string;
  destinationCountry: string;
  licenseCategories: string[];
  validityYears: ValidityYears;
  format: Format;
  secondTravelerEnabled: boolean;
  secondFullName: string;
  secondBirthMonth: string;
  secondBirthDay: string;
  secondBirthYear: string;
  secondSex: "male" | "female" | "";
  secondCountryOfBirth: string;
  secondLicenseCategories: string[];
};

const INITIAL_STATE: FormState = {
  fullName: "",
  email: "",
  phoneCountryCode: "",
  phoneNumber: "",
  birthMonth: "",
  birthDay: "",
  birthYear: "",
  sex: "",
  countryOfBirth: "",
  countryOfResidence: "",
  destinationCountry: "",
  licenseCategories: [],
  validityYears: "1",
  format: "digital",
  secondTravelerEnabled: false,
  secondFullName: "",
  secondBirthMonth: "",
  secondBirthDay: "",
  secondBirthYear: "",
  secondSex: "",
  secondCountryOfBirth: "",
  secondLicenseCategories: [],
};

export default function ApplyForm({
  initialDestination,
  initialCategory,
  initialValidity,
  initialFormat,
  initialLicenseCountry,
}: {
  initialDestination?: string;
  initialCategory?: string;
  initialValidity?: string;
  initialFormat?: string;
  initialLicenseCountry?: string;
}) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const licenseCountryValid = initialLicenseCountry && COUNTRY_LIST.some((c) => c.name === initialLicenseCountry) ? initialLicenseCountry : "";
  const licenseCountryCode = licenseCountryValid
    ? COUNTRY_LIST.find((c) => c.name === licenseCountryValid)?.code ?? ""
    : "";
  const [form, setForm] = useState<FormState>({
    ...INITIAL_STATE,
    destinationCountry: initialDestination && COUNTRY_LIST.some((c) => c.name === initialDestination) ? initialDestination : "",
    countryOfResidence: licenseCountryValid,
    phoneCountryCode: DIAL_CODES[licenseCountryCode] ? licenseCountryCode : "",
    licenseCategories: initialCategory && ["A", "B", "C", "D", "E"].includes(initialCategory) ? [initialCategory] : [],
    validityYears: initialValidity && ["1", "2", "3"].includes(initialValidity) ? (initialValidity as ValidityYears) : "1",
    format: initialFormat === "both" ? "both" : "digital",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Best-effort phone country-code default: only fills in if nothing was
  // already carried over from the eligibility checker. Uses Vercel's
  // IP-based geolocation first (reliable), then browser locale as a
  // rough fallback, then the US code — the person can always change it.
  useEffect(() => {
    if (form.phoneCountryCode) return;
    let cancelled = false;
    detectVisitorCountry().then((guessedCountry) => {
      if (cancelled) return;
      const guessedEntry = COUNTRY_LIST.find((c) => c.name === guessedCountry);
      const guessedCode = guessedEntry && DIAL_CODES[guessedEntry.code] ? guessedEntry.code : "US";
      setForm((f) => (f.phoneCountryCode ? f : { ...f, phoneCountryCode: guessedCode }));
    });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [licenseFront, setLicenseFront] = useState<File | null>(null);
  const [licenseBack, setLicenseBack] = useState<File | null>(null);
  const [passportPhoto, setPassportPhoto] = useState<File | null>(null);
  const [signatureBlob, setSignatureBlob] = useState<Blob | null>(null);

  const [secondLicenseFront, setSecondLicenseFront] = useState<File | null>(null);
  const [secondLicenseBack, setSecondLicenseBack] = useState<File | null>(null);
  const [secondPassportPhoto, setSecondPassportPhoto] = useState<File | null>(null);
  const [secondSignatureBlob, setSecondSignatureBlob] = useState<Blob | null>(null);

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function toggleCategory(cat: string) {
    setForm((f) => ({
      ...f,
      licenseCategories: f.licenseCategories.includes(cat)
        ? f.licenseCategories.filter((c) => c !== cat)
        : [...f.licenseCategories, cat],
    }));
  }

  function toggleSecondCategory(cat: string) {
    setForm((f) => ({
      ...f,
      secondLicenseCategories: f.secondLicenseCategories.includes(cat)
        ? f.secondLicenseCategories.filter((c) => c !== cat)
        : [...f.secondLicenseCategories, cat],
    }));
  }

  // A few error keys don't share an id with a single input (a date is split
  // across three fields; sex/license-category are button groups) — this maps
  // those keys to the id actually present in the DOM so scrollToFirstError
  // can find something to scroll to.
  const ERROR_FIELD_ID: Record<string, string> = {
    dateOfBirth: "birthMonth",
    secondDateOfBirth: "secondBirthMonth",
  };

  function scrollToFirstError(e: Record<string, string>) {
    const firstKey = Object.keys(e)[0];
    if (!firstKey) return;
    const id = ERROR_FIELD_ID[firstKey] ?? firstKey;
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function validateStep1(): Record<string, string> {
    const e: Record<string, string> = {};
    if (form.fullName.trim().length < 2) e.fullName = "Enter your full name.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Enter a valid email address.";
    if (!form.phoneCountryCode) e.phoneNumber = "Select your country code.";
    if (form.phoneNumber.trim().length < 5) e.phoneNumber = "Enter a valid phone number.";
    if (!form.birthMonth || !form.birthDay || !form.birthYear) e.dateOfBirth = "Enter your full date of birth.";
    if (!form.sex) e.sex = "Select an option.";
    if (!form.countryOfBirth) e.countryOfBirth = "Select your country of birth.";
    if (!form.countryOfResidence) e.countryOfResidence = "Select your country of residence.";
    if (!form.destinationCountry) e.destinationCountry = "Select your destination country.";
    if (form.licenseCategories.length === 0) e.licenseCategories = "Select at least one category.";
    if (form.secondTravelerEnabled) {
      if (form.secondFullName.trim().length < 2) e.secondFullName = "Enter the second traveler's full name.";
      if (!form.secondBirthMonth || !form.secondBirthDay || !form.secondBirthYear) e.secondDateOfBirth = "Enter their full date of birth.";
      if (!form.secondSex) e.secondSex = "Select an option.";
      if (!form.secondCountryOfBirth) e.secondCountryOfBirth = "Select their country of birth.";
      if (form.secondLicenseCategories.length === 0) e.secondLicenseCategories = "Select at least one category.";
    }
    setErrors(e);
    return e;
  }

  function validateStep2(): Record<string, string> {
    const e: Record<string, string> = {};
    if (!licenseFront) e.licenseFront = "Upload the front of your license.";
    if (!licenseBack) e.licenseBack = "Upload the back of your license.";
    if (!passportPhoto) e.passportPhoto = "Upload a selfie.";
    if (!signatureBlob) e.signature = "Add your signature.";
    if (form.secondTravelerEnabled) {
      if (!secondLicenseFront) e.secondLicenseFront = "Upload the front of their license.";
      if (!secondLicenseBack) e.secondLicenseBack = "Upload the back of their license.";
      if (!secondPassportPhoto) e.secondPassportPhoto = "Upload their selfie.";
      if (!secondSignatureBlob) e.secondSignature = "Add their signature.";
    }
    setErrors(e);
    return e;
  }

  function next() {
    if (step === 0) {
      const e = validateStep1();
      if (Object.keys(e).length > 0) {
        scrollToFirstError(e);
        return;
      }
    }
    if (step === 1) {
      const e = validateStep2();
      if (Object.keys(e).length > 0) {
        scrollToFirstError(e);
        return;
      }
    }
    setErrors({});
    setStep((s) => Math.min(s + 1, 2));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function back() {
    setStep((s) => Math.max(s - 1, 0));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleSubmit() {
    if (!licenseFront || !licenseBack || !passportPhoto || !signatureBlob) {
      setSubmitError("Please complete the document upload step before submitting.");
      return;
    }
    if (form.secondTravelerEnabled && (!secondLicenseFront || !secondLicenseBack || !secondPassportPhoto || !secondSignatureBlob)) {
      setSubmitError("Please complete the second traveler's document upload before submitting.");
      return;
    }
    setSubmitting(true);
    setSubmitError(null);
    try {
      const ref = generateClientReference();
      const [licenseFrontUrl, licenseBackUrl, passportPhotoUrl, signatureUrl] = await Promise.all([
        uploadToSupabaseDocument(licenseFront, ref, "front"),
        uploadToSupabaseDocument(licenseBack, ref, "back"),
        uploadToSupabaseDocument(passportPhoto, ref, "selfie"),
        uploadToSupabaseDocument(signatureBlob, ref, "signature"),
      ]);

      let secondTraveler: {
        fullName: string;
        dateOfBirth: string;
        sex: string;
        countryOfBirth: string;
        licenseCategories: string[];
        licenseFrontUrl: string;
        licenseBackUrl: string;
        passportPhotoUrl: string;
        signatureUrl: string;
      } | undefined;

      if (form.secondTravelerEnabled && secondLicenseFront && secondLicenseBack && secondPassportPhoto && secondSignatureBlob) {
        const secondRef = `${ref}-2`;
        const [sFrontUrl, sBackUrl, sPhotoUrl, sSigUrl] = await Promise.all([
          uploadToSupabaseDocument(secondLicenseFront, secondRef, "front"),
          uploadToSupabaseDocument(secondLicenseBack, secondRef, "back"),
          uploadToSupabaseDocument(secondPassportPhoto, secondRef, "selfie"),
          uploadToSupabaseDocument(secondSignatureBlob, secondRef, "signature"),
        ]);
        const sMonthIndex = MONTHS.indexOf(form.secondBirthMonth) + 1;
        secondTraveler = {
          fullName: form.secondFullName,
          dateOfBirth: `${form.secondBirthYear}-${String(sMonthIndex).padStart(2, "0")}-${String(form.secondBirthDay).padStart(2, "0")}`,
          sex: form.secondSex,
          countryOfBirth: form.secondCountryOfBirth,
          licenseCategories: form.secondLicenseCategories,
          licenseFrontUrl: sFrontUrl,
          licenseBackUrl: sBackUrl,
          passportPhotoUrl: sPhotoUrl,
          signatureUrl: sSigUrl,
        };
      }

      const monthIndex = MONTHS.indexOf(form.birthMonth) + 1;
      const dateOfBirth = `${form.birthYear}-${String(monthIndex).padStart(2, "0")}-${String(form.birthDay).padStart(2, "0")}`;
      const phone = `${DIAL_CODES[form.phoneCountryCode] ?? ""} ${form.phoneNumber}`.trim();

      const res = await fetch("/api/submit-application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ref,
          fullName: form.fullName,
          email: form.email,
          phone,
          dateOfBirth,
          sex: form.sex,
          countryOfBirth: form.countryOfBirth,
          countryOfResidence: form.countryOfResidence,
          destinationCountry: form.destinationCountry,
          licenseCategories: form.licenseCategories,
          validityYears: form.validityYears,
          format: form.format,
          licenseFrontUrl,
          licenseBackUrl,
          passportPhotoUrl,
          signatureUrl,
          secondTraveler,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? "Something went wrong. Please try again.");

      router.push(`/apply/success?ref=${encodeURIComponent(data.ref)}`);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setSubmitting(false);
    }
  }

  const checklistItems = [
    { label: "Selfie", done: !!passportPhoto },
    { label: "License — front", done: !!licenseFront },
    { label: "License — back", done: !!licenseBack },
    { label: "Signature", done: !!signatureBlob },
    ...(form.secondTravelerEnabled
      ? [
          { label: "2nd traveler — selfie", done: !!secondPassportPhoto },
          { label: "2nd traveler — license front", done: !!secondLicenseFront },
          { label: "2nd traveler — license back", done: !!secondLicenseBack },
          { label: "2nd traveler — signature", done: !!secondSignatureBlob },
        ]
      : []),
  ];

  return (
    <div>
      <StepProgress step={step} />

      <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: "28px", alignItems: "start" }} className="apply-grid">
        <div className="apply-card" style={{ minWidth: 0, background: "var(--white)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "32px", boxShadow: "var(--shadow-card)" }}>
          {step === 0 && (
            <StepDetails form={form} update={update} toggleCategory={toggleCategory} toggleSecondCategory={toggleSecondCategory} errors={errors} />
          )}
          {step === 1 && (
            <StepUploads
              errors={errors}
              onLicenseFront={setLicenseFront}
              onLicenseBack={setLicenseBack}
              onPassportPhoto={setPassportPhoto}
              onSignature={setSignatureBlob}
              secondTravelerEnabled={form.secondTravelerEnabled}
              secondFullName={form.secondFullName}
              onSecondLicenseFront={setSecondLicenseFront}
              onSecondLicenseBack={setSecondLicenseBack}
              onSecondPassportPhoto={setSecondPassportPhoto}
              onSecondSignature={setSecondSignatureBlob}
            />
          )}
          {step === 2 && <StepReview form={form} />}

          {submitError && (
            <p role="alert" style={{ marginTop: "20px", color: "var(--error)", fontSize: "14px", background: "var(--error-bg)", padding: "12px 14px", borderRadius: "var(--radius-sm)" }}>
              {submitError}
            </p>
          )}

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "32px" }}>
            {step > 0 ? (
              <button type="button" className="btn btn-secondary" onClick={back} disabled={submitting}>
                Back
              </button>
            ) : (
              <span />
            )}

            {step < 2 ? (
              <button type="button" className="btn btn-primary" onClick={next}>
                Continue
              </button>
            ) : (
              <button type="button" className="btn btn-primary" onClick={handleSubmit} disabled={submitting}>
                {submitting ? "Submitting…" : "Submit application"}
              </button>
            )}
          </div>
        </div>

        <div style={{ minWidth: 0, display: "flex", flexDirection: "column", gap: "20px", position: "sticky", top: "88px" }}>
          <PermitPreviewCard
            fullName={form.fullName}
            destinationCountry={form.destinationCountry}
            licenseCategories={form.licenseCategories}
            validityYears={form.validityYears}
          />
          {step < 1 ? (
            <OrderSummary format={form.format} validityYears={form.validityYears} secondTraveler={form.secondTravelerEnabled} />
          ) : (
            <VerificationChecklist items={checklistItems} />
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .apply-grid { grid-template-columns: 1fr !important; }
          .apply-grid > div:last-child { position: static !important; }
        }
        @media (max-width: 640px) {
          .details-grid { grid-template-columns: 1fr !important; }
          .format-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 480px) {
          .birth-grid input, .birth-grid select { padding: 9px 8px !important; font-size: 13px !important; }
        }
        @media (max-width: 420px) {
          .category-grid { gap: 6px !important; }
          .category-grid button { padding: 11px 2px !important; gap: 5px !important; }
          .category-grid svg { width: 19px !important; height: 19px !important; }
          .category-code { font-size: 10.5px !important; }
          .category-label { display: none !important; }
          .validity-grid { gap: 4px !important; padding: 4px !important; }
          .validity-btn { padding: 9px 3px !important; font-size: 12px !important; }
          .validity-btn-sub { font-size: 9.5px !important; }
          .validity-best-seller { font-size: 7.5px !important; padding: 2px 5px !important; top: -8px !important; }
        }
      `}</style>
    </div>
  );
}

function generateClientReference(): string {
  const stamp = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `AIO-${stamp}-${rand}`;
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p style={{ color: "var(--error)", fontSize: "12.5px", marginTop: "6px" }}>{message}</p>;
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "11px 14px",
  borderRadius: "var(--radius-sm)",
  border: "1px solid var(--border)",
  fontSize: "14.5px",
  fontFamily: "var(--font-body)",
  color: "var(--text)",
  background: "var(--white)",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "13.5px",
  fontWeight: 600,
  color: "var(--navy)",
  marginBottom: "6px",
};

function StepDetails({
  form,
  update,
  toggleCategory,
  toggleSecondCategory,
  errors,
}: {
  form: FormState;
  update: <K extends keyof FormState>(key: K, value: FormState[K]) => void;
  toggleCategory: (cat: string) => void;
  toggleSecondCategory: (cat: string) => void;
  errors: Record<string, string>;
}) {
  return (
    <div>
      <span className="field-tag">FIELD 01</span>
      <h2 style={{ fontSize: "22px", marginTop: "14px" }}>Your driver details</h2>
      <p style={{ marginTop: "8px", fontSize: "14.5px", color: "var(--text-light)" }}>
        Enter your details exactly as they appear on your driver's license.
      </p>

      <div className="details-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginTop: "28px", minWidth: 0 }}>
        <div style={{ gridColumn: "1 / -1" }}>
          <label style={labelStyle} htmlFor="fullName">Full name</label>
          <input id="fullName" style={inputStyle} value={form.fullName} onChange={(e) => update("fullName", e.target.value)} placeholder="As shown on your license" />
          <FieldError message={errors.fullName} />
        </div>

        <div>
          <label style={labelStyle} htmlFor="email">Email address</label>
          <input id="email" type="email" style={inputStyle} value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="name@example.com" />
          <FieldError message={errors.email} />
          <p style={{ fontSize: "12px", color: "var(--text-light)", marginTop: "4px" }}>Your digital permit is delivered to this inbox.</p>
        </div>

        <div>
          <label style={labelStyle} htmlFor="phoneNumber">Phone — WhatsApp preferred</label>
          <PhoneInput
            id="phoneNumber"
            countryCode={form.phoneCountryCode}
            number={form.phoneNumber}
            onCountryChange={(code) => update("phoneCountryCode", code)}
            onNumberChange={(v) => update("phoneNumber", v)}
          />
          <FieldError message={errors.phoneNumber} />
        </div>

        <div className="birth-grid" style={{ gridColumn: "1 / -1", display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr", gap: "12px", minWidth: 0 }}>
          <div>
            <label style={labelStyle} htmlFor="birthMonth">Birth month</label>
            <select id="birthMonth" style={inputStyle} value={form.birthMonth} onChange={(e) => update("birthMonth", e.target.value)}>
              <option value="">Month</option>
              {MONTHS.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>
          <div>
            <label style={labelStyle} htmlFor="birthDay">Day</label>
            <input id="birthDay" style={inputStyle} inputMode="numeric" maxLength={2} placeholder="Day" value={form.birthDay} onChange={(e) => update("birthDay", e.target.value.replace(/\D/g, ""))} />
          </div>
          <div>
            <label style={labelStyle} htmlFor="birthYear">Year</label>
            <input id="birthYear" style={inputStyle} inputMode="numeric" maxLength={4} placeholder="Year" value={form.birthYear} onChange={(e) => update("birthYear", e.target.value.replace(/\D/g, ""))} />
          </div>
          <FieldError message={errors.dateOfBirth} />
        </div>

        <div id="sex">
          <span style={labelStyle}>Sex</span>
          <div style={{ display: "flex", gap: "8px", marginTop: "2px" }}>
            {(["male", "female"] as const).map((s) => {
              const active = form.sex === s;
              return (
                <button
                  type="button"
                  key={s}
                  onClick={() => update("sex", s)}
                  style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "7px",
                    padding: "11px",
                    borderRadius: "var(--radius-sm)",
                    border: active ? "1px solid var(--blue)" : "1px solid var(--border)",
                    background: active ? "var(--blue)" : "var(--white)",
                    color: active ? "#FFFFFF" : "var(--text)",
                    fontWeight: 600,
                    fontSize: "14px",
                    cursor: "pointer",
                  }}
                  aria-pressed={active}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
                    {s === "male" ? (
                      <><circle cx="10" cy="14" r="6" strokeWidth="1.8" /><path d="M14.5 9.5L20 4M20 4h-5M20 4v5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></>
                    ) : (
                      <><circle cx="12" cy="9" r="6" strokeWidth="1.8" /><path d="M12 15v7M9 19h6" strokeWidth="1.8" strokeLinecap="round" /></>
                    )}
                  </svg>
                  {s === "male" ? "Male" : "Female"}
                </button>
              );
            })}
          </div>
          <FieldError message={errors.sex} />
        </div>

        <div>
          <label style={labelStyle} htmlFor="countryOfBirth">Country of birth</label>
          <CountryCombobox id="countryOfBirth" value={form.countryOfBirth} onChange={(v) => update("countryOfBirth", v)} />
          <FieldError message={errors.countryOfBirth} />
        </div>

        <div>
          <label style={labelStyle} htmlFor="countryOfResidence">Country of residence</label>
          <CountryCombobox id="countryOfResidence" value={form.countryOfResidence} onChange={(v) => update("countryOfResidence", v)} />
          <FieldError message={errors.countryOfResidence} />
        </div>

        <div>
          <label style={labelStyle} htmlFor="destinationCountry">Destination country</label>
          <CountryCombobox id="destinationCountry" value={form.destinationCountry} onChange={(v) => update("destinationCountry", v)} placeholder="Select your destination" />
          <FieldError message={errors.destinationCountry} />
        </div>

        <div id="licenseCategories" style={{ gridColumn: "1 / -1" }}>
          <span style={labelStyle}>License category</span>
          <p style={{ fontSize: "12.5px", color: "var(--text-light)", marginTop: "-2px", marginBottom: "10px" }}>
            Pick the category that matches your current license. You can select more than one.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "10px", minWidth: 0 }} className="category-grid">
            {VEHICLE_CATEGORIES.map((cat) => {
              const active = form.licenseCategories.includes(cat.code);
              return (
                <button
                  type="button"
                  key={cat.code}
                  onClick={() => toggleCategory(cat.code)}
                  aria-pressed={active}
                  style={{
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "8px",
                    width: "100%",
                    minWidth: 0,
                    padding: "16px 4px",
                    borderRadius: "var(--radius-sm)",
                    border: active ? "1.5px solid var(--blue)" : "1px solid var(--border)",
                    background: active ? "var(--blue-50)" : "var(--white)",
                    color: active ? "var(--blue)" : "var(--text-light)",
                    cursor: "pointer",
                    transition: "border-color 0.15s ease, background 0.15s ease",
                  }}
                >
                  {active && (
                    <span
                      style={{
                        position: "absolute",
                        top: "-7px",
                        right: "-7px",
                        width: "18px",
                        height: "18px",
                        borderRadius: "50%",
                        background: "var(--blue)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                        <path d="M2 5l2 2 4-4" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  )}
                  <VehicleIcon code={cat.code} size={24} />
                  <span className="category-code" style={{ fontSize: "11px", fontWeight: 700, fontFamily: "var(--font-mono)", color: active ? "var(--blue)" : "var(--navy)" }}>
                    {cat.code}
                  </span>
                  <span className="category-label" style={{ fontSize: "11.5px", fontWeight: 500, color: "var(--text-light)", textAlign: "center", overflowWrap: "break-word", maxWidth: "100%" }}>{cat.label}</span>
                </button>
              );
            })}
          </div>
          <FieldError message={errors.licenseCategories} />
        </div>

        <div style={{ gridColumn: "1 / -1" }}>
          <SecondTravelerToggle form={form} update={update} />
        </div>

        {form.secondTravelerEnabled && (
          <div style={{ gridColumn: "1 / -1" }}>
            <SecondTravelerFields form={form} update={update} toggleSecondCategory={toggleSecondCategory} errors={errors} />
          </div>
        )}

        <div style={{ gridColumn: "1 / -1" }}>
          <span style={labelStyle}>Validity</span>
          <div className="validity-grid" style={{ display: "flex", gap: "8px", marginTop: "14px", minWidth: 0, padding: "5px", background: "var(--surface)", borderRadius: "var(--radius)", border: "1px solid var(--border)" }}>
            {(["1", "2", "3"] as const).map((y) => {
              const active = form.validityYears === y;
              const isBestSeller = y === BEST_SELLER_VALIDITY;
              return (
                <button
                  type="button"
                  key={y}
                  className="validity-btn"
                  onClick={() => update("validityYears", y)}
                  style={{
                    position: "relative",
                    flex: "1 1 0",
                    minWidth: 0,
                    padding: "12px 6px",
                    borderRadius: "var(--radius-sm)",
                    border: "none",
                    background: active ? "var(--navy)" : "transparent",
                    boxShadow: active ? "var(--shadow-sm)" : "none",
                    color: active ? "#FFFFFF" : "var(--text)",
                    fontWeight: 700,
                    fontSize: "14.5px",
                    cursor: "pointer",
                    transition: "background 0.15s ease, box-shadow 0.15s ease",
                  }}
                  aria-pressed={active}
                >
                  {isBestSeller && (
                    <span
                      className="validity-best-seller"
                      style={{
                        position: "absolute",
                        top: "-10px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        background: "var(--success)",
                        color: "#FFFFFF",
                        fontSize: "9.5px",
                        fontWeight: 700,
                        letterSpacing: "0.03em",
                        padding: "2px 8px",
                        borderRadius: "999px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      BEST SELLER
                    </span>
                  )}
                  <span className="validity-btn-label">
                    {y} year{y === "1" ? "" : "s"}
                  </span>
                  <div className="validity-btn-sub" style={{ fontSize: "11.5px", fontWeight: 500, color: active ? "rgba(255,255,255,0.78)" : "var(--text-light)", marginTop: "2px" }}>
                    ${getPrice(form.format, y)} · Expires {new Date().getFullYear() + Number(y)}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div style={{ gridColumn: "1 / -1" }}>
          <span style={labelStyle}>Format</span>
          <div className="format-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "10px", marginTop: "6px", minWidth: 0 }}>
            {(
              [
                { v: "digital", l: "Digital only", note: "Emailed PDF, ready in minutes", icon: "cloud" as const },
                { v: "both", l: "Print + digital", note: "Booklet by mail + digital copy", icon: "box" as const },
              ] as const
            ).map((opt) => {
              const active = form.format === opt.v;
              return (
                <button
                  type="button"
                  key={opt.v}
                  onClick={() => update("format", opt.v)}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "12px",
                    minWidth: 0,
                    width: "100%",
                    padding: "14px",
                    borderRadius: "var(--radius-sm)",
                    border: active ? "1.5px solid var(--blue)" : "1px solid var(--border)",
                    background: active ? "var(--blue-50)" : "var(--white)",
                    boxShadow: active ? "var(--shadow-sm)" : "none",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "border-color 0.15s ease, box-shadow 0.15s ease",
                  }}
                  aria-pressed={active}
                >
                  <span
                    style={{
                      width: "34px",
                      height: "34px",
                      borderRadius: "8px",
                      background: active ? "var(--blue)" : "var(--surface)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                    aria-hidden="true"
                  >
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={active ? "#FFFFFF" : "var(--text-light)"}>
                      {opt.icon === "cloud" ? (
                        <path d="M7 18a4 4 0 01-.6-7.96A5 5 0 0116.9 9H17a3.5 3.5 0 010 7H7z" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      ) : (
                        <>
                          <path d="M3 8l9-4 9 4-9 4-9-4z" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M3 8v8l9 4 9-4V8M12 12v8" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                        </>
                      )}
                    </svg>
                  </span>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "baseline", gap: "6px", flexWrap: "wrap" }}>
                      <span style={{ fontWeight: 700, fontSize: "14px", color: "var(--navy)" }}>{opt.l}</span>
                      <span style={{ fontWeight: 700, fontSize: "14px", color: "var(--blue)" }}>${getPrice(opt.v, form.validityYears)}</span>
                    </div>
                    <p style={{ fontSize: "12px", color: "var(--text-light)", marginTop: "3px" }}>{opt.note}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function SecondTravelerToggle({
  form,
  update,
}: {
  form: FormState;
  update: <K extends keyof FormState>(key: K, value: FormState[K]) => void;
}) {
  if (form.secondTravelerEnabled) return null;

  return (
    <div
      className="second-traveler-cta"
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "10px",
        flexWrap: "wrap",
        padding: "9px 12px",
        borderRadius: "11px",
        border: "1.5px dashed rgba(67, 97, 238, 0.32)",
        background:
          "radial-gradient(140% 180% at 12% -30%, rgba(67, 97, 238, 0.10), transparent 55%), var(--white)",
        boxShadow: "0 2px 10px rgba(15, 23, 42, 0.05)",
        overflow: "hidden",
      }}
    >
      <div className="second-traveler-cta-left" style={{ display: "flex", alignItems: "center", gap: "8px", minWidth: 0 }}>
        <span
          className="second-traveler-cta-icon"
          style={{
            width: "24px",
            height: "24px",
            borderRadius: "7px",
            background: "var(--white)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            boxShadow: "0 2px 5px rgba(15, 23, 42, 0.08)",
          }}
          aria-hidden="true"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--blue)">
            <circle cx="8" cy="8" r="3.2" strokeWidth="2" />
            <path d="M2.5 19c0-3.3 2.5-5.5 5.5-5.5s5.5 2.2 5.5 5.5" strokeWidth="2" strokeLinecap="round" />
            <circle cx="17" cy="7" r="2.6" strokeWidth="2" />
            <path d="M14.5 13.2c2.5.3 4.2 2.3 4.2 5.3" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </span>
        <p className="second-traveler-cta-text" style={{ fontSize: "11.5px", fontWeight: 700, color: "var(--navy)", lineHeight: 1.35 }}>
          Traveling with someone else? <span style={{ color: "var(--success)" }}>Save 20%</span> on their IDP.
        </p>
      </div>
      <button
        type="button"
        className="second-traveler-cta-btn"
        onClick={() => update("secondTravelerEnabled", true)}
        style={{
          whiteSpace: "nowrap",
          flexShrink: 0,
          display: "inline-flex",
          alignItems: "center",
          gap: "4px",
          padding: "5px 12px",
          borderRadius: "999px",
          border: "none",
          fontSize: "10.5px",
          fontWeight: 700,
          fontFamily: "var(--font-body)",
          color: "#FFFFFF",
          background: "linear-gradient(135deg, var(--blue) 0%, var(--navy) 100%)",
          boxShadow: "0 3px 9px rgba(29, 78, 216, 0.28)",
          cursor: "pointer",
        }}
      >
        + Add second driver
      </button>

      <style>{`
        .second-traveler-cta-btn { transition: transform 0.12s ease, box-shadow 0.15s ease; }
        .second-traveler-cta-btn:hover { transform: translateY(-1px); box-shadow: 0 6px 16px rgba(29, 78, 216, 0.34); }
        .second-traveler-cta-btn:active { transform: scale(0.98); }
        @media (max-width: 560px) {
          .second-traveler-cta-btn { margin-left: auto; margin-right: auto; }
        }
        @media (min-width: 900px) {
          .second-traveler-cta { padding: 15px 20px !important; gap: 16px !important; }
          .second-traveler-cta-icon { width: 34px !important; height: 34px !important; border-radius: 10px !important; }
          .second-traveler-cta-icon svg { width: 17px !important; height: 17px !important; }
          .second-traveler-cta-text { font-size: 14.5px !important; }
          .second-traveler-cta-left { gap: 12px !important; }
          .second-traveler-cta-btn { padding: 10px 20px !important; font-size: 13.5px !important; }
        }
      `}</style>
    </div>
  );
}

function SecondTravelerFields({
  form,
  update,
  toggleSecondCategory,
  errors,
}: {
  form: FormState;
  update: <K extends keyof FormState>(key: K, value: FormState[K]) => void;
  toggleSecondCategory: (cat: string) => void;
  errors: Record<string, string>;
}) {
  return (
    <div style={{ border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", padding: "22px", background: "var(--surface)" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <p style={{ fontSize: "14px", fontWeight: 700, color: "var(--navy)" }}>Second traveler</p>
        <button
          type="button"
          onClick={() => update("secondTravelerEnabled", false)}
          style={{ fontSize: "13px", fontWeight: 600, color: "var(--error)", background: "none", border: "none", cursor: "pointer" }}
        >
          Remove
        </button>
      </div>
      <p style={{ fontSize: "12.5px", color: "var(--text-light)", marginTop: "2px" }}>
        Shares your destination, validity and delivery format. 20% off applies to their IDP price.
      </p>

      <div className="details-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginTop: "18px", minWidth: 0 }}>
        <div style={{ gridColumn: "1 / -1" }}>
          <label style={labelStyle} htmlFor="secondFullName">Full name</label>
          <input
            id="secondFullName"
            style={inputStyle}
            value={form.secondFullName}
            onChange={(e) => update("secondFullName", e.target.value)}
            placeholder="As shown on their license"
          />
          <FieldError message={errors.secondFullName} />
        </div>

        <div className="birth-grid" style={{ gridColumn: "1 / -1", display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr", gap: "12px", minWidth: 0 }}>
          <div>
            <label style={labelStyle} htmlFor="secondBirthMonth">Birth month</label>
            <select id="secondBirthMonth" style={inputStyle} value={form.secondBirthMonth} onChange={(e) => update("secondBirthMonth", e.target.value)}>
              <option value="">Month</option>
              {MONTHS.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>
          <div>
            <label style={labelStyle} htmlFor="secondBirthDay">Day</label>
            <input id="secondBirthDay" style={inputStyle} inputMode="numeric" maxLength={2} placeholder="Day" value={form.secondBirthDay} onChange={(e) => update("secondBirthDay", e.target.value.replace(/\D/g, ""))} />
          </div>
          <div>
            <label style={labelStyle} htmlFor="secondBirthYear">Year</label>
            <input id="secondBirthYear" style={inputStyle} inputMode="numeric" maxLength={4} placeholder="Year" value={form.secondBirthYear} onChange={(e) => update("secondBirthYear", e.target.value.replace(/\D/g, ""))} />
          </div>
          <FieldError message={errors.secondDateOfBirth} />
        </div>

        <div id="secondSex">
          <span style={labelStyle}>Sex</span>
          <div style={{ display: "flex", gap: "8px", marginTop: "2px" }}>
            {(["male", "female"] as const).map((s) => {
              const active = form.secondSex === s;
              return (
                <button
                  type="button"
                  key={s}
                  onClick={() => update("secondSex", s)}
                  style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "7px",
                    padding: "11px",
                    borderRadius: "var(--radius-sm)",
                    border: active ? "1px solid var(--blue)" : "1px solid var(--border)",
                    background: active ? "var(--blue)" : "var(--white)",
                    color: active ? "#FFFFFF" : "var(--text)",
                    fontWeight: 600,
                    fontSize: "14px",
                    cursor: "pointer",
                  }}
                  aria-pressed={active}
                >
                  {s === "male" ? "Male" : "Female"}
                </button>
              );
            })}
          </div>
          <FieldError message={errors.secondSex} />
        </div>

        <div>
          <label style={labelStyle} htmlFor="secondCountryOfBirth">Country of birth</label>
          <CountryCombobox id="secondCountryOfBirth" value={form.secondCountryOfBirth} onChange={(v) => update("secondCountryOfBirth", v)} />
          <FieldError message={errors.secondCountryOfBirth} />
        </div>

        <div id="secondLicenseCategories" style={{ gridColumn: "1 / -1" }}>
          <span style={labelStyle}>License category</span>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "10px", marginTop: "8px", minWidth: 0 }} className="category-grid">
            {VEHICLE_CATEGORIES.map((cat) => {
              const active = form.secondLicenseCategories.includes(cat.code);
              return (
                <button
                  type="button"
                  key={cat.code}
                  onClick={() => toggleSecondCategory(cat.code)}
                  aria-pressed={active}
                  style={{
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "8px",
                    width: "100%",
                    minWidth: 0,
                    padding: "16px 4px",
                    borderRadius: "var(--radius-sm)",
                    border: active ? "1.5px solid var(--blue)" : "1px solid var(--border)",
                    background: active ? "var(--blue-50)" : "var(--white)",
                    color: active ? "var(--blue)" : "var(--text-light)",
                    cursor: "pointer",
                    transition: "border-color 0.15s ease, background 0.15s ease",
                  }}
                >
                  <VehicleIcon code={cat.code} size={24} />
                  <span className="category-code" style={{ fontSize: "11px", fontWeight: 700, fontFamily: "var(--font-mono)", color: active ? "var(--blue)" : "var(--navy)" }}>
                    {cat.code}
                  </span>
                  <span className="category-label" style={{ fontSize: "11.5px", fontWeight: 500, color: "var(--text-light)", textAlign: "center", overflowWrap: "break-word", maxWidth: "100%" }}>{cat.label}</span>
                </button>
              );
            })}
          </div>
          <FieldError message={errors.secondLicenseCategories} />
        </div>
      </div>
    </div>
  );
}

function StepUploads({
  errors,
  onLicenseFront,
  onLicenseBack,
  onPassportPhoto,
  onSignature,
  secondTravelerEnabled,
  secondFullName,
  onSecondLicenseFront,
  onSecondLicenseBack,
  onSecondPassportPhoto,
  onSecondSignature,
}: {
  errors: Record<string, string>;
  onLicenseFront: (f: File | null) => void;
  onLicenseBack: (f: File | null) => void;
  onPassportPhoto: (f: File | null) => void;
  onSignature: (b: Blob | null) => void;
  secondTravelerEnabled: boolean;
  secondFullName: string;
  onSecondLicenseFront: (f: File | null) => void;
  onSecondLicenseBack: (f: File | null) => void;
  onSecondPassportPhoto: (f: File | null) => void;
  onSecondSignature: (b: Blob | null) => void;
}) {
  return (
    <div>
      <span className="field-tag">FIELD 02</span>
      <h2 style={{ fontSize: "22px", marginTop: "14px" }}>Upload your documents</h2>
      <p style={{ marginTop: "8px", fontSize: "14.5px", color: "var(--text-light)" }}>
        Clear, uncropped photos help our team review your application faster.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "28px", marginTop: "28px" }}>
        <div>
          <SectionBadge n={1} title="Selfie" note="Plain background, facing forward" />
          <FileInput id="passportPhoto" label="Selfie" hint="JPG or PNG" onFile={onPassportPhoto} guide={<GuideImage variant="portrait" />} capture="user" />
          <FieldError message={errors.passportPhoto} />
        </div>

        <div>
          <SectionBadge n={2} title="Driver's license" note="Photograph both sides flat, with all four corners and text clearly visible." />
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div>
              <FileInput id="licenseFront" label="License — front" hint="JPG or PNG" onFile={onLicenseFront} guide={<GuideImage variant="license-front" />} exampleCaption="Front side" capture="environment" />
              <FieldError message={errors.licenseFront} />
            </div>
            <div>
              <FileInput id="licenseBack" label="License — back" hint="JPG or PNG" onFile={onLicenseBack} guide={<GuideImage variant="license-back" />} exampleCaption="Back side" capture="environment" />
              <FieldError message={errors.licenseBack} />
            </div>
          </div>
        </div>

        <div>
          <SectionBadge n={3} title="Signature" note="Draw it with your mouse, stylus, or finger." />
          <SignaturePad onChange={onSignature} />
          <FieldError message={errors.signature} />
        </div>
      </div>

      {secondTravelerEnabled && (
        <div style={{ marginTop: "36px", paddingTop: "28px", borderTop: "1px solid var(--border)" }}>
          <p style={{ fontSize: "14px", fontWeight: 700, color: "var(--navy)" }}>
            Second traveler{secondFullName ? ` — ${secondFullName}` : ""}
          </p>
          <p style={{ fontSize: "12.5px", color: "var(--text-light)", marginTop: "2px" }}>
            Their IDP is a separate document, so we need their own documents too.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "28px", marginTop: "20px" }}>
            <div>
              <SectionBadge n={1} title="Selfie" note="Plain background, facing forward" />
              <FileInput id="secondPassportPhoto" label="Selfie" hint="JPG or PNG" onFile={onSecondPassportPhoto} guide={<GuideImage variant="portrait" />} capture="user" />
              <FieldError message={errors.secondPassportPhoto} />
            </div>

            <div>
              <SectionBadge n={2} title="Driver's license" note="Photograph both sides flat, with all four corners and text clearly visible." />
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <div>
                  <FileInput id="secondLicenseFront" label="License — front" hint="JPG or PNG" onFile={onSecondLicenseFront} guide={<GuideImage variant="license-front" />} exampleCaption="Front side" capture="environment" />
                  <FieldError message={errors.secondLicenseFront} />
                </div>
                <div>
                  <FileInput id="secondLicenseBack" label="License — back" hint="JPG or PNG" onFile={onSecondLicenseBack} guide={<GuideImage variant="license-back" />} exampleCaption="Back side" capture="environment" />
                  <FieldError message={errors.secondLicenseBack} />
                </div>
              </div>
            </div>

            <div>
              <SectionBadge n={3} title="Signature" note="Draw it with your mouse, stylus, or finger." />
              <SignaturePad onChange={onSecondSignature} />
              <FieldError message={errors.secondSignature} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SectionBadge({ n, title, note }: { n: number; title: string; note: string }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: "12px", marginBottom: "14px" }}>
      <span
        aria-hidden="true"
        style={{
          width: "26px",
          height: "26px",
          borderRadius: "8px",
          background: "linear-gradient(135deg, var(--blue) 0%, var(--navy) 100%)",
          color: "#FFFFFF",
          fontSize: "12.5px",
          fontWeight: 700,
          fontFamily: "var(--font-mono)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          marginTop: "1px",
        }}
      >
        {n}
      </span>
      <div>
        <p style={{ fontSize: "15px", fontWeight: 700, color: "var(--navy)" }}>{title}</p>
        <p style={{ fontSize: "12.5px", color: "var(--text-light)", marginTop: "2px" }}>{note}</p>
      </div>
    </div>
  );
}

const GUIDE_IMAGES = {
  portrait: {
    src: "/images/applyidponline-applicant-photo-guide.webp",
    alt: "Apply IDP Online applicant photo example with centered face and plain background",
    width: 7,
    height: 5,
  },
  "license-front": {
    src: "/images/applyidponline-license-front-upload-guide.webp",
    alt: "Apply IDP Online license front upload example with all corners visible",
    width: 8,
    height: 5,
  },
  "license-back": {
    src: "/images/applyidponline-license-back-upload-guide.webp",
    alt: "Apply IDP Online license back upload example with readable text",
    width: 8,
    height: 5,
  },
} as const;

function GuideImage({ variant }: { variant: keyof typeof GUIDE_IMAGES }) {
  const img = GUIDE_IMAGES[variant];
  return (
    <Image
      src={img.src}
      alt={img.alt}
      width={img.width}
      height={img.height}
      style={{ width: "100%", height: "auto", display: "block" }}
      sizes="160px"
    />
  );
}

function StepReview({ form }: { form: FormState }) {
  const price = getPrice(form.format, form.validityYears);
  const secondPrice = getSecondTravelerPrice(form.format, form.validityYears);
  const total = form.secondTravelerEnabled ? price + secondPrice : price;

  const rows: [string, string][] = [
    ["Full name", form.fullName],
    ["Email", form.email],
    ["Phone", form.phoneCountryCode && form.phoneNumber ? `${DIAL_CODES[form.phoneCountryCode]} ${form.phoneNumber}` : "—"],
    ["Date of birth", form.birthMonth && form.birthDay && form.birthYear ? `${form.birthMonth} ${form.birthDay}, ${form.birthYear}` : "—"],
    ["Sex", form.sex ? form.sex[0].toUpperCase() + form.sex.slice(1) : "—"],
    ["Country of birth", form.countryOfBirth],
    ["Country of residence", form.countryOfResidence],
    ["Destination country", form.destinationCountry],
    ["License categories", form.licenseCategories.join(", ") || "—"],
    ["Validity", `${form.validityYears} year${form.validityYears === "1" ? "" : "s"}`],
    ["Format", form.format === "both" ? "Print + digital" : "Digital only"],
    ["Price", `$${price} USD`],
  ];

  const secondRows: [string, string][] = form.secondTravelerEnabled
    ? [
        ["Full name", form.secondFullName],
        ["Date of birth", form.secondBirthMonth && form.secondBirthDay && form.secondBirthYear ? `${form.secondBirthMonth} ${form.secondBirthDay}, ${form.secondBirthYear}` : "—"],
        ["Sex", form.secondSex ? form.secondSex[0].toUpperCase() + form.secondSex.slice(1) : "—"],
        ["Country of birth", form.secondCountryOfBirth],
        ["License categories", form.secondLicenseCategories.join(", ") || "—"],
        ["Price (20% off)", `$${secondPrice} USD`],
      ]
    : [];

  return (
    <div>
      <span className="field-tag">FIELD 03</span>
      <h2 style={{ fontSize: "22px", marginTop: "14px" }}>Review and submit</h2>
      <p style={{ marginTop: "8px", fontSize: "14.5px", color: "var(--text-light)" }}>
        Check your details below. You can go back to make changes before submitting.
      </p>

      <div style={{ marginTop: "24px", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", overflow: "hidden" }}>
        {rows.map(([label, value], i) => (
          <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "13px 16px", fontSize: "14px", background: i % 2 === 0 ? "var(--surface)" : "var(--white)" }}>
            <span style={{ color: "var(--text-light)" }}>{label}</span>
            <span style={{ fontWeight: 500, color: "var(--navy)" }}>{value || "—"}</span>
          </div>
        ))}
      </div>

      {form.secondTravelerEnabled && (
        <>
          <p style={{ marginTop: "24px", fontSize: "14px", fontWeight: 700, color: "var(--navy)" }}>Second traveler</p>
          <div style={{ marginTop: "10px", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", overflow: "hidden" }}>
            {secondRows.map(([label, value], i) => (
              <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "13px 16px", fontSize: "14px", background: i % 2 === 0 ? "var(--surface)" : "var(--white)" }}>
                <span style={{ color: "var(--text-light)" }}>{label}</span>
                <span style={{ fontWeight: 500, color: "var(--navy)" }}>{value || "—"}</span>
              </div>
            ))}
          </div>
        </>
      )}

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginTop: "20px", padding: "14px 16px", background: "var(--blue-50)", borderRadius: "var(--radius-sm)" }}>
        <span style={{ fontSize: "14px", fontWeight: 600, color: "var(--navy)" }}>Estimated total</span>
        <span style={{ fontSize: "20px", fontWeight: 700, fontFamily: "var(--font-display)", color: "var(--navy)" }}>${total} USD</span>
      </div>

      <p style={{ marginTop: "20px", fontSize: "13px", color: "var(--text-light)" }}>
        By submitting, you confirm the details above are accurate. Our team will review your
        application and contact you at the email address provided with next steps.
      </p>
    </div>
  );
}
