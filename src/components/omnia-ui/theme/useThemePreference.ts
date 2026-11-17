"use client";

import { useCallback, useLayoutEffect, useSyncExternalStore } from "react";
import {
  applyThemePreference,
  readThemePreference,
  resolveTheme,
  setThemePreference,
  subscribeToTheme,
  type OmniaTheme,
  type OmniaThemePreference,
} from "./theme";

const getServerSnapshot = (): OmniaThemePreference => "system";

export function useThemePreference() {
  const preference = useSyncExternalStore(subscribeToTheme, readThemePreference, getServerSnapshot);

  // React's dev Strict Mode remount resets <html> attributes; re-apply before paint. No-op in production.
  useLayoutEffect(() => {
    applyThemePreference(readThemePreference());
  }, []);

  const setPreference = useCallback((next: OmniaThemePreference) => setThemePreference(next), []);

  return [preference, setPreference] as const;
}

/** The theme actually painted: an explicit choice, or the system theme when none is stored. */
export function useResolvedTheme(): OmniaTheme {
  return useSyncExternalStore(subscribeToTheme, () => resolveTheme(readThemePreference()), () => "dark");
}
