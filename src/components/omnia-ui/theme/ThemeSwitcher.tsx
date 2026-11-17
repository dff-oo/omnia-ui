"use client";

import { SegmentedControl, type SegmentedOption } from "../foundations/SegmentedControl";
import { MonitorIcon, MoonIcon, SunIcon } from "../icons";
import type { OmniaThemePreference } from "./theme";
import { useThemePreference } from "./useThemePreference";

const options: SegmentedOption<OmniaThemePreference>[] = [
  { value: "light", label: "Light", icon: <SunIcon size={16} /> },
  { value: "dark", label: "Dark", icon: <MoonIcon size={16} /> },
  { value: "system", label: "System", icon: <MonitorIcon size={16} /> },
];

export interface ThemeSwitcherProps {
  /** Icons only; labels stay available to assistive technology. By default labels hide below 480px. */
  compact?: boolean;
  className?: string;
}

export function ThemeSwitcher({ compact, className }: ThemeSwitcherProps) {
  const [preference, setPreference] = useThemePreference();
  return (
    <SegmentedControl
      label="Colour theme"
      options={options}
      value={preference}
      onValueChange={setPreference}
      iconOnly={compact || "narrow"}
      className={className}
    />
  );
}
