import AsyncStorage from "@react-native-async-storage/async-storage";

import type { MealDetail, MealSummary } from "./mealdb";

// Préfixe de cache pour ne pas polluer les autres clés AsyncStorage
const CACHE_PREFIX = "tr_";
// MyMemory limite à 500 caractères par requête
const MAX_CHUNK = 480;

const INGREDIENTS_FR: Record<string, string> = {
  // Viandes
  Chicken: "Poulet",
  "Chicken Breast": "Blanc de poulet",
  "Chicken Thighs": "Cuisses de poulet",
  "Chicken Wings": "Ailes de poulet",
  "Chicken Legs": "Pattes de poulet",
  Beef: "Bœuf",
  "Ground Beef": "Bœuf haché",
  "Beef Mince": "Bœuf haché",
  Pork: "Porc",
  "Pork Belly": "Poitrine de porc",
  "Pork Chops": "Côtelettes de porc",
  Lamb: "Agneau",
  "Lamb Mince": "Agneau haché",
  Turkey: "Dinde",
  Duck: "Canard",
  Bacon: "Bacon",
  Ham: "Jambon",
  Sausages: "Saucisses",
  Chorizo: "Chorizo",
  Pancetta: "Pancetta",
  Prosciutto: "Prosciutto",
  Veal: "Veau",
  Mince: "Viande hachée",
  // Poissons & fruits de mer
  Salmon: "Saumon",
  Tuna: "Thon",
  Cod: "Cabillaud",
  Shrimp: "Crevettes",
  Prawns: "Gambas",
  Crab: "Crabe",
  Lobster: "Homard",
  Squid: "Calmar",
  Mussels: "Moules",
  Clams: "Palourdes",
  Anchovies: "Anchois",
  "Sea Bass": "Bar",
  Tilapia: "Tilapia",
  Mackerel: "Maquereau",
  Sardines: "Sardines",
  // Légumes
  Onion: "Oignon",
  Onions: "Oignons",
  Garlic: "Ail",
  Tomato: "Tomate",
  Tomatoes: "Tomates",
  Potato: "Pomme de terre",
  Potatoes: "Pommes de terre",
  Carrot: "Carotte",
  Carrots: "Carottes",
  Celery: "Céleri",
  Pepper: "Poivron",
  "Red Pepper": "Poivron rouge",
  "Green Pepper": "Poivron vert",
  "Yellow Pepper": "Poivron jaune",
  "Bell Pepper": "Poivron",
  Mushrooms: "Champignons",
  Spinach: "Épinards",
  Broccoli: "Brocoli",
  Cauliflower: "Chou-fleur",
  Cabbage: "Chou",
  Lettuce: "Laitue",
  Cucumber: "Concombre",
  Zucchini: "Courgette",
  Courgette: "Courgette",
  Eggplant: "Aubergine",
  Aubergine: "Aubergine",
  Leek: "Poireau",
  Leeks: "Poireaux",
  Asparagus: "Asperges",
  "Green Beans": "Haricots verts",
  Peas: "Petits pois",
  Corn: "Maïs",
  "Sweet Corn": "Maïs doux",
  Artichoke: "Artichaut",
  Beetroot: "Betterave",
  Turnip: "Navet",
  Parsnip: "Panais",
  "Sweet Potato": "Patate douce",
  Pumpkin: "Potiron",
  "Butternut Squash": "Courge butternut",
  "Spring Onions": "Oignons verts",
  Scallions: "Oignons verts",
  Shallots: "Échalotes",
  Shallot: "Échalote",
  Chilli: "Piment",
  Chili: "Piment",
  Ginger: "Gingembre",
  Radish: "Radis",
  Fennel: "Fenouil",
  Kale: "Chou frisé",
  "Bok Choy": "Pak-choï",
  // Herbes & épices
  Parsley: "Persil",
  Basil: "Basilic",
  Thyme: "Thym",
  Rosemary: "Romarin",
  Oregano: "Origan",
  Coriander: "Coriandre",
  Cilantro: "Coriandre",
  Mint: "Menthe",
  Dill: "Aneth",
  Tarragon: "Estragon",
  Sage: "Sauge",
  "Bay Leaves": "Feuilles de laurier",
  "Bay Leaf": "Feuille de laurier",
  Chives: "Ciboulette",
  Salt: "Sel",
  "Black Pepper": "Poivre noir",
  "White Pepper": "Poivre blanc",
  Cumin: "Cumin",
  "Coriander Seeds": "Graines de coriandre",
  Paprika: "Paprika",
  "Smoked Paprika": "Paprika fumé",
  Turmeric: "Curcuma",
  Cinnamon: "Cannelle",
  Nutmeg: "Noix de muscade",
  Cardamom: "Cardamome",
  Cloves: "Clous de girofle",
  "Star Anise": "Anis étoilé",
  Saffron: "Safran",
  "Chilli Flakes": "Flocons de piment",
  "Chili Flakes": "Flocons de piment",
  "Cayenne Pepper": "Poivre de Cayenne",
  Allspice: "Tout-épice",
  "Garam Masala": "Garam masala",
  "Curry Powder": "Poudre de curry",
  Fenugreek: "Fenugrec",
  "Mustard Seeds": "Graines de moutarde",
  "Fennel Seeds": "Graines de fenouil",
  Lemongrass: "Citronnelle",
  Galangal: "Galangal",
  "Curry Leaves": "Feuilles de curry",
  // Produits laitiers & œufs
  Butter: "Beurre",
  Milk: "Lait",
  Cream: "Crème",
  "Double Cream": "Crème épaisse",
  "Heavy Cream": "Crème épaisse",
  "Sour Cream": "Crème fraîche",
  Yogurt: "Yaourt",
  Yoghurt: "Yaourt",
  Cheese: "Fromage",
  Parmesan: "Parmesan",
  Mozzarella: "Mozzarella",
  Cheddar: "Cheddar",
  Feta: "Feta",
  Gruyere: "Gruyère",
  Ricotta: "Ricotta",
  "Cream Cheese": "Fromage frais",
  Eggs: "Œufs",
  Egg: "Œuf",
  "Egg Yolks": "Jaunes d'œufs",
  "Egg Yolk": "Jaune d'œuf",
  "Egg Whites": "Blancs d'œufs",
  "Egg White": "Blanc d'œuf",
  // Féculents & céréales
  Rice: "Riz",
  "Basmati Rice": "Riz basmati",
  "Brown Rice": "Riz complet",
  Pasta: "Pâtes",
  Spaghetti: "Spaghetti",
  Penne: "Penne",
  Tagliatelle: "Tagliatelles",
  Flour: "Farine",
  "Plain Flour": "Farine",
  Breadcrumbs: "Chapelure",
  Noodles: "Nouilles",
  "Rice Noodles": "Nouilles de riz",
  "Udon Noodles": "Nouilles udon",
  Couscous: "Couscous",
  Quinoa: "Quinoa",
  Oats: "Flocons d'avoine",
  Cornstarch: "Fécule de maïs",
  Cornflour: "Fécule de maïs",
  Lentils: "Lentilles",
  "Red Lentils": "Lentilles corail",
  Chickpeas: "Pois chiches",
  "Black Beans": "Haricots noirs",
  "Kidney Beans": "Haricots rouges",
  "Cannellini Beans": "Haricots cannellini",
  Polenta: "Polenta",
  // Huiles & graisses
  "Olive Oil": "Huile d'olive",
  "Vegetable Oil": "Huile végétale",
  "Sunflower Oil": "Huile de tournesol",
  "Sesame Oil": "Huile de sésame",
  "Coconut Oil": "Huile de coco",
  // Sauces & condiments
  "Soy Sauce": "Sauce soja",
  "Fish Sauce": "Sauce nuoc-mâm",
  "Oyster Sauce": "Sauce aux huîtres",
  "Worcestershire Sauce": "Sauce Worcestershire",
  "Tomato Sauce": "Sauce tomate",
  "Tomato Paste": "Concentré de tomates",
  "Tomato Purée": "Purée de tomates",
  Ketchup: "Ketchup",
  Mayonnaise: "Mayonnaise",
  Mustard: "Moutarde",
  "Dijon Mustard": "Moutarde de Dijon",
  Honey: "Miel",
  Tahini: "Tahin",
  Pesto: "Pesto",
  Vinegar: "Vinaigre",
  "White Wine Vinegar": "Vinaigre de vin blanc",
  "Red Wine Vinegar": "Vinaigre de vin rouge",
  "Balsamic Vinegar": "Vinaigre balsamique",
  "Apple Cider Vinegar": "Vinaigre de cidre",
  "Chicken Stock": "Bouillon de poulet",
  "Beef Stock": "Bouillon de bœuf",
  "Vegetable Stock": "Bouillon de légumes",
  "Chicken Broth": "Bouillon de poulet",
  "Beef Broth": "Bouillon de bœuf",
  Stock: "Bouillon",
  "Coconut Milk": "Lait de coco",
  "Coconut Cream": "Crème de coco",
  Miso: "Miso",
  "Miso Paste": "Pâte miso",
  Harissa: "Harissa",
  Capers: "Câpres",
  Olives: "Olives",
  // Sucre & pâtisserie
  Sugar: "Sucre",
  "Brown Sugar": "Sucre roux",
  "Caster Sugar": "Sucre en poudre",
  "Icing Sugar": "Sucre glace",
  "Vanilla Extract": "Extrait de vanille",
  Vanilla: "Vanille",
  "Cocoa Powder": "Cacao en poudre",
  Chocolate: "Chocolat",
  "Dark Chocolate": "Chocolat noir",
  "Milk Chocolate": "Chocolat au lait",
  "Baking Powder": "Levure chimique",
  "Baking Soda": "Bicarbonate de soude",
  Yeast: "Levure",
  "Maple Syrup": "Sirop d'érable",
  // Fruits
  Lemon: "Citron",
  Lemons: "Citrons",
  Lime: "Citron vert",
  Limes: "Citrons verts",
  Orange: "Orange",
  Oranges: "Oranges",
  Apple: "Pomme",
  Apples: "Pommes",
  Banana: "Banane",
  Bananas: "Bananes",
  Strawberries: "Fraises",
  Raspberries: "Framboises",
  Blueberries: "Myrtilles",
  Mango: "Mangue",
  Pineapple: "Ananas",
  Avocado: "Avocat",
  Grapes: "Raisins",
  Raisins: "Raisins secs",
  Dates: "Dattes",
  Figs: "Figues",
  Pomegranate: "Grenade",
  Peach: "Pêche",
  Peaches: "Pêches",
  Pear: "Poire",
  Pears: "Poires",
  // Noix & graines
  Almonds: "Amandes",
  Walnuts: "Noix",
  Pecans: "Noix de pécan",
  Cashews: "Noix de cajou",
  "Pine Nuts": "Pignons de pin",
  Peanuts: "Cacahuètes",
  "Peanut Butter": "Beurre de cacahuète",
  Hazelnuts: "Noisettes",
  Pistachios: "Pistaches",
  "Sesame Seeds": "Graines de sésame",
  // Alcools (en cuisine)
  "White Wine": "Vin blanc",
  "Red Wine": "Vin rouge",
  Beer: "Bière",
  Brandy: "Cognac",
  Rum: "Rhum",
  Sherry: "Xérès",
  Marsala: "Marsala",
  Mirin: "Mirin",
  // Divers
  Water: "Eau",
  Tofu: "Tofu",
  Gelatin: "Gélatine",
  Tamarind: "Tamarin",
  "Palm Sugar": "Sucre de palme",
  "Kaffir Lime Leaves": "Feuilles de combava",
  Edamame: "Edamame",
};

