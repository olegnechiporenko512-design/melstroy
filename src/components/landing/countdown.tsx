import { useEffect, useState } from "react";

function kyivHms(now: number) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Kyiv",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date(now));
  const pick = (type: string) =>
    Number(parts.find((p) => p.type === type)?.value ?? "0");
  return { h: pick("hour"), m: pick("minute"), s: pick("second") };
}

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

export function Countdown() {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  if (now === null) {
    return <span className="tabular-nums">--:--:--</span>;
  }

  const { h, m, s } = kyivHms(now);
  const left = h * 3600 + m * 60 + s;
  const remain = 24 * 3600 - left;
  const hh = Math.floor(remain / 3600);
  const mm = Math.floor((remain % 3600) / 60);
  const ss = remain % 60;

  return (
    <span className="tabular-nums">
      {pad(hh)}:{pad(mm)}:{pad(ss)}
    </span>
  );
}

export function remainingSetsToday() {
  const day = new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Kyiv" }).format(
    new Date(),
  );
  let hash = 0;
  for (const ch of day) hash = (hash * 33 + ch.charCodeAt(0)) >>> 0;
  return 12 + (hash % 8);
}
