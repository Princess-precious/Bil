/**
    * @description      : Applies the light/dark theme and follows the device setting.
    * @author           : HP
    * @group            :
    * @created          : 11/10/2026
    *
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 11/10/2026
    * - Author          : HP
    * - Modification    : Created
**/

import { useCallback, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import {
  THEME_STORAGE_KEY,
  ThemeContext,
  type ResolvedTheme,
  type ThemePreference,
} from "./ThemeContext";

const DARK_QUERY = "(prefers-color-scheme: dark)";

const systemTheme = (): ResolvedTheme =>
  window.matchMedia(DARK_QUERY).matches ? "dark" : "light";

/**
 * Falls back to "system" for a first-time visitor, and for anything
 * unrecognised so a corrupted value cannot leave the app unthemed.
 */
const readStoredPreference = (): ThemePreference => {
  const stored = localStorage.getItem(THEME_STORAGE_KEY);

  return stored === "light" || stored === "dark" || stored === "system"
    ? stored
    : "system";
};

type ThemeProviderProps = {
  children: ReactNode;
};

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<ThemePreference>(
    readStoredPreference
  );

  const [deviceTheme, setDeviceTheme] = useState<ResolvedTheme>(systemTheme);

  // While the preference is "system", keep up with the device. A phone or
  // laptop switching to dark at sunset should move the app with it, with no
  // reload. This listener is harmless when the preference is light or dark.
  useEffect(() => {
    const media = window.matchMedia(DARK_QUERY);

    const handleChange = () =>
      setDeviceTheme(media.matches ? "dark" : "light");

    media.addEventListener("change", handleChange);

    return () => media.removeEventListener("change", handleChange);
  }, []);

  const resolvedTheme: ResolvedTheme =
    theme === "system" ? deviceTheme : theme;

  // index.html sets this class before first paint; from here on it is kept
  // in sync. The CSS remap in index.css keys off it.
  useEffect(() => {
    document.documentElement.classList.toggle(
      "dark",
      resolvedTheme === "dark"
    );
  }, [resolvedTheme]);

  const setTheme = useCallback((next: ThemePreference) => {
    localStorage.setItem(THEME_STORAGE_KEY, next);
    setThemeState(next);
  }, []);

  const value = useMemo(
    () => ({ theme, resolvedTheme, setTheme }),
    [theme, resolvedTheme, setTheme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
