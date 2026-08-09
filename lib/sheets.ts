import { google } from "googleapis";

export type ApplicationRow = {
  ref: string;
  submittedAt: string;
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  sex: string;
  countryOfBirth: string;
  countryOfResidence: string;
  destinationCountry: string;
  licenseCategories: string;
  validityYears: string;
  format: string;
  licenseFrontUrl: string;
  licenseBackUrl: string;
  passportPhotoUrl: string;
  signatureUrl: string;
};

/**
 * Appends one row to the "Applications" sheet.
 *
 * Required env vars:
 *  - GOOGLE_SERVICE_ACCOUNT_EMAIL
 *  - GOOGLE_PRIVATE_KEY   (escaped newlines as \n)
 *  - GOOGLE_SHEET_ID
 */
export async function appendApplicationRow(row: ApplicationRow) {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");
  const sheetId = process.env.GOOGLE_SHEET_ID;

  if (!email || !privateKey || !sheetId) {
    throw new Error(
      "Google Sheets is not configured. Set GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY and GOOGLE_SHEET_ID."
    );
  }

  const auth = new google.auth.JWT({
    email,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  await sheets.spreadsheets.values.append({
    spreadsheetId: sheetId,
    range: "Applications!A:Q",
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: {
      values: [
        [
          row.ref,
          row.submittedAt,
          row.fullName,
          row.email,
          row.phone,
          row.dateOfBirth,
          row.sex,
          row.countryOfBirth,
          row.countryOfResidence,
          row.destinationCountry,
          row.licenseCategories,
          row.validityYears,
          row.format,
          row.licenseFrontUrl,
          row.licenseBackUrl,
          row.passportPhotoUrl,
          row.signatureUrl,
        ],
      ],
    },
  });
}

export async function appendContactRow(row: { name: string; email: string; message: string; submittedAt: string }) {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");
  const sheetId = process.env.GOOGLE_SHEET_ID;

  if (!email || !privateKey || !sheetId) {
    throw new Error(
      "Google Sheets is not configured. Set GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY and GOOGLE_SHEET_ID."
    );
  }

  const auth = new google.auth.JWT({
    email,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  await sheets.spreadsheets.values.append({
    spreadsheetId: sheetId,
    range: "ContactMessages!A:D",
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: {
      values: [[row.submittedAt, row.name, row.email, row.message]],
    },
  });
}
