// Pruebas de interacción en un navegador real (Chromium vía Playwright). Por defecto corren contra el sitio
// servido en local con los headers de producción (scripts/serve.mjs). No son parte de `npm test` porque
// necesitan Playwright y Chromium.
//   npm run test:browser
//   BASE_URL=https://<preview>.vercel.app VERCEL_SHARE=<token> npm run test:browser   (preview protegida)
// Variables: PLAYWRIGHT_CHROMIUM (ruta del ejecutable, opcional), SHOTS=carpeta para guardar capturas.
// VERCEL_SHARE es el valor de ?_vercel_share= del link "Share" de Vercel: no se guarda en el repo.
import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { spawn } from 'node:child_process';
import { mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const REMOTE = process.env.BASE_URL ? process.env.BASE_URL.replace(/\/?$/, '/') : '';
const PORT = 4400 + Math.floor(Math.random() * 400);
const BASE = REMOTE || `http://localhost:${PORT}/`;
const SHOTS = process.env.SHOTS;
if (SHOTS) mkdirSync(SHOTS, { recursive: true });

let server; let browser; let cookies = [];
before(async () => {
  if (!REMOTE) {
    server = spawn(process.execPath, [fileURLToPath(new URL('../../scripts/serve.mjs', import.meta.url)), String(PORT)], { stdio: 'pipe' });
    await new Promise((ok, fail) => { server.stdout.once('data', ok); server.once('exit', fail); });
  }
  browser = await chromium.launch(process.env.PLAYWRIGHT_CHROMIUM ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM } : {});
  if (REMOTE && process.env.VERCEL_SHARE) {
    // El link de compartir deja una cookie que habilita la preview; se reutiliza en cada contexto.
    const ctx = await browser.newContext();
    await (await ctx.newPage()).goto(`${BASE}?_vercel_share=${encodeURIComponent(process.env.VERCEL_SHARE)}`);
    cookies = await ctx.cookies();
    await ctx.close();
  }
});
after(async () => { await browser?.close(); server?.kill(); });

/** Abre la página y junta errores de consola, de página y violaciones de CSP. */
async function open(opts = {}, path = '') {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, ...opts });
  if (cookies.length) await ctx.addCookies(cookies);
  const page = await ctx.newPage();
  const errors = [];
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', (e) => errors.push(e.message));
  const res = await page.goto(BASE + path, { waitUntil: 'load' });
  assert.equal(res.status(), 200, `la página responde 200 (${page.url()})`);
  return { ctx, page, errors };
}
const pressed = (loc) => loc.getAttribute('aria-pressed');
const shot = async (page, name, loc) => { if (SHOTS) await (loc || page).screenshot({ path: `${SHOTS}/${name}.png` }); };

/** Caja de cada etiqueta y capa del hero, relativa al escenario. */
const sceneBoxes = (page) => page.evaluate(() => {
  const st = document.querySelector('[data-stage]').getBoundingClientRect();
  const rel = (el) => { const b = el.getBoundingClientRect(); return { l: b.left - st.left, t: b.top - st.top, r: b.right - st.left, b: b.bottom - st.top, visible: getComputedStyle(el).display !== 'none' }; };
  return { w: st.width, h: st.height, tags: [...document.querySelectorAll('[data-stage] .tag')].map(rel), layers: [...document.querySelectorAll('[data-stage] .ly')].map(rel), legend: rel(document.querySelector('[data-stage] .legend')) };
});

