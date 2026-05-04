import type { TextStyle, ViewStyle } from "react-native";

import { palette, spacing, typography } from "@/constants/design-system";

export const common = {
  container: {
    flex: 1,
    backgroundColor: palette.bg,
  } satisfies ViewStyle,
  screenTitle: {
    fontSize: typography.size.title,
    fontWeight: typography.weight.black,
    letterSpacing: typography.tracking.widest,
    color: palette.accent,
    lineHeight: 38,
  } satisfies TextStyle,
  screenSubtitle: {
    fontSize: typography.size.body,
    color: palette.textMuted,
    marginTop: spacing.sm,
    lineHeight: 20,
  } satisfies TextStyle,
  cardShadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  } satisfies ViewStyle,
};
