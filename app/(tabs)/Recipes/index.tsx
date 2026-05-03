import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useEffect, useMemo, useState } from "react";
import {
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { MealCard } from "@/components/recipes/Card";
import { IngredientFilterModal } from "@/components/recipes/IngredientFilter";
import { EmptyState } from "@/components/ui/EmptyState";
import { Spinner } from "@/components/ui/Spinner";
import { palette } from "@/constants/design-system";
import { useAuth } from "@/lib/auth-context";
import { getIngredients } from "@/lib/ingredients";
import { searchByIngredient, type MealSummary } from "@/lib/mealdb";
import { styles } from "@/lib/styles/recipes";

export default function RecipesScreen() {
  const { userId } = useAuth();
  const [allMeals, setAllMeals] = useState<MealSummary[]>([]);
  // Pour chaque recette, quels ingrédients du frigo permettent de la trouver
  const [mealIngredients, setMealIngredients] = useState<
    Map<string, Set<string>>
  >(new Map());
  // Liste des ingrédients dans le frigo
  const [ingredientNames, setIngredientNames] = useState<string[]>([]);
  // Ingrédient choisi dans le filtre, null = tous
  const [selectedIngredient, setSelectedIngredient] = useState<string | null>(
    null,
  );
  // États pour gérer le chargement, les erreurs, et le cas du frigo vide
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [emptyFridge, setEmptyFridge] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadRecipes();
  }, []);

  // Cherche les recettes à partir des ingrédients du frigo
  async function loadRecipes(isRefresh = false) {
    if (isRefresh)
      // active le pull-to-refresh
      setRefreshing(true);
    // montre le cercle de chargement
    else setLoading(true);
    // efface l'erreur précédente si il y en avait une
    setError(null);
    // remet le filtre à zéro
    setSelectedIngredient(null);
    try {
      // Récupère ce qu'il y a dans le frigo
      const ingredients = await getIngredients(userId);
      if (ingredients.length === 0) {
        // montre le message "frigo vide"
        setEmptyFridge(true);
        // vide les recettes affichées
        setAllMeals([]);
        // vide la liste du filtre
        setIngredientNames([]);
        return;
      }

      setEmptyFridge(false);
      // remplit le menu de filtre avec les ingrédients du frigo
      setIngredientNames(ingredients.map((i) => i.name));

      // Cherche les recettes pour chaque ingrédient
      const results = await Promise.all(
        ingredients.map(async (i) => {
          const meals = await searchByIngredient(i.name);
          return { ingredient: i.name, meals };
        }),
      );

      // Regroupe tous les résultats en supprimant les recettes en double
      const map = new Map<string, Set<string>>();
      // recettes déjà ajoutées
      const seen = new Set<string>();
      // liste finale sans doublons
      const merged: MealSummary[] = [];

      for (const { ingredient, meals } of results) {
        for (const meal of meals) {
          if (!seen.has(meal.idMeal)) {
            seen.add(meal.idMeal);
            merged.push(meal);
          }
          if (!map.has(meal.idMeal)) map.set(meal.idMeal, new Set());
          map.get(meal.idMeal)!.add(ingredient);
        }
      }

      // sauvegarde la liste finale des recettes
      setAllMeals(merged);
      // sauvegarde les liens recette → ingrédients
      setMealIngredients(map);
    } catch {
      setError("Impossible de charger les recettes. Vérifie ta connexion."); // montre le message d'erreur
    } finally {
      setLoading(false);
      // désactive le pull-to-refresh
      setRefreshing(false);
    }
  }

  // Recettes filtrées selon l'ingrédient sélectionné
  const filteredMeals = useMemo(() => {
    if (!selectedIngredient) return allMeals;
    return allMeals.filter((meal) =>
      mealIngredients.get(meal.idMeal)?.has(selectedIngredient),
    );
  }, [allMeals, mealIngredients, selectedIngredient]);

  const count = filteredMeals.length;

  return (
    <View style={styles.container}>
      {/* En-tête avec titre et sous-titre selon le nombre de recette */}
      <View style={styles.header}>
        <Text style={styles.title}>RECETTES</Text>
        <Text style={styles.subtitle}>
          {loading
            ? "Recherche en cours..."
            : emptyFridge
              ? "Ajoute des ingrédients à ton frigo."
              : error
                ? "Erreur de chargement."
                : `${count} recette${count !== 1 ? "s" : ""} trouvée${count !== 1 ? "s" : ""}.`}
        </Text>
      </View>

      {/* Filtre par ingrédient */}
      {ingredientNames.length > 0 && !loading && !error && (
        <IngredientFilterModal
          ingredients={ingredientNames}
          selectedIngredient={selectedIngredient}
          onSelect={setSelectedIngredient}
        />
      )}

      {/* Contenu principal selon l'état */}
      {loading ? (
        <Spinner />
      ) : error ? (
        <View style={styles.emptyContainer}>
          <MaterialIcons name="wifi-off" size={48} color={palette.textSoft} />
          <Text style={styles.emptyText}>{error}</Text>
          <TouchableOpacity
            onPress={() => loadRecipes()}
            style={styles.retryBtn}
          >
            <Text style={styles.retryText}>Réessayer</Text>
          </TouchableOpacity>
        </View>
      ) : emptyFridge ? (
        <EmptyState
          icon="restaurant"
          message="Ajoute des ingrédients à ton frigo pour voir des suggestions de recettes."
        />
      ) : (
        // Grille 2 colonnes
        <FlatList
          data={filteredMeals}
          keyExtractor={(item) => item.idMeal}
          numColumns={2}
          columnWrapperStyle={{ gap: 8 }}
          contentContainerStyle={filteredMeals.length === 0 ? { flex: 1 } : styles.grid}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => loadRecipes(true)}
              colors={[palette.accent]}
              tintColor={palette.accent}
            />
          }
          ListEmptyComponent={
            <EmptyState icon="search-off" message="Aucune recette pour cet ingrédient." />
          }
          renderItem={({ item }) => <MealCard meal={item} />}
        />
      )}
    </View>
  );
}
