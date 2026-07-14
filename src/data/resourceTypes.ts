export interface EngineeringResource {

  id: string;

  slug: string;

  title: string;

  subtitle: string;

  description: string;

  category: string;

  tags: string[];

  version: string;

  updated: string;

  estimatedTime: string;

  featured?: boolean;

  content: string;
}
