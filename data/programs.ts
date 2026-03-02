export interface Program {
  slug: string;
  name: string;
  level: string;
  discipline: string;
  city: string;
  state: string;
}

export const programs: Program[] = [
  {
    slug: "ms-computer-science",
    name: "MS in Computer Science",
    level: "Masters",
    discipline: "STEM · Computer Science",
    city: "Boston",
    state: "MA"
  },
  {
    slug: "ms-data-analytics",
    name: "MS in Data Analytics",
    level: "Masters",
    discipline: "STEM · Data & Analytics",
    city: "San Francisco",
    state: "CA"
  },
  {
    slug: "bs-business-administration",
    name: "BS in Business Administration",
    level: "Bachelors",
    discipline: "Business & Management",
    city: "New York",
    state: "NY"
  },
  {
    slug: "ms-engineering-management",
    name: "MS in Engineering Management",
    level: "Masters",
    discipline: "STEM · Engineering Management",
    city: "Chicago",
    state: "IL"
  }
];

