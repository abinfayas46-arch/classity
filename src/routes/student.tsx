import { createFileRoute } from "@tanstack/react-router";
import { StudentDashboardPage } from "@/components/classity-pages";
import { requireRole } from "@/lib/route-guards";

export const Route = createFileRoute("/student")({
  beforeLoad: requireRole(["student"]),
  head: () => ({
    meta: [
      { title: "Student Dashboard — Classity" },
      { name: "description", content: "View your attendance, classes, and fee status." },
      { property: "og:title", content: "Student Dashboard — Classity" },
      { property: "og:description", content: "A calm student portal for attendance, classes, and payments." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: StudentDashboardPage,
});
