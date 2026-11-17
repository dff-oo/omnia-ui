# Omnia UI

> **Status:** implementation brief and Cursor agent kickoff  
> **Target:** Next.js 16 / React 19 / TypeScript  
> **Headless interaction dependency:** `@base-ui/react` only  
> **Design direction:** a modern, refined, fantasy-inflected interface inspired by *Dissidia Final Fantasy Opera Omnia* (DFFOO), **not a recreation of its screens**.

---

## 0. Agent instruction — read this first

You are implementing **Omnia UI**, a cohesive React design system for a modern DFFOO-related website and app. Build an **original, production-quality interface** informed by the original game's mood, not a pixel copy of its mobile UI. The result should feel like a contemporary Square Enix-adjacent product: polished, premium, lucid, cinematic, lightweight and recognisably JRPG-inspired without compromising usability.

**Non-negotiables**

1. **Use `@base-ui/react` as the only component/headless UI library dependency.** Do not install shadcn/ui, Radix, MUI, Chakra, Ant, Headless UI, React Aria, NextUI/HeroUI, daisyUI or other UI component systems. React, Next.js and the project's existing tooling are fine. Do not introduce Tailwind unless it already exists; prefer CSS Modules plus CSS custom properties. Avoid third-party icon packs, animation and class-variance libraries as new runtime dependencies: use local SVG and CSS transitions.
2. Do not trace game UI frames, borders or logos, and do not embed screenshots. Reference screenshots **only for high-level art direction**. Interface chrome is self-authored CSS/SVG. A small set of extracted sprites may live in `game-icons/` (see the decision log): they are the game's own icons, kept apart from the component code, and the project does not present itself as an official Square Enix library.
3. Prioritise platform best practices over game nostalgia: readable text, excellent touch targets, consistent spacing, straightforward layouts, WCAG 2.2 AA as a target, reduced motion, keyboard support, SSR and responsive design.
4. Design-system primitives must not know about DFFOO domain entities. Domain-specific components compose the primitives.
5. **Make it real:** build working, typed components and a browsable showcase route, not a collection of static mockups or isolated style explorations.
6. Inspect the existing repository first. Adapt to its established structure, scripts, styling and conventions. Do not reset unrelated code or rewrite the application shell without good reason.
7. Use the currently installed Base UI version and its **current** documentation at https://base-ui.com/react/overview/quick-start ; confirm exports before coding. Do **not** use legacy `@mui/base` examples.

### Definition of success

A viewer should immediately read the aesthetic as *modern fantasy / crystalline science-fantasy*, while recognising contemporary web design fundamentals. When the artwork is removed, forms, lists, navigation and dialogs should still be excellent modern interfaces.

---

## 1. Research and visual references

### 1.1 Source gallery / broad coverage

- **RPGFan — 68 numbered screenshots:** https://www.rpgfan.com/gallery/dissidia-final-fantasy-opera-omnia-screenshots/  
  Use this as the principal broad screenshot catalogue. Scan the full gallery across varied screens; do **not** assume all 68 images depict unique UI states.
- **RPG Site — DFFOO preview:** https://www.rpgsite.net/preview/6680-dissidia-final-fantasy-opera-omnia-impressions
- **RPG Site — DFFOO guide and imagery:** https://www.rpgsite.net/feature/6696-dissidia-opera-omnia-guide-how-to-reroll-tier-list-equipment-limit-breaks-and-more-in-this-final-fantasy-spin-off-explained
- **Final Fantasy Wiki — screenshot index:** https://finalfantasy.fandom.com/wiki/Category:Dissidia_Final_Fantasy_Opera_Omnia_screenshots
- **Player community character-building guide (screenshots and domain anatomy):** https://www.reddit.com/r/DissidiaFFOO/comments/ewlafh/gl_character_building_guide_for_new_players/
- **Early mobile UI screenshots:** https://learmirror.github.io/lear/dffoo/
- **Gameplay / battle reference:** https://checkpointgaming.net/news/2018/02/dissidia-final-fantasy-opera-omnia-surprise-gem-game/
- **Gacha result reference:** https://www.oldgamehermit.com/2018/02/review-dissidia-final-fantasy-opera-omnia/

