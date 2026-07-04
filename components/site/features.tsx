import { Reveal } from "@/components/site/reveal";
import { Section, SectionHeader } from "@/components/site/section";

const features = [
  {
    number: "i",
    title: "Interactive Learning",
    description:
      "Structured paths take you from your first SELECT to advanced internals, with live SQL editors and instant feedback on every lesson.",
  },
  {
    number: "ii",
    title: "AI-Powered Guidance",
    description:
      "A PostgreSQL-native assistant explains concepts, reviews your queries, and suggests optimizations grounded in your actual schema.",
  },
  {
    number: "iii",
    title: "Hands-on Labs",
    description:
      "Break and fix real clusters in sandboxed environments—replication failovers, corrupted indexes, runaway vacuums, and more.",
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
            Learning, practice, and production—
            <em className="text-ember">one continuous craft</em>
          </>
        }
        description="One platform that treats learning, practice, and real operations as a single continuous experience."
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
