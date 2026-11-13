# Content Quality a On-Page SEO – gavalier.sk

Dátum: 2026-11-13 · Rozsah: index.html, 4 stránky služieb, blog (zoznam + 2 články), llms.txt · Zdroj: repo (`/home/agentic-root/agentic/Gavalier/gavalier-web`) a živý web `https://www.gavalier.sk` (všetkých 8 stránok aj llms.txt sa bajtovo zhodujú so zdrojom, overené `cmp` 2026-11-13). Pravidlá textov: `docs/2026-08-18-problem-first-copy-design.md`.

## Skóre

| Oblasť | Skóre |
|---|---|
| **Content Quality** | **62 / 100** |
| **On-Page SEO** | **74 / 100** |
| AI citation readiness | 68 / 100 |

### E-E-A-T (interný model skillu, nie váhy Google)

| Faktor | Váha | Skóre | Dôvod |
|---|---|---|---|
| Experience | 20 % | 45 | 6 citátov klientov (index.html:1313–1356), jeden reálny príklad (index.html:568), web ako vlastná ukážka (tvorba-webu/index.html:267). Žiadna prípadová štúdia ani portfólio, blog bez vlastnej skúsenosti (TODO v blog/…fakturaciu…:220, blog/…chatgpt:258). |
| Expertise | 25 % | 55 | Blog vecne presný, cituje OpenAI a Google dokumentáciu (obe URL vracajú 200). Chýba stránka autora, Person `sameAs` odkazuje len na seba (index.html:137). |
| Authoritativeness | 25 % | 40 | Logá známych firiem, ale priznane časť sú partneri (index.html:907); žiadne externé profily, zmienky ani menovite podpísané referencie. |
| Trustworthiness | 30 % | 70 | IČO, DIČ, adresa, telefón, e-mail, konkrétne záruky, poctivé „nikto nezaručí citáciu“. Strhávajú to rozpory medzi telom, schema.org a llms.txt (nižšie) a chýbajúca stránka o ochrane osobných údajov. |
| **Vážený súčet** | | **54** | |

### Metriky

| Stránka | Slová (main) | Min. podľa typu | Priem. dĺžka vety | Title (znaky) | Description (znaky) |
|---|---|---|---|---|---|
| / | 1 545 | 500 | 10,6 | 55 | 150 |
| /automatizacia/ | 536 | 800 | 9,9 | 50 | 151 |
| /tvorba-webu/ | 534 | 800 | 10,1 | 54 | 140 |
| /ai-agenti/ | 543 | 800 | 10,6 | 50 | 140 |
| /seo-llm-optimalizacia/ | 608 | 800 | 10,9 | 46 | 144 |
| /blog/ | 83 | – | 11,9 | 49 | 130 |
| /blog/ako-sa-objavit-v-odpovediach-chatgpt/ | 817 | 1 500 | 10,9 | 54 | 141 |
| /blog/ako-automatizovat-fakturaciu-a-emaily/ | 633 | 1 500 | 12,4 | 60 | 139 |

Čitateľnosť je výborná (vety 10–12 slov, priemerná dĺžka slova ~5 znakov, najviac 4 vety nad 25 slov na stránku). Minimá počtu slov sú prah pokrytia témy, nie faktor poradia.

Šablónovité metadáta (`metadata_template.py --pairs-file`, 8 stránok): `site_risk: low`, `templated_ratio: 0.0`, `shared_cta_phrases: {}`. Ručne: 4 z 5 description stránok služieb končia rovnakým „Cena dopredu, platíte za výsledok. Poprad(, celé Slovensko).“ – nástroj to nezachytil, je to sekundárne (Low, nižšie).

Prekryv obsahu stránok služieb (5-gramy): 26–40 % textu každej stránky služby sa opakuje na iných stránkach služieb, 25–28 % je na všetkých štyroch rovnako (bloky „Ako to prebieha“, „Koľko to stojí“, „Chcete to prebrať?“, FAQ o výsledku a mieste). Unikátny obsah na stránku služby je ~330–450 slov.

