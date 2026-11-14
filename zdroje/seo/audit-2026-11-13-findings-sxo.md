# SXO audit gavalier.sk (Search Experience)

Dátum: 2026-11-13. Rozsah: homepage, /ai-agenti/, /automatizacia/, /tvorba-webu/, /seo-llm-optimalizacia/.
SXO Gap Score je oddelené od SEO Health Score.

## Metóda a dáta

- Stránky: `render_page.py --mode always --json` (Playwright Chromium, všetky 200, `is_spa: false`, surové a vykreslené HTML sú zhodné: slová, H1, schema, odkazy) + `parse_html.py --json`. Výstupy: `scratch/seo-audit/data/sxo/*.render.json`, `*.parse.json`, `*.txt`.
- Mobilné screenshoty (above the fold): `scratch/seo-audit/data/sxo/shots/home/`, `shots/ai-agenti/`.
- SERP: Google SK priamo nedostupný (google.sk cez curl vracia iba JS presmerovaciu stránku, 0 výsledkov). WebSearch nástroja je US-only a vracal prevažne CZ/EN výsledky. Ako náhradu som použil DuckDuckGo HTML s regiónom `kl=sk-sk` (top 10 organických pre každú frázu, `data/sxo/ddg*.html`, parser `scratch/seo-audit/ddg_sxo.py`). Poradie nemusí zodpovedať Google SK; typy stránok a konsenzus sú spoľahlivejšie ako presné pozície.
- Konkurencia: 13 stránok z top výsledkov stiahnutých `render_page.py --mode never` (`data/sxo/comp/c1..c13.json`, signály skriptom `scratch/seo-audit/sxo_comp.py`).

## Hlavné zistenie (pred všetkým ostatným)

