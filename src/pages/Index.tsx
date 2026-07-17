import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Shield, Zap, GitBranch, Terminal, BarChart3, Users, BookOpen, Activity } from "lucide-react";
import { PageLayout } from "@/components/site/PageLayout";
import { Button } from "@/components/ui/button";
import { ArticleCard } from "@/components/site/ArticleCard";
import { NewsletterPanel } from "@/components/site/Newsletter";
import { MetricSparkline, StatusPill } from "@/components/site/MetricSparkline";
import { ARTICLES, CATEGORIES, getFeatured } from "@/data/articles";

const LOGOS = ["DATADOG", "GRAFANA", "HONEYCOMB", "NEW RELIC", "ELASTIC", "DYNATRACE", "SPLUNK", "CHRONOSPHERE"];

export default function Home() {

  /*
  const featured = getFeatured();
  const recent = ARTICLES.slice(0, 6);
  */

  const featured = getFeatured();
  const recent = ARTICLES.slice(0, 6);

  const hasArticles = ARTICLES.length > 0;

  return (
    <PageLayout
      title="ObservabiliTrends — Observability, SRE & Platform Engineering"
      description="Field reports, playbooks and deep analysis on observability, SRE, OpenTelemetry and platform engineering. For senior engineers."
      canonical="/"
    >
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero pointer-events-none" />
        <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
        <div className="container-prose relative pt-20 pb-24 md:pt-28 md:pb-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 backdrop-blur px-3 py-1 text-xs animate-float-up">
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary">
                <span className="absolute inset-0 rounded-full bg-primary opacity-60 animate-pulse-dot" />
              </span>
              <span className="mono text-muted-foreground">new · weekly dispatch shipping every Thursday</span>
            </div>

            <h1 className="mt-6 text-5xl md:text-7xl font-semibold tracking-tighter leading-[1.02] animate-float-up">
              Observability,<br />
              <span className="text-gradient">without the fluff.</span>
            </h1>

            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed animate-float-up">
              Field reports, postmortem patterns, and architecture deep-dives on
              <span className="text-foreground"> OpenTelemetry, Prometheus, SRE</span> and platform engineering — written by engineers who run production.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3 animate-float-up">
              <Button asChild size="lg" className="h-12 px-6 text-base">
                <Link to="/articles">Read the articles <ArrowRight className="ml-1.5 h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12 px-6 text-base">
                <Link to="/services">Work with us</Link>
              </Button>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 animate-float-up">
              <StatusPill label="all systems · ingest 4.2M spans/min" status="ok" />
              <StatusPill label="cardinality budget · 78% utilized" status="warn" />
              <StatusPill label="SLO burn · within budget" status="ok" />
            </div>
          </div>

          {/* Decorative metric card */}
          <div className="mt-16 grid gap-4 md:grid-cols-3 max-w-4xl">
            {[
              { label: "p99 latency", value: "142ms", delta: "-12%" },
              { label: "error budget", value: "97.4%", delta: "+0.3%" },
              { label: "active series", value: "8.2M", delta: "-4%" },
            ].map((m) => (
              <div key={m.label} className="surface-card p-5">
                <div className="flex items-center justify-between">
                  <span className="mono text-[11px] uppercase tracking-wider text-muted-foreground">{m.label}</span>
                  <span className="mono text-[11px] text-primary">{m.delta}</span>
                </div>
                <div className="mt-2 text-3xl font-semibold tracking-tight">{m.value}</div>
                <MetricSparkline className="mt-2 h-10 w-full" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LOGO TICKER */}
      <section className="border-y border-border bg-surface overflow-hidden">
        <div className="container-prose py-6">
          <p className="mono text-[11px] uppercase tracking-wider text-muted-foreground text-center">
            covering the entire observability ecosystem
          </p>
        </div>
        <div className="relative overflow-hidden border-t border-border">
          <div className="flex gap-12 py-5 animate-ticker whitespace-nowrap">
            {[...LOGOS, ...LOGOS, ...LOGOS].map((l, i) => (
              <span key={i} className="mono text-sm tracking-[0.2em] text-muted-foreground/70 hover:text-foreground transition-colors">
                {l}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED */}

      {hasArticles ? (

        <section className="container-prose py-20 md:py-28">

          <div className="flex items-end justify-between mb-10">

            <div>
              <p className="mono text-xs uppercase tracking-wider text-primary">
                / featured
              </p>

              <h2 className="mt-2 text-3xl md:text-4xl font-semibold tracking-tight">
                This week's deep dives
              </h2>
            </div>

            <Link
              to="/articles"
              className="hidden sm:inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary"
            >
              All articles
              <ArrowRight className="h-4 w-4" />
            </Link>

          </div>

          <div className="grid gap-6 lg:grid-cols-2">

            {featured[0] && (
              <div className="lg:row-span-2">
                <ArticleCard article={featured[0]} featured />
              </div>
            )}

            {featured.slice(1, 3).map(article => (
              <ArticleCard
                key={article.slug}
                article={article}
              />
            ))}

          </div>

        </section>

      ) : (

        <section className="container-prose py-20 md:py-28">

          <div className="surface-card p-12 md:p-16 text-center">

            <p className="mono text-xs uppercase tracking-wider text-primary">
              / articles
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight">
              Technical articles are coming soon
            </h2>

            <p className="mt-5 max-w-2xl mx-auto text-muted-foreground leading-relaxed">
              We're preparing long-form engineering articles focused on
              OpenTelemetry, Grafana, Prometheus, Kubernetes observability,
              platform engineering and production reliability.
              Every article is written from real-world experience rather than
              AI-generated filler.
            </p>

          </div>

        </section>

      )}

      {/* WHAT WE COVER */}
      <section className="container-prose py-20 md:py-24">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-4">
            <p className="mono text-xs uppercase tracking-wider text-primary">/ coverage</p>
            <h2 className="mt-2 text-3xl md:text-4xl font-semibold tracking-tight">Twelve domains. One discipline.</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              We write across the entire observability and reliability stack — from collector internals to org-wide SLO programs.
            </p>
          </div>
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-3">
            {CATEGORIES.map(c => (
              <Link
                key={c}
                to={`/articles?category=${encodeURIComponent(c)}`}
                className="surface-card p-4 group"
              >
                <div className="mono text-[10px] uppercase tracking-wider text-muted-foreground">domain</div>
                <div className="mt-1 text-sm font-medium group-hover:text-primary transition-colors">{c}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* RECENT */}

      {hasArticles && (

        <section className="container-prose py-20 md:py-24">

          <div className="flex items-end justify-between mb-10">

            <div>
              <p className="mono text-xs uppercase tracking-wider text-primary">
                / recent
              </p>

              <h2 className="mt-2 text-3xl md:text-4xl font-semibold tracking-tight">
                Latest from the dispatch
              </h2>
            </div>

          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            {recent.map(article => (
              <ArticleCard
                key={article.slug}
                article={article}
              />
            ))}

          </div>

        </section>

      )}

      {/* CONSULTING TRUST STRIP */}
      <section className="container-prose py-20 md:py-24">
        <div className="surface-card p-8 md:p-12">
          <div className="grid md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-7">
              <p className="mono text-xs uppercase tracking-wider text-primary">/ advisory</p>
              <h2 className="mt-2 text-3xl md:text-4xl font-semibold tracking-tight">
                Need a second opinion on your observability stack?
              </h2>
              <p className="mt-4 text-muted-foreground">
                We run focused engagements with platform and SRE teams: architectural reviews, monitoring assessments, and reliability deep-dives. Typically 2–6 weeks. Outcomes, not slideware.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild size="lg"><Link to="/services">See engagements <ArrowRight className="ml-1.5 h-4 w-4" /></Link></Button>
                <Button asChild size="lg" variant="outline"><Link to="/contact">Book intro call</Link></Button>
              </div>
            </div>
            <div className="md:col-span-5 grid grid-cols-2 gap-3">
              {[
                { Icon: Shield, label: "Architectural review" },
                { Icon: Zap, label: "Cost optimization" },
                { Icon: GitBranch, label: "Migration support" },
                { Icon: BarChart3, label: "SLO program design" },
              ].map(({ Icon, label }) => (
                <div key={label} className="rounded-lg border border-border p-4">
                  <Icon className="h-5 w-5 text-primary" />
                  <div className="mt-2 text-sm font-medium">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* COMMUNITY TEASER */}
      <section className="container-prose py-12">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="surface-card p-8">
            <Users className="h-6 w-6 text-primary" />
            <h3 className="mt-4 text-xl font-semibold">A community is being assembled.</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              A practitioner forum for SREs, platform engineers and observability architects. Quietly, deliberately. Be early.
            </p>
            <Link to="/community" className="mt-4 inline-flex items-center gap-1 text-sm text-primary">
              Join the waitlist <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="surface-card p-8">
            <BookOpen className="h-6 w-6 text-primary" />
            <h3 className="mt-4 text-xl font-semibold">Playbooks coming soon.</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Battle-tested runbooks, dashboards and SLO templates — packaged and ready to deploy. Premium subscribers get early access.
            </p>
            <Link to="/contact" className="mt-4 inline-flex items-center gap-1 text-sm text-primary">
              Get notified <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="container-prose pb-24">
        <NewsletterPanel />
      </section>
    </PageLayout>
  );
}
