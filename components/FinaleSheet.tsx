import site from "@/site.config";
import Image from "next/image";
import { asset } from "@/lib/urls";
import GateSheet from "./GateSheet";
import { PanelHead } from "./Panels";

/** Small copies of every panel below the spread, nested so each hangs from the one above. */
function Chain({ panels, i = 0 }: { panels: React.ReactNode[]; i?: number }) {
  if (i >= panels.length) return null;
  return (
    <div className="m-p" data-mini>
      <div className="m-face m-front paper">{panels[i]}</div>
      <div className="m-face m-back stock" />
      <div className="m-next">
        <Chain panels={panels} i={i + 1} />
      </div>
    </div>
  );
}

function miniPanels() {
  const { work, away, index } = site;
  const items: React.ReactNode[] = work.map((item, i) => (
    <div className={`mini mini-${item.layout}`} key={item.slug}>
      <PanelHead as="div" n={i + 2} title={item.name} meta={[item.role, item.years]} />
      <div className="mini-pics">
        {item.images.map((img) => (
          <Image key={img.src} src={asset(img.src)} alt="" width={img.width} height={img.height} loading="lazy" draggable={false} />
        ))}
      </div>
    </div>
  ));
  items.push(
    <div className="mini mini-away" key="away">
      <PanelHead as="div" n={work.length + 2} title={away.title} meta={[away.note]} />
      <div className="mini-pics">
        {away.photos.map((p) => (
          <Image key={p.src} src={asset(p.src)} alt="" width={800} height={1000} loading="lazy" draggable={false} />
        ))}
      </div>
    </div>,
  );
  items.push(
    <div className="mini mini-index" key="index">
      <PanelHead as="div" n={work.length + 3} title={index.title} meta={[index.note]} />
      <div className="mini-ix">
        <span className="num">{index.count}</span>
        <ul>
          {[...index.made, ...index.talks].map((it) => (
            <li key={it.name}>
              <span>{it.name}</span>
              <span className="num">{it.year}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>,
  );
  return items;
}

/** What the ending folds: the gatefold, with every panel hanging below it. */
export default function FinaleSheet() {
  return (
    <>
      <GateSheet withReal={false} />
      <div className="f-chain" data-chain>
        <Chain panels={miniPanels()} />
      </div>
    </>
  );
}