### 1.2 Representative individual screenshots

The following original image URLs are for **design research only**. They should not become app dependencies or be hotlinked from the production product.

| Ref | Screen / pattern | Screenshot URL | Extract inspiration from | Do not copy |
|---|---|---|---|---|
| R01 | Main navigation / shortcuts | https://learmirror.github.io/lear/images/Untitled1.png | Clear pictographic destinations, grouping, confident saturated blue | Enamel buttons, uneven text sizes, cramped grid |
| R02 | Equipment / abilities | https://stat.ameba.jp/user_images/20190807/20/takumi57/d2/24/p/o1024076814525481696.png | Character hero area + high-density equipment/stat companion panel | Tiny labels, dramatic gradients on every surface |
| R03 | Missions / rewards | https://livedoor.blogimg.jp/opera_omnia1111/imgs/c/1/c12d4008.jpg | Reward hierarchy, goals, completion status | Dense borders on every row, microscopic text |
| R04 | Gacha banner | https://images.rpgsite.net/image/da49c9a1/63145/original/dissidia-opera-omnia-preview_28.jpg | Hero-art-led promotion with strong action hierarchy | Text laid over visually noisy artwork |
| R05 | Home / currencies | https://images.rpgsite.net/image/da49c9a1/63246/original/dff-opera-omnia-preview_06.jpg | Ambient backdrop, small but recognisable resource icons | Persistently overlaying UI on detailed full-screen art |
| R06 | Multi-draw results | https://www.oldgamehermit.com/wp-content/uploads/2018/02/Screenshot_20180131-212440.png | Reveal hierarchy and rarity differentiation | Casino-like flashes and incessant animation |
| R07 | Post-battle party details | https://truth.bahamut.com.tw/s01/202305/5325837cf01c615b35bad928260f9d84.JPG | Rich, structured character summaries with status markers | Indecipherable icon clusters / tiny hit areas |
| R08 | Battle HUD | https://checkpointgaming.net/news/2018/02/dissidia-final-fantasy-opera-omnia-surprise-gem-game/opera-omnia-battle/ | Strong combat statuses and spatial grouping | HUD density or combat-only patterns in website forms |

**Reference handling:** Create `docs/omnia-ui/reference-notes.md` with observations against the gallery categories (home, navigation, characters, gear, quests, rewards, banners, battle, settings). Do **not** bulk-download or redistribute third-party imagery. If the repository already contains legally supplied screenshots/assets, use them locally for research only and honour its asset policy.

### 1.3 What makes the inspiration recognisable

- **Colour:** midnight/navy foundation, layered blue/cobalt accents, luminous cool highlights, pale-metal neutrals, strategic gold for valuable/special states.
- **Materials:** translucent planes, subtle internal lighting, satin silver edge highlights, rare jewel/glass treatments; *not* faux bevels on every control.
- **Shape:** disciplined rounded rectangles and soft corners, occasional small cut corners / faceted details on **signature components**, not the baseline UI.
- **Hierarchy:** dramatic artwork used sparingly; dense but well-grouped numbers, levels, statuses and equipment information.
- **Motion:** brief, satisfying transitions that communicate selection and progression; no constant shimmer or flashing.
- **Typography:** contemporary highly readable UI font; evocative editorial display treatment used rarely for a hero title or special header. **Do not substitute a narrow decorative font for everyday UI text.**

### 1.4 Deliberate departures from the original

Original DFFOO is a mobile game made for its era. Omnia UI is a modern responsive website and app. Therefore: larger touch targets, simpler navigation, flatter card stacks, less ornamental chrome, no faux-metal default buttons, no artificially narrow content, no raster UI framing, no text baked into art, no glitter on routine interactions, no excessive gradient or shadow stacking.

