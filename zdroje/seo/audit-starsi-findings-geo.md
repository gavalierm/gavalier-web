# GEO / AI Search Readiness: https://www.gavalier.sk

Audit date: 2026-11-13. Scope: AI crawler access (robots.txt and Cloudflare), llms.txt / RSL, passage-level citability, entity clarity, brand-mention signals, platform notes. Agentic browsing (accessibility tree, WebMCP, Markdown delivery), technical SEO, content quality and schema validity are covered by other agents and are not repeated here.

Method: read the local repo files (read-only), ran live `curl` requests with crawler user agents, and called public lookup APIs (Wikipedia, Common Crawl, Wayback) using only the string "gavalier.sk". The plugin scripts were not run, per instructions. The live files are byte-identical to the repo (`diff` of `/`, `/robots.txt` and `/llms.txt` against the repo gives no output), so repo line numbers apply to production.

## GEO Readiness Score: 58 / 100

| Dimension | Weight | Score | Weighted | Basis |
|---|---|---|---|---|
| Citability | 25% | 55 | 13.8 | Subpages have question H2/H3 headings, direct-answer leads and FAQs. Weak points: vague prices, no case outcomes, slogan headings on the homepage, and identical boilerplate across service pages. |
| Structural Readability | 20% | 72 | 14.4 | One H1 per page, logical H2/H3, lists, `<details>` FAQs. Homepage H2s are slogans. No tables anywhere. |
| Multi-Modal Content | 15% | 30 | 4.5 | 0 images in blog posts, 0 video or iframes on the site, the portrait has `alt=""`, 0 tables. |
| Authority & Brand Signals | 20% | 35 | 7.0 | Strong on-site identity: name, address, IČO, bylines, 12+ years, logos, testimonials. Weak off-site corroboration: `sameAs` points only to itself, no profile links, no Wikipedia, the Cavaleers page is a placeholder, and both posts are 2 days old. |
| Technical Accessibility | 20% | 92 | 18.4 | Static server-rendered HTML, HTTP 200 for every AI user agent, permissive robots.txt. Minor issues: llms.txt charset, outdated tokens, Cloudflare setting not confirmed in the dashboard. |
| **Total** | | | **58** | |

### Platform-specific scores (estimates)

| Platform | Score | Notes |
|---|---|---|
| Google AI Overviews / AI Mode | 55 | Inclusion follows Googlebot indexing and normal ranking. Google-Extended does not affect AIO or AI Mode inclusion. The pages are crawlable server-rendered HTML with a clear Poprad location. Weak points: the pages are new (dateModified 2026-11-11), and a Google Business Profile could not be verified. GBP is the main local entity source for "… Poprad" queries in AI Mode. |
| ChatGPT (search) | 50 | OAI-SearchBot gets HTTP 200 and is explicitly allowed (robots.txt:34-35). Whether the site is indexed in Bing / Bing Webmaster Tools is unknown (docs/sledovanie-viditelnosti.md:22 TODO). Few extractable specifics. GPTBot status is about training only and says nothing about ChatGPT Search. |
| Perplexity | 45 | PerplexityBot gets 200 and is allowed (robots.txt:55-56). Perplexity favours fresh, specific, well-sourced passages and Reddit/YouTube corroboration, and the site has none of those external signals. |
| Bing Copilot | 45 | Depends on the Bingbot index (robots.txt:23-24 allows it). Indexing status is unverified, and IndexNow / Crawler Hints are not confirmed. |
| Claude (search) | 55 | Claude-SearchBot gets 200 and is allowed through `User-agent: *` (robots.txt:4-5), but is not listed explicitly. ClaudeBot is a training crawler only. |

## AI Crawler Access Status

Live test, 2026-11-13. Each user agent requested `/`, `/robots.txt`, `/llms.txt`, `/seo-llm-optimalizacia/` and `/blog/ako-sa-objavit-v-odpovediach-chatgpt/`:

