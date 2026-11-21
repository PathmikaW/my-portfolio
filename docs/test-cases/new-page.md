<!-- spec: docs/specs/new-page.md sha256:cbac82872192 -->

# Test cases: Pages

Source: [`docs/specs/new-page.md`](../specs/new-page.md). Format and levels: [README](README.md).

These are convention tests: they run over **every** page folder in `src/app/[locale]/` (except `_components`), so a new page is checked automatically. Keep the list of pages derived from the file system, not hard-coded.

## Structure

### PAGE-001 Every page has a server page and a client component
- **Spec:** new-page.md > Checklist 2-3
- **Level:** static · **Priority:** P1
- **Target:** each `src/app/[locale]/<page>/`
- **Then** `page.tsx` exists, and `_components/<Page>Client.tsx` exists (PascalCase of the folder name) and starts with `'use client'`.

### PAGE-002 Server pages await params
- **Spec:** new-page.md > Checklist 2
- **Level:** static · **Priority:** P2
- **Target:** each `page.tsx`
- **Then** the default export is `async` and its `params` type is `Promise<{ locale: string }>`.

### PAGE-003 Every page has metadata and a link-preview image
- **Spec:** new-page.md > Checklist 4; seo.md > How it works
- **Level:** static · **Priority:** P1
- **Target:** each page folder
- **Then** `layout.tsx` exists and calls `pageMetadata(`; `opengraph-image.tsx` exists and calls `ogCard(`. The `blog` folder is the only exception: its metadata is in `page.tsx` and it has no `opengraph-image.tsx`.

### PAGE-004 Content is not hard-coded in client components
- **Spec:** new-page.md > Checklist 1
- **Level:** static · **Priority:** P3
- **Target:** each `_components/*Client.tsx`
- **Then** the component receives its content through props or imports from `@/data/*` (or translations), and declares no top-level array literal of content objects (`const x = [{ title: ... }]`).
- **Notes:** Heuristic; allowed exceptions (e.g. `CATEGORY_ORDER`, icon maps) go in an allowlist in the test.

### PAGE-005 Each page renders for both locales
- **Spec:** new-page.md > Verify
- **Level:** e2e · **Priority:** P1
- **Target:** `/en/<page>` and `/si/<page>` for every page folder, plus `/en` and `/si`
- **Then** each returns 200, has an `<h1>`, and logs no React or hydration errors to the console.

## Translations

### PAGE-010 Both message files have the same keys
- **Spec:** new-page.md > Checklist 5; CLAUDE.md > UI strings
- **Level:** static · **Priority:** P1
- **Target:** `src/messages/en.json`, `src/messages/si.json`
- **Then** the flattened key sets are identical, and no value is an empty string.

### PAGE-011 Every page has nav and title strings
- **Spec:** new-page.md > Checklist 5
- **Level:** static · **Priority:** P1
- **Target:** both message files, for each page folder
- **Then** `nav.<page>` and `pageTitle.<page>` exist in both files.

### PAGE-012 Every translation key used in code exists
- **Spec:** new-page.md > Checklist 3, 5
- **Level:** static · **Priority:** P1
- **Target:** every `useTranslations('<ns>')` + `t('<key>')` pair in `src/**/*.tsx`
- **Then** `<ns>.<key>` exists in `en.json` (and, by PAGE-010, in `si.json`).
- **Notes:** Dynamic keys (`t(variable)`) are skipped.

## Navigation

### PAGE-020 Every page is in the nav menu
- **Spec:** new-page.md > Checklist 6
- **Level:** static · **Priority:** P1
- **Target:** `navItems` in `src/components/common/Header.tsx`
- **Then** for every page folder there is an item with `href` `` `/${locale}/<page>` `` and label `t('<page>')`, plus the home item `` `/${locale}` ``.

### PAGE-021 Nav links resolve
- **Spec:** new-page.md > Checklist 6
- **Level:** e2e · **Priority:** P2
- **Target:** header on `/en`
- **Then** every nav link returns 200, and the menu shows each label from `nav.*` at desktop and mobile widths.

## Remote images and styling

### PAGE-030 Remote image hosts are allowed
- **Spec:** new-page.md > Checklist 7
- **Level:** static · **Priority:** P1
- **Target:** every `https://` URL in `src/data/*.ts` used as an image (`cover`, `image`, `*Image`), and `images.remotePatterns` in `next.config.ts`
- **Then** every image host is matched by a `remotePatterns` entry.

### PAGE-031 Components use theme tokens, not hex colours
- **Spec:** new-page.md > Checklist 3; CLAUDE.md > Theme colors
- **Level:** static · **Priority:** P3
- **Target:** `src/app/**/_components/*.tsx`, `src/components/**/*.tsx`
- **Then** no file contains a hex colour (`#[0-9a-fA-F]{3,8}\b` in `className` or `style`). `src/lib/og-card.tsx` and `opengraph-image.tsx` files are exempt (image rendering cannot use CSS variables).

### PAGE-032 External links open safely in a new tab
- **Spec:** CLAUDE.md > External links (applies to every page)
- **Level:** static · **Priority:** P2
- **Target:** all `.tsx` under `src/`
- **Then** every JSX element with `href` starting `http` (or bound to an external URL field) has `target="_blank"` and `rel="noopener noreferrer"`, and every `target="_blank"` has that `rel`.

## Manual checks

### PAGE-090 Visual check in both themes and at phone width
- **Spec:** new-page.md > Verify
- **Level:** manual · **Priority:** P2
- **Then** `/en/<page>` and `/si/<page>` look right in light and dark mode at desktop and ~375px width, with reveal animations (`ScrollSection`/`ScrollItem`) working.

### PAGE-091 Sinhala strings reviewed
- **Spec:** new-page.md > Checklist 5
- **Level:** manual · **Priority:** P3
- **Then** the user was told new Sinhala strings are best-effort translations.

### PAGE-092 Nav crowding reported
- **Spec:** new-page.md > Checklist 6
- **Level:** manual · **Priority:** P3
- **Then** if a new item makes the desktop menu wrap beyond two lines, the user was told.
