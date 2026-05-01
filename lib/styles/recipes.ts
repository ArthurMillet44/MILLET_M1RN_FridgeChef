import { palette, spacing, typography } from '@/constants/design-system';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.bg,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  title: {
    fontSize: typography.size.title,
    fontWeight: typography.weight.black,
    letterSpacing: typography.tracking.widest,
    color: palette.accent,
    lineHeight: 38,
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: typography.size.body,
    color: palette.textMuted,
    lineHeight: 20,
  },
});