---

## 2. Product experience and personality

**Design principles, ordered by priority**

1. **Clarity before spectacle:** every surface, state and action readable at a glance.
2. **Premium restraint:** one focal accent per region, not ten competing effects.
3. **Content as hero:** game art and character portraits carry the fantasy; the UI supports them.
4. **Familiar mechanics:** web-native buttons, inputs, menus, search, pagination, filtering and focus management.
5. **Consistent rhythm:** a small spacing, radius, typography and elevation vocabulary.
6. **Accessible by default:** contrast, labels, focus, semantic states, reduced motion.
7. **Composable:** system-level primitives + optional game-specific presentation.

**Aesthetic shorthand:** *celestial / crystalline / elegant / calm / dramatic when earned*.

**Not:** medieval parchment; generic SaaS purple gradients; 90s pixel UI; high-noise sci-fi HUD; literal Square Enix branding.

**Brand boundary:** 'Omnia UI' is an independent fan-made system inspired by DFFOO. Do not imply it is an official Square Enix library. Game sprites in `game-icons/` belong to Square Enix. Logos, screenshots and character art stay out of the component code.

---

## 3. Technology and dependency rules

- **Target environment:** Next.js App Router, React 19, TypeScript strict mode.
- **Single UI library dependency:** `@base-ui/react` for accessible interaction primitives (Dialog, Menu, Select, Tabs, Tooltip, Popover, Switch, Checkbox, etc., where applicable).
- **Styling:** CSS Modules for component styles + global CSS custom properties for tokens. Prefer native CSS capabilities: `color-mix()`, grid, flex, `clamp()`, container queries with graceful fallback. No Sass requirement.
- **Utilities:** tiny local helpers are acceptable; avoid introducing variant or class-composition dependencies.
- **Icons:** local SVG components with `currentColor`, a consistent 20/24px grid, accessible naming, no arbitrary unicode emoji in production controls.
- **Animation:** CSS transitions/keyframes, and `prefers-reduced-motion`; no new animation dependency.
- **Testing:** use whichever React test/E2E tooling exists in the repository; otherwise establish minimal unit and Playwright testing in devDependencies only if practical. Tooling is not a UI runtime dependency.
- **Documentation:** in-repo showcase route and Markdown docs; Storybook optional if already present, but not a prerequisite.
- **Do not use** legacy `@mui/base`, Radix, shadcn, React Aria, Headless UI or prebuilt theme libraries.

**Base UI rule:** use the library where interaction state and assistive technology semantics are challenging; use native `<button>`, `<a>`, `<input>`, `<table>` and semantic HTML when they are the best fit. Do not wrap every native element in Base UI for its own sake.

Server/client boundary: purely presentational components should remain server-compatible; add `'use client'` only to interactive leaf components or showcase controls that need it.

---

## 4. Design tokens (starting proposal; refine by testing)

These are proposed **original** tokens, not measured colours from DFFOO screenshots. Store token values once and reference them throughout components. Use semantic aliases: components should use `--omnia-surface`, never hardcode a hex.

### 4.1 Colour system

| Role | Dark (primary app mode) | Light (site/editorial mode) | Usage |
|---|---|---|---|
| Canvas | `#0B1120` | `#F6F8FC` | Page background |
| Surface 1 | `#141D31` | `#FFFFFF` | Cards and panels |
| Surface 2 | `#1B2942` | `#ECF2FA` | Elevated / inset surfaces |
| Surface 3 | `#263653` | `#E2EAF5` | Hover, gentle emphasis |
| Border | `#354762` | `#CCD6E5` | Structural separators |
| Foreground | `#F4F7FF` | `#142137` | Primary text |
| Muted text | `#ACBBD2` | `#506079` | Secondary labels |
| Accent | `#79B8FF` | `#145ED3` | Selected states / links |
| Accent strong | `#347CDF` | `#1758BB` | Primary button fills |
| Gold | `#E8C779` | `#9C6B18` | Rare / premium emphasis |
| Success | `#63D1A4` | `#197B5A` | Completed / valid |
| Warning | `#F3BF67` | `#8F590E` | Caution |
| Danger | `#FB8292` | `#B42340` | Destructive / error |
| Focus | `#AAD5FF` | `#145ED3` | Visible keyboard focus |

