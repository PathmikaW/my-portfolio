<!-- spec: docs/specs/blog.md sha256:d116ce6b3e8e -->

# Test cases: Blog

Source: [`docs/specs/blog.md`](../specs/blog.md). Format and levels: [README](README.md).

Main targets: `src/data/blog.ts`, `src/lib/blog-preview.ts`, `src/app/[locale]/blog/page.tsx`, `src/app/[locale]/blog/_components/BlogClient.tsx`, `src/app/api/og/blog/[series]/route.tsx`.

## Data integrity (`src/data/blog.ts`)

### BLOG-001 Both required series exist
- **Spec:** blog.md > series table
- **Level:** data · **Priority:** P1
- **Target:** `blogSeries`
- **Given** `blogSeries` **Then** it contains a series with `id: 'garden-diary'` and one with `id: 'dev-journal'`, both `status: 'ongoing'`, and `dev-journal` has `numbered: false`.

### BLOG-002 Series ids are unique kebab-case
- **Spec:** blog.md > Start a new series
- **Level:** data · **Priority:** P1
- **Target:** `blogSeries[].id`
- **Then** every `id` matches `^[a-z0-9]+(-[a-z0-9]+)*$` and no two series share an `id`.

### BLOG-003 Series have the required intro fields
- **Spec:** blog.md > Start a new series
- **Level:** data · **Priority:** P2
- **Target:** `blogSeries[]`
- **Then** each series has a non-empty `name`, `tagline` and `description`, an `emoji` that is exactly one emoji, and a `posts` array.

### BLOG-004 Goal tiles follow the size rules
- **Spec:** blog.md > Start a new series (`goals`)
- **Level:** data · **Priority:** P3
- **Target:** `blogSeries[].goals`
- **Given** a series with `goals` **Then** it has 2-4 tiles; each `icon` is `'code' | 'study' | 'farm'`, `title` is 1-3 words and `text` is under 60 characters.

### BLOG-005 Post URLs are clean Medium URLs
- **Spec:** blog.md > Step 1
- **Level:** data · **Priority:** P1
- **Target:** every `posts[].url`
- **Then** each URL starts with `https://medium.com/@pathmikaweerarathna/`, has a non-empty slug, and contains no `?` or `#` (no `sharedUserId`, `source` etc.).

### BLOG-006 Post URLs are unique across all series
- **Spec:** blog.md > Fix or change a post (URLs are the React key)
- **Level:** data · **Priority:** P1
- **Target:** all posts in all series
- **Then** no URL appears twice, within a series or across series.

### BLOG-007 Entry and part are not duplicated within a series
- **Spec:** blog.md > Step 5 (Check)
- **Level:** data · **Priority:** P1
- **Target:** `posts[]` per series
- **Then** no two posts in the same series share the same `(entry, part ?? 0)` pair.

### BLOG-008 Multi-part entries are consistent
- **Spec:** blog.md > Steps 2 and 5
- **Level:** data · **Priority:** P1
- **Target:** posts with `part` or `totalParts`
- **Then** `part` and `totalParts` are both set or both absent; `1 <= part <= totalParts`; all posts with the same `entry` share the same `totalParts`; and no `entry` mixes a single-part post with multi-part posts.

### BLOG-009 Dates use YYYY-MM-DD
- **Spec:** blog.md > Step 2
- **Level:** data · **Priority:** P1
- **Target:** `posts[].date`
- **Given** a post with `date` **Then** it matches `^\d{4}-\d{2}-\d{2}$` and is a real calendar date (round-trips through `new Date(date + 'T00:00:00Z').toISOString()`).

### BLOG-010 Dates do not go backwards as entries go up
- **Spec:** blog.md > Step 2 (date from feed)
- **Level:** data · **Priority:** P3
- **Target:** dated posts per series, sorted by `(entry, part)`
- **Then** each dated post's `date` is on or after the previous dated post's `date`.
- **Notes:** Catches a wrong date pasted from the feed or a GMT/local-time mix-up.

### BLOG-011 Cover images come from Medium's CDN
- **Spec:** blog.md > Step 2 (`cover`); new-page.md > Remote images
- **Level:** data · **Priority:** P1
- **Target:** `posts[].cover`
- **Given** a post with `cover` **Then** it starts with `https://cdn-images-1.medium.com/` (the host allowed in `next.config.ts`).