// Dictionnaire inverse FR→EN, construit automatiquement depuis INGREDIENTS_FR
const INGREDIENTS_EN: Record<string, string> = Object.fromEntries(
  Object.entries(INGREDIENTS_FR).map(([en, fr]) => [fr.toLowerCase(), en]),
);

// Cuisines par origines géographiques de TheMealDB
const AREA_FR: Record<string, string> = {
  American: "Américaine",
  British: "Britannique",
  Canadian: "Canadienne",
  Chinese: "Chinoise",
  Croatian: "Croate",
  Dutch: "Néerlandaise",
  Egyptian: "Égyptienne",
  Filipino: "Philippine",
  French: "Française",
  Greek: "Grecque",
  Indian: "Indienne",
  Irish: "Irlandaise",
  Italian: "Italienne",
  Jamaican: "Jamaïcaine",
  Japanese: "Japonaise",
  Kenyan: "Kenyane",
  Malaysian: "Malaisienne",
  Mexican: "Mexicaine",
  Moroccan: "Marocaine",
  Polish: "Polonaise",
  Portuguese: "Portugaise",
  Russian: "Russe",
  Spanish: "Espagnole",
  Thai: "Thaïlandaise",
  Tunisian: "Tunisienne",
  Turkish: "Turque",
  Unknown: "Inconnue",
  Vietnamese: "Vietnamienne",
};