All colours are a **starting palette**. Verify actual foreground/background pairs against WCAG (normal text ≥4.5:1; large text and essential non-text contrast ≥3:1). Do not assume the sample pairings already pass every use case. Build safe accessible variations for button contrast and coloured states.

### 4.2 Geometry

- Spacing scale (px): `4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80`.
- Border radii: `6` (tiny), `10` (controls), `14` (cards), `20` (feature panels), `999` (pills). No arbitrary radius values.
- Button heights: `32` compact, `40` standard, `48` comfortable. Touch-focused controls should provide **at least 44×44px** hit areas even when their visible presentation is smaller. Prefer 48px on mobile.
- Input height: `44` standard, `48` comfortable; never sacrifice usability for game-style density.
- Icon sizes: `16, 20, 24` ordinary, `32` feature/action destinations.
- Content widths: `720px` prose, `1120px` normal app container, `1280px` wide / data layouts. Use `min()` and responsive gutters.
- Page gutters: `16px` mobile, `24px` tablet, `32px` desktop.
- Cards: `16–24px` interior padding; avoid sub-12px padding for content-dense cards except intentionally compact data chips.

### 4.3 Typography

- Default UI: system stack (`Inter` if already bundled/approved; otherwise `ui-sans-serif, system-ui, -apple-system, ...`). Don't add a webfont just to resemble the original game.
- Monospace / numeric: `font-variant-numeric: tabular-nums` for stats, prices, levels, timers, currency.
- Type sizes (px): caption `12`, small `14`, body `16`, lead `18`, section `24`, page `32`, display `40–56` responsive.
- Body line-height `1.5–1.65`, headings `1.15–1.3`.
- Minimum comfortable readable UI labels: `14px` where possible; captions `12px` only for nonessential metadata, never critical interaction labels.
- No all-caps body copy; use restrained tracking on eyebrow labels.

### 4.4 Elevation, effects and motion

- Three shadow levels: `subtle`, `raised`, `overlay`.
- **Signature treatment** (optional variant only): faint blue edge glow + one subtle upper edge highlight + very mild blue-toned gradient. Should disappear cleanly in reduced-transparency or high-contrast contexts.
- Avoid backdrop blur behind text unless an opaque fallback ensures readability.
- Timing: feedback `100–150ms`, panel interactions `160–220ms`, dialogs `200–260ms`.
- Easing: one standard ease-out token and one entrance curve; no bouncing by default.
- Use transform/opacity over layout-affecting animations; disable nonessential motion for `prefers-reduced-motion`.

---

## 5. Design languages: editorial and immersive

Use **the same component APIs** under two appearance modes; do not fork the component system.

- `data-omnia-theme="light"`: light editorial site, clean surfaces, artistic banners, minimal blue accent; suited to landing pages, guides, account pages and content.
- `data-omnia-theme="dark"`: primary immersive app, navy planes, layered edges, gentle luminous accents; suited to characters, equipment, quests, party management and dashboards.

Theme mechanism: CSS variables scoped to a top-level attribute; support system preference when explicit theme absent; ensure portal content uses the same theme variables (place theme on `html` or ensure portaled content inherits the correct theme).

**Visual intensity is independent from theme:** `surface="plain" | "raised" | "signature"` for special panels; `signature` must be rare, not the default card style.

---

## 6. Component architecture and build order

### 6.1 Foundation primitives — Phase 1

Build robust, typed, documented, responsive components first:

