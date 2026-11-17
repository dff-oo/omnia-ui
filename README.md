# Omnia UI

An accessible React design system inspired by the mood of Dissidia Final Fantasy Opera Omnia: midnight
surfaces, cool luminous accents and restrained gold. It is an unofficial fan project. Square Enix owns the game,
and the handful of sprites `GameIcon` loads from [dffoogg/cdn](https://github.com/dffoogg/cdn) are extracted from
the client for interface icons. Everything else is original.

Built with Next.js (App Router), React 19, TypeScript, CSS Modules + CSS custom properties, and
[`@base-ui/react`](https://base-ui.com) as the only component library.

## Run it

```bash
npm install
npm run dev
```

Open <http://localhost:3000/omnia-ui> (`/` redirects there).

| Script | Purpose |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` / `npm start` | Production build / serve |
| `npm run lint` | ESLint |
| `npm run typecheck` | Generates Next route types, then `tsc --noEmit` |

## Showcase

| Route | Contents |
|---|---|
| `/omnia-ui` | Overview |
| `/omnia-ui/foundations` | Palette, themes, type, spacing, radii, elevation, icons |
| `/omnia-ui/components` | Every foundation and signature component with states |
| `/omnia-ui/characters` | Roster (search, filter, sort, grid/list), overview, loading, empty |
| `/omnia-ui/party` | Party editor and equipment comparison |
| `/omnia-ui/quests` | Quest explorer, missions, result summary |
| `/omnia-ui/editorial` | Campaign-style editorial page |
| `/omnia-ui/accessibility` | Playground: zoom, reduced motion, no images, long strings, 320px |

## Using it in another app

The library ships as TypeScript source and CSS Modules, so the consuming Next.js app compiles it. Install from a
pinned commit:

```bash
npm install github:dffoogg/omnia-ui#<commit>
```

```ts
// next.config.ts
const nextConfig: NextConfig = { transpilePackages: ["@dffoogg/omnia-ui"] };
```

Everything is exported from one barrel (inside this repo, `@/components/omnia-ui` is the same barrel):

```tsx
import { Button, Panel, PortraitCard, ThemeSwitcher } from "@dffoogg/omnia-ui";
```

Theme setup in the root layout (see `src/app/layout.tsx`):

```tsx
import "@dffoogg/omnia-ui/tokens.css";
import "@dffoogg/omnia-ui/globals.css";
import { ThemeScript, TooltipProvider } from "@dffoogg/omnia-ui";

<html lang="en" data-omnia-theme="dark" suppressHydrationWarning>
  <head><ThemeScript /></head>
  <body>
    <div className="omnia-root">
      <TooltipProvider>{children}</TooltipProvider>
    </div>
  </body>
</html>
```

`ThemeScript` applies the stored `dark` / `light` / `system` preference before paint. Use `ThemeRoot` to force a
theme on a subtree.

## Layout

```
src/components/omnia-ui/
  styles/        tokens.css (both themes), globals.css
  theme/         ThemeScript, ThemeRoot, ThemeSwitcher
  foundations/   Button, fields, choices, Select, Dialog, Tabs, overlays, feedback, media, surfaces
  signature/     Identity pieces: headings, stats, portraits, equipment, quests, rewards, banners
  compositions/  Demo assemblies on fixture data (not platform contracts)
  icons/         Local SVG icons
src/app/omnia-ui/  Showcase routes
src/fixtures/      Invented sample data (omnia.ts)
```

## Docs

- [Implementation brief](docs/omnia-ui.md)
- [Reference notes](docs/omnia-ui/reference-notes.md)
- [Decision log](docs/omnia-ui/decision-log.md)
- [Component inventory and TODOs](docs/omnia-ui/component-inventory.md)
