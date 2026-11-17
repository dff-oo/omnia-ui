import type { ReactNode, SVGProps } from "react";

export type IconSize = 16 | 20 | 24 | 32;

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, "children"> {
  size?: IconSize;
  /** Accessible name. Omit for decorative icons next to visible text. */
  label?: string;
}

interface BaseIconProps extends IconProps {
  children: ReactNode;
}

function BaseIcon({ size = 20, label, children, ...props }: BaseIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      focusable="false"
      {...(label ? { role: "img", "aria-label": label } : { "aria-hidden": true })}
      {...props}
    >
      {children}
    </svg>
  );
}

function createIcon(displayName: string, paths: ReactNode) {
  function IconComponent(props: IconProps) {
    return <BaseIcon {...props}>{paths}</BaseIcon>;
  }
  IconComponent.displayName = displayName;
  return IconComponent;
}

export const SunIcon = createIcon(
  "SunIcon",
  <>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2.5v2M12 19.5v2M4.6 4.6 6 6M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4 6 18M18 6l1.4-1.4" />
  </>,
);

export const MoonIcon = createIcon("MoonIcon", <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />);

export const MonitorIcon = createIcon(
  "MonitorIcon",
  <>
    <rect x="3" y="4" width="18" height="12" rx="2" />
    <path d="M8 20h8M12 16v4" />
  </>,
);

export const CheckIcon = createIcon("CheckIcon", <path d="m5 12.5 4.5 4.5L19 7.5" />);
export const MinusIcon = createIcon("MinusIcon", <path d="M5 12h14" />);
export const PlusIcon = createIcon("PlusIcon", <path d="M12 5v14M5 12h14" />);
export const CloseIcon = createIcon("CloseIcon", <path d="M6 6l12 12M18 6 6 18" />);
export const ChevronDownIcon = createIcon("ChevronDownIcon", <path d="m6 9 6 6 6-6" />);
export const ChevronUpIcon = createIcon("ChevronUpIcon", <path d="m6 15 6-6 6 6" />);
export const ChevronRightIcon = createIcon("ChevronRightIcon", <path d="m9 6 6 6-6 6" />);
export const ChevronLeftIcon = createIcon("ChevronLeftIcon", <path d="m15 6-6 6 6 6" />);
export const ArrowRightIcon = createIcon("ArrowRightIcon", <path d="M5 12h14M13 6l6 6-6 6" />);

export const SearchIcon = createIcon(
  "SearchIcon",
  <>
    <circle cx="11" cy="11" r="6.5" />
    <path d="m20 20-4.2-4.2" />
  </>,
);

export const InfoIcon = createIcon(
  "InfoIcon",
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 11v5.5M12 7.5v.01" />
  </>,
);

export const SuccessIcon = createIcon(
  "SuccessIcon",
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="m8 12.5 2.8 2.8L16.5 9.5" />
  </>,
);

export const WarningIcon = createIcon(
  "WarningIcon",
  <>
    <path d="M10.3 4.2 2.8 17.5A2 2 0 0 0 4.5 20.5h15a2 2 0 0 0 1.7-3L13.7 4.2a2 2 0 0 0-3.4 0Z" />
    <path d="M12 10v4M12 17v.01" />
  </>,
);

export const ErrorIcon = createIcon(
  "ErrorIcon",
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7.5V13M12 16.5v.01" />
  </>,
);

export const MoreIcon = createIcon(
  "MoreIcon",
  <path d="M5.5 12h.01M12 12h.01M18.5 12h.01" strokeWidth={3} />,
);

export const MenuIcon = createIcon("MenuIcon", <path d="M4 7h16M4 12h16M4 17h16" />);

export const GridIcon = createIcon(
  "GridIcon",
  <>
    <rect x="4" y="4" width="6.5" height="6.5" rx="1.5" />
    <rect x="13.5" y="4" width="6.5" height="6.5" rx="1.5" />
    <rect x="4" y="13.5" width="6.5" height="6.5" rx="1.5" />
    <rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.5" />
  </>,
);

