# Súhrn reálnych dát – gavalier.sk (2026-11-13)

Surové odpovede sú v tomto priečinku (`data/`). Tento súbor nemení FULL-AUDIT-REPORT.md ani ACTION-PLAN.md.

## Kľúčové čísla

| Oblasť | Výsledok | Zdroj |
|---|---|---|
| Spätné odkazy (DataForSEO, include_subdomains) | 41 odkazov, 40 odkazujúcich domén (32 dofollow), 34 IP, 41 stránok | `dfs-backlinks-summary.json` |
| Spam score profilu | 59 (vysoké, treba overiť) | `dfs-backlinks-summary.json` |
| Prvý výskyt odkazov | 2022-05-01 | `dfs-backlinks-summary.json` |
| Odkazujúce domény (vzorka) | 38 položiek, väčšina rank 0 a 1–2 odkazy, viaceré nevyzerajú tematicky (casino, poker, "tech" domény) | `dfs-referring-domains.json` |
| Rankované kľúčové slová (Slovensko, sk) | 0, DataForSEO nemá organické dáta pre gavalier.sk | `dfs-ranked-keywords.json` |
| Domain rank overview | prázdne (bez dát) | `dfs-domain-rank-overview.json` |
| Brand "gavalier" (SERP, depth 20) | gavalier.sk nie je v top 20 organic; výsledky sú hlavne kaviareň Gavalier (Banská Štiavnica, Banská Bystrica), Instagram @gavalier, slovník | `dfs-serp-1.json` |
| Brand "Marcel Gavalier" | gavalier.sk nie je v top 19; výsledky sú kaviarne Gavalier, firmy (finreg, prever.to), škola | `dfs-serp-2.json` |
| "AI poradenstvo" | gavalier.sk nie je v top 19; top: gopas.sk, viron.es (Strategické AI poradenstvo), firmy.slovensko.ai (AI konzultácie pre firmy), aj vzdelávacie kurzy | `dfs-serp-3.json` |
| "IT poradca pre firmy" | gavalier.sk nie je v top 19; top: azet.sk (IT poradenstvo), matess.sk, netsolution.sk, it-sprava.sk, onsoft.sk, cylex.sk | `dfs-serp-4.json` |
| Objem hľadaní (Google Ads, Slovensko, sk) | "tvorba webových stránok" 590 (MEDIUM, CPC 7.46); "tvorba webu" 170 (HIGH, CPC 5.88); "automatizácia procesov" 30; "IT poradenstvo" 10; "ai konzultant" 20; ostatné bez dát | `dfs-search-volume.json`, `dfs-keyword-overview.json` |
| CrUX, URL https://gavalier.sk/ | bez dát (nedostatočná návštevnosť; fallback na origin tiež bez dát) | `crux-url.json`, `crux-origin.json` |
| CrUX history, origin | bez dát | `crux-history-origin.json` |
| Bing Webmaster, site https://gavalier.sk/ | API funguje, GetLinkCounts 0 odkazov, GetRankAndTrafficStats/GetCrawlStats/GetQueryStats/GetPageStats/GetFeeds prázdne | `bing-counts.json`, `bing-links.json`, `bing-GetRankAndTrafficStats.json`, `bing-GetCrawlStats.json`, `bing-GetFeeds.json` |
| Bing, URL info homepage | LastCrawledDate 2026-10-23, DocumentSize 74 541 B, AnchorCount 1 | `bing-GetUrlInfo.json` |
| Bing, property https://www.gavalier.sk/ | rovnaké výsledky (prázdne stats, feeds) | `bing-www-*.json` |
| GSC 90 dní (predchádzajúci zber) | 15 riadkov dotazov, 1 klik, 15 zobrazení | `gsc-90d.json` (len kontext, nepreanalyzované) |

Cena DataForSEO spolu: približne 0,19 USD z 2 USD (keyword_overview 0,012; search_volume 0,09; backlinks summary 0,024; referring domains 0,025; domain rank overview 0,012; ranked keywords 0,012; SERP 4 × 0,004).

