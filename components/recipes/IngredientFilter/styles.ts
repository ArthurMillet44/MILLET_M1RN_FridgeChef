import { palette, radius, spacing, typography } from '@/constants/design-system';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  filterRow: {
    alignItems: 'center',
    paddingBottom: spacing.md,
  },
  dropdownBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: palette.border,
    backgroundColor: palette.surface,
  },
  dropdownBtnText: {
    fontSize: typography.size.small,
    fontWeight: typography.weight.medium,
    color: palette.textMuted,
  },
  dropdownBtnTextActive: {
    color: palette.accent,
  },
  dropdownOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  dropdownCard: {
    width: '100%',
    maxHeight: 400,
    backgroundColor: palette.bg,
    borderRadius: radius.xl,
    overflow: 'hidden',
  },
  dropdownHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: palette.border,
  },
  dropdownTitle: {
    fontSize: typography.size.bodyLg,
    fontWeight: typography.weight.bold,
    color: palette.textPrimary,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: palette.border,
  },
  dropdownItemText: {
    fontSize: typography.size.body,
    color: palette.textPrimary,
  },
  dropdownItemTextActive: {
    color: palette.accent,
    fontWeight: typography.weight.semibold,
  },
});
