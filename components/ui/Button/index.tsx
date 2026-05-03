import { useAppTheme } from "@/lib/theme";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { ComponentProps } from "react";
import { Pressable, Text, View } from "react-native";
import { styles } from "./styles";

type Props = {
  label: string;
  onPress: () => void;
  variant?: "primary" | "ghost" | "youtube";
  icon?: ComponentProps<typeof MaterialIcons>["name"];
  loading?: boolean;
  disabled?: boolean;
};

export function Button({
  label,
  onPress,
  variant = "primary",
  icon,
  loading = false,
  disabled = false,
}: Props) {
  const { colors } = useAppTheme();

  const isPrimary = variant === "primary";
  const isYoutube = variant === "youtube";

  // Détermine le style du bouton en fonction de la variante
  const btnStyle = isPrimary
    ? { backgroundColor: colors.accent }
    : isYoutube
      ? { backgroundColor: "#FF0000" }
      : [
          styles.btnGhost,
          { backgroundColor: colors.surface, borderColor: colors.border },
        ];

  // Le texte et l'icône sont blancs pour les boutons primary et youtube, et utilisent la couleur de texte principale pour ghost
  const contentColor =
    isPrimary || isYoutube ? colors.accentFg : colors.textPrimary;

  return (
    <Pressable
      onPress={onPress}
      disabled={loading || disabled}
      style={[styles.btn, btnStyle]}
    >
      <View style={icon ? styles.row : undefined}>
        {icon && <MaterialIcons name={icon} size={20} color={contentColor} />}
        <Text
          style={[
            styles.text,
            isPrimary || isYoutube ? styles.textPrimary : styles.textGhost,
            { color: contentColor },
          ]}
        >
          {label}
        </Text>
      </View>
    </Pressable>
  );
}
