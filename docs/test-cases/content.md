<!-- spec: docs/specs/content.md sha256:5ccbe45f1c50 -->

# Test cases: Portfolio content

Source: [`docs/specs/content.md`](../specs/content.md). Format and levels: [README](README.md).

Main targets: `src/data/*.ts` (except `blog.ts`, see [blog.md](blog.md)), the pages and `opengraph-image.tsx` files that read them, and the hard-coded facts listed in the spec.

## All data files

### CONT-001 No em dashes in data files
- **Spec:** content.md > intro; CLAUDE.md > Writing style
- **Level:** data · **Priority:** P3
- **Target:** every exported string (deep) in `src/data/*.ts`
- **Then** no string contains `—`.

### CONT-002 No emoji in data files
- **Spec:** CLAUDE.md > Writing style
- **Level:** data · **Priority:** P3
- **Target:** every exported string in `src/data/*.ts`, except `blogSeries[].emoji`
- **Then** no string matches `\p{Extended_Pictographic}`.

### CONT-003 No sensitive implementation details
- **Spec:** content.md > Source of truth; CLAUDE.md > No sensitive or over-precise work details
- **Level:** data · **Priority:** P2
- **Target:** every string in `src/data/*.ts` and every page `layout.tsx` description
- **Then** none contains a term from a denylist kept in the test (start with: `certificate pinning`, `SSL pinning`, `kill-switch`, `kill switch`, `integrity check`, `encryption key`, `password hash`, `licence workaround`, `license workaround`).
- **Notes:** The denylist catches regressions only; reviewing new wording is still manual (CONT-090).

### CONT-004 External URLs are https
- **Spec:** content.md > Data files
- **Level:** data · **Priority:** P2
- **Target:** every field named `*Url`, `url`, `liveUrl`, `githubUrl`, `verifyUrl` and `extraLinks[].url` in `src/data/*.ts`
- **Then** each is a valid URL starting with `https://`.

## Profile (`profile.ts`)

### CONT-010 Profile has the fields the pages use
- **Spec:** content.md > Data files
- **Level:** data · **Priority:** P1
- **Target:** `profile`
- **Then** `title` and `summary` are non-empty, `skills` has at least 5 entries, and `languages` is non-empty.

### CONT-011 About link preview shows the first 5 skills
- **Spec:** content.md > Data files (`profile.ts`)
- **Level:** unit · **Priority:** P2
- **Target:** `about/opengraph-image.tsx` with `ogCard` mocked
- **Then** `ogCard` is called with `footer === profile.skills.slice(0, 5).join(' · ')`.

## Experience (`experience.ts`)

### CONT-020 Period format
- **Spec:** content.md > Data files (`experience.ts`)
- **Level:** data · **Priority:** P2
- **Target:** `experience[].period`
- **Then** each matches `^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) \d{4} - ((Jan|...|Dec) \d{4}|Present)$`, with the end not before the start.

### CONT-021 Newest role first
- **Spec:** content.md > Data files (`experience.ts`)
- **Level:** data · **Priority:** P1
- **Target:** `experience`
- **Then** start dates parsed from `period` are in descending order; only `experience[0]` may end in `Present`.

### CONT-022 Experience link preview reads the first and last entries
- **Spec:** content.md > Data files (`experience.ts`)
- **Level:** unit · **Priority:** P2
- **Target:** `experience/opengraph-image.tsx` with `ogCard` mocked
- **Then** the card text includes values from `experience[0]` (current/last role) and `experience[experience.length - 1]` (first role), so adding a role updates the card.

## Projects (`projects.ts`)

### CONT-030 Project ids are unique kebab-case
- **Spec:** content.md > Data files (`projects.ts`)
- **Level:** data · **Priority:** P1
- **Target:** `personalProjects[].id`, `industryProjects[].id`
- **Then** every id matches `^[a-z0-9]+(-[a-z0-9]+)*$` and is unique across both arrays.

