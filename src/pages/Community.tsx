import { PageLayout } from "@/components/site/PageLayout";
import { NewsletterPanel } from "@/components/site/Newsletter";
import { Users, MessageSquare, Sparkles, Lock } from "lucide-react";

export default function Community() {
  return (

    <PageLayout title="Community - ObservabiliTrends" description="Coming soon." canonical="/community">
      <section className="container-prose pt-20 pb-12">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs">
          <Lock className="h-3 w-3 text-primary" />
          <span className="mono text-muted-foreground">private beta · invite-only</span>
        </div>
        <p className="mono text-xs uppercase tracking-wider text-primary mt-6">/ community</p>
        <h1 className="mt-2 text-5xl md:text-6xl font-semibold tracking-tighter max-w-3xl leading-[1.05]">
          Coming soon.
        </h1>
        <p className="mt-6 text-lg text-muted-foreground max-w-2xl leading-relaxed">
          We're assembling a small community for SREs, platform engineers and observability architects. Practitioners only. No vendors in the channels.
        </p>
      </section>

      <section className="container-prose py-10 grid md:grid-cols-3 gap-6">
        {[
          { Icon: Users, title: "Vetted practitioners", body: "Membership requires a brief application. We optimize for signal, not headcount." },
          { Icon: MessageSquare, title: "Real conversations", body: "Architecture reviews, postmortem swaps, hiring feedback and the occasional rant." },
          { Icon: Sparkles, title: "Early-access content", body: "First reads of articles, drafts of playbooks and unreleased dashboards." },
        ].map(({ Icon, title, body }) => (
          <div key={title} className="surface-card p-6">
            <Icon className="h-6 w-6 text-primary" />
            <h3 className="mt-4 font-semibold">{title}</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{body}</p>
          </div>
        ))}
      </section>
    </PageLayout>
  );
    
    /*
    <PageLayout title="Community - ObservabiliTrends" description="A practitioner community for SREs, platform engineers and observability architects. Coming soon." canonical="/community">
      <section className="container-prose pt-20 pb-12">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs">
          <Lock className="h-3 w-3 text-primary" />
          <span className="mono text-muted-foreground">private beta · invite-only</span>
        </div>
        <p className="mono text-xs uppercase tracking-wider text-primary mt-6">/ community</p>
        <h1 className="mt-2 text-5xl md:text-6xl font-semibold tracking-tighter max-w-3xl leading-[1.05]">
          A quiet room for people who own the pager.
        </h1>
        <p className="mt-6 text-lg text-muted-foreground max-w-2xl leading-relaxed">
          We're assembling a small, high-signal community for SREs, platform engineers and observability architects. Practitioners only. No vendors in the channels. No recruiter spam.
        </p>
      </section>

      <section className="container-prose py-10 grid md:grid-cols-3 gap-6">
        {[
          { Icon: Users, title: "Vetted practitioners", body: "Membership requires a brief application. We optimize for signal, not headcount." },
          { Icon: MessageSquare, title: "Real conversations", body: "Architecture reviews, postmortem swaps, hiring feedback, and the occasional rant." },
          { Icon: Sparkles, title: "Early-access content", body: "First reads of articles, drafts of playbooks, and unreleased dashboards." },
        ].map(({ Icon, title, body }) => (
          <div key={title} className="surface-card p-6">
            <Icon className="h-6 w-6 text-primary" />
            <h3 className="mt-4 font-semibold">{title}</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{body}</p>
          </div>
        ))}
      </section>

      <section className="container-prose py-16 max-w-3xl">
        <h2 className="text-3xl font-semibold tracking-tight">What's coming</h2>
        <ul className="mt-6 space-y-4 text-muted-foreground">
          <li className="flex gap-4"><span className="mono text-primary shrink-0">Q3 2026</span> Forum integration with topic-based channels and threaded discussions.</li>
          <li className="flex gap-4"><span className="mono text-primary shrink-0">Q4 2026</span> Public profiles with reputation, contributions, and verified employer.</li>
          <li className="flex gap-4"><span className="mono text-primary shrink-0">Q1 2027</span> Job board curated by community members - no agency reposts.</li>
          <li className="flex gap-4"><span className="mono text-primary shrink-0">later</span> Mobile companion app, AMAs, and member-led workshops.</li>
        </ul>
      </section>

      <section className="container-prose pb-24">
        <NewsletterPanel />
        <p className="mt-4 text-center text-sm text-muted-foreground">
          Subscribers get the community invite first.
        </p>
      </section>
    </PageLayout>
  );
  */
}
