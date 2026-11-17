import { cx } from "../lib/cx";
import styles from "./Button.module.css";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonStyleOptions {
  variant?: ButtonVariant;
  size?: ButtonSize;
  block?: boolean;
  className?: string;
}

/** Class names for styling a non-button element (e.g. a Next `<Link>`) as a button. */
export function buttonClasses({ variant = "secondary", size = "md", block, className }: ButtonStyleOptions = {}) {
  return cx(styles.button, styles[variant], size !== "md" && styles[size], block && styles.block, className);
}

export const buttonPartClasses = {
  label: styles.label,
  spinner: styles.spinner,
  icon: styles.icon,
};
