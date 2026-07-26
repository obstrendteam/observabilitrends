import dashboardArticle from "@/data/articles/why-dashboards-fail-before-they-are-even-built.md?raw";

export type Category =
    "Dashboards"
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
  "Dashboards",
  "OpenTelemetry",
  "Prometheus",
  "Grafana",
  "Kubernetes Observability",
  "SRE",
  "Incident Management",
  "Distributed Tracing",
  "Logging",
  "Alerting",
  "AIOps",
  "Platform Engineering",
  "Cloud Monitoring",
];

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  category: Category;
  tags: string[];
  author: {
    name: string;
    role: string;
    initials: string;
  };
    series?: {
  name: string;
  part: number;
  total: number;
};
  date: string;
  readingTime: number;
  featured?: boolean;
  content: string;
}

export const ARTICLES: Article[] = [
  {
    slug: "why-dashboards-often-fail-before-they-are-even-built",
    title: "Why dashboards often fail before they are even built",

    excerpt:
      "Many dashboard problems originate before the first visualization is created. Learn how purpose, audience and ownership help ensure a dashboard remains a valuable operational asset throughout its lifecycle.",

    category: "Dashboards",

    tags: [
      "dashboard",
      "grafana",
      "observability",
      "monitoring",
      "design",
      "sre"
    ],

    author: {
      name: "ObservabiliTrends",
      role: "Editorial Team",
      initials: "OT",
    },

      series: {
  name: "Dashboard Design Series",
  part: 1,
  total: 4,
},

    date: "2026-07-20",

    readingTime: 20,

    featured: true,

    content: dashboardArticle,
  },
];

export function getFeatured() {
  return ARTICLES.filter(article => article.featured);
}

export function getArticle(slug: string) {
  return ARTICLES.find(article => article.slug === slug);
}

export function getRelated(slug: string, limit = 3) {
  const current = getArticle(slug);

  if (!current) return [];

  return ARTICLES
    .filter(a => a.slug !== slug)
    .filter(a => a.category === current.category)
    .slice(0, limit);
}
