import { createFileRoute } from "@tanstack/react-router";
import { FeesPage } from "@/components/classity-pages";
import { requireRole } from "@/lib/route-guards";

export const Route = createFileRoute("/fees")({
  beforeLoad: requireRole(["admin", "accountant"]),
  head: () => ({ meta: [{ title: "Fee Collection — Classity" }, { name: "description", content: "Review dues, collect payments, and follow up with parents." }, { property: "og:title", content: "Fee Collection — Classity" }, { property: "og:description", content: "A focused workspace for daily fee collection." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: FeesPage,
});
