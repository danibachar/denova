.PHONY: dev dev-install dev-all test prod prod-build prod-start clean
.PHONY: dev-landing dev-install-landing test-landing prod-landing prod-build-landing deploy-landing clean-landing
.PHONY: dev-danova dev-install-danova test-danova prod-danova prod-build-danova deploy-danova clean-danova

WEB_DANOVA := web/danova
WEB_LANDING := web/landing-pages/danova-lead
PORT_DANOVA := 3000
PORT_LANDING := 3002

# --- Danova (main site): web/danova ---
# Hot reload (Fast Refresh) is built-in with next dev

dev: dev-danova
dev-danova:
	cd $(WEB_DANOVA) && npx next dev -p $(PORT_DANOVA)

dev-install: dev-install-danova
dev-install-danova:
	cd $(WEB_DANOVA) && npm install

test: test-danova
test-danova: test-lint-danova test-typecheck-danova test-unit-danova
	@echo "Danova tests passed"

test-lint-danova:
	cd $(WEB_DANOVA) && npm run lint

test-typecheck-danova:
	cd $(WEB_DANOVA) && npx tsc --noEmit

test-unit-danova:
	cd $(WEB_DANOVA) && npm run test

prod: prod-danova
prod-danova: prod-build-danova

prod-build: prod-build-danova
prod-build-danova:
	cd $(WEB_DANOVA) && npm run build

prod-start: prod-start-danova
prod-start-danova:
	cd $(WEB_DANOVA) && npm run start

deploy-danova: prod-build-danova
	cd $(WEB_DANOVA) && npx wrangler pages deploy out --project-name=danova-web

clean: clean-danova
clean-danova:
	rm -rf $(WEB_DANOVA)/.next
	@echo "Cleaned danova .next"

# --- Landing page: web/landing-pages/danova-lead ---

dev-landing:
	cd $(WEB_LANDING) && npx next dev -p $(PORT_LANDING)

# --- Run both sites with hot reload (Danova :3000, Landing :3001) ---
# For Docker/WSL if hot reload doesn't work: make dev-all POLLING=1

dev-all:
	@echo "Starting Danova (localhost:$(PORT_DANOVA)) and Landing (localhost:$(PORT_LANDING))..."
	@if [ "$(POLLING)" = "1" ]; then export WATCHPACK_POLLING=1; fi; \
	cd $(WEB_DANOVA) && npx next dev -p $(PORT_DANOVA) & \
	cd $(WEB_LANDING) && npx next dev -p $(PORT_LANDING) & \
	wait

dev-install-landing:
	cd $(WEB_LANDING) && npm install

test-landing: test-lint-landing test-typecheck-landing
	@echo "Landing page tests passed"

test-lint-landing:
	cd $(WEB_LANDING) && npm run lint

test-typecheck-landing:
	cd $(WEB_LANDING) && npx tsc --noEmit

prod-landing: prod-build-landing

prod-build-landing:
	cd $(WEB_LANDING) && npm run build

deploy-landing: prod-build-landing
	cd $(WEB_LANDING) && npx wrangler pages deploy out --project-name=danova-lead

clean-landing:
	rm -rf $(WEB_LANDING)/.next
	@echo "Cleaned landing .next"