Typ stránky NIE JE hlavný problém: 4 z 5 stránok sú správne typované (servisná stránka na servisnú frázu, homepage na brand). Problém je, že **servisné podstránky nemajú povinné prvky typu Service Page**, ktoré má celá top 10: dôkaz (referencie, realizácie, prípadová štúdia), autora a CTA nad záhybom. Na brand dopyt web funguje (gavalier.sk je #1 pre "Marcel Gavalier"), na žiadnu z 8 nebrandových fráz sa v top 10 neobjavil (0/80 výsledkov obsahuje "gavalier.sk").

## SERP analýza a page-type mismatch

| Stránka | Hlavná fráza | SERP konsenzus (top 10, DDG sk-sk) | Typ stránky gavalier | Mismatch |
|---|---|---|---|---|
| / | Marcel Gavalier (brand) | navigačný: gavalier.sk #1, LinkedIn, 4x registre (dlznik.zoznam.sk, register.peniaze.sk, slovakdata.sk, foaf.sk), YouTube 2x | Landing/osobná servisná stránka | ALIGNED |
| /ai-agenti/ | AI agenti pre firmy | Service Page 8/10 (smartbase, aiinovator, muniofirma, laistra, iworker, mrdigital, eosagent, veltro), Blog 2/10 (netwrk.sk sprievodcovia) = 80 % | Service Page s definíciou (hybrid) | ALIGNED (chýbajú povinné prvky) |
| /automatizacia/ | automatizácia firemných procesov | Service Page 9/10 (operiq, perfect, smartprocesy, aimaka, reload, anasoft, tpsoft, automatizujeme, webize), sprievodca 1/10 (autoerp) = 90 % | Service Page | ALIGNED (chýbajú povinné prvky) |
| /tvorba-webu/ | tvorba webu na mieru | Service/Landing agentúr 10/10 (web-star, narative x2, deliweb, 123web, websnov, bugesweb, podnaweb, aaweb, fedic); všetky so sekciou realizácií/portfólia | Service Page bez portfólia | MEDIUM (typ sedí, chýba portfólio, ktoré má 10/10) |
| /seo-llm-optimalizacia/ | SEO a LLM optimalizácia webu | Blog/sprievodca 8/10 (euroekonom, ranktracker x2, optimalizaciapreai, text.com, tomarco, seoflash, firemny), Service 2/10 (fiuiagency, optimalizaciawebu) = 80 % informačný | Service Page s FAQ | MEDIUM (presná fráza je informačná; variant "SEO optimalizácia pre AI vyhľadávače" je zmiešaný: service aio, websy, effectix, visibility + 4 návody = Hybrid) |

Doplnkové SERP pozorovania:
- "tvorba web stránok Poprad": 10/10 lokálne stránky agentúr s "Poprad" v titulku (tvorbawebstranokpoprad.sk, setweb, mrdigital, ekobit, tatryagency, oficial, creeo, webeum, webcoria). Lokálny balík Google sa cez DDG nedá overiť.
- "koľko stojí AI agent": 8/8 cenové sprievodce s číslami (mrdigital "Chatbot od 1 500 €", spacesolutions "500 až 5 000 €", digitaliko "od 3 980 € mesačne").
- "automatizácia pre malú firmu": 6/8 návodov "kde začať / 10 procesov" (techdrive, gbiz, itgale, slovap, fakturaonline, spacesolutions).
- Konkurenčné stránky (13 vzoriek): 10/13 majú kontaktný formulár (`<form>`), 12/13 sekciu referencií/realizácií alebo príkladov, 8/13 FAQ. Príklady nadpisov: "Vybrané realizácie" (123web), "Aj takto môže vyzerať váš web (140+)" + "Povedali o nás" (narative), "Referencie" (fedic), "Vaše dáta ostanú u vás" (smartbase), "Automatizovaný monitoring správ v praxi" + "Kalkulačka úspory" (smartprocesy), "Jasný rozsah. Jasná cena." (reload).

## User stories (zo SERP signálov)

1. Ako **klient, ktorému Marcela odporučili**, chcem si za pár sekúnd overiť, že robí to, kvôli čomu volám (AI), lebo ma poslal známy, ale brzdí ma, že titulok vo výsledku hovorí "Weby, IT siete, eventy a live prenosy" a AI v ňom nie je, a vedľa sú registre dlžníkov a anglický LinkedIn "Versatile ninja of all tasks". *(Signál: brand SERP "Marcel Gavalier"; projektový kontext: docs/2026-08-18-problem-first-copy-design.md, klienti na odporúčanie)*. Fáza: decision.
2. Ako **majiteľ malej firmy**, chcem vedieť, ktoré moje procesy sa dajú automatizovať a koľko času ušetrím, ale brzdí ma chýbajúci konkrétny príklad a systémy, ktoré poznám. *(Signál: "automatizácia pre malú firmu" = 6/8 návodov "kde začať"; aimaka.sk "Pohoda, Kros, ERP"; webize "ušetrite 10 hodín týždenne"; smartprocesy "Kalkulačka úspory")*. Fáza: consideration.
3. Ako **kupujúci citlivý na cenu**, chcem odhad ceny AI agenta pred hovorom, ale brzdí ma, že stránka dáva iba rozpätie "od pár desiatok eur po tisíce", kým SERP ponúka cenové sprievodce s číslami. *(Signál: "koľko stojí AI agent" 8/8 cenové stránky)*. Fáza: consideration. Pozor: cenové kotvy sú na webe zakázané; riešenie nesmie pridať čísla.
4. Ako **opatrný manažér**, chcem vedieť, kde budú moje firemné údaje a kto zodpovedá za chybu agenta, ale brzdí ma, že stránka hovorí iba "AI robí aj chyby, navrhujem kontrolu človekom". *(Signál: KPMG "AI riziká a povinnosti", Blck Alpaca EU AI Act/GDPR, smartbase "Vaše dáta ostanú u vás", apertia "on-premise nasadenie a bezpečnosť")*. Fáza: consideration.
5. Ako **firma vyberajúca dodávateľa webu**, chcem vidieť weby, ktoré dodávateľ postavil, ale brzdí ma, že /tvorba-webu/ nemá ani jednu ukážku. *(Signál: 10/10 výsledkov "tvorba webu na mieru" má realizácie/portfólio)*. Fáza: decision.

## SXO Gap Score (7 dimenzií, 100 bodov)

| Dimenzia | / | ai-agenti | automatizacia | tvorba-webu | seo-llm |
|---|---|---|---|---|---|
| Page Type (15) | 13 | 12 | 12 | 10 | 9 |
| Content Depth (15) | 12 | 8 | 8 | 8 | 9 |
| UX Signals (15) | 10 | 7 | 7 | 7 | 7 |
| Schema (15) | 13 | 12 | 12 | 12 | 12 |
| Media (15) | 11 | 3 | 3 | 2 | 3 |
| Authority (15) | 9 | 3 | 3 | 3 | 3 |
| Freshness (10) | 8 | 8 | 8 | 8 | 8 |
| **Spolu** | **76** | **53** | **53** | **50** | **51** |

**SXO Gap Score webu (priemer 5 stránok): 57/100.**

Dôkazy k skóre:
- Content Depth: homepage 1 458 slov; podstránky 539-598 slov (parse_html word_count), konkurencia 330-1 700, ale s príkladmi z praxe, ktoré gavalier nemá.
- UX: na mobile (shots/ai-agenti) nad záhybom je iba H1 a perex, žiadny telefón; prvý viditeľný `tel:` odkaz je až v `page-cta` na konci (ai-agenti/index.html:303, automatizacia/index.html:316, tvorba-webu/index.html:317, seo-llm-optimalizacia/index.html:317). Telefón v kroku "Zavoláte na +421 915 697 915" je obyčajný text bez odkazu (ai-agenti/index.html:260, automatizacia:269, tvorba-webu:270, seo-llm:270). Žiadna stránka nemá formulár (`<form>` 0x). Homepage: telefón v hero je (index.html:520), ale na mobile pod záhybom (shots/home) a hlavička s menu sa ukáže až po ~500 px scrollu (spec, "Známe obmedzenie").
- Schema: všetky podstránky WebPage + Service + ProfessionalService + FAQPage + BreadcrumbList, valid (render_page structured_data); homepage Person, ProfessionalService, OfferCatalog, FAQPage. Body dole iba za chýbajúce prepojenie autora (Person) na podstránkach a Review (nemá sa pridávať bez reálnych dát).
- Media: podstránky majú 1 obrázok (dekoratívne oko v hlavičke, `aria-hidden`), žiadny portrét, screenshot ani diagram.
- Authority: podstránky 0 referencií, 0 prípadov, 0 autorského boxu; homepage 6 recenzií iba s názvom firmy bez mena osoby (index.html:1314-1353), žiadna sa netýka AI ani automatizácie (oblasti: Live stream, Web, Web, Správa webu, FOH zvuk, Project management).
- Freshness: dateModified 2026-11-11 v schema, htmldate 2026-11-11.

## Persóny a skóre (Relevance / Clarity / Trust / Action, po 25)

| Persóna (stránka) | Rel | Cla | Tru | Act | Spolu | Hodnotenie |
|---|---|---|---|---|---|---|
| Opatrný manažér, AI riziká (/ai-agenti/) | 14 | 15 | 8 | 12 | **49** | Needs Work |
| Firma vyberajúca webového dodávateľa (/tvorba-webu/) | 17 | 16 | 5 | 12 | **50** | Needs Work |
| Majiteľ malej firmy, automatizácia (/automatizacia/) | 19 | 17 | 7 | 12 | **55** | Needs Work |
| Kupujúci citlivý na cenu (/ai-agenti/, sekcia Koľko to stojí) | 13 | 14 | 15 | 15 | **57** | Needs Work |
| Zvedavý marketér, AI viditeľnosť (/seo-llm-optimalizacia/) | 18 | 19 | 11 | 11 | **59** | Needs Work |
| Odporúčaný klient overujúci meno (/) | 22 | 20 | 17 | 19 | **78** | Good |

Persóny 1-5 sú odvodené zo SERP signálov uvedených v user stories; persóna 6 zo SERP brand dopytu a projektového kontextu (odporúčania).

**Najslabšia persóna: Opatrný manažér (49).** Top problém: o údajoch, zodpovednosti a nasadení nič okrem jednej vety o chybách. Oprava: na /ai-agenti/ za sekciu "Kedy AI agent dáva zmysel" pridať H2 "Kde bežia vaše údaje" s 3 odpoveďami (kde agent beží, aké údaje vidí, kto kontroluje výstup) a rovnakú otázku do FAQ + FAQPage schema. Obsah je **treba vstup operátora** (skutočná prax: on-prem/cloud, poskytovatelia modelov, GDPR).

**Systémový problém: Trust** je najnižšia dimenzia pri 5 zo 6 persón (priemer 9/25 na podstránkach). Druhý: **Action** (CTA iba na konci, bez formulára).

## Zistenia (závažnosť, dôkaz, oprava)

### SXO-01 High: servisné podstránky nemajú žiadny dôkaz (referencie, prípad, realizácie)
- Dôkaz: ai-agenti/index.html, automatizacia/index.html, tvorba-webu/index.html, seo-llm-optimalizacia/index.html: žiadna sekcia recenzií ani príkladov (jediný výskyt "referencie" je odkaz v menu `/#referencie`). Konkurencia: 12/13 so sekciou realizácií/referencií.
- Oprava: pod "Čo konkrétne spravím" pridať H2 "Ako to dopadlo" s 1-2 citátmi z homepage, ktoré sa k službe hodia (tvorba-webu: Skarper "Náš web nám naši klienti chvália", CVI "O web sa nemusíme starať", index.html:1322, 1336) a odkaz na `/#recenzie`. Pre ai-agenti a automatizacia už verejne uvedený príklad z homepage (index.html:568: "Jeden klient chcel zvládnuť AI marketing, nakoniec mu stačil prehľad...") rozpísať ako mini prípad (situácia, čo sa spravilo, výsledok). Nové referencie, mená klientov a výsledky: **treba vstup operátora**.

### SXO-02 High: /tvorba-webu/ bez jedinej ukážky webu pri SERP, kde 10/10 ukazuje portfólio
- Dôkaz: tvorba-webu/index.html (1 obrázok, dekoratívny); jediný príklad je text "Tento web (gavalier.sk) je postavený ako statické HTML" (tvorba-webu/index.html:267). SERP: "Vybrané realizácie" (123web), "Vybrané projekty / Referencie" (fedic), "Aj takto môže vyzerať váš web (140+)" (narative).
- Oprava: sekcia H2 "Vybrané weby" so 3-4 screenshotmi (WebP, alt, šírka/výška) a odkazmi na živé weby; kandidáti z recenzií "Web" (Skarper, CVI). Ktoré weby smú byť uvedené: **treba vstup operátora** (spec zakazuje tvrdiť, že partneri sú klienti).

### SXO-03 High: žiadne CTA nad záhybom na podstránkach (mobil)
- Dôkaz: shots/ai-agenti (mobil 375 px): nad záhybom H1 + perex, bez telefónu; prvý `tel:` odkaz ai-agenti/index.html:303 (podobne 316/317 na ostatných). Hlavička podstránok má iba hamburger a meno (ai-agenti/index.html:187-196).
- Oprava: pod perex (`page-answer`, ai-agenti/index.html:244) pridať `<div class="page-cta"><a href="tel:+421915697915" class="link-arrow">+421 915 697 915</a><a href="mailto:marcel@gavalier.sk?subject=AI%20agent" class="link-arrow">Napísať</a></div>` (existujúca trieda, bez nového CSS); v kroku 1 "Ako to prebieha" urobiť z čísla `tel:` odkaz (ai-agenti:260, automatizacia:269, tvorba-webu:270, seo-llm:270). Voliteľne telefónna ikona v `site-header` na podstránkach.

### SXO-04 Medium: dôvera v AI službe bez informácie o údajoch a zodpovednosti
- Dôkaz: ai-agenti/index.html (žiadne GDPR, údaje, bezpečnosť; grep 0x). SERP: smartbase "Vaše dáta ostanú u vás", apertia "on-premise nasadenie a bezpečnosť", KPMG riziká AI.
- Oprava: pozri najslabšiu persónu vyššie. **Treba vstup operátora.**

### SXO-05 Medium: titulok homepage nehovorí o AI, hoci AI je priorita a prvý bod hero
- Dôkaz: index.html:42 `<title>Marcel Gavalier — Weby, IT siete, eventy a live prenosy</title>`; hero index.html:502 "AI a automatizácie · Weby..."; spec: "AI je prvé úmyselne". Vo výsledku pre "Marcel Gavalier" sa zobrazuje práve tento titulok.
- Oprava: `Marcel Gavalier — AI a automatizácie, weby, IT siete a eventy` (súčasne og:title/twitter:title ostávajú "Ste tu správne", meta description už AI má).

### SXO-06 Medium: odkazy z homepage na servisné stránky sú skryté v zbalenom akordeóne
- Dôkaz: sekcia "Poradím zdarma" s AI situáciami (index.html:540-575) nemá odkaz na /ai-agenti/ ani /automatizacia/; odkazy sú iba v `<details>` "Code & IT" (index.html:743-776, bez `open`), v hamburgri a pätičke.
- Oprava: do situácie 01 a 02 doplniť "<a href=\"/ai-agenti/\">Ako pracujem s AI agentmi</a>" a "<a href=\"/automatizacia/\">Čo sa dá automatizovať</a>".

### SXO-07 Medium: /seo-llm-optimalizacia/ cieli na informačnú frázu servisnou stránkou
- Dôkaz: "SEO a LLM optimalizácia webu" 8/10 návodov; stránka je služba s FAQ (title "SEO a LLM optimalizácia webu | Marcel Gavalier").
- Oprava: servisnú stránku posunúť na komerčný variant (titulok napr. "AI optimalizácia webu pre ChatGPT a Google | Marcel Gavalier"; SERP "SEO optimalizácia pre AI vyhľadávače" je zmiešaný) a informačnú frázu nechať blogu /blog/ako-sa-objavit-v-odpovediach-chatgpt/ s odkazom "Návod krok za krokom" hneď pod perexom. Sekcia "Čo sa dá a čo sa nedá sľúbiť" (seo-llm:265) je silný odlišovač, ponechať. Ako dôkaz použiť vlastný web (štruktúra, schema), konkrétne výsledky viditeľnosti: **treba vstup operátora**.

### SXO-08 Medium: žiadny formulár ani nízkoprahová cesta pre studeného návštevníka
- Dôkaz: `<form>` 0x na všetkých 5 stránkach; konkurencia 10/13 má formulár ("Napíšte nám — 20 min konzultácia zdarma" reload, "Rezervovať hovor" laistra). `mailto:` bez predmetu (ai-agenti/index.html:305).
- Oprava: minimálne `mailto:` s predmetom podľa stránky a vetou "Stačí pár viet, čo dnes robíte ručne". Formulár je rozhodnutie operátora (spec stavia na telefóne pre odporúčaných; pre nebrandový SERP je to bariéra).

### SXO-09 Medium: podstránky bez autora
- Dôkaz: podstránky nemajú portrét, meno v obsahu ani odkaz na `/#kto-to-robi` (iba v menu); konkurencia fedic "Prečo so mnou" + Person schema.
- Oprava: malý autorský box pred "Chcete to prebrať?": portrét `assets/gavo_edited.png` (zmenšený), "Marcel Gavalier, Poprad. Ručím vlastným menom." a odkaz "Kto to robí" na `/#kto-to-robi`; v schema `provider` → `{"@id":"https://www.gavalier.sk/#person"}`. Iba existujúce tvrdenia.

### SXO-10 Medium: cenová otázka v SERP je vyplnená číslami, web nedáva ani faktory ceny
- Dôkaz: "koľko stojí AI agent" 8/8 cenové sprievodce; ai-agenti/index.html:264-266 iba rozpätie. Pravidlá webu zakazujú kotvy "od X €".
- Oprava (bez čísel): v sekcii "Koľko to stojí" 3 odrážky "Od čoho cena závisí" (počet systémov, či treba úsudok AI, či má výstup kontrolovať človek) a blogový článok "Od čoho závisí cena AI agenta" (informačný zámer, bez kotiev).

### SXO-11 Low: rozpätie ceny na podstránkach v tvare "od ... po"
- Dôkaz: "Zákazky beriem od pár desiatok eur po tisíce" (ai-agenti/index.html:166, 265, 287; automatizacia:150, 274, 288; tvorba-webu:134, 275, 281; seo-llm:174, 275, 301; og:description index.html:19) vs. telo homepage "Beriem zákazky za pár desiatok eur aj za tisíce" (index.html:650). Tvar "od ..." je bližšie zakázanej kotve "od X €".
- Oprava: zjednotiť na formuláciu homepage "za pár desiatok eur aj za tisíce" na všetkých 4 miestach (telo, schema, meta/OG, llms.txt). Rozhodnutie operátora.

### SXO-12 Low: brand SERP pri overovaní mena
- Dôkaz: DDG "Marcel Gavalier": LinkedIn s anglickým headline "Versatile ninja of all tasks", YouTube s nesúvisiacim popisom, 4 registre (dlznik.zoznam.sk a ďalšie).
- Oprava: slovenský LinkedIn headline v súlade s webom ("AI a automatizácie, weby, IT siete a eventy | gavalier.sk") a odkaz na web; popis YouTube kanála. Úprava profilov: **treba vstup operátora**.

### SXO-13 Low: meno v hlavičke na mobile prekryté obrázkom oka
- Dôkaz: shots/ai-agenti: "MARCEL GAVALI" useknuté portrétom vpravo (site-header__brand, ai-agenti/index.html:194-195).
- Oprava: na šírke do 400 px zmenšiť `.site-header__eye` alebo pridať `padding-right` brandu.

### SXO-14 Low: lokálna fráza "tvorba web stránok Poprad" bez stránky
- Dôkaz: 10/10 lokálne stránky s "Poprad" v titulku; gavalier nemá lokálnu stránku (spec: Poprad iba v súvislosti s osobou).
- Oprava: vedome neriešiť, kým operátor nechce lokálny dopyt; ak áno, `/seo local` a GBP.

## Prioritné kroky

1. SXO-03 CTA pod perex + tel odkazy (bez vstupu operátora, rýchle).
2. SXO-01/02 dôkaz na podstránkach: najprv z existujúcich recenzií a príkladu z homepage, potom nové (vstup operátora).
3. SXO-04 údaje a zodpovednosť na /ai-agenti/ (vstup operátora).
4. SXO-05, SXO-06 titulok a odkazy z homepage.
5. SXO-07, SXO-10 obsahové úpravy seo-llm a cena bez čísel.

Krížové odporúčania: `/seo content` (E-E-A-T, autor), `/seo schema` (provider → Person na podstránkach), `/seo page` pre /tvorba-webu/, `/seo local` iba ak operátor chce Poprad.

## Obmedzenia

- Google SK SERP nebol pozorovaný priamo (JS stena); použitý DDG sk-sk a US WebSearch. SERP features (PAA, AI Overview, reklamy, lokálny balík, featured snippet) sa nedali overiť, user stories preto stoja na výsledkoch a titulkoch, nie na PAA.
- Bez dát o návštevnosti, konverziách a pozíciách (GSC/GA4); persóny nevážené objemom hľadania.
- Konkurenčné stránky stiahnuté bez JS (`--mode never`), signály sú regex odhad (napr. "projekty" v počte referencií).
- Hodnotenie Action pre odporúčaných klientov nezohľadňuje, že väčšina kontaktov ide telefonicky mimo webu (spec).

Generate a PDF report? Use `/seo google report`.

## JSON (audit-data.json, kategória Search Experience)

```json
{
  "category": "Search Experience",
  "sxo_gap_score": 57,
  "pages": {
    "/": {"keyword": "Marcel Gavalier", "serp_type": "navigational", "page_type": "Landing", "mismatch": "ALIGNED", "score": 76},
    "/ai-agenti/": {"keyword": "AI agenti pre firmy", "serp_type": "Service 80%", "page_type": "Service", "mismatch": "ALIGNED", "score": 53},
    "/automatizacia/": {"keyword": "automatizácia firemných procesov", "serp_type": "Service 90%", "page_type": "Service", "mismatch": "ALIGNED", "score": 53},
    "/tvorba-webu/": {"keyword": "tvorba webu na mieru", "serp_type": "Service 100% s portfóliom", "page_type": "Service bez portfólia", "mismatch": "MEDIUM", "score": 50},
    "/seo-llm-optimalizacia/": {"keyword": "SEO a LLM optimalizácia webu", "serp_type": "Blog 80%", "page_type": "Service", "mismatch": "MEDIUM", "score": 51}
  },
  "findings": [
    {"id": "SXO-01", "severity": "High", "title": "Servisné podstránky bez dôkazu (referencie, prípady)"},
    {"id": "SXO-02", "severity": "High", "title": "/tvorba-webu/ bez portfólia"},
    {"id": "SXO-03", "severity": "High", "title": "Žiadne CTA nad záhybom na podstránkach"},
    {"id": "SXO-04", "severity": "Medium", "title": "AI agenti bez informácie o údajoch a zodpovednosti"},
    {"id": "SXO-05", "severity": "Medium", "title": "Titulok homepage bez AI"},
    {"id": "SXO-06", "severity": "Medium", "title": "Odkazy na služby skryté v zbalenom akordeóne"},
    {"id": "SXO-07", "severity": "Medium", "title": "seo-llm: servisná stránka na informačnú frázu"},
    {"id": "SXO-08", "severity": "Medium", "title": "Bez formulára, mailto bez predmetu"},
    {"id": "SXO-09", "severity": "Medium", "title": "Podstránky bez autora"},
    {"id": "SXO-10", "severity": "Medium", "title": "Chýbajú faktory ceny (bez kotiev)"},
    {"id": "SXO-11", "severity": "Low", "title": "Rozpätie ceny v tvare od...po"},
    {"id": "SXO-12", "severity": "Low", "title": "Brand SERP: LinkedIn/YouTube mimo posolstva"},
    {"id": "SXO-13", "severity": "Low", "title": "Meno v mobilnej hlavičke prekryté"},
    {"id": "SXO-14", "severity": "Low", "title": "Lokálna fráza Poprad bez stránky"}
  ],
  "personas": [
    {"name": "Opatrný manažér", "page": "/ai-agenti/", "score": 49},
    {"name": "Kupujúci webu", "page": "/tvorba-webu/", "score": 50},
    {"name": "Majiteľ malej firmy", "page": "/automatizacia/", "score": 55},
    {"name": "Cenovo citlivý", "page": "/ai-agenti/", "score": 57},
    {"name": "Zvedavý marketér", "page": "/seo-llm-optimalizacia/", "score": 59},
    {"name": "Odporúčaný klient", "page": "/", "score": 78}
  ]
}
```

## Failures

- google.sk cez `curl -sL` (200, ale iba JS stránka "Kliknite tu, ak o pár sekúnd nedôjde k presmerovaniu", 0 výsledkov). Náhrada: DuckDuckGo HTML `kl=sk-sk`, fungovalo pre 11 fráz.
- WebSearch: US-only, výsledky pre slovenské frázy prevažne CZ/EN (firmy.cz, theses.cz, ranktracker); použité iba doplnkovo.
- `capture_screenshot.py` zapisuje vždy rovnaký názov súboru (`www_gavalier_sk_mobile.png`), prvé tri snímky sa prepísali; opakované do samostatných adresárov `shots/home`, `shots/ai-agenti`.
- DataForSEO SERP nepoužité (zadanie neuviedlo rozpočet).
