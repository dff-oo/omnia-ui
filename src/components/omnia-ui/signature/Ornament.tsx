import { cx } from "../lib/cx";
import styles from "./Heading.module.css";

export interface OrnamentProps {
  /** `divider`: horizontal rule with a crystal glyph. `corner-*`: facet mark for a positioned parent. */
  variant?: "divider" | "corner-top-start" | "corner-bottom-end";
  className?: string;
}

function Facet({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.25">
      <path d="M1 12V1h11" />
      <path d="M4 7.5 7.5 4 11 7.5 7.5 11 4 7.5Z" fill="currentColor" fillOpacity="0.35" />
    </svg>
  );
}

/** Purely decorative. Always hidden from assistive technology. */
export function Ornament({ variant = "divider", className }: OrnamentProps) {
  if (variant === "divider") {
    return (
      <div className={cx(styles.divider, className)} aria-hidden>
        <svg className={styles.dividerGlyph} width="24" height="12" viewBox="0 0 24 12" fill="none">
          <path d="M12 0 18 6 12 12 6 6 12 0Z" fill="currentColor" fillOpacity="0.8" />
          <path d="M3 6 4.5 4.5 6 6 4.5 7.5 3 6ZM18 6l1.5-1.5L21 6l-1.5 1.5L18 6Z" fill="currentColor" fillOpacity="0.45" />
        </svg>
      </div>
    );
  }
  return (
    <span aria-hidden className={cx(styles.corner, variant === "corner-top-start" ? styles.cornerTopStart : styles.cornerBottomEnd, className)}>
      <Facet />
    </span>
  );
}
