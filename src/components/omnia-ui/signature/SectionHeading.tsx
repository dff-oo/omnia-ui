import type { ReactNode } from "react";
import { cx } from "../lib/cx";
import styles from "./Heading.module.css";

export interface SectionHeadingProps {
  title: ReactNode;
  eyebrow?: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  level?: 1 | 2 | 3;
  /** `display` uses the editorial serif — reserve it for one hero title per page. */
  size?: "section" | "page" | "display";
  /** The faceted marker is decorative and can be turned off. */
  marker?: boolean;
  id?: string;
  className?: string;
}

export function SectionHeading({
  title,
  eyebrow,
  description,
  actions,
  level = 2,
  size = "section",
  marker = true,
  id,
  className,
}: SectionHeadingProps) {
  const Heading = `h${level}` as const;
  return (
    <div className={cx(styles.heading, size !== "section" && styles[size], className)}>
      <div className={styles.text}>
        {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
        <div className={styles.titleRow}>
          {marker && size === "section" && <span className={styles.marker} aria-hidden />}
          <Heading id={id} className={styles.title}>
            {title}
          </Heading>
        </div>
        {description && <p className={styles.description}>{description}</p>}
      </div>
      {actions && <div className={styles.actions}>{actions}</div>}
    </div>
  );
}
