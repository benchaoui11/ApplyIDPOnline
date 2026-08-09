import { APPLY_IDP_ONLINE_SITE_NAME } from "@/lib/site";

type ApplicationEmailPayload = {
  refs: string[];
  fullName: string;
  email: string;
  phone: string;
  destinationCountry: string;
  format: string;
  validityYears: string;
  total: number;
  hasSecondTraveler: boolean;
};

function senderEmail() {
  return process.env.RESEND_FROM_EMAIL || "contact@applyidponline.com";
}

async function sendEmail(input: { to: string | string[]; subject: string; html: string; text: string }) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("[email] RESEND_API_KEY is not configured; skipping email.");
    return { skipped: true };
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      authorization: `Bearer ${apiKey}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      from: senderEmail(),
      ...input,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "Resend email failed.");
  }

  return { skipped: false };
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatLabel(value: string) {
  return value === "both" ? "Print + Digital" : "Digital Only";
}

export async function sendCustomerConfirmationEmail(payload: ApplicationEmailPayload) {
  const firstName = payload.fullName.trim().split(/\s+/)[0] || "there";
  const refs = payload.refs.join(", ");
  const subject = payload.hasSecondTraveler
    ? "Your applications have been received — Apply IDP Online"
    : "Your application has been received — Apply IDP Online";

  const text = [
    `Hi ${firstName},`,
    "",
    `We received your ${APPLY_IDP_ONLINE_SITE_NAME} application${payload.hasSecondTraveler ? "s" : ""}.`,
    `Reference: ${refs}`,
    "",
    "What happens next:",
    "1. Our team reviews your application details and uploaded documents.",
    "2. If anything needs correction, we will email you.",
    "3. After review, we will send the next payment and delivery steps.",
    "",
    "Thank you,",
    "Apply IDP Online",
  ].join("\n");

  const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#172033">
      <h2>Application received</h2>
      <p>Hi ${escapeHtml(firstName)},</p>
      <p>We received your ${escapeHtml(APPLY_IDP_ONLINE_SITE_NAME)} application${payload.hasSecondTraveler ? "s" : ""}.</p>
      <p><strong>Reference:</strong> ${escapeHtml(refs)}</p>
      <h3>What happens next</h3>
      <ol>
        <li>Our team reviews your application details and uploaded documents.</li>
        <li>If anything needs correction, we will email you.</li>
        <li>After review, we will send the next payment and delivery steps.</li>
      </ol>
      <p>Thank you,<br />Apply IDP Online</p>
    </div>
  `;

  return sendEmail({ to: payload.email, subject, html, text });
}

export async function sendAdminNotificationEmail(payload: ApplicationEmailPayload) {
  const recipient = process.env.OWNER_ADMIN_EMAIL || process.env.ADMIN_EMAIL;
  if (!recipient) {
    console.warn("[email] OWNER_ADMIN_EMAIL is not configured; skipping admin notification.");
    return { skipped: true };
  }

  const refs = payload.refs.join(", ");
  const subject = `New Apply IDP Online application: ${refs}`;
  const text = [
    "New Apply IDP Online application submitted.",
    "",
    `Reference: ${refs}`,
    `Applicant: ${payload.fullName}`,
    `Email: ${payload.email}`,
    `Phone: ${payload.phone}`,
    `Destination: ${payload.destinationCountry}`,
    `Package: ${formatLabel(payload.format)} / ${payload.validityYears} year(s)`,
    `Submitted value: $${payload.total} USD`,
    `Second traveler: ${payload.hasSecondTraveler ? "Yes" : "No"}`,
  ].join("\n");

  const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#172033">
      <h2>New Apply IDP Online application</h2>
      <p><strong>Reference:</strong> ${escapeHtml(refs)}</p>
      <p><strong>Applicant:</strong> ${escapeHtml(payload.fullName)}</p>
      <p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(payload.phone)}</p>
      <p><strong>Destination:</strong> ${escapeHtml(payload.destinationCountry)}</p>
      <p><strong>Package:</strong> ${escapeHtml(formatLabel(payload.format))} / ${escapeHtml(payload.validityYears)} year(s)</p>
      <p><strong>Submitted value:</strong> $${payload.total} USD</p>
      <p><strong>Second traveler:</strong> ${payload.hasSecondTraveler ? "Yes" : "No"}</p>
    </div>
  `;

  return sendEmail({ to: recipient, subject, html, text });
}

