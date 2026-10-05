# Spec: Updating portfolio content

All content is typed TypeScript data in **`my-portfolio/src/data/`**. Edit the data file and the page, its link-preview image and (where relevant) the home page update on the next deploy. No component changes are needed for ordinary content updates.

**Source of truth:** the user's CV and LinkedIn. Portfolio wording must match them. Never invent metrics, dates, titles or tech; if something is missing, ask or leave the optional field out.

## Data files

| File | Page | Notes |
| --- | --- | --- |
| `profile.ts` | Home, About | `title`, `summary`, `skills` (first 5 appear on the About link preview), `languages` |
| `experience.ts` | Experience | Newest role **first**. `period` format `'Mon YYYY - Mon YYYY'` (or `- Present`). Past roles use past tense. The link preview reads the first and last entries. |
| `projects.ts` | Projects, Home | `personalProjects`: the first 3 show on Home, the first is "Featured" on the link preview. `industryProjects`: `category` must be one of `CATEGORY_ORDER` in `ProjectsClient.tsx` or it won't render. Each needs a unique kebab-case `id`. |
| `certifications.ts` | Certifications | Image goes in `my-portfolio/public/` (prefer `.webp`), referenced as `'/name.webp'`. Newest first. Include `verifyUrl`. |
| `education.ts` | Education | Newest first. `period` or `year`, `gpa` optional. |
| `achievements.ts` | Achievements | Most important first (the first one is on the link preview). |
| `extracurricular.ts` | Extracurricular | `name` + `role`. |
| `contact.ts` | Contact, Footer | Email, phone, location, LinkedIn, Facebook. |
| `blog.ts` | Blog | See `blog.md`. |

### Personal project with a case study

A `PersonalProject` with `details: [{ heading, points[] }]` becomes a full-width expandable card. Use `githubLabel` / `extraLinks` for multi-repo projects, `liveUrl` for a demo, and `scopeNote` for caveats (e.g. "backend is stopped when idle").

## Facts repeated outside the data files

These are hard-coded. When a related fact changes, update **every** location in the same commit:

| Fact | Locations |
| --- | --- |
| Years of experience ("5 Years", "five years") | `HomeClient.tsx` quick facts · `profile.ts` summary · `about/layout.tsx` description · `blog.ts` Garden Diary tagline · `blog/layout.tsx` + `blog/opengraph-image.tsx` ("5 years in tech") |
| Engagement count ("20+") | `HomeClient.tsx` quick facts |
| MSc status ("Reading", University of Moratuwa) | `HomeClient.tsx` · `[locale]/layout.tsx` DESCRIPTION · `[locale]/opengraph-image.tsx` · `education.ts` · `profile.ts` · `about/layout.tsx` |
| Current/last role and title | `profile.ts` title · `[locale]/layout.tsx` TITLE · `experience/layout.tsx` description |
| Emerging Employee of the Year (2023) | `HomeClient.tsx` · `achievements.ts` · `achievements/layout.tsx` · `profile.ts` summary |

Quick check after a content change: `grep -rn "<old value>" my-portfolio/src` should return nothing.

## Verify and commit

```bash
cd my-portfolio && npx tsc --noEmit && npm run lint && npm run build
```

Commit message examples: `chore(content): ...` for wording, `feat(projects): add <project>`, `fix(experience): ...` for corrections. No co-author lines. Commit only when asked.
