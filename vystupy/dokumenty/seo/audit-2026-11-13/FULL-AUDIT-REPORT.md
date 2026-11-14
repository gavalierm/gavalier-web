# SEO audit gavalier.sk – 2026-11-13

Typ webu: osobný web, poradenstvo v IT a AI (služby, Slovensko, jednojazyčný sk), klienti hlavne na odporúčanie. Statický web, 8 stránok v sitemap, Cloudflare Workers.
Zdroj: šesť špecializovaných auditov (findings/*.md), živé dáta DataForSEO, kontrola zdroja aj živého webu (živý web sa bajtovo zhoduje s repom).

## SEO Health Score: 72/100

| Kategória | Váha | Skóre | Poznámka |
|---|---|---|---|
| Technické SEO | 22 % | 80 | crawl a indexácia v poriadku, chýbajú bezpečnostné hlavičky a cache |
| Kvalita obsahu | 23 % | 62 | E-E-A-T 54, rozpory medzi telom, schema a llms.txt |
| On-page SEO | 20 % | 74 | unikátne title/description/H1, title homepage bez AI |
| Schema | 10 % | 72 | všetky typy existujú, FAQPage bez viditeľného FAQ, areaServed |
| Výkon (CWV) | 10 % | 90 | Lighthouse lab (DataForSEO); stránka 1,7 MB, field dáta nie sú |
| AI pripravenosť | 10 % | 62 | crawlery povolené, llms.txt OK, slabá entita (sameAs) |
| Obrázky | 5 % | 58 | hero PNG 1,34 MB, logá bez rozmerov |

Samostatne: SXO 57/100 (dôvera na podstránkach 9/25), Lighthouse Accessibility 93, Best Practices 100, SEO 100.

## Viditeľnosť (DataForSEO, Google SK)
- Doména nerankuje na žiadne nebrandové kľúčové slovo (ranked_keywords 0; v top 10 pre 8 fráz 0 z 80 výsledkov). Na meno je na 1. mieste.
- Dopyt po službách je malý: tvorba web stránok 2400/mes (KD 97), seo optimalizácia 480 (KD 3), tvorba webu 170 (KD 87), ai agenti 70–110 (rastie), it konzultant 30, automatizácia procesov 30, ai konzultant 20; ai poradenstvo a automatizácia firmy bez merateľného dopytu.
- SERP „ai poradenstvo“ obsadzujú kurzy (GOPAS, Seduo, Consilium) a AI Overview – priestor pre stránku „AI poradenstvo pre firmy“.
- Spätné odkazy: 41 zo 40 domén, žiadny kvalitný .sk okrem slovakdomains.sk. Spam skóre 59 robí cudzí spam: 30 odkazov s kotvou „High Quality Dofollow Backlinks DA 50 PA 40 Premium PBN“ od 2026-07-07 (bestwebs123.site, m98ufa.com a ~12 ďalších). Disavow je voliteľný, Google takéto odkazy väčšinou ignoruje.

## Top zistenia
1. **Rozpory v tvrdeniach (High, treba operátora).** Siete: telo index.html:812 „Sám to nerobím“, ale title, hero, päta „Sieťar“ (index.html:1448), schema a llms.txt hovoria opak. Rozpočet: schema index.html:96 a :159 „skladá podľa rozpočtu klienta“ proti telu index.html:661. Záber SK/CZ/EÚ iba v schema. Služba „Project & People“ iba v schema. „12+ rokov“ zahŕňa aj AI.
2. **llms.txt porušuje pravidlá textov (High).** llms.txt:43–48 má iné situácie ako web a zakázané „klient sa to bojí“. Posiela sa ako text/plain bez charset, niektoré klienty ho čítajú zle zakódovaný.
3. **Chýba dôkaz a autor na podstránkach (High).** Žiadna referencia ani príklad na 4 stránkach služieb, /tvorba-webu/ bez ukážok webov, na mobile žiadny telefón nad záhybom.
4. **Slabá entita (High).** schema `sameAs` odkazuje len na vlastný web; LinkedIn, YouTube a GitHub existujú, ale web ich neuvádza. og:site_name „Gavalier“ sa zamieňa s Kaviarňou Gavalier.
5. **Bezpečnostné hlavičky a cache (High/Medium).** Bez HSTS, X-Content-Type-Options, Referrer-Policy, CSP; všetko `max-age=0` aj pre CSS/JS/obrázky.
6. **Obrázky (High).** assets/gavo_edited.png 1,34 MB ako LCP, gavo_colored_eye.png 279 KB na každej stránke, og_image.png 1212×716.
7. **FAQPage na homepage bez viditeľného FAQ (High).** index.html:330, 8 otázok.
8. **Tenký obsah (Medium).** Stránky služieb 534–608 slov, ~28 % textu spoločné; blog 2 články s TODO viditeľnými na živom webe.

## Čo funguje
Všetky URL zo sitemap 200, canonical vlastný, apex a http jedným 301 na www, citlivé súbory 404, lang="sk", unikátne title a description, priama odpoveď pod H1 na podstránkach, breadcrumbs, IndexNow a Bing Webmaster Tools, všetky AI crawlery povolené, server-side HTML, TTFB 70–100 ms, Brotli.

## Obmedzenia
- CWV z terénu (CrUX) ani GSC/GA4 nie sú; PageSpeed API vrátilo 429, výkon je laboratórny Lighthouse.
- Pozície overené DataForSEO a DuckDuckGo (sk-sk), nie priamo v Google.
- Zmienky značky (Reddit 403, LinkedIn 999) neoverené úplne.
