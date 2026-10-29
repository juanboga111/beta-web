# Web Lab

Base de trabajo para diseñar, construir y publicar sitios y productos web de producción. Cada proyecto nuevo se crea a partir de este repo (GitHub → "Use this template") y hereda las skills, el prompt maestro y los checklists.

Idioma: respondé en español rioplatense (voseo). El código, los nombres de archivos y los commits pueden ir en inglés.

## Prompt maestro

Las reglas de trabajo completas (roles, arquitectura antes de código, seguridad, legal, SEO, costos, entregable obligatorio y la regla anti-alucinación) están en:

@docs/prompt-maestro.md

## Skills de diseño instaladas

Están en `.claude/skills/`. Son las versiones oficiales, sin modificar (versiones y fuentes en `NOTICE.md`).

| Skill | Para qué | Cuándo |
|---|---|---|
| `frontend-design` (Anthropic) | Dirección de arte: plan de tokens, idea propia del sujeto, evitar los looks por defecto de la IA | Al empezar cualquier diseño nuevo |
| `design-taste-frontend` (Taste Skill) | Recorrido completo de una página: argumento, dirección, idea, imágenes reales, inspector en navegador a 1440/768/390 | Landings, sitios, portfolios y pantallas de app; también para revisar páginas que "se ven hechas por IA" |
| `impeccable` (Paul Bakaus) | Piso de calidad, tipografía, layout, color, estados, UX writing; comandos `/impeccable audit`, `polish`, `typeset`, `layout`, `animate`, etc. | Pulir, auditar y refinar UI existente o nueva |
| `emil-design-eng` (Emil Kowalski) | Decisiones de animación: si animar, easing, duración, springs, gestos, rendimiento | Toda animación o microinteracción |
| `review-animations` (Emil Kowalski) | Revisión estricta del código de animación | Solo cuando se pide revisar animaciones (`/review-animations`) |
| `web-design-guidelines` (Vercel) | Revisión técnica: accesibilidad, foco, formularios, rendimiento, i18n, `file:line` | Antes de publicar y en cada revisión de UI |

### Orden de trabajo para una web nueva

1. Prompt maestro: comprensión, arquitectura, datos, seguridad, legal (no se construye antes).
2. `frontend-design` + `design-taste-frontend`: idea, dirección, tokens y composición.
3. Construcción con el piso de `impeccable`.
4. Movimiento con `emil-design-eng`.
5. Revisión: `/impeccable audit`, el inspector de Taste y `web-design-guidelines`.
6. Verificar en el navegador a 390, 768 y 1440 px antes de declarar algo terminado.

### Cuando las skills se contradicen

- **El brief y la marca del cliente mandan** sobre cualquier regla de estilo (las seis skills lo dicen).
- **Accesibilidad y rendimiento no se negocian**: si una regla estética choca con contraste, foco, `prefers-reduced-motion` o carga, gana la accesibilidad.
- **Cantidad de movimiento**: en páginas de marketing sigue el recorrido de Taste (paso 9); en UI de uso frecuente (paneles, formularios, herramientas) manda `emil-design-eng` (poca o ninguna animación, menos de 300 ms).
- **Copy en español**: la regla de Vercel de "Title Case" en títulos y botones no aplica; usá mayúscula solo al inicio.

### Si una skill no puede correr

- `web-design-guidelines` descarga sus reglas de GitHub. Si la descarga falla, usá la copia local en `docs/web-interface-guidelines.md`.
- Los scripts de Taste necesitan Node 22+ y Chrome/Chromium. El launcher de Impeccable descarga su binario la primera vez. Si alguno no puede correr, decilo y seguí con capturas manuales; nunca declares un chequeo que no corriste.

## Reglas del repo

- Nada de claves, tokens ni contraseñas en el código ni en el repo: variables de entorno.
- No modifiques las skills dentro de `.claude/skills/`. Para actualizarlas, ver `docs/actualizar-skills.md`.
- Documentación de cada proyecto en `docs/` del repo de ese proyecto.
