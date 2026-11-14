# gavalier.sk: Content Quality and On-Page SEO findings

Audit date: 2026-11-13. Scope: the 8 deployed HTML pages (index, 4 service pages, blog index, 2 posts). Source: the local repo files. The live homepage was spot-checked with curl and matches the repo (same `<title>`, TODO comment present).
Method: I read every page in full. Word counts, heading outlines, link counts, readability (average sentence length and LIX) and 6-word shingle overlap were computed with an inline Python stdlib script (no plugin runtime). The templated-metadata check was done by hand, using the same string-comparison logic as `metadata_template.py`, because the plugin script was not run. The external sources cited in the blog were fetched to confirm the claims attributed to them.

## Scores

| Area | Score | Notes |
|---|---|---|
| **Content Quality** | **64 / 100** | Honest, accurate, readable copy. Held back by thin service and blog pages, about a third of each service page being shared boilerplate, and almost no first-hand evidence. |
| **On-Page SEO** | **74 / 100** | Titles and descriptions are unique and well sized, there is one H1 per page, and internal linking is strong. Weak points: homepage title, H1 and slogan H2s, templated description tails, and no landing page for events. |
| **Images (alt text only)** | **80 / 100** | Logo alts are correct and decorative duplicates are handled properly. The only portrait of the person is marked decorative, and the blog has no images. |
| E-E-A-T composite | 60 / 100 | Experience 50, Expertise 60, Authoritativeness 45, Trustworthiness 78 |
| AI citation readiness | 68 / 100 | Good answer-first paragraphs and FAQs. Few quotable facts or numbers, and the homepage uses slogan headings. |

E-E-A-T weighting (this skill's internal model, not Google's): Exp 20%, Expertise 25%, Auth 25%, Trust 30%. That gives 10.0 + 15.0 + 11.25 + 23.4 = 59.7, rounded to 60.

### E-E-A-T breakdown

- **Experience: 50.** Positives: 6 testimonials (index.html:1314-1355), client and partner logos, "viac ako 12 rokov" (index.html:1378), one short client anecdote (index.html:568), and the site used as its own example (tvorba-webu/index.html:267). Negatives: there are no case studies, project pages, photos of real work or measured results. Both posts openly lack first-hand data (blog fakturácia :203 "postup, nie prípadová štúdia", plus the TODOs at :220 and chatgpt :258).
- **Expertise: 60.** Content is technically accurate. Every claim attributed to OpenAI and Google in the ChatGPT post checked out (OAI-SearchBot role, ~24 h robots.txt lag, "ChatGPT-User: robots.txt rules may not apply", Google: llms.txt and "special markup" not used, FAQ rich result deprecated 7 May 2026). The copy is careful with caveats ("AI robí aj chyby", "nikto nemôže zaručiť"). Negatives: no credentials, no author page and no portfolio.
- **Authoritativeness: 45.** Recognisable brand logos (HB Reavis, Trend, Websupport, News and Media Holding) and the Cavaleers group link help. Against that: no external profiles (Person `sameAs` lists only the site itself, index.html:137-139), testimonials name only a company with no person, and there are no third-party mentions.
- **Trustworthiness: 78.** Strong: full legal identity on every page (address, IČO, DIČ, phone, e-mail), a clear four-point guarantee, transparent pricing logic without fake anchors, and honest disclaimers. Lowered by a self-contradiction about networking work (M3), internal TODO notes published in the HTML (L1), and unverifiable testimonials (M8).

### Page inventory (main-content words; floors from this skill)

