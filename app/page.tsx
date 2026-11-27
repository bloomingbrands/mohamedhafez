import site from "@/site.config";
import Hero from "@/components/Hero";
import Strip from "@/components/Strip";
import Finale from "@/components/Finale";
import FinaleSheet from "@/components/FinaleSheet";
import GateSheet from "@/components/GateSheet";
import { AwayPanel, IndexPanel, WorkPanel } from "@/components/Panels";

export default function Page() {
  const n = site.work.length;
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${site.person.url}/#person`,
        name: site.person.name,
        url: site.person.url,
        image: `${site.person.url}${site.person.portrait}`,
        jobTitle: site.person.role,
        homeLocation: { "@type": "Place", name: site.person.city },
        sameAs: site.cover.links.filter((link) => link.href.startsWith("https://")).map((link) => link.href),
      },
      {
        "@type": "WebSite",
        "@id": `${site.person.url}/#website`,
        name: site.person.name,
        url: site.person.url,
        description: site.person.description,
        author: { "@id": `${site.person.url}/#person` },
      },
    ],
  };
  return (
    <main id="top">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <Hero>
        <GateSheet />
      </Hero>
      <Strip>
        {site.work.map((item, i) => (
          <WorkPanel key={item.slug} item={item} n={i + 2} />
        ))}
        <AwayPanel n={n + 2} />
        <IndexPanel n={n + 3} />
      </Strip>
      <Finale>
        <FinaleSheet />
      </Finale>
      <footer className="colophon">
        <p>
          {site.colophon.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </p>
        <p className="colophon-small">
          © {new Date().getFullYear()} {site.person.name}
        </p>
      </footer>
    </main>
  );
}
