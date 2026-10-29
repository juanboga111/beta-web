# Actualizar las skills

Las skills se copian de sus repos oficiales. Para traer las últimas versiones, desde la raíz del repo:

```bash
sh scripts/update-skills.sh
```

El script reemplaza cada carpeta de `.claude/skills/` por la versión actual de su repo y muestra los commits nuevos. Después:

1. Revisá los cambios con `git diff --stat` (y leé los `SKILL.md` que cambiaron).
2. Actualizá la tabla de versiones de `NOTICE.md`.
3. Hacé commit.

Si una skill cambió de carpeta o de nombre en su repo, el script avisa y no toca esa skill.

Los repos creados desde esta plantilla no se actualizan solos: corré el script también en cada proyecto cuando quieras las versiones nuevas.
