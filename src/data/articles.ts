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

export const ARTICLES: Article[] = [];

export const getFeatured = () =>
  ARTICLES.filter(article => article.featured);

export const getArticle = (slug: string) =>
  ARTICLES.find(article => article.slug === slug);

export const getRelated = () => [];