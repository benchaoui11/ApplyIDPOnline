import { APPLICATIONS_TABLE, APPLY_IDP_ONLINE_SITE_ID } from "@/lib/site";

export type ApplicationInsertRow = {
  ref: string;
  status: "submitted";
  format: string | null;
  validity_years: number | null;
  destination_country: string | null;
  total: number | null;
  currency: "USD";
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  phone: string | null;
  license_category: string | null;
  group_ref: string | null;
  is_companion: boolean;
  file_selfie: string | null;
  file_license_front: string | null;
  file_license_back: string | null;
  file_signature: string | null;
};

export type VisitorInsertRow = {
  session_id: string | null;
  country: string | null;
  browser: string | null;
  os: string | null;
  device: string | null;
  referrer: string | null;
  landing_page: string | null;
};

function supabaseUrl() {
  return process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
}

function serviceRoleKey() {
  return process.env.SUPABASE_SERVICE_ROLE_KEY;
}

function requireSupabaseConfig() {
  const url = supabaseUrl();
  const key = serviceRoleKey();

  if (!url || !key) {
    throw new Error("Supabase server credentials are not configured.");
  }

  return { url: url.replace(/\/$/, ""), key };
}

function supabaseHeaders(key: string, extra?: HeadersInit): HeadersInit {
  return {
    apikey: key,
    authorization: `Bearer ${key}`,
    ...extra,
  };
}

async function insertRestRow(table: string, row: Record<string, unknown>) {
  const { url, key } = requireSupabaseConfig();
  const response = await fetch(`${url}/rest/v1/${table}`, {
    method: "POST",
    headers: supabaseHeaders(key, {
      "content-type": "application/json",
      prefer: "return=minimal",
    }),
    body: JSON.stringify(row),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => null);
    if (error?.code === "23505") return { duplicate: true };
    throw new Error(error?.message || `Could not write ${table}.`);
  }

  return { duplicate: false };
}

export async function insertApplication(row: ApplicationInsertRow) {
  return insertRestRow(APPLICATIONS_TABLE, {
    ...row,
    site_id: APPLY_IDP_ONLINE_SITE_ID,
  });
}

export async function insertVisitor(row: VisitorInsertRow) {
  return insertRestRow("visitors", {
    ...row,
    site_id: APPLY_IDP_ONLINE_SITE_ID,
    site_mode_at_visit: "offer",
  });
}

