// Contenido de las secciones interactivas. Fuente: docs/handoff-beta.md (secciones 2.4, 2.5, 2.9).
// Los rubros y marcas son CONCEPTOS FICTICIOS de demostración: mantener los rótulos hasta reemplazarlos.

export const CATS = {
  empresa: { slug: 'estudio-norte', brand: 'Estudio Norte', head: 'Asesoramiento contable para pymes que quieren crecer.', sub: 'Turnos online y respuesta en el día.', cta: 'Pedir turno', n1: 'Servicios', n2: 'Equipo', n3: 'Contacto', media: 'Foto del equipo', i1: 'Impuestos', i2: 'Sueldos', i3: 'Sociedades', k: 'Ver servicio', lay: 'split', layName: 'Dividida: texto e imagen', tone: 'Sobrio y confiable' },
  ecommerce: { slug: 'kiosko-verde', brand: 'Kiosko Verde', head: 'Plantas de interior con envío en el día.', sub: 'Elegí, pagá online y recibí en tu casa.', cta: 'Ver tienda', n1: 'Tienda', n2: 'Envíos', n3: 'Ayuda', media: 'Foto de producto', i1: 'Monstera', i2: 'Pothos', i3: 'Ficus', k: '[PRECIO]', lay: 'grid', layName: 'Catálogo en grilla', tone: 'Cercano y directo' },
  personal: { slug: 'sofia-r', brand: 'Sofía R.', head: 'Fotografía de retrato con luz natural.', sub: 'Sesiones en estudio y en exteriores.', cta: 'Reservar sesión', n1: 'Trabajos', n2: 'Sobre mí', n3: 'Contacto', media: 'Retrato destacado', i1: 'Retratos', i2: 'Familias', i3: 'Marcas', k: 'Ver galería', lay: 'center', layName: 'Centrada, la imagen manda', tone: 'Personal y cálido' },
  startup: { slug: 'nodo', brand: 'Nodo', head: 'Facturá en segundos desde el celular.', sub: 'Probalo gratis durante [PERÍODO].', cta: 'Crear cuenta', n1: 'Producto', n2: 'Precios', n3: 'Ingresar', media: 'Captura de la app', i1: 'Facturas', i2: 'Cobros', i3: 'Reportes', k: 'Conocer más', lay: 'center', layName: 'Producto al centro', tone: 'Preciso y técnico' },
  gastro: { slug: 'fermento', brand: 'Fermento', head: 'Pan de masa madre, horneado cada mañana.', sub: 'Retirá en el local o pedí por WhatsApp.', cta: 'Ver la carta', n1: 'Carta', n2: 'Local', n3: 'Pedidos', media: 'Foto del local', i1: 'Hogaza', i2: 'Medialunas', i3: 'Focaccia', k: '[PRECIO]', lay: 'grid', layName: 'Carta en grilla', tone: 'Artesanal y amable' },
  industria: { slug: 'obra-sur', brand: 'Obra Sur', head: 'Naves industriales llave en mano.', sub: 'Proyecto, cálculo y ejecución en un solo equipo.', cta: 'Pedir cotización', n1: 'Obras', n2: 'Servicios', n3: 'Empresa', media: 'Foto de obra', i1: 'Naves', i2: 'Galpones', i3: 'Oficinas', k: 'Ver obras', lay: 'rev', layName: 'Imagen primero, texto al lado', tone: 'Firme y técnico' },
};

const INK = '#0F172A';
const BLUE = '#2563EB';
const GRAY = '#E5E7EB';
const TINT = '#DBE4F3';

