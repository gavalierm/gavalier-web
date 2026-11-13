# Zoznam tém pre blog

Tento súbor sa na web nenasadzuje (`.assetsignore` ho vynecháva). Postup písania a publikovania je v `docs/blog-postup.md`.

## Pravidlá pre všetky články

- Návod alebo prehľad, nie vymyslená prípadová štúdia. Reálny príklad (aj anonymizovaný) pridať len s údajmi, ktoré Marcel overí.
- Čísla, ceny a časy iba overené. Čo chýba, sa zapíše do `docs/otvorene-texty.md` (nie do HTML komentára, ten je v zdroji stránky verejný).
- Odpoveď na hlavnú otázku v prvom odseku, 2 až 3 vety zhrnutia hore, FAQ na konci, odkaz na príslušnú službu.
- Sieťové a audio/video témy sem nepatria. Blog je o programovaní, webe, automatizácii a AI.

## Návrhy 5 článkov

| # | Slug | Stav | Služba |
|---|------|------|--------|
| 1 | `ako-sa-objavit-v-odpovediach-chatgpt` | napísaný | `/seo-llm-optimalizacia/` |
| 2 | `ako-automatizovat-fakturaciu-a-emaily` | napísaný | `/automatizacia/` |
| 3 | `web-na-mieru-alebo-sablona` | návrh | `/tvorba-webu/` |
| 4 | `ai-agent-alebo-obycajna-automatizacia` | návrh | `/ai-agenti/` |
| 5 | `technicke-seo-maleho-webu-kontrolny-zoznam` | návrh | `/seo-llm-optimalizacia/` |

### 3. Web na mieru alebo šablóna: ako sa rozhodnúť

- Hlavná otázka: kedy sa oplatí web na mieru a kedy stačí šablóna alebo stavebnica?
- Osnova: čo potrebujete od webu (kontakt, predaj, rezervácie) → čo vám šablóna dá a čo nie → skryté náklady (úpravy, doplnky, rýchlosť, údržba) → kedy sa oplatí web na mieru → kedy radšej šablóna → kontrolný zoznam otázok.
- FAQ: Dá sa zo šablóny prejsť na web na mieru? Kto bude web spravovať? Čo je PWA a potrebujem ho?
- TODO(Marcel): reálne ceny a časy z tvojich projektov, ak ich chceš uviesť; inak nepísať čísla.

### 4. AI agent alebo obyčajná automatizácia: ako rozhodnúť

- Hlavná otázka: kedy stačí skript s pevnými pravidlami a kedy dáva zmysel AI agent?
- Osnova: čo je automatizácia a čo AI agent → rozhodovací postup (pravidlá pevné? práca s textom? chyba stojí peniaze?) → typické chyby AI a ako ich ošetriť (kontrola človekom, logy) → ako vyzerá prvý pilot → ako merať úsporu.
- FAQ: Môže AI agent robiť chyby? Kde bežia moje údaje? Kto za výsledok ručí?
- TODO(Marcel): ak máš vlastnú skúsenosť z nasadenia, doplniť jeden konkrétny (aj anonymizovaný) príklad.

### 5. Technické SEO malého webu: kontrolný zoznam

- Hlavná otázka: čo skontrolovať, aby vyhľadávače a AI asistenti web správne prečítali?
- Osnova: title a description → jeden H1 a štruktúra nadpisov → canonical → sitemap.xml a robots.txt → štruktúrované dáta a ich overenie → obrázky (alt, rozmery, lazy loading) → rýchlosť na mobile → Search Console a Bing Webmaster Tools → mesačná kontrola.
- FAQ: Ako overiť JSON-LD? Koľko trvá, kým sa zmena prejaví? Treba llms.txt?
- TODO(Marcel): doplniť odkaz na overovací nástroj, ktorý sám používaš.

## Ďalších 12 tém

1. Ako napísať zadanie pre programátora, aby ste dostali, čo potrebujete.
2. Čo je PWA a kedy sa oplatí pre malú firmu.
3. Ako napísať FAQ, ktoré pomáha zákazníkom aj vyhľadávačom.
4. Štruktúrované dáta pre malú firmu: čo je Organization, LocalBusiness a Service.
5. Čo je llms.txt a či ho potrebujete.
6. Ako zistiť, či vás citujú ChatGPT, Perplexity a Google: mesačný postup merania.
7. Automatizácia reportov: z tabuliek do prehľadu, ktorý sa pripraví sám.
8. Ako prepojiť eshop a účtovný systém bez ručného prepisovania.
9. Ako prebieha údržba webu po spustení a čo by mala obsahovať.
10. Claude Code v praxi: ako AI pomáha pri vývoji a prečo treba kontrolu človekom (code review, E2E testy).
11. Statický web bez frameworku: kedy stačí a kedy nie.
12. Hosting a nasadenie webu: základné pojmy (doména, DNS, SSL, CI/CD) po slovensky.
13. Ako vybrať dodávateľa webu: otázky, ktoré sa oplatí položiť pred objednávkou.
14. Rýchlosť webu na mobile: čo merať a čo opraviť ako prvé.

## Šablóna článku

Súbor `blog/_sablona/index.html` je vzor (obsahuje `noindex` a na web sa nenasadzuje). Postup použitia: `docs/blog-postup.md`.
