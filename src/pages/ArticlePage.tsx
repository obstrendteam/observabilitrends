import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { PageLayout } from "@/components/site/PageLayout";
import { getArticle, getRelated } from "@/data/articles";
import { ArticleCard } from "@/components/site/ArticleCard";
import { Helmet } from "react-helmet-async";
import { Clock, Calendar, ArrowLeft, Twitter, Linkedin, Link2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import NotFound from "./NotFound";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function ArticlePage() {
  const { slug = "" } = useParams();
  const article = getArticle(slug);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const total = h.scrollHeight - h.clientHeight;
      setProgress(total > 0 ? Math.min(100, (h.scrollTop / total) * 100) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const sections = useMemo(() => {
    if (!article) return [];

    return article.content
      .split("\n")
      .filter(line => line.startsWith("## "))
      .map(line => {
        const text = line.replace("## ", "").trim();

        return {
          text,
          id: slugify(text),
        };
      });
  }, [article]);

  if (!article) return <NotFound />;
  const related = getRelated(article.slug, 3);
  const url = typeof window !== "undefined" ? window.location.href : "";

  return (
    <PageLayout>
      <Helmet>
        <title>{article.title} - ObservabiliTrends</title>
        <meta name="description" content={article.excerpt} />
        <link rel="canonical" href={`/articles/${article.slug}`} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.excerpt} />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: article.title,
          description: article.excerpt,
          author: { "@type": "Person", name: article.author.name },
          datePublished: article.date,
          articleSection: article.category,
          keywords: article.tags.join(", "),
        })}</script>
      </Helmet>

      {/* Reading progress */}
      <div className="fixed top-0 left-0 right-0 z-50 h-0.5 bg-transparent">
        <div className="h-full bg-primary transition-[width] duration-150" style={{ width: `${progress}%` }} />
      </div>

      <article className="container-prose pt-12 md:pt-16 pb-12">
        <Link to="/articles" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary">
          <ArrowLeft className="h-4 w-4" /> All articles
        </Link>

        <div className="mt-8 max-w-6xl">
          <span className="mono text-xs uppercase tracking-wider px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
            {article.category}
          </span>
          <h1 className="mt-5 max-w-none text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tighter leading-[1.05] text-balance">
            {article.title}
          </h1>
          <p className="mt-5 max-w-4xl text-lg text-muted-foreground leading-relaxed">{article.excerpt}</p>

<div className="mt-8 border-y border-border py-4">

  {article.series && (
    <div className="mb-4">

      <p className="mono text-[11px] uppercase tracking-[0.18em] text-primary">
        Editorial Series
      </p>

      <div className="mt-1">
        <p className="font-medium text-foreground">
          {article.series.name}
        </p>

        <p className="text-sm text-muted-foreground">
          Part {article.series.part} of {article.series.total}
        </p>
      </div>

    </div>
  )}

  <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">

    <div className="flex items-center gap-2">
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-foreground font-medium text-xs">
        {article.author.initials}
      </span>

      <div>
        <div className="text-foreground font-medium">
          {article.author.name}
        </div>

        <div className="text-xs">
          {article.author.role}
        </div>
      </div>
    </div>

    <span className="hidden sm:inline text-border">·</span>

    <span className="inline-flex items-center gap-1.5">
      <Calendar className="h-3.5 w-3.5" />
      {new Date(article.date).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })}
    </span>

    <span className="inline-flex items-center gap-1.5">
      <Clock className="h-3.5 w-3.5" />
      {article.readingTime} min read
    </span>

  </div>

