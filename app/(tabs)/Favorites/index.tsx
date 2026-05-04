import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { FlatList, View } from "react-native";

import { MealCard } from "@/components/recipes/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { ScreenHeader } from "@/components/ui/ScreenHeader";
import { Spinner } from "@/components/ui/Spinner";
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
      <ScreenHeader
        title="FAVORIS"
        subtitle={
          loading
            ? "Chargement..."
            : `${meals.length} recette${meals.length !== 1 ? "s" : ""} sauvegardée${meals.length !== 1 ? "s" : ""}.`
        }
      />

      {/* Contenu avec réutilisation du composant Card de la page de recettes */}
      {loading ? (
        <Spinner />
      ) : (
        <FlatList
          data={meals}
          keyExtractor={(item) => item.idMeal}
          numColumns={2}
          columnWrapperStyle={{ gap: 8 }}
          contentContainerStyle={meals.length === 0 ? { flex: 1 } : styles.grid}
          ListEmptyComponent={
            <EmptyState icon="favorite-border" message="Aucun favori pour l'instant." />
          }
          renderItem={({ item }) => <MealCard meal={item} />}
        />
      )}
    </View>
  );
}
