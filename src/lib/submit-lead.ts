import { PACKS, type PackId } from "@/lib/product";
import { isValidUaPhone, nationalDigits } from "@/lib/phone";
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
  const chosen = PACKS[pack];
  const phone = `380${nationalDigits(input.phone)}`;
  const variant =
    pack === "promo" ? `Акція 1+1=3 - ${chosen.price} грн` : `1 банка - ${chosen.price} грн`;

  const res = await fetch("/api/lead", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      phone,
      pack,
      variant,
      total: chosen.price,
      quantity: chosen.jars,
      page: typeof window !== "undefined" ? window.location.href : "",
      utm_source: input.utm_source,
      utm_medium: input.utm_medium,
      utm_campaign: input.utm_campaign,
      utm_content: input.utm_content,
      utm_term: input.utm_term,
      fbclid: input.fbclid,
      fbp: readCookie("_fbp"),
      fbc: readCookie("_fbc"),
    }),
  });

  let data: { success?: boolean; order_id?: string } | null = null;
  try {
    data = (await res.json()) as { success?: boolean; order_id?: string };
  } catch {
    data = null;
  }
  if (!res.ok || data?.success !== true) {
    throw new Error("Не вдалося відправити, спробуйте ще раз");
  }

  return {
    ok: true as const,
    pack,
    price: chosen.price,
    quantity: chosen.jars,
    variant,
    phone,
    orderId: typeof data.order_id === "string" ? data.order_id : "",
  };
}

function readCookie(name: string): string {
  if (typeof document === "undefined") return "";
  const prefix = `${name}=`;
  for (const part of document.cookie.split(";")) {
    const item = part.trim();
    if (item.startsWith(prefix)) return decodeURIComponent(item.slice(prefix.length));
  }
  return "";
}
