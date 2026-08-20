import type { Metadata } from "next";

import { GuestBootstrap } from "@/components/learn/guest-bootstrap";
import { LearnShell } from "@/components/learn/learn-shell";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Learn — QueryPilot",
  description:
    "Learn PostgreSQL from absolute beginner foundations through expert architecture.",
};

export default function LearnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LearnShell>
      <GuestBootstrap />
      {children}
    </LearnShell>
  );
}
