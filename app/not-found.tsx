import type { Metadata } from "next";
import site from "@/site.config";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "404 — We had this page a second ago",
  description: "That page slipped between the folds. Find your way back to Mohamed Hafez's portfolio.",
};

export default function NotFound() {
  return (
    <main className="missing">
      <header className="missing-mast">
        <Link href="/" aria-label="Mohamed Hafez, home">{site.person.name}</Link>
        <span>{site.edition}</span>
      </header>
      <article className="missing-sheet paper">
        <div className="missing-copy">
          <span className="missing-label num">ERROR 404 / UNFILED</span>
          <h1>We had this page a second ago.</h1>
          <p>We checked every crease. Even the monkey looks confused.</p>
          <nav aria-label="Find your way back">
            <Link className="missing-primary" href="/">Unfold the portfolio <span aria-hidden="true">↗</span></Link>
            <Link href="/#nodes-unlimited">See the work <span aria-hidden="true">↗</span></Link>
            <a href="/resume.pdf">Read the résumé <span aria-hidden="true">↗</span></a>
          </nav>
        </div>
        <div className="missing-art">
          <span className="missing-art-num" aria-hidden="true">404</span>
          <figure className="missing-polaroid">
            <Image src="/confused-monkey.gif" alt="Confused monkey looking around" width={220} height={293} unoptimized />
            <figcaption>Page last seen: just now?</figcaption>
          </figure>
          <i aria-hidden="true" />
        </div>
      </article>
      <p className="missing-foot">A little lost. Still well folded.</p>
    </main>
  );
}
