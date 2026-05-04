import { Stack } from "expo-router";
import { Text, View } from "react-native";

import { Spinner } from "@/components/ui/Spinner";
import { palette } from "@/constants/design-system";
import { common } from "@/lib/styles/common";

type Props = { loading: boolean };

/**
 * Affiche un spinner pendant le chargement ou un message d'erreur si la recette
 * est introuvable.
 */
export function MealLoadGuard({ loading }: Props) {
  // Affiche un spinner pendant le chargement
  if (loading) {
    return (
      <>
        <Stack.Screen options={{ headerShown: false }} />
        <View style={common.container}>
          <Spinner />
        </View>
      </>
    );
  }

  // Affiche un message si la recette est introuvable
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View
        style={[
          common.container,
          { alignItems: "center", justifyContent: "center" },
        ]}
      >
        <Text style={{ color: palette.textMuted }}>Recette introuvable.</Text>
      </View>
    </>
  );
}
