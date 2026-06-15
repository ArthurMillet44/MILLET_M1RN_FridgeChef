// Données extraites d'un produit Open Food Facts après scan
export type OpenFoodProduct = {
  // Nom normalisé utilisé comme ingrédient dans le frigo (generic_name_fr en priorité)
  name: string;
  // Nom complet tel qu'affiché sur le packaging (product_name_fr)
  fullName: string;
  brands?: string;
  quantity?: string;
};

// Structure brute retournée par l'API Open Food Facts v0
type OpenFoodFactsResponse = {
  // 1 = produit trouvé, 0 = introuvable
  status: number;
  product?: {
    generic_name_fr?: string;
    generic_name?: string;
    product_name_fr?: string;
    product_name?: string;
    brands?: string;
    quantity?: string;
  };
};

/**
 * Récupère les informations d'un produit alimentaire à partir de son code-barre.
 * Utilise le nom générique réglementaire (generic_name_fr) en priorité sur le nom
 * produit marketing pour éviter les intitulés trop longs.
 * @param barcode Le code-barre scanné.
 * @returns Les données du produit, ou null si introuvable ou sans nom exploitable.
 */
export async function fetchProductByBarcode(
  barcode: string,
): Promise<OpenFoodProduct | null> {
  const response = await fetch(
    `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`,
  );
  // Décodage explicite en UTF-8 pour préserver les accents des noms de produits
  const buffer = await response.arrayBuffer();
  const text = new TextDecoder("utf-8").decode(buffer);
  const data: OpenFoodFactsResponse = JSON.parse(text);

  if (data.status !== 1 || !data.product) return null;

  const { product } = data;
  // generic_name_fr est prioritaire car c'est le nom de base sans le superflu marketing
  const genericName = (
    product.generic_name_fr ||
    product.generic_name ||
    ""
  ).trim();
  const fullName = (
    product.product_name_fr ||
    product.product_name ||
    ""
  ).trim();
  // On utilise le nom générique s'il existe, sinon le nom produit comme fallback
  const source = genericName || fullName;
  if (!source) return null;

  return {
    name: source,
    fullName,
    brands: product.brands?.trim() || undefined,
    quantity: product.quantity?.trim() || undefined,
  };
}
