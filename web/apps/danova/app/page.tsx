import { Hero } from "@/components/home/Hero";
import { FAQSchema } from "@/components/shared/StructuredData";
import { HOME_FAQ } from "@/lib/content/faq";
import { Stats } from "@/components/home/Stats";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { Process } from "@/components/home/Process";
import dynamic from "next/dynamic";
import { ServiceArea } from "@/components/home/ServiceArea";
import { FaqSection } from "@/components/home/FaqSection";
import { BlogPreview } from "@/components/home/BlogPreview";
import { FooterCta } from "@/components/home/FooterCta";

const Testimonials = dynamic(
  () => import("@/components/home/Testimonials").then((m) => m.Testimonials),
  {
    loading: () => (
      <section className="px-4 py-16 md:py-24">
        <div className="container mx-auto">
          <h2 className="font-serif text-2xl font-bold md:text-3xl">
            What Our Customers Say
          </h2>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Real feedback from homeowners and business owners across Fort
            Lauderdale and Miami.
          </p>
        </div>
      </section>
    ),
  }
);

export default function HomePage() {
  return (
    <>
      <FAQSchema faqs={HOME_FAQ} />
      <Hero />
      <Stats />
      <ServicesGrid />
      <Process />
      <Testimonials />
      <ServiceArea />
      <FaqSection />
      <BlogPreview />
      <FooterCta />
    </>
  );
}
