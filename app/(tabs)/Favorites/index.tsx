import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { FlatList, Text, View } from "react-native";

import { MealCard } from "@/components/recipes/Card";
import { Spinner } from "@/components/ui/Spinner";
import { palette } from "@/constants/design-system";
import { useAuth } from "@/lib/auth-context";
import { getFavorites } from "@/lib/favorites";
import type { MealSummary } from "@/lib/mealdb";
import { styles } from "@/lib/styles/favorites";

export default function FavoritesScreen() {
  const { userId } = useAuth();
  // Recettes favorites de l'utilisateur
  const [meals, setMeals] = useState<MealSummary[]>([]);
  // Vrai pendant le chargement initial des favoris ou lors du rafraîchissement de la liste
  const [loading, setLoading] = useState(true);

  // Recharge les favoris à chaque fois que l'onglet devient actif
  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      getFavorites(userId).then((favs) => {
        setMeals(favs);
        setLoading(false);
      });
    }, [userId]),
  );

  return (
    <View style={styles.container}>
      {/* En-tête */}
      <View style={styles.header}>
        <Text style={styles.title}>FAVORIS</Text>
        <Text style={styles.subtitle}>
          {loading
            ? "Chargement..."
            : `${meals.length} recette${meals.length !== 1 ? "s" : ""} sauvegardée${meals.length !== 1 ? "s" : ""}.`}
        </Text>
      </View>

      {/* Contenu avec réutilisation du composant Card de la page de recettes */}
      {loading ? (
        <Spinner />
      ) : (
        <FlatList
          data={meals}
          keyExtractor={(item) => item.idMeal}
          numColumns={2}
          columnWrapperStyle={{ gap: 8 }}
          contentContainerStyle={styles.grid}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <MaterialIcons
                name="favorite-border"
                size={48}
                color={palette.textSoft}
              />
              <Text style={styles.emptyText}>Aucun favori pour l'instant.</Text>
            </View>
          }
          renderItem={({ item }) => <MealCard meal={item} />}
        />
      )}
    </View>
  );
}
