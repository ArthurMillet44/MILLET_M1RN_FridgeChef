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
import { getMealById, getMealIngredients, type MealDetail } from "@/lib/mealdb";
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

  // Récupère l'utilisateur et vérifie si la recette est déjà en favori
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) return;
      setUserId(data.user.id);
      isFavorite(data.user.id, id).then(setIsFav);
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