| Component | Public API / states | Underlying mechanism |
|---|---|---|
| `OmniaProvider` / `ThemeRoot` | `theme?: 'dark' \| 'light' \| 'system'` | CSS tokens + optional client preference |
| `Button` | `variant=primary/secondary/ghost/outline/danger`, `size=sm/md/lg`, `loading`, `disabled` | native semantic button |
| `IconButton` | `label`, `size`, `variant`, `loading` | button + accessible name |
| `TextField` | label, description, error, prefix/suffix, required, disabled | native input or Base UI Field after API verification |
| `TextArea` | label, description, error, resize policy | native textarea / Field |
| `Checkbox`, `Switch`, `RadioGroup` | controlled/uncontrolled, disabled, invalid | Base UI |
| `Select` | grouped options, placeholder, disabled, invalid | Base UI |
| `Dialog`, `AlertDialog` | title, description, actions, closable | Base UI |
| `Tabs` | label, keyboard nav, controlled/uncontrolled | Base UI |
| `Popover`, `Tooltip`, `Menu` | positioning, escape, focus handling | Base UI |
| `Badge` / `StatusBadge` | tone / size / icon | semantic span |
| `Card` / `Panel` | `surface`, optional heading/actions/footer | semantic HTML |
| `Separator`, `Skeleton`, `Progress` | sizes, states | CSS/native HTML where appropriate |
| `EmptyState`, `Callout`, `Toast` | informative/error/success | accessible semantics; toast only if need exists |
| `Avatar` / `ImageFrame` | fallback, loading, shape | images + CSS |

**No invented feature props:** don't expose `onClick` on `Card` when it isn't interactive. Do not nest buttons inside clickable cards. Support `ref`, `className`, native HTML props, and composition where it is straightforward. Avoid over-generalising APIs prematurely.

### 6.2 Signature Omnia components — Phase 2

These create an original DFFOO-adjacent identity without copying original UI pieces:

| Component | Description | Design constraints |
|---|---|---|
| `CrystalPanel` | Premium section with faint inner blue edge and restrained gradient | Same layout API as `Panel`, decorative styling only |
| `SectionHeading` | Clean heading with optional slim luminous marker | Must work with no ornament |
| `Ornament` | Self-authored CSS/SVG divider or corner mark | `aria-hidden`, sparing usage |
| `FeatureAction` | Large discoverable destination/action | Responsive, semantic link or button, no text in images |
| `ResourceCounter` | Small icon + resource value | Works for any currency/resource; tabular numbers |
| `Stat` / `StatList` | Label-value pairs with optional delta | Uses `<dl>` for descriptions; visible units |
| `StatBar` | Numeric progress / HP-like bar | Semantic progress with value/max; colour never sole indicator |
| `LevelBadge` | Level number and progress | General metadata presentation; no hardcoded rules |
| `RarityMarker` | Ordinal rarity shown with colour + text/symbol | Never colour-only; supports arbitrary tiers |
| `PortraitCard` | Artwork + title + metadata + optional indicators | Image crop safe; card not clickable by default |
| `EquipmentSlot` | Equipment image / empty state / rarity / action | 44px minimum target; contextual actions accessible |
| `QuestNode` | Clickable destination/status in a graph or list | Prefer semantic list; graph variant only when useful |
| `RewardTile` | Item, quantity, unlocked/claimed state | Clear claim actions and disabled states |
| `ResultSummary` | Accomplishment / loot presentation | Calm default, optional brief celebratory motion |
| `BannerFeature` | Artwork-led editorial campaign banner | Focal subject + readable content gradient + fallbacks |

Everything above is a UI component, **not gameplay logic**. Domain-specific APIs go in feature adapters if necessary.

### 6.3 Domain assemblies — Phase 3 (demonstrations, not platform contracts)

