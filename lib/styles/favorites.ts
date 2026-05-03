import { spacing } from "@/constants/design-system";
import { StyleSheet } from "react-native";

import { common } from "./common";

export const styles = StyleSheet.create({
  container: common.container,
  header: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
  },
  title: common.screenTitle,
  subtitle: common.screenSubtitle,
  grid: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xl,
    gap: spacing.sm,
  },
});
