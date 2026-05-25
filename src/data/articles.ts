export type Category =
  | "OpenTelemetry"
  | "Prometheus"
  | "Grafana"
  | "Kubernetes Observability"
  | "SRE"
  | "Incident Management"
  | "Distributed Tracing"
  | "Logging"
  | "Alerting"
  | "AIOps"
  | "Platform Engineering"
  | "Cloud Monitoring";

export const CATEGORIES: Category[] = [
  "OpenTelemetry", "Prometheus", "Grafana", "Kubernetes Observability",
  "SRE", "Incident Management", "Distributed Tracing", "Logging",
  "Alerting", "AIOps", "Platform Engineering", "Cloud Monitoring",
];

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  category: Category;
  tags: string[];
  author: { name: string; role: string; initials: string };
  date: string;
  readingTime: number;
  featured?: boolean;
  content: string; // markdown-like, simple paragraphs and ## headings
}

export const ARTICLES: Article[] = [
  {
    slug: "opentelemetry-collector-production-patterns",
    title: "OpenTelemetry Collector in Production: Patterns That Actually Scale",
    excerpt: "Sidecar, agent, gateway — and the failure modes nobody talks about. A field guide to running OTel Collector at multi-million span throughput.",
    category: "OpenTelemetry",
    tags: ["otel", "collector", "scaling", "architecture"],
    author: { name: "Elena Marquez", role: "Principal SRE", initials: "EM" },
    date: "2026-05-18",
    readingTime: 14,
    featured: true,
    content: `## Why the deployment topology matters more than you think

Every OpenTelemetry rollout we have reviewed in the last 18 months hit the same wall: the collector topology was chosen before anyone modeled cardinality, retry storms, or back-pressure. The result is predictable — a Tuesday afternoon outage triggered by the observability stack itself.

## Agent, sidecar, gateway: a decision matrix

The three canonical deployments solve different problems. Agents win on resource locality. Sidecars win on tenant isolation. Gateways win on traffic shaping. Mixing them is not a hack — it is the production answer.

## Backpressure, retries, and the queue you forgot about

The default \`sending_queue\` is generous to a fault. Under a real outage, it will buffer until OOM and take the node with it. Cap it, alert on it, and design the upstream to degrade.

## What we recommend in 2026

Run a thin agent for local enrichment, a regional gateway for routing, and never let an application talk directly to a vendor endpoint. Your future on-call will thank you.`,
  },
  {
    slug: "prometheus-cardinality-budget",
    title: "The Cardinality Budget: A Practical Framework for Prometheus at Scale",
    excerpt: "High cardinality is not the enemy — unmanaged cardinality is. A budgeting model that scales from one team to one hundred.",
    category: "Prometheus",
    tags: ["prometheus", "cardinality", "cost", "governance"],
    author: { name: "Marcus Chen", role: "Observability Architect", initials: "MC" },
    date: "2026-05-10",
    readingTime: 11,
    featured: true,
    content: `## The hidden tax of every new label

Each new label value multiplies storage, query cost, and ingestion CPU. Most teams discover this the week before renewal pricing.

## Establishing a per-team budget

Treat active series like a finite resource. Allocate, measure, and chargeback. Teams adapt quickly when the cost is visible.

## Tools and policy

A combination of recording rules, label dropping at the scrape layer, and per-tenant limits in Mimir/Thanos closes the loop.`,
  },
  {
    slug: "sre-error-budgets-without-politics",
    title: "Error Budgets Without the Politics: Making SLOs Work in Real Orgs",
    excerpt: "The math is easy. The conversation is hard. A pragmatic playbook for SLOs that survive contact with product managers.",
    category: "SRE",
    tags: ["slo", "error-budget", "culture"],
    author: { name: "Priya Sharma", role: "Staff SRE", initials: "PS" },
    date: "2026-05-02",
    readingTime: 9,
    featured: true,
    content: `## SLOs are a contract, not a dashboard

Treat them as commitments between engineering and the business. The dashboard is just the receipt.

## Picking the right SLI

Latency p99 is a starting point, not a destination. Measure what the user actually feels.

## What to do when the budget burns

Pre-agreed actions remove the meeting. That is the whole point.`,
  },
  {
    slug: "distributed-tracing-sampling-strategies",
    title: "Tail Sampling, Head Sampling, and the Lies We Tell Ourselves",
    excerpt: "Why most tracing deployments are sampling wrong — and a decision tree to fix it.",
    category: "Distributed Tracing",
    tags: ["tracing", "sampling", "tail-sampling"],
    author: { name: "Jordan Reyes", role: "Senior SRE", initials: "JR" },
    date: "2026-04-24", readingTime: 12,
    content: `## Head sampling is cheap and wrong

It is cheap because it decides early. It is wrong because the interesting traces are statistically rare.

## Tail sampling is expensive and right

You pay in memory and complexity. You get the outliers that actually matter.

## A hybrid that ships`,
  },
  {
    slug: "kubernetes-observability-baseline",
    title: "The Kubernetes Observability Baseline Every Cluster Should Ship With",
    excerpt: "kube-state-metrics, cAdvisor, OTel — what you need on day one, and what to add when the cluster grows up.",
    category: "Kubernetes Observability",
    tags: ["kubernetes", "metrics", "baseline"],
    author: { name: "Elena Marquez", role: "Principal SRE", initials: "EM" },
    date: "2026-04-15", readingTime: 10,
    content: `## The non-negotiables

Pod-level CPU and memory, node pressure signals, API server latency, scheduler queue depth. If any of these are missing, you are flying blind.

## Layering for maturity

Add control-plane traces, eBPF-derived signals, and topology-aware dashboards as the org matures.`,
  },
  {
    slug: "incident-management-postmortem-template",
    title: "A Postmortem Template That Engineers Actually Fill Out",
    excerpt: "Shorter, sharper, blameless — the format we have iterated on across 400+ incidents.",
    category: "Incident Management",
    tags: ["postmortem", "incidents", "process"],
    author: { name: "Priya Sharma", role: "Staff SRE", initials: "PS" },
    date: "2026-04-08", readingTime: 7,
    content: `## Why most templates fail

They optimize for completeness over clarity. Engineers stop filling them out by month three.

## The five fields that matter

Impact, timeline, root cause, contributing factors, action items with owners. That is the document.`,
  },
  {
    slug: "grafana-dashboard-design-principles",
    title: "Dashboard Design Principles for On-Call Engineers at 3am",
    excerpt: "A dashboard is a UI. Treat it like one. Eight rules that make the difference between signal and noise.",
    category: "Grafana",
    tags: ["grafana", "dashboards", "ux"],
    author: { name: "Marcus Chen", role: "Observability Architect", initials: "MC" },
    date: "2026-03-30", readingTime: 8,
    content: `## Rule 1: One question per dashboard

If you cannot state the question the dashboard answers in one sentence, split it.

## Rule 2: Time alignment is non-negotiable

Mismatched time ranges are a top-three source of incorrect incident calls.`,
  },
  {
    slug: "aiops-anomaly-detection-reality-check",
    title: "AIOps Anomaly Detection: A Reality Check for 2026",
    excerpt: "Vendors promise auto-remediation. Reality is messier — and more interesting.",
    category: "AIOps",
    tags: ["aiops", "ml", "anomaly-detection"],
    author: { name: "Jordan Reyes", role: "Senior SRE", initials: "JR" },
    date: "2026-03-22", readingTime: 9,
    content: `## Where ML genuinely helps

Seasonal forecasting, alert correlation, and noise reduction. Three places, well bounded.

## Where it still does not

Root cause attribution remains a human craft.`,
  },
  {
    slug: "platform-engineering-golden-paths",
    title: "Golden Paths Without the Gold Plating",
    excerpt: "How to build internal platforms that developers actually choose — not the ones leadership mandates.",
    category: "Platform Engineering",
    tags: ["idp", "platform", "developer-experience"],
    author: { name: "Elena Marquez", role: "Principal SRE", initials: "EM" },
    date: "2026-03-14", readingTime: 11,
    content: `## Opt-in beats mandate

The best platforms win by being faster, not by being required.

## Measure adoption, not coverage

Coverage is vanity. Adoption is the metric.`,
  },
  {
    slug: "logging-cost-control-2026",
    title: "Logging Cost Control in 2026: Tiering, Sampling, and What to Stop Logging",
    excerpt: "A practical guide to cutting log spend 60% without losing the signal you need at 2am.",
    category: "Logging",
    tags: ["logs", "cost", "tiering"],
    author: { name: "Marcus Chen", role: "Observability Architect", initials: "MC" },
    date: "2026-03-05", readingTime: 10,
    content: `## The 80/20 of log spend

Eighty percent of log volume comes from twenty percent of services. Start there.

## Hot, warm, cold

Tier aggressively. Most logs are read once, if at all.`,
  },
  {
    slug: "alerting-philosophy-symptoms-over-causes",
    title: "Alert on Symptoms, Not Causes — Revisited",
    excerpt: "Mike Julian's principle, ten years later, with what changed and what did not.",
    category: "Alerting",
    tags: ["alerting", "philosophy", "slo"],
    author: { name: "Priya Sharma", role: "Staff SRE", initials: "PS" },
    date: "2026-02-25", readingTime: 6,
    content: `## The principle still holds

User-visible symptoms make the best pages. Causes belong in runbooks.

## What changed

SLO-based alerting made the principle operational.`,
  },
  {
    slug: "cloud-monitoring-multi-region-strategy",
    title: "Multi-Region Monitoring Without Multi-Region Headaches",
    excerpt: "Federation, global views, and the hard tradeoffs nobody documents.",
    category: "Cloud Monitoring",
    tags: ["multi-region", "federation", "architecture"],
    author: { name: "Jordan Reyes", role: "Senior SRE", initials: "JR" },
    date: "2026-02-18", readingTime: 12,
    content: `## The three architectures

Per-region independent, federated read, fully replicated. Each has a failure mode.

## Picking yours

The answer is almost always federated read, with regional autonomy for alerting.`,
  },
];

export const getFeatured = () => ARTICLES.filter(a => a.featured);
export const getArticle = (slug: string) => ARTICLES.find(a => a.slug === slug);
export const getRelated = (slug: string, n = 3) => {
  const a = getArticle(slug);
  if (!a) return [];
  return ARTICLES.filter(x => x.slug !== slug && x.category === a.category).slice(0, n);
};
