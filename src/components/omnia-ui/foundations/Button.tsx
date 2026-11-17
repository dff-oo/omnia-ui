"use client";

import type { ComponentPropsWithRef, MouseEvent, ReactNode } from "react";
import { cx } from "../lib/cx";
import { buttonClasses, buttonPartClasses, type ButtonStyleOptions } from "./buttonClasses";
import { Spinner } from "./Spinner";

export interface ButtonProps extends Omit<ComponentPropsWithRef<"button">, "className">, ButtonStyleOptions {
  /** Shows a spinner, sets `aria-busy` and ignores clicks while keeping focus. */
  loading?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
}

export function Button({
  variant,
  size,
  block,
  loading = false,
  startIcon,
  endIcon,
  className,
  type = "button",
  onClick,
  children,
  ...props
}: ButtonProps) {
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (loading) {
      event.preventDefault();
      return;
    }
    onClick?.(event);
  };

  return (
    <button
      type={type}
      className={buttonClasses({ variant, size, block, className })}
      aria-busy={loading || undefined}
      aria-disabled={loading || undefined}
      onClick={handleClick}
      {...props}
    >
      <span className={buttonPartClasses.label}>
        {startIcon}
        {children}
        {endIcon}
      </span>
      {loading && <Spinner className={buttonPartClasses.spinner} />}
    </button>
  );
}

export interface IconButtonProps extends Omit<ButtonProps, "children" | "startIcon" | "endIcon" | "block"> {
  /** Accessible name for the icon-only control. */
  label: string;
  icon: ReactNode;
}

export function IconButton({ label, icon, variant = "ghost", className, ...props }: IconButtonProps) {
  return (
    <Button aria-label={label} variant={variant} className={cx(buttonPartClasses.icon, className)} {...props}>
      {icon}
    </Button>
  );
}
