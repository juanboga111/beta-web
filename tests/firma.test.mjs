import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { SITE } from '../site/assets/js/config.js';

const dir = new URL('../componentes/firma-beta/', import.meta.url);
const read = (f) => readFileSync(new URL(f, dir), 'utf8');
const snippet = read('firma-beta.html');
const anchors = (html) => html.match(/<a class="firma-beta"[\s\S]*?<\/a>/g) || [];
const body = (a) => a.replace(/^<a [^>]*>/, '');

test('la firma enlaza al Instagram de beta en pestaña nueva, con <a> semántico', () => {
  const [a] = anchors(snippet);
  assert.ok(a, 'hay un <a class="firma-beta">');
  assert.match(a, /href="https:\/\/www\.instagram\.com\/betadesarrollo\/"/);
  assert.match(a, /target="_blank"/);
  assert.match(a, /rel="noopener noreferrer"/);
  assert.equal(SITE.instagram, 'https://www.instagram.com/betadesarrollo/', 'mismo destino que config.js del sitio');
});

test('el nombre accesible incluye el texto visible y avisa la pestaña nueva', () => {
  assert.match(snippet, /class="firma-beta__sr">Diseñado y desarrollado por beta\. Instagram de beta, se abre en una pestaña nueva\.</);
  assert.match(snippet, /class="firma-beta__leyenda" aria-hidden="true">Diseñado y desarrollado por</);
});

test('sin estilos en línea ni scripts (compatible con CSP estrictas)', () => {
  assert.doesNotMatch(snippet, /style=|<script|on[a-z]+=/i);
  assert.doesNotMatch(read('firma-beta.css'), /@import|url\(/);
});

test('las copias de la demo son idénticas al fragmento (solo cambian los data-*)', () => {
  const demo = anchors(read('demo.html'));
  assert.equal(demo.length, 5);
  for (const a of demo) {
    assert.equal(body(a), body(anchors(snippet)[0]));
    assert.match(a, /^<a class="firma-beta"( data-(tema|tamano|alinear)="[a-z]+")* href="https:\/\/www\.instagram\.com\/betadesarrollo\/" target="_blank" rel="noopener noreferrer">/);
  }
});
