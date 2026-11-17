import { Progress as BaseProgress } from "@base-ui/react/progress";
import { Separator as BaseSeparator } from "@base-ui/react/separator";
import type { CSSProperties, ComponentPropsWithRef, ReactNode } from "react";
import { ErrorIcon, InfoIcon, SuccessIcon, WarningIcon } from "../icons";
import { cx } from "../lib/cx";
import styles from "./Feedback.module.css";

/* -------------------------------------------------------------------------- */

export interface SeparatorProps {
  orientation?: "horizontal" | "vertical";
  className?: string;
}

export function Separator({ orientation = "horizontal", className }: SeparatorProps) {
  return <BaseSeparator orientation={orientation} className={cx(styles.separator, className)} />;
}

/* -------------------------------------------------------------------------- */

export interface SkeletonProps {
  shape?: "rect" | "text" | "circle";
  width?: CSSProperties["width"];
  height?: CSSProperties["height"];
  className?: string;
}

/** Decorative loading placeholder. Mark the loading region with `aria-busy` on its container. */
export function Skeleton({ shape = "rect", width, height, className }: SkeletonProps) {
  return (
    <span
      aria-hidden
      className={cx(
        styles.skeleton,
        shape === "text" && styles.skeletonText,
        shape === "circle" && styles.skeletonCircle,
        className,
      )}
      style={{ width, height: height ?? (shape === "text" ? undefined : 16) }}
    />
  );
}

/* -------------------------------------------------------------------------- */

export type MeterTone = "accent" | "success" | "warning" | "danger" | "gold";

export const meterToneClass: Record<MeterTone, string> = {
  accent: styles.toneAccent,
  success: styles.toneSuccess,
  warning: styles.toneWarning,
  danger: styles.toneDanger,
  gold: styles.toneGold,
};

export const meterClasses = {
  root: styles.progress,
  label: styles.progressLabel,
  value: styles.progressValue,
  track: styles.track,
  indicator: styles.indicator,
};

export interface ProgressProps {
  label: ReactNode;
  /** `null` renders an indeterminate bar. */
  value: number | null;
  max?: number;
  /** Visible and announced value, e.g. "3 of 5 steps". Defaults to a percentage. */
  valueLabel?: string;
  tone?: MeterTone;
  className?: string;
}

/** Task completion. For measurements within a range (HP, capacity) use `StatBar`. */
export function Progress({ label, value, max = 100, valueLabel, tone = "accent", className }: ProgressProps) {
  const text = value === null ? "Loading" : (valueLabel ?? `${Math.round((value / max) * 100)}%`);
  return (
    <BaseProgress.Root
      value={value}
      max={max}
      aria-valuetext={text}
      className={cx(styles.progress, meterToneClass[tone], className)}
    >
      <BaseProgress.Label className={styles.progressLabel}>{label}</BaseProgress.Label>
      <span className={styles.progressValue} aria-hidden>
        {value === null ? null : text}
      </span>
      <BaseProgress.Track className={styles.track}>
        <BaseProgress.Indicator className={styles.indicator} />
      </BaseProgress.Track>
    </BaseProgress.Root>
  );
}

/* -------------------------------------------------------------------------- */

export interface EmptyStateProps extends Omit<ComponentPropsWithRef<"div">, "title"> {
  icon?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  headingLevel?: 2 | 3 | 4;
}

export function EmptyState({ icon, title, description, actions, headingLevel = 3, className, ...props }: EmptyStateProps) {
  const Heading = `h${headingLevel}` as const;
  return (
    <div className={cx(styles.empty, className)} {...props}>
      {icon && (
        <span className={styles.emptyIcon} aria-hidden>
          {icon}
        </span>
      )}
      <Heading className={styles.emptyTitle}>{title}</Heading>
      {description && <p className={styles.emptyDescription}>{description}</p>}
      {actions && <div className={styles.emptyActions}>{actions}</div>}
    </div>
  );
}

/* -------------------------------------------------------------------------- */

export type CalloutTone = "info" | "success" | "warning" | "danger";

const calloutMeta: Record<CalloutTone, { className: string; icon: ReactNode; label: string }> = {
  info: { className: styles.calloutInfo, icon: <InfoIcon />, label: "Note" },
  success: { className: styles.calloutSuccess, icon: <SuccessIcon />, label: "Success" },
  warning: { className: styles.calloutWarning, icon: <WarningIcon />, label: "Warning" },
  danger: { className: styles.calloutDanger, icon: <ErrorIcon />, label: "Error" },
};

export interface CalloutProps extends Omit<ComponentPropsWithRef<"div">, "title"> {
  tone?: CalloutTone;
  title?: ReactNode;
}

/** Static, inline message. For messages that appear dynamically, add `role="status"` or `role="alert"`. */
export function Callout({ tone = "info", title, className, children, ...props }: CalloutProps) {
  const meta = calloutMeta[tone];
  return (
    <div className={cx(styles.callout, meta.className, className)} {...props}>
      <span className={styles.calloutIcon}>{meta.icon}</span>
      <div className={styles.calloutBody}>
        <span className="omnia-sr-only">{meta.label}: </span>
        {title && <p className={styles.calloutTitle}>{title}</p>}
        {children && <div>{children}</div>}
      </div>
    </div>
  );
}
