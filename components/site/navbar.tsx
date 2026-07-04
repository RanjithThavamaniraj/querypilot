"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/site/logo";

const navigation = [
  { label: "Learning", href: "#learning-paths" },
  { label: "Labs", href: "#features" },
  { label: "AI", href: "#ai" },
  { label: "Tools", href: "#tools" },
  { label: "Docs", href: "#" },
  { label: "Pricing", href: "#" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled || menuOpen
          ? "border-b border-border bg-background/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6 lg:px-8"
      >
        <Link href="/" aria-label="QueryPilot home" className="shrink-0">
          <Logo />
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navigation.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="rounded-full px-3 py-2 text-sm text-foreground/65 transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="#"
            className="text-sm text-foreground/65 transition-colors hover:text-foreground"
          >
            Sign In
          </Link>
          <Button
            render={<Link href="#" />}
            nativeButton={false}
            className="rounded-full px-4"
          >
            Get Started
          </Button>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="rounded-full md:hidden"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X /> : <Menu />}
        </Button>
      </nav>

      {menuOpen && (
        <div className="border-t border-border bg-background px-6 pt-2 pb-6 md:hidden">
          <div className="flex flex-col">
            {navigation.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="border-b border-border py-3 text-sm text-foreground/75 transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="mt-5 flex flex-col gap-2">
            <Button
              variant="outline"
              size="lg"
              render={<Link href="#" />}
              nativeButton={false}
              className="rounded-full"
            >
              Sign In
            </Button>
            <Button
              size="lg"
              render={<Link href="#" />}
              nativeButton={false}
              className="rounded-full"
            >
              Get Started
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