Extrakcia hlavného obsahu (`render_page.py`, trafilatura) z homepage **vynechá** H1, sekciu Situácie, celú sekciu Záruka („Ručím za to“, „Cenu dodržím“, „Platíte len za výsledok“) aj Tri kroky; ponechá akordeóny, recenzie a „Kto to robí“.

---

## Zistenia

### High

**H1. Schema.org tvrdí, že cena/riešenie sa skladá podľa rozpočtu – v rozpore s telom aj pravidlami.**
Dôkaz: index.html:96 („Rozsah riešenia skladá podľa rozpočtu klienta.“), index.html:159 („riešenie poskladá tak, aby sa zmestilo do rozpočtu“). Telo index.html:661: „Nie preto, aby som podľa neho nacenil – ale aby som vedel, akú verziu má zmysel navrhnúť.“ Spec (sekcia Cena) výslovne odmieta „vojdeme sa do vášho rozpočtu“.
Oprava: v oboch `description` nahradiť formuláciou tela, napr. „Skoro všetko sa dá spraviť vo viacerých verziách; rozpočet pomáha vybrať, akú verziu má zmysel navrhnúť.“ Zmenu spraviť naraz v schema, meta a llms.txt (pravidlo štyroch miest).

**H2. llms.txt má iný a zakázaný zoznam situácií než web.**
Dôkaz: llms.txt:44 „Roky niečo nefunguje a klient sa to **bojí** riešiť — dodávateľa pozná osobne, **vyhodiť ho** je nepríjemné, tak radšej **trpí**.“ To porušuje dve položky zoznamu Zakázané (čoho sa zákazník bojí; vyhadzovanie dodávateľov). Zoznam llms.txt:43–48 nezodpovedá telu (index.html:542–577: Kupujete AI kurzy? / AI vám nahodí produkty / Drobnosť, ktorá vás brzdí? / Určite viete ako na to? / Chystáte podujatie?).
Oprava: prepísať sekciu „S čím za ním ľudia chodia“ v llms.txt na päť situácií z tela v rovnakom poradí (AI navrchu), bez bodu 1.

**H3. Rozpor v zábere sietí (Network & Infra).**
Dôkaz: index.html:812 „Sám to nerobím. Ale roky som obklopený ľuďmi, ktorí to robia…“ vs. title index.html:42 „Weby, **IT siete**, eventy…“, hero index.html:509 „Robím … siete“, index.html:1378 „Webom a aplikáciám, **sieťam** … sa venujem viac ako 12 rokov“, päta na všetkých stránkach „Coder · AI Engineer · **Sieťar**“ (index.html:1448, automatizacia:367 …), schema `knowsAbout` Linux/MikroTik/Ubiquiti (index.html:121–123), Service Code & IT „MikroTik a Ubiquiti siete, Docker, SSL/TLS hardening“ (index.html:213), llms.txt:53 a :60 („Časť realizujú preverení partneri“ = časť, nie všetko).
Oprava: **treba vstup operátora** – ktoré tvrdenie platí. Potom zjednotiť title, hero, „Kto to robí“, pätu, schema a llms.txt na jednu formuláciu (napr. „siete cez preverených partnerov, koordinujem a ručím“).

### Medium

**M1. Title homepage nezodpovedá priorite ani description.** index.html:42 „Marcel Gavalier — Weby, IT siete, eventy a live prenosy“ – chýba AI a automatizácia, ktoré sú podľa specu zámerne prvé (hero index.html:501, description index.html:6 ich má prvé). WebPage `name` index.html:308 a WebSite `description` index.html:300 opakujú starý záber.
Oprava: napr. „Marcel Gavalier — AI, automatizácie, weby a eventy“ (≤ 60 znakov); rovnako v WebPage `name`, WebSite a ProfessionalService `description` (index.html:159).

