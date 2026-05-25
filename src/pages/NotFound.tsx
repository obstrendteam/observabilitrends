import { Link } from "react-router-dom";
import { PageLayout } from "@/components/site/PageLayout";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <PageLayout title="404 — ObservabiliTrends">
      <section className="container-prose py-32 text-center">
        <p className="mono text-xs uppercase tracking-wider text-primary">/ 404</p>
        <h1 className="mt-4 text-6xl md:text-8xl font-semibold tracking-tighter">Signal lost.</h1>
        <p className="mt-6 text-lg text-muted-foreground max-w-md mx-auto">
          The page you're looking for didn't make it past the collector. Let's get you back on a known route.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Button asChild><Link to="/">Back home</Link></Button>
          <Button asChild variant="outline"><Link to="/articles">Browse articles</Link></Button>
        </div>
      </section>
    </PageLayout>
  );
}