```
Browser:          /=200/76721 /robots.txt=200/1092 /llms.txt=200/6366 /seo-llm-optimalizacia/=200/21291 /blog/ako-sa-objavit-v-odpovediach-chatgpt/=200/20219
GPTBot:           (identical: all 200, identical byte counts)
OAI-SearchBot:    (identical)
ChatGPT-User:     (identical)
ClaudeBot:        (identical)
Claude-SearchBot: (identical)
PerplexityBot:    (identical)
Google-Extended:  (identical)
Bingbot:          (identical)
Googlebot:        (identical)
CCBot:            (identical)
```
Headers: `server: cloudflare`, `cf-cache-status: HIT`, no `X-Robots-Tag`, no challenge page. Redirects: `https://gavalier.sk/` returns 301 to `https://www.gavalier.sk/`, and `http://www.gavalier.sk/` returns 301 to `https://www.gavalier.sk/`. The live robots.txt is identical to the repo, so Cloudflare's Managed robots.txt is not injecting rules.

| Crawler | Governs | robots.txt | HTTP | Status |
|---|---|---|---|---|
| OAI-SearchBot | ChatGPT Search | Allow (L34-35) | 200 | Allowed |
| ChatGPT-User | user-initiated ChatGPT fetches | Allow (L37-38) | 200 | Allowed |
| GPTBot | OpenAI training only | Allow (L40-41) | 200 | Allowed (training opt-in) |
| Claude-SearchBot | Claude search citations | via `*` (L4-5), not listed | 200 | Allowed |
| ClaudeBot | Anthropic training only | Allow (L49-50) | 200 | Allowed (training opt-in) |
| PerplexityBot | Perplexity search index | Allow (L55-56) | 200 | Allowed |
| Google-Extended | Gemini/Vertex training and grounding, training of models behind Search gen-AI features. Not AIO inclusion. | Allow (L43-44) | 200 | Allowed |
| Googlebot | Google Search, AI Overviews, AI Mode | Allow (L14-15) | 200 | Allowed |
| Bingbot | Bing, Copilot | Allow (L23-24) | 200 | Allowed |
| Applebot / Applebot-Extended | Siri/Spotlight / Apple Intelligence training only | Allow (L58-62) | n/t | Allowed |
| CCBot | Common Crawl (training corpora) | via `*` | 200 | Allowed |

Caveat: the curl tests spoof the user agent from a non-crawler IP. They prove there is no user-agent-based block. Cloudflare "Block AI bots" / AI Crawl Control rules act on verified-bot identity, which the tests cannot fully exercise (see finding T2).

## llms.txt status: present, well-formed

- `https://www.gavalier.sk/llms.txt` returns 200, `text/plain`, 6366 bytes, identical to the repo file `llms.txt`.
- Follows the llmstxt.org shape: H1 (L1), blockquote summary (L3), contact, address and IČO (L5-8), H2 sections with annotated links to all 4 service pages and both posts (L10-21), and a disclaimer that Google Search ignores it (L81).
- Gaps: no `charset` in Content-Type (T1), no "last updated" date, and no `## Optional` section. `/llms-full.txt` returns 404, which is fine.
- RSL 1.0: absent (`/license.xml` and `/.well-known/rsl.xml` return 404). This is optional. For a site that wants to be cited, an RSL licence adds nothing unless it wants to set paid or attribution terms for AI training.
- llms.txt is not used by Google Search and has no proven effect on any AI platform. Treat it as low-value hygiene, not a ranking lever.

## Brand mention analysis (observable)

| Source | Result | Evidence |
|---|---|---|
| Wikipedia (sk, en) | None | API `list=search srsearch="gavalier.sk"` gives totalhits 0. `list=exturlusage euquery=gavalier.sk` returns an empty list in both languages. |
| Reddit | Not verifiable | `reddit.com/search.json` returned an HTML app shell and `old.reddit.com` returned 302 to an unauthenticated client. |
| YouTube | Not verifiable / not linked | No YouTube channel or video is linked anywhere on the site (`grep -E '<video|<iframe|youtube'` finds nothing in any page). |
| LinkedIn / GitHub | Not linked | The only external links on index.html are cavaleers.com and client logos (index.html:512, 919-1072). `assets/icons/github.svg` exists in the repo but is never used. |
| Bing / DuckDuckGo | Not verifiable | Bing returned unrelated results for `"gavalier.sk"` and `site:gavalier.sk` (no `<cite>` for the domain). DDG returned 202 (bot challenge). |
| Common Crawl | Homepage only | CC-MAIN-2026-34 has `https://www.gavalier.sk/` and `/robots.txt` (2026-08-16). CC-MAIN-2026-39 and -43: "No Captures found". No subpage has been captured yet. |
| Wayback Machine | Domain history since 2014 | CDX: first capture 20140403 `http://gavalier.sk/`, latest 20260712. The domain is old, which is a positive trust signal. |
| Cavaleers (claimed group) | Does not corroborate | `cavaleers.com` title "Cavaleers — Budujeme značky odvážných". The body says "Náš web ešte nie je hotový" ("Our website isn't finished yet") and has no mention of Gavalier. |

