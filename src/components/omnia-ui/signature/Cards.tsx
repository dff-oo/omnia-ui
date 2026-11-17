import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { ArrowRightIcon, CheckIcon, ChevronRightIcon, CompassIcon, LockIcon, PlusIcon, SuccessIcon } from "../icons";
import { cx } from "../lib/cx";
import { formatNumber } from "../lib/format";
import { Button } from "../foundations/Button";
import { ImageFrame, type ImageFrameProps } from "../foundations/Media";
import { RarityMarker, type RarityMarkerProps, type Tone } from "./Data";
import dataStyles from "./Data.module.css";
import styles from "./Cards.module.css";

const toneClass = (tone: Tone) => dataStyles[`tone-${tone}`];

/* -------------------------------------------------------------------------- */
/* FeatureAction                                                              */
/* -------------------------------------------------------------------------- */

interface FeatureActionBaseProps {
  icon: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  /** Small status next to the title, e.g. a `Badge`. */
  badge?: ReactNode;
  className?: string;
}

export type FeatureActionProps = FeatureActionBaseProps &
  (
    | ({ href: string } & Omit<ComponentPropsWithoutRef<typeof Link>, "href" | "title" | "className">)
    | ({ href?: undefined } & Omit<ComponentPropsWithoutRef<"button">, "title" | "className">)
  );

/** Large, discoverable destination (link) or action (button). */
export function FeatureAction({ icon, title, description, badge, className, ...rest }: FeatureActionProps) {
  const content = (
    <>
      <span className={styles.featureIcon} aria-hidden>
        {icon}
      </span>
      <span className={styles.featureText}>
        <span className={styles.featureTitleRow}>
          <span className={styles.featureTitle}>{title}</span>
          {badge}
        </span>
        {description && <span className={styles.featureDescription}>{description}</span>}
      </span>
      <ArrowRightIcon className={styles.featureArrow} />
    </>
  );

  if (rest.href !== undefined) {
    return (
      <Link className={cx(styles.feature, className)} {...rest}>
        {content}
      </Link>
    );
  }
  return (
    <button type="button" className={cx(styles.feature, className)} {...rest}>
      {content}
    </button>
  );
}

/* -------------------------------------------------------------------------- */
/* PortraitCard                                                               */
/* -------------------------------------------------------------------------- */

export interface PortraitCardProps {
  title: ReactNode;
  subtitle?: ReactNode;
  /** Link for the title. The card itself never becomes a click target. */
  href?: string;
  image?: Omit<ImageFrameProps, "ratio" | "className">;
  ratio?: number;
  /** Overlaid on the artwork (top start / top end). Keep to compact elements like `LevelBadge`. */
  overlayStart?: ReactNode;
  overlayEnd?: ReactNode;
  meta?: ReactNode;
  actions?: ReactNode;
  selected?: boolean;
  headingLevel?: 2 | 3 | 4;
  className?: string;
}

export function PortraitCard({
  title,
  subtitle,
  href,
  image,
  ratio = 4 / 5,
  overlayStart,
  overlayEnd,
  meta,
  actions,
  selected,
  headingLevel = 3,
  className,
}: PortraitCardProps) {
  const Heading = `h${headingLevel}` as const;
  return (
    <article className={cx(styles.portrait, selected && styles.portraitSelected, className)}>
      <div className={styles.portraitMedia}>
        <ImageFrame ratio={ratio} focus="50% 20%" className={styles.portraitFrame} {...image} />
        {(overlayStart || overlayEnd) && (
          <div className={styles.portraitOverlay}>
            <span>{overlayStart}</span>
            <span>{overlayEnd}</span>
          </div>
        )}
      </div>
      <div className={styles.portraitBody}>
        <Heading className={styles.portraitTitle}>{href ? <Link href={href}>{title}</Link> : title}</Heading>
        {subtitle && <p className={styles.portraitSubtitle}>{subtitle}</p>}
        {selected && <span className="omnia-sr-only">Selected</span>}
        {meta && <div className={styles.portraitMeta}>{meta}</div>}
        {actions && <div className={styles.portraitActions}>{actions}</div>}
      </div>
    </article>
  );
}

/* -------------------------------------------------------------------------- */
/* EquipmentSlot                                                              */
/* -------------------------------------------------------------------------- */

export interface EquipmentSlotItem {
  name: string;
  rarity?: Pick<RarityMarkerProps, "tier" | "maxTier" | "label">;
  /** Short metadata, e.g. "Lv 40 / 40". */
  detail?: string;
  tone?: Tone;
}

export interface EquipmentSlotProps {
  /** Slot name, e.g. "Weapon". */
  slot: string;
  icon: ReactNode;
  item?: EquipmentSlotItem | null;
  /** When provided the whole slot becomes a button. */
  onSelect?: () => void;
  /** Visible action hint inside the button, e.g. "Change". */
  actionLabel?: string;
  emptyLabel?: string;
  className?: string;
}

