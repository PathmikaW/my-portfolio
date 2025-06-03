# My Portfolio

A modern **Next.js 15** + **React 19** + **Tailwind CSS 4** based personal portfolio.

## Project Structure

```
.
.
├── .editorconfig
├── .env
├── .env.development
├── .env.local
├── .env.production
├── .eslintrc.mjs
├── .gitignore
├── .prettierrc
├── components.json
├── eslint.config.mjs
├── instrumentation.ts
├── middleware.ts
├── next-env.d.ts
├── next-seo.config.ts
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── README.md
├── tailwind.config.mjs
├── tsconfig.json
│
├── public
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── profile.png
│   ├── vercel.svg
│   ├── window.svg
│
└── src
    ├── app
    │   ├── favicon.ico
    │   ├── globals.css
    │   ├── layout.tsx
    │   ├── page.tsx
    │   ├── api
    │   │   ├── achievements/route.ts
    │   │   ├── contact/route.ts
    │   │   ├── education/route.ts
    │   │   ├── experience/route.ts
    │   │   ├── extracurricular/route.ts
    │   │   ├── profile/route.ts
    │   │   └── projects/route.ts
    │   └── [locale]
    │       ├── layout.tsx
    │       ├── page.tsx
    │       ├── about/
    │       │   ├── layout.tsx
    │       │   ├── page.tsx
    │       │   └── _components/AboutClient.tsx
    │       ├── achievements/
    │       │   ├── layout.tsx
    │       │   ├── page.tsx
    │       │   └── _components/AchievementsClient.tsx
    │       ├── contact/
    │       │   ├── layout.tsx
    │       │   ├── page.tsx
    │       │   └── _components/ContactClient.tsx
    │       ├── education/
    │       │   ├── layout.tsx
    │       │   ├── page.tsx
    │       │   └── _components/EducationClient.tsx
    │       ├── experience/
    │       │   ├── layout.tsx
    │       │   ├── page.tsx
    │       │   └── _components/ExperienceClient.tsx
    │       ├── extracurricular/
    │       │   ├── layout.tsx
    │       │   ├── page.tsx
    │       │   └── _components/ExtracurricularClient.tsx
    │       ├── projects/
    │       │   ├── layout.tsx
    │       │   ├── page.tsx
    │       │   └── _components/ProjectsClient.tsx
    │       └── _components/HomeClient.tsx
    │
    ├── components
    │   ├── common
    │   │   ├── Background.tsx
    │   │   ├── Footer.tsx
    │   │   ├── Header.tsx
    │   │   ├── LanguageToggle.tsx
    │   │   └── ThemeToggle.tsx
    │   └── ui
    │       ├── badge.tsx
    │       ├── button.tsx
    │       ├── card.tsx
    │       ├── dropdown-menu.tsx
    │       ├── input.tsx
    │       ├── navigation-menu.tsx
    │       ├── sheet.tsx
    │       ├── skeleton.tsx
    │       ├── tabs.tsx
    │       └── textarea.tsx
    │
    ├── constants
    ├── context
    │   └── AppContext.tsx
    │
    ├── i18n
    │   ├── config.ts
    │   └── request.ts
    │
    ├── lib
    │   ├── api.ts
    │   ├── images.ts
    │   └── utils.ts
    │
    └── messages
        ├── en.json
        └── si.json

```

## Features

* 👉 Next.js 15 App Router

* 👉 React 19

* 👉 Tailwind CSS 4

* 👉 ESLint + Prettier

* 👉 ShadCN UI Components (Card, Button, Input, Skeleton, etc.)

* 👉 Localization with next-intl

* 👉 Dynamic SEO with next-seo

* 👉 Dark mode toggle

* 👉 Responsive design

* 👉 API routes for content management

* 👉 Per-page Client Components under _components

* 👉 Global UI components (/src/components/)

* 👉 Centralized context (AppContext)

* 👉 Image assets served from /public



## Folder Breakdown

| Folder            | Description                              |
| ----------------- | ---------------------------------------- |
| `/public`         | Static images & assets                    |
| `/src/app`        | App router structure, pages & API routes  |
| `/src/app/[locale]/_components` | Per-page Client Components |
| `/src/components` | Global UI & shared components             |
| `/src/context`    | Global React context                      |
| `/src/i18n`       | Localization config                       |
| `/src/lib`        | Utility functions & API clients           |
| `/src/messages`   | Translation JSON files                    |

---
