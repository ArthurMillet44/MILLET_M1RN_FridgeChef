import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { ComponentProps } from "react";
import { Text, View } from "react-native";

import { palette } from "@/constants/design-system";
import { styles } from "./styles";

type Props = {
  icon: ComponentProps<typeof MaterialIcons>["name"];
  message: string;
};

// Composant d'état vide pour afficher un message et une icône lorsque aucune donnée n'est disponible
export function EmptyState({ icon, message }: Props) {
  return (
    <View style={styles.container}>
      <MaterialIcons name={icon} size={48} color={palette.textSoft} />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}
