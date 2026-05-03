import { palette, radius, spacing, typography } from '@/constants/design-system';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
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
  progressTrack: {
    width: '100%',
    height: 4,
    backgroundColor: palette.surface,
    borderRadius: radius.sm,
    overflow: 'hidden',
  },
  progressFill: {
    height: 4,
    backgroundColor: palette.accent,
    borderRadius: radius.sm,
  },
});
