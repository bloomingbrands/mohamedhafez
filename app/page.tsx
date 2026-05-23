import { Navbar } from "@/components/ui/navbar";
import { PrismaHero } from "@/components/ui/prisma-hero";
import { JourneySection } from "@/components/ui/journey-section";
import { ProjectsSection } from "@/components/ui/projects-section";
import FeatureSection from "@/components/ui/stack-feature-section";
import { FlipLinks } from "@/components/ui/flip-links";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Mohamed Hafez",
  url: "https://beingmohamedhafez.com",
  email: "mohamedhafez@outlook.com",
  jobTitle: "Full Stack JavaScript Developer",
  description:
    "Full Stack JavaScript Developer with 8+ years of enterprise systems engineering experience. Specializing in React, Next.js, Node.js, AI integrations, and Hedera blockchain.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Lowell",
    addressRegion: "MA",
    addressCountry: "US",
  },
  sameAs: [
    "https://www.linkedin.com/in/mnhafez1978",
    "https://github.com/mhafez1978",
    "https://x.com/jamstack_blocks",
  ],
  knowsAbout: [
    "React",
    "Next.js",
    "Node.js",
    "TypeScript",
    "AI Integrations",
    "OpenAI",
    "Anthropic",
    "Hedera Blockchain",
    "AWS",
    "Azure",
    "Systems Engineering",
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
