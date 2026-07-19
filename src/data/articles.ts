import articleContent from "@/data/articles/why-dashboards-fail-before-they-are-even-built.md?raw";

export type Category =
  | "Dashboards"
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
  date: string;
  readingTime: number;
  featured?: boolean;
  content: string;
}

export const ARTICLES: Article[] = [
  {
    slug: "why-dashboards-fail-before-they-are-even-built",

    title: "Why dashboards often fail before they are even built",

    excerpt:
      "Dashboards are among the most common artifacts in modern observability platforms, yet many gradually lose their original purpose. This article explores the decisions that determine whether a dashboard becomes a useful operational tool or simply another collection of charts.",

    category: "Dashboards",

    tags: [
      "dashboards",
      "observability",
      "monitoring",
      "grafana",
      "sre",
      "design",
    ],

    author: {
      name: "ObservabiliTrends Editorial Team",
      role: "Editorial Team",
      initials: "OT",
    },

    date: "2026-07-19",

    readingTime: 20,

    featured: true,

    content: articleContent,
  },
];

export const getFeatured = () =>
  ARTICLES.filter(article => article.featured);

export const getArticle = (slug: string) =>
  ARTICLES.find(article => article.slug === slug);

export const getRelated = (
  slug: string,
  limit = 3
) =>
  ARTICLES
    .filter(article => article.slug !== slug)
    .slice(0, limit);