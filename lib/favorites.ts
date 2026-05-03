import AsyncStorage from "@react-native-async-storage/async-storage";

import type { MealSummary } from "./mealdb";
import { supabase } from "./supabase";

// Clé de cache AsyncStorage par utilisateur pour stocker les favoris localement
const cacheKey = (userId: string) => `favorites_${userId}`;

/**
 * Lit le cache local des favoris pour un utilisateur donné.
 * Retourne un tableau vide si aucun cache n'existe.
 */
async function readCache(userId: string): Promise<MealSummary[]> {
  const json = await AsyncStorage.getItem(cacheKey(userId));
  if (!json) return [];
  return JSON.parse(json) as MealSummary[];
}

/**
 * Écrit la liste des favoris dans le cache local AsyncStorage.
 */
async function writeCache(userId: string, meals: MealSummary[]): Promise<void> {
  await AsyncStorage.setItem(cacheKey(userId), JSON.stringify(meals));
}

/**
 * Récupère la liste des recettes favorites d'un utilisateur.
 * Si le réseau est disponible, lit depuis Supabase et met à jour le cache.
 * Si le réseau est indisponible, retourne le cache local.
 * @param userId L'Id de l'utilisateur dont on veut récupérer les favoris.
 * @returns Une liste de résumés de recettes favorites de l'utilisateur.
 */
export async function getFavorites(userId: string): Promise<MealSummary[]> {
  try {
    const { data, error } = await supabase
      .from("favorites")
      .select("meal_id, meal_name, meal_thumb")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error || !data) throw new Error();

    const meals: MealSummary[] = data.map((row) => ({
      idMeal: row.meal_id,
      strMeal: row.meal_name,
      strMealThumb: row.meal_thumb,
    }));

    // Mise à jour du cache avec les données fraîches
    await writeCache(userId, meals);
    return meals;
  } catch {
    // Réseau indisponible : retour au cache local
    return readCache(userId);
  }
}

/**
 * Ajoute ou supprime une recette des favoris d'un utilisateur en fonction de sa présence actuelle dans les favoris.
 * Met à jour le cache local après l'opération Supabase.
 * @param userId L'Id de l'utilisateur.
 * @param meal La recette à ajouter ou supprimer des favoris.
 * @param isCurrent Vrai si la recette est déjà dans les favoris, faux sinon.
 */
export async function toggleFavorite(
  userId: string,
  meal: MealSummary,
  isCurrent: boolean,
): Promise<void> {
  if (isCurrent) {
    await supabase
      .from("favorites")
      .delete()
      .eq("user_id", userId)
      .eq("meal_id", meal.idMeal);

    // Retire la recette du cache local
    const cached = await readCache(userId);
    await writeCache(
      userId,
      // Filtre la recette supprimée du cache
      cached.filter((m) => m.idMeal !== meal.idMeal),
    );
  } else {
    await supabase.from("favorites").insert({
      user_id: userId,
      meal_id: meal.idMeal,
      meal_name: meal.strMeal,
      meal_thumb: meal.strMealThumb,
    });

    // Ajoute la recette en tête du cache local
    const cached = await readCache(userId);
    await writeCache(userId, [meal, ...cached]);
  }
}

/**
 * Vérifie si une recette est déjà dans les favoris d'un utilisateur.
 * @param userId L'Id de l'utilisateur.
 * @param mealId L'Id de la recette.
 * @returns Vrai si la recette est dans les favoris, faux sinon.
 */
export async function isFavorite(
  userId: string,
  mealId: string,
): Promise<boolean> {
  const { count } = await supabase
    .from("favorites")
    .select("id", { count: "exact", head: true })
    .eq("user_id", userId)
    .eq("meal_id", mealId);

  return (count ?? 0) > 0;
}
