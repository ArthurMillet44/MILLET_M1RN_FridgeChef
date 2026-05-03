import { palette, radius, spacing, typography } from "@/constants/design-system";
import { StyleSheet } from "react-native";

import { common } from "./common";

export const styles = StyleSheet.create({
  container: common.container,

  // En-tête : titre + bouton "Effacer les cochés"
  header: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
  },
  title: common.screenTitle,
  subtitle: common.screenSubtitle,
  // Bouton "Effacer les cochés" affiché uniquement si des items sont cochés
  clearBtn: {
    fontSize: typography.size.body,
    color: palette.textMuted,
    paddingBottom: 2,
  },

  // Liste
  list: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xl,
    gap: spacing.sm,
  },

  // Item de la liste
  item: {
    ...common.cardShadow,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: palette.white,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    gap: spacing.md,
  },
  // Item coché : légèrement transparent
  itemChecked: {
    opacity: 0.5,
  },
  // Bloc texte (nom + quantité)
  itemInfo: {
    flex: 1,
    gap: 2,
  },
  itemName: {
    fontSize: typography.size.bodyLg,
    fontWeight: typography.weight.semibold,
    color: palette.textPrimary,
  },
  // Nom barré pour les items cochés
  itemNameChecked: {
    textDecorationLine: "line-through",
    color: palette.textMuted,
  },
  itemQuantity: {
    fontSize: typography.size.small,
    color: palette.textMuted,
  },
});
