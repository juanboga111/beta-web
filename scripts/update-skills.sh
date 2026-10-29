#!/bin/sh
# Actualiza las skills de .claude/skills/ desde sus repos oficiales.
# Uso: sh scripts/update-skills.sh   (desde la raíz del repo)
set -eu

ROOT=$(pwd)
SKILLS="$ROOT/.claude/skills"
if [ ! -d "$SKILLS" ]; then
  echo "Correlo desde la raíz del repo (no encuentro .claude/skills)." >&2
  exit 1
fi

TMP=$(mktemp -d)
trap 'rm -rf "$TMP"' EXIT

# destino | repo | carpeta dentro del repo
SOURCES="
impeccable|https://github.com/pbakaus/impeccable|.claude/skills/impeccable
design-taste-frontend|https://github.com/Leonxlnx/taste-skill|skills/taste-skill
emil-design-eng|https://github.com/emilkowalski/skill|skills/emil-design-eng
review-animations|https://github.com/emilkowalski/skill|skills/review-animations
frontend-design|https://github.com/anthropics/claude-plugins-official|plugins/frontend-design/skills/frontend-design
web-design-guidelines|https://github.com/vercel-labs/agent-skills|skills/web-design-guidelines
"

echo "$SOURCES" | while IFS='|' read -r name repo path; do
  [ -z "$name" ] && continue
  dir="$TMP/$(echo "$repo" | tr '/:' '__')"
  if [ ! -d "$dir" ]; then
    git clone --depth 1 -q "$repo" "$dir"
  fi
  if [ ! -f "$dir/$path/SKILL.md" ]; then
    echo "AVISO: $name no está en $repo/$path. No se tocó; revisá el repo." >&2
    continue
  fi
  rm -rf "$SKILLS/$name"
  cp -R "$dir/$path" "$SKILLS/$name"
  rm -rf "$SKILLS/$name/evals"
  echo "$name  ←  $repo @ $(git -C "$dir" log -1 --format='%h %cs')"
done

wig="$TMP/wig"
git clone --depth 1 -q https://github.com/vercel-labs/web-interface-guidelines "$wig"
cp "$wig/command.md" "$ROOT/docs/web-interface-guidelines.md"
echo "docs/web-interface-guidelines.md  ←  vercel-labs/web-interface-guidelines @ $(git -C "$wig" log -1 --format='%h %cs')"

echo
echo "Listo. Revisá 'git diff --stat', actualizá NOTICE.md y hacé commit."