- `CharacterOverview`: portrait + title + level + essential status + an action strip.
- `CharacterRoster`: search, filter, grid/list toggle, empty/loading states; avoid rerendering a whole roster unnecessarily.
- `PartyEditor`: 3-member party slots, swap/change actions, responsive multi-column arrangement; no inaccessible drag-only workflows.
- `EquipmentOverview`: slots, item details, rarity, stats, comparison.  
- `QuestExplorer`: quest list plus optional route/graph navigation when it adds meaning.
- `MissionList`: task goal, progress, reward and claim state.
- `CampaignBanner`: hero art, copy, CTA and availability/currency details.

Use **fixture data with clear interfaces**. Do not invent real game formulas, pull probabilities, weapon availability, release banners or progression rules. Scope is component quality, not DFFOO game mechanics.

---

## 7. Page-level compositions for the visual showcase

Ship `/omnia-ui` in the app (or `/dev/omnia-ui` if the repository convention requires). It is a documentation/demo route, not a public game feature. Include navigation to:

1. **Foundations:** palette, typography, spacing, radius, shadows, icons, button/input states, dark and light.
2. **Components:** every component including loading, empty, invalid, disabled, hover, focus-visible and selected states.
3. **Characters:** realistic illustrative character roster and detail page with art placeholders.
4. **Party / Equipment:** 3-slot party and inventory-style lists using fixture data.
5. **Quests & Rewards:** clean quest list, grouped missions, progress display and reward cards.
6. **Editorial / Campaign:** page header, hero banner, feature cards, tabs and footer.
7. **Accessibility playground:** keyboard/focus flow, increased text zoom, reduced motion, no image, long string, dark/light and narrow viewport.

The objective is a coherent UI kit, **not** building the real game or copying any specific DFFOO screen.

---

## 8. Interaction and accessibility requirements

- WCAG 2.2 AA target; test actual rendered combinations rather than blindly relying on tokens.
- Proper semantic elements and ARIA via Base UI where appropriate; use native semantics where simpler.
- All interactive targets keyboard-accessible. No clickable `<div>` or hover-only disclosure.
- Explicit, high-contrast `:focus-visible` for all interactive elements; never remove without replacement.
- Respect focus trapping, return focus, escape dismissal and popup positioning via Base UI.
- Form fields: persistent labels, descriptions/errors connected to fields, required and disabled states, visible validation.
- Distinguish error/success/rarity states with text or icon as well as colour.
- Accessible loading: `aria-busy` / state announcements as appropriate; avoid repetitive live-region chatter.
- Decorative illustration marked as decorative; meaningful art has alt text. Avoid redundant alt text and artwork carrying crucial copy.
- Responsive at 320, 375, 768, 1024 and 1440px; no horizontal scrolling in primary layouts (except intentional horizontally scrollable data with accessibility affordances).
- Robust at 200% text zoom; address 400% reflow where applicable.
- Test reduced motion, high contrast / forced colors and long localisation strings.
- Dark and light modes maintain usable contrast and elevation.
- Prefer true links for navigation, true buttons for mutations, dialogs only for decisions requiring interruption.

---

## 9. Responsiveness and content density

**Mobile:** single-column primary content, compact site header, bottom navigation only if product IA warrants it, no forced desktop-style control panels. Character portraits should not push all useful actions beneath the fold.

**Tablet:** two-column content where it improves scannability; side sheet or drawer only for secondary operations. Keep actions discoverable.

**Desktop:** max-width constraints, optional side navigation, denser multi-column party/equipment layouts, tables only for genuinely tabular content. Resist stretching controls to the full width of a 1440px layout.

Define `comfortable` as the default density and optional `compact` **only** for data-heavy game screens. Compact mode should adjust whitespace and typography judiciously without shrinking hit targets in touch contexts. Use container queries for card composition where helpful, rather than breakpoint-only hacks.

---

## 10. Sample APIs to aim for (adapt after verifying Base UI)

```tsx
<OmniaTheme theme="dark">
  <Panel surface="raised">
    <SectionHeading title="Characters" description="Manage your roster" />
    <CharacterRoster characters={fixtures.characters} />
  </Panel>
</OmniaTheme>
```

