import site from "@/site.config";

/**
 * The outside of the sheet: what you see when it is folded shut.
 * Rendered more than once (one copy per flap); `copy` hides the extra
 * copies from screen readers and the keyboard.
 */
export default function Cover({ copy = false }: { copy?: boolean }) {
  const { person, cover } = site;
  const chars = Math.max(...person.nameLines.map((line) => line.length));
  const tab = copy ? -1 : undefined;
  return (
    <div className="cover stock" aria-hidden={copy || undefined} style={{ "--chars": chars } as React.CSSProperties}>
      <p className="cover-name">
        {person.nameLines.map((line) => (
          <span key={line}>{line}</span>
        ))}
      </p>
      <div className="cover-foot">
        <p className="cover-lines">
          {cover.lines.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </p>
        <p className="cover-status">{cover.status}</p>
        <a className="cover-mail" href={`mailto:${person.email}`} tabIndex={tab}>
          {person.email}
        </a>
        <ul className="cover-links">
          {cover.links.map((link) => (
            <li key={link.label}>
              <a href={link.href} tabIndex={tab} target="_blank" rel="noreferrer">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
