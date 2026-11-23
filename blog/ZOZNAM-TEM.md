# Zoznam tém pre blog

Tento súbor sa na web nenasadzuje (`.assetsignore` ho vynecháva). Postup písania a publikovania je v skille `blog-clanok` (gavalier-brain).

## Pravidlá pre všetky články

- Návod alebo prehľad, nie vymyslená prípadová štúdia. Reálny príklad (aj anonymizovaný) pridať len s údajmi, ktoré Marcel overí.
- Čísla, ceny a časy iba overené. Čo chýba, sa zapíše do `vystupy/dokumenty/otvorene-texty.md` (nie do HTML komentára, ten je v zdroji stránky verejný).
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

## Kandidáti z práce

Posledný beh blog-z-prace: 2026-11-23

Postup je v skille `blog-z-prace` (gavalier-brain). Témy vznikli z práce za posledných 30 dní. Otázka je to, čo ľudia hľadajú; vlastná práca je v článku iba dôkaz. Dopyt: Google Ads cez DataForSEO, Slovensko, jazyk sk, priemer hľadaní za mesiac, merané 2026-11-23. SERP: Google, Slovensko, 2026-11-23. Našepkávač meraný nebol. Zdroj z práce pre klienta je tu anonymný (toto repo je verejné), presný zdroj je v braine. Meno klienta, ceny, interné čísla a mená ľudí idú do článku iba po výslovnom áno Marcela pri danom článku. Stav všetkých: kandidát, čaká na výber.

| # | Hlavná otázka | Dopyt | Služba |
|---|---------------|-------|--------|
| K1 | Čo sú skills a hooks v Claude Code a ako nimi naučím AI agenta môj postup? | claude code 6 600, claude code skills 110 | `/ai-poradenstvo/` |
| K2 | Čo je vibe coding a dá sa ním spraviť softvér, ktorý vydrží v prevádzke? | vibe coding 1 000 | `/ai-poradenstvo/` |
| K3 | Čo je AI agent a čím sa líši od chatbota? | ai agent 1 000, ai agent co to je 40 | `/ai-agenti/` |
| K4 | Dá sa web hostovať na Cloudflare zadarmo a ako ho presunúť z bežného hostingu? | cloudflare pages 260, cloudflare workers 70, webhosting zadarmo 50 | `/tvorba-webu/` |
| K5 | Dokáže AI spraviť SEO audit e-shopu a čo má taký audit obsahovať? | seo audit 210 | `/seo-llm-optimalizacia/` |
| K6 | Ako sprístupniť domáci server z internetu bez verejnej IP adresy (Cloudflare Tunnel)? | cloudflare tunnel 170, domáci server 90 | `/automatizacia/` |
| K7 | Ako automatizovať Shoptet, keď nemám prístup k API? | shoptet api 70, shoptet premium 90 | `/automatizacia/` |
| K8 | Ako napísať popis produktu do e-shopu pomocou AI, aby nebol kópiou výrobcu? | popis produktu 70 | `/ai-agenti/` |
| K9 | Ako často Shoptet aktualizuje sitemap a ako ju poslať do Search Console? | shoptet sitemap 10, google search console 8 100 | `/seo-llm-optimalizacia/` |
| K10 | Dajú sa v Shoptete zobraziť farby produktu v kategórii ako samostatné položky? | shoptet varianty 10 | `/tvorba-webu/` |
| K11 | Ako pomenovať produkty v e-shope, aby ich ľudia našli? | v nástroji 0 | `/seo-llm-optimalizacia/` |
| K12 | Prečo sa po importe nedá objednať variant produktu v Shoptete? | v nástroji 0 | `/automatizacia/` |

### K1. Skills a hooks v Claude Code

- Prečo to ľudia hľadajú: Claude Code používajú a chcú, aby agent robil veci ich spôsobom a nezabúdal pravidlá.
- Dôkaz dopytu: „claude code“ 6 600, „claude code skills“ 110, „claude code plugins“ 70, „claude code hooks“ 20. SERP pre „claude code skills“ má iba anglické výsledky, slovenský žiadny.
- Zdroj: vlastný systém agentov (workflow) a skilly tohto webu.
- Dôkaz z práce: postupy sú uložené ako skilly, pravidlá vynucujú hooky, chyba sa po oprave zapíše do skillu.
- Osnova: čo je skill a čo hook → kedy stačí pokyn v texte a kedy treba hook → ako vyzerá dobrý skill (spúšťač, kroky, čo agent smie bez pýtania) → chyba sa stáva skillom → čo sa neoplatilo.
- Poznámka: prekrýva sa s témou 10 v zozname „Ďalších tém“ (Claude Code v praxi). Napísať jeden článok, nie dva.

### K2. Vibe coding

