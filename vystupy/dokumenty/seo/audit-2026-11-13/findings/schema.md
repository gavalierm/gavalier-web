# Schema.org audit gavalier.sk (2026-11-13) - skóre 72/100

Metóda: JSON-LD z 9 HTML súborov (zdroj) + diff proti živému webu (index, ai-agenti, blog, 1 článok = identické). Všetky bloky parsujú ako platný JSON, @context https://schema.org, formát @graph, jediný blok na stránku, žiadny Microdata/RDFa. gavalier.sk -> 301/redirect na www (canonical aj @id používajú www: konzistentné).

## Detekcia
| Stránka | Typy |
|---|---|
| index.html:82 | Person, ProfessionalService (+7 Service v OfferCatalog), WebSite, WebPage, BreadcrumbList(1 položka), FAQPage(8), ItemList |
| ai-agenti/ (:57), automatizacia/, tvorba-webu/, seo-llm-optimalizacia/ (:57) | WebPage, Service, BreadcrumbList, FAQPage |
| blog/index.html:48 | Blog+BlogPosting[2], BreadcrumbList |
| 2 články (:51) | BlogPosting, BreadcrumbList, FAQPage |
| blog/_sablona (noindex, na webe 404) | šablóna so zástupnými SLUG/RRRR-MM-DD - OK, nenasadená |

## Zistenia
1. **High - schema tvrdí viac než telo (index.html).** Index FAQPage (index.html:330-390, 8 otázok) nemá viditeľný FAQ zákal v tele (h2 len riadky 532-1409, žiadny faq blok; na podstránkach FAQ viditeľné je, napr. ai-agenti:268). Google: markup musí zodpovedať viditeľnému obsahu. Oprava: buď zobraziť FAQ v tele, alebo FAQPage z indexu odstrániť.
2. **High - areaServed Česko + EÚ len v schema/FAQ** (index.html:~190-200, 386); telo tieto územia nespomína (grep "Česk|EU" v tele = 0 zhôd mimo JSON-LD). Navyše "European Union" nie je Country (chybný typ). Oprava: potvrdiť s operátorom; inak ponechať len Country Slovakia; pre EÚ použiť AdministrativeArea alebo vypustiť.
3. **Medium - FAQPage na 8 stránkach.** Rich results FAQ Google ukončil 7.5.2026; Info priorita, žiadny SERP prínos, AI prínos nepotvrdený. Neškodí, ale údržba dvojitého textu (schema+telo). Odporúčanie: nerozširovať; pri úprave textu držať zhodu. Nie Critical.
4. **Medium - cena/záruka konzistencia.** Cena ("pár desiatok eur po tisíce", index.html:346 vs telo :650 vs llms.txt:3) a záruka (ručím/platí len za výsledok) sú v schema, tele aj llms.txt zhodné vo význame. Zhoda OK. Ale schema FAQ (index:346) obsahuje navyše "Vďaka AI dnes stojí výrazne menej než pred dvoma rokmi" - overiť, že je aj v tele. Záruka "ručí vlastným menom za subdodávateľa" - overiť v tele (riadok ~594).
5. **Medium - Person.sameAs = len vlastná doména** (index.html:137-139); nie je profil tretej strany. Treba vstup operátora: LinkedIn/GitHub URL (nevymýšľať). Duplicita: Person aj ProfessionalService majú rovnaké name "Marcel Gavalier" a rovnakú adresu/telefón - akceptovateľné pre sólo podnikateľa, ale vlastnosti `founder/founderOf/employee` na ProfessionalService sú zbytočne cyklické (index:~165-168); `founderOf` je vlastnosť Person, nie Organization -> neplatná vlastnosť. Oprava: odstrániť founderOf, ponechať founder.
6. **Medium - Service uzly na podstránkach duplikujú ProfessionalService** ako vnorený objekt s @id (ai-agenti:~75) - validné, ale druhá definícia môže kolidovať. Oprava: provider len {"@id": ".../#service"} (graf na podstránke @id nedefinuje, preto buď nechať vnorené minimálne, alebo odkazovať; odkaz na entitu z inej stránky je v poriadku).
7. **Low - Person.worksFor** ukazuje na ProfessionalService, ktorá je tá istá osoba; ok. Person.image/logo existujú a vracajú 200 (assety overené).
8. **Low - BreadcrumbList na indexe s 1 položkou** (index:~290) - zbytočné, môže sa vypustiť (Google nevyžaduje pre koreň).
9. **Low - BlogPosting**: chýba `image` rozmer/ImageObject iba URL (ok); blog/index blogPost bez author/image; datePublished všetkých = 2026-11-11 a WebPage index datePublished 2024-01-15 (overiť pravdivosť). Publisher je Person (povolené).
10. **Low - ItemList "services-list"** (index:~398) bez rich result prínosu; URL všetkých položiek rovnaké #experience. Voliteľné odstrániť.
11. **Low - identifier/taxID**: IČO 47786825 a DIČ 1080715911 sú aj v tele (index:1457-1461), zhodné. OK. `vatID` (IČ DPH) nie je - treba vstup operátora ak je platiteľ.
12. **Info - chýba**: Person/ProfessionalService nemajú `openingHours`, `priceRange` (nevymýšľať; treba vstup operátora), `Review/AggregateRating` (nepridávať bez reálnych recenzií na webe). Na článkoch chýba `author.sameAs`, `wordCount`, `articleSection` (voliteľné). Neodporúčam HowTo/SpecialAnnouncement.

## Návrh JSON-LD (bez nových faktov)
Oprava ProfessionalService.areaServed a odstránenie founderOf:
```json
"areaServed": [{"@type":"Country","name":"Slovakia"}],
"founder": {"@id":"https://www.gavalier.sk/#person"}
```
Person.sameAs po doplnení operátorom: `["https://www.linkedin.com/in/<TREBA VSTUP OPERÁTORA>"]` (nepublikovať s placeholderom).
Blog index - doplniť autora a obrázok do BlogPosting položiek:
```json
{"@type":"BlogPosting","headline":"...","url":"...","datePublished":"2026-11-11","author":{"@id":"https://www.gavalier.sk/#person"},"image":"https://www.gavalier.sk/assets/og_image.png"}
```
Typy Person, ProfessionalService, Service, BlogPosting, BreadcrumbList už existujú; nič z tohto zoznamu nechýba. FAQPage: nepridávať ďalšie.

## Skóre: 72/100
Pokrytie typov a čistota syntaxe vysoké (+), minus za nezhodu schema vs telo (FAQ index, areaServed), neplatnú vlastnosť/typ, slabé sameAs, FAQPage bez SERP hodnoty.
