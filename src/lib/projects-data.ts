import { Gem, Glasses, Warehouse, type LucideIcon } from "lucide-react";

export type ProjectSlug = "cristian-collection" | "optica-arichavala" | "tecnero";

export interface ProjectDefinition {
  slug: ProjectSlug;
  icon: LucideIcon;
  url: string;
  repoUrl?: string;
  liveNote?: boolean;
}

export const projects: ProjectDefinition[] = [
  {
    slug: "cristian-collection",
    icon: Gem,
    url: "https://cristiancollection.com/",
  },
  {
    slug: "optica-arichavala",
    icon: Glasses,
    url: "https://opticarichavala.com/",
  },
  {
    slug: "tecnero",
    icon: Warehouse,
    url: "https://tecnero.onrender.com/",
    repoUrl: "https://github.com/mateoguillen-26/Tecnero",
    liveNote: true,
  },
];