</div>
        </div>
      </article>

      <div className="container-prose pb-24">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* TOC */}
          {sections.length > 0 && (
            <aside className="lg:col-span-3 order-2 lg:order-1">
              <div className="lg:sticky lg:top-24">
                <p className="mono text-[11px] uppercase tracking-wider text-muted-foreground">On this page</p>
                <ul className="mt-3 space-y-2 text-sm border-l border-border">
                  {sections.map(s => (
                    <li key={s.id}>
                      <a href={`#${s.id}`} className="block pl-4 -ml-px border-l border-transparent hover:border-primary text-muted-foreground hover:text-primary transition-colors">
                        {s.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          )}

          {/* Content */}
          <div className="lg:col-span-9 order-1 lg:order-2">
            <div className="prose prose-lg max-w-none dark:prose-invert">

              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h2: ({ children }) => {
                    const text = String(children);

                    return (
                      <h2 id={slugify(text)}>
                        {children}
                      </h2>
                    );
                  },
                }}
              >
                {article.content}
              </ReactMarkdown>

            </div>

            {/* Tags + share */}
            <div className="mt-12 pt-8 border-t border-border flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                {article.tags.map(t => (
                  <span key={t} className="mono text-xs px-2 py-1 rounded bg-secondary text-secondary-foreground">#{t}</span>
                ))}
              </div>
              <div className="flex items-center gap-1">
                <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(url)}`} target="_blank" rel="noreferrer" aria-label="Share on X" className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border hover:border-primary/40 hover:text-primary transition-colors">
                  <Twitter className="h-4 w-4" />
                </a>
                <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`} target="_blank" rel="noreferrer" aria-label="Share on LinkedIn" className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border hover:border-primary/40 hover:text-primary transition-colors">
                  <Linkedin className="h-4 w-4" />
                </a>
                <button onClick={() => { navigator.clipboard.writeText(url); toast.success("Link copied"); }} aria-label="Copy link" className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border hover:border-primary/40 hover:text-primary transition-colors">
                  <Link2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Author */}
            <div className="mt-10 surface-card p-6 flex items-start gap-4">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-foreground font-semibold">
                {article.author.initials}
              </span>
              <div className="flex-1">
                <div className="font-semibold">{article.author.name}</div>
                <div className="text-sm text-muted-foreground">{article.author.role} - contributor at ObservabiliTrends</div>
                <p className="mt-2 text-sm text-muted-foreground">Writes about reliability, observability and the operational reality of running production systems at scale.</p>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-10 surface-card p-8 bg-gradient-to-br from-card to-secondary/40">
              <p className="mono text-xs uppercase tracking-wider text-primary">/ keep reading</p>
              <h3 className="mt-2 text-2xl font-semibold tracking-tight">Want more like this in your inbox?</h3>
              <p className="mt-2 text-muted-foreground">One signal-rich email, every Thursday. No fluff.</p>
              <Button asChild className="mt-4"><Link to="/#newsletter">Subscribe to the dispatch</Link></Button>
            </div>
          </div>
        </div>