Conclusion: the entity is well described on its own site and almost absent off-site. The strongest correlates of AI citation (YouTube, Reddit, Wikipedia) are all absent or unobservable.

---

## Findings

### F1. No external entity corroboration: `sameAs` points only to the site itself
- Severity: High
- Evidence: `index.html:137-139` has `"sameAs": [ "https://www.gavalier.sk/" ]`. No LinkedIn, GitHub, YouTube, Facebook or business-register URL appears anywhere in the HTML (external-link grep above). Wikipedia search returns 0. `docs/sledovanie-viditelnosti.md:43` tracks the name query "Marcel Gavalier", which depends on this corroboration.
- Impact: AI engines resolve "who is Marcel Gavalier / gavalier.sk" by matching the entity across independent sources. With no outbound identity links they have only the site's own claims, and a name collision is more likely.
- Fix: replace the self-reference with real profile URLs the owner controls or that list him: LinkedIn, GitHub, a YouTube channel (event and stream production), and the public trade-register entry for IČO 47 786 825 (for example the ŽRSR/RPO record). Show the same links visibly in the footer or the "A kto to robí?" section (index.html:1365). Effort: 30 min, after the owner supplies the URLs.

### F2. Prices and outcomes are not extractable: no figures or case results
- Severity: High
- Evidence: the same sentence "Zákazky beriem od pár desiatok eur po tisíce" ("I take jobs from a few dozen euros to thousands") appears 3 times on each service page: `automatizacia/index.html:150,274,288`, `tvorba-webu/index.html:134,275,281`, `ai-agenti/index.html:166,265,287`, `seo-llm-optimalizacia/index.html:174,275,301`, and on the homepage at `index.html:650`. The only quantified claim on the site is "12+ rokov" (index.html:1378). Testimonials are one-liners with no measurable result (index.html:1309-1357). `blog/ZOZNAM-TEM.md` correctly forbids invented numbers.
- Impact: questions such as "Koľko stojí web na mieru?", "Koľko stojí automatizácia?" or "Who builds websites in Poprad?" are answered from pages that state concrete ranges and results. A "from tens to thousands" range gives an AI engine nothing to quote.
- Fix: have the owner supply verified example prices per service (for example "úprava existujúceho webu: typicky X–Y €", "jednoduchá automatizácia: od Z €") and 2-3 anonymized mini case studies with real numbers (hours saved per month, delivery time). Put each in a self-contained 60-150-word block under a question H2. Effort: 2-3 h of writing once the owner has the data.

### F3. Homepage headings are slogans, and passages lack the entity name
- Severity: Medium
- Evidence: the H1 is "Ste tu správne." ("You're in the right place.", index.html:495). H2s include "Poradím zdarma." (532), "Ručím za to." (594), "Tri kroky." (690), "Detaily." (736), "Logá." (906), "Ako to dopadlo." (1307) and "Zavolajte." (1409). Body copy is first person ("Robím…", "Cenu poviem dopredu…") and rarely names "Marcel Gavalier" or "Poprad" inside the passage. The name and location appear together only in the "A kto to robí?" section (1378).
- Impact: the homepage is the page most likely to be retrieved for name and local queries, but its headings match no query, and an extracted passage such as "Cenu poviem dopredu…" ("I quote the price up front…") does not say who or where. Service subpages are better (question H2/H3s).
- Fix: keep the slogan styling and add descriptive wording to the heading text. Examples: "Koľko stojí práca Marcela Gavaliera? Cena dopredu." and "Ako prebieha spolupráca – tri kroky". Open key sections with one third-person sentence naming the person, place and service (for example "Marcel Gavalier z Popradu robí automatizácie, weby a AI agentov pre firmy na celom Slovensku."). Check this against `docs/2026-08-18-problem-first-copy-design.md` first. Effort: 1 h.

