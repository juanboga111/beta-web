// Firma de beta (componentes/firma-beta) en un navegador real: demo con footers de clientes ficticios,
// servida bajo una CSP estricta como la de los sitios de beta. Corre con `npm run test:browser`.
import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { readFileSync } from 'node:fs';
import { extname } from 'node:path';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const DIR = new URL('../../componentes/firma-beta/', import.meta.url);
const ORIGIN = 'https://cliente.test/';
const IG = 'https://www.instagram.com/betadesarrollo/';
const CSP = "default-src 'self'; style-src 'self'; img-src 'self' data:; script-src 'none'; object-src 'none'; base-uri 'self'";
const TYPES = { '.html': 'text/html; charset=utf-8', '.css': 'text/css' };
const SHOTS = process.env.SHOTS;

let browser;
before(async () => { browser = await chromium.launch(process.env.PLAYWRIGHT_CHROMIUM ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM } : {}); });
after(async () => { await browser?.close(); });

async function open(opts = {}) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, ...opts });
  // El sitio de prueba se sirve desde un origen ficticio con CSP; Instagram se responde en local.
  await ctx.route(`${ORIGIN}**`, (r) => {
    const file = new URL(r.request().url()).pathname.slice(1) || 'demo.html';
    r.fulfill({ status: 200, headers: { 'content-security-policy': CSP, 'content-type': TYPES[extname(file)] || 'text/plain' }, body: readFileSync(new URL(file, DIR)) });
  });
  await ctx.route('https://www.instagram.com/**', (r) => r.fulfill({ status: 200, contentType: 'text/html', body: '<title>Instagram</title>' }));
  const page = await ctx.newPage();
  const errors = [];
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto(`${ORIGIN}demo.html`);
  return { ctx, page, errors };
}

/** Contraste WCAG entre dos colores rgb()/rgba() ya compuestos sobre el fondo. */
function contrast(fg, bg) {
  const lum = ([r, g, b]) => { const c = [r, g, b].map((v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }); return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]; };
  const [a, b] = [lum(fg), lum(bg)].sort((x, y) => y - x);
  return (a + 0.05) / (b + 0.05);
}

for (const width of [1440, 1024, 768, 390, 320]) {
  test(`${width}px: sin errores, sin desbordes y sin superponerse con el footer`, async () => {
    const { ctx, page, errors } = await open({ viewport: { width, height: 900 }, isMobile: width < 700, hasTouch: width < 700 });
    const r = await page.evaluate(() => ({
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      firmas: [...document.querySelectorAll('a.firma-beta')].map((a) => {
        const b = a.getBoundingClientRect();
        const base = a.closest('.f-base').getBoundingClientRect();
        const others = [...a.parentElement.children].filter((n) => n !== a).map((n) => n.getBoundingClientRect());
        const overlap = others.some((o) => !(o.right <= b.left || o.left >= b.right || o.bottom <= b.top || o.top >= b.bottom));
        const logo = a.querySelector('.firma-beta__logo').getBoundingClientRect();
        const iso = a.querySelector('.firma-beta__iso').getBoundingClientRect();
        return { inside: b.left >= base.left - 0.5 && b.right <= base.right + 0.5, overlap, ratio: +(logo.width / logo.height).toFixed(2), isoRatio: +(iso.width / iso.height).toFixed(2), logoH: Math.round(logo.height) };
      }),
    }));
    assert.equal(r.overflow, 0);
    for (const f of r.firmas) {
      assert.ok(f.inside && !f.overlap, JSON.stringify(f));
      assert.equal(f.ratio, 2.43, 'proporción del logotipo (viewBox 1850 × 760)');
      assert.ok(Math.abs(f.isoRatio - 1.56) < 0.05, 'proporción del isotipo (270 × 170)');
    }
    assert.deepEqual(r.firmas.map((f) => f.logoH), [13, 13, 13, 16, 11], 'tamaños normal, grande y chico');
    if (SHOTS) await page.screenshot({ path: `${SHOTS}/firma-${width}.png`, fullPage: true });
    assert.deepEqual(errors, [], 'sin errores ni violaciones de CSP');
    await ctx.close();
  });
}