| Page | Words in `<main>` | Floor | Title chars | Desc chars | H1 |
|---|---|---|---|---|---|
| / | 1,545 (much of it in collapsed accordions) | 500 | 55 | 150 | "Ste tu správne." |
| /automatizacia/ | 540 | 800 | 50 | 151 | Automatizácia firemných procesov |
| /tvorba-webu/ | 538 | 800 | 54 | 140 | Tvorba webu na mieru |
| /ai-agenti/ | 547 | 800 | 50 | 140 | AI agenti pre firmy |
| /seo-llm-optimalizacia/ | 612 | 800 | 46 | 144 | SEO a LLM optimalizácia webu |
| /blog/ | 83 (listing) | n/a | 49 | 130 | "Blog." |
| /blog/ako-sa-objavit-v-odpovediach-chatgpt/ | 801 | 1,500 | 54 | 141 | full question title |
| /blog/ako-automatizovat-fakturaciu-a-emaily/ | 622 | 1,500 | 60 | 139 | full question title |

Word count is not a ranking factor. These floors show topical coverage, not targets.

### Readability

Average sentence length is 10-12 words on every page and LIX is 37-45 (medium; Slovak inflection pushes LIX up). The text is short, concrete and second-person. It reads well for a non-technical SMB audience. The exception is the homepage service accordions, which mix in English jargon (L4).

### Templated metadata (manual heuristic, script not run)

- Shared closing phrase **"Cena dopredu, platíte (len) za výsledok."** appears on 4 of 8 descriptions: index.html:6, automatizacia/index.html:7, tvorba-webu/index.html:7, ai-agenti/index.html:7.
- Shared closing phrase **"Poprad, celé Slovensko."** appears on 3 of 8: automatizacia:7, tvorba-webu:7, seo-llm-optimalizacia:7 (ai-agenti:7 ends with "Poprad.").
- Pages carrying at least one stock tail: 5 of 8, so **templated_ratio ≈ 0.63**. **site_risk: medium** (8-page site, hand-written bodies, deliberate USP). Under this skill's rubric it is still a `templated_metadata` finding, rated High.
- Secondary: `description_echoes_title` on ai-agenti:7 (opens "AI agenti a dashboardy:", which repeats the title head), automatizacia:7 ("Automatizácia …") and seo-llm:7 ("SEO a optimalizácia …"). index.html:6 opens with the brand name "Marcel Gavalier, Poprad:", which repeats the title. There is no `description_duplicates_title`.
- Each description is repeated verbatim in og:description, twitter:description and WebPage.description (for example automatizacia:7/16/29/66). That repetition is normal, but all copies must change together.

---

## Findings

### HIGH

**H1. Templated meta-description tails across service pages and homepage**
- Severity: High (rubric: `templated_metadata`; practical impact moderate on an 8-page site)
- Evidence: index.html:6, automatizacia/index.html:7, tvorba-webu/index.html:7, ai-agenti/index.html:7 all end with "Cena dopredu, platíte (len) za výsledok". automatizacia:7, tvorba-webu:7 and seo-llm-optimalizacia/index.html:7 end with "Poprad, celé Slovensko."
- Fix: Keep the guarantee wording in the homepage description only. Spend each service description's ~150 characters on what is specific to that page. Examples, all within the copy rules (no price anchors, no new claims):
  - /automatizacia/: "Skripty a integrácie namiesto ručného prepisovania údajov, reportov a e-mailov. Prepojím systémy, ktoré spolu nehovoria, nasadím ich a upravím pri zmene procesu."
  - /tvorba-webu/: "Weby, eshopy a PWA aplikácie na mieru vrátane hostingu, domény, CMS pre netechnikov a správy po spustení. Bez preplácaných šablón, s čistým kódom."
  - /ai-agenti/: "Kedy sa oplatí AI agent a kedy stačí obyčajný skript: agenti na prácu s textom a údajmi, dashboardy nad viacerými systémami a kontrola výstupov človekom."
  
  Update meta, og, twitter and the JSON-LD WebPage.description together (texty-webu rule).

