import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import {
  type BarcodeScanningResult,
  CameraView,
  useCameraPermissions,
} from "expo-camera";
import { useRef, useState } from "react";
import {
  ActivityIndicator,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Button } from "@/components/ui/Button";
import { ScreenHeader } from "@/components/ui/ScreenHeader";
import { palette } from "@/constants/design-system";
import { useAuth } from "@/lib/auth-context";
import { addIngredient } from "@/lib/ingredients";
import {
  fetchProductByBarcode,
  type OpenFoodProduct,
} from "@/lib/openfoodfacts";
import { styles } from "@/lib/styles/scanner";

export default function ScannerScreen() {
  const { userId } = useAuth();
  // Statut de la permission caméra et fonction pour la demander
  const [permission, requestPermission] = useCameraPermissions();
  // Produit trouvé après le scan
  const [product, setProduct] = useState<OpenFoodProduct | null>(null);
  // Vrai si le code-barre ne correspond à aucun produit connu
  const [notFound, setNotFound] = useState(false);
  // Chargement en cours lors de la recherche sur Open Food Facts
  const [loading, setLoading] = useState(false);
  // Ajout en cours dans le frigo
  const [adding, setAdding] = useState(false);
  // Vrai une fois le produit ajouté avec succès au frigo
  const [added, setAdded] = useState(false);
  // Verrou pour éviter de déclencher plusieurs requêtes sur un même scan
  const scannedRef = useRef(false);

  /**
   * Appelée automatiquement dès qu'un code-barre est détecté par la caméra.
   * La variable scannedRef empêche les appels en double (la caméra peut détecter plusieurs fois de suite).
   * @param data La valeur brute du code-barre scanné.
   */
  async function handleBarcode({ data }: BarcodeScanningResult) {
    if (scannedRef.current) return;
    scannedRef.current = true;
    setLoading(true);
    try {
      const result = await fetchProductByBarcode(data);
      if (result) {
        setProduct(result);
      } else {
        setNotFound(true);
      }
    } catch {
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  }

  /**
   * Réinitialise tous les états pour relancer un nouveau scan.
   */
  function rescan() {
    scannedRef.current = false;
    setProduct(null);
    setNotFound(false);
    setAdded(false);
  }

  /**
   * Ajoute le produit scanné au frigo de l'utilisateur.
   * Utilise le nom normalisé retourné par Open Food Facts.
   */
  async function handleAdd() {
    // Si le produit ou l'ID utilisateur n'existent pas, on ne fait rien
    if (!product || !userId) return;
    setAdding(true);
    try {
      await addIngredient(userId, product.name, product.quantity ?? "");
      setAdded(true);
    } finally {
      setAdding(false);
    }
  }

  // La permission n'est pas encore déterminée (chargement initial)
  if (!permission) {
    return <View style={styles.container} />;
  }

  // Écran de demande de permission caméra
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <ScreenHeader title="SCANNER" subtitle="Accès caméra requis" />
        <View style={styles.permissionContent}>
          <MaterialIcons name="camera-alt" size={64} color={palette.textSoft} />
          <Text style={styles.permissionText}>
            FridgeChef a besoin d'accéder à ta caméra pour scanner les
            codes-barres de tes produits.
          </Text>
          <Button label="AUTORISER LA CAMÉRA" onPress={requestPermission} />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScreenHeader title="SCANNER" subtitle="Scanne un code-barre" />

      {/* Caméra active avec ses overlays */}
      <View style={styles.cameraContainer}>
        <CameraView
          style={styles.camera}
          facing="back"
          barcodeScannerSettings={{
            barcodeTypes: ["ean13", "ean8", "upc_a", "upc_e"],
          }}
          onBarcodeScanned={handleBarcode}
        />

        {/* coins décoratifs + texte d'aide du scan */}
        <View style={styles.overlay} pointerEvents="none">
          <View style={styles.viewfinder}>
            <View style={[styles.corner, styles.cornerTL]} />
            <View style={[styles.corner, styles.cornerTR]} />
            <View style={[styles.corner, styles.cornerBL]} />
            <View style={[styles.corner, styles.cornerBR]} />
          </View>
          <Text style={styles.hint}>Placez le code-barre dans le cadre</Text>
        </View>

        {/* Overlay de chargement pendant la recherche API */}
        {loading && (
          <View style={styles.statusOverlay}>
            <ActivityIndicator size="large" color={palette.white} />
            <Text style={styles.statusText}>Recherche du produit...</Text>
          </View>
        )}

        {/* Overlay affiché si le produit est introuvable dans la base */}
        {notFound && !loading && (
          <View style={styles.statusOverlay}>
            <MaterialIcons name="search-off" size={48} color={palette.white} />
            <Text style={styles.statusText}>Produit introuvable</Text>
            <TouchableOpacity style={styles.rescanBtn} onPress={rescan}>
              <Text style={styles.rescanText}>RESCANNER</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Modale affichée quand un produit est trouvé */}
      <Modal
        visible={product !== null}
        transparent
        animationType="slide"
        onRequestClose={rescan}
      >
        {/* Appui en dehors de la carte ferme la modale */}
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={rescan}
        >
          {/* onStartShouldSetResponder empêche la fermeture au toucher de la carte */}
          <View style={styles.modalCard} onStartShouldSetResponder={() => true}>
            {added ? (
              // Écran de confirmation après ajout au frigo
              <>
                <View style={styles.successIcon}>
                  <MaterialIcons
                    name="check-circle"
                    size={52}
                    color={palette.accent}
                  />
                </View>
                <Text style={styles.successText}>Ajouté au frigo !</Text>
                <Text style={styles.successSub}>{product?.name}</Text>
                <Button label="RESCANNER" onPress={rescan} />
              </>
            ) : (
              // Informations du produit + boutons d'action
              <>
                <View style={styles.modalTopRow}>
                  <TouchableOpacity onPress={rescan} style={styles.closeBtn}>
                    <MaterialIcons
                      name="close"
                      size={22}
                      color={palette.textMuted}
                    />
                  </TouchableOpacity>
                </View>
                {/* Nom normalisé, nom complet si différent, marque et quantité */}
                <View style={styles.productInfo}>
                  <Text style={styles.productName}>{product?.name}</Text>
                  {product?.fullName !== product?.name ? (
                    <Text style={styles.productMeta}>{product?.fullName}</Text>
                  ) : null}
                  {product?.brands ? (
                    <Text style={styles.productMeta}>{product.brands}</Text>
                  ) : null}
                  {product?.quantity ? (
                    <Text style={styles.productMeta}>{product.quantity}</Text>
                  ) : null}
                </View>
                <Button
                  label="AJOUTER AU FRIGO"
                  onPress={handleAdd}
                  loading={adding}
                />
                <Button label="RESCANNER" onPress={rescan} variant="ghost" />
              </>
            )}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}
