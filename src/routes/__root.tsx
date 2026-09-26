import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { MetaPixel } from "@/components/meta-pixel";
import { SITE_URL } from "@/lib/leads-config";
import { PIXEL_ID, metaPixelSnippet } from "@/lib/meta-pixel";
import appCss from "../styles.css?url";

const APP_NAME = "Welstroy Energy";
const DESCRIPTION =
  "Welstroy Energy — паста для потенції на натуральному меду. 15 трав, 200 г, курс 30 днів. Акція 1+1=3. Доставка Новою Поштою, оплата при отриманні.";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: APP_NAME },
      { name: "description", content: DESCRIPTION },
      { name: "theme-color", content: "#120c09" },
      { name: "apple-mobile-web-app-title", content: APP_NAME },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: APP_NAME },
      { property: "og:title", content: "Чоловіча сила в одній ложці меду" },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: `${SITE_URL}/` },
      { property: "og:image", content: `${SITE_URL}/og.jpg` },
      { property: "og:locale", content: "uk_UA" },
    ],
    links: [
      { rel: "canonical", href: `${SITE_URL}/` },
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500;1,600&family=Manrope:wght@400;500;600;700&display=swap",
      },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
    ],
    scripts: [
      { src: "/_vercel/insights/script.js", defer: true },
    ],
  }),
  component: RootDocument,
});

function RootDocument() {
  return (
    <html lang="uk" className="antialiased" suppressHydrationWarning>
      <head>
        <HeadContent />
        <script defer src="/_vercel/insights/script.js" />
        {PIXEL_ID ? (
          <script dangerouslySetInnerHTML={{ __html: metaPixelSnippet() }} />
        ) : null}
      </head>
      <body>
        <PreviewHostBridge />
        <MetaPixel />
        <AuthProvider>
          <Outlet />
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  );
}
