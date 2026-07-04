import { Newspaper } from "lucide-react";

import { Reveal } from "@/components/site/reveal";
import { Section, SectionHeader } from "@/components/site/section";

export function Updates() {
  return (
    <Section id="updates">
      <SectionHeader
        number="05"
        eyebrow="Latest Updates"
        title={
          <>
            Stay current with <em className="text-ember">PostgreSQL</em>
          </>
        }
        description="Releases, security advisories, community news, and platform updates—curated by our team."
      />
      <Reveal>
        <div className="flex flex-col items-center gap-4 border-t border-b border-border py-16 text-center">
          <Newspaper className="size-6 text-foreground/40" />
          <h3 className="font-heading text-xl tracking-tight">No updates yet</h3>
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
            Releases, security advisories, and community news will appear here when QueryPilot
            launches.
          </p>
        </div>
      </Reveal>
    </Section>
  );
}
