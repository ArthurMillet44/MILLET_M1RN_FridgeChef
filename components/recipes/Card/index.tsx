import { Image } from "expo-image";
import { Text, TouchableOpacity, View } from "react-native";

import type { MealSummary } from "@/lib/mealdb";
import { styles } from "./styles";

type Props = {
  meal: MealSummary;
  onPress?: () => void;
};

/**
 * Affiche une carte de recette avec son image et son nom.
 */
export function MealCard({ meal, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.8} onPress={onPress}>
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
