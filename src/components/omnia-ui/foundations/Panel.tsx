import { useId, type ComponentPropsWithoutRef, type ComponentPropsWithRef, type ReactNode } from "react";
import { cx } from "../lib/cx";
import styles from "./Surface.module.css";

export type SurfaceVariant = "plain" | "raised" | "inset" | "signature";
type HeadingLevel = 2 | 3 | 4;

interface SurfaceOwnProps {
  /** Visual intensity. `signature` is reserved for rare, special panels. */
  surface?: SurfaceVariant;
  heading?: ReactNode;
  headingLevel?: HeadingLevel;
  description?: ReactNode;
  /** Header actions, aligned opposite the heading. */
  actions?: ReactNode;
  footer?: ReactNode;
}

export interface PanelProps extends SurfaceOwnProps, Omit<ComponentPropsWithRef<"section">, "title"> {
  /** Tighter spacing for data-heavy screens. */
  density?: "comfortable" | "compact";
}

function SurfaceContent({
  headingId,
  heading,
  headingLevel = 2,
  description,
  actions,
  footer,
  children,
}: SurfaceOwnProps & { headingId: string; children?: ReactNode }) {
  const Heading = `h${headingLevel}` as const;
  const hasHeader = Boolean(heading || actions);

  return (
    <>
      {hasHeader && (
        <header className={styles.header}>
          {(heading || description) && (
            <div className={styles.headings}>
              {heading && (
                <Heading id={headingId} className={styles.title}>
                  {heading}
                </Heading>
              )}
              {description && <p className={styles.description}>{description}</p>}
            </div>
          )}
          {actions && <div className={styles.actions}>{actions}</div>}
        </header>
      )}
      {children !== undefined && <div className={styles.body}>{children}</div>}
      {footer && <footer className={styles.footer}>{footer}</footer>}
    </>
  );
}

/** Section-level container. Renders a labelled `<section>` when it has a heading. */
export function Panel({
  surface = "raised",
  density = "comfortable",
  heading,
  headingLevel,
  description,
  actions,
  footer,
  className,
  children,
  ...props
}: PanelProps) {
  const headingId = useId();
  return (
    <section
      aria-labelledby={heading ? headingId : undefined}
      className={cx(styles.surface, styles[surface], styles.panel, density === "compact" && styles.compact, className)}
      {...props}
    >
      <SurfaceContent
        headingId={headingId}
        heading={heading}
        headingLevel={headingLevel}
        description={description}
        actions={actions}
        footer={footer}
      >
        {children}
      </SurfaceContent>
    </section>
  );
}

export interface CardProps extends SurfaceOwnProps, Omit<ComponentPropsWithoutRef<"div">, "title"> {
  /** Use `article` for self-contained items in a feed or grid. */
  as?: "div" | "article" | "li";
}

/** Item-level container. Not interactive; put links or buttons inside it. */
export function Card({
  as = "div",
  surface = "plain",
  heading,
  headingLevel = 3,
  description,
  actions,
  footer,
  className,
  children,
  ...props
}: CardProps) {
  const headingId = useId();
  const Element = as as "div";
  return (
    <Element
      aria-labelledby={heading && as === "article" ? headingId : undefined}
      className={cx(styles.surface, styles[surface], styles.card, className)}
      {...props}
    >
      <SurfaceContent
        headingId={headingId}
        heading={heading}
        headingLevel={headingLevel}
        description={description}
        actions={actions}
        footer={footer}
      >
        {children}
      </SurfaceContent>
    </Element>
  );
}

export type CrystalPanelProps = Omit<PanelProps, "surface">;

/** Premium section: `Panel` with the signature treatment. Use sparingly. */
export function CrystalPanel(props: CrystalPanelProps) {
  return <Panel {...props} surface="signature" />;
}
