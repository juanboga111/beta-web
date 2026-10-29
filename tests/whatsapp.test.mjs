import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildWhatsAppUrl, buildConsultSummary, normalizePhone } from '../site/assets/js/whatsapp.js';
import { QUESTIONS } from '../site/assets/js/data.js';

test('normalizePhone deja solo dígitos', () => {
  assert.equal(normalizePhone('+54 9 343 000-0000'), '5493430000000');
  assert.equal(normalizePhone(undefined), '');
});

test('buildWhatsAppUrl sin número abre WhatsApp sin destinatario', () => {
  assert.equal(buildWhatsAppUrl('', 'Hola'), 'https://wa.me/?text=Hola');
  assert.equal(buildWhatsAppUrl('123', 'Hola'), 'https://wa.me/?text=Hola');
});

test('buildWhatsAppUrl con número y texto codificado', () => {
  const url = buildWhatsAppUrl('+54 9 343 000-0000', 'Hola beta, ¿cómo va? 50% & más');
  assert.equal(url, 'https://wa.me/5493430000000?text=' + encodeURIComponent('Hola beta, ¿cómo va? 50% & más'));
  assert.ok(!url.includes(' '));
});

test('buildWhatsAppUrl sin texto no agrega parámetro', () => {
  assert.equal(buildWhatsAppUrl('5493430000000', '  '), 'https://wa.me/5493430000000');
});

test('buildConsultSummary usa "Sin indicar" para respuestas faltantes', () => {
  const text = buildConsultSummary(QUESTIONS, { tipo: 'Tienda online', obj: 'Vender online' });
  assert.equal(
    text,
    'Hola beta, quiero hacer una consulta. Proyecto: Tienda online. Punto de partida: Sin indicar. Objetivo: Vender online. Presupuesto: Sin indicar.'
  );
});

test('las preguntas son cuatro y solo el presupuesto es opcional', () => {
  assert.equal(QUESTIONS.length, 4);
  assert.deepEqual(QUESTIONS.filter((q) => q.optional).map((q) => q.key), ['pres']);
});
