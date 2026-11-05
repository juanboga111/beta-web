// Despiece de la web en cuatro capas (hero), su inclinación con resorte y la versión por etapas (proceso).
import { reducedMotion, finePointer, spring, visibleLoop } from './motion.js';
import { STEPS_LABEL } from './data.js';

export function initHeroLayers() {
  const stage = document.querySelector('[data-stage]');
  if (!stage) return;
  const layers = stage.querySelector('[data-layers]');
  const tilt = stage.querySelector('[data-tilt]');
  const pin = document.querySelector('[data-pin]');
  const reduce = reducedMotion();
  let pinned = false;
  let hovering = false;

  const setExploded = (on) => layers.classList.toggle('ex', on);
  const setPinned = (on) => {
    pinned = on;
    if (pin) {
      pin.setAttribute('aria-pressed', String(on));
      pin.textContent = on ? 'Armar de nuevo' : 'Ver por capas';
    }
    setExploded(pinned || hovering);
  };

  // El HTML llega separado (estado sin JavaScript). Con movimiento normal se arma solo a los 1,9 s;
  // con movimiento reducido queda separado y fijado, sin cambios que el visitante no pidió.
  if (reduce) setPinned(true);
  else setTimeout(() => { if (!hovering && !pinned) setExploded(false); }, 1900);

  if (pin) pin.addEventListener('click', () => setPinned(!pinned));

  // Luz de la grilla siguiendo el cursor (también con mouse en movimiento reducido: no desplaza nada).
  let target = null;
  stage.addEventListener('pointermove', (e) => {
    const b = stage.getBoundingClientRect();
    const px = (e.clientX - b.left) / b.width;
    const py = (e.clientY - b.top) / b.height;
    stage.style.setProperty('--mx', `${(px * 100).toFixed(1)}%`);
    stage.style.setProperty('--my', `${(py * 100).toFixed(1)}%`);
    if (e.pointerType !== 'touch') target = { x: (px - 0.5) * 18, y: -(py - 0.5) * 12 };
  });
  stage.addEventListener('pointerenter', (e) => {
    if (e.pointerType === 'touch') return;
    hovering = true;
    setExploded(true);
  });
  stage.addEventListener('pointerleave', () => {
    hovering = false;
    target = null;
    if (!pinned) setExploded(false);
  });

  // Inclinación con resorte: solo con puntero fino y sin movimiento reducido.
  if (reduce || !finePointer() || !tilt) return;
  const s = spring(0.06, 0.8);
  const t0 = performance.now();
  visibleLoop(stage, (now) => {
    let tx, ty;
    if (target) { tx = target.x; ty = target.y; }
    else { const k = (now - t0) / 1000; tx = Math.sin(k * 0.35) * 4; ty = Math.cos(k * 0.28) * 3; }
    s.step(tx, ty);
    tilt.style.transform = `rotateX(${s.y.toFixed(2)}deg) rotateY(${s.x.toFixed(2)}deg)`;
  });
}

export function initProcess() {
  const group = document.querySelector('[data-steps]');
  const stage = document.querySelector('[data-pstage]');
  if (!group || !stage) return;
  const steps = [...group.querySelectorAll('[data-step]')];
  const label = stage.querySelector('[data-step-lbl]');
  const next = document.querySelector('[data-next-step]');
  let current = 0;

  const go = (i) => {
    current = i;
    steps.forEach((b, j) => b.setAttribute('aria-pressed', j === i ? 'true' : 'false'));
    stage.classList.remove('p0', 'p1', 'p2', 'p3');
    stage.classList.add(`p${i}`);
    if (label) label.textContent = STEPS_LABEL(i);
    if (next) next.textContent = i === 3 ? 'Volver al inicio' : 'Siguiente etapa';
  };
  steps.forEach((b, i) => b.addEventListener('click', () => go(i)));
  if (next) next.addEventListener('click', () => go((current + 1) % 4));
}

export function initFinal3D() {
  const section = document.querySelector('[data-final]');
  const xr = document.querySelector('[data-x3d]');
  if (!section || !xr || reducedMotion() || !finePointer()) return;
  const s = spring(0.05, 0.8, -18, 14);
  let target = null;
  section.addEventListener('pointermove', (e) => {
    const b = section.getBoundingClientRect();
    target = { x: ((e.clientX - b.left) / b.width - 0.5) * 50, y: -((e.clientY - b.top) / b.height - 0.5) * 30 };
  });
  section.addEventListener('pointerleave', () => { target = null; });
  const t0 = performance.now();
  const small = window.matchMedia('(max-width: 640px)');
  visibleLoop(xr, (now) => {
    let tx, ty;
    if (target) { tx = target.x; ty = target.y; }
    else { const k = (now - t0) / 1000; tx = -18 + Math.sin(k * 0.5) * 10; ty = 14 + Math.cos(k * 0.4) * 6; }
    s.step(tx, ty);
    xr.style.transform = `${small.matches ? 'scale(.75) ' : ''}rotateX(${s.y.toFixed(2)}deg) rotateY(${s.x.toFixed(2)}deg)`;
  });
}
