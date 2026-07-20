# Why dashboards often fail before they are even built

## Abstract

Dashboards are among the most common artifacts in modern observability platforms, yet many gradually lose the purpose that originally justified their creation. While discussions often focus on visualization techniques or tooling, many of the factors that determine whether a dashboard becomes valuable are decided long before the first panel is added.

This article explores the decisions that shape an effective dashboard before implementation begins. Starting from the historical evolution of dashboards and their role in decision support, it examines how objectives, audience and long-term ownership influence their usefulness. Rather than concentrating on any specific technology, it proposes a practical framework for designing dashboards that remain relevant as systems, organisations and operational requirements evolve.

---

# Introduction

## What exactly is a dashboard?

The word *dashboard* originally referred to the instrument panel of a vehicle. Drivers cannot directly observe every mechanical process taking place beneath the hood, so the dashboard presents a carefully selected set of indicators such as speed, fuel level, engine temperature or warning lights. The objective is not to display every available measurement but to provide enough information to operate the vehicle safely and make timely decisions.

Although modern observability platforms are vastly more sophisticated than the dashboard of an automobile, the underlying principle remains remarkably similar. Operators cannot directly inspect every component of a distributed system, every request flowing through a service mesh or every event generated across thousands of infrastructure nodes. Instead, dashboards expose a carefully selected subset of information that allows engineers to understand the current state of a system and decide whether further investigation is required.

![Figure 1. Evolution of dashboards from executive reporting to modern observability platforms.](/images/articles/dashboard-evolution.webp)

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

![Figure 2. Focused operational dashboard versus overloaded multi-purpose dashboard.](/images/articles/dashboard-good-vs-bad.webp)

### Different audiences require different dashboards

Even when a dashboard has a clearly defined purpose, it may still become ineffective if it attempts to satisfy the needs of every possible audience.

Different roles ask different questions about the same system. An engineer responsible for responding to production incidents typically needs immediate access to technical indicators such as latency, error rates, infrastructure health and recent deployments. A service owner may instead focus on service availability, customer impact and long-term reliability trends. Executives are generally interested in broader operational indicators, business continuity and strategic objectives rather than the behaviour of individual components.

Although all these perspectives describe the same environment, they rarely require the same level of detail.

Attempting to combine every viewpoint into a single dashboard usually produces a compromise that serves none of them particularly well. Technical users must filter through business metrics that are irrelevant during incident response, while non-technical stakeholders are presented with implementation details that provide little value for strategic decision making.

Stephen Few repeatedly argues that dashboards should be designed around specific objectives rather than around the available data. Once the intended audience changes, the objectives often change as well, making a different dashboard a more effective solution than simply adding more panels to an existing one.

Rather than asking whether another stakeholder could also use a dashboard, a more useful question is whether the dashboard still enables its primary audience to answer the questions it was originally created to support.

| Audience | Typical questions | Information usually required |
| --- | --- | --- |
| On-call engineer | Is the service currently healthy? | Error rate, latency, saturation, recent deployments |
| Platform engineer | Is the infrastructure operating correctly? | Resource utilisation, cluster health, platform services |
| Service owner | Is the service meeting operational objectives? | Availability, incidents, long-term trends |
| Executive | Is the business being affected? | Service continuity, high-level KPIs, major incidents |

At this point another question naturally emerges. If dashboards should begin with clearly defined objectives and audiences, which questions should be answered before creating one?

---

# Questions worth answering before creating a dashboard

Once the purpose of a dashboard has been clearly defined, the next step is deciding what deserves to appear on it. Surprisingly, this phase is often shorter than selecting colours, arranging panels or choosing chart types, despite having a far greater influence on the usefulness of the final result.

Many dashboard design problems can be traced back to a small number of questions that were never explicitly discussed. Defining these questions early does not guarantee a successful dashboard, but it considerably reduces the probability of building one that gradually becomes difficult to maintain or simply fails to answer the operational questions it was created to support.

Stephen Few repeatedly argues that dashboards should be designed around objectives rather than available data. In practice, this means understanding not only what information exists, but why someone needs to see it in the first place.

## Who is going to use it?

