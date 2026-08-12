import { PageLayout } from "@/components/site/PageLayout";

const Lab = () => {
  return (
    <PageLayout
      title="Observability Lab | ObservabiliTrends"
      description="A practical laboratory used to test observability concepts, dashboards, metrics and engineering resources."
    >
      <article className="container mx-auto max-w-4xl px-4 py-16">
        <header className="mb-12">
          <p className="mono mb-3 text-sm text-muted-foreground">
            OBSERVABILITY LAB
          </p>

          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
            ObservabiliTrends Lab
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">
            A practical laboratory used to test observability concepts,
            build dashboards and panels, and validate the resources
            published on ObservabiliTrends.
          </p>
        </header>

        <div className="space-y-12">
          <section>
            <h2 className="mb-4 text-2xl font-semibold">
              Laboratory architecture
            </h2>

            <p className="mb-6 leading-relaxed text-muted-foreground">
              The laboratory combines a containerized application with
              Prometheus-based metrics collection and Grafana visualization.
              It provides a controlled environment for observability
              experiments, dashboard design and resource creation.
            </p>

            <img
              src="/lab/images/Observabilitrends_Lab_diagram.webp"
              alt="ObservabiliTrends laboratory architecture"
              className="w-full rounded-lg border border-border"
            />
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">Components</h2>

            <ul className="space-y-3 leading-relaxed text-muted-foreground">
              <li>
                <strong className="text-foreground">Docker</strong> —
                container runtime hosting the laboratory components.
              </li>

              <li>
                <strong className="text-foreground">easyTravel</strong> —
                Dynatrace's example application used as the application
                workload.
              </li>

              <li>
                <strong className="text-foreground">Prometheus</strong> —
                metrics collection and time-series storage.
              </li>

              <li>
                <strong className="text-foreground">cAdvisor</strong> —
                container-level resource metrics.
              </li>

              <li>
                <strong className="text-foreground">Node Exporter</strong> —
                host-level system metrics.
              </li>

              <li>
                <strong className="text-foreground">Grafana</strong> —
                dashboards and visualization.
              </li>
            </ul>

            <p className="mt-6 leading-relaxed text-muted-foreground">
              easyTravel is available from the{" "}
              <a
                href="https://github.com/Dynatrace/easyTravel-Docker"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground underline underline-offset-4"
              >
                Dynatrace easyTravel-Docker repository
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">
              What the laboratory can measure
            </h2>

            <p className="mb-6 leading-relaxed text-muted-foreground">
              The environment provides telemetry that can be used to explore
              practical observability questions across the host, containers
              and application workload.
            </p>

            <ul className="space-y-3 leading-relaxed text-muted-foreground">
              <li>
                <strong className="text-foreground">Host health:</strong>{" "}
                CPU, memory, filesystem and network activity.
              </li>

              <li>
                <strong className="text-foreground">Container health:</strong>{" "}
                CPU, memory, network, filesystem and container resource
                consumption.
              </li>

              <li>
                <strong className="text-foreground">
                  Application behaviour:
                </strong>{" "}
                request activity, application load and service behaviour
                exposed through the application and its containers.
              </li>

              <li>
                <strong className="text-foreground">
                  Workload behaviour:
                </strong>{" "}
                changes in resource consumption as traffic and simulated user
                activity change.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">
              What it is used for
            </h2>

            <p className="leading-relaxed text-muted-foreground">
              The laboratory is used to create and validate practical
              examples for ObservabiliTrends, including dashboards,
              individual panels, Prometheus queries and reusable Grafana
              resources.
            </p>
          </section>
        </div>
      </article>
    </PageLayout>
  );
};

export default Lab;