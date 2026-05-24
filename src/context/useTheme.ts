import { useContext } from "react";
import { ThemeContext } from "./theme";
import type { ThemeContextValue } from "./theme";

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);

  if (context === null) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }

  return context;
}
