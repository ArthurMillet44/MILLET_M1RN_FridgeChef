import { palette, radius, spacing, typography } from '@/constants/design-system';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.bg,
  },
  image: {
    width: '100%',
    height: 300,
  },
  backBtn: {
    position: 'absolute',
    top: 48,
    left: spacing.lg,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  favBtn: {
    position: 'absolute',
    top: 48,
    right: spacing.lg,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    padding: spacing.xl,
    gap: spacing.lg,
  },
  title: {
    fontSize: typography.size.title,
    fontWeight: typography.weight.black,
    color: palette.textPrimary,
    lineHeight: 38,
  },
  meta: {
    fontSize: typography.size.body,
    color: palette.textMuted,
    marginTop: spacing.xs,
  },
  sectionTitle: {
    fontSize: typography.size.bodyLg,
    fontWeight: typography.weight.bold,
    color: palette.textPrimary,
    marginBottom: spacing.md,
  },
  ingredientGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  ingredientCard: {
    backgroundColor: palette.surface,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  ingredientName: {
    fontSize: typography.size.small,
    fontWeight: typography.weight.semibold,
    color: palette.textPrimary,
  },
  ingredientMeasure: {
    fontSize: typography.size.small,
    color: palette.accent,
    marginTop: 2,
  },
  instructions: {
    fontSize: typography.size.body,
    color: palette.textPrimary,
    lineHeight: 22,
  },
  cookBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    backgroundColor: palette.accent,
    borderRadius: radius.lg,
    paddingVertical: spacing.md,
  },
  cookBtnText: {
    color: palette.accentFg,
    fontSize: typography.size.body,
    fontWeight: typography.weight.semibold,
  },
  shoppingBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    backgroundColor: palette.surface,
    borderRadius: radius.lg,
    paddingVertical: spacing.md,
  },
  shoppingBtnText: {
    color: palette.textPrimary,
    fontSize: typography.size.body,
    fontWeight: typography.weight.semibold,
  },
  youtubeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    backgroundColor: '#FF0000',
    borderRadius: radius.lg,
    paddingVertical: spacing.md,
  },
  youtubeBtnText: {
    color: '#fff',
    fontSize: typography.size.body,
    fontWeight: typography.weight.semibold,
  },
});
