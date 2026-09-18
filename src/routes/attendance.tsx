import { createFileRoute } from "@tanstack/react-router";
import { AttendancePage } from "@/components/classity-pages";
import { requireRole } from "@/lib/route-guards";

export const Route = createFileRoute("/attendance")({
  beforeLoad: requireRole(["admin", "student"]),
  head: () => ({
    meta: [
      { title: "Attendance — Classity" },
      { name: "description", content: "Mark and review daily student attendance by batch, date, and status." },
      { property: "og:title", content: "Attendance — Classity" },
      { property: "og:description", content: "Track check-ins, absences, and leave across every batch." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AttendancePage,
});