**M2. Cenová formulácia „od pár desiatok eur po tisíce“ na podstránkach, OG a llms.txt.** Telo homepage index.html:650 a FAQ schema index.html:346 a llms.txt:34 majú „za pár desiatok eur aj za tisíce“. Inde je tvar „od … po“, ktorý sa blíži zakázanej kotve „od X €“: index.html:19 (og:description), llms.txt:3, automatizacia:150/274/288, tvorba-webu:134/275/281, ai-agenti:166/265/287, seo-llm-optimalizacia:174/275/301, blog/…fakturaciu…:126/267. Commit c2b6535 deklaruje „ostáva formulácia z hlavnej stránky“, čo nie je pravda.
Oprava: všade použiť doslovnú vetu tela „Beriem zákazky za pár desiatok eur aj za tisíce, podľa toho, čo treba spraviť.“ Či rozpätie smie byť vôbec, **treba vstup operátora** (spec zakazuje aj „rozpätia typu od X €“).

**M3. Záber krajín nesedí.** Schema areaServed SK + CZ + EU (index.html:184–186) a FAQ schema „Slovenska, Českej republiky a celej EU“ (index.html:386); telo homepage záber neuvádza, stránky služieb hovoria „na celom Slovensku“ (napr. automatizacia:304 a schema `areaServed` Slovensko), llms.txt nič. Oprava: **treba vstup operátora**, potom zjednotiť na štyroch miestach.

**M4. „12+ rokov“ v schema zahŕňa AI a koordináciu AI agentov.** index.html:96 („12+ rokov praxe v troch oblastiach — … Project & People (koordinácia ľudí a AI agentov). AI-first prístup…“), index.html:362 („bez prerušenia“), index.html:403. Telo index.html:1378 hovorí presne: 12 rokov web, siete, A/V, „Nedávno k tomu pribudli AI a automatizácie“. Spec zakazuje čokoľvek v duchu „AI robím 12 rokov“.
Oprava: v Person description, FAQ a ItemList prevziať vetu z tela; „bez prerušenia“ odstrániť, ak ho operátor nepotvrdí.

**M5. Schema služby „Project & People“ tvrdí ponuku, ktorá na webe nie je.** index.html:285 „B2B predaj a account management, team leadership a coaching, korporátna klientela, HR a PR, social media marketing“; knowsAbout „B2B Sales“, „Team Leadership“ (index.html:130–131). Telo nič také neponúka. Oprava: odstrániť alebo zúžiť na „koordinácia preverených freelancerov a AI agentov“, kým operátor ponuku nepotvrdí.

**M6. Neoverený prísľub návratnosti.** index.html:552 „…a vráti sa vám za pár týždňov.“ Bez dôkazu; vlastný blog radí čísla neuvádzať, ak nie sú overené (blog/…chatgpt:236). Oprava: odstrániť vedľajšiu vetu alebo nahradiť overeným údajom (**treba vstup operátora**).

**M7. Stránky služieb sú tenké a z ~28 % rovnaké.** 534–608 slov (prah 800), unikátnych ~330–450; opakované bloky napr. automatizacia:267–276 = tvorba-webu:268–276 = ai-agenti:258–266 = seo-llm:268–276. Oprava: zdieľané bloky skrátiť na jednu vetu + odkaz na /#zaruka a /#ako-to-funguje; uvoľnené miesto naplniť obsahom špecifickým pre službu – typické úlohy, čo klient dostane na konci, technické hranice, a už schválené citáty (Skarper „Web“ a CVI „Správa webu“ index.html:1324, :1338 na /tvorba-webu/; HB Reavis na /ai-agenti/ nie – je to PM). Konkrétne prípady **treba vstup operátora**.

**M8. Hlavný obsah homepage (Záruka, Situácie, H1) vypadáva pri extrakcii.** `render_page.py` (trafilatura) z homepage nevrátil „Ručím za to“, „Cenu dodržím“, „Platíte len za výsledok“, „Tri kroky“ ani H1 – teda práve sekciu, ktorá podľa specu uzatvára obchody. Na podstránkach sú záruky len ako jedna veta. Heuristika jedného extraktora, nie dôkaz o konkrétnom AI crawleri. Oprava: zaruky dať aj do prózy (`<p>`) v sekcii „Kto to robí“ alebo na samostatnú krátku stránku /zaruka/ s odsekmi; v podstránkach odkazovať na ňu.

