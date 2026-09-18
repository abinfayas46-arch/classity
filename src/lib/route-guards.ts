import { redirect } from "@tanstack/react-router";
import { canAccessPath, homePathForRole, readAuthSession, type AppRole } from "@/lib/auth";

/** Client-side route guard for demo auth (localStorage). Ready to swap for API/JWT later. */
export function requireRole(roles?: AppRole[]) {
  return ({ location }: { location: { pathname: string } }) => {
    if (typeof window === "undefined") return;
    const session = readAuthSession();
    if (!session) {
      throw redirect({ to: "/auth" });
    }
    if (roles && !roles.includes(session.role)) {
      throw redirect({ to: homePathForRole(session.role) });
    }
    if (!canAccessPath(session.role, location.pathname)) {
      throw redirect({ to: homePathForRole(session.role) });
    }
  };
}

export function requireGuest() {
  return () => {
    if (typeof window === "undefined") return;
    const session = readAuthSession();
    if (session) {
      throw redirect({ to: homePathForRole(session.role) });
    }
  };
}
