# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

# Instructions :

## FridgeChef

### CONTEXTE CLIENT

Votre client veut une app qui aide à cuisiner avec ce qu'on a déjà chez soi : on entre ses ingrédients, l'app propose des recettes réalisables et mémorise les favoris sur le compte utilisateur.

### API IMPOSÉE

TheMealDB — themealdb.com/api.php Entièrement gratuite, sans clé. Endpoints : /search.php , /filter.php , /lookup.php , /categories.php .

### FONCTIONNALITÉS OBLIGATOIRES

- Authentification : Inscription et connexion via Supabase Auth (email + mot de passe)
- Frigo virtuel : Écran listant les ingrédients disponibles avec ajout, modification et suppression — données persistées dans Supabase
- Suggestions de recettes : Basées sur les ingrédients du frigo (requête par ingrédient principal), affichage en grille avec photo, nom et catégorie
- Fiche recette complète : Photo, catégorie, origine, liste des ingrédients avec quantités, instructions étape par étape, lien YouTube si disponible
- Mode cuisine : Affichage plein écran étape par étape avec boutons suivant/précédent — écran qui ne se met pas en veille ( expo-keep-awake )
- Favoris : Recettes favorites sauvegardées dans Supabase, consultables hors-ligne via un cache local

### FONCTIONNALITÉS BONUS (+1 PT CHACUNE, MAX +2)

- Scanner de code-barres produit (expo-barcode-scanner ) pour ajouter un ingrédient au frigo par scan
- Liste de courses générée automatiquement à partir des ingrédients manquants d'une recette, avec cases à cocher