### CONT-031 Industry categories are known
- **Spec:** content.md > Data files (`projects.ts`)
- **Level:** data · **Priority:** P1
- **Target:** `industryProjects[].category` vs `CATEGORY_ORDER` in `ProjectsClient.tsx`
- **Then** every category is in `CATEGORY_ORDER`, so no project is silently hidden.
- **Notes:** Needs `CATEGORY_ORDER` exported.

### CONT-032 Every industry project renders
- **Spec:** content.md > Data files (`projects.ts`)
- **Level:** component · **Priority:** P2
- **Target:** `ProjectsClient`
- **Then** the number of rendered industry project cards equals `industryProjects.length`, grouped under headings in `CATEGORY_ORDER` order, with empty categories hidden.

### CONT-033 Case-study details are well formed
- **Spec:** content.md > Personal project with a case study
- **Level:** data · **Priority:** P2
- **Target:** `personalProjects[].details`
- **Given** a project with `details` **Then** each section has a non-empty `heading` and at least one non-empty point.

### CONT-034 Case-study projects render as expandable cards
- **Spec:** content.md > Personal project with a case study
- **Level:** component · **Priority:** P2
- **Target:** `ProjectsClient`
- **Given** a personal project with `details` **Then** it renders full width with a toggle; clicking the toggle shows its sections, clicking again hides them; `liveUrl`, `githubLabel`/`extraLinks` and `scopeNote` render when set and are absent when not.

### CONT-035 Home shows the first 3 personal projects
- **Spec:** content.md > Data files (`projects.ts`)
- **Level:** component · **Priority:** P2
- **Target:** `HomeClient`
- **Then** exactly `personalProjects.slice(0, 3)` titles appear in the projects section, in that order.

### CONT-036 Projects link preview features the first personal project
- **Spec:** content.md > Data files (`projects.ts`)
- **Level:** unit · **Priority:** P2
- **Target:** `projects/opengraph-image.tsx` with `ogCard` mocked
- **Then** `highlight` is `Featured: <personalProjects[0].title>` and `footer` contains both array lengths.

## Certifications (`certifications.ts`)

### CONT-040 Certificate images exist locally
- **Spec:** content.md > Data files (`certifications.ts`)
- **Level:** data · **Priority:** P1
- **Target:** `certifications[].image`
- **Then** each starts with `/`, and `public/<image>` exists on disk.

### CONT-041 Certificate images prefer webp
- **Spec:** content.md > Data files (`certifications.ts`)
- **Level:** data · **Priority:** P3
- **Target:** `certifications[].image`
- **Then** report (do not fail) any image that is not `.webp`.

### CONT-042 Certifications have a verify link and are newest first
- **Spec:** content.md > Data files (`certifications.ts`)
- **Level:** data · **Priority:** P2
- **Target:** `certifications`
- **Then** each has a non-empty https `verifyUrl`, and `issuedDate` (`Mon YYYY`) is in descending order.

## Education (`education.ts`)

### CONT-050 Education entries have a date and are newest first
- **Spec:** content.md > Data files (`education.ts`)
- **Level:** data · **Priority:** P2
- **Target:** `education`
- **Then** each entry has `period` or `year`; ordering by the latest year mentioned in `period`/`year` is descending (an entry still in progress counts as newest).

## Achievements, extracurricular, contact

### CONT-060 Achievements link preview uses the first achievement
- **Spec:** content.md > Data files (`achievements.ts`)
- **Level:** unit · **Priority:** P2
- **Target:** `achievements/opengraph-image.tsx` with `ogCard` mocked
- **Then** the card text includes `achievements[0]`'s title.

### CONT-061 Extracurricular entries have name and role
- **Spec:** content.md > Data files (`extracurricular.ts`)
- **Level:** data · **Priority:** P2
- **Target:** `extracurricular`
- **Then** every entry has a non-empty `name` and `role`.

### CONT-062 Contact details are valid
- **Spec:** content.md > Data files (`contact.ts`)
- **Level:** data · **Priority:** P1
- **Target:** `contact.ts` exports
- **Then** email is a valid address, phone is non-empty, location is non-empty, LinkedIn URL starts with `https://www.linkedin.com/` and Facebook URL with `https://www.facebook.com/` (or `https://facebook.com/`).

