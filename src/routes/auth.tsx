import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { CheckCircle2, LockKeyhole, Mail, Sparkles } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ClassityLogo } from "@/components/classity-shell";
import { useAuth } from "@/contexts/auth-context";
import { DEMO_USERS, homePathForRole } from "@/lib/auth";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in — Classity" },
      { name: "description", content: "Sign in to manage your coaching centre's fee operations." },
      { property: "og:title", content: "Sign in — Classity" },
      { property: "og:description", content: "Sign in to manage your coaching centre's fee operations." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const { user, ready, signIn, signOut } = useAuth();
  const [mode, setMode] = useState<"sign-in" | "sign-up">("sign-in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setBusy(true);
    setError("");
    setNotice("");

    if (mode === "sign-up") {
      setBusy(false);
      setNotice("Demo mode uses the role accounts below. Pick Admin, Accountant, or Student to explore.");
      return;
    }

    const result = signIn(email, password);
    setBusy(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    await navigate({ to: homePathForRole(result.user.role) });
  };

  const fillDemo = (demoEmail: string, demoPassword: string) => {
    setMode("sign-in");
    setEmail(demoEmail);
    setPassword(demoPassword);
    setError("");
    setNotice("");
  };

  return (
    <div className="min-h-screen bg-background page-glow px-4 py-6 sm:px-6">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-5xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-3xl border border-border bg-card/70 shadow-2xl shadow-brand/10 md:grid-cols-[0.85fr_1.15fr]">
          <div className="hidden bg-sidebar p-10 text-sidebar-foreground md:block">
            <div className="flex items-center gap-2.5"><ClassityLogo /><span className="font-extrabold">Classity</span></div>
            <div className="mt-24 max-w-xs">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-sidebar-primary">Built for centre teams</p>
              <h1 className="mt-3 text-4xl font-extrabold leading-tight">Less chasing.<br />More teaching.</h1>
              <p className="mt-4 text-sm leading-relaxed text-sidebar-foreground/70">Admin, accountant, and student workspaces — each with the right tools for the job.</p>
              <div className="mt-8 space-y-3 text-sm text-sidebar-foreground/80">
                <p className="flex items-center gap-2"><CheckCircle2 className="size-4 text-sidebar-primary" /> Admin centre operations</p>
                <p className="flex items-center gap-2"><CheckCircle2 className="size-4 text-sidebar-primary" /> Accountant fee & reports</p>
                <p className="flex items-center gap-2"><CheckCircle2 className="size-4 text-sidebar-primary" /> Student attendance & fees</p>
              </div>
            </div>
          </div>
          <div className="p-6 sm:p-10">
            <div className="mx-auto mt-2 max-w-sm">
              <div className="flex items-center gap-2 text-brand"><ClassityLogo /><span className="font-extrabold">Classity</span></div>
              {ready && user ? (
                <div className="mt-10">
                  <h2 className="text-2xl font-extrabold tracking-tight">Signed in</h2>
                  <p className="mt-1 text-sm text-muted-foreground">You are using the {user.role} workspace.</p>
                  <div className="mt-6 rounded-xl bg-muted/60 p-4 ring-1 ring-border">
                    <div className="flex items-center gap-3">
                      <div className="grid size-10 place-items-center rounded-full bg-brand-soft text-sm font-bold text-brand">{user.initials}</div>
                      <div>
                        <p className="text-sm font-semibold">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 flex flex-col gap-2">
                    <Button variant="accent" className="w-full" onClick={() => void navigate({ to: homePathForRole(user.role) })}>Go to dashboard</Button>
                    <Button variant="outline" className="w-full" onClick={() => signOut()}>Sign out to switch role</Button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="mt-7 flex rounded-lg bg-muted p-1">
                    <Button type="button" variant={mode === "sign-in" ? "default" : "ghost"} className="flex-1" onClick={() => setMode("sign-in")}>Sign in</Button>
                    <Button type="button" variant={mode === "sign-up" ? "default" : "ghost"} className="flex-1" onClick={() => setMode("sign-up")}>Create account</Button>
                  </div>
                  <h2 className="mt-8 text-2xl font-extrabold tracking-tight">{mode === "sign-in" ? "Welcome back" : "Start your workspace"}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">{mode === "sign-in" ? "Sign in with your role account." : "Demo mode uses the role accounts listed below."}</p>
                  <form className="mt-6 space-y-4" onSubmit={submit}>
                    <label className="grid gap-1.5 text-sm font-semibold">Work email<div className="relative"><Mail className="pointer-events-none absolute left-3 top-3 size-4 text-muted-foreground" /><Input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@centre.com" className="pl-9" /></div></label>
                    <label className="grid gap-1.5 text-sm font-semibold">Password<div className="relative"><LockKeyhole className="pointer-events-none absolute left-3 top-3 size-4 text-muted-foreground" /><Input required minLength={6} type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="At least 6 characters" className="pl-9" /></div></label>
                    {error && <p role="alert" className="rounded-lg bg-bad/10 p-3 text-xs font-medium text-bad">{error}</p>}
                    {notice && <p role="status" className="rounded-lg bg-good/10 p-3 text-xs font-medium text-good">{notice}</p>}
                    <Button type="submit" variant="accent" className="w-full" disabled={busy}>{busy ? "Please wait…" : mode === "sign-in" ? "Sign in to Classity" : "Create my account"}</Button>
                  </form>
                  <div className="mt-6 rounded-xl bg-muted/60 p-3 ring-1 ring-border">
                    <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-brand">Demo accounts</p>
                    <div className="mt-2 space-y-2">
                      {DEMO_USERS.map((demo) => (
                        <button
                          key={demo.email}
                          type="button"
                          onClick={() => fillDemo(demo.email, demo.password)}
                          className="flex w-full items-center justify-between rounded-lg bg-background px-3 py-2 text-left text-xs ring-1 ring-border transition-colors hover:bg-brand-soft/40"
                        >
                          <span>
                            <span className="font-semibold capitalize text-foreground">{demo.role}</span>
                            <span className="mt-0.5 block text-muted-foreground">{demo.email}</span>
                          </span>
                          <span className="font-mono text-muted-foreground">{demo.password}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="mt-6 flex items-center gap-2 text-[11px] text-muted-foreground"><Sparkles className="size-3.5 text-brand" /> Role-based access is ready to swap for API auth later.</div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
