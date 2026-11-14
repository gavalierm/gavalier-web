# SXO audit: https://www.gavalier.sk (2026-11-13)

Scope: intent match and conversion path (CTA, contact, trust) for the homepage, 4 service pages and the blog.
Technical SEO, content/E-E-A-T depth, schema validity and GEO are covered by other agents; they appear here only where they affect intent or conversion.

Method:
- Pages read from the local repo (HTML parsed with a stdin-only Python stdlib script; no files written). The plugin scripts (render_page.py, parse_html.py) were NOT run, as instructed. JS behaviour was read from source (js/site-header.js, js/site-nav.js), not rendered.
- SERP evidence: 13 WebSearch queries with generic Slovak keywords only (no name, no contact data). Spot-checked 3 ranking service pages with WebFetch (blckalpaca.at automation consulting and AI agent integration, KPMG IT poradenstvo).
- Page types follow the plugin taxonomy (page-type-taxonomy.md). Persona scoring follows persona-scoring.md (Relevance, Clarity, Trust, Action, 25 points each). The user asked for 2-3 personas, so 3 are used instead of the reference's 4-7.
- "SXO Gap Score" is separate from any SEO Health Score.

Business context that shapes every verdict: most clients come by referral and usually phone. The copy spec (docs/2026-08-18-problem-first-copy-design.md) says the site must confirm the referral, remove the price worry, show the guarantee and make the phone call easy. Every recommendation below respects the spec's forbidden list: no price anchors, no "prvý hovor je zadarmo", no claims about what the customer thinks or fears, and no new claims about clients, guarantees or prices without the operator.

---

## 0. Cross-site findings (ordered by severity)

### F1 [HIGH] Service pages have no clickable contact in the first screen
Evidence (measured in `<main>`):

| Page | Words before first tel:/mailto: link | Total words in main |
|---|---|---|
| tvorba-webu | 537 | 640 |
| automatizacia | 541 | 644 |
| ai-agenti | 550 | 653 |
| seo-llm-optimalizacia | 604 | 707 |

- The first clickable phone link is the "Chcete to prebrať?" block after the FAQ, at about 84% of the page.
- In "Ako to prebieha", step 1 shows the number as plain text with no link: "Zavoláte na +421 915 697 915 ..." (tvorba-webu/index.html:270, same on the other 3 pages).
- The sticky header on subpages (`site-header show`) holds only the burger, the brand and the eye icon. The phone sits inside the closed nav panel (`site-nav__phone`, tvorba-webu/index.html:220).
- The homepage does this right: a phone link in the hero (index.html:520, "Najrýchlejšia cesta je zavolať").
- Impact: a referred visitor who lands deep (for example a link to /tvorba-webu/ sent in a message) or a search visitor has to scroll the whole page to find a tappable contact. This hits the spec's main goal ("spraviť telefonát čo najľahším") hardest on mobile.

Fix:
1. Under each service H1 intro, add the homepage hero pattern. Copy: "Najrýchlejšia cesta je zavolať." + `<a href="tel:+421915697915">+421 915 697 915</a>` + a secondary `<a href="mailto:marcel@gavalier.sk?subject=Tvorba%20webu">Napísať e-mail</a>`, with the subject set per page for attribution.
2. Make the number in step 1 a `tel:` link.
3. Optional: show a phone icon or link in the subpage sticky header, to the left of the eye.

### F2 [HIGH] Service pages have no proof (no testimonial, case, logo or face)
Evidence:
- None of the 4 service pages has a testimonial, a reference, a client logo, a portrait or a link to /#referencie outside the nav.
- The homepage already has 6 approved quotes. Three of them fit /tvorba-webu/ directly: Skarper (Web), CVI (Správa webu) and Cavaleers (Web). There is also the dashboard anecdote ("klient chcel zvládnuť AI marketing - nakoniec mu stačil prehľad"), which fits /ai-agenti/.
- The taxonomy requires at least one case study or testimonial for a Service Page.
- SERP evidence: competitor service pages show cases (blckalpaca: IPEC Group case plus use-case tabs, 5-step process and a founder block), and the Slovak buying guide that ranks for web queries (podnikajte.sk) tells readers to choose a vendor by "referencií, predošlých projektov".

