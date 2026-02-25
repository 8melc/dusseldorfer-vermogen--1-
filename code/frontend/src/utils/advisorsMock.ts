// ui/src/utils/advisorsMock.ts
export interface Advisor {
  slug: string;
  name: string;
  role: string;
  image: string;
  tags: string[];
  tagline: string;
  location?: string; // NEU
}

export const advisorsMock: Advisor[] = [
  {
    slug: "christopher-peterka",
    name: "Christopher Peterka",
    role: "Innovationsstratege",
    image: "/images/advisors/peterka.webp", 
    tags: ["nachfolge", "digitalisierung"],
    tagline: "Evolution statt Revolution. Gestaltet Zukunft für etablierte Organisationen.",
    location: "Köln", // NEU
  },
  {
    slug: "pia-kemper",
    name: "Pia Kemper",
    role: "Leitung Finanz-Extras, Rheinische Post",
    image: "https://www.rp-forum.de/wp-content/uploads/2015/04/Pia-Kemper.jpg",
    tags: ["kunst", "esg", "medien"],
    tagline: "Verbindet Finanzwelten mit gesellschaftlicher Verantwortung und medialer Präsenz.",
    location: "Köln", // NEU
  },
  {
    slug: "dr-placeholder",
    name: "Dr. Alex Placeholder",
    role: "Expert in Everything",
    image: "https://via.placeholder.com/240x240/F5F1EB/0B0E28?text=AP",
    tags: ["esg", "impact"],
    tagline: "Providing insightful placeholder advice and strategic solutions for tomorrow.",
    location: "Berlin", // NEU
  },
  {
    slug: "prof-lorem-ipsum",
    name: "Prof. Lorem Ipsum",
    role: "Consultant of Concepts",
    image: "https://via.placeholder.com/240x240/0B0E28/F5F1EB?text=LI",
    tags: ["nachfolge", "kunst"],
    tagline: "Specializing in conceptual frameworks, mock data, and visionary planning.",
    location: "Hamburg", // NEU
  },
];
