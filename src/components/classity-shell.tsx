import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { Bell, CalendarDays, ChartNoAxesCombined, ChevronDown, CircleHelp, ClipboardCheck, FileText, Layers3, LayoutDashboard, LogOut, Menu, MessageCircle, ReceiptIndianRupee, Search, Settings, Users, WalletCards, X } from "lucide-react";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth-context";
import { canAccessPath, homePathForRole, roleMobileNavPaths } from "@/lib/auth";
import { navItemsForRole, unreadNotificationCount } from "@/lib/classity-data";

const iconMap = {
  layout: LayoutDashboard,
  users: Users,
  attendance: ClipboardCheck,
  calendar: CalendarDays,
  wallet: WalletCards,
  receipt: ReceiptIndianRupee,
  message: MessageCircle,
  file: FileText,
  layers: Layers3,
  chart: ChartNoAxesCombined,
};

export function ClassityLogo() {
  return <div className="grid size-9 shrink-0 place-items-center rounded-xl bg-sidebar-primary text-sidebar-primary-foreground text-lg font-extrabold shadow-sm">C</div>;
}

export function AppShell({ children, title = "Dashboard", onCollect }: { children: ReactNode; title?: string; onCollect?: () => void }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, ready, signOut } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!ready) return;
    if (!user) {
      void navigate({ to: "/auth" });
      return;
    }
    if (!canAccessPath(user.role, location.pathname)) {
      void navigate({ to: homePathForRole(user.role) });
    }
  }, [ready, user, location.pathname, navigate]);

  const items = useMemo(() => (user ? navItemsForRole(user.role) : []), [user]);
  const mobilePaths = useMemo(() => new Set(user ? roleMobileNavPaths[user.role] : []), [user]);

  if (!ready || !user) {
    return (
      <div className="grid min-h-screen place-items-center bg-background text-sm text-muted-foreground">
        Loading workspace…
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 page-glow" />
      <div className="relative mx-auto flex min-h-screen max-w-[1500px] gap-5 px-3 py-3 sm:px-5 lg:px-6 lg:py-5">
        <aside className="hidden w-60 shrink-0 md:block">
          <Sidebar currentPath={location.pathname} items={items} />
        </aside>
        {mobileOpen && <div className="fixed inset-0 z-40 bg-foreground/20 md:hidden" onClick={() => setMobileOpen(false)} />}
        <div className={`fixed inset-y-0 left-0 z-50 w-[min(86vw,18rem)] p-3 transition-transform md:hidden ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}>
          <div className="h-full overflow-y-auto rounded-2xl bg-sidebar p-4 text-sidebar-foreground shadow-2xl">
            <div className="mb-4 flex items-center justify-between"><div className="flex items-center gap-2.5"><ClassityLogo /><div><div className="text-[15px] font-extrabold leading-none">Classiee</div><div className="mt-1 text-[11px] text-sidebar-foreground/60">Bright Future Academy</div></div></div><Button aria-label="Close navigation" size="icon" variant="ghost" className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground" onClick={() => setMobileOpen(false)}><X /></Button></div>
            <SidebarNav currentPath={location.pathname} items={items} onNavigate={() => setMobileOpen(false)} />
            <div className="mt-4 border-t border-sidebar-border pt-4">
              <Link to="/notifications" onClick={() => setMobileOpen(false)} className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${location.pathname === "/notifications" ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"}`}>
                <Bell className="size-4" />
                <span className="flex-1">Notifications</span>
                {unreadNotificationCount(user.role) > 0 && <span className="rounded-full bg-sidebar-primary px-1.5 py-0.5 text-[10px] font-bold text-sidebar-primary-foreground">{unreadNotificationCount(user.role)}</span>}
              </Link>
              <Link to="/settings" onClick={() => setMobileOpen(false)} className={`mt-1 flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${location.pathname === "/settings" ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"}`}>
                <Settings className="size-4" /> Settings
              </Link>
            </div>
          </div>
        </div>
        <main className="min-w-0 flex-1 pb-24 md:pb-6">
          <header className="glass-surface mb-4 flex min-h-16 flex-wrap items-center gap-3 rounded-2xl px-4 py-3 sm:px-5">
            <Button aria-label="Open navigation" size="icon" variant="ghost" className="md:hidden" onClick={() => setMobileOpen(true)}><Menu /></Button>
            <div className="min-w-0"><p className="text-xs font-medium text-muted-foreground">Bright Future Academy · Kochi</p><p className="truncate text-lg font-extrabold tracking-tight">{title}</p></div>
            <div className="ml-auto flex items-center gap-2">
              {user.role !== "student" && <div className="hidden h-9 w-48 items-center gap-2 rounded-lg bg-card/65 px-3 text-xs text-muted-foreground ring-1 ring-border lg:flex"><Search className="size-3.5" /> Search students, phone…</div>}
              <Button aria-label="Notifications" size="icon" variant="ghost" className="relative hidden sm:inline-flex" asChild>
                <Link to="/notifications">
                  <Bell />
                  {unreadNotificationCount(user.role) > 0 && (
                    <span className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-accent" />
                  )}
                </Link>
              </Button>
              <Button aria-label="Help" size="icon" variant="ghost" className="hidden sm:inline-flex"><CircleHelp /></Button>
              {onCollect && user.role !== "student" && <Button variant="accent" onClick={onCollect}>Collect fee</Button>}
              <Button size="icon" variant="ghost" aria-label="Sign out" onClick={() => { signOut(); void navigate({ to: "/auth" }); }}><span className="grid size-8 place-items-center rounded-full bg-brand-soft text-xs font-bold text-brand">{user.initials}</span></Button>
            </div>
          </header>
          {children}
        </main>
      </div>
      <nav className="fixed inset-x-3 bottom-3 z-30 grid grid-cols-5 rounded-2xl bg-sidebar p-1.5 text-sidebar-foreground shadow-2xl md:hidden">
        {items.filter((item) => mobilePaths.has(item.to)).map((item) => {
          const Icon = iconMap[item.icon as keyof typeof iconMap];
          return (
            <Link key={`${item.to}-${item.label}`} to={item.to} className={`flex min-h-12 flex-col items-center justify-center gap-0.5 rounded-xl text-[10px] font-medium ${location.pathname === item.to ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground/70"}`}>
              <Icon className="size-4" />
              <span>{item.label === "Fee Collection" ? "Collect" : item.label === "My Classes" ? "Classes" : item.label}</span>
            </Link>
          );
        })}
        <button className="flex min-h-12 flex-col items-center justify-center gap-0.5 rounded-xl text-[10px] font-medium text-sidebar-foreground/70" onClick={() => setMobileOpen(true)}><Menu className="size-4" /><span>More</span></button>
      </nav>
    </div>
  );
}