**H2. Service pages are below the coverage floor, and about a third of each is shared boilerplate**
- Severity: High
- Evidence: main-content word counts are 538-612 against an 800 floor. Of each page's 6-word shingles, 26-38% also appear on the other service pages (automatizacia 38%, ai-agenti 35%, tvorba-webu 33%, seo-llm 26%). The following blocks are identical on all four pages:
  - "Ako to prebieha" list (automatizacia:267-272, tvorba-webu:268-273, ai-agenti:258-263, seo-llm:268-273)
  - "Koľko to stojí" note and the following sentence (automatizacia:273-275 and equivalents)
  - "Chcete to prebrať?" (automatizacia:314-315)
  
  The answer paragraph also ends with the same sentence on three pages ("Cenu poviem dopredu a platíte len za výsledok.", automatizacia:252, tvorba-webu:252, ai-agenti:244). The identical H2 sequence on every page is the "repetitive structure across pages" marker in the September 2025 QRG.
- Fix: Cut the shared process and price blocks to one line each that links to `/#ako-zacneme` and `/#ako-to-funguje`. Replace them with service-specific sections (operator to supply facts, do not invent):
  - one anonymised real example per service (situation, what was built, outcome)
  - "Čo od vás budem potrebovať" (access, data, sample files)
  - typical deliverables and how handover works
  - systems or tools Marcel has actually integrated
  - for /ai-agenti/, how human review of outputs is set up
  
  Target 800+ words, mostly unique.

**H3. Almost no first-hand Experience evidence anywhere on the site**
- Severity: High (Experience is the weakest E-E-A-T input after Authority; QRG asks for first-hand signals)
- Evidence:
  - Homepage claims are generic ("Väčšina klientov prišla na odporúčanie", index.html:1390), and the one concrete result was removed with a TODO (index.html:1378).
  - The posts state they are not case studies (blog/ako-automatizovat-fakturaciu-a-emaily/index.html:203) and carry TODOs for real data (:220; blog/ako-sa-objavit-v-odpovediach-chatgpt/index.html:258).
  - No project or portfolio pages exist (assets/images/project-*.svg are unused).
- Fix: Add verifiable first-hand material, in priority order:
  1. gavalier.sk itself as a measured case in the ChatGPT post. docs/sledovanie-viditelnosti.md already exists, so publish the real monthly observations with dates.
  2. 2-3 short anonymised or named (with consent) case notes. They could sit on the service pages or on a /referencie/ page that the logo and testimonial sections link to.
  3. Photos from real events (FOH, multi-cam) with descriptive alt text.

### MEDIUM

**M1. Homepage title is out of line with the page's positioning**
- Evidence: `<title>` "Marcel Gavalier — Weby, IT siete, eventy a live prenosy" (index.html:42; also WebPage.name :308). The hero leads with "AI a automatizácie" (index.html:502), the description leads with AI (index.html:6), and 3 of the 4 service pages are AI or automation. The title also features "IT siete", which the page says Marcel does not do himself (index.html:812).
- Fix: "Marcel Gavalier, Poprad: AI, automatizácie, weby a eventy" (57 chars). Update WebPage.name at :308 to match. The brand-first form suits referral traffic that searches the name.

**M2. Homepage H1 has no entity or topic**
- Evidence: `<h1>` "Ste tu správne." (index.html:495). The name is a separate `<p class="hero__byline">` (index.html:494).
- Fix: Keep the spec's visual headline and move the byline inside the H1, for example `<h1 class="hero__title"><span class="hero__byline">Marcel Gavalier</span> Ste tu <span class="headline-mark">správne.</span></h1>`. Adjust CSS so it looks the same. The page-level H1 then carries the name entity.

**M3. Contradiction about networking work (trust)**
- Evidence: the Network & Infra summary says "Sám to nerobím." (index.html:812). Elsewhere the site presents Marcel as a network engineer:
  - footer role "Coder · AI Engineer · Sieťar · Audio \ Video Engineer" (index.html:1448, and every service-page footer, e.g. automatizacia/index.html:367)
  - title "IT siete" (index.html:42)
  - meta keywords "sieťar, network engineer" (index.html:7)
  - Person knowsAbout "MikroTik Network Configuration" (index.html:122)
  - Code & IT Service description "MikroTik a Ubiquiti siete" (index.html:213)
  - sitemap image:title "Sieťar" (sitemap.xml)
