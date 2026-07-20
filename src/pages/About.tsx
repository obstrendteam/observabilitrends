import { PageLayout } from "@/components/site/PageLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Target, Compass, Users2, ArrowRight } from "lucide-react";

export default function About() {
  return (
    <PageLayout title="About - ObservabiliTrends" description="Why ObservabiliTrends exists, who's behind it and how we think about observability and reliability." canonical="/about">
      <section className="container-prose pt-20 pb-12">
        <p className="mono text-xs uppercase tracking-wider text-primary">/ about</p>
        <h1 className="mt-2 text-5xl md:text-6xl font-semibold tracking-tighter max-w-3xl leading-[1.05]">
          The observability press for people who run production.
        </h1>
        <p className="mt-6 text-lg text-muted-foreground max-w-2xl leading-relaxed">
          ObservabiliTrends is an independent media platform covering observability, SRE, distributed systems and platform engineering.
        </p>
        <p>
          Founded by Daniel Busquets.

          Connect on <Link to={"www.linkedin.com/in/dbusquets"}>LinkedIn</Link>
        </p>
      </section>

      <section className="container-prose py-12 grid md:grid-cols-3 gap-6">
        {[
          { Icon: Target, title: "Our mission", body: "Help senior engineers make better operational decisions through deeply technical, vendor-neutral writing." },
          { Icon: Compass, title: "Our point of view", body: "Observability is a craft, not a product category. We cover tools - but we measure outcomes." },
          { Icon: Users2, title: "Our readers", body: "SREs, platform engineers, observability architects, CTOs, ..." },
        ].map(({ Icon, title, body }) => (
          <div key={title} className="surface-card p-6">
            <Icon className="h-6 w-6 text-primary" />
            <h3 className="mt-4 font-semibold">{title}</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{body}</p>
          </div>
        ))}
      </section>

      <section className="container-prose py-16 max-w-3xl">
        <h2 className="text-3xl font-semibold tracking-tight">What we believe</h2>
        <div className="mt-6 space-y-5 text-muted-foreground leading-relaxed">
          <p>The observability ecosystem evolves quickly, and separating practical engineering knowledge from marketing messages is not always easy. ObservabiliTrends was created to offer technically grounded content written from the perspective of engineers who build, operate and maintain production systems.</p>

          <p>Our goal is to publish practical, vendor-neutral articles based on research, hands-on experience and industry best practices. When we discuss a technology or recommend an approach, we aim to explain both its strengths and its limitations, helping readers make informed decisions rather than promoting a particular product.</p>

          <p>Our advisory work and editorial content complement each other. Practical experience helps shape the topics we write about, while the research behind every article continually challenges and improves the way we approach observability in real-world environments.</p>
        </div>
      </section>

      <section className="container-prose pb-24">
        <div className="surface-card p-8 md:p-12 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
          <div>
            <h3 className="text-2xl font-semibold tracking-tight">Have a story tip or want to contribute?</h3>
            <p className="mt-2 text-muted-foreground">We work with practicing engineers. Pitch us a postmortem, an architecture deep-dive or a contrarian take.</p>
          </div>
          <Button asChild size="lg"><Link to="/contact">Get in touch <ArrowRight className="ml-1.5 h-4 w-4" /></Link></Button>
        </div>
      </section>
    </PageLayout>
  );
}
