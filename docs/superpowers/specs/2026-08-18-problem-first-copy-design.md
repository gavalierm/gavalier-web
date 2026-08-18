# Problem-first copy — gavalier.sk

**Dátum:** 2026-08-18
**Vetva:** `copy/problem-first`
**Rozsah:** iba obsah. Vizuál, CSS a JS zostávajú nedotknuté.

## Východisko

Web dnes hovorí o Marcelovi: kto je, čo vie, koľko rokov to robí. Zákazníka to nezaujíma — hľadá riešenie svojho problému a je mu jedno, kto ho dodá. Cieľ mutácie: prvá obrazovka patrí jeho problému, nie Marcelovmu životopisu.

### Ústredná otázka a jej riešenie

*Ako môže web tvrdiť, že rozumie problému návštevníka, keď sa ho nikto nespýtal?*

Nemôže — a preto to netvrdí. Web stojí na jedinom, čo je isté: **kto hľadá dodávateľa, ten má problém, inak by nehľadal.** Web problém nepomenuje za návštevníka, len vyloží päť najčastejších situácií a nechá ho, aby sa v jednej spoznal sám. Rozpoznanie prebehne v jeho hlave, nie v texte.

### Hlas

Teplý, ľudský, benefit-first. Druhá osoba, jednoduché slová. AI je dôvod, prečo je to dnes rýchlejšie a lacnejšie — hlavný pozitívny hook. Sebairónia zostáva, ale ako poznámka popod nadpis, nie ako pointa.

**Zakázané:**
- „aby mali pocit, že riešenie navrhli oni" — interná metóda, verejne znie ako priznanie manipulácie
- „vaša predstava je skoro vždy zlá" — uráža skôr, než presvedčí
- „nie som najlacnejší" a varovanie pred lacným dodávateľom — cenový signál bez čísla; čitateľ si dosadí svoj strop a odíde
- cenové kotvy a rozpätia — vedomé rozhodnutie, viď §Cena
- `<strong>` dlhšie než 2–3 slová — je to globálny modrý highlight

## Poradie sekcií

| # | Sekcia | Zmena |
|---|--------|-------|
| 1 | Hero | prepis |
| 2 | Poznáte sa v niečom z toho? | prepis sekcie *Tri oblasti*, 3 → 5 položiek |
| 3 | Koľko to bude stáť? | prepis *Nie som najlacnejší*, presun z 5. na 3. |
| 4 | Čo sa stane, keď napíšete | **nová sekcia** |
| 5 | Čo presne viem spraviť | akordeóny, nový nadpis |
| 6 | Majú to z krku | logá, nový nadpis, presun z 3. na 6. |
| 7 | Ich slová. Neprikrášlené. | recenzie, nový nadpis |
| 8 | Kto to bude robiť | **nový blok** v pätičke |
| 9 | Stačí napísať. A ja zavolám. | bez zmeny |

Sekcie 2 a 4 bežia v existujúcom komponente `.experience__areas` — **nula nového CSS**.

## Copy

### 1 · Hero

