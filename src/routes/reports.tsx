import { createFileRoute } from "@tanstack/react-router";
import { ReportsPage } from "@/components/classity-pages";
import { requireRole } from "@/lib/route-guards";

export const Route = createFileRoute("/reports")({
  beforeLoad: requireRole(["admin", "accountant"]),
  head: () => ({
    meta: [
      { title: "Reports — Classity" },
      { name: "description", content: "Collection, overdue, attendance, and batch health reports with Excel export." },
      { property: "og:title", content: "Reports — Classity" },
      { property: "og:description", content: "Understand centre collection and growth trends." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ReportsPage,
});
