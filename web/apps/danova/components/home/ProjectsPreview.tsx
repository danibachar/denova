import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { PROJECTS } from "@/lib/content/projects";

const featuredProjects = PROJECTS.slice(0, 3);

export function ProjectsPreview() {
  return (
    <section className="px-4 py-16 md:py-24">
      <div className="container mx-auto">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="font-serif text-2xl font-bold md:text-3xl">Recent Projects</h2>
            <p className="mt-2 max-w-2xl text-muted-foreground">
              A quick look at recent paint and flooring projects completed across
              Fort Lauderdale and Miami.
            </p>
          </div>
          <Link href="/projects" className="hidden text-sm font-medium text-primary hover:underline md:inline">
            View all projects →
          </Link>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {featuredProjects.map((project) => (
            <Card key={project.slug} className="h-full overflow-hidden">
              {project.image ? (
                <div className="relative aspect-[4/3] bg-muted">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              ) : null}
              <CardContent className="p-6">
                <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                  {project.category}
                </p>
                <h3 className="mt-2 font-serif text-xl font-semibold">{project.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{project.location}</p>
                <p className="mt-4 text-sm text-muted-foreground">{project.scope}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Link href="/projects" className="mt-6 inline-block text-sm font-medium text-primary hover:underline md:hidden">
          View all projects →
        </Link>
      </div>
    </section>
  );
}