test('toda la firma es un único enlace que abre Instagram en una pestaña nueva', async () => {
  const { ctx, page } = await open();
  const firma = page.locator('a.firma-beta').first();
  assert.equal(await firma.getAttribute('href'), IG);
  assert.equal(await firma.getAttribute('target'), '_blank');
  assert.equal(await firma.getAttribute('rel'), 'noopener noreferrer');
  assert.equal(await firma.evaluate((a) => getComputedStyle(a).cursor), 'pointer');
  // Clic en cada parte: leyenda, isotipo y logotipo abren la misma pestaña nueva.
  for (const part of ['.firma-beta__leyenda', '.firma-beta__iso', '.firma-beta__logo']) {
    const [popup] = await Promise.all([ctx.waitForEvent('page'), firma.locator(part).click()]);
    await popup.waitForLoadState();
    assert.equal(popup.url(), IG, part);
    assert.equal(await popup.evaluate(() => window.opener), null, 'noopener');
    await popup.close();
  }
  assert.equal(page.url(), `${ORIGIN}demo.html`, 'la página del cliente sigue abierta');
  await ctx.close();
});

test('nombre accesible, teclado y foco visible', async () => {
  const { ctx, page } = await open();
  const link = page.getByRole('link', { name: 'Diseñado y desarrollado por beta. Instagram de beta, se abre en una pestaña nueva.' });
  assert.equal(await link.count(), 5);
  await page.locator('.f-base').first().locator('span').first().click(); // punto de partida antes de la firma
  await page.keyboard.press('Tab');
  await page.waitForTimeout(300); // transición de la leyenda
  const focused = await page.evaluate(() => ({ cls: document.activeElement.className, outline: getComputedStyle(document.activeElement).outlineStyle, ley: getComputedStyle(document.activeElement.querySelector('.firma-beta__leyenda')).opacity }));
  assert.deepEqual(focused, { cls: 'firma-beta', outline: 'solid', ley: '1' });
  const [popup] = await Promise.all([ctx.waitForEvent('page'), page.keyboard.press('Enter')]);
  assert.equal(popup.url(), IG);
  await ctx.close();
});

test('hover sutil: no toma los estilos del cliente y separa las piezas del isotipo', async () => {
  const { ctx, page } = await open();
  const firma = page.locator('a.firma-beta').first();
  const before = await firma.evaluate((a) => getComputedStyle(a).color);
  await firma.hover();
  await page.waitForTimeout(350);
  const s = await firma.evaluate((a) => ({
    color: getComputedStyle(a).color, bg: getComputedStyle(a).backgroundColor, deco: getComputedStyle(a).textDecorationLine,
    tt: getComputedStyle(a).textTransform, font: getComputedStyle(a).fontFamily,
    tinta: getComputedStyle(a.querySelector('.firma-beta__pieza--tinta')).transform, ley: getComputedStyle(a.querySelector('.firma-beta__leyenda')).opacity,
  }));
  assert.equal(s.color, before, 'el color no cambia por footer a:hover');
  assert.equal(s.bg, 'rgba(0, 0, 0, 0)');
  assert.equal(s.deco, 'none');
  assert.equal(s.tt, 'none');
  assert.match(s.font, /^Inter/);
  assert.notEqual(s.tinta, 'none', 'las piezas se separan');
  assert.equal(s.ley, '1');
  if (SHOTS) await firma.screenshot({ path: `${SHOTS}/firma-hover.png` });
  await ctx.close();
});

test('movimiento reducido: sin desplazamientos', async () => {
  const { ctx, page } = await open({ reducedMotion: 'reduce' });
  const firma = page.locator('a.firma-beta').first();
  await firma.hover();
  assert.equal(await firma.locator('.firma-beta__pieza--tinta').evaluate((n) => getComputedStyle(n).transform), 'none');
  await ctx.close();
});

test('contraste de la leyenda (AA) y área táctil de 44 px en cada footer', async () => {
  const { ctx, page } = await open({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const rows = await page.evaluate(() => [...document.querySelectorAll('a.firma-beta')].map((a) => {
    const ley = a.querySelector('.firma-beta__leyenda');
    const parse = (c) => c.match(/[\d.]+/g).map(Number);
    const [r, g, b] = parse(getComputedStyle(ley).color);
    const op = +getComputedStyle(ley).opacity;
    const [br, bgc, bb] = parse(getComputedStyle(a.closest('footer')).backgroundColor);
    const fg = [r * op + br * (1 - op), g * op + bgc * (1 - op), b * op + bb * (1 - op)];
    const hit = getComputedStyle(a, '::before');
    const box = a.getBoundingClientRect();
    return { fg, bg: [br, bgc, bb], hitH: box.height - parseFloat(hit.top) - parseFloat(hit.bottom), size: parseFloat(getComputedStyle(ley).fontSize) };
  }));
  for (const row of rows) {
    const c = contrast(row.fg, row.bg);
    assert.ok(c >= 4.5, `contraste ${c.toFixed(2)}:1`);
    assert.ok(row.hitH >= 44, `área táctil ${row.hitH}px`);
    assert.ok(row.size >= 12, `leyenda ${row.size}px`);
  }
  await ctx.close();
});
