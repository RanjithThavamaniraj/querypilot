import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/reveal";

export function FinalCta() {
  return (
    <section className="bg-plum py-24 text-honeydew sm:py-32">
      <Reveal className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <p className="eyebrow text-celadon">Get started</p>
          <h2 className="mt-6 font-heading text-4xl leading-[1.08] tracking-tight text-balance sm:text-6xl">
            Be here for <em className="text-celadon">day one</em>.
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-honeydew/70 sm:text-lg">
            QueryPilot is under active development. Get early access and help shape
            the learning paths, labs, and tools as they launch.
          </p>
          <Button
            render={<Link href="#" />}
            nativeButton={false}
            className="mt-10 h-12 rounded-full px-8 text-base"
          >
            Get Early Access
            <ArrowRight data-icon="inline-end" />
          </Button>
        </div>
      </Reveal>
    </section>
  );
}
