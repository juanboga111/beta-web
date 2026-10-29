// Punto de entrada: activa cada módulo por separado para que una falla no rompa el resto.
import { initNav } from './nav.js';
import { initHeroLayers, initProcess, initFinal3D } from './layers.js';
import { initDemo, initServices, initProjects, initCompare } from './sections.js';
import { initConsult, initWhatsAppLinks } from './consult.js';

document.documentElement.classList.replace('no-js', 'js');

const modules = { initNav, initHeroLayers, initDemo, initServices, initProjects, initProcess, initCompare, initConsult, initWhatsAppLinks, initFinal3D };
for (const [name, init] of Object.entries(modules)) {
  try { init(); } catch (err) { console.error(`[beta] ${name} falló`, err); }
}
