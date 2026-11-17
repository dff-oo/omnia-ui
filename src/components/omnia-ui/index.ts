/* Theme */
export { ThemeScript } from "./theme/ThemeScript";
export { ThemeRoot, type ThemeRootProps } from "./theme/ThemeRoot";
export { ThemeSwitcher, type ThemeSwitcherProps } from "./theme/ThemeSwitcher";
export { useThemePreference } from "./theme/useThemePreference";
export type { OmniaTheme, OmniaThemePreference } from "./theme/theme";

/* Foundations */
export { Button, IconButton, type ButtonProps, type IconButtonProps } from "./foundations/Button";
export { buttonClasses, type ButtonVariant, type ButtonSize, type ButtonStyleOptions } from "./foundations/buttonClasses";
export { Spinner, type SpinnerProps } from "./foundations/Spinner";
export { TextField, TextArea, type TextFieldProps, type TextAreaProps } from "./foundations/TextField";
export {
  Checkbox,
  Switch,
  RadioGroup,
  type CheckboxProps,
  type SwitchProps,
  type RadioGroupProps,
  type RadioOption,
} from "./foundations/Choice";
export {
  SegmentedControl,
  type SegmentedControlProps,
  type SegmentedOption,
} from "./foundations/SegmentedControl";
export { Select, type SelectProps, type SelectOption, type SelectOptionGroup } from "./foundations/Select";
export { Combobox, type ComboboxProps, type ComboboxOption } from "./foundations/Combobox";
export {
  Dialog,
  DialogClose,
  AlertDialog,
  AlertDialogClose,
  type DialogProps,
  type AlertDialogProps,
} from "./foundations/Dialog";
export { Tabs, TabList, Tab, TabPanel, type TabsProps, type TabListProps, type TabProps, type TabPanelProps } from "./foundations/Tabs";
export {
  Tooltip,
  TooltipProvider,
  Popover,
  Menu,
  MenuItem,
  MenuGroup,
  MenuSeparator,
  type TooltipProps,
  type PopoverProps,
  type MenuProps,
  type MenuItemProps,
} from "./foundations/Overlay";
export { Badge, StatusBadge, type BadgeProps, type BadgeTone, type StatusBadgeProps, type Status } from "./foundations/Badge";
export {
  Panel,
  Card,
  CrystalPanel,
  type PanelProps,
  type CardProps,
  type CrystalPanelProps,
  type SurfaceVariant,
} from "./foundations/Panel";
export {
  Separator,
  Skeleton,
  Progress,
  EmptyState,
  Callout,
  type SeparatorProps,
  type SkeletonProps,
  type ProgressProps,
  type EmptyStateProps,
  type CalloutProps,
  type CalloutTone,
  type MeterTone,
} from "./foundations/Feedback";
export {
  Avatar,
  ImageFrame,
  ArtPlaceholder,
  type AvatarProps,
  type ImageFrameProps,
  type ArtPlaceholderProps,
} from "./foundations/Media";

/* Signature */
export { SectionHeading, type SectionHeadingProps } from "./signature/SectionHeading";
export { Ornament, type OrnamentProps } from "./signature/Ornament";
export {
  ResourceCounter,
  Stat,
  StatList,
  StatBar,
  LevelBadge,
  RarityMarker,
  toneForTier,
  type Tone,
  type ResourceCounterProps,
  type StatItem,
  type StatListProps,
  type StatBarProps,
  type LevelBadgeProps,
  type RarityMarkerProps,
} from "./signature/Data";
export {
  FeatureAction,
  PortraitCard,
  EquipmentSlot,
  QuestNode,
  RewardTile,
  type FeatureActionProps,
  type PortraitCardProps,
  type EquipmentSlotProps,
  type EquipmentSlotItem,
  type QuestNodeProps,
  type QuestStatus,
  type RewardTileProps,
  type RewardState,
} from "./signature/Cards";
export { BannerFeature, ResultSummary, type BannerFeatureProps, type ResultSummaryProps } from "./signature/Showcase";

/* Demo compositions — illustrative assemblies, not platform contracts */
export { CharacterOverview, type CharacterOverviewProps } from "./compositions/CharacterOverview";
export { CharacterRoster, type CharacterRosterProps } from "./compositions/CharacterRoster";
export { PartyEditor, type PartyEditorProps } from "./compositions/PartyEditor";
export { EquipmentOverview, type EquipmentOverviewProps } from "./compositions/EquipmentOverview";
export { QuestExplorer, type QuestExplorerProps } from "./compositions/QuestExplorer";
export { MissionList, type MissionListProps } from "./compositions/MissionList";
export type * from "./compositions/types";

/* Icons */
export * from "./icons";

/* Utilities */
export { cx } from "./lib/cx";
export { formatNumber, formatCompact } from "./lib/format";
