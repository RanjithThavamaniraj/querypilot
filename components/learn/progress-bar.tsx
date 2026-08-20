import { cn } from "@/lib/utils";

export function ProgressBar({
  value,
  label,
}: {
  value: number;
  label?: string;
}) {
  const clamped = Math.max(0, Math.min(100, value));

  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-3 text-sm">
        <span className="text-muted-foreground">{label ?? "Progress"}</span>
        <span className="font-medium text-foreground">{clamped}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-celadon/50">
        <div
          className={cn("h-full rounded-full bg-ember transition-all")}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}
