/** Where extracted game images are served. `NEXT_PUBLIC_DFFOO_CDN` points at another copy of the dffoogg/cdn repo. */
export const GAME_CDN_URL = process.env.NEXT_PUBLIC_DFFOO_CDN ?? "https://dffoogg.github.io/cdn";

/** URL of a file in the CDN, such as `characters/8.png` or `maps/001.png`. */
export function gameCdnSrc(path: string): string {
  return `${GAME_CDN_URL}/${path}`;
}

export const GAME_ICON_NAMES = [
  "cutscene",
  "battle",
  "treasure",
  "move",
  "portal",
  "start",
  "goal",
  "helmet-silver",
  "helmet-gold",
  "helmet-green",
  "hex-grid",
  "hex-event",
  "hex-selected",
] as const;

/**
 * Where the hex line sits inside the untrimmed 256 by 256 `hex-grid`, `hex-event` and
 * `hex-selected` textures, measured between corner pixel centres, so a map can fit that box to its cell.
 * The game's cell is irregular: the top edge spans 73 px of the 179 px width, and
 * cells tile at 126 px per column (half the width plus half the top edge).
 */
export const GAME_HEX_FRAME = { size: 256, left: 38.5, top: 65.5, width: 179, height: 125 } as const;

export type GameIconName = (typeof GAME_ICON_NAMES)[number];

export interface GameIconProps {
  name: GameIconName;
  /** Drawn size in CSS pixels. The source art is larger and scales down. */
  size?: number;
  /** Accessible name. Omit when the icon sits next to a visible label. */
  label?: string;
  className?: string;
}

/** URL of a sprite, for places an `<img>` can't go, such as an SVG `<image>`. */
export function gameIconSrc(name: GameIconName): string {
  return gameCdnSrc(`icons/${name}.png`);
}

/** A sprite taken from the game client. Decorative unless `label` is set. */
export function GameIcon({ name, size = 24, label, className }: GameIconProps) {
  return (
    // The sprite is a fixed bitmap; next/image's layout helpers don't apply inside a component library.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={className}
      src={gameIconSrc(name)}
      alt={label ?? ""}
      width={size}
      height={size}
      draggable={false}
      style={{ width: size, height: size, objectFit: "contain" }}
    />
  );
}
