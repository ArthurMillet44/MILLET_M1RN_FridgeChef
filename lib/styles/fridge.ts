import {
  palette,
  radius,
  spacing,
  typography,
} from "@/constants/design-system";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.bg,
  },

  // Barre de recherche
  searchRow: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: palette.surface,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: palette.border,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    gap: spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: typography.size.body,
    color: palette.textPrimary,
  },

  // En-tête de section
  sectionRow: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
  },
  sectionTitle: {
    fontSize: typography.size.bodyLg,
    fontWeight: typography.weight.bold,
    color: palette.textPrimary,
  },
  sectionCount: {
    fontSize: typography.size.small,
    fontWeight: typography.weight.medium,
    color: palette.accent,
  },

  // Liste
  list: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.md,
    gap: spacing.sm,
  },

  // Item carte
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
  iconPlaceholder: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    backgroundColor: palette.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  itemName: {
    fontSize: typography.size.bodyLg,
    fontWeight: typography.weight.semibold,
    color: palette.textPrimary,
  },
  // Bloc texte (nom + quantité)
  itemInfo: {
    flex: 1,
    gap: 2,
  },
  itemQuantity: {
    fontSize: typography.size.small,
    color: palette.textMuted,
  },
  deleteBtn: {
    padding: spacing.xs,
  },

  // Bouton flottant
  fab: {
    position: "absolute",
    bottom: spacing.xl,
    right: spacing.xl,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: palette.accent,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: palette.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 6,
  },

  // Modale
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },
  modalCard: {
    backgroundColor: palette.bg,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xxl,
    gap: spacing.lg,
  },
  modalTopRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  closeBtn: {
    padding: spacing.xs,
  },
});
