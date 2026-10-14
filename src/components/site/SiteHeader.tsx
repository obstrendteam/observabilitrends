import { Link, NavLink as RRNavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, X, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";

const NAV = [
  { to: "/articles", label: "Articles" },
  { to: "/resources", label: "Resources" },
  { to: "/lab", label: "Lab" },
  { to: "/services", label: "Services" },
  { to: "/community", label: "Community" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const loc = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [loc.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all ${
        scrolled
          ? "border-b border-border bg-background/80 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="container-prose flex h-16 items-center justify-between">
        <Link to="/" className="group flex items-center gap-2">
          <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-md bg-foreground text-background">
            <Activity className="h-4 w-4" strokeWidth={2.5} />
            <span className="absolute -right-0.5 -top-0.5 h-2 w-2 animate-pulse-dot rounded-full bg-primary" />
          </span>

          <span className="font-semibold tracking-tight text-foreground">
            Observabili<span className="text-primary">Trends</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <RRNavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`
              }
            >
              {item.label}
            </RRNavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          <Button asChild size="sm" variant="default">
            <Link to="/contact">Book a consult</Link>
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? (
            <X className="h-4 w-4" />
          ) : (
            <Menu className="h-4 w-4" />
          )}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <div className="container-prose flex flex-col gap-1 py-4">
            {NAV.map((item) => (
              <RRNavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `rounded-md px-3 py-2 text-sm ${
                    isActive
                      ? "bg-secondary text-foreground"
                      : "text-muted-foreground"
                  }`
                }
              >
                {item.label}
              </RRNavLink>
            ))}

            <div className="mt-2 flex items-center justify-between border-t border-border pt-3">
              <ThemeToggle />
              <Button asChild size="sm">
                <Link to="/contact">Book a consult</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}