### CONT-063 Contact details appear on Contact and Footer
- **Spec:** content.md > Data files (`contact.ts`)
- **Level:** component · **Priority:** P2
- **Target:** `ContactClient`, `Footer`
- **Then** both render the email and LinkedIn link from `contact.ts`; external links have `target="_blank"` and `rel="noopener noreferrer"`.

## Facts repeated outside the data files

Each test keeps the expected value in one constant at the top of the test, so a real change is a one-line test update plus the listed files.

### CONT-070 Years of experience match everywhere
- **Spec:** content.md > Facts repeated outside the data files
- **Level:** static · **Priority:** P2
- **Target:** `HomeClient.tsx`, `profile.ts`, `about/layout.tsx`, `blog.ts` (Garden Diary tagline), `src/lib/blog-preview.ts`
- **Then** each file mentions the expected years (`5 Years` / `5 years` / `five years`), and none mentions a different number of years of experience.

### CONT-071 Engagement count
- **Spec:** content.md > Facts repeated outside the data files
- **Level:** static · **Priority:** P3
- **Target:** `HomeClient.tsx`
- **Then** the quick facts contain the expected engagement count (`20+`).

### CONT-072 MSc status matches everywhere
- **Spec:** content.md > Facts repeated outside the data files
- **Level:** static · **Priority:** P2
- **Target:** `HomeClient.tsx`, `[locale]/layout.tsx`, `[locale]/opengraph-image.tsx`, `education.ts`, `profile.ts`, `about/layout.tsx`
- **Then** each mentions the MSc with the expected status (`Reading`) and `University of Moratuwa` where the spec lists it; none uses a different status (e.g. `Completed`, `Graduated`).

### CONT-073 Current role and title match everywhere
- **Spec:** content.md > Facts repeated outside the data files
- **Level:** static · **Priority:** P2
- **Target:** `profile.ts` title, `[locale]/layout.tsx` TITLE, `experience/layout.tsx` description, `experience[0].title`
- **Then** the role name in `experience[0]` (e.g. `Associate Tech Lead`) appears in `profile.title` and `experience/layout.tsx`, and the headline in `[locale]/layout.tsx` agrees with `profile.title`.

### CONT-074 Award matches everywhere
- **Spec:** content.md > Facts repeated outside the data files
- **Level:** static · **Priority:** P2
- **Target:** `HomeClient.tsx`, `achievements.ts`, `achievements/layout.tsx`, `profile.ts` summary
- **Then** each contains `Emerging Employee of the Year` together with `2023`.

### CONT-075 Old values are gone after a change
- **Spec:** content.md > Quick check after a content change
- **Level:** static · **Priority:** P3
- **Target:** `src/`
- **Then** none of a list of retired values kept in the test (add one each time a fact changes) appears anywhere under `src/`.

## Manual / process checks

### CONT-090 Wording matches the CVs and LinkedIn
- **Spec:** content.md > Source of truth
- **Level:** manual · **Priority:** P1
- **Then** changed content matches the General CV (`/Users/tmpw/Projects/profile_update/CV/LaTeX/`) and LinkedIn; no invented metrics, dates, titles or tech; sensitive details left out.

### CONT-091 GitHub profile README updated with Experience
- **Spec:** content.md > Source of truth
- **Level:** manual · **Priority:** P2
- **Then** when `experience.ts` changes, the Experience section of `PathmikaW/PathmikaW` README matches.

### CONT-092 Past roles use past tense
- **Spec:** content.md > Data files (`experience.ts`)
- **Level:** manual · **Priority:** P3
- **Then** bullets of roles not ending in `Present` are written in the past tense.

### CONT-093 Commit message format
- **Spec:** content.md > Verify and commit
- **Level:** manual · **Priority:** P3
- **Then** commits use `chore(content)`, `feat(projects)`, `fix(experience)` style scopes, have no co-author lines, and were made only when asked.
