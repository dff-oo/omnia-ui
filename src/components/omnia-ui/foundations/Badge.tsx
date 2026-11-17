import type { ComponentPropsWithRef, ReactNode } from "react";
import { ErrorIcon, InfoIcon, SuccessIcon, WarningIcon } from "../icons";
import { cx } from "../lib/cx";
import styles from "./Badge.module.css";

export type BadgeTone = "neutral" | "accent" | "success" | "warning" | "danger" | "gold" | "violet";

export interface BadgeProps extends ComponentPropsWithRef<"span"> {
  tone?: BadgeTone;
  size?: "sm" | "md";
  variant?: "soft" | "outline";
  icon?: ReactNode;
}

export function Badge({ tone = "neutral", size = "sm", variant = "soft", icon, className, children, ...props }: BadgeProps) {
  return (
    <span
      className={cx(styles.badge, styles[tone], size === "md" && styles.md, variant === "outline" && styles.outline, className)}
      {...props}
    >
      {icon}
      {children}
    </span>
  );
}

export type Status = "info" | "success" | "warning" | "danger" | "neutral";

const statusTone: Record<Status, BadgeTone> = {
  info: "accent",
  success: "success",
  warning: "warning",
  danger: "danger",
  neutral: "neutral",
};

const statusIcon: Record<Status, ReactNode> = {
  info: <InfoIcon size={16} />,
  success: <SuccessIcon size={16} />,
  warning: <WarningIcon size={16} />,
  danger: <ErrorIcon size={16} />,
  neutral: null,
};

export interface StatusBadgeProps extends Omit<BadgeProps, "tone" | "icon"> {
  status: Status;
  /** Visible label — status is never conveyed by colour alone. */
  children: ReactNode;
}

export function StatusBadge({ status, ...props }: StatusBadgeProps) {
  return <Badge tone={statusTone[status]} icon={statusIcon[status]} {...props} />;
}
