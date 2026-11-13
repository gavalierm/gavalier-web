# Akčný plán SEO gavalier.sk – 2026-11-13

Značka **[operátor]** = treba rozhodnutie alebo údaj Marcela (pravidlo textov: nové tvrdenia iba od operátora). Ostatné vie urobiť agent webu na kódovej téme.

## Fáza 1: rýchle opravy (týždeň 1)
1. **[operátor]** Rozhodnúť tvrdenia a zjednotiť ich naraz v tele, schema, meta a llms.txt: siete (robíš sám, alebo koordinuješ?), záber SK/CZ/EÚ, „Project & People“, „12+ rokov“ a AI, rozpočet (schema index.html:96, :159).
2. Prepísať llms.txt:42–48 na päť situácií z tela webu, odstrániť zakázané formulácie.
3. Súbor `_headers`: HSTS, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, frame-ancestors; `charset=utf-8` pre llms.txt; cache `max-age=31536000, immutable` pre /assets, /css, /js (iba ak majú súbory verziu v názve, inak kratšia cache).
4. **[operátor]** Potvrdiť URL profilov (LinkedIn, YouTube, GitHub) → `sameAs` v Person aj u autora blogu; og:site_name „Marcel Gavalier“.
5. Hero obrázok do AVIF/WebP so `srcset` (~100 KB), zmenšiť gavo_colored_eye.png, og_image.png na 1200×630, rozmery na logá klientov.
6. Homepage: zobraziť FAQ viditeľne (alebo odstrániť FAQPage zo schema); odstrániť `founderOf` z ProfessionalService; skryť TODO komentáre.
7. Title homepage s AI na začiatku, napr. „Marcel Gavalier — AI a automatizácie, weby, IT siete a eventy“.

## Fáza 2: dôvera a konverzia (týždne 2–3)
1. Telefón a e-mail ako tlačidlá pod úvodný odsek každej podstránky, číslo ako `tel:` odkaz.
2. **[operátor]** Referencie a príklad z praxe na každú stránku služby; vybrané weby na /tvorba-webu/; ktoré mená klientov smú byť uvedené.
3. Blok autora (fotka, odkaz na „Kto to robí“) na podstránkach.
4. Odkazy z homepage na stránky služieb mimo zbaleného bloku „Detaily“; odkazy zo situácií s AI.
5. **[operátor]** /ai-agenti/: kde bežia údaje klienta a kto zodpovedá za chybu agenta.
6. Vlastná stránka 404 (`not_found_handling` vo wrangler.jsonc), 301 namiesto 307 pre /blog, /index.html.

## Fáza 3: obsah a autorita (mesiac 2)
1. Nová stránka „AI poradenstvo pre firmy“ (SERP obsadzujú kurzy, nie poradcovia).
2. /seo-llm-optimalizacia/ zamerať na obchodný variant frázy, návodové hľadanie nechať blogu; využiť „seo optimalizácia“ (480/mes, KD 3).
3. Rozšíriť stránky služieb nad ~800 slov vlastným obsahom (postup, príklady, od čoho závisí cena bez čísel), znížiť spoločný text.
4. **[operátor]** Blog: články z vlastnej praxe, ideálne s YouTube videom a VideoObject.
5. Kvalitné slovenské odkazy: profily, partneri, komunity (spätné odkazy z LinkedIn, YouTube, GitHub na web).
6. Voliteľne disavow cudzieho spamu v GSC (zoznam domén v findings/dataforseo.md).

## Fáza 4: sledovanie (priebežne)
1. Overiť alebo pridať web v Google Search Console (field CWV, indexácia, dopyty).
2. Mesačne DataForSEO: ranked_keywords, nové spätné odkazy, pozície pre frázy z tabuľky v správe.
3. Sitemap `lastmod` podľa skutočnej zmeny, IndexNow ping po nasadení.
