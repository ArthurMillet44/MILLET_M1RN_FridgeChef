import { palette, spacing, typography } from "@/constants/design-system";
import { StyleSheet } from "react-native";

import { common } from "./common";

export const styles = StyleSheet.create({
  container: common.container,
  grid: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xl,
    gap: spacing.sm,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.xl,
    gap: spacing.sm,
  },
  emptyText: {
    fontSize: typography.size.body,
    color: palette.textMuted,
    textAlign: "center",
    lineHeight: 22,
  },
  retryBtn: {
    marginTop: spacing.sm,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: palette.accent,
  },
  retryText: {
    fontSize: typography.size.body,
    color: palette.accent,
    fontWeight: typography.weight.medium,
  },
});
