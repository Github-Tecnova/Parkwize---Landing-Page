# Parkwize Landing Page — Guidelines

Marketing site for Parkwize (by Tecnova). Next.js 15 App Router, React 19, TypeScript (strict), Tailwind CSS 3, `motion`, `lucide-react`. Deployed on Vercel. Server code lives in `src/app/api`: `demo` and `contact` email leads through Resend.

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

- The root layout is `src/app/(landing)/[lang]/layout.tsx`: it renders `<html lang>` from the locale, fonts, top bar and footer. `/` and the old routes (`/dashboard`, `/ai`, `/display`, `/booking`, `/process`) redirect in `next.config.ts`.
- Route files (`page.tsx`, `layout.tsx`) stay short: no large JSX trees. Build sections in `components/sections` and compose them.
- New pages go under `src/app/(landing)/[lang]/<slug>/page.tsx`. Register the slug in `src/lib/navigation.ts`.

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

- Buttons and button-looking links: `Button` / `buttonVariants` from `@/components/ui/button` (variants `brand`, `soft`, `subtle`; sizes `pill`, `pill-lg`, `icon-lg`). Add a variant there instead of restyling ad hoc.
- Variants of any component: `cva`.
- Class merging: `cn()` from `@/lib/utils`.
- Internal links: the localized `Link` from `@/components/navigation/link` (named export, adds the `/en` or `/fr` prefix). External links: plain `<a>` with `rel="noopener noreferrer"` when `target="_blank"`.
- Glass surfaces: the `glass` class from `globals.css`.
- Logo: `ParkwizeLogo` from `@/components/brand/parkwize-logo` (vector, colored with `currentColor`). Do not use the logo image files.
- Sign-in call to action: `SignInLink` from `@/components/layout/top-bar/sign-in-link`.
- Outside-click / Escape handling: `useDismiss`. Scroll lock (iOS safe): `useScrollLock`. Focus trap: `useFocusTrap`. Scrolled state: `useScrolled`.
- Top bar: `TopBar` composes `TopBarNav` (desktop links, active state through `isActivePath`), `SolutionsPanel` (desktop mega menu) and `MobileMenu`. Links come from `PRODUCT_LINKS`, `SOLUTION_LINKS` and `@/lib/navigation` URLs.
- Calls to action: product heroes always say "Book a demo" and go to `DEMO_HREF`; "Get in touch" always goes to `CONTACT_HREF`.
- Small uppercase mono labels (column titles, eyebrows, meta text): the `eyebrow` class from `globals.css`.
- Link lists: `FooterColumn` from `@/components/layout/footer/footer-column` handles internal (localized) and external links.
- Site URLs and page lists (`SIGN_IN_URL`, `DEMO_URL`, `BOOK_CALL_HREF`, `PRODUCT_LINKS`, `LEGAL_LINKS`): `@/lib/navigation`. Never hardcode them in components.
- Page sections: a `<section>` with `bg-surface` and `py-14 sm:py-20`, wrapping a `Container` from `@/components/layout/section/container`. Headings: `SectionHeader` (eyebrow, title, lead, actions, `tone="inverse"` on dark).
- Accented words in titles: wrap them in `*asterisks*` in the dictionary and render with `AccentText`. Never split titles into separate keys for styling.
- CTAs as links: `ButtonLink` from `@/components/ui/button-link` (localized internal links, plain external links, optional arrow).
- Scroll-in animation: `Reveal` from `@/components/motion/reveal`. Animated numbers: `CountUp`. Never animate whole pages with global scripts.
- Images: reference them through `MEDIA` in `@/lib/media` (typed `src`, `width`, `height`) and always pass `sizes`. New images go in `public/images/<group>/` as optimized WebP. Product visuals per product: `PRODUCT_VISUALS` in `@/lib/product-media`. Product lists: `ProductIndex`.
- Closing call to action at the end of every page: `ClosingCta` (P mark, Proudly Canadian, Porsche parked on the footer edge).
- Section kickers: the `kicker` class (bold uppercase sans, `text-deck`). `eyebrow` (mono) is for footer and meta labels only.
- Section textures (Lovable look): `bg-dot-grid` / `bg-dot-grid-sm`, `bg-bay-grid` (skewed parking bays), `bg-bay-lines` (hero verticals), `bg-hero-fade` (hero gradient), plus `PointerSpotlight` inside a positioned section. Sections stay white; texture carries the rhythm.
- Looping videos: `AmbientVideo` with `VIDEOS` from `@/lib/media` (WebM first, MP4 fallback, poster, plays only in view). Long-running animations must pause off screen and under reduced motion.
- A hero that sits under the glass top bar uses the `under-top-bar` class.
- Step-by-step product demos: `StepRail` from `@/components/sections/step-rail` with `useStepCycle` from `@/hooks/use-step-cycle` (auto-advances only in view, stops on click and under reduced motion).
- Product pages: `ProductHero`, `ProductProblem` (icons from `PROBLEM_ICONS` in `@/lib/product-problems`), `ProductSolution`, `ProductFeatures`, `ProductEcosystem` and `ProductResults` from `@/components/sections/product`. Animated value swaps: `SwapValue` from `@/components/motion/swap-value`.
- Partner logo: `ProcessLogo` from `@/components/brand/process-logo` (vector, `currentColor`). Decorative QR codes: `QrGlyph` from `@/components/media/qr-glyph`.
- Phone mock-ups in demos: `DeviceFrame` from `@/components/media/device-frame`. The step title and "behind the scenes" card beside a demo: `DemoStepNote` from `@/components/sections/demo-step-note`.
- Two side-by-side options with a center rule ("ours or yours"): `ModeSplit` from `@/components/sections/mode-split`.
- Lead forms: fields from `@/components/forms` (`TextField`, `SelectField`, `ChipGroup`, `ConsentField`, `FormCard`, `FormGroup`, `FormSubmit`, `FormSuccess`), state with `useLeadForm`, a zod schema in `@/lib/leads/*-schema.ts` shared by the browser and the route, option values in `@/lib/leads/lead-options.ts` (labels in the dictionaries). Routes send with `sendLeadEmail` from `@/lib/leads/send-lead-email`. Bot protection: a hidden `website` honeypot field, plus `isSameOrigin` (403 otherwise) and `isTooFast` (silent drop under 2.5 s, from the `elapsed` that `useLeadForm` sends) from `@/lib/leads/lead-guard`. Lead pages use `LeadHero`.
- Legal pages (privacy policy, terms of use): `LegalPage` from `@/components/sections/legal/legal-page`, content in the `legal` dictionary block as numbered `sections` (`id` anchors, `paragraphs`, `items`, `note`). Bump `updated` in both languages whenever the text changes.
- Lead email environment: `RESEND_API_KEY`, `RESEND_FROM`, and `DEMO_TO` / `CONTACT_TO` (fallback `RESEND_TO`, then the legacy `EARLY_ACCESS_TO`). Empty values fall through to the next one. Without `RESEND_API_KEY` outside production, routes accept the form without sending.
- Top bar surface: on pages with an `under-top-bar` hero the bar is clear (no pill, white text through the `bar-*` tokens) until the page scrolls; then it becomes the white glass pill. Menus use typographic items (`TopBarMenuItem`), no icon tiles.
- Smooth scrolling: Lenis, mounted once by `SmoothScroll` in the root layout. Pause it through `useScrollLock`; scrollable overlays add `data-lenis-prevent`. Programmatic scroll to top: `scrollToTop` from `@/lib/smooth-scroll`.
- Page transitions: the localized `Link` starts `RouteProgress` (top bar) through `startRouteProgress`; `PageFade` in the root layout fades pages in after the first load (no `template.tsx`: next to a root layout in `[lang]` it triggers a Next.js invariant error); `loading.tsx` shows `PageLoader`.
- Selects: `SelectField` is a custom accessible listbox (combobox button, keyboard, typeahead). Never use a native `<select>`.
- Every clickable element shows a pointer cursor through the base rule in `globals.css`; disabled controls show `not-allowed`.
- Animated canvases (`NeuralField`, `DotWordmark`): ref-callback mount, ResizeObserver, pause off screen, single frame under reduced motion.
- If the same markup appears twice, make it a component.

