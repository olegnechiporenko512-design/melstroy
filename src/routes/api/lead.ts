import { createFileRoute } from "@tanstack/react-router";
import { waitUntil } from "@vercel/functions";
import { makeOrderId, sendMetaCapi } from "@/lib/meta-capi.server";
import {
  buildSheetPayload,
  clientIp,
  postToSheet,
  type LeadRequest,
} from "@/lib/forward-lead.server";

export const Route = createFileRoute("/api/lead")({
  server: {
    handlers: {
      OPTIONS: async () => new Response(null, { status: 204, headers: cors() }),
      POST: async ({ request }) => {
        let body: LeadRequest;
        try {
          body = (await request.json()) as LeadRequest;
        } catch {
          return Response.json({ success: false, error: "bad_name" }, { status: 400, headers: cors() });
        }

        let payload;
        try {
          payload = buildSheetPayload(body, clientIp(request));
        } catch (err) {
          const message = err instanceof Error ? err.message : "bad_name";
          return Response.json({ success: false, error: message }, { status: 400, headers: cors() });
        }

        const orderId = makeOrderId();
        payload.order_id = orderId;
        const clip = (value: unknown, max = 300) =>
          typeof value === "string" ? value.trim().slice(0, max) : "";

        waitUntil(
          (async () => {
            let last = "";
            let ok = false;
            for (let attempt = 0; attempt < 3; attempt++) {
              if (attempt > 0) await new Promise((resolve) => setTimeout(resolve, 2000));
              try {
                await postToSheet(payload);
                ok = true;
                break;
              } catch (error) {
                last = error instanceof Error ? error.message : "error";
              }
            }
            if (!ok) console.error("[lead] sheet failed", last, JSON.stringify(payload));
            await sendMetaCapi({
              orderId,
              page: clip(body.page, 500),
              name: String(payload.name),
              phone: String(payload.phone),
              total: Number(payload.total),
              variant: String(payload.variant),
              ip: clientIp(request),
              userAgent: clip(request.headers.get("user-agent"), 500),
              fbp: clip(body.fbp),
              fbc: clip(body.fbc),
              fbclid: clip(body.fbclid),
            });
          })(),
        );

        return Response.json({ success: true, order_id: orderId }, { headers: cors() });
      },
    },
  },
});

function cors() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}
