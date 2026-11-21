<!-- spec: docs/specs/seo.md sha256:057d5e6853ef -->

# Test cases: SEO and link previews

Source: [`docs/specs/seo.md`](../specs/seo.md). Format and levels: [README](README.md).

Main targets: `src/lib/seo.ts`, `src/lib/og-card.tsx`, every `layout.tsx` and `opengraph-image.tsx` under `src/app/[locale]/`. Blog-specific preview cases are in [blog.md](blog.md) (BLOG-040 to BLOG-091).

## `pageMetadata()` (`src/lib/seo.ts`)

### SEO-001 Canonical URL and og:url include locale and path
- **Spec:** seo.md > How it works (`path`)
- **Level:** unit · **Priority:** P1
- **Target:** `pageMetadata`
- **Given** `{ locale: 'en', path: '/projects', ... }` **Then** `alternates.canonical` and `openGraph.url` are both `https://pathmikaw.vercel.app/en/projects`; with `locale: 'si'` they use `/si/projects`; with `path: ''` they are `https://pathmikaw.vercel.app/en`.

### SEO-002 ogTitle defaults to title
- **Spec:** seo.md > How it works (`ogTitle`)
- **Level:** unit · **Priority:** P1
- **Target:** `pageMetadata`
- **Then** without `ogTitle`, `openGraph.title` and `twitter.title` equal `title`; with `ogTitle`, both equal `ogTitle` while `title` stays the browser title.

### SEO-003 Description is used for every platform
- **Spec:** seo.md > How it works (`description`)
- **Level:** unit · **Priority:** P2
- **Target:** `pageMetadata`
- **Then** `description`, `openGraph.description` and `twitter.description` are the same string.

### SEO-004 Open Graph locale
- **Spec:** seo.md > How it works
- **Level:** unit · **Priority:** P2
- **Target:** `pageMetadata`
- **Then** `openGraph.locale` is `si_LK` for `si` and `en_US` for `en`.

### SEO-005 Card type and site name
- **Spec:** seo.md > intro
- **Level:** unit · **Priority:** P2
- **Target:** `pageMetadata`
- **Then** `twitter.card` is `summary_large_image`, `openGraph.type` is `website` and `openGraph.siteName` is `Pathmika Weerarathna`.