Fix (reuse approved content only):
- /tvorba-webu/: add a "Ako to dopadlo" block with the Skarper and CVI quotes. Use Cavaleers last or not at all: it is the brother's firm, and the spec already recommends taking it out of the logo strip.
- /ai-agenti/: turn the dashboard anecdote into a 3-line mini case ("Zadanie / Čo sa ukázalo / Výsledok").
- /automatizacia/ and /seo-llm-optimalizacia/: no approved proof exists. Ask the operator for one real case per page (the texty-webu skill requires approval). Until then, link to "/#recenzie" with "Ako to dopadlo u iných".
- On all 4 pages, add a small "Kto to robí" box before the final CTA: portrait (assets/gavo_edited.png), 2 sentences reused from /#kto-to-robi, and a link to the homepage section.

### F3 [HIGH] No page targets the "IT poradca / IT poradenstvo" intent, even though "poradca" is the chosen positioning
Evidence:
- The spec defines the relationship as "poradca, nie dodávateľ". Yet "poradca" and "poradenstvo" appear nowhere on the site. "konzultant" appears only in `<meta name="keywords">` and "konzultácia" only in button labels.
- The homepage title is "Marcel Gavalier - Weby, IT siete, eventy a live prenosy" and the H1 is "Ste tu správne.", so it does not match this intent.
- SERP for "IT poradca pre firmy Slovensko" and "IT poradenstvo pre malé firmy externý IT konzultant": service pages from consultancies (KPMG "IT Poradenstvo" with a named contact, ESET "Konzultačná podpora", IT POMOC) plus editorial pieces about outsourced IT (noviny.sk "Dobrý externý správca IT...", startitup.sk). Mixed Service Page (about 55%) and editorial (about 45%).
- The material for such a page already exists and is approved: the homepage "Network & Infra" accordion ("Jeden kontakt pre všetko", "Kontrola architektúry a špecifikácie", "Bezpečnostný audit cez partnerov", "Tím preverených sieťarov a adminov").

Fix: create /it-poradenstvo/ as a Service Page that reuses these texts, with H1 "IT poradenstvo pre firmy" and the same price, guarantee and process blocks as the other service pages. Link it from the hero service list and the footer "Služby". If the operator does not want the page, at least put "IT poradca" or "IT poradenstvo" in the homepage title or meta. Severity is HIGH for search; for referrals it is MEDIUM.

### F4 [MEDIUM] On the homepage, the services in the hero and the menu are not reachable in the first screen
Evidence:
- The hero service line "Automatizácia rutiny a AI agenti · Weby a eshopy · Webové aplikácie · ..." is plain text with no links.
- The header (and with it the hamburger) appears only after 300 px of scroll on mobile and 500 px on desktop (js/site-header.js; also listed as a known limitation in the spec).
- The links to the service pages first appear in the "Detaily" accordion, far down the page.
- Impact: a referred visitor who already knows they want "web" or "automatizácia" cannot jump to the matching page.

Fix: turn the hero service line into links (/automatizacia/, /ai-agenti/, /tvorba-webu/, ...). Optionally show the hamburger from the start on mobile.

### F5 [MEDIUM] The ranking type for "AI agenti pre firmy" and "optimalizácia pre ChatGPT" is mostly informational, not service
See the per-page verdicts in sections 3 and 4. The blog has the right page type for the ChatGPT query but not for AI agents.

### F6 [MEDIUM] The four guarantees are not shown as a block on service pages
Evidence:
- Service pages repeat "Cenu poviem dopredu a platíte len za výsledok" and one FAQ answer. The 4-point guarantee ("Ručím za to." / Štyrmi spôsobmi), which the spec calls "toto uzatvára obchody", appears only on the homepage.
- The service pages have no link to /#zaruka in the body.

Fix: add a compact 4-item strip ("Cenu dodržím · Platíte len za výsledok · Ostávam k dispozícii · Ručím vlastným menom") above "Koľko to stojí", linked to /#zaruka. The wording must stay identical to index.html, because the texty-webu rule requires claims to match across 4 places.

### F7 [LOW] The only async path is a bare mailto
- For marketing managers and CTOs, email or brief-first contact is common. A bare `mailto:` without a subject gives no context or attribution.
- Fix: per-page `?subject=` (see F1). Optionally add a one-line hint: "Napíšte 2-3 vety: čo dnes robíte ručne / čo má web robiť". Do not add a long form: the spec rejects "formuláre na dvadsať políčok".
- Any response-time promise ("ozvem sa do ...") is a new claim and needs the operator.