### F4. Positioning differs across the title, meta description, schema and hero
- Severity: Medium
- Evidence: `<title>` reads "Weby, IT siete, eventy a live prenosy" with no mention of AI (index.html:42). The meta description leads with "AI a automatizácie" (index.html:6). The Person description says "weby a aplikácie, IT siete, eventy a live prenosy" (index.html:96). The hero eyebrow reads "AI a automatizácie · Weby a aplikácie · IT a siete · Eventy" (index.html:502). `serviceType` (index.html:188-200) lists 12 types and omits automation and SEO/LLM. The Network section says "Sám to nerobím" ("I don't do it myself", index.html:812), while `knowsAbout` lists "MikroTik Network Configuration" (index.html:122).
- Impact: an AI summary of "what does gavalier.sk offer" can come out as an event-AV company or a network shop. The stated focus, IT and AI consulting and automation, is not the most consistent signal.
- Fix: pick one primary positioning line, for example "AI, automatizácie a weby pre firmy; k tomu siete a technika na eventy", and use it everywhere: the title, the meta description, the Person and ProfessionalService `description`, `serviceType` and the llms.txt blockquote. Add "Business Process Automation" and "SEO / LLM optimization" to `serviceType`. Mark networking as partner-delivered in the schema as well. Effort: 45 min (coordinate with the schema agent).

### F5. The flagship GEO article covers only OpenAI despite promising "iných AI asistentov"
- Severity: Medium
- Evidence: the H1 reads "Ako sa objaviť v odpovediach ChatGPT a iných AI asistentov" ("How to appear in ChatGPT and other AI assistants' answers", blog/ako-sa-objavit-v-odpovediach-chatgpt/index.html:202). The crawler sections (212-230) list only OAI-SearchBot, GPTBot and ChatGPT-User. Claude-SearchBot, PerplexityBot, Bingbot (Copilot) and Googlebot (AI Overviews) are not mentioned (grep for Claude, Bing, Copilot and Googlebot finds only the Search Console / Bing WMT lines 256 and 267). The article has no table.
- Impact: this is the topical-authority page for the SEO/LLM service. It is less complete than competing articles, and it misses the most extractable format, a crawler-to-product table. The site's own robots.txt has the same gap (it does not list Claude-SearchBot).
- Fix: add an H2 "Ktoré roboty používajú Claude, Perplexity, Copilot a Google" with a `<table>` of columns bot, product, purpose (search or training), and what blocking it does. Rows: OAI-SearchBot, GPTBot, ChatGPT-User, Claude-SearchBot, ClaudeBot, Claude-User, PerplexityBot, Perplexity-User, Bingbot, Googlebot, Google-Extended, Applebot-Extended. Link each vendor's documentation. Bump `dateModified`. Effort: 1-1.5 h.

### F6. Service pages are short, and about 40% of each is boilerplate shared by all four
- Severity: Medium
- Evidence: section word counts: about 530-580 words per service page. These blocks are identical on all four pages: "Ako to prebieha" (60 words, e.g. automatizacia/index.html:267-269), "Koľko to stojí" (42 words), "Chcete to prebrať?" (16 words) and the "Zavolajte." CTA (98 words). That leaves about 300 unique words per page.
- Impact: duplicate passages compete with each other for retrieval, and thin unique text gives few citable chunks per service.
- Fix: make "Ako to prebieha" and "Koľko to stojí" specific to each service (typical timeline, what the client provides, example deliverable). Add 1-2 sections answering real customer questions per service (for example on /automatizacia/, "Ktoré systémy na Slovensku viem prepojiť (fakturačné systémy, eshop, e-mail)"). Effort: 2-4 h.

