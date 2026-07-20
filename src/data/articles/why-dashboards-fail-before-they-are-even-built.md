# Why dashboards often fail before they are even built

## Abstract

Dashboards are among the most common artifacts in modern observability platforms, yet many gradually lose the purpose that originally justified their creation. While discussions often focus on visualization techniques or tooling, many of the factors that determine whether a dashboard becomes valuable are decided long before the first panel is added.

This article explores the decisions that shape an effective dashboard before implementation begins. Starting from the historical evolution of dashboards and their role in decision support, it examines how objectives, audience and long-term ownership influence their usefulness. Rather than concentrating on any specific technology, it proposes a practical framework for designing dashboards that remain relevant as systems, organisations and operational requirements evolve.

---

# Introduction

## What exactly is a dashboard?

The word *dashboard* originally referred to the instrument panel of a vehicle. Drivers cannot directly observe every mechanical process taking place beneath the hood, so the dashboard presents a carefully selected set of indicators such as speed, fuel level, engine temperature or warning lights. The objective is not to display every available measurement but to provide enough information to operate the vehicle safely and make timely decisions.

Although modern observability platforms are vastly more sophisticated than the dashboard of an automobile, the underlying principle remains remarkably similar. Operators cannot directly inspect every component of a distributed system, every request flowing through a service mesh or every event generated across thousands of infrastructure nodes. Instead, dashboards expose a carefully selected subset of information that allows engineers to understand the current state of a system and decide whether further investigation is required.

> **Figure 1.** Evolution of dashboards from executive reporting to modern observability platforms.
>
> *Image placeholder.*
>
> Source inspiration: UNEECOPS - *Generations of Dashboards*.

The concept gradually expanded beyond transportation. During the second half of the twentieth century, business intelligence systems adopted dashboards as a way of consolidating key performance indicators into a single operational view. Later, monitoring platforms incorporated the same principles to help engineers supervise increasingly complex computing environments.

Despite decades of evolution, defining a dashboard is not entirely straightforward. Different disciplines describe dashboards from slightly different perspectives depending on whether they focus on business intelligence, human-computer interaction or operational monitoring. Nevertheless, nearly all definitions converge on the same fundamental idea: a dashboard exists to help someone understand the current state of a system and support decision-making.

One of the most widely cited definitions was proposed by Stephen Few in *Information Dashboard Design*:

> *"A visual display of the most important information needed to achieve one or more objectives, consolidated and arranged on a single screen so the information can be monitored at a glance."*

Few's definition remains remarkably applicable to modern observability platforms. Technologies have evolved from static reporting systems to highly interactive monitoring environments, but the objective has not fundamentally changed. A dashboard should reduce the effort required to understand a situation rather than increase it.

The next logical question therefore becomes:

**Why do organisations invest so much time and effort building dashboards?**

Part of the answer lies in the scale of today's software systems.

A modern cloud-native platform may expose hundreds of thousands of individual metrics, millions of log events every hour and an ever-growing volume of traces describing interactions between services. Engineers cannot inspect this information manually. Dashboards reduce that complexity by presenting an operational summary that highlights the signals most likely to require attention.

Dashboards also facilitate communication. During incidents, engineers from different teams frequently rely on the same visualisations to establish a shared understanding of system behaviour. A common operational view helps discussions focus on observable evidence rather than individual assumptions.

In addition, dashboards make gradual changes easier to detect. Trends, anomalies and unexpected deviations often become apparent only when information is presented with the appropriate visual context. Edward Tufte argues that graphical displays should reveal the structure of the underlying data rather than obscure it with unnecessary visual complexity. This principle remains highly relevant when designing dashboards intended to support operational decisions.

These characteristics explain why dashboards have become a standard component of virtually every observability platform. Whether an organisation uses Grafana, Datadog, Dynatrace, Splunk or another monitoring solution, dashboards frequently become the primary interface through which engineers interact with operational data.

Yet widespread adoption should not be confused with consistent effectiveness.

Many dashboards succeed technically while failing operationally. They collect accurate metrics, execute correct queries and display visually appealing charts, yet they gradually become underused, overloaded or disconnected from the decisions they were originally created to support.

Importantly, many of these problems do not originate in the implementation itself. They arise much earlier, during the design process, when the objectives, intended audience and long-term ownership of the dashboard have not yet been clearly established.

