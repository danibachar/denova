# Lead API Worker

Hono + Zod + Gmail API. Sends leads to info@danovarenovations.com.

> **Note:** Cloudflare Workers cannot use raw SMTP (Nodemailer); they only support HTTP. Email is sent via Gmail API.

**Environment variables** (Cloudflare dashboard):

| Variable | Description | Secret? |
|----------|-------------|---------|
| `GOOGLE_CLIENT_ID` | Gmail OAuth2 client ID | Yes |
| `GOOGLE_CLIENT_SECRET` | Gmail OAuth2 client secret | Yes |
| `GOOGLE_REFRESH_TOKEN` | Gmail OAuth2 refresh token | Yes |
| `ALLOWED_ORIGINS` | Comma-separated CORS origins | No (in wrangler.toml) |

**Endpoint:** `POST /api/lead`

**Payload:** Include `source` (contact | lead | estimate) and `lead_source` (page identifier, e.g. `danova-contact`, `danova-estimate`, `danova-lead`).
