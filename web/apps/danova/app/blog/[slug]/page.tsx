import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { BLOG_POSTS } from "@/lib/content/blog";
import { BLOG_POST_CONTENT } from "@/lib/content/blog-posts";
import { ArticleSchema, BreadcrumbSchema } from "@/components/shared/StructuredData";
import { SITE } from "@/lib/constants";

export async function generateStaticParams() {
  return Object.keys(BLOG_POST_CONTENT).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = BLOG_POST_CONTENT[slug];
  if (!post) return {};
  const postMeta = BLOG_POSTS.find((item) => item.slug === slug);
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: postMeta?.image ? [`${SITE.url}${postMeta.image}`] : undefined,
    },
  };
}

function renderContent(content: string) {
  const paragraphs = content.trim().split("\n\n");
  return paragraphs.map((para, i) => {
    const parts = para.split(/(\*\*[^*]+\*\*)/g);
    const rendered = parts.map((part, j) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={j}>{part.slice(2, -2)}</strong>;
      }
      return part;
    });
    return (
      <p key={i} className="mt-4 first:mt-0">
        {rendered}
      </p>
    );
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = BLOG_POST_CONTENT[slug];
  if (!post) notFound();
  const postMeta = BLOG_POSTS.find((item) => item.slug === slug);

  return (
    <article className="px-4 py-16 md:py-24">
      <BreadcrumbSchema
        items={[
          { name: "Home", url: SITE.url },
          { name: "Blog", url: `${SITE.url}/blog` },
          { name: post.title, url: `${SITE.url}/blog/${slug}` },
        ]}
      />
      <ArticleSchema
        title={post.title}
        description={post.excerpt}
        datePublished={post.date}
        author={post.author}
        url={`${SITE.url}/blog/${slug}`}
      />
      <div className="container mx-auto max-w-2xl">
        <Link
          href="/blog"
          className="text-sm font-medium text-primary hover:underline"
        >
          ← Back to Blog
        </Link>
        <header className="mt-8">
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
          <h1 className="mt-2 font-serif text-3xl font-bold md:text-4xl">
            {post.title}
          </h1>
          <p className="mt-2 text-muted-foreground">By {post.author}</p>
        </header>
        {postMeta?.image ? (
          <div className="relative mt-8 aspect-video overflow-hidden rounded-2xl bg-muted">
            <Image
              src={postMeta.image}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 700px"
            />
          </div>
        ) : null}
        <div className="prose prose-neutral mt-10 dark:prose-invert">
          {renderContent(post.content)}
        </div>
        <div className="mt-12 border-t pt-8">
          <Button asChild variant="outline">
            <Link href="/estimate">Get a Free Estimate</Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
