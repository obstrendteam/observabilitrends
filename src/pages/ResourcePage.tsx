import { useParams } from "react-router-dom";
import { PageLayout } from "@/components/site/PageLayout";
import { getResource } from "@/data/resources";
import NotFound from "./NotFound";

export default function ResourcePage() {
  const { slug = "" } = useParams();

  const resource = getResource(slug);

  if (!resource) {
    return <NotFound />;
  }

  return (
    <PageLayout
      title={`${resource.title} — ObservabiliTrends`}
      description={resource.description}
      canonical={`/resources/${resource.slug}`}
    >
      <article className="container-prose py-20">
        <p className="mono text-xs uppercase tracking-wider text-primary">
          / engineering resource
        </p>

        <h1 className="mt-3 text-4xl md:text-5xl font-semibold tracking-tighter">
          {resource.title}
        </h1>

        <p className="mt-5 text-xl text-muted-foreground">
          {resource.subtitle}
        </p>

        <div className="mt-8 flex flex-wrap gap-3 text-sm text-muted-foreground">
          <span>Version {resource.version}</span>
          <span>•</span>
          <span>Updated {resource.updated}</span>
          <span>•</span>
          <span>{resource.estimatedTime}</span>
        </div>

        <div className="mt-12 whitespace-pre-wrap leading-8">
          {resource.content}
        </div>
      </article>
    </PageLayout>
  );
}
