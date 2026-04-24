import { spacing, typography } from "@/constants/design-system";
import { Dimensions, StyleSheet } from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const H_PADDING = spacing.xl;

export const TAB_ITEM_WIDTH = (SCREEN_WIDTH - H_PADDING * 2) / 2;

export const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  keyboard: {
    flex: 1,
    paddingHorizontal: H_PADDING,
    justifyContent: "center",
  },

  brand: {
    marginBottom: spacing.xxl - 12,
  },
  brandDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginBottom: 14,
  },
  brandName: {
    fontSize: typography.size.title,
    fontWeight: typography.weight.black,
    letterSpacing: typography.tracking.widest,
    lineHeight: 38,
  },
  brandSub: {
    fontSize: typography.size.body,
    fontWeight: typography.weight.regular,
    marginTop: spacing.sm,
    lineHeight: 20,
  },

  tabContainer: {
    flexDirection: "row",
    borderRadius: 10,
    borderWidth: 1,
    height: 46,
    marginBottom: spacing.xxl - 12,
    overflow: "hidden",
    position: "relative",
  },
  tabIndicator: {
    position: "absolute",
    width: TAB_ITEM_WIDTH,
    height: "100%",
    borderRadius: 9,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  tabText: {
    fontSize: typography.size.small,
    letterSpacing: 0.4,
  },
  tabTextActive: {
    fontWeight: typography.weight.bold,
  },
  tabTextInactive: {
    fontWeight: typography.weight.regular,
  },

  form: {
    gap: spacing.lg + 4,
    marginBottom: spacing.xl,
  },
  errorText: {
    fontSize: typography.size.small,
    letterSpacing: 0.3,
    lineHeight: 18,
  },
});
