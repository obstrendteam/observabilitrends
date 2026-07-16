
import { PageLayout } from "@/components/site/PageLayout";

export default function Resources() {
  return (
    <PageLayout
      title="Engineering Resources — ObservabiliTrends"
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

        <div className="mt-12 surface-card p-8">
          <h2 className="text-xl font-semibold">
            Resources are being published
          </h2>

          <p className="mt-3 text-muted-foreground">
            The first engineering resources are currently being integrated into
            the new resource library.
          </p>
        </div>
      </section>
    </PageLayout>
  );
}
