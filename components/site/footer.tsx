import Link from "next/link";

import { Logo } from "@/components/site/logo";

const columns: {
  heading: string;
  links: { label: string; href?: string }[];
}[] = [
  {
    heading: "Product",
    links: [
      { label: "Learning", href: "/learn" },
      { label: "Foundations", href: "/learn/foundations" },
      { label: "Hands-on Labs" },
      { label: "AI Assistant" },
      { label: "DBA Toolkit" },
    ],
  },
  {
    heading: "Learning",
    links: [
      { label: "Foundations", href: "/learn/foundations" },
      { label: "Developer Path" },
      { label: "DBA Path" },
      { label: "Performance Tuning" },
      { label: "Security" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Documentation" },
      { label: "Blog" },
      { label: "Changelog" },
      { label: "PostgreSQL Releases" },
      { label: "Status" },
    ],
  },
  {
    heading: "Community",
    links: [
      { label: "Discord" },
      { label: "GitHub Discussions" },
      { label: "Events" },
      { label: "Contributors" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About" },
      { label: "Careers" },
      { label: "Customers" },
      { label: "Contact" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy" },
      { label: "Terms" },
      { label: "Security" },
      { label: "DPA" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto w-full max-w-6xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_3fr]">
          <div>
            <Link href="/" aria-label="QueryPilot home">
              <Logo />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              The modern platform for PostgreSQL professionals. Learn, practice, and operate with
              confidence.
            </p>
          </div>

          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:grid-cols-6"
          >
            {columns.map((column) => (
              <div key={column.heading}>
                <h3 className="eyebrow text-foreground/50">{column.heading}</h3>
                <ul className="mt-4 space-y-2.5">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      {link.href ? (
                        <Link
                          href={link.href}
                          className="text-sm text-foreground/70 transition-colors hover:text-ember"
                        >
                          {link.label}
                        </Link>
                      ) : (
                        <span className="text-sm text-foreground/45">{link.label}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-border pt-8 sm:flex-row sm:items-center">
          <p className="text-xs text-foreground/45">
            © {new Date().getFullYear()} QueryPilot, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
