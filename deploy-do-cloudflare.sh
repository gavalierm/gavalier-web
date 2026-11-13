#!/bin/sh
# Nasadí gavalier.sk (worker gavalier-web) z hlavného repa na vetve main: git push, potom wrangler deploy.
# Použitie: sh deploy-do-cloudflare.sh [/cesta[=text] ...]   (v hlavnom repe, nie v kópii témy)
#   Argumenty odovzdá overenie-webu.sh, ktoré po nasadení skontroluje živý web.
# Rozhodnutie: D-0022 v brain agent-ron (nasadzuje agent webu skriptom, nie Workers Builds).
set -e
cd "$(dirname "$0")"
cd "$(git rev-parse --show-toplevel)"
[ "$(git rev-parse --abbrev-ref HEAD)" = main ] || { echo "nie si na vetve main"; exit 1; }
[ -z "$(git status --porcelain)" ] || { echo "strom nie je čistý (git status)"; exit 1; }
git push -q origin main
CLOUDFLARE_API_TOKEN="$(cat ~/.config/ron/cloudflare_token)" \
CLOUDFLARE_ACCOUNT_ID=7d01ae84d68d5450790bb65ef11ab334 \
WRANGLER_SEND_METRICS=false \
npx -y wrangler@4 deploy
echo "nasadené: $(git rev-parse --short HEAD)"
sh ./overenie-webu.sh "$@"
