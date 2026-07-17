import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { PageLayout } from "@/components/site/PageLayout";
import { ArticleCard } from "@/components/site/ArticleCard";
import { ARTICLES, CATEGORIES, Category } from "@/data/articles";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";

export default function Articles() {
  const [params, setParams] = useSearchParams();
  const initialCat = params.get("category") as Category | null;
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<Category | "All">(initialCat ?? "All");

  useEffect(() => {
    if (active === "All") { params.delete("category"); setParams(params, { replace: true }); }
    else { params.set("category", active); setParams(params, { replace: true }); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ARTICLES.filter(a => {
      const matchCat = active === "All" || a.category === active;
      const matchQ = !q || a.title.toLowerCase().includes(q) || a.excerpt.toLowerCase().includes(q) || a.tags.some(t => t.includes(q));
      return matchCat && matchQ;
    });
  }, [query, active]);

  return (
    <PageLayout title="Articles — ObservabiliTrends" description="Field reports, playbooks and deep dives on observability, SRE, OpenTelemetry, Prometheus and platform engineering." canonical="/articles">
      <section className="border-b border-border bg-surface">
        <div className="container-prose py-16 md:py-20">
          <p className="mono text-xs uppercase tracking-wider text-primary">/ articles</p>
          <h1 className="mt-2 text-4xl md:text-5xl font-semibold tracking-tighter">The archive</h1>
          <p className="mt-3 text-muted-foreground max-w-2xl">
            Every article we've published. Searchable, filterable, and written for engineers who own the pager.
          </p>

          <div className="mt-8 relative max-w-xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search articles, tags, topics…"
              className="pl-10 h-11"
            />
            {query && (
              <button onClick={() => setQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground" aria-label="Clear">
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </section>

      <section className="container-prose py-10">
        <div className="flex flex-wrap gap-2">
          {(["All", ...CATEGORIES] as const).map(c => (
            <button
              key={c}
              onClick={() => setActive(c as any)}
              className={`mono text-xs px-3 py-1.5 rounded-full border transition-colors ${active === c
                ? "bg-foreground text-background border-foreground"
                : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
                }`}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      <section className="container-prose pb-24">
        {filtered.length === 0 ? (

          <div className="surface-card p-12 md:p-16 text-center">

            <p className="mono text-xs uppercase tracking-wider text-primary">
              / coming soon
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-tight">
              Engineering articles are currently in production
            </h2>

            <p className="mt-5 max-w-2xl mx-auto leading-8 text-muted-foreground">
              ObservabiliTrends publishes original engineering content rather than
              AI-generated filler or repackaged documentation.
            </p>

            <p className="mt-4 max-w-2xl mx-auto leading-8 text-muted-foreground">
              The first in-depth articles are currently being researched,
              peer-reviewed and prepared for publication.
            </p>

          </div>

        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map(a => <ArticleCard key={a.slug} article={a} />)}
          </div>
        )}
      </section>
    </PageLayout>
  );
}
