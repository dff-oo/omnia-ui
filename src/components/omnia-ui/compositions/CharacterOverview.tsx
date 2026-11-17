import type { ReactNode } from "react";
import { Badge } from "../foundations/Badge";
import { ImageFrame } from "../foundations/Media";
import { Panel } from "../foundations/Panel";
import { LevelBadge, RarityMarker, StatBar, StatList } from "../signature/Data";
import { SectionHeading } from "../signature/SectionHeading";
import styles from "./Compositions.module.css";
import type { CharacterSummary } from "./types";

export interface CharacterOverviewProps {
  character: CharacterSummary;
  /** Action strip, e.g. links to equipment or party. */
  actions?: ReactNode;
  headingLevel?: 1 | 2 | 3;
  showArt?: boolean;
}

export function CharacterOverview({ character, actions, headingLevel = 2, showArt = true }: CharacterOverviewProps) {
  const { stats } = character;
  return (
    <Panel surface="raised" className={styles.overview}>
      <div className={styles.overviewGrid}>
        <div className={styles.overviewArt}>
          <ImageFrame
            ratio={3 / 4}
            placeholderHue={character.hue}
            showMissing={!showArt}
            className={styles.overviewArtFrame}
          />
        </div>
        <div className={styles.overviewMain}>
          <SectionHeading
            level={headingLevel}
            size="page"
            eyebrow={`${character.role} · ${character.affinity}`}
            title={<span className={styles.overviewName}>{character.name}</span>}
            description={character.epithet}
          />
          <div className={styles.overviewIdentity}>
            <LevelBadge level={character.level} max={character.maxLevel} progress={character.progress} size={64} />
            <div className={styles.overviewTags}>
              <RarityMarker tier={character.rarity.tier} label={character.rarity.label} />
              <Badge tone="accent">{character.role}</Badge>
              <Badge>{character.affinity}</Badge>
              {character.level >= character.maxLevel && <Badge tone="gold">Max level</Badge>}
            </div>
          </div>
          <StatBar
            label="HP"
            value={stats.hp}
            max={stats.maxHp}
            unit="HP"
            tone={stats.hp / stats.maxHp < 0.3 ? "danger" : "success"}
          />
          <StatList
            items={[
              { label: "Attack", value: stats.attack },
              { label: "Defense", value: stats.defense },
              { label: "Speed", value: stats.speed },
            ]}
            minTileWidth={120}
          />
          {actions && <div className={styles.actionStrip}>{actions}</div>}
        </div>
      </div>
    </Panel>
  );
}
