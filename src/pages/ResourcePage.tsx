
import { PageLayout } from "@/components/site/PageLayout";
import { useParams } from "react-router-dom";

export default function ResourcePage() {
  const { slug } = useParams();

  return (
    <PageLayout
      title="Engineering Resource — ObservabiliTrends"
      description="Engineering Resource"
      canonical={`/resources/${slug ?? ""}`}
    >
      <section className="container-prose py-20">
        <p className="mono text-xs uppercase tracking-wider text-primary">
          / resource
        </p>

        <h1 className="mt-2 text-4xl font-semibold tracking-tighter">
          Resource page
        </h1>

        <p className="mt-4 text-muted-foreground">
          Resource slug: <strong>{slug}</strong>
        </p>
      </section>
    </PageLayout>
  );
}
