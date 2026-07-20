import { PageLayout } from "@/components/site/PageLayout";
import { ResourceCard } from "@/components/site/ResourceCard";
import { RESOURCES } from "@/data/engineeringResources";

export default function Resources() {
  return (
    <PageLayout
      title="Engineering Resources - ObservabiliTrends"
      description="Frameworks, templates and practical engineering resources for observability, SRE and platform teams."
      canonical="/resources"
    >
      <section className="container-prose py-20">
        <p className="mono text-xs uppercase tracking-wider text-primary">
          / resources
        </p>

        <h1 className="mt-2 text-4xl md:text-5xl font-semibold tracking-tighter">
          Engineering Resources
        </h1>

        <p className="mt-4 max-w-2xl text-muted-foreground">
          Practical frameworks, templates and operational guides designed to
          help engineering teams make better decisions before writing code.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {RESOURCES.map((resource) => (
            <ResourceCard
              key={resource.id}
              resource={resource}
              featured={resource.featured}
            />
          ))}
        </div>
      </section>
    </PageLayout>
  );
}
