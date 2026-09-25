import { useState, type FormEvent } from "react";
import { Check, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PACKS, type PackId } from "@/lib/product";
import { captureAttribution, useOrder } from "@/lib/order-store";
import { formatUaPhone, isValidUaPhone } from "@/lib/phone";
import { submitLead } from "@/lib/submit-lead";
import { cn } from "@/lib/utils";

type Props = {
  id?: string;
  compact?: boolean;
};

export function OrderForm({ id = "order", compact = false }: Props) {
  const pack = useOrder((s) => s.pack);
  const setPack = useOrder((s) => s.setPack);
  const status = useOrder((s) => s.status);
  const setStatus = useOrder((s) => s.setStatus);
  const error = useOrder((s) => s.error);
  const setError = useOrder((s) => s.setError);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+380 ");
  const [fieldError, setFieldError] = useState<{ name?: string; phone?: string }>({});

  if (status === "success") {
    const chosen = PACKS[pack];
    return (
      <div
        id={id}
        className="rounded-2xl bg-surface p-6 shadow-[var(--shadow-border)] md:p-7"
      >
        <div className="flex size-12 items-center justify-center rounded-full bg-primary/15 text-primary">
          <Check className="size-6" strokeWidth={2.4} />
        </div>
        <h3 className="font-display mt-4 text-2xl leading-tight text-fg">
          Заявку прийнято
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Оператор зателефонує протягом 15 хвилин, щоб підтвердити доставку{" "}
          <span className="text-fg">
            {chosen.jars} {chosen.jars === 1 ? "банки" : "банок"} за {chosen.price} грн
          </span>
          . Нова Пошта, оплата при отриманні.
        </p>
      </div>
    );
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const next: { name?: string; phone?: string } = {};
    if (name.trim().length < 2) next.name = "Вкажіть імʼя";
    if (!isValidUaPhone(phone)) next.phone = "Номер у форматі +380 XX XXX XX XX";
    setFieldError(next);
    if (next.name || next.phone) return;

    setStatus("submitting");
    setError(null);
    try {
      await submitLead({
        name,
        phone,
        pack,
        ...captureAttribution(),
      });
      window.fbq?.("track", "Lead");
      setStatus("success");
    } catch {
      setStatus("error");
      setError("Не вдалося надіслати. Перевірте мережу і спробуйте ще раз.");
    }
  }

  return (
    <form
      id={id}
      onSubmit={onSubmit}
      noValidate
      className={cn(
        "scroll-mt-20 rounded-2xl bg-surface p-4 shadow-[var(--shadow-border)] sm:p-5",
        compact && "p-4",
      )}
    >
      <div className="flex items-end justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
            Замовлення
          </p>
          <h3 className="font-display mt-1 text-2xl leading-tight text-fg">
            Отримати пасту
          </h3>
        </div>
        <p className="text-right text-[11px] leading-snug text-subtle">
          Передзвінок
          <br />
          за 15 хв
        </p>
      </div>

      <div className="mt-4 grid gap-2">
        {(Object.keys(PACKS) as PackId[]).map((key) => {
          const item = PACKS[key];
          const selected = pack === key;
          return (
            <label
              key={key}
              className={cn(
                "relative flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 transition-[background-color,box-shadow] duration-[var(--motion-quick)]",
                selected
                  ? "bg-primary/10 shadow-[inset_0_0_0_1px_var(--color-primary)]"
                  : "bg-bg/50 shadow-[inset_0_0_0_1px_var(--color-border)]",
              )}
            >
              <input
                type="radio"
                name={`${id}-pack`}
                className="sr-only"
                checked={selected}
                onChange={() => setPack(key)}
              />
              <span
                className={cn(
                  "grid size-4 shrink-0 place-items-center rounded-full",
                  selected
                    ? "bg-primary"
                    : "shadow-[inset_0_0_0_1px_var(--color-muted)]",
                )}
              >
                {selected ? (
                  <span className="size-1.5 rounded-full bg-primary-fg" />
                ) : null}
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-fg">{item.title}</span>
                  {item.badge ? (
                    <span className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-accent-fg">
                      {item.badge}
                    </span>
                  ) : null}
                </span>
                <span className="mt-0.5 block text-xs text-muted">{item.subtitle}</span>
              </span>
              <span className="text-right">
                {item.oldPrice ? (
                  <span className="block text-xs text-subtle line-through">
                    {item.oldPrice} грн
                  </span>
                ) : null}
                <span className="block text-sm font-semibold tabular-nums text-fg">
                  {item.price} грн
                </span>
              </span>
            </label>
          );
        })}
      </div>

      <div className="mt-4 grid gap-3">
        <div className="grid gap-1.5">
          <Label htmlFor={`${id}-name`}>Імʼя</Label>
          <Input
            id={`${id}-name`}
            name="name"
            autoComplete="name"
            placeholder="Як до вас звертатись"
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-invalid={Boolean(fieldError.name)}
          />
          {fieldError.name ? (
            <p className="text-xs text-accent">{fieldError.name}</p>
          ) : null}
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor={`${id}-phone`}>Телефон</Label>
          <Input
            id={`${id}-phone`}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="+380 67 000 00 00"
            value={phone}
            onChange={(e) => setPhone(formatUaPhone(e.target.value))}
            aria-invalid={Boolean(fieldError.phone)}
          />
          {fieldError.phone ? (
            <p className="text-xs text-accent">{fieldError.phone}</p>
          ) : null}
        </div>
      </div>

      {error ? <p className="mt-3 text-sm text-accent">{error}</p> : null}

      <Button type="submit" className="mt-4 w-full text-[15px]" disabled={status === "submitting"}>
        {status === "submitting" ? (
          <>
            <LoaderCircle className="size-4 animate-spin" />
            Надсилаємо
          </>
        ) : pack === "promo" ? (
          "Замовити 3 банки за 1 198 грн"
        ) : (
          "Замовити 1 банку за 599 грн"
        )}
      </Button>
      <p className="mt-3 text-center text-[11px] leading-relaxed text-subtle">
        Нова Пошта · оплата при отриманні · без передоплати
      </p>
    </form>
  );
}

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}
