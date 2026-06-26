/*
  Procedural thumbnail renderer (ES module).
  Draws a small on-brand sketch into a <canvas> so the grid looks alive even
  before you've captured real screenshots. Override any tile by setting `thumb`
  in the manifest.

  Usage:  import { renderThumb } from '../lib/thumbs.js';
          renderThumb(canvasEl, kind, seed);
*/
function mulberry32(a) {
  return function () {
    a |= 0; a = a + 0x6D2B79F5 | 0;
    var t = Math.imul(a ^ a >>> 15, 1 | a);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}
function field(x, y) {
  return (Math.sin(x * 1.7 + Math.cos(y * 1.3)) +
          Math.sin(y * 2.1 + Math.cos(x * 0.9)) +
          Math.sin((x + y) * 1.1)) / 3;
}
const PAL = {
  dusk:  ['#2f9e8f', '#c76b8e', '#e0b15e', '#8f7fd6'],
  ember: ['#e0723e', '#e0b15e', '#c76b8e', '#b8453a'],
  tide:  ['#2f9e8f', '#6a9bcc', '#8f7fd6', '#cfe6e0'],
  cool:  ['#6a9bcc', '#2f9e8f', '#8f7fd6', '#d2d8f0']
};
function hexA(h, a) {
  var n = parseInt(h.slice(1), 16);
  return 'rgba(' + ((n >> 16) & 255) + ',' + ((n >> 8) & 255) + ',' + (n & 255) + ',' + a + ')';
}
function bg(c, w, h) { c.fillStyle = '#0b0d1a'; c.fillRect(0, 0, w, h); }
function vign(c, w, h) {
  var g = c.createRadialGradient(w / 2, h * 0.45, h * 0.18, w / 2, h * 0.5, w * 0.72);
  g.addColorStop(0, 'rgba(0,0,0,0)');
  g.addColorStop(1, 'rgba(4,4,10,0.5)');
  c.fillStyle = g; c.fillRect(0, 0, w, h);
}
function streams(c, w, h, pal, rnd, o) {
  c.globalCompositeOperation = 'lighter';
  var n = o.n, len = o.len, sc = o.sc || 0.011, step = o.step || 2.4, turns = o.turns || 2.4, flat = o.flat;
  for (var i = 0; i < n; i++) {
    var x = rnd() * w, y = rnd() * h, col = pal[Math.floor(rnd() * pal.length)];
    c.strokeStyle = hexA(col, 0.09 + rnd() * 0.18);
    c.lineWidth = 0.6 + rnd() * 1.4;
    c.beginPath(); c.moveTo(x, y);
    for (var s = 0; s < len; s++) {
      var a = field(x * sc, y * sc) * Math.PI * turns;
      if (flat) a = a * 0.32;
      x += Math.cos(a) * step; y += Math.sin(a) * step;
      c.lineTo(x, y);
      if (x < -12 || x > w + 12 || y < -12 || y > h + 12) break;
    }
    c.stroke();
  }
  c.globalCompositeOperation = 'source-over';
}
function parts(c, w, h, pal, rnd) {
  c.globalCompositeOperation = 'lighter';
  for (var i = 0; i < 1100; i++) {
    var x = rnd() * w, y = rnd() * h, f = (field(x * 0.012, y * 0.012) + 1) / 2;
    if (rnd() > 0.22 + f * 0.72) continue;
    var col = pal[Math.floor(rnd() * pal.length)];
    c.fillStyle = hexA(col, 0.14 + rnd() * 0.5);
    var r = 0.5 + rnd() * 1.9 * (0.5 + f);
    c.beginPath(); c.arc(x, y, r, 0, 7); c.fill();
  }
  c.globalCompositeOperation = 'source-over';
}
function harm(c, w, h, pal) {
  c.globalCompositeOperation = 'lighter';
  var cx = [w * 0.4, w * 0.63], cy = [h * 0.52, h * 0.4], mx = Math.max(w, h);
  for (var k = 0; k < 2; k++) {
    for (var r = 4; r < mx; r += 6) {
      var col = pal[(k + (r / 6 | 0)) % pal.length];
      c.strokeStyle = hexA(col, 0.09 + 0.06 * Math.sin(r * 0.16));
      c.lineWidth = 1;
      c.beginPath(); c.arc(cx[k], cy[k], r + Math.sin(r * 0.2) * 3, 0, 7); c.stroke();
    }
  }
  c.globalCompositeOperation = 'source-over';
}
function latt(c, w, h, pal, rnd) {
  var p = [];
  for (var i = 0; i < 50; i++) p.push([rnd() * w, rnd() * h]);
  c.globalCompositeOperation = 'lighter';
  for (var j = 0; j < 90; j++) {
    var a = p[Math.floor(rnd() * p.length)], b = p[Math.floor(rnd() * p.length)], d = p[Math.floor(rnd() * p.length)];
    var col = pal[Math.floor(rnd() * pal.length)];
    c.fillStyle = hexA(col, 0.04 + rnd() * 0.08);
    c.strokeStyle = hexA(col, 0.16);
    c.lineWidth = 0.6;
    c.beginPath(); c.moveTo(a[0], a[1]); c.lineTo(b[0], b[1]); c.lineTo(d[0], d[1]); c.closePath();
    c.fill(); c.stroke();
  }
  c.globalCompositeOperation = 'source-over';
}
function growth(c, w, h, pal, rnd) {
  c.globalCompositeOperation = 'lighter';
  for (var s = 0; s < 6; s++) {
    var x = rnd() * w, y = rnd() * h, ang = rnd() * 7;
    var col = pal[Math.floor(rnd() * pal.length)];
    c.strokeStyle = hexA(col, 0.4 + rnd() * 0.2);
    c.lineWidth = 1.1;
    c.beginPath(); c.moveTo(x, y);
    for (var i = 0; i < 420; i++) {
      ang += field(x * 0.02, y * 0.02) * 1.1 + (rnd() - 0.5) * 0.6;
      x += Math.cos(ang) * 3; y += Math.sin(ang) * 3;
      if (x < 4 || x > w - 4 || y < 4 || y > h - 4) {
        ang += Math.PI;
        x = Math.max(4, Math.min(w - 4, x));
        y = Math.max(4, Math.min(h - 4, y));
      }
      c.lineTo(x, y);
    }
    c.stroke();
  }
  c.globalCompositeOperation = 'source-over';
}
const KINDS = {
  flow:      function (c, w, h, r) { streams(c, w, h, PAL.dusk, r, { n: Math.round(w * 0.5), len: 30, turns: 2.4 }); },
  growth:    function (c, w, h, r) { growth(c, w, h, PAL.dusk, r); },
  ember:     function (c, w, h, r) { streams(c, w, h, PAL.ember, r, { n: 260, len: 30, turns: 2.0 }); },
  tide:      function (c, w, h, r) { streams(c, w, h, PAL.tide, r, { n: 240, len: 36, turns: 1.2, flat: true, step: 2.6 }); },
  particles: function (c, w, h, r) { parts(c, w, h, PAL.dusk, r); },
  harmonics: function (c, w, h, r) { harm(c, w, h, PAL.cool); },
  lattice:   function (c, w, h, r) { latt(c, w, h, PAL.dusk, r); }
};
function hashSeed(s) {
  var n = 0; s = String(s);
  for (var i = 0; i < s.length; i++) n = (n * 131 + s.charCodeAt(i)) >>> 0;
  return n || 1;
}

export function renderThumb(canvas, kind, seed) {
  try {
    var w = canvas.width, h = canvas.height, ctx = canvas.getContext('2d');
    var rnd = mulberry32((hashSeed(seed) * 2654435761) >>> 0);
    bg(ctx, w, h);
    (KINDS[kind] || KINDS.flow)(ctx, w, h, rnd);
    vign(ctx, w, h);
  } catch (e) { /* leave the dark canvas as a graceful fallback */ }
}
