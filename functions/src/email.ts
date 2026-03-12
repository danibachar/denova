import type { LeadData } from "./schemas";

const LEAD_EMAIL = "info@danovarenovations.com";

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildEmailHtml(data: LeadData): string {
  const rows: string[] = [];

  if (data.lead_source)
    rows.push(`<p><strong>Source:</strong> ${escapeHtml(data.lead_source)}</p>`);
  rows.push(`<p><strong>Name:</strong> ${escapeHtml(data.name)}</p>`);
  if (data.email)
    rows.push(`<p><strong>Email:</strong> ${escapeHtml(data.email)}</p>`);
  rows.push(`<p><strong>Phone:</strong> ${escapeHtml(data.phone)}</p>`);

  if (data.projectType)
    rows.push(
      `<p><strong>Project Type:</strong> ${escapeHtml(data.projectType)}</p>`
    );
  if (data.service)
    rows.push(`<p><strong>Service:</strong> ${escapeHtml(data.service)}</p>`);
  if (data.zip)
    rows.push(`<p><strong>Zip:</strong> ${escapeHtml(data.zip)}</p>`);
  if (data.addressOptional)
    rows.push(
      `<p><strong>Address:</strong> ${escapeHtml(data.addressOptional)}</p>`
    );
  if (data.address)
    rows.push(`<p><strong>Address:</strong> ${escapeHtml(data.address)}</p>`);
  if (data.scope)
    rows.push(
      `<p><strong>Scope:</strong> ${escapeHtml(data.scope).replace(/\n/g, "<br>")}</p>`
    );
  if (data.message)
    rows.push(
      `<p><strong>Message:</strong></p><p>${escapeHtml(data.message).replace(/\n/g, "<br>")}</p>`
    );
  if (data.notes)
    rows.push(
      `<p><strong>Notes:</strong></p><p>${escapeHtml(data.notes).replace(/\n/g, "<br>")}</p>`
    );
  if (data.utm && Object.keys(data.utm).length) {
    rows.push(
      `<p><strong>UTM:</strong> ${escapeHtml(JSON.stringify(data.utm))}</p>`
    );
  }

  return `<h2>New website lead - ${data.source}</h2>${rows.join("")}`;
}

export interface EmailEnv {
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
  // GOOGLE_REFRESH_TOKEN: string;
}

export async function sendLeadEmail(
  data: LeadData,
  env: EmailEnv
): Promise<{ id?: string } | null> {
  console.log("[email] Fetching Gmail access token");
  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: env.GOOGLE_CLIENT_ID,
      client_secret: env.GOOGLE_CLIENT_SECRET,
      // refresh_token: env.GOOGLE_REFRESH_TOKEN,
      grant_type: "client_credentials",
    }),
  });
  if (!tokenRes.ok) {
    const errBody = await tokenRes.text();
    console.error("[email] Token fetch failed", { status: tokenRes.status, body: errBody });
    return null;
  }

  const tokenData = (await tokenRes.json()) as { access_token?: string; error?: string };
  const accessToken = tokenData.access_token;
  if (!accessToken) {
    console.error("[email] No access_token in response", { tokenData });
    return null;
  }
  console.log("[email] Access token obtained");

  const html = buildEmailHtml(data);
  const subject = `Danova Lead - ${data.source} - ${data.name}`;
  const raw = [
    `From: Danova <${LEAD_EMAIL}>`,
    `To: ${LEAD_EMAIL}`,
    `Subject: ${subject}`,
    "MIME-Version: 1.0",
    "Content-Type: text/html; charset=UTF-8",
    "",
    `<html><body>${html}</body></html>`,
  ].join("\r\n");

  const bytes = new TextEncoder().encode(raw);
  let binary = "";
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
  const rawB64 = btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

  const sendRes = await fetch(
    "https://gmail.googleapis.com/gmail/v1/users/me/messages/send",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ raw: rawB64 }),
    }
  );

  if (!sendRes.ok) {
    const errBody = await sendRes.text();
    console.error("[email] Gmail send failed", { status: sendRes.status, body: errBody });
    return null;
  }

  const result = (await sendRes.json()) as { id?: string };
  console.log("[email] Email sent", { id: result.id });
  return result;
}
