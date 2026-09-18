import { createFileRoute } from "@tanstack/react-router";
import { NotificationsPage } from "@/components/classity-pages";
import { requireRole } from "@/lib/route-guards";

export const Route = createFileRoute("/notifications")({
  beforeLoad: requireRole(["admin", "accountant", "student"]),
  head: () => ({
    meta: [
      { title: "Notifications — Classity" },
      { name: "description", content: "Role-based alerts for fees, attendance, and centre activity." },
      { property: "og:title", content: "Notifications — Classity" },
      { property: "og:description", content: "Stay on top of the updates that matter for your role." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: NotificationsPage,
});
