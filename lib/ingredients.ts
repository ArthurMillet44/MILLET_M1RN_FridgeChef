import { supabase } from "./supabase";

export type Ingredient = {
  id: string;
  name: string;
  user_id: string;
  created_at: string;
};

/**
 * Récupère la liste des ingrédients pour un utilisateur donné.
 * @param userId L'ID de l'utilisateur.
 * @returns La liste des ingrédients de l'utilisateur.
 */
export async function getIngredients(userId: string): Promise<Ingredient[]> {
  const { data, error } = await supabase
    .from("ingredients")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: true });
  if (error) throw error;
  return data ?? [];
}

/**
 * Ajoute un nouvel ingrédient à la base de données pour un utilisateur donné.
 * @param userId L'ID de l'utilisateur.
 * @param name Le nom de l'ingrédient.
 * @returns L'ingrédient ajouté.
 */
export async function addIngredient(
  userId: string,
  name: string,
): Promise<Ingredient> {
  const { data, error } = await supabase
    .from("ingredients")
    .insert({ user_id: userId, name: name.trim() })
    .select() // Selectionne la ligne insérée pour la retourner
    .single(); // S'assure de retourner un seul objet
  if (error) throw error;
  return data;
}

/**
 * Supprime un ingrédient de la base de données en fonction de son ID.
 * @param id L'ID de l'ingrédient à supprimer.
 */
export async function deleteIngredient(id: string): Promise<void> {
  const { error } = await supabase.from("ingredients").delete().eq("id", id);
  if (error) throw error;
}