### F8 [LOW] The homepage title leaves out AI, the work the operator wants most
- Title: "Weby, IT siete, eventy a live prenosy". The body puts AI first on purpose ("AI je prvé úmyselne"), and the meta description starts with "AI a automatizácie".
- og:title is "Ste tu správne - Marcel Gavalier". When a referral link is shared in a messenger, the preview shows no service.
- Fix: for example "Marcel Gavalier - AI, automatizácie, weby a IT poradenstvo". Keep it in sync with og:title, twitter:title and llms.txt.

---

## 1. Homepage /

**Target intent:** navigational/brand (a referred visitor checking the person) plus a broad commercial "who can help me with X". Name queries were not searched (forbidden); verdict based on page signals.

**Page type:** Landing Page (single hero proposition, phone CTA above the fold, guarantees, testimonials, logos, repeated CTA, FAQ schema).

**SERP page-type evidence:** a brand query normally returns the brand's own landing page plus profiles. Not verified by search, by instruction.

**Verdict:** ALIGNED for referral and navigational intent. HIGH gap for the "IT poradca" intent (F3).

| Persona | Relevance | Clarity | Trust | Action | Total | Rating |
|---|---|---|---|---|---|---|
| SMB owner, referred | 22 | 21 | 22 | 23 | 88 | Excellent |
| Marketing manager | 16 | 14 | 18 | 17 | 65 | Good |
| CTO, mid-size company | 14 | 12 | 16 | 14 | 56 | Needs Work |

Evidence:
- SMB owner: "Ste tu správne." confirms the referral, the phone is in the hero, the 4 guarantees, price and 3 steps come before any detail, there are 6 quotes, and IČO and address are in the footer.
- Marketing manager: web and SEO are inside the "Detaily" accordions; the AI-marketing anecdote supports them. The Skarper and CVI quotes help, but there is no result/metric case.
- CTO: the technical substance ("AI-first pipeline (nie vibe coding)", E2E, code review, Network & Infra architecture review) is buried in accordions. It sits next to events, stage lighting and "každá moderná firma či domácnosť", which reads as SMB/consumer. Partner logos (MikroTik, Websupport) are honestly labelled as partly partners, but the page has no technical proof (code, architecture write-up).

Weakest persona: CTO (56).
- Fix: add a short "Pre technické tímy" paragraph near "Code & IT", or link the /it-poradenstvo/ page (F3) with the architecture-review and code-review texts already on the page, plus an email-first CTA ("Pošlite špecifikáciu e-mailom").

Other fixes: F4 (link the hero services), F8 (title).

SXO Gap Score: Page Type 13/15, Content Depth 12/15, UX Signals 12/15, Schema 13/15, Media 9/15, Authority 12/15, Freshness 7/10 = **78/100**.

---

## 2. /tvorba-webu/

**Target queries:** "tvorba webu na mieru", "tvorba web stránok", "tvorba webu Poprad", "web na mieru cena".
**Intent:** commercial investigation leading to a transaction, with local modifiers.

**SERP page-type evidence** (queries: "tvorba webu na mieru", "tvorba web stránok cena Slovensko", "tvorba web stránok pre firmy na mieru webdizajn", "tvorba webu Poprad"):
- Directories and listings: firmy.cz category pages by region, about 40% of links.
- Agency service pages: aitom.cz "tvorba webu a online aplikací", noviny.sk PR piece for a Košice agency.
- Buying guides and blog posts: podnikajte.sk ("8 najčastejších mýtov", "Čo by mal spĺňať dobrý firemný web"), hostragons "WordPress verzus web na mieru" and "cena za vytvorenie webovej stránky", ranktracker templates vs custom.
- Builders (Hostinger, systeme.io) for the cheap/DIY segment.
- The Poprad query returned no local agency page and no local pack in this tool; local intent is weakly served by anyone.

Consensus: Service/agency + directory (about 55%) and guide/blog (about 40%). Confidence is low, because the search tool is not google.sk (see Limitations).

**Page type of target:** Service Page (offer list, process, price section, FAQ, contact).

