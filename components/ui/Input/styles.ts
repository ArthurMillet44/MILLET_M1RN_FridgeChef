import { spacing, typography } from "@/constants/design-system";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  wrapper: {
    gap: spacing.sm,
  },
  label: {
    fontSize: typography.size.label,
    fontWeight: typography.weight.bold,
    letterSpacing: typography.tracking.wider,
  },
  input: {
    fontSize: typography.size.bodyLg,
    paddingVertical: spacing.sm + 2,
    paddingHorizontal: 0,
  },
  lineTrack: {
    height: 1,
  },
});
