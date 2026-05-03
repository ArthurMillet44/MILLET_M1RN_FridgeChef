import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Image } from "expo-image";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";

import { palette, spacing } from "@/constants/design-system";
import { isFavorite, toggleFavorite } from "@/lib/favorites";
import { getIngredients } from "@/lib/ingredients";
import { getMealById, getMealIngredients, type MealDetail } from "@/lib/mealdb";
import { addShoppingItems, getShoppingItems } from "@/lib/shopping";
import { styles } from "@/lib/styles/recipe-detail";
import { supabase } from "@/lib/supabase";

export default function RecipeDetailScreen() {
  // Identifiant de la recette transmis par la route (ex. /recipe/52772)
  const { id } = useLocalSearchParams<{ id: string }>();
  // Données de la recette
  const [meal, setMeal] = useState<MealDetail | null>(null);
  // Indique si les données sont en cours de chargement pour afficher un spinner
  const [loading, setLoading] = useState(true);
  // Identifiant de l'utilisateur connecté
  const [userId, setUserId] = useState<string | null>(null);
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

  // Récupère l'utilisateur, vérifie les favoris, et charge le frigo + la liste de courses
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) return;
      setUserId(session.user.id);
      isFavorite(session.user.id, id).then(setIsFav);
      // Charge en parallèle le frigo et la liste de courses pour le bouton "Générer ma liste"
      Promise.all([
        // Récupère les ingrédients du frigo pour le filtre "Générer ma liste"
        getIngredients(session.user.id),
        // Récupère les articles de la liste de courses pour éviter les doublons
        getShoppingItems(session.user.id),
      ])
        // Met à jour les sets locaux avec les noms des ingrédients
        .then(([fridge, shopping]) => {
          setFridgeNames(fridge.map((i) => i.name.toLowerCase()));
          setShoppingNames(shopping.map((i) => i.name.toLowerCase()));
        })
        .catch(() => {});
    });
  }, [id]);

  // Affiche un spinner pendant le chargement
  if (loading) {
    return (
      <>
        <Stack.Screen options={{ headerShown: false }} />
        <View
          style={[
            styles.container,
            { alignItems: "center", justifyContent: "center" },
          ]}
        >
          <ActivityIndicator size="large" color={palette.accent} />
        </View>
      </>
    );
  }

  // Affiche un message si la recette est introuvable
  if (!meal) {
    return (
      <>
        <Stack.Screen options={{ headerShown: false }} />
        <View
          style={[
            styles.container,
            { alignItems: "center", justifyContent: "center" },
          ]}
        >
          <Text style={{ color: palette.textMuted }}>Recette introuvable.</Text>
        </View>
      </>
    );
  }

  // Récupère la liste des ingrédients et leur quantité
  const ingredients = getMealIngredients(meal);

  /**
   * Ajoute à la liste de courses les ingrédients de la recette absents du frigo
   * et pas encore dans la liste.
   */
  async function handleGenerateList() {
    if (!userId) return;
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
            <MaterialIcons name="arrow-back" size={22} color="#fff" />
          </TouchableOpacity>
          {/* Bouton de favoris : orange si la recette est dans les favoris, blanc sinon */}
          <TouchableOpacity
            style={styles.favBtn}
            onPress={() => {
              if (!userId) return;
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
              color={isFav ? palette.accent : "#fff"}
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

          {/* Bouton Mode Cuisine : lance l'affichage étape par étape */}
          <TouchableOpacity
            style={styles.cookBtn}
            onPress={() =>
              router.push({ pathname: "/cook/[id]", params: { id } })
            }
          >
            <MaterialIcons
              name="restaurant"
              size={20}
              color={palette.accentFg}
            />
            <Text style={styles.cookBtnText}>Mode Cuisine</Text>
          </TouchableOpacity>

          {/* Bouton "Générer ma liste" qui ajoute les ingrédients manquants à la liste de courses */}
          <TouchableOpacity
            style={styles.shoppingBtn}
            onPress={handleGenerateList}
            disabled={addingToList}
          >
            <MaterialIcons
              name="shopping-cart"
              size={20}
              color={palette.textPrimary}
            />
            <Text style={styles.shoppingBtnText}>
              {addingToList ? "Ajout en cours..." : "Générer ma liste"}
            </Text>
          </TouchableOpacity>

          {/* Bouton YouTube si disponible */}
          {meal.strYoutube ? (
            <TouchableOpacity
              style={styles.youtubeBtn}
              onPress={() => Linking.openURL(meal.strYoutube)}
            >
              <MaterialIcons name="play-circle-filled" size={20} color="#fff" />
              <Text style={styles.youtubeBtnText}>Voir sur YouTube</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </ScrollView>
    </>
  );
}
