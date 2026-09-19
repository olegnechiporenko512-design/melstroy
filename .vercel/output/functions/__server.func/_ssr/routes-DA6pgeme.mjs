import { i as __toESM } from "../_runtime.mjs";
import { a as Trigger2, c as require_react, i as Root2, n as Header$1, r as Item, s as require_jsx_runtime, t as Content2 } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { a as LoaderCircle, c as Clock3, d as BadgeCheck, i as ShieldCheck, l as ChevronDown, o as Flame, r as Star, s as Droplets, t as Truck, u as Check } from "../_libs/lucide-react.mjs";
import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
import { a as PRODUCT, c as TRUST, d as toE164, i as PAINS, l as formatUaPhone, n as INGREDIENTS, o as REVIEWS, r as PACKS, s as STEPS, t as FAQ, u as isValidUaPhone } from "./phone-NNQxr2de.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { t as create } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DA6pgeme.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var variants = {
	primary: "bg-primary text-primary-fg shadow-[0_1px_0_rgba(255,255,255,0.18)_inset,0_12px_28px_-12px_rgba(212,162,87,0.55)] hover:bg-honey",
	accent: "bg-accent text-accent-fg hover:bg-accent/90",
	ghost: "bg-transparent text-fg hover:bg-fg/6",
	outline: "bg-transparent text-fg ring-1 ring-border hover:bg-fg/6"
};
var Button = (0, import_react.forwardRef)(function Button({ className, variant = "primary", type = "button", ...props }, ref) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		ref,
		type,
		className: cn("inline-flex min-h-12 items-center justify-center gap-2 rounded-lg px-5 text-sm font-semibold tracking-wide", "transition-[background-color,transform,box-shadow] duration-[var(--motion-quick)] ease-[var(--ease-out)]", "active:not-disabled:scale-[0.96] disabled:pointer-events-none disabled:opacity-50", "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary", variants[variant], className),
		...props
	});
});
var Input = (0, import_react.forwardRef)(function Input({ className, ...props }, ref) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		ref,
		className: cn("h-12 w-full rounded-lg bg-bg px-4 text-base text-fg", "shadow-[inset_0_0_0_1px_var(--color-border)]", "placeholder:text-subtle", "transition-[box-shadow] duration-[var(--motion-quick)] ease-[var(--ease-out)]", "focus:shadow-[inset_0_0_0_1px_var(--color-primary),0_0_0_3px_color-mix(in_oklab,var(--color-primary)_28%,transparent)]", "focus-visible:outline-none", className),
		...props
	});
});
function Label({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
		className: cn("block text-xs font-medium tracking-wide text-muted", className),
		...props
	});
}
var useOrder = create((set) => ({
	pack: "promo",
	setPack: (pack) => set({ pack }),
	status: "idle",
	setStatus: (status) => set({ status }),
	error: null,
	setError: (error) => set({ error })
}));
function scrollToOrder() {
	const node = document.getElementById("order");
	if (!node) return;
	node.scrollIntoView({
		behavior: "smooth",
		block: "start"
	});
	const name = node.querySelector("input[name=\"name\"]");
	window.setTimeout(() => name?.focus(), 400);
}
function captureSource() {
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
		"fbclid"
	].map((k) => {
		const v = params.get(k);
		return v ? `${k}=${v}` : "";
	}).filter(Boolean).join("&");
	sessionStorage.setItem(key, bits);
	return bits;
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
function normalizeLead(input) {
	const name = input.name.trim().replace(/\s+/g, " ");
	if (name.length < 2 || name.length > 80) throw new Error("Вкажіть імʼя");
	if (!isValidUaPhone(input.phone)) throw new Error("Вкажіть номер у форматі +380 XX XXX XX XX");
	const pack = input.pack === "one" ? "one" : "promo";
	return {
		name,
		phone: toE164(input.phone),
		pack,
		price: PACKS[pack].price,
		jars: PACKS[pack].jars,
		source: (input.source ?? "").slice(0, 500)
	};
}
var submitLead = createServerFn({ method: "POST" }).validator((input) => normalizeLead(input)).handler(createSsrRpc("29b8cab67d2eb6de95ec29ee4457dbc6f42911c0e50f778cac9a3e3299c1d780"));
function OrderForm({ id = "order", compact = false }) {
	const pack = useOrder((s) => s.pack);
	const setPack = useOrder((s) => s.setPack);
	const status = useOrder((s) => s.status);
	const setStatus = useOrder((s) => s.setStatus);
	const error = useOrder((s) => s.error);
	const setError = useOrder((s) => s.setError);
	const [name, setName] = (0, import_react.useState)("");
	const [phone, setPhone] = (0, import_react.useState)("+380 ");
	const [fieldError, setFieldError] = (0, import_react.useState)({});
	if (status === "success") {
		const chosen = PACKS[pack];
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			id,
			className: "rounded-2xl bg-surface p-6 shadow-[var(--shadow-border)] md:p-7",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex size-12 items-center justify-center rounded-full bg-primary/15 text-primary",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
						className: "size-6",
						strokeWidth: 2.4
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display mt-4 text-2xl leading-tight text-fg",
					children: "Заявку прийнято"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-sm leading-relaxed text-muted",
					children: [
						"Оператор зателефонує протягом 15 хвилин, щоб підтвердити доставку",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-fg",
							children: [
								chosen.jars,
								" ",
								chosen.jars === 1 ? "банки" : "банок",
								" за ",
								chosen.price,
								" грн"
							]
						}),
						". Нова Пошта, оплата при отриманні."
					]
				})
			]
		});
	}
	async function onSubmit(e) {
		e.preventDefault();
		const next = {};
		if (name.trim().length < 2) next.name = "Вкажіть імʼя";
		if (!isValidUaPhone(phone)) next.phone = "Номер у форматі +380 XX XXX XX XX";
		setFieldError(next);
		if (next.name || next.phone) return;
		setStatus("submitting");
		setError(null);
		try {
			await submitLead({ data: {
				name,
				phone,
				pack,
				source: captureSource()
			} });
			window.fbq?.("track", "Lead");
			setStatus("success");
		} catch {
			setStatus("error");
			setError("Не вдалося надіслати. Перевірте мережу і спробуйте ще раз.");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		id,
		onSubmit,
		noValidate: true,
		className: cn("scroll-mt-20 rounded-2xl bg-surface p-4 shadow-[var(--shadow-border)] sm:p-5", compact && "p-4"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-end justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] font-semibold uppercase tracking-[0.16em] text-primary",
					children: "Замовлення"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display mt-1 text-2xl leading-tight text-fg",
					children: "Отримати пасту"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-right text-[11px] leading-snug text-subtle",
					children: [
						"Передзвінок",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						"за 15 хв"
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 grid gap-2",
				children: Object.keys(PACKS).map((key) => {
					const item = PACKS[key];
					const selected = pack === key;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: cn("relative flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 transition-[background-color,box-shadow] duration-[var(--motion-quick)]", selected ? "bg-primary/10 shadow-[inset_0_0_0_1px_var(--color-primary)]" : "bg-bg/50 shadow-[inset_0_0_0_1px_var(--color-border)]"),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "radio",
								name: `${id}-pack`,
								className: "sr-only",
								checked: selected,
								onChange: () => setPack(key)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: cn("grid size-4 shrink-0 place-items-center rounded-full", selected ? "bg-primary" : "shadow-[inset_0_0_0_1px_var(--color-muted)]"),
								children: selected ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1.5 rounded-full bg-primary-fg" }) : null
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm font-semibold text-fg",
										children: item.title
									}), item.badge ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "rounded-full bg-accent px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-accent-fg",
										children: item.badge
									}) : null]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mt-0.5 block text-xs text-muted",
									children: item.subtitle
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-right",
								children: [item.oldPrice ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "block text-xs text-subtle line-through",
									children: [item.oldPrice, " грн"]
								}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "block text-sm font-semibold tabular-nums text-fg",
									children: [item.price, " грн"]
								})]
							})
						]
					}, key);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-1.5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: `${id}-name`,
							children: "Імʼя"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: `${id}-name`,
							name: "name",
							autoComplete: "name",
							placeholder: "Як до вас звертатись",
							value: name,
							onChange: (e) => setName(e.target.value),
							"aria-invalid": Boolean(fieldError.name)
						}),
						fieldError.name ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-accent",
							children: fieldError.name
						}) : null
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-1.5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: `${id}-phone`,
							children: "Телефон"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: `${id}-phone`,
							name: "phone",
							type: "tel",
							inputMode: "tel",
							autoComplete: "tel",
							placeholder: "+380 67 000 00 00",
							value: phone,
							onChange: (e) => setPhone(formatUaPhone(e.target.value)),
							"aria-invalid": Boolean(fieldError.phone)
						}),
						fieldError.phone ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-accent",
							children: fieldError.phone
						}) : null
					]
				})]
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-accent",
				children: error
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "submit",
				className: "mt-4 w-full text-[15px]",
				disabled: status === "submitting",
				children: status === "submitting" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }), "Надсилаємо"] }) : pack === "promo" ? "Замовити 3 банки за 1 780 грн" : "Замовити 1 банку за 890 грн"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-center text-[11px] leading-relaxed text-subtle",
				children: "Нова Пошта · оплата при отриманні · без передоплати"
			})
		]
	});
}
function StickyBar() {
	const pack = useOrder((s) => s.pack);
	const status = useOrder((s) => s.status);
	const chosen = PACKS[pack];
	if (status === "success") return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-x-0 bottom-0 z-40 border-t border-border bg-bg/92 px-3 pt-2.5 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-md md:hidden",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-lg items-center gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-semibold tracking-label text-primary uppercase",
					children: "1+1=3"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "truncate text-sm font-semibold tabular-nums text-fg",
					children: [
						chosen.price,
						" грн",
						chosen.oldPrice ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "ml-2 text-xs font-medium text-subtle line-through",
							children: chosen.oldPrice
						}) : null
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "min-w-40 px-4",
				onClick: scrollToOrder,
				children: "Замовити"
			})]
		})
	});
}
function kyivHms(now) {
	const parts = new Intl.DateTimeFormat("en-GB", {
		timeZone: "Europe/Kyiv",
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
		hourCycle: "h23"
	}).formatToParts(new Date(now));
	const pick = (type) => Number(parts.find((p) => p.type === type)?.value ?? "0");
	return {
		h: pick("hour"),
		m: pick("minute"),
		s: pick("second")
	};
}
function pad(n) {
	return n.toString().padStart(2, "0");
}
function Countdown() {
	const [now, setNow] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		setNow(Date.now());
		const id = window.setInterval(() => setNow(Date.now()), 1e3);
		return () => window.clearInterval(id);
	}, []);
	if (now === null) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "tabular-nums",
		children: "--:--:--"
	});
	const { h, m, s } = kyivHms(now);
	const remain = 86400 - (h * 3600 + m * 60 + s);
	const hh = Math.floor(remain / 3600);
	const mm = Math.floor(remain % 3600 / 60);
	const ss = remain % 60;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "tabular-nums",
		children: [
			pad(hh),
			":",
			pad(mm),
			":",
			pad(ss)
		]
	});
}
function remainingSetsToday() {
	const day = new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Kyiv" }).format(/* @__PURE__ */ new Date());
	let hash = 0;
	for (const ch of day) hash = hash * 33 + ch.charCodeAt(0) >>> 0;
	return 12 + hash % 8;
}
function LandingPage() {
	const left = (0, import_react.useMemo)(() => remainingSetsToday(), []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-dvh bg-bg text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hero, { left }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrustBar, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pain, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mechanism, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ingredients, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Course, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reviews, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Offer, { left }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Faq, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FinalCta, {})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StickyBar, {})
		]
	});
}
function Header() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: "sticky top-0 z-30 border-b border-border bg-bg/88 backdrop-blur-md",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex h-14 max-w-6xl items-center justify-between px-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-lg tracking-caps text-fg uppercase",
					children: "Welstroy"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "rounded-full bg-accent px-2.5 py-1 text-xs font-semibold tracking-label text-accent-fg uppercase",
					children: "1+1=3"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: scrollToOrder,
					className: "hidden text-sm font-semibold text-primary sm:inline",
					children: "Замовити"
				})
			]
		})
	});
}
function Hero({ left }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "relative",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-6xl lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative h-64 sm:h-80 lg:h-auto lg:min-h-full",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/hero.jpg",
					alt: "Банка Welstroy Energy — паста для потенції на меду серед маки, граната і кориці",
					width: 1122,
					height: 1402,
					fetchPriority: "high",
					className: "absolute inset-0 size-full object-cover object-[50%_38%]"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-linear-to-t from-bg via-bg/25 to-transparent lg:bg-linear-to-r lg:from-transparent lg:via-transparent lg:to-bg/80" })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative -mt-14 px-4 pb-24 sm:-mt-8 sm:px-6 md:pb-10 lg:mt-0 lg:py-10 lg:pr-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "inline-flex items-center gap-2 rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold tracking-label text-honey uppercase",
						children: ["Акція до півночі · ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Countdown, {})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "font-display mt-3 text-4xl leading-tight text-fg sm:text-5xl lg:text-6xl",
						children: ["Чоловіча сила", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-1 block text-primary",
							children: "в одній ложці меду"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 max-w-md text-sm leading-relaxed text-muted sm:text-base",
						children: [
							"15 трав у натуральному меді. ",
							PRODUCT.weightGrams,
							" г · ",
							PRODUCT.courseDays,
							" днів курсу. Акція 1+1=3 — три банки за ",
							PACKS.promo.price,
							" грн."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 text-xs text-subtle",
						children: [
							"Сьогодні лишилось ",
							left,
							" акційних наборів · Нова Пошта, оплата при отриманні"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-5 max-w-md",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrderForm, {})
					})
				]
			})]
		})
	});
}
function TrustBar() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "border-y border-border bg-surface",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto grid max-w-6xl grid-cols-2 md:grid-cols-4",
			children: TRUST.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: cn("px-4 py-5", i % 2 === 1 && "border-l border-border", i >= 2 && "border-t border-border md:border-t-0", (i === 2 || i === 3) && "md:border-l"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-semibold text-fg",
					children: item.label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-xs text-muted",
					children: item.detail
				})]
			}, item.label))
		})
	});
}
function Pain() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto max-w-6xl px-4 py-16 sm:py-20",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-semibold tracking-caps text-primary uppercase",
				children: "Знайомо"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display mt-3 max-w-xl text-4xl leading-tight text-fg sm:text-5xl",
				children: "Не вік зраджує. Зраджує запас сил."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10 grid gap-3 md:grid-cols-3",
				children: PAINS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "rounded-2xl bg-surface p-5 shadow-[var(--shadow-border)] sm:p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-2xl leading-tight text-fg",
						children: item.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm leading-relaxed text-muted",
						children: item.text
					})]
				}, item.title))
			})
		]
	});
}
function Mechanism() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative overflow-hidden border-y border-border",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: "/honey.jpg",
				alt: "",
				className: "absolute inset-0 size-full object-cover opacity-25"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-bg/80" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:py-20 lg:grid-cols-2 lg:items-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-semibold tracking-caps text-primary uppercase",
						children: "Як це працює"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display mt-3 text-4xl leading-tight text-fg sm:text-5xl",
						children: "Не пігулка на ніч. Опора на кожен день."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 max-w-md text-sm leading-relaxed text-muted sm:text-base",
						children: "Мед тримає екстракти в густій матриці. Одна ложка — і трави йдуть курсом: тонус, кровообіг, бажання, витривалість. Без удару по шлунку, як від купи капсул."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8 grid gap-5",
						children: STEPS.map((step) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-[auto_1fr] gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-2xl text-primary",
								children: step.n
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-base font-semibold text-fg",
								children: step.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm leading-relaxed text-muted",
								children: step.text
							})] })]
						}, step.n))
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-hidden rounded-2xl shadow-[var(--shadow-border)]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/paste.jpg",
						alt: "Густа медова паста з рослинними включеннями",
						className: "aspect-square w-full object-cover"
					})
				})]
			})
		]
	});
}
function Ingredients() {
	const [open, setOpen] = (0, import_react.useState)(INGREDIENTS[0].name);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto max-w-6xl px-4 py-16 sm:py-20",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-2xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-semibold tracking-caps text-primary uppercase",
					children: "Склад"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display mt-3 text-4xl leading-tight text-fg sm:text-5xl",
					children: "П’ятнадцять трав. Одна ложка."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-sm leading-relaxed text-muted sm:text-base",
					children: "Основа — натуральний мед. До нього зібрано рослини, які в традиційних системах беруть саме для чоловічого тонусу, витривалості й бажання. Натисніть рядок — відкриється роль у формулі."
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-10 grid gap-8 lg:grid-cols-2 lg:items-start",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "grid gap-px overflow-hidden rounded-2xl bg-border shadow-[var(--shadow-border)]",
				children: INGREDIENTS.map((item) => {
					const active = open === item.name;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "bg-surface",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setOpen(item.name),
							className: "flex w-full items-start gap-3 px-4 py-3.5 text-left",
							"aria-expanded": active,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-1 size-1.5 shrink-0 rounded-full bg-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex flex-wrap items-baseline gap-x-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm font-semibold text-fg",
										children: item.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs tracking-label text-subtle uppercase",
										children: item.role
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: cn("grid transition-[grid-template-rows,opacity] duration-[var(--motion-fast)] ease-[var(--ease-smooth-out)]", active ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "overflow-hidden",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "mt-1.5 block text-sm leading-relaxed text-muted",
											children: item.benefit
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "mt-1 block text-xs italic text-subtle",
											children: item.latin
										})]
									})
								})]
							})]
						})
					}, item.name);
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-hidden rounded-2xl shadow-[var(--shadow-border)]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/ingredients.jpg",
					alt: "Мака, кориця, гранат, імбир і бджолиний пилок на темному дереві",
					className: "aspect-photo w-full object-cover"
				})
			})]
		})]
	});
}
function Course() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "border-y border-border bg-surface",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-6xl gap-8 px-4 py-16 sm:py-20 lg:grid-cols-2 lg:items-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-semibold tracking-caps text-primary uppercase",
					children: "150 грамів"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display mt-3 text-4xl leading-tight text-fg sm:text-5xl",
					children: "Банка на 30 днів. Набір — на сезон."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-4 text-sm leading-relaxed text-muted sm:text-base",
					children: [
						"Одна чайна ложка ≈ денна порція. ",
						PRODUCT.weightGrams,
						" г вистачає приблизно на",
						" ",
						PRODUCT.courseDays,
						" прийомів. Три банки за акцією — це 90 днів без «завтра замовлю ще»."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
					className: "mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-border",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							k: "Вага",
							v: "150 г"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							k: "Порція",
							v: "1 ч. л."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							k: "Курс",
							v: "30 днів"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							k: "Акція",
							v: "90 днів"
						})
					]
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CourseCard, {
						icon: Droplets,
						title: "Густа, не рідка",
						text: "Мед тримає екстракти. Ложка — і готово. Ніяких 12 капсул на ранок."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CourseCard, {
						icon: Flame,
						title: "Смак пряного меду",
						text: "Кориця, імбир, гранат. Їдять навіть ті, хто ненавидить «БАДи»."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CourseCard, {
						icon: Clock3,
						title: "Ритуал на 20 секунд",
						text: "За 30 хвилин до їжі. Далі тіло працює само — вам не треба про це думати."
					})
				]
			})]
		})
	});
}
function Stat({ k, v }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-bg px-4 py-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "text-xs tracking-label text-subtle uppercase",
			children: k
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
			className: "font-display mt-1 text-3xl text-fg",
			children: v
		})]
	});
}
function CourseCard({ icon: Icon, title, text }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex gap-4 rounded-2xl bg-bg p-5 shadow-[var(--shadow-border)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "mt-0.5 size-5 shrink-0 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
			className: "text-sm font-semibold text-fg",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm leading-relaxed text-muted",
			children: text
		})] })]
	});
}
function Reviews() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto max-w-6xl px-4 py-16 sm:py-20",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-semibold tracking-caps text-primary uppercase",
				children: "Відгуки"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display mt-3 max-w-xl text-4xl leading-tight text-fg sm:text-5xl",
				children: "Чоловіки, які вже відкрили банку."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10 flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
				children: REVIEWS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "w-80 shrink-0 snap-start rounded-2xl bg-surface p-5 shadow-[var(--shadow-border)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-baseline justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
								className: "text-sm font-semibold text-fg",
								children: [
									item.name,
									", ",
									item.age
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-subtle",
								children: item.city
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 flex gap-0.5 text-primary",
							"aria-label": "5 з 5",
							children: Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "size-3 fill-primary" }, i))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm leading-relaxed text-muted",
							children: item.text
						})
					]
				}, item.name))
			})
		]
	});
}
function Offer({ left }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative overflow-hidden border-y border-border",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: "/pomegranate.jpg",
				alt: "",
				className: "absolute inset-0 size-full object-cover opacity-20"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-bg/82" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mx-auto max-w-3xl px-4 py-16 sm:py-20",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-center text-xs font-semibold tracking-caps text-primary uppercase",
						children: "Акція 1+1=3"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display mt-3 text-center text-4xl leading-tight text-fg sm:text-5xl",
						children: "Платите за дві. Забираєте три."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mx-auto mt-4 max-w-lg text-center text-sm leading-relaxed text-muted sm:text-base",
						children: [
							"Третя банка в подарунок. 90 днів курсу за ціною 60. До півночі лишилось ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Countdown, {}),
							" · наборів сьогодні — ",
							left,
							"."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-10 overflow-hidden rounded-2xl bg-surface shadow-[var(--shadow-border)]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-3 border-b border-border text-center text-xs tracking-label text-subtle uppercase",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "px-2 py-3",
										children: "Набір"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "border-x border-border px-2 py-3",
										children: "Дні"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "px-2 py-3",
										children: "Ціна"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OfferRow, {
								label: "1 банка",
								days: "30",
								price: "890 грн"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OfferRow, {
								label: "3 банки",
								days: "90",
								price: "2 670 грн",
								muted: true
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OfferRow, {
								label: "Акція 1+1=3",
								days: "90",
								price: "1 780 грн",
								highlight: true
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6 flex justify-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							className: "min-w-60",
							onClick: scrollToOrder,
							children: "Забрати акційний набір"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 grid gap-3 sm:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OfferNote, {
								icon: Truck,
								text: "Нова Пошта, 1–3 дні по Україні"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OfferNote, {
								icon: ShieldCheck,
								text: "Оплата при отриманні на відділенні"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OfferNote, {
								icon: BadgeCheck,
								text: "Не ліки. Харчовий продукт. 18+"
							})
						]
					})
				]
			})
		]
	});
}
function OfferRow({ label, days, price, muted, highlight }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("grid grid-cols-3 text-center text-sm", highlight ? "bg-primary/10 text-fg" : "text-muted", muted && !highlight && "line-through decoration-subtle/40"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "px-2 py-4 font-medium",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "border-x border-border px-2 py-4 tabular-nums",
				children: days
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "px-2 py-4 font-semibold tabular-nums text-fg",
				children: price
			})
		]
	});
}
function OfferNote({ icon: Icon, text }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
		className: "flex items-start gap-2 text-xs leading-relaxed text-muted",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "mt-0.5 size-4 shrink-0 text-primary" }), text]
	});
}
function Faq() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto max-w-3xl px-4 py-16 sm:py-20",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-semibold tracking-caps text-primary uppercase",
				children: "Питання"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display mt-3 text-4xl leading-tight text-fg sm:text-5xl",
				children: "Коротко, без води."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root2, {
				type: "single",
				collapsible: true,
				className: "mt-8 divide-y divide-border border-y border-border",
				children: FAQ.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Item, {
					value: item.q,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header$1, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Trigger2, {
						className: "group flex w-full items-center justify-between gap-4 py-4 text-left text-sm font-semibold text-fg sm:text-base",
						children: [item.q, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "size-4 shrink-0 text-muted transition-transform duration-[var(--motion-fast)] ease-[var(--ease-out)] group-data-[state=open]:rotate-180" })]
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
						className: "overflow-hidden",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "pb-4 text-sm leading-relaxed text-muted",
							children: item.a
						})
					})]
				}, item.q))
			})
		]
	});
}
function FinalCta() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "border-t border-border bg-surface px-4 py-16 sm:py-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-6xl gap-8 lg:grid-cols-2 lg:items-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-4xl leading-tight text-fg sm:text-5xl",
				children: "Залиште номер — і банка вже їде."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 max-w-md text-sm leading-relaxed text-muted sm:text-base",
				children: "Оператор підтвердить замовлення, відправимо Новою Поштою. Платите, коли візьмете посилку в руки. Акція 1+1=3 діє, поки є набір."
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrderForm, { id: "order-bottom" })]
		})
	});
}
function Footer() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
		className: "border-t border-border px-4 py-10 pb-28 md:pb-10",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-lg tracking-caps uppercase",
					children: "Welstroy Energy"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-sm text-muted",
					children: [
						PRODUCT.name,
						" · ",
						PRODUCT.weightGrams,
						" г · ",
						PRODUCT.latin
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 max-w-3xl text-xs leading-relaxed text-subtle",
					children: "Welstroy Energy є харчовим продуктом (паста на основі натурального меду з рослинними екстрактами) і не є лікарським засобом. Не призначений для діагностики, лікування чи профілактики захворювань. Результат індивідуальний. При алергії на продукти бджільництва, мед, пилок або будь-який компонент складу — не вживати. За хронічних станів порадьтеся з лікарем. Лише для повнолітніх. 18+."
				})
			]
		})
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LandingPage, {});
}
//#endregion
export { Home as component };
