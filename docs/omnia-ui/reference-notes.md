# Omnia UI — reference notes

Interpretive observations from the representative screenshots listed in `docs/omnia-ui.md` §1.2
(R01–R07; R08 is an article page, not an image). The images were viewed temporarily for art
direction and are **not** stored in this repository. Nothing here is a measured specification.

## Observations by category

| Category | What the original does |
|---|---|
| **Home** (R05) | Full-bleed sky/cloud backdrop with the party standing in it. Resource bar top-left: player name, rank, three currencies, each icon + tabular number. Circular orb shortcuts down the left edge. |
| **Navigation** (R01) | Slide-out panel of destinations. Two shapes: round blue orbs (system destinations) and square blue tiles with pictograms (content destinations). Labels are outlined white text over icons. |
| **Characters / gear** (R02) | Hero portrait on the left with a strong coloured aura; dense companion panel on the right. Equipment rows: thumbnail, star rating, name, `Lv 40/40`, `CP` value. Stat list: silver label pills on the left, large right-aligned numbers. |
| **Party** (R03, R07) | Three equal columns or rows. Each member: square portrait, level badge in gold, small equipment icons, HP/BRV values with `current / max`. Section headers sit on a navy plate with angled ends. |
| **Quests / missions** (R03) | Tabs (`Missions / Score / Enemy info`) with small `CLEAR` tags above. Each mission row: goal text, optional "record" value, reward icon with `×10` quantity on the right. |
| **Banners** (R04) | Artwork-led campaign card, framed in gold. Availability pill (`Until 2/28 01:59 UTC`) top-right. Two large CTAs underneath: blue for single, orange for multi, with currency cost. |
| **Rewards / results** (R06) | Grid of item cards. Rarity communicated by **both** frame material (bronze → silver → gold) and star count. The single best result is centred and larger. |
| **Battle / summary** (R07) | Heavy information density: turns, score, party with spheres and passives, empty states written as plain text ("None", "No Support"). |
| **Settings** | Only seen as an orb shortcut (R01/R05); no dedicated screen in the sample. |

## Palette and material

- Foundation is a **desaturated slate/periwinkle blue** for panels and a **deep navy** for title plates, against bright, airy sky art. Panels are mildly translucent.
- Edges are **pale silver hairlines** with a lighter top edge; tiny corner flourishes on major panels.
- **Gold** is reserved: max level numbers, top rarity, "+" upgrade marks, campaign frames.
- Secondary accent colours (orange, green, purple) are used for distinct action categories and passives.
- Crystals appear as motif in art (large crystal above a character in R05, crystal-shard backdrop in R04) rather than as UI chrome.

## Hierarchy and density

- Strong numeric hierarchy: values are large, labels small; `current / max` pairs everywhere.
- Lists are row-based with consistent anatomy (thumbnail → text → value → trailing reward/action).
- Empty states are written in words, centred in the slot.

## Inspiration adopted

- Navy foundation, slate-blue raised planes, pale-silver edge highlight, gold for rare/max states.
- A **title plate with faceted (cut) ends** — reinterpreted as a slim faceted marker in `SectionHeading` and cut corners on `CrystalPanel` only.
- Rarity as **material + count** (never colour-only) → `RarityMarker` shows tier symbol + text label.
- Stat rows with right-aligned tabular numbers and `current / max` → `StatList`, `StatBar`.
- Mission row anatomy (goal → progress → reward → claim) → `MissionList` / `RewardTile`.
- Resource counter: icon + tabular value → `ResourceCounter`.
- Artwork-led banners with an availability pill → `BannerFeature`.
- Crystal as a motif → self-authored SVG `Ornament` (faceted diamond) used sparingly.

## Patterns intentionally modernised

| Original | Omnia UI |
|---|---|
| Outlined/stroked text over art, 10–12px labels | Solid text on opaque or scrimmed surfaces, ≥14px for interactive labels |
| Bevelled metal on every button and frame | Flat fills; signature treatment is an opt-in `surface="signature"` |
| Multiple CTA colours (blue/orange/green) side by side | One primary action per region; secondary/outline for the rest |
| Icon-only orb navigation | Labelled navigation; icons support, not replace, text |
| Dense multi-badge clusters (BT/FR/LD/EX) | `Badge` with text; overflow into details rather than shrinking |
| Persistent UI layered over detailed art | Art in dedicated frames (`ImageFrame`, `BannerFeature`) with a content scrim |
| Fixed 16:9 landscape mobile layout | Responsive single → multi-column layouts, container-query cards |
| Celebratory flashes on results | Calm default; optional brief reveal that respects reduced motion |
