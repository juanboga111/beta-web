// Copia los datos de contacto de site/assets/js/config.js al HTML: footer, respaldo sin JavaScript
// y datos estructurados. config.js es el único lugar donde se cargan; este script se corre después de cambiarlo:
//   npm run contact              escribe site/index.html
//   npm run contact -- --check   solo verifica (lo usa npm test)
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { SITE } from '../site/assets/js/config.js';
import { buildWhatsAppUrl, isValidWhatsAppNumber, normalizePhone } from '../site/assets/js/whatsapp.js';

const GREETING = 'Hola beta, quiero hacer una consulta.';
const esc = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** "5493434286906" → "+54 9 343 428-6906". Para otros formatos, + y los dígitos. */
export function formatPhone(number) {
  const d = normalizePhone(number);
  // Celular argentino: se asume característica de 3 dígitos fuera de CABA/GBA (11).
  const ar = d.match(/^549(11|\d{3})(\d+)$/);
  if (ar && d.length === 13) { const rest = ar[2]; return `+54 9 ${ar[1]} ${rest.slice(0, -4)}-${rest.slice(-4)}`; }
  return `+${d}`;
}

const validEmail = (e) => (/^[^\s@<>"]+@[^\s@<>"]+\.[^\s@<>"]+$/.test(e || '') ? e : '');
const validUrl = (u) => { try { const x = new URL(u); return x.protocol === 'https:' ? `${x.origin}${x.pathname}` : ''; } catch { return ''; } };

/** Contenido de cada bloque marcado con <!-- contact:NOMBRE --> … <!-- /contact:NOMBRE -->. */
export function contactBlocks(site) {
  const phones = [].concat(site.whatsapp || []).filter(isValidWhatsAppNumber).map(normalizePhone);
  const wa = phones.length ? buildWhatsAppUrl(phones[0], GREETING) : null;
  const email = validEmail(site.email);
  const ig = validUrl(site.instagram);
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'beta',
    url: 'https://beta.ar/',
    logo: 'https://beta.ar/icon-512.png',
    image: 'https://beta.ar/og-image.png',
    description: 'Estudio de diseño y desarrollo web a medida para empresas, comercios y marcas.',
    slogan: 'Ideas que funcionan en el mundo real.',
    areaServed: 'AR',
    knowsLanguage: 'es',
    ...(email && { email }),
    ...(phones.length && { telephone: `+${phones[0]}` }),
    ...(ig && { sameAs: [ig] }),
  };
  return {
    email: email ? `<a href="mailto:${esc(email)}">${esc(email)}</a>` : '<span>[EMAIL]</span>',
    whatsapp: phones.length
      ? phones.map((p) => `<a href="${esc(buildWhatsAppUrl(p, GREETING))}" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp ${formatPhone(p)}">${formatPhone(p)}</a>`).join('\n        ')
      : '<span>[WHATSAPP]</span>',
    instagram: ig ? `<a href="${esc(ig)}" target="_blank" rel="noopener noreferrer">Instagram</a>` : '',
    'nojs-wa': wa
      ? `\n        <p>Escribinos por WhatsApp contándonos qué necesitás, si partís de cero o ya tenés web y qué querés lograr.</p>\n        <a class="btn btn-pri btn-big" href="${esc(wa)}" target="_blank" rel="noopener noreferrer" data-wa-default>Escribinos por WhatsApp</a>\n        `
      : '\n        <p>Contanos qué necesitás, si partís de cero o ya tenés web y qué querés lograr, por los datos de contacto del pie de página.</p>\n        ',
    jsonld: `\n<script type="application/ld+json">\n${JSON.stringify(ld, null, 2)}\n</script>\n`,
  };
}

export function applyContact(html, site) {
  let out = html;
  for (const [name, inner] of Object.entries(contactBlocks(site))) {
    const re = new RegExp(`(<!-- contact:${name}[^>]*-->)[\\s\\S]*?(<!-- /contact:${name} -->)`);
    if (!re.test(out)) throw new Error(`Falta el bloque contact:${name} en index.html`);
    out = out.replace(re, (_, open, close) => open + inner + close);
  }
  return out;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const file = resolve(dirname(fileURLToPath(import.meta.url)), '../site/index.html');
  const html = readFileSync(file, 'utf8');
  const next = applyContact(html, SITE);
  if (process.argv.includes('--check')) {
    if (next !== html) { console.error('index.html no coincide con config.js: correr `npm run contact`.'); process.exit(1); }
    console.log('Contacto sincronizado.');
  } else {
    writeFileSync(file, next);
    console.log(next === html ? 'Sin cambios.' : 'index.html actualizado con los datos de config.js.');
  }
}
