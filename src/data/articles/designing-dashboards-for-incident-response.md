# Designing Dashboards for Incident Response

## Abstract

Incident response places different demands on operational dashboards than routine monitoring. During an incident, the information presented must help responders establish the current state of the service, assess user impact, identify relevant changes and decide where investigation should continue.

This article examines how dashboards can support that process. It focuses on information hierarchy, service-level signals, temporal context, change visibility and the transition from high-level assessment to detailed diagnosis. It also considers how dashboards should support coordination without becoming a substitute for incident management processes.

---

# Introduction

Incident response combines detection, assessment, mitigation and communication under time constraints. The information available to responders therefore needs to support a sequence of decisions rather than simply provide a comprehensive view of the system.

Google's SRE practices distinguish between monitoring that identifies a user-facing problem and monitoring that helps investigate its cause. Service-level indicators are useful for establishing that an objective is being violated, while additional telemetry is required to understand what may have contributed to that condition. A dashboard used during incident response should reflect this progression. 

[IMAGE 1 — Detection-to-diagnosis dashboard flow]

The distinction is important because a dashboard designed for routine observation can contain information that is useful during normal operations but difficult to interpret during an active incident. Incident response benefits from a more deliberate structure in which the most important questions can be answered before lower-level investigation begins.

---

# Start with service impact

The first task during an incident is to establish whether users or critical functionality are affected and to understand the scope of that impact.

This makes service-level information the natural starting point for an incident response dashboard. Availability, latency, error rates, request volume or SLO-related indicators can provide evidence about the condition of the service without requiring responders to inspect the implementation behind it.

Google's SRE guidance recommends placing SLI metrics prominently on the service dashboard because these metrics provide the first indication of user-impacting conditions. They also provide a stable reference point when the underlying implementation changes.

The dashboard should therefore make the current service state immediately identifiable. A responder should be able to determine whether the service is healthy, degraded or unavailable without first interpreting infrastructure metrics, individual component behaviour or detailed telemetry.

This does not imply that infrastructure information is unimportant. It determines where that information belongs in the investigation sequence.

> **Design principle**
>
> The first level of an incident dashboard should establish service impact before presenting information about internal implementation.

---

# Structure the dashboard around the investigation path

Once service impact has been established, the next question is what information can help explain it.

Incident investigation generally moves from symptoms towards possible causes. A dashboard can support this progression by organising information into levels of increasing diagnostic detail.

The first level establishes service health and user impact. The second provides context about the affected service, such as traffic distribution, dependency health or recent changes. The third exposes implementation-specific information that may help isolate the source of the problem.

This structure allows the same dashboard to support several stages of an investigation without giving every metric equal visual priority. Google SRE describes a similar progression from SLO-based alerting metrics towards additional data used to diagnose the underlying problem.

The hierarchy should also reflect the relationship between information. A dependency latency panel is more useful when it can be interpreted alongside the service latency it may influence. Deployment information becomes more useful when displayed close to the service indicators whose behaviour changed afterwards.

[IMAGE 2 — Example of a dashboard organised from service impact to diagnosis]

The objective is not to encode a fixed investigation procedure into the interface. Different incidents require different paths. The dashboard should instead make the relationships between levels of information clear enough that responders can choose the next useful investigation step.

---

# Make time part of the dashboard

Incident response is fundamentally temporal. The relevant question is not only whether a metric is abnormal, but when the behaviour changed and what else changed around the same time.

A current value without historical context can therefore be difficult to interpret. A latency of 800 milliseconds may represent a serious degradation for one service and normal behaviour for another. Comparing the current state with an appropriate historical baseline provides additional information about the magnitude and timing of the change.

Time alignment becomes particularly valuable when investigating changes. Deployments, configuration changes, infrastructure events and dependency failures can be displayed against the same time axis as service-level indicators. This does not establish causality, but it allows responders to identify temporal relationships that warrant further investigation.

[IMAGE 3 — Service health metrics with deployments, configuration changes and incident markers aligned on a common timeline]

The choice of time range also matters. A dashboard that defaults to an excessively narrow window can hide the beginning of an incident, while an excessively broad window can make recent changes difficult to distinguish from normal historical variation.

A useful incident dashboard should therefore make the selected time range explicit and allow it to be changed without disrupting the relationship between related panels.

---

# Expose changes and dependencies

A service rarely operates in isolation. Its behaviour can depend on other services, infrastructure components, external systems and configuration.

During an incident, responders need enough context to determine whether an observed symptom is local to the affected service or part of a broader condition. Dependency information can help establish that scope.

For example, an increase in request latency may coincide with degradation in a downstream service. An increase in application errors may coincide with a database connection limit being reached. A sudden change in traffic may affect several services at the same time.

A dashboard cannot determine the cause from temporal correlation alone. It can, however, make relevant relationships visible and reduce the effort required to investigate them.

The same principle applies to changes. Deployments, configuration changes, feature-flag updates and infrastructure modifications can provide important context when their timing overlaps with the incident.

[IMAGE 4 — Dependency and change context around an incident timeline]

Change information should be presented as context rather than as an implicit explanation. A deployment marker appearing immediately before an increase in errors is evidence worth investigating; it is not, by itself, proof that the deployment caused the incident.

---

# Design for comparison, not isolated values

Incident response requires comparison against something: a previous period, an expected range, another service, another region or another component.

Displaying isolated metric values makes these comparisons harder to perform mentally. Trends, baselines and related series provide additional context without requiring responders to reconstruct it from separate views.

The appropriate comparison depends on the metric and the question being investigated. A request-rate graph may benefit from comparison with a previous period. An SLO indicator may be more useful when shown against its objective. A regional service may need to be compared with other regions to establish whether the problem is local or global.

