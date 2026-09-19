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

export function captureSource(): string {
  if (typeof window === "undefined") return "";
  const key = "welstroy-source";
  const existing = sessionStorage.getItem(key);
  if (existing) return existing;
  const params = new URLSearchParams(window.location.search);
  const bits = [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_content",
    "utm_term",
    "fbclid",
  ]
    .map((k) => {
      const v = params.get(k);
      return v ? `${k}=${v}` : "";
    })
    .filter(Boolean)
    .join("&");
  sessionStorage.setItem(key, bits);
  return bits;
}
