#!/usr/bin/env bash
# Nahrá na FTP súbory zmenené od tagu "deployed". Nič na serveri nemaže.
# Použitie: ./deploy.sh [--dry] [--all]
#   --dry  vypíše zoznam súborov a skončí
#   --all  nahrá všetky súbory v gite, na prvé nasadenie bez tagu
set -euo pipefail
cd "$(dirname "$0")"

DRY=0
ALL=0
for arg in "$@"; do
  case "$arg" in
    --dry) DRY=1 ;;
    --all) ALL=1 ;;
    *) echo "Neznámy argument $arg" >&2; exit 2 ;;
  esac
done

[ -f .ftp.env ] || { echo "Chýba .ftp.env" >&2; exit 1; }
. ./.ftp.env
: "${FTP_URL:?v .ftp.env chýba FTP_URL}" "${FTP_USER:?v .ftp.env chýba FTP_USER}" "${FTP_PASS:?v .ftp.env chýba FTP_PASS}"
FTP_URL="${FTP_URL%/}/"

[ -z "$(git status --porcelain)" ] || { echo "Pracovný strom nie je čistý, najprv commit." >&2; exit 1; }
git fetch -q origin main
[ "$(git rev-parse HEAD)" = "$(git rev-parse origin/main)" ] || { echo "HEAD nie je na origin/main, najprv push." >&2; exit 1; }

if [ "$ALL" = 1 ]; then
  LIST=$(git ls-files)
elif git rev-parse -q --verify refs/tags/deployed >/dev/null; then
  LIST=$(git diff --name-only --diff-filter=d deployed HEAD)
else
  echo "Tag deployed neexistuje, prvé nasadenie spusti s --all." >&2
  exit 1
fi

# Súbory, ktoré na server nepatria
LIST=$(printf '%s\n' "$LIST" | grep -v -E '^(CLAUDE\.md|DECISIONS\.md|deploy\.sh|\.gitignore|docs/)' || true)

if [ -z "$LIST" ]; then
  echo "Nie je čo nahrať."
  exit 0
fi

echo "Na nahratie:"
printf '%s\n' "$LIST" | sed 's/^/  /'
[ "$DRY" = 1 ] && exit 0

# Heslo ide cez konfiguráciu na stdin, aby nebolo vidno v zozname procesov
esc() { local s=${1//\\/\\\\}; printf '%s' "${s//\"/\\\"}"; }
CRED=$(printf 'user = "%s:%s"\n' "$(esc "$FTP_USER")" "$(esc "$FTP_PASS")")

while IFS= read -r f; do
  printf '%s\n' "$CRED" | curl -sS --fail -K - --ftp-create-dirs \
    -T "$f" "${FTP_URL}$(printf '%s' "$f" | sed 's/ /%20/g')"
  echo "nahraté $f"
done <<EOF
$LIST
EOF

git tag -f deployed HEAD >/dev/null
echo "Hotovo, tag deployed je na $(git rev-parse --short HEAD)."

if [ -n "${SITE_URL:-}" ]; then
  echo "Kontrola $SITE_URL: HTTP $(curl -s -o /dev/null -w '%{http_code}' "$SITE_URL")"
fi