**M9. Blog: 2 články, oba pod prahom a bez vlastnej skúsenosti.** 817 a 633 slov (prah 1 500), publikované v ten istý deň; TODO o reálnom príklade a meraní ostali (blog/…fakturaciu…:220, blog/…chatgpt:258). Oprava: doplniť vlastné meranie gavalier.sk a jeden anonymizovaný prípad (**treba vstup operátora**), napísať pripravené témy 3–5 z blog/ZOZNAM-TEM.md, aby /tvorba-webu/ a /ai-agenti/ mali vlastný článok (dnes na ne odkazujú len tematicky vzdialené články, tvorba-webu:310–311, ai-agenti:298).

**M10. Recenzie bez identity a jedna od vlastnej skupiny.** index.html:1313–1356: iba názov firmy, bez mena, roly a dátumu; „Cavaleers“ (index.html:1331) je podľa specu firma operátorovho brata a jeho skupina, podnadpis tvrdí „Šesť firiem“ (index.html:1309). Logá Cavaleers sú v páse 2× (index.html:926, :1071). Oprava: **treba vstup operátora** – mená/roly so súhlasom; Cavaleers recenziu označiť vzťahom alebo nahradiť; logo vybrať (otvorený bod specu).

### Low

**L1. Hierarchia nadpisov v akordeónoch.** Sekcia „Detaily.“ je H2 (index.html:736) a názvy akordeónov sú tiež H2 (index.html:752, :810, :856). Oprava: `section__title` zmeniť na H3 a články v nich (index.html:763–883) na H4 (vzhľad cez CSS triedu ostáva).

**L2. H1 homepage nenesie tému ani meno.** index.html:495 „Ste tu správne.“ (podľa specu zámer); meno je len `<p>` (index.html:494). Oprava bez zmeny vizuálu: zahrnúť byline do H1 (`<h1><span class="hero__byline">Marcel Gavalier</span> Ste tu správne.</h1>`) alebo ponechať a spoľahnúť sa na title (M1).

**L3. Blog H1 „Blog.“** (blog/index.html:140). Oprava: „Blog o automatizácii, webe a AI“ (zhodné s title), bodka podľa štýlu môže ostať v `<i>`.

**L4. Karty „Čítajte ďalej“ ako H2 bez nadradeného nadpisu.** blog/…chatgpt:309/314/319, blog/…fakturaciu…:299/304/309; label je `<span>` (riadok 306/296). Oprava: label ako H2 „Čítajte ďalej“, karty H3.

**L5. Homepage odkazuje na blog len z päty (index.html:1439–1441) a Situácie nemajú žiadny odkaz.** Oprava: v Situáciách 01 → /ai-agenti/, 02 → /automatizacia/ a blog o fakturácii, v SEO akordeóne (index.html:776) → článok o ChatGPT. Anchor „Podrobnosti o službách“ (index.html:754) vedie len na /automatizacia/ – premenovať alebo smerovať na zoznam služieb.

**L6. CTA tlačidlá „Bezplatná konzultácia“ vedú na kotvu, nie na telefón.** index.html:796, :842, :888 → `#contact`; spec chce telefón ako najľahšiu cestu. „Tak začnime“ (index.html:1468) vedie na `#contact`, v ktorom už čitateľ je. Oprava: `href="tel:+421915697915"`, text napr. „Zavolajte, hovor je zadarmo a nezáväzný“; „Tak začnime“ na tel: alebo odstrániť.

**L7. Interné TODO komentáre na živom webe.** index.html:1378, blog/…fakturaciu…:220, blog/…chatgpt:258 sú viditeľné v zdrojovom kóde živých stránok. Oprava: presunúť do blog/ZOZNAM-TEM.md alebo docs/.

