# Omnia UI — component inventory

Status key:

- **Done** — implemented to the brief, exported from `@/components/omnia-ui`, shown on the showcase.
- **Partial** — implemented, but part of the brief's API or behaviour is missing (noted).
- **Not implemented** — not built.

"Verified" lists what was actually exercised in a browser (Chromium, via the Cursor browser tool), not what the
code is expected to do. Nothing here has been checked with a screen reader, in forced-colors mode, on a touch
device, or in Firefox/Safari. There are no automated tests yet.

## Phase 1 — foundations

| Component | Status | Notes | Verified |
|---|---|---|---|
| `ThemeRoot`, `ThemeScript`, `ThemeSwitcher`, `ThemeToggle`, `useThemePreference`, `useResolvedTheme` | Done | Replaces `OmniaProvider`. `dark`/`light`/`system`, persisted in `localStorage` (`omnia-theme`), applied before paint, synced across tabs. `ThemeToggle` is one button: it follows the system until used, and choosing the system's own theme clears the stored choice. | Theme switching, persistence across reload, no hydration warnings. Toggle not yet checked in a browser. |
| `OmniaProvider` | Not implemented | No provider is needed: the theme is a CSS attribute and Base UI needs no context. Add one only if shared runtime config appears. | — |
| `Button` | Done | primary/secondary/ghost/outline/danger, sm/md/lg, `loading` (keeps width, `aria-busy`), disabled. `buttonClasses()` styles links as buttons. | Loading demo; contrast. |
| `IconButton` | Done | Required `label` becomes the accessible name. | Accessible names present. |
| `TextField` | Done | Base UI Field: label, description, error, prefix/suffix, required, disabled. | Form validation: errors, `aria-invalid`, `aria-describedby`. |
| `TextArea` | Done | Same chrome; `resize="none" \| "vertical"`. | Rendered in the form demo. |
| `CopyField` | Done (extra) | Read-only value plus a copy button. Announces "Copied." | Not yet checked in a browser. |
| `Checkbox`, `Switch`, `RadioGroup` | Done | Base UI; controlled/uncontrolled, disabled, invalid. Descriptions sit outside the label so they don't join the accessible name. | Accessible name/description wiring; required-checkbox error. |
| `Select` | Done | Base UI; groups, placeholder, disabled options, invalid. | Opened with ArrowDown, choose with Enter, focus returns to trigger. Mouse opening **not** confirmed (the tool's click didn't open it). |
| `Combobox` | Done (extra) | Base UI Combobox; type to filter, `clearable`, `limit`, empty message, invalid, disabled. | Accessible name and description, filtering ("ri" → 2 matches), choosing an option, clear button appears only with a value and returns focus to the input. Keyboard-only selection **not** tested. |
| `Dialog`, `AlertDialog` | Done | Title, description, actions, optional close button. | Dialog: open, Escape, focus return. AlertDialog: initial focus on the safe action, close, focus return. |
| `Tabs` | Done | Base UI; controlled/uncontrolled, disabled tabs. | Click switches panel; panel labelled by tab; disabled tab `aria-disabled`. Arrow-key traversal **not** tested. |
| `Menu` | Done | Groups, separators, danger items. | Open, choose item, status updated. |
| `Popover` | Done | Click or hover-open variants, title/description wiring. | Click-open, labelling, positioning. Hover-open **not** tested. |
| `Tooltip` | Done | Supplementary only; never the sole label. | **Not** tested. |
| `Badge`, `StatusBadge` | Done | Tones include gold/violet; status pairs icon + text. | Contrast in both themes. |
| `Panel`, `Card` | Done | Surfaces, optional heading/actions/footer; `Card` is not clickable. | Visual. |
| `Separator`, `Skeleton`, `Progress` | Done | Progress uses Base UI Meter/Progress semantics with visible value. | Visual; reduced motion stops skeleton shimmer. |
| `EmptyState`, `Callout` | Done | | Roster empty search shows EmptyState. |
| `Toast` | Not implemented | No showcase flow needed one; status messages use `role="status"` regions instead. | — |
| `Avatar`, `ImageFrame`, `ArtPlaceholder` | Done | Fallbacks, shapes, aspect ratio overridable via `--omnia-image-ratio`. | "No images" toggle in the accessibility playground. |
| `SegmentedControl` | Done (extra) | Base UI ToggleGroup; `iconOnly` / `"narrow"`. | Theme switcher and roster layout toggle. |
| Icons | Done | Local SVG, `currentColor`, 20/24 grid, `aria-hidden` unless titled. Includes editor actions (undo, redo, download, upload, link, trash, new file, open folder, sidebar) and zoom, fit, image and copy. | Foundations page grid. |
| `GameIcon` | Done (extra) | Thirteen extracted sprites: cutscene, battle, treasure, move, portal, start, goal, the silver, gold and green helmets, and the `hex-grid`, `hex-event` and `hex-selected` frames (`GAME_HEX_FRAME` gives their line box). Decorative unless `label` is set. Loaded from the CDN's `icons/`. `gameIconSrc` gives the URL for SVG `<image>`; `gameCdnSrc` gives any other CDN file's URL. | Not yet checked in a browser. |

