import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { BreadcrumbSchema } from "@/components/shared/StructuredData";
import { PROJECTS } from "@/lib/content/projects";
import { SITE } from "@/lib/constants";

export const metadata = {
  title: "Projects",
  description:
    "Browse recent Danova Renovations projects across Fort Lauderdale and Miami, including interior and exterior painting, commercial work, and flooring installations.",
};

export default function ProjectsPage() {
  return (
    <div className="px-4 py-16 md:py-24">
      <BreadcrumbSchema
        items={[
          { name: "Home", url: SITE.url },
          { name: "Projects", url: `${SITE.url}/projects` },
        ]}
      />
      <div className="container mx-auto">
        <h1 className="font-serif text-3xl font-bold md:text-4xl">Our Projects</h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Recent residential and commercial transformations delivered by the Danova
          team.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {PROJECTS.map((project) => (
            <Link key={project.slug} href={`/projects/${project.slug}`} className="group block">
              <Card className="h-full overflow-hidden transition-colors group-hover:border-primary/50">
                {project.image ? (
                  <div className="relative aspect-[16/10] bg-muted">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                ) : null}
                <CardContent className="p-6">
                  <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                    {project.category}
                  </p>
                  <h2 className="mt-2 font-serif text-2xl font-semibold">{project.title}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">{project.location}</p>

                  <div className="mt-4 space-y-3 text-sm text-muted-foreground">
                    <p>
                      <span className="font-semibold text-foreground">Scope: </span>
                      {project.scope}
                    </p>
                    <p>
                      <span className="font-semibold text-foreground">Result: </span>
                      {project.result}
                    </p>
                  </div>

                  <span className="mt-5 inline-block font-medium text-primary group-hover:underline">
                    View project details →
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
