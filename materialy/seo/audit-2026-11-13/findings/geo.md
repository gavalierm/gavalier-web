# GEO / AI Search Readiness – gavalier.sk

Dátum: 2026-11-13. Zdroj: repo /home/agentic-root/agentic/Gavalier/gavalier-web (HEAD c8c90e3) a živý web https://www.gavalier.sk.
Živé robots.txt a llms.txt sú bajtovo zhodné s repom (diff bez rozdielu). Surové dáta: scratch/seo-audit/data/geo/
(agentic.json = agentic_check.py --ua-matrix, r_*.json = render_page.py --mode auto pre 8 URL zo sitemap).

## Skóre AI Search Readiness: 62/100

| Dimenzia | Váha | Skóre | Vážené | Hlavný dôvod |
|---|---|---|---|---|
| Citovateľnosť | 25 % | 68 | 17,0 | Podstránky a blog: priama odpoveď pod H1, FAQ s otázkovými H3, zdroje v článku o ChatGPT. Domovská stránka: sloganové nadpisy, definícia entity až na konci, žiadne overiteľné čísla. |
| Štrukturálna čitateľnosť | 20 % | 72 | 14,4 | Jeden H1 na stránke, SSR, sémantické `<details>`; H1/H2 na domovskej stránke nehovoria, o čom sekcia je. |
| Multimodálny obsah | 15 % | 30 | 4,5 | Žiadne video, tabuľka ani diagram; portrét má alt="" a aria-hidden; YouTube kanál existuje, ale na webe nie je. |
| Autorita a značka | 20 % | 40 | 8,0 | sameAs odkazuje len sám na seba; LinkedIn, YouTube, GitHub existujú, ale nie sú prepojené; žiadna Wikidata; kolízia mena s Kaviarňou Gavalier a bežným slovom „gavalier“. |
| Technická prístupnosť | 20 % | 85 | 17,0 | Všetky AI crawlery povolené, WAF ich neblokuje, SSR, platný llms.txt, 404 správne; chýba charset pri llms.txt, Content-Signal, Markdown, /.well-known. |
| **Spolu** | | | **≈ 62** | |

Odhad podľa platforiem (heuristika, nie meranie): Google AI Overviews 55 · ChatGPT Search 58 · Perplexity 60 · Bing Copilot 62
(Bing má web v indexe – „gavalier.sk“ v Bing vracia domovskú stránku; BingSiteAuth.xml a kľúč IndexNow sú nasadené).

## Prístup AI crawlerov (robots.txt, živé, 17 skupín)

| Crawler | Na čo slúži | Stav | Dôkaz |
|---|---|---|---|
| OAI-SearchBot | ChatGPT Search | povolený (vlastná skupina) | robots.txt:34-35 |
| ChatGPT-User | požiadavky používateľa ChatGPT | povolený | robots.txt:37-38 |
| GPTBot | trénovanie OpenAI (nie ChatGPT Search) | povolený | robots.txt:40-41 |
| Claude-SearchBot | vyhľadávanie Claude | povolený cez `*` (bez vlastnej skupiny) | robots.txt:4-5 |
| Claude-User | požiadavky používateľa Claude | povolený cez `*` | robots.txt:4-5 |
| ClaudeBot | trénovanie Anthropic | povolený | robots.txt:49-50 |
| PerplexityBot | Perplexity Search | povolený | robots.txt:55-56 |
| Googlebot | Google Search a AI Overviews | povolený | robots.txt:14-15 |
| Google-Extended | Gemini/Vertex: trénovanie a grounding (nie AIO) | povolený | robots.txt:43-44 |
| Bingbot | Bing a Copilot | povolený | robots.txt:23-24 |
| Applebot / Applebot-Extended | Siri/Spotlight / trénovanie Apple Intelligence | povolené | robots.txt:58-62 |
| CCBot, cohere-ai | trénovanie | povolené cez `*` | robots.txt:4-5 |

WAF (neoverené UA reťazce, nie IP): GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, PerplexityBot, CCBot, bingbot, Googlebot → 200, 76 721 B, bez challenge (curl + agentic.json waf-ua-matrix). Skutoční boti sa overujú podľa IP, takže je to iba správanie voči neovereným požiadavkám.

