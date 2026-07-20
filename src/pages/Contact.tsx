import { useState } from "react";
import { z } from "zod";
import { PageLayout } from "@/components/site/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { analytics } from "@/lib/analytics";
import { NewsletterPanel } from "@/components/site/Newsletter";
import { Mail, Briefcase, MessageSquare } from "lucide-react";
import emailjs from "@emailjs/browser";

const schema = z.object({
  name: z.string().trim().min(1, "Required").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  topic: z.enum(["advisory", "editorial", "press", "other"]),
  message: z.string().trim().min(10, "Tell us a bit more (10+ chars)").max(2000),
});

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", company: "", topic: "advisory" as const, message: "" });

  async function onSubmit(e: React.FormEvent) {
  e.preventDefault();

  const parsed = schema.safeParse(form);

  if (!parsed.success) {
    toast.error(parsed.error.issues[0].message);
    return;
  }

  setLoading(true);

  try {
    await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      {
        name: parsed.data.name,
        email: parsed.data.email,
        company: parsed.data.company || "-",
        topic: parsed.data.topic,
        message: parsed.data.message,
      },
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    );

    analytics.track("contact_submit", {
      topic: parsed.data.topic,
    });

    toast.success(
      "Message sent successfully. We'll get back to you as soon as possible."
    );

    setForm({
      name: "",
      email: "",
      company: "",
      topic: "advisory",
      message: "",
    });
  } catch (error) {
    console.error(error);

    toast.error(
      "The message couldn't be sent. Please try again in a few minutes."
    );
  } finally {
    setLoading(false);
  }
}

  return (
    <PageLayout title="Contact - ObservabiliTrends" description="Get in touch about advisory work, editorial pitches or partnerships." canonical="/contact">
      <section className="container-prose pt-20 pb-10">
        <p className="mono text-xs uppercase tracking-wider text-primary">/ contact</p>
        <h1 className="mt-2 text-5xl md:text-6xl font-semibold tracking-tighter max-w-3xl leading-[1.05]">
          Let's start a conversation.
        </h1>
        <p className="mt-6 text-lg text-muted-foreground max-w-2xl leading-relaxed">
          Whether you want to work with us, pitch a story or just say hello, we read every message.
        </p>
      </section>

      <section className="container-prose py-10 grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-4 space-y-4">
          {[
            { Icon: Briefcase, title: "Advisory & consulting", body: "Architectural reviews, SLO programs, cost optimization." },
            { Icon: MessageSquare, title: "Editorial pitches", body: "Postmortems, deep-dives, contrarian takes - pitch us." },
            { Icon: Mail, title: "Press & partnerships", body: "We're selective. We're also responsive." },
          ].map(({ Icon, title, body }) => (
            <div key={title} className="surface-card p-5">
              <Icon className="h-5 w-5 text-primary" />
              <h3 className="mt-3 font-semibold">{title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>

        <form onSubmit={onSubmit} className="lg:col-span-8 surface-card p-8 space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required maxLength={100} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required maxLength={255} />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="company">Company <span className="text-muted-foreground">(optional)</span></Label>
              <Input id="company" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} maxLength={120} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="topic">Topic</Label>
              <select
                id="topic"
                value={form.topic}
                onChange={e => setForm({ ...form, topic: e.target.value as any })}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="advisory">Advisory / consulting</option>
                <option value="editorial">Editorial pitch</option>
                <option value="press">Press / partnership</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" rows={6} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} required maxLength={2000} placeholder="Tell us what you're working on…" />
          </div>
          <Button type="submit" disabled={loading} size="lg" className="w-full sm:w-auto">
            {loading ? "Sending…" : "Send message"}
          </Button>
        </form>
      </section>

      <section className="container-prose py-16 pb-24">
        <NewsletterPanel />
      </section>
    </PageLayout>
  );
}
