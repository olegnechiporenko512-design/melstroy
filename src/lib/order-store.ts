import { create } from "zustand";
import type { PackId } from "@/lib/product";

type LeadStatus = "idle" | "submitting" | "success" | "error";

type OrderState = {
  pack: PackId;
  setPack: (pack: PackId) => void;
  status: LeadStatus;
  setStatus: (status: LeadStatus) => void;
  error: string | null;
  setError: (error: string | null) => void;
};

export const useOrder = create<OrderState>((set) => ({
  pack: "promo",
  setPack: (pack) => set({ pack }),
  status: "idle",
  setStatus: (status) => set({ status }),
  error: null,
  setError: (error) => set({ error }),
}));

export function scrollToOrder() {
  const node = document.getElementById("order");
  if (!node) return;
  node.scrollIntoView({ behavior: "smooth", block: "start" });
  const name = node.querySelector<HTMLInputElement>('input[name="name"]');
  window.setTimeout(() => name?.focus(), 400);
}

const ATTR_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "fbclid",
] as const;

export type LeadAttribution = Partial<Record<(typeof ATTR_KEYS)[number], string>>;

const ATTR_STORAGE = "welstroy-source";

export function captureAttribution(): LeadAttribution {
  if (typeof window === "undefined") return {};
  const existing = sessionStorage.getItem(ATTR_STORAGE);
  if (existing) {
    try {
      return JSON.parse(existing) as LeadAttribution;
    } catch {
      /* first-touch rewrite below */
    }
  }
  const params = new URLSearchParams(window.location.search);
  const attr: LeadAttribution = {};
  for (const key of ATTR_KEYS) {
    const value = params.get(key)?.trim();
    if (value) attr[key] = value.slice(0, 500);
  }
  sessionStorage.setItem(ATTR_STORAGE, JSON.stringify(attr));
  return attr;
}

/** @deprecated use captureAttribution */
export function captureSource(): string {
  const attr = captureAttribution();
  return ATTR_KEYS.map((key) => (attr[key] ? `${key}=${attr[key]}` : ""))
    .filter(Boolean)
    .join("&");
}
