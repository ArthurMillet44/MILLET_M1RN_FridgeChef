import { palette, spacing, typography } from "@/constants/design-system";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.md,
    paddingHorizontal: spacing.xl,
  },
  text: {
    fontSize: typography.size.body,
    color: palette.textMuted,
    lineHeight: 20,
    textAlign: "center",
  },
});
