// Demo de rubros, servicios con vista previa, filtros de proyectos y comparación.
import { CATS, SERVICES } from './data.js';
import { reducedMotion, pressOnly } from './motion.js';

export function initDemo() {
  const group = document.querySelector('[data-cats]');
  const demo = document.querySelector('[data-demo]');
  if (!group || !demo) return;
  const mock = demo.querySelector('[data-mock]');
  const side = demo.querySelector('[data-side]');
  const buttons = [...group.querySelectorAll('[data-cat]')];
  let current = 'empresa';
  let timer = 0;

  const apply = (id) => {
    const d = CATS[id];
    demo.querySelectorAll('[data-d]').forEach((el) => { el.textContent = d[el.dataset.d] ?? ''; });
    for (const el of [mock, side]) {
      [...el.classList].filter((c) => c.startsWith('d-') || c.startsWith('l-')).forEach((c) => el.classList.remove(c));
      el.classList.add(`d-${id}`);
    }
    mock.classList.add(`l-${d.lay}`);
  };

  buttons.forEach((b) => b.addEventListener('click', () => {
    const id = b.dataset.cat;
    if (id === current) return;
    current = id;
    pressOnly(buttons, b);
    if (reducedMotion()) { apply(id); return; }
    mock.classList.add('sw');
    clearTimeout(timer);
    timer = setTimeout(() => { apply(id); mock.classList.remove('sw'); }, 170);
  }));
}

// Construye una vista previa a partir de cajas posicionadas en porcentajes (sin HTML dinámico).
function box(node) {
  const el = document.createElement('div');
  const st = el.style;
  st.position = 'absolute';
  st.left = `${node.x}%`;
  st.top = `${node.y}%`;
  if (node.w !== undefined) st.width = `${node.w}%`;
  if (node.h !== undefined) st.height = `${node.h}%`;
  if (node.text) {
    el.textContent = node.text;
    st.fontSize = '14px';
    st.fontWeight = '600';
    st.color = node.color || '#CBD5E1';
    return el;
  }
  if (node.frame) {
    el.className = 'fr';
    if (node.bg) st.background = node.bg;
    if (node.r) st.borderRadius = `${node.r}px`;
    if (node.ring) st.boxShadow = '0 0 0 4px #070B16';
    if (node.bar !== false) {
      const bar = document.createElement('div');
      bar.className = 'bar';
      if (node.barBg) bar.style.background = node.barBg;
      el.append(bar);
    }
  } else {
    st.background = node.bg;
    if (node.r) st.borderRadius = `${node.r}px`;
    if (node.clip === 'iso') st.clipPath = 'polygon(36% 0, 100% 0, 64% 100%, 0 100%)';
    if (node.clip === 'tri') st.clipPath = 'polygon(0 0, 100% 50%, 0 100%)';
    if (node.glow) st.boxShadow = '0 0 0 6px rgba(37, 99, 235, .3)';
  }
  (node.children || []).forEach((c) => el.append(box(c)));
  return el;
}

export function initServices() {
  const group = document.querySelector('[data-svcs]');
  const panel = document.querySelector('[data-svc-panel]');
  if (!group || !panel) return;
  const prev = panel.querySelector('[data-prev]');
  const res = panel.querySelector('[data-s="res"]');
  const ben = panel.querySelector('[data-s="ben"]');
  const buttons = [...group.querySelectorAll('[data-svc]')];

  const views = new Map();
  for (const [id, s] of Object.entries(SERVICES)) {
    const pv = document.createElement('div');
    pv.className = 'pv';
    s.nodes.forEach((n) => pv.append(box(n)));
    prev.append(pv);
    views.set(id, pv);
  }
  const show = (id) => {
    views.forEach((pv, key) => pv.classList.toggle('on', key === id));
    res.textContent = SERVICES[id].res;
    ben.textContent = SERVICES[id].ben;
  };
  show('medida');
  buttons.forEach((b) => b.addEventListener('click', () => { pressOnly(buttons, b); show(b.dataset.svc); }));
}

export function initProjects() {
  const group = document.querySelector('[data-filters]');
  const grid = document.querySelector('[data-grid]');
  if (!group || !grid) return;
  const buttons = [...group.querySelectorAll('[data-f]')];
  const cards = [...grid.querySelectorAll('[data-kind]')];
  buttons.forEach((b) => b.addEventListener('click', () => {
    const f = b.dataset.f;
    pressOnly(buttons, b);
    grid.classList.toggle('all', f === 'todos');
    cards.forEach((c) => { c.hidden = f !== 'todos' && c.dataset.kind !== f; });
  }));
}

export function initCompare() {
  const group = document.querySelector('[data-cmp-opts]');
  const boxEl = document.querySelector('[data-cmp-box]');
  if (!group || !boxEl) return;
  const buttons = [...group.querySelectorAll('[data-cmp]')];
  const states = { gen: boxEl.querySelector('.st-gen'), est: boxEl.querySelector('.st-est') };
  const set = (v) => {
    boxEl.classList.toggle('c-gen', v === 'gen');
    boxEl.classList.toggle('c-est', v === 'est');
    states.gen.setAttribute('aria-hidden', String(v !== 'gen'));
    states.est.setAttribute('aria-hidden', String(v !== 'est'));
  };
  set('est');
  buttons.forEach((b) => b.addEventListener('click', () => { pressOnly(buttons, b); set(b.dataset.cmp); }));
}
