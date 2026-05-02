const BASE_URL = process.env.EXPO_PUBLIC_MEAL_DB_URL!;

export type MealSummary = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
};

export type MealDetail = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strYoutube: string;
  [key: string]: string;
};

/**
 * Extrait la liste des ingrédients et leurs quantités
 * @param meal La recette dont on veut extraire les ingrédients
 * @returns Une liste d'objets contenant le nom et la quantité de chaque ingrédient
 */
export function getMealIngredients(
  meal: MealDetail,
): { name: string; measure: string }[] {
  const result = [];
  for (let i = 1; i <= 20; i++) {
    const name = meal[`strIngredient${i}`]?.trim();
    const measure = meal[`strMeasure${i}`]?.trim();
    if (name) result.push({ name, measure: measure ?? "" });
  }
  return result;
}

/**
 * Recherche des recettes par ingrédient
 * @param ingredient L'ingrédient à rechercher (ex. "chicken")
 * @returns Une liste de résumés de recettes contenant l'ingrédient
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

/**
 * Récupère les détails d'une recette à partir de son identifiant
 * @param id L'identifiant de la recette (ex. "52772")
 * @returns Les détails de la recette, ou null si l'id est invalide ou en cas d'erreur API
 */
export async function getMealById(id: string): Promise<MealDetail | null> {
  const res = await fetch(`${BASE_URL}/lookup.php?i=${encodeURIComponent(id)}`);
  const data = await res.json();
  return data.meals?.[0] ?? null;
}
