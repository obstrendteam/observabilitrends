# ObservabiliTrends Lab

The ObservabiliTrends Lab is a local environment used to validate observability concepts, develop dashboard examples, test PromQL queries, and produce practical resources for the ObservabiliTrends articles.

It combines a containerized demo application with Prometheus-based metrics collection and Grafana visualization. The environment provides a controlled setting for exploring infrastructure, container, and application workload behaviour.

## Architecture

![ObservabiliTrends Lab architecture](/images/lab/Observabilitrends_Lab_diagram.webp)

The laboratory consists of six main components:

- **Docker** runs the laboratory environment and its containers.
- **easyTravel** provides a multi-service demo application and the workload used for experiments.
- **cAdvisor** exposes container-level resource metrics.
- **Node Exporter** exposes host-level system metrics.
- **Prometheus** scrapes and stores metrics and provides the PromQL query layer.
- **Grafana** visualizes the collected metrics through dashboards and panels.

The easyTravel environment includes multiple application services and supporting components, such as frontends, a backend, MongoDB, NGINX, and load generators. These components provide a workload against which infrastructure and container metrics can be observed.

The demo application's Docker resources are available in the [Dynatrace easyTravel-Docker repository](https://github.com/Dynatrace/easyTravel-Docker).

## Metrics available

The metrics available depend on the enabled exporters, the running containers, and the current workload.

| Source | Metric domain | Examples |
|---|---|---|
| Node Exporter | Host resources | CPU, memory, filesystem, and network metrics |
| cAdvisor | Container resources | CPU, memory, network activity, and container-related metrics |
| Prometheus | Metrics collection and querying | Time-series storage, label-based filtering, aggregation, and PromQL queries |
| easyTravel | Application workload | Application activity and resource consumption observable through the available infrastructure and container metrics |

Prometheus provides a common query layer for the metrics exposed by the configured sources. This makes it possible to compare host-level and container-level behaviour over the same time range, provided the relevant metrics and labels are available.

## Questions the lab can help investigate

The environment can be used to investigate questions such as:

- Which containers consume the most CPU or memory during a workload?
- How do host and container resource metrics change over time?
- Does a resource-consumption pattern belong to an individual container or coincide with broader host activity?
- How does network activity vary between containers?
- Do container restarts coincide with changes in resource consumption?
- How does application workload activity correlate with infrastructure metrics?
- Which metrics and aggregations provide useful context for a particular dashboard panel?

These are investigation questions, not predefined conclusions. Their answers depend on the workload, the observation window, the available metrics, and the queries used.

## How we use the lab

The laboratory is a controlled environment for technical experiments and examples. It is not intended to represent a production deployment or to provide production-capacity estimates.

It supports the development and validation of:

- Grafana dashboards and individual panels.
- PromQL queries and metric aggregations.
- Resource-oriented visualizations.
- Comparisons of metrics over selected time windows.
- Reusable dashboard resources and practical examples for articles.

Where an article uses observations from the lab, the environment provides a way to reproduce or inspect the relevant experiment. Results should be interpreted in the context of the configured services, workload, metrics, and time range rather than generalized automatically to other environments.