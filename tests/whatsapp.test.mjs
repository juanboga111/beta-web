import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildWhatsAppUrl, buildConsultSummary, normalizePhone, isValidWhatsAppNumber } from '../site/assets/js/whatsapp.js';
import { QUESTIONS } from '../site/assets/js/data.js';

// Número de prueba controlado: no es el de beta (que sigue pendiente en config.js).
const TEST_NUMBER = '+54 9 11 0000-0000';

test('normalizePhone deja solo dígitos', () => {
  assert.equal(normalizePhone(TEST_NUMBER), '5491100000000');
  assert.equal(normalizePhone(undefined), '');
});

test('isValidWhatsAppNumber exige formato internacional de 8 a 15 dígitos', () => {
  assert.ok(isValidWhatsAppNumber(TEST_NUMBER));
  assert.ok(!isValidWhatsAppNumber(''));
  assert.ok(!isValidWhatsAppNumber('1234567'));
  assert.ok(!isValidWhatsAppNumber('1234567890123456'));
  assert.ok(!isValidWhatsAppNumber('01130000000'));
});

test('buildWhatsAppUrl sin número válido no arma un enlace sin destinatario', () => {
  assert.equal(buildWhatsAppUrl('', 'Hola'), null);
  assert.equal(buildWhatsAppUrl('123', 'Hola'), null);
  assert.equal(buildWhatsAppUrl(undefined, 'Hola'), null);
});

test('buildWhatsAppUrl con número y texto codificado', () => {
  const text = 'Hola beta, ¿cómo va? 50% & más\nOtra línea';
  const url = buildWhatsAppUrl(TEST_NUMBER, text);
  assert.equal(url, 'https://wa.me/5491100000000?text=' + encodeURIComponent(text));
  assert.match(url, /^https:\/\/wa\.me\/\d+\?text=[^\s]+$/);
  assert.equal(new URL(url).searchParams.get('text'), text);
});

test('buildWhatsAppUrl sin texto no agrega parámetro', () => {
  assert.equal(buildWhatsAppUrl('5491100000000', '  '), 'https://wa.me/5491100000000');
});

test('buildConsultSummary usa "Sin indicar" para respuestas faltantes', () => {
  const text = buildConsultSummary(QUESTIONS, { tipo: 'Tienda online', obj: 'Vender online' });
  assert.equal(
    text,
    'Hola beta, quiero hacer una consulta. Proyecto: Tienda online. Punto de partida: Sin indicar. Objetivo: Vender online. Presupuesto: Sin indicar.'
  );
});

test('buildConsultSummary con las cuatro respuestas', () => {
  const text = buildConsultSummary(QUESTIONS, { tipo: 'Landing page', inicio: 'Empiezo de cero', obj: 'Más consultas', pres: 'Prefiero hablarlo' });
  assert.equal(text, 'Hola beta, quiero hacer una consulta. Proyecto: Landing page. Punto de partida: Empiezo de cero. Objetivo: Más consultas. Presupuesto: Prefiero hablarlo.');
});

test('las preguntas son cuatro y solo el presupuesto es opcional', () => {
  assert.equal(QUESTIONS.length, 4);
  assert.deepEqual(QUESTIONS.filter((q) => q.optional).map((q) => q.key), ['pres']);
});
