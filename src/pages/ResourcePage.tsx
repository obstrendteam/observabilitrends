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
      title={`${resource.title} — ObservabiliTrends`}
      description={resource.description}
      canonical={`/resources/${resource.slug}`}
    >
      <article className="container-prose py-20">

        <p className="mono text-xs uppercase tracking-wider text-primary">
          / engineering resource
        </p>

        <h1 className="mt-3 text-4xl md:text-5xl font-semibold tracking-tighter">
          {resource.title}
        </h1>

        <p className="mt-5 text-xl text-muted-foreground">
          {resource.subtitle}
        </p>

        <div className="mt-8 flex flex-wrap gap-3 text-sm text-muted-foreground">
          <span>Version {resource.version}</span>
          <span>•</span>
          <span>Updated {resource.updated}</span>
          <span>•</span>
          <span>{resource.estimatedTime}</span>
        </div>

        <div className="mt-14 space-y-6">
          {content}
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

      output.push(
        <h3
          key={index}
          className="text-2xl font-semibold tracking-tight mt-10"
        >
          {line.replace("## ", "")}
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
