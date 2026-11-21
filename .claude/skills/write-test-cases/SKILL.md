---
name: write-test-cases
description: Write or update the test cases in docs/test-cases/ from the specs in docs/specs/. Use when a spec is added or changed, when asked to write test cases for a feature, or to check that test cases are in sync with the specs.
argument-hint: [spec name, e.g. blog | all | check]
---

# Write test cases from the specs

Input from the user: $ARGUMENTS (a spec name like `blog`, `all`, or `check`; empty means `all`).

Test cases are documents, not Jest code yet. `docs/test-cases/README.md` defines the format, ID prefixes, levels and priorities; read it first and follow it exactly.

## `check`

Run `docs/test-cases/check-sync.sh` from the repo root and report which test-case files are OK, STALE or MISSING. Don't edit anything.

## Writing or updating test cases for a spec

1. **Find what changed.** Run `docs/test-cases/check-sync.sh`. For a STALE spec, see what changed with `git diff HEAD -- docs/specs/<name>.md` (and `git log -p -3 -- docs/specs/<name>.md` if the change is already committed). For a MISSING one, the whole spec is new.
2. **Read the spec and the code it describes.** Read `docs/specs/<name>.md` in full, then the files it names (data files, `src/lib/*`, components) so each case points at a real target (file, function, field). Don't write cases for behaviour the code doesn't have; if the spec and the code disagree, write the case from the spec and add a `**Notes:**` line saying the code currently differs, then tell the user.
3. **Derive cases from every testable rule.** Go through the spec section by section. Each rule, constraint, format, ordering, fallback or "must/never" becomes at least one case. Prefer the cheapest level that proves the rule: `data` > `unit` > `static` > `component` > `e2e`. Rules that need human judgement or external services (CV wording, RSS lookups, commit messages, visual checks) become `manual` cases in the "Manual / process checks" section.
4. **Edit the test-case file** `docs/test-cases/<name>.md`:
   - Changed rule -> update the existing case in place; keep its ID.
   - New rule -> add a case with the next free ID in that section's range (sections are numbered in tens: 001-, 010-, 020-...). Never reuse or renumber IDs.
   - Removed rule -> don't delete; add `**Status:** retired (<YYYY-MM-DD>, <reason>)` under the heading.
   - Also check the other test-case files: a rule can be tested in more than one place (e.g. card text limits appear in `seo.md` and `blog.md`). Update cross-references.
   - New spec -> create `docs/test-cases/<name>.md` with the marker line `<!-- spec: docs/specs/<name>.md sha256:000000000000 -->` first, pick a new prefix, and add it to the table in `docs/test-cases/README.md`.
5. **Refresh the marker.** Run `docs/test-cases/check-sync.sh --update`, then `docs/test-cases/check-sync.sh` to confirm everything is OK. Only update the marker after the cases really reflect the spec.
6. **Report back briefly:** cases added, changed and retired (by ID), any spec/code mismatches found, and any spec rule you couldn't turn into a case.

## `all`

Do the steps above for every spec in `docs/specs/`. Then list features in the code that no spec covers (pages, API routes in `src/app/api/`, components with behaviour) and update the "Features without a spec" list in `docs/test-cases/README.md`. Don't write cases for unspecified features: suggest a spec first.

## Writing style for cases

- One behaviour per case, with a short heading that states it (`Newest post sorts first`, not `Sorting test`).
- **Given / When / Then** with concrete values taken from the real data or a small example, so the case can be coded without re-reading the spec.
- Point at exact targets (`resolveSeries` in `src/lib/blog-preview.ts`), and note when a target needs exporting for Jest (and add it to "Setup notes" in the README).
- Note known current failures (e.g. existing data breaking a rule) instead of silently loosening the rule.
- Plain hyphens, no em dashes, no emoji.
- Commit only when asked: `docs(test-cases): ...`, no co-author lines, together with the spec change when there is one.
