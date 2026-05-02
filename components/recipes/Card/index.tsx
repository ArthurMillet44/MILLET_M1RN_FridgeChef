import { Image } from "expo-image";
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

import type { MealSummary } from "@/lib/mealdb";
import { styles } from "./styles";

type Props = {
  meal: MealSummary;
};

/**
 * Affiche une carte de recette avec son image et son nom.
 */
export function MealCard({ meal }: Props) {
  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8}
      // Navigue vers la page de détail de la recette en passant son id dans l'URL
      onPress={() =>
        router.push({ pathname: "/recipe/[id]", params: { id: meal.idMeal } })
      }
    >
      <Image
        source={{ uri: meal.strMealThumb }}
        style={styles.cardImage}
        contentFit="cover"
      />
      <View style={styles.cardBody}>
        <Text style={styles.cardName} numberOfLines={2}>
          {meal.strMeal}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