## Phase 2 — signature components

| Component | Status | Notes | Verified |
|---|---|---|---|
| `CrystalPanel` | Done | Same API as `Panel`; decorative edge removed in forced-colors via CSS. | Visual. Forced-colors **not** tested. |
| `SectionHeading` | Done | Optional marker; works with none. | Visual. |
| `Ornament` | Done | `aria-hidden` SVG divider. | Visual. |
| `FeatureAction` | Done | Link or button, never text in images. | Button demo. |
| `ResourceCounter` | Done | Tabular numbers, any resource. | Visual. |
| `Stat`, `StatList` | Done | `<dl>`, optional signed delta with text, not colour only. | Equipment comparison. |
| `StatBar` | Done | Meter semantics, value/max shown as text. | Visual. |
| `LevelBadge` | Done | | Visual. |
| `RarityMarker` | Done | Colour + text/symbol, arbitrary tiers. | Visual. |
| `PortraitCard` | Done | Not clickable unless given `href`. | Long-string and no-image playground modes. |
| `EquipmentSlot` | Done | 44px minimum target, empty state, rarity. | `onSelect` counter demo. |
| `QuestNode` | Partial | Semantic list item/link. **No graph variant.** | Narrow (<480px) layout. |
| `RewardTile` | Done | Locked/claimable/claimed, tile/row layouts. | Claim flow demo. |
| `ResultSummary` | Done | Optional brief celebration, off under reduced motion. | Visual. |
| `BannerFeature` | Done | Focal art, scrim, fallbacks; `immersive` keeps dark tokens over art. | Light/dark contrast of copy over scrim checked manually (audit skips gradients). |

## Phase 3 — demo compositions

| Composition | Status | Notes | Verified |
|---|---|---|---|
| `CharacterOverview` | Done | | Selection via `?c=` on the characters page. |
| `CharacterRoster` | Done | Search, role filter, sort, grid/list toggle, loading and empty states. | Search to "1 of 8"; empty state. |
| `PartyEditor` | Done | 3 slots, move/swap with buttons (no drag), save with `aria-busy`. | Move and save announcements. |
| `EquipmentOverview` | Done | Slots, item details, rarity, stats, comparison deltas. | Visual. |
| `QuestExplorer` | Partial | Chapter tabs + quest list. **No route/graph view.** | Visual. |
| `MissionList` | Done | Progress, rewards, claim / claim all. | "Claimed 30 Gems." announcement. |
| `CampaignBanner` | Not implemented as a separate component | Covered by `BannerFeature` + the editorial page composition. | — |

## Showcase routes

`/omnia-ui` (overview), `/foundations`, `/components`, `/characters`, `/party`, `/quests`, `/editorial`,
`/accessibility` — all under `/omnia-ui`. `/` redirects there.

## Cross-cutting checks performed

- `npm run lint`, `npm run typecheck`, `npm run build`: pass (11 routes; characters is a partial prerender).
- No horizontal overflow on 8 routes × 320/375/768/1024/1440px.
- Automated text-contrast audit (WCAG AA) in dark and light: 0 failures across ~1,200 text elements. Excludes text
  over gradients/images and disabled controls.
- No Next.js runtime or hydration issues on 9 routes in dev.
- Emulated `prefers-reduced-motion`: transition tokens collapse, no running animations.
- Accessibility playground at 200% zoom + 320px frame + long strings + no images.

## TODO

- Add a test runner (Vitest + Testing Library for units, Playwright for keyboard/overflow/contrast checks).
- Real keyboard pass with the physical Tab key (only synthetic key events were available).
- Screen reader pass (NVDA + Chrome, VoiceOver + Safari).
- Forced-colors / Windows High Contrast pass.
- Firefox and Safari pass; touch device pass; 400% reflow check.
- Confirm Select opens with a real mouse press.
- Test Tooltip, hover Popover and Tabs arrow-key navigation.
- `Toast` (only if a real flow needs it).
- `QuestExplorer` / `QuestNode` graph variant (only if it adds meaning).
- Complete the no-JS `prefers-color-scheme` light fallback in `tokens.css` (currently core tokens only).
- Optional `src/components/omnia-ui/README.md` with usage per component.
