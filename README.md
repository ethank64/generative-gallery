# Generative Gallery

A personal gallery of algorithmic art — living [p5.js](https://p5js.org/) sketches you can run,
reseed, and reshape right in the browser. Static site, no build step, deploys straight to GitHub Pages.

🔗 **Live:** https://ethank64.github.io/generative-gallery

![Aeolian Drift](works/aeolian-drift/index.html)

## What's here

| Piece | Medium | Status |
|-------|--------|--------|
| [Aeolian Drift](works/aeolian-drift/) | Flow field (curl noise, harmonic-series turbulence) | ✅ Live |
| Murmuration | Particle system | 🚧 Placeholder |
| Standing Waves | Harmonic | 🚧 Placeholder |
| Lattice Hours | Tessellation | 🚧 Placeholder |

The three placeholders are example entries that show how a populated grid looks — delete or replace
them in [`works/works.js`](works/works.js) as you publish real pieces.

## How it works

```
index.html              # the gallery home
about.html              # the story behind the project
assets/
  gallery.css           # dark-gallery styling
  gallery.js            # renders the featured banner, filter chips, and grid from the manifest
  thumbs.js             # procedural thumbnails (fallback when a piece has no screenshot)
works/
  works.js              # THE MANIFEST — the one file you edit to add a piece
  aeolian-drift/
    index.html          # a fully self-contained interactive viewer
.nojekyll               # tell GitHub Pages to serve files as-is
```

The gallery reads `works/works.js` (a plain `window.GALLERY_WORKS` array) and builds itself. Because
the manifest is a `.js` file rather than fetched JSON, the site also works when you just double-click
`index.html` — no local server required.

## Add a new sketch

1. **Create the piece.** The simplest path is to copy an existing self-contained viewer:
   ```sh
   cp -r works/aeolian-drift works/my-new-piece
   ```
   Then edit `works/my-new-piece/index.html` and swap in your own p5.js algorithm. Each viewer is one
   standalone HTML file (p5.js from CDN, the sketch, and its controls all inline), so it runs anywhere.

2. **Register it** in [`works/works.js`](works/works.js):
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

3. **(Optional) Use a real thumbnail.** Open the piece, click **Download PNG**, drop the file into the
   piece's folder, and point `thumb` at it:
   ```js
   thumb: 'works/my-new-piece/thumb.png'
   ```
   Without `thumb`, the grid renders an on-brand procedural thumbnail from `kind`
   (`flow`, `ember`, `tide`, `particles`, `harmonics`, or `lattice`).

4. **Commit and push.** That's the whole workflow.

## Run locally

Either double-click `index.html`, or serve the folder:

```sh
python3 -m http.server 5610
# then open http://localhost:5610
```

## Deploy to GitHub Pages

1. Push this repo to GitHub (public).
2. **Settings → Pages → Build and deployment → Deploy from a branch.**
3. Branch: `main`, folder: `/ (root)`. Save.
4. Your gallery goes live at `https://<username>.github.io/generative-gallery/` within a minute or two.

The included `.nojekyll` file ensures Pages serves every folder and asset untouched.

## License

[MIT](LICENSE) © Ethan Knotts. Use the gallery scaffold freely; the artworks are mine — credit
appreciated if you build on them.
