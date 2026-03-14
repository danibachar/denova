export type Project = {
  slug: string;
  title: string;
  location: string;
  category: "Interior Painting" | "Exterior Painting" | "Commercial" | "Flooring";
  scope: string;
  result: string;
  image?: string;
  gallery?: string[];
  overview: string;
  highlights: string[];
  timeline: string;
};

export const PROJECTS: Project[] = [
  {
    slug: "luxury-condo-interior-painting",
    title: "Luxury Condo Interior Painting",
    location: "Miami, FL",
    category: "Interior Painting",
    scope:
      "Full prep-and-paint package in a large open-concept condo: protected cabinetry and flooring, detailed masking, ceiling and wall spraying, and precise touch-ups around recessed lighting and built-ins.",
    result:
      "Delivered a clean, modern white finish with smooth, even coverage across high ceilings and long sightlines, creating a bright high-end interior ready for final fixtures.",
    image: "/images/projects/luxury-condo-interior/progress-1.jpg",
    gallery: [
      "/images/projects/luxury-condo-interior/progress-1.jpg",
      "/images/projects/luxury-condo-interior/progress-2.jpg",
      "/images/projects/luxury-condo-interior/progress-3.jpg",
    ],
    overview:
      "This project involved repainting a high-end Miami condo with an open layout, large window exposures, and multiple ceiling details. The objective was to deliver a premium white finish while protecting completed cabinetry and flooring during active construction.",
    highlights: [
      "Extensive masking and surface protection for millwork and floors",
      "Uniform white finish across broad wall runs and recessed ceilings",
      "Detailed cut lines around lighting points and architectural transitions",
      "Coordinated sequencing to keep trades moving with minimal rework",
    ],
    timeline: "Multi-day phased interior painting in coordination with final fit-out",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((project) => project.slug === slug);
}