The remainder of this article explores those early decisions and proposes a practical framework for building dashboards that remain useful long after their initial publication.

---

# 1. Many dashboards begin with an unclear purpose

It is tempting to think that dashboard quality depends primarily on the choice of charts, colour palettes or layout. Visual design certainly influences readability, and authors such as Stephen Few and Edward Tufte have devoted extensive work to explaining how information can be presented more effectively. However, effective visualisation alone cannot compensate for an unclear objective.

Many dashboard initiatives begin with a request that sounds deceptively simple:

> "We need a dashboard."

While the request itself is common, the underlying problem is often left undefined.

A more useful set of questions would be:

- What decision should this dashboard support?
- Which operational problem is it expected to solve?
- Who will consult it?
- Under which circumstances will it be used?

These questions frequently receive less attention than discussions about metrics, panel layouts or visual themes, despite having a greater influence on the long-term usefulness of the dashboard.

Stephen Few repeatedly argues that dashboards should be designed around objectives rather than around available data. Collecting information simply because it exists rarely produces an effective operational view. Instead, the selection of metrics should follow naturally from the decisions that users are expected to make.

### Dashboards often accumulate scope over time

Even dashboards that begin with a clearly defined purpose rarely remain unchanged.

A dashboard initially created to monitor a single application may later receive additional panels requested by developers, operations teams, service owners, management or other stakeholders. Each request may appear reasonable when considered individually. Collectively, however, they often transform a focused operational dashboard into a heterogeneous collection of unrelated visualisations.

Over time, dashboards may combine:

- Service health indicators
- Infrastructure metrics
- Capacity planning
- Deployment validation
- Business KPIs
- Cost information
- Incident timelines
- Experimental panels that are never removed

None of these categories is inherently inappropriate. The challenge arises when they coexist without supporting the same operational objective.

From experience across large monitoring environments, it is common to encounter dashboards containing dozens of panels while only a small subset receives regular attention during day-to-day operations. Rather than improving situational awareness, excessive scope can increase the cognitive effort required to locate genuinely useful information.

> **Example**
>
> Consider a dashboard originally created to supervise a single customer-facing application. During its first months, it displayed request rate, latency, error rate and infrastructure health. As new requirements emerged, additional panels were incorporated to visualise deployment history, cloud costs, JVM internals, database utilisation, synthetic monitoring results and business conversion metrics. None of the original panels was removed.
>
> After several years, the dashboard still contained valuable information, but answering the original operational questions required navigating through dozens of unrelated charts. The dashboard had evolved without losing information, yet it had also lost much of its original focus.

### Different audiences require different dashboards

Even when a dashboard has a clearly defined purpose, it may still become ineffective if it attempts to satisfy the needs of every possible audience.

Different roles ask different questions about the same system. An engineer responsible for responding to production incidents typically needs immediate access to technical indicators such as latency, error rates, infrastructure health and recent deployments. A service owner may instead focus on service availability, customer impact and long-term reliability trends. Executives are generally interested in broader operational indicators, business continuity and strategic objectives rather than the behaviour of individual components.

Although all these perspectives describe the same environment, they rarely require the same level of detail.

Attempting to combine every viewpoint into a single dashboard usually produces a compromise that serves none of them particularly well. Technical users must filter through business metrics that are irrelevant during incident response, while non-technical stakeholders are presented with implementation details that provide little value for strategic decision making.

Stephen Few repeatedly argues that dashboards should be designed around specific objectives rather than around the available data. Once the intended audience changes, the objectives often change as well, making a different dashboard a more effective solution than simply adding more panels to an existing one.

Rather than asking whether another stakeholder could also use a dashboard, a more useful question is whether the dashboard still enables its primary audience to answer the questions it was originally created to support.

Table placeholder

| Audience | Typical questions | Information usually required |
| --- | --- | --- |
| On-call engineer | Is the service currently healthy? | Error rate, latency, saturation, recent deployments |
| Platform engineer | Is the infrastructure operating correctly? | Resource utilisation, cluster health, platform services |
| Service owner | Is the service meeting operational objectives? | Availability, incidents, long-term trends |
| Executive | Is the business being affected? | Service continuity, high-level KPIs, major incidents |

Figure placeholder

Focused operational dashboard versus overloaded multi-purpose dashboard.

At this point another question naturally emerges. If dashboards should begin with clearly defined objectives and audiences, which questions should be answered before creating one?