import { createFileRoute } from "@tanstack/react-router";
import { ReceiptsPage } from "@/components/classity-pages";
import { requireRole } from "@/lib/route-guards";

export const Route = createFileRoute("/receipts")({
  beforeLoad: requireRole(["admin", "accountant", "student"]),
  head: () => ({ meta: [{ title: "Receipts — Classity" }, { name: "description", content: "Find and share digital fee receipts." }, { property: "og:title", content: "Receipts — Classity" }, { property: "og:description", content: "Find and share digital fee receipts." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: ReceiptsPage,
});
