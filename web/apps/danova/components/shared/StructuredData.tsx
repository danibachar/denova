import { SITE, CONTACT } from "@/lib/constants";

export function WebSiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    publisher: {
      "@type": "LocalBusiness",
      name: SITE.name,
      url: SITE.url,
    },
    potentialAction: {
      "@type": "Action",
      name: "Get a Free Estimate",
      url: `${SITE.url}/estimate`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface LocalBusinessSchemaProps {
  pageType?: "home" | "service" | "blog" | "default";
  serviceName?: string;
  serviceDescription?: string;
}

export function LocalBusinessSchema({
  serviceName,
  serviceDescription,
}: LocalBusinessSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: SITE.name,
    description: SITE.description,
    url: SITE.url,
    telephone: CONTACT.phone,
    email: CONTACT.email,
    address: {
      "@type": "PostalAddress",
      addressRegion: "FL",
      addressLocality: "Fort Lauderdale",
      addressCountry: "US",
    },
    areaServed: [
      "Fort Lauderdale",
      "Miami",
      "Boca Raton",
      "Coral Gables",
      "Hollywood",
    ],
    priceRange: "$$",
    openingHours: CONTACT.hours,
    ...(serviceName &&
      serviceDescription && {
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: serviceName,
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: serviceName,
                description: serviceDescription,
              },
            },
          ],
        },
      }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function FAQSchema({
  faqs,
}: {
  faqs: readonly { readonly question: string; readonly answer: string }[];
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function WebPageSchema({
  type = "WebPage",
  name,
  url,
  description,
}: {
  type?: "WebPage" | "ContactPage" | "AboutPage";
  name: string;
  url: string;
  description?: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": type,
    name,
    url,
    ...(description && { description }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BreadcrumbSchema({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ArticleSchema({
  title,
  description,
  datePublished,
  author,
  url,
}: {
  title: string;
  description: string;
  datePublished: string;
  author: string;
  url: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    datePublished,
    author: {
      "@type": "Organization",
      name: author,
    },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
    },
    url,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
