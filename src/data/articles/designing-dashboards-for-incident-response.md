# Designing Dashboards for Incident Response

## Abstract

An incident-response dashboard provides a structured view of system behaviour during an investigation. Its design determines which signals are immediately visible, how engineers compare observations and how they move from an initial anomaly towards more specific evidence.

This article examines how information hierarchy, temporal context, service-level comparison and correlation can be applied to incident-response dashboards. It develops a practical design based on the investigative questions engineers need to answer, then proposes a dashboard structure that can be implemented and evaluated using the ObservabiliTrends Lab.

The objective is to establish a design that supports a repeatable investigative process while keeping the interpretation of telemetry explicit and technically defensible.

## Introduction

The first two articles in the Dashboard Design Series established the foundations for dashboard engineering. *Why Dashboards Often Fail Before They Are Even Built* examined the role of objectives, audience and ownership in defining a dashboard's purpose. *Dashboard Design Principles* explored how information hierarchy, visual consistency and controlled complexity affect the interpretation of operational data.

Incident response applies these principles to a specific operational context: investigating a condition that requires attention. The engineer must establish the observed state, determine its scope, understand its temporal evolution and identify the evidence needed to continue the investigation.

These tasks imply a relationship between the questions being investigated and the information presented on the dashboard. A resource metric, for example, becomes more useful when its current value can be compared with previous behaviour and with the corresponding values for other services. The design must make those relationships accessible without requiring the engineer to reconstruct them from unrelated visualisations.

The following sections develop this relationship between investigative questions and dashboard structure. The proposed implementation uses infrastructure telemetry from the ObservabiliTrends Lab to demonstrate the design decisions and identify their limitations.

## An incident dashboard should follow the investigative process

An incident-response dashboard is useful when its information supports the tasks required to understand an abnormal condition. Those tasks depend on the nature of the incident, but a practical starting point is to establish the current state, determine the affected scope, examine temporal changes and identify the components that warrant further investigation.

This sequence provides a basis for organising the dashboard. An initial overview establishes the condition under investigation. Service-level comparisons help distinguish between a system-wide change and a condition concentrated in a subset of components. Time-series visualisations then provide evidence about when the observed behaviour changed and whether related signals changed within the same interval. More detailed panels support investigation of the components identified in the preceding steps.

The sequence is a design model, not a claim that every investigation follows a fixed path. An engineer may return to an earlier question when new evidence changes the working hypothesis. The dashboard should therefore support movement between levels of detail without losing the context established during the initial assessment.

This approach also provides a practical criterion for evaluating the layout. The position and prominence of a panel should reflect the investigative task it supports. Information required to establish the current situation belongs in the initial view; detailed component-level evidence can remain accessible further down the dashboard or through a linked diagnostic view.

## Organise information by investigative priority

Information hierarchy determines the order in which visual elements attract attention and the effort required to locate a particular signal. Stephen Few's work on information dashboards and Colin Ware's research on visual perception provide useful foundations for understanding how visual organisation affects information retrieval and interpretation.

For incident response, the hierarchy should reflect the consequences of the decisions being made. The initial view needs to establish what has been observed and its apparent scope. Supporting views should then help the engineer compare components, understand changes over time and inspect relevant resource behaviour. Detailed diagnostic information remains available, but it should not compete visually with the information needed to establish the situation.

This hierarchy can be implemented through panel placement, size, grouping and consistent visual encoding. A service comparison, for example, benefits from a common scale when the purpose is to compare resource consumption across services. A time-series panel has a different purpose: it exposes variation over a selected interval. Treating these two tasks as separate visualisation requirements makes the intended interpretation clearer.

The hierarchy must also preserve the distinction between an observation and a conclusion. Elevated CPU consumption identifies a resource condition; by itself, it does not establish that the service is unhealthy or that the resource is responsible for an incident. The dashboard should make the observation accessible while providing enough supporting context to investigate its significance.

## Current state and temporal evolution provide complementary evidence

A current-value visualisation and a time-series chart answer different questions. The first establishes the value at a selected evaluation time. The second shows how that value has changed across an interval. During an investigation, these views are complementary because the present condition may be insufficient to explain how the system reached it.