- Fix: Choose one truth and apply it everywhere. If networks are coordinated through partners, drop "Sieťar" from the role line and the schema skills, and describe it as "siete cez preverených partnerov".

**M4. Homepage H2s are slogans with no descriptive content**
- Evidence: "Poradím zdarma." (index.html:532), "Tri kroky." (:690), "Detaily." (:736), "Logá." (:906), "Ako to dopadlo." (:1307), "Zavolajte." (:1409). The copy spec (docs/2026-08-18-problem-first-copy-design.md, table "Štruktúra") defines a second line for each heading ("Štyrmi spôsobmi.", "Rozbaľme to.", "Ich slovami." …), but the HTML does not contain those lines. Passage-level retrieval and AI answer engines get no topic signal from these headings.
- Fix: Keep the highlight and add a descriptive second line inside the same `<h2>`. Examples: "Ručím za to. <span>Štyri záruky</span>", "Logá. <span>Klienti a partneri</span>", "Ako to dopadlo. <span>Referencie klientov</span>". This stays within the spec's "highlight + second line" rule.

**M5. Heading levels in the homepage accordions are wrong, and headings sit inside `<summary>`**
- Evidence: under H2 "Detaily." (index.html:736) the accordion titles are also H2 ("Code & IT" :752, "Network & Infra" :810, "Audio \ Video & Stage" :856), and their articles are H3. All FAQ questions are `<h3>` inside `<summary>` (e.g. automatizacia/index.html:279, blog chatgpt :272). Many screen readers treat `<summary>` content as presentational, so the heading is lost.
- Fix: Demote the accordion titles to H3 and their articles to H4. For FAQs, either accept the pattern or use `<summary class="faq__q">Otázka</summary>` and give the `<details>` an `aria-labelledby`. Low risk either way, but the homepage level mismatch should be fixed.

**M6. No landing page for events, live streaming or sound, a core offer backed by its own testimonials**
- Evidence: the homepage section "Chystáte podujatie?" (index.html:574-577) and the Audio \ Video & Stage accordion (:847-891, the only accordion with no page link). Testimonials for "Live stream" (:1318) and "FOH zvuk" (:1346) exist, and the title lists "eventy a live prenosy" (:42). All four service pages are IT-only.
- Fix: Create /eventy/ (or /ozvucenie-a-live-stream/) using the service template: zvuk, svetlá, multi-cam, live stream, what the client must provide, real event references (operator-confirmed only), FAQ. Link it from the accordion, nav, footer, sitemap and llms.txt.

**M7. Generic and misleading anchor nested inside an interactive `<summary>`**
- Evidence: "Podrobnosti o službách" → /automatizacia/ inside the Code & IT summary (index.html:754). The anchor promises all services but leads to one, and a link inside `<summary>` is interactive content nested in interactive content.
- Fix: Remove the link from the summary. The articles below it already link each service with descriptive anchors (:764, :768, :772, :776).

**M8. Testimonials are unverifiable**
- Evidence: index.html:1314-1355. Each card has only a company and an area. There is no person, role, year or project link, and "DIGIT, eFocus" does not appear in the logos.
- Fix: With consent, add name and role, year and a link to the project or company. Mirror the testimonials on an external review profile (e.g. Google Business Profile) so they are verifiable off-site.

**M9. No author or about page and no external identity**
- Evidence: the post bylines link to `/#kto-to-robi` (blog chatgpt :296, fakturácia :286). That section is 4 short paragraphs (index.html:1377-1391) with no credentials and no linked profiles. Person `sameAs` contains only the site itself (index.html:137-139).
- Fix: Create /o-mne/ with the portrait (with alt text), a dated career outline (only facts Marcel confirms), Cavaleers membership, and links to LinkedIn, GitHub and any talks or articles. Point the bylines there and add those profiles to `sameAs` (coordinate with the schema agent).

