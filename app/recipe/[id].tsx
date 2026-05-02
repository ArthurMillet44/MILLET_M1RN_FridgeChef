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
import { getMealById, getMealIngredients, type MealDetail } from "@/lib/mealdb";
import { styles } from "@/lib/styles/recipe-detail";

export default function RecipeDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [meal, setMeal] = useState<MealDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMealById(id).then((data) => {
      setMeal(data);
      setLoading(false);
    });
  }, [id]);

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

  const ingredients = getMealIngredients(meal);
  const { width } = useWindowDimensions();
  // 3 cartes par ligne : largeur écran - padding body (×2) - 2 gaps entre cartes
  const cardWidth = Math.floor((width - spacing.xl * 2 - spacing.sm * 2) / 3);

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 48 }}
      >
        {/* Image et bouton retour en overlay */}
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
