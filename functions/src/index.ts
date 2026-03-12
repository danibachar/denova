/**
 * Lead API - Hono + Zod-OpenAPI + Gmail API (Cloudflare Workers).
 * Env: GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, ALLOWED_ORIGINS
 * Refresh token stored in KV (TOKEN_STORE), obtained via OAuth when needed.
 */
import { createRoute, OpenAPIHono } from "@hono/zod-openapi";
import { swaggerUI } from "@hono/swagger-ui";
import { cors } from "hono/cors";
import { getCookie, setCookie, deleteCookie } from "hono/cookie";
import { z } from "@hono/zod-openapi";
import {
  leadSchema,
  leadSuccessSchema,
  errorSchema,
} from "./schemas";
import { sendLeadEmail } from "./email";
import { getAuthUrl, exchangeCodeForTokens } from "./auth";

const OAUTH_STATE_COOKIE = "oauth_state";
const REFRESH_TOKEN_KEY = "gmail_refresh_token";

type Env = {
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
  ALLOWED_ORIGINS: string;
  TOKEN_STORE: KVNamespace;
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
    200: {
      content: {
        "application/json": {
          schema: z
            .object({
              authUrl: z.string().url(),
              message: z.string(),
            })
            .openapi("AuthRequired"),
        },
      },
      description: "Authorization needed - open authUrl to authenticate",
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
    const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, TOKEN_STORE } = c.env;
    if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
      return c.json({ error: "Server configuration error" }, 500);
    }

    const refreshToken = await TOKEN_STORE.get(REFRESH_TOKEN_KEY);
    if (!refreshToken) {
      const url = new URL(c.req.url);
      const redirectUri = `${url.origin}/auth/google/callback`;
      const state = crypto.randomUUID();
      setCookie(c, OAUTH_STATE_COOKIE, state, {
        httpOnly: true,
        secure: url.protocol === "https:",
        sameSite: "Lax",
        maxAge: 600,
        path: "/",
      });
      const authUrl = getAuthUrl(GOOGLE_CLIENT_ID, redirectUri, state);
      console.log("[lead] Auth required, returning authUrl");
      return c.json(
        {
          authUrl,
          message:
            "Open authUrl to authenticate; after authorization the refresh token will be stored for future requests.",
        },
        200
      );
    }

    const data = c.req.valid("json");
    console.log("[lead] Valid payload", { source: data.source, name: data.name });
    const result = await sendLeadEmail(data, {
      GOOGLE_CLIENT_ID,
      GOOGLE_CLIENT_SECRET,
      GOOGLE_REFRESH_TOKEN: refreshToken,
    });
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

// --- OAuth2 callback (redirect from Google after auth) ---
app.get("/auth/google/callback", async (c) => {
  const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, TOKEN_STORE } = c.env;
  if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
    return c.json({ error: "Missing OAuth credentials" }, 500);
  }
  const storedState = getCookie(c, OAUTH_STATE_COOKIE);
  deleteCookie(c, OAUTH_STATE_COOKIE, { path: "/" });
  const state = c.req.query("state");
  const code = c.req.query("code");
  const error = c.req.query("error");
  if (error) {
    return c.html(`<h1>OAuth error</h1><p>${error}</p>`, 400);
  }
  if (!storedState || state !== storedState) {
    return c.html("<h1>Invalid state</h1>", 400);
  }
  if (!code) {
    return c.html("<h1>No authorization code received</h1>", 400);
  }
  const url = new URL(c.req.url);
  const redirectUri = `${url.origin}/auth/google/callback`;
  const tokens = await exchangeCodeForTokens(
    code,
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    redirectUri
  );
  if (tokens.error) {
    return c.html(
      `<h1>Token exchange failed</h1><pre>${tokens.error_description || tokens.error}</pre>`,
      400
    );
  }
  if (!tokens.refresh_token) {
    return c.html(
      "<h1>No refresh token</h1><p>Re-run with prompt=consent. Revoke app access and try again.</p>",
      400
    );
  }
  await TOKEN_STORE.put(REFRESH_TOKEN_KEY, tokens.refresh_token);
  return c.html(`
    <h1>Authorization complete</h1>
    <p>Refresh token stored. You can now submit leads.</p>
  `);
});

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
