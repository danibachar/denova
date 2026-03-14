export type Project = {
  slug: string;
  title: string;
  location: string;
  category: "Interior Painting" | "Exterior Painting" | "Commercial" | "Flooring";
  scope: string;
  result: string;
  image?: string;
  gallery?: string[];
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
  },
];