### BLOG-012 Highlights count
- **Spec:** blog.md > Step 3
- **Level:** data · **Priority:** P2
- **Target:** `posts[].highlights`
- **Then** each post has 1-4 highlights, none empty.

### BLOG-013 Highlights are short and scannable
- **Spec:** blog.md > Step 3
- **Level:** data · **Priority:** P3
- **Target:** every highlight string
- **Then** each highlight is at most 70 characters, does not end with `.`, starts with an uppercase letter or digit, and contains no em dash (`—`) or en dash (`–`).
- **Notes:** As of this writing, 8 existing highlights are over 70 characters (longest 89). Either trim them or treat 70 as a warning and fail only above a hard limit (e.g. 90) when implementing.

### BLOG-014 Garden Diary tags
- **Spec:** blog.md > Step 4
- **Level:** data · **Priority:** P2
- **Target:** `garden-diary` posts' `tags`
- **Then** each post has 1-2 tags, each in Title Case, and none is `Garden Diary`, `Farming` or `Sri Lanka`.

### BLOG-015 Garden Diary tags reuse the known list
- **Spec:** blog.md > Step 4
- **Level:** data · **Priority:** P3
- **Target:** `garden-diary` posts' `tags`
- **Then** report (do not fail) any tag that is not in the list in Step 4, so new tags are a deliberate choice.

### BLOG-016 Dev Journal posts follow the article rules
- **Spec:** blog.md > Dev Journal articles
- **Level:** data · **Priority:** P2
- **Target:** `dev-journal` posts
- **Then** no post has `part` or `totalParts`; no title contains `Garden Diary`; each post has 2-4 tags; the `entry` values are exactly `1..N` with no gaps or repeats.

### BLOG-017 Garden Diary titles exclude the "Garden Diary #N" prefix
- **Spec:** blog.md > Step 2 (part after the colon is `title`)
- **Level:** data · **Priority:** P2
- **Target:** `garden-diary` posts' `title`
- **Then** no title starts with `Garden Diary`, contains `#<number>` or contains `(<n>/<n>)`.

### BLOG-018 No emoji outside the series `emoji` field
- **Spec:** blog.md > Step 3; CLAUDE.md > Writing style
- **Level:** data · **Priority:** P3
- **Target:** every string in `blogSeries` except `emoji`
- **Then** no string contains an emoji (`\p{Extended_Pictographic}`).

### BLOG-019 No em dashes in blog data
- **Spec:** CLAUDE.md > Writing style (applies to all blog fields)
- **Level:** data · **Priority:** P3
- **Target:** every string in `blogSeries`
- **Then** no string contains `—`.

### BLOG-020 Series-level text is timeless
- **Spec:** blog.md > Page UI and text
- **Level:** data · **Priority:** P3
- **Target:** each series' `tagline`, `description`, `goals`, `closing`; `PREVIEW_TEXT` in `blog-preview.ts`; `blog.*` strings in `en.json`
- **Then** none contains `career break` (case-insensitive). Individual posts are exempt.

### BLOG-021 Every ongoing series with posts has preview text
- **Spec:** blog.md > Start a new series (`PREVIEW_TEXT`)
- **Level:** data · **Priority:** P1
- **Target:** `blogSeries`, `previewText()`
- **Then** for every series with `status: 'ongoing'` and at least one post, `previewText(series)` returns an object with non-empty `ogTitle`, `subtitle` and `description`.

## Sorting and grouping

### BLOG-030 Newest post sorts first
- **Spec:** blog.md > Step 5 (page sorts by entry and part)
- **Level:** unit · **Priority:** P1
- **Target:** `byNewest` (BlogClient.tsx and blog-preview.ts)
- **Given** posts `#3`, `#5 (1/2)`, `#5 (2/2)`, `#4` in any order **When** sorted **Then** the order is `#5 (2/2)`, `#5 (1/2)`, `#4`, `#3`.

### BLOG-031 Order in the data file does not matter
- **Spec:** blog.md > Step 5
- **Level:** unit · **Priority:** P2
- **Target:** `byNewest`, `groupByEntry`, `previewCard`
- **Given** the same posts shuffled **Then** the sorted result, the grouped timeline and the preview card are identical.

### BLOG-032 Timeline groups parts under one entry, in reading order
- **Spec:** blog.md > Step 5
- **Level:** unit · **Priority:** P2
- **Target:** `groupByEntry`
- **Given** posts `#5 (2/2)`, `#4`, `#5 (1/2)` **Then** the result is `[{ number: 5, posts: [(1/2), (2/2)] }, { number: 4, posts: [#4] }]`.

