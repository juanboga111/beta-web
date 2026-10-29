# beta — sitio web

Sitio de **beta**, estudio de diseño y desarrollo web. Implementa la dirección creativa B, "Laboratorio": una web que se separa en sus cuatro capas para mostrar cómo se construye.

Creado a partir de la plantilla `web-lab`: las skills de diseño, el prompt maestro y los checklists siguen en `.claude/` y `docs/`.

## Estructura

```
site/                 Lo que se publica (HTML, CSS y JS sin build)
  index.html          Página completa; se lee entera sin JavaScript
  404.html
  assets/css/         tokens.css (sistema de diseño) y styles.css
  assets/js/          Un módulo por interacción; config.js tiene los datos de contacto (único lugar)
  assets/fonts/       Inter (OFL 1.1) recortada a latín
  robots.txt · sitemap.xml · site.webmanifest · íconos · og-image.png
tests/                Pruebas unitarias (npm test) y de navegador (tests/browser, npm run test:browser)
scripts/              serve.mjs (servidor local con los headers de producción), contact.mjs
                      (copia config.js al HTML), build-assets.py (fuentes, logo provisorio, íconos, OG)
docs/                 handoff-beta.md (diseño), proyecto.md (decisiones), qa.md (verificación)
netlify.toml          Headers de seguridad, caché y redirección de www
```

## Trabajar en local

```
npm test              # pruebas unitarias y HTML sincronizado con config.js (sin dependencias)
npm run serve         # http://localhost:4321, con la CSP y los headers de netlify.toml
npm run test:browser  # pruebas de interacción en Chromium (necesita Playwright)
```

## Datos de contacto

Se cargan **solo** en `site/assets/js/config.js` (WhatsApp, correo, Instagram). Después de cambiarlos:

```
npm run contact
```

Eso copia los datos al footer, al respaldo sin JavaScript y a los datos estructurados. `npm test` falla si el HTML quedó desactualizado. El primer número de WhatsApp recibe la consulta; el resto se lista en el footer. Cuando cambie el usuario de Instagram por el de la marca nueva, alcanza con cambiar la URL (el sitio muestra "Instagram", no el usuario).

## Preview en Vercel

`vercel.json` publica `site/` sin build, con los mismos headers que `netlify.toml` (`npm test` verifica que coincidan).

1. vercel.com/new → **Import Git Repository** → `juanboga111/beta-web`. Framework Preset: **Other**; no tocar Build ni Output.
2. Cada push a una rama distinta de `main` genera una URL de preview (Vercel la comenta en el pull request). Las previews llevan `X-Robots-Tag: noindex`.
3. Producción (rama `main` y dominio) queda para cuando se apruebe el PR.

## Publicar en Netlify

1. Netlify → **Add new site → Import an existing project → GitHub** → `beta-web`.
2. Build command: vacío. Publish directory: `site` (ya viene en `netlify.toml`).
3. **Domain management**: agregar `beta.ar` y activar HTTPS.

## Antes de publicar (datos pendientes)

- WhatsApp (5493434286906 y 5493434661332), correo e Instagram: **cargados**. Confirmar en un teléfono que el enlace abre el chat correcto. Actualizar la URL de Instagram cuando cambie el usuario.
- Rangos de presupuesto: pendientes de definir. Se cargan en `BUDGET_RANGES` (`site/assets/js/data.js`); mientras esté vacío el paso ofrece "Prefiero hablarlo" o "Saltar".
- Isotipo y logotipo oficiales en vector (hoy son una recreación; ver `scripts/build-assets.py`).
- Confirmar el dominio, la consultoría como servicio y "Comunicación directa".
- Data Fiscal de ARCA en el footer.
- Portfolio: Bogado Servicios Integrales (publicado) y Cimbra Constructora (en desarrollo) ya figuran como trabajos reales; faltan sus capturas. Fermento, Nodo y Kiosko Verde siguen como conceptos rotulados hasta tener trabajos reales que los reemplacen.

Detalle completo en `docs/handoff-beta.md` (sección 7) y `docs/proyecto.md`.
