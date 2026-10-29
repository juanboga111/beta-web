// Header: cambio con scroll, barra de progreso, sección activa, menú angosto y parallax del fondo.
import { reducedMotion } from './motion.js';

export function initNav() {
  const header = document.querySelector('[data-header]');
  if (!header) return;
  const progress = header.querySelector('[data-progress]');
  const burger = header.querySelector('[data-burger]');
  const menu = header.querySelector('[data-menu]');
  const parallax = [...document.querySelectorAll('[data-parallax]')];
  const reduce = reducedMotion();

  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
      const y = window.scrollY || 0;
      header.classList.toggle('on', y > 24);
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      if (progress) progress.style.transform = `scaleX(${Math.min(1, y / max).toFixed(4)})`;
      if (!reduce && y < window.innerHeight * 1.6) {
        parallax.forEach((el) => { el.style.transform = `translateY(${(y * Number(el.dataset.parallax)).toFixed(1)}px)`; });
      }
    });
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Sección activa
  const links = [...header.querySelectorAll('.lk')];
  const byId = new Map(links.map((a) => [a.getAttribute('href').slice(1), a]));
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      links.forEach((a) => a.removeAttribute('aria-current'));
      const a = byId.get(en.target.id);
      if (a) a.setAttribute('aria-current', 'true');
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  ['inicio', 'demo', 'servicios', 'proyectos', 'proceso', 'porque', 'consulta', 'contacto'].forEach((id) => {
    const el = document.getElementById(id);
    if (el) io.observe(el);
  });

  // Menú para anchos angostos
  if (burger && menu) {
    const setOpen = (open, returnFocus) => {
      header.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', String(open));
      burger.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
      if (open) menu.querySelector('a')?.focus();
      else if (returnFocus) burger.focus();
    };
    burger.addEventListener('click', () => setOpen(!header.classList.contains('open'), false));
    menu.addEventListener('click', (e) => { if (e.target.closest('a')) setOpen(false, false); });
    header.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && header.classList.contains('open')) setOpen(false, true);
    });
    document.addEventListener('click', (e) => {
      if (header.classList.contains('open') && !header.contains(e.target)) setOpen(false, false);
    });
  }
}
