/** Decorative "metrics" sparkline - pure CSS/SVG, no data fetching. */
export function MetricSparkline({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 80" className={className} fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="spark-grad" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
          <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d="M0,60 L40,55 L70,58 L100,40 L140,45 L170,30 L200,38 L240,20 L280,28 L320,15 L360,22 L400,10 L400,80 L0,80 Z"
            fill="url(#spark-grad)" />
      <path d="M0,60 L40,55 L70,58 L100,40 L140,45 L170,30 L200,38 L240,20 L280,28 L320,15 L360,22 L400,10"
            stroke="hsl(var(--primary))" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function StatusPill({ label, status = "ok" }: { label: string; status?: "ok" | "warn" | "down" }) {
  const color = status === "ok" ? "bg-emerald-500" : status === "warn" ? "bg-amber-500" : "bg-red-500";
  return (
    <span className="inline-flex items-center gap-1.5 mono text-[11px] text-muted-foreground">
      <span className={`relative inline-flex h-1.5 w-1.5 rounded-full ${color}`}>
        <span className={`absolute inset-0 rounded-full ${color} opacity-60 animate-pulse-dot`} />
      </span>
      {label}
    </span>
  );
}
