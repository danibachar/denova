/**
 * Lead API - Hono + Zod-OpenAPI + Gmail API (Cloudflare Workers).
 * Env: GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REFRESH_TOKEN, ALLOWED_ORIGINS
 */
import { createRoute, OpenAPIHono } from "@hono/zod-openapi";
import { swaggerUI } from "@hono/swagger-ui";
import { cors } from "hono/cors";
import {
  leadSchema,
  leadSuccessSchema,
  errorSchema,
} from "./schemas";
import { sendLeadEmail } from "./email";

type Env = {
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
  // GOOGLE_REFRESH_TOKEN: string;
  ALLOWED_ORIGINS: string;
  RATE_LIMITER?: {
    limit: (opts: { key: string }) => Promise<{ success: boolean }>;
  };
};

const app = new OpenAPIHono<{ Bindings: Env }>();

app.use("/api/*", async (c, next) => {
  const allowed = (c.env.ALLOWED_ORIGINS ?? "").split(",").map((o) => o.trim());
  const origin = c.req.header("Origin") ?? c.req.header("Referer");
  const allowOrigin =
    origin &&
    allowed.some(
      (o) => origin === o || origin.startsWith(o.replace(/\/$/, "") + "/")
    )
      ? origin
      : "";
  return cors({
    origin: allowOrigin,
    allowMethods: ["GET", "POST", "OPTIONS"],
    allowHeaders: ["Content-Type"],
  })(c, next);
});

app.use("/api/lead", async (c, next) => {
  if (c.env.RATE_LIMITER) {
    const ip = c.req.header("cf-connecting-ip") ?? "unknown";
    const { success } = await c.env.RATE_LIMITER.limit({ key: `lead:${ip}` });
    if (!success) {
      console.log("[lead] Rate limit exceeded", { ip });
      return c.json({ error: "Rate limit exceeded" }, 429);
    }
  }
  return next();
});

const leadRoute = createRoute({
  method: "post",
  path: "/api/lead",
  request: {
    body: {
      content: {
        "application/json": {
          schema: leadSchema,
        },
      },
    },
  },
  responses: {
    201: {
      content: { "application/json": { schema: leadSuccessSchema } },
      description: "Lead email sent successfully",
    },
    400: {
      content: { "application/json": { schema: errorSchema } },
      description: "Invalid request body",
    },
    429: {
      content: { "application/json": { schema: errorSchema } },
      description: "Rate limit exceeded",
    },
    500: {
      content: { "application/json": { schema: errorSchema } },
      description: "Failed to send email",
    },
  },
});

app.openapi(leadRoute, async (c) => {
  try {
    console.log("[lead] POST /api/lead received");
    const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } =
      c.env;
    if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
      console.error("[lead] Missing Gmail OAuth secrets", {
        hasClientId: !!GOOGLE_CLIENT_ID,
        hasClientSecret: !!GOOGLE_CLIENT_SECRET,
        // hasRefreshToken: !!GOOGLE_REFRESH_TOKEN,
      });
      return c.json({ error: "Server configuration error" }, 500);
    }

    const data = c.req.valid("json");
    console.log("[lead] Valid payload", { source: data.source, name: data.name });
    const result = await sendLeadEmail(data, c.env);
    if (!result) {
      console.error("[lead] sendLeadEmail returned null");
      return c.json({ error: "Failed to send email" }, 500);
    }

    console.log("[lead] Success", { id: result.id });
    return c.json(
      { ok: true, message: "Lead email sent successfully", id: result.id },
      201
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    const stack = err instanceof Error ? err.stack : undefined;
    console.error("[lead] Uncaught error", { message, stack });
    return c.json({ ok: false, error: "Failed to send email" }, 500);
  }
});

app.get("/", (c) =>
  c.json({
    ok: true,
    message: "Lead API is running. POST /api/lead to submit.",
    docs: "/ui",
  })
);

app.doc("/doc", {
  openapi: "3.1.0",
  info: {
    title: "Danova Lead API",
    version: "1.0.0",
    description: "Submit website leads via email",
  },
});

app.get("/ui", swaggerUI({ url: "/doc" }));

export default app;
