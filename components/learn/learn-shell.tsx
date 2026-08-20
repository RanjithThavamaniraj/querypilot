import Link from "next/link";

import { Logo } from "@/components/site/logo";
import { cn } from "@/lib/utils";

export function LearnShell({
  children,
  current = "learn",
}: {
  children: React.ReactNode;
  current?: "learn";
}) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-paper/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 py-4 lg:px-8">
          <Link href="/learn" aria-label="QueryPilot Learn home">
            <Logo />
          </Link>
          <nav className="flex items-center gap-5 text-sm">
            <Link
              href="/learn"
              className={cn(
                "font-medium transition-colors",
                current === "learn"
                  ? "text-ember"
                  : "text-foreground/70 hover:text-ember"
              )}
            >
              Learn
            </Link>
            <Link
              href="/"
              className="text-foreground/70 transition-colors hover:text-ember"
            >
              Home
            </Link>
          </nav>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
