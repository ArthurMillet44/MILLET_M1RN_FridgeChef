import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { EmptyState } from "@/components/ui/EmptyState";
import { ScreenHeader } from "@/components/ui/ScreenHeader";
import { Spinner } from "@/components/ui/Spinner";
import { palette } from "@/constants/design-system";
import {
  clearCheckedItems,
  getShoppingItems,
  toggleShoppingItem,
  type ShoppingItem,
} from "@/lib/shopping";
import { useAuth } from "@/lib/auth-context";
import { styles } from "@/lib/styles/shopping";

/**
 * Trie les articles de la liste de courses en mettant les cochés à la fin, puis par ordre de création.
 * @param items
 * @returns La liste triée.
 */
function sortItems(items: ShoppingItem[]): ShoppingItem[] {
  return [...items].sort((a, b) => Number(a.checked) - Number(b.checked));
}

export default function ShoppingScreen() {
  const { userId } = useAuth();
  // Liste des articles de la liste de courses
  const [items, setItems] = useState<ShoppingItem[]>([]);
  // Indique si la liste est en cours de chargement
  const [loading, setLoading] = useState(true);

  // Recharge la liste à chaque fois que l'onglet devient actif
  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      getShoppingItems(userId)
        .then((data) => setItems(sortItems(data)))
        .catch(() => {})
        .finally(() => setLoading(false));
    }, [userId]),
  );

  /**
   * Coche ou décoche un article et réordonne la liste localement.
   * @param item L'article à cocher/décoche.
   */
  async function handleToggle(item: ShoppingItem) {
    const newChecked = !item.checked;
    // Mise à jour locale des articles instantanément, la mise à jour de la base se fait ensuite en asynchrone
    setItems((prev) =>
      sortItems(
        prev.map((i) => (i.id === item.id ? { ...i, checked: newChecked } : i)),
      ),
    );
    // Mise à jour de la base de données
    await toggleShoppingItem(item.id, newChecked);
  }

  /**
   * Supprime tous les articles cochés de la liste et de la base.
   */
  async function handleClear() {
    setItems((prev) => prev.filter((i) => !i.checked));
    await clearCheckedItems(userId);
  }

  // Vérifie s'il y a au moins un article coché pour afficher le bouton d'effacement
  const hasChecked = items.some((i) => i.checked);
  // Compte le nombre d'articles non cochés pour l'afficher dans le sous-titre
  const pendingCount = items.filter((i) => !i.checked).length;

  return (
    <View style={styles.container}>
      <ScreenHeader
        title="COURSES"
        subtitle={
          loading
            ? undefined
            : `${pendingCount} article${pendingCount !== 1 ? "s" : ""} restant${pendingCount !== 1 ? "s" : ""}`
        }
        action={
          hasChecked ? (
            <TouchableOpacity onPress={handleClear}>
              <Text style={styles.clearBtn}>Effacer les cochés</Text>
            </TouchableOpacity>
          ) : undefined
        }
      />

      {/* Contenu -> spinner pendant le chargement, liste sinon */}
      {loading ? (
        <Spinner />
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          style={styles.list}
          contentContainerStyle={
            items.length === 0 ? { flex: 1 } : styles.listContent
          }
          ListEmptyComponent={
            <EmptyState icon="shopping-cart" message="Ta liste de courses est vide." />
          }
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.item, item.checked && styles.itemChecked]}
              onPress={() => handleToggle(item)}
              activeOpacity={0.7}
            >
              {/* Case à cocher */}
              <MaterialIcons
                name={item.checked ? "check-box" : "check-box-outline-blank"}
                size={22}
                color={item.checked ? palette.accent : palette.textMuted}
              />
              {/* Nom + quantité */}
              <View style={styles.itemInfo}>
                <Text
                  style={[
                    styles.itemName,
                    item.checked && styles.itemNameChecked,
                  ]}
                >
                  {item.name}
                </Text>
                {item.quantity ? (
                  <Text style={styles.itemQuantity}>{item.quantity}</Text>
                ) : null}
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}
