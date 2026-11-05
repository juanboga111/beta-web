import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

// netlify.toml y vercel.json tienen que publicar lo mismo con los mismos headers de seguridad.
const toml = readFileSync(new URL('../netlify.toml', import.meta.url), 'utf8');
const vercel = JSON.parse(readFileSync(new URL('../vercel.json', import.meta.url), 'utf8'));

const netlifyHeaders = toml.split('[[headers]]').slice(1).map((b) => ({
  source: b.match(/for\s*=\s*"([^"]+)"/)[1].replace(/\*$/, '(.*)'),
  headers: [...b.matchAll(/^\s*([A-Za-z-]+)\s*=\s*"(.*)"\s*$/gm)].filter((m) => m[1] !== 'for').map((m) => ({ key: m[1], value: m[2] })),
}));

test('vercel.json sirve site/ sin build', () => {
  assert.equal(vercel.outputDirectory, 'site');
  assert.equal(vercel.buildCommand, '');
  assert.equal(vercel.framework, null);
});

test('vercel.json y netlify.toml usan los mismos headers', () => {
  const bySource = (list) => Object.fromEntries(list.map((h) => [h.source, h.headers]));
  assert.deepEqual(bySource(vercel.headers), bySource(netlifyHeaders));
  // En Vercel gana la última regla que coincide: la de fuentes (inmutable) va después de /assets/.
  const order = vercel.headers.map((h) => h.source);
  assert.ok(order.indexOf('/assets/fonts/(.*)') > order.indexOf('/assets/(.*)'));
  const csp = vercel.headers[0].headers.find((h) => h.key === 'Content-Security-Policy').value;
  assert.match(csp, /script-src 'self'/);
  assert.match(csp, /frame-ancestors 'none'/);
});
