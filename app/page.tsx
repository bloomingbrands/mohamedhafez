import site from "@/site.config";
import Hero from "@/components/Hero";
import Strip from "@/components/Strip";
import Finale from "@/components/Finale";
import FinaleSheet from "@/components/FinaleSheet";
import GateSheet from "@/components/GateSheet";
import { AwayPanel, IndexPanel, WorkPanel } from "@/components/Panels";

export default function Page() {
  const n = site.work.length;
  return (
    <main id="top">
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
