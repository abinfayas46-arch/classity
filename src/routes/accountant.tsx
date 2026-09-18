import { createFileRoute } from "@tanstack/react-router";
import { AccountantDashboardPage } from "@/components/classity-pages";
import { requireRole } from "@/lib/route-guards";

export const Route = createFileRoute("/accountant")({
  beforeLoad: requireRole(["accountant"]),
  head: () => ({
    meta: [
      { title: "Accountant Dashboard — Classity" },
      { name: "description", content: "Track collections, outstanding fees, and receipts for your centre." },
      { property: "og:title", content: "Accountant Dashboard — Classity" },
      { property: "og:description", content: "A focused finance workspace for coaching-centre accountants." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AccountantDashboardPage,
});
