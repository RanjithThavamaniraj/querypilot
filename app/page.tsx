import { AiAssistant } from "@/components/site/ai-assistant";
import { Features } from "@/components/site/features";
import { FinalCta } from "@/components/site/final-cta";
import { Footer } from "@/components/site/footer";
import { Hero } from "@/components/site/hero";
import { LearningPaths } from "@/components/site/learning-paths";
import { LogoCloud } from "@/components/site/logo-cloud";
import { ProductOverview } from "@/components/site/product-overview";
import { Toolkit } from "@/components/site/toolkit";
import { Updates } from "@/components/site/updates";

export default function Home() {
  return (
    <>
      <main className="flex-1">
        <Hero />
        <ProductOverview />
        <LogoCloud />
        <Features />
        <LearningPaths />
        <AiAssistant />
        <Toolkit />
        <Updates />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