export function EquipmentSlot({
  slot,
  icon,
  item,
  onSelect,
  actionLabel,
  emptyLabel = "Empty",
  className,
}: EquipmentSlotProps) {
  const empty = !item;
  const tone = item?.tone ?? "neutral";
  const content = (
    <>
      <span className={cx(styles.slotThumb, !empty && toneClass(tone))} aria-hidden>
        {empty ? <PlusIcon /> : icon}
      </span>
      <span className={styles.slotText}>
        <span className={styles.slotLabel}>{slot}</span>
        <span className={styles.slotName}>{item?.name ?? emptyLabel}</span>
        {!empty && (item.rarity || item.detail) && (
          <span className={styles.slotMeta}>
            {item.rarity && <RarityMarker {...item.rarity} />}
            {item.detail && <span>{item.detail}</span>}
          </span>
        )}
      </span>
      {onSelect && (
        <span className={styles.slotAction}>
          {actionLabel ?? (empty ? "Equip" : "Change")}
          <ChevronRightIcon size={16} />
        </span>
      )}
    </>
  );

  const classes = cx(styles.slot, empty && styles.slotEmpty, className);
  if (onSelect) {
    return (
      <button type="button" className={classes} onClick={onSelect}>
        {content}
      </button>
    );
  }
  return <div className={classes}>{content}</div>;
}

/* -------------------------------------------------------------------------- */
/* QuestNode                                                                  */
/* -------------------------------------------------------------------------- */

export type QuestStatus = "locked" | "available" | "current" | "cleared";

const questMeta: Record<QuestStatus, { tone: Tone; icon: ReactNode; label: string }> = {
  locked: { tone: "neutral", icon: <LockIcon size={16} />, label: "Locked" },
  available: { tone: "accent", icon: <CompassIcon size={16} />, label: "Available" },
  current: { tone: "accent", icon: <CompassIcon size={16} />, label: "In progress" },
  cleared: { tone: "success", icon: <CheckIcon size={16} />, label: "Cleared" },
};

export interface QuestNodeProps {
  title: ReactNode;
  status: QuestStatus;
  /** Ordinal or location, e.g. "Chapter 2 · Stage 4". */
  eyebrow?: ReactNode;
  href?: string;
  /** Trailing content: rewards preview, difficulty badge, etc. */
  trailing?: ReactNode;
  className?: string;
}

/** A destination in a quest list. Locked nodes are never links. */
export function QuestNode({ title, status, eyebrow, href, trailing, className }: QuestNodeProps) {
  const meta = questMeta[status];
  const interactive = Boolean(href) && status !== "locked";
  const classes = cx(
    styles.quest,
    status === "locked" && styles.questLocked,
    status === "current" && styles.questCurrent,
    className,
  );

  const content = (
    <>
      <span className={cx(styles.questMarker, toneClass(meta.tone))} aria-hidden>
        {meta.icon}
      </span>
      <span className={styles.questText}>
        {eyebrow && <span className={styles.questEyebrow}>{eyebrow}</span>}
        <span className={styles.questTitle}>{title}</span>
      </span>
      <span className={styles.questTrailing}>
        <span className={cx(dataStyles.rarity, toneClass(meta.tone))}>{meta.label}</span>
        {trailing}
      </span>
      {interactive && (
        <span className={styles.questChevron} aria-hidden>
          <ChevronRightIcon size={16} />
        </span>
      )}
    </>
  );

  if (interactive && href) {
    return (
      <Link href={href} className={classes} aria-current={status === "current" ? "step" : undefined}>
        {content}
      </Link>
    );
  }
  return <div className={classes}>{content}</div>;
}

/* -------------------------------------------------------------------------- */
/* RewardTile                                                                 */
/* -------------------------------------------------------------------------- */

export type RewardState = "locked" | "available" | "claimable" | "claimed";

export interface RewardTileProps {
  name: ReactNode;
  icon: ReactNode;
  quantity?: number;
  state?: RewardState;
  tone?: Tone;
  layout?: "tile" | "row";
  /** Renders a Claim button while `state="claimable"`. */
  onClaim?: () => void;
  claiming?: boolean;
  className?: string;
}

const rewardStateLabel: Record<RewardState, string> = {
  locked: "Locked",
  available: "Not yet earned",
  claimable: "Ready to claim",
  claimed: "Claimed",
};

export function RewardTile({
  name,
  icon,
  quantity,
  state = "available",
  tone = "accent",
  layout = "tile",
  onClaim,
  claiming,
  className,
}: RewardTileProps) {
  return (
    <div
      className={cx(
        styles.reward,
        layout === "row" && styles.rewardRow,
        state === "claimed" && styles.rewardClaimed,
        state === "locked" && styles.rewardLocked,
        className,
      )}
    >
      <span className={cx(styles.rewardIcon, toneClass(tone))}>
        <span aria-hidden>{icon}</span>
        {quantity !== undefined && (
          <span className={styles.rewardQuantity}>
            <span className="omnia-sr-only">Quantity </span>×{formatNumber(quantity)}
          </span>
        )}
      </span>
      <span className={styles.rewardText}>
        <span className={styles.rewardName}>{name}</span>
        <span className={styles.rewardState}>
          {state === "claimed" && <SuccessIcon size={16} />}
          {state === "locked" && <LockIcon size={16} />}
          {rewardStateLabel[state]}
        </span>
      </span>
      {state === "claimable" && onClaim && (
        <Button size="sm" variant="primary" onClick={onClaim} loading={claiming} className={styles.rewardAction}>
          Claim
        </Button>
      )}
    </div>
  );
}
