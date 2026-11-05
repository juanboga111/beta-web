// Utilidades de movimiento: preferencia de movimiento reducido, resortes y ciclos que se pausan solos.

const mq = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
export const reducedMotion = () => !!(mq && mq.matches);
export const finePointer = () => !!(window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches);

/** Resorte 2D del diseño: v = (v + (objetivo − actual) × k) × d. */
export function spring(k, d, x = 0, y = 0) {
  return {
    x, y, vx: 0, vy: 0,
    step(tx, ty) {
      this.vx = (this.vx + (tx - this.x) * k) * d;
      this.vy = (this.vy + (ty - this.y) * k) * d;
      this.x += this.vx;
      this.y += this.vy;
    },
  };
}

/**
 * Ejecuta `frame(now)` en cada cuadro solo mientras `el` está en pantalla y la pestaña visible.
 * Devuelve una función para detenerlo.
 */
export function visibleLoop(el, frame) {
  let raf = 0;
  let onScreen = false;
  const run = (now) => { frame(now); raf = requestAnimationFrame(run); };
  const sync = () => {
    const should = onScreen && !document.hidden;
    if (should && !raf) raf = requestAnimationFrame(run);
    if (!should && raf) { cancelAnimationFrame(raf); raf = 0; }
  };
  const io = new IntersectionObserver((entries) => { onScreen = entries.some((e) => e.isIntersecting); sync(); });
  io.observe(el);
  document.addEventListener('visibilitychange', sync);
  return () => { io.disconnect(); document.removeEventListener('visibilitychange', sync); if (raf) cancelAnimationFrame(raf); };
}

/** Marca un grupo de botones con aria-pressed y devuelve el elegido. */
export function pressOnly(buttons, active) {
  buttons.forEach((b) => b.setAttribute('aria-pressed', b === active ? 'true' : 'false'));
}
