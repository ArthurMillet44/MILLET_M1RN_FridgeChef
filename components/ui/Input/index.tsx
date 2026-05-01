import { useAppTheme } from "@/lib/theme";
import { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { styles } from "./styles";

type Props = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  placeholder?: string;
  autoFocus?: boolean;
};

/**
 * Champ de saisie avec label et ligne colorée au focus.
 */
export function Input({
  label,
  value,
  onChangeText,
  secureTextEntry = false,
  autoCapitalize = "none",
  placeholder,
  autoFocus = false,
}: Props) {
  const { colors } = useAppTheme();
  const [focused, setFocused] = useState(false);

  return (
    <View style={styles.wrapper}>
      <Text style={[styles.label, { color: colors.textMuted }]}>{label}</Text>
      <TextInput
        style={[styles.input, { color: colors.textPrimary }]}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        autoCapitalize={autoCapitalize}
        autoCorrect={false}
        autoFocus={autoFocus}
        placeholder={placeholder}
        placeholderTextColor={colors.textSoft}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      <View
        style={[
          styles.lineTrack,
          { backgroundColor: focused ? colors.accent : colors.border },
        ]}
      />
    </View>
  );
}
