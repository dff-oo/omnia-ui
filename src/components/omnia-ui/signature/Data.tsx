import { Meter } from "@base-ui/react/meter";
import type { CSSProperties, ReactNode } from "react";
import { cx } from "../lib/cx";
import { clamp, formatCompact, formatNumber } from "../lib/format";
import { meterClasses, meterToneClass, type MeterTone } from "../foundations/Feedback";
import styles from "./Data.module.css";

export type Tone = "neutral" | "success" | "accent" | "violet" | "gold" | "warning" | "danger";

const toneClass = (tone: Tone) => styles[`tone-${tone}`];

/* -------------------------------------------------------------------------- */
/* ResourceCounter                                                            */
/* -------------------------------------------------------------------------- */

export interface ResourceCounterProps {
  /** Resource name, announced with the value (e.g. "Gems"). */
  label: string;
  value: number;
  /** Optional cap, rendered as `value / max`. */
  max?: number;
  icon: ReactNode;
  tone?: Tone;
  /** Abbreviate large numbers (12.4K). The full value is still announced. */
  compact?: boolean;
  className?: string;
}

export function ResourceCounter({ label, value, max, icon, tone = "accent", compact, className }: ResourceCounterProps) {
  const shown = compact ? formatCompact(value) : formatNumber(value);
  const announced = `${label}: ${formatNumber(value)}${max !== undefined ? ` of ${formatNumber(max)}` : ""}`;
  return (
    <span className={cx(styles.resource, toneClass(tone), className)} title={compact ? announced : undefined}>
      <span className={styles.resourceIcon} aria-hidden>
        {icon}
      </span>
      <span className="omnia-sr-only">{announced}</span>
      <span className={styles.resourceValue} aria-hidden>
        {shown}
        {max !== undefined && <span className={styles.resourceMax}> / {formatNumber(max)}</span>}
      </span>
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/* Stat / StatList                                                            */
/* -------------------------------------------------------------------------- */

export interface StatItem {
  label: ReactNode;
  value: ReactNode;
  unit?: string;
  /** Signed change, e.g. `+120` or `-4`. Rendered with an arrow and sign, not colour alone. */
  delta?: number;
  /** Stable key when `label` is not a string. */
  id?: string;
}

function Delta({ value }: { value: number }) {
  if (value === 0) return null;
  const up = value > 0;
  return (
    <span className={cx(styles.delta, up ? styles.deltaUp : styles.deltaDown)}>
      <span aria-hidden>{up ? "▲" : "▼"}</span>
      <span className="omnia-sr-only">{up ? "increased by" : "decreased by"}</span>
      {up ? "+" : "−"}
      {formatNumber(Math.abs(value))}
    </span>
  );
}

function renderValue(value: ReactNode) {
  return typeof value === "number" ? formatNumber(value) : value;
}

export interface StatListProps {
  items: StatItem[];
  /** `tiles`: responsive grid of cards. `rows`: label/value rows like a spec sheet. */
  layout?: "tiles" | "rows";
  /** Minimum tile width before wrapping. */
  minTileWidth?: number;
  className?: string;
}

export function StatList({ items, layout = "tiles", minTileWidth, className }: StatListProps) {
  return (
    <dl
      className={cx(styles.statList, layout === "rows" && styles.statListRows, className)}
      style={minTileWidth ? ({ "--_min": `${minTileWidth}px` } as CSSProperties) : undefined}
    >
      {items.map((item, index) => (
        <div key={item.id ?? (typeof item.label === "string" ? item.label : index)} className={styles.stat}>
          <dt className={styles.statLabel}>{item.label}</dt>
          <dd className={styles.statValue}>
            <span>{renderValue(item.value)}</span>
            {item.unit && <span className={styles.statUnit}>{item.unit}</span>}
            {item.delta !== undefined && <Delta value={item.delta} />}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/** A single label/value pair. Prefer `StatList` for groups so the `<dl>` stays valid. */
export function Stat(props: StatItem & { className?: string }) {
  return <StatList items={[props]} className={props.className} />;
}

/* -------------------------------------------------------------------------- */
/* StatBar                                                                    */
/* -------------------------------------------------------------------------- */

export interface StatBarProps {
  label: ReactNode;
  value: number;
  max: number;
  min?: number;
  tone?: MeterTone;
  /** Unit or suffix for the announced value, e.g. "HP". */
  unit?: string;
  className?: string;
}

/** A measurement within a known range (HP, capacity, affinity). Announces `value of max`. */
export function StatBar({ label, value, max, min = 0, tone = "accent", unit, className }: StatBarProps) {
  const safe = clamp(value, min, max);
  const valueText = `${formatNumber(safe)} of ${formatNumber(max)}${unit ? ` ${unit}` : ""}`;
  return (
    <Meter.Root
      value={safe}
      min={min}
      max={max}
      aria-valuetext={valueText}
      className={cx(meterClasses.root, meterToneClass[tone], className)}
    >
      <Meter.Label className={meterClasses.label}>{label}</Meter.Label>
      <span className={cx(meterClasses.value, styles.statBarValue)} aria-hidden>
        {formatNumber(safe)}
        <span className={styles.statBarMax}> / {formatNumber(max)}</span>
      </span>
      <Meter.Track className={cx(meterClasses.track, styles.statBarTrack)}>
        <Meter.Indicator className={cx(meterClasses.indicator, styles.statBarIndicator)} />
      </Meter.Track>
    </Meter.Root>
  );
}

/* -------------------------------------------------------------------------- */
/* LevelBadge                                                                 */
/* -------------------------------------------------------------------------- */

export interface LevelBadgeProps {
  level: number;
  /** Level cap. Reaching it switches to the gold "maxed" treatment. */
  max?: number;
  /** Progress towards the next level, 0–1. */
  progress?: number;
  size?: 40 | 48 | 64;
  prefix?: string;
  className?: string;
}

export function LevelBadge({ level, max, progress = 0, size = 48, prefix = "Lv", className }: LevelBadgeProps) {
  const maxed = max !== undefined && level >= max;
  const fraction = maxed ? 1 : clamp(progress, 0, 1);
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const label = `Level ${level}${max !== undefined ? ` of ${max}` : ""}${maxed ? ", maximum" : ""}`;

  return (
    <span
      role="img"
      aria-label={label}
      className={cx(styles.level, maxed && styles.levelMaxed, className)}
      style={{ "--_size": `${size}px` } as CSSProperties}
    >
      <svg className={styles.levelRing} viewBox="0 0 48 48" fill="none" aria-hidden>
        <circle className={styles.levelTrack} cx="24" cy="24" r={radius} strokeWidth="3" />
        <circle
          className={styles.levelArc}
          cx="24"
          cy="24"
          r={radius}
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - fraction)}
        />
      </svg>
      <span className={styles.levelText} aria-hidden>
        <span className={styles.levelPrefix}>{prefix}</span>
        <span className={styles.levelNumber}>{level}</span>
      </span>
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/* RarityMarker                                                               */
/* -------------------------------------------------------------------------- */

export interface RarityMarkerProps {
  /** 1-based tier. */
  tier: number;
  maxTier?: number;
  /** Text name of the tier, always rendered (e.g. "Legendary"). */
  label: string;
  /** Override the automatic tier → tone mapping. */
  tone?: Tone;
  /** Hide the pips and show text only. */
  textOnly?: boolean;
  className?: string;
}

const autoTones: Tone[] = ["neutral", "success", "accent", "violet", "gold"];

/** Maps an ordinal tier onto the neutral → gold tone ramp. */
export function toneForTier(tier: number, maxTier = 5): Tone {
  const index = Math.round(((clamp(tier, 1, maxTier) - 1) / Math.max(maxTier - 1, 1)) * (autoTones.length - 1));
  return autoTones[index];
}

/** Ordinal rarity shown with colour, pip count and a text label. */
export function RarityMarker({ tier, maxTier = 5, label, tone, textOnly, className }: RarityMarkerProps) {
  const resolvedTone = tone ?? toneForTier(tier, maxTier);
  return (
    <span className={cx(styles.rarity, toneClass(resolvedTone), className)}>
      {!textOnly && (
        <span className={styles.pips} aria-hidden>
          {Array.from({ length: maxTier }, (_, index) => (
            <span key={index} className={cx(styles.pip, index < tier && styles.pipFilled)} />
          ))}
        </span>
      )}
      <span>
        {label}
        <span className="omnia-sr-only">
          {" "}
          (tier {tier} of {maxTier})
        </span>
      </span>
    </span>
  );
}
