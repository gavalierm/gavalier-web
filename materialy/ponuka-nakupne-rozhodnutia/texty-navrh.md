# Návrh textov: „Riešim problémy, nie zákazky“

Stav: návrh na schválenie, v HTML sa zatiaľ nič nemenilo. Ide iba o tvrdenia, ktoré na webe už sú (záruky, cena, postup, príklady, citáty klientov), preložené z jazyka zákaziek a odborov do jazyka problémov. Platia pravidlá zo spec 2026-08-18: neopisuje sa, čo si klient myslí alebo čoho sa bojí, žiadne cenové kotvy a highlight má 2–3 slová.

Značky: **Teraz** = súčasné znenie, **Návrh** = nové znenie. `**…**` = highlight (modrý box).

---

## 1. Homepage – hero

**Teraz**
> AI a automatizácie · Weby a aplikácie · Siete s partnermi · Eventy
> Robím automatizácie, weby a aplikácie, zvuk a video na eventy; siete koordinujem. Väčšinou to, čo dnes potrebuje každá moderná firma či domácnosť.

**Návrh**
> **Riešim problémy,** nie zákazky.
> Povedzte mi, čo vás brzdí. Riešením môže byť skript, web, AI agent alebo len dobrá rada – vyberieme to, čo problém naozaj vyrieši. Robím automatizácie, weby a aplikácie, zvuk a video na eventy; siete koordinujem s partnermi.

H1 „Ste tu **správne.**“ sa nemení. Ostávajú aj veta o Cavaleers, „Najrýchlejšia cesta je zavolať…“ a riadok so štítkami služieb (odkazy na podstránky kvôli SEO).

## 2. Homepage – cena

**Teraz**
> Beriem zákazky za pár desiatok eur aj za tisíce. Podľa toho, čo treba spraviť.
> Drobná úprava na pol hodiny je rovnako legitímna zákazka ako projekt na tri mesiace. S malou vecou vás neposielam preč a nerobím z nej veľkú.

**Návrh**
> Riešim problémy za pár desiatok eur aj za tisíce. Podľa toho, čo treba spraviť.
> Drobnosť na pol hodiny je rovnako dôležitý problém ako projekt na tri mesiace. S malou vecou vás neposielam preč a nerobím z nej veľkú.

Tvar ceny „za pár desiatok eur aj za tisíce“ ostáva (D-0008). Ostatné odseky sekcie ostávajú bez zmeny.

## 3. Homepage – priebeh (namiesto „Tri kroky. / To je celé.“)

**Návrh**
> **Štyri kroky.** / Od problému k riešeniu.
> Po prvom hovore viete, na čom ste. Bez formulárov na dvadsať políčok a bez čakania na ponuku dva týždne.

| # | Nadpis | Text |
|---|--------|------|
| 01 | Pomenujeme problém | Zavoláte alebo napíšete pár viet o tom, čo vás brzdí – nemusí to byť odborné, stačí po ľudsky. Opýtam sa na pár vecí, aby som pochopil, o čo ide. |
| 02 | Poviem riešenie | Často sa ukáže, že sa to dá spraviť jednoduchšie. Poviem, čo by som spravil, koľko to bude stáť a dokedy. Ak stačí menší zásah, poviem vám to rovno. |
| 03 | Vyriešim to | Ak vám to sedí, ideme. Ak nie, nič sa nedeje – hovor aj návrh riešenia sú zadarmo a nezáväzné. |
| 04 | Ďalší problém | Keď príde ďalšia vec, voláte niekomu, kto ju už pozná. Nehľadáte nikoho nového a nevysvetľujete to odznova. |

Krok 04 je cesta „klient natrvalo“. Text preberá záruku 03 „Ostávam k dispozícii“, nie je to nový sľub.

## 4. Homepage – Detaily (zoradené podľa problému, nie podľa odboru)

**Teraz:** tri akordeóny Code & IT / Network & Infra / Audio\Video & Stage.

**Návrh:** päť akordeónov. Položky ostávajú tie isté a iba sa presúvajú. Nadpis sekcie: „**Detaily.** / Podľa toho, čo riešite.“

| Akordeón | Podnadpis | Položky (súčasné) |
|---|---|---|
| Menej rutiny | Čo dnes robí človek klikaním, môže robiť skript. | Automatizácia rutinnej práce · CMS pre netechnikov |
| Prehľad, kde to škrípe | Najprv zistiť, kde sa práca zasekáva, potom riešiť. | AI poradenstvo pre firmy · AI agenti a dashboardy · Kontrola architektúry a špecifikácie |
| Web, ktorý pracuje | Web, ktorý nájdu ľudia aj AI a ktorý si upravíte sami. | Custom web a PWA · Dizajn pre návštevníka · SEO optimalizácia · Hosting, doména, deployment · AI-first pipeline |
| Siete bez starostí | Sám to nerobím, ale viem, koho zavolať. Jeden kontakt, jedna zodpovednosť. | Tím sieťarov a adminov · Jeden kontakt · Preverenie a kvalita · Bezpečnostný audit cez partnerov |
| Akcia bez starostí | Vy riešite program, techniku nechajte na mňa. | Multi-cam · Live streaming · FOH · Stage lighting · Akustické úpravy |

