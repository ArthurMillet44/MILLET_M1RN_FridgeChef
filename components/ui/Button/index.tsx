import { useAppTheme } from "@/lib/theme";
import { Pressable, Text } from "react-native";
import { styles } from "./styles";

type Props = {
  label: string;
  onPress: () => void;
  variant?: "primary" | "ghost"; // Style du bouton
  loading?: boolean; // Signal un async en cours
  disabled?: boolean; // Désactiver le bouton
};

export function Button({
  label,
  onPress,
  variant = "primary",
  loading = false,
  disabled = false,
}: Props) {
  const { colors } = useAppTheme();

  const isPrimary = variant === "primary";

  return (
    <Pressable
      onPress={onPress}
      disabled={loading || disabled}
      style={[
        styles.btn,
        isPrimary
          ? { backgroundColor: colors.accent }
          : [
              styles.btnGhost,
              { backgroundColor: colors.surface, borderColor: colors.border },
            ],
      ]}
    >
      <Text
        style={[
          styles.text,
          isPrimary ? styles.textPrimary : styles.textGhost,
          { color: isPrimary ? colors.accentFg : colors.textMuted },
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}
