# Schema / Structured Data and Open Graph audit: https://www.gavalier.sk

Method: JSON-LD extracted from the local source files and parsed with python -I json (no plugin scripts). Live homepage checked with curl: it serves one ld+json block and the three image assets return 200 with correct content types. No Microdata or RDFa anywhere (grep for itemscope/itemtype/property= beyond og: returned nothing).

**Score: 80 / 100** (all 9 blocks parse; clean @graph and @id linking; no deprecated types; deductions for sameAs, invalid property, OG image/author details, minor consistency).

## Detection

| Page | JSON-LD (line) | Types |
|---|---|---|
| index.html | 82 | Person, ProfessionalService (+7 Offer/Service), WebSite, WebPage, BreadcrumbList (1 item), FAQPage, ItemList |
| ai-agenti, automatizacia, tvorba-webu, seo-llm-optimalizacia /index.html | 57 each | WebPage, Service, BreadcrumbList, FAQPage |
| blog/index.html | 48 | Blog (2 BlogPosting), BreadcrumbList |
| blog/ako-sa-objavit-v-odpovediach-chatgpt/index.html | 51 | BlogPosting, BreadcrumbList, FAQPage |
| blog/ako-automatizovat-fakturaciu-a-emaily/index.html | 51 | BlogPosting, BreadcrumbList, FAQPage |
| blog/_sablona/index.html (template) | 52 | BlogPosting, BreadcrumbList, FAQPage (placeholders SLUG/RRRR-MM-DD, as intended) |

All use @context https://schema.org, absolute www URLs, ISO 8601 dates, no placeholder text in deployed pages. Every canonical, og:url and twitter:url matches the schema url.

## Findings (by severity)

### 1. [Medium] Person.sameAs contains only the site itself
Evidence: index.html:137-139 `"sameAs": ["https://www.gavalier.sk/"]`. No external profile (LinkedIn, GitHub, YouTube, Google Business Profile, ORSR/register) is linked from Person or ProfessionalService (no sameAs on the latter at all). A self-URL adds no entity disambiguation; this is the main entity-consolidation gap for AI and Knowledge Graph.
Fix: replace with real profile URLs the owner controls (do not invent any), and add the same list to the ProfessionalService node.
```json
"sameAs": [
  "https://www.linkedin.com/in/REAL-HANDLE/",
  "https://github.com/REAL-HANDLE"
]
```
(Replace with actual URLs; remove the property if none exist rather than keeping the self-reference.)

### 2. [Medium] Invalid property `founderOf` on ProfessionalService
Evidence: index.html:169 `"founderOf": { "@id": ".../#service" }` points the organization at itself. `founderOf` belongs to Person (and the target would be an Organization), so on an Organization it is an unknown property and self-referential. `founder` (line ~168) already expresses the relation correctly.
Fix: delete line 169; optionally add `"founderOf": {"@id": "https://www.gavalier.sk/#service"}` to the Person node instead.

### 3. [Medium] Homepage OG/Twitter image is near-square and heavy
Evidence: index.html:20-22,33 use assets/gavo_edited.png (1144x1086, 1.34 MB) with `twitter:card=summary_large_image` (index.html:29). Large-image cards expect about 1.91:1, so the photo is cropped; 1.3 MB is slow for scrapers. Other pages use og_image.png (1212x716, 278 KB), which is fine.
Fix: create a 1200x630 share image (about 1.91:1, under 300 KB) for the homepage and use it in og:image/twitter:image; keep gavo_edited.png as the schema `image`.

### 4. [Low] `article:author` is a plain name, not a profile URL
Evidence: blog/_sablona/index.html:27 and both posts line 26 `content="Marcel Gavalier"`. The Open Graph spec expects a profile URL.
Fix: `<meta property="article:author" content="https://www.gavalier.sk/">` (fix in the template first so new posts inherit it).

### 5. [Low] Invalid/inconsistent areaServed
Evidence: index.html areaServed lists `{"@type":"Country","name":"European Union"}` (EU is not a Country; use AdministrativeArea or Place). Homepage uses English names ("Slovakia", "Czech Republic") while the four service pages use "Slovensko" (e.g. ai-agenti/index.html areaServed).
Fix: pick one language, and use e.g. `{"@type":"AdministrativeArea","name":"European Union"}`. Prefer ISO form `{"@type":"Country","name":"SK"}`.

### 6. [Low] Literal backslash in service names
Evidence: index.html:269-270 and :415 `"Audio \\ Video & Stage"` serialises as `Audio \ Video & Stage` (a backslash character). If this mirrors the visible brand label it is consistent; if not, machine consumers see a stray backslash.
Fix: confirm intent; otherwise use "Audio / Video & Stage".

