import { Link } from "react-router-dom";
import { Activity, Github, Twitter, Linkedin, Rss } from "lucide-react";
import { NewsletterInline } from "./Newsletter";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-surface">
      <div className="container-prose py-16">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Link to="/" className="flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-foreground text-background">
                <Activity className="h-4 w-4" strokeWidth={2.5} />
              </span>
              <span className="font-semibold tracking-tight">
                Observabili<span className="text-primary">Trends</span>
              </span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground max-w-sm">
              Deep analysis, playbooks and field reports on observability, SRE and platform engineering. For senior engineers who ship.
            </p>
            <div className="mt-6 max-w-sm">
              <NewsletterInline />
            </div>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Content</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link to="/articles" className="hover:text-primary">Articles</Link></li>
              <li><Link to="/articles?category=SRE" className="hover:text-primary">SRE</Link></li>
              <li><Link to="/articles?category=OpenTelemetry" className="hover:text-primary">OpenTelemetry</Link></li>
              <li><Link to="/articles?category=Platform%20Engineering" className="hover:text-primary">Platform</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Company</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-primary">About</Link></li>
              <li><Link to="/services" className="hover:text-primary">Services</Link></li>
              <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
              <li><Link to="/community" className="hover:text-primary">Community</Link></li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Follow</h4>
            <div className="mt-4 flex items-center gap-2">
              {[
                { Icon: Github, label: "GitHub", href: "#" },
                { Icon: Twitter, label: "Twitter / X", href: "#" },
                { Icon: Linkedin, label: "LinkedIn", href: "#" },
                { Icon: Rss, label: "RSS", href: "/rss.xml" },
              ].map(({ Icon, label, href }) => (
                <a key={label} href={href} aria-label={label}
                   className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} ObservabiliTrends. All systems nominal.</p>
          <p className="mono">v0.1.0 · build {new Date().toISOString().slice(0,10)}</p>
        </div>
      </div>
    </footer>
  );
}