**M10. Blog posts are thin against the topic, and the invoicing post misses a timely Slovak topic**
- Evidence: 801 and 622 words against a 1,500-word floor. The fakturácia post (blog/ako-automatizovat-fakturaciu-a-emaily/index.html:212-258) gives a generic formula (:235) and names no tools, gives no worked example and cites no source. It also does not mention Slovakia's announced mandatory domestic B2B e-invoicing (planned from 1 Jan 2027). That changes how a small firm should automate invoicing right now. Verify the current status with Finančná správa / MF SR before writing.
- Fix: Add a worked example with real numbers, a section on e-invoicing obligations with a link to the official source, the tools or systems Marcel has actually connected, and 1-2 screenshots or diagrams with alt text. The ChatGPT post needs the measured gavalier.sk data (H3).

### LOW

**L1. Internal editorial TODOs are published in the HTML**
- Evidence: index.html:1378 (`TODO(Marcel): pôvodné tvrdenie … som odstránil (bez dôkazu)`, confirmed on the live site), blog fakturácia :220, blog chatgpt :258.
- Fix: Move them to docs/ or an issue, or strip comments at deploy. Publicly visible "removed (no evidence)" notes undermine trust.

**L2. Inconsistent brand suffix in one title**
- Evidence: blog/ako-automatizovat-fakturaciu-a-emaily/index.html:6, :15, :31 use "| Gavalier". Every other page uses "| Marcel Gavalier".
- Fix: "Automatizácia fakturácie a e-mailov | Marcel Gavalier" (53 chars).

**L3. English jargon and odd notation for a Slovak SMB audience**
- Evidence: "Code & IT" (index.html:752), "Network & Infra" (:810), "Audio \ Video & Stage" (:856), "FOH sound engineering" (:875), "Stage lighting" (:879), "over/under-engineered" (:834), "Custom web a PWA aplikácie" (:771), "PR", "E2E testy" (:780).
- Fix: Use Slovak labels such as "Programovanie a IT", "Siete a infraštruktúra", "Zvuk, video a pódium", "Ozvučenie (FOH)", "Svetelná réžia". Keep English terms in parentheses where people search for them.

**L4. Blog listing H1 is generic**
- Evidence: blog/index.html:140, "Blog."
- Fix: "Blog o automatizácii, webe a AI" (same as the title), styled as it is now.

**L5. "Čítajte ďalej" cards add off-topic H2s to the article outline**
- Evidence: blog chatgpt :309-319 and fakturácia :299-309 have three H2 card titles each after the article.
- Fix: Use H3 under one visually hidden or visible "Čítajte ďalej" H2, or no headings at all.

**L6. Service pages show no visible "updated" date**
- Evidence: there is only JSON-LD dateModified (e.g. automatizacia/index.html:74). The posts do show dates (blog chatgpt :206).
- Fix: Add "Aktualizované: 11. 11. 2026" under the answer paragraph on each service page, and keep it truthful.

**L7. Leftover meta keywords tag**
- Evidence: index.html:7 (contains a stale "Tri oblasti" and "Audio \ Video Producer"). Google ignores it.
- Fix: Remove it, or at least drop stale entries. Zero ranking value either way.

### IMAGES (alt-text side)

**I1. Only portrait of the person is marked decorative (Medium)**
- Evidence: `<img src="assets/gavo_edited.png" alt="" aria-hidden="true">` (index.html:492). The same image is Person.image, primaryImageOfPage (index.html:93, :311), og:image (:20) and the sitemap image ("Marcel Gavalier — Coder, AI Engineer …").
- Fix: `alt="Marcel Gavalier, ilustrovaný portrét"` and remove `aria-hidden`. This helps name searches in image results and gives the face an entity name.

**I2. Blog posts have no images (Low)**
- Evidence: 0 `<img>` in both posts. og:image is the generic logo card (blog chatgpt :17).
- Fix: Add at least one real screenshot or diagram per post with descriptive alt text (e.g. the robots.txt of gavalier.sk, a flow diagram of the invoicing automation). Consider post-specific og:images.

