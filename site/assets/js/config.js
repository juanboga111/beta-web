// Datos de contacto de beta: ÚNICO lugar donde se cargan.
// Después de cambiarlos, correr `npm run contact` para copiarlos al HTML (footer, respaldo sin JavaScript
// y datos estructurados). `npm test` falla si el HTML quedó desactualizado.
//
// whatsapp: números en formato internacional, solo dígitos, sin "+" ni espacios.
//   Celular de Argentina: 54 + 9 + característica sin 0 + número sin 15 (343 428-6906 → 5493434286906).
//   El primero recibe la consulta y los botones "Escribinos por WhatsApp"; los demás se listan en el footer.
// instagram: URL del perfil, sin parámetros de rastreo. El usuario va a cambiar al nombre nuevo de la marca:
//   el sitio muestra "Instagram" (no el usuario), así que alcanza con cambiar la URL acá.
export const SITE = {
  whatsapp: ['5493434286906', '5493434661332'],
  email: 'betadesarrolloweb@gmail.com',
  instagram: 'https://www.instagram.com/betadesarrollo/',
};

/** Número que recibe las consultas por WhatsApp. */
export const primaryWhatsApp = (site = SITE) => [].concat(site.whatsapp || [])[0] || '';
