import { PageLayout } from "@/components/site/PageLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Target, Compass, Users2, ArrowRight } from "lucide-react";

export default function About() {
  return (
    <PageLayout title="About - ObservabiliTrends" description="Why ObservabiliTrends exists, who's behind it and how we think about observability and reliability." canonical="/about">
      <section className="container-prose pt-20 pb-12">

        <p className="mono text-xs uppercase tracking-wider text-primary">
          / about
        </p>

        <h1 className="mt-8 text-5xl md:text-6xl font-semibold tracking-tighter leading-[1.05] max-w-5xl">
          Independent engineering research for modern observability.
        </h1>

        <p className="mt-8 text-xl text-muted-foreground max-w-3xl leading-relaxed">
          ObservabiliTrends is an independent editorial platform dedicated to
          observability, reliability engineering and platform architecture.
          We publish long-form technical research, engineering resources and
          practical guidance designed for professionals operating production
          systems at scale.
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
        <h2 className="text-3xl font-semibold tracking-tight">
Editorial principles
</h2>
        <div className="mt-6 space-y-5 text-muted-foreground leading-relaxed">
          <p>Observability has become one of the fastest-moving areas of modern software engineering. New tools, commercial platforms and architectural patterns appear constantly, making it increasingly difficult to distinguish engineering practice from product messaging.</p>

          <p>ObservabiliTrends exists to provide carefully researched, vendor-neutral content that prioritises technical accuracy over marketing narratives. Every article is written with the goal of helping engineers make better operational decisions.</p>

          <p>We believe good engineering comes from understanding principles before products. Technology changes rapidly; sound design decisions tend to last much longer.</p>
        </div>
      </section>

      <section className="container-prose py-16">

        <div className="surface-card p-8 md:p-10">

          <p className="mono text-xs uppercase tracking-wider text-primary">
            / founder
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-tight">
            Built by an engineer.
          </h2>

          <div className="mt-6 space-y-5 text-muted-foreground leading-relaxed max-w-3xl">

            <p>
              ObservabiliTrends was founded by
              <span className="text-foreground font-medium">
                {" "}Daniel Busquets
              </span>,
              an observability engineer focused on monitoring strategy,
              dashboard design, platform engineering and operational excellence.
            </p>

            <p>
              The objective is simple: create the kind of technical
              publication that many engineers wish existed: deeply researched,
              vendor-neutral and based on real operational experience rather than
              marketing narratives.
            </p>

          </div>

          <div className="mt-8 flex flex-wrap gap-4">

            <a
              href="https://www.linkedin.com/in/dbusquets"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-md border border-primary/30 bg-primary/5 px-5 py-3 text-sm font-medium hover:border-primary hover:bg-primary/10 transition"
            >
              Connect on LinkedIn
            </a>

            <Link
              to="/contact"
              className="inline-flex items-center rounded-md border border-border px-5 py-3 text-sm hover:border-primary transition"
            >
              Contact
            </Link>

          </div>

        </div>

      </section>
    </PageLayout>
  );
}
