/**
 * Submit a lead to the lead API.
 * Requires NEXT_PUBLIC_LEAD_API_URL and NEXT_PUBLIC_LEAD_API_KEY at build time.
 */
export type LeadPayload = {
  source: "contact" | "lead" | "estimate";
  name: string;
  phone: string;
  email?: string;
  message?: string;
  projectType?: string;
  service?: string;
  scope?: string;
  address?: string;
  addressOptional?: string;
  notes?: string;
  lead_source?: string;
  zip?: string;
  utm?: Record<string, string>;
};

export async function submitLead(payload: LeadPayload): Promise<boolean> {
  const url = process.env.NEXT_PUBLIC_LEAD_API_URL?.trim();
  const apiKey = process.env.NEXT_PUBLIC_LEAD_API_KEY?.trim();
  if (!url || !apiKey) return false;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      api_key: apiKey,
    },
    body: JSON.stringify(payload),
  });
  return res.ok;
}