Consider CPU consumption in a containerised application. A current value can identify a service that is consuming more CPU than its peers. Its time series can show whether consumption increased abruptly, remained elevated or fluctuated during the observation window. Comparing the series with those of other services provides additional evidence about the distribution of the condition.

The time range and evaluation interval are part of this interpretation. A short window can expose recent changes in detail but omit earlier behaviour. A longer window provides historical context while potentially reducing the visibility of short-lived events. The selected interval should therefore correspond to the period relevant to the investigation, with enough history to establish a meaningful comparison.

Temporal alignment is equally important when comparing signals. Panels intended to support a common investigation should use compatible time ranges. Where the underlying metrics have different sampling intervals, scrape configurations or aggregation behaviour, apparent differences between series must be interpreted with those characteristics in mind. A dashboard can expose temporal relationships, but visual coincidence alone does not establish causality.

## Compare components before examining individual details

Service-level comparison helps establish whether a condition is distributed across the application or concentrated in a particular component. This distinction can narrow the scope of an investigation and determine which evidence should be examined next.

A comparison panel should use a visual representation suited to the question. A ranked bar chart can make differences in current CPU consumption or memory usage easy to compare at a selected evaluation time. A time series is more appropriate when the investigation concerns changes, recurring patterns or differences in behaviour across an interval. These representations should be selected according to the task, not merely according to the availability of a metric.

The comparison also depends on the meaning and units of the data. CPU usage expressed in cores, CPU usage expressed as a percentage and cumulative CPU time represent different quantities. Memory working set, memory usage and configured memory limits are likewise distinct measurements. A comparison is meaningful only when the metric definition, aggregation and unit are consistent with the intended interpretation.

Aggregation deserves particular attention. Summing CPU usage across containers can provide a service-level view, provided that the selected series represent the intended scope and do not introduce duplicate measurements. Summing memory working set can provide an aggregate of the selected container values, but the result should not automatically be interpreted as unique physical memory consumed by the application. The aggregation must be documented wherever its meaning could otherwise be ambiguous.

Once a comparison identifies a component that warrants attention, the dashboard should provide a clear route to more detailed evidence. The purpose of the comparison is to narrow the investigation; the purpose of the diagnostic view is to examine the selected component.

## Correlate signals without obscuring their meaning

Incident investigation requires engineers to evaluate several signals in relation to one another. CPU, memory, network activity and component lifecycle events may contribute to the same investigation, but placing them together does not automatically make their relationship easier to understand.

A useful correlation view begins with an explicit question. If the question concerns whether a rise in CPU consumption coincides with a change in network activity, the relevant signals should be presented with compatible time ranges and clearly identified units. If the signals differ substantially in scale, separate panels may preserve their individual patterns more effectively than a shared axis.

The number of series also affects interpretation. A chart containing numerous services can make it difficult to distinguish individual changes, particularly when lines overlap. Filtering to a selected service, grouping related components or using separate comparison and evolution panels can make the relevant relationships easier to inspect. The appropriate choice depends on the number of components, their behaviour and the purpose of the comparison.

Correlation must remain distinct from causal attribution. Two metrics changing at approximately the same time provide a reason to investigate their relationship, but that observation alone does not establish which condition caused the other. Deployment events, application traces, logs or application-level metrics may be required to test a hypothesis. When those signals are unavailable, the dashboard should make that limitation explicit.

## Provide context for interpreting abnormal values

A metric value has operational meaning only in relation to its measurement definition, expected behaviour and surrounding evidence. CPU consumption, for example, can be interpreted in relation to available capacity, service demand and the behaviour of comparable components. Memory growth may warrant investigation, but its significance depends on the workload, the measurement being collected and whether the observed change persists.

Context can be provided through historical comparisons, service-level breakdowns, relevant thresholds and annotations for known changes. These mechanisms answer different questions. Historical behaviour provides a reference for the observed system; comparison across components helps establish distribution; thresholds encode an explicit operational criterion; and annotations identify events that may be relevant to the time window under investigation.

