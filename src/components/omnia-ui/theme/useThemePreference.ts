"use client";

import { useCallback, useLayoutEffect, useSyncExternalStore } from "react";
import {
  applyThemePreference,
  readThemePreference,
  setThemePreference,
  subscribeToTheme,
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