// Catégories de recettes de TheMealDB
const CATEGORY_FR: Record<string, string> = {
  Beef: "Bœuf",
  Breakfast: "Petit-déjeuner",
  Chicken: "Poulet",
  Dessert: "Dessert",
  Goat: "Chèvre",
  Lamb: "Agneau",
  Miscellaneous: "Divers",
  Pasta: "Pâtes",
  Pork: "Porc",
  Seafood: "Fruits de mer",
  Side: "Accompagnement",
  Starter: "Entrée",
  Vegan: "Vegan",
  Vegetarian: "Végétarien",
};

// Traductions statiques synchrones

/**
 * Traduit un nom d'ingrédient anglais en français via le dictionnaire statique.
 * Retourne l'original si aucune correspondance n'est trouvée.
 */
export function translateIngredient(name: string): string {
  return INGREDIENTS_FR[name] ?? INGREDIENTS_FR[name.trim()] ?? name;
}

/**
 * Traduit un nom d'ingrédient français en anglais pour les appels à TheMealDB.
 * Si le nom est déjà en anglais (ou inconnu), il est retourné tel quel.
 */
export function toEnglishIngredient(name: string): string {
  return INGREDIENTS_EN[name.toLowerCase()] ?? name;
}

/** Traduit une origine géographique (ex. "Italian" → "Italienne"). */
export function translateArea(area: string): string {
  return AREA_FR[area] ?? area;
}

