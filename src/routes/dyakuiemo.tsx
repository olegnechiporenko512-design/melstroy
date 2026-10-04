import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

const PIXEL_ID = "3557729764386334";
const ORDER_KEY = "dyakuiemo_order";
const HAS_TIKTOK = false;

type SavedOrder = {
  order_id: string;
  name: string;
  phone: string;
  variant: string;
  quantity: number;
  total: number;
  product: string;
};

export const Route = createFileRoute("/dyakuiemo")({
  head: () => ({
    meta: [{ title: "Дякуємо" }, { name: "robots", content: "noindex" }],
  }),
  component: ThanksPage,
});

function readOrder(): SavedOrder | null {
  try {
    const raw = sessionStorage.getItem(ORDER_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as Partial<SavedOrder>;
    if (!data || typeof data.order_id !== "string" || !data.order_id) return null;
    if (typeof data.name !== "string" || typeof data.phone !== "string") return null;
    if (typeof data.variant !== "string" || typeof data.total !== "number") return null;
    return {
      order_id: data.order_id,
      name: data.name,
      phone: data.phone,
      variant: data.variant,
      quantity: typeof data.quantity === "number" ? data.quantity : 1,
      total: data.total,
      product: typeof data.product === "string" ? data.product : "",
    };
  } catch {
    return null;
  }
}

function firePixels(order: SavedOrder) {
  const fbq = (window as Window & { fbq?: (...args: unknown[]) => void }).fbq;
  const fn = order.name.trim().toLowerCase();
  try {
    fbq?.("set", "autoConfig", false, PIXEL_ID);
    fbq?.("init", PIXEL_ID, { ph: order.phone, fn });
    fbq?.("track", "PageView");
  } catch {
    /* pixel must not break the page */
  }
  const key = `sent_${order.order_id}`;
  if (localStorage.getItem(key) === "1") return;
  localStorage.setItem(key, "1");
  try {
    fbq?.(
      "track",
      "Lead",
      { value: order.total, currency: "UAH", content_name: order.variant },
      { eventID: order.order_id },
    );
    fbq?.(
      "track",
      "Purchase",
      { value: order.total, currency: "UAH", content_name: order.variant },
      { eventID: order.order_id },
    );
  } catch {
    /* pixel must not break the page */
  }
  if (!HAS_TIKTOK) return;
  const ttq = (
    window as Window & {
      ttq?: {
        identify?: (payload: Record<string, string>) => void;
        track?: (event: string, payload?: Record<string, unknown>, options?: Record<string, unknown>) => void;
      };
    }
  ).ttq;
  try {
    ttq?.identify?.({ phone_number: `+${order.phone}` });
    ttq?.track?.("SubmitForm", { value: order.total, currency: "UAH" }, { event_id: order.order_id });
  } catch {
    /* pixel must not break the page */
  }
}

function ThanksPage() {
  const [order, setOrder] = useState<SavedOrder | null | undefined>(undefined);

  useEffect(() => {
    const saved = readOrder();
    setOrder(saved);
    if (saved) firePixels(saved);
  }, []);

  if (order === undefined) return <main className="min-h-screen bg-bg" />;

  return (
    <main className="mx-auto flex min-h-screen max-w-xl flex-col justify-center bg-bg px-4 py-16 text-fg">
      <div className="rounded-2xl bg-surface p-6 shadow-[var(--shadow-border)]">
        {order ? (
          <>
            <h1 className="text-3xl leading-tight">
              Дякуємо, {order.name}! Замовлення №{order.order_id} прийнято
            </h1>
            {order.product ? <p className="mt-4 text-sm text-muted">{order.product}</p> : null}
            <p className="mt-2 text-sm">{order.variant}</p>
            <p className="mt-2 text-sm font-semibold">Сума: {order.total} грн</p>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Менеджер зателефонує найближчим часом для підтвердження. Оплата при отриманні на Новій
              Пошті.
            </p>
          </>
        ) : (
          <>
            <h1 className="text-3xl leading-tight">Дякуємо!</h1>
            <p className="mt-4 text-sm">
              <a className="underline" href="/">
                На головну
              </a>
            </p>
          </>
        )}
      </div>
      <div id="upsell" />
    </main>
  );
}
