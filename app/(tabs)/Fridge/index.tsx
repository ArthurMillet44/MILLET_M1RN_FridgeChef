import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useEffect, useState } from "react";
import {
  FlatList,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { palette } from "@/constants/design-system";
import {
  addIngredient,
  deleteIngredient,
  getIngredients,
  updateIngredient,
  type Ingredient,
} from "@/lib/ingredients";
import { styles } from "@/lib/styles/fridge";
import { supabase } from "@/lib/supabase";

export default function FridgeScreen() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  // Ingrédient en cours de modification
  const [editingIngredient, setEditingIngredient] = useState<Ingredient | null>(
    null,
  );

  // Récupère les ingrédients de l'utilisateur
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        setUserId(data.user.id);
        getIngredients(data.user.id).then(setIngredients);
      }
    });
  }, []);

  // Filtre les ingrédients en fonction de la recherche
  const filtered = search.trim()
    ? ingredients.filter((ingredient) =>
        ingredient.name.toLowerCase().includes(search.toLowerCase()),
      )
    : ingredients;

  /**
   * Ouvre la modale d'ajout d'ingrédient et réinitialise le champ de saisie.
   */
  function openModal() {
    setName("");
    setModalVisible(true);
  }

  /**
   * Ferme la modale et réinitialise tous les champs, y compris l'ingrédient en édition.
   */
  function closeModal() {
    setModalVisible(false);
    setName("");
    setEditingIngredient(null);
  }

  /**
   * Ouvre la modale pré-remplie avec le nom de l'ingrédient sélectionné.
   * @param item L'ingrédient à modifier.
   */
  function openEditModal(item: Ingredient) {
    setEditingIngredient(item);
    setName(item.name);
    setModalVisible(true);
  }

  /**
   * Ajoute un nouvel ingrédient ou met à jour l'existant.
   */
  async function handleSubmit() {
    // Ne fait rien si le nom est vide ou si l'utilisateur n'est pas identifié
    if (!name.trim() || !userId) return;
    setLoading(true);
    try {
      if (editingIngredient) {
        // Met à jour le nom dans la base et dans la liste locale
        await updateIngredient(editingIngredient.id, name);
        setIngredients((prev) =>
          prev.map((i) =>
            i.id === editingIngredient.id ? { ...i, name: name.trim() } : i,
          ),
        );
      } else {
        // Insère un nouvel ingrédient et l'ajoute à la liste
        const ingredient = await addIngredient(userId, name);
        setIngredients((prev) => [...prev, ingredient]);
      }
      closeModal();
    } finally {
      setLoading(false);
    }
  }

  /**
   * Supprime un ingrédient de la liste et de la base de données.
   * @param id L'ID de l'ingrédient à supprimer.
   */
  async function handleDelete(id: string) {
    await deleteIngredient(id);
    // Met à jour la liste en filtrant l'ingrédient supprimé
    setIngredients((prev) => prev.filter((ingredient) => ingredient.id !== id));
  }

  const count = ingredients.length;

  return (
    <View style={styles.container}>
      {/* Barre de recherche */}
      <View style={styles.searchRow}>
        <View style={styles.searchBox}>
          <MaterialIcons name="search" size={18} color={palette.textMuted} />
          <TextInput
            style={styles.searchInput}
            value={search}
            onChangeText={setSearch}
            placeholder="Rechercher un ingrédient..."
            placeholderTextColor={palette.textSoft}
            autoCapitalize="none"
            autoCorrect={false}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch("")}>
              <MaterialIcons name="close" size={16} color={palette.textMuted} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* En-tête de la section d'ingrédients */}
      <View style={styles.sectionRow}>
        <Text style={styles.sectionTitle}>Ingrédients</Text>
        <Text style={styles.sectionCount}>
          {count} produit{count !== 1 ? "s" : ""}
        </Text>
      </View>

      {/* Liste des ingrédients */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        style={styles.list}
        contentContainerStyle={
          filtered.length === 0 ? styles.emptyContainer : styles.listContent
        }
        ListEmptyComponent={
          <>
            <MaterialIcons name="kitchen" size={48} color={palette.textSoft} />
            <Text style={styles.emptyText}>
              {search ? "Aucun résultat." : "Ton frigo est vide."}
            </Text>
          </>
        }
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View style={styles.iconPlaceholder}>
              <MaterialIcons
                name="local-dining"
                size={22}
                color={palette.accent}
              />
            </View>
            <Text style={styles.itemName}>{item.name}</Text>
            {/* Bouton de modification de l'ingrédient */}
            <TouchableOpacity
              onPress={() => openEditModal(item)}
              style={styles.deleteBtn}
              hitSlop={8}
            >
              <MaterialIcons name="edit" size={20} color={palette.textMuted} />
            </TouchableOpacity>
            {/* Bouton de suppression de l'ingrédient */}
            <TouchableOpacity
              onPress={() => handleDelete(item.id)}
              style={styles.deleteBtn}
              hitSlop={8}
            >
              <MaterialIcons
                name="delete-outline"
                size={20}
                color={palette.textMuted}
              />
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Bouton d'ajout d'ingrédient */}
      <TouchableOpacity style={styles.fab} onPress={openModal}>
        <MaterialIcons name="add" size={28} color={palette.accentFg} />
      </TouchableOpacity>

      {/* Modale d'ajout ou de modification d'un ingrédient */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={closeModal}
      >
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={closeModal}
        >
          <View style={styles.modalCard}>
            <View style={styles.modalTopRow}>
              <TouchableOpacity onPress={closeModal} style={styles.closeBtn}>
                <MaterialIcons
                  name="close"
                  size={22}
                  color={palette.textMuted}
                />
              </TouchableOpacity>
            </View>
            <Input
              label="INGRÉDIENT"
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
              autoFocus
            />
            {/* Le libellé du bouton change selon qu'on ajoute ou modifie */}
            <Button
              label={editingIngredient ? "MODIFIER" : "AJOUTER"}
              onPress={handleSubmit}
              loading={loading}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}
