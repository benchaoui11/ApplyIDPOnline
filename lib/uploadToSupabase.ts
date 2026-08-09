import { APPLY_IDP_ONLINE_SITE_SLUG, DOCUMENTS_BUCKET } from "@/lib/site";

type DocumentSlot = "front" | "back" | "selfie" | "signature";

function publicSupabaseConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error("Supabase upload is not configured. Please try again shortly.");
  }

  return { url: url.replace(/\/$/, ""), key };
}

function extensionFromContentType(contentType: string) {
  if (contentType.includes("jpeg")) return "jpg";
  if (contentType.includes("png")) return "png";
  if (contentType.includes("webp")) return "webp";
  if (contentType.includes("pdf")) return "pdf";
  return "bin";
}

function encodeStoragePath(path: string) {
  return path.split("/").map(encodeURIComponent).join("/");
}

export async function uploadToSupabaseDocument(file: File | Blob, ref: string, slot: DocumentSlot): Promise<string> {
  const { url, key } = publicSupabaseConfig();
  const contentType = file.type || "application/octet-stream";
  const ext = extensionFromContentType(contentType);
  const path = `${APPLY_IDP_ONLINE_SITE_SLUG}/${ref}/${slot}.${ext}`;

  const response = await fetch(`${url}/storage/v1/object/${DOCUMENTS_BUCKET}/${encodeStoragePath(path)}`, {
    method: "POST",
    headers: {
      apikey: key,
      authorization: `Bearer ${key}`,
      "content-type": contentType,
      "x-upsert": "true",
    },
    body: file,
  });

  if (!response.ok) {
    throw new Error("Could not upload your document. Please try again.");
  }

  return path;
}

