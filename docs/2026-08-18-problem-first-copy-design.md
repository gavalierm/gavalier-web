# Prepis obsahu gavalier.sk — web, ktorý potvrdzuje odporúčanie

**Dátum:** 2026-08-18
**Vetva:** `copy/problem-first`
**Rozsah:** obsah + hamburger menu. Existujúci vizuál, CSS a JS zostali nedotknuté.

## Východisko a kľúčové zistenie

Pôvodný web hovoril o Marcelovi: kto je, čo vie, koľko rokov to robí. Prvý návrh sme preto postavili ako problem-first lovecký web pre studeného návštevníka z Googlu.

**To bol zlý predpoklad.** Z rozhovoru s Marcelom vyplynulo: *„Nikto ma neoslovuje, väčšina mojich klientov je referral od iných klientov, takmer vždy telefonicky."*

Skutočný návštevník teda prichádza **už s dôverou** — niekto mu Marcela odporučil a on si ho overuje. Web preto nemá presviedčať, že problém existuje; má:

1. potvrdiť, že odporúčanie sedelo,
2. zabiť obavu z ceny (na nej to podľa Marcela najčastejšie padá),
3. ukázať záruku (podľa Marcela to je to, čo reálne uzatvára obchody),
4. spraviť telefonát čo najľahším.

## Hlas a pravidlá

Teplý, ľudský, benefit-first. Druhá osoba, jednoduché slová. AI je dôvod, prečo je to dnes rýchlejšie a lacnejšie.

**Vzťah:** poradca, nie dodávateľ. Marcel stojí na strane klienta, nie oproti nemu.

**Zakázané:**
- tvrdiť, čo si zákazník myslí alebo čoho sa bojí — Marcel to nevie odhadnúť, takže je to špekulácia
- naznačovať, že klient niečo nevie; namiesto toho „to sa dá naučiť a ukážem vám ako"
- hovoriť o vyhadzovaní doterajších dodávateľov — klient s nimi má vzťahy a nechce konflikt
- „nie som najlacnejší", varovanie pred lacným dodávateľom, cenové kotvy typu „od X €"
- „prvý hovor je zadarmo" — implikuje, že ďalšie sa platia
- akékoľvek „AI robím 12 rokov" — vecná nepravda
- Poprad v inej súvislosti než Marcelova osoba (ľudia okolo neho nie sú z Popradu)
- tvrdiť, že logá sú klienti — časť sú partneri, ktorým nič nedodáva

**Highlighty** (`<strong>` = modrý box): 2–3 slová, pozitívne, musia dávať zmysel samostatne. Výnimka: ucelená krátka veta (`Najrýchlejšia cesta je zavolať`).

**Nadpisy sekcií:** highlight je ukončená fráza, druhý riadok ju dopĺňa — `Ručím za to. / Štyrmi spôsobmi.` Nikdy nerozdeliť vetu tak, aby highlight bol jej prvou polovicou.

## Štruktúra

| # | Sekcia | Nadpis | Úloha |
|---|--------|--------|-------|
| 1 | Hero | Ste tu **správne.** | potvrdí odporúčanie, telefón ako CTA |
| 2 | Situácie | **Poradím zdarma.** / Nech riešite čokoľvek. | self-selection, AI body navrchu |
| 3 | Záruka ⭐ | **Ručím za to.** / Štyrmi spôsobmi. | toto uzatvára obchody |
| 4 | Cena | **Koľko to stojí?** / Zmestíme sa. | zabíja obavu, na ktorej to padá |
| 5 | Priebeh | **Štyri kroky.** / Od problému k riešeniu. | znižuje bariéru kontaktu |
| 6 | Služby | **Detaily.** / Podľa toho, čo riešite. | päť akordeónov podľa problému, AI prvé, eventy posledné |
| 7 | Logá | **Logá.** / Klasický trik. | priznáva, že časť sú partneri |
| 8 | Recenzie | **Ako to dopadlo.** / Ich slovami. | dôkaz |
| 9 | Kto to robí | **A kto to robí?** / Ja a ľudia okolo mňa. | identita až tesne pred kontaktom |
| 10 | Kontakt | **Zavolajte.** / Telefón povie viac. | telefón pred mailom |

Sekcie 2, 3 a 5 bežia v existujúcom komponente `.experience__areas` — bez nového CSS.

## Situácie (sekcia 2)

