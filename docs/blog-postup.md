# Blog: ako pridať nový článok

Blog je statické HTML bez databázy a bez build kroku. Každý článok je jeden súbor `blog/<slug>/index.html`, takže adresa je `https://www.gavalier.sk/blog/<slug>/`.

## Kroky

1. Zvoľ slug: malé písmená bez diakritiky, slová oddelené pomlčkou (napr. `web-na-mieru-alebo-sablona`).
2. Skopíruj `blog/_sablona/index.html` do `blog/<slug>/index.html`.
3. Nahraď všetky zástupné texty veľkými písmenami (`SLUG`, `NADPIS ČLÁNKU`, `RRRR-MM-DD`, `SLUZBA`).
4. V hlavičke uprav `<title>` (do cca 60 znakov), `meta description` (do cca 155 znakov), `canonical`, `og:` a `twitter:` meta.
5. V JSON-LD (`<script type="application/ld+json">`) uprav `BlogPosting` (`headline`, `description`, `datePublished`, `dateModified`, `url`), `BreadcrumbList` a `FAQPage`. Otázky a odpovede vo FAQPage musia byť rovnaké ako vo viditeľnom FAQ na stránke.
6. Napíš obsah: jeden H1, odpoveď v prvom odseku (zhrnutie), logické H2/H3, na konci FAQ a odkaz na príslušnú službu.
7. Pri zmene článku aktualizuj `dateModified` v JSON-LD aj `<time datetime>` v hlavičke článku.
8. Pridaj článok do `blog/index.html` (položka `<li class="post">` navrchu zoznamu: dátum, titulok, jedna veta popisu, téma a čas čítania; uprav počet článkov v riadku roka; JSON-LD `blogPost`), do `sitemap.xml` (nový blok `<url>` s `lastmod`) a do `llms.txt` (jedna veta).
9. Odkazuj na článok zo súvisiacej stránky služby a naopak.
10. Skontroluj: JSON-LD je platný JSON, všetky odkazy vedú na existujúce stránky, čísla a ceny sú overené.

## Vzhľad

Stránky blogu majú vlastný štýl `css/components/blog.css` (Manrope na nadpisy, Source Serif 4 na text) a nenačítavajú ostatné CSS webu. V článku doplň tému nad nadpisom (`.kicker`, názov služby) a čas čítania v riadku autora: počet slov článku delený 200, zaokrúhlený na minúty. Riadok „Aktualizované“ pridaj až vtedy, keď sa dátum zmeny líši od dátumu publikovania.

## Pravidlá

- Čísla, ceny, časy a mená klientov iba overené. Čo chýba: `<!-- TODO(Marcel): doplniť -->`.
- Žiadne vymyslené prípadové štúdie.
- Sieťové a audio/video témy sem nepatria.
- Pred nasadením na ostrý web postupuj podľa skillu `nasadenie-webu`.

## Súbory, ktoré sa nenasadzujú

`.assetsignore` vynecháva `docs/`, `blog/_sablona/` a `blog/ZOZNAM-TEM.md`. Nový súbor, ktorý nepatrí na web, pridaj do `.assetsignore` pred commitom.
