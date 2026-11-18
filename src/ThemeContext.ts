/**
    * @description      : Theme context: the user's preference and its resolution.
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

import { createContext } from "react";

/** What the user picked on the Settings page. */
export type ThemePreference = "light" | "dark" | "system";

/** What that pick currently means: "system" follows the device. */
export type ResolvedTheme = "light" | "dark";

export interface ThemeContextType {
  theme: ThemePreference;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: ThemePreference) => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

/** Where the preference lives between visits. Read by index.html too. */
export const THEME_STORAGE_KEY = "theme";
