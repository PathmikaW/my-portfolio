# Spec: Adding a new page

Use the Blog page (`src/app/[locale]/blog/`) as the most complete reference. Paths below are relative to `my-portfolio/`.

## Checklist

1. **Data**: `src/data/<page>.ts` with an exported interface and typed array/object. Content never lives inside components.
2. **Server page**: `src/app/[locale]/<page>/page.tsx`. Await `params` for `locale`, import the data, render the client component:

   ```tsx
   export default async function XPage({ params }: { params: Promise<{ locale: string }> }) {
     const { locale } = await params;
     return <XClient items={items} locale={locale} />;
   }
   ```

3. **Client component**: `src/app/[locale]/<page>/_components/<Page>Client.tsx` with `'use client'`. Use `useTranslations` for UI strings, `ScrollSection`/`ScrollItem` for reveal animations, existing `components/ui` and `components/effects` pieces, and theme tokens (`accent-blue`, `accent-purple`, `accent-green`, `text-muted-foreground`).
4. **Metadata + link preview**: `layout.tsx` with `pageMetadata()` and `opengraph-image.tsx` with `ogCard()`. See `seo.md`.
5. **Translations**: add `nav.<page>`, `pageTitle.<page>` and a `<page>` namespace for UI strings to **both** `src/messages/en.json` and `src/messages/si.json`. Sinhala text is a best-effort translation; tell the user so they can review it.
6. **Nav**: add `{ href: \`/${locale}/<page>\`, label: t('<page>') }` to `navItems` in `src/components/common/Header.tsx`. The desktop menu already wraps to two lines, so mention any further crowding to the user.
7. **Remote images**: if the page shows images from a new host, add it to `images.remotePatterns` in `next.config.ts`.

## Verify

```bash
npx tsc --noEmit && npm run lint && npm run build
```

Then check `/en/<page>` and `/si/<page>` in `npm run dev`, in light and dark mode, at phone width.
