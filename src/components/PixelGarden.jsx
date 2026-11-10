import React, { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';

// Original, seeded pixel artwork. No external assets or animation dependencies.
function makeGarden() {
  let seed = 421;
  const random = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
  const trees = [];
  for (const [x, y, size, palette] of [[138, 155, 1, 0], [305, 157, .58, 1], [451, 155, 1.12, 2]]) {
    const branches = [];
    const leaves = [];
    const branch = (bx, by, length, angle, depth) => {
      const ex = bx + Math.cos(angle) * length;
      const ey = by + Math.sin(angle) * length;
      branches.push({ bx, by, ex, ey, depth });
      if (depth < 3) {
        for (let i = 0; i < 70; i++) {
          const a = random() * Math.PI * 2;
          const radius = Math.sqrt(random()) * 20 * size;
          leaves.push({ x: ex + Math.cos(a) * radius, y: ey + Math.sin(a) * radius * .7,
            tone: Math.floor(random() * 5), phase: random() * 6.28, w: 2 + Math.floor(random() * 3) });
        }
      }
      if (depth > 0) {
        branch(ex, ey, length * (.67 + random() * .12), angle - .38 - random() * .4, depth - 1);
        branch(ex, ey, length * (.67 + random() * .12), angle + .38 + random() * .4, depth - 1);
      }
    };
    branch(x, y, 39 * size, -Math.PI / 2, 4);
    trees.push({ x, y, size, palette, branches, leaves });
  }
  return trees;
}
const GARDEN = makeGarden();
const PALETTES = [
  ['#a86176', '#c78394', '#dda6b4', '#edc3cc', '#f7dce1'],
  ['#425d3e', '#64804d', '#819b5e', '#a4b776', '#c5cf97'],
  ['#986244', '#b68150', '#ce9d64', '#dfb982', '#eed4a0'],
];

export function PixelGarden() {
  const canvas = useRef(null);
  const wind = useRef(0);
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(media.matches);
    media.addEventListener('change', update);
    update();
    return () => media.removeEventListener('change', update);
  }, []);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const element = canvas.current;
    const ctx = element.getContext('2d');
    if (!ctx) return;
    let frame;
    let visible = true;
    let time = 0;
    let previous = 0;
    const still = paused || reducedMotion;
    const draw = (timestamp = 0) => {
      if (previous) time += Math.min(timestamp - previous, 50) / 1000;
      previous = timestamp;
      ctx.clearRect(0, 0, 600, 180);
      ctx.imageSmoothingEnabled = false;
      const dark = document.documentElement.classList.contains('dark');
      const breeze = still ? 0 : Math.sin(time * .7) * .5 + wind.current;
      for (const tree of GARDEN) {
        ctx.fillStyle = dark ? '#414232' : '#dadbc6';
        ctx.fillRect(tree.x - 48 * tree.size, tree.y + 2, 96 * tree.size, 2);
        for (const b of tree.branches) {
          ctx.strokeStyle = dark ? '#a38b78' : '#6d5144';
          ctx.lineWidth = Math.max(1, b.depth * 1.5);
          ctx.beginPath(); ctx.moveTo(Math.round(b.bx), Math.round(b.by));
          ctx.lineTo(Math.round(b.ex), Math.round(b.ey)); ctx.stroke();
        }
        for (const leaf of tree.leaves) {
          const sway = still ? 0 : Math.sin(time * 1.4 + leaf.phase * .2) * (tree.y - leaf.y) * .015 + breeze * (tree.y - leaf.y) * .035;
          ctx.fillStyle = PALETTES[tree.palette][leaf.tone];
          ctx.globalAlpha = dark ? .83 : 1;
          ctx.fillRect(Math.round(leaf.x + sway), Math.round(leaf.y), leaf.w, 2);
        }
        ctx.globalAlpha = 1;
        // Petals travel on a continuous loop; reduced motion renders a resting garden.
        if (!still) for (let i = 0; i < 9; i++) {
          const progress = (time * (.045 + i * .002) + i / 9) % 1;
          const x = tree.x + Math.sin(i * 12.3) * 45 + progress * (25 + breeze * 18);
          const y = 60 + progress * 98;
          ctx.globalAlpha = Math.sin(progress * Math.PI) * .7;
          ctx.fillStyle = PALETTES[tree.palette][2 + i % 3];
          ctx.fillRect(Math.round(x + Math.sin(time + i) * 3), Math.round(y), 3, 2);
        }
        ctx.globalAlpha = 1;
      }
    };
    const tick = timestamp => {
      if (!visible || document.hidden) { previous = 0; frame = undefined; return; }
      draw(timestamp);
      if (!still) frame = requestAnimationFrame(tick);
    };
    const restart = () => {
      cancelAnimationFrame(frame);
      previous = 0;
      if (visible && !document.hidden) frame = requestAnimationFrame(tick);
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; restart(); });
    observer.observe(element);
    const themeObserver = new MutationObserver(() => { if (still) draw(); });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    document.addEventListener('visibilitychange', restart);
    draw();
    return () => {
      cancelAnimationFrame(frame); observer.disconnect(); themeObserver.disconnect();
      document.removeEventListener('visibilitychange', restart);
    };
  }, [paused, reducedMotion]);

  return (
    <div className="pixel-garden"
      onPointerMove={event => {
        const bounds = event.currentTarget.getBoundingClientRect();
        wind.current = ((event.clientX - bounds.left) / bounds.width - .5) * 2;
      }}
      onPointerLeave={() => { wind.current = 0; }}>
      <canvas ref={canvas} width="600" height="180" role="img"
        aria-label="A pixel-art garden with a cherry blossom tree, a sage green shrub, and an autumn tree" />
      {!reducedMotion && (
        <button type="button" className="garden-pause" onClick={() => setPaused(value => !value)}
          aria-label={paused ? 'Resume garden animation' : 'Pause garden animation'}
          title={paused ? 'Resume garden animation' : 'Pause garden animation'}>
          {paused ? <Play size={14} /> : <Pause size={14} />}
        </button>
      )}
    </div>
  );
}
