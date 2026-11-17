import { Menu as BaseMenu } from "@base-ui/react/menu";
import { Popover as BasePopover } from "@base-ui/react/popover";
import { Tooltip as BaseTooltip } from "@base-ui/react/tooltip";
import type { ComponentProps, ReactElement, ReactNode } from "react";
import { cx } from "../lib/cx";
import styles from "./Popup.module.css";

type Side = "top" | "bottom" | "left" | "right";
type Align = "start" | "center" | "end";

/* -------------------------------------------------------------------------- */
/* Tooltip                                                                    */
/* -------------------------------------------------------------------------- */

/** Shares hover delay across tooltips. Place once near the app root. */
export function TooltipProvider({ children, delay = 400 }: { children: ReactNode; delay?: number }) {
  return <BaseTooltip.Provider delay={delay}>{children}</BaseTooltip.Provider>;
}

export interface TooltipProps {
  /** Supplementary text only — never the sole source of essential information. */
  content: ReactNode;
  /** The trigger element. Must be focusable (e.g. a button). */
  children: ReactElement;
  side?: Side;
}

export function Tooltip({ content, children, side = "top" }: TooltipProps) {
  return (
    <BaseTooltip.Root>
      <BaseTooltip.Trigger render={children} />
      <BaseTooltip.Portal>
        <BaseTooltip.Positioner className={styles.positioner} side={side} sideOffset={8}>
          <BaseTooltip.Popup className={styles.tooltip}>{content}</BaseTooltip.Popup>
        </BaseTooltip.Positioner>
      </BaseTooltip.Portal>
    </BaseTooltip.Root>
  );
}

/* -------------------------------------------------------------------------- */
/* Popover                                                                    */
/* -------------------------------------------------------------------------- */

export interface PopoverProps {
  trigger: ReactElement;
  title?: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  side?: Side;
  align?: Align;
  /** Open on hover as well as click — suitable for infotips. */
  openOnHover?: boolean;
  className?: string;
}

export function Popover({
  trigger,
  title,
  description,
  children,
  side = "bottom",
  align = "center",
  openOnHover,
  className,
}: PopoverProps) {
  return (
    <BasePopover.Root>
      <BasePopover.Trigger render={trigger} openOnHover={openOnHover} />
      <BasePopover.Portal>
        <BasePopover.Positioner className={styles.positioner} side={side} align={align} sideOffset={8}>
          <BasePopover.Popup className={cx(styles.popover, className)}>
            {title && <BasePopover.Title className={styles.popoverTitle}>{title}</BasePopover.Title>}
            {description && (
              <BasePopover.Description className={styles.popoverDescription}>{description}</BasePopover.Description>
            )}
            {children}
          </BasePopover.Popup>
        </BasePopover.Positioner>
      </BasePopover.Portal>
    </BasePopover.Root>
  );
}

/* -------------------------------------------------------------------------- */
/* Menu                                                                       */
/* -------------------------------------------------------------------------- */

export interface MenuProps {
  trigger: ReactElement;
  children: ReactNode;
  side?: Side;
  align?: Align;
}

export function Menu({ trigger, children, side = "bottom", align = "start" }: MenuProps) {
  return (
    <BaseMenu.Root>
      <BaseMenu.Trigger render={trigger} />
      <BaseMenu.Portal>
        <BaseMenu.Positioner className={styles.positioner} side={side} align={align} sideOffset={6}>
          <BaseMenu.Popup className={styles.popup}>{children}</BaseMenu.Popup>
        </BaseMenu.Positioner>
      </BaseMenu.Portal>
    </BaseMenu.Root>
  );
}

export interface MenuItemProps extends Omit<ComponentProps<typeof BaseMenu.Item>, "className" | "children"> {
  children: ReactNode;
  icon?: ReactNode;
  shortcut?: string;
  tone?: "default" | "danger";
}

export function MenuItem({ children, icon, shortcut, tone = "default", ...props }: MenuItemProps) {
  return (
    <BaseMenu.Item className={cx(styles.item, tone === "danger" && styles.itemDanger)} {...props}>
      {icon && <span className={styles.itemIcon}>{icon}</span>}
      <span className={styles.itemText}>{children}</span>
      {shortcut && <kbd className={styles.shortcut}>{shortcut}</kbd>}
    </BaseMenu.Item>
  );
}

export function MenuSeparator() {
  return <BaseMenu.Separator className={styles.separator} />;
}

export function MenuGroup({ label, children }: { label: string; children: ReactNode }) {
  return (
    <BaseMenu.Group>
      <BaseMenu.GroupLabel className={styles.groupLabel}>{label}</BaseMenu.GroupLabel>
      {children}
    </BaseMenu.Group>
  );
}
