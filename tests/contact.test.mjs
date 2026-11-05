import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { applyContact, formatPhone } from '../scripts/contact.mjs';
import { SITE, primaryWhatsApp } from '../site/assets/js/config.js';
import { isValidWhatsAppNumber } from '../site/assets/js/whatsapp.js';

const html = readFileSync(new URL('../site/index.html', import.meta.url), 'utf8');
const EMPTY = { whatsapp: [], email: '', instagram: '' };

test('config.js: números internacionales válidos, correo e Instagram sin rastreo', () => {
  for (const n of [].concat(SITE.whatsapp)) assert.ok(isValidWhatsAppNumber(n) && /^\d+$/.test(n), n);
  assert.equal(primaryWhatsApp(), '5493434286906');
  assert.match(SITE.email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  assert.ok(!SITE.instagram.includes('?'), 'sin parámetros de rastreo');
});

test('index.html está sincronizado con config.js (npm run contact)', () => {
  assert.equal(applyContact(html, SITE), html);
});

test('todos los enlaces wa.me del HTML tienen destinatario', () => {
  const links = html.match(/https:\/\/wa\.me\/[^"]*/g) || [];
  assert.ok(links.length >= 3);
  for (const l of links) assert.match(l, /^https:\/\/wa\.me\/\d{8,15}\?text=/);
});

test('formatPhone muestra el celular argentino legible', () => {
  assert.equal(formatPhone('5493434286906'), '+54 9 343 428-6906');
  assert.equal(formatPhone('5491123456789'), '+54 9 11 2345-6789');
});

test('sin datos vuelve a los marcadores y no deja enlaces a WhatsApp', () => {
  const out = applyContact(html, EMPTY);
  assert.ok(!out.includes('wa.me'));
  assert.ok(out.includes('[WHATSAPP]') && out.includes('[EMAIL]'));
  assert.ok(!out.includes('instagram.com'));
  assert.equal(applyContact(applyContact(out, SITE), SITE), html, 'ida y vuelta sin pérdidas');
});

test('datos estructurados válidos con contacto', () => {
  const json = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1];
  const ld = JSON.parse(json);
  assert.equal(ld.email, SITE.email);
  assert.equal(ld.telephone, '+5493434286906');
  assert.deepEqual(ld.sameAs, [SITE.instagram]);
});
