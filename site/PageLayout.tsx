import { ReactNode } from "react";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { Helmet } from "react-helmet-async";

interface Props {
  children: ReactNode;
  title?: string;
  description?: string;
  canonical?: string;
}

export function PageLayout({ children, title, description, canonical }: Props) {
  return (
    <div className="min-h-screen flex flex-col">
      {(title || description || canonical) && (
        <Helmet>
          {title && <title>{title}</title>}
          {description && <meta name="description" content={description} />}
          {canonical && <link rel="canonical" href={canonical} />}
          {title && <meta property="og:title" content={title} />}
          {description && <meta property="og:description" content={description} />}
        </Helmet>
      )}
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
