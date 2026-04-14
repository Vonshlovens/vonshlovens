# Design System

Status: Aspirational — tokens are wired in `src/app.css`; component library is being built up as pages land.

The blog's visual identity is **Brutalist Archive**: cream paper, heavy ink, zero radius, hard offset shadows, and mono metadata. The source mockups live at [`docs/init-design.md`](../docs/init-design.md) — treat that file as the art direction reference; treat this file as the rules that make output feel like the same site from page to page.

## Principles

1. **Structure is visible.** Borders, rules, and grid lines are the ornament. No soft shadows, no gradients, no rounded corners.
2. **Type does the work.** Scale and weight carry hierarchy before color does.
3. **Craft on load.** No layout shift, no FOUT/FOIT flashes. Fonts are preloaded; tokens resolve before first paint.
4. **Motion is physical.** Hover lifts the element up and to the left; active press returns it to zero. No fades, no eases longer than 150ms.

## Color

All colors are defined as CSS custom properties in `src/app.css` under `@theme`. Reference them via Tailwind utilities (`bg-surface`, `text-ink`, `border-ink`) — never inline hex.

### Light (default)

| Token | Hex | Use |
| --- | --- | --- |
| `--color-surface` | `#fbfbe2` | Page background, top-level containers |
| `--color-surface-container` | `#efefd7` | Raised cards, sidebars |
| `--color-surface-container-high` | `#eaead1` | Secondary cards |
| `--color-surface-container-highest` | `#e4e4cc` | Pressed/hover states, tag chips |
| `--color-surface-dim` | `#dbdcc3` | Dim backdrops (rare) |
| `--color-ink` | `#1b1d0e` | Body text, borders, rules |
| `--color-ink-muted` | `#474747` | Secondary text, captions |
| `--color-rule` | `#777777` | Subtle dividers |
| `--color-rule-faint` | `#c6c6c6` | Tertiary dividers |
| `--color-accent` | `#000000` | Buttons, selection, high-contrast blocks |
| `--color-on-accent` | `#fbfbe2` | Text on accent |
| `--color-danger` | `#ba1a1a` | Errors only |

### Dark

Activated via `.dark` on `<html>`. Cream stays warm; black becomes near-black (not pure).

| Token | Hex |
| --- | --- |
| `--color-surface` | `#1A1A1A` |
| `--color-surface-container` | `#232320` |
| `--color-surface-container-high` | `#2a2a25` |
| `--color-surface-container-highest` | `#303221` |
| `--color-ink` | `#f2f2da` |
| `--color-ink-muted` | `#a8a89a` |
| `--color-rule` | `#777777` |
| `--color-rule-faint` | `#3b3b3b` |
| `--color-accent` | `#f2f2da` |
| `--color-on-accent` | `#1A1A1A` |

## Typography

Three families. Don't add more without an ADR.

| Role | Family | Tailwind class |
| --- | --- | --- |
| Display / headlines | **Space Grotesk** (variable, 300–900) | `font-display` |
| Body prose | **Inter** (variable, 300–700) | `font-sans` (default) |
| Labels / metadata / code | **JetBrains Mono** (variable, 100–800) | `font-mono` |

### Rules

- Headlines: `font-display`, `font-black` (900), `tracking-tighter`, `uppercase`, `leading-[0.85]` to `leading-none`.
- Labels and metadata (dates, tags, byline micro-text): `font-mono`, `uppercase`, `tracking-widest` (≥ 0.1em), usually `text-xs` or `text-[0.6875rem]`.
- Body prose: `font-sans`, `leading-relaxed`, measure capped at `max-w-prose` (~65ch).
- Display scale is fluid: `text-[clamp(3rem,10vw,8rem)]` for hero, `text-[clamp(2rem,6vw,4.5rem)]` for page titles.
- Never use `font-weight` below 400 for body; below 700 for headlines.

## Layout & grid

- Page gutter: `px-6` mobile, scales up via container padding. Max content width: `max-w-7xl` for landing pages, `max-w-6xl` for article shells, `max-w-prose` for body copy.
- Default grid: 12 columns (`md:grid-cols-12`), `gap-8`. Bento layouts are asymmetric by design — don't normalize them into equal columns.
- Section labels use the horizontal-rule sandwich: `<hr class="flex-grow"> LABEL <hr class="flex-grow">`.
- Numbered lists (archive entries, collections) use a 2-digit prefix column (`01`, `02`) in `font-mono`.

## Borders, shadows, radius

- **Radius:** always 0. The `--radius-*` scale is reset to `initial` in `@theme` so `rounded-*` utilities are no-ops. The one exception: `rounded-full` remains available for avatar circles and pill dots (reserved via `--radius-full`).
- **Borders:** 2px or 4px, `solid`, `border-ink`. No other colors, no dashed/dotted.
- **Offset shadows (signature):** `shadow-brut` / `shadow-brut-lg` / `shadow-brut-xl` = `Npx Npx 0 0 var(--color-ink)` at 4/8/12px. Use on cards, buttons, and interactive tiles.

## Interaction & motion

- Default interactive transition: `transition-transform duration-100` — snappy, not smooth.
- **Hover (elevated elements):** `hover:-translate-x-0.5 hover:-translate-y-0.5` plus a larger shadow step.
- **Active press:** `active:translate-x-0 active:translate-y-0 active:shadow-none` — the card "slams down."
- **Hover (flat elements, links, list rows):** `hover:bg-ink hover:text-surface` invert. No underline fade.
- Respect `prefers-reduced-motion`: scope transforms inside `@media (prefers-reduced-motion: no-preference)`.

## Imagery

- Photography is grayscale and high-contrast by default: `grayscale contrast-125`. Color images are a deliberate editorial choice, not the norm.
- Every `<img>` needs a concrete `data-alt` prop describing the shot — it doubles as prompt material for generated art.
- Figures get a `FIG. NN: LABEL` caption in `font-mono uppercase tracking-widest`.

## Icons

Material Symbols Outlined, variable settings `'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24`. Loaded globally; reference with `<span class="material-symbols-outlined">name</span>`. Keep glyphs monochrome — color comes from `currentColor`.

## Components (built on bits-ui)

Wrap bits-ui primitives with these house styles. Component files live under `src/lib/components/ui/`. Rules of thumb:

- **Button:** 4px ink border, offset shadow, hover-lift, active-slam. Variants: `solid` (ink bg, cream text), `outline` (transparent bg, ink border), `ghost` (no border, hover inverts).
- **Card:** 4px ink border, 8px offset shadow. Hover raises to 12px offset.
- **Tag / chip:** 2px border, `font-mono text-xs uppercase tracking-widest`, `px-2 py-1`.
- **Dialog / menu / popover (bits-ui):** square corners, ink border, shadow-brut-lg. No scrim blur.

## Accessibility floor

- Contrast: ink-on-surface and ink-muted-on-surface must both hit WCAG AA for body text; display text AA-large is acceptable.
- Focus rings: 2px solid `--color-accent`, 2px offset. Never remove focus outlines without providing a visible replacement.
- `prefers-reduced-motion: reduce` disables translate transitions; hover state still changes appearance via border/shadow swap.
- `prefers-color-scheme: dark` flips the default only if the user hasn't explicitly chosen a theme.
