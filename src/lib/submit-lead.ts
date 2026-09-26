import { PACKS, type PackId } from "@/lib/product";
import { isValidUaPhone, toE164 } from "@/lib/phone";
import type { LeadAttribution } from "@/lib/order-store";

export type LeadInput = {
  name: string;
  phone: string;
  pack: PackId;
} & LeadAttribution;

export async function submitLead(input: LeadInput) {
  const name = input.name.trim().replace(/\s+/g, " ");
  if (name.length < 2 || name.length > 80) {
    throw new Error("Вкажіть імʼя");
  }
  if (!isValidUaPhone(input.phone)) {
    throw new Error("Вкажіть номер у форматі +380 XX XXX XX XX");
  }
  const pack = input.pack === "one" ? "one" : "promo";

  const res = await fetch("/api/lead", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      phone: toE164(input.phone),
      pack,
      utm_source: input.utm_source,
      utm_medium: input.utm_medium,
      utm_campaign: input.utm_campaign,
      utm_content: input.utm_content,
      utm_term: input.utm_term,
      fbclid: input.fbclid,
    }),
  });

  let data: { success?: boolean } | null = null;
  try {
    data = (await res.json()) as { success?: boolean };
  } catch {
    data = null;
  }
  if (!res.ok || data?.success !== true) {
    throw new Error("Не вдалося надіслати заявку. Спробуйте ще раз.");
  }

  return { ok: true as const, pack, price: PACKS[pack].price };
}