- Roles strip: `Weby a aplikácie · IT a siete · Eventy a live prenosy`
- H1: **Dá sa to vyriešiť.** — `headline-mark` na druhom riadku („vyriešiť.")
- Byline: `Marcel Gavalier · Solution Engineer`

> **Prečo je highlight na druhom riadku:** `.headline-mark` má `line-height: 1.25` + padding, takže modrý box prvého riadku zasahuje do priestoru diakritiky pod ním. Pri pôvodnom „Solution / Engineer." to nevadilo — „Engineer" diakritiku nemá. Pri „vyriešiť." apostrof nad „ť" do boxu narážal. Highlight na druhom riadku diakritiku aj descender „y" pohltí a navyše zvýrazní silnejšie slovo. V `section-lead__headline` je odstup riadkov väčší, takže tam kolízia nevzniká a highlight zostáva na prvom riadku.

> Neviem, čo presne riešite. Viem len, že ak ste tu, niečo vás štve a chcete to mať **z krku**. Web, ktorý brzdí. Akcia, ktorá sa blíži. Robota, čo vám žerie každý týždeň hodiny.
>
> Napíšte mi to po ľudsky a poviem vám rovno, či a ako sa to dá. Vďaka AI je dnes veľa vecí hotových **za dni**, nie mesiace — a za zlomok toho, čo stáli pred dvoma rokmi.

CTA: `Napíšte, čo riešite →` → `#contact` (dnes vedie na `#experience`)

### 2 · Poznáte sa v niečom z toho?

Podnadpis: *Toto sú veci, s ktorými mi ľudia píšu najčastejšie. Ak je medzi nimi aj tá vaša, viem, ako to dopadne — riešil som ju už veľakrát.*

Názvy sú hlasy klienta v prvej osobe — self-selection tým funguje silnejšie. Musia zostať krátke: `--text-heading` je až 43 px v black reze, dlhší názov by zabral tri riadky a rozbil rytmus sekcie.

1. **Web nás brzdí** — Vyzerá staro, nedá sa rozšíriť, alebo pri každej maličkosti čakáte na programátora. Dnes sa to prerobí za zlomok pôvodnej ceny — a texty či fotky si potom **meníte sami**.
2. **Nesmie to padnúť** — Konferencia, koncert, prenos naživo. Jeden pokus, druhý take nebude. Zvuk, kamery, stream aj svetlá **na jedného človeka** — vy sa venujete programu.
3. **Žerie nám to čas** — Prepisovanie údajov, ručné reporty, tisíc klikov, ktoré zvládne stroj. Toto je dnes **najlacnejšia vec**, akú si viete dať spraviť, a vráti sa vám za pár týždňov.
4. **Naháňam dodávateľov** — Každý ukazuje na druhého a vy ste zrazu projektový manažér. Píšete **jednému človeku** — koho zavolať a čo kedy urobiť, vyriešim ja.
5. **Neviem, ako na to** — Máte v hlave výsledok, ale nie cestu. To je normálne a je to **moja robota**, nie vaša. Zavolajme si a rozoberme to — nič to nestojí.

### 3 · Koľko to bude stáť?

Podnadpis: *Toľko, koľko na to máte.*

> Najčastejšia obava, s ktorou mi ľudia píšu, nie je „zvládne to?", ale „budem na to mať?". A skoro vždy je **zbytočná**.
>
> Skoro všetko sa dá spraviť aj v menšej verzii — takej, ktorá funguje hneď a dorobí sa, keď na to príde čas. Väčšina vecí navyše dnes stojí **výrazne menej**, než ľudia čakajú. AI zrazila cenu roboty a nemám dôvod predstierať opak.
>
> *(pull-quote)* Povedzte mi, čo riešite a s čím počítate. Poskladám to tak, aby sa to **zmestilo**.
>
> *(pull-quote)* Cenu poviem dopredu. Bez „plus-mínus podľa situácie", bez dodatočných hodín na konci. Riziká **nesiem ja**.
>
> *(closer)* Nikdy sa nestalo, že by sa niekto ozval a odišiel s tým, že si nemôže dovoliť ani hovor. Ten je zadarmo vždy.

**Kľúčové rozlíšenie:** ohýba sa **rozsah**, nie cena. „Spravíme verziu, ktorá sa zmestí" je legitímne; „vojdeme sa do vášho rozpočtu" znie, že cena vzniká podľa toho, koľko z klienta vypadne.

### 4 · Čo sa stane, keď napíšete

Podnadpis: *Žiadny formulár na dvadsať políčok. Štyri kroky a viete, na čom ste.*

1. **Napíšete** — Pár viet o tom, čo riešite. Nemusí to byť odborné, stačí po ľudsky.
2. **Ozvem sa** — Do dvoch dní. Opýtam sa na pár vecí, aby som pochopil, o čo vlastne ide.
3. **Poviem cenu** — Čo by som spravil, koľko to bude stáť a dokedy to bude hotové.
4. **Rozhodnete sa** — Ak vám to sedí, ideme. Ak nie, nič sa nedeje — **hovor nič nestojí**.

> Otvorené: „do dvoch dní" je default. Ak Marcel stíha 24 hodín, je to silnejšie.

### 5 · Čo presne viem spraviť

Podnadpis: *Ak chcete detaily, tu sú. Ak nie, pokojne preskočte — na hovore sa aj tak dostaneme k tomu, čo potrebujete **práve vy**.*

Tri akordeóny zostávajú. Vnútorné texty sa upravujú len tam, kde sa chvália namiesto sľubu.

### 6 · Majú to z krku

*Logá sú klasický trik, viem. Ale za každým je firma, ktorá mala problém a dnes ho **nemá**.*

Nadpis chytá späť „z krku" z hera — web tým dostane refrén.

### 7 · Ich slová. Neprikrášlené.

*Skrátil som ich, aby sa zmestili. Nič viac.*

Citáty sa nemenia — sú autentické.

### 8 · Kto to bude robiť

> Marcel Gavalier, Poprad. 12 rokov weby, siete a produkcia — a keďže sa to nedá stihnúť samo, mám okolo seba **preverených ľudí** a AI agentov, ktorí odrobia rutinu. Vám je jedno, kto to spraví. Mne nie — preto ručím za každého, koho k vám pošlem.

Sem sa sťahuje všetko „o mne". Na začiatku je návštevníkovi jedno, kto to spraví; až keď sa rozhoduje napísať, chce vedieť komu.

## Sprievodné súbory

Tvrdenie o cene žije na štyroch miestach a mení sa naraz, inak si AI crawlery prečítajú starú verziu:

| Súbor | Čo sa mení |
|---|---|
| `index.html` `<meta description>`, OG, Twitter | problem-first znenie |
| `index.html` schema.org | `description` u Person a ProfessionalService; FAQ „Prečo si Marcel pýta vyššiu cenu?" → „Koľko to stojí?"; FAQ o spolupráci → štyri kroky |
| `llms.txt` | §Pozícia prepísaná; záverečný odsek pre crawlerov bez „nie je najlacnejšia voľba" |
| `<title>` | doplnený o to, čo rieši, keywords zostávajú |

## Čo sa nemení

CSS, JS, logá klientov, citáty recenzií, kontaktné údaje, IČO/DIČ, portrét, prepínač témy, `sitemap.xml`, `robots.txt`, `manifest.json`.
