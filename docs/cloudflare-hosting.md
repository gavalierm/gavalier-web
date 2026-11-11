# Hosting na Cloudflare (Workers static assets)

Stav: hotovo. Od 2026-11-11 beží gavalier.sk na Cloudflare Workers (static assets), worker `gavalier-web`, nasadzovaný z `main` skriptom `deploy-do-cloudflare.sh`. Websupport FTP sa už nepoužíva (`deploy.sh` zmazaný).

## Ako to funguje

- `wrangler.jsonc`: názov `gavalier-web`, `assets.directory = "./"` (koreň repozitára), `html_handling = "auto-trailing-slash"` (`/blog/` je `blog/index.html`, `/blog` presmeruje na `/blog/`). Bez Worker skriptu.
- `.assetsignore`: čo sa nenahrá (`docs/`, `agentic/`, `.claude/`, `blog/_sablona/`, `blog/ZOZNAM-TEM.md` a ďalšie). Nový súbor, ktorý nepatrí na web, pridaj sem.
- Custom domény `www.gavalier.sk` a `gavalier.sk`; apex presmerúva 301 na `https://www.gavalier.sk/` (Redirect Rule v dashboarde, `_redirects` hostiteľa nevie).
- DNS zóny je na Cloudflare; záznamy MX a TXT (e-mail, overenie Search Console) sa pri zmenách webu nemenia.

## Nasadenie

Nasadzuje agent webu skriptom `deploy-do-cloudflare.sh` v koreni repozitára, nie Workers Builds (rozhodnutie D-0022 v brain agent-ron, operátor 2026-11-11; prepojenie Builds odpája operátor). Skript beží v hlavnom repe: overí vetvu `main` a čistý strom, urobí `git push origin main` a `npx -y wrangler@4 deploy` s tokenom `~/.config/ron/cloudflare_token` a účtom `7d01ae84d68d5450790bb65ef11ab334`. Sám skript sa na web nenahrá (`.assetsignore`).

```
sh deploy-do-cloudflare.sh
```

Pri chybe tokenu alebo účtu Cloudflare píš Ronovi poštou (@ron/main).

## Overenie po nasadení

```
curl -sI https://gavalier.sk/            # 301 na https://www.gavalier.sk/
curl -sI https://www.gavalier.sk/        # 200
curl -sI https://www.gavalier.sk/blog    # presmerovanie na /blog/
for u in /automatizacia/ /tvorba-webu/ /ai-agenti/ /seo-llm-optimalizacia/ /blog/ /robots.txt /sitemap.xml /llms.txt; do curl -s -o /dev/null -w "$u %{http_code}\n" https://www.gavalier.sk$u; done
curl -s -o /dev/null -w "%{http_code}\n" https://www.gavalier.sk/docs/blog-postup.md   # 404, nepatrí na web
for u in /docs /deploy.sh /deploy-do-cloudflare.sh; do curl -s -o /dev/null -w "$u %{http_code}\n" https://www.gavalier.sk$u; done   # 404
```

## Návrat späť

Pôvodné záznamy A webu (Websupport): 37.9.175.156 (gavalier.sk), 37.9.175.155 (www.gavalier.sk). Návrat = vrátiť ich v DNS a odstrániť custom domain z workera. Websupport hosting sa ruší až na pokyn Marcela.

## Otvorené

- Search Console a Bing Webmaster Tools: vlastnosť `https://www.gavalier.sk`, odoslať `sitemap.xml` (potrebuje účet Marcela; TXT `google-site-verification` v zóne už je).
