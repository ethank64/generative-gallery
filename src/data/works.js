/*
  ─────────────────────────────────────────────────────────────────────────────
  THE GALLERY MANIFEST
  ─────────────────────────────────────────────────────────────────────────────
  The one file you edit to add a piece. Imported at build time by the gallery.

  To add a sketch:
    1. Drop a self-contained viewer at  public/works/<your-id>/index.html
       (easiest start: copy public/works/aeolian-drift/index.html and swap the art).
    2. Add an entry to the array below.
    3. Commit & push — the deploy Action rebuilds the site.

  Fields:
    id        unique slug (also the folder name under public/works/)
    title     display name
    year      number, shown in the card meta
    medium    short label, e.g. "Flow field", "Particle system"
    category  filter bucket: flow | particles | tess | harmonic
              (add your own — the filter chips build themselves from this)
    tags      array of short strings shown as pills
    path      link opened when the card is clicked (relative to the site base)
    kind      thumbnail style when no `thumb` is given:
              flow | ember | tide | particles | harmonics | lattice
    thumb     OPTIONAL path to a real screenshot. Overrides `kind`.
              Tip: open a piece, click "Download PNG", drop it in the folder.
    featured  true to spotlight it in the big banner at the top (first wins)
    live      true to show the "live" badge (animated sketch)
    blurb     one-line description
    status    OPTIONAL "soon" renders a non-clickable "in progress" placeholder.
  ─────────────────────────────────────────────────────────────────────────────
*/
export const works = [
  {
    id: 'aeolian-drift',
    title: 'Aeolian Drift',
    year: 2024,
    medium: 'Flow field',
    category: 'flow',
    tags: ['p5.js', 'curl noise', 'harmonic series'],
    path: 'works/aeolian-drift/index.html',
    kind: 'flow',
    featured: true,
    live: true,
    blurb: 'Wind made visible — thousands of filaments surrendering to a divergence-free harmonic field. Reseed it, or set it flowing.'
  }
];
