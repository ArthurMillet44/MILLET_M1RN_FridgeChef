import { StyleSheet } from "react-native";

import { palette, radius, spacing, typography } from "@/constants/design-system";
import { common } from "./common";

export const styles = StyleSheet.create({
  container: common.container,

  // Permission
  permissionContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.xl,
    gap: spacing.xl,
  },
  permissionText: {
    color: palette.textMuted,
    textAlign: "center",
    fontSize: typography.size.body,
    lineHeight: 22,
  },

  // Camera
  cameraContainer: {
    flex: 1,
    overflow: "hidden",
  },
  camera: {
    flex: 1,
  },

  // Viewfinder overlay
  overlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
  },
  viewfinder: {
    width: 260,
    height: 180,
    position: "relative",
  },
  corner: {
    position: "absolute",
    width: 28,
    height: 28,
    borderColor: palette.white,
    borderWidth: 3,
  },
  cornerTL: {
    top: 0,
    left: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  cornerTR: {
    top: 0,
    right: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
  },
  cornerBL: {
    bottom: 0,
    left: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
  },
  cornerBR: {
    bottom: 0,
    right: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  hint: {
    color: palette.white,
    marginTop: spacing.xl,
    fontSize: typography.size.body,
    textAlign: "center",
    textShadowColor: "rgba(0,0,0,0.8)",
    textShadowRadius: 6,
    textShadowOffset: { width: 0, height: 1 },
  },

  // Loading / not found overlay
  statusOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.7)",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.md,
  },
  statusText: {
    color: palette.white,
    fontSize: typography.size.bodyLg,
    fontWeight: typography.weight.semibold,
  },
  rescanBtn: {
    borderWidth: 1,
    borderColor: palette.white,
    borderRadius: radius.full,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.xl,
    marginTop: spacing.sm,
  },
  rescanText: {
    color: palette.white,
    fontWeight: typography.weight.semibold,
    letterSpacing: 2,
    fontSize: typography.size.body,
  },

  // Modal produit
  modalOverlay: {
    flex: 1,
    backgroundColor: palette.imageOverlay,
    justifyContent: "flex-end",
  },
  modalCard: {
    backgroundColor: palette.bg,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xxl,
    gap: spacing.lg,
  },
  modalTopRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  closeBtn: {
    padding: spacing.xs,
  },
  productInfo: {
    gap: spacing.xs,
  },
  productName: {
    fontSize: typography.size.bodyLg,
    fontWeight: typography.weight.bold,
    color: palette.textPrimary,
  },
  productMeta: {
    fontSize: typography.size.body,
    color: palette.textMuted,
  },
  successIcon: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: spacing.sm,
  },
  successText: {
    fontSize: typography.size.bodyLg,
    fontWeight: typography.weight.bold,
    color: palette.textPrimary,
    textAlign: "center",
  },
  successSub: {
    fontSize: typography.size.body,
    color: palette.textMuted,
    textAlign: "center",
  },
});
