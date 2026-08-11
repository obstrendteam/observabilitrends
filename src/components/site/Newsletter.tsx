import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { analytics } from "@/lib/analytics";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const schema = z.object({
  email: z.string().trim().email("Enter a valid email").max(255),
});

export function NewsletterInline({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = schema.safeParse({ email });
    if (!parsed.success) { toast.error(parsed.error.issues[0].message); return; }
    setLoading(true);
    // TODO: wire to ConvertKit / Buttondown / Beehiiv / custom endpoint
    await new Promise(r => setTimeout(r, 600));
    analytics.track("newsletter_subscribe", { email: parsed.data.email });
    setLoading(false);
    setDone(true);
    setEmail("");
    toast.success("You're on the list. Welcome aboard.");
  }

  if (done) {
    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <CheckCircle2 className="h-4 w-4 text-primary" />
        Confirmed. The next dispatch ships this week.
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex gap-2">
      <Input
        type="email" required value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="you@company.com"
        className={compact ? "h-9" : "h-11"}
        aria-label="Email address"
      />
      <Button type="submit" disabled={loading} className={compact ? "h-9" : "h-11"}>
        {loading ? "…" : <>Subscribe <ArrowRight className="ml-1 h-4 w-4" /></>}
      </Button>
    </form>
  );
}

export function NewsletterPanel() {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-border bg-surface-elevated p-8 md:p-12">
      <div className="absolute inset-0 grid-bg opacity-50 pointer-events-none" />
      <div className="relative grid gap-8 md:grid-cols-2 md:items-center">
        <div>
          <p className="mono text-xs uppercase tracking-wider text-primary">/ the dispatch</p>
          <h3 className="mt-3 text-2xl md:text-3xl font-semibold tracking-tight">
            One signal-rich email. Every Thursday.
          </h3>
          <p className="mt-3 text-muted-foreground">
            Field reports, postmortem patterns and observability best practices for better reliability.
          </p>
          <ul className="mt-4 text-sm text-muted-foreground space-y-1.5">
            <li>· 4,800+ senior engineers reading</li>
            <li>· 6-minute average read</li>
            <li>· Unsubscribe in one click</li>
          </ul>
        </div>
        <div>
          <NewsletterInline />
          <p className="mt-3 text-xs text-muted-foreground">We respect your inbox. No spam, ever.</p>
        </div>
      </div>
    </section>
  );
}
