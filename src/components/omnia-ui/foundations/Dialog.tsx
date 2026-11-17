"use client";

import { AlertDialog as BaseAlertDialog } from "@base-ui/react/alert-dialog";
import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import type { ReactElement, ReactNode } from "react";
import { CloseIcon } from "../icons";
import { cx } from "../lib/cx";
import { IconButton } from "./Button";
import styles from "./Dialog.module.css";

interface DialogBaseProps {
  /** Element that opens the dialog, e.g. `<Button>Open</Button>`. Omit for fully controlled dialogs. */
  trigger?: ReactElement;
  title: ReactNode;
  description?: ReactNode;
  /** Footer actions. Wrap dismissing buttons in `<DialogClose render={<Button />}>`. */
  actions?: ReactNode;
  children?: ReactNode;
  size?: "sm" | "md" | "lg";
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

export interface DialogProps extends DialogBaseProps {
  /** Show a close button in the header. Escape and backdrop click always dismiss. */
  closable?: boolean;
}

export function Dialog({
  trigger,
  title,
  description,
  actions,
  children,
  size = "md",
  closable = true,
  open,
  defaultOpen,
  onOpenChange,
  className,
}: DialogProps) {
  return (
    <BaseDialog.Root open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange ? (next) => onOpenChange(next) : undefined}>
      {trigger && <BaseDialog.Trigger render={trigger} />}
      <BaseDialog.Portal>
        <BaseDialog.Backdrop className={styles.backdrop} />
        <BaseDialog.Viewport className={styles.viewport}>
          <BaseDialog.Popup className={cx(styles.popup, size !== "md" && styles[size], className)}>
            <div className={styles.header}>
              <div className={styles.headings}>
                <BaseDialog.Title className={styles.title}>{title}</BaseDialog.Title>
                {description && (
                  <BaseDialog.Description className={styles.description}>{description}</BaseDialog.Description>
                )}
              </div>
              {closable && (
                <BaseDialog.Close
                  render={<IconButton label="Close dialog" icon={<CloseIcon />} className={styles.close} />}
                />
              )}
            </div>
            {children && <div className={styles.body}>{children}</div>}
            {actions && <div className={styles.footer}>{actions}</div>}
          </BaseDialog.Popup>
        </BaseDialog.Viewport>
      </BaseDialog.Portal>
    </BaseDialog.Root>
  );
}

export const DialogClose = BaseDialog.Close;

export type AlertDialogProps = DialogBaseProps;

/** For decisions that need explicit confirmation. Does not close on backdrop click. */
export function AlertDialog({
  trigger,
  title,
  description,
  actions,
  children,
  size = "sm",
  open,
  defaultOpen,
  onOpenChange,
  className,
}: AlertDialogProps) {
  return (
    <BaseAlertDialog.Root
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange ? (next) => onOpenChange(next) : undefined}
    >
      {trigger && <BaseAlertDialog.Trigger render={trigger} />}
      <BaseAlertDialog.Portal>
        <BaseAlertDialog.Backdrop className={styles.backdrop} />
        <BaseAlertDialog.Viewport className={styles.viewport}>
          <BaseAlertDialog.Popup className={cx(styles.popup, size !== "md" && styles[size], className)}>
            <div className={styles.header}>
              <div className={styles.headings}>
                <BaseAlertDialog.Title className={styles.title}>{title}</BaseAlertDialog.Title>
                {description && (
                  <BaseAlertDialog.Description className={styles.description}>{description}</BaseAlertDialog.Description>
                )}
              </div>
            </div>
            {children && <div className={styles.body}>{children}</div>}
            {actions && <div className={styles.footer}>{actions}</div>}
          </BaseAlertDialog.Popup>
        </BaseAlertDialog.Viewport>
      </BaseAlertDialog.Portal>
    </BaseAlertDialog.Root>
  );
}

export const AlertDialogClose = BaseAlertDialog.Close;