Thresholds should be treated as documented operational choices. A value that is meaningful for one workload may be unsuitable for another, and a resource threshold does not necessarily indicate user impact. Where thresholds are used, their units, scope and rationale should be clear. Where no defensible threshold exists, the dashboard can still support investigation through comparison and temporal context without implying that a particular value represents a failure.

The dashboard's role is to expose evidence in a form that supports hypothesis formation and evaluation. Conclusions about the cause, severity or user impact of an incident require evidence appropriate to those questions.

## A practical incident-response dashboard structure

The following structure translates the preceding principles into an implementation plan. It separates the initial assessment from service comparison, temporal analysis and component-level investigation. The rows describe investigative purposes; they are not a requirement to maximise the number of panels.

| Row | Investigative purpose | Proposed panels |
|---|---|---|
| 1. Incident overview | Establish the observed state and apparent scope | Overall resource summary; total CPU consumption; total memory working set; affected or selected services |
| 2. Service comparison | Identify differences between services | CPU usage by service; memory usage by service; network activity by service |
| 3. System evolution | Examine when and how resource behaviour changed | CPU evolution; memory evolution; network evolution |
| 4. Investigation focus | Inspect components selected for further investigation | CPU by container; memory by container; network by container; restart and lifecycle activity |
| 5. Supporting context | Add evidence required by the investigative scenario | Resource distribution; available service or container status; relevant infrastructure signals; change annotations where available |

**Row 1 — Incident overview.** The initial row should summarise the selected observation window and the resource signals available for assessment. Aggregate values should be accompanied by clear units and an explicit scope. An overall health indicator should only be introduced when it is derived from a defined health signal; resource consumption alone is not sufficient to establish application health.

**Row 2 — Service comparison.** These panels should help identify differences between the selected services. Current-value comparisons can use ranked bars or another representation that preserves a clear relationship between value and magnitude. Service names, units and aggregation rules should remain consistent across the panels.

**Row 3 — System evolution.** These panels should expose changes across the same observation window. CPU, memory and network activity provide complementary evidence, but their different units and behaviours should remain visible. Compatible time ranges help the engineer compare when changes occurred without implying that the signals share the same causal mechanism.

**Row 4 — Investigation focus.** Component-level panels provide detail once a service or container has been selected for investigation. These panels should use filtering or other selection mechanisms where available, so that the engineer can examine the relevant components without making the initial dashboard visually dense. Restart and lifecycle information should use the appropriate event or counter semantics rather than presenting cumulative counters as event timestamps.

**Row 5 — Supporting context.** This row is reserved for signals that answer a defined question left open by the preceding views. The inclusion of additional infrastructure metrics, availability information or change annotations depends on the telemetry available and the investigation being supported. A panel should not be included solely because its metric can be collected.

The structure is intended to evolve through implementation and evaluation. A proposed panel may be removed, replaced or moved when its actual contribution to the investigation becomes clear. The resulting dashboard should reflect the questions that can be answered reliably with its data sources.

## Building and validating the dashboard in the ObservabiliTrends Lab

The ObservabiliTrends Lab provides a practical environment for implementing these design decisions with Docker, Prometheus, cAdvisor, Node Exporter, Grafana and Dynatrace EasyTravel. The environment exposes infrastructure and container telemetry that can be used to compare resource consumption, examine time-series behaviour and investigate differences between application components.

The lab can therefore demonstrate several of the design decisions described in this article. For example, CPU usage can be compared across EasyTravel containers, memory working set can be presented as a service-level breakdown, and time-series panels can expose how resource consumption changes during a test run. These examples allow the panel's purpose, metric definition, aggregation and visual representation to be examined together.

The current telemetry also defines the limits of what the dashboard can demonstrate. Infrastructure metrics can reveal resource behaviour, but they do not independently establish user experience, transaction success or the root cause of an application failure. Those questions require suitable application-level or user-facing signals. The dashboard should distinguish between evidence available in the laboratory and evidence that would be required in a production investigation.

The implementation will be developed progressively. Each panel will be added when its investigative purpose, underlying metric and interpretation can be stated clearly. Screenshots, dashboard definitions, PromQL queries and selected panel configurations will be published as practical resources alongside the article where they can be reused and inspected.

