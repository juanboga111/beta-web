// Funciones puras para la consulta y el enlace de WhatsApp. Probadas en tests/whatsapp.test.mjs.

/** Deja solo los dígitos de un número de teléfono. */
export function normalizePhone(number) {
  return String(number ?? '').replace(/\D+/g, '');
}

/**
 * ¿Es un número internacional usable por wa.me? Código de país + número, solo dígitos,
 * entre 8 y 15 (largo máximo de E.164), sin empezar por 0.
 */
export function isValidWhatsAppNumber(number) {
  return /^[1-9]\d{7,14}$/.test(normalizePhone(number));
}

/**
 * Única función que arma enlaces de WhatsApp en el sitio:
 * https://wa.me/NUMERO_INTERNACIONAL?text=MENSAJE_CODIFICADO
 * Devuelve null si el número no es válido: nunca se genera un enlace sin destinatario.
 * @param {string} number número internacional (se ignoran espacios, guiones y "+").
 * @param {string} [text] mensaje prellenado.
 * @returns {string | null}
 */
export function buildWhatsAppUrl(number, text) {
  if (!isValidWhatsAppNumber(number)) return null;
  const base = `https://wa.me/${normalizePhone(number)}`;
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
