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

// Extrait la liste des ingrédients + quantités en filtrant les champs vides
export function getMealIngredients(meal: MealDetail): { name: string; measure: string }[] {
  const result = [];
  for (let i = 1; i <= 20; i++) {
    const name = meal[`strIngredient${i}`]?.trim();
    const measure = meal[`strMeasure${i}`]?.trim();
    if (name) result.push({ name, measure: measure ?? '' });
  }
  return result;
}

// Cherche les recettes qui contiennent un ingrédient donné
export async function searchByIngredient(ingredient: string): Promise<MealSummary[]> {
  const res = await fetch(`${BASE_URL}/filter.php?i=${encodeURIComponent(ingredient)}`);
  const data = await res.json();
  return data.meals ?? [];
}

// Récupère tous les détails d'une recette par son identifiant
export async function getMealById(id: string): Promise<MealDetail | null> {
  const res = await fetch(`${BASE_URL}/lookup.php?i=${encodeURIComponent(id)}`);
  const data = await res.json();
  return data.meals?.[0] ?? null;
}
