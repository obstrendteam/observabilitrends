import { Helmet } from "react-helmet-async";
import PageLayout from "@/components/site/PageLayout";

const Lab = () => {
  return (
    <>
      <Helmet>
        <title>Observability Lab | ObservabiliTrends</title>
        <meta
          name="description"
          content="The ObservabiliTrends laboratory: a practical environment for testing observability concepts, dashboards, metrics and resources."
        />
      </Helmet>

      <PageLayout>
        <main className="container mx-auto px-6 py-16">
          <article className="mx-auto max-w-4xl">
            <header className="mb-12">
              <div className="mono text-sm text-muted-foreground mb-4">
                OBSERVABILITY LAB
              </div>

              <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
                ObservabiliTrends Lab
              </h1>

              <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-3xl">
                A practical laboratory used to validate observability concepts,
                build dashboards and panels, test queries, and create reusable
                resources for the ObservabiliTrends community.
              </p>
            </header>

            <section className="mb-12">
              <img
                src="/lab/images/Observabilitrends_Lab_diagram.webp"
                alt="ObservabiliTrends laboratory architecture"
                className="w-full rounded-xl border border-border"
              />
            </section>

            <section className="prose prose-invert max-w-none">
              <h2>Laboratory environment</h2>

              <p>
                The laboratory combines a containerized application with
                infrastructure and application telemetry components:
              </p>

              <ul>
                <li>
                  <strong>Docker</strong> — container runtime for the complete
                  laboratory environment.
                </li>
                <li>
                  <strong>easyTravel</strong> — Dynatrace's demo application,
                  used as the application under observation.
                </li>
                <li>
                  <strong>Prometheus</strong> — metrics collection and
                  time-series storage.
                </li>
                <li>
                  <strong>cAdvisor</strong> — container-level resource metrics.
                </li>
                <li>
                  <strong>Node Exporter</strong> — host-level system metrics.
                </li>
                <li>
                  <strong>Grafana</strong> — visualization, dashboard and panel
                  development.
                </li>
              </ul>

              <p>
                easyTravel is available from the{" "}
                <a
                  href="https://github.com/Dynatrace/easyTravel-Docker"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Dynatrace easyTravel-Docker repository
                </a>
                .
              </p>

              <h2>What we can observe</h2>

              <p>
                The laboratory provides several complementary sources of
                telemetry that can be combined in Grafana:
              </p>

              <ul>
                <li>
                  <strong>Host metrics:</strong> CPU, memory, filesystem,
                  network and system load.
                </li>
                <li>
                  <strong>Container metrics:</strong> CPU, memory, network,
                  filesystem and container lifecycle/resource consumption.
                </li>
                <li>
                  <strong>Application metrics:</strong> easyTravel container
                  activity and application-related signals available through
                  the running environment.
                </li>
                <li>
                  <strong>Prometheus metrics:</strong> scrape health,
                  collection status and time-series data from the monitored
                  targets.
                </li>
              </ul>

              <h2>Questions the laboratory can answer</h2>

              <ul>
                <li>
                  Is the infrastructure healthy?
                </li>
                <li>
                  Which containers are consuming the most CPU or memory?
                </li>
                <li>
                  Is resource consumption increasing over time?
                </li>
                <li>
                  Are containers restarting or behaving unexpectedly?
                </li>
                <li>
                  Is the application generating enough activity to exercise
                  the dashboards?
                </li>
                <li>
                  Can infrastructure and application signals be correlated?
                </li>
                <li>
                  Does a dashboard make the relevant signal immediately
                  understandable?
                </li>
              </ul>

              <h2>Why we use it</h2>

              <p>
                The laboratory is not intended to reproduce a complete
                production observability platform. Its purpose is to provide a
                controlled environment where dashboard designs, queries and
                observability patterns can be tested against real telemetry.
              </p>

              <p>
                Resources published by ObservabiliTrends may therefore include
                examples created and validated in this environment.
              </p>
            </section>
          </article>
        </main>
      </PageLayout>
    </>
  );
};

export default Lab;