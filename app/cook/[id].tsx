import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useKeepAwake } from "expo-keep-awake";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { palette } from "@/constants/design-system";
import { getMealById, type MealDetail } from "@/lib/mealdb";
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

  // Charge la recette au montage
  useEffect(() => {
    getMealById(id).then((data) => {
      setMeal(data);
      setLoading(false);
    });
  }, [id]);

  // Affiche un spinner pendant le chargement
  if (loading) {
    return (
      <>
        <Stack.Screen options={{ headerShown: false }} />
        <View
          style={[
            styles.container,
            { alignItems: "center", justifyContent: "center" },
          ]}
        >
          <ActivityIndicator size="large" color={palette.accent} />
        </View>
      </>
    );
  }

  // Affiche un message si la recette est introuvable
  if (!meal) {
    return (
      <>
        <Stack.Screen options={{ headerShown: false }} />
        <View
          style={[
            styles.container,
            { alignItems: "center", justifyContent: "center" },
          ]}
        >
          <Text style={{ color: palette.textMuted }}>Recette introuvable.</Text>
        </View>
      </>
    );
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
  // Largeur de la barre de progression en pourcentage
  const progressWidth: `${number}%` = `${((step + 1) / total) * 100}%`;

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
        <View style={styles.header}>
          <Text style={styles.counter}>
            Étape {step + 1} / {total}
          </Text>
          <View style={styles.progressTrack}>
            {/* La largeur augmente à chaque étape suivante */}
            <View style={[styles.progressFill, { width: progressWidth }]} />
          </View>
        </View>

        {/* Texte de l'étape courante */}
        <ScrollView
          style={styles.content}
          contentContainerStyle={styles.contentInner}
        >
          <Text style={styles.stepText}>{steps[step]}</Text>
        </ScrollView>

        {/* Boutons de navigation précédent et suivant */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={[styles.navBtn, isFirst && styles.navBtnDisabled]}
            onPress={() => setStep((s) => s - 1)}
            disabled={isFirst}
          >
            <MaterialIcons
              name="arrow-back"
              size={18}
              color={palette.textPrimary}
            />
            <Text style={styles.navBtnText}>Précédent</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.navBtn,
              styles.navBtnPrimary,
              isLast && styles.navBtnDisabled,
            ]}
            onPress={() => setStep((s) => s + 1)}
            disabled={isLast}
          >
            <Text style={[styles.navBtnText, { color: palette.accentFg }]}>
              Suivant
            </Text>
            <MaterialIcons
              name="arrow-forward"
              size={18}
              color={palette.accentFg}
            />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
