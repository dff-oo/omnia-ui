export type OmniaTheme = "dark" | "light";
export type OmniaThemePreference = OmniaTheme | "system";

export const THEME_STORAGE_KEY = "omnia-theme";
export const THEME_ATTRIBUTE = "data-omnia-theme";
export const THEME_CHANGE_EVENT = "omnia-theme-change";

const LIGHT_QUERY = "(prefers-color-scheme: light)";

export function isThemePreference(value: unknown): value is OmniaThemePreference {
  return value === "dark" || value === "light" || value === "system";
}

export function readThemePreference(): OmniaThemePreference {
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    return isThemePreference(stored) ? stored : "system";
  } catch {
    return "system";
  }
}

export function resolveTheme(preference: OmniaThemePreference): OmniaTheme {
  if (preference !== "system") return preference;
  return window.matchMedia(LIGHT_QUERY).matches ? "light" : "dark";
}

export function applyThemePreference(preference: OmniaThemePreference) {
  document.documentElement.setAttribute(THEME_ATTRIBUTE, resolveTheme(preference));
}

export function setThemePreference(preference: OmniaThemePreference) {
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, preference);
  } catch {
    // Storage can be unavailable (private mode, blocked cookies); the choice still applies for this page.
  }
  applyThemePreference(preference);
  window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
}

export function subscribeToTheme(onChange: () => void) {
  const media = window.matchMedia(LIGHT_QUERY);
  const handleMedia = () => {
    if (readThemePreference() === "system") applyThemePreference("system");
    onChange();
  };
  const handleStorage = (event: StorageEvent) => {
    if (event.key !== THEME_STORAGE_KEY) return;
    applyThemePreference(readThemePreference());
    onChange();
  };
  media.addEventListener("change", handleMedia);
  window.addEventListener("storage", handleStorage);
  window.addEventListener(THEME_CHANGE_EVENT, onChange);
  return () => {
    media.removeEventListener("change", handleMedia);
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener(THEME_CHANGE_EVENT, onChange);
  };
}

/** Runs during HTML parsing, before first paint. Must stay dependency-free ES5. */
export const themeInitScript = `(function(){try{var p=localStorage.getItem("${THEME_STORAGE_KEY}");if(p!=="dark"&&p!=="light")p=matchMedia("${LIGHT_QUERY}").matches?"light":"dark";document.documentElement.setAttribute("${THEME_ATTRIBUTE}",p)}catch(e){}})()`;
