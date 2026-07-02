import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useKeepAwake } from "expo-keep-awake";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { NavFooter } from "@/components/cook/NavFooter";
import { ProgressHeader } from "@/components/cook/ProgressHeader";
import { MealLoadGuard } from "@/components/ui/MealLoadGuard";
import { palette } from "@/constants/design-system";
import { getMealById, type MealDetail } from "@/lib/mealdb";
import { translateMeal } from "@/lib/translate";
import { styles } from "@/lib/styles/cook";

export default function CookScreen() {
  // Empêche l'écran de se mettre en veille pendant la session cuisine
  useKeepAwake();

  // Identifiant de la recette transmis par la route
  const { id } = useLocalSearchParams<{ id: string }>();
  // Données de la recette
  const [meal, setMeal] = useState<MealDetail | null>(null);
  // Vrai pendant le chargement initial
  const [loading, setLoading] = useState(true);
  // Index de l'étape courante (démarre à 0)
  const [step, setStep] = useState(0);

  // Charge et traduit la recette au montage (les étapes sont découpées depuis les instructions traduites)
  useEffect(() => {
    getMealById(id).then(async (data) => {
      setMeal(data ? await translateMeal(data) : null);
      setLoading(false);
    });
  }, [id]);

  // Affiche un spinner pendant le chargement ou un message si la recette est introuvable
  if (loading || !meal) {
    return <MealLoadGuard loading={loading} />;
  }

  // Découpe les instructions en étapes :
  // - à chaque ligne vide (\n\n)
  // - ou juste avant "Step N" / "STEP N"
  // - ou à chaque chiffre seul sur sa propre ligne
  const steps = meal.strInstructions
    .split(/\r?\n\r?\n|(?=\bstep\s+\d+\b)|\r?\n(?=\d+\r?\n)/i)
    .map((s) => s.trim())
    .filter(Boolean);

  // Nombre total d'étapes pour le compteur et la barre de progression
  const total = steps.length;
  // Indique si c'est la première ou la dernière étape pour désactiver les boutons de navigation
  const isFirst = step === 0;
  const isLast = step === total - 1;

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        {/* Bouton retour en haut à gauche */}
        <TouchableOpacity style={styles.closeBtn} onPress={() => router.back()}>
          <MaterialIcons name="close" size={22} color={palette.textPrimary} />
        </TouchableOpacity>

        {/* Compteur d'étapes et barre de progression */}
        <ProgressHeader step={step} total={total} />

        {/* Texte de l'étape courante */}
        <ScrollView
          style={styles.content}
          contentContainerStyle={styles.contentInner}
        >
          <Text style={styles.stepText}>{steps[step]}</Text>
        </ScrollView>

        {/* Boutons de navigation précédent et suivant */}
        <NavFooter
          onPrev={() => setStep((s) => s - 1)}
          onNext={() => setStep((s) => s + 1)}
          isFirst={isFirst}
          isLast={isLast}
        />
      </View>
    </>
  );
}
