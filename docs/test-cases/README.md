# Test cases

Test cases derived from the specs in `docs/specs/`. They describe **what** to test; the Jest (and later Playwright) code that implements them comes in a separate step. Write and update them with the `/write-test-cases` skill.

## Spec -> test-case map

| Spec | Test cases | Prefix |
| --- | --- | --- |
| `docs/specs/blog.md` | [blog.md](blog.md) | `BLOG` |
| `docs/specs/content.md` | [content.md](content.md) | `CONT` |
| `docs/specs/new-page.md` | [new-page.md](new-page.md) | `PAGE` |
| `docs/specs/seo.md` | [seo.md](seo.md) | `SEO` |

A new spec gets a new test-case file with the same name and a new prefix, added to this table.

## Keeping them in sync with the specs

Every test-case file starts with a marker holding the SHA-256 (first 12 characters) of its spec:

```
<!-- spec: docs/specs/blog.md sha256:0123456789ab -->
```

When a spec changes, its test cases must be updated in the same commit and the marker refreshed. Check from the repo root:

```bash
docs/test-cases/check-sync.sh          # lists stale or missing test-case files, exits 1 if any
docs/test-cases/check-sync.sh --update # rewrites the markers (only after the cases are updated)
```

A Claude Code hook (`.claude/settings.json`) also reminds Claude to run `/write-test-cases <spec>` whenever it edits a file in `docs/specs/`.

## Format

Each case has a stable ID (`<PREFIX>-<NNN>`, never renumbered or reused) and these fields:

```markdown
### BLOG-001 Short name of the behaviour
- **Spec:** blog.md > Step 5 (the section the rule comes from)
- **Level:** data | unit | component | e2e | static | manual
- **Priority:** P1 | P2 | P3
- **Target:** file / function under test
- **Given** ... **When** ... **Then** ...
- **Notes:** (optional) setup needed, known current failures
```

Removed spec rules are not deleted: mark the case `**Status:** retired (<date>, reason)` so the ID is never reused.

### Levels

| Level | Meaning | Future tool |
| --- | --- | --- |
| `data` | Validates the typed arrays in `src/data/*.ts` against spec rules | Jest |
| `unit` | Pure functions in `src/lib/` and helpers | Jest |
| `component` | Renders a client component with props | Jest + React Testing Library |
| `static` | Scans source files for conventions (folder layout, translation keys, forbidden strings) | Jest (fs + glob) |
| `e2e` | Runs against `next build && next start` | Playwright or Jest + fetch |
| `manual` | Needs human judgement or an external service; stays a checklist | - |

### Priorities

- **P1** - a failure breaks the page, a link preview or the build.
- **P2** - a failure breaks a spec rule visible to visitors (wrong order, wrong wording rule, stale count).
- **P3** - style and consistency rules.

## Setup notes for the Jest step

Some targets are not exported yet. When implementing the tests, export them (or move them to `src/lib/`) rather than duplicating logic in the tests:

- `byNewest`, `groupByEntry`, `formatDate`, `GOAL_ICONS` in `src/app/[locale]/blog/_components/BlogClient.tsx` (`byNewest` is also duplicated in `src/lib/blog-preview.ts`)
- `PREVIEW_TEXT`, `DEFAULT_SERIES` in `src/lib/blog-preview.ts`
- `CATEGORY_ORDER` in `src/app/[locale]/projects/_components/ProjectsClient.tsx`

## Features without a spec

These features exist but have no spec in `docs/specs/`, so they have no test cases yet. Write a spec first, then run `/write-test-cases`:

- Contact form and email sending (`src/app/api/contact/route.ts`)
- Theme toggle (light/dark) and locale switcher (`en` / `si`)
- Home page sections (`src/app/[locale]/_components/HomeClient.tsx`)
