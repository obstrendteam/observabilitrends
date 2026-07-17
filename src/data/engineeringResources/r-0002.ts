import { EngineeringResource } from "../resourceTypes";

export const R0002: EngineeringResource = {
  id: "R-0002",

  slug: "dashboard-technical-specification",

  title: "Dashboard Technical Specification",

  subtitle:
    "Engineering specification template for documenting dashboard implementations.",

  description:
    "Structured template used to define dashboard technical specifications before implementation.",

  category: "Engineering Resource",

  tags: [
    "Dashboards",
    "Engineering",
    "Documentation"
  ],

  version: "1.0",

  updated: "2026-07-14",

  estimatedTime: "20 minutes",

  featured: true,

  content: `
# Dashboard Technical Specification

Every production dashboard eventually becomes part of an operational system.

Like any other engineering asset, it should be documented in a way that allows future engineers to understand how it was built, how it works and who is responsible for maintaining it.

This document provides a structured template for recording both the functional purpose and the technical implementation of a dashboard. It is intended to simplify maintenance, facilitate knowledge transfer and reduce operational risk throughout the dashboard lifecycle.

The level of detail should be proportional to the dashboard's operational importance.

---

# Dashboard Identification

## Dashboard name

Example:

Production Kubernetes Overview

### Dashboard ID

Example:

DB-042

### Current status

- Draft
- Testing
- Production
- Deprecated

### Current version

Example:

v2.3.1

### Creation date

Example:

2025-06-12

### Last updated

Example:

2026-01-18

---

# Ownership

## Functional owner

Who requested the dashboard and is responsible for ensuring it continues to satisfy operational requirements?

Example:

Platform Engineering Team

### Technical maintainer

Who performs technical maintenance?

Example:

Observability Team

### Support contact

Example:

DL_observability@company.com

---

# Business Context

## Requestors

Who requested the dashboard?

Examples:

- Operations Team
- Engineering Management
- Platform Team
- Customer Success

### Stakeholders

Who regularly consumes the information?

Examples:

- SREs
- Platform Engineers
- Developers
- Management
- Customers

### Requirement description

Briefly describe why this dashboard exists.

Example:

Provide a consolidated operational view of production Kubernetes clusters during incident response.

### Related Dashboard Readiness Assessment

Reference the assessment completed before implementation.

Example:

R-0001 - Dashboard Readiness Assessment

---

# Functional Information

## Target audience

Example:

On-call engineers

### Primary objective

Example:

Reduce investigation time during production incidents.

### Main questions answered

Examples:

- Is the application healthy?
- Where is latency increasing?
- Which services are failing?
- Is infrastructure contributing to the incident?

### Business criticality

Examples:

- Low
- Medium
- High
- Mission Critical

### Expected update frequency

Examples:

- Real-time
- Every minute
- Every five minutes
- Hourly

---

# Technical Implementation

## Platform

Example:

Grafana

### Data sources

Examples:

- Prometheus
- Loki
- Tempo
- InfluxDB
- Elastic
- SQL databases
- REST APIs
- Cloud monitoring platforms
- Custom exporters

### Queries used

Document where queries are stored.

Examples:

- PromQL repository
- Dashboard JSON
- Git repository

### Variables

Examples:

- Environment
- Cluster
- Namespace
- Application
- Region

### Transformations

Describe any transformations performed before visualisation.

Examples:

- Join
- Merge
- Aggregation
- Filtering
- Calculated ratios

### Calculated fields

Document derived values displayed in the dashboard.

Examples:

- Availability
- Error percentage
- CPU utilisation
- Request success rate

### External APIs

List any external systems required.

Example:

- Internal CMDB API
- Deployment API
- Dynatrace API

### Required plugins

Examples:

- Business Charts
- Node Graph
- Flowcharting
- Custom plugins

---

# Operational Information

## Environments covered

Examples:

- Development
- Testing
- Staging
- Production

### Access management

Who can modify the dashboard?

Who can view it?

Example:

- View: All engineers
- Edit: Observability Team

### Dependencies

List systems required for correct operation.

Examples:

- Prometheus
- Alertmanager
- Tempo
- Loki
- Kubernetes API

### Known limitations

Describe known constraints.

Example:

Historical data available for only thirty days.

### Common failure scenarios

Examples:

- Datasource unavailable
- Authentication failure
- High query latency
- Missing metrics
- Plugin incompatibility

---

# Lifecycle Management

## Source repository

Example:

Git repository URL

### Version control

Examples:

- Git
- GitHub
- GitLab
- Azure DevOps

### Pull Requests

Document where implementation changes are reviewed.

### Release notes

Describe significant dashboard changes.

### Promotion process

How does the dashboard move between environments?

Example:

Development → Testing → Production

### Dashboard locations

Examples:

- Development URL
- Testing URL
- Production URL

---

# Validation

## Validation procedure

How should the dashboard be verified before release?

Examples:

- Panels load correctly
- Queries return expected results
- Variables function correctly
- Links work
- Permissions validated
- Performance acceptable

### Recovery procedure

What should engineers do if the dashboard becomes unavailable?

Example:

- Restore previous version from Git.
- Validate datasource connectivity.
- Re-deploy dashboard configuration.
- Notify dashboard owner.

---

# Change History

| Version | Date | Description | Author |
|---------|------|-------------|--------|
| v1.0 | yyyy-mm-dd | Initial version | |
| v1.1 | yyyy-mm-dd | Updated data sources | |
| v2.0 | yyyy-mm-dd | Major redesign | |

---

# Final Review

Before publishing or promoting the dashboard, verify that:

- Ownership is documented.
- Functional objectives remain valid.
- Technical implementation is documented.
- Data sources are identified.
- Dependencies are understood.
- Validation has been completed.
- The recovery procedure is documented.
- Change history has been updated.
- Related documentation is available.

---

# Author's note

Dashboard implementations inevitably evolve as systems, teams and operational requirements change.

Maintaining accurate technical documentation helps preserve operational knowledge, simplifies future modifications and reduces the risk associated with long-lived dashboards.
`
};
