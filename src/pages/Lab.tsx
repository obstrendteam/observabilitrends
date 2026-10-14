import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { PageLayout } from "@/components/site/PageLayout";
import labContent from "@/data/lab/lab.md?raw";

export default function Lab() {
  return (
    <PageLayout
      title="Observability Lab | ObservabiliTrends"
      description="Explore the ObservabiliTrends Lab: a Docker-based environment for investigating infrastructure and container metrics, testing PromQL queries, and developing practical Grafana resources."
      canonical="/lab"
    >
      <main className="container-prose py-12 md:py-16">
        <header className="mb-10 max-w-3xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-primary">
            Observability Lab
          </p>

          <h1 className="mb-5 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            ObservabiliTrends Lab
          </h1>

          <p className="text-lg leading-relaxed text-muted-foreground">
            A practical environment for exploring observability, validating
            PromQL queries, and developing Grafana dashboards using a
            containerized application workload.
          </p>
        </header>

        <article className="lab-content max-w-4xl">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h2: ({ children }) => (
                <h2 className="mb-4 mt-12 text-2xl font-semibold tracking-tight text-foreground">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="mb-3 mt-8 text-xl font-semibold text-foreground">
                  {children}
                </h3>
              ),
              p: ({ children }) => (
                <p className="mb-5 leading-7 text-muted-foreground">
                  {children}
                </p>
              ),
              ul: ({ children }) => (
                <ul className="mb-6 list-disc space-y-2 pl-6 text-muted-foreground">
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol className="mb-6 list-decimal space-y-2 pl-6 text-muted-foreground">
                  {children}
                </ol>
              ),
              li: ({ children }) => <li className="pl-1">{children}</li>,
              a: ({ href, children }) => (
                <a
                  href={href}
                  className="font-medium text-primary underline underline-offset-4 hover:opacity-80"
                  target={href?.startsWith("http") ? "_blank" : undefined}
                  rel={href?.startsWith("http") ? "noreferrer" : undefined}
                >
                  {children}
                </a>
              ),
              img: ({ src, alt }) => (
                <img
                  src={src}
                  alt={alt ?? ""}
                  loading="lazy"
                  className="my-8 h-auto w-full rounded-xl border border-border"
                />
              ),
              table: ({ children }) => (
                <div className="my-8 overflow-x-auto rounded-lg border border-border">
                  <table className="w-full border-collapse text-left text-sm">
                    {children}
                  </table>
                </div>
              ),
              thead: ({ children }) => (
                <thead className="bg-secondary text-foreground">
                  {children}
                </thead>
              ),
              th: ({ children }) => (
                <th className="border-b border-border px-4 py-3 font-semibold">
                  {children}
                </th>
              ),
              td: ({ children }) => (
                <td className="border-b border-border px-4 py-3 align-top text-muted-foreground">
                  {children}
                </td>
              ),
              strong: ({ children }) => (
                <strong className="font-semibold text-foreground">
                  {children}
                </strong>
              ),
              blockquote: ({ children }) => (
                <blockquote className="my-6 border-l-2 border-primary pl-4 text-muted-foreground">
                  {children}
                </blockquote>
              ),
              hr: () => <hr className="my-10 border-border" />,
              code: ({ children }) => (
                <code className="rounded bg-secondary px-1.5 py-0.5 text-sm text-foreground">
                  {children}
                </code>
              ),
            }}
          >
            {labContent}
          </ReactMarkdown>
        </article>
      </main>
    </PageLayout>
  );
}