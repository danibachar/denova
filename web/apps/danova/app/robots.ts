import { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";

export const dynamic = "force-static";

const AI_CRAWLERS = [
  "GPTBot",
  "ChatGPT-User",
  "ClaudeBot",
  "anthropic-ai",
  "PerplexityBot",
  "Google-Extended",
  "CCBot",
  "OAI-SearchBot",
];

const disallowApi = ["/api/"];

export default function robots(): MetadataRoute.Robots {
  const baseRules: MetadataRoute.Robots["rules"] = [
    { userAgent: "*", allow: "/", disallow: disallowApi },
    { userAgent: "Googlebot", allow: "/", disallow: disallowApi },
    ...AI_CRAWLERS.map((agent) => ({
      userAgent: agent,
      allow: "/",
      disallow: disallowApi,
    })),
  ];

  return {
    rules: baseRules,
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
