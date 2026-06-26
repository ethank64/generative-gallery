/*
  ─────────────────────────────────────────────────────────────────────────────
  THE GALLERY MANIFEST
  ─────────────────────────────────────────────────────────────────────────────
  This is the only file you edit to add a new piece. No build step.

  To add a sketch:
    1. Drop a self-contained viewer at  works/<your-id>/index.html
       (the easiest start: copy works/aeolian-drift/index.html and swap the art).
    2. Add an entry to the array below.
    3. Commit & push. Done.

  Fields:
    id        unique slug (also the folder name under works/)
    title     display name
    year      number, shown in the card meta
    medium    short label, e.g. "Flow field", "Particle system"
    category  one of the filter buckets: flow | particles | tess | harmonic
              (add your own — the filter chips build themselves from this)
    tags      array of short strings shown as pills
    path      link opened when the card is clicked (the interactive viewer)
    kind      thumbnail style when no `thumb` image is given:
              flow | ember | tide | particles | harmonics | lattice
    thumb     OPTIONAL path to a real screenshot (png/jpg). Overrides `kind`.
              Tip: open a piece, click "Download PNG", drop it in the folder.
    featured  true to spotlight it in the big banner at the top (first wins)
    live      true to show the "live" badge (animated sketch)
    blurb     one-line description (banner + hover)
    status    OPTIONAL "soon" renders a non-clickable "in progress" placeholder.
              Delete these three example placeholders whenever you like.
  ─────────────────────────────────────────────────────────────────────────────
*/
window.GALLERY_WORKS = [
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
  },

  // ── Example placeholders — replace or delete as you publish real pieces ──
  {
    id: 'murmuration',
    title: 'Murmuration',
    year: 2024,
    medium: 'Particle system',
    category: 'particles',
    tags: ['p5.js', 'flocking'],
    kind: 'particles',
    status: 'soon',
    blurb: 'Boids settling into restless, breathing clouds.'
  },
  {
    id: 'standing-waves',
    title: 'Standing Waves',
    year: 2024,
    medium: 'Harmonic',
    category: 'harmonic',
    tags: ['p5.js', 'interference'],
    kind: 'harmonics',
    status: 'soon',
    blurb: 'Overlapping ripples carving nodes of stillness.'
  },
  {
    id: 'lattice-hours',
    title: 'Lattice Hours',
    year: 2024,
    medium: 'Tessellation',
    category: 'tess',
    tags: ['p5.js', 'voronoi'],
    kind: 'lattice',
    status: 'soon',
    blurb: 'A plane fractured into drifting cells.'
  }
];
