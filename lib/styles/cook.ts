import { palette, radius, spacing, typography } from '@/constants/design-system';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.bg,
  },
  // Bouton ✕ en overlay haut gauche
  closeBtn: {
    position: 'absolute',
    top: 48,
    left: spacing.lg,
    zIndex: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: palette.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Zone compteur + barre de progression
  header: {
    paddingTop: 60,
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.md,
    alignItems: 'center',
    gap: spacing.sm,
  },
  counter: {
    fontSize: typography.size.bodyLg,
    fontWeight: typography.weight.semibold,
    color: palette.textMuted,
    letterSpacing: typography.tracking.wide,
  },
  // Fond de la barre de progression
  progressTrack: {
    width: '100%',
    height: 4,
    backgroundColor: palette.surface,
    borderRadius: radius.sm,
    overflow: 'hidden',
  },
  // Remplissage de la barre de progression (largeur calculée dynamiquement)
  progressFill: {
    height: 4,
    backgroundColor: palette.accent,
    borderRadius: radius.sm,
  },
  // Zone scrollable contenant le texte de l'étape
  content: {
    flex: 1,
  },
  contentInner: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: spacing.xl,
  },
  stepText: {
    fontSize: 18,
    lineHeight: 30,
    color: palette.textPrimary,
  },
  // Barre de navigation bas de page
  footer: {
    flexDirection: 'row',
    gap: spacing.md,
    padding: spacing.xl,
  },
  navBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.md,
    borderRadius: radius.lg,
    backgroundColor: palette.surface,
  },
  navBtnPrimary: {
    backgroundColor: palette.accent,
  },
  navBtnText: {
    fontSize: typography.size.body,
    fontWeight: typography.weight.semibold,
    color: palette.textPrimary,
  },
  // Appliqué en plus sur le bouton quand il est désactivé
  navBtnDisabled: {
    opacity: 0.3,
  },
});