```tsx
<Button variant="primary" size="md">Save party</Button>
<Button variant="secondary">View equipment</Button>
<CrystalPanel>
  <StatList items={[{ label: 'Level', value: 90 }, { label: 'HP', value: '12,400' }]} />
</CrystalPanel>
```

These are **API illustrations**, not necessarily initial implementations. Check type fidelity; do not build a generic mega-component to support every possible use case.

### Component design rules

- Expose semantic style variants (`primary`, `secondary`, `danger`) rather than hardcoded colour props (`blue`, `purple`).
- Prefer normal composition (`children`, named slots where needed) to huge configuration objects.
- Ensure controlled and uncontrolled forms follow React and Base UI conventions.
- Preserve HTML escape hatches appropriately: `className`, `style`, `ref`, underlying native props; avoid leaking private state props to DOM.
- Avoid duplicated implementation between `Panel` and `CrystalPanel`: share an internal foundation or variant.
- Make loading, zero states and errors first-class, not last-minute screenshots.
- Class names and CSS custom properties should be prefixed/namespaced to avoid collisions.

---

## 11. Suggested repository layout

Adapt to the existing monorepo or application boundaries; do not force a new package before knowing the repository.

```text
src/
  components/
    omnia-ui/
      index.ts
      foundations/
        Button.tsx
        Button.module.css
        Panel.tsx
        Panel.module.css
        Dialog.tsx
        ...
      signature/
        CrystalPanel.tsx
        ResourceCounter.tsx
        StatBar.tsx
        RarityMarker.tsx
        ...
      compositions/
        CharacterRoster.tsx
        PartyEditor.tsx
        ...
      icons/
      styles/
        tokens.css
        themes.css
        globals.css
      README.md
  app/
    omnia-ui/
      page.tsx
      ...
docs/
  omnia-ui/
    reference-notes.md
    component-inventory.md
    decision-log.md
```

If existing apps have a shared workspace package convention and the design system will be reused, promote it to `packages/omnia-ui` **after** verifying the workspace build and styles strategy. Keep package exports, CSS imports and client/server boundaries explicit.

---

## 12. Execution plan for the Cursor agent

### Step 0 — repository reconnaissance

- Inspect `package.json`, lockfile, Next/React versions, App Router structure, CSS/Tailwind setup, TypeScript config, formatting, testing and existing UI library dependencies.
- Report intended file changes and any conflicts with this brief. Preserve established conventions.
- Confirm `@base-ui/react` component APIs from latest docs or installed types; do not guess imports.
- Create a short `docs/omnia-ui/decision-log.md` including why each choice was made.

### Step 1 — articulate reference findings

- Review **multiple categories** across the 68-image gallery and the representative images above.
- Write a **short, concrete** visual audit under `docs/omnia-ui/reference-notes.md`: palette, material qualities, hierarchy, density, character presentation, information/status markers.
- Separate `inspiration adopted` from `patterns intentionally modernised`.
- Do not let historical screenshot pixel dimensions become modern design specs.

### Step 2 — tokens and baseline

- Implement `tokens.css`, light/dark theme scopes, typography baseline, sensible global reset with no unintended impact to existing application.
- Create a showcase with token swatches and type/spacing specimens.
- Implement signature styling in CSS, but keep it rare and adjustable.

### Step 3 — foundations

- Implement `Button`, `IconButton`, `Panel`, `Card`, `TextField`, `Badge`, `Tabs`, `Dialog`, `Select`, `Tooltip`, `Menu` and other commonly needed primitives.
- Validate Base UI behaviour and accessibility.
- Demo all documented states and both themes.

### Step 4 — original game-inspired components

- Implement `CrystalPanel`, `FeatureAction`, `ResourceCounter`, `StatBar`, `RarityMarker`, `PortraitCard`, `EquipmentSlot`, `RewardTile` and `BannerFeature`.
- Use neutral fixtures and placeholders instead of borrowing game assets.

