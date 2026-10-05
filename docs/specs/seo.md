# Spec: SEO and link previews

When a page URL is shared (WhatsApp, LinkedIn, X, Slack, iMessage), the platform reads Open Graph tags and shows a preview card. Every page has its own.

## How it works

Each page folder `my-portfolio/src/app/[locale]/<page>/` has:

- **`layout.tsx`**: exports `generateMetadata` that returns `pageMetadata({...})` from `src/lib/seo.ts`:
  - `title`: browser tab, format `'<Page> | Pathmika Weerarathna'`
  - `ogTitle`: headline on the preview card (optional, defaults to `title`)
  - `description`: preview text, 1-2 sentences, under ~200 characters, specific to the page
  - `path`: `'/<page>'`. Sets the canonical URL and `og:url` per locale.
- **`opengraph-image.tsx`**: returns `ogCard({ path, title, subtitle, highlight?, footer })` from `src/lib/og-card.tsx`. A 1200x630 PNG generated at build time. Pull values from the page's data file so the card stays current (e.g. Projects shows the featured project and counts).

The home page (`[locale]/layout.tsx` + `[locale]/opengraph-image.tsx`) has its own hand-written card; edit those files directly.

`authors` / `creator` (`<meta name="author">`, which LinkedIn's inspector reads) are set once in `[locale]/layout.tsx` and inherited by every page. Don't repeat them in `pageMetadata()`.

## Rules for the image card

- Text only: **no emoji and no remote images**. `next/og` would fetch them over the network at build time, and a failure breaks the build.
- Keep `title` short (one line at 84px is about 22 characters). `subtitle` can wrap to two lines, `highlight` and `footer` to one line each (~70 characters).
- Colors: the card uses the site's green/amber palette. Change `og-card.tsx` once rather than per page.

## Checking a page

```bash
cd my-portfolio && npm run build && npx next start -p 3123
curl -s localhost:3123/en/<page> | grep -oE '<meta (property|name)="(og|twitter):[^>]*>'
# then open the og:image URL (swap the domain for localhost:3123) to see the card
```

## After deploying

Platforms cache previews per URL:
- **WhatsApp**: re-sharing the same link may show the old card for a while. Adding `?v=2` to the link forces a fresh fetch.
- **LinkedIn**: paste the URL into https://www.linkedin.com/post-inspector/ to re-scrape.
- **X**: refreshes on its own within about a week. There's no public tool.
