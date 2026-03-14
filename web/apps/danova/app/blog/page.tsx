import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { BreadcrumbSchema } from "@/components/shared/StructuredData";
import { BLOG_POSTS } from "@/lib/content/blog";
import { SITE } from "@/lib/constants";

export const metadata = {
  title: "Blog",
  description:
    "Tips, guides, and insights for homeowners in Fort Lauderdale and Miami. Painting, flooring, and renovation advice from Danova Renovations.",
};

export default function BlogPage() {
  return (
    <div className="px-4 py-16 md:py-24">
      <BreadcrumbSchema
        items={[
          { name: "Home", url: SITE.url },
          { name: "Blog", url: `${SITE.url}/blog` },
        ]}
      />
      <div className="container mx-auto max-w-4xl">
        <h1 className="font-serif text-3xl font-bold md:text-4xl">
          From Our Blog
        </h1>
        <p className="mt-4 text-muted-foreground">
          Tips, guides, and insights for homeowners in South Florida.
        </p>
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {BLOG_POSTS.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <Card className="h-full overflow-hidden transition-colors hover:border-primary/50">
                <div className="relative aspect-video bg-muted">
                  {post.image ? (
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-muted-foreground">
                      <span className="text-5xl">📝</span>
                    </div>
                  )}
                </div>
                <CardContent className="p-6">
                  <time
                    dateTime={post.date}
                    className="text-sm text-muted-foreground"
                  >
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                  <h2 className="mt-2 font-serif text-xl font-semibold">
                    {post.title}
                  </h2>
                  <p className="mt-2 line-clamp-3 text-muted-foreground">
                    {post.excerpt}
                  </p>
                  <span className="mt-4 inline-block font-medium text-primary hover:underline">
                    Read More →
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
