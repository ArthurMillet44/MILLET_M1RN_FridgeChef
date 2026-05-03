import { palette, spacing } from "@/constants/design-system";
import { StyleSheet } from "react-native";

import { common } from "./common";

export const styles = StyleSheet.create({
  container: common.container,
  // Bouton ✕ en overlay haut gauche
  closeBtn: {
    position: "absolute",
    top: 48,
    left: spacing.lg,
    zIndex: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: palette.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  // Zone scrollable contenant le texte de l'étape
  content: {
    flex: 1,
  },
  contentInner: {
    flexGrow: 1,
    justifyContent: "center",
    padding: spacing.xl,
  },
  stepText: {
    fontSize: 18,
    lineHeight: 30,
    color: palette.textPrimary,
  },
});