**Verdict:** ALIGNED on type, but it is missing the defining element of web-design service pages, a portfolio or references (MEDIUM). The informational side (price, template vs custom) has no blog post to catch it.

| Persona | Relevance | Clarity | Trust | Action | Total | Rating |
|---|---|---|---|---|---|---|
| SMB owner (referred or search) | 21 | 17 | 11 | 13 | 62 | Good |
| Marketing manager | 18 | 16 | 10 | 13 | 57 | Needs Work |
| CTO, mid-size company | 15 | 16 | 11 | 13 | 55 | Needs Work |

Evidence:
- Strengths: CMS for non-technical users, hosting, ongoing care and "Dokážete web aj upraviť" all match the SMB situation. The price section and FAQ answer "Koľko stojí web na mieru?" in the voice approved by the spec.
- Trust: the page has no portfolio, screenshots, quotes or face. The only proof is "Tento web (gavalier.sk) je postavený ako statické HTML...", which is good but not enough.
- Action: see F1.
- CTO: "moderný stack" is not specified. Accessibility, performance targets, code ownership and handover are not addressed. The Claude Code + E2E paragraph helps.

Weakest persona: CTO (55), with the marketing manager close behind (57).

Fixes:
1. [HIGH] F1 CTA under the H1.
2. [HIGH] F2: add the Skarper and CVI quotes. Add a "Ukážky" row of 3-4 delivered sites if the operator approves naming them (Skarper and CVI are already public quotes on the homepage, so asking for screenshot permission is the natural next step).
3. [MEDIUM] Add an H2 "Pre koho je web na mieru a kedy stačí šablóna". The SERP clearly rewards this comparison (hostragons, ranktracker), and the page already has an FAQ answer to build on. It serves both search intent and the honest-advisor voice.
4. [MEDIUM] For the CTO, add one line to "Ako pracujem" naming the default stack options and stating that the client owns the code and access. That is a new claim, so confirm it with the operator.
5. [LOW] Local signals: "Poprad" appears only in the meta and an FAQ. If local search matters, see `/seo local` (GBP). Do not add Poprad in any context other than the person (spec).

SXO Gap Score: Page Type 12/15, Content Depth 9/15, UX Signals 8/15, Schema 12/15, Media 3/15, Authority 6/15, Freshness 7/10 = **57/100**.

---

## 3. /ai-agenti/

**Target queries:** "AI agenti pre firmy", "AI agent pre malú firmu", "nasadenie AI agenta na mieru".

**SERP page-type evidence:**
- "AI agenti pre firmy": about 80% informational explainers or vendor blogs (Microsoft cs-cz "AI agents and business", 2 KPMG SK insight articles on opportunities, risks and liability, tecnoloblog, ClickUp, techsy, sigosoft blog, blckalpaca glossary and blog). Almost no service pages.
- "nasadenie AI agenta vo firme na mieru": Service Pages dominate (flowhunt "Zákazkový vývoj umelej inteligencie", blckalpaca "Integrácia AI agenta" with a 5-step process, use-case tabs, 2 cases, an 11-question FAQ and a founder CTA).
- Recurring PAA-style themes in the snippets: what an agent is, use cases by department (HR, sales, support), integration with ERP/CRM, liability and oversight ("Kto nesie zodpovednosť, ak agent spôsobí škodu?"), ROI.

**Page type of target:** Service Page with a short definition (Hybrid-light).

**Verdict:** MEDIUM mismatch for the head term, which wants an explainer with examples. ALIGNED for the commercial modifier ("nasadenie ... na mieru").

| Persona | Relevance | Clarity | Trust | Action | Total | Rating |
|---|---|---|---|---|---|---|
| SMB owner | 18 | 18 | 12 | 13 | 61 | Good |
| Marketing manager | 16 | 17 | 11 | 13 | 57 | Needs Work |
| CTO, mid-size company | 14 | 16 | 12 | 13 | 55 | Needs Work |

Evidence:
- Clear 1-sentence definition and an honest "Kedy AI agent dáva zmysel" compared with plain automation. "AI robí aj chyby ... kontrolu výstupov človekom" is a trust positive that matches the risk theme in the SERP.
- No concrete examples: the e-mail triage example lives only in the automation blog post, and the dashboard anecdote only on the homepage. No use cases by department, no case.
- CTO: nothing on where data is processed, which models or providers, logging and audit, or access control. These are exactly the governance points the ranking SERP content (KPMG, blckalpaca) raises.

