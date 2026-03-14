import Image from "next/image";
import { notFound } from "next/navigation";
import { BreadcrumbSchema } from "@/components/shared/StructuredData";
import { PROJECTS, getProjectBySlug } from "@/lib/content/projects";
import { SITE } from "@/lib/constants";

type ProjectDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: project.title,
    description: `${project.title} in ${project.location}. ${project.result}`,
  };
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="px-4 py-16 md:py-24">
      <BreadcrumbSchema
        items={[
          { name: "Home", url: SITE.url },
          { name: "Projects", url: `${SITE.url}/projects` },
          { name: project.title, url: `${SITE.url}/projects/${slug}` },
        ]}
      />
      <div className="container mx-auto max-w-5xl">
        <p className="text-xs font-semibold uppercase tracking-wide text-primary">
          {project.category}
        </p>
        <h1 className="mt-2 font-serif text-3xl font-bold md:text-5xl">{project.title}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{project.location}</p>

        {project.image ? (
          <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-xl bg-muted">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 900px"
              priority
            />
          </div>
        ) : null}

        <div className="mt-8 grid gap-8 md:grid-cols-3">
          <section className="md:col-span-2">
            <h2 className="font-serif text-2xl font-semibold">Project Overview</h2>
            <p className="mt-3 text-muted-foreground">{project.overview}</p>

            <div className="mt-6 space-y-3 text-muted-foreground">
              <p>
                <span className="font-semibold text-foreground">Scope: </span>
                {project.scope}
              </p>
              <p>
                <span className="font-semibold text-foreground">Result: </span>
                {project.result}
              </p>
            </div>

            {project.gallery && project.gallery.length > 0 ? (
              <div className="mt-8">
                <h3 className="font-serif text-xl font-semibold">Photo Gallery</h3>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  {project.gallery.map((img, index) => (
                    <div
                      key={`${project.slug}-${img}`}
                      className="relative aspect-[4/3] overflow-hidden rounded-lg bg-muted"
                    >
                      <Image
                        src={img}
                        alt={`${project.title} photo ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, 50vw"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </section>

          <aside>
            <div className="rounded-lg border bg-muted/30 p-5">
              <h3 className="font-serif text-xl font-semibold">Highlights</h3>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {project.highlights.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>

              <p className="mt-5 text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">Timeline: </span>
                {project.timeline}
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
