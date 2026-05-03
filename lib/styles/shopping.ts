import { palette, radius, spacing, typography } from "@/constants/design-system";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.bg,
  },

  // En-tête : titre + bouton "Effacer les cochés"
  header: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
  },
  title: {
    fontSize: typography.size.title,
    fontWeight: typography.weight.black,
    letterSpacing: typography.tracking.widest,
    color: palette.accent,
    lineHeight: 38,
  },
  subtitle: {
    fontSize: typography.size.body,
    color: palette.textMuted,
    marginTop: spacing.sm,
    lineHeight: 20,
  },
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
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: radius.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    gap: spacing.md,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
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

  // État vide
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.md,
  },
  emptyText: {
    fontSize: typography.size.body,
    color: palette.textMuted,
    lineHeight: 20,
  },
});
