import { createServerFn } from "@tanstack/react-start";
import { PACKS, type PackId } from "@/lib/product";
import { isValidUaPhone, toE164 } from "@/lib/phone";
import { LEADS_WEBHOOK_URL } from "@/lib/leads-config";

export type LeadInput = {
  name: string;
  phone: string;
  pack: PackId;
  source?: string;
};

function normalizeLead(input: LeadInput): {
  name: string;
  phone: string;
  pack: PackId;
  price: number;
  jars: number;
  source: string;
} {
  const name = input.name.trim().replace(/\s+/g, " ");
  if (name.length < 2 || name.length > 80) {
    throw new Error("Вкажіть імʼя");
  }
  if (!isValidUaPhone(input.phone)) {
    throw new Error("Вкажіть номер у форматі +380 XX XXX XX XX");
  }
  const pack = input.pack === "one" ? "one" : "promo";
  return {
    name,
    phone: toE164(input.phone),
    pack,
    price: PACKS[pack].price,
    jars: PACKS[pack].jars,
    source: (input.source ?? "").slice(0, 500),
  };
}

export const submitLead = createServerFn({ method: "POST" })
  .validator((input: LeadInput) => normalizeLead(input))
  .handler(async ({ data }) => {
    const payload = {
      ...data,
      createdAt: new Date().toISOString(),
      page: "welstroy-energy",
    };

    if (LEADS_WEBHOOK_URL) {
      const res = await fetch(LEADS_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        throw new Error("Не вдалося надіслати заявку. Спробуйте ще раз.");
      }
    }

    return { ok: true as const, pack: data.pack, price: data.price };
  });
