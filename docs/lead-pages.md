# Lead pages map

All forms POST leads to the Base44 Lead Pulse API. Configure via **`NEXT_PUBLIC_LEAD_API_URL`** and **`NEXT_PUBLIC_LEAD_API_KEY`**.

**Endpoint:** `https://danova-lead-pulse.base44.app/api/functions/createLead`  
**Headers:** `Content-Type: application/json`, `api_key: <key>`

| App        | Route     | Page / form           | `source`  | Main fields |
|-----------|-----------|------------------------|-----------|-------------|
| danova-lead | `/`       | Get a free quote       | `lead`    | projectType, zip, name, phone, addressOptional?, email?, scope?, utm? |
| danova    | `/contact`  | Leave us a message     | `contact` | name, email, phone, message |
| danova    | `/estimate` | Get a Free Estimate    | `estimate`| name, email, phone, service, scope?, address?, notes? |

**Required Lead fields:** `name`, `phone`