export const ListIcon = createIcon("ListIcon", <path d="M9 6.5h11M9 12h11M9 17.5h11M4.5 6.5h.01M4.5 12h.01M4.5 17.5h.01" />);

export const SwapIcon = createIcon("SwapIcon", <path d="M7 4 4 7l3 3M4 7h13M17 20l3-3-3-3M20 17H7" />);

export const LockIcon = createIcon(
  "LockIcon",
  <>
    <rect x="5" y="10.5" width="14" height="10" rx="2" />
    <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" />
  </>,
);

export const SettingsIcon = createIcon(
  "SettingsIcon",
  <>
    <circle cx="12" cy="12" r="3" />
    <path d="M12 2.8v2.4M12 18.8v2.4M2.8 12h2.4M18.8 12h2.4M5.5 5.5l1.7 1.7M16.8 16.8l1.7 1.7M5.5 18.5l1.7-1.7M16.8 7.2l1.7-1.7" />
  </>,
);

export const UndoIcon = createIcon("UndoIcon", <path d="M9 14 4 9l5-5M4 9h10.5a5.5 5.5 0 0 1 0 11H11" />);
export const RedoIcon = createIcon("RedoIcon", <path d="m15 14 5-5-5-5M20 9H9.5a5.5 5.5 0 0 0 0 11H13" />);
export const DownloadIcon = createIcon("DownloadIcon", <path d="M12 4v11M7 10.5l5 5 5-5M5 20h14" />);
export const UploadIcon = createIcon("UploadIcon", <path d="M12 20V9M7 13.5l5-5 5 5M5 4h14" />);

export const LinkIcon = createIcon(
  "LinkIcon",
  <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" />,
);

export const TrashIcon = createIcon(
  "TrashIcon",
  <path d="M4 7h16M9.5 7V4.5h5V7M6.5 7l.8 12a1.5 1.5 0 0 0 1.5 1.5h6.4a1.5 1.5 0 0 0 1.5-1.5l.8-12M10 11v6M14 11v6" />,
);

export const FilePlusIcon = createIcon(
  "FilePlusIcon",
  <>
    <path d="M14 3.5H7A1.5 1.5 0 0 0 5.5 5v14A1.5 1.5 0 0 0 7 20.5h10a1.5 1.5 0 0 0 1.5-1.5V8L14 3.5Z" />
    <path d="M14 3.5V8h4.5M12 11v6M9 14h6" />
  </>,
);

export const FolderOpenIcon = createIcon(
  "FolderOpenIcon",
  <path d="M3.5 18.5V6A1.5 1.5 0 0 1 5 4.5h4l2 2.5h7A1.5 1.5 0 0 1 19.5 8.5V10M3.5 18.5 6.3 11a1.5 1.5 0 0 1 1.4-1h12.6a1 1 0 0 1 .9 1.4l-2.6 6.8a1.5 1.5 0 0 1-1.4 1H5a1.5 1.5 0 0 1-1.5-1.5Z" />,
);

export const SidebarIcon = createIcon(
  "SidebarIcon",
  <>
    <rect x="3.5" y="4.5" width="17" height="15" rx="2" />
    <path d="M14.5 4.5v15" />
  </>,
);

/* Omnia motif icons — original geometry. */

export const CrystalIcon = createIcon(
  "CrystalIcon",
  <>
    <path d="M12 2.5 18 9l-6 12.5L6 9l6-6.5Z" />
    <path d="M6 9h12M12 2.5 10 9l2 12.5L14 9l-2-6.5" />
  </>,
);

export const StarIcon = createIcon(
  "StarIcon",
  <path d="m12 3.5 2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.8-5.2 2.8 1-5.8-4.3-4.1 5.9-.9L12 3.5Z" />,
);

