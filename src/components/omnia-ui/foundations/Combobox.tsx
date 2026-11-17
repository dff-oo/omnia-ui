"use client";

import { Combobox as BaseCombobox } from "@base-ui/react/combobox";
import { Field } from "@base-ui/react/field";
import { useMemo, type ReactNode } from "react";
import { CheckIcon, ChevronDownIcon, CloseIcon, ErrorIcon } from "../icons";
import { cx } from "../lib/cx";
import fieldStyles from "./Field.module.css";
import styles from "./Popup.module.css";

export interface ComboboxOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface ComboboxProps {
  label: ReactNode;
  options: readonly ComboboxOption[];
  value?: string | null;
  defaultValue?: string | null;
  onValueChange?: (value: string | null) => void;
  placeholder?: string;
  description?: ReactNode;
  error?: ReactNode;
  /** Show a button that clears the selection. */
  clearable?: boolean;
  /** Accessible name for the clear button. Defaults to "Clear {label}" when the label is a string. */
  clearLabel?: string;
  /** Most matches rendered at once, so long lists stay responsive. Typing narrows the rest. */
  limit?: number;
  emptyMessage?: ReactNode;
  name?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

const isSameOption = (a: ComboboxOption, b: ComboboxOption) => a.value === b.value;

/** Type-to-filter single select for lists too long to scroll. For short lists use `Select`. */
export function Combobox({
  label,
  options,
  value,
  defaultValue,
  onValueChange,
  placeholder,
  description,
  error,
  clearable = false,
  clearLabel,
  limit = 100,
  emptyMessage = "No matches",
  name,
  required,
  disabled,
  className,
}: ComboboxProps) {
  const byValue = useMemo(() => new Map(options.map((option) => [option.value, option])), [options]);
  // A value missing from the options (e.g. not loaded yet) still shows, labelled by its value.
  const toOption = (key: string | null | undefined) =>
    key === undefined ? undefined : key === null ? null : (byValue.get(key) ?? { value: key, label: key });

  return (
    <Field.Root className={cx(fieldStyles.field, className)} invalid={Boolean(error)} disabled={disabled} name={name}>
      <Field.Label className={fieldStyles.label}>
        {label}
        {required && (
          <span className={fieldStyles.required} aria-hidden>
            *
          </span>
        )}
      </Field.Label>
      <BaseCombobox.Root<ComboboxOption>
        items={options}
        value={toOption(value)}
        defaultValue={toOption(defaultValue)}
        onValueChange={onValueChange ? (next) => onValueChange(next?.value ?? null) : undefined}
        isItemEqualToValue={isSameOption}
        limit={limit}
        required={required}
        disabled={disabled}
      >
        <BaseCombobox.InputGroup
          className={cx(fieldStyles.control, styles.comboControl)}
          data-invalid={error ? "" : undefined}
          data-disabled={disabled ? "" : undefined}
        >
          <BaseCombobox.Input className={fieldStyles.input} placeholder={placeholder} />
          {clearable && (
            <BaseCombobox.Clear
              className={styles.comboButton}
              aria-label={clearLabel ?? (typeof label === "string" ? `Clear ${label}` : "Clear")}
            >
              <CloseIcon size={16} />
            </BaseCombobox.Clear>
          )}
          <BaseCombobox.Trigger className={cx(styles.comboButton, styles.comboTrigger)} aria-label="Show options">
            <ChevronDownIcon size={16} />
          </BaseCombobox.Trigger>
        </BaseCombobox.InputGroup>
        <BaseCombobox.Portal>
          <BaseCombobox.Positioner className={styles.positioner} sideOffset={6}>
            <BaseCombobox.Popup className={styles.comboPopup}>
              <BaseCombobox.Empty className={styles.empty}>{emptyMessage}</BaseCombobox.Empty>
              <BaseCombobox.List>
                {(option: ComboboxOption) => (
                  <BaseCombobox.Item key={option.value} value={option} disabled={option.disabled} className={styles.item}>
                    <span className={styles.itemIndicator}>
                      <BaseCombobox.ItemIndicator>
                        <CheckIcon size={16} />
                      </BaseCombobox.ItemIndicator>
                    </span>
                    <span className={styles.itemText}>{option.label}</span>
                  </BaseCombobox.Item>
                )}
              </BaseCombobox.List>
            </BaseCombobox.Popup>
          </BaseCombobox.Positioner>
        </BaseCombobox.Portal>
      </BaseCombobox.Root>
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