The intended audience is one of the strongest factors influencing dashboard design.

Although dashboards often display the same underlying telemetry, different users interpret that information from different perspectives and for different purposes. A platform engineer investigating infrastructure saturation does not require the same level of abstraction as an executive reviewing service availability. Likewise, an engineer responding to an incident needs immediate access to operational signals rather than long-term business indicators.

Attempting to satisfy every audience with a single dashboard usually results in unnecessary complexity. Important operational signals become diluted among information that is relevant only occasionally, while high-level indicators coexist with low-level implementation details that many users neither need nor understand.

Separating dashboards according to their primary audience generally produces simpler interfaces, shorter investigation times and more focused operational conversations.

| Audience | Typical questions |
|----------|-------------------|
| On-call engineer | Is something failing right now? Where should the investigation begin? |
| Platform engineer | Is the platform operating within expected capacity and reliability limits? |
| Service owner | Is the service meeting its operational objectives? |
| Management | Are availability, reliability and customer impact evolving as expected? |

This separation does not imply duplicating information unnecessarily. Instead, it recognises that the same underlying telemetry can support different decisions depending on who is consuming it.

## Which decisions should it support?

A useful dashboard exists to support decisions rather than simply display information.

This distinction may appear subtle, yet it fundamentally changes the design process. Instead of asking *"Which metrics should we visualise?"*, it becomes more productive to ask *"Which decisions should become easier after consulting this dashboard?"*

For example, an operational dashboard might support decisions such as:

- Should this alert be escalated?
- Is the problem affecting the entire service or only one component?
- Did the latest deployment introduce measurable changes?
- Is additional capacity required?
- Should traffic be redirected or a rollback initiated?

When dashboards are designed around concrete operational decisions, selecting the appropriate metrics becomes considerably easier. Measurements that do not contribute to any meaningful decision naturally become candidates for removal or relocation.

This principle also helps avoid a common design trap: adding information simply because it is available. Modern observability platforms can expose thousands of metrics, but availability alone is rarely sufficient justification for placing them on a dashboard.

## Which information is essential?

Once objectives and audience have been established, every panel should justify its presence.

One practical approach is to classify information into three groups.

**Essential information**

Metrics that are required to understand the current operational state and support the primary objective of the dashboard.

Examples include service availability, request latency, error rate, throughput or infrastructure health depending on the dashboard's purpose.

**Useful supporting information**

Data that helps provide additional context during investigations but is not required during every consultation.

Deployment history, recent configuration changes or links to related documentation often fall into this category.

**Information that probably belongs elsewhere**

Measurements that may be valuable for specialised analysis but rarely contribute to the dashboard's primary objective.

Examples include highly detailed JVM internals, low-level infrastructure counters, exhaustive business KPIs or debugging metrics that are only relevant during specific investigations.

Making these distinctions encourages intentional design instead of incremental accumulation.

## How will usefulness be measured?

Dashboards themselves can and should be evaluated.

Many organisations regularly measure the health of applications and infrastructure while rarely assessing whether the dashboards used to monitor those systems continue to provide value.

One possible indicator is actual usage. Several commercial observability platforms, including Dynatrace, expose dashboard usage statistics that show how frequently dashboards are opened or consulted. Although usage alone cannot determine quality, dashboards that receive little or no traffic over extended periods may deserve review.

Other qualitative indicators may include:

- Whether incident response begins from the dashboard.
- Whether operational meetings consistently rely on it.
- Whether engineers actively maintain it.
- Whether obsolete panels are periodically removed.
- Whether users request improvements instead of creating alternative dashboards.

These indicators should not be interpreted in isolation. A rarely consulted dashboard supporting disaster recovery procedures may still be extremely valuable. Conversely, a frequently opened dashboard may persist simply because no better alternative exists.

The objective is not to maximise page views but to ensure that dashboards continue fulfilling the purpose for which they were originally designed.

> **Future resource**
>
> The accompanying **Dashboard Readiness Assessment** provides a practical checklist that can be completed before implementing a new dashboard. It summarises the questions discussed in this section and can be incorporated into design reviews or dashboard approval processes.

