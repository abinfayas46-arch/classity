import { createFileRoute } from "@tanstack/react-router";
import { BatchesPage } from "@/components/classity-pages";
import { requireRole } from "@/lib/route-guards";

export const Route = createFileRoute("/batches")({
  beforeLoad: requireRole(["admin", "student"]),
  head: () => ({ meta: [{ title: "Batches — Classity" }, { name: "description", content: "Manage coaching batches and fee health by group." }, { property: "og:title", content: "Batches — Classity" }, { property: "og:description", content: "Manage coaching batches and fee health by group." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: BatchesPage,
});
