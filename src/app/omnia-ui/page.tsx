import type { Metadata } from "next";
import {
  CoinIcon,
  CompassIcon,
  CrystalPanel,
  FeatureAction,
  GameIcon,
  type GameIconName,
  GemIcon,
  GridIcon,
  Ornament,
  PartyIcon,
  ResourceCounter,
  ScrollIcon,
  SectionHeading,
  SettingsIcon,
  SparkleIcon,
  StatusBadge,
  TicketIcon,
} from "@/components/omnia-ui";
import { resources } from "@/fixtures/omnia";
import styles from "./_showcase/showcase.module.css";

export const metadata: Metadata = { title: "Overview" };

const markers = ["cutscene", "battle", "treasure", "move", "portal", "start", "goal"] as const satisfies readonly GameIconName[];

const destinations = [
  {
    href: "/omnia-ui/foundations",
    icon: <SparkleIcon size={24} />,
    title: "Foundations",
    description: "Palette, type, spacing, radii, elevation and icons in both themes.",
  },
  {
    href: "/omnia-ui/components",
    icon: <GridIcon size={24} />,
    title: "Components",
    description: "Every primitive with loading, empty, invalid, disabled and selected states.",
  },
  {
    href: "/omnia-ui/characters",
    icon: <PartyIcon size={24} />,
    title: "Characters",
    description: "Searchable roster and a character detail composition.",
  },
  {
    href: "/omnia-ui/party",
    icon: <SettingsIcon size={24} />,
    title: "Party & equipment",
    description: "Three-slot party editor and equipment comparison.",
  },
  {
    href: "/omnia-ui/quests",
    icon: <CompassIcon size={24} />,
    title: "Quests & rewards",
    description: "Quest list, grouped missions, claim flows and a result summary.",
  },
  {
    href: "/omnia-ui/editorial",
    icon: <ScrollIcon size={24} />,
    title: "Editorial",
    description: "Campaign banner, feature cards, tabs and footer for a content site.",
  },
];

export default function OverviewPage() {
  return (
    <div className={styles.page}>
      <SectionHeading
        level={1}
        size="display"
        eyebrow="Design system"
        title="Omnia UI"
        description="A calm, crystalline interface language for modern fantasy products. Accessible primitives on Base UI, with signature details used only where they are earned."
      />

      <div className={styles.row} aria-label="Example resources" role="group">
        <ResourceCounter label="Gems" value={resources.gems} icon={<GemIcon size={16} />} />
        <ResourceCounter label="Coins" value={resources.coins} icon={<CoinIcon size={16} />} tone="gold" compact />
        <ResourceCounter label="Summon tickets" value={resources.tickets} max={10} icon={<TicketIcon size={16} />} tone="violet" />
        <StatusBadge status="success">Base UI only</StatusBadge>
      </div>

      <section className={styles.section} aria-labelledby="markers">
        <SectionHeading id="markers" title="Game icons" description="Sprites from the game client. Square Enix owns them; Omnia does not redraw them." />
        <div className={styles.row}>
          {markers.map((name) => (
            <span key={name} style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
              <GameIcon name={name} size={32} />
              <span style={{ fontSize: 13, textTransform: "capitalize" }}>{name}</span>
            </span>
          ))}
        </div>
      </section>

      <section className={styles.section} aria-labelledby="explore">
        <SectionHeading id="explore" title="Explore the system" />
        <div className={styles.grid2}>
          {destinations.map((destination) => (
            <FeatureAction key={destination.href} {...destination} />
          ))}
        </div>
      </section>

      <Ornament />

      <CrystalPanel
        heading="Principles"
        description="Ordered by priority. When two conflict, the earlier one wins."
      >
        <ol className={styles.stack}>
          <li>
            <strong>Clarity before spectacle.</strong> Every surface, state and action readable at a glance.
          </li>
          <li>
            <strong>Premium restraint.</strong> One focal accent per region — this panel is the only signature surface on
            the page.
          </li>
          <li>
            <strong>Content as hero.</strong> Artwork carries the fantasy; the interface supports it.
          </li>
          <li>
            <strong>Familiar mechanics.</strong> Real links, buttons, inputs, menus and focus management.
          </li>
          <li>
            <strong>Accessible by default.</strong> Contrast, labels, focus, semantic states and reduced motion.
          </li>
        </ol>
      </CrystalPanel>
    </div>
  );
}
