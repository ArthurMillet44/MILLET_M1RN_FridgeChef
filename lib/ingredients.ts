import { supabase } from "./supabase";

export type Ingredient = {
  id: string;
  name: string;
  // Quantité ou vide si non renseignée
  quantity: string;
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
 * @param quantity La quantité (optionnelle, vide par défaut).
 * @returns L'ingrédient ajouté.
 */
export async function addIngredient(
  userId: string,
  name: string,
  quantity = "",
): Promise<Ingredient> {
  const { data, error } = await supabase
    .from("ingredients")
    .insert({ user_id: userId, name: name.trim(), quantity: quantity.trim() })
    .select() // Sélectionne la ligne insérée pour la retourner
    .single(); // S'assure de retourner un seul objet
  if (error) throw error;
  return data;
}

/**
 * Modifie le nom et la quantité d'un ingrédient existant dans la base de données.
 * @param id L'ID de l'ingrédient à modifier.
 * @param name Le nouveau nom de l'ingrédient.
 * @param quantity La nouvelle quantité.
 */
export async function updateIngredient(
  id: string,
  name: string,
  quantity = "",
): Promise<void> {
  const { error } = await supabase
    .from("ingredients")
    .update({ name: name.trim(), quantity: quantity.trim() })
    .eq("id", id);
  if (error) throw error;
}

/**
 * Supprime un ingrédient de la base de données en fonction de son ID.
 * @param id L'ID de l'ingrédient à supprimer.
 */
export async function deleteIngredient(id: string): Promise<void> {
  const { error } = await supabase.from("ingredients").delete().eq("id", id);
  if (error) throw error;
}
