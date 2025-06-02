# my-portfolio

my-portfolio/
├── .editorconfig
├── .env
├── .env.development
├── .env.local
├── .env.production
├── .eslintrc.mjs
├── .gitignore
├── .prettierrc
├── next.config.ts                     // experimental.typedRoutes = true
├── package.json
├── postcss.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
├── README.md
├── middleware.ts                      // locale redirect if missing
├── public/
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   ├── window.svg
├── src/
│   ├── app/
│   │   ├── page.tsx                   // redirects to /en
│   │   └── [locale]/
│   │       ├── layout.tsx             // main layout → AppContext, IntlProvider, Header, Footer
│   │       ├── page.tsx               // home page
│   │       ├── contact/
│   │       │   └── page.tsx
│   │       ├── projects/
│   │       │   ├── page.tsx           // project list page
│   │       │   └── [slug]/
│   │       │       └── page.tsx       // dynamic project detail page
│   ├── components/
│   │   ├── common/
│   │   │   ├── Footer.tsx
│   │   │   ├── Header.tsx             // sticky top, uses LanguageToggle, ThemeToggle
│   │   │   ├── LanguageToggle.tsx     // dynamic locale switcher (no any)
│   │   │   ├── ThemeToggle.tsx        // theme toggle
│   │   ├── ui/
│   │   │   ├── button.tsx             // atomic UI button
│   ├── context/
│   │   ├── AppContext.tsx             // useReducer + theme management
│   ├── hooks/
│   │   └── (empty → ready for custom hooks)
│   ├── i18n/
│   │   ├── config.ts                  // locales, defaultLocale
│   │   ├── request.ts                 // getMessages() helper
│   ├── messages/
│   │   ├── en.json
│   │   ├── si.json


 "dev": "next dev --turbopack",

## typed routes

Example — without typedRoutes:

import Link from 'next/link';

<Link href={`/projects/${id}`}>Project</Link>


Here href is just a string — if you make a typo, no compile error → runtime bug! ❌

Example — with typedRoutes: true:
Now you can do:

import { createTypedPath } from 'next/navigation';

const projectPath = createTypedPath('/projects/[id]');

<Link href={projectPath({ id: '123' })}>Project</Link>
✅ If you pass wrong param or wrong path → TypeScript error!
✅ Compile-time safety for all navigation!

Why is this useful?
✅ On big apps → easy to break links (typos)
✅ Typed routes give guaranteed correctness
✅ You can even auto-generate routes from your folder structure.