import {
  palette,
  radius,
  spacing,
  typography,
} from "@/constants/design-system";
import { Dimensions, StyleSheet } from "react-native";

const CARD_GAP = spacing.sm;
// Calcul de la largeur des cartes pour en afficher 2 par ligne avec un gap de 8px et des marges de 16px de chaque côté.
export const CARD_WIDTH =
  (Dimensions.get("window").width - spacing.xl * 2 - CARD_GAP) / 2;

export const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    backgroundColor: "#fff",
    borderRadius: radius.lg,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  cardImage: {
    width: "100%",
    height: CARD_WIDTH,
  },
  cardBody: {
    padding: spacing.sm,
  },
  cardName: {
    fontSize: typography.size.small,
    fontWeight: typography.weight.semibold,
    color: palette.textPrimary,
    lineHeight: 16,
  },
});
