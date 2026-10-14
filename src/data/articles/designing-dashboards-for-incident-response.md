# Designing Dashboards for Incident Response

## Abstract

Operational dashboards are often used during incidents, but a dashboard designed primarily for routine monitoring may not provide the information engineers need when a system starts behaving unexpectedly.

During an incident, the objective changes. Engineers need to establish the current state of the system, determine whether users are affected, identify where the problem is occurring and gather enough evidence to decide what to investigate next.

This article examines how dashboard design principles can be applied specifically to incident response. It focuses on information hierarchy, investigative flow, temporal context, correlation and the distinction between monitoring a system and investigating a problem.

The objective is not to create a dashboard containing every available metric. It is to create an operational view that helps engineers move from detection to understanding with as little unnecessary cognitive effort as possible.

---

# Introduction

The previous articles in this series established two important foundations.

The first article argued that dashboard quality is largely determined before implementation begins. Objectives, audience, ownership and operational questions define the purpose a dashboard is expected to serve.

The second article examined how information should then be organised and presented. Information hierarchy, cognitive effort, consistency and controlled complexity determine how efficiently engineers can interpret that information.

Incident response brings these ideas together under particularly demanding conditions.

An engineer investigating a production problem does not approach a dashboard as a collection of charts. They are trying to answer a sequence of questions:

* What is happening?
* Is the system actually affected?
* When did it start?
* How widespread is it?
* Which component appears to be involved?
* What changed at approximately the same time?
* Where should the investigation continue?

A dashboard that helps answer these questions can become a useful incident-response tool.

A dashboard that simply exposes a large collection of metrics may contain more information while providing less operational value.

---

## An incident dashboard has a different job

A dashboard used for routine monitoring and a dashboard used during an incident may expose many of the same metrics, but they do not necessarily have the same purpose.

Routine monitoring is often concerned with recognising gradual changes, checking service behaviour and maintaining awareness of system health.

Incident response is more investigative.

The engineer already has a reason to believe that something requires attention. The dashboard must therefore help transform an initial signal into an increasingly precise understanding of the situation.

This distinction affects the design.

During routine monitoring, a broad overview may be sufficient.

During an incident, the dashboard should provide a clear path from:

**current state → affected area → temporal context → supporting evidence → deeper investigation**

This does not mean that every incident requires a dedicated dashboard. It means that dashboards intended to support incident response should be designed around the investigative tasks their users are expected to perform.

---

## Design around the questions engineers need to answer

The starting point for an incident-response dashboard should be the questions it needs to answer rather than the metrics that happen to be available.

A useful sequence is:

### 1. Is the system affected?

The first objective is to establish whether the suspected problem corresponds to an observable change in system behaviour.

This is where primary indicators belong.

The dashboard should make the current state immediately visible without requiring the engineer to inspect several detailed charts.

### 2. When did the condition begin?

Once an abnormal condition has been identified, its timing becomes important.

A useful dashboard should make it possible to determine whether the condition is:

* recent or persistent,
* isolated to a short period,
* gradually increasing,
* recurring,
* or coincident with another change.

Time therefore becomes part of the investigation rather than merely an axis on a graph.

### 3. How widespread is the problem?

The next question is whether the condition affects the entire system or only a subset of services, containers or components.

This distinction can significantly change the direction of an investigation.

A problem affecting every component suggests a different class of investigation from a problem isolated to one service.

### 4. Where should the investigation continue?

The dashboard should help narrow the search.

Once a suspicious component or resource has been identified, engineers should be able to move towards the relevant supporting information without having to reconstruct the system mentally from unrelated panels.

The dashboard therefore acts as an investigation guide rather than simply an information repository.

---

## From detection to diagnosis

An effective incident dashboard should support a progression from broad observations towards increasingly specific evidence.

A useful model is:

**Detect → Scope → Correlate → Investigate**

### Detect

The dashboard establishes that something is different from the expected state.

Primary indicators should therefore receive the greatest visual prominence.

### Scope

The engineer determines how widely the condition is distributed.

This may involve comparing services, containers, instances or other relevant dimensions.

### Correlate

The engineer examines whether other signals changed at approximately the same time.

This is where time-series relationships become particularly valuable.

### Investigate

Once the likely affected area has been identified, supporting and diagnostic information can be examined in greater detail.

This structure follows the summary-to-detail principle established in the previous article.

The difference is that the sequence is now explicitly connected to an incident investigation.

---

## Information hierarchy under pressure

