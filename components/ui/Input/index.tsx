import { useState } from "react";
import { Text, TextInput, View } from "react-native";

import { palette } from "@/constants/design-system";
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
  const [focused, setFocused] = useState(false);

  return (
    <View style={styles.wrapper}>
      <Text style={[styles.label, { color: palette.textMuted }]}>{label}</Text>
      <TextInput
        style={[styles.input, { color: palette.textPrimary }]}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        autoCapitalize={autoCapitalize}
        autoCorrect={false}
        autoFocus={autoFocus}
        placeholder={placeholder}
        placeholderTextColor={palette.textSoft}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      <View
        style={[
          styles.lineTrack,
          { backgroundColor: focused ? palette.accent : palette.border },
        ]}
      />
    </View>
  );
}
