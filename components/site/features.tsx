import { Reveal } from "@/components/site/reveal";
import { Section, SectionHeader } from "@/components/site/section";

const features = [
  {
    number: "i",
    title: "Real Postgres, not simplified examples",
    description:
      "Every lesson and lab runs against genuine PostgreSQL behavior, so what you learn holds up in production.",
  },
  {
    number: "ii",
    title: "Depth over checklists",
    description:
      "We explain the reasoning behind a query plan, index choice, or config value—not just the syntax to copy.",
  },
  {
    number: "iii",
    title: "One continuous path",
    description:
      "Learning, practice, and real operations build on each other instead of living in separate, disconnected tools.",
  },
];

export function Features() {
  return (
    <Section id="features">
      <SectionHeader
        number="01"
        eyebrow="Why QueryPilot"
        title={
          <>
            Depth, <em className="text-ember">not shortcuts</em>.
          </>
        }
        description="QueryPilot is built around how PostgreSQL actually behaves in production, not simplified examples that fall apart under real workloads."
      />
      <div className="grid gap-12 md:grid-cols-3 md:gap-0 md:divide-x md:divide-border">
        {features.map((feature, i) => (
          <Reveal key={feature.title} delay={i * 0.1}>
            <article className="group h-full md:px-10 md:first:pl-0 md:last:pr-0">
              <p className="font-heading text-4xl text-foreground/20 italic transition-colors duration-300 group-hover:text-ember">
                {feature.number}
              </p>
              <h3 className="mt-6 font-heading text-2xl tracking-tight">{feature.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