for (const width of [1440, 1280, 768, 390]) {
  test(`${width}px: sin errores, sin scroll horizontal y despiece completo dentro del escenario`, async () => {
    const mobile = width <= 640;
    const { ctx, page, errors } = await open({ viewport: { width, height: 900 }, hasTouch: mobile, isMobile: mobile });
    await page.waitForTimeout(1400); // separada (secuencia de carga) y con las transiciones terminadas
    assert.ok(await page.locator('[data-layers]').evaluate((n) => n.classList.contains('ex')), 'llega separada');
    const box = await sceneBoxes(page);
    for (const ly of box.layers) assert.ok(ly.t >= 0 && ly.b <= box.h && ly.l >= -8 && ly.r <= box.w + 8, `capa dentro del escenario ${JSON.stringify(ly)}`);
    if (mobile) {
      assert.ok(box.legend.visible && box.legend.r <= box.w, 'leyenda plana en teléfono');
    } else {
      for (const t of box.tags) assert.ok(t.t >= 0 && t.b <= box.h && t.l >= 0 && t.r <= box.w, `etiqueta dentro del escenario ${JSON.stringify(t)}`);
    }
    await shot(page, `${width}-hero-separada`, page.locator('[data-stage]'));
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    assert.equal(overflow, 0, 'sin desplazamiento horizontal');
    await page.waitForTimeout(1600);
    assert.ok(!(await page.locator('[data-layers]').evaluate((n) => n.classList.contains('ex'))), 'se arma sola a los 1,9 s');
    await shot(page, `${width}-hero-armada`, page.locator('[data-stage]'));
    if (SHOTS) await page.screenshot({ path: `${SHOTS}/${width}-pagina.png`, fullPage: true });
    assert.deepEqual(errors, []);
    await ctx.close();
  });
}

