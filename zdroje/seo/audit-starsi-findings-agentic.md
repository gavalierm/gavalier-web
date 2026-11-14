# Agent-readiness audit: https://www.gavalier.sk (2026-11-13)

Method: curl + source reading only. Plugin scripts not run (no runtime, no Chromium), as instructed.

## Score: 76 / 100 (code-based heuristic, not the Agent-UX script, status: partial)

## Lighthouse Agentic Browsing
Not computed: no browser/PSI. The X/N fraction is unavailable; N is not assumed. Code-based estimate: the static HTML is server-rendered, has lang="sk", labelled buttons, named navs, tel:/mailto: links and JSON-LD. No WebMCP is present, so no WebMCP audit would count. Likely passes most counted audits that depend on markup; confirm with PSI (mobile and desktop) when available.

## Access policy (robots.txt, 200 text/plain)
- Training (GPTBot, Google-Extended, anthropic-ai, ClaudeBot, Applebot-Extended): allowed (explicit Allow: /).
- Search (OAI-SearchBot, PerplexityBot, Googlebot, Bingbot, Applebot): allowed.
- User-triggered (ChatGPT-User, Claude-Web): allowed. Claude-User and Perplexity-User are not named; they fall under `User-agent: *` Allow, which is fine.
- No Content-Signal line (draft proposal; vendor-matrix check date applies, not re-verified here).

## WAF / agent traffic (GET / with User-Agent)
Mozilla/5.0, GPTBot/1.1, ChatGPT-User/1.0, OAI-SearchBot/1.0, ClaudeBot/1.0, Claude-User/1.0, PerplexityBot/1.0, Google-Extended, CCBot/2.0, curl/8: all HTTP 200. No bot challenge or block seen. This only shows the response to UA strings from one IP; verified bots from real IP ranges were not tested.

## Findings

### 1. [Low/P2] Main nav is `hidden` until the burger is clicked
Evidence: index.html:448 `<nav ... id="siteNav" hidden>`; burger at :436 has aria-label and aria-expanded (good). A no-JS or snapshot-based agent does not see the nav in the accessibility tree; it must click first. Page links are still reachable in the footer navs (:1427, :1436) and in llms.txt.
Fix: keep as is, or make the footer service links the canonical discovery path (already true). Optional.

### 2. [Low/P3] No `<footer>` landmark, no skip link
Evidence: contact block is `<section id="contact" class="section footer">` (index.html:1405), outside `<main>`; no `contentinfo` role. No skip-link markup found.
Fix: change the wrapper to `<footer id="contact">` (class kept) and add one `<a class="skip" href="#main">` before the header with `id="main"` on `<main>`.

### 3. [Info] Brand link `href="#top"` is valid
Evidence: target exists at index.html:432 `<body id="top">`. No action. On sub-pages the link was not checked.

### 4. [Low/P3] Duplicated decorative logo rows are aria-hidden (fine) but add DOM weight
Evidence: clients-logos duplicates (index.html:974-1112) with aria-hidden and empty alt. Correct for a11y tree; no action beyond noting 76 KB HTML.

### 5. [Low/P3] Icon-only theme toggle has label only in Slovak and no state
Evidence: index.html:467 `aria-label="Prepnúť tému"`, no aria-pressed. Minor.
Fix: add aria-pressed toggled in js/theme-switcher.js.

### 6. [Opportunity] Markdown delivery absent
Evidence: `Accept: text/markdown` on / returns content-type text/html; /index.md is 404. Not a defect. llms.txt (200, 6366 bytes, matches repo file) covers summary and key URLs. A Cloudflare Worker would be needed for negotiation; disproportionate for this site.

### 7. [Opportunity] No /.well-known discovery, ai-catalog.json, WebMCP
Evidence: /ai-catalog.json, /.well-known/ai-catalog.json, mcp.json, api-catalog, http-message-signatures-directory, security.txt: all 404. No `modelContext`/`registerTool`/`toolname` in index.html or js/. All are drafts or proposals (check dates per vendor-matrix.md); no inbound API or forms exist, so WebMCP has little to expose (Low, skip). Only cheap, sensible item: /.well-known/security.txt (RFC 9116) if wanted.

### 8. [Info] robots.txt hygiene
Evidence: `Crawl-delay: 1` is ignored by Google and many bots; harmless. Comments in file fine. Sitemap declared and returns 200. No Link headers from robots.txt.
Fix: optional, remove Crawl-delay.

## What works
- Static server-rendered HTML; content present without JS; `<html lang="sk">`.
- Landmarks: header, nav (aria-label "Hlavné menu"), main, two labelled footer navs; single h1, h2 per section; native `<details>/<summary>` accordions.
- Contact actions are plain links: tel:+421915697915 and mailto:marcel@gavalier.sk (index.html:462, 520, ~1412); no forms to mislabel.
- Meaningful alt on client logos, decorative images hidden; JSON-LD Person graph at :82.
- llms.txt present and in sync with repo; sitemap.xml 200; robots allows all agents; no WAF friction.

## Standards notes
WebMCP, Content-Signal, ai-catalog.json, Web Bot Auth are drafts/proposals; not re-dated here (see vendor-matrix.md). llms.txt is a community convention, not a ratified standard.
