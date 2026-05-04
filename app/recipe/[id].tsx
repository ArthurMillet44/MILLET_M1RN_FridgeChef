import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Image } from "expo-image";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";

import { Button } from "@/components/ui/Button";
import { MealLoadGuard } from "@/components/ui/MealLoadGuard";

import { palette, spacing } from "@/constants/design-system";
import { useAuth } from "@/lib/auth-context";
import { isFavorite, toggleFavorite } from "@/lib/favorites";
import { getIngredients } from "@/lib/ingredients";
import { getMealById, getMealIngredients, type MealDetail } from "@/lib/mealdb";
import { addShoppingItems, getShoppingItems } from "@/lib/shopping";
import { styles } from "@/lib/styles/recipe-detail";

export default function RecipeDetailScreen() {
  const { userId } = useAuth();
  // Identifiant de la recette transmis par la route (ex. /recipe/52772)
  const { id } = useLocalSearchParams<{ id: string }>();
  // Données de la recette
  const [meal, setMeal] = useState<MealDetail | null>(null);
  // Indique si les données sont en cours de chargement pour afficher un spinner
  const [loading, setLoading] = useState(true);
  // Indique si la recette est dans les favoris
  const [isFav, setIsFav] = useState(false);
  // Noms des ingrédients du frigo pour le filtre "Générer ma liste"
  const [fridgeNames, setFridgeNames] = useState<string[]>([]);
  // Noms des articles déjà dans la liste de courses pour éviter les doublons
  const [shoppingNames, setShoppingNames] = useState<string[]>([]);
  // Indique si l'ajout à la liste de courses est en cours
  const [addingToList, setAddingToList] = useState(false);
  // Largeur de l'écran
  const { width } = useWindowDimensions();
  // Largeur de chaque carte d'ingrédient pour en afficher 3 par ligne
  const cardWidth = Math.floor((width - spacing.xl * 2 - spacing.sm * 2) / 3);

  // Charge la recette dès que l'id est connu (ou change)
  useEffect(() => {
    getMealById(id).then((data) => {
      setMeal(data);
      setLoading(false);
    });
  }, [id]);

  // Vérifie les favoris et charge le frigo + la liste de courses pour le bouton "Générer ma liste"
  useEffect(() => {
    isFavorite(userId, id).then(setIsFav);
    Promise.all([getIngredients(userId), getShoppingItems(userId)])
      .then(([fridge, shopping]) => {
        setFridgeNames(fridge.map((i) => i.name.toLowerCase()));
        setShoppingNames(shopping.map((i) => i.name.toLowerCase()));
      })
      .catch(() => {});
  }, [id, userId]);

  // Affiche un spinner pendant le chargement ou un message si la recette est introuvable
  if (loading || !meal) {
    return <MealLoadGuard loading={loading} />;
  }

  // Récupère la liste des ingrédients et leur quantité
  const ingredients = getMealIngredients(meal);

  /**
   * Ajoute à la liste de courses les ingrédients de la recette absents du frigo
   * et pas encore dans la liste.
   */
  async function handleGenerateList() {
    // Affiche un état de chargement sur le bouton
    setAddingToList(true);
    try {
      const fridgeSet = new Set(fridgeNames);
      const shoppingSet = new Set(shoppingNames);
      const toAdd = ingredients
        .filter(
          ({ name }) =>
            !fridgeSet.has(name.toLowerCase()) &&
            !shoppingSet.has(name.toLowerCase()),
        )
        .map(({ name, measure }) => ({ name, quantity: measure }));
      await addShoppingItems(userId, toAdd);
      // Met à jour le set local pour éviter les doublons si on rappuie
      setShoppingNames((prev) => [
        ...prev,
        ...toAdd.map((i) => i.name.toLowerCase()),
      ]);
    } finally {
      setAddingToList(false);
    }
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 48 }}
      >
        {/* Image avec bouton retour (gauche) et cœur favori (droite) en overlay */}
        <View>
          <Image
            source={{ uri: meal.strMealThumb }}
            style={styles.image}
            contentFit="cover"
          />
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => router.back()}
          >
            <MaterialIcons name="arrow-back" size={22} color={palette.white} />
          </TouchableOpacity>
          {/* Bouton de favoris : orange si la recette est dans les favoris, blanc sinon */}
          <TouchableOpacity
            style={styles.favBtn}
            onPress={() => {
              toggleFavorite(
                userId,
                {
                  idMeal: id,
                  strMeal: meal.strMeal,
                  strMealThumb: meal.strMealThumb,
                },
                isFav,
              );
              setIsFav(!isFav);
            }}
          >
            <MaterialIcons
              name={isFav ? "favorite" : "favorite-border"}
              size={22}
              color={isFav ? palette.accent : palette.white}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.body}>
          {/* Titre et origine */}
          <View>
            <Text style={styles.title}>{meal.strMeal}</Text>
            <Text style={styles.meta}>
              {meal.strCategory} • {meal.strArea}
            </Text>
          </View>

          {/* Liste des ingrédients */}
          <View>
            <Text style={styles.sectionTitle}>Ingrédients</Text>
            <View style={styles.ingredientGrid}>
              {ingredients.map(({ name, measure }, index) => (
                <View
                  key={index}
                  style={[styles.ingredientCard, { width: cardWidth }]}
                >
                  <Text style={styles.ingredientName}>{name}</Text>
                  <Text style={styles.ingredientMeasure}>{measure}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Instructions */}
          <View>
            <Text style={styles.sectionTitle}>Instructions</Text>
            <Text style={styles.instructions}>{meal.strInstructions}</Text>
          </View>

          {/* Bouton Mode Cuisine qui lance le mode cuisine */}
          <Button
            label="Mode Cuisine"
            icon="restaurant"
            onPress={() =>
              router.push({ pathname: "/cook/[id]", params: { id } })
            }
          />

          {/* Bouton "Générer ma liste" qui ajoute les ingrédients manquants à la liste de courses */}
          <Button
            label={addingToList ? "Ajout en cours..." : "Générer ma liste"}
            icon="shopping-cart"
            variant="ghost"
            onPress={handleGenerateList}
            loading={addingToList}
          />

          {/* Bouton YouTube si disponible */}
          {meal.strYoutube ? (
            <Button
              label="Voir sur YouTube"
              icon="play-circle-filled"
              variant="youtube"
              onPress={() => Linking.openURL(meal.strYoutube)}
            />
          ) : null}
        </View>
      </ScrollView>
    </>
  );
}
