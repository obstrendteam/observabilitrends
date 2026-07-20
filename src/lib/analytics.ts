/**
 * Analytics adapter - placeholders for GA, Plausible, PostHog.
 * Wire real keys via env or runtime config when integrations are ready.
 */
export const analytics = {
  track(event: string, props?: Record<string, unknown>) {
    if (typeof window === "undefined") return;
    // window.plausible?.(event, { props })
    // window.gtag?.("event", event, props)
    // window.posthog?.capture(event, props)
    if (import.meta.env.DEV) console.debug("[analytics]", event, props);
  },
  pageview(path: string) {
    this.track("pageview", { path });
  },
};