### 7. [Low] Cross-page references are unresolved on service and blog pages
Evidence: service pages reference `#website` (not defined on that page, e.g. ai-agenti/index.html WebPage isPartOf), and blog posts reference `#person` as publisher with only a partial inline author node (name, url). Google does not merge @id across URLs, so these page graphs are thin on their own. Not an error; works for the entity graph on the homepage.
Fix (optional): in the blog template make author a full node (name, url, sameAs, jobTitle) and set `publisher` to a ProfessionalService node `{"@type":"ProfessionalService","@id":"https://www.gavalier.sk/#service","name":"Marcel Gavalier","url":"https://www.gavalier.sk/","logo":"https://www.gavalier.sk/assets/logo.min.svg"}` (keeps logo available for Article publisher guidance).

### 8. [Low] Blog index entries and image/alt details
- blog/index.html:48 blogPost items lack @id, author, image; Blog lacks publisher. Add `"@id": ".../#article"` (matching each post's @id) and `"author": {"@id": "https://www.gavalier.sk/#person"}`.
- All posts share og_image.png as image; OK, but Google prefers several aspect ratios (16:9, 4:3, 1:1) for Article image; add when per-post images exist.
- og:image:alt is "Marcel Gavalier" on every page, not descriptive (index.html:24, templates). Use a description of the image.
- blog/ako-automatizovat-fakturaciu-a-emaily/index.html:15 og:title ends "| Gavalier" while other pages use "| Marcel Gavalier" (also twitter:title line 31).

### 9. [Info] Existing FAQPage (no SERP benefit since 2026-05-07)
Evidence: index.html:330, the four service pages (line ~57 block), both posts (line 110), template blog/_sablona/index.html:111. Google FAQ rich results are retired for all sites; no action needed for search. Any AI/GEO benefit is unconfirmed. Keep only if the visible page text contains the same Q&A (schema must match visible content; verify on edit). Not recommending removal or additions for SERP purposes.

### 10. [Info] Single-item BreadcrumbList on homepage
Evidence: index.html (BreadcrumbList with 1 ListItem). Harmless; no rich result for a root-only trail.

### 11. [Info] Template pattern is sound
blog/_sablona/index.html:52 produces valid BlogPosting + BreadcrumbList: correct @id pattern (`/blog/SLUG/#article`), mainEntityOfPage, author @id `#person`, isPartOf Blog `#blog`, ISO dates, absolute URLs, and the HTML comment at line 185 reminds to keep dateModified honest. Replace placeholders: SLUG appears in 6+ places (canonical, og:url, twitter:url, @id, url, mainEntityOfPage, breadcrumb) and RRRR-MM-DD in meta and JSON-LD and `<time>`. Suggest a pre-deploy grep for `SLUG|RRRR|NADPIS` to prevent shipping placeholders. Both existing posts have datePublished = dateModified = 2026-11-11, consistent with visible `<time datetime>` (line 206) and sitemap lastmod.

## Entity consistency (what works)
- Person `#person` <-> ProfessionalService `#service` linked both ways (worksFor, founder, employee); WebSite publisher = Person; WebPage about = Person.
- Service @ids on the homepage OfferCatalog (`/automatizacia/#service` etc.) exactly match the @ids on each service page, and all providers point to `#service`.
- Name, phone (+421915697915), email, address (Jarmočná 30, 058 01 Poprad) identical across Person, ProfessionalService and the Service page providers; IČO as PropertyValue, taxID present.
- Image URLs resolve on live site (og_image.png, gavo_edited.png, logo.min.svg: HTTP 200). All URLs use the www host and https.
- OG/Twitter set complete on all pages (type, url, title, description, image with width/height/type/alt, locale sk_SK, site_name, twitter card). Articles carry published/modified time.

## Missing opportunities (ready to paste)

### A. Person.jobTitle and ProfilePage typing (homepage; low effort)
Add to Person node (index.html ~line 93):
```json
"jobTitle": "AI a IT konzultant"
```

### B. Service offers on service pages (optional, no rich result, helps machine readability)
Add to each Service node only if real prices are published; the site says "cena dopredu", so no price data exists. Do not add placeholder prices.

### C. ProfessionalService LocalBusiness details (optional, if true)
```json
"openingHoursSpecification": [{
  "@type": "OpeningHoursSpecification",
  "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
  "opens": "09:00",
  "closes": "17:00"
}]
```
Use real hours only; skip if the business is appointment-only.

### D. Not recommended
HowTo (retired), SpecialAnnouncement (deprecated), new FAQPage for SERP benefit, SearchAction (no site search), AggregateRating/Review (no on-page visible reviews found; do not add without them).

Failures: none