## 5. Design tokens

All visual values come from CSS variables in `src/app/globals.css`, exposed through `tailwind.config.ts`.

- Colors: use token classes (`bg-background`, `text-foreground`, `text-muted-foreground`, `bg-brand`, `text-brand-foreground`, `border-border`, ...). **No hex, `rgb()`, `hsl()` or arbitrary color values in components** (`bg-[#0658f6]` is forbidden). Need a new color? Add a token in `globals.css` and `tailwind.config.ts`.
- Deck palette (from the brand deck): `deck` (`deck-bright`, `deck-tint`), `ink` for headings, `copy` for body text, `hairline` for rules, `ai-panel` for the blue AI panel.
- Brand blue: `brand` (`--brand`).
- Dark surfaces are brand navy, never black: sections use `bg-navy` (cards on navy `bg-navy-raised`), the footer `bg-inverse`, text and rules the `inverse` palette (`text-inverse-foreground`, `text-inverse-muted`, `border-inverse-border`, `hover:text-inverse-hover`). Device bezels in mockups use `bg-bezel`. Inside blue `ai-panel` cards use `border-panel-rule` / `bg-panel-tile`. White text on blue or navy: `text-brand-foreground` or `text-inverse-foreground`, never `text-white`.
- Status colors: `success`.
- Fonts: `font-sans` (Inter) for body text, `font-display` (Poppins) for headings and display text, `font-mono` (JetBrains Mono) only for small uppercase labels (prefer the `eyebrow` class). All come from `next/font` variables in `src/app/(landing)/[lang]/layout.tsx`. Never import fonts elsewhere.
- Radius, shadows, blur: use the theme scale (`rounded-lg`, `shadow-glass`, ...). Arbitrary values are only acceptable for one-off geometry (e.g. a pill radius matching a fixed height).
- Top bar spacing: `--top-bar-height` and `--top-bar-gap` let sections offset content below the floating bar.
- Type scale: `text-display`, `text-h1`, `text-h2`, `text-h3`, `text-lead` (fluid, defined in `tailwind.config.ts` and registered in `cn()`). Use them instead of ad hoc font sizes.
- Surfaces: `bg-surface`, `bg-surface-muted`, `border-surface-border`. Radii: `rounded-2xl` for cards and media, `rounded-3xl` for large panels, `rounded-full` for buttons and pills.
- Colors are CSS variables, so Tailwind opacity modifiers (`bg-brand/20`) do not work on them. Use `opacity-*` or add a token.

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

- Use `motion/react` only.
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