### BLOG-033 Dates render as the GMT date in every time zone
- **Spec:** blog.md > Step 2 (take the GMT date as written)
- **Level:** unit · **Priority:** P2
- **Target:** `formatDate`
- **Given** `'2026-10-05'` **When** run with `TZ=Asia/Colombo` and `TZ=America/Los_Angeles` **Then** locale `en` gives `Oct 5, 2026` in both; locale `si` uses `si-LK` formatting of the same day.

## Link preview helpers (`src/lib/blog-preview.ts`)

### BLOG-040 resolveSeries picks the requested tab
- **Spec:** blog.md > Page UI and text (Link previews)
- **Level:** unit · **Priority:** P1
- **Target:** `resolveSeries`
- **Then** `resolveSeries('dev-journal').id === 'dev-journal'` and `resolveSeries('garden-diary').id === 'garden-diary'`.

### BLOG-041 resolveSeries falls back to the default tab
- **Spec:** blog.md > series table (Garden Diary is the default tab); Start a new series
- **Level:** unit · **Priority:** P1
- **Target:** `resolveSeries`
- **Then** `resolveSeries()`, `resolveSeries('')`, `resolveSeries('unknown')`, a `coming-soon` series id, an ongoing series without posts and an ongoing series without `PREVIEW_TEXT` all return `garden-diary`.
- **Notes:** The last three need a mocked `@/data/blog`.

### BLOG-042 isDefaultSeries
- **Spec:** blog.md > Start a new series (`DEFAULT_SERIES`)
- **Level:** unit · **Priority:** P3
- **Target:** `isDefaultSeries`
- **Then** true for `garden-diary`, false for `dev-journal`.

### BLOG-043 Preview card for a numbered series
- **Spec:** blog.md > intro (preview updates automatically); seo.md > image card
- **Level:** unit · **Priority:** P1
- **Target:** `previewCard`
- **Given** the Garden Diary series **Then** `title` is the series name, `path` is `/blog`, `highlight` is `Latest: #<latest entry> - <latest title>`, and `footer` is `<distinct entries> entries · <post count> posts · Pathmika Weerarathna`.

### BLOG-044 Preview card for an unnumbered series
- **Spec:** blog.md > Dev Journal articles
- **Level:** unit · **Priority:** P1
- **Target:** `previewCard`
- **Given** the Dev Journal series **Then** `highlight` is `Latest: <latest title>` (no `#`), and `footer` is `<n> articles · Pathmika Weerarathna`, or `1 article · ...` when there is exactly one post.

### BLOG-045 Preview card text fits the card
- **Spec:** seo.md > Rules for the image card
- **Level:** unit · **Priority:** P2
- **Target:** `previewCard` for every series in `previewSeriesIds()`
- **Then** `title` is at most 22 characters, `highlight` and `footer` at most ~70 characters (truncation is acceptable if implemented), and no field contains an emoji or `http`.

### BLOG-046 Preview image URL busts caches when a post is added
- **Spec:** blog.md > Step 9 (preview shows the new latest post)
- **Level:** unit · **Priority:** P2
- **Target:** `previewImageUrl`
- **Then** it returns `/api/og/blog/<series id>?v=<posts.length>`, and adding a post changes the `v` value.

### BLOG-047 Static preview images exist only for series with preview text and posts
- **Spec:** blog.md > Start a new series
- **Level:** unit · **Priority:** P2
- **Target:** `previewSeriesIds`
- **Then** with the real data it returns `['garden-diary', 'dev-journal']` (any order); with a mocked series that has no posts or no `PREVIEW_TEXT`, that series is left out.

## Page metadata (`blog/page.tsx`)

### BLOG-050 Default tab metadata
- **Spec:** blog.md > Page UI and text (Link previews); seo.md > Exception
- **Level:** unit · **Priority:** P1
- **Target:** `generateMetadata` in `blog/page.tsx`
- **Given** `locale: 'en'` and no `series` **Then** `title` is `Blog | Pathmika Weerarathna`, `alternates.canonical` and `openGraph.url` are `https://pathmikaw.vercel.app/en/blog`, `openGraph.title` is the Garden Diary `ogTitle`, and the image URL is `/api/og/blog/garden-diary?v=<n>`.

