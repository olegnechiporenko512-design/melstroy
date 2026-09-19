import { useEffect, useMemo, useState } from "react";
import * as Accordion from "@radix-ui/react-accordion";
import {
  BadgeCheck,
  ChevronDown,
  Clock3,
  Droplets,
  Flame,
  ShieldCheck,
  Star,
  Truck,
} from "lucide-react";
import { OrderForm } from "@/components/landing/order-form";
import { StickyBar } from "@/components/landing/sticky-bar";
import { Countdown, remainingSetsToday } from "@/components/landing/countdown";
import { Button } from "@/components/ui/button";
import {
  FAQ,
  INGREDIENTS,
  PACKS,
  PAINS,
  PRODUCT,
  REVIEWS,
  STEPS,
  TRUST,
} from "@/lib/product";
import { captureAttribution, scrollToOrder } from "@/lib/order-store";
import { cn } from "@/lib/utils";

export function LandingPage() {
  const left = useMemo(() => remainingSetsToday(), []);
  useEffect(() => {
    captureAttribution();
  }, []);

  return (
    <div className="relative min-h-dvh bg-bg text-fg">
      <Header />
      <main>
        <Hero left={left} />
        <TrustBar />
        <Pain />
        <Mechanism />
        <Ingredients />
        <Course />
        <Reviews />
        <Offer left={left} />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <StickyBar />
    </div>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-bg/88 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <p className="font-display text-lg tracking-caps text-fg uppercase">Welstroy</p>
        <p className="rounded-full bg-accent px-2.5 py-1 text-xs font-semibold tracking-label text-accent-fg uppercase">
          1+1=3
        </p>
        <button
          type="button"
          onClick={scrollToOrder}
          className="hidden text-sm font-semibold text-primary sm:inline"
        >
          Замовити
        </button>
      </div>
    </header>
  );
}