Poradie dodržiava spec: AI ide prvá, eventy posledné. Zodpovedajúco sa preskupí aj OfferCatalog v schema.

## 5. Homepage – drobnosti

| Miesto | Teraz | Návrh |
|---|---|---|
| Recenzie, úvod | Šesť firiem, šesť rôznych zákaziek, jedna otázka: dopadlo to dobre? | Šesť firiem, šesť rôznych problémov, jedna otázka: dopadlo to dobre? |
| Kto to robí | Každá dobre odvedená zákazka mi privedie ďalšiu | Každý dobre vyriešený problém mi privedie ďalšieho klienta |

## 6. Stránky služieb (adresy a H1 sa nemenia kvôli SEO)

Na každej stránke:
- Pred „Čo konkrétne spravím“ pribudne sekcia **„S čím vám to pomôže“** so 3–4 situáciami z textov, ktoré na webe už sú. „Čo konkrétne spravím“ sa premenuje na **„Ako to vyriešim“**.
- „Ako prebieha zákazka“ → **„Ako to vyriešime“**.
- „Zákazky beriem za pár desiatok eur aj za tisíce“ → „Riešim problémy za pár desiatok eur aj za tisíce“ (v tele aj vo FAQ).

| Stránka | „S čím vám to pomôže“ (zdroj) |
|---|---|
| /automatizacia/ | Údaje sa prepisujú z jedného systému do druhého. · Reporty sa skladajú ručne, často po večeroch. · Produkty na eshop nahadzuje človek. · Systémy spolu nehovoria. (homepage, situácia 02) |
| /ai-agenti/ | Správy, e-maily a formuláre sa čítajú a triedia ručne. · Údaje v dvoch systémoch nesedia a prísť na to treba ručne. · Prehľad o procese je roztrúsený v systémoch, ktoré spolu nehovoria. (typické úlohy pre agenta na stránke) |
| /tvorba-webu/ | Na zmenu jedného tlačidla treba čakať na programátora. · O web sa nemá kto starať. · Šablóna nerobí to, čo biznis potrebuje. (citáty Cavaleers a CVI, „bez preplácaných šablón“) |
| /seo-llm-optimalizacia/ | Web nie je vidieť v Google ani v odpovediach AI. · Web má technickú chybu, ktorá ho z výsledkov vyraďuje (zablokovaný crawler, chýbajúca mapa stránok). (sekcia „Čo sa dá a čo sa nedá sľúbiť“) |
| /ai-poradenstvo/ | Bez novej sekcie: „S čím vám poradím“ je už zoznam problémov. Mení sa iba veta o cene. |

/tvorba-webu/, FAQ „Dokážete web aj upraviť…“: „Áno. Zákazka môže byť aj malá úprava existujúceho webu.“ → „Áno. Riešim aj malé úpravy existujúceho webu.“

## 7. Meta, OG a llms.txt (podľa skillu texty-webu meniť naraz s telom)

| Miesto | Teraz | Návrh |
|---|---|---|
| meta description | Marcel Gavalier, Poprad: AI a automatizácie, weby a aplikácie, zvuk a video na eventy, siete s partnermi. Cena dopredu, platíte len za výsledok. +421 915 697 915. | Marcel Gavalier, Poprad: riešim problémy, nie zákazky. AI a automatizácie, weby a aplikácie, eventy, siete s partnermi. Cena dopredu, platíte len za výsledok. +421 915 697 915. |
| og:description | … Zákazky za pár desiatok eur aj za tisíce. | … Riešim problémy za pár desiatok eur aj za tisíce. |
| llms.txt, súhrn | … Zákazky berie za pár desiatok eur aj za tisíce. | … Rieši problémy, nie zákazky: za pár desiatok eur aj za tisíce. |
| llms.txt, cena | Marcel berie zákazky za pár desiatok eur aj za tisíce … rovnako legitímna zákazka … | Marcel rieši problémy za pár desiatok eur aj za tisíce … rovnako dôležitý problém … |
| llms.txt | Pri každej zákazke vyhodnotí, čo si vezme na seba … | Pri každom probléme vyhodnotí, čo si vezme na seba … |

`<title>` sa nemení (kľúčové slová pre SEO). Veta „ručí … za každého subdodávateľa, ktorého k zákazke priberie“ ostáva, lebo tam zákazka znamená spoluprácu.

---

## Čo v tomto kroku nie je
- Nové sľuby, ktoré musíte najprv potvrdiť: návrh na jednu stranu na schválenie, prístupy a kód patria klientovi, ukončenie po každom kroku, ozvanie sa po odovzdaní.
- Tracker zaseknutých problémov (meranie obmedzenia). Je to samostatný krok, nadviaže sa naň po textoch.
