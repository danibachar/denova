import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { PROJECTS } from "@/lib/content/projects";

export const metadata = {
  title: "Projects",
  description:
    "Browse recent Danova Renovations projects across Fort Lauderdale and Miami, including interior and exterior painting, commercial work, and flooring installations.",
};

export default function ProjectsPage() {
  return (
    <div className="px-4 py-16 md:py-24">
      <div className="container mx-auto">
        <h1 className="font-serif text-3xl font-bold md:text-4xl">Our Projects</h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Recent residential and commercial transformations delivered by the Danova
          team.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {PROJECTS.map((project) => (
            <Card key={project.slug} className="h-full overflow-hidden">
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

                {project.gallery && project.gallery.length > 1 ? (
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    {project.gallery.slice(0, 3).map((img) => (
                      <div key={img} className="relative aspect-[4/3] overflow-hidden rounded-md bg-muted">
                        <Image
                          src={img}
                          alt={`${project.title} progress photo`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 30vw, 15vw"
                        />
                      </div>
                    ))}
                  </div>
                ) : null}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
