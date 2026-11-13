#!/bin/sh
# Overí živý web gavalier.sk po nasadení (docs/cloudflare-hosting.md, Overenie po nasadení).
# Použitie: sh overenie-webu.sh [/cesta[=hľadaný text] ...]
#   Bez argumentov: základná kontrola. Argument /cesta čaká 200, /cesta=text čaká 200 a text v obsahu.
# Výstup: riadok na kontrolu (OK/CHYBA), na konci súhrn; návratový kód 1 pri chybe.
W=https://www.gavalier.sk
fail=0
check() { # popis očakávaný_kód skutočný_kód
  if [ "$2" = "$3" ]; then echo "OK    $1 $3"; else echo "CHYBA $1 $3 (čakám $2)"; fail=1; fi
}
code() { curl -s -o /dev/null -w "%{http_code}" "$1"; }

check "apex https://gavalier.sk/" 301 "$(code https://gavalier.sk/)"
loc=$(curl -sI https://gavalier.sk/ | tr -d '\r' | sed -n 's/^[Ll]ocation: //p')
check "apex presmeruje na" "$W/" "$loc"
for u in / /automatizacia/ /tvorba-webu/ /ai-agenti/ /seo-llm-optimalizacia/ /blog/ /robots.txt /sitemap.xml /llms.txt; do
  check "$u" 200 "$(code "$W$u")"
done
for u in /docs /docs/blog-postup.md /deploy.sh /deploy-do-cloudflare.sh /overenie-webu.sh /.mcp.json /wrangler.jsonc; do
  check "$u (nepatrí na web)" 404 "$(code "$W$u")"
done
for u in /blog /index.html /AI-agenti/; do
  check "$u (trvalé presmerovanie)" 301 "$(code "$W$u")"
done
check "/neexistuje-stranka (vlastná 404)" 404 "$(code "$W/neexistuje-stranka")"
if curl -s -H 'Sec-Fetch-Mode: navigate' "$W/neexistuje-stranka" | grep -qF 'Stránka sa nenašla'; then echo "OK    404 má vlastnú stránku"; else echo "CHYBA 404 nemá vlastnú stránku"; fail=1; fi
canon=$(curl -s "$W/" | grep -o '<link rel="canonical" href="[^"]*"' | head -1)
case "$canon" in *"$W/"*) check "canonical domovskej stránky" www www ;; *) check "canonical domovskej stránky" www "${canon:-chýba}" ;; esac

for a in "$@"; do
  p=${a%%=*}; t=
  [ "$p" != "$a" ] && t=${a#*=}
  check "$p" 200 "$(code "$W$p")"
  if [ -n "$t" ]; then
    if curl -s "$W$p" | grep -qF -- "$t"; then echo "OK    $p obsahuje text"; else echo "CHYBA $p neobsahuje text"; fail=1; fi
  fi
done

[ $fail = 0 ] && echo "overenie: všetko OK" || echo "overenie: CHYBY vyššie"
exit $fail
