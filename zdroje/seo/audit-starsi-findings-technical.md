# Technical SEO audit: https://www.gavalier.sk (2026-11-13)

Method: curl against live site + repo read. Plugin scripts not run (runtime not set up). Live index.html is byte-identical to repo index.html (diff clean).

Scores: Technical SEO 78/100. Performance (code-based estimate, NOT lab data) 62/100.

## Findings

### 1. No security headers at all - Medium
Evidence: `curl -sI https://www.gavalier.sk/` returns only content-type, cache-control, cf-cache-status, server, nel, report-to, alt-svc. No Strict-Transport-Security, Content-Security-Policy, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, X-Frame-Options. No `_headers` file in repo (`ls _headers` fails).
Fix: add `_headers` in the repo root (supported by Workers static assets; do not list it in .assetsignore):
```
/*
  Strict-Transport-Security: max-age=31536000; includeSubDomains
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
  X-Frame-Options: DENY
  Content-Security-Policy: default-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; img-src 'self' data:; script-src 'self' 'unsafe-inline'; frame-ancestors 'none'
```
(CSP allows 'unsafe-inline' because pages use inline JSON-LD, inline script at index.html:51 and onload handler at index.html:76. Test before deploying.) Enable HSTS preload only after checking subdomains.

### 2. Caching is max-age=0, must-revalidate on every asset - Medium
Evidence: html, robots.txt, sitemap.xml, /css/base.css and the 1.3 MB /assets/gavo_edited.png all return `cache-control: public, max-age=0, must-revalidate` (ETag present, so repeat visits cost a 304 round trip per file; index.html pulls 15+ CSS files, 5 JS, ~66 imgs).
Fix: in `_headers` add long immutable caching for versioned/static paths:
```
/assets/*
  Cache-Control: public, max-age=31536000, immutable
/css/*
  Cache-Control: public, max-age=31536000, immutable
/js/*
  Cache-Control: public, max-age=31536000, immutable
```
Only safe for CSS/JS because they use `?v=` query strings; bump `?v=` on every change (note: assets are not versioned, so use max-age=2592000 for /assets/* unless filenames get hashed). Keep HTML at must-revalidate.

### 3. Hero/LCP image and header image are oversized PNGs - High (performance)
Evidence: `assets/gavo_edited.png` 1,340,165 bytes (1144x1086), index.html:492, `loading="eager" fetchpriority="high"` (good priority, but 1.3 MB is the likely LCP element). `assets/gavo_colored_eye.png` 285,271 bytes at index.html:444 and on every service page (e.g. ai-agenti/index.html:195) without `loading="lazy"`, inside a header that is hidden until scroll (js/site-header.js, threshold 300/500 px), so it downloads for nothing. Cloudflare serves PNG as-is (content-length 1340165 with Accept-Encoding: br). Also og:image on home uses the 1.3 MB file (index.html:20) while subpages use og_image.png 278 KB.
Fix: convert both to WebP/AVIF (expect 60-150 KB for hero), serve responsive `srcset` (e.g. 480/800/1144 w) via `<picture>`; add `loading="lazy" decoding="async"` to the eye image; point home og:image to og_image.png (1200x630). Unused 1.5 MB gavo_colored.png and 778 KB gavo_black.png ship in /assets (not referenced from pages checked) - remove or add to .assetsignore.

### 4. Homepage has 15 render-blocking stylesheets plus render-blocking Google Fonts - Medium (performance)
Evidence: index.html:56-73 (15 blocking `<link rel=stylesheet>`, ~76 KB CSS total across repo) and index.html:54-56 Google Fonts CSS (Manrope 6 weights, wght 300-800) is render-blocking and cross-origin (two extra connections, request chain: HTML -> fonts.googleapis CSS -> gstatic woff2). Only cursor.css is deferred (index.html:76). Service pages use 11 sheets. Blog uses a single blog.css (good) but loads Manrope + Source Serif 4 from Google.
Fix: concatenate CSS into one file per template (no build step needed: a simple `cat` script), or at minimum inline critical CSS; self-host Manrope as variable woff2 (`/fonts/`), `<link rel=preload as=font type=font/woff2 crossorigin>` for the 1-2 faces used above the fold, keep `font-display: swap` with `size-adjust` fallback to cut CLS. Reduce weights (300-800 is 6 weights; 3 is typical). Self-hosting also removes GDPR concern about Google Fonts transfer for EU visitors.

### 5. 307 temporary redirects for trailing slash and /index.html - Low
Evidence: `https://www.gavalier.sk/blog` -> 307 `/blog/`; `/ai-agenti` -> 307 `/ai-agenti/`; `/index.html` -> 307 `/`. Canonical, sitemap and all internal links use the slash form, so no internal chain. Google treats 307 like a temporary redirect but consolidates in practice; 301 would be cleaner.
Fix: Workers static assets html_handling "auto-trailing-slash" always emits 307; to emit 301 add a `_redirects` file with explicit rules (e.g. `/blog /blog/ 301`, `/index.html / 301`) for the 5 section URLs, or accept as-is (low impact).

### 6. http and apex redirect correctly, but apex -> www is one hop with 301 - Info (pass)
Evidence: `http://www.gavalier.sk/` -> 301 `https://www.gavalier.sk/`; `https://gavalier.sk/` -> 301 `https://www.gavalier.sk/`; `http://gavalier.sk/blog` -> 301 `https://www.gavalier.sk/blog` (then 307 to /blog/, so http apex non-slash URL takes 2 hops; acceptable).

### 7. 404 page returns correct status but empty body, no custom 404 - Low
Evidence: `curl https://www.gavalier.sk/neexistuje` -> HTTP/2 404, body length 0. wrangler.jsonc has no `not_found_handling`. Users get a blank page; no internal links to recover.
Fix: add `404.html` at repo root and set `"assets": {"not_found_handling": "404-page"}` in wrangler.jsonc; page needs `<meta name="robots" content="noindex">`, nav and links to services (must still return 404 status, which 404-page mode does).

### 8. Excluded files are really not exposed - Info (pass)
Evidence: /blog/_sablona/, /wrangler.jsonc, /.assetsignore all 404. Template has `noindex, nofollow` (blog/_sablona/index.html:10) as a second safeguard. Template contains placeholder links `/SLUZBA/` but is not deployed. Check /docs, /scratch, /local also excluded (in .assetsignore; not individually curled).

### 9. robots.txt: valid, but noisy - Low
Evidence: robots.txt allows everything, declares `Sitemap: https://www.gavalier.sk/sitemap.xml` (HTTP 200, application/xml, 8 URLs all with trailing slash, matches canonicals). `Crawl-delay: 1` (robots.txt line near end) is ignored by Google and unnecessary; the per-bot `Allow: /` groups are redundant with `User-agent: *`. Note Google-Extended, Applebot-Extended are control tokens, fine. `Googlebot-Mobile` is obsolete. The Crawl-delay line sits in the Applebot-Extended group, so it does not apply to other bots as the comment suggests.
Fix: remove Crawl-delay and obsolete groups, keep `User-agent: * / Allow: /` + Sitemap line. Optional.

### 10. Canonicals, robots meta, lang, viewport all correct - Info (pass)
Evidence: every indexable page has a self-referencing absolute https://www.gavalier.sk/.../ canonical, `<html lang="sk">`, viewport `width=device-width, initial-scale=1.0`, `index, follow` robots, one H1, unique title and description (grep of all 8 pages). Canonical matches the sitemap and the slash form. No hreflang (single-language site; correct, nothing needed). No duplicate URL variants indexable: `/index.html` and non-slash redirect; query strings (`/?utm=1`) return 200 with canonical pointing to the clean URL (correct).

### 11. Inconsistent asset paths on the homepage - Low
Evidence: index.html uses relative paths (`css/...`, `assets/favicon.svg:45`, `manifest.json:46`, `js/...:1482`), subpages use root-absolute `/css/...`. Works because home is served at `/`, but breaks if the home is ever served from another path (e.g. `/index.html` preview, or 404 page reuse) and the template differs. manifest.json icons use relative `assets/favicon.svg` (manifest.json), fine in practice. Manifest has only an SVG icon: no 192/512 PNG icons, so PWA install criteria/Chrome install prompt not met (the site advertises "manifest").
Fix: use root-absolute paths on index.html; add 192x192 and 512x512 PNG icons plus apple-touch-icon (none found in head).

### 12. Missing apple-touch-icon / favicon.ico - Low
Evidence: `/favicon.ico` -> 404. Only SVG icon declared. Some crawlers and Safari fetch `/favicon.ico` and `apple-touch-icon.png`; Google Search favicon accepts SVG, so low impact.
Fix: add 48x48 favicon.ico and 180x180 apple-touch-icon.png.

### 13. Cache-busting query strings inconsistent / future-dated - Low
Evidence: `?v=20260514` on nearly all files though files changed on later dates; blog.css uses `?v=20261116` (a date in the future relative to today 2026-11-13). With max-age=0 this has no harm today, but once long-term caching (finding 2) is enabled, stale `?v=` values would serve outdated CSS.
Fix: bump `?v=` per change (a deploy script step: `sed` with commit hash).

### 14. Mobile / viewport - Info (pass)
Evidence: viewport meta present on all pages; theme-color for light/dark; media-query responsive CSS (not exhaustively tested; no device rendering possible without Chromium). Not verified: touch target sizes, horizontal overflow.

### 15. Rendering: static HTML, no JS needed for content - Info (pass)
Evidence: content is in server HTML (index.html 76,721 bytes, brotli-encoded `content-encoding: br`). JS (5 small deferred scripts, index.html:1482-1486) only does theme, nav, header, back-to-top, accordion word-wrapping. Googlebot sees full text. TTFB from edge 0.07 s (cf-cache-status HIT).
Note: accordion-words.js wraps every word of `.article__text` in a `<span>` at load (js/accordion-words.js): on long accordion text this causes a large DOM mutation after load; layout shift risk is low if text is visually hidden until open, but it can create a long task (INP/TBT) on low-end phones. Fix: do the split only when a panel is opened (lazy), or wrap server-side.

### 16. CLS/INP code risks - Low
Evidence: hero and eye images have width/height (index.html:444, 492) - good. Client logos (index.html:920-1232, about 66 `<img>` on home, many duplicated for the marquee, `loading="lazy"` but without width/height) can shift layout when they load unless CSS fixes box size; clients-logos.css marquee is CSS-only (no JS, good) with a 40 s infinite animation (check it uses transform: yes keyframes in clients-logos.css:90). Fonts swap (`display=swap`) without a metric-matched fallback can shift text. Scroll listeners are passive and rAF-throttled (site-header.js:24); js/back-to-top.js:24 should be verified as passive. js/utils/cursor.js mousemove handlers only used for cursor.css (non-critical).
Fix: add `width`/`height` attributes or `aspect-ratio` CSS to client logos; duplicated marquee images (about 40 extra `<img>` nodes with empty alt) could be generated with CSS/JS clone to reduce DOM size and requests (SVG ones are small).

### 17. IndexNow not implemented - Low
Evidence: no key file (`/<key>.txt` -> 404 for a probe URL), none in repo root listing. Bing/Yandex/Naver would benefit from instant notification, optional for a 8-URL site.
Fix: generate key, place `/<key>.txt` in root, POST changed URLs to https://api.indexnow.org/indexnow from deploy-do-cloudflare.sh after `wrangler deploy`.

### 18. Internal linking - Info (pass)
Evidence: all nav/footer links use root-absolute trailing-slash URLs that resolve 200 (/blog/, /automatizacia/, /tvorba-webu/, /ai-agenti/, /seo-llm-optimalizacia/, both posts). No broken internal link found in the extracted href set apart from `/SLUZBA/` in the excluded template. Service pages cross-link to related posts (ai-agenti/index.html:296-299). Every page is within 1 click of the nav. No orphan pages (all 8 URLs in sitemap and linked). Blog index/posts have breadcrumb "Všetky články" link.

### 19. Other low-value meta - Info
`meta name="keywords"` (index.html:7), `geo.*`/ICBM tags, `googlebot` duplicate of robots: no search value, harmless; keywords tag is a long list (spam signal for no benefit). Consider removing.

## What works
HTTPS everywhere with single-hop redirects, www canonical host, self-referencing canonicals, correct 404 status, brotli compression, HTTP/2 + HTTP/3 (alt-svc h3), clean slug URLs, sitemap/robots valid, deferred JS, lang=sk, template excluded and noindexed, static HTML (no CSR), edge-cached HTML (HIT, TTFB ~70 ms).

## Prioritised list
High: 3 (images). Medium: 1 (security headers), 2 (caching), 4 (render-blocking CSS/fonts). Low: 5, 7, 9, 11, 12, 13, 16, 17. Info/pass: 6, 8, 10, 14, 15, 18, 19.

## Score rationale
Technical 78: crawl/index/canonical/redirect fundamentals are all clean (strong), deductions for no security headers (-8), no cache policy (-5), no custom 404 (-2), 307 instead of 301 (-1), minor icon/manifest/IndexNow/robots gaps (-6).
Performance 62 (estimate from code, not measured): TTFB excellent, but 1.3 MB PNG hero as likely LCP + 285 KB hidden header image, 15 blocking CSS + blocking Google Fonts on home, no long-term caching; on mobile 4G LCP probably 2.5-4 s on cold load (needs-improvement). CLS likely good (<0.1), INP likely good (light JS).

## Failures / not checked
- Plugin sitemap_discovery.py and render_page.py not run (runtime not set up, per instruction); sitemap checked via curl only.
- No real rendering, CWV lab or CrUX data; Performance score is a code estimate.
- Touch targets, overflow at narrow widths and font actually used above the fold not verified.
- Internal links extracted by regex, not crawled for status individually beyond sampled URLs.
- /docs, /scratch, /local exposure not curled individually.
