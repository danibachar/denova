/**
 * Generates LLM-LD llm-index.json for AI/LLM discoverability.
 * Run before build: npm run generate-llm-index
 */
import { writeFileSync, mkdirSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { SITE, CONTACT, CITIES, TRUST_BADGES } from "../lib/constants";
import { SERVICE_DETAILS } from "../lib/content/services";
import { BLOG_POSTS } from "../lib/content/blog";
import { PROJECTS } from "../lib/content/projects";

const __dirname = dirname(fileURLToPath(import.meta.url));
const LEAD_APP_URL = "https://danova-lead.pages.dev";

const baseUrl = SITE.url;

const llmIndex = {
  "@context": ["https://schema.org", "https://llmld.org/v1"],
  "@type": "llmld:AIWebsite",
  "@id": `${baseUrl}/.well-known/llm-index.json`,
  "llmld:meta": {
    version: "1.0",
    generated: new Date().toISOString(),
    generator: "danova/scripts/generate-llm-index.ts",
    refresh_interval: "weekly",
    language: "en-US",
  },
  "llmld:site": {
    name: SITE.name,
    type: "Business",
    industry: ["Home Services", "Renovation", "Painting", "Flooring"],
    description: SITE.description,
    tagline: SITE.tagline,
    domains: {
      primary: baseUrl,
      app: LEAD_APP_URL,
    },
    location: {
      headquarters: {
        "@type": "PostalAddress",
        addressLocality: "Fort Lauderdale",
        addressRegion: "FL",
        addressCountry: "US",
      },
      service_area: CONTACT.address.full,
      primary_markets: ["US"],
    },
    social: CONTACT.social,
  },
  "llmld:primaryEntity": {
    "@id": "#organization",
    "@type": "LocalBusiness",
    name: SITE.name,
    description: SITE.description,
    url: baseUrl,
    telephone: CONTACT.phone,
    email: CONTACT.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Fort Lauderdale",
      addressRegion: "FL",
      addressCountry: "US",
    },
    areaServed: CITIES.map((c) => c.name),
    priceRange: "$$",
    openingHours: CONTACT.hours,
  },
  "llmld:summary": {
    one_liner: "Premium paint, flooring, and renovation services in Fort Lauderdale and Miami.",
    paragraph: `${SITE.description} We serve homeowners and commercial clients across South Florida with interior and exterior painting, flooring installation, popcorn ceiling removal, wallpaper removal, and drywall repair. Licensed, insured, and EPA Lead-Safe certified.`,
    key_facts: [
      "Licensed & Insured",
      "EPA Lead-Safe certified",
      "Serves 8 cities across South Florida",
      "Interior, exterior, and commercial painting",
      "Flooring installation (hardwood, tile, laminate)",
      "Popcorn ceiling removal, wallpaper removal, drywall repair",
      "Free estimates, transparent pricing",
      ...TRUST_BADGES,
    ],
    differentiators: [
      "Designer-grade finishes and materials",
      "South Florida weather expertise (humidity, storms)",
      "After-hours and flexible scheduling for commercial",
      "Family-run with personal touch",
    ],
    target_customers: [
      "Homeowners in Fort Lauderdale and Miami",
      "Commercial property managers",
      "Real estate investors",
      "Businesses needing office or retail painting",
    ],
  },
  "llmld:pages": [
    { path: "/", title: `${SITE.name} | Best Paint & Flooring in Fort Lauderdale & Miami`, type: "homepage", url: baseUrl, description: "Home page" },
    { path: "/services", title: "Our Services", type: "listing", url: `${baseUrl}/services`, children: Object.keys(SERVICE_DETAILS).map((s) => `/services/${s}`) },
    ...Object.entries(SERVICE_DETAILS).map(([slug, s]) => ({
      path: `/services/${slug}`,
      title: s.metaTitle,
      type: "service" as const,
      url: `${baseUrl}/services/${slug}`,
      description: s.heroSubtitle,
    })),
    { path: "/service-area", title: "Service Area", type: "listing", url: `${baseUrl}/service-area`, children: CITIES.map((c) => `/service-area/${c.slug}`) },
    ...CITIES.map((c) => ({
      path: `/service-area/${c.slug}`,
      title: `Best Paint & Flooring in ${c.name}`,
      type: "service" as const,
      url: `${baseUrl}/service-area/${c.slug}`,
    })),
    { path: "/about", title: "About Us", type: "about", url: `${baseUrl}/about` },
    { path: "/contact", title: "Contact Us", type: "contact", url: `${baseUrl}/contact` },
    { path: "/estimate", title: "Get a Free Estimate", type: "form", url: `${baseUrl}/estimate`, description: "Request a free quote for paint or flooring" },
    { path: "/blog", title: "Blog", type: "listing", url: `${baseUrl}/blog`, children: BLOG_POSTS.map((p) => `/blog/${p.slug}`) },
    ...BLOG_POSTS.map((p) => ({
      path: `/blog/${p.slug}`,
      title: p.title,
      type: "article" as const,
      url: `${baseUrl}/blog/${p.slug}`,
      description: p.excerpt,
      lastmod: p.date,
    })),
    { path: "/projects", title: "Projects", type: "listing", url: `${baseUrl}/projects`, children: PROJECTS.map((p) => `/projects/${p.slug}`) },
    ...PROJECTS.map((p) => ({
      path: `/projects/${p.slug}`,
      title: p.title,
      type: "other" as const,
      url: `${baseUrl}/projects/${p.slug}`,
    })),
    { path: "/privacy", title: "Privacy Policy", type: "legal", url: `${baseUrl}/privacy` },
    { path: "/terms", title: "Terms of Service", type: "legal", url: `${baseUrl}/terms` },
  ],
  "llmld:actions": {
    primary: [
      { id: "estimate", name: "Get a Free Estimate", description: "Request a free quote for your paint or flooring project", url: `${baseUrl}/estimate`, type: "form", priority: 1 },
      { id: "estimate-lead", name: "Get a Free Quote", description: "Quick quote form on lead capture app", url: LEAD_APP_URL, type: "form", priority: 2 },
      { id: "contact", name: "Contact Us", description: "Phone, email, or contact form", url: `${baseUrl}/contact`, type: "contact", priority: 3 },
    ],
    contact: [
      { id: "phone", name: "Call", url: `tel:${CONTACT.phoneRaw}`, type: "contact", channels: [{ type: "phone", value: CONTACT.phone }] },
      { id: "email", name: "Email", type: "contact", channels: [{ type: "email", value: CONTACT.email }] },
    ],
    resources: [
      { id: "services", name: "Our Services", url: `${baseUrl}/services`, type: "navigate" },
      { id: "blog", name: "Blog", url: `${baseUrl}/blog`, type: "navigate" },
      { id: "about", name: "About Us", url: `${baseUrl}/about`, type: "navigate" },
    ],
  },
};

const outDir = join(__dirname, "../public/.well-known");
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "llm-index.json");
writeFileSync(outPath, JSON.stringify(llmIndex, null, 2), "utf-8");
console.log(`Wrote ${outPath}`);
