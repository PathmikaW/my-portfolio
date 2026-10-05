# Pathmika Weerarathna - Portfolio

Personal portfolio and blog hub, live at https://pathmikaw.vercel.app (deployed on Vercel from `main`).

The Next.js app lives in **`my-portfolio/`**, not the repo root. Run all npm commands from there.
The root `README.md` is outdated (it lists API routes that no longer exist); trust this file and `docs/specs/`.

## Stack

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · next-intl (`en`, `si`) · framer-motion · shadcn/ui · lucide-react · nodemailer (contact form).

## Commands (from `my-portfolio/`)

```bash
npm run dev        # dev server, http://localhost:3000
npx tsc --noEmit   # type-check
npm run lint       # eslint
npm run build      # production build - must pass before committing
```

## Where things live

| What | Where |
| --- | --- |
| **All page content** (profile, experience, projects, blog posts...) | `my-portfolio/src/data/*.ts` - typed arrays, no CMS, no API |
| Pages | `src/app/[locale]/<page>/page.tsx` (server) + `_components/<Page>Client.tsx` (client) |
| Page title + link-preview text | `src/app/[locale]/<page>/layout.tsx` via `pageMetadata()` in `src/lib/seo.ts` |
| Link-preview image | `src/app/[locale]/<page>/opengraph-image.tsx` via `ogCard()` in `src/lib/og-card.tsx` |
| UI strings (both languages) | `src/messages/en.json` + `src/messages/si.json` - always update both |
| Nav menu | `src/components/common/Header.tsx` (`navItems`) |
| Theme colors | `src/app/globals.css` - use `accent-blue` (primary green), `accent-purple` (teal), `accent-green` (amber); never hard-code hex in components |
| Static images | `my-portfolio/public/` |
| Contact form email | `src/app/api/contact/route.ts`, env vars in `.env.example` |

## Task playbooks

Read the matching spec before starting. Each one lists the exact steps and how to verify.

- **Publish a blog post / Garden Diary entry** -> `docs/specs/blog.md` (or run `/publish-blog-post`)
- **Update portfolio content** (projects, experience, certifications, education, achievements, profile) -> `docs/specs/content.md`
- **Add a new page** -> `docs/specs/new-page.md`
- **Link previews (WhatsApp/LinkedIn/X) and SEO** -> `docs/specs/seo.md`

## Rules

- **Content must match the CV and LinkedIn.** Don't invent numbers, titles, dates or claims. If a fact is missing, ask or leave the optional field out.
- Writing style: plain hyphens (` - `), never em dashes. No emoji in data files except the blog series `emoji` field.
- Code style: Prettier (single quotes, semicolons, width 100). Match the surrounding component patterns (`ScrollSection`/`ScrollItem` reveals, card classes like `rounded-xl border border-accent-blue/20 bg-white/90 dark:bg-black/70`).
- External links open in a new tab: `target="_blank" rel="noopener noreferrer"`.
- Don't add dependencies without asking.

## Git

- Conventional commits with a scope: `feat(blog): ...`, `chore(content): ...`, `fix(projects): ...`.
- **No `Co-Authored-By` / Claude attribution lines** in commit messages.
- Commit only when asked. Never push without asking (pushing to `main` deploys to production).
- Verify before committing: `npx tsc --noEmit && npm run lint && npm run build`.
