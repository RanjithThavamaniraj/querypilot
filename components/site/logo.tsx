import { cn } from "@/lib/utils";

export function Logo({
  className,
  tone = "light",
}: {
  className?: string;
  tone?: "light" | "dark";
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span
        className={cn(
          "relative flex size-8 items-center justify-center rounded-full",
          tone === "dark" ? "bg-honeydew" : "bg-plum"
        )}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke={tone === "dark" ? "#713e5a" : "#ebf5df"}
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-4"
          aria-hidden="true"
        >
          <ellipse cx="11" cy="6" rx="7" ry="3" />
          <path d="M4 6v6c0 1.66 3.13 3 7 3" />
          <path d="M4 12v6c0 1.66 3.13 3 7 3" />
          <path d="M18 6v4" />
          <path d="M21.5 13.5 14 21" />
          <path d="m17 12 4.5 1.5L20 18" />
        </svg>
      </span>
      <span
        className={cn(
          "font-heading text-lg font-semibold tracking-tight",
          tone === "dark" ? "text-honeydew" : "text-foreground"
        )}
      >
        QueryPilot
      </span>
    </span>
  );
}