function Hero({ left }: { left: number }) {
  return (
    <section className="relative">
      <div className="mx-auto grid max-w-6xl lg:grid-cols-2">
        <div className="relative h-64 sm:h-80 lg:h-auto lg:min-h-full">
          <img
            src="/hero.jpg"
            alt="Банка Welstroy Energy — паста для потенції на меду серед маки, граната і кориці"
            width={1122}
            height={1402}
            fetchPriority="high"
            className="absolute inset-0 size-full object-cover object-[50%_38%]"
          />
          <div className="absolute inset-0 bg-linear-to-t from-bg via-bg/25 to-transparent lg:bg-linear-to-r lg:from-transparent lg:via-transparent lg:to-bg/80" />
        </div>

        <div className="relative -mt-14 px-4 pb-24 sm:-mt-8 sm:px-6 md:pb-10 lg:mt-0 lg:py-10 lg:pr-8">
          <p className="inline-flex items-center gap-2 rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold tracking-label text-honey uppercase">
            Акція до півночі · <Countdown />
          </p>
          <h1 className="font-display mt-3 text-4xl leading-tight text-fg sm:text-5xl lg:text-6xl">
            Чоловіча сила
            <span className="mt-1 block text-primary">в одній ложці меду</span>
          </h1>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-muted sm:text-base">
            15 трав у натуральному меді. {PRODUCT.weightGrams} г · {PRODUCT.courseDays} днів
            курсу. Акція 1+1=3 — три банки за {PACKS.promo.price} грн.
          </p>
          <p className="mt-3 text-xs text-subtle">
            Сьогодні лишилось {left} акційних наборів · Нова Пошта, оплата при отриманні
          </p>
          <div className="mt-5 max-w-md">
            <OrderForm />
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustBar() {
  return (
    <section className="border-y border-border bg-surface">
      <div className="mx-auto grid max-w-6xl grid-cols-2 md:grid-cols-4">
        {TRUST.map((item, i) => (
          <div
            key={item.label}
            className={cn(
              "px-4 py-5",
              i % 2 === 1 && "border-l border-border",
              i >= 2 && "border-t border-border md:border-t-0",
              (i === 2 || i === 3) && "md:border-l",
            )}
          >
            <p className="text-sm font-semibold text-fg">{item.label}</p>
            <p className="mt-1 text-xs text-muted">{item.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Pain() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
      <p className="text-xs font-semibold tracking-caps text-primary uppercase">Знайомо</p>
      <h2 className="font-display mt-3 max-w-xl text-4xl leading-tight text-fg sm:text-5xl">
        Не вік зраджує. Зраджує запас сил.
      </h2>
      <div className="mt-10 grid gap-3 md:grid-cols-3">
        {PAINS.map((item) => (
          <article
            key={item.title}
            className="rounded-2xl bg-surface p-5 shadow-[var(--shadow-border)] sm:p-6"
          >
            <h3 className="font-display text-2xl leading-tight text-fg">{item.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">{item.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Mechanism() {
  return (
    <section className="relative overflow-hidden border-y border-border">
      <img src="/honey.jpg" alt="" className="absolute inset-0 size-full object-cover opacity-25" />
      <div className="absolute inset-0 bg-bg/80" />
      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:py-20 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="text-xs font-semibold tracking-caps text-primary uppercase">Як це працює</p>
          <h2 className="font-display mt-3 text-4xl leading-tight text-fg sm:text-5xl">
            Не пігулка на ніч. Опора на кожен день.
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted sm:text-base">
            Мед тримає екстракти в густій матриці. Одна ложка — і трави йдуть курсом: тонус,
            кровообіг, бажання, витривалість. Без удару по шлунку, як від купи капсул.
          </p>
          <div className="mt-8 grid gap-5">
            {STEPS.map((step) => (
              <div key={step.n} className="grid grid-cols-[auto_1fr] gap-4">
                <p className="font-display text-2xl text-primary">{step.n}</p>
                <div>
                  <h3 className="text-base font-semibold text-fg">{step.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="overflow-hidden rounded-2xl shadow-[var(--shadow-border)]">
          <img
            src="/paste.jpg"
            alt="Густа медова паста з рослинними включеннями"
            className="aspect-square w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}

function Ingredients() {
  const [open, setOpen] = useState<string>(INGREDIENTS[0].name);

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold tracking-caps text-primary uppercase">Склад</p>
        <h2 className="font-display mt-3 text-4xl leading-tight text-fg sm:text-5xl">
          П’ятнадцять трав. Одна ложка.
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
          Основа — натуральний мед. До нього зібрано рослини, які в традиційних системах беруть
          саме для чоловічого тонусу, витривалості й бажання. Натисніть рядок — відкриється роль у
          формулі.
        </p>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:items-start">
        <ul className="grid gap-px overflow-hidden rounded-2xl bg-border shadow-[var(--shadow-border)]">
          {INGREDIENTS.map((item) => {
            const active = open === item.name;
            return (
              <li key={item.name} className="bg-surface">
                <button
                  type="button"
                  onClick={() => setOpen(item.name)}
                  className="flex w-full items-start gap-3 px-4 py-3.5 text-left"
                  aria-expanded={active}
                >
                  <span className="mt-1 size-1.5 shrink-0 rounded-full bg-primary" />
                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-baseline gap-x-2">
                      <span className="text-sm font-semibold text-fg">{item.name}</span>
                      <span className="text-xs tracking-label text-subtle uppercase">
                        {item.role}
                      </span>
                    </span>
                    <span
                      className={cn(
                        "grid transition-[grid-template-rows,opacity] duration-[var(--motion-fast)] ease-[var(--ease-smooth-out)]",
                        active ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                      )}
                    >
                      <span className="overflow-hidden">
                        <span className="mt-1.5 block text-sm leading-relaxed text-muted">
                          {item.benefit}
                        </span>
                        <span className="mt-1 block text-xs italic text-subtle">{item.latin}</span>
                      </span>
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
        <div className="overflow-hidden rounded-2xl shadow-[var(--shadow-border)]">
          <img
            src="/ingredients.jpg"
            alt="Мака, кориця, гранат, імбир і бджолиний пилок на темному дереві"
            className="aspect-photo w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}

function Course() {
  return (
    <section className="border-y border-border bg-surface">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 sm:py-20 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="text-xs font-semibold tracking-caps text-primary uppercase">150 грамів</p>
          <h2 className="font-display mt-3 text-4xl leading-tight text-fg sm:text-5xl">
            Банка на 30 днів. Набір — на сезон.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
            Одна чайна ложка ≈ денна порція. {PRODUCT.weightGrams} г вистачає приблизно на{" "}
            {PRODUCT.courseDays} прийомів. Три банки за акцією — це 90 днів без «завтра замовлю ще».
          </p>
          <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-border">
            <Stat k="Вага" v="150 г" />
            <Stat k="Порція" v="1 ч. л." />
            <Stat k="Курс" v="30 днів" />
            <Stat k="Акція" v="90 днів" />
          </dl>
        </div>
        <div className="grid gap-3">
          <CourseCard
            icon={Droplets}
            title="Густа, не рідка"
            text="Мед тримає екстракти. Ложка — і готово. Ніяких 12 капсул на ранок."
          />
          <CourseCard
            icon={Flame}
            title="Смак пряного меду"
            text="Кориця, імбир, гранат. Їдять навіть ті, хто ненавидить «БАДи»."
          />
          <CourseCard
            icon={Clock3}
            title="Ритуал на 20 секунд"
            text="За 30 хвилин до їжі. Далі тіло працює само — вам не треба про це думати."
          />
        </div>
      </div>
    </section>
  );
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div className="bg-bg px-4 py-5">
      <dt className="text-xs tracking-label text-subtle uppercase">{k}</dt>
      <dd className="font-display mt-1 text-3xl text-fg">{v}</dd>
    </div>
  );
}

function CourseCard({
  icon: Icon,
  title,
  text,
}: {
  icon: typeof Droplets;
  title: string;
  text: string;
}) {
  return (
    <div className="flex gap-4 rounded-2xl bg-bg p-5 shadow-[var(--shadow-border)]">
      <Icon className="mt-0.5 size-5 shrink-0 text-primary" />
      <div>
        <h3 className="text-sm font-semibold text-fg">{title}</h3>
        <p className="mt-1 text-sm leading-relaxed text-muted">{text}</p>
      </div>
    </div>
  );
}

function Reviews() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
      <p className="text-xs font-semibold tracking-caps text-primary uppercase">Відгуки</p>
      <h2 className="font-display mt-3 max-w-xl text-4xl leading-tight text-fg sm:text-5xl">
        Чоловіки, які вже відкрили банку.
      </h2>
      <div className="mt-10 flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {REVIEWS.map((item) => (
          <article
            key={item.name}
            className="w-80 shrink-0 snap-start rounded-2xl bg-surface p-5 shadow-[var(--shadow-border)]"
          >
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="text-sm font-semibold text-fg">
                {item.name}, {item.age}
              </h3>
              <p className="text-xs text-subtle">{item.city}</p>
            </div>
            <p className="mt-1 flex gap-0.5 text-primary" aria-label="5 з 5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-3 fill-primary" />
              ))}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted">{item.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Offer({ left }: { left: number }) {
  return (
    <section className="relative overflow-hidden border-y border-border">
      <img src="/pomegranate.jpg" alt="" className="absolute inset-0 size-full object-cover opacity-20" />
      <div className="absolute inset-0 bg-bg/82" />
      <div className="relative mx-auto max-w-3xl px-4 py-16 sm:py-20">
        <p className="text-center text-xs font-semibold tracking-caps text-primary uppercase">
          Акція 1+1=3
        </p>
        <h2 className="font-display mt-3 text-center text-4xl leading-tight text-fg sm:text-5xl">
          Платите за дві. Забираєте три.
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-center text-sm leading-relaxed text-muted sm:text-base">
          Третя банка в подарунок. 90 днів курсу за ціною 60. До півночі лишилось <Countdown /> ·
          наборів сьогодні — {left}.
        </p>
        <div className="mt-10 overflow-hidden rounded-2xl bg-surface shadow-[var(--shadow-border)]">
          <div className="grid grid-cols-3 border-b border-border text-center text-xs tracking-label text-subtle uppercase">
            <p className="px-2 py-3">Набір</p>
            <p className="border-x border-border px-2 py-3">Дні</p>
            <p className="px-2 py-3">Ціна</p>
          </div>
          <OfferRow label="1 банка" days="30" price="890 грн" />
          <OfferRow label="3 банки" days="90" price="2 670 грн" muted />
          <OfferRow label="Акція 1+1=3" days="90" price="1 780 грн" highlight />
        </div>
        <div className="mt-6 flex justify-center">
          <Button className="min-w-60" onClick={scrollToOrder}>
            Забрати акційний набір
          </Button>
        </div>
        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          <OfferNote icon={Truck} text="Нова Пошта, 1–3 дні по Україні" />
          <OfferNote icon={ShieldCheck} text="Оплата при отриманні на відділенні" />
          <OfferNote icon={BadgeCheck} text="Не ліки. Харчовий продукт. 18+" />
        </div>
      </div>
    </section>
  );
}

function OfferRow({
  label,
  days,
  price,
  muted,
  highlight,
}: {
  label: string;
  days: string;
  price: string;
  muted?: boolean;
  highlight?: boolean;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-3 text-center text-sm",
        highlight ? "bg-primary/10 text-fg" : "text-muted",
        muted && !highlight && "line-through decoration-subtle/40",
      )}
    >
      <p className="px-2 py-4 font-medium">{label}</p>
      <p className="border-x border-border px-2 py-4 tabular-nums">{days}</p>
      <p className="px-2 py-4 font-semibold tabular-nums text-fg">{price}</p>
    </div>
  );
}

function OfferNote({ icon: Icon, text }: { icon: typeof Truck; text: string }) {
  return (
    <p className="flex items-start gap-2 text-xs leading-relaxed text-muted">
      <Icon className="mt-0.5 size-4 shrink-0 text-primary" />
      {text}
    </p>
  );
}

function Faq() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:py-20">
      <p className="text-xs font-semibold tracking-caps text-primary uppercase">Питання</p>
      <h2 className="font-display mt-3 text-4xl leading-tight text-fg sm:text-5xl">
        Коротко, без води.
      </h2>
      <Accordion.Root
        type="single"
        collapsible
        className="mt-8 divide-y divide-border border-y border-border"
      >
        {FAQ.map((item) => (
          <Accordion.Item key={item.q} value={item.q}>
            <Accordion.Header>
              <Accordion.Trigger className="group flex w-full items-center justify-between gap-4 py-4 text-left text-sm font-semibold text-fg sm:text-base">
                {item.q}
                <ChevronDown className="size-4 shrink-0 text-muted transition-transform duration-[var(--motion-fast)] ease-[var(--ease-out)] group-data-[state=open]:rotate-180" />
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content className="overflow-hidden">
              <p className="pb-4 text-sm leading-relaxed text-muted">{item.a}</p>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="border-t border-border bg-surface px-4 py-16 sm:py-20">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2 lg:items-center">
        <div>
          <h2 className="font-display text-4xl leading-tight text-fg sm:text-5xl">
            Залиште номер — і банка вже їде.
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted sm:text-base">
            Оператор підтвердить замовлення, відправимо Новою Поштою. Платите, коли візьмете
            посилку в руки. Акція 1+1=3 діє, поки є набір.
          </p>
        </div>
        <OrderForm id="order-bottom" />
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border px-4 py-10 pb-28 md:pb-10">
      <div className="mx-auto max-w-6xl">
        <p className="font-display text-lg tracking-caps uppercase">Welstroy Energy</p>
        <p className="mt-2 text-sm text-muted">
          {PRODUCT.name} · {PRODUCT.weightGrams} г · {PRODUCT.latin}
        </p>
        <p className="mt-6 max-w-3xl text-xs leading-relaxed text-subtle">
          Welstroy Energy є харчовим продуктом (паста на основі натурального меду з рослинними
          екстрактами) і не є лікарським засобом. Не призначений для діагностики, лікування чи
          профілактики захворювань. Результат індивідуальний. При алергії на продукти бджільництва,
          мед, пилок або будь-який компонент складу — не вживати. За хронічних станів порадьтеся з
          лікарем. Лише для повнолітніх. 18+.
        </p>
      </div>
    </footer>
  );
}
