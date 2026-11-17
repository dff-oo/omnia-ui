"use client";

import { IconButton } from "../foundations/Button";
import { MoonIcon, SunIcon } from "../icons";
import { clearThemePreference, resolveTheme, setThemePreference } from "./theme";
import { useResolvedTheme } from "./useThemePreference";

export interface ThemeToggleProps {
  className?: string;
}

/**
 * One button that flips between light and dark. It follows the system until used.
 * Choosing the theme the system already has clears the stored choice, so the page
 * follows the system again.
 */
export function ThemeToggle({ className }: ThemeToggleProps) {
  const resolved = useResolvedTheme();
  const next = resolved === "dark" ? "light" : "dark";
  return (
    <IconButton
      className={className}
      label={next === "light" ? "Switch to light theme" : "Switch to dark theme"}
      icon={next === "light" ? <SunIcon size={16} /> : <MoonIcon size={16} />}
      onClick={() => {
        const system = resolveTheme("system");
        if (next === system) clearThemePreference();
        else setThemePreference(next);
      }}
    />
  );
}
