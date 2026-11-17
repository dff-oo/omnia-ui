import { Avatar as BaseAvatar } from "@base-ui/react/avatar";
import type { CSSProperties, ReactNode } from "react";
import { ImageOffIcon } from "../icons";
import { cx } from "../lib/cx";
import styles from "./Media.module.css";

/* -------------------------------------------------------------------------- */

export interface AvatarProps {
  src?: string;
  /** Person or entity name. Used for alt text and initials fallback. */
  name: string;
  size?: 32 | 40 | 48 | 64;
  shape?: "circle" | "rounded";
  className?: string;
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export function Avatar({ src, name, size = 40, shape = "circle", className }: AvatarProps) {
  return (
    <BaseAvatar.Root
      className={cx(styles.avatar, shape === "rounded" && styles.rounded, className)}
      style={{ "--_size": `${size}px` } as CSSProperties}
    >
      {src && <BaseAvatar.Image src={src} alt={name} className={styles.avatarImage} />}
      <BaseAvatar.Fallback aria-label={src ? undefined : name}>{initials(name)}</BaseAvatar.Fallback>
    </BaseAvatar.Root>
  );
}

/* -------------------------------------------------------------------------- */

export interface ArtPlaceholderProps {
  /** 0–360. Lets fixtures differentiate placeholders without real artwork. */
  hue?: number;
  className?: string;
}

/** Self-authored decorative artwork stand-in. */
export function ArtPlaceholder({ hue = 218, className }: ArtPlaceholderProps) {
  return (
    <span
      aria-hidden
      className={cx(styles.art, className)}
      style={
        {
          "--_hue-from": `oklch(58% 0.12 ${hue})`,
          "--_hue-to": `oklch(26% 0.07 ${(hue + 30) % 360})`,
        } as CSSProperties
      }
    >
      <svg className={styles.artGlyph} viewBox="0 0 64 96" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M32 2 56 30 32 94 8 30 32 2Z" fill="currentColor" fillOpacity="0.12" />
        <path d="M8 30h48M32 2l-8 28 8 64 8-64-8-28" />
      </svg>
    </span>
  );
}

/* -------------------------------------------------------------------------- */

export interface ImageFrameProps {
  /** Width / height, e.g. `3 / 4`. */
  ratio?: number;
  src?: string;
  /** Required with `src`. Use `""` for purely decorative images. */
  alt?: string;
  /** CSS object-position for safe cropping, e.g. `"50% 20%"` to keep faces in frame. */
  focus?: string;
  /** Hue for the generated placeholder when there is no image. */
  placeholderHue?: number;
  /** Show an explicit "no image" state instead of decorative placeholder art. */
  showMissing?: boolean;
  /** Custom media, e.g. a Next `<Image fill />`. Takes precedence over `src`. */
  children?: ReactNode;
  className?: string;
}

export function ImageFrame({
  ratio = 1,
  src,
  alt = "",
  focus,
  placeholderHue,
  showMissing,
  children,
  className,
}: ImageFrameProps) {
  let media: ReactNode;
  if (children) {
    media = children;
  } else if (src) {
    // eslint-disable-next-line @next/next/no-img-element -- design-system primitive; callers pass Next <Image> as children when optimisation is wanted.
    media = <img src={src} alt={alt} loading="lazy" decoding="async" />;
  } else if (showMissing) {
    media = (
      <span className={styles.missing}>
        <ImageOffIcon size={24} />
        <span>No image</span>
      </span>
    );
  } else {
    media = <ArtPlaceholder hue={placeholderHue} />;
  }

  return (
    <span
      className={cx(styles.frame, className)}
      style={{ "--_ratio": ratio, "--_focus": focus } as CSSProperties}
    >
      {media}
    </span>
  );
}
