---
name: publish-blog-post
description: Add new Medium posts (Garden Diary, Dev Journal) to the portfolio's Blog page. Use when the user shares Medium links and/or LinkedIn post text and wants them on the site.
argument-hint: <medium url(s)> [linkedin text]
---

# Publish blog post(s)

Input from the user: $ARGUMENTS

1. Read `docs/specs/blog.md` and follow it step by step. It is the source of truth for fields, highlight bullets, tags, dates and verification.
2. Read `my-portfolio/src/data/blog.ts` to see the existing posts. Skip any URL that's already there (compare without the query string) and say so.
3. For each new URL: clean it, look it up in the RSS feed (`curl -sL https://medium.com/feed/@pathmikaweerarathna`) for the exact title, date and cover, split the LinkedIn text (if given) into 2-4 highlight bullets, pick tags, and append the object.
4. Run `npx tsc --noEmit && npm run lint && npm run build` from `my-portfolio/`.
5. Report back briefly: each post added (entry, part, title, date), plus anything derived or guessed (title from slug, missing date, highlights written from the title only).
6. Commit only if the user asked, using `feat(blog): add Garden Diary #N ...` with no co-author lines. Don't push unless asked.
