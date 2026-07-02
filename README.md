# FridgeChef

Sujet 7 - Transforme tes restes en chef-d'œuvre culinaire

Application mobile React Native / Expo qui propose des recettes réalisables à partir des ingrédients disponibles dans ton frigo.

## Équipe

| Prénom | Nom    | Contribution                                                                                                                                                        |
| ------ | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Arthur | Millet | Projet complet : auth, frigo virtuel, suggestions de recettes, fiche recette, mode cuisine, favoris, liste de courses, scanner de code-barres, traduction française |

## Installation

### Variables d'environnement

copier le fichier `.env.example` en `.env` et remplir les valeurs :

```bash
cp .env.example .env
```

### Installer les dépendances

```bash
npm install
```

Si `npm install` échoue (conflits de versions, erreurs réseau...), utilise yarn à la place :

```bash
yarn
```

### 3. Lancer l'application

```bash
npx expo start
```

Scanne ensuite le QR code avec **Expo Go**.

L'appareil mobile et la machine qui lance le serveur Expo doivent être sur le même réseau Wi-Fi. Si ce n'est pas le cas l'app ne se chargera pas.

Si cela ne fonctionne toujours pas, tentez de lancer l'app en mode tunnel :

```bash
npx expo start --tunnel
```

## Variables d'environnement

| Variable                               | Description                      |
| -------------------------------------- | -------------------------------- |
| `EXPO_PUBLIC_SUPABASE_URL`             | URL du projet Supabase           |
| `EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Clé publique Supabase (anon key) |
| `EXPO_PUBLIC_MEAL_DB_URL`              | URL de base de l'API TheMealDB   |

## Librairies utilisées

| Librairie                                   | Rôle                   | Justification                                                                      |
| ------------------------------------------- | ---------------------- | ---------------------------------------------------------------------------------- |
| `expo-router`                               | Navigation             | -                                                                                  |
| `@supabase/supabase-js`                     | Base de données + Auth | Backend avec auth email/password et stockage des données utilisateur               |
| `@react-native-async-storage/async-storage` | Cache local            | Persistance hors-ligne des favoris et cache des traductions                        |
| `expo-camera`                               | Scanner code-barres    | Accès natif à la caméra pour scanner les codes des produits alimentaires           |
| `expo-image`                                | Affichage d'images     | Meilleure performance et cache automatique par rapport au composant `Image` natif  |
| `expo-keep-awake`                           | Mode cuisine           | Empêche l'écran de se mettre en veille pendant la lecture des étapes d'une recette |
| `react-native-reanimated`                   | Animations             | Animations inclues dans expo                                                       |
| `@expo/vector-icons`                        | Icônes                 | Collection Material Icons incluse dans Expo                                        |

### API externes

| API                                                    | Usage                                                                                 |
| ------------------------------------------------------ | ------------------------------------------------------------------------------------- |
| **TheMealDB** (`themealdb.com/api/json/v1/1`)          | Recherche de recettes par ingrédient, détail complet d'une recette                    |
| **Open Food Facts** (`world.openfoodfacts.org/api/v0`) | Informations produit à partir d'un code-barres scanné                                 |
| **MyMemory** (`api.mymemory.translated.net`)           | Traduction automatique EN→FR des noms et instructions de recettes (gratuit, sans clé) |
