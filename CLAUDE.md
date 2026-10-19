# Parkwize Landing Page — Guidelines

Marketing site for Parkwize (by Tecnova). Next.js 15 App Router, React 19, TypeScript (strict), Tailwind CSS 3, `motion`, `lucide-react`. Deployed on Vercel. The only server code is `src/app/api/early-access/route.ts` (emails sign-ups through Resend).

Every change follows these rules. When a rule and existing legacy code disagree, the rule wins; migrate legacy code when you touch it.

## 1. Project structure

```
src/
  app/
    (landing)/[lang]/...      Thin route files: resolve locale, load dictionary, metadata, render sections
    api/                      Route handlers
    globals.css               Design tokens and global utilities
  components/
    ui/                       Primitives (button, dialog, input, ...). Generic, no copy, no business logic
    layout/                   Site chrome: top bar, footer, page shell
    sections/<page>/          Page sections, one component per section
    sections/                 Sections shared by several pages (e.g. coming-soon)
  content/
    en.json, fr.json          All user-facing copy
    dictionary.ts             Typed dictionary loader
  lib/
    i18n.ts                   Locales, locale resolution, locale paths
    navigation.ts             Site links and external URLs
    motion.ts                 Shared animation presets
    utils.ts                  cn() and small helpers
```

- Route files (`page.tsx`, `layout.tsx`) stay short: no large JSX trees. Build sections in `components/sections` and compose them.
- New pages go under `src/app/(landing)/[lang]/<slug>/page.tsx`. Register the slug in `src/lib/navigation.ts`.
- Pages listed in `navigation.ts` but not built yet are served by `src/app/(landing)/[lang]/[slug]/page.tsx` as a translated coming-soon page. A real page folder automatically takes precedence.

## 2. Naming and files

- File names: `kebab-case.tsx` / `kebab-case.ts`.
- Components: PascalCase **named exports**. Default exports only where Next.js requires them (`page`, `layout`, `route`, `not-found`, ...).
- One component per file. Small private subcomponents used only by that file may stay in it.
- Hooks: `use-*.ts`, exported as `useSomething`.
- Constants: `UPPER_SNAKE_CASE`. Types: PascalCase, `type` over `interface`.
- Imports use the `@/` alias, never long relative paths like `../../../../`.

## 3. Code style

- **No comments.** The only comment allowed is the copyright header at the top of a file:
  ```ts
  /*
   * Copyright (c) 2025-2026. Tecnova
   */
  ```
  No explanatory comments, no TODOs, no commented-out code, no JSX comments. Code must explain itself through naming and structure.
- No dead code: delete unused components, imports, variables and files.
- Plain string props: `className="flex gap-2"`, not `className={"flex gap-2"}`.
- Server Components by default. Add `"use client"` only to the smallest interactive leaf that needs state, effects or browser APIs.
- Strict TypeScript. No `any`, no `as` casts to silence errors, no non-null assertions in new code.
- Keep components small and focused. Extract when a component handles more than one concern or passes ~150 lines.
- Prefer data-driven rendering: arrays of items in `lib/` or content, mapped to components.
- Formatting: Prettier with `prettier-plugin-tailwindcss` (run `npm run format`). Do not hand-order classes.

## 4. Reuse first

Before writing markup, check `components/ui`, `components/layout` and `components/sections`.

- Buttons and button-looking links: `Button` / `buttonVariants` from `@/components/ui/button`. Add a variant there instead of restyling ad hoc.
- Variants of any component: `cva`.
- Class merging: `cn()` from `@/lib/utils`.
- Internal links: the localized `Link` from `@/components/custom-ui/link` (adds the `/en` or `/fr` prefix). External links: plain `<a>` with `rel="noopener noreferrer"` when `target="_blank"`.
- Glass surfaces: the `glass` class from `globals.css`.
- Logo: `ParkwizeLogo` from `@/components/brand/parkwize-logo` (vector, colored with `currentColor`). Do not use the logo image files.
- Sign-in call to action: `SignInLink` from `@/components/layout/top-bar/sign-in-link`.
- Outside-click / Escape handling: `useDismiss`. Mobile scroll lock: `useScrollLock`.
- Small uppercase mono labels (column titles, eyebrows, meta text): the `eyebrow` class from `globals.css`.
- Link lists: `FooterColumn` from `@/components/layout/footer/footer-column` handles internal (localized) and external links.
- Site URLs and page lists (`SIGN_IN_URL`, `DEMO_URL`, `BOOK_CALL_HREF`, `PRODUCT_LINKS`, `LEGAL_LINKS`): `@/lib/navigation`. Never hardcode them in components.
- If the same markup appears twice, make it a component.