Weakest persona: CTO (55).

Fixes:
1. [HIGH] F1, F2 (dashboard mini case).
2. [MEDIUM] Add an H2 "Príklady" with 3 short use cases taken from existing approved copy: e-mail triage (blog), dashboard across systems (homepage anecdote), product data entry (homepage "AI vám nahodí produkty").
3. [MEDIUM] Add an H2 "Údaje a kontrola" with 3-4 bullets on where the agent runs, what it can access, how its actions are logged, and where a human approves. New claims, so confirm with the operator.
4. [MEDIUM] Content gap for the head term: a blog post "Čo je AI agent a kedy sa oplatí malej firme" (informational type, matching about 80% of that SERP) that links to /ai-agenti/. Leave the depth to `/seo content`.

SXO Gap Score: Page Type 9/15, Content Depth 8/15, UX Signals 8/15, Schema 12/15, Media 2/15, Authority 5/15, Freshness 7/10 = **51/100**.

---

## 4. /seo-llm-optimalizacia/

**Target queries:** "SEO pre ChatGPT", "optimalizácia pre AI vyhľadávanie", "GEO optimalizácia", "ako sa objaviť v ChatGPT".

**SERP page-type evidence** (queries: "optimalizácia pre AI vyhľadávanie ChatGPT web", "SEO pre ChatGPT služba", "GEO optimalizácia webu pre AI vyhľadávače agentúra Slovensko"):
- About 90% guides, blog posts and listicles: blckalpaca knowledge base (GEO, ChatGPT search fan-out), flowhunt "Ako sa umiestniť v ChatGPT", ranktracker SK guides and "best GEO agencies" lists, HubSpot, yotpo, seocrawl "Jak se zobrazit v ChatGPT".
- Even with the "služba" or "agentúra" modifier, no Slovak service page appeared; the commercial intent shows up as listicles of agencies (a Comparison type).
- Dominant vocabulary: "GEO", "AI SEO", "ChatGPT SEO", "AI vyhľadávanie". The site's term "LLM optimalizácia" does not appear in any result title.

**Page types on the site:** /seo-llm-optimalizacia/ is a Service Page. /blog/ako-sa-objavit-v-odpovediach-chatgpt/ is a Blog Post.

**Verdict:**
- The blog post is ALIGNED with the head-term intent.
- The service page has a HIGH mismatch if it is meant to rank for the head terms. It is aligned only for commercial queries, which hardly exist in Slovak.
- MEDIUM risk of overlap: both pages cover OAI-SearchBot, robots.txt, llms.txt and FAQ rich results with near-identical FAQ answers ("Potrebujem súbor llms.txt?").

| Persona | Relevance | Clarity | Trust | Action | Total | Rating |
|---|---|---|---|---|---|---|
| SMB owner | 15 | 15 | 14 | 13 | 57 | Needs Work |
| Marketing manager (primary) | 21 | 19 | 13 | 13 | 66 | Good |
| CTO, mid-size company | 18 | 19 | 14 | 13 | 64 | Good |

Evidence:
- Very honest scope ("Čo sa dá a čo sa nedá sľúbiť") plus measurement advice (GSC, Bing WMT, monthly prompt checks), which matches the cautions in the SERP.
- For the SMB owner it is jargon-heavy (JSON-LD, sitemap, robots) with no plain-language "čo z toho budete mať".
- No proof: no before/after, not even the site's own setup offered as a demo.
- No low-threshold offer: the only next step is the generic call.

Weakest persona: SMB owner (57).

Fixes:
1. [HIGH] F1, F2.
2. [MEDIUM] Split intent explicitly. Make the blog post the head-term target ("ako sa objaviť v ChatGPT", "optimalizácia pre ChatGPT"). Make the service page answer "who does it for me and what do I get". Replace the duplicated technical FAQ on the service page with buyer questions ("Čo dostanem na konci?", "Ako zistím, či to pomohlo?"), and link to the article for the "how".
3. [MEDIUM] Add the SERP vocabulary to the intro and H2s: "GEO (generative engine optimization)", "AI SEO", "SEO pre ChatGPT". Keep "LLM optimalizácia" as the brand term.
4. [MEDIUM] Name a concrete first step as an offer: "Kontrola webu: pozriem robots.txt, sitemap, štruktúrované dáta a texty a poviem, čo vám bráni". The scope must be confirmed by the operator. It gives the marketing manager a small, defined thing to say yes to.
5. [LOW] Add a "Pre majiteľa firmy v skratke" box of 3 plain bullets at the top for the SMB persona.

