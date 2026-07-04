import {
  Activity,
  Bot,
  ChartBar,
  CircleCheck,
  Database,
  FlaskConical,
  GraduationCap,
  LayoutDashboard,
  Search,
  Settings2,
  Sparkles,
} from "lucide-react";

const chartBars = [34, 52, 41, 66, 48, 74, 58, 82, 63, 90, 71, 96];

const recentLabs = [
  { name: "Streaming Replication", time: "2h ago" },
  { name: "Point-in-Time Recovery", time: "Yesterday" },
  { name: "Partitioning Strategies", time: "2 days ago" },
];

const activity = [
  { label: "Completed lab: Index Tuning Deep Dive", time: "09:41", color: "bg-moss" },
  { label: "AI optimized query — 4.2× faster", time: "09:12", color: "bg-ember" },
  { label: "Earned badge: Replication Pro", time: "08:56", color: "bg-gold" },
  { label: "Started path: High Availability", time: "08:30", color: "bg-plum" },
];

export function HeroDashboard() {
  return (
    <div
      aria-hidden="true"
      className="relative select-none rounded-2xl border border-foreground/10 bg-paper shadow-2xl shadow-plum/20"
    >
      {/* window chrome */}
      <div className="flex items-center gap-3 border-b border-foreground/8 px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-foreground/15" />
          <span className="size-2.5 rounded-full bg-foreground/15" />
          <span className="size-2.5 rounded-full bg-foreground/15" />
        </div>
        <div className="mx-auto flex items-center gap-1.5 rounded-md bg-foreground/5 px-3 py-1 text-[10px] text-foreground/50">
          <span className="size-1.5 rounded-full bg-moss" />
          app.querypilot.dev
        </div>
        <div className="w-10" />
      </div>

      <div className="flex">
        {/* icon rail */}
        <div className="hidden flex-col items-center gap-1 border-r border-foreground/8 px-2 py-3 sm:flex">
          {[LayoutDashboard, GraduationCap, FlaskConical, Database, Bot, Settings2].map(
            (Icon, i) => (
              <span
                key={i}
                className={
                  i === 0
                    ? "flex size-7 items-center justify-center rounded-md bg-ember/12 text-ember"
                    : "flex size-7 items-center justify-center rounded-md text-foreground/35"
                }
              >
                <Icon className="size-3.5" />
              </span>
            )
          )}
        </div>

        <div className="flex-1 space-y-3 p-3.5">
          {/* top bar */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[13px] font-medium text-foreground">Good morning, Sarah</p>
              <p className="text-[10px] text-foreground/50">
                You&apos;re 3 lessons away from finishing Performance Tuning
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="hidden items-center gap-1.5 rounded-md bg-foreground/5 px-2.5 py-1.5 text-[10px] text-foreground/45 sm:flex">
                <Search className="size-3" />
                Search
                <kbd className="rounded bg-foreground/10 px-1 text-[9px]">⌘K</kbd>
              </div>
              <span className="flex size-6.5 items-center justify-center rounded-full bg-plum text-[9px] font-semibold text-honeydew">
                SK
              </span>
            </div>
          </div>

          {/* stat tiles */}
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-xl border border-foreground/8 bg-white/50 p-3">
              <div className="flex items-center gap-1.5 text-[10px] text-foreground/50">
                <GraduationCap className="size-3 text-ember" />
                Learning progress
              </div>
              <p className="mt-1.5 text-lg font-semibold text-foreground">
                68<span className="text-xs text-foreground/40">%</span>
              </p>
              <div className="mt-2 h-1 overflow-hidden rounded-full bg-foreground/10">
                <div className="h-full w-[68%] rounded-full bg-ember" />
              </div>
              <p className="mt-1.5 text-[9px] text-moss">+12% this week</p>
            </div>

            <div className="rounded-xl border border-foreground/8 bg-white/50 p-3">
              <div className="flex items-center gap-1.5 text-[10px] text-foreground/50">
                <Database className="size-3 text-plum" />
                prod-cluster-01
              </div>
              <p className="mt-1.5 text-lg font-semibold text-foreground">
                4<span className="text-xs text-foreground/40">/4 nodes</span>
              </p>
              <div className="mt-2 flex gap-1">
                {[0, 1, 2, 3].map((i) => (
                  <span key={i} className="h-1 flex-1 rounded-full bg-moss/70" />
                ))}
              </div>
              <p className="mt-1.5 text-[9px] text-foreground/45">PostgreSQL 18.1 · healthy</p>
            </div>

            <div className="rounded-xl border border-foreground/8 bg-white/50 p-3">
              <div className="flex items-center gap-1.5 text-[10px] text-foreground/50">
                <Activity className="size-3 text-moss" />
                Query latency p95
              </div>
              <p className="mt-1.5 text-lg font-semibold text-foreground">
                12.4<span className="text-xs text-foreground/40">ms</span>
              </p>
              <svg viewBox="0 0 100 24" className="mt-2 h-5 w-full" preserveAspectRatio="none">
                <polyline
                  points="0,18 12,14 24,16 36,10 48,12 60,7 72,9 84,4 100,6"
                  fill="none"
                  stroke="#587f43"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              <p className="mt-1 text-[9px] text-moss">−31% vs last week</p>
            </div>
          </div>

          {/* chart + AI panel */}
          <div className="grid grid-cols-5 gap-3">
            <div className="col-span-3 rounded-xl border border-foreground/8 bg-white/50 p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[10px] text-foreground/50">
                  <ChartBar className="size-3 text-ember" />
                  Query performance
                </div>
                <span className="rounded bg-foreground/5 px-1.5 py-0.5 text-[9px] text-foreground/45">
                  Last 12h
                </span>
              </div>
              <div className="mt-3 flex h-20 items-end gap-1.5">
                {chartBars.map((height, i) => (
                  <div
                    key={i}
                    className={`flex-1 rounded-sm ${i === chartBars.length - 1 ? "bg-ember" : "bg-plum/55"}`}
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
              <div className="mt-2 flex justify-between text-[8px] text-foreground/35">
                <span>00:00</span>
                <span>06:00</span>
                <span>12:00</span>
              </div>
            </div>

            <div className="col-span-2 flex flex-col rounded-xl border border-celadon bg-celadon/30 p-3">
              <div className="flex items-center gap-1.5 text-[10px] font-medium text-plum">
                <Sparkles className="size-3" />
                AI Assistant
              </div>
              <div className="mt-2.5 space-y-2 text-[9px] leading-relaxed">
                <p className="rounded-lg rounded-tl-sm bg-white/60 p-2 text-foreground/70">
                  Why is my orders query slow?
                </p>
                <p className="rounded-lg rounded-tl-sm bg-white/60 p-2 text-foreground/80">
                  Sequential scan detected. Add a composite index on{" "}
                  <code className="font-mono text-ember-deep">(customer_id, created_at)</code> —
                  est. 4.2× faster.
                </p>
              </div>
              <button
                type="button"
                tabIndex={-1}
                className="mt-auto w-full rounded-md bg-ember py-1.5 text-[9px] font-medium text-primary-foreground"
              >
                Apply suggestion
              </button>
            </div>
          </div>

          {/* labs + activity */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-foreground/8 bg-white/50 p-3">
              <div className="flex items-center gap-1.5 text-[10px] text-foreground/50">
                <FlaskConical className="size-3 text-plum" />
                Recent labs
              </div>
              <ul className="mt-2 space-y-1.5">
                {recentLabs.map((lab) => (
                  <li key={lab.name} className="flex items-center gap-1.5 text-[9.5px]">
                    <CircleCheck className="size-3 shrink-0 text-moss" />
                    <span className="truncate text-foreground/75">{lab.name}</span>
                    <span className="ml-auto shrink-0 text-foreground/40">{lab.time}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-foreground/8 bg-white/50 p-3">
              <div className="flex items-center gap-1.5 text-[10px] text-foreground/50">
                <Activity className="size-3 text-gold" />
                Activity
              </div>
              <ul className="mt-2 space-y-1.5">
                {activity.map((item) => (
                  <li key={item.label} className="flex items-center gap-1.5 text-[9.5px]">
                    <span className={`size-1.5 shrink-0 rounded-full ${item.color}`} />
                    <span className="truncate text-foreground/60">{item.label}</span>
                    <span className="ml-auto shrink-0 font-mono text-foreground/40">
                      {item.time}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
