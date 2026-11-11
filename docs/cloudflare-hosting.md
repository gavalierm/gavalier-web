# Hosting na Cloudflare (Workers static assets)

Stav: hotovo. Od 2026-11-11 beží gavalier.sk na Cloudflare Workers (static assets), worker `gavalier-web`, nasadený z `main`. Websupport FTP sa už nepoužíva (`deploy.sh` zmazaný).

## Ako to funguje

- `wrangler.jsonc`: názov `gavalier-web`, `assets.directory = "./"` (koreň repozitára), `html_handling = "auto-trailing-slash"` (`/blog/` je `blog/index.html`, `/blog` presmeruje na `/blog/`). Bez Worker skriptu.
- `.assetsignore`: čo sa nenahrá (`docs/`, `agentic/`, `.claude/`, `blog/_sablona/`, `blog/ZOZNAM-TEM.md` a ďalšie). Nový súbor, ktorý nepatrí na web, pridaj sem.
- Custom domény `www.gavalier.sk` a `gavalier.sk`; apex presmerúva 301 na `https://www.gavalier.sk/` (Redirect Rule v dashboarde, `_redirects` hostiteľa nevie).
- DNS zóny je na Cloudflare; záznamy MX a TXT (e-mail, overenie Search Console) sa pri zmenách webu nemenia.

## Nasadenie

Push do `main` = nasadenie, ak je v Cloudflare (Workers & Pages, gavalier-web, Settings, Builds) pripojený GitHub repozitár `gavalierm/gavalier-web` s produkčnou vetvou `main` a deploy príkazom `npx wrangler deploy`. Do pripojenia nasadzuje Ron na požiadanie poštou.

## Overenie po nasadení

```
curl -sI https://gavalier.sk/            # 301 na https://www.gavalier.sk/
curl -sI https://www.gavalier.sk/        # 200
curl -sI https://www.gavalier.sk/blog    # presmerovanie na /blog/
for u in /automatizacia/ /tvorba-webu/ /ai-agenti/ /seo-llm-optimalizacia/ /blog/ /robots.txt /sitemap.xml /llms.txt; do curl -s -o /dev/null -w "$u %{http_code}\n" https://www.gavalier.sk$u; done
curl -s -o /dev/null -w "%{http_code}\n" https://www.gavalier.sk/docs/blog-postup.md   # 404, nepatrí na web
```

## Návrat späť

Pôvodné záznamy A webu (Websupport): 37.9.175.156 (gavalier.sk), 37.9.175.155 (www.gavalier.sk). Návrat = vrátiť ich v DNS a odstrániť custom domain z workera. Websupport hosting sa ruší až na pokyn Marcela.

## Otvorené

- Search Console a Bing Webmaster Tools: vlastnosť `https://www.gavalier.sk`, odoslať `sitemap.xml` (potrebuje účet Marcela; TXT `google-site-verification` v zóne už je).