/** Traduit une catégorie de recette (ex. "Seafood" → "Fruits de mer"). */
export function translateCategory(category: string): string {
  return CATEGORY_FR[category] ?? category;
}

// Traduction dynamique via MyMemory (avec cache AsyncStorage)

/** Décode les entités HTML que MyMemory peut renvoyer dans les traductions. */
function decodeHtml(str: string): string {
  return str
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'");
}

/**
 * Découpe un texte long en morceaux de MAX_CHUNK caractères maximum,
 * en coupant aux limites de phrases ou de paragraphes pour préserver le sens.
 */
function splitIntoChunks(text: string): string[] {
  if (text.length <= MAX_CHUNK) return [text];

  const chunks: string[] = [];
  // Découpe d'abord par paragraphes (double saut de ligne)
  for (const para of text.split(/\r?\n\r?\n+/)) {
    const trimmed = para.trim();
    if (!trimmed) continue;
    if (trimmed.length <= MAX_CHUNK) {
      chunks.push(trimmed);
      continue;
    }
    // Paragraphe trop long : on coupe aux fins de phrases
    let remaining = trimmed;
    while (remaining.length > MAX_CHUNK) {
      // Cherche le meilleur point de coupure dans les MAX_CHUNK premiers chars
      const cut = Math.max(
        remaining.lastIndexOf(". ", MAX_CHUNK),
        remaining.lastIndexOf("! ", MAX_CHUNK),
        remaining.lastIndexOf("? ", MAX_CHUNK),
      );
      const splitAt = cut > 0 ? cut + 1 : remaining.lastIndexOf(" ", MAX_CHUNK);
      const end = splitAt > 0 ? splitAt : MAX_CHUNK;
      chunks.push(remaining.slice(0, end).trim());
      remaining = remaining.slice(end).trim();
    }
    if (remaining) chunks.push(remaining);
  }

  return chunks.filter(Boolean);
}

