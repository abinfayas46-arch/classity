import { createFileRoute, redirect } from "@tanstack/react-router";

/** Subscription sidebar entry was replaced by Notifications. Keep route for old links. */
export const Route = createFileRoute("/subscription")({
  beforeLoad: () => {
    throw redirect({ to: "/notifications" });
  },
  component: () => null,
});
