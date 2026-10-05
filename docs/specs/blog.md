# Spec: Publishing blog posts

The Blog page (`/[locale]/blog`) lists posts that live on Medium. The site stores only metadata; clicking a card opens the post on Medium in a new tab.

Everything is driven by one file: **`my-portfolio/src/data/blog.ts`**. Adding a post means adding one object to it. The page, the "Latest" card, the timeline, the counts and the link-preview image all update automatically on the next deploy.

## What the user usually provides

- One or more Medium URLs (sometimes with `?sharedUserId=...` on the end).
- Optionally the short LinkedIn text they wrote for the post, e.g.:

  ```
  🌱 Garden Diary #9 (1/2)
  <one or two sentences>
  Full post on Medium 👇
  #GardenDiary #Farming #SriLanka
  ```

## Steps

### 1. Clean the URL

Strip the query string (`?sharedUserId=...`, `?source=...`). Keep `https://medium.com/@pathmikaweerarathna/<slug>-<id>`.

### 2. Get the exact title, date and cover image from the RSS feed

```bash
curl -sL https://medium.com/feed/@pathmikaweerarathna
```

For each `<item>`, read:

- `<title>`, e.g. `Garden Diary #9 (1/2): Some Title`. The part after the colon is `title`; `#9` is `entry`; `(1/2)` is `part` / `totalParts`.
- `<pubDate>` -> `date` as `YYYY-MM-DD`, taking the GMT date as written (`Mon, 05 Oct 2026 18:52:17 GMT` -> `2026-10-05`). Existing entries follow this rule; don't convert to Sri Lanka time.
- The first `https://cdn-images-1.medium.com/max/1024/...` image in the content -> `cover` (optional).

Notes:
- The feed only holds the **10 newest posts**. For older ones, derive the title from the URL slug and leave out `date`.
- Medium article pages are behind Cloudflare and can't be fetched; don't try. Use the feed only.
- If the post isn't in the feed yet (just published), derive the title from the slug, use today's date, and say so.

### 3. Write the `highlights`

Cards show these as bullet points, so each one should be a short, scannable fact.

- If the user gave LinkedIn text: split its middle sentence(s) into 2-4 bullets, one event or idea each. Drop the `🌱 Garden Diary #N` header, emoji, hashtags and the "Full post on Medium 👇" line. Keep their voice and facts (numbers, places, people).
  - Example: "A cat knocked over a seed tray, we built a sun shade for the nursery, and the excavator finally confirmed its arrival." -> `['A cat knocked over a seed tray', 'Built a sun shade for the nursery', 'The excavator finally confirmed its arrival']`
- If not: write 1-2 bullets from the title only. **Don't invent details** that aren't in the title or the user's text. Tell the user the bullets were written from the title, so they can check them.
- Each bullet under ~70 characters, no trailing period, sentence case, plain hyphens (no em dashes).

### 4. Pick `tags`

1-2 short Title Case topics. Reuse existing tags where they fit, so the archive stays consistent:
`Soil Health`, `Seeds`, `Seed Starting`, `Nursery`, `Land Preparation`, `Irrigation`, `Plant Health`, `Farm Visits`, `Planning`, `Market Research`, `Organic Farming`, `DIY`, `Family`, `Career Break`, `Learning in Public`.
Never use `Garden Diary`, `Farming` or `Sri Lanka` (they apply to every post). Medium's own categories in the feed (`<category>`) are a useful hint.

### 5. Add the object to `posts`

Append to the right series in `blogSeries` (order doesn't matter, the page sorts by entry and part):

```ts
{
  entry: 9,
  part: 1,            // omit part + totalParts for a single-part entry
  totalParts: 2,
  title: 'Title Exactly As On Medium',
  highlights: ['First thing that happened', 'Second thing', 'What comes next'],
  url: 'https://medium.com/@pathmikaweerarathna/garden-diary-9-1-2-...-abc123',
  date: '2026-10-08',
  tags: ['Nursery'],
  cover: 'https://cdn-images-1.medium.com/max/1024/1*....jpeg', // optional
},
```

Check: `entry`/`part` don't duplicate an existing post; for a multi-part entry, all parts share the same `totalParts`.

### 6. Optional: "Up next" teaser

The series' `upNext` field sets the text on the "Up next · #N" card. Set it only when the user says what's coming. When it's unset, a generic "new entries go up every few days" message shows. Clear it once that entry is published.

### 7. Verify

From `my-portfolio/`:

```bash
npx tsc --noEmit && npm run lint && npm run build
```

Optionally run `npm run dev` and open http://localhost:3000/en/blog: the new post should be the "Latest" card and the top of the timeline.

### 8. Commit (only when asked)

```
feat(blog): add Garden Diary #9 (1/2) and (2/2)
```

No co-author lines. Don't push unless asked; pushing `main` deploys.

### 9. Tell the user

- What was added (entry, parts, titles) and anything you had to derive or guess (titles from slugs, missing dates, highlights written from the title).
- After deploy, the preview card at `/en/blog` shows the new latest post. WhatsApp caches previews, so adding `?v=<n>` to a shared link forces a fresh one; for LinkedIn use https://www.linkedin.com/post-inspector/.

## Other blog tasks

### Start a new series (e.g. Dev Journal)

The `dev-journal` series already exists with `status: 'coming-soon'` and no posts.

1. Add posts the same way (`entry` = the journal number).
2. Change `status` to `'ongoing'`. Ongoing series with at least one post get the full layout (intro card, latest, up next, timeline); coming-soon series show as a small card at the bottom.

For a brand-new series, add a `BlogSeries` object with a unique kebab-case `id`, `name`, one `emoji`, a `tagline` (one line), a `description` (one short intro sentence) and `posts: []`.

Keep the intro card scannable: don't pack everything into `description`. Use the optional fields instead:
- `goals`: 2-4 tiles of `{ icon, title, text }`. `icon` is `'code' | 'study' | 'farm'`; to add another, map it to a lucide icon in `GOAL_ICONS` in `BlogClient.tsx`. Keep `title` to 1-3 words and `text` under ~60 characters.
- `closing`: one sentence after the tiles.

Note: `src/app/[locale]/blog/opengraph-image.tsx` features the `garden-diary` series. If another series becomes the main one, update that file.

### Fix or change a post

Edit the object in `blog.ts`. URLs are the identity of a post (used as React keys), so keep them unique.

### Page UI and text

Keep page-level text (subtitle, series intro, link-preview description) timeless: no "career break" or other temporary circumstances, because the blog continues after them. Individual posts can mention them, since they are dated diary entries.


- Layout: `src/app/[locale]/blog/_components/BlogClient.tsx`
- UI strings: `blog.*` keys in `src/messages/en.json` **and** `src/messages/si.json`
- Link-preview title/description: `src/app/[locale]/blog/layout.tsx`
