export type AppRole = "admin" | "accountant" | "student";

export type AuthUser = {
  email: string;
  role: AppRole;
  name: string;
  initials: string;
  title: string;
};

export type DemoCredential = AuthUser & { password: string };

/** Static demo accounts — replace with API/Supabase roles later. */
export const DEMO_USERS: DemoCredential[] = [
  {
    email: "admin@classity.app",
    password: "admin123",
    role: "admin",
    name: "Rajesh Arjun",
    initials: "RA",
    title: "Admin · Kochi",
  },
  {
    email: "accountant@classity.app",
    password: "account123",
    role: "accountant",
    name: "Priya Nambiar",
    initials: "PN",
    title: "Accountant · Kochi",
  },
  {
    email: "student@classity.app",
    password: "student123",
    role: "student",
    name: "Aarav Menon",
    initials: "AM",
    title: "Student · JEE 2027",
  },
];

export const AUTH_STORAGE_KEY = "classity.auth.session";

export const roleHomePath: Record<AppRole, "/" | "/accountant" | "/student"> = {
  admin: "/",
  accountant: "/accountant",
  student: "/student",
};

/** Paths each role may open (direct URL + sidebar). */
export const roleAllowedPaths: Record<AppRole, readonly string[]> = {
  admin: [
    "/",
    "/students",
    "/attendance",
    "/calendar",
    "/fees",
    "/fee-plans",
    "/receipts",
    "/batches",
    "/reports",
    "/whatsapp",
    "/notifications",
    "/settings",
    "/auth",
  ],
  accountant: ["/accountant", "/fees", "/fee-plans", "/receipts", "/reports", "/notifications", "/settings", "/auth"],
  student: ["/student", "/attendance", "/calendar", "/batches", "/receipts", "/notifications", "/settings", "/auth"],
};

export const roleMobileNavPaths: Record<AppRole, readonly string[]> = {
  admin: ["/", "/students", "/fees", "/receipts"],
  accountant: ["/accountant", "/fees", "/receipts", "/reports"],
  student: ["/student", "/attendance", "/calendar", "/batches"],
};

export function authenticateDemo(email: string, password: string): AuthUser | null {
  const match = DEMO_USERS.find(
    (user) => user.email.toLowerCase() === email.trim().toLowerCase() && user.password === password,
  );
  if (!match) return null;
  const { password: _password, ...user } = match;
  return user;
}

export function readAuthSession(): AuthUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as AuthUser;
    if (!parsed?.email || !parsed?.role) return null;
    if (!["admin", "accountant", "student"].includes(parsed.role)) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function writeAuthSession(user: AuthUser) {
  window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
}

export function clearAuthSession() {
  window.localStorage.removeItem(AUTH_STORAGE_KEY);
}

export function canAccessPath(role: AppRole, path: string) {
  return roleAllowedPaths[role].some((allowed) => allowed === path || (allowed !== "/" && path.startsWith(`${allowed}/`)));
}

export function homePathForRole(role: AppRole) {
  return roleHomePath[role];
}