The dashboard should therefore make meaningful comparisons visible where they support the investigation. This follows the broader principle described by Stephen Few: dashboard visualisation should make important information available for rapid perception rather than requiring unnecessary interpretation.

Comparison should remain subordinate to the operational question. Adding baselines or reference series that cannot influence a decision increases visual density without necessarily increasing understanding.

---

# Support the human factors of incident response

Incident response involves coordination as well as technical investigation. Google describes incident management in terms of coordinating, communicating and controlling the response, with explicit roles assigned to manage these responsibilities.

A dashboard can contribute to this process by providing a shared operational view. When responders, incident commanders and stakeholders refer to the same service indicators and time range, discussions can be grounded in observable system behaviour.

This does not mean that a dashboard should attempt to become an incident management interface. Communication channels, ownership, task tracking and decision records belong to the incident management process itself. The dashboard's role is to provide reliable operational evidence that those activities can reference.

This distinction also affects dashboard content. Information that changes frequently during an incident should have a clear source and an understandable meaning. Ambiguous labels, undocumented calculations or panels whose data is unavailable during partial outages reduce confidence precisely when reliable information is most important.

[IMAGE 5 — Shared incident view showing service state, timeline and operational context]

A response dashboard should also remain usable when the system is degraded. If the dashboard depends on the same failing components that it is intended to investigate, responders may lose access to the information they need. This makes the availability and independence of monitoring infrastructure part of the dashboard's operational design.

---

# Separate assessment from deep diagnosis

An incident dashboard does not need to contain every diagnostic signal available in the observability platform.

Detailed logs, traces, profiler data, infrastructure metrics and service-specific telemetry may be essential during investigation. Their value does not require them to occupy the primary incident view.

A useful separation is between information required to establish the current state and information required to investigate that state. The first belongs in the response dashboard. The second can remain available through linked dashboards, drill-downs or the underlying observability tools.

This separation keeps the incident view focused while preserving access to detailed evidence. It also reduces the temptation to turn a single dashboard into a complete representation of the system.

[IMAGE 6 — Response dashboard linked to specialised diagnostic views]

The transition between these levels should be explicit. A responder who identifies abnormal database latency should be able to move towards the relevant database metrics without having to search through an unrelated collection of panels.

---

# Validate the dashboard against real incidents

The effectiveness of an incident response dashboard cannot be established solely through visual inspection.

A dashboard may appear well structured during design review and still fail to provide the information required during an actual incident. The most useful validation therefore comes from examining how the dashboard performs against real operational scenarios.

After an incident, the response process can be reviewed to identify where the dashboard helped and where it introduced additional investigation steps. Useful questions include:

* Could the initial user impact be established quickly?
* Was the scope of the problem clear?
* Were relevant changes visible?
* Could responders distinguish symptoms from diagnostic signals?
* Did the dashboard provide enough context to choose the next investigation step?
* Which information had to be obtained from another system?
* Which panels were consulted but provided little useful evidence?

These questions turn the dashboard into an artefact that can be improved using operational evidence. Google recommends examining detection, mitigation, coordination and communication as part of incident learning; the dashboard can be evaluated within that same broader review.

The result should not necessarily be a larger dashboard. An investigation step that repeatedly requires information from elsewhere may justify adding a focused panel, changing the hierarchy or improving a link to another diagnostic view. Other findings may justify removing information that did not contribute to the response.

---

# Key takeaways

A dashboard designed for incident response should help responders establish service impact, understand scope and move towards diagnosis with as little unnecessary interpretation as practical.

The main principles are:

* Put service-level impact before implementation details.
* Structure information according to the progression from assessment to diagnosis.
* Make time and relevant changes visible in the same context.
* Provide meaningful comparisons instead of isolated values.
* Use dependencies to help establish scope without implying causality.
* Treat the dashboard as a shared source of operational evidence, not as the incident management process itself.
* Keep detailed diagnostic information accessible without allowing it to dominate the primary response view.
* Validate the dashboard against real incidents and post-incident evidence.

A dashboard becomes part of incident response when it reduces the effort required to establish what is happening and decide where to investigate next. Its design should therefore follow the information needs of the response process rather than the capabilities of the observability platform.

---

## Dashboard Design Series

This article is part of the **Dashboard Design Series**, an editorial collection exploring dashboard engineering from strategic planning through long-term operational management.

Current publications in the series:

* **Why Dashboards Often Fail Before They Are Even Built**
* **Dashboard Design Principles**
* **Designing Dashboards for Incident Response**
* *(coming soon)* Dashboard Anti-Patterns
* *(coming soon)* Dashboard Governance and Lifecycle Management

---

# Further reading

* Stephen Few — *Information Dashboard Design: Displaying Data for At-a-Glance Monitoring*
* Google — *Site Reliability Engineering*
* Google — *The Site Reliability Workbook*
* Benjamin Bach et al. — *Dashboard Design Patterns*
* Edward R. Tufte — *The Visual Display of Quantitative Information*

---

# Bibliography

Bach, B., Freeman, E., Abdul-Rahman, A., Turkay, C., Khan, S., Fan, Y., & Chen, M. (2022). *Dashboard Design Patterns*. IEEE Transactions on Visualization and Computer Graphics.

Few, S. (2013). *Information Dashboard Design: Displaying Data for At-a-Glance Monitoring*. Analytics Press.

Google. *Site Reliability Engineering: Incident Management Guide*.

Google. *The Site Reliability Workbook — Incident Response*.

Google. *The Site Reliability Workbook — Monitoring*.

Tufte, E. R. (1983). *The Visual Display of Quantitative Information*. Graphics Press.
