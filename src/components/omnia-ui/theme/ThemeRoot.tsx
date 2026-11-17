import type { ComponentPropsWithoutRef } from "react";
import { cx } from "../lib/cx";
import type { OmniaTheme } from "./theme";
import styles from "./ThemeRoot.module.css";

export interface ThemeRootProps extends ComponentPropsWithoutRef<"div"> {
  /** Pins this subtree to one theme regardless of the page theme. */
  theme: OmniaTheme;
}

/**
 * Scopes a subtree to a fixed theme (e.g. side-by-side previews or an editorial light section).
 * Portaled popups (Select, Menu, Dialog…) render at the document root and follow the page theme.
 */
export function ThemeRoot({ theme, className, ...props }: ThemeRootProps) {
  return <div data-omnia-theme={theme} className={cx(styles.root, className)} {...props} />;
}
