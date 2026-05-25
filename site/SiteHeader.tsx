import { Link, NavLink as RRNavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, X, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";

const NAV = [
  { to: "/articles", label: "Articles" },
  { to: "/services", label: "Services" },
  { to: "/community", label: "Community" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const loc = useLocation();

  useEffect(() => { setOpen(false); }, [loc.pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 w-full transition-all ${scrolled ? "border-b border-border bg-background/80 backdrop-blur-xl" : "bg-transparent"}`}>
      <div className="container-prose flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-md bg-foreground text-background">
            <Activity className="h-4 w-4" strokeWidth={2.5} />
            <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-primary animate-pulse-dot" />
          </span>
          <span className="font-semibold tracking-tight text-foreground">
            Observabili<span className="text-primary">Trends</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {NAV.map(item => (
            <RRNavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }`
              }
            >
              {item.label}
            </RRNavLink>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <ThemeToggle />
          <Button asChild size="sm" variant="default">
            <Link to="/contact">Book a consult</Link>
          </Button>
        </div>

        <button
          className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-md border border-border"
          aria-label="Toggle menu"
          onClick={() => setOpen(v => !v)}
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="container-prose py-4 flex flex-col gap-1">
            {NAV.map(item => (
              <RRNavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm ${isActive ? "bg-secondary text-foreground" : "text-muted-foreground"}`
                }
              >
                {item.label}
              </RRNavLink>
            ))}
            <div className="flex items-center justify-between pt-3 mt-2 border-t border-border">
              <ThemeToggle />
              <Button asChild size="sm"><Link to="/contact">Book a consult</Link></Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
