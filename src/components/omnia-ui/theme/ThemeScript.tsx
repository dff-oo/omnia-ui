import { themeInitScript } from "./theme";

/** Render inside `<head>` of the root layout. Sets the theme attribute before first paint. */
export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />;
}
