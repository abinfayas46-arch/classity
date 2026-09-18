import { createFileRoute } from "@tanstack/react-router";
import { CalendarPage } from "@/components/classity-pages";
import { requireRole } from "@/lib/route-guards";

export const Route = createFileRoute("/calendar")({
  beforeLoad: requireRole(["admin", "student"]),
  head: () => ({
    meta: [
      { title: "Calendar — Classity" },
      { name: "description", content: "View student attendance, holidays, present and absent days on a monthly calendar." },
      { property: "og:title", content: "Calendar — Classity" },
      { property: "og:description", content: "Attendance calendar with holidays, present, absent, leave, and late days." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CalendarPage,
});
