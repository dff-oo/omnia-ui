"use client";

import { useState, type CSSProperties } from "react";
import {
  Button,
  CharacterOverview,
  cx,
  GemIcon,
  LevelBadge,
  Panel,
  PortraitCard,
  Progress,
  QuestNode,
  RarityMarker,
  RewardTile,
  SegmentedControl,
  StatusBadge,
  Switch,
  TicketIcon,
} from "@/components/omnia-ui";
import type { CharacterSummary } from "@/components/omnia-ui";
import shared from "../_showcase/showcase.module.css";
import styles from "./playground.module.css";

type Zoom = "1" | "1.5" | "2";

const longText = {
  name: "Elowen Marisanthe-Delacroix of the Ninth Spire, Keeper of the Eastern Archive",
  quest: "An Unreasonably Long Quest Title That Should Wrap Without Overflowing Its Container",
  reward: "Extraordinarily Rare Prismatic Summoning Ticket",
};

export function Playground({ character }: { character: CharacterSummary }) {
  const [zoom, setZoom] = useState<Zoom>("1");
  const [reduceMotion, setReduceMotion] = useState(false);
  const [noImages, setNoImages] = useState(false);
  const [long, setLong] = useState(false);
  const [narrow, setNarrow] = useState(false);

  const subject = long ? { ...character, name: longText.name } : character;
  const image = noImages ? { showMissing: true } : { placeholderHue: character.hue };

  return (
    <div className={shared.stack}>
      <Panel surface="plain" heading="Simulation controls" headingLevel={2}>
        <div className={styles.controls}>
          <div className={styles.control}>
            <span className={styles.controlLabel} aria-hidden>
              Text zoom
            </span>
            <SegmentedControl<Zoom>
              label="Text zoom"
              value={zoom}
              onValueChange={setZoom}
              options={[
                { value: "1", label: "100%" },
                { value: "1.5", label: "150%" },
                { value: "2", label: "200%" },
              ]}
            />
          </div>
          <Switch label="Reduced motion" checked={reduceMotion} onCheckedChange={setReduceMotion} />
          <Switch label="No images" checked={noImages} onCheckedChange={setNoImages} />
          <Switch label="Long strings" checked={long} onCheckedChange={setLong} />
          <Switch label="320px frame" checked={narrow} onCheckedChange={setNarrow} />
        </div>
        <p className={shared.note}>
          Zoom here uses CSS <code>zoom</code> to approximate browser zoom; verify with real browser zoom (Ctrl/Cmd +)
          too. Reduced motion applies <code>data-omnia-motion=&quot;reduce&quot;</code> to the preview only.
        </p>
      </Panel>

      <div className={styles.stage}>
        <div
          className={cx(styles.frame, narrow && styles.narrow)}
          style={{ zoom } as CSSProperties}
          data-omnia-motion={reduceMotion ? "reduce" : undefined}
        >
          <CharacterOverview character={subject} headingLevel={3} showArt={!noImages} />

          <div className={shared.grid3}>
            <PortraitCard
              title={subject.name}
              subtitle={subject.epithet}
              image={image}
              overlayStart={<LevelBadge level={subject.level} max={subject.maxLevel} progress={subject.progress} size={40} />}
              meta={<RarityMarker tier={subject.rarity.tier} label={subject.rarity.label} />}
              headingLevel={3}
            />
            <div className={shared.stack}>
              <QuestNode title={long ? longText.quest : "Where the Crystals Sing"} status="current" eyebrow="Stage 3" href="#" />
              <QuestNode title="Echoes Beneath" status="locked" eyebrow="Stage 5" />
              <Progress label="Chapter progress" value={3} max={5} valueLabel="3 of 5 stages" />
            </div>
          </div>

          <div className={shared.grid3}>
            <RewardTile name="Gems" icon={<GemIcon size={24} />} quantity={1200} state="claimable" onClaim={() => {}} />
            <RewardTile
              name={long ? longText.reward : "Summon ticket"}
              icon={<TicketIcon size={24} />}
              quantity={1}
              tone="violet"
              state="claimed"
            />
          </div>

          <div className={shared.row}>
            <StatusBadge status="success">Cleared</StatusBadge>
            <StatusBadge status="warning">{long ? "Expires in 2 days, 14 hours and 3 minutes" : "Expiring"}</StatusBadge>
            <Button variant="primary">Continue</Button>
            <Button variant="secondary" loading>
              Syncing
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