import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { PageLayout } from "@/components/site/PageLayout";
import { getArticle, getRelated } from "@/data/articles";
import { ArticleCard } from "@/components/site/ArticleCard";
import { Helmet } from "react-helmet-async";
import { Clock, Calendar, ArrowLeft, Twitter, Linkedin, Link2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import NotFound from "./NotFound";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function ArticlePage() {
  const { slug = "" } = useParams();
  const article = getArticle(slug);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const total = h.scrollHeight - h.clientHeight;
      setProgress(total > 0 ? Math.min(100, (h.scrollTop / total) * 100) : 0);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const sections = useMemo(() => {
    if (!article) return [];

    return article.content
      .split("\n")
      .filter(line => /^#{1,2} /.test(line))
      .map(line => {
        const text = line.replace(/^#{1,2} /, "").trim();

        return {
          text,
          id: slugify(text),
        };
      })
      .filter(section => section.text !== article.title);
  }, [article]);

  if (!article) return <NotFound />;

  const related = getRelated(article.slug, 3);
  const url = typeof window !== "undefined" ? window.location.href : "";

  return (
    <PageLayout>
      <Helmet>
        <title>{article.title} - ObservabiliTrends</title>
        <meta name="description" content={article.excerpt} />
        <link rel="canonical" href={`/articles/${article.slug}`} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.excerpt} />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: article.title,
            description: article.excerpt,
            author: {
              "@type": "Person",
              name: article.author.name,
            },
            datePublished: article.date,
            articleSection: article.category,
            keywords: article.tags.join(", "),
          })}
        </script>
      </Helmet>

      {/* Reading progress */}
      <div className="fixed top-0 left-0 right-0 z-50 h-0.5 bg-transparent">
        <div
          className="h-full bg-primary transition-[width] duration-150"
          style={{ width: `${progress}%` }}
        />
      </div>

      <article className="container-prose pt-12 md:pt-16 pb-12">
        <Link
          to="/articles"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          All articles
        </Link>

        <div className="mt-8 max-w-6xl">
          <span className="mono text-xs uppercase tracking-wider px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
            {article.category}
          </span>

          <h1 className="mt-5 max-w-none text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tighter leading-[1.05] text-balance">
            {article.title}
          </h1>

          <p className="mt-5 max-w-4xl text-lg text-muted-foreground leading-relaxed">
            {article.excerpt}
          </p>

          <div className="mt-8 border-y border-border py-4">
            {article.series && (
              <div className="mb-4">
                <p className="mono text-[11px] uppercase tracking-[0.18em] text-primary">
                  Editorial Series
                </p>

                <div className="mt-1">
                  <p className="font-medium text-foreground">
                    {article.series.name}
                  </p>

                  <p className="text-sm text-muted-foreground">
                    Part {article.series.part} of {article.series.total}
                  </p>
                </div>
              </div>
            )}

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-foreground font-semibold text-sm">
                  {article.author.initials}
                </span>

                <div>
                  <div className="font-semibold text-foreground">
                    {article.author.name}
                  </div>

                  <div className="text-xs text-muted-foreground">
                    {article.author.role}
                    {article.author.company && (
                      <> · {article.author.company}</>
                    )}
                  </div>
                </div>
              </div>

              <span className="hidden sm:inline text-border">·</span>

              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                {new Date(article.date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>

              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                {article.readingTime} min read
              </span>
            </div>
          </div>
        </div>
      </article>

      <div className="container-prose pb-24">
        <div className="grid lg:grid-cols-12 gap-12">

          {/* TOC */}
          {sections.length > 0 && (
            <aside className="lg:col-span-3 order-2 lg:order-1">
              <div className="lg:sticky lg:top-24">
                <p className="mono text-[11px] uppercase tracking-wider text-muted-foreground">
                  On this page
                </p>

                <ul className="mt-3 space-y-2 text-sm border-l border-border">
                  {sections.map(section => (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        className="block pl-4 -ml-px border-l border-transparent hover:border-primary text-muted-foreground hover:text-primary transition-colors"
                      >
                        {section.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          )}

          {/* Content */}
          <div className="lg:col-span-9 order-1 lg:order-2">
            <div className="prose prose-lg max-w-none dark:prose-invert">

              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({ children }) => {
                    const text = String(children);

                    return (
                      <h1 id={slugify(text)}>
                        {children}
                      </h1>
                    );
                  },

                  h2: ({ children }) => {
                    const text = String(children);

                    return (
                      <h2 id={slugify(text)}>
                        {children}
                      </h2>
                    );
                  },
                }}
              >
                {article.content}
              </ReactMarkdown>

            </div>

            {/* Tags + share */}
            <div className="mt-12 pt-8 border-t border-border flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                {article.tags.map(tag => (
                  <span
                    key={tag}
                    className="mono text-xs px-2 py-1 rounded bg-secondary text-secondary-foreground"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-1">
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                    article.title
                  )}&url=${encodeURIComponent(url)}`}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Share on X"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border hover:border-primary/40 hover:text-primary transition-colors"
                >
                  <Twitter className="h-4 w-4" />
                </a>

                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                    url
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Share on LinkedIn"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border hover:border-primary/40 hover:text-primary transition-colors"
                >
                  <Linkedin className="h-4 w-4" />
                </a>

                <button
                  onClick={() => {
                    navigator.clipboard.writeText(url);
                    toast.success("Link copied");
                  }}
                  aria-label="Copy link"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border hover:border-primary/40 hover:text-primary transition-colors"
                >
                  <Link2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Author */}
            <div className="mt-10 surface-card p-6 flex items-start gap-4">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-foreground font-semibold">
                {article.author.initials}
              </span>

              <div className="flex-1">
                <div className="font-semibold">
                  {article.author.name}
                </div>

                <div className="text-sm text-muted-foreground">
                  {article.author.role}
                  {article.author.company && (
                    <> · {article.author.company}</>
                  )}
                </div>

                {article.author.bio && (
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    {article.author.bio}
                  </p>
                )}

                {article.author.linkedin && (
                  <a
                    href={article.author.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex text-sm font-medium text-primary hover:underline"
                  >
                    Connect on LinkedIn →
                  </a>
                )}
              </div>
            </div>

            {/* CTA */}
            <div className="mt-10 surface-card p-8 bg-gradient-to-br from-card to-secondary/40">
              <p className="mono text-xs uppercase tracking-wider text-primary">
                / keep reading
              </p>

              <h3 className="mt-2 text-2xl font-semibold tracking-tight">
                Want more like this in your inbox?
              </h3>

              <p className="mt-2 text-muted-foreground">
                One signal-rich email, every Thursday. No fluff.
              </p>

              <Button asChild className="mt-4">
                <Link to="/#newsletter">
                  Subscribe to the dispatch
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <section className="mt-24">
            <h2 className="text-2xl font-semibold tracking-tight">
              Related reads
            </h2>

            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {related.map(article => (
                <ArticleCard
                  key={article.slug}
                  article={article}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </PageLayout>
  );
}