## Čo potvrdzuje alebo vyvracia FULL-AUDIT-REPORT.md

- **Potvrdené:** ranked keywords ani domain overview nemajú dáta, takže brandová a service viditeľnosť je v SERP prakticky nulová (gavalier.sk nie je v top 19–20 pri žiadnom z 4 dopytov). Potvrdené aj H9: pri "IT poradca pre firmy" dominujú firmy s názvom IT poradenstvo, gavalier.sk tam nie je.
- **Vyvrátené / upravené M14:** report tvrdí, že Bing Webmaster Tools nie sú nastavené. Overenie cez API ukazuje, že property https://gavalier.sk/ a https://www.gavalier.sk/ sú v BWT zaregistrované a API ich vracia, ale nemajú žiadne štatistiky ani odoslaný sitemap (GetFeeds prázdne). Presnejší stav: "zaregistrované, bez sitemap a bez dát o výkone". IndexNow som neoverovala.
- **Doplnené (report mal "nespustené"):** spätné odkazy sú 41 / 40 domén; report nemal žiadne čísla.
- **Potvrdené:** CWV nie sú merateľné z terénnych dát (CrUX bez dát). Výkon zostáva odhad z kódu, ako v reporte.
- **Nové riziko:** spam score 59 a väčšina odkazujúcich domén má rank 0 a nesúvisiace témy. Treba manuálne overiť, nie automaticky disavow.
- **Nová príležitosť:** "tvorba webových stránok" má 590 hľadaní mesačne a gavalier.sk tam nie je v top 19, hoci web má službu tvorba-webu. Toto je najväčší objem z testovaných dopytov.

## 3–7 najdôležitejších zistení

1. Doména nemá merateľnú organickú viditeľnosť: 0 rankovaných kľúčových slov v DataForSEO a žiadna pozícia v top 19–20 pri testovaných dopytoch (brand aj služby).
2. Brand dopyt "gavalier" je zahltený inými subjektmi (kaviareň Gavalier, Instagram). Pre firmu je to riziko zámeny a argument pre jasnejší brand signál (sameAs, register, konzistentné meno).
3. Najväčší objem zo služieb je "tvorba webových stránok" (590/mes., CPC 7,46) a "tvorba webu" (170/mes.). Pre "AI poradenstvo", "IT poradca pre firmy" a "IT poradenstvo" je objem nízky až nulový, takže SEO nie je hlavný kanál; to je v súlade s referral modelom klientov.
4. Spätné odkazy: 41 odkazov od 40 domén, väčšinou nízka kvalita a spam score 59. Report by mal počítať s touto metrikou v odporúčaniach (ref. domény, nie počet).
5. Bing Webmaster je zaregistrovaný, ale bez odoslaného sitemap a bez dát. Akcia: odoslať sitemap a overiť indexáciu; posledné crawlovanie homepage 2026-10-23.
6. CrUX nemá žiadne dáta ani pre URL, ani pre origin. Field CWV nemožno použiť na overenie optimalizácie výkonu; treba spoliehať na lab meranie alebo až potom, keď návštevnosť vzrastie.
7. Dopyty z SERP s "AI poradenstvo" vracajú predovšetkým konkurentov s vlastnými stránkami služieb (gopas.sk, viron.es, firmy.slovensko.ai); to podporuje odporúčanie rozšíriť servisné stránky o dôkazy a jasné H1 (report H5, H6).

## Obmedzenia

- DataForSEO SERP vracia v poli `domain` pre organické výsledky hodnotu "google.com" (presmerovacie URL). Domény konkurentov som preto určila z názvu a breadcrumb poľa, nie z URL.
- Z 14 keyword_overview dopytov vrátila služba dáta len pre 4; search_volume endpoint vrátil dáta len pre 4 z 14 (ostatné null, t. j. bez dát, nie nula).
- Bing stats sú prázdne napriek úspešnému API volaniu; neviem povedať, či je to stav "bez návštevnosti" alebo chýbajúci prístup k dátam.
