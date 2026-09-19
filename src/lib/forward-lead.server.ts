import { PACKS, type PackId } from "@/lib/product";
import { env } from "@/lib/env.server";
import { isValidUaPhone, nationalDigits } from "@/lib/phone";

export type LeadRequest = {
  name?: unknown;
  phone?: unknown;
  pack?: unknown;
  utm_source?: unknown;
  utm_medium?: unknown;
  utm_campaign?: unknown;
  utm_content?: unknown;
  utm_term?: unknown;
  fbclid?: unknown;
};

const ATTR = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "fbclid",
] as const;

function clip(value: unknown, max = 500): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

export function webhookUrl(): string {
  return (
    env("LEADS_WEBHOOK_URL") ||
    env("APPS_SCRIPT_URL") ||
    env("GOOGLE_SCRIPT_URL") ||
    env("GAS_EXEC_URL") ||
    ""
  );
}

export function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim().slice(0, 64);
  return (
    request.headers.get("x-real-ip")?.trim() ||
    request.headers.get("cf-connecting-ip")?.trim() ||
    ""
  );
}

export function buildSheetPayload(input: LeadRequest, ip: string) {
  const name = clip(input.name, 80);
  if (name.length < 2) throw new Error("name");
  const phoneRaw = typeof input.phone === "string" ? input.phone : "";
  if (!isValidUaPhone(phoneRaw)) throw new Error("phone");

  const pack: PackId = input.pack === "one" ? "one" : "promo";
  const chosen = PACKS[pack];
  const variant =
    pack === "promo"
      ? `Акція 1+1=3 - ${chosen.price} грн`
      : `1 банка - ${chosen.price} грн`;

  const payload: Record<string, string | number> = {
    name,
    phone: "380" + nationalDigits(phoneRaw),
    quantity: chosen.jars,
    total: chosen.price,
    variant,
    ip,
  };
  for (const key of ATTR) {
    const value = clip(input[key]);
    if (value) payload[key] = value;
  }
  return payload;
}

export async function postToSheet(payload: Record<string, string | number>) {
  const url = webhookUrl();
  if (!url) {
    if (process.env.VERCEL) {
      throw new Error("missing-webhook");
    }
    console.warn("[lead] LEADS_WEBHOOK_URL is empty — preview accept");
    return { success: true, preview: true };
  }

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    redirect: "follow",
    signal: AbortSignal.timeout(15000),
  });

  const text = await res.text().catch(() => "");
  if (!res.ok) {
    console.error("[lead] webhook status", res.status, text.slice(0, 200));
    throw new Error("webhook");
  }
  try {
    const json = JSON.parse(text) as { success?: boolean };
    if (json.success === false) throw new Error("webhook-rejected");
  } catch (err) {
    if (err instanceof Error && err.message === "webhook-rejected") throw err;
  }
  return { success: true };
}
