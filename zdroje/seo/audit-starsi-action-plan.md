# Akčný plán gavalier.sk (z auditu 2026-11-13)

Poradie podľa závislostí. Pri každom kroku: ako zistíme, že nefungoval, a čo sledovať.

## Fáza 1: technika bez zmeny textov (do týždňa, ~3 h)
1. **Obrázky** (H1, H2, nepoužité PNG): `gavo_edited.png` → WebP/AVIF + `srcset`, `fetchpriority="high"`; hlavičkový obrázok lazy; og:image 1200×630; nepoužité PNG do `.assetsignore` alebo zmazať.
   Zlyhanie: PageSpeed mobil LCP > 2,5 s. Sledovať: LCP v PageSpeed / CrUX.
2. **`_headers`** (M1, M2): HSTS, nosniff, Referrer-Policy; dlhá cache pre `/css`, `/js`, `/assets` (potom treba meniť `?v=`).
   Zlyhanie: `curl -sI` nevráti hlavičky. Sledovať: securityheaders.com.
3. **404 stránka + 301** (Low): `404.html`, `not_found_handling: "404-page"` vo `wrangler.jsonc`.
4. **robots.txt upratať**: jedna `*` skupina + výslovné AI roboty, bez `Crawl-delay`, pridať Claude-SearchBot.
5. **Schema opravy** (M7, H3 technická časť): zmazať `founderOf`, zjednotiť `areaServed`, `article:author` ako URL v šablóne.

## Fáza 2: indexovanie a overiteľnosť (do týždňa, ~1 h, potrebuje operátora)
6. **sameAs** (H3): reálne profily (LinkedIn, GitHub, register). Iba operátor vie, ktoré.
7. **Sitemapy a IndexNow** (M14, V2, V3): v GSC znova odoslať `sitemap.xml` (posledná zo 16. 5. mala 6 URL, dnes 9); v Bing WMT odoslať sitemap (property sú zaregistrované, sitemap chýba); overiť IndexNow kľúč.
   Sledovať: počet indexovaných stránok v GSC / Bing.
7a. **Spätné odkazy** (V4): ručne prejsť 40 odkazujúcich domén (`data/dfs-referring-domains.json`), spam score 59; disavow iba po kontrole.

## Fáza 3: texty a konverzia (2–3 týždne, skill texty-webu, súhlas operátora)
8. **Kontakt pod H1 servisných stránok** (H5) a **dôkaz** (H6): referencie z domovskej stránky, záruky ako pás.
9. **H1/H2 a title domovskej stránky** (M4, M5, M6): jedna pozícia všade, opisné nadpisy, „poradca“.
10. **Meta descriptions** (H8) bez opakovanej koncovky.
11. **Rozšíriť servisné stránky** (H7) o špecifiká, menej spoločného textu.

## Fáza 4: obsah a autorita (mesiac 2)
12. **Prípady s číslami a príklady cien** (H4): iba reálne, z TODO v kóde.
13. **Stránka `/it-poradenstvo/`** (H9) a stránka o autorovi (M10). Objem hľadaní „IT poradenstvo“ je 10/mes., „tvorba webových stránok“ 590/mes. (V5): o poradí rozhodne operátor.
13a. **Brand** (V1): web nie je v top 20 ani pre „Marcel Gavalier“; sameAs a profily mimo webu sú predpoklad.
14. **Blog**: tabuľka AI robotov v článku o ChatGPT (M12), overiť e-fakturáciu (M13), obrázky do článkov.
15. **Mesačné sledovanie viditeľnosti** podľa `docs/sledovanie-viditelnosti.md`.

## Dáta auditu
- Doplnené 2026-11-13: Lighthouse (mobil 67, desktop 92), GSC 90 dní, CrUX (bez dát), Bing WMT, DataForSEO. Súhrn: `data/SUHRN-REALNE-DATA.md`.
- Nespustené: screenshoty (visual), GA4.