test('despiece: cursor, salida, fijado y teclado', async () => {
  const { ctx, page } = await open();
  const layers = page.locator('[data-layers]');
  const pin = page.locator('[data-pin]');
  const isEx = () => layers.evaluate((n) => n.classList.contains('ex'));
  await page.mouse.move(5, 5);
  await page.waitForTimeout(2000);
  assert.equal(await isEx(), false);
  const st = await page.locator('[data-stage]').boundingBox();
  await page.mouse.move(st.x + st.width / 2, st.y + st.height / 2);
  assert.equal(await isEx(), true, 'se separa al entrar el cursor');
  await page.mouse.move(st.x + st.width / 2, st.y - 60);
  assert.equal(await isEx(), false, 'se arma al salir');
  // Entrada y salida rápidas: la transición se invierte, sin quedar a mitad de camino.
  for (let i = 0; i < 4; i++) { await page.mouse.move(st.x + 50, st.y + 50); await page.mouse.move(st.x + 50, st.y - 40); }
  assert.equal(await isEx(), false);
  await pin.focus();
  await page.keyboard.press('Enter');
  assert.equal(await pressed(pin), 'true');
  assert.equal(await pin.textContent(), 'Armar de nuevo');
  assert.equal(await isEx(), true);
  const st2 = await page.locator('[data-stage]').boundingBox(); // el foco pudo desplazar la página
  await page.mouse.move(st2.x + 100, st2.y + 100); await page.mouse.move(5, st2.y + 100);
  assert.equal(await isEx(), true, 'fijada no se arma al salir');
  await page.keyboard.press('Space');
  assert.equal(await pressed(pin), 'false');
  assert.equal(await isEx(), false);
  // Inclinación independiente de la rotación isométrica, y luz de la grilla siguiendo el cursor.
  await page.mouse.move(st2.x + st2.width * 0.9, st2.y + st2.height * 0.2);
  await page.waitForTimeout(600);
  const tilt = await page.locator('[data-tilt]').evaluate((n) => n.style.transform);
  assert.match(tilt, /rotateX\(-?\d/);
  assert.equal(await page.locator('[data-layers]').evaluate((n) => getComputedStyle(n).transform === 'none'), false);
  assert.match(await page.locator('[data-stage]').evaluate((n) => n.style.getPropertyValue('--mx')), /^9\d/);
  await ctx.close();
});

test('header: estado con scroll, progreso, sección activa', async () => {
  const { ctx, page } = await open();
  assert.equal(await page.locator('[data-header]').evaluate((n) => n.classList.contains('on')), false);
  await page.locator('#servicios').scrollIntoViewIfNeeded();
  await page.evaluate(() => window.scrollTo(0, document.getElementById('servicios').offsetTop + 200));
  await page.waitForTimeout(500);
  assert.equal(await page.locator('[data-header]').evaluate((n) => n.classList.contains('on')), true);
  assert.notEqual(await page.locator('[data-progress]').evaluate((n) => n.style.transform), 'scaleX(0.0000)');
  assert.equal(await page.locator('.hd-links a[href="#servicios"]').getAttribute('aria-current'), 'true');
  await ctx.close();
});

test('demo: los seis rubros cambian composición, paleta y textos', async () => {
  const { ctx, page } = await open();
  const cats = { empresa: ['Estudio Norte', 'l-split'], ecommerce: ['Kiosko Verde', 'l-grid'], personal: ['Sofía R.', 'l-center'], startup: ['Nodo', 'l-center'], gastro: ['Fermento', 'l-grid'], industria: ['Obra Sur', 'l-rev'] };
  let lastBg = '';
  for (const [id, [brand, lay]] of Object.entries(cats).reverse()) {
    const b = page.locator(`[data-cat="${id}"]`);
    await b.click();
    await page.waitForTimeout(700);
    assert.equal(await pressed(b), 'true');
    assert.equal(await page.locator('[data-mock] [data-d="brand"]').textContent(), brand);
    const cls = await page.locator('[data-mock]').getAttribute('class');
    assert.ok(cls.includes(`d-${id}`) && cls.includes(lay) && !cls.includes(' sw'), cls);
    assert.equal(cls.split(' ').filter((c) => c.startsWith('l-')).length, 1, 'una sola composición');
    assert.ok((await page.locator('[data-side]').getAttribute('class')).includes(`d-${id}`));
    const bg = await page.locator('.side .s1').evaluate((n) => getComputedStyle(n).backgroundColor);
    assert.notEqual(bg, lastBg); lastBg = bg;
    assert.equal(await page.locator('.chips[data-cats] [aria-pressed="true"]').count(), 1);
  }
  await ctx.close();
});

test('servicios: una vista previa por vez y textos del servicio elegido', async () => {
  const { ctx, page } = await open();
  const ids = ['medida', 'responsive', 'tienda', 'landing', 'rediseno', 'consultoria'];
  const seen = new Set();
  for (const [i, id] of ids.entries()) {
    await page.locator(`[data-svc="${id}"]`).click();
    assert.equal(await page.locator('.pv.on').count(), 1);
    assert.equal(await page.locator('.pv').nth(i).evaluate((n) => n.classList.contains('on')), true);
    const res = await page.locator('[data-s="res"]').textContent();
    assert.ok(res && !seen.has(res)); seen.add(res);
    assert.equal(await page.locator('[data-svcs] [aria-pressed="true"]').count(), 1);
  }
  await ctx.close();
});

test('proyectos: filtros, trabajos reales, conceptos rotulados y enlaces', async () => {
  const { ctx, page } = await open();
  const visible = () => page.locator('[data-grid] .pc:visible').count();
  assert.equal(await visible(), 5);
  for (const [f, n] of [['sitio', 2], ['tienda', 2], ['landing', 1], ['todos', 5]]) {
    await page.locator(`[data-f="${f}"]`).click();
    assert.equal(await visible(), n, f);
  }
  // Conceptos: siguen rotulados y llevan a la consulta.
  const concepts = page.locator('[data-grid] a.pc');
  assert.equal(await concepts.count(), 3);
  for (const label of await concepts.locator('.pc-t span').allTextContents()) assert.match(label, /^Concepto · /);
  assert.equal(await page.locator('[data-grid] a.pc:not([href="#consulta"])').count(), 0);
  // Bogado: trabajo real publicado con "Ver sitio" en pestaña nueva.
  const bogado = page.locator('[data-grid] .pc-bogado');
  assert.equal(await bogado.locator('.pc-t span').textContent(), 'Trabajo real · Sitio institucional · Publicado');
  const ver = bogado.getByRole('link', { name: /^Ver sitio/ });
  assert.equal(await ver.getAttribute('href'), 'https://bogadoservicios.com.ar');
  assert.equal(await ver.getAttribute('target'), '_blank');
  assert.equal(await ver.getAttribute('rel'), 'noopener noreferrer');
  await page.locator('[data-f="landing"]').focus();
  await page.keyboard.press('Tab'); // con teclado: el primer foco de la grilla es "Ver sitio"
  assert.equal(await page.evaluate(() => document.activeElement.classList.contains('pc-link')), true);
  assert.equal(await page.evaluate(() => getComputedStyle(document.activeElement).outlineStyle), 'solid', 'foco visible');
  // Capturas reales del sitio publicado: cargan con medidas reservadas.
  await bogado.scrollIntoViewIfNeeded();
  await page.waitForFunction(() => [...document.querySelectorAll('.pc-bogado img')].every((i) => i.complete && i.naturalWidth > 0));
  assert.deepEqual(await bogado.locator('img').evaluateAll((is) => is.map((i) => [i.getAttribute('width'), i.getAttribute('height'), i.alt])), [['1200', '750', ''], ['360', '720', '']]);
  // Cimbra: real, en desarrollo, sin enlace externo ni rótulo de publicado.
  const cimbra = page.locator('[data-grid] .pc-cimbra');
  assert.equal(await cimbra.locator('.pc-t span').textContent(), 'Trabajo real · Sitio · En desarrollo');
  assert.equal(await cimbra.locator('a').count(), 0);
  assert.doesNotMatch(await cimbra.textContent(), /Sitio publicado|Ver sitio/);
  // Ningún trabajo real queda rotulado como concepto.
  for (const t of await page.locator('[data-grid] .pc-real .pc-t span').allTextContents()) assert.doesNotMatch(t, /Concepto/);
  await ctx.close();
});

for (const width of [1440, 768, 390]) {
  test(`${width}px: tarjetas reales del portfolio sin cortes ni superposiciones`, async () => {
    const { ctx, page } = await open({ viewport: { width, height: 900 }, hasTouch: width < 700, isMobile: width < 700 });
    const r = await page.evaluate(() => [...document.querySelectorAll('.pc-real')].map((c) => {
      const box = c.getBoundingClientRect();
      const inside = [...c.querySelectorAll('.pc-t, p, .pc-link')].every((n) => { const b = n.getBoundingClientRect(); return b.left >= box.left - 1 && b.right <= box.right + 1; });
      const mock = c.querySelector('.pc-m').getBoundingClientRect();
      const state = c.querySelector('.pc-state');
      if (!state) return { inside, stateInMock: true, noOverlap: true }; // tarjeta con captura real
      const st = state.getBoundingClientRect();
      const ttl = c.querySelector('.bar span').getBoundingClientRect();
      const noOverlap = st.top >= ttl.bottom || st.bottom <= ttl.top || st.left >= ttl.right || st.right <= ttl.left;
      return { inside, stateInMock: st.top >= mock.top && st.bottom <= mock.bottom && st.right <= mock.right, noOverlap };
    }));
    for (const x of r) assert.deepEqual(x, { inside: true, stateInMock: true, noOverlap: true });
    if (process.env.SHOTS) await page.locator('[data-grid]').screenshot({ path: `${process.env.SHOTS}/${width}-portfolio.png` });
    await ctx.close();
  });
}

test('consulta: presupuesto sin rangos confirmados ofrece "Prefiero hablarlo" o saltar', async () => {
  const { ctx, page } = await open();
  const card = page.locator('[data-consult-ui]');
  for (const o of ['Landing page', 'Empiezo de cero', 'Más consultas']) { await card.getByRole('button', { name: o }).click(); await page.waitForTimeout(400); }
  assert.equal(await page.locator('[data-c-lbl]').textContent(), 'Paso 4 de 4');
  assert.deepEqual(await card.locator('.opt').allTextContents(), ['Prefiero hablarlo']);
  assert.equal(await card.locator('text=/\\[RANGO/').count(), 0);
  await card.getByRole('button', { name: 'Saltar' }).click();
  assert.equal(await card.locator('.sum .v').last().textContent(), 'Sin indicar');
  await ctx.close();
});

test('proceso: capas por etapa y "Online" solo en la 4', async () => {
  const { ctx, page } = await open();
  const stage = page.locator('[data-pstage]');
  const visibleLayers = () => stage.locator('.ly').evaluateAll((ls) => ls.map((l) => getComputedStyle(l).opacity === '1'));
  const online = () => stage.locator('.online').evaluate((n) => getComputedStyle(n).opacity);
  await stage.scrollIntoViewIfNeeded();
  for (let i = 0; i < 4; i++) {
    await page.locator(`[data-step="${i}"]`).click();
    await page.waitForTimeout(1100);
    assert.deepEqual(await visibleLayers(), [0, 1, 2, 3].map((j) => j <= i), `etapa ${i + 1}`);
    assert.equal(await online(), i === 3 ? '1' : '0');
    assert.equal(await page.locator('[data-step-lbl]').textContent(), `Etapa ${i + 1} de 4`);
    await shot(page, `proceso-etapa-${i + 1}`, stage);
  }
  assert.equal(await page.locator('[data-next-step]').textContent(), 'Volver al inicio');
  await page.locator('[data-next-step]').click();
  assert.equal(await pressed(page.locator('[data-step="0"]')), 'true');
  await ctx.close();
});

test('comparación: alterna entre genérica y estratégica', async () => {
  const { ctx, page } = await open();
  const box = page.locator('[data-cmp-box]');
  await page.locator('[data-cmp="gen"]').click();
  await page.waitForTimeout(800);
  assert.equal(await box.locator('.st-gen').evaluate((n) => getComputedStyle(n).opacity), '1');
  assert.equal(await box.locator('.st-est').evaluate((n) => getComputedStyle(n).opacity), '0');
  assert.equal(await box.locator('.st-est').getAttribute('aria-hidden'), 'true');
  await page.locator('[data-cmp="est"]').click();
  await page.waitForTimeout(800);
  assert.equal(await box.locator('.st-est').evaluate((n) => getComputedStyle(n).opacity), '1');
  await ctx.close();
});

test('consulta: avance automático, atrás, saltar, resumen, cambiar, copiar y WhatsApp de beta', async () => {
  const { ctx, page } = await open({ permissions: ['clipboard-read', 'clipboard-write'] });
  const card = page.locator('[data-consult-ui]');
  const next = card.getByRole('button', { name: 'Siguiente' });
  await card.scrollIntoViewIfNeeded();
  assert.equal(await card.getByRole('button', { name: 'Atrás' }).isDisabled(), true);
  assert.equal(await next.isDisabled(), true, 'Siguiente desactivado sin respuesta');
  await card.getByRole('button', { name: 'Tienda online' }).click();
  await page.waitForTimeout(450);
  assert.equal(await page.locator('[data-c-lbl]').textContent(), 'Paso 2 de 4', 'avanza solo');
  await card.getByRole('button', { name: 'Atrás' }).click();
  assert.equal(await pressed(card.getByRole('button', { name: 'Tienda online' })), 'true', 'conserva la respuesta');
  await card.getByRole('button', { name: 'Siguiente' }).click();
  await card.getByRole('button', { name: 'Quiero renovar mi web' }).click();
  await page.waitForTimeout(450);
  await card.getByRole('button', { name: 'Vender online' }).click();
  await page.waitForTimeout(450);
  assert.equal(await page.locator('[data-c-lbl]').textContent(), 'Paso 4 de 4');
  await card.getByRole('button', { name: 'Saltar' }).click();
  assert.equal(await page.locator('[data-c-lbl]').textContent(), 'Resumen');
  const values = await card.locator('.sum .v').allTextContents();
  assert.deepEqual(values, ['Tienda online', 'Quiero renovar mi web', 'Vender online', 'Sin indicar']);
  await card.getByRole('button', { name: 'Cambiar objetivo' }).click();
  assert.equal(await page.locator('[data-c-lbl]').textContent(), 'Paso 3 de 4');
  await card.getByRole('button', { name: 'Más consultas' }).click();
  await page.waitForTimeout(450);
  await card.getByRole('button', { name: 'Prefiero hablarlo' }).click();
  await page.waitForTimeout(450);
  await shot(page, 'consulta-resumen', page.locator('[data-consult]'));
  const wa = new URL(await card.getByRole('link', { name: 'Continuar por WhatsApp' }).getAttribute('href'));
  assert.equal(wa.origin + wa.pathname, 'https://wa.me/5493434286906');
  assert.equal(wa.searchParams.get('text'), 'Hola beta, quiero hacer una consulta. Proyecto: Tienda online. Punto de partida: Quiero renovar mi web. Objetivo: Más consultas. Presupuesto: Prefiero hablarlo.');
  assert.match(await card.locator('.honest').textContent(), /Todavía no se envió nada/);
  await card.getByRole('button', { name: 'Copiar resumen' }).click();
  await page.waitForTimeout(100);
  assert.equal(await card.locator('.status').textContent(), 'Resumen copiado al portapapeles.');
  assert.equal(await card.getByRole('button', { name: 'Copiado' }).count(), 1);
  assert.equal(await page.evaluate(() => navigator.clipboard.readText()),
    'Hola beta, quiero hacer una consulta. Proyecto: Tienda online. Punto de partida: Quiero renovar mi web. Objetivo: Más consultas. Presupuesto: Prefiero hablarlo.');
  await page.waitForTimeout(1700);
  assert.equal(await card.getByRole('button', { name: 'Copiar resumen' }).count(), 1, 'vuelve a "Copiar resumen" a los 1,6 s');
  await ctx.close();
});

test('consulta: si el portapapeles falla, lo avisa y muestra el texto', async () => {
  const { ctx, page } = await open();
  await page.evaluate(() => { Object.defineProperty(navigator, 'clipboard', { value: { writeText: () => Promise.reject(new Error('bloqueado')) } }); });
  const card = page.locator('[data-consult-ui]');
  for (const o of ['Landing page', 'Empiezo de cero', 'Más consultas']) { await card.getByRole('button', { name: o }).click(); await page.waitForTimeout(400); }
  await card.getByRole('button', { name: 'Saltar' }).click();
  await card.getByRole('button', { name: 'Copiar resumen' }).click();
  await page.waitForTimeout(100);
  assert.match(await card.locator('[role="status"]').textContent(), /No se pudo copiar/);
  assert.match(await card.locator('.manual').textContent(), /^Hola beta, quiero hacer una consulta\. Proyecto: Landing page\./);
  await ctx.close();
});

test('consulta: sin número configurado no hay enlace sin destinatario; con uno de prueba lo arma', async () => {
  const { ctx, page } = await open();
  const fakeConfig = (whatsapp) => `export const SITE = { whatsapp: ${JSON.stringify(whatsapp)}, email: '' }; export const primaryWhatsApp = (s = SITE) => [].concat(s.whatsapp || [])[0] || '';`;
  await page.route('**/assets/js/config.js', (r) => r.fulfill({ contentType: 'text/javascript', body: fakeConfig([]) }));
  await page.reload();
  const c0 = page.locator('[data-consult-ui]');
  for (const o of ['Sitio institucional', 'Empiezo de cero', 'Mejorar mi imagen']) { await c0.getByRole('button', { name: o }).click(); await page.waitForTimeout(400); }
  await c0.getByRole('button', { name: 'Saltar' }).click();
  assert.equal(await c0.locator('a[href*="wa.me"]').count(), 0);
  assert.equal(await c0.getByRole('button', { name: 'Copiar resumen' }).getAttribute('class'), 'btn btn-pri btn-big');
  assert.equal(await page.locator('.final [data-wa-link]').getAttribute('href'), '#consulta');
  // Número de prueba controlado (no es el de beta).
  await page.unroute('**/assets/js/config.js');
  await page.route('**/assets/js/config.js', (r) => r.fulfill({ contentType: 'text/javascript', body: fakeConfig(['5491100000000']) }));
  await page.reload();
  const card = page.locator('[data-consult-ui]');
  for (const o of ['Sitio institucional', 'Empiezo de cero', 'Mejorar mi imagen']) { await card.getByRole('button', { name: o }).click(); await page.waitForTimeout(400); }
  await card.getByRole('button', { name: 'Saltar' }).click();
  const href = await card.getByRole('link', { name: 'Continuar por WhatsApp' }).getAttribute('href');
  const url = new URL(href);
  assert.equal(url.origin + url.pathname, 'https://wa.me/5491100000000');
  assert.equal(url.searchParams.get('text'), 'Hola beta, quiero hacer una consulta. Proyecto: Sitio institucional. Punto de partida: Empiezo de cero. Objetivo: Mejorar mi imagen. Presupuesto: Sin indicar.');
  assert.equal(await card.getByRole('link', { name: 'Continuar por WhatsApp' }).getAttribute('rel'), 'noopener noreferrer');
  assert.match(await page.locator('[data-wa-link]').getAttribute('href'), /^https:\/\/wa\.me\/5491100000000\?text=/);
  await ctx.close();
});

test('teléfono: menú accesible (abre, Escape, tocar afuera, tocar enlace) y texto táctil', async () => {
  const { ctx, page } = await open({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });
  const burger = page.locator('[data-burger]');
  await burger.tap();
  assert.equal(await burger.getAttribute('aria-expanded'), 'true');
  assert.equal(await page.evaluate(() => document.activeElement?.getAttribute('href')), '#demo', 'el foco va al panel');
  await page.keyboard.press('Escape');
  assert.equal(await burger.getAttribute('aria-expanded'), 'false');
  assert.equal(await page.evaluate(() => document.activeElement?.hasAttribute('data-burger')), true, 'el foco vuelve al botón');
  await burger.tap();
  await page.touchscreen.tap(200, 700);
  assert.equal(await burger.getAttribute('aria-expanded'), 'false', 'se cierra tocando afuera');
  await burger.tap();
  await page.locator('#menu a[href="#proceso"]').tap();
  assert.equal(await burger.getAttribute('aria-expanded'), 'false');
  assert.equal(await page.locator('.hint-touch').isVisible(), true);
  assert.equal(await page.locator('.hint-pointer').isVisible(), false);
  await page.locator('[data-pin]').tap();
  assert.equal(await pressed(page.locator('[data-pin]')), 'true', 'en táctil el despiece funciona con el botón');
  await ctx.close();
});

test('sin JavaScript: contenido completo, escena separada y WhatsApp directo', async () => {
  const { ctx, page } = await open({ javaScriptEnabled: false });
  assert.equal(await page.locator('[data-layers]').evaluate((n) => n.classList.contains('ex')), true);
  assert.equal(await page.locator('.js-only:visible').count(), 0);
  assert.equal(await page.locator('.svc-desc:visible').count(), 6);
  assert.equal(await page.locator('.step span:visible').count(), 4);
  assert.equal(await page.locator('.card-nojs').isVisible(), true);
  assert.match(await page.locator('.card-nojs a').getAttribute('href'), /^https:\/\/wa\.me\/5493434286906\?text=/);
  for (const h of await page.locator('a[href*="wa.me"]').evaluateAll((as) => as.map((a) => a.href))) assert.match(h, /^https:\/\/wa\.me\/\d{8,15}\?text=/);
  await shot(page, 'sin-js', page.locator('[data-stage]'));
  await ctx.close();
});

test('movimiento reducido: separada y fijada, sin inclinación ni animaciones', async () => {
  const { ctx, page, errors } = await open({ reducedMotion: 'reduce' });
  await page.waitForTimeout(2300);
  assert.equal(await page.locator('[data-layers]').evaluate((n) => n.classList.contains('ex')), true, 'no se arma sola');
  assert.equal(await pressed(page.locator('[data-pin]')), 'true');
  for (const op of await page.locator('[data-stage] .tag').evaluateAll((t) => t.map((n) => getComputedStyle(n).opacity))) assert.equal(op, '1');
  const st = await page.locator('[data-stage]').boundingBox();
  await page.mouse.move(st.x + 100, st.y + 100); await page.waitForTimeout(300);
  assert.equal(await page.locator('[data-tilt]').evaluate((n) => n.style.transform), '');
  assert.equal(await page.locator('.h1 .w > span').first().evaluate((n) => getComputedStyle(n).animationName), 'none');
  await page.locator('[data-pin]').click();
  assert.equal(await page.locator('[data-layers]').evaluate((n) => n.classList.contains('ex')), false, 'se puede armar con el botón');
  assert.deepEqual(errors, []);
  await ctx.close();
});

test('enlaces internos: cada ancla existe y el 404 responde', async () => {
  const { ctx, page } = await open();
  const hrefs = await page.locator('a[href^="#"]').evaluateAll((as) => [...new Set(as.map((a) => a.getAttribute('href')))]);
  for (const h of hrefs) assert.equal(await page.locator(h).count(), 1, h);
  const res = await page.request.get(BASE + 'no-existe');
  assert.equal(res.status(), 404);
  for (const f of ['robots.txt', 'sitemap.xml', 'site.webmanifest', 'favicon.svg', 'og-image.png']) assert.equal((await page.request.get(BASE + f)).status(), 200, f);
  assert.ok((await page.request.get(BASE)).headers()['content-security-policy'].includes("script-src 'self'"));
  await ctx.close();
});
