# Cloudflare Pages Release Checklist (danova + danova-lead)

Use this checklist for every production deployment.

## 1) Pre-merge checks

- [ ] PR checks are green (lint, typecheck, tests, build)
- [ ] Build commands are reproducible locally
- [ ] `danova-lead` static output exists after build (`web/apps/danova-lead/out/index.html`)
- [ ] Cloudflare secrets are present and named correctly
- [ ] Repo variables are set:
  - `CF_PAGES_PROJECT_DANOVA`
  - `CF_PAGES_PROJECT_LEAD`
- [ ] No server-only features introduced into static-export app

## 2) Pre-deploy checks

- [ ] Confirm target project name(s) in workflow command
- [ ] Confirm output directory (`out`) is used for Pages deploy
- [ ] Confirm deploy run points to intended commit SHA
- [ ] Confirm production env vars are set for Pages project

## 3) Post-deploy smoke test

- [ ] Home page returns 200
- [ ] Main CTA/form path works end-to-end
- [ ] Static assets (JS/CSS/images/fonts) have no 404s
- [ ] Analytics is firing or safely no-ops without breaking UX
- [ ] Meta title/description and OG basics are present

## 4) Rollback readiness

- [ ] Last known-good deployment SHA recorded
- [ ] Rollback method documented (redeploy prior commit)
- [ ] Incident notes template ready (impact, cause, fix, follow-up)

## Suggested validation commands

```bash
pnpm install --frozen-lockfile
pnpm -r lint
pnpm -r typecheck
pnpm -r test --if-present
pnpm -r build
make integration
```