**L8. Zdieľaný chvost description.** automatizacia:7, tvorba-webu:7, seo-llm:7 „… Poprad, celé Slovensko.“; automatizacia, tvorba-webu, ai-agenti „Cena dopredu, platíte za výsledok.“ Oprava: chvost nechať len tam, kde zostanú znaky; uvoľnené miesto použiť na špecifický benefit služby.

**L9. Meta keywords so zastaraným obsahom.** index.html:7 („Tri oblasti“, „Sieťar“, „network engineer“). Google ho ignoruje; Oprava: odstrániť (menej miest, kde sa záber rozchádza).

**L10. E-E-A-T doplnky.** Person `sameAs` len na vlastný web (index.html:137–139); portrét bez alt (index.html:492, `aria-hidden`); autor v blogu odkazuje na /#kto-to-robi bez bio. Chýba stránka o ochrane osobných údajov (web načítava Google Fonts). Oprava: pridať profily (LinkedIn/GitHub, **treba vstup operátora**, či existujú), alt „Marcel Gavalier“ na portrét, krátke bio v `aside.author`; text o ochrane údajov **treba vstup operátora**.

**L11. Drobný nesúlad v tvrdení o testoch.** index.html:780 „na každý prípad mám E2E testy“ vs. tvorba-webu:266 „kritické prípady pokrývam E2E testami“. Oprava: zjednotiť na presnejšie znenie z /tvorba-webu/.

---

## Čo funguje

- Každá stránka má jeden H1, unikátny title (46–60 znakov) a description (130–151 znakov); bez šablónovitých metadát.
- Stránky služieb a články začínajú priamou odpoveďou (`page-answer`), majú H2 podľa otázok, viditeľné FAQ zhodné s FAQPage, breadcrumbs a „Súvisiace“ s opisnými anchor textami; články odkazujú na službu a naopak.
- Výborná čitateľnosť, druhá osoba, teplý hlas podľa specu; žiadne „prvý hovor je zadarmo“, všade „Hovor aj návrh riešenia sú zadarmo a nezáväzné“.
- Poctivé vymedzenie (nikto nezaručí citáciu AI, FAQ rich results už nie sú, llms.txt Google nepoužíva) a citácie oficiálnych zdrojov – dobré pre dôveru aj citovateľnosť.
- Živý web = repo (bez rozdielov), CTA telefón na prvej obrazovke.

## JSON pre audit-data.json (Content Quality)

