# Generative Gallery

A personal gallery of algorithmic art — living [p5.js](https://p5js.org/) sketches you can run,
reseed, and reshape right in the browser. Built with [Astro](https://astro.build/) for a shared,
component-based shell, with each sketch kept as a self-contained p5.js page underneath.

🔗 **Live:** https://ethank64.github.io/generative-gallery/

## What's here

| Piece | Medium | Status |
|-------|--------|--------|
| [Aeolian Drift](public/works/aeolian-drift/) | Flow field (curl noise, harmonic-series turbulence) | ✅ Live |
| Murmuration | Particle system | 🚧 Placeholder |
| Standing Waves | Harmonic | 🚧 Placeholder |
| Lattice Hours | Tessellation | 🚧 Placeholder |

The three placeholders are example manifest entries that show a populated grid — delete or replace
them in [`src/data/works.js`](src/data/works.js) as you publish real pieces.

## How it works

```
src/
  layouts/Layout.astro       # the page shell: <head>, fonts, room bg, header, footer
  components/
    Header.astro             # written once, used on every page
    Footer.astro             # written once, used on every page
    WorksGrid.astro          # featured banner + filter chips + grid (from the manifest)
  pages/
    index.astro              # the gallery home
    about.astro              # the story behind the project
  data/works.js              # THE MANIFEST — the one file you edit to add a piece
  lib/thumbs.js              # procedural thumbnails (fallback when a piece has no screenshot)
  styles/gallery.css         # dark-gallery styling
public/
  works/
    aeolian-drift/index.html # a fully self-contained interactive p5.js viewer
.github/workflows/deploy.yml # builds with Astro and deploys to GitHub Pages on every push
```

The **component framework wraps the chrome**; the **p5.js sketches stay standalone**. Each sketch in
`public/works/` is a complete HTML file (p5.js from CDN, the algorithm, and its controls all inline),
served verbatim and opened by linking to it. Astro never touches the sketch internals, so global-mode
p5 stays isolated and there's nothing to rewrite.

## Add a new sketch

1. **Create the piece** — easiest is to copy an existing self-contained viewer:
   ```sh
   cp -r public/works/aeolian-drift public/works/my-new-piece
   ```
   Then edit `public/works/my-new-piece/index.html` and swap in your own p5.js algorithm.

2. **Register it** in [`src/data/works.js`](src/data/works.js):
   ```js
   {
     id: 'my-new-piece',
     title: 'My New Piece',
     year: 2026,
     medium: 'Flow field',
     category: 'flow',            // becomes a filter chip automatically
     tags: ['p5.js', 'noise'],
     path: 'works/my-new-piece/index.html',
     kind: 'flow',                // procedural thumbnail style
     live: true,
     blurb: 'One line about the piece.'
   }
   ```

3. **(Optional) Use a real thumbnail** — open the piece, click **Download PNG**, drop the file in the
   piece's folder, and set `thumb: 'works/my-new-piece/thumb.png'`. Without `thumb`, the grid renders
   an on-brand procedural thumbnail from `kind` (`flow`, `ember`, `tide`, `particles`, `harmonics`,
   `lattice`).

4. **Commit and push** — the deploy Action rebuilds and publishes automatically.

## Run locally

```sh
npm install      # first time only
npm run dev      # live-reload dev server at http://localhost:4321/generative-gallery/
```

Other scripts: `npm run build` (output to `dist/`), `npm run preview` (serve the built site).

## Deploy

Deployment is automatic: pushing to `main` triggers
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), which builds with Astro and publishes
to GitHub Pages. (Pages → Build and deployment → Source is set to **GitHub Actions**.)

## License

[MIT](LICENSE) © Ethan Knotts. Use the gallery scaffold freely; the artworks are mine — credit
appreciated if you build on them.
