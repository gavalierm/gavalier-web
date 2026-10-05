#!/usr/bin/env bash
# Nahrá na FTP súbory zmenené od tagu "deployed". Nič na serveri nemaže okrem
# vlastného dočasného súboru pri neúspešnom uploade.
# Použitie: ./deploy.sh [--dry] [--all] [--only cesta/k/suboru]
#   --dry   vypíše zoznam súborov a skončí
#   --all   nahrá všetky súbory v gite, na prvé nasadenie bez tagu
#   --only  nahrá jediný súbor zo zoznamu a tag neposúva
set -euo pipefail
cd "$(dirname "$0")"

DRY=0
ALL=0
ONLY=""
while [ $# -gt 0 ]; do
  case "$1" in
    --dry) DRY=1 ;;
    --all) ALL=1 ;;
    --only) shift; ONLY="${1:?--only chce cestu k súboru}" ;;
    *) echo "Neznámy argument $1" >&2; exit 2 ;;
  esac
  shift
done

[ -f .ftp.env ] || { echo "Chýba .ftp.env" >&2; exit 1; }
. ./.ftp.env
: "${FTP_URL:?v .ftp.env chýba FTP_URL}" "${FTP_USER:?v .ftp.env chýba FTP_USER}" "${FTP_PASS:?v .ftp.env chýba FTP_PASS}"
FTP_URL="${FTP_URL%/}/"

# Nasadzuje sa len do web/. Ostatné adresáre na serveri nie sú súčasťou tohto projektu.
case "$FTP_URL" in */web/) ;; *) echo "FTP_URL musí končiť na /web/" >&2; exit 1 ;; esac

# Server Websupport ukončí prenos chybou 450 "Link to file server lost", ak dátový kanál
# beží na TLS 1.3. S TLS 1.2 prešlo všetkých 14 pokusov, s TLS 1.3 väčšina neprešla.
CURL_OPTS="--ssl-reqd --tlsv1.2 --tls-max 1.2"
case "$FTP_URL" in ftp://*) ;; *) echo "FTP_URL musí začínať ftp://, skript používa explicitné FTPS" >&2; exit 1 ;; esac

# Cesta od domovského adresára FTP účtu, napríklad web/
FTP_DIR="${FTP_URL#*://}"
FTP_DIR="${FTP_DIR#*/}"

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

if [ -n "$ONLY" ]; then
  printf '%s\n' "$LIST" | grep -x -F -- "$ONLY" >/dev/null || { echo "$ONLY nie je v zozname na nahratie" >&2; exit 1; }
  LIST="$ONLY"
fi

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
ftp() { printf '%s\n' "$CRED" | curl -sS --fail $CURL_OPTS -K - "$@"; }
enc() { printf '%s' "$1" | sed 's/ /%20/g'; }

# Súbor sa nahrá pod dočasným menom, overí sa veľkosť a až potom sa premenuje na cieľ.
# Neúspešný upload tak nikdy nepoškodí živý súbor.
upload() {
  local f="$1" tmp="$1.deploy_tmp" want got
  want=$(wc -c < "$f" | tr -d ' ')
  if ! ftp --ftp-create-dirs -T "$f" "${FTP_URL}$(enc "$tmp")"; then
    ftp -Q "DELE ${FTP_DIR}${tmp}" "$FTP_URL" -o /dev/null 2>/dev/null || true
    echo "CHYBA pri nahrávaní $f, živý súbor sa nezmenil." >&2
    return 1
  fi
  got=$(ftp -I "${FTP_URL}$(enc "$tmp")" | tr -d '\r' | awk 'tolower($1)=="content-length:"{print $2}')
  if [ "$got" != "$want" ]; then
    ftp -Q "DELE ${FTP_DIR}${tmp}" "$FTP_URL" -o /dev/null 2>/dev/null || true
    echo "CHYBA $f má na serveri $got bajtov, má mať $want. Živý súbor sa nezmenil." >&2
    return 1
  fi
  # RNFR odpovedá kódom 350, ktorý curl berie ako chybu, preto prefix * pri RNFR.
  # Príkazy bez prefixu - bežia v domovskom adresári, preto cesta s FTP_DIR.
  if ! ftp -Q "*RNFR ${FTP_DIR}${tmp}" -Q "RNTO ${FTP_DIR}${f}" "$FTP_URL" -o /dev/null; then
    ftp -Q "DELE ${FTP_DIR}${tmp}" "$FTP_URL" -o /dev/null 2>/dev/null || true
    echo "CHYBA pri premenovaní $f, živý súbor sa nezmenil." >&2
    return 1
  fi
}

while IFS= read -r f; do
  upload "$f"
  echo "nahraté $f"
done <<EOF
$LIST
EOF

if [ -z "$ONLY" ]; then
  git tag -f deployed HEAD >/dev/null
  echo "Hotovo, tag deployed je na $(git rev-parse --short HEAD)."
else
  echo "Hotovo, nahraný len $ONLY, tag deployed sa nezmenil."
fi

if [ -n "${SITE_URL:-}" ]; then
  echo "Kontrola $SITE_URL: HTTP $(curl -s -o /dev/null -w '%{http_code}' "$SITE_URL")"
fi