Information hierarchy becomes particularly important during incidents because engineers have less spare attention available for navigating an interface.

The top of the dashboard should therefore answer the questions with the highest operational priority.

A practical hierarchy is:

### Level 1 — Situation awareness

The engineer should be able to determine the overall state of the system immediately.

Typical information includes:

* current resource or service state,
* primary indicators,
* active abnormal conditions,
* overall scope.

### Level 2 — Investigation context

Once a problem is established, the dashboard should provide the context required to understand it.

Examples include:

* service-level comparisons,
* resource consumption,
* traffic behaviour,
* temporal changes,
* affected components.

### Level 3 — Diagnostic evidence

Lower sections can expose information useful for deeper investigation.

Examples include:

* individual container behaviour,
* detailed resource metrics,
* supporting infrastructure telemetry,
* component-specific signals.

This hierarchy means that detailed telemetry remains available without competing with the information required for the initial assessment.

It also follows a principle established in the previous article: **visual priority should reflect operational priority.**

---

## Current state versus evolution

Incident investigation requires two complementary views of the same signal.

The first is the **current state**.

The second is **how that state changed over time**.

A current-value panel can show that a resource is currently consuming a significant amount of CPU.

A time-series panel can show whether that consumption increased suddenly, gradually or as part of an established pattern.

Both perspectives are useful, but they answer different questions.

For this reason, incident dashboards should avoid relying exclusively on either large current-value panels or long time-series charts.

A useful combination is:

**Current state → recent evolution → detailed history**

This allows engineers to establish what is happening now and then determine how the system reached that state.

---

## Correlation without visual overload

Incident investigation frequently involves comparing several signals.

However, displaying every available metric on the same graph does not automatically improve correlation.

Too many series can make relationships harder to recognise, particularly when several signals have similar magnitudes or overlapping behaviour.

Correlation should therefore be intentional.

A useful dashboard should group signals that are expected to answer a common investigative question.

For example, a resource-investigation section might compare:

* CPU consumption,
* memory consumption,
* network activity,
* and the affected service or component.

The objective is not to maximise the number of lines on a chart.

It is to make relevant relationships easier to see.

When two signals are not useful to compare during the same investigative step, they may be better presented in separate panels.

---

## Show enough context to explain changes

An isolated value rarely explains an incident.

Context is what makes a signal useful.

A CPU value of 80% can be perfectly normal for one workload and highly unusual for another. A memory increase may represent expected traffic growth or a genuine resource problem.

Incident dashboards should therefore provide enough context to distinguish between these situations.

Useful contextual information can include:

* previous behaviour,
* comparable services,
* recent trends,
* distribution across components,
* and the approximate start of the abnormal condition.

The dashboard does not need to explain the incident automatically.

Its role is to provide evidence that allows the engineer to form and test hypotheses.

This is an important distinction.

A dashboard should support investigation without pretending to replace engineering judgement.

---

## Design for investigation, not just monitoring

A common mistake is to interpret an incident dashboard as a larger version of a monitoring dashboard.

Adding more panels does not necessarily make a dashboard more useful during an incident.

The design should instead reflect the way an investigation progresses.

Each panel should have a reason for being present.

A useful test is:

> **What investigative question does this panel help answer?**

If the answer is unclear, the panel should be reconsidered.

The same principle applies to visualisations.

A graph should exist because its representation makes a particular relationship easier to understand, not simply because the underlying metric is available.

This is consistent with the principles established throughout this series: dashboards should contain the information required to support their purpose rather than the maximum amount of information available.

---

## A practical incident-response dashboard structure

For the laboratory implementation developed alongside this article, we are using a progressive layout rather than attempting to build the complete dashboard at once.

The proposed structure is:

### Row 1 — Incident overview

**Purpose:** establish the current situation immediately.

Panels:

1. **Overall system/resource state**
2. **Total CPU consumption**
3. **Total memory consumption**
4. **Affected services / components**

These panels should provide a compact summary rather than detailed diagnostics.

---

### Row 2 — Service comparison

**Purpose:** determine whether the condition is widespread or concentrated.

Panels:

5. **CPU usage by service**
6. **Memory usage by service**
7. **Network activity by service**

The objective is comparison rather than detailed investigation.

The engineer should be able to identify which services appear unusual without inspecting individual containers first.

---

### Row 3 — System evolution

**Purpose:** understand when the condition changed and how it evolved.

Panels:

8. **CPU evolution**
9. **Memory evolution**
10. **Network evolution**

These panels should share a compatible time range so that changes can be compared temporally.

