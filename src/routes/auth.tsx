import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2, LockKeyhole, Mail, Sparkles } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ClassityLogo } from "@/components/classity-shell";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth")({ head: () => ({ meta: [{ title: "Sign in — Classity" }, { name: "description", content: "Sign in to manage your coaching centre's fee operations." }, { property: "og:title", content: "Sign in — Classity" }, { property: "og:description", content: "Sign in to manage your coaching centre's fee operations." }] }), component: AuthPage });

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"sign-in" | "sign-up">("sign-in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const submit = async (event: React.FormEvent<HTMLFormElement>) => { event.preventDefault(); setBusy(true); setError(""); setNotice(""); const result = mode === "sign-in" ? await supabase.auth.signInWithPassword({ email, password }) : await supabase.auth.signUp({ email, password }); setBusy(false); if (result.error) { setError(result.error.message); return; } if (mode === "sign-up") { setNotice("Check your email to confirm your account, then sign in."); } else { await navigate({ to: "/" }); } };
  return (
    <div className="min-h-screen bg-background page-glow px-4 py-6 sm:px-6">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-5xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-3xl border border-border bg-card/70 shadow-2xl shadow-brand/10 md:grid-cols-[0.85fr_1.15fr]">
          <div className="hidden bg-sidebar p-10 text-sidebar-foreground md:block">
            <div className="flex items-center gap-2.5"><ClassityLogo /><span className="font-extrabold">Classity</span></div>
            <div className="mt-24 max-w-xs">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-sidebar-primary">Built for centre owners</p>
              <h1 className="mt-3 text-4xl font-extrabold leading-tight">Less chasing.<br />More teaching.</h1>
              <p className="mt-4 text-sm leading-relaxed text-sidebar-foreground/70">Collect fees, remind parents, and grow your coaching centre from one calm workspace.</p>
              <div className="mt-8 space-y-3 text-sm text-sidebar-foreground/80">
                <p className="flex items-center gap-2"><CheckCircle2 className="size-4 text-sidebar-primary" /> Recurring fee plans</p>
                <p className="flex items-center gap-2"><CheckCircle2 className="size-4 text-sidebar-primary" /> Partial payments and receipts</p>
                <p className="flex items-center gap-2"><CheckCircle2 className="size-4 text-sidebar-primary" /> Clear daily priorities</p>
              </div>
            </div>
          </div>
          <div className="p-6 sm:p-10">
            <Link to="/" className="inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground hover:text-foreground"><ArrowLeft className="size-3.5" /> Back to dashboard</Link>
            <div className="mx-auto mt-10 max-w-sm">
              <div className="flex items-center gap-2 text-brand md:hidden"><ClassityLogo /><span className="font-extrabold">Classity</span></div>
              <div className="mt-7 flex rounded-lg bg-muted p-1">
                <Button type="button" variant={mode === "sign-in" ? "default" : "ghost"} className="flex-1" onClick={() => setMode("sign-in")}>Sign in</Button>
                <Button type="button" variant={mode === "sign-up" ? "default" : "ghost"} className="flex-1" onClick={() => setMode("sign-up")}>Create account</Button>
              </div>
              <h2 className="mt-8 text-2xl font-extrabold tracking-tight">{mode === "sign-in" ? "Welcome back" : "Start your workspace"}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{mode === "sign-in" ? "Sign in to your centre account." : "Create a secure centre account in a minute."}</p>
              <form className="mt-6 space-y-4" onSubmit={submit}>
                <label className="grid gap-1.5 text-sm font-semibold">Work email<div className="relative"><Mail className="pointer-events-none absolute left-3 top-3 size-4 text-muted-foreground" /><Input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@centre.com" className="pl-9" /></div></label>
                <label className="grid gap-1.5 text-sm font-semibold">Password<div className="relative"><LockKeyhole className="pointer-events-none absolute left-3 top-3 size-4 text-muted-foreground" /><Input required minLength={6} type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="At least 6 characters" className="pl-9" /></div></label>
                {error && <p role="alert" className="rounded-lg bg-bad/10 p-3 text-xs font-medium text-bad">{error}</p>}
                {notice && <p role="status" className="rounded-lg bg-good/10 p-3 text-xs font-medium text-good">{notice}</p>}
                <Button type="submit" variant="accent" className="w-full" disabled={busy}>{busy ? "Please wait…" : mode === "sign-in" ? "Sign in to Classity" : "Create my account"}</Button>
              </form>
              <div className="mt-6 flex items-center gap-2 text-[11px] text-muted-foreground"><Sparkles className="size-3.5 text-brand" /> Your centre data stays private to your team.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}