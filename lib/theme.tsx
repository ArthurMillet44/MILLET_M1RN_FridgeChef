/**
 * Fournit le système de thème de l'application via un Context React.
 * Expose AppThemeProvider et useAppTheme pour lire les couleurs.
 */

import { palette, type Colors } from "@/constants/design-system";
import { createContext, useContext, type ReactNode } from "react";

type ThemeContextValue = {
  colors: Colors;
};

// Valeur par défaut du contexte, utilisée si un composant est rendu en dehors du provider.
const ThemeContext = createContext<ThemeContextValue>({ colors: palette });

/**
 * Encapsule l'application pour rendre les couleurs accessibles via useAppTheme.
 */
export function AppThemeProvider({ children }: { children: ReactNode }) {
  return (
    <ThemeContext.Provider value={{ colors: palette }}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Retourne la palette de couleurs active.
 */
export function useAppTheme(): ThemeContextValue {
  return useContext(ThemeContext);
}