### SEO-006 Explicit image only when given
- **Spec:** seo.md > Exception (blog tabs)
- **Level:** unit · **Priority:** P2
- **Target:** `pageMetadata`
- **Then** without `image`, neither `openGraph.images` nor `twitter.images` is set (the segment's `opengraph-image.tsx` is used); with `image`, `openGraph.images` is `[{ url, alt, width: 1200, height: 630 }]` and `twitter.images` is `[image]`.

### SEO-007 Author is not repeated per page
- **Spec:** seo.md > `authors` / `creator`
- **Level:** unit · **Priority:** P3
- **Target:** `pageMetadata`, `[locale]/layout.tsx` `generateMetadata`
- **Then** `pageMetadata` output has no `authors` or `creator`; the root layout's metadata sets `authors: [{ name: 'Pathmika Weerarathna', url: SITE_URL }]` and `creator: 'Pathmika Weerarathna'`.

## Per-page metadata (every `layout.tsx`)

Run `generateMetadata({ params: Promise.resolve({ locale }) })` for every page folder (blog: `page.tsx`) and both locales.

### SEO-010 Title format
- **Spec:** seo.md > How it works (`title`)
- **Level:** unit · **Priority:** P2
- **Target:** every page's metadata
- **Then** `title` matches `^.+ \| Pathmika Weerarathna$`.

### SEO-011 Path matches the folder
- **Spec:** seo.md > How it works (`path`)
- **Level:** unit · **Priority:** P1
- **Target:** every page's metadata
- **Then** `alternates.canonical` is `https://pathmikaw.vercel.app/<locale>/<folder>`.

### SEO-012 Description length
- **Spec:** seo.md > How it works (`description`)
- **Level:** unit · **Priority:** P2
- **Target:** every page's metadata, the home page and both blog tabs
- **Then** `description` is non-empty and at most 200 characters.

### SEO-013 Descriptions are page-specific
- **Spec:** seo.md > How it works (`description`)
- **Level:** unit · **Priority:** P3
- **Target:** all page descriptions
- **Then** no two pages share a description, and no page uses the home `DESCRIPTION`.

### SEO-014 Home page metadata
- **Spec:** seo.md > How it works (home page)
- **Level:** unit · **Priority:** P1
- **Target:** `[locale]/layout.tsx` `generateMetadata`
- **Then** title, description, `openGraph` and `twitter` are set from `TITLE` / `DESCRIPTION`, and the description is at most 200 characters.

## Preview images (every `opengraph-image.tsx`)

Mock `@/lib/og-card` so `ogCard` records its input, then call each default export.

### SEO-020 Image exports
- **Spec:** seo.md > How it works (`opengraph-image.tsx`)
- **Level:** unit · **Priority:** P1
- **Target:** every `opengraph-image.tsx` (including `[locale]/opengraph-image.tsx`)
- **Then** each exports `size` equal to `{ width: 1200, height: 630 }`, `contentType` `image/png` and a non-empty `alt`.

### SEO-021 Card path matches the page
- **Spec:** seo.md > How it works (`ogCard`)
- **Level:** unit · **Priority:** P2
- **Target:** every page `opengraph-image.tsx`
- **Then** the `path` passed to `ogCard` is `/<folder>`.

### SEO-022 Card text fits
- **Spec:** seo.md > Rules for the image card
- **Level:** unit · **Priority:** P2
- **Target:** every `ogCard` input
- **Then** `title` is at most 22 characters; `highlight` and `footer` (when set) are at most 70 characters; `subtitle` is at most ~140 characters (two lines).

### SEO-023 Card text has no emoji or remote content
- **Spec:** seo.md > Rules for the image card
- **Level:** unit · **Priority:** P1
- **Target:** every `ogCard` input; source of `og-card.tsx` and every `opengraph-image.tsx`
- **Then** no input string contains an emoji; no source file contains an `<img` with an `http` `src` or a `fetch(` call.

### SEO-024 Cards read the page's data file
- **Spec:** seo.md > How it works (pull values from the data file)
- **Level:** unit · **Priority:** P3
- **Target:** every page `opengraph-image.tsx` that has a matching data file
- **Then** the file imports from `@/data/`, and changing the mocked data changes the `ogCard` input (see CONT-011, CONT-022, CONT-036, CONT-060).

### SEO-025 ogCard renders a 1200x630 PNG
- **Spec:** seo.md > How it works
- **Level:** unit · **Priority:** P1
- **Target:** `ogCard` (real, not mocked)
- **Given** a sample input **Then** it returns a `Response` with `content-type: image/png`; decoded, the image is 1200x630; the site line reads `pathmikaw.vercel.app<path>`.
- **Notes:** `next/og` needs an edge-like runtime; may be easier as an e2e test (SEO-031).

## End to end (built site)

### SEO-030 Meta tags are present on every page
- **Spec:** seo.md > Checking a page
- **Level:** e2e · **Priority:** P1
- **Target:** `/en`, `/si` and `/en/<page>`, `/si/<page>` for every page, after `npm run build && next start`
- **Then** each HTML contains `og:title`, `og:description`, `og:url`, `og:image`, `twitter:card`, `twitter:title`, a `<link rel="canonical">` and `<meta name="author">`.

### SEO-031 og:image URLs serve the card
- **Spec:** seo.md > Checking a page
- **Level:** e2e · **Priority:** P1
- **Target:** the `og:image` URL of every page (domain swapped for the local server)
- **Then** each returns 200, `content-type: image/png`, 1200x630.

### SEO-032 Build does not depend on the network for cards
- **Spec:** seo.md > Rules for the image card
- **Level:** e2e · **Priority:** P2
- **Target:** `npm run build` with outbound network blocked
- **Then** the build succeeds and every preview image is generated.

## Manual checks

### SEO-090 Preview looks right on the platforms
- **Spec:** seo.md > After deploying
- **Level:** manual · **Priority:** P2
- **Then** after deploy, the changed page's preview is checked in LinkedIn Post Inspector and on WhatsApp (with `?v=<n>` to bypass the cache); X is left to refresh on its own.

### SEO-091 Card is readable
- **Spec:** seo.md > Rules for the image card
- **Level:** manual · **Priority:** P3
- **Then** opening the generated image shows the title on one line and no text clipped or overflowing.
