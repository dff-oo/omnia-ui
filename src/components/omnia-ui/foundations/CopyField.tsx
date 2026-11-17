"use client";

import { Field } from "@base-ui/react/field";
import { useState, type ReactNode } from "react";
import { CheckIcon, CopyIcon } from "../icons";
import { cx } from "../lib/cx";
import { IconButton } from "./Button";
import fieldStyles from "./Field.module.css";
import styles from "./CopyField.module.css";

export interface CopyFieldProps {
  label: ReactNode;
  /** The text shown and copied. */
  value: string;
  description?: ReactNode;
  copyLabel?: string;
  copiedLabel?: string;
  className?: string;
}

/** A read-only value with a button that copies it. */
export function CopyField({
  label,
  value,
  description,
  copyLabel = "Copy",
  copiedLabel = "Copied",
  className,
}: CopyFieldProps) {
  const [copied, setCopied] = useState(false);

  return (
    <Field.Root className={cx(fieldStyles.field, className)}>
      <Field.Label className={fieldStyles.label}>{label}</Field.Label>
      <div className={cx(fieldStyles.control, styles.control)}>
        <Field.Control className={cx(fieldStyles.input, styles.value)} readOnly value={value} />
        <IconButton
          size="sm"
          label={copied ? copiedLabel : copyLabel}
          icon={copied ? <CheckIcon size={16} /> : <CopyIcon size={16} />}
          onClick={() => {
            void navigator.clipboard.writeText(value).then(() => {
              setCopied(true);
              window.setTimeout(() => setCopied(false), 2000);
            });
          }}
        />
      </div>
      {description && <Field.Description className={fieldStyles.description}>{description}</Field.Description>}
      <span className="omnia-sr-only" role="status">
        {copied ? `${copiedLabel}.` : ""}
      </span>
    </Field.Root>
  );
}