### BLOG-051 Dev Journal tab metadata
- **Spec:** blog.md > Page UI and text (Link previews)
- **Level:** unit · **Priority:** P1
- **Target:** `generateMetadata`
- **Given** `series: 'dev-journal'` **Then** canonical is `https://pathmikaw.vercel.app/en/blog?series=dev-journal`, `openGraph.title` and `description` come from the Dev Journal preview text, and the image URL is `/api/og/blog/dev-journal?v=<n>` with alt `Dev Journal by Pathmika Weerarathna`.

### BLOG-052 Unknown series falls back to Garden Diary metadata
- **Spec:** blog.md > series table
- **Level:** unit · **Priority:** P2
- **Target:** `generateMetadata`
- **Given** `series: 'nope'` **Then** the result equals the BLOG-050 result (canonical `/en/blog`, no `?series=`).

### BLOG-053 Sinhala locale metadata
- **Spec:** seo.md > How it works
- **Level:** unit · **Priority:** P2
- **Target:** `generateMetadata`
- **Given** `locale: 'si'` **Then** canonical starts with `https://pathmikaw.vercel.app/si/blog` and `openGraph.locale` is `si_LK`.

## Blog page UI (`BlogClient.tsx`)

### BLOG-060 One tab per ongoing series with posts
- **Spec:** blog.md > series table; Start a new series
- **Level:** component · **Priority:** P1
- **Target:** `BlogClient`
- **Given** `blogSeries` **Then** there is one tab per series with `status: 'ongoing'` and at least one post, named with its `emoji` and `name`; an ongoing series with no posts has no tab.

### BLOG-061 Coming-soon series show as a small card, not a tab
- **Spec:** blog.md > Start a new series
- **Level:** component · **Priority:** P2
- **Target:** `BlogClient`
- **Given** a mocked series with `status: 'coming-soon'` **Then** it renders as a card below the tabs and not as a tab.

### BLOG-062 Garden Diary is the default tab
- **Spec:** blog.md > series table
- **Level:** component · **Priority:** P1
- **Target:** `BlogClient`
- **Given** no `initialSeries` **Then** the Garden Diary tab is selected.

### BLOG-063 `?series=` opens that tab
- **Spec:** blog.md > series table (link to a specific tab)
- **Level:** component · **Priority:** P1
- **Target:** `BlogClient`
- **Given** `initialSeries: 'dev-journal'` **Then** the Dev Journal tab is selected; **Given** `initialSeries: 'unknown'` **Then** the default tab is selected.

### BLOG-064 Switching tabs keeps the URL shareable
- **Spec:** blog.md > series table
- **Level:** component · **Priority:** P2
- **Target:** `BlogClient` tab change handler
- **When** the user selects Dev Journal **Then** the URL gains `?series=dev-journal`; **When** they go back to Garden Diary **Then** the `series` param is removed. Other query params are kept.

### BLOG-065 Posts never mix between series
- **Spec:** blog.md > intro (posts never mix between series)
- **Level:** component · **Priority:** P1
- **Target:** `BlogClient`
- **Then** each tab panel shows only links whose URLs belong to that series' `posts`.

### BLOG-066 Latest card shows the newest post
- **Spec:** blog.md > Step 7 (new post is the "Latest" card)
- **Level:** component · **Priority:** P1
- **Target:** `BlogClient` latest card
- **Then** the card shows the first post by `byNewest`: its title, highlights, formatted date (when present), cover image (when present) and a link to its URL.

### BLOG-067 Latest label numbering depends on the series
- **Spec:** blog.md > series table (Numbering)
- **Level:** component · **Priority:** P2
- **Target:** `BlogClient` latest card label
- **Then** for Garden Diary the label includes `#<entry>` and `(<part>/<totalParts>)` when the post has parts; for Dev Journal it has no `#` number and no part.

### BLOG-068 Up next card
- **Spec:** blog.md > Step 6
- **Level:** component · **Priority:** P2
- **Target:** `BlogClient` up-next card
- **Then** for a numbered series the heading shows `#<latest entry + 1>`, an unnumbered series shows no number; the body is the series' `upNext` when set and the `blog.upNextDefault` message when not.

### BLOG-069 Timeline lists every post newest entry first
- **Spec:** blog.md > intro (timeline updates automatically)
- **Level:** component · **Priority:** P2
- **Target:** `BlogClient` timeline
- **Then** every post in the series appears once; entries run from highest to lowest; parts within an entry run (1/n) to (n/n).

