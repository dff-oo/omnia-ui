"use client";

import { Toggle } from "@base-ui/react/toggle";
import { ToggleGroup } from "@base-ui/react/toggle-group";
import type { ReactNode } from "react";
import { cx } from "../lib/cx";
import styles from "./SegmentedControl.module.css";

export interface SegmentedOption<T extends string> {
  value: T;
  label: string;
  icon?: ReactNode;
}

export interface SegmentedControlProps<T extends string> {
  /** Accessible name for the group. */
  label: string;
  options: SegmentedOption<T>[];
  value: T;
  onValueChange: (value: T) => void;
  /**
   * Show icons only; option labels remain the accessible names.
   * `"narrow"` hides the labels below 480px only. Requires every option to have an icon.
   */
  iconOnly?: boolean | "narrow";
  className?: string;
}

/** Single-choice toggle group. One option is always selected. */
export function SegmentedControl<T extends string>({
  label,
  options,
  value,
  onValueChange,
  iconOnly,
  className,
}: SegmentedControlProps<T>) {
  return (
    <ToggleGroup
      aria-label={label}
      value={[value]}
      onValueChange={(next) => {
        const match = options.find((option) => option.value === next[0]);
        if (match) onValueChange(match.value);
      }}
      className={cx(styles.group, className)}
    >
      {options.map((option) => (
        <Toggle
          key={option.value}
          value={option.value}
          aria-label={iconOnly ? option.label : undefined}
          className={cx(styles.toggle, iconOnly === true && styles.iconOnly, iconOnly === "narrow" && styles.iconOnlyNarrow)}
        >
          {option.icon}
          {iconOnly !== true && <span className={styles.text}>{option.label}</span>}
        </Toggle>
      ))}
    </ToggleGroup>
  );
}
