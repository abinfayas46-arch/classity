import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import {
  authenticateDemo,
  clearAuthSession,
  readAuthSession,
  writeAuthSession,
  type AuthUser,
} from "@/lib/auth";

type AuthContextValue = {
  user: AuthUser | null;
  ready: boolean;
  signIn: (email: string, password: string) => { ok: true; user: AuthUser } | { ok: false; error: string };
  signOut: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setUser(readAuthSession());
    setReady(true);
  }, []);

  const signIn = useCallback((email: string, password: string) => {
    const matched = authenticateDemo(email, password);
    if (!matched) {
      return { ok: false as const, error: "Invalid email or password. Use a demo account listed below." };
    }
    writeAuthSession(matched);
    setUser(matched);
    return { ok: true as const, user: matched };
  }, []);

  const signOut = useCallback(() => {
    clearAuthSession();
    setUser(null);
  }, []);

  const value = useMemo(() => ({ user, ready, signIn, signOut }), [user, ready, signIn, signOut]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
