import type { MealSummary } from "./mealdb";
import { supabase } from "./supabase";

/**
 * Récupère la liste des recettes favorites d'un utilisateur.
 * @param userId L'Id de l'utilisateur dont on veut récupérer les favoris.
 * @returns Une liste de résumés de recettes favorites de l'utilisateur. Si une erreur survient alors on retourne une liste vide.
 */
export async function getFavorites(userId: string): Promise<MealSummary[]> {
  const { data, error } = await supabase
    .from("favorites")
    .select("meal_id, meal_name, meal_thumb")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error || !data) return [];

  return data.map((row) => ({
    idMeal: row.meal_id,
    strMeal: row.meal_name,
    strMealThumb: row.meal_thumb,
  }));
}

/**
 * Ajoute ou supprime une recette des favoris d'un utilisateur en fonction de sa présence actuelle dans les favoris.
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
  } else {
    await supabase.from("favorites").insert({
      user_id: userId,
      meal_id: meal.idMeal,
      meal_name: meal.strMeal,
      meal_thumb: meal.strMealThumb,
    });
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
