import { EngineeringResource } from "../resourceTypes";

import { R0001 } from "./r-0001";
import { R0002 } from "./r-0002";

export const RESOURCES: EngineeringResource[] = [
  R0001,
  R0002,
];

export function getFeaturedResources() {
  return RESOURCES.filter(r => r.featured);
}

export function getResource(slug: string) {
  return RESOURCES.find(r => r.slug === slug);
}
