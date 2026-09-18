import { createFileRoute } from "@tanstack/react-router";
import { SimplePage } from "@/components/classity-pages";
import { requireRole } from "@/lib/route-guards";

export const Route = createFileRoute("/whatsapp")({
  beforeLoad: requireRole(["admin"]),
  head: () => ({ meta: [{ title: "WhatsApp Reminders — Classity" }, { name: "description", content: "Prepare and track parent payment reminders." }, { property: "og:title", content: "WhatsApp Reminders — Classity" }, { property: "og:description", content: "Prepare and track parent payment reminders." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: () => <SimplePage kind="whatsapp" />,
});
