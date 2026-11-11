# Hosting na Cloudflare (Workers static assets, nasadenie z GitHubu)

Stav: príprava. Ostrý web gavalier.sk stále beží na Websupporte (FTP, `deploy.sh`, skill `nasadenie-webu`, rozhodnutie D-0001), kým sa neurobí prepnutie nižšie.

## Čo je v repozitári

- `wrangler.jsonc`: názov `gavalier-web`, `assets.directory = "./"` (koreň repozitára), `html_handling = "auto-trailing-slash"` (`/blog/` je `blog/index.html`, `/blog` presmeruje na `/blog/`). Bez Worker skriptu.
- `.assetsignore`: čo sa nenahrá (`docs/`, `agentic/`, `.claude/`, `blog/_sablona/`, `blog/ZOZNAM-TEM.md`, `deploy.sh` a ďalšie). Zodpovedá zoznamu vylúčení v `deploy.sh`. Nový súbor, ktorý nepatrí na web, pridaj do oboch.

## Prepnutie (robí operátor v Cloudflare dashboarde)

1. Pred akoukoľvek zmenou si poznač (alebo exportuj) všetky DNS záznamy zóny gavalier.sk, najmä MX a TXT (e-mail). Tie sa nesmú zmazať. Pôvodné záznamy A webu boli 37.9.175.156 (gavalier.sk) a 37.9.175.155 (www.gavalier.sk), na vrátenie späť.
2. Workers & Pages: Create, Import a repository, vybrať GitHub repozitár `gavalierm/gavalier-web`. Názov projektu `gavalier-web` (musí sa zhodovať s `name` vo `wrangler.jsonc`), produkčná vetva `main`, build príkaz prázdny, deploy príkaz `npx wrangler deploy` (predvolený).
3. Po prvom builde otvoriť adresu, ktorú Cloudflare projektu pridelí, a prejsť hlavnú stránku, `/automatizacia/`, `/tvorba-webu/`, `/ai-agenti/`, `/seo-llm-optimalizacia/`, `/blog/` a oba články.
4. Settings, Domains & Routes, Add, Custom Domain: `www.gavalier.sk` a `gavalier.sk`. Cloudflare nedovolí vytvoriť custom domain na hostname s existujúcim záznamom CNAME; ak hlási konflikt so staršími záznamami webu, rieš ho podľa jeho hlásenia (záznamy MX a TXT nemeň).
5. Presmerovanie `gavalier.sk/*` na `https://www.gavalier.sk/` s kódom 301 nastav v dashboarde (Redirect Rule alebo Bulk Redirects). Súbor `_redirects` to nevie: pravidlá podľa hostiteľa v ňom nie sú podporované.

## Overenie po prepnutí

```
curl -sI https://gavalier.sk/            # 301 na https://www.gavalier.sk/
curl -sI https://www.gavalier.sk/        # 200
curl -sI https://www.gavalier.sk/blog    # presmerovanie na /blog/
for u in /automatizacia/ /tvorba-webu/ /ai-agenti/ /seo-llm-optimalizacia/ /blog/ /robots.txt /sitemap.xml /llms.txt; do curl -s -o /dev/null -w "$u %{http_code}\n" https://www.gavalier.sk$u; done
```

Skontrolovať aj hlavičky `Cache-Control` HTML súborov (Cloudflare predvolene; Websupport posielal 30 dní).

## Návrat späť

V DNS vrátiť záznamy A webu na pôvodné adresy z kroku 1 a odstrániť custom domain z projektu. Websupport hosting do overenia nerušiť.

## Po úspešnom prepnutí (v repozitári a brain)

- Skill `nasadenie-webu` prepísať: nasadenie = push do `main`; kontrola buildu v Cloudflare.
- Rozhodnutie D-0001 nahradiť (`save.mjs decision ... --supersedes D-0001`) a pamäť `service-websupport-gavalier` upraviť.
- `deploy.sh` a `local/.ftp.env` zmazať, keď už nie sú potrebné.
- Search Console a Bing Webmaster Tools: vlastnosť `https://www.gavalier.sk`, odoslať `sitemap.xml`.
