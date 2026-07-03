import { LandingNav } from "@/src/sections/landing/components/landing-nav"
import { LandingHero } from "@/src/sections/landing/components/landing-hero"
import { MetricsSection } from "@/src/sections/landing/components/metrics-section"
import { ProblemSection } from "@/src/sections/landing/components/problem-section"
import { SolutionSection } from "@/src/sections/landing/components/solution-section"
import { HowItWorksSection } from "@/src/sections/landing/components/how-it-works-section"
import { CtaSection } from "@/src/sections/landing/components/cta-section"
import { FooterSection } from "@/src/sections/landing/components/footer-section"
import { StripedPattern } from "@/components/striped-pattern"

export default function Page() {
  return (
    <>
      <LandingNav />
      <main className="flex flex-col items-center justify-center pt-16">
        <div className="relative w-full px-4 md:w-[80%] md:px-10">
          <div className="pointer-events-none absolute inset-0 z-0 flex flex-col">
            <div className="flex-1" />
            <StripedPattern
              direction="right"
              className="text-[#DBDBDB] dark:text-[#2E2E2E]"
            />
          </div>
          <div className="relative border-red-500 bg-background">
            <LandingHero />
            <MetricsSection />
            <ProblemSection />
            <SolutionSection />
            <HowItWorksSection />
            <CtaSection />
            <FooterSection />
          </div>
        </div>
      </main>
    </>
  )
}
