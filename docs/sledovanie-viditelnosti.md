# Sledovanie viditeľnosti gavalier.sk

Cieľ: raz mesačne zistiť, či sa web objavuje v odpovediach vyhľadávačov a AI asistentov pri typických otázkach, a zapisovať si zmeny v čase.

## Ako merať (raz mesačne)

1. Otvor ChatGPT (s vyhľadávaním), Perplexity a Google v novom, odhlásenom okne (aby osobná história neovplyvnila výsledok).
2. Zadaj každú otázku z tabuľky nižšie presne tak, ako je napísaná.
3. Zapíš dátum, nástroj a výsledok:
   - **Objavil sa?** áno / nie.
   - **Pozícia / ako zdroj:** poradie vo výsledkoch Google; pri ChatGPT a Perplexity či je gavalier.sk uvedený ako zdroj (odkaz), alebo len spomenutý v texte.
   - **Poznámka:** ktorá stránka sa zobrazila, ktorý konkurent, čo odpoveď tvrdila nepravdivo.
4. Každý mesiac skopíruj tabuľku do nového bloku s dátumom (napr. `## Meranie 2026-12`), pôvodné merania nemaž. Tak uvidíš vývoj.
5. Odpovede AI sa menia aj pri rovnakej otázke. Jedno meranie je len orientačné, hodnotu majú trendy za niekoľko mesiacov.

## Nástroje, ktoré treba pripojiť (jednorazovo)

- **Google Search Console** (https://search.google.com/search-console): pridaj doménu gavalier.sk, over vlastníctvo (DNS záznam alebo súbor), odošli `https://gavalier.sk/sitemap.xml`. Sleduj, ktoré stránky sú zaindexované a pri akých dopytoch sa zobrazujú.
- **Bing Webmaster Tools** (https://www.bing.com/webmasters): pridaj web (môžeš importovať z Google Search Console), odošli sitemap. Slúži na viditeľnosť v Bingu.
- Po pridaní nového článku alebo stránky: skontroluj v Search Console, že je zaindexovaná.

TODO(Marcel): potvrdiť, či sú Search Console a Bing Webmaster Tools pre gavalier.sk už pripojené (z repozitára sa to zistiť nedá).

## Otázky na sledovanie

Poznámka: toto sú otázky, ktoré by mohol zadať zákazník. Zoznam uprav podľa toho, čo si skutočne hľadajú klienti. Pri každej otázke zopakuj riadok pre každý nástroj (ChatGPT, Google, Perplexity).

| # | Otázka | Dátum | Nástroj | Objavil sa gavalier.sk? | Pozícia / ako zdroj | Poznámka |
|---|--------|-------|---------|-------------------------|---------------------|----------|
| 1 | Kto vytvorí web na mieru v Poprade? | | | | | |
| 2 | Programátor webov Poprad | | | | | |
| 3 | Tvorba webu na mieru Slovensko | | | | | |
| 4 | Ako automatizovať fakturáciu a e-maily v malej firme? | | | | | |
| 5 | Automatizácia firemných procesov Slovensko | | | | | |
| 6 | Kto vie prepojiť firemné systémy, ktoré spolu nehovoria? | | | | | |
| 7 | AI agenti pre firmy Slovensko | | | | | |
| 8 | Ako nasadiť AI agenta vo firme? | | | | | |
| 9 | Ako sa objaviť v odpovediach ChatGPT? | | | | | |
| 10 | SEO a optimalizácia webu pre AI asistentov | | | | | |
| 11 | Čo je llms.txt a potrebujem ho? | | | | | |
| 12 | Freelancer programátor Slovensko | | | | | |
| 13 | Marcel Gavalier | | | | | |
| 14 | Custom web development freelancer Slovakia | | | | | |
| 15 | Business process automation freelancer Slovakia | | | | | |
| 16 | How to get my website cited by ChatGPT? | | | | | |
| 17 | AI agent developer for small business Slovakia | | | | | |
| 18 | Web developer Poprad | | | | | |

## Ako čítať výsledky

- **Meno (otázka 13)** má sa objaviť skoro vždy. Ak nie, pozri indexáciu v Search Console.
- **Otázky 1 až 3, 12, 14, 18** sú konkurenčné; zlepšenie je pomalé a závisí od celého webu, nie od jednej úpravy.
- **Otázky 4, 9, 11, 16** zodpovedajú článkom na blogu; ak sa web nezobrazuje, skontroluj, či je stránka zaindexovaná a či text v prvom odseku priamo odpovedá na otázku.
- Ak AI o webe tvrdí nepravdivú vec, zapíš ju do poznámky a oprav zdroj (text na webe, štruktúrované dáta).
