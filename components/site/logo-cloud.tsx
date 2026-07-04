import { Reveal } from "@/components/site/reveal";

export function LogoCloud() {
  return (
    <section className="border-y border-border py-12">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <p className="eyebrow text-center text-foreground/50">
            Built for developers, DBAs &amp; data engineers
          </p>
        </Reveal>
      </div>
    </section>
  );
}
