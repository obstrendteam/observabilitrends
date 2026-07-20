import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { PageLayout } from "@/components/site/PageLayout";
import { getResource } from "@/data/engineeringResources";
import NotFound from "./NotFound";

export default function ResourcePage() {
  const { slug = "" } = useParams();

  const resource = getResource(slug);

  if (!resource) {
    return <NotFound />;
  }

  const content = useMemo(() => {
    return renderContent(resource.content);
  }, [resource]);

  return (
  <PageLayout
    title={`${resource.title} - ObservabiliTrends`}
    description={resource.description}
    canonical={`/resources/${resource.slug}`}
  >
    <article className="container-prose pt-16 pb-24">

      <p className="mono text-xs uppercase tracking-wider text-primary">
        / engineering resource
      </p>

      <div className="mt-6">

        <span className="mono text-[11px] uppercase tracking-wider px-2 py-1 rounded bg-primary/10 text-primary border border-primary/20">
          {resource.category}
        </span>

        <h1 className="mt-5 text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tighter leading-tight">
          {resource.title}
        </h1>

        <p className="mt-5 text-xl leading-relaxed text-muted-foreground">
          {resource.subtitle}
        </p>

      </div>

      <div className="mt-10 border-y border-border py-5">

        <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted-foreground">

          <span>
            <strong className="text-foreground">Version</strong>{" "}
            {resource.version}
          </span>

          <span>
            <strong className="text-foreground">Updated</strong>{" "}
            {resource.updated}
          </span>

          <span>
            <strong className="text-foreground">Estimated time</strong>{" "}
            {resource.estimatedTime}
          </span>

        </div>

        <div className="mt-5 flex flex-wrap gap-2">

          {resource.tags.map(tag => (

            <span
              key={tag}
              className="mono text-xs px-2 py-1 rounded bg-secondary text-secondary-foreground"
            >
              #{tag}
            </span>

          ))}

        </div>

      </div>

      <div className="mt-16 grid lg:grid-cols-12 gap-14">

        <aside className="hidden lg:block lg:col-span-3">

          <div className="sticky top-24">

            <p className="mono text-[11px] uppercase tracking-wider text-muted-foreground">
              On this page
            </p>

            <ul className="mt-4 space-y-2 border-l border-border">

              {resource.content
                .split("\n")
                .filter(line => line.startsWith("## "))
                .map(section => {

                  const title = section.replace("## ", "");

                  const id = title
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, "-");

                  return (

                    <li key={id}>

                      <a
                        href={`#${id}`}
                        className="block pl-4 -ml-px border-l border-transparent hover:border-primary text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        {title}
                      </a>

                    </li>

                  );

                })}

            </ul>

          </div>

        </aside>

        <section className="lg:col-span-9">

          <div className="prose prose-lg dark:prose-invert max-w-none">

            {content}

          </div>

        </section>

      </div>

    </article>
  </PageLayout>
);
}

function renderContent(markdown: string) {

  const lines = markdown.split("\n");

  const output: JSX.Element[] = [];

  let list: string[] = [];

  const flushList = () => {

    if (!list.length) return;

    output.push(
      <ul
        key={`list-${output.length}`}
        className="list-disc pl-6 space-y-2 text-muted-foreground"
      >
        {list.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    );

    list = [];
  };

  lines.forEach((raw, index) => {

    const line = raw.trim();

    if (!line) {
      flushList();
      return;
    }

    if (line === "---") {
      flushList();

      output.push(
        <hr
          key={index}
          className="my-10 border-border"
        />
      );

      return;
    }

    if (line.startsWith("# ")) {

      flushList();

      output.push(
        <h2
          key={index}
          className="text-3xl font-semibold tracking-tight mt-12"
        >
          {line.replace("# ", "")}
        </h2>
      );

      return;
    }

    if (line.startsWith("## ")) {

  flushList();

  const title = line.replace("## ", "");

  const id = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-");

  output.push(
    <h3
      id={id}
      key={index}
      className="scroll-mt-24 text-2xl font-semibold tracking-tight mt-12"
    >
      {title}
    </h3>
  );

  return;
}

    if (line.startsWith("### ")) {

      flushList();

      output.push(
        <h4
          key={index}
          className="text-lg font-semibold mt-8"
        >
          {line.replace("### ", "")}
        </h4>
      );

      return;
    }

    if (line.startsWith("- ")) {

      list.push(line.substring(2));

      return;
    }

    if (line.startsWith("|")) {

      flushList();

      output.push(
        <pre
          key={index}
          className="overflow-x-auto rounded-lg border border-border bg-secondary/40 p-4 text-sm"
        >
          {line}
        </pre>
      );

      return;
    }

    output.push(
      <p
        key={index}
        className="leading-8 text-muted-foreground"
      >
        {line}
      </p>
    );
  });

  flushList();

  return output;
}
