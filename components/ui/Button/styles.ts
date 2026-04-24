import { radius, typography } from "@/constants/design-system";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  btn: {
    height: 54,
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
  },
  btnGhost: {
    borderWidth: 1,
  },

  text: {
    fontSize: typography.size.small,
  },
  textPrimary: {
    fontWeight: typography.weight.black,
    letterSpacing: typography.tracking.wider,
  },
  textGhost: {
    fontWeight: typography.weight.regular,
    letterSpacing: typography.tracking.normal,
  },
});
