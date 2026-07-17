import { EngineeringResource } from "../resourceTypes";

export const R0001: EngineeringResource = {
  id: "R-0001",

  slug: "dashboard-readiness-assessment",

  title: "Dashboard Readiness Assessment",

  subtitle:
    "A structured framework to determine whether a dashboard should be built before investing engineering time.",

  description:
    "Engineering assessment used to validate whether a dashboard has a clear operational objective before implementation begins.",

  category: "Engineering Resource",

  tags: [
    "Dashboards",
    "Observability",
    "SRE",
    "Planning"
  ],

  version: "1.0",

  updated: "2026-07-14",

  estimatedTime: "15 minutes",

  featured: true,

  content: `
# Dashboard Readiness Assessment

This assessment is intended to help engineers, SREs, platform teams and technical leaders validate whether a dashboard has a clear operational purpose before any query, panel or visualization is created.

Completing this assessment usually requires no more than fifteen minutes and frequently prevents many hours of unnecessary implementation work and future maintenance.

There are no right or wrong answers.

The objective is simply to expose assumptions before they become technical debt.

---

# Assessment

## 1. Intended audience

Who is going to use this dashboard?

- Operator
  - Example: Monitors production systems during daily operations.
- On-call engineer
  - Example: Uses the dashboard during incident response.
- Platform engineer
  - Example: Investigates infrastructure behaviour and platform health.
- Engineering manager
  - Example: Tracks service reliability and operational KPIs.
- Customer
  - Example: Views service availability or business metrics.
- Other
  - Specify the intended audience.

---

## 2. Ownership

**Who owns the dashboard?**

Example:

Platform Observability Team

**Who is responsible for maintaining it?**

Example:

SRE Team

---

## 3. Primary objective

What is the primary purpose of the dashboard?

Examples:

- Detect incidents
- Support troubleshooting
- Monitor service health
- Track business KPIs
- Capacity planning
- Executive reporting

---

## 4. Decision support

Which engineering decisions should this dashboard support?

Examples:

- Scale infrastructure
- Roll back a deployment
- Escalate an incident
- Prioritize investigation
- Validate system behaviour

If no clear decision can be identified, reconsider whether the dashboard is actually necessary.

---

## 5. Essential information

Which information is truly required?

Examples:

- Error rate
- Latency
- CPU utilisation
- Deployment version
- Active alerts
- Request volume

Avoid including information simply because it is available.

Every panel should contribute to answering the dashboard objective.

---

## 6. Success criteria

How will the usefulness of this dashboard be evaluated?

Possible metrics:

- Number of visits
- Decisions supported
- Operational questions answered
- Incident resolution improvements
- MTTR reduction
- Other KPI

---

## 7. Problem statement

What operational problem is this dashboard expected to solve?

Example:

Engineers currently require multiple dashboards to determine whether an increase in latency originates from the application, Kubernetes or the database.

---

## 8. Existing dashboards

Does another dashboard already provide the same information?

- Yes
- No

If yes:

- Why is another dashboard required?
- Can the existing one be improved instead?

---

## 9. Expected action

After viewing this dashboard, what action should someone take?

Examples:

- Restart a service.
- Investigate a dependency.
- Escalate an incident.
- Close an alert.
- Continue monitoring.

Dashboards without an expected action could become passive information displays.

---

## 10. Information update frequency

How often should the displayed information change?

Examples:

- Real-time
- Every minute
- Every five minutes
- Hourly
- Daily

---

## 11. Data freshness

What latency is acceptable?

Examples:

- Less than 10 seconds
- Less than one minute
- Less than five minutes
- Historical reporting only

---

## 12. Historical analysis

Is historical information required?

- Last hour
- Last day
- Last week
- Last month
- Last year

---

## 13. Failure behaviour

What happens if one panel fails?

Possible strategies:

- Hide panel
- Display error
- Replace with fallback metric
- Alert dashboard owner

---

## 14. Expected lifetime

How long is this dashboard expected to remain useful?

Examples:

- Temporary migration
- Project duration
- Permanent operational dashboard
- Executive reporting

Knowing the expected lifetime helps avoid maintaining obsolete dashboards.

---

## 15. Multi-environment support

Should the dashboard support multiple environments?

- Development
- Testing
- Staging
- Production
- Multiple clusters

---

## 16. Access management

Should dashboard access be restricted?

Examples:

- Public
- Internal
- Operations only
- Customer access
- Executive only

---

# Final Assessment

Before implementation begins, verify that:

- The intended audience is clearly identified.
- A single operational objective exists.
- Expected actions are defined.
- Dashboard ownership is assigned.
- Maintenance responsibility is documented.
- Success criteria can be measured.
- Existing dashboards have been reviewed.
- Expected lifetime is understood.
- Access permissions are defined.
- Documentation location has been recorded.

---

# Author's note

Every dashboard introduces implementation effort, maintenance cost and cognitive load.

Building fewer dashboards with clearly defined operational goals can produce better outcomes than building many dashboards with overlapping responsibilities.
`
};