SXO Gap Score: Page Type 7/15, Content Depth 10/15, UX Signals 8/15, Schema 12/15, Media 2/15, Authority 6/15, Freshness 7/10 = **52/100**.

---

## 5. /automatizacia/

**Target queries:** "automatizácia procesov firma", "automatizácia firemných procesov", "automatizácia pre malú firmu".

**SERP page-type evidence** (queries: "automatizácia procesov firma", "automatizácia firemných procesov na mieru malá firma"):
- Service/consulting pages, about 35%: KPMG SK "Digitalizácia a automatizácia procesov (RPA)", blckalpaca "Poradenstvo pri automatizácii procesov" with a hero CTA "Dohodnúť rozhovor", a deliverables list (process map, scoring, roadmap), 5 steps (consultation, mapping, evaluation, pilot, handover), 1 case, a 5-question FAQ and a founder block.
- Informational, about 65%: podnikajte.sk "Aj slovenské firmy začali automatizovať procesy", SAP "what is process automation", flowhunt BPA guide, hostragons RPA, beancount small-business guide, Forvis Mazars RPA blog.
- Common themes: RPA terminology, invoicing, accounting, orders and HR as use cases, "start with process mapping", risk of weakened controls.

Consensus: Hybrid (Service + Content), moderate confidence.

**Page type of target:** Service Page with educational sections ("Kedy sa to oplatí", 7 FAQ) = Hybrid-light. The blog post on invoicing covers the informational side and links back.

**Verdict:** ALIGNED (the best-matched page on the site). Gaps are proof and deliverables, not type.

| Persona | Relevance | Clarity | Trust | Action | Total | Rating |
|---|---|---|---|---|---|---|
| SMB owner | 22 | 18 | 10 | 13 | 63 | Good |
| Marketing manager | 16 | 17 | 10 | 13 | 56 | Needs Work |
| CTO, mid-size company | 17 | 17 | 10 | 13 | 57 | Needs Work |

Evidence:
- Concrete SMB examples (products, reports, e-mails), an honest "kedy skript nepomôže", "Musím rozumieť programovaniu? Nie".
- No case, no quote. The marketing use cases (lead routing, CRM sync, report automation for campaigns) are not named.
- CTO: languages and API are named, but monitoring, error handling and exceptions (covered in the blog post: "Každá automatizácia musí vedieť povedať, že niečo nezvládla"), data and GDPR are missing.

Weakest persona: marketing manager (56).

Fixes:
1. [HIGH] F1, F2 (ask the operator for one real automation case).
2. [MEDIUM] Add "Čo dostanete" with deliverables in the SERP pattern: a short process map, the proposed solution, the price, and a pilot on one activity first. This matches the blog's "začnite najmenším krokom" and the spec's "viac verzií".
3. [MEDIUM] Add a marketing example line ("reporty z kampaní a e-shopu do jedného prehľadu", "nové dopyty z webu rovno do CRM"). Confirm with the operator that this is offered work.
4. [LOW] Pull the exceptions and control paragraph from the blog post into the page for the CTO.

SXO Gap Score: Page Type 12/15, Content Depth 9/15, UX Signals 8/15, Schema 12/15, Media 2/15, Authority 5/15, Freshness 7/10 = **55/100**.

---

## 6. Blog

### /blog/ (index)
- Type: blog listing, 2 posts.
- Intent: navigational from the site. Fine as is.
- Conversion: the footer has Služby and Kontakt links. No issue for SXO.

### /blog/ako-automatizovat-fakturaciu-a-emaily/
- Target: "ako automatizovať fakturáciu", "automatizácia fakturácie malá firma" (informational how-to).
- Type: Blog Post (author, date, BlogPosting, FAQ). ALIGNED with the informational share of the automation SERP.
- Conversion path is good: an "Kedy zavolať pomoc" H2, an author aside with a service link, tel: and mailto, and "Čítajte ďalej" cards to /automatizacia/ and /ai-agenti/.

