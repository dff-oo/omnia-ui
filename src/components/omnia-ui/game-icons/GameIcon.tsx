import type { StaticImageData } from "next/image";
import battle from "./battle.png";
import cutscene from "./cutscene.png";
import goal from "./goal.png";
import helmetGold from "./helmet-gold.png";
import helmetGreen from "./helmet-green.png";
import helmetSilver from "./helmet-silver.png";
import hexEvent from "./hex-event.png";
import hexGrid from "./hex-grid.png";
import move from "./move.png";
import portal from "./portal.png";
import start from "./start.png";
import treasure from "./treasure.png";

const ICONS = {
  cutscene,
  battle,
  treasure,
  move,
  portal,
  start,
  goal,
  "helmet-silver": helmetSilver,
  "helmet-gold": helmetGold,
  "helmet-green": helmetGreen,
  "hex-grid": hexGrid,
  "hex-event": hexEvent,
} satisfies Record<string, StaticImageData>;

/**
 * Where the hex line sits inside the untrimmed 256 by 256 `hex-grid` and `hex-event`
 * textures, measured between corner pixel centres, so a map can fit that box to its cell.
 * The game's cell is irregular: the top edge spans 73 px of the 179 px width, and
 * cells tile at 126 px per column (half the width plus half the top edge).
 */
export const GAME_HEX_FRAME = { size: 256, left: 38.5, top: 65.5, width: 179, height: 125 } as const;

export type GameIconName = keyof typeof ICONS;

export interface GameIconProps {
  name: GameIconName;
  /** Drawn size in CSS pixels. The source art is larger and scales down. */
  size?: number;
  /** Accessible name. Omit when the icon sits next to a visible label. */
  label?: string;
  className?: string;
}

function source(image: StaticImageData | string): string {
  return typeof image === "string" ? image : image.src;
}

/** URL of a sprite, for places an `<img>` can't go, such as an SVG `<image>`. */
export function gameIconSrc(name: GameIconName): string {
  return source(ICONS[name]);
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
