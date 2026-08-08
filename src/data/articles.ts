import dashboardArticle from "@/data/articles/why-dashboards-fail-before-they-are-even-built.md?raw";
import dashboardDesignPrinciplesArticle from "@/data/articles/dashboard-design-principles.md?raw";

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
    company?: string;
    linkedin?: string;
    bio?: string;
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
      "Many dashboard problems originate before its implementation. Learn how purpose, audience and ownership help ensure a dashboard remains a valuable operational asset throughout its lifecycle.",

    category: "Dashboards",

    tags: [
      "dashboard",
      "grafana",
      "observability",
      "monitoring",
      "design",
      "sre",
    ],

    author: {
      name: "Daniel Busquets",
      initials: "DB",
      role: "Founder & Editor",
      company: "ObservabiliTrends",
      linkedin: "https://linkedin.com/in/dbusquets",
    },

    series: {
      name: "Dashboard Design Series",
      part: 1,
      total: 5,
    },

    date: "2026-07-20",

    readingTime: 20,

    featured: true,

    content: dashboardArticle,
  },

  {
    slug: "dashboard-design-principles",

    title: "Dashboard Design Principles",

    excerpt:
      "A practical examination of the principles that make operational dashboards easier to interpret, navigate and maintain as systems evolve.",

    category: "Dashboards",

    tags: [
      "dashboard",
      "observability",
      "monitoring",
      "design",
      "sre",
    ],

    author: {
      name: "Daniel Busquets",
      initials: "DB",
      role: "Founder & Editor",
      company: "ObservabiliTrends",
      linkedin: "https://linkedin.com/in/dbusquets",
    },

    series: {
      name: "Dashboard Design Series",
      part: 2,
      total: 5,
    },

    date: "2026-08-08",

    readingTime: 15,

    featured: true,

    content: dashboardDesignPrinciplesArticle,
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