**I3. og:image:alt describes the person rather than the logo card (Info)**
- Evidence: og_image.png is a "G" shield logo with the name, but its alt is "Marcel Gavalier" (e.g. automatizacia/index.html:21, :31).
- Fix: "Logo Marcel Gavalier" (optional).

What works for images:
- All 16 visible client and partner logos have brand-name alts (index.html:920-1072).
- All 34 marquee duplicates and mobile-row copies correctly use `alt=""` with `aria-hidden` (:974-1290).
- The decorative eye graphic has `alt=""` (:444).
- Width and height are set on the header and hero images.

### INFO

- **Copy-rule check (Info):** "Kurz sľuboval … výsledok nie je taký, aký ste čakali" (index.html:544) states what the visitor expected. The operator's spec forbids "tvrdiť, čo si zákazník myslí". Review it against docs/2026-08-18-problem-first-copy-design.md:27.
- **Cross-lane (schema agent):** the homepage FAQPage JSON-LD (index.html:329-397) has 8 Q&As with no visible FAQ on the page. Google retired FAQ rich results on 7 May 2026, so this is now a consistency issue and not a SERP feature.
- **Accuracy verified:** every claim attributed to OpenAI (developers.openai.com/api/docs/bots) and Google (…/fundamentals/ai-optimization-guide, FAQ deprecation notice) in blog/ako-sa-objavit-v-odpovediach-chatgpt matches the current source text, and both cited URLs return 200.

---

## AI citation readiness (68/100)

Strengths:
- Each service page opens with a self-contained definitional answer ("AI agent je program, ktorý…", ai-agenti/index.html:244; automatizacia:252; seo-llm:252).
- Posts lead with an answer-first lede (blog chatgpt :203, fakturácia :203).
- Each page has 5-7 Q&A pairs, plus checklists and numbered procedures.
- Primary sources are linked inline (blog chatgpt :213, :242).
- The pages are honest about limits, which makes them safe to quote.

Gaps:
- Homepage facts (12+ years, Poprad, price range, the four guarantees) sit under slogan headings (M4) and are not stated as plain sentences in one place.
- There are almost no specific numbers, named systems or dated results (H3, M10).
- The author entity is weak (M9).
- There is no page for the events offer (M6).
- Service pages carry no visible date (L6).

## What works

- Every page has a unique title (46-60 chars) and description (130-151 chars), one H1 each, `lang="sk"` and a self-canonical.
- Service-page H1s match the query intent exactly, and visible breadcrumbs mirror the BreadcrumbList.
- Internal linking is dense with no orphans:
  - nav and footer link every service and post
  - service pages cross-link to each other and to the posts
  - posts link back to their service and a related post
  - anchors are descriptive ("Viac o automatizácii", "AI agenti pre firmy")
  - all in-page `#` targets exist
- Copy is clear and plain-spoken (ASL 10-12 words) and free of hype. It avoids invented numbers and states limits explicitly.
- Trust basics are complete on every page: phone, e-mail, address, IČO, DIČ.

---

## Structured findings (for audit-data.json, category "Content Quality")

