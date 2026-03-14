import type { Metadata } from "next";
import { BreadcrumbSchema, WebPageSchema } from "@/components/shared/StructuredData";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Danova Renovations for paint, flooring, and renovation services in Fort Lauderdale and Miami. Phone, email, and contact form.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <WebPageSchema
        type="ContactPage"
        name="Contact Us"
        url={`${SITE.url}/contact`}
        description="Contact Danova Renovations for paint, flooring, and renovation services in Fort Lauderdale and Miami. Phone, email, and contact form."
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: SITE.url },
          { name: "Contact Us", url: `${SITE.url}/contact` },
        ]}
      />
      {children}
    </>
  );
}
