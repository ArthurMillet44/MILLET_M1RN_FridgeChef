import { Easing } from "react-native-reanimated";

export const palette = {
  bg: "#F8F5F0",
  surface: "#EEEAE2",
  border: "#D8D3CA",
  textPrimary: "#1A1612",
  textMuted: "#8A8480",
  textSoft: "#B0ABA6",
  accent: "#D48800",
  accentFg: "#FFFFFF",
  error: "#D63030",
  white: "#FFFFFF",
  youtube: "#FF0000",
  imageOverlay: "rgba(0,0,0,0.4)",
} as const;

export type Colors = typeof palette;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const radius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 20,
  full: 9999,
} as const;

export const typography = {
  size: {
    label: 9,
    caption: 11,
    small: 12,
    body: 13,
    bodyLg: 16,
    title: 32,
  },
  weight: {
    regular: "400" as const,
    medium: "500" as const,
    semibold: "600" as const,
    bold: "700" as const,
    black: "900" as const,
  },
  tracking: {
    tight: 0.3,
    normal: 0.5,
    wide: 2,
    wider: 3,
    widest: 5,
    brand: 6,
  },
} as const;

export const animation = {
  duration: {
    instant: 100,
    fast: 180,
    normal: 260,
    slow: 400,
    enter: 550,
  },
  easing: {
    out: Easing.out(Easing.cubic),
    in: Easing.in(Easing.cubic),
    inOut: Easing.inOut(Easing.cubic),
    linear: Easing.linear,
  },
} as const;