## 5. Design tokens

All visual values come from CSS variables in `src/app/globals.css`, exposed through `tailwind.config.ts`.

- Colors: use token classes (`bg-background`, `text-foreground`, `text-muted-foreground`, `bg-brand`, `text-brand-foreground`, `border-border`, ...). **No hex, `rgb()`, `hsl()` or arbitrary color values in components** (`bg-[#0658f6]` is forbidden). Need a new color? Add a token in `globals.css` and `tailwind.config.ts`.
- Brand blue: `brand` (`--brand`). `parkwize_blue` and `primary_action` are legacy aliases; do not use them in new code.
- Dark surfaces (footer, dark sections): the `inverse` palette (`bg-inverse`, `text-inverse-foreground`, `text-inverse-muted`, `border-inverse-border`, `hover:text-inverse-hover`).
- Status colors: `success`.
- Fonts: `font-sans` (Inter) for body text, `font-display` (Poppins) for headings and display text, `font-mono` (JetBrains Mono) only for small uppercase labels (prefer the `eyebrow` class). All come from `next/font` variables in `src/app/layout.tsx`. Never import fonts elsewhere.
- Radius, shadows, blur: use the theme scale (`rounded-lg`, `shadow-glass`, ...). Arbitrary values are only acceptable for one-off geometry (e.g. a pill radius matching a fixed height).
- Top bar spacing: `--top-bar-height` and `--top-bar-gap` let sections offset content below the floating bar.

## 6. Internationalization (FR / EN)

- Every user-facing string lives in **both** `src/content/en.json` and `src/content/fr.json` under the same key path. This includes `aria-label`s, `alt` text, metadata titles and descriptions, button labels and error messages.
- `fr.json` is type-checked against `en.json` in `dictionary.ts`: a missing or misnamed key fails `tsc` and the build.
- No inline translations (`lang === "fr" ? "..." : "..."`) in components.
- Page names and descriptions live once in the `pages` block, keyed like `PRODUCT_LINKS` / `LEGAL_LINKS`. The top bar, footer and page metadata all read from it; never duplicate a page name elsewhere.
- The locale comes from the `[lang]` route param, resolved with `resolveLocale()` from `@/lib/i18n`. Never from client state or `localStorage`.
- Server components load the dictionary with `getDictionary(locale)` and pass **only the slice** a client component needs as a prop.
- French copy is real French with accents (é, è, à, ç), not machine-stripped ASCII.

## 7. Responsive design

Mobile-first: base classes target phones, then `sm`, `md`, `lg`, `xl`, `2xl` add up.

- Check every change at **360, 390, 768, 1024, 1280, 1440 and 1920 px** wide, and on a landscape phone (e.g. 844×390).
- No horizontal scrolling at any width.
- Tap targets are at least 44×44 px on touch devices.
- Use `svh` / `dvh` instead of `vh` for full-height layouts.
- Respect iOS safe areas with `env(safe-area-inset-*)` on fixed elements.
- Images: `next/image` with an accurate `sizes` prop; never ship desktop-size images to phones.
- Typography scales with breakpoints (`text-3xl md:text-5xl`), lines stay readable (`max-w-prose` or similar).

## 8. Accessibility

- Semantic HTML: `header`, `nav`, `main`, `section`, `footer`, real `button`s and `a`s.
- Everything works with the keyboard. Focus is always visible (`focus-visible:ring-*`).
- Toggles expose `aria-expanded` and `aria-controls`. Icon-only buttons have a translated `aria-label`.
- Overlays and menus close with `Escape` and on outside click.
- Text meets WCAG AA contrast, including on glass surfaces.
- Respect `prefers-reduced-motion`.

## 9. Motion

- Use `motion/react` only. `framer-motion` is legacy; remove it from files you touch.
- Use the presets in `@/lib/motion` for durations, springs and easings; do not invent new timings per component.
- Animate `transform` and `opacity` where possible. Keep animations short and purposeful.

## 10. Quality gate

Before considering work done or committing:

```bash
npm run lint
npx tsc --noEmit
npm run build
```

All three must pass, and the change must be checked visually at mobile and desktop widths in both `/en` and `/fr`.
