# SEO audit gavalier.sk (2026-11-13)

Zdroj: kód v repe + živý web https://www.gavalier.sk (živé súbory = repo, overené curl). 7 agentov pluginu claude-seo 2.6.0: technical, content, schema, sitemap, geo, agentic, sxo. Python runtime pluginu nie je pripravený (bez Chromia), preto **bez Lighthouse a bez meraní Core Web Vitals**; výkon je odhad z kódu. Nespustené: performance, visual, backlinks, google (chýba runtime / prístupy).

**Doplnené reálnymi dátami (2026-11-13):** PageSpeed Insights (Lighthouse 13.6), Google Search Console za 90 dní a sitemapy, CrUX, Bing Webmaster Tools API a DataForSEO (spätné odkazy, SERP, objemy hľadaní). Surové dáta a súhrn sú v `data/` (`data/SUHRN-REALNE-DATA.md`) a v `psi-home.json`. Nespustené ostáva iba visual (screenshoty).

## Skóre: 70 / 100

| Kategória | Váha | Skóre | Poznámka |
|---|---|---|---|
| Technické SEO | 22 % | 78 | indexovanie v poriadku, chýbajú hlavičky a cache |
| Kvalita obsahu | 23 % | 64 | málo dôkazov (prípady, čísla), šablónovité texty |
| On-page SEO | 20 % | 74 | unikátne title/description, slabé H1 a H2 |
| Schema | 10 % | 80 | čistá, chýba sameAs, chybné founderOf |
| Výkon (Lighthouse) | 10 % | 67 | mobil 67 (LCP 10,1 s), desktop 92; 1,34 MB PNG ako LCP, 15 CSS, fonty z Google |
| AI vyhľadávanie | 10 % | 65 | GEO 58, agentic 76 |
| Obrázky | 5 % | 60 | alt 80, veľkosti a formáty zlé |

Skóre zostáva 70: zmeraný výkon (67 namiesto odhadu 62) ho zvýši o menej ako bod. Do skóre sa nezapočítava viditeľnosť, ktorá je podľa reálnych dát takmer nulová (pozri nižšie).

Typ webu: osobné poradenstvo (služby), jedna osoba, Poprad / celé Slovensko, klienti hlavne na odporúčanie.

## Viditeľnosť podľa reálnych dát
| Zdroj | Výsledok |
|---|---|
| Search Console, 15. 8. – 10. 11. 2026 | 5 klikov, 77 zobrazení, priemerná pozícia 5,5; dotazy sú náhodné (napr. „cavaleers“, „viac typov“), žiadny dotaz na službu |
| Search Console, sitemapy | `sitemap.xml` odoslaná naposledy 16. 5. 2026 so 6 URL; dnes má sitemap 9 URL |
| DataForSEO, Slovensko | 0 kľúčových slov, na ktoré web rankuje; gavalier.sk nie je v top 20 ani pre „gavalier“ a „Marcel Gavalier“ (tie obsadila kaviareň Gavalier a firemné registre), ani pre „AI poradenstvo“ a „IT poradca pre firmy“ |
| DataForSEO, spätné odkazy | 41 odkazov zo 40 domén (32 dofollow), od roku 2022; spam score 59, väčšina domén s rank 0 a mimo témy |
| Objem hľadaní (Google Ads, SK) | „tvorba webových stránok“ 590/mes., „tvorba webu“ 170, „automatizácia procesov“ 30, „ai konzultant“ 20, „IT poradenstvo“ 10; ostatné testované bez dát |
| CrUX | bez dát pre URL aj origin (malá návštevnosť) |
| Bing Webmaster Tools | obe property (apex aj www) sú zaregistrované, bez sitemap a bez štatistík; homepage naposledy crawlovaná 23. 10. 2026 |

| # | Nález | Oprava |
|---|---|---|
| V1 | Web nie je v top 20 ani pre vlastné meno, brand „gavalier“ patrí kaviarni | sameAs (H3), meno a značka konzistentne v title a schéme, profily mimo webu (LinkedIn, firmy.sk, register) |
| V2 | GSC pozná sitemapu so 6 URL z mája | znova odoslať `sitemap.xml` v GSC |
| V3 | Bing bez sitemap | odoslať sitemap v Bing WMT, overiť IndexNow |
| V4 | Profil spätných odkazov je malý a nekvalitný (spam score 59) | ručne prejsť `data/dfs-referring-domains.json`; disavow až po kontrole, nie automaticky |
| V5 | Najväčší dopyt k ponuke je „tvorba webových stránok“ (590/mes.), web tam nie je | rozhodnúť, či `/tvorba-webu/` cieliť na tento dopyt; dopyty na AI a IT poradenstvo majú malý objem, čo sedí s modelom klientov na odporúčanie |

## Nálezy podľa priority

Critical: žiadny (nič neblokuje indexovanie).

