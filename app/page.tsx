import { Navbar } from "@/components/ui/navbar";
import { PrismaHero } from "@/components/ui/prisma-hero";
import { JourneySection } from "@/components/ui/journey-section";
import { ProjectsSection } from "@/components/ui/projects-section";
import FeatureSection from "@/components/ui/stack-feature-section";
import { FlipLinks } from "@/components/ui/flip-links";

export default function Home() {
  return (
    <>
      <Navbar />
      <section id="about" className="bg-black p-3 md:p-4">
        <PrismaHero />
      </section>
      <section id="work">
        <JourneySection />
      </section>
      <section id="projects">
        <ProjectsSection />
      </section>
      <section id="skills">
        <FeatureSection />
      </section>
      <section id="contact">
        <FlipLinks />
      </section>
    </>
  );
}
