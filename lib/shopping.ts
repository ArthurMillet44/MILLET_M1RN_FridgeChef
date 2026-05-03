import { supabase } from "./supabase";

export type ShoppingItem = {
  id: string;
  name: string;
  quantity: string;
  checked: boolean;
  user_id: string;
  created_at: string;
};

/**
 * Récupère la liste de courses d'un utilisateur, non-cochés en premier puis cochés.
 * @param userId L'ID de l'utilisateur.
 * @returns La liste de courses de l'utilisateur.
 */
export async function getShoppingItems(
  userId: string,
): Promise<ShoppingItem[]> {
  const { data, error } = await supabase
    .from("shopping_items")
    .select("*")
    .eq("user_id", userId)
    .order("checked", { ascending: true });
  if (error) throw error;
  return data ?? [];
}

/**
 * Ajoute des articles à la liste de courses en ignorant les doublons (même user_id + name).
 * @param userId L'ID de l'utilisateur.
 * @param items Liste des articles à ajouter (nom + quantité).
 */
export async function addShoppingItems(
  userId: string,
  items: { name: string; quantity: string }[],
): Promise<void> {
  if (items.length === 0) return;
  const { error } = await supabase.from("shopping_items").upsert(
    items.map((i) => ({
      user_id: userId,
      name: i.name.trim(),
      quantity: i.quantity.trim(),
    })),
    // Ignore les doublons si l'article est déjà dans la liste
    { onConflict: "user_id,name", ignoreDuplicates: true },
  );
  if (error) throw error;
}

/**
 * Coche ou décoche un article de la liste de courses.
 * @param id L'ID de l'article.
 * @param checked Le nouvel état de la case à cocher.
 */
export async function toggleShoppingItem(
  id: string,
  checked: boolean,
): Promise<void> {
  const { error } = await supabase
    .from("shopping_items")
    .update({ checked })
    .eq("id", id);
  if (error) throw error;
}

/**
 * Supprime tous les articles cochés de la liste de courses d'un utilisateur.
 * @param userId L'ID de l'utilisateur.
 */
export async function clearCheckedItems(userId: string): Promise<void> {
  const { error } = await supabase
    .from("shopping_items")
    .delete()
    .eq("user_id", userId)
    .eq("checked", true);
  if (error) throw error;
}
