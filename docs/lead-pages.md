# Lead pages map

All forms that submit leads POST to the same API endpoint, configured via **`NEXT_PUBLIC_LEAD_API_URL`** (base URL; the app sends to `${NEXT_PUBLIC_LEAD_API_URL}/api/lead`).

| App        | Route     | Page / form           | `source`  | Main fields |
|-----------|-----------|------------------------|-----------|-------------|
| danova-lead | `/`       | Get a free quote       | `lead`    | projectType, zip, name, phone, addressOptional?, email?, scope?, utm? |
| danova    | `/contact`  | Leave us a message     | `contact` | name, email, phone, message |
| danova    | `/estimate` | Get a Free Estimate    | `estimate`| name, email, phone, service, scope?, address?, notes? |

Set `NEXT_PUBLIC_LEAD_API_URL` in each app’s environment (e.g. your Cloudflare Worker base URL). Example: `https://danova-lead-api.<account>.workers.dev`.
