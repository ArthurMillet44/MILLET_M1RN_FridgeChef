/**
 * Écran d'authentification ->  gère la connexion et l'inscription
 * Contient le sélecteur de mode ModeTab et le formulaire avec appel à Supabase Auth.
 */
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { palette } from "@/constants/design-system";
import { supabase } from "@/lib/supabase";
import { styles } from "@/lib/styles/sign-in";

type Mode = "login" | "signup";

/**
 * Sélecteur d'onglet "Connexion / S'inscrire".
 * Met en surbrillance l'onglet actif avec la couleur accent.
 */
function ModeTab({
  mode,
  onToggle,
}: {
  mode: Mode;
  onToggle: (m: Mode) => void;
}) {
  return (
    <View
      style={[
        styles.tabContainer,
        { backgroundColor: palette.surface, borderColor: palette.border },
      ]}
    >
      <Pressable
        style={[
          styles.tabItem,
          mode === "login" && { backgroundColor: palette.accent },
        ]}
        onPress={() => onToggle("login")}
      >
        <Text
          style={[
            styles.tabText,
            { color: mode === "login" ? palette.accentFg : palette.textMuted },
          ]}
        >
          Connexion
        </Text>
      </Pressable>
      <Pressable
        style={[
          styles.tabItem,
          mode === "signup" && { backgroundColor: palette.accent },
        ]}
        onPress={() => onToggle("signup")}
      >
        <Text
          style={[
            styles.tabText,
            { color: mode === "signup" ? palette.accentFg : palette.textMuted },
          ]}
        >
          S'inscrire
        </Text>
      </Pressable>
    </View>
  );
}

/**
 * Écran d'authentification combiné : connexion et inscription dans un seul écran.
 * Le mode courant détermine quels champs sont affichés et quelle API Supabase est appelée.
 */
export default function SignInScreen() {
  const insets = useSafeAreaInsets();

  // Mode d'authentification courant : "login" ou "signup"
  const [mode, setMode] = useState<Mode>("login");
  // Champ d'email, utilisé pour les deux modes (login et signup)
  const [email, setEmail] = useState("");
  // Champ de mot de passe, utilisé pour les deux modes (login et signup)
  const [password, setPassword] = useState("");
  // Champ de confirmation du mot de passe, uniquement utilisé en mode inscription
  const [confirmPassword, setConfirmPassword] = useState("");
  // Message d'erreur à afficher en cas de problème d'authentification
  const [error, setError] = useState("");
  // Indique si une requête d'authentification est en cours pour désactiver le bouton
  const [loading, setLoading] = useState(false);

  /**
   * Bascule entre les modes login et signup.
   * Réinitialise l'erreur et le champ de confirmation à chaque changement.
   */
  const switchMode = (m: Mode) => {
    if (m === mode) return;
    setMode(m);
    setError("");
    setConfirmPassword("");
  };

  /**
   * Soumet le formulaire selon le mode courant.
   * Validation locale du mot de passe avant d'appeler Supabase.
   */
  const handleSubmit = async () => {
    if (mode === "signup" && password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }
    setLoading(true);
    setError("");

    const { error: authError } =
      mode === "login"
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({ email, password });

    if (authError) setError(authError.message);
    setLoading(false);
  };

  const submitLabel = mode === "login" ? "SE CONNECTER" : "CRÉER MON COMPTE";

  return (
    <View
      style={[
        styles.root,
        {
          backgroundColor: palette.bg,
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        },
      ]}
    >
      {/* KeyboardAvoidingView remonte le contenu quand le clavier est ouvert */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboard}
      >
        <View style={styles.brand}>
          <View style={[styles.brandDot, { backgroundColor: palette.accent }]} />
          <Text style={[styles.brandName, { color: palette.textSoft }]}>
            FridgeChef
          </Text>
          <Text style={[styles.brandSub, { color: palette.textSoft }]}>
            {mode === "login"
              ? "Bienvenue, connectez-vous pour continuer."
              : "Créez votre compte en quelques secondes."}
          </Text>
        </View>

        {/* Sélecteur de mode : login ou signup */}
        <ModeTab mode={mode} onToggle={switchMode} />

        {/* Formulaire */}
        <View style={styles.form}>
          <Input label="ADRESSE EMAIL" value={email} onChangeText={setEmail} />
          <Input
            label="MOT DE PASSE"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          {/* Champ de confirmation du mot de passe, uniquement visible en mode inscription */}
          {mode === "signup" && (
            <Input
              label="CONFIRMER LE MOT DE PASSE"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />
          )}
          {error ? (
            <Text style={[styles.errorText, { color: palette.error }]}>
              {error}
            </Text>
          ) : null}
        </View>

        <Button label={submitLabel} onPress={handleSubmit} loading={loading} />
      </KeyboardAvoidingView>
    </View>
  );
}
