# Auth

OAuth2 is part of the send-email flow. The refresh token is stored in KV (not env).

1. Create KV namespace: `npx wrangler kv namespace create TOKEN_STORE`
2. Update `wrangler.toml` with the returned id
3. Set `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` (wrangler secrets)
4. Add `https://your-worker.workers.dev/auth/google/callback` to Google OAuth redirect URIs
5. When no token in KV: POST /api/lead redirects (302) to Google auth
6. User authorizes → callback stores refresh token in KV → done
