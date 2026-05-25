import { PageLayout } from "@/components/site/PageLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Shield, GitBranch, BarChart3, Zap, CheckCircle2, ArrowRight } from "lucide-react";

const ENGAGEMENTS = [
  {
    Icon: Shield,
    name: "Observability Architecture Review",
    duration: "2–4 weeks",
    summary: "A senior-led audit of your metrics, logs and tracing architecture. Deliverable: prioritized roadmap with cost and reliability impact.",
    points: ["Topology and data flow analysis", "Cost & cardinality assessment", "Tooling fit-gap analysis", "12-month roadmap"],
  },
  {
    Icon: BarChart3,
    name: "Monitoring & Alerting Assessment",
    duration: "2–3 weeks",
    summary: "Turn alert fatigue into a tiered, actionable signal hierarchy. Tied to SLOs and on-call ergonomics.",
    points: ["Alert inventory & noise scoring", "SLO design & error-budget policy", "Runbook templates", "On-call rotation review"],
  },
  {
    Icon: GitBranch,
    name: "Reliability & SRE Consulting",
    duration: "Ongoing",
    summary: "Embedded advisory for platform and SRE leadership. Strategy, hiring, postmortem programs, and exec narrative.",
    points: ["SRE org design", "Postmortem program rollout", "Incident command training", "Executive reporting"],
  },
  {
    Icon: Zap,
    name: "Cost Optimization Sprint",
    duration: "3 weeks",
    summary: "Cut observability spend without losing signal. Target: 30–60% reduction with measurable retention of operational coverage.",
    points: ["Vendor invoice analysis", "Tiering & sampling strategy", "Migration plan if warranted", "Quarterly review framework"],
  },
];

export default function Services() {
  return (
    <PageLayout title="Services — ObservabiliTrends Advisory" description="Independent advisory for platform and SRE teams. Architectural reviews, monitoring assessments, SLO design, and cost optimization." canonical="/services">
      <section className="container-prose pt-20 pb-10">
        <p className="mono text-xs uppercase tracking-wider text-primary">/ advisory</p>
        <h1 className="mt-2 text-5xl md:text-6xl font-semibold tracking-tighter max-w-3xl leading-[1.05]">
          Senior, independent advisory for observability and reliability.
        </h1>
        <p className="mt-6 text-lg text-muted-foreground max-w-2xl leading-relaxed">
          Focused engagements with platform, SRE and infrastructure teams. Vendor-neutral. Outcome-driven. Run by practitioners who still ship.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild size="lg"><Link to="/contact">Book intro call <ArrowRight className="ml-1.5 h-4 w-4" /></Link></Button>
          <Button asChild size="lg" variant="outline"><a href="#engagements">See engagements</a></Button>
        </div>
      </section>

      <section id="engagements" className="container-prose py-16 grid md:grid-cols-2 gap-6">
        {ENGAGEMENTS.map(({ Icon, name, duration, summary, points }) => (
          <div key={name} className="surface-card p-8">
            <div className="flex items-start justify-between">
              <Icon className="h-6 w-6 text-primary" />
              <span className="mono text-[11px] uppercase tracking-wider text-muted-foreground">{duration}</span>
            </div>
            <h2 className="mt-4 text-xl font-semibold tracking-tight">{name}</h2>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{summary}</p>
            <ul className="mt-5 space-y-2">
              {points.map(p => (
                <li key={p} className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="container-prose py-16">
        <div className="surface-card p-10 md:p-14 text-center">
          <p className="mono text-xs uppercase tracking-wider text-primary">/ process</p>
          <h2 className="mt-2 text-3xl md:text-4xl font-semibold tracking-tight">A simple, senior process.</h2>
          <div className="mt-10 grid md:grid-cols-4 gap-6 text-left">
            {[
              ["01", "Discovery call", "30 minutes. No charge. We figure out if there's a fit."],
              ["02", "Scoping", "Fixed-scope SoW with clear deliverables and a timeline."],
              ["03", "Engagement", "Embedded with your team. Weekly checkpoints, no surprises."],
              ["04", "Handoff", "Written deliverables, recorded walkthroughs, and a 30-day follow-up."],
            ].map(([n, title, body]) => (
              <div key={n}>
                <div className="mono text-xs text-primary">{n}</div>
                <div className="mt-2 font-semibold">{title}</div>
                <p className="mt-1 text-sm text-muted-foreground">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-prose pb-24">
        <div className="surface-card p-8 md:p-12 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
          <div>
            <h3 className="text-2xl font-semibold tracking-tight">Ready to talk?</h3>
            <p className="mt-2 text-muted-foreground">Tell us what you're trying to solve. We'll tell you honestly if we can help.</p>
          </div>
          <Button asChild size="lg"><Link to="/contact">Start the conversation <ArrowRight className="ml-1.5 h-4 w-4" /></Link></Button>
        </div>
      </section>
    </PageLayout>
  );
}
