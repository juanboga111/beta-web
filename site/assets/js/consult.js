// Consulta en cuatro pasos con resumen y apertura de WhatsApp. No envía nada por su cuenta.
import { QUESTIONS } from './data.js';
import { SITE } from './config.js';
import { buildConsultSummary, buildWhatsAppUrl } from './whatsapp.js';
import { reducedMotion } from './motion.js';

const el = (tag, cls, text) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (text !== undefined) n.textContent = text;
  return n;
};

const button = (cls, text, onClick) => {
  const b = el('button', cls, text);
  b.type = 'button';
  b.addEventListener('click', onClick);
  return b;
};

export function initConsult() {
  const ui = document.querySelector('[data-consult-ui]');
  if (!ui) return;
  const segs = [...ui.querySelectorAll('.segs span')];
  const lbl = ui.querySelector('[data-c-lbl]');
  const body = el('div', 'cstep');
  ui.append(body);
  ui.classList.add('cstep');

  const answers = {};
  let step = 0;
  let advance = 0;
  let copyTimer = 0;

  const paintProgress = () => {
    const cur = QUESTIONS[step] && answers[QUESTIONS[step].key];
    segs.forEach((s, i) => s.classList.toggle('on', step >= 4 || i < step || (i === step && !!cur)));
    lbl.textContent = step < 4 ? `Paso ${step + 1} de 4` : 'Resumen';
  };

  const go = (i, focus = true) => {
    clearTimeout(advance);
    step = Math.max(0, Math.min(4, i));
    render(focus);
  };

  function renderQuestion(focus) {
    const q = QUESTIONS[step];
    const cur = answers[q.key];
    const title = el('h3', 'q', q.q);
    title.id = `q-${q.key}`;
    title.tabIndex = -1;
    const opts = el('div', 'opts');
    opts.setAttribute('role', 'group');
    opts.setAttribute('aria-labelledby', title.id);
    q.opts.forEach((label) => {
      const b = button('opt', label, () => {
        answers[q.key] = label;
        opts.querySelectorAll('.opt').forEach((o) => o.setAttribute('aria-pressed', o === b ? 'true' : 'false'));
        next.disabled = false;
        next.textContent = 'Siguiente';
        paintProgress();
        clearTimeout(advance);
        advance = setTimeout(() => go(step + 1), reducedMotion() ? 0 : 260);
      });
      b.setAttribute('aria-pressed', cur === label ? 'true' : 'false');
      opts.append(b);
    });
    const back = button('btn btn-ghost', 'Atrás', () => go(step - 1));
    back.disabled = step === 0;
    const next = button('btn btn-pri', q.optional && !cur ? 'Saltar' : 'Siguiente', () => go(step + 1));
    next.disabled = !cur && !q.optional;
    const nav = el('div', 'cnav');
    nav.append(back, next);
    body.append(title, opts, nav);
    if (focus) title.focus({ preventScroll: true });
  }

  function renderSummary(focus) {
    const text = buildConsultSummary(QUESTIONS, answers);
    const title = el('h3', 'q', 'Tu consulta, lista.');
    title.tabIndex = -1;
    title.style.marginBottom = '0';
    const list = el('ul', 'sum');
    QUESTIONS.forEach((q, i) => {
      const li = el('li');
      const wrap = el('span');
      wrap.append(el('span', 'k', q.short), el('span', 'v', answers[q.key] || 'Sin indicar'));
      const edit = button('edit', 'Cambiar', () => go(i));
      edit.setAttribute('aria-label', `Cambiar ${q.short.toLowerCase()}`);
      li.append(wrap, edit);
      list.append(li);
    });
    const honest = el('p', 'honest', 'Todavía no se envió nada: el resumen se abre en WhatsApp para que lo mandes vos.');
    const wa = el('a', 'btn btn-pri btn-big', 'Continuar por WhatsApp');
    wa.href = buildWhatsAppUrl(SITE.whatsapp, text);
    wa.target = '_blank';
    wa.rel = 'noopener noreferrer';
    const status = el('p', 'status');
    status.setAttribute('role', 'status');
    const copy = button('btn btn-ghost btn-big', 'Copiar resumen', async () => {
      clearTimeout(copyTimer);
      try {
        await navigator.clipboard.writeText(text);
        copy.textContent = 'Copiado';
        status.textContent = 'Resumen copiado al portapapeles.';
        copyTimer = setTimeout(() => { copy.textContent = 'Copiar resumen'; status.textContent = ''; }, 1600);
      } catch {
        status.textContent = 'No se pudo copiar. Podés seguir con el botón de WhatsApp.';
      }
    });
    const nav = el('div', 'cnav start');
    nav.append(wa, copy);
    body.append(title, list, honest, nav, status);
    if (focus) title.focus({ preventScroll: true });
  }

  function render(focus) {
    body.replaceChildren();
    body.classList.remove('enter');
    void body.offsetWidth; // reinicia la animación de entrada del paso
    body.classList.add('enter');
    if (step < 4) renderQuestion(focus); else renderSummary(focus);
    paintProgress();
  }

  render(false);
}

/** Enlaces "Escribinos por WhatsApp": solo apuntan a WhatsApp cuando el número está configurado. */
export function initWhatsAppLinks() {
  const text = 'Hola beta, quiero hacer una consulta.';
  if (SITE.whatsapp) {
    document.querySelectorAll('[data-wa-link]').forEach((a) => {
      a.href = buildWhatsAppUrl(SITE.whatsapp, text);
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
    });
  }
  document.querySelectorAll('[data-wa-default]').forEach((a) => { a.href = buildWhatsAppUrl(SITE.whatsapp, text); });
  if (SITE.email) document.querySelectorAll('[data-contact="email"]').forEach((n) => { n.textContent = SITE.email; });
  if (SITE.whatsapp) document.querySelectorAll('[data-contact="whatsapp"]').forEach((n) => { n.textContent = `+${SITE.whatsapp}`; });
}
