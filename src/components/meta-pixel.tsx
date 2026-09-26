import { useEffect } from "react";
import { PIXEL_ID, metaPixelSnippet } from "@/lib/meta-pixel";

export function MetaPixel() {
  useEffect(() => {
    if (!PIXEL_ID || window.__metaPixel) return;
    const script = document.createElement("script");
    script.id = "meta-pixel";
    script.text = metaPixelSnippet();
    document.head.appendChild(script);
  }, []);

  if (!PIXEL_ID) return null;

  return (
    <noscript>
      <img
        height={1}
        width={1}
        alt=""
        style={{ display: "none" }}
        src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
      />
    </noscript>
  );
}