![Figure 3. Decision flow before creating a dashboard.](/images/articles/dashboard-decision-flow.webp)

**References**

- Stephen Few. *Information Dashboard Design*. Analytics Press, 2006.
- Grafana Labs. *Dashboard design best practices*.
- Google. *Site Reliability Engineering*.

---

# Dashboards are products that require maintenance

Designing an effective dashboard is only the beginning of its lifecycle.

Unlike static reports, operational dashboards evolve together with the systems they represent. Services change, architectures become more complex, ownership shifts between teams and operational priorities evolve over time. A dashboard that accurately reflected a system two years ago may gradually become misleading if it is never reviewed.

While this reality is well understood for software systems, infrastructure or APIs, dashboards are frequently treated as finished deliverables once they have been published. In practice, they behave much more like software products than static documents.

Recognising this distinction changes how dashboards should be designed, maintained and governed throughout their lifetime.

## Dashboards have a lifecycle

Every operational dashboard follows a lifecycle, whether teams acknowledge it explicitly or not.

A simplified lifecycle can be described as:

1. A specific operational need is identified.
2. The dashboard is designed and implemented.
3. It becomes part of daily operational workflows.
4. The monitored system evolves.
5. The dashboard is reviewed, updated or eventually retired.

![Figure 4. Dashboard lifecycle.](/images/articles/dashboard-lifecycle.webp)

The important observation is that publishing a dashboard is not the final step. It merely marks the beginning of its operational life.

Many organisations dedicate considerable effort to creating dashboards while allocating almost no time to reviewing them afterwards. As a result, obsolete panels accumulate, terminology becomes inconsistent and visualisations continue displaying information that is no longer relevant.

Regular reviews allow teams to remove unnecessary panels, simplify layouts and ensure that dashboards continue supporting their original objectives.

Just as software benefits from periodic refactoring, dashboards benefit from periodic simplification.

## Every dashboard should have documentation

Documentation is often associated with services, APIs or infrastructure components, yet dashboards themselves frequently become critical operational assets.

During an incident, engineers may rely on a dashboard before consulting architecture diagrams, deployment pipelines or source code. Despite this importance, many dashboards exist without any accompanying documentation.

Even lightweight documentation can significantly improve long-term maintainability.

At a minimum, every dashboard should describe:

| Item | Purpose |
|------|---------|
| Objective | Which operational problem does this dashboard address? |
| Intended audience | Who is expected to use it? |
| Data sources | Which systems provide the displayed information? |
| Important dependencies | Which services, exporters or integrations are required? |
| Dashboard owner | Who is responsible for reviewing and maintaining it? |
| Last review date | When was the dashboard last validated? |

This information rarely changes the dashboard itself, but it dramatically reduces ambiguity when new engineers join a team or ownership changes.

Documentation also provides context for future modifications. Understanding *why* a panel exists is often more valuable than understanding *how* it was configured.

> **Future resource**
>
> The accompanying **Dashboard Technical Specification** provides a reusable template for documenting dashboards consistently across teams.

## Monitoring as Code

As dashboards become operationally important, many organisations have started treating them as version-controlled assets rather than objects created manually through a graphical interface.

This approach is commonly known as *Monitoring as Code*.

Instead of editing dashboards directly in production, dashboard definitions are stored alongside application or infrastructure code, allowing changes to benefit from the same engineering practices already applied elsewhere.

Typical advantages include:

- Version history.
- Peer review.
- Rollback capabilities.
- Promotion across development, staging and production environments.
- Consistent deployments.
- Auditable change history.

Different observability platforms implement this concept differently, but the underlying principle remains the same: dashboards should evolve through controlled engineering processes rather than ad hoc modifications.

Monitoring as Code deserves a dedicated discussion beyond the scope of this article, yet introducing the concept here helps explain why mature observability teams increasingly manage dashboards as software artifacts rather than configuration stored inside a platform.

## Change management matters

Not every requested change necessarily improves a dashboard.

Operational dashboards naturally attract new requirements as systems evolve. Additional metrics become available, teams request more visibility and new stakeholders identify information they would like to include.

