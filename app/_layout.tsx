import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import "react-native-reanimated";

import { AuthProvider } from "@/lib/auth-context";
import { supabase } from "@/lib/supabase";
import SignInScreen from "./SignIn";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    // Récupère la session existante au démarrage (ex : après un redémarrage de l'app)
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUserId(session?.user.id ?? null);
    });

    // Écoute les changements de session en temps réel (connexion, déconnexion, expiration)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserId(session?.user.id ?? null);
    });

    // Désabonnement au démontate du composant
    return () => subscription.unsubscribe();
  }, []);

  return (
    <ThemeProvider value={DefaultTheme}>
      {userId ? (
        // Utilisateur connecté → userId garanti non-null, exposé via AuthProvider
        <AuthProvider userId={userId}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
              name="modal"
              options={{ presentation: "modal", title: "Modal" }}
            />
          </Stack>
        </AuthProvider>
      ) : (
        // Utilisateur non connecté → écran de connexion/inscription
        <SignInScreen />
      )}
      <StatusBar style="dark" />
    </ThemeProvider>
  );
}
