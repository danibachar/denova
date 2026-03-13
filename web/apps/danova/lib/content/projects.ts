export type Project = {
  slug: string;
  title: string;
  location: string;
  category: "Interior Painting" | "Exterior Painting" | "Commercial" | "Flooring";
  scope: string;
  result: string;
};

export const PROJECTS: Project[] = [
  {
    slug: "victoria-park-home-refresh",
    title: "Victoria Park Home Refresh",
    location: "Fort Lauderdale, FL",
    category: "Interior Painting",
    scope:
      "Full interior repaint for a 2-story home including walls, trim, and doors.",
    result:
      "Delivered a brighter modern palette and completed the project in 5 days with minimal disruption.",
  },
  {
    slug: "miami-beach-condo-flooring",
    title: "Miami Beach Condo Flooring Upgrade",
    location: "Miami Beach, FL",
    category: "Flooring",
    scope:
      "Removed dated laminate and installed new wide-plank waterproof flooring throughout the unit.",
    result:
      "Improved durability and visual continuity while keeping the condo move-in ready on schedule.",
  },
  {
    slug: "coral-gables-exterior-repaint",
    title: "Coral Gables Exterior Repaint",
    location: "Coral Gables, FL",
    category: "Exterior Painting",
    scope:
      "Exterior prep, crack repairs, priming, and weather-resistant paint application.",
    result:
      "Boosted curb appeal and added long-lasting weather protection ahead of storm season.",
  },
  {
    slug: "downtown-miami-office-refresh",
    title: "Downtown Miami Office Refresh",
    location: "Miami, FL",
    category: "Commercial",
    scope:
      "After-hours repaint and touch-ups across reception, conference rooms, and shared spaces.",
    result:
      "Completed with zero business downtime and a clean, brand-aligned finish.",
  },
  {
    slug: "weston-open-concept-makeover",
    title: "Weston Open-Concept Makeover",
    location: "Weston, FL",
    category: "Interior Painting",
    scope:
      "Color consultation plus wall and ceiling repaint for kitchen, dining, and living zones.",
    result:
      "Created a cohesive open-plan look with durable, washable finishes for a family home.",
  },
  {
    slug: "pompano-beach-rental-turnover",
    title: "Pompano Beach Rental Turnover",
    location: "Pompano Beach, FL",
    category: "Flooring",
    scope:
      "Fast-turn flooring replacement and paint touch-ups between tenants.",
    result:
      "Turned the unit over within 72 hours, reducing vacancy time for the property owner.",
  },
];