The [ObservabiliTrends Lab](/lab) provides the architecture and context for these examples. The accompanying resources will allow readers to examine the implementation directly, reproduce selected visualisations in a compatible environment and assess the design choices against their own requirements.

## Conclusion

Incident-response dashboard design depends on the relationship between investigative questions, telemetry and visual organisation. A useful structure provides an initial view of the observed condition, supports comparison across components, exposes temporal changes and makes more detailed evidence accessible when the investigation requires it.

These design choices do not remove the need for engineering judgement. They determine how readily the available evidence can be found and interpreted, while the reliability of any conclusion remains dependent on the quality, semantics and scope of the underlying telemetry.

The proposed dashboard provides a concrete basis for evaluating those choices. Its implementation in the ObservabiliTrends Lab will make the design decisions inspectable and testable, with each published resource tied to a defined investigative purpose.

## Key takeaways

- Dashboard structure should follow the investigative questions it is intended to support.
- Information hierarchy should reflect operational priority and the progression from initial assessment to detailed investigation.
- Current values, service comparisons and time-series evolution provide complementary evidence.
- Metric definitions, units, aggregation and time ranges determine whether comparisons are meaningful.
- Temporal correlation can support a hypothesis, but it does not establish causality.
- Context should help engineers interpret measurements without implying unsupported conclusions about health or user impact.
- Additional panels should be introduced when they answer a defined investigative question.
- The dashboard should be evaluated against observable behaviour and documented limitations, not visual appearance alone.

## Dashboard Design Series

This article is part of the **Dashboard Design Series**, an editorial collection examining dashboard engineering from initial planning through design, incident response and long-term governance.

1. [Why Dashboards Often Fail Before They Are Even Built](/articles/why-dashboards-often-fail-before-they-are-even-built)
2. [Dashboard Design Principles](/articles/dashboard-design-principles)
3. Designing Dashboards for Incident Response
4. Dashboard Anti-Patterns — coming soon
5. Dashboard Governance and Lifecycle Management — coming soon

## Further reading

- Few, S. (2006). *Information Dashboard Design: Displaying Data for At-a-Glance Monitoring*. Analytics Press.
- Few, S. (2009). *Now You See It: Simple Visualization Techniques for Quantitative Analysis*. Analytics Press.
- Ware, C. (2020). *Information Visualization: Perception for Design*, 4th edition. Morgan Kaufmann.
- Tufte, E. R. (1983). *The Visual Display of Quantitative Information*. Graphics Press.
- Google. *[Site Reliability Engineering](https://sre.google/sre-book/table-of-contents/)*.
- Google. *[The Site Reliability Workbook](https://sre.google/workbook/table-of-contents/)*.
- Grafana Labs. *[Dashboard design](https://grafana.com/docs/grafana/latest/dashboards/build-dashboards/)*.
- Prometheus. *[Querying basics](https://prometheus.io/docs/prometheus/latest/querying/basics/)* and *[Query functions](https://prometheus.io/docs/prometheus/latest/querying/functions/)*.

## Bibliography

Few, S. (2006). *Information Dashboard Design: Displaying Data for At-a-Glance Monitoring*. Analytics Press.

Few, S. (2009). *Now You See It: Simple Visualization Techniques for Quantitative Analysis*. Analytics Press.

Google. (2016). *Site Reliability Engineering: How Google Runs Production Systems*. O'Reilly Media.

Google. (2018). *The Site Reliability Workbook*. O'Reilly Media.

Tufte, E. R. (1983). *The Visual Display of Quantitative Information*. Graphics Press.

Ware, C. (2020). *Information Visualization: Perception for Design*. 4th ed. Morgan Kaufmann.

Grafana Labs. *Dashboard design*. https://grafana.com/docs/grafana/latest/dashboards/build-dashboards/

Prometheus. *Querying basics*. https://prometheus.io/docs/prometheus/latest/querying/basics/

Prometheus. *Query functions*. https://prometheus.io/docs/prometheus/latest/querying/functions/
