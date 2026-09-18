import { createFileRoute } from "@tanstack/react-router";
import { FeePlansPage } from "@/components/classity-pages";
import { requireRole } from "@/lib/route-guards";

export const Route = createFileRoute("/fee-plans")({
  beforeLoad: requireRole(["admin", "accountant"]),
  head: () => ({ meta: [{ title: "Fee Plans — Classity" }, { name: "description", content: "Configure recurring monthly fee plans for every batch." }, { property: "og:title", content: "Fee Plans — Classity" }, { property: "og:description", content: "Configure recurring centre fee plans." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: FeePlansPage,
});
