const BASE_URL = process.env.EXPO_PUBLIC_MEAL_DB_URL!;

export type MealSummary = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
};

/**
 * Cherche les recettes qui contiennent un ingrédient donné
 * @param ingredient
 * @returns une liste de recettes (potentiellement vide)
 */
export async function searchByIngredient(
  ingredient: string,
): Promise<MealSummary[]> {
  const res = await fetch(
    `${BASE_URL}/filter.php?i=${encodeURIComponent(ingredient)}`,
  );
  const data = await res.json();
  return data.meals ?? [];
}