export const SparkleIcon = createIcon(
  "SparkleIcon",
  <path d="M12 3c.6 4.3 2.7 6.4 7 7-4.3.6-6.4 2.7-7 7-.6-4.3-2.7-6.4-7-7 4.3-.6 6.4-2.7 7-7ZM18.5 15.5c.3 1.7 1 2.4 2.5 2.5-1.5.3-2.2 1-2.5 2.5-.3-1.5-1-2.2-2.5-2.5 1.5-.1 2.2-.8 2.5-2.5Z" />,
);

export const GemIcon = createIcon(
  "GemIcon",
  <>
    <path d="M7 4h10l4 5-9 11L3 9l4-5Z" />
    <path d="M3 9h18M9.5 4 8 9l4 11 4-11-1.5-5" />
  </>,
);

export const CoinIcon = createIcon(
  "CoinIcon",
  <>
    <circle cx="12" cy="12" r="8.5" />
    <circle cx="12" cy="12" r="5" />
  </>,
);

export const TicketIcon = createIcon(
  "TicketIcon",
  <>
    <path d="M4 7.5A1.5 1.5 0 0 1 5.5 6h13A1.5 1.5 0 0 1 20 7.5V10a2 2 0 0 0 0 4v2.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 16.5V14a2 2 0 0 0 0-4V7.5Z" />
    <path d="M14 6v12" strokeDasharray="2 2.5" />
  </>,
);

export const SwordIcon = createIcon(
  "SwordIcon",
  <path d="M14.5 3.5H20.5V9.5L10 20l-2-2-2.5 2.5-1-1L7 17l-2-2L14.5 3.5ZM7 13l4 4" />,
);

export const ShieldIcon = createIcon("ShieldIcon", <path d="M12 3 4.5 6v5.5c0 4.6 3.1 8 7.5 9.5 4.4-1.5 7.5-4.9 7.5-9.5V6L12 3Z" />);

export const RingIcon = createIcon(
  "RingIcon",
  <>
    <circle cx="12" cy="14.5" r="6" />
    <path d="m9.5 5 2.5-2 2.5 2-2.5 3.5L9.5 5Z" />
  </>,
);

export const ArmorIcon = createIcon(
  "ArmorIcon",
  <path d="M8 3.5 4 6v5l2.5 1V20h11v-8L20 11V6l-4-2.5c-.7 1.5-2.1 2.5-4 2.5s-3.3-1-4-2.5Z" />,
);

export const ScrollIcon = createIcon(
  "ScrollIcon",
  <>
    <path d="M7 4h11a2 2 0 0 1 2 2v1.5h-4M7 4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2V7.5" />
    <path d="M9 10h6M9 13.5h6M9 17h3.5" />
  </>,
);

export const PartyIcon = createIcon(
  "PartyIcon",
  <>
    <circle cx="12" cy="8" r="3" />
    <circle cx="5.5" cy="10" r="2.2" />
    <circle cx="18.5" cy="10" r="2.2" />
    <path d="M6.5 20a5.5 5.5 0 0 1 11 0M2.5 18.5a3.5 3.5 0 0 1 4.3-3.4M21.5 18.5a3.5 3.5 0 0 0-4.3-3.4" />
  </>,
);

export const GiftIcon = createIcon(
  "GiftIcon",
  <>
    <rect x="4" y="9" width="16" height="11" rx="1.5" />
    <path d="M3 9h18M12 9v11M12 9c-1.5-3.5-5.5-4-5.5-1.5S10 9 12 9Zm0 0c1.5-3.5 5.5-4 5.5-1.5S14 9 12 9Z" />
  </>,
);

export const CompassIcon = createIcon(
  "CompassIcon",
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" />
  </>,
);

export const ImageOffIcon = createIcon(
  "ImageOffIcon",
  <>
    <path d="M4 4l16 16" />
    <path d="M9.5 5H18a2 2 0 0 1 2 2v8.5M18 20H6a2 2 0 0 1-2-2V7.5" />
    <path d="m4 16 4-4 3 3M14 13l1-1 5 5" />
  </>,
);

export const ClockIcon = createIcon(
  "ClockIcon",
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </>,
);
