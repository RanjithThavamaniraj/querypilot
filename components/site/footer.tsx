import Link from "next/link";

import { Logo } from "@/components/site/logo";

const columns: { heading: string; links: string[] }[] = [
  {
    heading: "Product",
    links: ["Learning Paths", "Hands-on Labs", "AI Assistant", "DBA Toolkit", "Pricing"],
  },
  {
    heading: "Learning",
    links: ["Developer Path", "DBA Path", "Performance Tuning", "Security", "Certification"],
  },
  {
    heading: "Resources",
    links: ["Documentation", "Blog", "Changelog", "PostgreSQL Releases", "Status"],
  },
  {
    heading: "Community",
    links: ["Discord", "GitHub Discussions", "Events", "Contributors"],
  },
  {
    heading: "Company",
    links: ["About", "Careers", "Customers", "Contact"],
  },
  {
    heading: "Legal",
    links: ["Privacy", "Terms", "Security", "DPA"],
  },
];

const socials = [
  {
    name: "GitHub",
    path: "M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.09.68-.22.68-.49 0-.24-.01-.88-.01-1.72-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.63.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.89 1.57 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05a9.36 9.36 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.8-4.57 5.05.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.59.69.49A10.03 10.03 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z",
  },
  {
    name: "X",
    path: "M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.21-6.82-5.97 6.82H1.67l7.73-8.84L1.25 2.25h6.83l4.71 6.23 5.45-6.23Zm-1.16 17.52h1.83L7.08 4.13H5.12l11.96 15.64Z",
  },
  {
    name: "LinkedIn",
    path: "M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.26 2.37 4.26 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z",
  },
  {
    name: "Discord",
    path: "M20.32 4.37a19.8 19.8 0 0 0-4.93-1.51 13.78 13.78 0 0 0-.64 1.28 18.27 18.27 0 0 0-5.5 0 12.64 12.64 0 0 0-.64-1.28c-1.71.29-3.37.8-4.93 1.51A20.26 20.26 0 0 0 .1 18.06a19.9 19.9 0 0 0 6.07 3.03c.49-.66.93-1.37 1.3-2.1a12.9 12.9 0 0 1-2.05-.98c.17-.12.34-.25.5-.38a14.2 14.2 0 0 0 12.16 0c.17.13.33.26.5.38-.65.39-1.34.71-2.05.98.38.73.81 1.44 1.3 2.1a19.84 19.84 0 0 0 6.07-3.03 20.2 20.2 0 0 0-3.58-13.69ZM8.02 15.33c-1.18 0-2.16-1.08-2.16-2.42 0-1.33.95-2.42 2.16-2.42 1.21 0 2.18 1.09 2.16 2.42 0 1.34-.95 2.42-2.16 2.42Zm7.97 0c-1.18 0-2.15-1.08-2.15-2.42 0-1.33.95-2.42 2.15-2.42 1.21 0 2.18 1.09 2.16 2.42 0 1.34-.95 2.42-2.16 2.42Z",
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
            <div className="mt-6 flex gap-4">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href="#"
                  aria-label={social.name}
                  className="text-foreground/40 transition-colors hover:text-ember"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="size-4.5" aria-hidden="true">
                    <path d={social.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:grid-cols-6"
          >
            {columns.map((column) => (
              <div key={column.heading}>
                <h3 className="eyebrow text-foreground/50">{column.heading}</h3>
                <ul className="mt-4 space-y-2.5">
                  {column.links.map((label) => (
                    <li key={label}>
                      <a
                        href="#"
                        className="text-sm text-foreground/70 transition-colors hover:text-ember"
                      >
                        {label}
                      </a>
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