// Vistas previas de servicios: cajas posicionadas en % dentro de un área 16:10.
// frame: superficie clara con barra superior. clip: 'iso' (forma del isotipo) o 'tri'.
export const SERVICES = {
  medida: {
    res: 'Una web que no representa lo que hacés ni cómo lo hacés.',
    ben: 'Un sitio único, pensado desde tu negocio y fácil de mantener.',
    nodes: [
      { frame: true, x: 10, y: 12, w: 80, h: 80, children: [
        { x: 52, y: 22, w: 40, h: 60, bg: BLUE, clip: 'iso' },
        { x: 8, y: 30, w: 40, h: 10, bg: INK, r: 4 },
        { x: 8, y: 45, w: 30, h: 10, bg: INK, r: 4 },
        { x: 8, y: 66, w: 18, h: 9, bg: BLUE, r: 999 },
      ] },
    ],
  },
  responsive: {
    res: 'Visitas que se van porque la página tarda o se ve mal en el celular.',
    ben: 'Carga rápida y lectura cómoda en cualquier pantalla.',
    nodes: [
      { frame: true, x: 8, y: 14, w: 62, h: 72, children: [
        { x: 8, y: 28, w: 50, h: 12, bg: INK, r: 4 },
        { x: 62, y: 24, w: 30, h: 56, bg: BLUE, r: 6 },
      ] },
      { frame: true, bar: false, x: 66, y: 24, w: 18, h: 66, r: 14, ring: true, children: [
        { x: 12, y: 14, w: 76, h: 30, bg: BLUE, r: 6 },
        { x: 12, y: 52, w: 76, h: 7, bg: INK, r: 3 },
        { x: 12, y: 80, w: 76, h: 10, bg: INK, r: 999 },
      ] },
    ],
  },
  tienda: {
    res: 'Vender solo por mensajes, con stock y precios a mano.',
    ben: 'Catálogo, carrito y cobro con proveedores de pago especializados.',
    nodes: [
      { frame: true, x: 10, y: 12, w: 80, h: 80, children: [
        { x: 82, y: 2, w: 14, h: 6, bg: BLUE, r: 999 },
        { x: 6, y: 18, w: 26, h: 34, bg: GRAY, r: 6 }, { x: 37, y: 18, w: 26, h: 34, bg: GRAY, r: 6 }, { x: 68, y: 18, w: 26, h: 34, bg: TINT, r: 6 },
        { x: 6, y: 58, w: 26, h: 34, bg: GRAY, r: 6 }, { x: 37, y: 58, w: 26, h: 34, bg: TINT, r: 6 }, { x: 68, y: 58, w: 26, h: 34, bg: GRAY, r: 6 },
      ] },
    ],
  },
  landing: {
    res: 'Campañas que llevan gente a una página que no convierte.',
    ben: 'Una página, una acción clara y medible.',
    nodes: [
      { frame: true, x: 34, y: 6, w: 32, h: 100, children: [
        { x: 10, y: 16, w: 80, h: 6, bg: INK, r: 3 },
        { x: 10, y: 25, w: 60, h: 6, bg: INK, r: 3 },
        { x: 10, y: 38, w: 46, h: 8, bg: BLUE, r: 999, glow: true },
        { x: 10, y: 54, w: 80, h: 24, bg: GRAY, r: 6 },
      ] },
    ],
  },
  rediseno: {
    res: 'Una web vieja que ya no te representa.',
    ben: 'Conservamos lo que funciona y renovamos lo demás.',
    nodes: [
      { frame: true, x: 6, y: 16, w: 42, h: 68, bg: '#D1D5DB', barBg: '#9CA3AF', children: [
        { x: 20, y: 30, w: 60, h: 8, bg: '#9CA3AF' },
        { x: 10, y: 56, w: 24, h: 30, bg: '#9CA3AF' }, { x: 38, y: 56, w: 24, h: 30, bg: '#9CA3AF' }, { x: 66, y: 56, w: 24, h: 30, bg: '#9CA3AF' },
      ] },
      { x: 49, y: 46, w: 2, h: 8, bg: BLUE, clip: 'tri' },
      { frame: true, x: 52, y: 16, w: 42, h: 68, children: [
        { x: 8, y: 26, w: 50, h: 12, bg: INK, r: 4 },
        { x: 8, y: 46, w: 30, h: 10, bg: BLUE, r: 999 },
        { x: 60, y: 22, w: 32, h: 60, bg: BLUE, clip: 'iso' },
      ] },
    ],
  },
  consultoria: {
    res: 'No saber por dónde empezar ni qué herramientas hacen falta.',
    ben: 'Un plan claro de qué hacer primero y qué no.',
    nodes: [
      { x: 10, y: 54, w: 26, h: 22, bg: '#334155', clip: 'iso' },
      { x: 36, y: 38, w: 26, h: 22, bg: '#64748B', clip: 'iso' },
      { x: 62, y: 22, w: 26, h: 22, bg: BLUE, clip: 'iso' },
      { x: 14, y: 80, text: 'Hoy', color: '#CBD5E1' },
      { x: 40, y: 64, text: 'Próximo', color: '#CBD5E1' },
      { x: 66, y: 48, text: 'Después', color: '#FFFFFF' },
    ],
  },
};

export const STEPS_LABEL = (i) => `Etapa ${i + 1} de 4`;

// Rangos de presupuesto: PENDIENTES de definir por beta (handoff, sección 7). No inventar valores.
// Cuando estén confirmados, cargarlos acá como texto que se ve tal cual en el botón y en el resumen,
// por ejemplo: ['Hasta $X', 'Entre $X y $Y', 'Más de $Y']. Mientras esté vacío, el paso ofrece
// "Prefiero hablarlo" y "Saltar".
export const BUDGET_RANGES = [];

/** Opciones del paso de presupuesto a partir de los rangos confirmados. */
export function budgetOptions(ranges = BUDGET_RANGES) {
  return ['Prefiero hablarlo', ...ranges.map((r) => String(r).trim()).filter(Boolean)];
}

export const QUESTIONS = [
  { key: 'tipo', q: '¿Qué necesitás?', short: 'Proyecto', opts: ['Sitio institucional', 'Tienda online', 'Landing page', 'Todavía no sé'] },
  { key: 'inicio', q: '¿Partís de cero o ya tenés web?', short: 'Punto de partida', opts: ['Empiezo de cero', 'Quiero renovar mi web'] },
  { key: 'obj', q: '¿Qué tiene que lograr?', short: 'Objetivo', opts: ['Más consultas', 'Vender online', 'Mejorar mi imagen', 'Ordenar mi presencia digital'] },
  // Paso opcional: "Prefiero hablarlo" más los rangos de BUDGET_RANGES. Se puede saltar.
  { key: 'pres', q: '¿Tenés un presupuesto pensado?', short: 'Presupuesto', opts: budgetOptions(), optional: true },
];