### High
| # | Nález | Dôkaz | Oprava |
|---|---|---|---|
| H1 | LCP obrázok 1,34 MB PNG, aj og:image domovskej stránky; Lighthouse mobil LCP 10,1 s | `index.html:492`, `assets/gavo_edited.png`, `psi-home.json` | WebP/AVIF + `srcset`, `fetchpriority="high"`; og:image 1200×630 |
| H2 | Obrázok v hlavičke 285 KB, nenačítava sa lenivo, hlavička je skrytá do scrollu | `index.html:444` + podstránky | `loading="lazy"`, menší formát |
| H3 | `sameAs` obsahuje iba vlastný web, AI ani Google nemajú externé overenie osoby | `index.html:137-139` | doplniť LinkedIn, GitHub, register (ORSR/ZRSR) |
| H4 | Žiadne dôkazy: bez prípadových štúdií a čísel; ceny „od pár desiatok eur po tisíce“ | `index.html:1378`, blog TODO `:220`, `:258` | reálne prípady s číslami, príklady cien (iba overené) |
| H5 | Servisné stránky nemajú kontakt (telefón/e-mail) na začiatku, prvý odkaz po ~84 % textu | `automatizacia/`, `tvorba-webu/`, `ai-agenti/`, `seo-llm-optimalizacia/` | blok „Najrýchlejšia cesta je zavolať“ pod H1 |
| H6 | Servisné stránky bez dôkazu (citáty, logá, portrét) | tie isté 4 stránky | presunúť schválené referencie z domovskej stránky |
| H7 | Servisné stránky 538–612 slov, 26–38 % spoločný text | `automatizacia/index.html:267-275` | rozšíriť o špecifiká služby, menej boilerplate |
| H8 | Meta descriptions končia rovnakou frázou (5 z 8) | `index.html:6`, servisné stránky `:7` | prepísať konce |
| H9 | Žiadna stránka na „IT poradca / IT poradenstvo“, slovo „poradca“ na webe chýba | celý web | stránka `/it-poradenstvo/` alebo aspoň v title |

### Medium
| # | Nález | Dôkaz |
|---|---|---|
| M1 | Žiadne bezpečnostné hlavičky (HSTS, CSP, nosniff, Referrer-Policy) | chýba `_headers` |
| M2 | Všetko `cache-control: max-age=0`, aj CSS/JS/obrázky | overené curl na `/css/base.css` |
| M3 | 15 blokujúcich CSS + Google Fonts (Manrope 6 rezov) | `index.html:54-73` |
| M4 | H1 „Ste tu správne.“ a H2 typu „Logá.“, „Detaily.“ bez témy | `index.html:495`, `:532`, `:690` |
| M5 | Title domovskej stránky („Weby, IT siete…“) nesedí s obsahom (AI, automatizácia) | `index.html:42`, `:308` |
| M6 | Rozpor „Sám to nerobím“ (siete) vs. „Sieťar“ a MikroTik v schéme | `index.html:812` vs `:1448`, `:122` |
| M7 | `founderOf` je neplatná vlastnosť a ukazuje sama na seba | `index.html:169` |
| M8 | Portrét má `alt=""` a `aria-hidden`, hoci je hlavný obrázok | `index.html:492` |
| M9 | Referencie uvádzajú iba firmu, bez osoby a roku | `index.html:1314-1355` |
| M10 | Chýba stránka o autorovi, bylines vedú na `/#kto-to-robi` | blog |
| M11 | Odkazy na služby v hero nie sú klikateľné, menu sa ukáže až po scrolle | `index.html` hero |
| M12 | Blogový článok o ChatGPT sľubuje „iných AI asistentov“, pokrýva iba OpenAI | `blog/ako-sa-objavit-v-odpovediach-chatgpt/` |
| M13 | Článok o fakturácii nespomína plánovanú povinnú B2B e-fakturáciu (overiť stav) | `blog/ako-automatizovat-fakturaciu-a-emaily/:212-258` |
| M14 | Web je 2 dni na novom hostingu; Bing Webmaster Tools je zaregistrovaný, ale bez sitemap a štatistík (V3); IndexNow neoverený | `data/bing-GetFeeds.json`, `docs/sledovanie-viditelnosti.md` |
| M15 | Accordion: H2 pod H2, nadpisy v `<summary>` | `index.html:752`, `automatizacia:279` |

### Low (výber)
- Presmerovania `/blog` → `/blog/` sú 307, nie 301; chýba vlastná 404 stránka (`not_found_handling: "404-page"`).
- `robots.txt`: `Crawl-delay` Google ignoruje, ~17 duplicitných skupín, zastarané Slurp/Googlebot-Mobile, chýba Claude-SearchBot.
- `/favicon.ico` 404, manifest iba SVG ikona, chýba apple-touch-icon.
- ~66 `<img>` bez width/height (riziko CLS), `accordion-words.js` obaľuje každé slovo (riziko INP).
- `article:author` je meno, nie URL (šablóna `blog/_sablona/index.html:27`); `areaServed` raz „Slovakia“, raz „Slovensko“.
- TODO komentáre viditeľné v zdrojovom HTML (`index.html:1378`, blog `:220`, `:258`).
- Nepoužité PNG (`gavo_colored.png` 1,5 MB, `gavo_black.png` 0,8 MB) sa nasadzujú.
- Chýba `<footer>` landmark a skip link; prepínač témy bez `aria-pressed`.
- llms.txt bez `charset=utf-8`.

### Info
- FAQPage na všetkých stránkach: od 2026-05-07 bez rich results, neodstraňovať.
- Sitemap: validná, úplná, všetky URL 200 bez presmerovania, lastmod sedí s gitom.

## Čo funguje
- Jeden 301 skok http/apex → `https://www.gavalier.sk/`, kanonické URL všade sedia so sitemap.
- Statické HTML, žiadny JS na obsah; brotli, HTTP/3, TTFB ~70 ms.
- Unikátne title (46–60 znakov) a description (130–151), jedno H1, `lang="sk"`.
- AI roboty (GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot …) dostanú 200, Cloudflare ich neblokuje.
- Šablóna blogu je `noindex` a nenasadzuje sa; interné odkazy bez chýb a sirôt.
- Schéma parsuje, NAP a IČO konzistentné, dátumy blogu sedia.

## Podrobnosti
`findings/technical.md`, `content.md`, `schema.md`, `sitemap.md`, `geo.md`, `agentic.md`, `sxo.md`.
