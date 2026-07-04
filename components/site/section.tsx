import { cn } from "@/lib/utils";

import { Reveal } from "@/components/site/reveal";

export function Section({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={cn("scroll-mt-24 py-24 sm:py-32", className)}>
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">{children}</div>
    </section>
  );
}

export function SectionHeader({
  number,
  eyebrow,
  title,
  description,
  tone = "light",
}: {
  number: string;
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <Reveal className="mb-16 sm:mb-20">
      <div
        className={cn(
          "flex items-baseline gap-4 border-t pt-5",
          dark ? "border-honeydew/20" : "border-foreground/20"
        )}
      >
        <span
          className={cn(
            "font-heading text-sm italic",
            dark ? "text-celadon" : "text-ember"
          )}
        >
          {number}
        </span>
        <span className={cn("eyebrow", dark ? "text-honeydew/60" : "text-foreground/55")}>
          {eyebrow}
        </span>
      </div>
      <div className="mt-10 grid gap-6 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
        <h2
          className={cn(
            "font-heading text-4xl leading-[1.08] tracking-tight text-balance sm:text-5xl",
            dark ? "text-honeydew" : "text-foreground"
          )}
        >
          {title}
        </h2>
        {description && (
          <p
            className={cn(
              "max-w-md self-end text-base leading-relaxed",
              dark ? "text-honeydew/70" : "text-muted-foreground"
            )}
          >
            {description}
          </p>
        )}
      </div>
    </Reveal>
  );
}
