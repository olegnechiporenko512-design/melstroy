import { META_PIXEL_ID } from "@/lib/leads-config";

export const PIXEL_ID = META_PIXEL_ID.replace(/\D/g, "");

/** Base code. autoConfig is disabled before init so Meta does not invent extra events. */
export function metaPixelSnippet(id = PIXEL_ID) {
  return `!function(w){if(w.__metaPixel)return;w.__metaPixel=1;var f=w,b=document,e="script",v="https://connect.facebook.net/en_US/fbevents.js",n,t,s;if(!f.fbq){n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version="2.0";n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];if(s&&s.parentNode)s.parentNode.insertBefore(t,s);else(b.head||b.documentElement).appendChild(t)}f.fbq("set","autoConfig",false,"${id}");f.fbq("init","${id}");f.fbq("track","PageView")}(window);`;
}

export function trackOrder(value: number) {
  const fbq = window.fbq;
  if (typeof fbq !== "function" || !Number.isFinite(value)) return;
  const payload = { value, currency: "UAH" };
  try {
    fbq("track", "Lead", payload);
    fbq("track", "Purchase", payload);
  } catch {
    /* pixel must not fail an already accepted order */
  }
}

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    __metaPixel?: number;
  }
}