- Prečo to ľudia hľadajú: pojem je nový, ľudia chcú vedieť, čo znamená a či sa na to dá spoľahnúť.
- Dôkaz dopytu: „vibe coding“ 1 000, konkurencia stredná. SERP: anglické výsledky a jeden český, slovenský žiadny.
- Zdroj: vlastný vývoj s AI agentmi (workflow, aplikácia pre klientsky e-shop).
- Dôkaz z práce: zmeny idú cez test, ktorý najprv zlyhá, potom opravu a kolá review (vidno v histórii commitov).
- Osnova: čo je vibe coding → kde funguje (prototyp, jednorazový skript) → kde zlyhá (prevádzka, peniaze, dáta) → čo pridať, aby kód vydržal (testy, review, malé kroky) → pre koho to je.

### K3. Čo je AI agent

- Prečo to ľudia hľadajú: slovo počujú všade a nevedia, čím sa agent líši od ChatGPT.
- Dôkaz dopytu: „ai agent“ 1 000, „ai agent co to je“ 40, „ai agenti“ 70. SERP: slovník AI, české weby a preložené diskusie.
- Zdroj: vlastní agenti v dennej prevádzke (správa servera, denný prehľad noviniek, web).
- Dôkaz z práce: agenti s vlastnou úlohou, pamäťou a pravidlami, ktorí si odovzdávajú prácu.
- Osnova: definícia jednou vetou → chatbot, automatizácia, agent: rozdiel na jednom príklade → čo agent potrebuje (nástroje, pamäť, pravidlá, kontrola) → kde sa mýli → ako začať.
- Poznámka: rovnaká oblasť ako návrh 4 (AI agent alebo obyčajná automatizácia). Odporúčanie: nepísať dva články, tento dopyt a dôkaz doplniť do návrhu 4.

### K4. Web na Cloudflare zadarmo

- Prečo to ľudia hľadajú: platia hosting za malý web a hľadajú lacnejšiu a rýchlejšiu cestu.
- Dôkaz dopytu: „cloudflare pages“ 260, „cloudflare workers“ 70, „webhosting zadarmo“ 50, „cloudflare hosting“ 40, „websupport cloudflare“ 20. SERP pre presun webu na Cloudflare: preložené diskusie, slovenský návod žiadny.
- Zdroj: tento web (presun z FTP hostingu na Cloudflare Workers, 2026-11-11).
- Dôkaz z práce: vlastný presun vrátane presmerovaní, stránky 404 a kontroly živého webu po nasadení.
- Osnova: pre aký web to je (statický) a pre aký nie → čo je zadarmo a kde sú limity → postup presunu (súbory, doména, DNS, presmerovania) → čo skontrolovať po prepnutí → kedy ostať na klasickom hostingu.

### K5. SEO audit e-shopu s AI

- Prečo to ľudia hľadajú: chcú vedieť, čo audit obsahuje, koľko trvá a či ho zvládne AI. Google pri fráze ukazuje otázky „Can ChatGPT do an SEO audit?“ a „How long does an SEO audit take?“.
- Dôkaz dopytu: „seo audit“ 210, konkurencia stredná, „audit webu“ 20. SERP: agentúry a nástroje zadarmo.
- Zdroj: audit tohto webu (2026-11-13) a audit jednej kategórie klientskeho e-shopu.
- Dôkaz z práce: audit z viacerých modulov, zistenia zosúladené s dátami Search Console a Analytics, názvy kategórií podľa hľadanosti a konkurencie.
- Osnova: čo je SEO audit → čo AI zvládne sama a čo nie → z čoho sa audit skladá → prečo bez dát zo Search Console nestačí → ako z auditu spraviť plán.

### K6. Domáci server bez verejnej IP

- Prečo to ľudia hľadajú: majú server alebo NAS doma a nemajú verejnú IP adresu.
- Dôkaz dopytu: „cloudflare tunnel“ 170, „domáci server“ 90, „homelab“ 50. SERP pre „cloudflare tunnel návod“: dokumentácia a jeden slovenský návod pre Synology.
- Zdroj: vlastný server (stála adresa služby cez tunel namiesto dočasnej).
- Dôkaz z práce: prechod z dočasnej adresy na stálu vlastnú doménu.
- Osnova: problém (žiadna verejná IP) → ako tunel funguje → dočasná a stála adresa → čo nikdy nesprístupniť bez prihlásenia → kedy radšej VPN.
- Otázka: téma je sieťová. Pravidlo hore hovorí, že sieťové témy do blogu nepatria. Rozhodne Marcel.

### K7. Automatizácia Shoptetu bez API

