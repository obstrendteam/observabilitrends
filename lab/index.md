# ObservabiliTrends Lab

The ObservabiliTrends Lab is a local environment used to validate observability concepts, build dashboard examples, test PromQL queries, and create practical resources for the ObservabiliTrends articles.

It combines a containerized demo application with Prometheus-based metrics collection and Grafana visualization.

![ObservabiliTrends Lab Environment](./images/observabilitrends-lab-architecture.png)

## Architecture

The environment is built around six main components:

- **Docker** — runs the complete lab environment and the application containers.
- **easyTravel** — a multi-service demo application provided by Dynatrace and used as the application workload.
- **cAdvisor** — exposes container-level resource metrics.
- **Node Exporter** — exposes host-level system metrics.
- **Prometheus** — scrapes and stores the metrics and provides the PromQL query layer.
- **Grafana** — visualizes the metrics through dashboards and panels.

The easyTravel application is composed of several services, including frontends, backend, MongoDB, NGINX and load generators.

The application is based on the official Dynatrace easyTravel Docker project:

[Dynatrace/easyTravel-Docker](https://github.com/Dynatrace/easyTravel-Docker)

## Metrics available

The lab provides three complementary levels of observability data:

| Source | Scope | Examples |
|---|---|---|
| **Node Exporter** | Host | CPU, memory, filesystem, network |
| **cAdvisor** | Containers | CPU, memory, network, restarts |
| **easyTravel** | Application workload | Service-level resource consumption and application activity |

Prometheus allows these metrics to be queried individually or correlated across these levels.

## Questions the lab can answer

The environment is intentionally simple, but it is sufficient to investigate practical observability questions such as:

- Which services are consuming the most CPU?
- Which services are consuming the most memory?
- How does resource consumption evolve over time?
- Is a resource increase isolated to one container or affecting the whole workload?
- Which containers are generating the most network traffic?
- Are containers restarting unexpectedly?
- How does application load affect infrastructure resource consumption?
- Can a dashboard distinguish between current state, trends and anomalies?
- Which metrics are actually useful for answering a specific operational question?

## What we use the lab for

The lab is not intended to reproduce a production environment. It is a controlled environment for **testing and demonstrating observability and dashboard design principles**.

Resources published by ObservabiliTrends may therefore include:

- Grafana dashboards
- Individual panel examples
- PromQL queries
- Business-oriented dashboard panels
- Before/after dashboard examples
- Screenshots and visual examples
- Practical experiments supporting concepts discussed in our articles

Where appropriate, these resources are based on observations and experiments performed directly in this lab.