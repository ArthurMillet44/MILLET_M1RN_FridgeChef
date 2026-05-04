import { spacing } from "@/constants/design-system";
import { StyleSheet } from "react-native";

import { common } from "@/lib/styles/common";

export const styles = StyleSheet.create({
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
});
