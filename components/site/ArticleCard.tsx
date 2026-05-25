import { Link } from "react-router-dom";
import { Article } from "@/data/articles";
import { Clock, ArrowUpRight } from "lucide-react";

export function ArticleCard({ article, featured = false }: { article: Article; featured?: boolean }) {
  return (
    <Link
      to={`/articles/${article.slug}`}
      className={`group relative flex flex-col surface-card overflow-hidden ${featured ? "p-8 md:p-10" : "p-6"}`}
    >
      <div className="flex items-center gap-3 text-xs">
        <span className="mono px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
          {article.category}
        </span>
        <span className="text-muted-foreground inline-flex items-center gap-1">
          <Clock className="h-3 w-3" /> {article.readingTime} min
        </span>
      </div>
      <h3 className={`mt-4 font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors ${featured ? "text-2xl md:text-3xl" : "text-lg"}`}>
        {article.title}
      </h3>
      <p className={`mt-3 text-muted-foreground ${featured ? "text-base" : "text-sm"} leading-relaxed line-clamp-3`}>
        {article.excerpt}
      </p>
      <div className="mt-6 pt-5 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-secondary text-foreground font-medium text-[10px]">
            {article.author.initials}
          </span>
          <span>{article.author.name}</span>
          <span>·</span>
          <time dateTime={article.date}>
            {new Date(article.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
          </time>
        </div>
        <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
      </div>
    </Link>
  );
}