| Persona | R | C | T | A | Total |
|---|---|---|---|---|---|
| SMB owner | 22 | 21 | 15 | 19 | 77 Good |
| Marketing manager | 15 | 20 | 14 | 17 | 66 Good |
| CTO | 14 | 20 | 14 | 17 | 65 Good |

Fixes:
- [LOW] Add one worked example (an illustrative calculation, clearly labelled, as the post already says "čísla si doplníte").
- [LOW] Add one diagram or image (0 images now).

SXO Gap Score: 13+9+11+13+3+10+9 = **68/100**.

### /blog/ako-sa-objavit-v-odpovediach-chatgpt/
- Target: "ako sa objaviť v ChatGPT", "optimalizácia pre ChatGPT", "SEO pre ChatGPT". This is the right page type for the about 90% informational SERP (section 4). ALIGNED.
- Strong trust: cites OpenAI bots docs and Google's AI guide, and debunks common claims (guarantee of citation, llms.txt, FAQ rich results).
- Conversion path: author aside, plus a service link to /seo-llm-optimalizacia/ and tel:/mailto.

| Persona | R | C | T | A | Total |
|---|---|---|---|---|---|
| SMB owner | 15 | 18 | 18 | 18 | 69 Good |
| Marketing manager | 23 | 21 | 19 | 18 | 81 Excellent |
| CTO | 19 | 21 | 19 | 17 | 76 Good |

Fixes:
- [MEDIUM] Add "GEO" and "AI SEO" to the intro and one H2 (SERP vocabulary).
- [LOW] Add a mid-article soft CTA after the "Kontrolný zoznam" ("Chcete, aby som ho prešiel na vašom webe? Zavolajte.").
- [LOW] Add a dateModified that is visible on the page.

SXO Gap Score: 13+10+11+13+3+11+9 = **70/100**.

---

## 7. User stories (derived from SERP signals)

1. **Awareness.** As a small-company owner who keeps reading that "AI agents" will change business, I want a plain explanation with examples from firms like mine, so I can tell whether it applies to me. Signal: the "AI agenti pre firmy" SERP is about 80% explainers (Microsoft, KPMG, ClickUp).
2. **Consideration.** As an owner choosing who builds our web, I want to see previous projects and what other clients say before I call, so I can trust the price and quality. Signal: podnikajte.sk ranks for web queries with "vyberajte podľa referencií, predošlých projektov"; firmy.cz listings show price and portfolio.
3. **Consideration.** As a marketing manager, I want to know if we can show up in ChatGPT answers and how to measure it, without being promised the impossible. Signal: "optimalizácia pre ChatGPT" results all discuss citation, measurement and caveats (flowhunt, blckalpaca, HubSpot data).
4. **Decision.** As a CTO, I want to know how an AI agent or automation handles data, errors and oversight, so I can approve it internally. Signal: KPMG SK on agent liability and oversight; blckalpaca on GDPR, audit logs and human escalation; Forvis Mazars on weakened controls.
5. **Decision.** As a referred visitor on a service page, I want to call with one tap without scrolling, so the recommendation turns into a conversation. Signal: business context (referrals by phone), plus competitor service pages that put "Dohodnúť rozhovor" in the hero.

## 8. What works (keep)
- The homepage serves the referred SMB owner very well (88/100). The H1 confirms the referral, the phone is in the hero, guarantees and price come before detail, and the honest logo disclaimer plus 6 quotes provide proof.
- Price and guarantee language is consistent across all pages and matches the spec.
- Every service page has a process, a price section, an FAQ and a "Súvisiace" block. Blog posts link back to the matching service page and carry tel:/mailto. Cross-linking between pages is good.
- Honest scope statements ("AI robí aj chyby", "Nikto nemôže zaručiť citáciu") match the cautions in the ranking SERP content and build trust with sceptical personas.
- /automatizacia/ plus its blog post together match the hybrid SERP well.

