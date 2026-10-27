/**
    * @description      : Access the current theme preference.
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

import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }

  return context;
}
