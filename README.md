# Mohamed Hafez portfolio

An interactive fold portfolio built with Next.js. Scrolling opens the cover, reveals selected projects and personal photos, and folds the sheet closed at the end.

## Development

Use Node.js 20.9 or newer.

```bash
npm ci
npm run dev
```

## Checks

```bash
npm run lint
npm run build
npm audit
```

## Content

- `site.config.ts` holds copy, links, project entries, and photo metadata.
- `public/` holds the project screenshots, photos, portrait, and `resume.pdf`.
- `styles/` holds the fold layout and animation styling.

## Deployment

The `bloomingbrands/mohamedhafez` repository is the Coolify deployment source for `beingmohamedhafez.com`. Keep its site changes in sync with this repository before deploying. The Coolify app builds the `main` branch and serves the Next.js standalone output.
