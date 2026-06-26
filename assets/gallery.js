/*
  Reads window.GALLERY_WORKS (from works/works.js) and renders the
  featured banner, the category filter chips, and the works grid.
  No framework, no build step.
*/
(function () {
  var works = window.GALLERY_WORKS || [];

  var CAT_LABELS = {
    flow: 'Flow fields',
    particles: 'Particles',
    tess: 'Tessellation',
    harmonic: 'Harmonic'
  };
  function catLabel(c) {
    return CAT_LABELS[c] || (c.charAt(0).toUpperCase() + c.slice(1));
  }

  function thumbEl(work, w, h) {
    if (work.thumb) {
      var img = document.createElement('img');
      img.src = work.thumb;
      img.alt = work.title;
      img.loading = 'lazy';
      return img;
    }
    var cv = document.createElement('canvas');
    cv.width = w; cv.height = h;
    if (window.GalleryThumbs) window.GalleryThumbs.render(cv, work.kind || 'flow', work.id);
    return cv;
  }

  /* ── Featured banner ── */
  var featuredWork = works.filter(function (w) { return w.featured && w.status !== 'soon'; })[0]
                  || works.filter(function (w) { return w.status !== 'soon'; })[0]
                  || works[0];

  var featuredHost = document.getElementById('featured');
  if (featuredWork && featuredHost) {
    var a = document.createElement('a');
    a.className = 'featured';
    a.href = featuredWork.path || '#';
    a.setAttribute('data-cat', featuredWork.category || '');

    var thumb = document.createElement('div');
    thumb.className = 'thumb';
    thumb.appendChild(thumbEl(featuredWork, 1080, 405));

    if (featuredWork.live) {
      var b = document.createElement('span');
      b.className = 'badge';
      b.innerHTML = '<span aria-hidden="true">▶</span> Featured · live';
      thumb.appendChild(b);
    }

    var ov = document.createElement('div');
    ov.className = 'overlay';
    ov.innerHTML =
      '<div>' +
        '<div class="ftitle">' + featuredWork.title + '</div>' +
        '<div class="fmeta">' + [featuredWork.medium, featuredWork.year].filter(Boolean).join(' · ') + '</div>' +
      '</div>' +
      '<span class="open">Open piece <span aria-hidden="true">→</span></span>';

    thumb.appendChild(ov);
    a.appendChild(thumb);
    featuredHost.appendChild(a);
  }

  /* ── Grid (everything except the featured piece) ── */
  var gridWorks = works.filter(function (w) { return w !== featuredWork; });
  var grid = document.getElementById('grid');

  gridWorks.forEach(function (w) {
    var isSoon = w.status === 'soon';
    var card = document.createElement(isSoon ? 'div' : 'a');
    card.className = 'card' + (isSoon ? ' soon' : ' link');
    card.setAttribute('data-cat', w.category || '');
    if (!isSoon) card.href = w.path || '#';

    var thumb = document.createElement('div');
    thumb.className = 'thumb';
    thumb.appendChild(thumbEl(w, 480, 320));

    if (isSoon) {
      var sb = document.createElement('span');
      sb.className = 'soon-badge';
      sb.textContent = 'In progress';
      thumb.appendChild(sb);
    } else {
      if (w.live) {
        var lb = document.createElement('span');
        lb.className = 'live-badge';
        lb.innerHTML = '<span aria-hidden="true">▶</span> live';
        thumb.appendChild(lb);
      }
      var hint = document.createElement('span');
      hint.className = 'hint';
      hint.innerHTML = 'Open <span aria-hidden="true">↗</span>';
      thumb.appendChild(hint);
    }

    var body = document.createElement('div');
    body.className = 'body';
    var tags = (w.tags || []).map(function (t) { return '<span class="tag">' + t + '</span>'; }).join('');
    body.innerHTML =
      '<div class="ctitle">' + w.title + '</div>' +
      '<div class="cmeta">' + [w.medium, w.year].filter(Boolean).join(' · ') + '</div>' +
      (tags ? '<div class="tags">' + tags + '</div>' : '');

    card.appendChild(thumb);
    card.appendChild(body);
    grid.appendChild(card);
  });

  /* ── Filter chips (built from the categories actually present) ── */
  var cats = [];
  works.forEach(function (w) { if (w.category && cats.indexOf(w.category) < 0) cats.push(w.category); });

  var chipHost = document.getElementById('chips');
  function makeChip(value, label, on) {
    var c = document.createElement('button');
    c.className = 'chip' + (on ? ' on' : '');
    c.type = 'button';
    c.setAttribute('data-chip', value);
    c.textContent = label;
    c.addEventListener('click', function () { applyFilter(value); });
    return c;
  }
  if (chipHost) {
    chipHost.appendChild(makeChip('all', 'All', true));
    cats.forEach(function (c) { chipHost.appendChild(makeChip(c, catLabel(c), false)); });
  }

  function applyFilter(cat) {
    document.querySelectorAll('[data-chip]').forEach(function (ch) {
      ch.classList.toggle('on', ch.getAttribute('data-chip') === cat);
    });
    document.querySelectorAll('#grid [data-cat], #featured [data-cat]').forEach(function (el) {
      var show = cat === 'all' || el.getAttribute('data-cat') === cat;
      el.style.display = show ? '' : 'none';
    });
  }

  /* ── Hero / grid counts ── */
  var published = works.filter(function (w) { return w.status !== 'soon'; }).length;
  var countEl = document.getElementById('work-count');
  if (countEl) countEl.textContent = published + (published === 1 ? ' work' : ' works');
  var gridCountEl = document.getElementById('grid-count');
  if (gridCountEl) gridCountEl.textContent = gridWorks.length + (gridWorks.length === 1 ? ' piece' : ' pieces');
})();
