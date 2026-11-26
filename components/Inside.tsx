import site from "@/site.config";
import Image from "next/image";
import { asset } from "@/lib/urls";
import { folio } from "@/lib/folio";

/**
 * The inside of the gatefold: the spread you see once the cover opens.
 * Its four columns (or rows, on a phone) line up with the folds.
 */
export default function Inside({ copy = false }: { copy?: boolean }) {
  const { person, intro, work, away, index } = site;
  const tab = copy ? -1 : undefined;
  const Name = copy ? "div" : "h1";
  const contents = [
    ...work.map((item, i) => ({ id: item.slug, n: folio(i + 2), label: item.name, sub: item.years })),
    { id: "away", n: folio(work.length + 2), label: away.title, sub: `${away.photos.length} photos` },
    { id: "index", n: folio(work.length + 3), label: index.title, sub: `${index.count} more` },
  ];
  return (
    <div className="inside paper" aria-hidden={copy || undefined}>
      <figure className="in-photo">
        <Image src={asset(person.portrait)} alt={copy ? "" : person.portraitAlt} width={880} height={1178} draggable={false} />
      </figure>

      <div className="in-main">
        <Name className="in-name">
          <span>{person.name}</span>
          <span className="in-role">
            {person.role}, {person.city}
          </span>
        </Name>
        <p className="in-head">{intro.headline}</p>
        <div className="in-body">
          {intro.body.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <span className="in-folio num" aria-hidden>
          01
        </span>
      </div>

      <nav className="in-contents" aria-label={copy ? undefined : "Contents"}>
        <p className="in-label">{intro.contentsTitle}</p>
        <ol>
          {contents.map((c) => (
            <li key={c.id}>
              <a href={`#${c.id}`} tabIndex={tab}>
                <span className="num">{c.n}</span>
                <span className="in-item">{c.label}</span>
                <span className="in-sub">{c.sub}</span>
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
}
