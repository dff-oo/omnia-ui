"use client";

import { Field } from "@base-ui/react/field";
import { Select as BaseSelect } from "@base-ui/react/select";
import { Fragment, type ReactNode } from "react";
import { CheckIcon, ChevronDownIcon, ErrorIcon } from "../icons";
import { cx } from "../lib/cx";
import fieldStyles from "./Field.module.css";
import styles from "./Popup.module.css";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectOptionGroup {
  label: string;
  options: SelectOption[];
}

export interface SelectProps {
  label: ReactNode;
  options: SelectOption[] | SelectOptionGroup[];
  placeholder?: string;
  description?: ReactNode;
  error?: ReactNode;
  value?: string | null;
  defaultValue?: string | null;
  onValueChange?: (value: string | null) => void;
  name?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

function isGrouped(options: SelectOption[] | SelectOptionGroup[]): options is SelectOptionGroup[] {
  return options.length > 0 && "options" in options[0];
}

function OptionItem({ option }: { option: SelectOption }) {
  return (
    <BaseSelect.Item value={option.value} disabled={option.disabled} className={styles.item}>
      <span className={styles.itemIndicator}>
        <BaseSelect.ItemIndicator>
          <CheckIcon size={16} />
        </BaseSelect.ItemIndicator>
      </span>
      <BaseSelect.ItemText className={styles.itemText}>{option.label}</BaseSelect.ItemText>
    </BaseSelect.Item>
  );
}

export function Select({
  label,
  options,
  placeholder = "Select…",
  description,
  error,
  value,
  defaultValue,
  onValueChange,
  name,
  required,
  disabled,
  className,
}: SelectProps) {
  const grouped = isGrouped(options);
  const items = grouped
    ? options.flatMap((group) => group.options).map((option) => ({ value: option.value, label: option.label }))
    : options.map((option) => ({ value: option.value, label: option.label }));

  return (
    <Field.Root className={cx(fieldStyles.field, className)} invalid={Boolean(error)} disabled={disabled} name={name}>
      <Field.Label className={fieldStyles.label} nativeLabel={false} render={<div />}>
        {label}
        {required && (
          <span className={fieldStyles.required} aria-hidden>
            *
          </span>
        )}
      </Field.Label>
      <BaseSelect.Root
        items={items}
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange ? (next) => onValueChange(next as string | null) : undefined}
        required={required}
        disabled={disabled}
      >
        <BaseSelect.Trigger className={styles.trigger}>
          <BaseSelect.Value className={styles.value} placeholder={placeholder} />
          <BaseSelect.Icon className={styles.triggerIcon}>
            <ChevronDownIcon size={16} />
          </BaseSelect.Icon>
        </BaseSelect.Trigger>
        <BaseSelect.Portal>
          <BaseSelect.Positioner className={styles.positioner} sideOffset={6} alignItemWithTrigger={false}>
            <BaseSelect.Popup className={styles.popup}>
              <BaseSelect.List>
                {grouped
                  ? options.map((group, index) => (
                      <Fragment key={group.label}>
                        {index > 0 && <BaseSelect.Separator className={styles.separator} />}
                        <BaseSelect.Group>
                          <BaseSelect.GroupLabel className={styles.groupLabel}>{group.label}</BaseSelect.GroupLabel>
                          {group.options.map((option) => (
                            <OptionItem key={option.value} option={option} />
                          ))}
                        </BaseSelect.Group>
                      </Fragment>
                    ))
                  : options.map((option) => <OptionItem key={option.value} option={option} />)}
              </BaseSelect.List>
            </BaseSelect.Popup>
          </BaseSelect.Positioner>
        </BaseSelect.Portal>
      </BaseSelect.Root>
      {description && <Field.Description className={fieldStyles.description}>{description}</Field.Description>}
      {error && (
        <Field.Error match className={fieldStyles.error}>
          <ErrorIcon size={16} />
          {error}
        </Field.Error>
      )}
    </Field.Root>
  );
}
