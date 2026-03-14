import type { Metadata } from "next";
import { BreadcrumbSchema, WebPageSchema } from "@/components/shared/StructuredData";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Get a Free Estimate",
  description:
    "Get a free estimate for your paint, flooring, or renovation project in Fort Lauderdale and Miami. Transparent pricing, no hidden fees.",
  alternates: { canonical: "https://danovarenovations.com/estimate" },
  twitter: {
    card: "summary_large_image",
    title: "Get a Free Estimate | Danova Renovations",
    description:
      "Get a free estimate for your paint, flooring, or renovation project in Fort Lauderdale and Miami. Transparent pricing, no hidden fees.",
  },
};

export default function EstimateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <WebPageSchema
        type="WebPage"
        name="Get a Free Estimate"
        url={`${SITE.url}/estimate`}
        description="Get a free estimate for your paint, flooring, or renovation project in Fort Lauderdale and Miami. Transparent pricing, no hidden fees."
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: SITE.url },
          { name: "Get a Free Estimate", url: `${SITE.url}/estimate` },
        ]}
      />
      {children}
    </>
  );
}
