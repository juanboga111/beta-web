# Web Lab

Base para diseñar, construir y publicar sitios web de producción con Claude Code. Trae las skills de diseño oficiales, el prompt maestro de trabajo y los checklists, para que cada proyecto arranque con las mismas reglas.

## Qué incluye

- **`CLAUDE.md`**: lo que Claude Code lee al empezar cada sesión. Carga el prompt maestro y explica qué skill usar en cada momento.
- **`.claude/skills/`**: seis skills oficiales de diseño (Impeccable, Taste, Emil Kowalski, Frontend Design de Anthropic y las guías de Vercel). Detalle y versiones en `NOTICE.md`.
- **`docs/`**: prompt maestro, arquitectura de referencia, checklist de producción, ficha de proyecto y guía para actualizar las skills.
- **`scripts/update-skills.sh`**: trae las últimas versiones de las skills.

## Cómo usarlo

**Proyecto nuevo:** en GitHub, en este repo, tocá **Use this template → Create a new repository**. El repo nuevo nace con todo. Después abrilo en Claude Code, copiá `docs/proyecto-plantilla.md` como `docs/proyecto.md` y completalo.

**Proyecto existente:** copiá a ese repo la carpeta `.claude/skills/`, el `CLAUDE.md` y la carpeta `docs/`.

## Requisitos para que corran todas las skills

- Node 22 o superior y Chrome o Chromium instalados (para el inspector de Taste).
- Conexión a internet la primera vez (Impeccable descarga su programa; las guías de Vercel bajan sus reglas, con copia local de respaldo).

## Seguridad

Nunca subas claves, tokens ni contraseñas. Usá variables de entorno (`.env`, que está en `.gitignore`).