---

### Row 4 — Investigation focus

**Purpose:** provide deeper evidence once a suspicious service or component has been identified.

Panels:

11. **CPU by individual component/container**
12. **Memory by individual component/container**
13. **Network by individual component/container**
14. **Restart / lifecycle activity**

This section deliberately appears below the higher-level information.

It is useful during investigation, but it should not dominate the initial view.

---

### Row 5 — Supporting context

**Purpose:** provide additional evidence without competing with the primary investigation path.

Potential panels include:

15. **Resource distribution**
16. **Container or service availability**
17. **Additional infrastructure signals**
18. **Relevant annotations or deployment/change information**

Not every dashboard needs all of these panels.

They should only be introduced when the laboratory data demonstrates that they contribute to an actual investigative question.

---

## Building and validating the dashboard in the ObservabiliTrends Lab

The dashboard described in this article is not intended to remain a theoretical example.

ObservabiliTrends maintains a practical observability laboratory based on Docker, Prometheus, cAdvisor, Node Exporter, Grafana and the Dynatrace EasyTravel application.

The laboratory provides a controlled environment in which dashboard concepts can be implemented, tested and evaluated against real telemetry.

This allows the design principles discussed throughout the Dashboard Design Series to be examined using an actual monitoring environment rather than purely hypothetical examples.

The incident-response dashboard will therefore be developed progressively in the laboratory.

Each panel will be introduced only when its purpose is clear, its underlying telemetry is available and its contribution to the investigation can be evaluated.

The resulting dashboard, queries and selected panel implementations will form part of the practical resources published by ObservabiliTrends alongside the article.

This approach also provides an opportunity to evaluate the dashboard itself.

If a panel does not help answer an operational question, it should not remain simply because it has already been implemented.

The laboratory is therefore not only a source of screenshots and downloadable resources. It is also part of the design process.

---

# Key takeaways

Incident-response dashboards should help engineers move from an abnormal signal towards an increasingly precise understanding of the situation.

The main ideas can be summarised as follows.

* Incident dashboards should support investigation rather than simply display more telemetry.
* Dashboard design should follow the questions engineers need to answer during an incident.
* Information should progress from situation awareness to investigation and then diagnosis.
* Current state and temporal evolution provide complementary views of the same condition.
* Correlation should be intentional rather than achieved by displaying large numbers of series together.
* Supporting context helps engineers interpret abnormal values without removing the need for engineering judgement.
* Every panel should have a clear relationship with an investigative question or operational decision.
* Detailed diagnostic information should remain available without competing with the initial incident assessment.
* Dashboards should be validated against real operational scenarios rather than judged only by visual appearance.

---

# Dashboard Design Series

This article is part of the **Dashboard Design Series**, an editorial collection exploring dashboard engineering from strategic planning through long-term operational management.

Current publications in the series:

* **Why Dashboards Often Fail Before They Are Even Built**
* **Dashboard Design Principles**
* **Designing Dashboards for Incident Response**
* *(coming soon)* Dashboard Anti-Patterns
* *(coming soon)* Dashboard Governance and Lifecycle Management

---

# Further reading

Readers interested in dashboard engineering, human perception and operational visualisation may find the following references particularly useful.

* Stephen Few — *Information Dashboard Design: Displaying Data for At-a-Glance Monitoring*
* Colin Ware — *Information Visualization: Perception for Design*
* Donald A. Norman — *The Design of Everyday Things*
* Edward R. Tufte — *The Visual Display of Quantitative Information*
* Grafana Labs — *Dashboard Design Best Practices*
* Nielsen Norman Group — *Information Visualization* articles

Practical implementation resources published by ObservabiliTrends include the Dashboard Readiness Assessment, Dashboard Technical Specification and the ObservabiliTrends Lab.

---

# Bibliography

Few, S. (2006). *Information Dashboard Design: Displaying Data for At-a-Glance Monitoring*. Analytics Press.

Few, S. (2009). *Now You See It: Simple Visualization Techniques for Quantitative Analysis*. Analytics Press.

Norman, D. A. (2013). *The Design of Everyday Things* (Revised and Expanded Edition). Basic Books.

Tufte, E. R. (1983). *The Visual Display of Quantitative Information*. Graphics Press.

Ware, C. (2020). *Information Visualization: Perception for Design* (4th ed.). Morgan Kaufmann.

Grafana Labs. *Dashboard Design Best Practices*.

Google. *Site Reliability Engineering*.

Google. *The Site Reliability Workbook*.
