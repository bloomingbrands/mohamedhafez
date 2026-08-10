import { Navbar } from "@/components/ui/navbar";
import { PrismaHero } from "@/components/ui/prisma-hero";
import { JourneySection } from "@/components/ui/journey-section";
import { ProjectsSection } from "@/components/ui/projects-section";
import FeatureSection from "@/components/ui/stack-feature-section";
import { FlipLinks } from "@/components/ui/flip-links";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://beingmohamedhafez.com/#website",
      url: "https://beingmohamedhafez.com",
      name: "Mohamed Hafez",
      description:
        "Portfolio of Mohamed Hafez — full-stack developer and systems engineer.",
      inLanguage: "en-US",
      publisher: { "@id": "https://beingmohamedhafez.com/#person" },
    },
    {
      "@type": "ProfilePage",
      "@id": "https://beingmohamedhafez.com/#profile",
      url: "https://beingmohamedhafez.com",
      name: "Mohamed Hafez — Full-Stack Developer & Systems Engineer",
      isPartOf: { "@id": "https://beingmohamedhafez.com/#website" },
      mainEntity: { "@id": "https://beingmohamedhafez.com/#person" },
    },
    {
      "@type": "Person",
      "@id": "https://beingmohamedhafez.com/#person",
      name: "Mohamed Hafez",
      url: "https://beingmohamedhafez.com",
      email: "mohamedhafez@outlook.com",
      jobTitle: ["Full-Stack Developer", "Systems Engineer"],
      description:
        "Full-stack developer and systems engineer shipping React/Next.js products, AI integrations, and enterprise identity, cloud, and endpoint solutions.",
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
        "Microsoft Intune",
        "Entra ID",
        "Endpoint Management",
        "Systems Engineering",
        "Docker",
        "Coolify",
      ],
      alumniOf: [
        {
          "@type": "CollegeOrUniversity",
          name: "Framingham State University",
        },
      ],
    },
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