### BLOG-070 Goal tiles and closing line render
- **Spec:** blog.md > Start a new series
- **Level:** component · **Priority:** P3
- **Target:** `BlogClient` intro card
- **Given** Garden Diary **Then** each goal renders with its title, text and the icon mapped in `GOAL_ICONS`, followed by the `closing` sentence; a series without `goals` renders no tiles.

### BLOG-071 Post links open Medium in a new tab
- **Spec:** blog.md > intro; CLAUDE.md > external links
- **Level:** component · **Priority:** P2
- **Target:** every `<a>` in `BlogClient` pointing to `medium.com`
- **Then** each has `target="_blank"` and `rel="noopener noreferrer"`.

### BLOG-072 Blog UI strings exist in both languages
- **Spec:** blog.md > Page UI and text
- **Level:** static · **Priority:** P1
- **Target:** `src/messages/en.json`, `src/messages/si.json`
- **Then** the `blog` namespace has the same set of keys in both files, and every `t('<key>')` used in `BlogClient.tsx` exists in it.

## Preview image route (`api/og/blog/[series]`)

### BLOG-080 Images are generated for each series at build time
- **Spec:** blog.md > Page UI and text (Link previews)
- **Level:** unit · **Priority:** P2
- **Target:** `generateStaticParams` in `route.tsx`
- **Then** it returns `[{ series: id }]` for every id in `previewSeriesIds()`.

### BLOG-081 Image route serves a PNG card
- **Spec:** blog.md > Page UI and text; seo.md > How it works
- **Level:** e2e · **Priority:** P1
- **Target:** `GET /api/og/blog/garden-diary` and `/api/og/blog/dev-journal`
- **Then** each returns 200 with `content-type: image/png` and a 1200x630 image.

### BLOG-082 Unknown series image is not served
- **Spec:** blog.md > Start a new series
- **Level:** e2e · **Priority:** P3
- **Target:** `GET /api/og/blog/unknown`
- **Then** the response is 404 (`dynamicParams = false`).

## End to end

### BLOG-090 Blog page renders both tabs
- **Spec:** blog.md > Step 7
- **Level:** e2e · **Priority:** P1
- **Target:** `/en/blog`, `/si/blog`
- **Then** both return 200, show the Garden Diary latest post title from `blog.ts`, and switching to Dev Journal shows its latest article.

### BLOG-091 Each tab has its own link preview
- **Spec:** blog.md > Page UI and text (Link previews)
- **Level:** e2e · **Priority:** P1
- **Target:** HTML of `/en/blog` and `/en/blog?series=dev-journal`
- **Then** `og:title`, `og:description`, `og:url` and `og:image` differ between the two and match BLOG-050 / BLOG-051; the `og:image` URL returns a PNG.

## Manual / process checks

Not automatable with Jest; check them when publishing.

### BLOG-100 Title, date and cover match the Medium RSS feed
- **Spec:** blog.md > Step 2
- **Level:** manual · **Priority:** P2
- **Then** for posts in the feed, `title`, `date` (GMT date of `pubDate`) and `cover` match exactly; posts not in the feed have the title derived from the slug and no `date`, and the user was told.

### BLOG-101 Highlights reflect the user's text without invented details
- **Spec:** blog.md > Step 3
- **Level:** manual · **Priority:** P2
- **Then** highlights come from the LinkedIn text (or only the title, and the user was told), keep the user's facts, and drop emoji, hashtags and the "Full post on Medium" line.

### BLOG-102 Series chosen correctly
- **Spec:** blog.md > series table
- **Level:** manual · **Priority:** P1
- **Then** "Garden Diary #N" titles went to `garden-diary`, software articles to `dev-journal`; the user was asked when unsure.

### BLOG-103 upNext cleared after publishing the teased entry
- **Spec:** blog.md > Step 6
- **Level:** manual · **Priority:** P3
- **Then** when the entry an `upNext` teaser described is published, `upNext` is removed.

### BLOG-104 Commit message and deploy rules
- **Spec:** blog.md > Step 8; Dev Journal articles
- **Level:** manual · **Priority:** P3
- **Then** the commit is `feat(blog): add Garden Diary #N ...` or `feat(blog): add Dev Journal article "<short title>"`, has no co-author lines, and nothing was pushed without asking.
