import site from "@/site.config";

export const dynamic = "force-static";

const xml = (value: string) =>
  value.replace(/[<>&"']/g, (character) => ({
    "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;", "'": "&apos;",
  })[character]!);

export function GET() {
  const items = site.work.map((item) => {
    const url = `${site.person.url}/#${item.slug}`;
    return `<item><title>${xml(item.name)}</title><link>${xml(url)}</link><guid isPermaLink="false">${xml(url)}</guid><description>${xml(item.story)}</description></item>`;
  }).join("");
  const body = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${xml(site.person.name)} — Selected work</title><link>${xml(site.person.url)}</link><description>${xml(site.person.description)}</description><language>en-us</language>${items}</channel></rss>`;
  return new Response(body, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