/** Appelle l'API MyMemory pour traduire un morceau de texte (max 480 chars). */
async function fetchTranslation(text: string): Promise<string> {
  try {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|fr`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.responseStatus !== 200 || !data.responseData?.translatedText) {
      return text;
    }
    return decodeHtml(data.responseData.translatedText);
  } catch {
    return text;
  }
}

/**
 * Traduit un texte anglais en français via MyMemory.
 * Le résultat est mis en cache dans AsyncStorage : les appels suivants
 * pour le même texte sont instantanés et ne consomment pas le quota API.
 * @param text Le texte anglais à traduire.
 * @returns La traduction française, ou le texte original en cas d'erreur.
 */
export async function translateText(text: string): Promise<string> {
  if (!text?.trim()) return text;

  // Vérification du cache
  const cacheKey = CACHE_PREFIX + text;
  const cached = await AsyncStorage.getItem(cacheKey);
  if (cached) return cached;

  try {
    const chunks = splitIntoChunks(text);
    const translated = await Promise.all(chunks.map(fetchTranslation));
    // On rejoint les morceaux avec un double saut de ligne (cohérent avec le split)
    const result = translated.join("\n\n");
    await AsyncStorage.setItem(cacheKey, result);
    return result;
  } catch {
    // On retourne l'original si l'API est inaccessible
    return text;
  }
}

// Traduction complète d'une recette

/**
 * Traduit tous les champs affichables d'une recette :
 * nom, instructions, catégorie et origine via MyMemory (avec cache),
 * ingrédients via le dictionnaire statique.
 * @param meal La recette en anglais retournée par TheMealDB.
 * @returns Une copie de la recette avec tous les champs traduits en français.
 */
export async function translateMeal(meal: MealDetail): Promise<MealDetail> {
  // Traductions dynamiques en parallèle (nom + instructions)
  const [name, instructions] = await Promise.all([
    translateText(meal.strMeal),
    translateText(meal.strInstructions),
  ]);

  // Traduction des ingrédients (strIngredient1 à strIngredient20) via le dictionnaire
  const translated: MealDetail = { ...meal };
  for (let i = 1; i <= 20; i++) {
    const ing = meal[`strIngredient${i}`]?.trim();
    if (ing) translated[`strIngredient${i}`] = translateIngredient(ing);
  }

  return {
    ...translated,
    strMeal: name,
    strInstructions: instructions,
    strCategory: translateCategory(meal.strCategory),
    strArea: translateArea(meal.strArea),
  };
}

/**
 * Traduit le nom d'une carte de recette.
 * Utilisé dans les listes de recettes et de favoris.
 */
export async function translateMealSummary(
  meal: MealSummary,
): Promise<MealSummary> {
  const name = await translateText(meal.strMeal);
  return { ...meal, strMeal: name };
}
