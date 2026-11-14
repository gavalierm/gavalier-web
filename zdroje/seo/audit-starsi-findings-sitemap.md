# Sitemap audit: https://www.gavalier.sk (2026-11-13)

Method: curl -sI, git log, file reads, python3 minidom parse. Plugin scripts not run.

## Passed checks
- XML well-formed (minidom parse OK); live /sitemap.xml is byte-identical to repo file, 200, content-type application/xml.
- 8 URLs, no duplicates, all https://www.gavalier.sk, all 200 with no redirect (curl -sI).
- Trailing slashes match canonical tags on every page (index canonical "/" etc.).
- Coverage complete: all 8 deployed HTML pages listed. blog/_sablona/ is not listed, is in .assetsignore, returns 404 live, and has noindex.
- lastmod: all 2026-11-11, equals git log -1 date of each page file. Accurate (all identical because site was created/edited the same day; not boilerplate, acceptable).
- No priority/changefreq tags.
- robots.txt: Sitemap line https://www.gavalier.sk/sitemap.xml is correct (absolute, www, 200). Live robots.txt identical to repo. Everything allowed, no accidental Disallow.
- Image extension (gavo_edited.png) returns 200 and namespace is declared.

## Findings

### 1. Crawl-delay in robots.txt (Info)
Evidence: `Crawl-delay: 1` placed after the last group (Applebot-Extended), so it only applies to that group anyway. Google ignores it; Bing honors it only in its own group.
Fix: remove the line (optional).

### 2. Redundant per-bot Allow groups (Info)
Evidence: ~17 groups with `Allow: /` identical to `User-agent: *`. Harmless; the wildcard already allows all. Googlebot-Mobile and Slurp are obsolete. Note that a bot with its own group ignores the `*` group, so any future Disallow in `*` would not apply to them.
Fix: optionally collapse to `User-agent: *` plus Allow; keep only bots where rules differ.

### 3. Sitemap comment contains maintenance text and image title has a backslash (Info)
Evidence: `<image:title>... Audio \ Video ...</image:title>`. Valid XML, but Google deprecated image:title/caption support in sitemaps; the image tag is only a hint.
Fix: optional, remove image:image block or leave.

### 4. lastmod will drift without a process (Info)
Evidence: lastmod is maintained by hand (comment in file). Only blog/ index should be bumped when a post is added.
Fix: update lastmod only on real content change; consider a pre-deploy check comparing git dates.

### 5. llms.txt comment in robots.txt (Info)
The `# https://www.gavalier.sk/llms.txt` comment is only a comment; /llms.txt returns 200. No action.

## Quality gates
Location pages: none. No threshold concerns.

## Corrected sitemap.xml
No changes required. Optional cleanup is limited to removing the image block (finding 3) and the Crawl-delay line (finding 1).
