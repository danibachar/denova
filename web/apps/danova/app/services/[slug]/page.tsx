import { notFound } from "next/navigation";
import { Metadata } from "next";
import { ServiceDetailTemplate } from "@/components/shared/ServiceDetailTemplate";
import { BreadcrumbSchema } from "@/components/shared/StructuredData";
import { SERVICE_DETAILS } from "@/lib/content/services";
import { SITE } from "@/lib/constants";

const SLUGS = Object.keys(SERVICE_DETAILS);

const SERVICE_OG_IMAGES: Record<string, string> = {
  "interior-painting": "/images/interior-painting-service.jpg",
  "exterior-painting": "/images/hero-renovation.jpg",
  "commercial-painting": "/images/interior-painting-service.jpg",
  flooring: "/images/flooring-service.jpg",
  "popcorn-ceiling-removal": "/images/hero-renovation.jpg",
  "wallpaper-removal": "/images/hero-renovation.jpg",
  "drywall-repair": "/images/hero-renovation.jpg",
};

export async function generateStaticParams() {
  return SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICE_DETAILS[slug];
  if (!service) return {};
  const ogImage =
    SERVICE_OG_IMAGES[slug] ?? "/images/hero-renovation.jpg";
  return {
    alternates: { canonical: `${SITE.url}/services/${slug}` },
    title: service.metaTitle,
    description: service.metaDescription,
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      images: [`${SITE.url}${ogImage}`],
    },
    twitter: {
      card: "summary_large_image",
      title: service.metaTitle,
      description: service.metaDescription,
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = SERVICE_DETAILS[slug];
  if (!service) notFound();
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: SITE.url },
          { name: "Our Services", url: `${SITE.url}/services` },
          { name: service.name, url: `${SITE.url}/services/${slug}` },
        ]}
      />
      <ServiceDetailTemplate service={service} />
    </>
  );
}
