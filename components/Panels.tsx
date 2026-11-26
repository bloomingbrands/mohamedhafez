import site, { type WorkItem } from "@/site.config";
import Image from "next/image";
import { asset } from "@/lib/urls";
import { folio } from "@/lib/folio";
import Concertina from "./Concertina";

/** Every panel opens the same way: its folio, its name, and a line of facts. */
export function PanelHead({ n, title, meta, as: Tag = "h2" }: { n: number; title: string; meta: readonly string[]; as?: "h2" | "div" }) {
  return (
    <header className="ph">
      <span className="ph-num num">{folio(n)}</span>
      <Tag className="ph-title">{title}</Tag>
      <p className="ph-meta">
        {meta.map((m) => (
          <span key={m}>{m}</span>
        ))}
      </p>
    </header>
  );
}

/** One panel of the sheet. `Strip` hinges each one open as it rises into view. */
export function Fold({ id, children, className = "" }: { id: string; children: React.ReactNode; className?: string }) {
  return (
    <section className="fp" id={id} data-fold>
      <div className={`fp-in paper ${className}`}>
        {children}
        <div className="fp-shade" data-fold-shade aria-hidden />
      </div>
    </section>
  );
}

function Result({ result }: { result: WorkItem["result"] }) {
  return (
    <p className="pt-result">
      <span className="pt-label">{result.label}</span>
      <span className="pt-figure num">
        {result.from ? (
          <>
            <span className="pt-from">{result.from}</span>
            <span className="pt-arrow" aria-label="to">
              →
            </span>
          </>
        ) : null}
        <span>{result.to}</span>
      </span>
    </p>
  );
}

export function WorkPanel({ item, n }: { item: WorkItem; n: number }) {
  const pictures = item.images.map((img) => (
    <Image
      key={img.src}
      src={asset(img.src)}
      alt={img.alt}
      width={img.width}
      height={img.height}
      loading="lazy"
      decoding="async"
      draggable={false}
    />
  ));
  return (
    <Fold id={item.slug} className={`work work-${item.layout}`}>
      <PanelHead n={n} title={item.name} meta={[item.role, item.years]} />
      <div className="pt">
        <p className="pt-title">{item.title}</p>
        <p className="pt-story">{item.story}</p>
        <Result result={item.result} />
        <a className="pt-link" href={item.link.href} target="_blank" rel="noreferrer">
          {item.link.label}
          <span aria-hidden> ↗</span>
        </a>
      </div>
      <figure className={`pi pi-${item.layout}`}>{pictures}</figure>
    </Fold>
  );
}

export function AwayPanel({ n }: { n: number }) {
  const { away } = site;
  return (
    <Fold id="away" className="away">
      <PanelHead n={n} title={away.title} meta={[away.note]} />
      <Concertina photos={away.photos} />
    </Fold>
  );
}

export function IndexPanel({ n }: { n: number }) {
  const { index } = site;
  const list = (items: readonly { name: string; kind: string; year: string; href: string }[], label: string) => (
    <div className="ix-col">
      <p className="ix-label">{label}</p>
      <ul>
        {items.map((it) => (
          <li key={it.name}>
            <a href={it.href} target={it.href.startsWith("http") || it.href.endsWith(".pdf") ? "_blank" : undefined} rel="noreferrer">
              <span className="ix-name">{it.name}</span>
              <span className="ix-lead" aria-hidden />
              <span className="ix-year num">{it.year}</span>
              <span className="ix-kind">{it.kind}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
  return (
    <Fold id="index" className="index">
      <PanelHead n={n} title={index.title} meta={[index.note]} />
      <div className="ix">
        <p className="ix-count">
          <span className="num">{index.count}</span>
          <span className="ix-count-label">{index.countLabel}</span>
        </p>
        {list(index.made, "Made")}
        {list(index.talks, "Connect")}
      </div>
    </Fold>
  );
}
