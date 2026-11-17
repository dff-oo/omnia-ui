import type { SVGProps } from "react";
import { cx } from "../lib/cx";
import styles from "./Spinner.module.css";

export interface SpinnerProps extends SVGProps<SVGSVGElement> {
  size?: 16 | 20 | 24;
}

/** Decorative spinner. Pair with `aria-busy` or visible text on the owning element. */
export function Spinner({ size = 16, className, ...props }: SpinnerProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      focusable="false"
      className={cx(styles.spinner, className)}
      {...props}
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.25" strokeWidth="2.5" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}