function Sidebar({ currentPath, items }: { currentPath: string; items: ReturnType<typeof navItemsForRole> }) {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const unread = user ? unreadNotificationCount(user.role) : 0;
  return (
    <div className="sticky top-5 rounded-2xl bg-sidebar p-4 text-sidebar-foreground shadow-xl shadow-brand/10">
      <div className="flex items-center gap-2.5 px-1 pb-5"><ClassityLogo /><div><div className="text-[15px] font-extrabold leading-none">Classiee</div><div className="mt-1 text-[11px] text-sidebar-foreground/60">Bright Future Academy</div></div></div>
      <SidebarNav currentPath={currentPath} items={items} />
      <div className="mt-4 border-t border-sidebar-border pt-4">
        <Link
          to="/notifications"
          className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${currentPath === "/notifications" ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm" : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"}`}
        >
          <Bell className="size-4" />
          <span className="flex-1">Notifications</span>
          {unread > 0 && (
            <span className="rounded-full bg-sidebar-primary px-1.5 py-0.5 text-[10px] font-bold text-sidebar-primary-foreground">{unread}</span>
          )}
        </Link>
        <Link
          to="/settings"
          className={`mt-1 flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${currentPath === "/settings" ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm" : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"}`}
        >
          <Settings className="size-4" /> Settings
        </Link>
        <button
          type="button"
          className="mt-1 flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          onClick={() => { signOut(); void navigate({ to: "/auth" }); }}
        >
          <LogOut className="size-4" /> Sign out
        </button>
      </div>
      <div className="mt-5 flex items-center gap-3 rounded-xl bg-sidebar-accent/70 p-2.5">
        <div className="grid size-8 shrink-0 place-items-center rounded-full bg-sidebar-primary text-xs font-bold text-sidebar-primary-foreground">{user?.initials}</div>
        <div className="min-w-0">
          <div className="truncate text-[13px] font-semibold">{user?.name}</div>
          <div className="text-[11px] text-sidebar-foreground/60">{user?.title}</div>
        </div>
        <ChevronDown className="ml-auto size-3.5 text-sidebar-foreground/50" />
      </div>
    </div>
  );
}

function SidebarNav({ currentPath, items, onNavigate }: { currentPath: string; items: ReturnType<typeof navItemsForRole>; onNavigate?: () => void }) {
  return (
    <nav className="space-y-0.5" aria-label="Primary navigation">
      {items.map((item) => {
        const Icon = iconMap[item.icon as keyof typeof iconMap];
        const active = currentPath === item.to;
        return (
          <Link key={`${item.to}-${item.label}`} to={item.to} onClick={onNavigate} className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${active ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm" : "text-sidebar-foreground/70 hover:bg-sidebar-accent/70 hover:text-sidebar-accent-foreground"}`}>
            <Icon className="size-4" />{item.label}
          </Link>
        );
      })}
    </nav>
  );
}

export function SectionHeader({ eyebrow, title, description, action }: { eyebrow?: string; title: string; description?: string; action?: ReactNode }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-3">
      <div>
        {eyebrow && <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand">{eyebrow}</p>}
        <h1 className="mt-1 text-2xl font-extrabold tracking-tight sm:text-3xl">{title}</h1>
        {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
      </div>
      {action}
    </div>
  );
}

export function Surface({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <section className={`glass-surface rounded-2xl p-4 sm:p-5 ${className}`}>{children}</section>;
}