```json
{
  "category": "Content Quality",
  "scores": {"content_quality": 64, "on_page_seo": 74, "images_alt": 80, "eeat": 60, "eeat_experience": 50, "eeat_expertise": 60, "eeat_authoritativeness": 45, "eeat_trustworthiness": 78, "ai_citation_readiness": 68},
  "templated_metadata": {"site_risk": "medium", "templated_ratio": 0.63, "shared_cta_phrases": ["Cena dopredu, platíte (len) za výsledok.", "Poprad, celé Slovensko."], "method": "manual string comparison, script not run"},
  "findings": [
    {"id": "H1", "severity": "High", "title": "Templated meta-description tails", "evidence": ["index.html:6", "automatizacia/index.html:7", "tvorba-webu/index.html:7", "ai-agenti/index.html:7", "seo-llm-optimalizacia/index.html:7"]},
    {"id": "H2", "severity": "High", "title": "Service pages below 800-word floor, 26-38% shared boilerplate", "evidence": ["automatizacia/index.html:267-275", "automatizacia/index.html:314-315", "ai-agenti/index.html:258-266"]},
    {"id": "H3", "severity": "High", "title": "No first-hand experience evidence", "evidence": ["index.html:1378", "blog/ako-automatizovat-fakturaciu-a-emaily/index.html:203", "blog/ako-automatizovat-fakturaciu-a-emaily/index.html:220", "blog/ako-sa-objavit-v-odpovediach-chatgpt/index.html:258"]},
    {"id": "M1", "severity": "Medium", "title": "Homepage title misaligned with positioning", "evidence": ["index.html:42", "index.html:308", "index.html:502"]},
    {"id": "M2", "severity": "Medium", "title": "Homepage H1 has no entity/topic", "evidence": ["index.html:494-495"]},
    {"id": "M3", "severity": "Medium", "title": "Networking self-contradiction", "evidence": ["index.html:812", "index.html:1448", "index.html:7", "index.html:122", "index.html:213"]},
    {"id": "M4", "severity": "Medium", "title": "Slogan-only H2s", "evidence": ["index.html:532", "index.html:690", "index.html:736", "index.html:906", "index.html:1307", "index.html:1409"]},
    {"id": "M5", "severity": "Medium", "title": "Accordion heading levels / headings in summary", "evidence": ["index.html:752", "index.html:810", "index.html:856", "automatizacia/index.html:279"]},
    {"id": "M6", "severity": "Medium", "title": "No events/live-stream landing page", "evidence": ["index.html:574-577", "index.html:847-891"]},
    {"id": "M7", "severity": "Medium", "title": "Generic anchor inside summary", "evidence": ["index.html:754"]},
    {"id": "M8", "severity": "Medium", "title": "Unverifiable testimonials", "evidence": ["index.html:1314-1355"]},
    {"id": "M9", "severity": "Medium", "title": "No author/about page, no external profiles", "evidence": ["blog/ako-sa-objavit-v-odpovediach-chatgpt/index.html:296", "index.html:137-139", "index.html:1377-1391"]},
    {"id": "M10", "severity": "Medium", "title": "Thin blog posts; e-invoicing 2027 gap", "evidence": ["blog/ako-automatizovat-fakturaciu-a-emaily/index.html:212-258"]},
    {"id": "I1", "severity": "Medium", "title": "Portrait marked decorative", "evidence": ["index.html:492"]},
    {"id": "L1", "severity": "Low", "title": "TODO comments published", "evidence": ["index.html:1378", "blog/ako-automatizovat-fakturaciu-a-emaily/index.html:220", "blog/ako-sa-objavit-v-odpovediach-chatgpt/index.html:258"]},
    {"id": "L2", "severity": "Low", "title": "Inconsistent brand suffix", "evidence": ["blog/ako-automatizovat-fakturaciu-a-emaily/index.html:6"]},
    {"id": "L3", "severity": "Low", "title": "English jargon in accordions", "evidence": ["index.html:752", "index.html:810", "index.html:856", "index.html:875", "index.html:879", "index.html:834"]},
    {"id": "L4", "severity": "Low", "title": "Blog H1 generic", "evidence": ["blog/index.html:140"]},
    {"id": "L5", "severity": "Low", "title": "Related-card H2s in article outline", "evidence": ["blog/ako-sa-objavit-v-odpovediach-chatgpt/index.html:309-319", "blog/ako-automatizovat-fakturaciu-a-emaily/index.html:299-309"]},
    {"id": "L6", "severity": "Low", "title": "No visible updated date on service pages", "evidence": ["automatizacia/index.html:74"]},
    {"id": "L7", "severity": "Low", "title": "Stale meta keywords", "evidence": ["index.html:7"]},
    {"id": "I2", "severity": "Low", "title": "Blog posts have no images", "evidence": ["blog/ako-sa-objavit-v-odpovediach-chatgpt/index.html:17"]},
    {"id": "I3", "severity": "Info", "title": "og:image:alt wording", "evidence": ["automatizacia/index.html:21"]}
  ]
}
```
