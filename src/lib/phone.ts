/** UA mobile: 9 digits after country code 380. */
export function digitsOnly(value: string): string {
  return value.replace(/\D/g, "");
}

export function nationalDigits(value: string): string {
  let d = digitsOnly(value);
  if (d.startsWith("380")) d = d.slice(3);
  else if (d.startsWith("80")) d = d.slice(2);
  else if (d.startsWith("0")) d = d.slice(1);
  return d.slice(0, 9);
}

export function formatUaPhone(value: string): string {
  const d = nationalDigits(value);
  const a = d.slice(0, 2);
  const b = d.slice(2, 5);
  const c = d.slice(5, 7);
  const e = d.slice(7, 9);
  let out = "+380";
  if (a) out += ` ${a}`;
  if (b) out += ` ${b}`;
  if (c) out += ` ${c}`;
  if (e) out += ` ${e}`;
  return d.length === 0 ? "+380 " : out;
}

export function isValidUaPhone(value: string): boolean {
  return nationalDigits(value).length === 9;
}

export function toE164(value: string): string {
  return `+380${nationalDigits(value)}`;
}
