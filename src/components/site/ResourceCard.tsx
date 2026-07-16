import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { EngineeringResource } from "@/data/resourceTypes";
import { ResourceBadge } from "./ResourceBadge";

interface Props {
  resource: EngineeringResource;
  featured?: boolean;
}

export function ResourceCard({ resource, featured = false }: Props) {
  return (
    <Link
      to={`/resources/${resource.slug}`}
      className={`group surface-card flex flex-col ${
        featured ? "p-8" : "p-6"
      }`}
    >
      <div className="flex items-center justify-between">
        <ResourceBadge>{resource.category}</ResourceBadge>

        <span className="mono text-xs text-muted-foreground">
          v{resource.version}
        </span>
      </div>

      <h3
        className={`mt-4 font-semibold tracking-tight group-hover:text-primary transition-colors ${
          featured ? "text-2xl" : "text-lg"
        }`}
      >
        {resource.title}
      </h3>

      <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
        {resource.subtitle}
      </p>

      <div className="mt-6 pt-4 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
        <span>{resource.estimatedTime}</span>

        <ArrowUpRight className="h-4 w-4 group-hover:text-primary transition-colors" />
      </div>
    </Link>
  );
}
