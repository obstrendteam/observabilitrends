
export type ResourceDifficulty =
  | "Beginner"
  | "Intermediate"
  | "Advanced";

export interface Resource {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  tags: string[];
  version: string;
  updated: string;
  difficulty: ResourceDifficulty;
  estimatedTime: number;
  downloadable: boolean;
  featured?: boolean;
  content: string;
}
