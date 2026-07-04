import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { HeroDashboard } from "@/components/site/hero-dashboard";
import { Reveal } from "@/components/site/reveal";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-36 pb-20 sm:pt-44 sm:pb-28">
      {/* soft celadon wash behind the product panel */}
      <div className="absolute top-16 right-[-10%] -z-10 h-[34rem] w-[34rem] rounded-full bg-celadon/50 blur-[120px]" />

      <div className="mx-auto grid w-full max-w-6xl items-center gap-16 px-6 lg:grid-cols-[1fr_1.1fr] lg:gap-12 lg:px-8">
        <Reveal>
          <div className="flex flex-col items-start">
            <p className="eyebrow text-foreground/55">
              <span className="text-ember">New</span> · AI Query Analyzer 2.0
            </p>

            <h1 className="mt-6 font-heading text-5xl leading-[1.04] tracking-tight text-balance sm:text-6xl lg:text-[4.1rem]">
              Master PostgreSQL.
              <br />
              <em className="text-ember">Build with confidence.</em>
            </h1>

            <p className="mt-7 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Learn PostgreSQL through interactive learning paths, hands-on labs, AI-powered
              guidance, and professional DBA tools—all in one platform.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-7">
              <Button
                render={<Link href="#learning-paths" />}
                nativeButton={false}
                className="h-12 rounded-full px-7 text-sm"
              >
                Start Learning
                <ArrowRight data-icon="inline-end" />
              </Button>
              <Link
                href="#features"
                className="group text-sm font-medium text-foreground underline decoration-ember/40 underline-offset-8 transition-colors hover:decoration-ember"
              >
                Explore Labs
                <ArrowRight className="ml-1.5 inline size-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>

            <p className="mt-7 text-xs text-foreground/45">
              Free to start · No credit card required · Postgres 14–18 covered
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.15} className="relative min-w-0">
          <HeroDashboard />
        </Reveal>
      </div>
    </section>
  );
}
