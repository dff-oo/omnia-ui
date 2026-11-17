import { Children, type CSSProperties, type ReactNode } from "react";
import { ClockIcon } from "../icons";
import { cx } from "../lib/cx";
import { Badge } from "../foundations/Badge";
import { ImageFrame, type ImageFrameProps } from "../foundations/Media";
import { CrystalPanel } from "../foundations/Panel";
import styles from "./Showcase.module.css";

/* -------------------------------------------------------------------------- */
/* BannerFeature                                                              */
/* -------------------------------------------------------------------------- */

export interface BannerFeatureProps {
  title: ReactNode;
  eyebrow?: ReactNode;
  description?: ReactNode;
  /** Availability window as display text, e.g. "Until 28 Feb, 23:59 UTC". */
  availability?: string;
  /** Artwork. Without `src`/`children` a generated placeholder is shown. */
  image?: Omit<ImageFrameProps, "ratio" | "className">;
  actions?: ReactNode;
  /** Secondary detail under the actions, e.g. cost or terms. */
  aside?: ReactNode;
  /** On wide layouts, place copy on the start side instead of along the bottom. */
  align?: "bottom" | "start";
  /**
   * Render as a dark, immersive media surface in both themes (default). Copy sits on a dark
   * scrim on wide layouts, so light-theme tokens would not reach contrast there. Only disable
   * on pages that are always dark.
   */
  immersive?: boolean;
  headingLevel?: 1 | 2 | 3;
  className?: string;
}

export function BannerFeature({
  title,
  eyebrow,
  description,
  availability,
  image,
  actions,
  aside,
  align = "bottom",
  immersive = true,
  headingLevel = 2,
  className,
}: BannerFeatureProps) {
  const Heading = `h${headingLevel}` as const;
  return (
    <div className={cx(styles.bannerWrap, className)} data-omnia-theme={immersive ? "dark" : undefined}>
      <section className={cx(styles.banner, align === "start" && styles.alignStart)}>
        <ImageFrame ratio={16 / 9} className={styles.bannerArt} {...image} />
        <div className={styles.bannerContent}>
          {(eyebrow || availability) && (
            <div className={styles.bannerTopline}>
              {eyebrow && <p className={styles.bannerEyebrow}>{eyebrow}</p>}
              {availability && (
                <Badge tone="gold" variant="outline" icon={<ClockIcon size={16} />}>
                  {availability}
                </Badge>
              )}
            </div>
          )}
          <Heading className={styles.bannerTitle}>{title}</Heading>
          {description && <p className={styles.bannerDescription}>{description}</p>}
          {actions && <div className={styles.bannerActions}>{actions}</div>}
          {aside && <p className={styles.bannerAside}>{aside}</p>}
        </div>
      </section>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* ResultSummary                                                              */
/* -------------------------------------------------------------------------- */

export interface ResultSummaryProps {
  title: ReactNode;
  subtitle?: ReactNode;
  /** Typically a `StatList`. */
  stats?: ReactNode;
  /** Reward tiles; each child is wrapped in a list item. */
  rewards?: ReactNode;
  rewardsLabel?: string;
  actions?: ReactNode;
  /** One brief reveal on mount. Disabled under reduced motion. */
  celebrate?: boolean;
  headingLevel?: 1 | 2 | 3;
  className?: string;
}

function Emblem() {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden>
      <path d="M32 4 52 24 32 60 12 24 32 4Z" fill="currentColor" fillOpacity="0.16" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 24h40M32 4l-7 20 7 36 7-36-7-20" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M6 14 9 17M58 14l-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function ResultSummary({
  title,
  subtitle,
  stats,
  rewards,
  rewardsLabel = "Rewards",
  actions,
  celebrate,
  headingLevel = 2,
  className,
}: ResultSummaryProps) {
  const Heading = `h${headingLevel}` as const;
  const SubHeading = `h${headingLevel + 1}` as "h2" | "h3" | "h4";
  return (
    <CrystalPanel className={cx(styles.result, celebrate && styles.celebrate, className)}>
      <div className={styles.resultHeader}>
        <span className={styles.resultEmblem}>
          <Emblem />
        </span>
        <Heading className={styles.resultTitle}>{title}</Heading>
        {subtitle && <p className={styles.resultSubtitle}>{subtitle}</p>}
      </div>
      {stats}
      {rewards && (
        <div className={styles.resultSection}>
          <SubHeading className={styles.resultSectionTitle}>{rewardsLabel}</SubHeading>
          <ul className={styles.resultRewards}>
            {Children.toArray(rewards).map((reward, index) => (
              <li key={index} style={{ "--_i": index } as CSSProperties}>
                {reward}
              </li>
            ))}
          </ul>
        </div>
      )}
      {actions && <div className={styles.resultActions}>{actions}</div>}
    </CrystalPanel>
  );
}
