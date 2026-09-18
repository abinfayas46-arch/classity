import { createFileRoute } from "@tanstack/react-router";
import { SettingsPage } from "@/components/classity-pages";
import { requireRole } from "@/lib/route-guards";

export const Route = createFileRoute("/settings")({
  beforeLoad: requireRole(["admin", "accountant", "student"]),
  head: () => ({
    meta: [
      { title: "Settings — Classity" },
      { name: "description", content: "Manage profile, centre details, and notification preferences." },
      { property: "og:title", content: "Settings — Classity" },
      { property: "og:description", content: "Account and workspace settings for Classity." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SettingsPage,
});
