import { ReactNode } from "react";
import { Text, View } from "react-native";

import { styles } from "./styles";

type Props = {
  // Titre principal de l'écran
  title: string;
  // Sous-titre affiché sous le titre, non rendu si absent ou vide
  subtitle?: string;
  // Élément optionnel aligné à droite (ex. bouton "Effacer les cochés")
  action?: ReactNode;
};

/**
 * Composant d'en-tête de page avec un titre, un sous-titre optionnel et une action
 */
export function ScreenHeader({ title, subtitle, action }: Props) {
  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
      {action}
    </View>
  );
}