### Step 5 — believable screen compositions

- Build Character Roster, Party Editor, Equipment Overview, Quest/Mission View and a Website Landing composition.
- Design these for **web**, using modern density and navigation, not DFFOO mobile screen geometry.

### Step 6 — hardening

- Test sizes, keyboard navigation, pointer/touch, light/dark, long labels, no artwork, loading/empty/errors and reduced motion.
- Run lint, typecheck, tests and build; fix failures.
- Check accessibility with automated and manual keyboard checks; document known gaps.
- Eliminate dead exports, one-off magic values, duplicated styles, accidental heavy client bundles and unnecessary dependencies.

### Step 7 — deliver

- Update `docs/omnia-ui/component-inventory.md` with completion status.
- Provide a summary of files created, key design decisions, how to open the showcase and which interactions were actually tested.
- List any remaining work as explicit TODOs; do not mark unimplemented components as done.

---

## 13. Acceptance criteria / release bar

- [ ] Runs under the repository's current Next.js/React versions.
- [ ] `@base-ui/react` is the **only headless/component library dependency** introduced.
- [ ] No shadcn, Radix, React Aria, MUI, Chakra, Headless UI or generic component-library dependency introduced.
- [ ] Every component uses shared semantic design tokens; no inexplicable one-off colours, radii or spacing.
- [ ] Theme switching is reliable, including overlays/portals; polished light and dark modes.
- [ ] Core inputs, controls, tabs, menus, dialogs and tooltips function with keyboard and mouse/touch.
- [ ] Visible focus, informative labels, validation and disabled/loading states.
- [ ] Original visuals; no traced DFFOO panels, screenshot fragments or borrowed game assets.
- [ ] UI coherent at mobile, tablet and desktop widths and at text zoom.
- [ ] Showcase includes primitive specimens and believable character/party/equipment/quest/editorial compositions.
- [ ] Components are typed and exported through one public API barrel.
- [ ] Avoids hydration warnings and unnecessary `use client` boundaries.
- [ ] No horizontal overflows or text clipping under tested viewports.
- [ ] Lint/typecheck/build/test pass (report any environment blockers explicitly).
- [ ] Documented decisions and reference findings exist.

### Quality judgment

Reject the implementation if it looks like generic shadcn with a dark-blue coat of paint **or** if it looks like a literal 2018 phone-game UI. Aim for a contemporary, refined interface with modest but unmistakable crystalline fantasy DNA.

---

## 14. Ready-to-paste Cursor agent prompt

> Read `OMNIA_UI.md` in full and implement Omnia UI in this repository. This is a **modern, original** React component system inspired by DFFOO's atmosphere and art direction, not a screen recreation. Use **only `@base-ui/react` as the headless/component library dependency**, with CSS Modules, native CSS, TypeScript and locally authored SVG. First inspect the repository and check the current Base UI APIs. Then carry out the execution plan from Step 0 through Step 7, prioritising a working `/omnia-ui` showcase, accessible foundations, semantic design tokens, coherent dark/light themes, signature Omnia components and polished character/party/equipment/quest/editorial demonstrations. Treat all historical screenshots only as research. Follow the acceptance criteria, run available checks, document actual outcomes, and make sensible implementation choices without asking for confirmation at every step. Do not install shadcn/Radix/MUI/etc or add decorative effects that reduce clarity. Continue until the showcase and core design-system components are genuinely usable.

---

## 15. Official technical reference

- Base UI overview: https://base-ui.com/react/overview/about
- Base UI quick start: https://base-ui.com/react/overview/quick-start
- Base UI styling: https://base-ui.com/react/handbook/styling
- Base UI accessibility: https://base-ui.com/react/overview/accessibility

**Last researched:** 17 November 2026. This document proposes a design and implementation approach; screenshot observations are interpretive rather than measured specifications.
