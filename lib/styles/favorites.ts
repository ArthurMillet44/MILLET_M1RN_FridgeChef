import { palette, spacing, typography } from '@/constants/design-system';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.bg,
  },
  header: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
  },
  title: {
    fontSize: typography.size.title,
    fontWeight: typography.weight.black,
    letterSpacing: typography.tracking.widest,
    color: palette.accent,
    lineHeight: 38,
  },
  subtitle: {
    fontSize: typography.size.body,
    color: palette.textMuted,
    marginTop: spacing.sm,
    lineHeight: 20,
  },
  grid: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xl,
    gap: spacing.sm,
  },
});
