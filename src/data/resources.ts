import { Resource } from "@/types/resource";

export const RESOURCES: Resource[] = [];

export const getFeaturedResources = () =>
  RESOURCES.filter(r => r.featured);

export const getResource = (slug: string) =>
  RESOURCES.find(r => r.slug === slug);

export const getRelatedResources = (
  slug: string,
  n = 3
) => {
  const resource = getResource(slug);

  if (!resource) return [];

  return RESOURCES
    .filter(
      r =>
        r.slug !== slug &&
        r.category === resource.category
    )
    .slice(0, n);
};