- Prečo to ľudia hľadajú: majiteľ menšieho e-shopu chce prestať prepisovať dáta ručne a API nemá. Podľa nadpisu dokumentácie je súkromné API v tarife Premium (pred písaním overiť).
- Dôkaz dopytu: „shoptet api“ 70 (cena za klik 3,96), „shoptet premium“ 90, „shoptet doplnky“ 590. SERP: dokumentácia API pre Premium, návod pre e-shop bez API žiadny.
- Zdroj: aplikácia pre klientsky e-shop na Shoptete.
- Dôkaz z práce: práca cez export a import a cez prehliadač riadený skriptom; ochranná pauza po tom, čo Shoptet prístup zablokoval.
- Osnova: čo sa dá bez API (export, import, doplnky, prehliadač) → čo je bezpečné a čo nie → šetrné tempo a pauza po zablokovaní → záloha pred každým importom → kedy sa oplatí Premium.
- Pozor: žiadne detaily, ako obísť ochranu Shoptetu.

### K8. Popis produktu pomocou AI

- Prečo to ľudia hľadajú: majú stovky produktov s popisom od výrobcu a chcú vlastné texty rýchlo.
- Dôkaz dopytu: „popis produktu“ 70; dlhé frázy majú v nástroji 0. SERP pre „ako napísať popis produktu do eshopu“: anglické, poľské a bulharské výsledky, slovenský žiadny.
- Zdroj: klientsky e-shop (stavba popisov a ich kontrola).
- Dôkaz z práce: pevná stavba popisu, kontrola, že nový popis nestratil žiadnu informáciu z pôvodného, pravidlá pre obrázky.
- Osnova: prečo kópia od výrobcu škodí → čo má popis obsahovať → ako zadať AI stavbu a tón → kontrola faktov proti zdroju → hromadný postup a záloha.

### K9. Shoptet sitemap a Search Console

- Prečo to ľudia hľadajú: zmenili produkty a Google ukazuje staré údaje; hľadajú, ako indexovanie urýchliť.
- Dôkaz dopytu: „shoptet sitemap“ 10, „google search console sitemap“ 10, „how to reindex google search console“ 10; hlavná fráza „google search console“ 8 100. SERP pre „shoptet sitemap aktualizácia“: všeobecné články o SEO, priama odpoveď žiadna.
- Zdroj: klientsky e-shop na Shoptete.
- Dôkaz z práce: odpoveď podpory Shoptetu (sitemap sa tvorí sama, upraviť sa nedá, vyrovnávacia pamäť 4 hodiny) a odoslanie sitemap cez API Search Console.
- Osnova: kde sitemap je a ako vzniká → ako rýchlo sa v nej prejaví zmena → ako ju odoslať do Search Console → čo odoslanie zaručí a čo nie → kedy použiť kontrolu adresy URL.
- Otvorené: otázka na podporu o dátume zmeny (lastmod) ešte nemá odpoveď.

### K10. Farby produktu ako samostatné položky v Shoptete

- Prečo to ľudia hľadajú: produkt má päť farieb a v kategórii sa ukáže iba jedna dlaždica.
- Dôkaz dopytu: „shoptet varianty“ 10. SERP pre presnú otázku: návody na iné veci, priama odpoveď žiadna.
- Zdroj: klientsky e-shop na Shoptete.
- Dôkaz z práce: prieskum dokumentácie a doplnkov Shoptetu so záverom, že natívne to nejde a doplnok na to nie je; cesta je farba ako samostatný produkt.
- Osnova: ako Shoptet zobrazuje varianty → čo nejde → farba ako samostatný produkt: výhody a cena → čo to spraví s kódmi, skladom a SEO → ako sa rozhodnúť.

### K11. Názvy produktov v e-shope

- Prečo to ľudia hľadajú: nevedia, v akom poradí písať značku, model a druh tovaru.
- Dôkaz dopytu: nástroj ukazuje 0, dopyt nie je preukázaný číslom. Dôvod zaradenia: sila dôkazu.
- Zdroj: klientsky e-shop (pravidlo názvov schválené majiteľom, podložené hľadaniami zo Search Console).
- Osnova: ako ľudia hľadajú produkt → poradie značka, model, druh, pre koho → čo do názvu nepatrí → ako premenovať existujúce produkty po dávkach.

### K12. Variant produktu sa nedá objednať

- Prečo to ľudia hľadajú: zákazník hlási, že veľkosť nejde vložiť do košíka, a majiteľ nevie prečo.
- Dôkaz dopytu: nástroj ukazuje 0, presné znenie chyby overené nebolo. Dôvod zaradenia: chyba sa klientovi opakovala a nájde sa až po čase.
- Zdroj: klientsky e-shop na Shoptete.
- Dôkaz z práce: audit všetkých produktov s variantmi, príčina (varianty jedného produktu z dvoch rôznych šablón) a oprava.
- Osnova: ako sa chyba prejaví → príčina → ako ju nájsť v exporte → oprava → kontrola po každom importe.
- Odporúčanie: spojiť s K10 do jedného článku o variantoch v Shoptete.

## Šablóna článku

Súbor `blog/_sablona/index.html` je vzor (obsahuje `noindex` a na web sa nenasadzuje). Postup použitia: skill `blog-clanok` (gavalier-brain).
