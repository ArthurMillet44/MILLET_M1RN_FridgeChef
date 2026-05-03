import { palette, radius, spacing, typography } from '@/constants/design-system';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
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
  navBtnDisabled: {
    opacity: 0.3,
  },
});
