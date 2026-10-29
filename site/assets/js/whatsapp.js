// Funciones puras para la consulta y el enlace de WhatsApp. Probadas en tests/whatsapp.test.mjs.

/** Deja solo los dígitos de un número de teléfono. */
export function normalizePhone(number) {
  return String(number ?? '').replace(/\D+/g, '');
}

/**
 * Arma el enlace de WhatsApp. Sin número válido abre WhatsApp para elegir contacto.
 * @param {string} number número internacional (se ignoran espacios, guiones y "+").
 * @param {string} text mensaje prellenado.
 */
export function buildWhatsAppUrl(number, text) {
  const phone = normalizePhone(number);
  const base = phone.length >= 8 ? `https://wa.me/${phone}` : 'https://wa.me/';
  const msg = String(text ?? '').trim();
  return msg ? `${base}?text=${encodeURIComponent(msg)}` : base;
}

/**
 * Texto del resumen de la consulta, tal como figura en el diseño:
 * "Hola beta, quiero hacer una consulta. Proyecto: … . Punto de partida: … ."
 * @param {{key: string, short: string}[]} questions
 * @param {Record<string, string>} answers
 */
export function buildConsultSummary(questions, answers) {
  const parts = questions.map((q) => {
    const a = answers && typeof answers[q.key] === 'string' && answers[q.key].trim() ? answers[q.key].trim() : 'Sin indicar';
    return `${q.short}: ${a}`;
  });
  return `Hola beta, quiero hacer una consulta. ${parts.join('. ')}.`;
}