## 9. Priority actions
1. F1: clickable phone and e-mail under the H1 on all 4 service pages, plus a `tel:` link in "Ako to prebieha" (HIGH, about 30 min).
2. F2: reuse approved homepage quotes and the anecdote on /tvorba-webu/ and /ai-agenti/; ask the operator for cases for the other two pages; add a "Kto to robí" box (HIGH).
3. F3: /it-poradenstvo/ page from the existing "Network & Infra" texts, or at least the term in the homepage title (HIGH for search).
4. F4 and F6: link the hero services; add the guarantee strip on service pages (MEDIUM).
5. F5: split service vs article intent for SEO/LLM; plan an "AI agent" explainer post (MEDIUM).

Cross-skill: `/seo content` for E-E-A-T and depth of the proof sections; `/seo local` if "Poprad" searches matter; `/seo schema` to keep Service and FAQ data in sync with any new blocks.

## 10. Limitations
- WebSearch is a US-based engine, not google.sk. Rankings, positions, PAA boxes, ads, local pack and AI Overviews could not be observed. Many results were Czech or Polish (firmy.cz, flowhunt cs). Page-type shares are estimates from the returned result sets, so treat confidence as low to moderate.
- No search volumes, so persona weighting is qualitative.
- Pages were not rendered (plugin Python runtime not set up, scripts not run by instruction). Above-the-fold analysis comes from HTML order and JS source (site-header.js threshold), not screenshots or a real viewport.
- Brand/name queries were not searched (privacy rule), so the homepage navigational verdict is inferred.
- Analytics, call tracking and real referral behaviour were not available. Conversion impact is inferred.
- KPMG RPA page fetch returned 404 (URL from search was outdated); the KPMG IT poradenstvo page was fetched instead.

## 11. Structured findings (for audit-data.json, category "Search Experience")

```json
[
  {"id":"SXO-F1","severity":"high","pages":["/tvorba-webu/","/automatizacia/","/ai-agenti/","/seo-llm-optimalizacia/"],"title":"No clickable contact in first screen of service pages","evidence":"first tel:/mailto: after 537-604 words (~84% of main); phone in 'Ako to prebieha' is plain text; subpage header has no phone","fix":"Hero CTA under H1 (tel + mailto with subject), tel link in step 1, optional phone in sticky header"},
  {"id":"SXO-F2","severity":"high","pages":["/tvorba-webu/","/automatizacia/","/ai-agenti/","/seo-llm-optimalizacia/"],"title":"No proof on service pages","evidence":"0 testimonials/cases/logos/portrait; homepage has 6 approved quotes (3 web-related)","fix":"Reuse Skarper/CVI quotes on tvorba-webu, dashboard anecdote on ai-agenti, ask operator for cases, add 'Kto to robí' box"},
  {"id":"SXO-F3","severity":"high","pages":["/"],"title":"No page for 'IT poradca/IT poradenstvo' intent","evidence":"term absent from visible text, titles, H1; SERP = consultancy service pages + editorial","fix":"Create /it-poradenstvo/ from existing Network & Infra copy, or add term to homepage title"},
  {"id":"SXO-F4","severity":"medium","pages":["/"],"title":"Hero service list not linked; menu hidden until 300/500 px scroll","fix":"Link hero services to service pages"},
  {"id":"SXO-F5","severity":"medium","pages":["/ai-agenti/","/seo-llm-optimalizacia/"],"title":"Informational SERP for head terms vs service page type","evidence":"AI agenti ~80% explainers; ChatGPT optimisation ~90% guides","fix":"Explainer post for AI agents; split service vs article intent and remove duplicated FAQ on SEO/LLM; add GEO/AI SEO vocabulary"},
  {"id":"SXO-F6","severity":"medium","pages":["service pages"],"title":"4 guarantees not shown on service pages","fix":"Guarantee strip linked to /#zaruka, wording identical to index.html"},
  {"id":"SXO-F7","severity":"low","pages":["all"],"title":"Bare mailto without subject/brief hint","fix":"Per-page ?subject=, one-line brief hint; no long form"},
  {"id":"SXO-F8","severity":"low","pages":["/"],"title":"Homepage title omits AI; og:title has no service","fix":"Title with AI/automatizácie/weby/IT poradenstvo; sync og/twitter/llms.txt"}
]
```

SXO Gap Scores: / 78, /tvorba-webu/ 57, /automatizacia/ 55, /seo-llm-optimalizacia/ 52, /ai-agenti/ 51, blog posts 68 and 70.

A PDF report can be generated with `/seo google report`.