llms.txt: **prítomný a platný** (200, 6 366 B, Lighthouse llms-txt: pass; H1, blockquote, sekcie s odkazmi). llms-full.txt 404 (nepovinný).
RSL 1.0: chýba (/license.xml, /rsl.xml 404; v robots.txt nie je `License:`). Content-Signal: chýba.

## Zistenia

### High

**H1. Person.sameAs odkazuje len sám na seba; existujúce profily nie sú prepojené**
- Dôkaz: index.html:137-139 (`"sameAs": ["https://www.gavalier.sk/"]`). Existujú: https://sk.linkedin.com/in/marcelgavalier (DuckDuckGo a Bing, titulok „Marcel Gavalier - Versatile ninja of all tasks“), https://www.youtube.com/@MarcelGavalier (200, 24 odberateľov, 17 videí, odkazuje iba na facebook.com/gavostar), https://github.com/gavalierm (200, profil 2× obsahuje „gavalier.sk“). Verejné registre s IČO 47786825: register.peniaze.sk, slovakdata.sk, foaf.sk. Wikidata: „Marcel Gavalier“ 0 výsledkov.
- Dopad: AI systémy nemajú ako spojiť osobu na webe s jej profilmi. Pri mene, ktoré koliduje s kaviarňou aj bežným slovom (pozri M1), je to hlavný signál na rozlíšenie entity. YouTube má najsilnejšiu koreláciu s AI citáciami a teraz je od webu odpojený.
- Oprava: do Person (index.html:137) a autora v BlogPosting (blog/*/index.html, objekt `author`) doplniť `sameAs`: LinkedIn, YouTube, GitHub (ak je to Marcelov profil), Facebook, výpis zo živnostenského registra (ORSR/ŽRSR). Na YouTube kanáli a LinkedIn doplniť odkaz na https://www.gavalier.sk. Viditeľné odkazy na profily dať aj do pätičky (index.html:1447-1456). Neskôr vytvoriť položku vo Wikidata (človek, povolanie, oficiálny web, LinkedIn ID).

**H2. Nezhoda tvrdení o sieťach a infraštruktúre: llms.txt / schema / telo stránky**
- Dôkaz: telo index.html:812 „Sám to nerobím. Ale roky som obklopený ľuďmi, ktorí to robia…“; llms.txt:60 „…Časť realizujú preverení partneri, koordinuje a garantuje Marcel“ (iba „časť“); llms.txt:53 dáva „MikroTik a Ubiquiti“ do Code & IT (vlastná práca); schema index.html:213 (Service Code & IT: „MikroTik a Ubiquiti siete, Docker, SSL/TLS hardening“), index.html:121-126 (knowsAbout Linux, MikroTik, Ubiquiti, Docker, Nginx), FAQ index.html:338; rola v pätičke index.html:1448 „Sieťar“; titulok obrázka v sitemap.xml:17 „Sieťar“; meta keywords index.html:7 „sieťar, network engineer“.
- Dopad: AI asistent podľa llms.txt a schémy uvedie Marcela ako sieťara, kým stránka hovorí opak. Je to vecne nesprávne tvrdenie o operátorovi. Podľa texty-webu musí štvorica telo/schema/meta/llms.txt tvrdiť to isté.
- Oprava: rozhodnúť jednu formuláciu (podľa tela: „siete a infraštruktúru realizujú preverení partneri, Marcel koordinuje a ručí“) a premietnuť ju do llms.txt:53 a :60, index.html:121-126, :213, :338, :1448, sitemap.xml:17 a meta keywords. Tvrdenie o operátorovi potvrdí operátor (blocker podľa texty-webu).

### Medium

**M1. Značka „Gavalier“ bez mena je nejednoznačná (kaviareň, bežné slovo, priezvisko)**
- Dôkaz: og:site_name „Gavalier“ (index.html:26 a všetky podstránky); titulok blog/ako-automatizovat-fakturaciu-a-emaily/index.html:6 končí „| Gavalier“. Bing pre „reštaurácia Gavalier“ vracia Kaviareň Gavalier v Banskej Štiavnici (Papanica, restauracie.sk, Restaurant Guru, 344 recenzií). sk.wikipedia „Gavalier“ je rozlišovacia stránka (bežné slovo „gavalier“ = džentlmen, štedrý človek, + priezvisko). WebSite.name je pritom „Marcel Gavalier“ (index.html:299).
- Oprava: všade používať „Marcel Gavalier“ (og:site_name, titulky), pridať `alternateName` do WebSite, do Person `jobTitle` (napr. „IT a AI konzultant“) a `disambiguatingDescription` („IT a AI konzultant z Popradu, nesúvisí s Kaviarňou Gavalier v Banskej Štiavnici“, ak to operátor schváli).

**M2. llms.txt „S čím za ním ľudia chodia“ nezodpovedá telu stránky a obsahuje zakázaný typ tvrdenia**
- Dôkaz: llms.txt:42-48 (5 bodov: „Roky niečo nefunguje a klient sa to bojí riešiť“, „Klient sa to skúša naučiť sám“, …, „Zvuk, kamery, stream aj svetlá na jedného človeka“) oproti telu index.html:542-576 (Kupujete AI kurzy? / AI vám nahodí produkty / Drobnosť, ktorá vás brzdí? / Určite viete ako na to? / Chystáte podujatie?, „z jedného miesta“). llms.txt:44 „klient sa to bojí riešiť“ porušuje pravidlo spec 2026-08-18 (žiadne tvrdenia, čoho sa zákazník bojí); llms.txt:48 „na jedného človeka“ protirečí index.html:1382 („a preto na to jeden človek ani nie je“). llms.txt:46 „kde v procese tečú peniaze“ oproti index.html:568 „kde má proces medzery“.
- Oprava: prepísať llms.txt:42-48 podľa aktuálnych piatich situácií z index.html:542-576. Odstrániť „bojí“ a „na jedného človeka“ (nahradiť „z jedného miesta“).

**M3. Oblasti služieb sa líšia: schema (Project & People) vs. telo a llms.txt (Network & Infra)**
- Dôkaz: telo index.html:752, :810, :856 = Code & IT / Network & Infra / Audio \ Video & Stage; llms.txt:52-63 rovnako; schema Person.description index.html:96, ProfessionalService index.html:159, Offer index.html:283, FAQ index.html:338, ItemList index.html:404-424 = Code & IT / Audio \ Video & Stage / **Project & People** (na stránke nie je, odkaz #experience vedie na sekciu situácií).
- Oprava: zladiť schému s telom (Network & Infra ako partnerská služba, Project & People odstrániť alebo doplniť na stránku), alebo naopak. Zmena naraz v 4 miestach.

**M4. Homepage FAQPage obsahuje otázky, ktoré na stránke nie sú viditeľné**
- Dôkaz: index.html:330-397 (8 otázok, napr. „Koľko rokov skúseností má Marcel Gavalier?“, „Ako Marcel používa AI pri vývoji?“, „Kde Marcel Gavalier sídli…?“). Na stránke nie je žiadna FAQ sekcia; viditeľný je iba nadpis „Koľko to stojí?“ (index.html:648). Podstránky a blog FAQ viditeľné majú (napr. seo-llm-optimalizacia/index.html:277-306).
- Oprava: pridať na domovskú stránku viditeľnú sekciu „Najčastejšie otázky“ s rovnakými otázkami a odpoveďami (rovnaký vzor `<details>` ako na podstránkach) alebo FAQPage z domovskej stránky odstrániť. Zlepší to aj citovateľnosť (pozri M5).

**M5. Domovská stránka: nadpisy nehovoria, o čom sekcia je, a definícia entity je až na konci**
- Dôkaz: H1 index.html:495 „Ste tu správne.“; H2 „Poradím zdarma.“ :532, „Ručím za to.“ :594, „Tri kroky.“ :690, „Detaily.“ :736, „Logá.“ :906, „Ako to dopadlo.“ :1307, „Zavolajte.“ :1409. Jediná veta „kto, čo, kde, ako dlho“ („Som Marcel Gavalier a pracujem z Popradu… viac ako 12 rokov“) je až na index.html:1378, v hero chýba lokalita (index.html:509-515). Titulok index.html:42 neuvádza AI ani automatizácie, hoci meta description (:6), hero (:502) a llms.txt:3 nimi začínajú.
- Oprava: ponechať dizajnový slogan, ale do hero (pod H1, index.html:509) dať jednu samostatnú vetu na citovanie: „Marcel Gavalier je IT a AI konzultant z Popradu: automatizácie, AI agenti, weby a aplikácie, technika na eventy; 12+ rokov praxe, cena dopredu, platíte len za výsledok.“ Do H1 doplniť skrytý alebo malý text s menom a profesiou, prípadne použiť sr-only H1 „Marcel Gavalier – IT a AI konzultant, Poprad“. Titulok zjednotiť s poradím v meta description (AI a automatizácie prvé).

**M6. llms.txt sa servíruje ako `text/plain` bez charsetu → klienti dostanú poškodenú diakritiku**
- Dôkaz: `curl -sI https://www.gavalier.sk/llms.txt` → `content-type: text/plain` (bez `charset`). Python requests (bežný v AI nástrojoch) zvolí ISO-8859-1 a riadok 3 vráti ako „Weby a aplikÃ¡cie, automatizÃ¡cie…“ (overené). Súbor nemá BOM. Rovnako robots.txt (ASCII, okrem komentára na riadku 33) a HTML (`text/html` bez charsetu, ale `<meta charset>` index.html:4 to pre HTML parsery rieši).
- Oprava: pridať do koreňa repa súbor `_headers` (Cloudflare Workers static assets ho podporujú) s obsahom:
  ```
  /llms.txt
    Content-Type: text/plain; charset=utf-8
  /robots.txt
    Content-Type: text/plain; charset=utf-8
  ```
  Overiť `curl -sI`. Pozor, `_headers` sa nesmie dostať do .assetsignore.

**M7. Žiadny multimodálny obsah napriek existujúcemu YouTube kanálu**
- Dôkaz: nikde na webe nie je `<video>`, `<iframe>`, VideoObject ani `<table>` (grep na všetkých 8 stránkach); blogové články a blog/index.html majú 0 `<img>`; portrét index.html:492 má `alt="" aria-hidden="true"`. YouTube @MarcelGavalier má 17 videí (živé prenosy).
- Oprava: do sekcie Audio \ Video & Stage (index.html:856+) vložiť 1-2 ukážky prenosov z YouTube (lite embed) s VideoObject (name, description, thumbnailUrl, uploadDate, contentUrl/embedUrl). Do článkov pridať aspoň jednu tabuľku (napr. porovnanie botov OpenAI, „Hotový nástroj vs. skript vs. AI agent“) a diagram procesu. Portrétu dať alt „Marcel Gavalier“.

**M8. Signály autority: žiadne overiteľné výsledky, anonymné referencie, slabé zdroje na podstránkach**
- Dôkaz: index.html:1378 a blog/ako-sa-objavit-v-odpovediach-chatgpt/index.html:258, blog/ako-automatizovat-fakturaciu-a-emaily/index.html:220 sú TODO komentáre, že chýba reálny prípad alebo meranie; referencie index.html:1307-1360 uvádzajú iba firmu, nie meno a rolu človeka; služby a druhý článok nemajú žiadny externý zdroj (grep href na externé domény: 0). Prvý článok má 2 overené zdroje (developers.openai.com/api/docs/bots 200, developers.google.com/…/ai-optimization-guide 200). Cavaleers.com (200) v surovom HTML meno Marcel/Gavalier nespomína, takže tvrdenie o členstve (index.html:512, llms.txt:73) nemá spätnú stopu (curl bez JS).
- Oprava: doplniť 1-2 anonymizované prípadové štúdie s číslom (hodiny ušetrené za mesiac, čas dodania) po súhlase operátora; pri referenciách uviesť meno a funkciu (so súhlasom klienta); požiadať Cavaleers o profil s odkazom na gavalier.sk; v článku o fakturácii citovať zdroje (napr. pravidlá e-fakturácie na financnasprava.sk).

### Low

**L1. robots.txt: zastarané tokeny a Crawl-delay v nesprávnej skupine**
- Dôkaz: robots.txt:20 Googlebot-Mobile, :26 Slurp, :46 anthropic-ai, :52 Claude-Web (zastarané); robots.txt:65 `Crawl-delay: 1` stojí za poslednou skupinou, takže podľa RFC 9309 patrí iba k Applebot-Extended (:61); Google ho ignoruje. Claude-SearchBot, Claude-User a Perplexity-User nemajú vlastnú skupinu (sú povolené cez `*`, to je v poriadku).
- Oprava: odstrániť zastarané skupiny a Crawl-delay; pridať explicitné skupiny `Claude-SearchBot`, `Claude-User`, `Perplexity-User` s `Allow: /`, aby bol zámer zdokumentovaný.

**L2. Chýba Content-Signal (preferencie pre AI použitie)**
- Dôkaz: robots.txt neobsahuje `Content-Signal` (agentic.json content-signal: lines []).
- Oprava (návrh, štandard je zatiaľ draft): do skupiny `User-agent: *` pridať `Content-Signal: search=yes, ai-input=yes, ai-train=yes`. Hodnotu ai-train určí operátor; dnes sú všetci tréningoví boti povolení, takže `yes` zodpovedá súčasnému stavu.

**L3. Chýbajú discovery súbory /.well-known a Markdown verzia**
- Dôkaz: 404 pre /.well-known/security.txt, /.well-known/llms.txt, /.well-known/ai-catalog.json, /.well-known/agent-card.json, /.well-known/api-catalog, /.well-known/mcp.json; /llms-full.txt 404; `Accept: text/markdown` vracia text/html bez `Vary: Accept`; /index.md 404. Web nemá API ani nástroje, takže A2A/MCP/OAuth sa netýkajú (N/A).
- Oprava: pridať /.well-known/security.txt (Contact: mailto:marcel@gavalier.sk, Expires, Canonical); voliteľne llms-full.txt alebo .md verzie služieb a článkov, prípadne `<link rel="alternate" type="text/markdown">`. Agent card a MCP iba ak vznikne skutočná služba.

**L4. Interné TODO komentáre sú verejne na webe**
- Dôkaz: index.html:1378, blog/ako-sa-objavit-v-odpovediach-chatgpt/index.html:258, blog/ako-automatizovat-fakturaciu-a-emaily/index.html:220 (HTML komentáre s „TODO(Marcel)… Nič nevymýšľať“), servírované na živom webe.
- Oprava: presunúť TODO do docs/ alebo blog/ZOZNAM-TEM.md (sú v .assetsignore).

**L5. Územie pôsobnosti nie je jednotné**
- Dôkaz: index.html:183-187 a FAQ :386 (Slovensko, Česko, celá EÚ); podstránky areaServed „Slovensko“ (automatizacia/index.html:104 a ďalšie) a FAQ automatizacia/index.html:304 „pre klientov na celom Slovensku“; llms.txt to neuvádza; v tele domovskej stránky to nie je.
- Oprava: zvoliť jedno tvrdenie, doplniť ho do llms.txt a tela a zjednotiť areaServed.

**L6. „12+ rokov praxe“ je v schéme a tele, ale nie v llms.txt**
- Dôkaz: index.html:96, :362, :1378 oproti llms.txt (nespomína).
- Oprava: doplniť do llms.txt:3 (súhrn), aby sa súhrn a web zhodovali.

**L7. Dátumy: všetko 2026-11-11, bez viditeľného dátumu na službách**
- Dôkaz: sitemap.xml všetky `<lastmod>2026-11-11</lastmod>`; WebPage.datePublished 2024-01-15 (index.html:312); podstránky majú iba dateModified (napr. automatizacia/index.html:74) a viditeľný dátum chýba. Blog dátum viditeľne uvádza (`<time>`).
- Oprava: lastmod meniť iba pri skutočnej zmene; na služby pridať viditeľné „Aktualizované: …“ zhodné s dateModified.

## Čo funguje (bez zásahu)
- SSR: 1 785 slov bez JS, žiadna JS kostra (agentic.json server-rendered); render_page `--mode auto` pri všetkých 8 URL bez Playwright (raw).
- Podstránky služieb: H1 a hneď pod ním priama definícia (`page-answer`, napr. seo-llm-optimalizacia/index.html:252), viditeľné FAQ s otázkovými H3, zhodné s FAQPage.
- Článok o ChatGPT správne rozlišuje OAI-SearchBot / GPTBot / ChatGPT-User a cituje primárne zdroje.
- apex 301 → www, canonical na www, 404 bez catch-all, sitemap v robots.txt, Bing WMT + IndexNow.
- Súbory local/, docs/, .mcp.json nie sú na webe (.assetsignore).

## Top 5 zmien podľa dopadu
1. sameAs + prepojenie profilov (H1) – 30 min, najväčší vplyv na rozpoznanie entity.
2. Zladiť tvrdenia sieťe/oblasti/situácie v llms.txt, schéme a tele (H2, M2, M3) – 1-2 h + súhlas operátora.
3. Citovateľná definícia v hero + viditeľné FAQ na domovskej stránke (M5, M4) – 1-2 h.
4. `_headers` s charset=utf-8 pre llms.txt a robots.txt (M6) – 10 min + nasadenie.
5. Ukážky videí z YouTube s VideoObject a 1 prípadová štúdia s číslom (M7, M8) – 2-4 h + podklady od operátora.

## Štruktúrované zistenia (audit-data.json, kategória AI Search Readiness)
```json
{
  "category": "AI Search Readiness",
  "score": 62,
  "dimensions": {"citability": 68, "structural_readability": 72, "multimodal": 30, "authority_brand": 40, "technical_accessibility": 85},
  "platform_estimates": {"google_aio": 55, "chatgpt_search": 58, "perplexity": 60, "bing_copilot": 62},
  "crawler_access": {"OAI-SearchBot": "allowed", "ChatGPT-User": "allowed", "GPTBot": "allowed", "Claude-SearchBot": "allowed(*)", "Claude-User": "allowed(*)", "ClaudeBot": "allowed", "PerplexityBot": "allowed", "Googlebot": "allowed", "Google-Extended": "allowed", "Bingbot": "allowed", "Applebot": "allowed", "Applebot-Extended": "allowed", "CCBot": "allowed(*)"},
  "llms_txt": "present_valid",
  "rsl": "missing",
  "content_signal": "missing",
  "findings": [
    {"id": "GEO-H1", "severity": "High", "title": "Person.sameAs iba sám na seba; LinkedIn/YouTube/GitHub neprepojené", "evidence": "index.html:137-139", "fix": "Doplniť sameAs a spätné odkazy z profilov"},
    {"id": "GEO-H2", "severity": "High", "title": "Nezhoda tvrdení o sieťach: telo 'Sám to nerobím' vs llms.txt/schema/pätička", "evidence": "index.html:812; llms.txt:53,60; index.html:121-126,213,338,1448; sitemap.xml:17", "fix": "Jedna formulácia vo všetkých 4 miestach"},
    {"id": "GEO-M1", "severity": "Medium", "title": "Značka 'Gavalier' koliduje s Kaviarňou Gavalier a bežným slovom", "evidence": "index.html:26; blog/ako-automatizovat-fakturaciu-a-emaily/index.html:6", "fix": "og:site_name 'Marcel Gavalier', jobTitle, disambiguatingDescription"},
    {"id": "GEO-M2", "severity": "Medium", "title": "llms.txt situácie nezodpovedajú telu; zakázané 'bojí'", "evidence": "llms.txt:42-48; index.html:542-576,1382", "fix": "Prepísať podľa tela"},
    {"id": "GEO-M3", "severity": "Medium", "title": "Schema: oblasť Project & People vs telo: Network & Infra", "evidence": "index.html:96,159,283,404-424 vs 752,810,856", "fix": "Zladiť"},
    {"id": "GEO-M4", "severity": "Medium", "title": "FAQPage na domovskej stránke bez viditeľného FAQ", "evidence": "index.html:330-397", "fix": "Pridať viditeľné FAQ alebo odstrániť schému"},
    {"id": "GEO-M5", "severity": "Medium", "title": "Sloganové H1/H2, definícia entity až na konci", "evidence": "index.html:495,532-1409,1378,42", "fix": "Citovateľná veta v hero, zladiť title"},
    {"id": "GEO-M6", "severity": "Medium", "title": "llms.txt text/plain bez charset → mojibake", "evidence": "curl -sI https://www.gavalier.sk/llms.txt", "fix": "_headers s charset=utf-8"},
    {"id": "GEO-M7", "severity": "Medium", "title": "Žiadne video/tabuľky; portrét alt=''", "evidence": "index.html:492; grep video/iframe/table = 0", "fix": "YouTube ukážky + VideoObject, tabuľky v článkoch"},
    {"id": "GEO-M8", "severity": "Medium", "title": "Chýbajú overiteľné výsledky a menné referencie", "evidence": "index.html:1307-1378; blog TODO", "fix": "Prípadové štúdie, mená v referenciách, zdroje"},
    {"id": "GEO-L1", "severity": "Low", "title": "Zastarané tokeny a Crawl-delay v skupine Applebot-Extended", "evidence": "robots.txt:20,26,46,52,65", "fix": "Vyčistiť, pridať Claude-SearchBot/Claude-User"},
    {"id": "GEO-L2", "severity": "Low", "title": "Chýba Content-Signal", "evidence": "robots.txt", "fix": "Content-Signal: search=yes, ai-input=yes, ai-train=<rozhodnutie>"},
    {"id": "GEO-L3", "severity": "Low", "title": "Chýba /.well-known/security.txt, llms-full.txt, Markdown", "evidence": "404 na živom webe", "fix": "security.txt, voliteľne .md verzie"},
    {"id": "GEO-L4", "severity": "Low", "title": "Verejné TODO komentáre", "evidence": "index.html:1378; blog/*:258,220", "fix": "Presunúť do docs"},
    {"id": "GEO-L5", "severity": "Low", "title": "areaServed SK+CZ+EÚ vs Slovensko", "evidence": "index.html:183-187,386; automatizacia/index.html:104,304", "fix": "Zjednotiť"},
    {"id": "GEO-L6", "severity": "Low", "title": "12+ rokov chýba v llms.txt", "evidence": "index.html:96,1378; llms.txt", "fix": "Doplniť"},
    {"id": "GEO-L7", "severity": "Low", "title": "Rovnaký lastmod, bez viditeľných dátumov na službách", "evidence": "sitemap.xml; automatizacia/index.html:74", "fix": "Reálne lastmod, viditeľný dátum"}
  ]
}
```

## Failures: čo zlyhalo a čo nakoniec fungovalo
- LinkedIn https://sk.linkedin.com/in/marcelgavalier → HTTP 999 (blokovanie botov). Existenciu profilu potvrdili výsledky DuckDuckGo a Bing (titulok a URL), obsah profilu som neoveril.
- Reddit search.json → 403. Náhradné hľadanie cez Bing („Marcel Gavalier reddit“) nenašlo žiadnu zmienku o Marcelovi ani o gavalier.sk; nie je to úplný dôkaz neprítomnosti.
- DuckDuckGo HTML vrátilo pri 2. až 5. dopyte 202 (rate limit); náhradou bol Bing cez curl a fungoval.
- Cavaleers.com s krátkym UA „Mozilla/5.0“ → „Access Forbidden“, s plným Firefox UA 200; obsah je iba surové HTML bez JS, takže tím načítaný skriptom by v ňom chýbal.
- Test WAF používa neoverené UA reťazce; nedokazuje správanie voči skutočným botom overeným podľa IP.
- DataForSEO (živá viditeľnosť v ChatGPT, LLM mentions) som nepoužil – patrí do oblasti agenta dataforseo; platformové skóre sú preto heuristický odhad.
- Playwright nebol potrebný (render_page --mode auto: všetkých 8 URL raw, is_spa=false).
