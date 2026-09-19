import { createFileRoute } from "@tanstack/react-router";
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
          return Response.json(
            { success: false, error: "invalid-json" },
            { status: 400, headers: cors() },
          );
        }

        try {
          const payload = buildSheetPayload(body, clientIp(request));
          await postToSheet(payload);
          return Response.json({ success: true }, { headers: cors() });
        } catch (err) {
          const message = err instanceof Error ? err.message : "error";
          const status =
            message === "name" || message === "phone" ? 400 : 502;
          return Response.json(
            { success: false },
            { status, headers: cors() },
          );
        }
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
