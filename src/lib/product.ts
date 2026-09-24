export const PRODUCT = {
  brand: "Welstroy Energy",
  name: "Паста для потенції",
  latin: "Herbal Libido Paste",
  weightGrams: 150,
  dailyTsp: 1,
  courseDays: 30,
  price: 599,
  currency: "грн",
} as const;

export type PackId = "promo" | "one";

export const PACKS: Record<
  PackId,
  {
    id: PackId;
    title: string;
    subtitle: string;
    jars: number;
    days: number;
    price: number;
    oldPrice: number | null;
    badge: string | null;
    featured: boolean;
  }
> = {
  promo: {
    id: "promo",
    title: "Акція 1+1=3",
    subtitle: "Три банки за ціною двох · 90 днів курсу",
    jars: 3,
    days: 90,
    price: 1198,
    oldPrice: 1797,
    badge: "Вигідно",
    featured: true,
  },
  one: {
    id: "one",
    title: "1 банка",
    subtitle: "150 г · курс на 30 днів",
    jars: 1,
    days: 30,
    price: 599,
    oldPrice: null,
    badge: null,
    featured: false,
  },
};