### F7. No multi-modal assets: no images in posts, no video, empty portrait alt
- Severity: Medium
- Evidence: `grep -c '<img'` gives 0 for both blog posts. No `<video>`, `<iframe>` or YouTube link on any page. The portrait images at index.html:444 and 492 have `alt=""`. There are 0 `<table>` elements site-wide.
- Impact: YouTube presence is the strongest reported correlate of AI citation. This owner produces live streams and multi-cam video, and none of it is on the site. Multimodal answers in AI Mode and Perplexity draw on images and video.
- Fix: (a) create or link a YouTube channel with a short showreel and 1-2 explainer videos (for example "Čo je AI agent" in 2 minutes), embed them on the relevant pages and add VideoObject markup (schema agent). (b) Change the portrait alt to "Marcel Gavalier" at least once (index.html:492). (c) Add a diagram or screenshot to each blog post, for example a process map in the invoicing article. Effort: alt 5 min; images 1-2 h; video depends on production.

### F8. Fresh site, crawl and index presence not yet established
- Severity: Medium
- Evidence: all subpages have `lastmod` 2026-11-11 (sitemap.xml:13-52), 2 days before this audit. Common Crawl has only the homepage and robots.txt (CC-MAIN-2026-34). The Search Console and Bing WMT connection is an open TODO (docs/sledovanie-viditelnosti.md:22). Bing's `site:gavalier.sk` could not be confirmed.
- Impact: ChatGPT Search and Copilot depend heavily on the Bing index. Pages that Bing has not indexed cannot be cited, whatever robots.txt says.
- Fix: verify the site in Bing Webmaster Tools and submit the sitemap. Turn on Cloudflare Crawler Hints, which sends IndexNow pings to Bing on content changes. Request indexing of the 6 new URLs in Google Search Console. Record a baseline measurement in docs/sledovanie-viditelnosti.md. Effort: 30 min.

### F9. The Cavaleers membership claim links to a placeholder page
- Severity: Low
- Evidence: index.html:512 and 1382 link to `https://cavaleers.com/`. The live page says "Náš web ešte nie je hotový" ("Our website isn't finished yet") and has no mention of Gavalier. The claim also appears at llms.txt:73.
- Impact: the only external entity link on the site does not confirm the relationship it is cited for.
- Fix: ask Cavaleers to list Marcel (name plus a link to gavalier.sk) on their site, then add that URL to `memberOf` / `sameAs`. Until then this is a neutral signal. Effort: an external dependency.

### F10. Testimonials are attributed only to company names
- Severity: Low
- Evidence: index.html:1309-1357 has six quotes signed by company names only (e.g. "Skarper", "HB Reavis"). They have no person, role, date or link to the work.
- Impact: anonymous-looking quotes are weak authority evidence for both AI engines and people.
- Fix: with the clients' consent, add a person's name and role, and link to the delivered work where it is public. Effort: 1 h plus client approvals.

