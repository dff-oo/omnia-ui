"use client";

import { Checkbox as BaseCheckbox } from "@base-ui/react/checkbox";
import { Field } from "@base-ui/react/field";
import { Radio } from "@base-ui/react/radio";
import { RadioGroup as BaseRadioGroup } from "@base-ui/react/radio-group";
import { Switch as BaseSwitch } from "@base-ui/react/switch";
import { useId, type ComponentProps, type ReactNode } from "react";
import { CheckIcon, ErrorIcon, MinusIcon } from "../icons";
import { cx } from "../lib/cx";
import styles from "./Field.module.css";

interface ChoiceChromeProps {
  label: ReactNode;
  description?: ReactNode;
  error?: ReactNode;
  className?: string;
}

function ChoiceShell({
  label,
  description,
  error,
  disabled,
  className,
  name,
  control,
  indent,
}: ChoiceChromeProps & { disabled?: boolean; name?: string; control: ReactNode; indent: "box" | "switch" }) {
  return (
    <Field.Root
      className={cx(styles.field, styles.choiceField, indent === "switch" && styles.choiceFieldSwitch, className)}
      invalid={Boolean(error)}
      disabled={disabled}
      name={name}
    >
      <Field.Label className={styles.choice} data-disabled={disabled ? "" : undefined}>
        {control}
        <span className={styles.choiceText}>{label}</span>
      </Field.Label>
      {description && <Field.Description className={styles.choiceDescription}>{description}</Field.Description>}
      {error && (
        <Field.Error match className={styles.error}>
          <ErrorIcon size={16} />
          {error}
        </Field.Error>
      )}
    </Field.Root>
  );
}

export interface CheckboxProps
  extends ChoiceChromeProps,
    Omit<ComponentProps<typeof BaseCheckbox.Root>, "className" | "render" | "children"> {}

export function Checkbox({ label, description, error, className, disabled, name, ...props }: CheckboxProps) {
  return (
    <ChoiceShell
      label={label}
      description={description}
      error={error}
      disabled={disabled}
      className={className}
      name={name}
      indent="box"
      control={
        <BaseCheckbox.Root className={styles.box} disabled={disabled} {...props}>
          <BaseCheckbox.Indicator
            render={(indicatorProps, state) => (
              <span {...indicatorProps}>
                {state.indeterminate ? <MinusIcon size={16} /> : <CheckIcon size={16} />}
              </span>
            )}
          />
        </BaseCheckbox.Root>
      }
    />
  );
}

export interface SwitchProps
  extends ChoiceChromeProps,
    Omit<ComponentProps<typeof BaseSwitch.Root>, "className" | "render" | "children"> {}

export function Switch({ label, description, error, className, disabled, name, ...props }: SwitchProps) {
  return (
    <ChoiceShell
      label={label}
      description={description}
      error={error}
      disabled={disabled}
      className={className}
      name={name}
      indent="switch"
      control={
        <BaseSwitch.Root className={styles.switch} disabled={disabled} {...props}>
          <BaseSwitch.Thumb className={styles.thumb} />
        </BaseSwitch.Root>
      }
    />
  );
}

export interface RadioOption {
  value: string;
  label: ReactNode;
  description?: ReactNode;
  disabled?: boolean;
}

export interface RadioGroupProps
  extends Omit<ComponentProps<typeof BaseRadioGroup>, "className" | "render" | "children"> {
  label: ReactNode;
  options: RadioOption[];
  description?: ReactNode;
  error?: ReactNode;
  orientation?: "vertical" | "horizontal";
  className?: string;
}

export function RadioGroup({
  label,
  options,
  description,
  error,
  orientation = "vertical",
  className,
  disabled,
  ...props
}: RadioGroupProps) {
  const id = useId();
  const labelId = `${id}-label`;
  const descriptionId = description ? `${id}-description` : undefined;
  const errorId = error ? `${id}-error` : undefined;

  return (
    <div className={cx(styles.field, className)}>
      <div id={labelId} className={styles.label}>
        {label}
      </div>
      {description && (
        <p id={descriptionId} className={styles.description}>
          {description}
        </p>
      )}
      <BaseRadioGroup
        aria-labelledby={labelId}
        aria-describedby={cx(descriptionId, errorId) || undefined}
        aria-invalid={error ? true : undefined}
        className={cx(styles.group, orientation === "horizontal" && styles.groupHorizontal)}
        disabled={disabled}
        {...props}
      >
        {options.map((option) => {
          const optionDisabled = disabled || option.disabled;
          const optionDescriptionId = option.description ? `${id}-${option.value}-description` : undefined;
          return (
            <div key={option.value} className={styles.choiceField}>
              <label className={styles.choice} data-disabled={optionDisabled ? "" : undefined}>
                <Radio.Root
                  value={option.value}
                  disabled={option.disabled}
                  className={styles.radio}
                  aria-describedby={optionDescriptionId}
                >
                  <Radio.Indicator className={styles.radioDot} />
                </Radio.Root>
                <span className={styles.choiceText}>{option.label}</span>
              </label>
              {option.description && (
                <p id={optionDescriptionId} className={styles.choiceDescription}>
                  {option.description}
                </p>
              )}
            </div>
          );
        })}
      </BaseRadioGroup>
      {error && (
        <p id={errorId} className={styles.error}>
          <ErrorIcon size={16} />
          {error}
        </p>
      )}
    </div>
  );
}
