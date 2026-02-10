# RfidDashboard – Project Structure

## Folder structure

```
RfidDashboard/
├── public/                 # Static assets
│   └── vite.svg
├── src/
│   ├── assets/              # Images, fonts, static files
│   ├── components/
│   │   ├── layout/          # Layout: Container, PageLayout
│   │   │   ├── Container.jsx
│   │   │   ├── PageLayout.jsx
│   │   │   └── index.js
│   │   └── ui/              # Reusable UI (ThemeToggle, buttons, etc.)
│   │       ├── ThemeToggle.jsx
│   │       └── index.js
│   ├── config/
│   │   └── tokens.js        # Design tokens for JS (breakpoints, spacing)
│   ├── hooks/               # Custom hooks
│   ├── layouts/             # Page-level layouts (optional)
│   ├── pages/               # Route-level pages (when adding router)
│   ├── styles/
│   │   └── globals.css      # Tailwind + CSS variables, light/dark theme
│   ├── theme/
│   │   └── ThemeContext.jsx # Theme provider + useTheme
│   ├── utils/               # Helpers
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── jsconfig.json            # Path alias @ -> src
├── package.json
├── vite.config.js
└── PROJECT_STRUCTURE.md
```

## Design system

- **Global font**: Inter (see `src/styles/globals.css` and `index.html`).
- **Spacing**: Use Tailwind spacing scale; app tokens in `globals.css` (`--spacing-page`, etc.) and `src/config/tokens.js`.
- **Colors / margin / padding**: Driven by CSS variables in `:root` (light) and `.dark` (dark). Use `var(--bg-primary)`, `var(--text-primary)`, `var(--border-default)`, etc.
- **Responsive**: Mobile-first. Breakpoints: `sm` 640px, `md` 768px, `lg` 1024px, `xl` 1280px, `2xl` 1536px. Use `px-4 sm:px-6 lg:px-8`-style classes and `<Container>` for width/padding.
- **Dark / light**: Toggle via `<ThemeToggle />`; theme is in `ThemeContext` and persisted in `localStorage`. Root gets class `light` or `dark`; CSS variables switch in `globals.css`.

## Adding shadcn/ui or Ant Design

- **Tailwind**: Already in use (v4 + `@tailwindcss/vite`). Custom theme in `globals.css` with `@theme`.
- **shadcn/ui**: Install per [shadcn docs](https://ui.shadcn.com); use the same Tailwind config and CSS variables so components match this theme.
- **Ant Design**: Add `antd` and wrap app with `<ConfigProvider>` if needed; consider using one UI library (Tailwind + shadcn or Ant) to keep the bundle and styles consistent.

## Imports

- Use `@/` for `src/`, e.g. `import { useTheme } from '@/theme/ThemeContext'`.
- Layout: `import { Container, PageLayout } from '@/components/layout'`.
- UI: `import { ThemeToggle } from '@/components/ui'`.
