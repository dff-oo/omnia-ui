"use client";

import { Field } from "@base-ui/react/field";
import type { ComponentPropsWithRef, ReactNode } from "react";
import { ErrorIcon } from "../icons";
import { cx } from "../lib/cx";
import styles from "./Field.module.css";

interface FieldChromeProps {
  label: ReactNode;
  description?: ReactNode;
  /** Error message. When set the field is marked invalid and the message is announced. */
  error?: ReactNode;
  size?: "md" | "lg";
  className?: string;
}

export interface TextFieldProps
  extends FieldChromeProps,
    Omit<ComponentPropsWithRef<"input">, "size" | "className" | "prefix"> {
  prefix?: ReactNode;
  suffix?: ReactNode;
}

function FieldLabel({ children, required }: { children: ReactNode; required?: boolean }) {
  return (
    <Field.Label className={styles.label}>
      {children}
      {required && (
        <span className={styles.required} aria-hidden>
          *
        </span>
      )}
    </Field.Label>
  );
}

function FieldMessages({ description, error }: Pick<FieldChromeProps, "description" | "error">) {
  return (
    <>
      {description && <Field.Description className={styles.description}>{description}</Field.Description>}
      {error && (
        <Field.Error match className={styles.error}>
          <ErrorIcon size={16} />
          {error}
        </Field.Error>
      )}
    </>
  );
}

export function TextField({
  label,
  description,
  error,
  size = "md",
  prefix,
  suffix,
  className,
  disabled,
  required,
  name,
  ...inputProps
}: TextFieldProps) {
  return (
    <Field.Root className={cx(styles.field, className)} invalid={Boolean(error)} disabled={disabled} name={name}>
      <FieldLabel required={required}>{label}</FieldLabel>
      <div className={cx(styles.control, size === "lg" && styles.lg)} data-invalid={error ? "" : undefined} data-disabled={disabled ? "" : undefined}>
        {prefix && <span className={styles.affix}>{prefix}</span>}
        <Field.Control className={styles.input} required={required} {...inputProps} />
        {suffix && <span className={styles.affix}>{suffix}</span>}
      </div>
      <FieldMessages description={description} error={error} />
    </Field.Root>
  );
}

export interface TextAreaProps extends FieldChromeProps, Omit<ComponentPropsWithRef<"textarea">, "className"> {
  resize?: "none" | "vertical";
}

export function TextArea({
  label,
  description,
  error,
  resize = "vertical",
  className,
  disabled,
  required,
  name,
  ...textareaProps
}: TextAreaProps) {
  return (
    <Field.Root className={cx(styles.field, className)} invalid={Boolean(error)} disabled={disabled} name={name}>
      <FieldLabel required={required}>{label}</FieldLabel>
      <div
        className={cx(styles.control, styles.textareaControl)}
        data-invalid={error ? "" : undefined}
        data-disabled={disabled ? "" : undefined}
      >
        <Field.Control
          render={
            <textarea
              className={cx(styles.input, styles.textarea, resize === "none" ? styles.resizeNone : styles.resizeVertical)}
              required={required}
              {...textareaProps}
            />
          }
        />
      </div>
      <FieldMessages description={description} error={error} />
    </Field.Root>
  );
}