Without a defined review process, dashboards tend to grow continuously while rarely becoming simpler.

Before introducing any modification, it is useful to ask several questions.

- Which operational question does this new panel answer?
- Who requested the change?
- Does the information already exist elsewhere?
- Will another panel become redundant?
- Should documentation also be updated?

These questions encourage intentional evolution instead of incremental accumulation.

In mature engineering organisations, removing obsolete information is often as valuable as introducing new visualisations. Simplicity is rarely achieved by adding more panels; it is usually achieved by preserving only those that continue supporting operational decisions.

## Dashboards should also be retired

One aspect that receives relatively little attention is retirement.

Applications are decommissioned, services are consolidated and monitoring strategies evolve. Dashboards associated with those systems should evolve accordingly.

Keeping obsolete dashboards available indefinitely increases maintenance costs and makes it more difficult for engineers to identify which dashboards remain authoritative.

Retirement should therefore be considered a normal stage of the dashboard lifecycle rather than an exceptional event.

Removing a dashboard whose purpose no longer exists is often evidence of healthy operational governance rather than lost work.

**References**

- Google. *Site Reliability Engineering*.
- Grafana Labs. *Provisioning Grafana*.
- Git Documentation.

---

# Key takeaways

The value of a dashboard is determined long before the first panel is created.

Although visual design and tooling influence the final result, the decisions that have the greatest long-term impact concern objectives, audience and ownership. A dashboard built without a clearly defined purpose will rarely become more useful simply by adding additional metrics or improving its appearance.

The main ideas discussed throughout this article can be summarised as follows.

- Dashboards exist to support operational decisions, not to display as much information as possible.
- Clearly defining the intended audience helps determine which information deserves a place on a dashboard.
- Every dashboard should answer one or more specific operational questions.
- Scope naturally expands over time unless dashboards are reviewed regularly.
- Documentation reduces ambiguity and improves long-term maintainability.
- Monitoring as Code introduces engineering practices such as version control, peer review and controlled deployments into dashboard management.
- Dashboards have a lifecycle that includes creation, maintenance, periodic review and eventual retirement.
- The long-term success of a dashboard can often be assessed through actual operational usage rather than visual appearance alone.

Designing fewer dashboards with a clear purpose will usually provide greater operational value than maintaining many dashboards whose objectives are no longer understood.

---

# Further reading

Readers interested in exploring dashboard design and operational visualisation in greater depth may find the following references particularly useful.

- Stephen Few - *Information Dashboard Design: Displaying Data for At-a-Glance Monitoring*.
- Edward R. Tufte - *The Visual Display of Quantitative Information*.
- Google - *Site Reliability Engineering*.
- Google - *The Site Reliability Workbook*.
- Grafana Labs - *Dashboard design best practices*.

For practical implementation guidance accompanying this article, see the following engineering resources published by ObservabiliTrends.

- Dashboard Readiness Assessment
- Dashboard Technical Specification

---

# Bibliography

Few, S. (2006). *Information Dashboard Design: Displaying Data for At-a-Glance Monitoring*. Analytics Press.

Few, S. (2009). *Now You See It: Simple Visualization Techniques for Quantitative Analysis*. Analytics Press.

Google. (2016). *Site Reliability Engineering: How Google Runs Production Systems*. O'Reilly Media.

Google. (2018). *The Site Reliability Workbook*. O'Reilly Media.

Grafana Labs. *Dashboard Design Best Practices*. Available at: https://grafana.com/docs/grafana/latest/dashboards/build-dashboards/best-practices/

Grafana Labs. *Provisioning Grafana*. Available at: https://grafana.com/docs/grafana/latest/administration/provisioning/

Git Project. *Git Documentation*. Available at: https://git-scm.com/doc

Tufte, E. R. (1983). *The Visual Display of Quantitative Information*. Graphics Press.

Uneecops Technologies. *Generations of Dashboards*. Available at: https://www.uneecops.com/blog/generations-of-dashboards/

Watt, D. *Dashboard Design - Dashboard*. The Data School. Available at: https://www.thedataschool.co.uk/a/dan-watt/dashboard-design-dashboard/