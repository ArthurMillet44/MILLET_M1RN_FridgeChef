import { StyleSheet, Text, View } from "react-native";

import { palette, spacing, typography } from "@/constants/design-system";

export default function FridgeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>MON FRIGO</Text>
      <Text style={styles.subtitle}>Tes ingrédients apparaîtront ici.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.bg,
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.xl,
  },
  title: {
    fontSize: typography.size.title,
    fontWeight: typography.weight.black,
    letterSpacing: typography.tracking.widest,
    color: palette.accent,
    lineHeight: 38,
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: typography.size.body,
    color: palette.textMuted,
    lineHeight: 20,
  },
});