### F11. English tracking queries have no matching content
- Severity: Low
- Evidence: docs/sledovanie-viditelnosti.md:43-46 tracks English queries (#14-17, e.g. "Custom web development freelancer Slovakia"). All pages are `lang="sk"` with no hreflang or English page.
- Impact: those queries will show "no" every month for a structural reason rather than an optimization one.
- Fix: either drop the English queries from the tracking doc, or add a single English summary page (`/en/`) covering services, location, contact and pricing approach, with hreflang. Effort: 15 min for the first option, 2 h for the second.

### T1. llms.txt and robots.txt are served without `charset=utf-8`
- Severity: Low
- Evidence: `curl -sI https://www.gavalier.sk/llms.txt` returns `content-type: text/plain` with no charset, and the file contains Slovak diacritics ("Weby a aplikácie…"). HTML pages declare `<meta charset="UTF-8">` (line 4 of each page), so only the .txt files are affected.
- Impact: clients that default to ISO-8859-1 for `text/plain` may garble the diacritics, which corrupts names and terms in extracted text.
- Fix: Workers static assets support a `_headers` file in the asset root. Add one with `/llms.txt` set to `Content-Type: text/plain; charset=utf-8`, and the same for `/robots.txt`. Effort: 10 min.

### T2. Cloudflare AI-bot blocking is not confirmed in the dashboard
- Severity: Low (verify)
- Evidence: all AI user agents get 200 (table above), so no user-agent-based rule blocks them. Cloudflare's "Block AI bots" / AI Crawl Control rules match verified-bot identity (IP and signature), which spoofed curl requests cannot exercise. Since mid-2025 Cloudflare has prompted new zones to block AI crawlers by default.
- Fix: in the Cloudflare dashboard, check AI Crawl Control and Security > Bots. Confirm that "Block AI bots" is off and that OAI-SearchBot, Claude-SearchBot, PerplexityBot and Bingbot show "Allowed" with real request counts. Effort: 10 min.

### T3. robots.txt uses outdated tokens and misses current search agents
- Severity: Low
- Evidence: robots.txt:46-53 lists `anthropic-ai` and `Claude-Web`, which are outdated Anthropic tokens. `Googlebot-Mobile` (L20-21) is obsolete. Claude-SearchBot, Claude-User and Perplexity-User are not listed. They are allowed through `*` (L4-5), so nothing is blocked.
- Fix: replace the outdated entries with `Claude-SearchBot`, `Claude-User` and `Perplexity-User` (all `Allow: /`). This makes the file a clean reference example for the SEO/LLM service. Effort: 5 min.

### T4. `Crawl-delay` applies only to the Applebot-Extended group
- Severity: Info
- Evidence: robots.txt:64-65 puts `Crawl-delay: 1` after `User-agent: Applebot-Extended` (L61-62). Under RFC 9309 it belongs to that group only, although the comment implies it applies site-wide. Google ignores Crawl-delay.
- Fix: remove the line. A static site on Cloudflare does not need it. Effort: 1 min.

### I1. Training crawlers are allowed (deliberate choice, noted for clarity)
- Severity: Info
- Evidence: GPTBot (L40-41), ClaudeBot (L49-50), Google-Extended (L43-44), Applebot-Extended (L61-62) and CCBot (via `*`) are all allowed.
- Note: none of these affect search citation, except that Google-Extended also covers Gemini grounding. Allowing them helps future models "know" the brand, which is reasonable for a consultant. No change needed.

## What works
- Static server-rendered HTML. All content is in the raw response, and every AI user agent gets HTTP 200 with the same bytes as a browser.
- robots.txt explicitly allows OAI-SearchBot, PerplexityBot, Bingbot and Googlebot, and correctly comments that OAI-SearchBot controls ChatGPT Search (L33). Sitemap is declared.
- Canonical host is consistent (apex and http both 301 to `https://www.`), with no `X-Robots-Tag` and no challenge pages.
- llms.txt is present, well structured, current (links all 6 content URLs) and honest about Google not using it.
- Service pages and posts follow good citability patterns: lead paragraph answers first (e.g. blog/ako-sa-objavit-v-odpovediach-chatgpt/index.html:203), question-form FAQ H3s, cited primary sources (OpenAI bot docs L213, Google AI guide L242), visible author bylines and `<time>` dates (L205-206).
- Clear on-site identity: full name, Poprad street address, IČO/DIČ, phone, a "who does this" section with 12+ years of experience, and client logos with alt text.
- Domain history since 2014 (Wayback).
- An internal monthly visibility-tracking process exists (docs/sledovanie-viditelnosti.md).

## Top 5 highest-impact changes
1. F1: add real `sameAs` profiles (LinkedIn, GitHub, YouTube, trade register) and show them visibly. 30 min.
2. F2: publish verified example prices and 2-3 anonymized case results in self-contained blocks. 2-3 h.
3. F8: Bing Webmaster Tools, sitemap submission, Crawler Hints / IndexNow, and GSC indexing requests. 30 min.
4. F5: expand the ChatGPT article into a cross-platform crawler table (Claude, Perplexity, Copilot, Google). 1-1.5 h.
5. F4 + F3: unify the positioning line and add descriptive, name-bearing homepage headings and lead sentences. 1.5-2 h.

## Structured findings (for audit-data.json, category "AI Search Readiness")

```json
{
  "category": "AI Search Readiness",
  "score": 58,
  "dimensions": {"citability": 55, "structural_readability": 72, "multimodal": 30, "authority_brand": 35, "technical_accessibility": 92},
  "platform_scores": {"google_aio_ai_mode": 55, "chatgpt": 50, "perplexity": 45, "bing_copilot": 45, "claude": 55},
  "crawler_access": {"OAI-SearchBot": "allowed/200", "ChatGPT-User": "allowed/200", "GPTBot": "allowed/200", "Claude-SearchBot": "allowed-via-wildcard/200", "ClaudeBot": "allowed/200", "PerplexityBot": "allowed/200", "Google-Extended": "allowed/200", "Googlebot": "allowed/200", "Bingbot": "allowed/200", "CCBot": "allowed-via-wildcard/200"},
  "llms_txt": "present, well-formed; served without charset",
  "rsl": "absent (optional)",
  "findings": [
    {"id": "F1", "title": "sameAs self-only; no external entity corroboration", "severity": "high", "evidence": "index.html:137-139", "effort": "30m"},
    {"id": "F2", "title": "No extractable prices or case outcomes", "severity": "high", "evidence": "automatizacia/index.html:150,274,288; tvorba-webu/index.html:134,275,281; ai-agenti/index.html:166,265,287; seo-llm-optimalizacia/index.html:174,275,301; index.html:650", "effort": "2-3h"},
    {"id": "F3", "title": "Homepage slogan headings; passages lack entity name", "severity": "medium", "evidence": "index.html:495,532,594,690,736,906,1307,1409", "effort": "1h"},
    {"id": "F4", "title": "Inconsistent positioning across title/meta/schema/hero", "severity": "medium", "evidence": "index.html:6,42,96,122,188-200,502,812", "effort": "45m"},
    {"id": "F5", "title": "GEO article covers only OpenAI crawlers", "severity": "medium", "evidence": "blog/ako-sa-objavit-v-odpovediach-chatgpt/index.html:202,212-230", "effort": "1-1.5h"},
    {"id": "F6", "title": "Thin service pages with ~40% shared boilerplate", "severity": "medium", "evidence": "automatizacia|tvorba-webu|ai-agenti|seo-llm-optimalizacia index.html 'Ako to prebieha'/'Koľko to stojí'/CTA", "effort": "2-4h"},
    {"id": "F7", "title": "No images in posts, no video, empty portrait alt, no tables", "severity": "medium", "evidence": "index.html:444,492; blog posts img=0", "effort": "5m-2h+"},
    {"id": "F8", "title": "New pages not yet crawled/indexed; Bing WMT unverified", "severity": "medium", "evidence": "sitemap.xml lastmod 2026-11-11; Common Crawl homepage only; docs/sledovanie-viditelnosti.md:22", "effort": "30m"},
    {"id": "F9", "title": "Cavaleers link is a placeholder without mention", "severity": "low", "evidence": "index.html:512,1382; cavaleers.com body", "effort": "external"},
    {"id": "F10", "title": "Testimonials attributed only to companies", "severity": "low", "evidence": "index.html:1309-1357", "effort": "1h"},
    {"id": "F11", "title": "English tracking queries without English content", "severity": "low", "evidence": "docs/sledovanie-viditelnosti.md:43-46", "effort": "15m-2h"},
    {"id": "T1", "title": "llms.txt/robots.txt served without charset=utf-8", "severity": "low", "evidence": "curl -sI /llms.txt -> content-type: text/plain", "effort": "10m"},
    {"id": "T2", "title": "Cloudflare AI bot blocking not dashboard-verified", "severity": "low", "evidence": "UA tests all 200; verified-bot rules not testable", "effort": "10m"},
    {"id": "T3", "title": "Outdated robots tokens; Claude-SearchBot/Claude-User/Perplexity-User not listed", "severity": "low", "evidence": "robots.txt:20-21,46-53", "effort": "5m"},
    {"id": "T4", "title": "Crawl-delay scoped to Applebot-Extended group", "severity": "info", "evidence": "robots.txt:61-65", "effort": "1m"}
  ]
}
```

## Limitations of this audit
- Reddit, Bing and DuckDuckGo blocked or challenged unauthenticated automated queries, so mention checks there are "not verifiable", not "absent". YouTube and LinkedIn could not be searched without an API, and no personal-name searches were run, by instruction.
- Live AI answer visibility (ChatGPT, Perplexity, AIO) was not measured: no DataForSEO tools were available. Use the monthly protocol in docs/sledovanie-viditelnosti.md.
- The Cloudflare dashboard settings could not be inspected (T2).
