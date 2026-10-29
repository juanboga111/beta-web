# beta — sitio web

Sitio de **beta**, estudio de diseño y desarrollo web. Implementa la dirección creativa B, "Laboratorio": una web que se separa en sus cuatro capas para mostrar cómo se construye.

Creado a partir de la plantilla `web-lab`: las skills de diseño, el prompt maestro y los checklists siguen en `.claude/` y `docs/`.

## Estructura

```
site/                 Lo que se publica (HTML, CSS y JS sin build)
  index.html          Página completa; se lee entera sin JavaScript
  404.html
  assets/css/         tokens.css (sistema de diseño) y styles.css
  assets/js/          Un módulo por interacción; config.js tiene los datos de contacto
  assets/fonts/       Inter (OFL 1.1) recortada a latín
  robots.txt · sitemap.xml · site.webmanifest · íconos · og-image.png
tests/                Pruebas de las funciones de WhatsApp y consulta
scripts/              build-assets.py (fuentes, logo provisorio, íconos, OG)
docs/                 handoff-beta.md (diseño), proyecto.md (decisiones), qa.md (verificación)
netlify.toml          Headers de seguridad, caché y redirección de www
```

## Trabajar en local

```
npm test        # pruebas (sin dependencias)
npm run serve   # http://localhost:4321
```

## Publicar en Netlify

1. Netlify → **Add new site → Import an existing project → GitHub** → `beta-web`.
2. Build command: vacío. Publish directory: `site` (ya viene en `netlify.toml`).
3. **Domain management**: agregar `beta.ar` y activar HTTPS.

## Antes de publicar (datos pendientes)

- Número de WhatsApp y correo en `site/assets/js/config.js`, y en el footer de `site/index.html` ([EMAIL], [WHATSAPP]).
- Rangos de presupuesto en `site/assets/js/data.js` ([RANGO 1], [RANGO 2], [RANGO 3]).
- Isotipo y logotipo oficiales en vector (hoy son una recreación; ver `scripts/build-assets.py`).
- Confirmar el dominio, la consultoría como servicio y "Comunicación directa".
- Data Fiscal de ARCA en el footer.
- Reemplazar los proyectos conceptuales (Obra Sur, Fermento, Estudio Norte, Nodo, Kiosko Verde) por trabajos reales; hasta entonces conservan el rótulo "Concepto".

Detalle completo en `docs/handoff-beta.md` (sección 7) y `docs/proyecto.md`.
