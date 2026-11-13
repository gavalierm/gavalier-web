# Hosting na Cloudflare (Workers static assets)

Stav: hotovo. Od 2026-11-11 beží gavalier.sk na Cloudflare Workers (static assets), worker `gavalier-web`, nasadzovaný z `main` skriptom `deploy-do-cloudflare.sh`. Websupport FTP sa už nepoužíva (`deploy.sh` zmazaný).

## Ako to funguje

- `wrangler.jsonc`: názov `gavalier-web`, `assets.directory = "./"` (koreň repozitára), `html_handling = "auto-trailing-slash"` (`/blog/` je `blog/index.html`, `/blog` presmeruje na `/blog/`). Bez Worker skriptu.
- `not_found_handling = "404-page"`: neznáma adresa vráti stav 404 a súbor `404.html` (vlastná stránka, `noindex`). Cloudflare vlastnú stránku podľa dokumentácie posiela navigáciám prehliadača (hlavička `Sec-Fetch-Mode: navigate`), preto ju `overenie-webu.sh` žiada s touto hlavičkou.
- `_redirects`: trvalé presmerovania 301 (`/blog`, `/index.html`, adresy bez lomky a `index.html` stránok, veľké písmená `/AI-agenti/`). Bez nich dáva `auto-trailing-slash` dočasné 307. Nová stránka = pridaj do `_redirects` jej varianty bez lomky a s `index.html`.
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

`deploy-do-cloudflare.sh` po nasadení sám spustí `overenie-webu.sh`: apex 301 na www, hlavné stránky 200, súbory mimo webu (`/docs`, deploy skripty, `.mcp.json`, `wrangler.jsonc`) 404, canonical na www. Konkrétnu zmenu over argumentmi `/cesta` (čaká 200) alebo `/cesta=text` (čaká 200 a text v obsahu):

```
sh deploy-do-cloudflare.sh /BingSiteAuth.xml=0496B536
sh overenie-webu.sh /blog/=Nový článok     # samostatne, bez nasadenia
```

## Návrat späť

Pôvodné záznamy A webu (Websupport): 37.9.175.156 (gavalier.sk), 37.9.175.155 (www.gavalier.sk). Návrat = vrátiť ich v DNS a odstrániť custom domain z workera. Websupport hosting sa ruší až na pokyn Marcela.

## Otvorené

- Search Console a Bing Webmaster Tools: vlastnosť `https://www.gavalier.sk`, odoslať `sitemap.xml` (potrebuje účet Marcela; TXT `google-site-verification` v zóne už je).
