import { Reveal } from "@/components/site/reveal";

const companies = ["Northwind", "Vertex Labs", "Datastack", "Cloudbyte", "Kernelworks"];

export function LogoCloud() {
  return (
    <section className="border-y border-border py-12">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col items-center gap-8 lg:flex-row lg:justify-between">
            <p className="eyebrow shrink-0 text-foreground/50">
              Trusted by developers, DBAs &amp; engineering teams
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
              {companies.map((name) => (
                <span
                  key={name}
                  className="font-heading text-lg text-foreground/40 transition-colors hover:text-foreground/70"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
