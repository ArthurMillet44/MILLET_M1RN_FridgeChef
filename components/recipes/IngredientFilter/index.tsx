import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useState } from "react";
import { FlatList, Modal, Text, TouchableOpacity, View } from "react-native";

import { palette } from "@/constants/design-system";
import { styles } from "./styles";

type Props = {
  ingredients: string[];
  selectedIngredient: string | null;
  onSelect: (ingredient: string | null) => void;
};

/**
 * Composant de filtre d'ingrédients affiché dans l'écran de recettes.
 * Permet de sélectionner un ingrédient pour filtrer les recettes.
 */
export function IngredientFilterModal({
  ingredients,
  selectedIngredient,
  onSelect,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Bouton qui affiche l'ingrédient sélectionné*/}
      <View style={styles.filterRow}>
        <TouchableOpacity
          style={styles.dropdownBtn}
          onPress={() => setOpen(true)}
          activeOpacity={0.7}
        >
          {/* Mise couleur orange sur l'icône si un filtre est actif */}
          <MaterialIcons
            name="filter-list"
            size={16}
            color={selectedIngredient ? palette.accent : palette.textMuted}
          />
          {/* Texte du filtre*/}
          <Text
            style={[
              styles.dropdownBtnText,
              selectedIngredient && styles.dropdownBtnTextActive,
            ]}
          >
            {selectedIngredient ?? "Tous les ingrédients"}
          </Text>
          <MaterialIcons
            name="expand-more"
            size={16}
            color={palette.textMuted}
          />
        </TouchableOpacity>
      </View>

      {/* Modale de sélection d'un filtre */}
      <Modal visible={open} transparent animationType="fade">
        <TouchableOpacity
          style={styles.dropdownOverlay}
          activeOpacity={1}
          onPress={() => setOpen(false)}
        >
          <View style={styles.dropdownCard}>
            {/* Titre + croix de fermeture */}
            <View style={styles.dropdownHeader}>
              <Text style={styles.dropdownTitle}>Filtrer par ingrédient</Text>
              <TouchableOpacity onPress={() => setOpen(false)}>
                <MaterialIcons
                  name="close"
                  size={22}
                  color={palette.textMuted}
                />
              </TouchableOpacity>
            </View>

            {/* Liste null par défaut avec l'option "Tous les ingrédients" */}
            <FlatList
              data={[null, ...ingredients]}
              // Clé de chaque élément (null pour "Tous les ingrédients")
              keyExtractor={(item) => item ?? "__all__"}
              renderItem={({ item }) => {
                // Actif si c'est l'ingrédient sélectionné
                const active =
                  item === selectedIngredient ||
                  (item === null && !selectedIngredient);
                return (
                  <TouchableOpacity
                    style={styles.dropdownItem}
                    onPress={() => {
                      onSelect(item);
                      setOpen(false);
                    }}
                  >
                    <Text
                      style={[
                        styles.dropdownItemText,
                        active && styles.dropdownItemTextActive,
                      ]}
                    >
                      {item ?? "Tous les ingrédients"}
                    </Text>
                    {/* Icone validé à droite de l'ingrédient sélectionné dans le filtre */}
                    {active && (
                      <MaterialIcons
                        name="check"
                        size={18}
                        color={palette.accent}
                      />
                    )}
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
}