Nadpisy sú **otázky** — čitateľ si na ne odpovie za pol sekundy a otázka neznie ako výčitka. Musia byť konkrétne; abstraktná výzva („Prestaňte to trpieť") nemá výpovednú hodnotu.

1. **Kupujete AI kurzy?** — nástroje má každý, chýba odpoveď na otázku, čo treba spraviť. *To sa dá naučiť a rád vám ukážem ako.*
2. **AI vám nahodí produkty** — nahadzovanie na eshop, prepisovanie údajov, reporty po večeroch
3. **Drobnosť, ktorá vás brzdí?** — malo byť dávno hotové, dnes je to zastarané; nadhľad ušetrí čas aj peniaze
4. **Určite viete ako na to?** — *(z reálnej zákazky: klient sa chcel učiť AI marketing, stačil mu dashboard)*
5. **Chystáte podujatie?** — vecný, nepredáva sa; zvukárčiny chce Marcel menej

AI je prvé úmyselne — Marcel chce tento typ práce najviac.

## Záruka (sekcia 3)

Platia všetky štyri naraz. Marcel ich potvrdil explicitne.

1. **Cenu dodržím** — bez „plus-mínus"; ak sa práca natiahne, dodatočné hodiny neúčtuje
2. **Platíte len za výsledok** — ak dodané nesedí s dohodou, peniaze nepýta
3. **Ostávam k dispozícii** — rámované ako rast, nie ako porucha („opravím, keď sa pokazí" podprahovo sľubuje, že sa niečo pokazí)
4. **Ručím vlastným menom** — za subdodávateľov

> **Riziko:** bod 2 je verejný záväzok, ktorý sa dá zneužiť. Marcel o tom vie a trvá na ňom.

## Cena (sekcia 4)

Žiadne kotvy ani rozpätia typu „od X €" — Marcel ich odmietol; cenotvorba je uňho kreatívny proces a rozsah sa skladá podľa klienta. Cieľ je, aby zákazník cítil, že **na Marcela má**.

Ohýba sa **rozsah**, nie cena: „nájdeme verziu, ktorá sa zmestí" je legitímne, „vojdeme sa do vášho rozpočtu" znie, že cena vzniká podľa toho, koľko z klienta vypadne.

Kľúčová veta, ktorá zabíja podozrenie z naceňovania podľa rozpočtu:

> Rozpočet mi pokojne povedzte hneď. Nie preto, aby som podľa neho nacenil — ale aby som vedel, akú verziu má zmysel navrhnúť.

## Navigácia

Hamburger vľavo v lepiacej hlavičke (vpravo je oko), celoobrazovkový panel s číslovaným zoznamom `01`–`09` a telefónom na konci. Nové súbory `css/components/site-nav.css` a `js/site-nav.js`; existujúce sa nemenili.

Zatvára sa klikom na odkaz, Escape (fokus späť na tlačidlo) aj pri zmene hashu; zamyká scroll pozadia; `aria-expanded`, `aria-controls`, `prefers-reduced-motion`.

**Známe obmedzenie:** hlavička sa podľa pôvodného `site-header.js` objaví až po ~500 px scrollu (mobil 300), takže hamburger nie je na prvej obrazovke.

## Sprievodné súbory

Tvrdenia o cene, zárukách a zábere žijú na štyroch miestach a menia sa naraz: `index.html` (telo), schema.org (`Person`, `ProfessionalService`, `Service`, FAQ), `<meta>`/OG/Twitter a `llms.txt`. Do FAQ pribudla otázka o záruke.

## Čo sa nemenilo

Vizuál, farby, typografia, existujúce CSS a JS, logá klientov, citáty recenzií, kontaktné údaje, IČO/DIČ, portrét, prepínač témy, `sitemap.xml`, `robots.txt`, `manifest.json`.

## Otvorené

- **Cavaleers v logách klientov** — je to firma Marcelovho brata a v hero je uvedená ako jeho skupina; odporúčam z pásu lôg vybrať.
- **Sekcia Network & Infra** — servery boli z webu vyhodené, siete zostali.

## Aktualizácia 2026-11-13 (SEO fáza 1)

- **FAQ na homepage:** `FAQPage` sa zo schema odstránil a viditeľné FAQ sa nepridalo. Dôvody: štruktúra sekcií vyššie je uzavretá a FAQ by bola jedenásta sekcia, ktorá opakuje cenu, záruku a priebeh z tela; odpovede boli v tretej osobe, telo je v prvej; Google FAQ rozšírený výsledok ukončil, takže markup nemá SERP prínos. Zhodu s telom drží vlastné telo, súhrn pre AI nesie `llms.txt`. FAQ na podstránkach služieb zostáva (je tam viditeľné).
- **D-0005:** siete = koordinácia, nie vlastná práca. Sieťar a „robím siete“ sú preč z tela, schema, meta, päty, manifestu a llms.txt.
- **D-0006:** územie iba Slovensko (`areaServed` je jedna krajina; Česko a EÚ preč).
- **D-0007:** `sameAs` v Person a u autora blogu: LinkedIn a GitHub.
- **Project & People** bol iba v schema; nahradil ho Service Network & Infra podľa tela (koordinácia partnerov).
- **12+ rokov:** platí pre weby, aplikácie, zvuk a video; AI a automatizácie pribudli nedávno (znenie tela).
- **Rozpočet:** schema už netvrdí „podľa rozpočtu klienta“; rozsah sa prispôsobuje, cena nevzniká podľa rozpočtu (znenie tela).
- **Cena:** všade „za pár desiatok eur aj za tisíce“ (nie „od … po“).

## Aktualizácia 2026-11-13 (SEO fáza 3)

- **Nová stránka /ai-poradenstvo/ (AI poradenstvo pre firmy):** ponuka poradenstva, nie kurz (SERP na „ai poradenstvo“ obsadzujú kurzy). Píše iba z toho, čo už na webe je: situácie z homepage, rozlíšenie automatizácia / AI agent, kontrola človekom, príklad s AI marketingom, postup, záruka, cena. Forma platenej služby (hodiny, balíky) sa nedefinuje; platí „hovor aj návrh riešenia sú zadarmo a nezáväzné“. V navigácii je prvá, v pätách, sitemap, llms.txt, OfferCatalog, hero, situácii 01 a akordeóne Code & IT.
- **/seo-llm-optimalizacia/ → obchodný variant „SEO optimalizácia“** (480 hľadaní mesačne, KD 3): title, H1, úvod a schema ako ponuka služby; návodový obsah ostáva blogu a stránka naň odkazuje hneď v úvode. Adresa sa nemení. Štítok v navigácii a pätách je „SEO optimalizácia“.
- **Stránky služieb rozšírené na ~800 a viac slov:** každá má vlastný postup, „Čo dostanete“ a „Od čoho závisí cena“ (zoznam faktorov bez čísel a kotiev). Spoločné bloky (postup z troch krokov, cena, FAQ o výsledku a mieste) sú skrátené alebo prepísané podľa služby; text spoločný všetkým štyrom klesol z ~25–28 % na ~13 %.
- **Čo sa vedome nepridalo:** údaje a zodpovednosť pri AI agentoch (SXO-04), nové referencie, mená klientov a výsledky (vstup operátora). Disavow sa nerobí.

## Aktualizácia 2026-11-13 (riešim problémy, nie zákazky, D-0010)

- **Hero:** nová veta **Riešim problémy,** nie zákazky. a odstavec „Povedzte mi, čo vás brzdí…“; pás s odbormi, veta „Robím automatizácie…“ aj riadok štítkov služieb s odkazmi sú preč (operátor: zoznam pôsobil nasilu kvôli SEO; podstránky odkazujú navigácia, Detaily a päta).
- **Priebeh:** štyri kroky namiesto troch (Pomenujeme problém, Poviem riešenie, Vyriešim to, Ďalší problém); krok 04 preberá záruku „Ostávam k dispozícii“.
- **Detaily:** päť akordeónov podľa problému (Menej rutiny, Prehľad kde to škrípe, Web ktorý pracuje, Siete bez starostí, Akcia bez starostí) namiesto Code & IT / Network & Infra / Audio\Video & Stage; položky sa len presunuli, OfferCatalog a ItemList v schema sú preskupené rovnako.
- **Stránky služieb:** nová sekcia „S čím vám to pomôže“ (situácie z textov, ktoré už na webe sú), „Čo konkrétne spravím“ → „Ako to vyriešim“, „Ako prebieha zákazka“ → „Ako to vyriešime“; H1, title a adresy sa nemenili.
- **Slovník:** zákazka → problém (cena, recenzie, Kto to robí, meta, OG, llms.txt). Zostáva „ručí … za každého subdodávateľa, ktorého k zákazke priberie“ (zákazka = spolupráca).
- **Cena:** tvar „za pár desiatok eur aj za tisíce“ (D-0008) je podľa operátora 2026-11-13 nahradený (D-0011) vetou „Na cene sa dohodneme vopred a viete, koľko stojí riešenie.“ v tele, schema, FAQ, meta, OG, Twitter a llms.txt (index.html aj stránky služieb); „podľa toho, čo treba spraviť“ sa vypustilo. Na stránkach služieb sa vypustila aj opakujúca sa veta „Cenu poviem dopredu a platí“, ostáva „Ak sa práca natiahne, dodatočné hodiny neúčtujem.“
- **Vedome nie:** nové sľuby (návrh na jednu stranu, prístupy a kód patria klientovi, ukončenie po každom kroku) ani tracker zaseknutých problémov.