```json
{
  "category": "Content Quality",
  "scores": {"content_quality": 62, "on_page_seo": 74, "ai_citation_readiness": 68,
             "eeat": {"experience": 45, "expertise": 55, "authoritativeness": 40, "trustworthiness": 70, "weighted": 54}},
  "metadata_template": {"site_risk": "low", "templated_ratio": 0.0, "shared_cta_phrases": {}},
  "findings": [
    {"id": "H1", "severity": "High", "title": "Schema: riešenie podľa rozpočtu klienta (rozpor s telom a specom)", "evidence": ["index.html:96", "index.html:159"]},
    {"id": "H2", "severity": "High", "title": "llms.txt: iné situácie, zakázané formulácie (bojí sa, vyhodiť dodávateľa)", "evidence": ["llms.txt:44"]},
    {"id": "H3", "severity": "High", "title": "Rozpor v zábere sietí", "evidence": ["index.html:812", "index.html:42", "index.html:1378", "index.html:1448", "llms.txt:60"]},
    {"id": "M1", "severity": "Medium", "title": "Title homepage bez AI/automatizácie", "evidence": ["index.html:42"]},
    {"id": "M2", "severity": "Medium", "title": "Formulácia 'od pár desiatok eur po tisíce' mimo tela", "evidence": ["index.html:19", "llms.txt:3", "automatizacia/index.html:274"]},
    {"id": "M3", "severity": "Medium", "title": "areaServed SK/CZ/EU vs. 'celé Slovensko'", "evidence": ["index.html:184-186", "index.html:386", "automatizacia/index.html:304"]},
    {"id": "M4", "severity": "Medium", "title": "12+ rokov v schema zahŕňa AI", "evidence": ["index.html:96", "index.html:362", "index.html:403"]},
    {"id": "M5", "severity": "Medium", "title": "Project & People ponuka len v schema", "evidence": ["index.html:285"]},
    {"id": "M6", "severity": "Medium", "title": "Neoverené 'vráti sa za pár týždňov'", "evidence": ["index.html:552"]},
    {"id": "M7", "severity": "Medium", "title": "Tenké a z 28 % rovnaké stránky služieb", "evidence": ["automatizacia/index.html:267-276", "tvorba-webu/index.html:268-276"]},
    {"id": "M8", "severity": "Medium", "title": "Záruka vypadáva pri extrakcii hlavného obsahu", "evidence": ["https://www.gavalier.sk/ (render_page.py extracted_text)"]},
    {"id": "M9", "severity": "Medium", "title": "Blog: 2 krátke články bez vlastnej skúsenosti", "evidence": ["blog/ako-automatizovat-fakturaciu-a-emaily/index.html:220", "blog/ako-sa-objavit-v-odpovediach-chatgpt/index.html:258"]},
    {"id": "M10", "severity": "Medium", "title": "Recenzie bez identity, jedna od vlastnej skupiny", "evidence": ["index.html:1309", "index.html:1331"]},
    {"id": "L1", "severity": "Low", "title": "H2 v H2 sekcii (akordeóny)", "evidence": ["index.html:736", "index.html:752"]},
    {"id": "L2", "severity": "Low", "title": "H1 homepage bez témy", "evidence": ["index.html:495"]},
    {"id": "L3", "severity": "Low", "title": "Blog H1 'Blog.'", "evidence": ["blog/index.html:140"]},
    {"id": "L4", "severity": "Low", "title": "Karty Čítajte ďalej ako H2", "evidence": ["blog/ako-sa-objavit-v-odpovediach-chatgpt/index.html:306"]},
    {"id": "L5", "severity": "Low", "title": "Homepage → blog len z päty", "evidence": ["index.html:1439", "index.html:754"]},
    {"id": "L6", "severity": "Low", "title": "CTA na kotvu namiesto tel:", "evidence": ["index.html:796", "index.html:1468"]},
    {"id": "L7", "severity": "Low", "title": "TODO komentáre na živom webe", "evidence": ["index.html:1378"]},
    {"id": "L8", "severity": "Low", "title": "Zdieľaný chvost description", "evidence": ["automatizacia/index.html:7"]},
    {"id": "L9", "severity": "Low", "title": "Meta keywords", "evidence": ["index.html:7"]},
    {"id": "L10", "severity": "Low", "title": "sameAs, alt portrétu, bio autora, ochrana údajov", "evidence": ["index.html:137", "index.html:492"]},
    {"id": "L11", "severity": "Low", "title": "E2E testy: rozdielne tvrdenie", "evidence": ["index.html:780", "tvorba-webu/index.html:266"]}
  ]
}
```

## Pomocné súbory

- `/home/agentic-root/agentic/Gavalier/gavalier-web/scratch/seo-audit/content/onpage.py` – title, description, H1–H3, odkazy, počty slov
- `/home/agentic-root/agentic/Gavalier/gavalier-web/scratch/seo-audit/content/dup.py` – prekryv stránok služieb
- `/home/agentic-root/agentic/Gavalier/gavalier-web/scratch/seo-audit/content/metadata.json`, `metadata_template_out.json`, `render_home.json`, `live/`

## Failures

- Prvé porovnanie živého webu so zdrojom hlásilo DIFF pre všetky stránky – chyba mojej relatívnej cesty (o úroveň vyššie). Po oprave na absolútne cesty: všetkých 9 súborov sa zhoduje.
- `metadata_template.py` nezachytil zdieľaný chvost description (4/5 stránok služieb); doplnené ručne (L8).
- `render_page.py` bežal v režime `raw` (web nie je SPA), Playwright nebol potrebný. Inak nič nezlyhalo.
